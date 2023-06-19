import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Site_Title } from "~/config";
import FormatCurrency from "~/utils/FormatCurrency";


export const meta = () => {
  return {
      title: `My Wallet | ${Site_Title}`
  }
}

export default function wallet() {
  let [isOpenAddPoints, setIsOpenAddPoints] = useState(false)

  function closeAddPoints() {
    setIsOpenAddPoints(false)
  }

  function openAddPoints() {
    setIsOpenAddPoints(true)
  }
  return (
    <div>
      <div className="flex items-center justify-between py-5 pb-10 border-b-2 border-gray-200 border-solid">
        <div>
          <h1 className="text-3xl">My Wallet</h1>
          <p className="max-w-md mt-2 text-gray-400">Wallet balance are available to be used on your upcoming order, Can’t be refund in cash</p>
        </div>
        <button className="inline-flex justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={openAddPoints}>
          Charge Wallet
        </button>

        <Transition appear show={isOpenAddPoints} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={closeAddPoints}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-lg py-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl px-14 rounded-2xl">
                    <button onClick={closeAddPoints} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 right-2">
                      <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <h3 className="text-2xl font-semibold tracking-wider">Do You Have Points Code?</h3>
                    <p className="text-sm text-gray-400">Add code and point will be added to your wallet balance</p>
                    <div className="mt-3 space-y-2">
                      <div>
                        <input type="text" id="code" placeholder="Add Code" className="w-full p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50" />
                      </div>
                      <p className="flex items-center text-[#6C757D] uppercase text-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#6C757D" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 10.8V8" stroke="#6C757D" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 5.19995H8.00794" stroke="#6C757D" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Can’t Use Code More Than One Time
                      </p>
                      <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-center text-white rounded-lg bg-slate-900 hover:bg-slate-700" onClick={closeAddPoints}>Apply Code</button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className="py-12 border-b-2 border-gray-200 border-solid">
        <div className="flex items-center justify-between px-4 py-6 border-2">
          <span className="text-xl tracking-wider">Wallet Balance</span>
          <span className="ml-20 text-lg font-bold"><FormatCurrency value={(400)}/></span>
        </div>
      </div>

      <div className="py-8 border-b-2 border-gray-200 border-solid">
        <div className="flex justify-between space-x-4">
          <div className="bg-[#F7EDD4] flex justify-center items-center px-2 flex-col rounded-lg w-1/5 min-h-[150px] pt-5 content-evenly text-center pb-2">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.7534 25.4886L20.8035 25.4896L20.8457 25.4857C21.0329 25.4622 21.7838 25.318 21.7838 24.5092C21.7838 19.095 17.3949 14.7061 11.9806 14.7061H10.02C4.60575 14.7061 0.216797 19.095 0.216797 24.5092C0.216797 24.5299 0.217818 24.5495 0.218737 24.5691C0.233442 24.8877 0.369665 25.0955 0.535393 25.2318C0.709911 25.3926 0.942212 25.4897 1.1971 25.4897C1.1971 25.4897 2.17741 25.4338 2.17741 24.5094C2.17741 20.1782 5.68878 16.6668 10.02 16.6668H11.9806C16.3118 16.6668 19.8231 20.1782 19.8231 24.5094C19.8231 24.53 19.8242 24.5496 19.8251 24.5692C19.8398 24.8878 19.976 25.0956 20.1417 25.2319C20.3045 25.382 20.5181 25.477 20.7534 25.4888L20.7534 25.4886Z" fill="black" />
              <path fillRule="evenodd" clipRule="evenodd" d="M11.0007 0C6.40207 0 2.66797 3.7341 2.66797 8.33271C2.66797 12.9313 6.40207 16.6654 11.0007 16.6654C15.5993 16.6654 19.3334 12.9313 19.3334 8.33271C19.3334 3.7341 15.5993 0 11.0007 0ZM11.0007 1.96064C14.517 1.96064 17.3727 4.81637 17.3727 8.33271C17.3727 11.849 14.517 14.7048 11.0007 14.7048C7.48434 14.7048 4.62861 11.849 4.62861 8.33271C4.62861 4.81637 7.48434 1.96064 11.0007 1.96064Z" fill="black" />
            </svg>
            <p className="text-sm">Create Account</p>
            <span className="mt-2 font-bold">500 Points</span>
          </div>
          {/*  */}
          <div className="bg-[#F7EDD4] flex justify-center items-center px-2 flex-col rounded-lg w-1/5 min-h-[150px] pt-5 content-evenly text-center pb-2">
            <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <path d="M25.3829 1H4.20646C2.90696 1 1.85352 2.05345 1.85352 3.35294V17.4706C1.85352 18.7701 2.90696 19.8235 4.20646 19.8235H25.3829C26.6824 19.8235 27.7359 18.7701 27.7359 17.4706V3.35294C27.7359 2.05345 26.6824 1 25.3829 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.85352 8.05884H27.7359" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm">Make A Purchase</p>
            <span className="mt-2 font-bold">10 Points/ 1 EGP</span>
          </div>
          {/*  */}
          <div className="bg-[#F7EDD4] flex justify-center items-center px-2 flex-col rounded-lg w-1/5 min-h-[150px] pt-5 content-evenly text-center pb-2">
            <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <path d="M18.6486 8.05882C20.5978 8.05882 22.178 6.47865 22.178 4.52941C22.178 2.58017 20.5978 1 18.6486 1C16.6993 1 15.1191 2.58017 15.1191 4.52941C15.1191 6.47865 16.6993 8.05882 18.6486 8.05882Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.53136 16.2941C6.48061 16.2941 8.06078 14.7139 8.06078 12.7647C8.06078 10.8155 6.48061 9.23529 4.53136 9.23529C2.58212 9.23529 1.00195 10.8155 1.00195 12.7647C1.00195 14.7139 2.58212 16.2941 4.53136 16.2941Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.6486 24.5294C20.5978 24.5294 22.178 22.9492 22.178 21C22.178 19.0508 20.5978 17.4706 18.6486 17.4706C16.6993 17.4706 15.1191 19.0508 15.1191 21C15.1191 22.9492 16.6993 24.5294 18.6486 24.5294Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.57812 14.5412L15.6134 19.2236" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.6017 6.30591L7.57812 10.9883" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm leading-3">Share on Social Media <span className="text-xs">(Once a Month)</span></p>
            <span className="mt-2 font-bold">10 Points</span>
          </div>
          {/*  */}
          <div className="bg-[#F7EDD4] flex justify-center items-center px-2 flex-col rounded-lg w-1/5 min-h-[150px] pt-5 content-evenly text-center pb-2">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <path d="M23.0618 13.6472V25.4119H4.23828V13.6472" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25.4142 7.7648H1.88477V13.6472H25.4142V7.7648Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.6504 25.4119V7.7648" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.6494 7.7648H8.35524C7.57519 7.7648 6.82709 7.45493 6.27551 6.90335C5.72394 6.35177 5.41406 5.60367 5.41406 4.82362C5.41406 4.04357 5.72394 3.29547 6.27551 2.7439C6.82709 2.19232 7.57519 1.88245 8.35524 1.88245C12.4729 1.88245 13.6494 7.7648 13.6494 7.7648Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.6504 7.7648H18.9445C19.7246 7.7648 20.4727 7.45493 21.0242 6.90335C21.5758 6.35177 21.8857 5.60367 21.8857 4.82362C21.8857 4.04357 21.5758 3.29547 21.0242 2.7439C20.4727 2.19232 19.7246 1.88245 18.9445 1.88245C14.8269 1.88245 13.6504 7.7648 13.6504 7.7648Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm">Birthday Bonus</p>
            <span className="mt-2 font-bold">250 Points</span>
          </div>
          {/*  */}
          <div className="bg-[#F7EDD4] flex justify-center items-center px-2 flex-col rounded-lg w-1/5 min-h-[150px] pt-5 content-evenly text-center pb-2">
            <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <path d="M20.1204 22.5815V20.2286C20.1204 18.9805 19.6246 17.7835 18.7421 16.901C17.8596 16.0185 16.6626 15.5227 15.4145 15.5227H6.00276C4.75468 15.5227 3.55772 16.0185 2.6752 16.901C1.79267 17.7835 1.29688 18.9805 1.29688 20.2286V22.5815" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.7078 10.8168C13.3068 10.8168 15.4137 8.7099 15.4137 6.11091C15.4137 3.51192 13.3068 1.40503 10.7078 1.40503C8.10885 1.40503 6.00195 3.51192 6.00195 6.11091C6.00195 8.7099 8.10885 10.8168 10.7078 10.8168Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M27.1798 22.5815V20.2286C27.179 19.1859 26.832 18.173 26.1932 17.3489C25.5544 16.5249 24.66 15.9363 23.6504 15.6756" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.9434 1.55798C19.9556 1.81716 20.8528 2.40587 21.4935 3.23129C22.1342 4.05671 22.482 5.0719 22.482 6.11681C22.482 7.16171 22.1342 8.1769 21.4935 9.00232C20.8528 9.82775 19.9556 10.4165 18.9434 10.6756" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm">Refer Friends</p>
            <span className="mt-2 font-bold">100 Points</span>
          </div>
        </div>
      </div>

      <div className="py-8 border-b-2 border-gray-200 border-solid">
        <h2 className="pb-2 mb-4 text-3xl border-b-2 border-gray-200 border-solid">Points History</h2>
        <table className="w-full text-left">
          <tr>
            <th className="py-3">Points</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Total Points</th>
          </tr>
          <tr>
            <td>
              <div className="text-[#32A94C] flex items-center">
                <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M7 0L13.0622 6H0.937822L7 0Z" fill="#32A94C" />
                </svg>
                9900 Points
              </div>
            </td>
            <td>2023-04-26</td>
            <td>Points Add By Admin </td>
            <td>0 Points</td>
          </tr>
          <tr>
            <td>
              <div className="text-[#F44336] flex items-center">
                <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M7 6L0.937822 1.14193e-06L13.0622 8.1987e-08L7 6Z" fill="#F44336" />
                </svg>
                10400 Points
              </div>
            </td>
            <td>2023-04-26</td>
            <td>Points Deducted For Return Request - #3775</td>
            <td>-9900 Points</td>
          </tr>
        </table>
      </div>
    </div>
  )
}