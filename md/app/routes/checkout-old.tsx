
import Datepicker from "react-tailwindcss-datepicker";
import moment from 'moment';
import useShoppingCart from "~/stores/cartStore";
import { getProductBySlug } from "~/api/products";
import { useEffect, useState } from "react";
import PaymentMethod from "~/components/PaymentMethod";
import { Link } from "@remix-run/react";
import { FormatCurrency } from "~/utils/FormatCurrency";
import MiniCartItem from "~/components/cart/MiniCartItem";
import { v4 } from 'uuid';


export default function Checkout() {

    const { closeCart, cartItems, removeFromCart, openCart,isOpen } = useShoppingCart();

    // const {
    //     cartItems,
    //     getItemQuantity,
    // } = useShoppingCart();
    // const [product, setProduct] = useState({});
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //       const product = await getProductBySlug(slug);
    //       setProduct(product);
    //     };
    //     fetchProduct();
    //   }, [slug]);
      
    //   console.log('product>>>>>>>>>>',product)

    const subTotal = 900;
    // const subTotal = cartItems.reduce((total, cartItem) => {
    //     const item = storeItems.find((i) => i.id === cartItem.id);
    //     return total + (item?.price || 0) * cartItem.quantity;
    // }, 0);

    const shippingFees = 10;
    const taxFees = Math.round((subTotal * 14) / 100)
    const grandTotal = subTotal + taxFees + shippingFees


    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    // var currentDate = new Date();
    // var dateTomorrow = Moment().add("days", 1);
    // let today     = Moment();
    return (
        <div className="p-8 mx-auto bg-white">
            <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="pb-10">
                    <h1 className="text-4xl font-semibold">Checkout</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="col-span-2">
                        <div>
                            <h2 className="mb-5 text-lg font-medium text-gray-900">Choose Order Date</h2>
                            <ul className="grid w-full gap-6 md:grid-cols-3">
                                <li>
                                    <input type="radio" id="deliver_today" name="hosting" value="deliver_today" className="hidden peer" required />
                                    <label htmlFor="deliver_today" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Today</div>
                                            <div className="w-full">Within 60min</div>
                                        </div>
                                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="deliver_tomorrow" name="hosting" value="deliver_tomorrow" className="hidden peer" />
                                    <label htmlFor="deliver_tomorrow" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Tomorrow</div>
                                            <div className="w-full">{''}{moment().add(1, 'days').format('DD MMMM YYYY').toString()}</div>
                                        </div>
                                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="deliver_date" name="hosting" value="deliver_date" className="hidden peer" />
                                    <label htmlFor="deliver_date" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Tomorrow</div>
                                            <Datepicker
                                                useRange={false}
                                                asSingle={true}
                                                value={value}
                                                onChange={handleValueChange}
                                            />
                                        </div>
                                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </label>
                                </li>
                            </ul>

                            <div className="pt-5 mt-5 border-t-2">
                                <h2 className="mb-5 text-lg font-medium text-gray-900">Shipping Information</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> First name </label>
                                        <div className="mt-1">
                                            <input type="text" placeholder="" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Last name </label>
                                        <div className="mt-1">
                                            <input type="text" placeholder="" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Phone number </label>
                                        <div className="mt-1">
                                            <input type="text" placeholder="" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Address </label>
                                        <div className="mt-1">
                                            <textarea placeholder="" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> City </label>
                                        <div className="mt-1">
                                            <select className="block w-full py-2 pl-3 pr-20 text-gray-900 border-0 rounded-md form-select ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                                <option value="">Cairo</option>
                                                <option value="">Giza</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> City </label>
                                        <div className="mt-1">
                                            <input type="text" placeholder="Nasr City" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-5 mt-5 border-t-2">
                                <PaymentMethod />
                                <div className="flex items-center pt-3 mt-3 border-t-2">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">I’ve read and accepted all Terms & Conditions</label>
                                </div>
                                <Link to="/thanks" className="block px-3 py-4 mt-4 text-lg text-center text-white uppercase bg-primary-600 rounded-md pointer-events-auto hover:bg-primary-500">Place Order</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 pl-5 sm:col-span-1">
                        <div className="p-5 bg-gray-100">
                            <h2 className="text-xl font-semibold capitalize">Order summary</h2>
                            <div className="">
                            {cartItems.map((item) => (
                                <li key={v4()} className="flex py-6">
                                  <MiniCartItem id={item.id} quantity={item.quantity} color={item.color} size={item.size} slug={item.slug} thumbnail={item.thumbnail} removeFromCart={removeFromCart} />
                                </li>
                              ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between py-3 border-b border-black-300">
                                    <span className="font-light text-gray-600">Subtotal</span>
                                    <span className="text-gray-600">{FormatCurrency(subTotal)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-black-300">
                                    <span className="font-light text-gray-600">Shipping estimate</span>
                                    <span className="text-gray-600">{shippingFees > 0 ? FormatCurrency(shippingFees) : 'Free'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-black-300">
                                    <span className="font-light text-gray-600">Tax estimate</span>
                                    <span className="text-gray-600">{FormatCurrency(taxFees)}</span>
                                </div>
                                <div className="flex justify-between py-5">
                                    <span className="font-bold text-gray-900 font-lg">Order Total</span>
                                    <span className="font-bold text-gray-600">{FormatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
