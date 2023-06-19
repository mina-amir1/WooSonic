<?php
require_once '../../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
$response = array();

$current_user_id = $request_data['user_id'];
$token = $request_data['token']; 

require_once '../global-functions.php' ;
$authentication =  auth_user($current_user_id , $token);

global $wpdb ;
if($authentication){
    $wpdb->query("DELETE FROM pwa_myaccount_wishlist WHERE user_id = {$current_user_id} AND product_id = {$request_data['product_id']}");
    $response = array('status' => 'success', 'msg' => "Product Removed Successfully");
    
}else{
    $response = array('status' => 'error', 'msg' => "Authentication Error");
}

echo json_encode($response);







