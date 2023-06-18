import { Link } from "@remix-run/react"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Button({ name, style = "solid", onClick, width = "auto", href, extraclass, type = "button" }: any) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <>
            {href ?
                <Link
                    to={href}
                    className={classNames(
                        style === 'border' ? 'text-gray-700 bg-white border border-gray-300 shadow-lg hover:bg-gray-50' : '',
                        style === 'solid' ? 'text-white border border-transparent bg-slate-900 hover:bg-slate-700' : '',
                        style === 'solid-red' ? 'text-white border border-transparent bg-red-600 hover:bg-red-800' : '',
                        width === 'auto' ? 'inline-flex ' : '',
                        width === 'full' ? 'flex w-full' : '',
                        'items-center justify-center px-10 py-2 font-medium  rounded-lg shadow-sm  sm:flex-grow-0',
                        extraclass ? extraclass : '',
                    )}
                >
                    {name}
                </Link>
                :
                <button

                    className={classNames(
                        style === 'border' ? 'text-gray-700 bg-white border border-gray-300 shadow-lg hover:bg-gray-50' : '',
                        style === 'solid' ? 'text-white border border-transparent bg-slate-900 hover:bg-slate-700' : '',
                        style === 'solid-red' ? 'text-white border border-transparent bg-red-600 hover:bg-red-800' : '',
                        width === 'auto' ? 'inline-flex ' : '',
                        width === 'full' ? 'flex w-full' : '',
                        'items-center justify-center px-10 py-2 font-medium  rounded-lg shadow-sm  sm:flex-grow-0',
                        extraclass ? extraclass : '',
                    )}
                    type={type}
                    onClick={handleClick}
                >
                    {name}
                </button>
            }
        </>

    )
}
