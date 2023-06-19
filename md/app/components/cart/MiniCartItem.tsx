import { Link } from '@remix-run/react';
import { memo, useEffect, useState } from 'react'
import { getProductBySlug } from '~/api/products';
import FormatCurrency from '~/utils/FormatCurrency';
import MiniCartItemLoader from './MiniCartItemLoader';

interface Product {
    id: number;
    title: string;
    price: number;
    // Other properties of the product
}

interface MiniCartItemProps {
    title: string;
    product: Product;
    id: number;
    quantity: number;
    color: string;
    size: string;
    slug: string;
    thumbnail: string;
    removeFromCart: () => void;
}


const MiniCartItem = ({ id, quantity, slug, thumbnail, removeFromCart, price }: MiniCartItemProps) => {

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const handleRemoveClick = () => {
        removeFromCart(id);
    };
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const product = await getProductBySlug(slug);
            setProduct(product);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        fetchProduct();
    }, [slug]);


    const title = product.title;

    const variationId = id;
    const variation = product?.variations?.find(variation => variation.id === variationId);

    let salePrice = null;
    let productPrice = null;
    let color = null;
    let size = null;
    if (variation) {
        productPrice = variation.price;
        salePrice = variation.sale_price;
        color = variation.attributes?.attribute_pa_color
        size = variation.attributes?.attribute_pa_size
    } else {
        productPrice = product.price;
        salePrice = product.sale_price;
    }

    return (
        <>
            {loading ?
                <MiniCartItemLoader />
                :
                <>
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                        <img
                            src={thumbnail}
                            alt={slug}
                            className="object-cover object-center w-full h-full"
                        />
                    </div>

                    <div className="flex flex-col flex-1 ml-4">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <Link to={`/products/${slug}`}>{title}</Link>
                                </h3>
                                <div>
                                    <p className="ml-4"><FormatCurrency value={(salePrice * quantity)}/></p>
                                </div>
                            </div>
                            {variation ?
                                <p className="mt-1 text-sm text-gray-500">{color} - {size}</p>
                                :
                                ""
                            }
                        </div>
                        <div className="flex items-end justify-between flex-1 text-sm text-gray-500">
                            <div className="flex flex-col">
                                {salePrice !== null && salePrice != productPrice ? (
                                    <p className="">
                                        <span className="align-middle"><FormatCurrency value={salePrice}/></span>
                                        <del className="ml-2 text-xs text-red-400 line-through align-middle"><FormatCurrency value={productPrice}/></del>
                                    </p>
                                ) : (
                                    <p className="">
                                        <FormatCurrency value={price}/>
                                    </p>
                                )}
                                <p className="text-gray-500">Quantity: {quantity}</p>
                            </div>
                            {removeFromCart ?
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                        onClick={handleRemoveClick}
                                    >
                                        Remove
                                    </button>
                                </div> : ''}
                        </div>
                    </div>
                </>
            }
        </>
    );
};
export default memo(MiniCartItem);