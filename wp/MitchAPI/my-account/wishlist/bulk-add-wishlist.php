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
if($authentication ){
    $products = $request_data['products'];
    foreach($products as $one_product){
        if(empty($wpdb->get_row("SELECT ID FROM pwa_myaccount_wishlist WHERE user_id = {$current_user_id} AND product_id = {$one_product}"))){
            $wpdb->insert('pwa_myaccount_wishlist', array(
              'user_id'    => $current_user_id ,
              'product_id' => $one_product
            ));
          
        }
    }
    echo json_encode(['status' => "success" , 'msg_code' => "wishlist_add_success" , 'msg' => "Added to Wishlist Successfully"]);
   
    
}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







