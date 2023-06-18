<?php
include_once '../../../wp-load.php';
include_once ABSPATH.'wp-load.php';
include_once ABSPATH.'MitchAPI/autoloader.php';
use payment\MPGS\ThreeDS;
use payment\MPGS\Pay;
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input") ?? '';
$request_data = json_decode($request, true);
$redirect_url = "https://cloudhosta.com:68/MitchAPI/payment/MPGS/capture.php";
if (isset($request_data['payment']['sessionID'], $request_data['payment']['orderData'])) {
    $orderData = $request_data['payment']['orderData'];
    $sessionID = $request_data['payment']['sessionID'];
    $amount = isset($orderData['amount']) ? urlencode($orderData['amount']) : urlencode(0.00);
    $currency = isset($orderData['currency']) ? ($orderData['currency']) : '';
    $pay = new ThreeDS($orderData, $sessionID, $order_id);
    $auth_resp = $pay->AuthenticatePayer($redirect_url . '?session=' . $sessionID . '&currency=' . $currency . '&amount=' . $amount);
    // echo the OTP html div returned from the authenticate payer
    echo json_encode($auth_resp, JSON_THROW_ON_ERROR);
} elseif (isset($_POST['response_gatewayRecommendation'])) {
    if ($_POST['response_gatewayRecommendation'] === 'PROCEED') {
        $sessionID = $_GET['session'];
        $amount = (float)$_GET['amount'];
        $currency = $_GET['currency'];
        $orderID = $_POST['order_id'];
        $auth_tranx_id = $_POST['transaction_id'];
        $pay = new Pay(["amount" => $amount, "currency" => $currency], $sessionID, $auth_tranx_id, $orderID);
        $capture = $pay->Capture();
        // order changes here
        $order = wc_get_order($orderID);
        if($capture['status']==='success'){
            $order->add_order_note('Payment Done successfully',false,0);
            $order->set_status('wc-processing');
        }else{
            $order->add_order_note('Payment Failed with OBJ '.$capture['obj'],false,0);
            $order->set_status('wc-failed');
        }
        $order->save();
        echo json_encode($capture);
    }else {
        $orderID = $_POST['order_id'];
        $order = wc_get_order($orderID);
        $order->add_order_note('Payment Failed Authentication Failed ',false,0);
        $order->set_status('wc-failed');
        $order->save();
        echo json_encode(["Err in Authentication", $_POST], JSON_THROW_ON_ERROR);
    }
} else {
    echo json_encode(["Err in payload"], JSON_THROW_ON_ERROR);
}
