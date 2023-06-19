<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
$response = array();

$current_user_id = $request_data['user_id'];
$token = $request_data['token']; 

require_once 'global-functions.php' ;
$authentication =  auth_user($current_user_id , $token);

if($authentication){
    $orderArg = array(
        'customer_id' => $current_user_id,
        'limit' => 10,
        'orderby' => 'date',
            'order' => 'DESC',
        );
    
        $orders = wc_get_orders($orderArg);
        $order_array = [] ;
        foreach ($orders as  $orderData) {
            $order_array[] = [
                "order_id" => $orderData -> get_id(),
                "order_date" => $orderData->get_date_created()->date_i18n('Y-m-d'),
                'order_status' => $orderData->get_status(),
                "order_total"=> $orderData->get_total(),
    
    
            ]; 
     }
    
}else{
    $order_array = array('status' => 'error', 'msg' => "Authentication Failed !  ");
}


    //var_dump($orders);

echo json_encode($order_array);



