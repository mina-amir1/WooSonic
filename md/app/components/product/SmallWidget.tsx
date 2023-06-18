import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FormatCurrency } from "~/utils/FormatCurrency";
import Quickview from "../Quickview";

const SmallWidget = ({ product }: any) => {
    let [openQuick, setOpenQuick] = useState(false)
    function openModal() {
        setOpenQuick(!openQuick)
    }
    return (
        <div className="flex items-center w-full p-4 border-b border-gray-300">
            <div className="flex-shrink-0 w-24 h-24 overflow-hidden">
                <div className="rounded upsell_item_img">
                    <img src={product.main_image} alt={product.name} />
                </div>
            </div>
            <div className="flex flex-col flex-1 ml-4">
                <a className="">{product.name}</a>
                <span className="text-gray-500">{FormatCurrency(product.price)}</span>
            </div>
            <div className="">
                <span onClick={openModal} className="flex items-center justify-center w-10 h-10 p-1 text-white rounded-md bg-primary-400">
                    <EyeIcon className="w-6 h-6" />
                </span>
                {openQuick && <Quickview openQuick={openQuick} openModal={openModal} product={product} />}
            </div>
        </div>
    );
};

export default SmallWidget;
