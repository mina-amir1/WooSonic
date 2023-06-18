import { Fragment, useEffect, memo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useShoppingCart from "~/stores/cartStore";
import { v4 } from 'uuid';
import MiniCartItem from './cart/MiniCartItem';
import MiniCartUpSell from './cart/MiniCartUpSell';
import MiniCartTools from './cart/MiniCartTools';
import i18next from 'i18next';
import { FormatCurrency } from '~/utils/FormatCurrency';
import MiniCartItemLoader from './cart/MiniCartItemLoader';
import { Link } from '@remix-run/react';


const ShoppingCart = () => {

  const { closeCart, cartItems, removeFromCart, openCart, isOpen, totalPrice } = useShoppingCart();
  // console.log('isOpen>', isOpen);
  // useEffect(() => {
  //   setTimeout(() => {
  //     closeCart();
  //   }, 10);
  // }, []);
  const isClientRender = typeof window !== 'undefined';
  useEffect(() => {
    if (isClientRender) {
      // Hydrate the cart on the client side after rendering
      closeCart();
      // You can perform any necessary client-side initialization here
    }
  }, [isClientRender]);
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeCart}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-md pointer-events-none">
                <Transition.Child

                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  // enterFrom="-translate-x-full"
                  enterFrom={`${i18next.language === 'en' ? 'translate-x-full' : '-translate-x-full'}`}
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo={`${i18next.language === 'en' ? 'translate-x-full' : '-translate-x-full'}`}
                >
                  <Dialog.Panel className="w-screen h-full max-w-md pointer-events-auto">
                    <div className="relative flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                        <div className="flex items-start justify-between">
                          {cartItems.length > 0 && (
                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          )}
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="p-2 -m-2 text-gray-400 outline-none hover:text-gray-500"
                              onClick={closeCart}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {cartItems.length > 0 ? (
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                  <li key={v4()} className="flex py-6">

                                    <MiniCartItem
                                      id={item.id}
                                      price={item.price}
                                      quantity={item.quantity}
                                      // color={item.color} 
                                      // size={item.size} 
                                      slug={item.slug}
                                      thumbnail={item.thumbnail}
                                      removeFromCart={removeFromCart}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className='flex mt-auto items-center justify-center h-[90%]'>
                            <p className="mt-0.5 text text-slate-500">Your cart is currently empty.</p>
                          </div>
                        )}
                        {cartItems.length > 0 && (
                          <>
                            <MiniCartTools />
                            <MiniCartUpSell />
                          </>
                        )}
                      </div>
                      {cartItems.length > 0 && (
                        <div className="px-4 py-4 border-t border-gray-200 top-shadow">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>{FormatCurrency(totalPrice)}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                          <div className="mt-4">
                            <Link
                              to="/checkout"
                              onClick={closeCart}
                              className="flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
                            >
                              Check Out
                            </Link>
                          </div>
                          <div className="flex justify-center mt-4 text-sm text-center text-gray-500">
                            <p>
                              {/* or */}
                              <Link
                                to="/cart"
                                className="ml-2 font-medium text-primary-600 hover:text-primary-500"
                                onClick={closeCart}
                              >
                                View Cart
                                <span aria-hidden="true"> &rarr;</span>
                              </Link>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default memo(ShoppingCart)