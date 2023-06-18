import { Tab } from "@headlessui/react";
import Reviews from "../Reviews";

interface TabsProps {
    product: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Tabs({ product }: TabsProps) {
    return (
        <div className="pt-20 mt-10 bg-white border-t-2 ">
            <div className="container mx-auto">
                <Tab.Group as="div" className="flex flex-col" defaultIndex={0}>
                    <Tab.List className="flex flex-wrap -mb-px space-x-1 border-b border-gray-200">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'p-4 py-2.5 text-sm font-medium leading-5 text-slate-700 focus:outline-none bg-transparent border-b-2 border-transparent transition-colors duration-300',
                                    selected
                                        ? 'border-teal-500 hover:border-teal-500 text-teal-500'
                                        : 'text-blue-100 hover:border-slate-500'
                                )
                            }
                        >Customer Reviews</Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'p-4 py-2.5 text-sm font-medium leading-5 text-slate-700 focus:outline-none bg-transparent border-b-2 border-transparent transition-colors duration-300',
                                    selected
                                        ? 'border-teal-500 hover:border-teal-500 text-teal-500'
                                        : 'text-blue-100 hover:border-slate-500'
                                )
                            }
                        >Product description</Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'p-4 py-2.5 text-sm font-medium leading-5 text-slate-700 focus:outline-none bg-transparent border-b-2 border-transparent transition-colors duration-300',
                                    selected
                                        ? 'border-teal-500 hover:border-teal-500 text-teal-500'
                                        : 'text-blue-100 hover:border-slate-500'
                                )
                            }
                        >Product Data</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <Reviews />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-16 lg:pr-8">
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{product.description}</p>
                                    </div>
                                </div>


                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                    <div className="mt-4 space-y-6">
                                        {/* <p className="text-sm text-gray-600">{product.details}</p> */}
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-16 lg:pr-8">
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{product.description}</p>
                                    </div>
                                </div>


                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                    <div className="mt-4 space-y-6">
                                        {/* <p className="text-sm text-gray-600">{product.details}</p> */}
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
