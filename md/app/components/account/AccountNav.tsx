import { Link, useLoaderData, useLocation } from "@remix-run/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";

export default function AccountNav({ userInfo }: any) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    // console.log('userInfo Nav', userInfo);
    const { first_name = '', last_name = '' } = userInfo || {};

    useEffect(() => {
        if (userInfo) {
            setIsLoading(false);
        }
    }, [userInfo]);
    const navItems = [
        { path: "/my-account", label: t("nav.dashboard_overview") },
        { path: "/my-account/addresses", label: t("nav.shipping_addresses") },
        { path: "/my-account/wallet", label: t("nav.my_wallet") },
        { path: "/my-account/wishlist", label: t("nav.my_wishlist") },
        { path: "/my-account/orders", label: t("nav.orders_returns") },
        { path: "/my-account/profile", label: t("nav.account_info") },
    ];

    const location = useLocation();
    const isActiveNavItem = (path: any) => {
        const currentPath = location.pathname;
        return (
            currentPath === path ||
            (currentPath.startsWith(path) && currentPath.includes("/orders/") && path !== "/my-account")
        );
    };

    const handleLogout = () => {
        Cookies.remove('user_id');
        Cookies.remove('token');
        localStorage.removeItem("wishlistItems");
        window.location.reload();
    };

    return (
        <div className='h-full p-3 space-y-2 text-gray-500 bg-white  w-60 shadow-xl shadow-gray-100 max-w-[20rem] rounded-xl'>
            <div className='divide-y divide-gray-300'>
                {/* Info */}
                {isLoading ?
                    <div className="flex items-center p-2 pb-4 space-x-4">
                        <span className="flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                            </svg>
                        </span>
                        <div className="mr-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                            <div className="w-12 h-2 mt-2 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    :
                    <div className="flex items-center p-2 pb-4 space-x-4">
                        <Avatar
                            name={`${userInfo.first_name} ${userInfo.last_name}`}
                            size='48'
                            round
                        />
                        <div>
                            <h2 className="text-lg font-semibold capitalize">{first_name} {last_name}</h2>
                            <span className="flex items-center space-x-1">
                                <Link to="/my-account/profile" rel="noopener noreferrer" className="text-xs text-gray-400 hover:underline">{t("common.view_profile")}</Link>
                            </span>
                        </div>
                    </div>
                }
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-2 space-x-3 rounded-md ${isActiveNavItem(item.path) ? 'font-bold drop-shadow-lg' : 'hover:font-bold hover:drop-shadow-lg'}`}
                            >
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="">
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md hover:font-bold hover:drop-shadow-lg">
                            <span>{t("nav.need_help")}</span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md hover:font-bold hover:drop-shadow-lg">
                            <span>{t("nav.faqs")}</span>
                        </a>
                    </li>
                    <li>
                        <button className="flex items-center p-2 space-x-3 text-gray-400 rounded-md hover:font-bold hover:drop-shadow-lg" onClick={handleLogout}>
                            <span>{t("nav.log_out")}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
