import React, { Fragment, useEffect, useState } from 'react';

import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useShoppingCart } from '~/stores/cartStore';
import ShoppingCart from '~/components/ShoppingCart';
import { Link, useLocation } from '@remix-run/react';
import { v4 } from 'uuid';
import ChangeCountry from '~/components/ChangeCountry';
import Search from '~/components/Search';
import ChangeLanguage from '~/components/ChangeLanguage';
import { useTranslation } from 'react-i18next';
import NoInternetConnection from '~/components/NoInternetConnection';
import StickyDiv from '~/components/StickyDiv';
import Cookies from "js-cookie";
import CurrencySwitcher from '~/components/CurrencySwitcher';


const navigation = {
  categories: [
    {
      id: 'Clothing',
      name: 'Category 1',
      slug: 'juices',
      featured: [
        {
          name: 'Category 1 > 2',
          href: 'pants',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Category 3 > 2',
          href: 'polo',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        }
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Category 2', href: 'dress' },
            { name: 'Category 3', href: 'shirt' },
            { name: 'Category 4', href: 'skirt' },
            { name: 'Category Trousers', href: 'trousers' },
            // { name: 'Shirts', href: 'shirts' },
            // { name: 'Tees', href: 'tees' },
            // { name: 'Jackets', href: 'jackets' },
            // { name: 'Browse All', href: 'clothing' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories X',
          items: [
            { name: 'Watches X', href: 'top' },
            { name: 'Fitness Equipment X', href: 'vest' },
            { name: 'Bags X', href: 'bags' },
            { name: 'Erin Recommends X', href: 'shoes' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands X',
          items: [
            { name: 'Full Nelson X', href: '#' },
            { name: 'My Way X', href: '#' },
            { name: 'Re-Arranged X', href: '#' },
            { name: 'Counterfeit X', href: '#' },
            { name: 'Significant Other X', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About', href: 'about' },
    { name: 'Blog', href: 'blog' },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function NavBar({ }) {
  const [open, setOpen] = useState(false);
  const { cartQuantityTotal, openCart } = useShoppingCart();

  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout-step1" || location.pathname === "/checkout-step2" || location.pathname === "/checkout";
  const user_id = Cookies.get('user_id');


  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 820); // Duration of the shake animation in milliseconds

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [cartQuantityTotal]); // Run the effect whenever cartQuantityTotal changes

  return (
    <>
      <div className="bg-white">
        <NoInternetConnection />


        <div>
          {isCheckoutPage ? null : (
            typeof window !== 'undefined' && <ShoppingCart />
          )}
        </div>
        <header className="relative z-20 bg-white">
          {isCheckoutPage ? null : (
            <p className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-primary-600 sm:px-6 lg:px-8">
              {t('common.topBannerText')}
              {/* <LanguageSwitcher
              /> */}
            </p>
          )}
          <div className="container px-4 mx-auto">
            <nav aria-label="Top" className="">
              <div className="border-b border-gray-200">
                <div className="flex items-center h-16">
                  <button
                    type="button"
                    className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                  </button>

                  {/* Logo */}
                  <div className="flex ml-4 lg:ml-0">
                    <Link to="/">
                      <img
                        className="w-auto h-8"
                        src="/images/logo.svg"
                        alt=""
                      />
                    </Link>
                  </div>

                  {/* Flyout menus */}
                  {isCheckoutPage ? null : (
                    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                      <div className="flex h-full space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={v4()} className="flex">
                            {({ open, close }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out outline-none'
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition

                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 bg-white shadow top-1/2" aria-hidden="true" />

                                    <div className="relative bg-white">
                                      <div className="px-8 mx-auto max-w-7xl">
                                        <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                          <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                            {category.featured.map((item) => (
                                              <div key={v4()} className="relative text-base group sm:text-sm">
                                                <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                                  <img
                                                    src={item.imageSrc}
                                                    alt={item.imageAlt}
                                                    className="object-cover object-center"
                                                  />
                                                </div>
                                                <Link to={`/category/${item.href}`} onClick={() => { close() }} className="block mt-6 font-medium text-gray-900">
                                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                  {item.name}
                                                </Link>
                                                <p aria-hidden="true" className="mt-1">
                                                  {t("common.shop_now")}
                                                </p>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                            {category.sections.map((section) => (
                                              <div key={v4()}>
                                                <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                  {section.name}
                                                </p>
                                                <ul
                                                  role="list"
                                                  aria-labelledby={`${section.name}-heading`}
                                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                >
                                                  {section.items.map((item) => (
                                                    <li key={v4()} className="flex">
                                                      <Link to={`/category/${item.href}`} className="hover:text-gray-800" onClick={() => { close() }}>
                                                        {item.name}
                                                      </Link>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <Link
                            key={v4()}
                            // to={page.href}
                            to={`/${page.href}`}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  )}
                  <div className="flex items-center ml-auto">
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      {user_id ?
                        <Link to="/my-account" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          {t('common.my_account')}
                        </Link>
                        :
                        <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          {t('common.login')}
                        </Link>
                      }
                      <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                      {/* Change Country */}
                      {isCheckoutPage ? null : (
                        <ChangeCountry />
                      )}
                    </div>

                    {/* Change language */}
                    <ChangeLanguage />


                    {/* Change Currncy */}
                    {isCheckoutPage ? null : (
                      <div className="hidden lg:ml-8 lg:flex">
                        <CurrencySwitcher />
                      </div>
                    )}


                    {/* Search */}
                    {isCheckoutPage ? null : (
                      <div className="flex lg:ml-6">
                        <Search />
                      </div>
                    )}

                    {/* Cart */}
                    <div className="flow-root ml-4 lg:ml-6">
                      {isCheckoutPage ? (
                        <Link to="/cart" className="flex items-center p-2 -m-2 group">
                          <ShoppingBagIcon
                            className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartQuantityTotal}</span>
                        </Link>
                      ) : (
                        <StickyDiv>
                          <button
                            className={`flex items-center p-2 -m-2 bg-white rounded-full group ${isAnimating ? 'shake-animation' : ''}`}
                            onClick={openCart}
                          >
                            <ShoppingBagIcon
                              className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartQuantityTotal}</span>
                            <span className="sr-only">items in cart, view bag</span>
                          </button>
                        </StickyDiv>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

        </header>
      </div>
    </>
  )
}
