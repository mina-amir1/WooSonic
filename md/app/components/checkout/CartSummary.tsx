import { memo } from 'react';
import { useShoppingCart } from "~/stores/cartStore";
import FormatCurrency from "~/utils/FormatCurrency";
import MiniCartItem from "../cart/MiniCartItem";

const CartSummary = ({ thanks, rate }: any) => {
    const { cartItems, totalAPI, totalDiscountAPI, totalPrice } = useShoppingCart();
    console.log('totalPrice', totalPrice)
    const checkoutTotal = totalAPI === 0 ? totalPrice : totalAPI
    const shippingFees = parseFloat(rate);
    const totalSubTotal = checkoutTotal + totalDiscountAPI;
    const totalAmount = checkoutTotal + shippingFees;
    return (
        <div className={`mt-10 ml-0 md:mt-0 md:ml-5 w-full ${thanks ? 'md:w-[500px]' : 'md:w-[380px]'}`}>
            {/* Order summary */}
            <div className={`${thanks ? 'min-w-[500px]' : 'min-w-[380px]'}`}>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 className="pt-6 pl-4 text-lg font-medium text-gray-900 sm:pl-6">
                        Order summary {thanks ? `#${thanks}` : ''}
                    </h2>
                    <ul role="list" className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex px-4 py-6 sm:px-6">
                                <MiniCartItem
                                    id={item.id}
                                    price={item.price}
                                    quantity={item.quantity}
                                    slug={item.slug}
                                    thumbnail={item.thumbnail}
                                    removeFromCart=''
                                />
                            </li>
                        ))}
                    </ul>
                    <dl className="px-4 py-6 space-y-6 border-t border-gray-200 sm:px-6">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm">Subtotal</dt>
                            <dd className="text-sm font-medium text-gray-900"><FormatCurrency value={(totalSubTotal)}/></dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-sm">Shipping</dt>
                            <dd className="text-sm font-medium text-gray-900">{shippingFees !== 0 ? <FormatCurrency value={(shippingFees)}/> : 'Free'}</dd>
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <dt className="text-sm">Taxes</dt>
                            <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                        </div> */}
                        {totalDiscountAPI > 0 ?
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-red-400">Discount</dt>
                                <dd className="text-sm font-medium text-red-400">-<FormatCurrency value={(totalDiscountAPI)}/></dd>
                            </div>
                            :
                            ''
                        }
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <dt className="text-base font-medium">Total</dt>
                            <dd className="text-base font-medium text-gray-900"><FormatCurrency value={(totalAmount)}/></dd>
                        </div>
                        {thanks ?
                            <div>
                                <p>You have earn <strong className="text-green-500">48</strong> Points!</p>
                            </div>
                            : ''}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default memo(CartSummary);