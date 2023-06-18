<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if ($request_data['product_id'] && $request_data['qty']) {
    /** @var WC_Product $product */
    $product = wc_get_product($request_data['product_id']);
    if ($product->get_stock_quantity()) {
        $qty_check = $product->get_stock_quantity() >= $request_data['qty'];
    } else {
        $qty_check = true;
    }
        if ($qty_check) {
            $cart = WC()->cart;
            $data = [];
            if ($cart->add_to_cart($request_data['product_id'], $request_data['qty'])) {
                $data[] = [
                    "status" => "success",
                    "cart" => $cart->get_cart(),
                    "total" => $cart->get_cart_contents_total(),
                    ];
            } else {
                $data[] = ["status" => "failed"];
            }
            echo json_encode($data, JSON_THROW_ON_ERROR);
        }else{
            echo json_encode(['status'=>"failed",'msg'=>'qty does not match the stock'], JSON_THROW_ON_ERROR);
        }
} else {
    echo json_encode("Err in payload", JSON_THROW_ON_ERROR);
}
//get items
//$cart_items = array();
//foreach( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
//    $product_id = $cart_item['product_id'];
//    $product_name = $cart_item['data']->get_name();
//    $product_price = $cart_item['data']->get_price();
//    $product_quantity = $cart_item['quantity'];
//    $cart_items[] = array(
//        'product_id' => $product_id,
//        'product_name' => $product_name,
//        'product_price' => $product_price,
//        'product_quantity' => $product_quantity
//    );
//}