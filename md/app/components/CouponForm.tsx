import { useState } from 'react'
import { useShoppingCart } from '~/stores/cartStore';

export default function CouponForm() {
    const { addCoupon } = useShoppingCart();
    const [couponMsg, setSouponMsg] = useState('');
    const [couponCode, setCouponCode] = useState('');

    const handleCouponApplication = async (event: React.FormEvent) => {
        event.preventDefault();

        if (couponCode.trim() === '') {
            setSouponMsg('Coupon code is required');
            return;
        }

        try {
            const response = await addCoupon(couponCode) as { status: string };
            if (response.status === 'success') {
                setSouponMsg('Coupon applied successfully');
            } else if (response.status === 'failed') {
                setSouponMsg('Coupon application failed');
            } else {
                setSouponMsg('Unknown response status');
            }
        } catch (error) {
            setSouponMsg('Error: ' + error);
        }
    };
    return (

        <form
            action=""
            method="post"
            className="flex flex-wrap w-full"
            onSubmit={handleCouponApplication}
        >
            <div className="flex w-full mt-2 coupon">
                <input
                    type="text"
                    name="coupon_code"
                    className="w-full p-2 border border-gray-300 rounded-l outline-none bg-gray-50"
                    id="coupon_code"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}

                />
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    name="apply_coupon"
                    value="Apply coupon"
                >
                    Apply
                </button>
            </div>
            {couponMsg && (
                <p
                    className={`flex p-2 text-sm rounded-lg w-full mt-2 ${couponMsg.includes('success') ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
                        }`}
                >
                    {couponMsg}
                </p>
            )}
        </form>
    )
}
