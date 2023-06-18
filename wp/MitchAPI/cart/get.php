<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);

foreach( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
    $product_id = $cart_item['product_id'];
    $product_name = $cart_item['data']->get_name();
    $product_price = $cart_item['data']->get_price();
    $product_quantity = $cart_item['quantity'];
    $cart_items[] = array(
        'product_id' => $product_id,
        'product_name' => $product_name,
        'product_price' => $product_price,
        'product_quantity' => $product_quantity
    );
}
$data = [
    'total' => WC()->cart->get_cart_contents_total(),
    'total_discount' => WC()->cart->get_discount_total(),
    'items' => $cart_items,
];
echo json_encode($data, JSON_THROW_ON_ERROR);