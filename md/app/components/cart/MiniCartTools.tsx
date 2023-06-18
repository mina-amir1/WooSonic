import { EyeIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Tooltip from "../Tooltip";
import { useState } from "react";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MiniCartTools() {
    let [openCoupone, setOpenCoupone] = useState(true)
    let [openNote, setOpenNote] = useState(true)
    function toggleCoupone() {
        setOpenCoupone(!openCoupone)
    }
    function toggleNote() {
        setOpenNote(!openNote)
    }
    return (
        <div className="pt-4 py-4 mt-4 parent bg-[#f5f5f5]">
            <div className="flex items-center justify-center">
                <Tooltip message={'Add Note'}>
                    <span className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-200 rounded-full cursor-pointer" onClick={toggleNote}>
                        <PencilSquareIcon className="w-6 h-6 text-gray-500" />
                    </span>
                </Tooltip>
                <Tooltip message={'Add A Coupone'}>
                    <span className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-200 rounded-full cursor-pointer" onClick={toggleCoupone}>
                        <TagIcon className="w-6 h-6 text-gray-500" />
                    </span>
                </Tooltip>
            </div>
            <div
                className={classNames(
                    openCoupone ? 'hidden' : '',
                    'absolute left-0 right-0 bottom-0 top-0 bg-black bg-opacity-75 z-10'
                )}
            >
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200">
                    <button
                        type="button"
                        className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                        onClick={toggleCoupone}
                    >
                        <span className="sr-only">Close coupon</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                    <div className="flex w-full mt-2 coupon">
                        <input type="text" name="coupon_code" className="w-full p-2 border border-gray-300 rounded-l outline-none bg-gray-50" id="coupon_code" placeholder="Enter Coupon Code" />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r text-sm w-full sm:w-auto px-5 py-2.5 text-center " name="apply_coupon" defaultValue="Apply coupon">Apply</button>
                    </div>
                </div>
            </div>
            <div
                className={classNames(
                    openNote ? 'hidden' : '',
                    'absolute left-0 right-0 bottom-0 top-0 bg-black bg-opacity-75 z-10'
                )}
            >
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200">
                    <button
                        type="button"
                        className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                        onClick={toggleNote}
                    >
                        <span className="sr-only">Close Note</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                    <div className="flex w-full mt-2 coupon">
                        <input type="text" name="order_note" className="w-full p-2 border border-gray-300 rounded-l outline-none bg-gray-50" id="order_note" placeholder="Add Order Note" />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r text-sm w-full sm:w-auto px-5 py-2.5 text-center " name="add_note" defaultValue="Add">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
