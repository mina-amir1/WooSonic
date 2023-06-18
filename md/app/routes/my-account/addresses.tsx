import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SingleAddress from "~/components/SingleAddress";
import { RiRadioButtonLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { Site_Title } from "~/config";

export const meta = () => {
  return {
    title: `My Addresses - My Account | ${Site_Title}`
  }
}


export default function addresses() {
  let [isOpenAdress, setIsOpenAdress] = useState(false)

  function closeModal() {
    setIsOpenAdress(false)
  }

  function openModal() {
    setIsOpenAdress(true)
  }
  return (
    <div>
      {/*  */}
      <div className="flex justify-between py-5 mb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">Shipping Addresses</h1>
        <button className="inline-flex items-center justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={openModal}>
          <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M4.84619 0.642883V8.35717" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.692383 4.20331H9.00008" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add Address
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SingleAddress
          name="Default Address"
        />
        <SingleAddress
          name="Address #1"
        />
        <SingleAddress
          name="Address #2"
        />
        <SingleAddress
          name="Address #3"
        />
      </div>




      <div className="flex justify-between py-5 mb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">Shipping Addresses</h1>
      </div>
      <p className="text-[#929292] mb-5 text-lg">There’s no shipping addresses</p>
      <button className="inline-flex items-center justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={openModal}>
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M4.84619 0.642883V8.35717" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0.692383 4.20331H9.00008" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Add Address
      </button>

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
                  <h3 className="mb-3">Add New Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="countries" className="block mb-1 text-xs text-gray-400 ">City</label>
                      <select id="countries" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        <option>Cairo</option>
                        <option>Alexandria</option>
                        <option>Giza</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="area" className="block mb-1 text-xs text-gray-400">Area</label>
                      <select id="area" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        <option>New Cairo</option>
                        <option>Alexandria</option>
                        <option>Giza</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="street" className="block mb-1 text-xs text-gray-400">Street & Building No.</label>
                      <input type="text" id="street" placeholder="22 street name" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
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
                        <input type="text" id="floor" placeholder="3" className="w-20 p-2 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                      </div>
                      <div className="inline-block">
                        <label htmlFor="Apartment" className="block mb-1 text-xs text-gray-400">Apartment</label>
                        <input type="text" id="Apartment" placeholder="33" className="w-20 p-2 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-center text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={closeModal}>Add Address</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}