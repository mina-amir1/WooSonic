import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "@remix-run/react";
import Quickview from "../Quickview";
import AddToCartSimple from "../AddToCartSimple";
import { useTranslation } from "react-i18next";
import { FormatCurrency } from "~/utils/FormatCurrency";
import ProgressiveImage from "../ProgressiveImage";
import useRecentView from "~/stores/wishtList";
import FavoriteHeart from "../icons/favorite-icon";
import Heart from "../icons/Heart";

type Product = {
    id: number;
    name: string;
    price: string;
    sale_price: string;
    main_image: string;
    main_image_small: string;
    thumbnail: string;
    slug: string;
    category: string;
    type: string;
};

type ProductWidgetProps = {
    product?: Product;
    key?: any;
};

export function ProductWidget({ product }: ProductWidgetProps) {
    const { t } = useTranslation();
    const [isOpenCart, setIsOpenCart] = useState(false);

    let [openQuick, setOpenQuick] = useState(false);
    function openModal() {
        setOpenQuick(!openQuick);
    }

    let productTitle =
        // product?.name.length > 35
        //     ? product.name.slice(0, 35).concat("...")
        //     :
        product.name;

    let imageSrc = product.main_image ? product.main_image : product.thumbnail;
    let imageSrcSmall = product.main_image_small ? product.main_image_small : product.thumbnail;
    // Handle the scroll to top when a link is clicked
    const handleLinkClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    // console.log('ProductWidget', product)
    const {
        addToWishlist,
        wishlistItems
    } = useRecentView();

    const isWishlist = wishlistItems?.some((item) => item.id === product?.id);

    const handleWishlistClick = () => {
        addToWishlist(product);
    };

    let itemID;
    let salePrice = null;
    let productPrice = null;
    if (product?.type === "simple") {
        itemID = product.id;
        productPrice = product.price;
        salePrice = product.sale_price;
    } else if (product?.type === "variable") {
        itemID = product.id;
        productPrice = product.price;
        salePrice = product.sale_price;
    }
    return (
        <>
            <div className="relative flex flex-col group">
                <div className="relative z-10 w-full overflow-hidden bg-gray-200 rounded-md min-h-80 group-hover:opacity-75 ">
                    <Link to={
                        `/products/${product?.slug
                        }`
                    }
                        onClick={handleLinkClick}
                        className={
                            `block aspect-w-4 aspect-h-3 lg:h-80 ${product?.slug ? product.slug : "pointer-events-none"
                            }`
                        }>
                        {
                            imageSrc ? (
                                <ProgressiveImage src={imageSrc} placeholder={imageSrcSmall} alt={product?.name} className="self-center object-cover object-center w-full h-full m-auto lg:h-full lg:w-full" />
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                </span>
                            )
                        } </Link>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end">
                        <button onClick={openModal}
                            type="button"
                            className="relative w-full px-4 py-2 text-sm text-gray-900 bg-white bg-opacity-75 rounded-md opacity-0 focus:opacity-100 group-hover:opacity-100">
                            {
                                t("common.quick_view")
                            } </button>
                    </div>
                </div>
                <div className="flex justify-between mt-4 mb-4">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <Link to={
                                `/products/${product?.slug
                                }`
                            }
                                prefetch="intent">
                                <span aria-hidden="true"
                                    className={
                                        `absolute inset-0 z-1 ${product?.slug ? "" : "pointer-events-none"
                                        }`
                                    } /> {productTitle} </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {
                                product?.category
                            }</p>
                        <p className="mt-1 text-sm text-gray-500">
                            {
                                product?.id
                            }</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                        {
                            FormatCurrency(product?.price ? product.price : 0)
                        } </p>
                </div>
                <div className="relative z-1">
                    {
                        product?.type != "variable" ? (
                            <AddToCartSimple className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700"
                                product={
                                    {
                                        id: product.id,
                                        thumbnail: imageSrc,
                                        slug: product.slug,
                                        price: salePrice,
                                    }
                                }
                                disabled={salePrice === null}
                            />
                        ) : (
                            <button onClick={openModal}
                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">
                                {
                                    t("common.quick_view")
                                } </button>
                        )
                    }
                </div>
                <button
                    className={`w-8 h-8 rounded-full bg-primary-400 absolute top-2 right-2 z-10 flex justify-center items-center`}
                    onClick={handleWishlistClick}>
                    <span>
                        {(isWishlist ?
                            <FavoriteHeart />
                            :
                            <Heart />

                        )}
                    </span>
                </button>
                {
                    openQuick ? (
                        <Quickview openQuick={openQuick}
                            openModal={openModal}
                            product={product} />
                    ) : ("")
                } </div>
        </>
    );
}
