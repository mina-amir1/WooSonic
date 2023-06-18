import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { v4 } from "uuid"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const subCategories = [
    { name: 'Totes', href: '#', current: false },
    { name: 'Backpacks', href: '#', current: true },
    { name: 'Travel Bags', href: '#', current: false },
    { name: 'Hip Bags', href: '#', current: false },
    { name: 'Laptop Sleeves', href: '#', current: false },
]
// const categories = [
//     { value: 't-shirt', label: 'T SHIRT', checked: false },
//     { value: 'bag', label: 'BAG', checked: false },
//     { value: 'trousers', label: 'trousers', checked: false },
//     { value: 'sweatshirt', label: 'sweatshirt', checked: false },
//     { value: 'shoes', label: 'shoes', checked: false },
//     { value: 'sneakers', label: 'sneakers', checked: false },
//     { value: 'dress', label: 'dress', checked: false },
//     { value: 'jacket', label: 'jacket', checked: false },
//     { value: 'wallet', label: 'wallet', checked: false },
//     { value: 'sweater', label: 'sweater', checked: false },
//     { value: 'shirt', label: 'shirt', checked: false },
//     { value: 'shorts', label: 'shorts', checked: false },
//     { value: 'leggings', label: 'leggings', checked: false },
//     { value: 'top', label: 'top', checked: false },
//     { value: 'belt', label: 'belt', checked: false },
//     { value: 'polo-shirt', label: 'polo shirt', checked: false },
// ]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]
export default function Filters({ filteredProducts = [], selectedCategories = [], handleSelectedCategoriesChange, handleMinPriceChange, handleMaxPriceChange, categories = [] }: any) {
    const handleCategoryChange = (categoryValue) => {
        const updatedCategories = selectedCategories.includes(categoryValue)
            ? selectedCategories.filter((selectedCategory) => selectedCategory !== categoryValue)
            : [...selectedCategories, categoryValue];

        handleSelectedCategoriesChange(updatedCategories);
    };

    return (
        <div>
            {/* Filters */}
            <div className="hidden lg:block">
                {/* <ul role="list" className="pb-6 space-y-4 border-b border-gray-200">
                    {subCategories.map((category) => (
                        <li key={v4()}>
                            <a href={category.href} className={classNames(
                                category.current ? 'text-blue-600' : 'text-gray-500',
                                'font-medium text-base'
                            )}>{category.name}</a>
                        </li>
                    ))}
                </ul> */}
                {categories.length>0?(
                <Disclosure as="div" key={v4()} className="py-6 border-b border-gray-200" defaultOpen>
                    {({ open }) => (
                        <>
                            <h3 className="flow-root -my-3">
                                <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                                    <span className="font-medium text-gray-900">Categories</span>
                                    <span className="flex items-center ml-6">
                                        {open ? (
                                            <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                        ) : (
                                            <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                        )}
                                    </span>
                                </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                    {categories.map((option, optionIdx) => (
                                        <div key={v4()} className="flex items-center">
                                            <input
                                                id={`filter-category-${optionIdx}`}
                                                name={`category_filter`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                // defaultChecked={option.checked}
                                                defaultChecked={selectedCategories.includes(option.value)}
                                                onChange={() => handleCategoryChange(option.value)}
                                                className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary-600 focus:ring-primary-500"
                                            />
                                            <label
                                                htmlFor={`filter-category-${optionIdx}`}
                                                className="ml-3 text-sm text-gray-600 capitalize cursor-pointer"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                ):('')}
                {/* <Disclosure as="div" key={v4()} className="py-6 border-b border-gray-200" defaultOpen>
                    {({ open }) => (
                        <>
                            <h3 className="flow-root -my-3">
                                <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                                    <span className="font-medium text-gray-900">Price Range</span>
                                    <span className="flex items-center ml-6">
                                        {open ? (
                                            <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                        ) : (
                                            <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                        )}
                                    </span>
                                </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <input type="number" name="minPrice" onChange={handleMinPriceChange} />
                                    </div>
                                    <div>
                                        <input type="number" name="maxPrice" onChange={handleMaxPriceChange} />
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure> */}
                {/* <ul>
                    {filteredProducts.map((item: any) => (
                        <li key={v4()}>{item.id}</li>
                    ))}
                </ul> */}

                {filters.map((section) => (
                    <Disclosure as="div" key={v4()} className="py-6 border-b border-gray-200">
                        {({ open }) => (
                            <>
                                <h3 className="flow-root -my-3">
                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                                        <span className="font-medium text-gray-900">{section.name}</span>
                                        <span className="flex items-center ml-6">
                                            {open ? (
                                                <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                            ) : (
                                                <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                    <div className="space-y-4">
                                        {section.options.map((option, optionIdx) => (
                                            <div key={v4()} className="flex items-center">
                                                <input
                                                    id={`filter-${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    defaultChecked={option.checked}
                                                    className="w-4 h-4 border-gray-300 rounded cursor-pointer text-primary-600 focus:ring-primary-500"
                                                />
                                                <label
                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                    className="ml-3 text-sm text-gray-600 capitalize cursor-pointer"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    )
}
