import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUserOrders } from "~/utils/account";
import DashBoard from "~/components/account/DashBoard";
import { Site_Title } from "~/config";

export const meta = () => {
  return {
    title: `Dashboard - My Account | ${Site_Title}`
  }
}
export default function index() {
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      navigate('/login');
      return;
    }
    const getUserOrders = async () => {
      const userOrders = await fetchUserOrders();
      if (userOrders) {
        setUserOrders(userOrders);
      } else {
      }
    };

    getUserOrders();
  }, []);
  return (
    <div>
      <DashBoard userOrders={userOrders}/>
    </div>
  )
}
