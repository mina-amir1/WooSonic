import { Link } from "@remix-run/react";
import { t } from "i18next";
import Dots from "~/components/Dots";
import Button from "~/components/Button";
export default function LoginForm({ formData, handleChange, errors, handleSubmit }: any) {
    return (
        <div
            className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 sm:px-12 md:px-[60px]"
        >
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-center text-gray-900">{t('common.login')}</h1>
            {errors.general && <p className="p-2 my-2 text-xs text-red-800 bg-red-100 border border-red-500 rounded">{errors.general}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-5">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                        {t('common.login_label')}
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder={t('common.login_label') as string}
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.username && 'border-red-500'}`}
                        />
                        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                        {t('common.password')}
                    </label>
                    <div className="mt-1">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={t('common.password') as string}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.password && 'border-red-500'}`}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>
                </div>
                <div className="mb-5">
                    <Button
                        name={t('common.sign_in')}
                        width="full"
                        extraclass="mt-5 leading-5"
                        type="submit"
                    />
                </div>
            </form>
            <p className="mb-6 text-base text-center text-gray-400">Connect With</p>
            <ul className="flex justify-between mb-12 -mx-2">
                <li className="w-full px-2">
                    <a
                        href="#"
                        className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90"
                    >
                        <img src="/images/fb.svg" />
                    </a>
                </li>
                <li className="w-full px-2">
                    <a
                        href="#"
                        className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90"
                    >
                        <img src="/images/tw.svg" />
                    </a>
                </li>
                <li className="w-full px-2">
                    <a
                        href="#"
                        className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90"
                    >
                        <img src="/images/tw.svg" />
                    </a>
                </li>
            </ul>
            <Link
                to="/forgot"
                className="inline-block mb-2 text-base text-gray-400 hover:text-primary hover:underline"
            >
                Forget Password?
            </Link>
            <p className="text-base text-gray-400">
                Not a member yet? <Link to="/signup" className="text-primary hover:underline" > Sign Up </Link>
            </p>
            <Dots />
        </div>
    )
}
