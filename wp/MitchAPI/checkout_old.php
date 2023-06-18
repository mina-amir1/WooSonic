<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
//echo "hamad";
//ORder
$order = wc_create_order();
$coupon = WC()->cart->get_applied_coupons()[0];
$order->add_product( wc_get_product( 53 ), 2 );
$order->calculate_totals();
$order->apply_coupon($coupon);
$order->calculate_totals();

//Shipping
$fee = new WC_Order_Item_Fee();
$fee->set_name( 'Shipping Fees' );
$fee->set_amount( 65 );
$fee->set_total( 65 );
$order->add_item( $fee );
$order->calculate_totals();
// //
 $shipping = new WC_Order_Item_Shipping();
// $shipping->set_method_title( 'Shipping Fees' );
 $shipping->set_method_id( 'free_shipping:1' ); // set an existing Shipping method ID
// $shipping->set_total( 0 ); // optional
$address = array(
    'first_name' => 'Misha',
    'last_name'  => 'Rudrastyh',
    'company'    => 'rudrastyh.com',
    'email'      => 'no-reply@rudrastyh.com',
    'phone'      => '+995-123-4567',
    'address_1'  => '29 Kote Marjanishvili St',
    'address_2'  => '',
    //'city'       => 'Tbilisi',
    'Area'      => 'Zaytoon',
    'gov'        => 'Cairo',
    //'postcode'   => '0108',
    //'country'    => 'GE'
);

$order->set_address( $address, 'billing' );
$order->set_address( $address, 'shipping' );
$order->calculate_totals();
$payment_gateways = WC()->payment_gateways->payment_gateways();
$order->set_payment_method( $payment_gateways[ 'cod' ] );
$order->calculate_totals();
$order->set_status( 'wc-completed' );
$order->calculate_totals();
$order->save();
//if ( payment = "MPGS"){
//    require pay-> mpgs,
//}elseif (payment = "CYber"){
//    require pay -> cyber
//}
echo json_encode(['status'=>'success']);
