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
    $default_address = get_default_address($current_user_id); 
    if($default_address){
        //var_dump($default_address);
        $data = array(
            'status' => 'secondary',
            'gov_id' => $request_data['gov_id'],
            'area_id' => $request_data['area_id'],
            'full_Address' => $request_data['full_address'],
            'apartment_type' => $request_data['apartment_type'],
            'floor' => $request_data['floor'],
            'apartment' =>$request_data['apartment'],
            'user_id' => $current_user_id,
            'building_number'=>$request_data['building_number'],
        );
        $wpdb->insert('pwa_shipping_addresses', $data);
        echo json_encode(['status' => "success"  , 'msg' => "Secondary Address Is Added"]);

    }else{
        $data = array(
            'status' => 'default',
            'gov_id' => $request_data['gov_id'],
            'area_id' => $request_data['area_id'],
            'full_Address' => $request_data['full_address'],
            'apartment_type' => $request_data['apartment_type'],
            'floor' => $request_data['floor'],
            'apartment' =>$request_data['apartment'],
            'user_id' => $current_user_id,
            'building_number'=>$request_data['building_number'],
        );
    
        $wpdb->insert('pwa_shipping_addresses', $data);
        echo json_encode(['status' => "success"  , 'msg' => "Default Address Added "]);
    }
   
    
}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







