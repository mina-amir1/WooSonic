import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { v4 } from "uuid";
import { useTranslation } from 'react-i18next';
import { useLocation } from '@remix-run/react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function ChangeLanguage() {
    const { pathname } = useLocation();
    const { t, i18n } = useTranslation();
    // const history = useHistory();

    function handleChangeLanguage(lang: string) {
        i18n.changeLanguage(lang);
        const newPathname = `/${lang}${pathname}`;
        // history.push(newPathname);
        console.log('newPathname', newPathname)
    }
    return (
        <div className="hidden lg:ml-8 lg:flex">
            <Menu as="div" className="relative z-20 inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                        <span className="block ml-3 text-sm font-medium">{i18n.language === 'en' ? 'English' : 'العربية'}</span>
                    </Menu.Button>
                </div>

                <Transition
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
                            <Menu.Item key={v4()}>
                                {({ active }) => (
                                    <div className='flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 cursor-pointer'>
                                        <span className="block ml-3" onClick={() => handleChangeLanguage('en')}>English</span>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item key={v4()}>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 w-full cursor-pointer'
                                        )}
                                    >
                                        <span className="block ml-3 font-sans-ar" onClick={() => handleChangeLanguage('ar')}>العربيه</span>
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
