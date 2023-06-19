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
        $data = array(
            'gov_id' => $request_data['gov_id'],
            'area_id' => $request_data['area_id'],
            'full_Address' => $request_data['full_address'],
            'apartment_type' => $request_data['apartment_type'],
            'floor' => $request_data['floor'],
            'apartment' =>$request_data['apartment'],
            'building_number'=>$request_data['building_number'],
        );
    
        $where = array('id' =>$request_data['address_id'] );
    
        $wpdb->update('pwa_shipping_addresses', $data, $where);
        echo json_encode(['status' => "success"  , 'msg' => "Address Updated"]);
    }else{
        echo json_encode(['status' => "error"  , 'msg' => "User is Not Matched with Address "]);
    }
    

}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







