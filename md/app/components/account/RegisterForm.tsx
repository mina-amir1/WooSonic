import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { userRegister } from '~/utils/account';
import Msg from "~/components/Msg";
import SelectInput from "~/components/SelectInput";
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from "react-icons/ri";
import Button from "~/components/Button";
import Loader from "~/components/Loader";
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import { useNavigate } from '@remix-run/react';


type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    birth_day: string;
    birth_month: string;
    birth_year: string;
    gender: string;
};

export default function RegisterForm() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();

    const [isSend, setIsSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        gender: '',
    });
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        gender: '',
        response: '',
        general: ''
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isValidEmail = (email: any) => {
        const trimmedEmail = email.trim();
        if (trimmedEmail === '') {
            return false;
        }
        const parts = trimmedEmail.split('@');
        if (parts.length !== 2) {
            return false;
        }
        const [localPart, domainPart] = parts;
        if (localPart === '' || domainPart === '') {
            return false;
        }
        if (!domainPart.includes('.')) {
            return false;
        }
        return true;
    };
    const isValidPhoneNumber = (phoneNumber: any) => {
        const digitsOnly = phoneNumber.replace(/\D/g, '');
        return digitsOnly.startsWith('0') && digitsOnly.length === 11;
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     setIsLoading(true);
    //     console.log('handle')
    //     e.preventDefault();
    //     if (validateForm()) {
    //         try {
    //             const response = await register({ formData });
    //             console.log('response', response)
    //             setIsLoading(false);
    //             if (response && response.status === "error") {
    //                 setErrors((prevErrors) => ({
    //                     ...prevErrors,
    //                     response: response.msg,
    //                 }));
    //             } else if (response && response.status === "success") {
    //                 console.log("Password reset email sent successfully");
    //             }
    //         } catch (error) {
    //             setIsLoading(false);
    //             console.log("An error occurred while calling forgotPassword API:", error);
    //         }
    //     } else {
    //         console.log('handle else n')
    //         setTimeout(() => {
    //             setIsLoading(false);
    //         }, 1000);
    //     }
    // };

    const handleRegisterSuccess = (user_id: number, token: string) => {
        // Store user ID in a cookie
        Cookies.set('user_id', user_id);
        Cookies.set('token', token);
        Cookies.set('isNewUser', 'true', { expires: new Date(Date.now() + 10 * 60 * 1000) });

        // Redirect to the dashboard or any other authorized page
        navigate('/my-account');
    };

    const onSubmit = (formData: FormData) => {
        console.log(formData); // Access form data here
        userRegister(formData)
            .then((responseData: any) => {
                // Perform the necessary actions after registration
                if (responseData.status === 'success' && responseData.msg) {
                    handleRegisterSuccess(responseData.user_id, responseData.token);
                } else if (responseData.status === 'error' && responseData.msg_code) {
                    if (responseData.msg_code === 'register_error_email') {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            general: 'Email already exists'
                        }));
                    } else if (responseData.msg_code === 'register_error_phone') {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            general: 'Phone number already exists'
                        }));
                    } else {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            general: 'An error occurred.'
                        }));
                    }
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: 'An error occurred.'
                    }));
                }
                setIsLoading(false);
            })
            .catch((error) => {
                // Handle the registration error
                console.log('Failed to register:', error);
            });
    };


    return (
        <div className="relative"
            key={i18n.language}>
            {isLoading ? (
                <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                    <Loader />
                </div>
            ) : ('')}
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.general && (
                    <p className="p-2 my-2 text-xs text-red-800 bg-red-100 border border-red-500 rounded">
                        {errors.general}
                    </p>
                )}
                <div className="grid grid-cols-2 gap-4 py-4 pb-5 text-left border-b-2 border-gray-200 border-solid lg:max-w-xl">
                    <div>
                        <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.first_name')} </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${formErrors.first_name && 'border-red-500'}`}
                                {...register('first_name', {
                                    required: { value: true, message: t('fields.first_name_required') }
                                })}
                            />
                            {formErrors.first_name && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.first_name.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.last_name')} </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${formErrors.last_name && 'border-red-500'}`}
                                {...register('last_name', {
                                    required: { value: true, message: t('fields.last_name_required') }
                                })}
                            />
                            {formErrors.last_name && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.last_name.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> {t('checkout.email_address')} </label>
                        <div className="mt-1">
                            <input
                                type="email"
                                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${formErrors.email && 'border-red-500'}`}
                                {...register('email', {
                                    required: { value: true, message: t('fields.email_required') }
                                })}
                            />
                            {formErrors.email && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.email.message}</p>
                            )}
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
                            />
                            {formErrors.phone && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Password </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: t("fields.password_required"),
                                    minLength: {
                                        value: 5,
                                        message: t("fields.password_length")
                                    },
                                    // pattern: {
                                    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
                                    //   message: t("password_pattern")
                                    // }
                                })}
                                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${formErrors.password && "border-red-500"}`}
                            />
                            {formErrors.password && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize"> Birth Date </label>
                        <div className="flex mt-1 space-x-3">
                            <div className='w-1/3'>
                                <SelectInput
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
                                    options={[
                                        { label: 'Month', value: '' },
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
                            {errors.birth_day && <div className="error-message">{errors.birth_day}</div>}
                            {errors.birth_month && <div className="error-message">{errors.birth_month}</div>}
                            {errors.birth_year && <div className="error-message">{errors.birth_year}</div>}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="" className="block mb-1 text-sm text-gray-400 capitalize">Gender</label>
                        <div className="mt-1 space-x-4">
                            <label htmlFor="gender_male" className='inline-block text-lg text-gray-900 cursor-pointer'>
                                <div className='relative flex items-center py-1 pl-3'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="gender_male"
                                        value="M"
                                        className='hidden peer'
                                        checked={formData.gender === 'M'}
                                        onChange={handleChange}
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
                                        name="gender"
                                        id="Female"
                                        value="F"
                                        className='hidden peer'
                                        checked={formData.gender === 'F'}
                                        onChange={handleChange}
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
                        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                    </div>

                    <div className="col-span-2">
                        <Button
                            name="Sign Up"
                            width="full"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
