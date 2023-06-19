import { useLoaderData, Outlet, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import AccountNav from '~/components/account/AccountNav'
import Cookies from "js-cookie";
import { fetchUserInfo } from "~/utils/account";
import { Site_Title } from "~/config";


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
export const meta = () => {
  return {
    title: `Dashboard - My Account | ${Site_Title}`
  }
}
export default function Account() {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    gender: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    const token = Cookies.get('token');
    if (!user_id) {
      navigate('/login');
      return;
    }
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setUserInfo(userInfo as UserInfo);
      } else {
        // Handle the case when fetching user information fails
      }
    };

    getUserInfo();
  }, []);
  return (
    <div>
      <section className="bg-gray-100 py-20 lg:py-[50px] px-10 sm:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap-reverse items-start md:flex-nowrap">
            <div className="flex flex-col">
              <AccountNav userInfo={userInfo} />
            </div>
            <div className="w-full p-4 md:ml-10">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
