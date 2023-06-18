
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "~/components/Button";
import { forgotPassword } from "~/utils/account";

type ForgotPasswordResponse = {
    status: string;
    msg: string;
    reset_key?: string;
};

export default function ForgotForm() {
    const { t, i18n } = useTranslation();
    const [isSend, setIsSend] = useState(false);
    const [formData, setFormData] = useState({
        emailAddress: ''
    });
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const [errors, setErrors] = useState({
        emailAddress: ''
    });
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
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            emailAddress: '',
        }
        if (formData.emailAddress.trim() === '') {
            newErrors.emailAddress = i18n.language === 'ar' ? 'يجب ادخال البريد الإلكتروني' : 'Email address is required';
            isValid = false;
        } else if (!isValidEmail(formData.emailAddress)) {
            newErrors.emailAddress = i18n.language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email address format';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await forgotPassword(formData.emailAddress) as ForgotPasswordResponse;
                if (response && response.status === "error") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        emailAddress: response.msg,
                    }));
                } else if (response && response.status === "success") {
                    console.log("Password reset email sent successfully");
                    console.log("Reset Key:", response.reset_key);
                    setIsSend(true);
                }
            } catch (error) {
                console.log("An error occurred while calling forgotPassword API:", error);
            }
        }
    };

    return (
        <div>
            {isSend ?
                <p className="text-base text-gray-900">An email has been sent. Please click the link when you get it</p>
                :
                <form onSubmit={handleSubmit}>
                    <p className="mb-3 text-base text-left text-gray-400">Please enter your email</p>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                            className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.emailAddress && 'border-red-500'}`}
                        />
                        {errors.emailAddress && <p className="mt-1 text-xs text-red-500">{errors.emailAddress}</p>}
                    </div>
                    <div className="mb-10">
                        <Button
                            name={t('common.forgot_btn')}
                            width="full"
                            extraclass="mt-5 leading-5"
                            type="submit"
                        />
                    </div>
                </form>
            }
        </div>
    )
}
