<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if ($request_data['product_id'] && $request_data['qty']) {
    $cart = WC()->cart;
    $new_qty = $request_data['qty'];
    $product_id = $request_data['product_id'];
    foreach ($cart->get_cart() as $item_key => $item) {
        if ($item['product_id'] == $product_id || $item['variation_id'] == $product_id) {
            if ($cart->set_quantity($item_key, $new_qty)) {
                $data["status"] = "success";
            } else {
                $data["status"] = "failed";
            }
            break;
        }
    }
    $data["cart"] = $cart->get_cart();
    $data["total"] = $cart->get_cart_contents_total();
    echo json_encode($data, JSON_THROW_ON_ERROR);
} else {
    echo json_encode("Err in payload");
}