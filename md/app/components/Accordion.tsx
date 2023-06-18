import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function Accordion({ title, description }: any) {
    return (
        <div>
            <Disclosure as="div">
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                            <span>{title}</span>
                            <ChevronUpIcon
                                className={`${open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-gray-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {description}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}
