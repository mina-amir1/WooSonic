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

        if($default_address -> id == $request_data['address_id']){

            $where = array('id' => $request_data['address_id']);
            $wpdb->delete('pwa_shipping_addresses', $where);

            $all_Addresses = get_all_addresses($current_user_id) ;
            $data = array(
                'status' => 'default'
            );
            if(!empty($all_Addresses)){
                $where = array('id' =>$all_Addresses[0] -> id);
                $wpdb->update('pwa_shipping_addresses', $data, $where);
            }
            echo json_encode(['status' => "success"  , 'msg' => "Address Removed and Default Address Updated"]);
        }else {
            $where = array('id' => $request_data['address_id']);
            $wpdb->delete('pwa_shipping_addresses', $where);
            echo json_encode(['status' => "success"  , 'msg' => "Address Removed"]);
        }

    }else{
        echo json_encode(['status' => "error"  , 'msg' => "User is Not Matched with Address "]);
    }
    

}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







