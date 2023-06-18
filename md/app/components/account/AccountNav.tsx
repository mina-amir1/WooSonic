import { Link, useLoaderData, useLocation } from "@remix-run/react";
import Cookies from "js-cookie";

export default function AccountNav({ userInfo }: any) {
    console.log('userInfo Nav', userInfo);
    const { first_name = '', last_name = '', avatar_url = '' } = userInfo || {};

    const navItems = [
        { path: "/my-account", label: "Dashboard (Overview)" },
        { path: "/my-account/addresses", label: "Shipping Addresses" },
        { path: "/my-account/wallet", label: "My Wallet" },
        { path: "/my-account/wishlist", label: "My Wishlist" },
        { path: "/my-account/orders", label: "Orders & Returns" },
        { path: "/my-account/profile", label: "Account Info" },
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
        window.location.reload();
      };

    return (
        <div className='h-full p-3 space-y-2 text-gray-900 bg-gray-100 w-60'>
            <div className='divide-y divide-gray-700'>
                <div className="flex items-center p-2 space-x-4">
                    <img src={avatar_url} alt="avatar alt" className="w-12 h-12 bg-gray-500 rounded-full" />
                    <div>
                        <h2 className="text-lg font-semibold capitalize">{first_name} {last_name}</h2>
                        <span className="flex items-center space-x-1">
                            <Link to="/my-account/profile" rel="noopener noreferrer" className="text-xs text-gray-400 hover:underline"> View profile </Link>
                        </span>
                    </div>
                </div>

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
                            <span>Need Help?</span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md hover:font-bold hover:drop-shadow-lg">
                            <span>FAQs</span>
                        </a>
                    </li>
                    <li>
                        <button className="flex items-center p-2 space-x-3 text-gray-400 rounded-md hover:font-bold hover:drop-shadow-lg" onClick={handleLogout}>
                            <span>Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
