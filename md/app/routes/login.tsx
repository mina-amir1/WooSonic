import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Loader from "~/components/Loader";
import { Link, useNavigate } from "@remix-run/react";
import Cookies from "js-cookie";
import { addBulkWishAPI, getWishAPI, userLogin } from "~/utils/account";
import Dots from "~/components/Dots";
import Button from "~/components/Button";
import { Site_Title } from "~/config";
import { ErrorResponse, ProductData } from "types";


type FormData = {
  username: string;
  password: string;
  remember: number;
};

export const meta = () => {
  return {
    title: `Login | ${Site_Title}`
  }
}
export default function login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, setValue, formState: { errors: formErrors } } = useForm();

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  });

  const scrollToFirst = () => {
    setTimeout(() => {
      const element = document.querySelector('.border-red-500') as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      } else {
        const parent = document.querySelector('.login-form') as HTMLElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          const offset = window.pageYOffset + rect.top - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
          const bodyRect = document.body.getBoundingClientRect();
          const offset = window.pageYOffset + bodyRect.top - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    }, 500);
  };
  let localStorageWishlistItems;
  let updatedWishlistItems: number[] = [];
  if (typeof window !== "undefined") {
    localStorageWishlistItems = localStorage.getItem("wishlistItems");
    if (localStorageWishlistItems) {
      const wishlistItems = JSON.parse(localStorageWishlistItems) as ProductData[];
      updatedWishlistItems = wishlistItems.map((item: ProductData) => item.id);
    }
  }
  const addBulkWishList = async () => {
    try {
      const response = await addBulkWishAPI(updatedWishlistItems);
      if ((response as ErrorResponse).status === "error") {
        throw new Error((response as ErrorResponse).msg);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const fetchWishListData = async () => {
    try {
      const response = await getWishAPI();
      setIsLoading(false);
      if ((response as ErrorResponse).status === "error") {
        throw new Error((response as ErrorResponse).msg);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(response));
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
  };

  const handleLoginSuccess = (user_id: number, token: string) => {
    // Store user ID in a cookie
    Cookies.set('user_id', user_id);
    Cookies.set('token', token);
    addBulkWishList();
    fetchWishListData();
    Cookies.set('isCurrentUser', 'true', { expires: new Date(Date.now() + 10 * 60 * 1000) });
    // Redirect to the dashboard or any other authorized page
    navigate('/my-account');
  };

  const onSubmit = (formData: FormData) => {
    const remember = formData.remember ? 1 : 0;
    userLogin(formData)
      .then((responseData: any) => {
        if (responseData.status === 'success' && responseData.msg) {
          if (responseData.msg_code === 'login_error') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: responseData.msg,
            }));
          } else if (responseData.msg_code === 'login_success') {
            console.log('Success Login');
            handleLoginSuccess(responseData.user_id, responseData.token);
          } else {
            scrollToFirst();
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: 'An error occurred.',
            }));
          }
          setIsLoading(false);
        } else if (responseData.ERR === 'ERR_No_Payload') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: 'No payload received.',
          }));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log('Failed to login:', error);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    const user_id = Cookies.get('user_id');
    if (user_id) {
      navigate('/my-account');
      return;
    }
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <section className="p-8 mx-auto">
        <div className="">
          <div className="flex flex-wrap -mx-4 min-w-[525px]">
            <div className="relative w-full px-4">
              {isLoading ? (
                <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                  <Loader />
                </div>
              ) : ('')}

              <div
                className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 sm:px-12"
              >
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-center text-gray-900">{t('common.login')}</h1>
                {errors.general && (
                  <p className="p-2 my-2 text-xs text-red-800 bg-red-100 border border-red-500 rounded">
                    {errors.general}
                  </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                  <div className="mb-5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900 capitalize"
                    >
                      {t("common.login_label")}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="username"
                        placeholder={t("common.login_label") as string}
                        {...register("username", {
                          required: t("fields.username_required")
                        })}
                        className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${formErrors.username && "border-red-500"}`}
                      />
                      {formErrors.username && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.username.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900 capitalize"
                    >
                      {t("common.password")}
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="password"
                        placeholder={t("common.password") as string}
                        {...register("password", {
                          required: t("fields.password_required"),
                          // minLength: {
                          //   value: 5,
                          //   message: t("password_length")
                          // },
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
                  <div className="flex items-center mb-5">
                    <input
                      type="checkbox"
                      id="remember"
                      {...register("remember")}
                      value='1'
                      onChange={(e) => {
                        const value = e.target.checked ? 1 : 0;
                        setValue("remember", value);
                      }}
                      className="mr-2 leading-tight text-primary"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-900">
                      {t("common.remember_me")}
                    </label>
                  </div>

                  <div className="mb-5">
                    <Button name={t("common.sign_in")} width="full" extraclass="mt-5 leading-5" type="submit" />
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
