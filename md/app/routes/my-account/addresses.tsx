import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import SingleAddress from "~/components/SingleAddress";
import { RiRadioButtonLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { Site_Title } from "~/config";
import { getAllAddresses } from "~/utils/account";
import { useNavigate } from "@remix-run/react";
import Cookies from "js-cookie";
import AddressesLoader from "~/components/account/AddressesLoader";
import { fetchGovs } from "~/utils/general";
import Popup from "~/components/Popup";
import AddAddress from "~/components/account/AddAddress";
import { useTranslation } from "react-i18next";

export const meta = () => {
  return {
    title: `My Addresses - My Account | ${Site_Title}`
  }
}


export default function addresses() {
  const { t } = useTranslation();
  let [isOpenAdress, setIsOpenAdress] = useState(false)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [govs, setGovs] = useState([]);


  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await getAllAddresses();
        setIsLoading(false)
        if (response.status === "error") {
          throw new Error(response.msg);
        }
        setAddresses(response);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false)
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchGovsData = async () => {
      try {
        const govsData = await fetchGovs();
        setGovs(govsData);
      } catch (error) {
        // Handle the error case if fetching governments fails
      }
    };

    // Fetch governments only if they haven't been fetched before
    if (govs.length === 0) {
      fetchGovsData();
    }
  }, []);
  const resetAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getAllAddresses();
      setIsLoading(false);
      if (response.status === "error") {
        throw new Error(response.msg);
      }
      setAddresses(response);
    } catch (error) {
      setError(error.message);
    }
  };
  if (error) {
    return <p className="font-semibold text-red-500">An error occurred: Authentication Failed!</p>;
  }

  function closeModal() {
    setIsOpenAdress(false)
  }

  function openModal() {
    setIsOpenAdress(true)
  }

  // console.log('addresses', addresses)
  return (
    <div>
      {/*  */}
      <div className="flex justify-between pb-5 mb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">{t("nav.shipping_addresses")}</h1>
        <button className="inline-flex items-center justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={openModal}>
          <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M4.84619 0.642883V8.35717" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.692383 4.20331H9.00008" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("common.add_address")}
        </button>
      </div>
      {isLoading ?
        <AddressesLoader />
        :
        <div className="grid grid-cols-2 gap-4">
          {addresses.length === 0 ? (
            <div className="w-full text-center">
              <p className="py-4 mb-5 text-lg text-gray-500">{t("common.no_address")}</p>
              <a href="/" className="inline-flex justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">{t("common.add_address")}</a>
            </div>
          ) : (
            addresses.map((address, index) => (
              <SingleAddress key={index} address={address} resetAddresses={resetAddresses} govs={govs} />
            ))
          )}
        </div>
      }

      {isOpenAdress ? (
        <Popup isOpen={true} close={closeModal}>
          <AddAddress closeModal={closeModal} resetAddresses={resetAddresses} />
        </Popup>
      ) : ('')}
    </div>
  )
}