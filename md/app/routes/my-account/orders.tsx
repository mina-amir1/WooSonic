import { useNavigate } from "@remix-run/react";
import OrdersTable from "~/components/OrdersTable";
import { fetchUserOrders } from "~/utils/account";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loader from "~/components/Loader";
import { Site_Title } from "~/config";

export const meta = () => {
  return {
    title: `My Orders | ${Site_Title}`
  }
}

export default function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      navigate('/login');
      return;
    }
    const getUserOrders = async () => {
      setIsLoading(true);
      const userOrders = await fetchUserOrders(Number(user_id));
      if (userOrders) {
        setUserOrders(userOrders);
        setIsLoading(false);
      } else {
      }
    };

    getUserOrders();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between py-5 pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">Orders & Returns</h1>
      </div>
      <div className="relative pt-10 min-h-[300px]">
        {isLoading ? (
          <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
            <Loader />
          </div>
        ) : (
          <>
            <OrdersTable userOrders={userOrders} />
            {userOrders.length === 0 && (
              <div className="w-full text-center ">
                <p className="py-4 mb-5 text-lg text-gray-500">There’s no orders yet</p>
                <a href="/" className="inline-flex justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">Shop Now</a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
