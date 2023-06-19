import Msg from "~/components/Msg";
import OrdersTable from "~/components/OrdersTable";
import ReferralBox from "~/components/ReferralBox";
import FormatCurrency from "~/utils/FormatCurrency";
import SingleAddress from "~/components/SingleAddress";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUserInfo, getDefaultAddress } from "~/utils/account";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { RiEdit2Fill, RiEdit2Line, RiEditBoxLine, RiEditFill } from "react-icons/ri";


interface AddressData {
    id: string;
    status: string;
    gov_id: string;
    area_id: string;
    full_address: string;
    apartment_type: string;
    floor: string;
    apartment: string;
    area_name_en: string;
    area_name_ar: string;
    gov_name_en: string;
    gov_name_ar: string;
}
interface UserInfo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_day: string;
    birth_month: string;
    birth_year: string;
    gender: string;
}

export default function DashBoard({ userOrders }: any) {
    const { t, i18n } = useTranslation();
    const [address, setAddress] = useState<AddressData | null>(null);
    const [userInfo, setUserInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isMsg, setIsMsg] = useState(false);
    const [msg, setMsg] = useState('');

    // Check if the 'isNewUser' cookie exists
    const isNewUserCookie = Cookies.get('isNewUser');
    const isCurrentUserCookie = Cookies.get('isCurrentUser');
    if (isNewUserCookie) {
        setIsMsg(true);
        setMsg('thankYouForJoining');
        Cookies.remove('isNewUser');
    }
    if (isCurrentUserCookie) {
        setIsMsg(true);
        setMsg('welcomeBack');
        Cookies.remove('isCurrentUser');
    }
    useEffect(() => {
        const fetchData = async () => {
            const responseAddress = await getDefaultAddress();
            setAddress(responseAddress);
        };
        fetchData();

        const getUserInfo = async () => {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                setUserInfo(userInfo as UserInfo);
                setIsLoading(false)
            } else {
                // Handle the case when fetching user information fails
            }
        };

        getUserInfo();

    }, []);

    return (
        <div>
            {isMsg &&
                <Msg
                    color="green"
                    message={t(`common.${msg}`)}
                />
            }
            <div className="pb-5 border-b-2 border-gray-200 border-solid">
                <h1 className="text-3xl">{t("common.overview")}</h1>
            </div>

            <div className="flex justify-between py-5 border-b-2 border-gray-200 border-solid">
                <div className="flex flex-col max-w-[300px]">
                    <h3 className="mb-2 text-2xl tracking-wider">{t("common.overview_title")}</h3>
                    <p className="text-lg font-light">{t("common.overview_subtitle")}</p>
                </div>
                <div className="flex items-center justify-between px-4 py-6 border">
                    <span className="text-xl tracking-wider">{t("common.wallet_balance")}</span>
                    <span className="ml-20 text-lg font-bold"><FormatCurrency value={400}/></span>
                </div>
            </div>

            <div className="py-5 border-b-2 border-gray-200 border-solid">
                <h2 className="text-3xl">{t("common.share_friends_title")}</h2>
                <p className="text-gray-400">{t("common.share_friends_subtitle")}</p>
                <ReferralBox
                    url={'/ref?76543345'}
                />
            </div>

            <div className="py-5 mt-10">
                <h2 className="pb-2 mb-4 text-3xl border-b-2 border-gray-200 border-solid">{t("nav.orders_returns")}</h2>
                <OrdersTable userOrders={userOrders} />
            </div>

            <div className="py-5 mt-10">
                <h2 className="pb-2 mb-4 text-3xl border-b-2 border-gray-200 border-solid">{t("common.orders_returns")}</h2>
                <div className="">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-yellow-100 border-2 border-yellow-700 relative py-5 px-4 space-y-2 shadow shadow-gray-100">
                            <div className="mb-1 text-base">{t('common.your_info')}</div>
                            <div className="inline-block mr-5">
                                <label className="text-gray-700 text-xs">{t('checkout.first_name')}</label>
                                {isLoading ?
                                    <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                    :
                                    <span className="block text-sm font-bold">{userInfo.first_name}</span>
                                }
                            </div>
                            <div className="inline-block">
                                <label className="text-gray-700 text-xs">{t('checkout.last_name')}</label>
                                {isLoading ?
                                    <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                    :
                                    <span className="block text-sm font-bold">{userInfo.last_name}</span>
                                }
                            </div>
                            <div className="block">
                                <label className="text-gray-700 text-xs">{t('checkout.email_address')}</label>
                                {isLoading ?
                                    <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                    :
                                    <span className="block text-sm font-bold">{userInfo.email}</span>
                                }
                            </div>
                            <div className="block">
                                <label className="text-gray-700 text-xs">{t('checkout.phone_number')}</label>
                                {isLoading ?
                                    <div className="w-20 mt-1 animate-pulse"><div className="h-2 bg-gray-200 rounded-md"></div></div>
                                    :
                                    <span className="block text-sm font-bold">{userInfo.phone}</span>
                                }
                            </div>
                            <Link to="/my-account/profile" className="absolute inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white rounded-lg bottom-4 right-2 bg-slate-900 hover:bg-slate-700">
                                <RiEditBoxLine className="mr-2" />
                                {t('common.edit')}
                            </Link>
                        </div>
                        <SingleAddress address={address} />
                    </div>
                </div>
            </div>

        </div>
    )
}
