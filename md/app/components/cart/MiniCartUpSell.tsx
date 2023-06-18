import AlsoLikeSlider from "../AlsoLikeSlider";


export default function MiniCartUpSell() {

    return (
        <div className="pt-4 mt-4 border-t border-gray-500 parent">
            <div className="overflow-hidden rounded-lg shadow-md mini_cart_upsell">
                <h4 className="p-3 font-semibold text-center bg-gray-200">You may also like</h4>
                <div className="mini_cart_upsell_items">
                    <AlsoLikeSlider/>
                </div>
            </div>
        </div>
    )
}
