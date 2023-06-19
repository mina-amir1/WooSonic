import { useState } from 'react';
import { useForm } from 'react-hook-form';
import EyeIcon from '~/components/icons/EyeIcon';
import { updatePassword } from '~/utils/account';
import Msg from "~/components/Msg";
import { useTranslation } from 'react-i18next';


interface PasswordResponse {
    status: string;
    msg: string;
}
export default function ChangePassword({ closePassword }: any) {
    const { t, i18n } = useTranslation();
    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [passwordShown3, setPasswordShown3] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const togglePassword1 = () => {
        setPasswordShown1(!passwordShown1);
    };

    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
    };

    const togglePassword3 = () => {
        setPasswordShown3(!passwordShown3);
    };
    const handleChangePassword = async (data: any) => {
        const { currentPassword, newPassword, confirmPassword } = data;
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password don't match");
            return;
        }
        if (newPassword === currentPassword) {
            setErrorMessage("New password can't be current password");
            return;
        }
        // Call the updatePassword function with the necessary data
        const response = await updatePassword(currentPassword, newPassword);

        if (response && (response as PasswordResponse).status === 'success') {
            console.log('Password updated successfully');
            reset();
            closePassword();
        } else if (response && (response as PasswordResponse).status === 'error') {
            const errorMessage = (response as PasswordResponse).msg;
            setErrorMessage(errorMessage);
            console.log('Authentication failed');
        } else {
            console.log('Password update failed');
        }
    };



    return (
        <div>
            <h3 className="text-xl font-semibold tracking-wider">{t('common.change_password')}</h3>
            <div className="mt-3">
                <form onSubmit={handleSubmit(handleChangePassword)}>
                    <div className='space-y-2'>
                        {errorMessage && <Msg color="red" message={errorMessage} />}
                        <div>
                            <label htmlFor="currentPassword" className="block mb-1 text-sm text-gray-400 capitalize">
                                {t('common.enterCurrentPassword')}
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type={passwordShown1 ? 'text' : 'password'}
                                    className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.currentPassword && "border-red-500"}`}
                                    id="currentPassword"
                                    {...register('currentPassword', { required: true })}
                                />
                                <span onClick={togglePassword1} className="absolute right-2 top-2.5 cursor-pointer">
                                    <EyeIcon />
                                </span>
                            </div>
                            {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{t('common.currentPasswordRequired')}</p>}
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block mb-1 text-sm text-gray-400 capitalize">
                                {t('common.enterNewPassword')}
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type={passwordShown2 ? 'text' : 'password'}
                                    className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.newPassword && "border-red-500"}`}
                                    id="newPassword"
                                    {...register("newPassword", {
                                        required: t("fields.password_required"),
                                        minLength: {
                                          value: 5,
                                          message: t("fields.password_length")
                                        },
                                        pattern: {
                                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
                                          message: t("fields.password_pattern")
                                        }
                                      })}
                                />
                                <span onClick={togglePassword2} className="absolute right-2 top-2.5 cursor-pointer">
                                    <EyeIcon />
                                </span>
                            </div>
                            {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword?.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-1 text-sm text-gray-400 capitalize">
                                {t('common.confirmNewPassword')}
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type={passwordShown3 ? 'text' : 'password'}
                                    className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.confirmPassword && "border-red-500"}`}
                                    id="confirmPassword"
                                    {...register('confirmPassword', { required: true })}
                                />
                                <span onClick={togglePassword3} className="absolute right-2 top-2.5 cursor-pointer">
                                    <EyeIcon />
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{t('common.confirmPasswordRequired')}</p>}
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-center text-white rounded-lg bg-slate-900 hover:bg-slate-700"
                        >
                            {t('common.change_password')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
