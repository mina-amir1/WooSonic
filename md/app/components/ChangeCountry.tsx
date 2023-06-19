import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
// import { FormatCurrency } from "~/utils/FormatCurrency";
import { getSelectedCurrency, setSelectedCurrency } from "~/utils/currencyUtils";
import { useTranslation } from "react-i18next";
import Popup from "./Popup";
// import { FormatCurrency } from "~/utils/FormatCurrency";


export default function ChangeCountry() {
    const { t } = useTranslation();
    let [isOpenSize, setIsOpenSize] = useState(false)

    const [currency, setCurrency] = useState(getSelectedCurrency());
    function closeModal() {
        setIsOpenSize(false)
    }

    function openModal() {
        setIsOpenSize(true)
    }
    // const [currency, setCurrency] = useState("EGP");
    const handleCountryChange = (selectedCurrency: string): void => {
        console.log('handleCountryChange', selectedCurrency);
        setCurrency(selectedCurrency);
        setSelectedCurrency(selectedCurrency); // Update the selected currency
    };

    return (
        <>
            <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-500" onClick={openModal}>
                {t('common.change_country')}
            </button>
            {isOpenSize ? (
                <Popup isOpen={true} close={closeModal}>
                    <div className="mt-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 whitespace-nowrap">
                            <span
                                className="grid w-full min-w-[7rem] transform cursor-pointer  rounded-xl border border-gray-100 px-3 py-2 transition-all scale-105 bg-blue-500 bg-opacity-25"
                            // onClick={closeModal}
                            >
                                <div className="p-2.5">
                                    <h4 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-center text-gray-900">Egypt</h4>
                                </div>
                            </span>
                            <span
                                className="grid w-full min-w-[7rem] transform cursor-pointer  rounded-xl border border-gray-500 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-gray-100 hover:bg-gray-500 hover:bg-opacity-25"
                            // onClick={closeModal}
                            >
                                <div className="p-2.5">
                                    <h4 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-center text-gray-900">Qatar</h4>
                                </div>
                            </span>
                            <span
                                className="grid w-full min-w-[7rem] transform cursor-pointer  rounded-xl border border-gray-500 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-gray-100 hover:bg-gray-500 hover:bg-opacity-25"
                            // onClick={closeModal}
                            >
                                <div className="p-2.5">
                                    <h4 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-center text-gray-900">Saudi Arabia</h4>
                                </div>
                            </span>
                        </div>
                        <div>
                            <button className="block" onClick={() => handleCountryChange("EGP")}>
                                Egypt
                            </button>
                            <button className="block" onClick={() => handleCountryChange("QAR")}>
                                Qatar
                            </button>
                            <button className="block" onClick={() => handleCountryChange("SAR")}>
                                Saudi Arabia
                            </button>

                            {/* <div>{FormatCurrency(872, getSelectedCurrency())}</div> */}
                        </div>
                    </div>
                </Popup>
            ) : ('')}
        </>
    )
}
