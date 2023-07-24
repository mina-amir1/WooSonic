<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input")??[];
$request_data = json_decode($request, true);
if (isset($request_data['coupon'],$request_data['action'])) {
    $action = strtolower($request_data['action']);
    if ($action ==='add') {
        $cart = WC()->cart;
        $coupon = $request_data['coupon'];
        if ($cart->apply_coupon($coupon)) {
            $data["status"] = "success";
            $data['total_discount'] = $cart->get_discount_total();
        } else {
            $data["status"] = "failed";
        }
        $data["cart"] = $cart->get_cart();
        $data["total"] = $cart->get_cart_contents_total();
        echo json_encode($data, JSON_THROW_ON_ERROR);
    }
    elseif ($action ==='remove'){
        $cart = WC()->cart;
        $coupon = $request_data['coupon'];
        if ($cart->remove_coupon($coupon)) {
            $cart->calculate_totals();
            $data["status"] = "success";
        } else {
            $data["status"] = "failed";
        }
        $data["cart"] = $cart->get_cart();
        $data["total"] = $cart->get_cart_contents_total();
        echo json_encode($data, JSON_THROW_ON_ERROR);
    }
    else{
        echo json_encode("Err No valid action provided");
    }
} else {
    echo json_encode("Err in payload");
}