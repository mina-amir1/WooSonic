import React, { Fragment, useState } from 'react';
import { useCurrency } from '~/CurrencyContext';
import {Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const CurrencySwitcher: React.FC = () => {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
        setIsOpen(false);
    };
    const getFlagImage = (currencyCode: string) => {
        if (currencyCode === 'USD') {
            return '/images/en.svg';
        } else if (currencyCode === 'EGP') {
            return '/images/eg.svg';
        }
        return '';
    };
    return (
        <div>
            <Menu as="div" className="relative z-20 inline-block text-left">
                <div>
                    <Menu.Button
                        as="button"
                        className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <img src={getFlagImage(currency)} alt="" className="flex-shrink-0 block w-5 h-auto" />
                        <span className="block ml-3 text-sm font-medium">{currency}</span>
                        <span className="sr-only">, change currency</span>
                        <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-gray-400 group-hover:text-gray-500" />
                    </Menu.Button>
                </div>

                <Transition
                    show={isOpen}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            currency === 'USD' ? 'bg-gray-100' : '',
                                            'flex justify-center px-4 py-2 text-sm font-medium text-gray-900 w-full cursor-pointer'
                                        )}
                                        onClick={() => handleCurrencyChange('USD')}
                                    >
                                        <img src="/images/en.svg" alt="" className="flex-shrink-0 block w-5 h-auto" />
                                        <span className="block ml-3">USD</span>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            currency === 'EGP' ? 'bg-gray-100' : '',
                                            'flex justify-center px-4 py-2 text-sm font-medium text-gray-900 w-full cursor-pointer'
                                        )}
                                        onClick={() => handleCurrencyChange('EGP')}
                                    >
                                        <img src="/images/eg.svg" alt="" className="flex-shrink-0 block w-5 h-auto" />
                                        <span className="block ml-3">EGP</span>
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default CurrencySwitcher;
