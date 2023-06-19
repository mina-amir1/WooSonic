import { useNavigate } from "@remix-run/react";
import OrdersTable from "~/components/OrdersTable";
import { fetchUserOrders } from "~/utils/account";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Site_Title } from "~/config";
import OrdersTableLoader from "~/components/account/OrderTableLoader";
import { useTranslation } from "react-i18next";

export const meta = () => {
  return {
    title: `My Orders | ${Site_Title}`
  }
}

export default function Orders() {
  const { t } = useTranslation();
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(false);
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      navigate('/login');
      return;
    }
    const getUserOrders = async () => {
      setIsLoading(true);
      const response = await fetchUserOrders();
      if (response && response.status === 'error') {
        setErrorMessage(response.msg);
      } else if (response) {
        setUserOrders(response);
      } else {
        setErrorMessage('An error occurred while fetching user orders.');
      }
      setIsLoading(false);
    };

    getUserOrders();
  }, []);
  // console.log('userOrders', userOrders)
  return (
    <div>

      <div className="flex items-center justify-between py-5 pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">{t('common.orders_returns')}</h1>
      </div>
      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}

      <div className="relative pt-10 min-h-[300px]">
        {isLoading && (
          <OrdersTableLoader />
        )}

        {!isLoading && userOrders.length === 0 && !errorMessage && (
          <p className="text-gray-500">{t('common.no_orders')}</p>
        )}

        {!isLoading && userOrders.length > 0 && !errorMessage && (
          <OrdersTable userOrders={userOrders} />
        )}
      </div>
    </div>
  )
}
