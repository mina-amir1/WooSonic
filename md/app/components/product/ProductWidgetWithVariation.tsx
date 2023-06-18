import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useShoppingCart from "~/stores/cartStore";
import FormatCurrency from "../../utils/FormatCurrency";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "@remix-run/react";
import Quickview from "../Quickview";
import AddToCartSimple from "../AddToCartSimple";
import { getProductBySlug } from "~/api/products";
import { useTranslation } from "react-i18next";

type Product = {
    id: number,
    name: string,
    price: number,
    main_image: string,
    thumbnail: string,
    variations: [],
    slug: string,
    attributes: any
}

type ProductWidgetWithVariationProps = {
    product: Product,
    key: any
}



export function ProductWidgetWithVariation({ product }: ProductWidgetWithVariationProps) {
    const { t } = useTranslation();
    const [isOpenCart, setIsOpenCart] = useState(false);

    let [openQuick, setOpenQuick] = useState(false)
    function openModal() {
        setOpenQuick(!openQuick)
    }

    let productTitle =
        // product?.name.length > 35
        //     ? product.name.slice(0, 35).concat("...")
        //     : 
        product.name;

    let imageSrc = product.main_image ? product.main_image : product.thumbnail


    const [productData, setProductData] = useState({});
    // const [productDataVariation, setProductDataVariation] = useState({});
    const [selectedSize, setSelectedSize] = useState(productData.attributes?.pa_size[0] || '');
    const [selectedColor, setSelectedColor] = useState(productData.attributes?.pa_color[0] || '');
    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductBySlug(product.slug);
            setProductData(productData);
            // setProductDataVariation(productData?.variations?.find((variation: any) =>
            // variation.attributes.attribute_pa_size === selectedSize &&
            // variation.attributes.attribute_pa_color === selectedColor
            // ));
        };
        fetchProduct();
    }, [product.slug]);

    const sizes = productData.attributes?.pa_size || [];
    const sizesList = Array.isArray(sizes) ? sizes : Object.values(sizes);
    let variation = productData?.variations?.find((variation: any) =>
    variation.attributes.attribute_pa_size === selectedSize &&
    variation.attributes.attribute_pa_color === selectedColor
    );
    let variationSalePrice = variation ? variation.sale_price : null;
    
    
    // console.log('productData', productData)
    // console.log('variationSalePrice', variationSalePrice)
    // console.log('variation', variation?variation:'no')
    // console.log('selectedSize', selectedSize)
    // console.log('selectedColor', selectedColor)

    return (
        <>
            <div className="relative flex flex-col group">
                <div className="relative z-10 w-full overflow-hidden bg-gray-200 rounded-md min-h-80 group-hover:opacity-75 ">
                    {/* <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 bottom-0 left-0 right-0 self-center object-cover object-center w-full h-full m-auto lg:h-full lg:w-full"
                    /> */}
                    {/* <span>{product.slug}</span> */}
                    <Link to={`/products/${product.slug}`} className={`block aspect-w-4 aspect-h-3 lg:h-80 ${product.slug ? product.slug : 'pointer-events-none'}`}>
                        {imageSrc ?
                            <LazyLoadImage
                                alt={product.name}
                                // effect="blur"
                                src={imageSrc}
                                // placeholderSrc={product.image_small}
                                wrapperClassName="z-1"
                                className="self-center object-cover object-center w-full h-full m-auto lg:h-full lg:w-full"
                            />
                            :
                            ''
                        }
                    </Link>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end">
                        <button
                            onClick={openModal}
                            type="button" className="relative w-full px-4 py-2 text-sm text-gray-900 bg-white bg-opacity-75 rounded-md opacity-0 focus:opacity-100 group-hover:opacity-100">
                            {t('common.quick_view')}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mt-4 mb-4">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <Link to={`/products/${product.slug}`} prefetch="intent">
                                <span aria-hidden="true" className={`absolute inset-0 z-1 ${product.slug ? '' : 'pointer-events-none'}`} />
                                {productTitle}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        <p className="mt-1 text-sm text-gray-500">{product.id}</p>
                    </div>
                    {/* <p className="text-sm font-medium text-gray-900">{FormatCurrency(product.price)}</p> */}
                    <p className="text-sm font-medium text-gray-900">{FormatCurrency(variationSalePrice)}</p>
                </div>
                <div className="relative mt-auto z-1">
                    {productData?.attributes?.pa_size ? (
                        <div>
                            <ul className="flex py-4 space-x-2">
                                {sizesList.map((size: any, index) => (
                                    <li key={`${product.id}_size_${index}_of_${size}`}>
                                        <input
                                            type="radio"
                                            id={`${product.id}_size_${size}`}
                                            name="shipping_method"
                                            value={`${product.id}_size_${size}`}
                                            className="hidden peer"
                                            defaultChecked
                                            onChange={setSelectedSize}
                                        />
                                        <label
                                            htmlFor={`${product.id}_size_${size}`}
                                            className="inline-flex items-center justify-between w-full h-full px-2 text-gray-500 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                                        >
                                            <div className="block">
                                                <div className="w-full font-semibold">{size}</div>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : ''}
                    {product.type != 'variable' ?

                        <AddToCartSimple
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700"
                            // id={product.id}
                            product={
                                {
                                    id: product.id,
                                    thumbnail: product.thumbnail,
                                    // size: selectedSize,
                                    // color: selectedColor,
                                    slug: product.slug
                                }
                            }
                        />
                        :
                        <button onClick={openModal} className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">{t('common.quick_view')}</button>
                    }
                </div>
                {openQuick ?
                    <Quickview openQuick={openQuick} openModal={openModal} product={product} />
                    : ''
                }
            </div>
        </>
    )

}