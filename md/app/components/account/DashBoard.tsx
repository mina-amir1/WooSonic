import Msg from "~/components/Msg";
import OrdersTable from "~/components/OrdersTable";
import ReferralBox from "~/components/ReferralBox";
import Status from "~/components/Status";
import { FormatCurrency } from "~/utils/FormatCurrency";

export default function DashBoard({ userOrders }) {
    return (
        <div>
            <Msg
                color="green"
                message={'<span class="font-bold">Thank You</span> For Joining SiteName'}
            />
            <div className="py-5 border-b-2 border-gray-200 border-solid">
                <h1 className="text-3xl">Overview</h1>
            </div>

            <div className="flex justify-between py-5 border-b-2 border-gray-200 border-solid">
                <div className="flex flex-col max-w-[300px]">
                    <h3 className="mb-2 text-2xl tracking-wider">Welcome To Your Account</h3>
                    <p className="text-lg font-light">You can manage your account info, wallet and orders</p>
                </div>
                <div className="flex items-center justify-between px-4 py-6 border">
                    <span className="text-xl tracking-wider">Wallet Balance</span>
                    <span className="ml-20 text-lg font-bold">{FormatCurrency(400)}</span>
                </div>
            </div>

            <div className="py-5 border-b-2 border-gray-200 border-solid">
                <h2 className="text-3xl">Share With Family & Friends</h2>
                <p className="text-gray-400">Share the below link with your beloved and get special offers</p>
                {/* Share Link */}
                <ReferralBox
                    url={'/ref?76543345'}
                />
            </div>

            <div className="py-5 mt-10">
                <h2 className="pb-2 mb-4 text-3xl border-b-2 border-gray-200 border-solid">Orders & Returns</h2>
                <OrdersTable userOrders={userOrders} />
            </div>

            <div className="py-5 mt-10">
                <h2 className="pb-2 mb-4 text-3xl border-b-2 border-gray-200 border-solid">Account Info</h2>
                <div className="">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#FBF6E9] relative py-5 px-4 space-y-2">
                            <div className="mb-1 text-base">Your Info.</div>
                            <div className="inline-block mr-5">
                                <label className="text-[#6C757D] text-xs">First Name</label>
                                <span className="block text-sm font-bold">Jared </span>
                            </div>
                            <div className="inline-block">
                                <label className="text-[#6C757D] text-xs">Last Name</label>
                                <span className="block text-sm font-bold">Jared </span>
                            </div>
                            <div className="block">
                                <label className="text-[#6C757D] text-xs">Email Address</label>
                                <span className="block text-sm font-bold">celestine_veum@hotmail.com</span>
                            </div>
                            <div className="block">
                                <label className="text-[#6C757D] text-xs">Mobile Number</label>
                                <span className="block text-sm font-bold">01265100657</span>
                            </div>
                            <a href="#" className="absolute inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white rounded-lg bottom-4 right-2 bg-slate-900 hover:bg-slate-700">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path d="M10.8833 5.20836L13.06 3.0317L10.8833 0.855042L8.70664 3.0317M10.8833 5.20836L3.26499 12.8267L1.25935 12.8267C1.1649 12.8267 1.08833 12.7501 1.08833 12.6557L1.08833 10.65L8.70664 3.0317M10.8833 5.20836L8.70664 3.0317" stroke="white" strokeWidth="1.06884" />
                                </svg>
                                Edit
                            </a>
                        </div>
                        <div className="bg-[#FBF6E9] relative py-5 px-4 space-y-2">
                            <div className="mb-1 text-base font-semibold">Default Address</div>
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
                            <a href="#" className="absolute inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white rounded-lg bottom-4 right-2 bg-slate-900 hover:bg-slate-700">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path d="M10.8833 5.20836L13.06 3.0317L10.8833 0.855042L8.70664 3.0317M10.8833 5.20836L3.26499 12.8267L1.25935 12.8267C1.1649 12.8267 1.08833 12.7501 1.08833 12.6557L1.08833 10.65L8.70664 3.0317M10.8833 5.20836L8.70664 3.0317" stroke="white" strokeWidth="1.06884" />
                                </svg>
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
