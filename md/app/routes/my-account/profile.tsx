import { useNavigate } from "@remix-run/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from "react-icons/ri";
import { MetaFunction } from "remix";
import Button from "~/components/Button";
import Cookies from "js-cookie";
import { fetchUserInfo, updateProfile } from "~/utils/account";
import Msg from "~/components/Msg";
import SelectInput from "~/components/SelectInput";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { Site_Title } from "~/config";


export const meta: MetaFunction = () => {
  return {
    title: `My Profile | ${Site_Title}`
  }
}

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  gender: string;
  avatar_url: string;
}


export default function profile() {
  const { i18n } = useTranslation();
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    gender: '',
    avatar_url: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      navigate('/login');
      return;
    }
    setUserId(user_id);
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(Number(user_id));
      if (userInfo) {
        setUserInfo(userInfo as UserInfo);
      } else {
        // Handle the case when fetching user information fails
        // You can display an error message or redirect the user
      }
    };

    getUserInfo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: userInfo,
  })
  useEffect(() => {
    setValue('first_name', userInfo.first_name);
    setValue('last_name', userInfo.last_name);
    setValue('email', userInfo.email);
    setValue('phone', userInfo.phone);
    setValue('birth_day', userInfo.birth_day);
    setValue('birth_month', userInfo.birth_month);
    setValue('birth_year', userInfo.birth_year);
    setValue('gender', userInfo.gender);
    setValue('avatar_url', userInfo.avatar_url);
  }, [userInfo, setValue]);

  const onSubmit = async (data: UserInfo) => {
    console.log(data)
    try {
      const updatedUserInfo = await updateProfile(data, Number(userId));
      setMessage('Profile updated successfully');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (updatedUserInfo !== undefined) {
        setUserInfo(updatedUserInfo);
      } else {
        // Handle the case when updatedUserInfo is undefined
      }
    } catch (error) {
      // Handle the case when updating user information fails
    }
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return digitsOnly.startsWith('0') && digitsOnly.length === 11;
  };

  let [isOpenPassword, setIsOpenPassword] = useState(false)

  function closePassword() {
    setIsOpenPassword(false)
  }

  function openPassword() {
    setIsOpenPassword(true)
  }
  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };
  const [passwordShown3, setPasswordShown3] = useState(false);
  const togglePassword3 = () => {
    setPasswordShown3(!passwordShown1);
  };
  return (
    <div>
      {message && <Msg color="green" message={message} />}
      <div className="flex items-center justify-between py-5 pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">Account Info.</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 py-4 pb-5 border-b-2 border-gray-200 border-solid lg:max-w-xl">
          <div>
            <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> First name </label>
            <div className="mt-1">
              <input
                type="text"
                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.first_name ? 'border-red-500' : ''}`}
                {...register("first_name", { required: i18n.language === 'ar' ? 'يجب ادخال الاسم الأول' : 'First name is required', maxLength: 30 })}
                defaultValue={userInfo.first_name}
              />
              {errors.first_name && errors.first_name.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>)}
            </div>
          </div>

          <div>
            <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Last name </label>
            <div className="mt-1">
              <input
                type="text"
                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.last_name && 'border-red-500'}`}
                {...register("last_name", { required: i18n.language === 'ar' ? 'يجب ادخال الاسم الأخير' : 'Last name is required', maxLength: 30 })}
                defaultValue={userInfo.last_name}
              />
              {errors.last_name && errors.last_name.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>)}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Email Address </label>
            <div className="mt-1">
              <input
                type="email"
                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.email && 'border-red-500'}`}
                {...register("email", {
                  required: i18n.language === 'ar' ? 'يجب ادخال البريد الإلكتروني' : 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: i18n.language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format',
                  },
                })}
                defaultValue={userInfo.email}
                readOnly
              />
              {errors.email && errors.email.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.email.message}</p>)}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Phone number </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder=""
                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.phone && 'border-red-500'}`}
                {...register("phone", {
                  required: i18n.language === 'ar' ? 'صيغة رقم الهاتف غير صحيحة' : 'Invalid phone number format',
                  validate: validatePhoneNumber,
                })}

                defaultValue={userInfo.phone}
              />
              {errors.phone && errors.phone.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>)}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Birth Date </label>
            <div className="flex mt-1 space-x-3">
              <div className='w-1/3'>
                <SelectInput
                  value={userInfo.birth_day}
                  options={['Day', ...Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0'))]}
                  register={register('birth_day')}
                />
              </div>

              <div className='w-1/3'>
                <SelectInput
                  value={userInfo.birth_month}
                  options={['Month', ...Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))]}
                  register={register('birth_month')}
                />
              </div>
              <div className='w-1/3'>
                <SelectInput
                  value={userInfo.birth_year}
                  options={['Year', ...Array.from({ length: 74 }, (_, i) => String(2023 - i))]}
                  register={register('birth_year')}
                />
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize">Gender</label>
            <div className="mt-1 space-x-4">
              <label htmlFor="Male" className='inline-block text-lg text-gray-900 cursor-pointer'>
                <div className='relative flex items-center py-1 pl-3'>
                  <input
                    type="radio"
                    id="Male"
                    className='hidden peer'
                    value="M"
                    defaultChecked={userInfo.gender === 'M'}
                    {...register('gender')}
                  />
                  <div className='invisible peer-checked:visible absolute left-0 top-1 mt-0.5'>
                    <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                  </div>
                  <div className='visible peer-checked:invisible absolute left-0 top-1 mt-0.5'>
                    <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                  </div>
                  <span className='ml-2 text-base font-medium'>Male</span>
                </div>
              </label>
              <label htmlFor="Female" className='inline-block text-lg text-gray-900 cursor-pointer'>
                <div className='relative flex items-center py-1 pl-3'>
                  <input
                    type="radio"
                    id="Female"
                    className='hidden peer'
                    value="F"
                    defaultChecked={userInfo.gender === 'F'}
                    {...register('gender')}
                  />
                  <div className='invisible peer-checked:visible absolute left-0 top-1 mt-0.5'>
                    <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                  </div>
                  <div className='visible peer-checked:invisible absolute left-0 top-1 mt-0.5'>
                    <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                  </div>
                  <span className='ml-2 text-base font-medium'>Female</span>
                </div>
              </label>
            </div>
          </div>


          <Button
            name="Save Changes"
            type="submit"
          />
        </div>
      </form>
      <button className="mt-3 font-semibold underline" onClick={openPassword}>Change Password</button>

      <Transition appear show={isOpenPassword} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closePassword}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg py-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl px-14 rounded-2xl">
                  <button onClick={closePassword} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                    <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  <h3 className="text-xl font-semibold tracking-wider">Change Password</h3>
                  <div className="mt-3 space-y-2">
                    <div>
                      <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Please Enter Your Current Password </label>
                      <div className="relative mt-1">
                        <input type={passwordShown1 ? "text" : "password"} className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        <button onClick={togglePassword1} className="absolute right-2 top-2.5">
                          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Enter Your New Password </label>
                      <div className="relative mt-1">
                        <input type={passwordShown2 ? "text" : "password"} className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        <button onClick={togglePassword2} className="absolute right-2 top-2.5">
                          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Confirm Your New Password </label>
                      <div className="relative mt-1">
                        <input type={passwordShown3 ? "text" : "password"} className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        <button onClick={togglePassword3} className="absolute right-2 top-2.5">
                          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-center text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={closePassword}>Change Password</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
