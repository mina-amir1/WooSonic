<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input") ?? '';
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if (isset($request_data['billing'],
    $request_data['shipping'],
    $request_data['payment'],
    $request_data['items'],
    $request_data['order'])) {

    $items = $request_data['items'];
    $shipping = $request_data['shipping'];
    $billing = $request_data['billing'];
    $payment = $request_data['payment'];
    $order = $request_data['order'];

    if (!is_array($items)) {
        json_encode(['ERR no items are provided']);
    } elseif (!is_array($billing)) {
        json_encode(['ERR no billing data are provided']);
    } elseif (!is_array($shipping)) {
        json_encode(['ERR no shipping data are provided']);
    } else {
        $WcOrder = wc_create_order();
        $WcOrder->set_status('wc-pending');
        foreach ($items as $item) {
            $WcOrder->add_product(wc_get_product($item['itemID']), $item['qty']);
        }
        $WcOrder->calculate_totals();
        $coupon = WC()->cart->get_applied_coupons()[0]??'';
        if($coupon){
            $WcOrder->apply_coupon($coupon);
            $WcOrder->calculate_totals();
        }elseif (isset($order['coupon'])){
            $WcOrder->apply_coupon($order['coupon']);
            $WcOrder->calculate_totals();
        }
        $WcOrder->set_address($billing, 'billing');
        $WcOrder->set_address($shipping,'shipping');
        if ($shipping['rate']==0){
            $rate = new WC_Shipping_Rate('', "Free Shipping", $shipping['rate']);
        }else{
            $rate = new WC_Shipping_Rate('', "Shipping Fees", $shipping['rate']);
        }
        $WcOrder->add_shipping($rate);
        $WcOrder->calculate_totals();
        $WcOrder->set_customer_id($order['customerID']);
        $order_id = $WcOrder->save();
        if (strtolower($payment['method']) === "cod") {
            $WcOrder->set_payment_method('cod');
            $WcOrder->set_payment_method_title('Cash On Delivery');
            $WcOrder->set_status('wc-processing');
            $WcOrder->save();
            echo json_encode(["status"=>"success"]);
        }elseif (strtolower($payment['method']) === "cc"){
            // make checks here if it's MPGS or cyber or paymob and require each file
            $WcOrder->set_payment_method('cc');
            $WcOrder->set_payment_method_title('Credit/Debit Card');
            $WcOrder->save();
            require_once './payment/MPGS/capture.php';
        }
        else{
            echo json_encode(['ERR No accepted payment method']);
        }
    }
} else {
    echo json_encode(['ERR in payload']);
}
