import { Link } from "@remix-run/react";
import RegisterForm from "~/components/account/RegisterForm";
import Dots from "~/components/Dots";

export default function signup() {
  
  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
              >
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Sign Up</h1>
                <RegisterForm />
                <p className="mb-6 text-base text-[#adadad]">Connect With</p>
                <ul className="flex justify-between mb-12 -mx-2">
                  <li className="w-full px-2">
                    <a
                      href="#"
                      className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90"
                    >
                      <img src="/images/fb.svg" />
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a
                      href="#"
                      className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90"
                    >
                      <img src="/images/tw.svg" />
                    </a>
                  </li>
                  <li className="w-full px-2">
                    <a
                      href="#"
                      className="flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90"
                    >
                      <img src="/images/tw.svg" />
                    </a>
                  </li>
                </ul>
                <Link
                  to="/forgot"
                  className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
                >
                  Forget Password?
                </Link>
                <p className="text-base text-[#adadad]">Are you a member? <Link to="/login" className="text-primary hover:underline">Login</Link></p>
                <Dots />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
