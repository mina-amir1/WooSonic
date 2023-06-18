import TrackingSteps from "~/components/TrackingSteps";
import ExtraProducts from "~/components/ExtraProducts";
import CartSummary from "~/components/checkout/CartSummary"
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getOrderInfo } from "~/api/common";

type OrderStatus = "processing" | "fulfilled" | "delivered" | "pending" | "on-hold" | "completed" | "cancelled" | "refunded" | "failed" | "checkout-draft";


export default function ThanksComponent({ orderID }: any) {
    const [orderData, setOrderData] = useState<any>({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrderInfo(orderID);
            setOrderData(result);
        };
        fetchData();
    }, [orderID]);
    console.log('orderData', orderData)
    const status: OrderStatus = orderData?.order?.status || "pending";
    const statusToStepMap: Record<OrderStatus, { step: number; message: string }> = {
        pending: { step: 1, message: "Your order is pending." },
        processing: { step: 1, message: "Your order is being processed." },
        fulfilled: { step: 2, message: "Your order has been fulfilled successfully." },
        delivered: { step: 3, message: "Your order has been delivered." },
        "on-hold": { step: 1, message: "Your order is on hold." },
        completed: { step: 4, message: "Your order has been completed." },
        cancelled: { step: -1, message: "Your order has been cancelled." },
        refunded: { step: 5, message: "Your order has been refunded." },
        failed: { step: 6, message: "Your order has been failed." },
        "checkout-draft": { step: 7, message: "Your order has been draft." },
    };
    const { step, message } = statusToStepMap[status] || { step: 0, message: "" };

    return (
        <div>
            <div className="container px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:px-8">
                <div className="mb-5">
                    <h1 className="mb-2 text-4xl font-semibold tracking-wide uppercase text-primary-600">Thank you!</h1>
                    <h3 className="text-base font-semibold tracking-wide text-gray-900">{message}</h3>
                    <p className="mt-2 text-base text-gray-500 max-w-[500px]">If you have questions about your order, you can email us at info@comapny.com or call us at 16689</p>
                </div>
                <div className="mb-10">
                    <TrackingSteps step={step} />
                </div>
                <div className="flex flex-col-reverse items-start md:flex-row ">
                    <div className="w-full mx-auto">

                        <div className="border border-gray-200 bg-gray-50">
                            <div className="px-10 py-10">
                                <h2 className="text-xl font-medium text-gray-900">Customer Details</h2>
                                <dl className="py-5 text-sm">
                                    <dd className="mt-2 text-gray-700">
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-500">First Name</label>
                                            <span className="block text-base font-bold">Ahmed Khaled</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-500">Last Name</label>
                                            <span className="block text-base font-bold">Ahmed Khaled</span>
                                        </div>
                                        <div className="block mb-2">
                                            <label className="text-sm text-gray-500">E-mail</label>
                                            <span className="block text-base font-bold">AhmedKhaled@gamail.com</span>
                                        </div>
                                        <div className="block mb-2">
                                            <label className="text-sm text-gray-500">Phone Number</label>
                                            <span className="block text-base font-bold">012764326754</span>
                                        </div>
                                    </dd>
                                </dl>
                                <h2 className="pt-10 text-xl font-medium text-gray-900 border-t border-gray-200">Shipping Details</h2>
                                <dl className="py-5 text-sm">
                                    <dd className="mt-2 space-y-2 text-gray-700">
                                        <div className="block w-1/3 mb-2">
                                            <label className="text-sm text-gray-500">Delivery Expected</label>
                                            <span className="block text-base font-bold">23rd March 2023</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-500">City</label>
                                            <span className="block text-base font-bold">Cairo</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-500">Neighborhood</label>
                                            <span className="block text-base font-bold">Heliopolis</span>
                                        </div>
                                        <div className="inline-block w-1/3 mb-2">
                                            <label className="text-sm text-gray-500">Area</label>
                                            <span className="block text-base font-bold">Korba</span>
                                        </div>
                                        <div className="block mb-2">
                                            <label className="text-sm text-gray-500">Property number and street</label>
                                            <span className="block text-base font-bold">Street 9, Building No. 4</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-500">Floor</label>
                                            <span className="block text-base font-bold">9</span>
                                        </div>
                                        <div className="inline-block w-1/2 mb-2">
                                            <label className="text-sm text-gray-500">Flat</label>
                                            <span className="block text-base font-bold">94</span>
                                        </div>
                                    </dd>
                                </dl>
                                <div className="pt-10 border-t border-gray-200">
                                    <Link to="/my-account/orders/single" className="inline-block px-4 py-2 text-sm font-semibold text-center text-white rounded-lg whitespace-nowrap bg-slate-900 hover:bg-slate-700">Order Details</Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-100">
                            <div className="flex p-10">
                                <div className="flex flex-col">
                                    <h3 className="text-[#CA4323] text-2xl font-bold mb-1">Congratulations!</h3>
                                    <p className="text-sm font-semibold leading-6 text-gray-800">
                                        You’ve earned
                                        <strong>5768 rewards points </strong>
                                        for your purchase today, and these points will be credited to your account immediately.
                                    </p>
                                </div>
                                <div className="w-1/5">
                                    <img src="/images/thanks_gift.png" alt="img alt" />
                                </div>
                            </div>
                            <div className="p-10 border-t border-gray-300">
                                <p className="text-xs font-semibold text-gray-400">Enter a password below to create a Nine Crimes account. Keep track of orders, add products to your wishlist, and have exclusive access to promotions all the time.</p>
                                <form id="create_account" action="#" method="post">
                                    <div className="form">
                                        <input id="account_password" type="password" name="password" required />
                                        <button type="submit" className="button_form">Create Account</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <CartSummary thanks={orderID} />
                </div>
                <ExtraProducts categorySlug="food" count={5} title="Shop More" />

            </div>
        </div>
    )
}
