import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ProfileLoader from "~/components/account/ProfileLoader";
import Cookies from "js-cookie";
import { useNavigate } from "@remix-run/react";
import { fetchUserInfo, updateProfile } from "~/utils/account";
import SelectInput from "~/components/SelectInput";
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from "react-icons/ri";
import Msg from "~/components/Msg";
import Button from "~/components/Button";


interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  gender: string;
}
interface UserInfoResponse {
  status: string;
  msg: string;
  // Add other properties here as needed
}
export default function ProfileForm() {
  const { t, i18n } = useTranslation();
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserInfo>({
    defaultValues: userInfo as UserInfo,
  })

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      navigate('/login');
      return;
    }
    setUserId(user_id);
    const getUserInfo = async () => {
      setIsLoading(true);
      const response = await fetchUserInfo();
      if ((response as UserInfoResponse)?.status === 'error') {
        setErrorMessage((response as UserInfoResponse).msg);
      } else if ((response as UserInfoResponse)?.status === 'success') {
        setMessage('Profile updated successfully');
      } else if (!(response as UserInfoResponse)?.status) {
        setUserInfo(response as UserInfo);
        //   setValues();
      } else {
        setErrorMessage('An error occurred while fetching user orders.');
      }
      setIsLoading(false);
    };
    getUserInfo();
  }, []);


  const onSubmit: SubmitHandler<UserInfo> = async (data: UserInfo) => {
    try {
      setIsLoading(true);
      const updatedUserInfo = await updateProfile(data);
      setIsLoading(false);
      setMessage('Profile updated successfully');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (updatedUserInfo !== undefined) {
        setUserInfo(updatedUserInfo as UserInfo);
      } else {
        // Handle the case when updatedUserInfo is undefined
      }
    } catch (error) {
      setIsLoading(false);
      // Handle the case when updating user information fails
    }
  };

  return (
    <div>
      {message && <Msg color="green" message={message} />}
      <div className="relative">
        {isLoading && (
          <ProfileLoader />
        )}
        {(!isLoading || !userInfo) && (
          errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 py-4 pb-5 border-b-2 border-gray-200 border-solid lg:max-w-xl">
                <div>
                  <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize">{t('checkout.first_name')}</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.first_name ? 'border-red-500' : ''}`}
                      {...register('first_name', {
                        required: { value: true, message: t('fields.first_name_required') }
                      })}
                      defaultValue={userInfo.first_name}
                    />
                    {errors.first_name && errors.first_name.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>)}
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.last_name')} </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.last_name && 'border-red-500'}`}
                      {...register('last_name', {
                        required: { value: true, message: t('fields.last_name_required') }
                      })}
                      defaultValue={userInfo.last_name}
                    />
                    {errors.last_name && errors.last_name.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>)}
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.email_address')} </label>
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
                  <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.phone_number')} </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder=""
                      className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.phone && 'border-red-500'}`}
                      {...register('phone', {
                        required: { value: true, message: t('fields.phone_required') }
                      })}
                      defaultValue={userInfo.phone}
                    />
                    {errors.phone && errors.phone.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>)}
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.birth_date')} </label>
                  <div className="flex mt-1 space-x-3">
                    <div className='w-1/3'>
                      <SelectInput
                        value={userInfo.birth_day}
                        options={[
                          { label: 'Day', value: '' }, // Add an empty option as the default
                          ...Array.from({ length: 31 }, (_, index) => ({
                            label: (index + 1).toString().padStart(2, '0'),
                            value: (index + 1).toString().padStart(2, '0'),
                          })),
                        ]}
                        register={register('birth_day')}
                      />
                    </div>

                    <div className='w-1/3'>
                      <SelectInput
                        value={userInfo.birth_month}
                        options={[
                          { label: 'Month', value: '' }, // Add an empty option as the default
                          ...Array.from({ length: 12 }, (_, i) => ({
                            label: String(i + 1).padStart(2, '0'),
                            value: String(i + 1).padStart(2, '0'),
                          })),
                        ]}
                        register={register('birth_month')}
                      />
                    </div>
                    <div className='w-1/3'>

                      <SelectInput
                        value={userInfo.birth_year}
                        options={[
                          { label: 'Year', value: '' }, // Add an empty option as the default
                          ...Array.from({ length: 74 }, (_, i) => ({
                            label: String(2023 - i),
                            value: String(2023 - i),
                          })),
                        ]}
                        register={register('birth_year')}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize">{t('checkout.gender')}</label>
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
                        <span className='ml-2 text-base font-medium'>{t('checkout.gender_m')}</span>
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
                        <span className='ml-2 text-base font-medium'>{t('checkout.gender_f')}</span>
                      </div>
                    </label>
                  </div>
                </div>


                <Button
                  name={t('common.save_changes')}
                  type="submit"
                />
              </div>
            </form>
          ))}
      </div>
    </div>
  )
}
