import { Link } from "@remix-run/react";
import Button from "~/components/Button";
import CartSummary from "~/components/checkout/CartSummary";
import ShippingInfo from "~/components/checkout/ShippingInfo";
import ShippingOptions from "~/components/ShippingOptions";
import TimeSlot from '~/components/TimeSlot';
import { MetaFunction } from "@remix-run/node";
import { API_ENDPOINT, Site_Title } from "~/config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentMethod from "~/components/PaymentMethod";
import Loader from "~/components/Loader";
import { useShoppingCart } from "~/stores/cartStore";
import ThreedsChallengeRedirectComponent from "~/components/payments/ThreedsChallengeRedirectComponent";
import Popup from "~/components/Popup";

export default function Checkout() {
    const { t, i18n } = useTranslation();
    const { cartItems, cartQuantity, resetCart } = useShoppingCart();

    const [stepOne, setStepOne] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [responseCreditCard, setResponseCreditCard] = useState<any>(null);
    const [isOTP, setIsOTP] = useState(false);
    const items = Object.values(cartItems).map((item) => ({
        itemID: item.id,
        qty: item.quantity,
    }));
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        street: '',
        country: 'EG',
        neighborhood: '',
        area: '',
        building_no: '',
        floor_no: '',
        apartment_no: '',
        property_type: 'apartment',
        terms: '',
        shipping_method: 'delivery',
        pick_from_branch: '',
        order_date: '',
        shipping_fee: 0,
        payment_method: 'COD',
        sessionId: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        street: '',
        country: '',
        neighborhood: '',
        area: '',
        building_no: '',
        floor_no: '',
        apartment_no: '',
        property_type: '',
        terms: '',
        order_date: '',
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
    const isValidPhoneNumber = (phoneNumber: any) => {
        const digitsOnly = phoneNumber.replace(/\D/g, '');
        return digitsOnly.startsWith('0') && digitsOnly.length === 11;
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            street: '',
            country: '',
            neighborhood: '',
            area: '',
            building_no: '',
            floor_no: '',
            apartment_no: '',
            property_type: '',
            terms: '',
            pick_from_branch: '',
            order_date: '',
        };

        if (formData.firstName.trim() === '') {
            newErrors.firstName = i18n.language === 'ar' ? 'يجب ادخال الاسم الأول' : 'First name is required';
            isValid = false;
        }

        if (formData.lastName.trim() === '') {
            newErrors.lastName = i18n.language === 'ar' ? 'يجب ادخال اسم العائلة' : 'Last name is required';
            isValid = false;
        }

        if (formData.phoneNumber.trim() === '') {
            newErrors.phoneNumber = i18n.language === 'ar' ? 'يجب ادخال رقم الهاتف' : 'Phone number is required';
            isValid = false;
        } else if (!isValidPhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = i18n.language === 'ar' ? 'صيغة رقم الهاتف غير صحيحة' : 'Invalid phone number format';
            isValid = false;
        }

        if (formData.emailAddress.trim() === '') {
            newErrors.emailAddress = i18n.language === 'ar' ? 'يجب ادخال البريد الإلكتروني' : 'Email address is required';
            isValid = false;
        } else if (!isValidEmail(formData.emailAddress)) {
            newErrors.emailAddress = i18n.language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email address format';
            isValid = false;
        }
        if (formData.order_date.trim() === '') {
            newErrors.order_date = i18n.language === 'ar' ? 'يجب ادخال تاريخ التوصيل' : 'Order Date is required';
            isValid = false;
        }
        if (formData.shipping_method === 'delivery') {
            if (formData.street.trim() === '') {
                newErrors.street = i18n.language === 'ar' ? 'يجب ادخال اسم الشارع' : 'Street is required';
                isValid = false;
            }
            if (formData.country.trim() === '') {
                newErrors.country = i18n.language === 'ar' ? 'يجب ادخال المدينة' : 'country is required';
                isValid = false;
            }
            if (formData.neighborhood.trim() === '') {
                newErrors.neighborhood = i18n.language === 'ar' ? 'يجب ادخال الحي' : 'Neighborhood is required';
                isValid = false;
            }
            if (formData.area.trim() === '') {
                newErrors.area = i18n.language === 'ar' ? 'يجب ادخال المنطقة' : 'Area is required';
                isValid = false;
            }
            if (formData.building_no.trim() === '') {
                newErrors.building_no = i18n.language === 'ar' ? 'يجب ادخال رقم المبنى' : 'Building No. is required';
                isValid = false;
            }
            if (formData.floor_no.trim() === '') {
                newErrors.floor_no = i18n.language === 'ar' ? 'يجب ادخال رقم الطابق' : 'Floor is required';
                isValid = false;
            }
            if (formData.apartment_no.trim() === '') {
                newErrors.apartment_no = i18n.language === 'ar' ? 'يجب ادخال رقم الشقة' : 'Apartment is required';
                isValid = false;
            }
        } else {
            if (formData.pick_from_branch.trim() === '') {
                newErrors.pick_from_branch = i18n.language === 'ar' ? 'يجب اختيار الفرع' : 'Choose Branch is required';
                isValid = false;
            }
        }
        if (!formData.terms && !stepOne) {
            newErrors.terms = 'Please accept the Terms & Conditions';
            isValid = false;
        }
        setErrors(newErrors);
        scrollToFirst();
        console.log('calling validateForm');
        return isValid;
    };

    const handleChange = (e: any, inputType: string) => {
        let value = e.target.value;

        if (inputType === 'checkbox') {
            value = e.target.checked;
        }

        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: value,
        }));
    };


    const handleSubmit = async (e: any) => {
        e && e.preventDefault();
        setIsLoading(true);
        const apiUrl = `${API_ENDPOINT}/checkout.php`;
        const requestBody = {
            billing:
            {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.emailAddress,
                phone: formData.phoneNumber,
                address_1: formData.street,
                area: formData.area,
                gov: formData.neighborhood,
                country: formData.country,
                building_no: formData.building_no,
                floor_no: formData.floor_no,
                apartment_no: formData.apartment_no,
                property_type: formData.property_type,
                shipping_method: formData.shipping_method,
            },
            items,
            shipping: {
                rate: formData.shipping_fee
            },
            // coupon_code: 'mitchcoupon',
            order: {
                customerID: 0
            },

        };
        if (formData.payment_method === 'COD') {
            requestBody.payment = {
                method: 'COD',
                orderData: {
                    amount: 150,
                    currency: 'EGP',
                },
            };
        } else if (formData.payment_method === 'CC') {
            requestBody.payment = {
                method: 'CC',
                orderData: {
                    amount: 150,
                    currency: 'EGP',
                },
                sessionID: formData.sessionId,
            };
        }
        if (validateForm()) {
            try {
                setIsLoading(true);
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    const responseData: any = await response.json();
                    console.log('responseData', responseData)
                    console.log('API call successful');
                    if (responseData.status === 'success' && responseData.code === '200') {
                        const orderID = responseData.order_id;
                        console.log('API 200');
                        const thanksURL = `/thanks?orderID=${orderID}`;
                        setTimeout(() => {
                            resetCart();
                            window.location.href = thanksURL;
                        }, 2000);
                    } else if (responseData.status === 'success' && responseData.hasOwnProperty('html')) {
                        setIsOTP(true);
                        setResponseCreditCard(responseData);
                    } else {
                        console.log('API call failed');
                    }
                } else {
                    console.log('API call failed');
                }
            } catch (error) {
                console.log('An error occurred', error);
            }
        } else {
            console.log('Form is invalid');
            console.log('formData >> ', formData);
            // setIsLoading(false);
        }
    };

    const scrollToFirst = () => {
        setTimeout(() => {
            const element = document.querySelector('.border-red-500') as HTMLElement;
            if (element) {
                const rect = element.getBoundingClientRect();
                const offset = window.pageYOffset + rect.top - 100;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            } else {
                const parent = document.querySelector('.checkout-form') as HTMLElement;
                const rect = parent.getBoundingClientRect();
                const offset = window.pageYOffset + rect.top - 100;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }, 500);
    }
    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (!stepOne && !formData.terms) {
                console.log('Terms not accepted');
                setIsLoading(false);
                return;
            }

            const isValid = validateForm();

            if (isValid) {
                setStepOne(false);
            } else {
                console.log('Form is invalid');
            }
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        setTimeout(() => {
            console.log('EFfext set load')
            setIsLoading(false);
            console.log('data', formData)
        }, 1000);
    }, []);
    return (
        <div className="p-8 mx-auto bg-white">
            <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="pb-10">
                    <h1 className="text-4xl font-semibold">{t('checkout.checkout')}</h1>
                </div>
                <div className="relative">
                    {cartItems?.length > 0 ? (
                        <>
                            <nav className="flex justify-center mb-5">
                                <ol role="list" className="flex flex-wrap items-center text-gray-400 gap-y-2 gap-x-2 sm:gap-y-0">
                                    <li>
                                        <div className="-m-1">
                                            <Link to="/cart" className="flex items-center p-1 leading-3">
                                                Cart
                                                <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-sm font-bold text-white bg-gray-500 rounded-full">{cartQuantity}</span>
                                            </Link>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                            <div className="-m-1">
                                                <span className={`p-1 ml-2 cursor-pointer ${stepOne ? 'font-semibold text-gray-700' : ''}`} onClick={() => setStepOne(true)}> Order Details </span>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                            <div className="-m-1">
                                                <span className={`p-1 ml-2 cursor-pointer ${!stepOne ? 'font-semibold text-gray-700' : ''}`} onClick={handleClick}> Payment Method </span>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <div className="flex flex-col-reverse items-start md:flex-row">
                                <div className="relative w-full max-w-4xl p-4 bg-white border rounded-md">
                                    <form onSubmit={handleSubmit} className="checkout-form">
                                        {stepOne ?
                                            <div className="relative step-one">
                                                {isLoading ? (
                                                    <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                                                        <Loader />
                                                    </div>
                                                ) : ('')}
                                                <h2 className="mb-5 text-lg font-medium text-gray-900">{t('checkout.shipping_information')}</h2>

                                                <ShippingInfo formData={formData} handleChange={handleChange} errors={errors} />

                                                <h2 className="pt-5 mt-5 mb-5 text-lg font-medium text-gray-900 border-t-2">{t('checkout.choose_order_date')}</h2>
                                                <TimeSlot formData={formData} handleChange={handleChange} errors={errors} />

                                                <h2 className="pt-5 mt-5 mb-5 text-lg font-medium text-gray-900 border-t-2">{t('checkout.shipping_method')}</h2>
                                                <ShippingOptions formData={formData} handleChange={handleChange} errors={errors} />
                                                <Button
                                                    name={t('common.next_step')}
                                                    width="full"
                                                    extraclass="mt-5 leading-5"
                                                    onClick={handleClick}
                                                />
                                            </div>
                                            :
                                            <div className="step-two">
                                                {isOTP && (
                                                    <Popup isOpen={isOTP}>
                                                        <ThreedsChallengeRedirectComponent response={responseCreditCard} />
                                                    </Popup>
                                                )}
                                                <PaymentMethod formData={formData} handleChange={handleChange} errors={errors} handleSubmit={handleSubmit} />
                                                <div className="flex items-center pt-3 mt-3 border-t-2">
                                                    <input
                                                        id="default-checkbox"
                                                        type="checkbox"
                                                        value={formData.terms}
                                                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded ${errors.terms && 'border-red-500'}`}
                                                        name="terms"
                                                        onChange={(e) => handleChange(e, 'checkbox')}

                                                    />
                                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">{t('checkout.terms')}</label>
                                                </div>
                                                {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
                                                <Button
                                                    name={t('common.submit')}
                                                    width="full"
                                                    extraclass="mt-5 leading-5"
                                                    type="submit"
                                                />
                                            </div>
                                        }

                                    </form>
                                </div>
                                <CartSummary rate={formData.shipping_fee} />
                            </div>
                        </>
                    ) : (
                        <div className='flex mt-auto items-center justify-center min-h-[400px] flex-col'>
                            <p className="text-lg text-slate-500">Your cart is currently empty.</p>
                            <Link to='/products' className="inline-flex justify-center px-4 py-2 mt-5 text-sm font-semibold text-white capitalize rounded-lg bg-slate-900 hover:bg-slate-700">continue shopping</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export const meta: MetaFunction = () => {
    return {
        title: `Checkout - ${Site_Title}`
    }
}