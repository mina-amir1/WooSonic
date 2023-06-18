import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FormatCurrency } from "~/utils/FormatCurrency";
import { v4 } from 'uuid';
export default function Frequently() {
    const [selectedProducts, setSelectedProducts] = useState([
        { title: "Product Title 1", price: 20, selected: true },
        { title: "Product 2 Title", price: 10, selected: true },
        { title: "Product 3 Title", price: 90, selected: true }
    ]);

    const handleCheckboxChange = (index) => {
        setSelectedProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[index].selected = !updatedProducts[index].selected;
            return updatedProducts;
        });
    };

    const totalSelectedPrice = selectedProducts.reduce(
        (total, product) => (product.selected ? total + product.price : total),
        0
    );

    const totalOriginalPrice = selectedProducts.reduce(
        (total, product) => total + product.price,
        0
    );
    const areItemsSelected = selectedProducts.some((product) => product.selected);

    return (
        <div className="pt-20">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900">Don't Miss Out: Add These Items</h2>
            <div className="flex">
                <div className="flex items-center justify-center mb-4 mr-5">
                    {selectedProducts.map((product, index) => (
                        <React.Fragment key={v4()}>
                            <div className={`w-20 p-3 border ${product.selected ? '' : 'opacity-50'}`}>
                                <img src="https://www.lecollezioni-eg.com/wp-content/uploads/2021/06/thumb-MR7161718-gray.jpg" alt={product.title} />
                            </div>
                            {index !== selectedProducts.length - 1 && <PlusIcon className="w-6 h-6" />}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="mb-4 font-medium">
                        Total price: {FormatCurrency(totalSelectedPrice)}{" "}
                        <del className="text-base text-red-400 line-through align-middle">
                            {FormatCurrency(totalOriginalPrice)}
                        </del>
                    </div>
                    {areItemsSelected ? (
                        <button className="items-center justify-center px-8 py-3 text-base font-medium capitalize border-2 border-solid rounded-md whitespace-nowrap border-slate-600 text-slate hover:bg-slate-600 hover:text-white focus:outline-none">
                            Add Selected to Cart
                        </button>
                    ) : (
                        <p className={`flex p-2 text-sm rounded-lg w-full mt-2 text-red-800 bg-red-100`}>
                            Choose items to buy together.
                        </p>
                    )}
                </div>
            </div>
            <div>
                <ul>
                    {selectedProducts.map((product, index) => (
                        <li key={v4()}>
                            <input
                                type="checkbox"
                                name={`product-${index}`}
                                id={`product-${index}`}
                                checked={product.selected}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <label htmlFor={`product-${index}`} className="pl-2">
                                {product.title}{" "}
                                <span className="font-bold text-red-400 price">
                                    {FormatCurrency(product.price)}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
