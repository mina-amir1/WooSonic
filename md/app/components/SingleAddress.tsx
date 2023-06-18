import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RiRadioButtonLine, RiCheckboxBlankCircleLine } from "react-icons/ri";

export default function SingleAddress({ name }: any) {
    let [isOpenAdress, setIsOpenAdress] = useState(false)

    function closeModal() {
        setIsOpenAdress(false)
    }

    function openModal() {
        setIsOpenAdress(true)
    }
    return (
        <div className="bg-[#FBF6E9] relative py-5 px-4 space-y-2 border-[#FFE0BE] border-2">
            <div className="mb-1 text-base font-semibold">{name}</div>
            <div className="inline-block mr-5">
                <label className="text-[#6C757D] text-xs">City</label>
                <span className="block text-sm font-bold">Cairo </span>
            </div>
            <div className="inline-block">
                <label className="text-[#6C757D] text-xs">Area</label>
                <span className="block text-sm font-bold">New Cairo </span>
            </div>
            <div className="block">
                <label className="text-[#6C757D] text-xs">Street & Building No.</label>
                <span className="block text-sm font-bold">894 Selmer Lodge Suite 482</span>
            </div>
            <div className="inline-block mr-5">
                <label className="text-[#6C757D] text-xs">Floor</label>
                <span className="block text-sm font-bold">4</span>
            </div>
            <div className="inline-block">
                <label className="text-[#6C757D] text-xs">Apartment</label>
                <span className="block text-sm font-bold">46</span>
            </div>

            <Transition appear show={isOpenAdress} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <button onClick={closeModal} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                                        <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    <h3 className="mb-3">Edit Address</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="countries" className="block mb-1 text-xs text-gray-400 ">City</label>
                                            <select id="countries" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50">
                                                <option>Cairo</option>
                                                <option>Alexandria</option>
                                                <option>Giza</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="area" className="block mb-1 text-xs text-gray-400">Area</label>
                                            <select id="area" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50">
                                                <option>New Cairo</option>
                                                <option>Alexandria</option>
                                                <option>Giza</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="street" className="block mb-1 text-xs text-gray-400">Street & Building No.</label>
                                            <input type="text" id="street" placeholder="22 street name" className="w-full p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50" />
                                        </div>

                                        <div>
                                            <label htmlFor="street" className="block mb-1 text-xs text-gray-400">Apartment Type</label>
                                            <div className="space-x-5">
                                                <label htmlFor="Flat" className='inline-block text-gray-900 peer-checked:text-blue-600'>
                                                    <div className='relative flex items-center py-1 pl-3'>
                                                        <input type="radio" name="apartment_type" id="Flat" className='hidden peer' />
                                                        <div className='absolute left-0 invisible mt-1 peer-checked:visible top-1'>
                                                            <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                                                        </div>
                                                        <div className='absolute left-0 visible mt-1 peer-checked:invisible top-1'>
                                                            <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                                                        </div>
                                                        <span className='ml-2 text-base font-medium'>Flat</span>
                                                    </div>
                                                </label>
                                                <label htmlFor="Villa" className='inline-block text-gray-900 peer-checked:text-blue-600'>
                                                    <div className='relative flex items-center py-1 pl-3'>
                                                        <input type="radio" name="apartment_type" id="Villa" className='hidden peer' />
                                                        <div className='absolute left-0 invisible mt-1 peer-checked:visible top-1'>
                                                            <RiRadioButtonLine className='peer-checked:bg-gray-700' />
                                                        </div>
                                                        <div className='absolute left-0 visible mt-1 peer-checked:invisible top-1'>
                                                            <RiCheckboxBlankCircleLine className='peer-checked:bg-gray-700' />
                                                        </div>
                                                        <span className='ml-2 text-base font-medium'>Villa</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="space-x-5">
                                            <div className="inline-block">
                                                <label htmlFor="floor" className="block mb-1 text-xs text-gray-400">Floor</label>
                                                <input type="text" id="floor" placeholder="3" className="w-20 p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50" />
                                            </div>
                                            <div className="inline-block">
                                                <label htmlFor="Apartment" className="block mb-1 text-xs text-gray-400">Apartment</label>
                                                <input type="text" id="Apartment" placeholder="33" className="w-20 p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50" />
                                            </div>
                                        </div>
                                        <button className="inline-flex justify-center w-full px-3 py-4 text-sm font-semibold text-center text-white rounded-md bg-slate-900 hover:bg-slate-700" onClick={closeModal}>Edit Address</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <span className="absolute cursor-pointer top-3 right-3">
                <Menu as="div" className="relative">
                    <Menu.Button>
                        <svg width="23" height="5" viewBox="0 0 23 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="black" />
                            <circle cx="11.5" cy="2.5" r="2.5" transform="rotate(-90 11.5 2.5)" fill="black" />
                            <circle cx="20.5" cy="2.5" r="2.5" transform="rotate(-90 20.5 2.5)" fill="black" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 text-black origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg whitespace-nowrap">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                    onClick={openModal}
                                        className={`${active && 'bg-blue-500'} block pl-3 pr-7 py-2`}
                                    >
                                        Edit Address
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active && 'bg-blue-500'} block pl-3 pr-7 py-2`}
                                    >
                                        Make Default
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active && 'bg-blue-500'} block pl-3 pr-7 py-2 text-red-500`}
                                    >
                                        Remove
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </span>
        </div>
    )
}
