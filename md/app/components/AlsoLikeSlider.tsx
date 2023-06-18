import { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import { useInView } from "react-intersection-observer";
import { v4 } from 'uuid';
import { getExtraProducts } from "~/api/extraProducts";
import Loader from "./Loader";
import SmallWidget from "./product/SmallWidget";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}
export default function AlsoLikeSlider() {
    const flickityOptions = {
        initialIndex: 2
    }
    const products = [
        {
            "id": 25100,
            "name": "DRESS",
            "title": "DRESS",
            "slug": "dress-27",
            "price": "2400",
            "sale_price": "",
            "main_image": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/thumb-LW119328410-navy.jpg",
            "thumbnail": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/thumb-LW119328410-navy-150x150.jpg",
            "images": [
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-LW119328410-navy-1.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-LW119328410-navy-2.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-LW119328410-navy-3.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-LW119328410-navy-4.jpg"
            ],
            "type": "variable"
        },
        {
            "id": 23112,
            "name": "DRESS",
            "title": "DRESS",
            "slug": "dress-15",
            "price": "2950",
            "sale_price": "",
            "main_image": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/thumb-3KEA133J3WZ-golden.jpg",
            "thumbnail": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/thumb-3KEA133J3WZ-golden-150x150.jpg",
            "images": [
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3KEA133J3WZ-golden-1.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3KEA133J3WZ-golden-2.jpg"
            ],
            "type": "variable"
        },
        {
            "id": 22955,
            "name": "DRESS",
            "title": "DRESS",
            "slug": "dress-9",
            "price": "4650",
            "sale_price": "",
            "main_image": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/thumb-3K3A223N4DZ-fantasia.jpg",
            "thumbnail": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/thumb-3K3A223N4DZ-fantasia-150x150.jpg",
            "images": [
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3K3A223N4DZ-fantasia-1.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3K3A223N4DZ-fantasia-2.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3K3A223N4DZ-fantasia-3.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3K3A223N4DZ-fantasia-4.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/06\/gall-3K3A223N4DZ-fantasia-5.jpg"
            ],
            "type": "variable"
        },
        {
            "id": 20071,
            "name": "DRESS",
            "title": "DRESS",
            "slug": "dress-48",
            "price": "5050",
            "sale_price": "",
            "main_image": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/04\/thumb-6H3A113J3MZ-black.jpg",
            "thumbnail": "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/04\/thumb-6H3A113J3MZ-black-150x150.jpg",
            "images": [
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/04\/gall-6H3A113J3MZ-black-1.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/04\/gall-6H3A113J3MZ-black-2.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/04\/gall-6H3A113J3MZ-black-3.jpg",
                "https:\/\/www.lecollezioni-eg.com\/wp-content\/uploads\/2021\/07\/gall-6H3A113J3MZ-black-4.jpg"
            ],
            "type": "variable"
        }
    ];
    const [extraProducts, setExtraProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const categorySlug = 'clothing';
    const count = 5
    useEffect(() => {
        console.log('FETCHING')
        if (inView) {
            console.log('FETCHING 1 if')
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
        } else {
            console.log('FETCHING 1 else')
        }
    }, [categorySlug, count, inView]);

    return (
        <div ref={ref} className="relative">
            {loading ? (
                <div className="absolute inset-0 z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75">
                    <Loader />
                </div>
            ) :
                <Flickity
                    options={flickityOptions}
                    className={'flex flex-wrap'}
                    reloadOnUpdate
                >
                    {extraProducts.map((product) => (
                        <SmallWidget key={v4()} product={product} />
                    ))}
                </Flickity>
            }
        </div>
    )
}
