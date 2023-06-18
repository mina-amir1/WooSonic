import { useLoaderData, Outlet, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import AccountNav from '~/components/account/AccountNav'
import Cookies from "js-cookie";
import { fetchUserInfo } from "~/utils/account";
import { Site_Title } from "~/config";

export const meta = () => {
  return {
    title: `Dashboard - My Account | ${Site_Title}`
  }
}
export default function Account() {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // setIsLoading(false);
    // Check if the user is already logged in based on the cookie
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      // Redirect to the dashboard or any other authorized page
      navigate('/login');
      return;
    }
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(Number(user_id));
      if (userInfo) {
        setUserInfo(userInfo);
      } else {
        // Handle the case when fetching user information fails
        // You can display an error message or redirect the user
      }
    };

    getUserInfo();
  }, []);
  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[50px]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap md:flex-nowrap">
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
