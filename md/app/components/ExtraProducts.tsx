import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getExtraProducts } from '~/api/extraProducts';
import ProductLoader from './product/ProductLoader';
import { ProductWidget } from './product/ProductWidget';

interface Props {
    categorySlug: string;
    title: string;
    count: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const PRODUCT_LOADERS_COUNT = 5;

export default function ExtraProducts({ categorySlug, count, title }: Props) {
    const [extraProducts, setExtraProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const products = await getExtraProducts(categorySlug, count);
                    setExtraProducts(prevProducts => [...prevProducts, ...products]);
                } catch (error) {
                    console.error('Error fetching extra products:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [categorySlug, count, inView]);

    return (
        <div className="mt-10 border-t-2" ref={ref}>
            <div className="container px-4 py-16 mx-auto sm:py-24 sm:px-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title || 'Customers also purchased'}</h2>
                {loading ? (
                    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {Array.from({ length: PRODUCT_LOADERS_COUNT }).map((_, index) => (
                            <ProductLoader key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                        {extraProducts.map((productData: any) => (
                            <ProductWidget product={productData} key={productData.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
