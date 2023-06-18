import { Link } from "@remix-run/react";
import ForgotForm from "~/components/account/ForgotForm";
import Dots from "~/components/Dots";

export default function forgot() {
  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
              >
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Forgot Password</h1>
                <ForgotForm/>
                <Dots />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
