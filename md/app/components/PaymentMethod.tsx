
import { useState } from "react";
import { RiRadioButtonLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import PaymentForm from "./PaymentForm";


export default function PaymentMethod({ formData, handleChange, errors,handleSubmit }: any) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
        handleChange(event);
    };

    return (
        <>
            <h3 className='mb-2 text-lg font-medium text-gray-900'>
                Payment Method
            </h3>
            <ul className=''>
                <li className='py-2'>
                    <label htmlFor="Credit_Card" className='block text-gray-900 peer-checked:text-blue-600'>
                        <div className="relative flex flex-col py-1 pl-3">
                            <input
                                type="radio"
                                name="payment_method"
                                id="Credit_Card"
                                className="hidden peer"
                                value="CC"
                                checked={selectedPaymentMethod === "CC"}
                                onChange={handlePaymentMethodChange}
                            />
                            <div className='invisible peer-checked:visible absolute left-0 top-1 mt-0.5'>
                                <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                            </div>
                            <div className='visible peer-checked:invisible absolute left-0 top-1 mt-0.5'>
                                <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                            </div>
                            <span className='block ml-2 text-sm font-medium'>Credit Card</span>
                            <div className="grid h-0 grid-cols-2 gap-4 overflow-hidden peer-checked:h-auto peer-checked:p-2">

                                <PaymentForm handleChange={handleChange}  handleSubmit={handleSubmit}/>
                                <div className="hidden">
                                    <div className="col-span-2 ok">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Card number </label>
                                        <div className="mt-1">
                                            <input type="text" name="" id="" placeholder="XXXX XXXX XXXX XXXX" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Name on the card </label>
                                        <div className="mt-1">
                                            <input type="text" name="" id="" placeholder="ex: John Doe" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Expiry date </label>
                                        <div className="mt-1">
                                            <input type="text" name="" id="" placeholder="MM/YYYY" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> CSV </label>
                                        <div className="mt-1">
                                            <input type="text" name="" id="" placeholder="XXX" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                </li>
                <li className='py-2 border-t-2 border-dashed'>
                    <label htmlFor="Cash" className='block text-gray-900 peer-checked:text-blue-600'>
                        <div className='relative flex items-center py-1 pl-3'>
                            <input
                                type="radio"
                                name="payment_method"
                                id="Cash"
                                className="hidden peer"
                                value="COD"
                                checked={selectedPaymentMethod === "COD"}
                                onChange={handlePaymentMethodChange}
                            />
                            <div className='invisible peer-checked:visible absolute left-0 top-1 mt-0.5'>
                                <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                            </div>
                            <div className='visible peer-checked:invisible absolute left-0 top-1 mt-0.5'>
                                <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                            </div>
                            <span className='ml-2 text-sm font-medium'>Cash on delivery</span>
                        </div>
                    </label>
                </li>
            </ul>
        </>
    )
}