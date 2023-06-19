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

    if(validate_address($current_user_id , $request_data['address_id'])){
        $default_address = get_default_address($current_user_id); 
        
        $data = array(
            'status' => 'secondary'
        );
        $where = array('id' => $default_address -> id);
        $wpdb->update('pwa_shipping_addresses', $data, $where);

        $data = array(
            'status' => 'default'
        );
        $where = array('id' => $request_data['address_id']);
        $wpdb->update('pwa_shipping_addresses', $data, $where);
        echo json_encode(['status' => "success"  , 'msg' => "Default Address Changed"]);
    }else{
        echo json_encode(['status' => "error"  , 'msg' => "User is Not Matched with Address "]);
    }
    

}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







