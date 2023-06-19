import { memo, useState } from "react";
import { Link } from "@remix-run/react";
import Quickview from "~/components/Quickview";
import AddToCartSimple from "~/components/AddToCartSimple";
import { useTranslation } from "react-i18next";
import FormatCurrency from "~/utils/FormatCurrency";
import ProgressiveImage from "~/components/ProgressiveImage";
import Img from "~/components/icons/Img";
import WishlistBtn from "~/components/WishlistBtn";
import { ProductData } from "types";


type ProductWidgetProps = {
    product?: ProductData;
    key?: any;
    wishlist?: any;
};

const ProductWidget = ({ product, wishlist }: ProductWidgetProps) => {
    const { t } = useTranslation();
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [openQuick, setOpenQuick] = useState(false);

    const productTitle = product?.name;

    const imageSrc = product?.main_image ? product.main_image : product?.thumbnail;
    const imageSrcSmall = product?.main_image_small ? product.main_image_small : product?.thumbnail;

    const handleLinkClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };



    let itemID;
    let salePrice = null;
    let productPrice = null;
    if (product?.type === "simple" || product?.type === "variable") {
        itemID = product.id;
        productPrice = product.price;
        salePrice = product.sale_price;
    }
    return (
        <>
            <div className={`relative flex flex-col group`} id={`${wishlist ? `wishlist-item-${product?.id}` : ''}`}>
                <div className="relative z-10 w-full overflow-hidden bg-gray-200 rounded-md min-h-80 group-hover:opacity-75">
                    <Link
                        to={`/products/${product?.slug}`}
                        onClick={handleLinkClick}
                        className={`block aspect-w-4 aspect-h-3 lg:h-80 ${product?.slug ? product.slug : "pointer-events-none"}`}
                    >
                        {imageSrc ? (
                            <ProgressiveImage
                                src={imageSrc}
                                placeholder={imageSrcSmall}
                                alt={product?.name}
                                className="self-center object-cover object-center w-full h-full m-auto lg:h-full lg:w-full"
                            />
                        ) : (
                            <span className="flex items-center justify-center">
                                <Img />
                            </span>
                        )}
                    </Link>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end">
                        <button
                            onClick={() => setOpenQuick(!openQuick)}
                            type="button"
                            className="relative w-full px-4 py-2 text-sm text-gray-900 bg-white bg-opacity-75 rounded-md opacity-0 focus:opacity-100 group-hover:opacity-100"
                        >
                            {t("common.quick_view")}
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mt-4 mb-4">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <Link to={`/products/${product?.slug}`} prefetch="intent">
                                <span aria-hidden="true" className={`absolute inset-0 z-1 ${product?.slug ? "" : "pointer-events-none"}`} />
                                {productTitle}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product?.category}</p>
                        <p className="mt-1 text-sm text-gray-500">{product?.id}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                        <FormatCurrency value={(product?.price ? product.price : 0)}/>
                    </p>
                </div>
                <div className="relative z-1">
                    {product?.type !== "variable" ? (
                        <AddToCartSimple
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700"
                            product={{
                                id: product.id,
                                thumbnail: imageSrc,
                                slug: product.slug,
                                price: salePrice,
                            }}
                            disabled={salePrice === null}
                        />
                    ) : (
                        <button
                            onClick={() => setOpenQuick(!openQuick)}
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700"
                        >
                            {t("common.quick_view")}
                        </button>
                    )}
                </div>
                <WishlistBtn product={product} inWishlistPage={wishlist} />
                {openQuick && <Quickview openQuick={openQuick} openModal={() => setOpenQuick(!openQuick)} product={product} />}
            </div>
        </>
    );
}


export default memo(ProductWidget)