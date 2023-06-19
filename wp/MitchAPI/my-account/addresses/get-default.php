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
    if(empty($default_address)){

        echo json_encode(['status' => "error"  , 'msg' => "Default Address Is Empty !"]);

    }else{
        $selected_gov = get_gov_name($default_address -> gov_id );
        $selected_area = get_area_name($default_address -> area_id);
        $address_data = array(
            'id' => $default_address -> id ,
            'status' => $default_address -> status ,
            'gov_id' => $default_address -> gov_id ,
            'area_id' => $default_address -> area_id , 
            'gov_name_ar'=>$selected_gov -> gov_name ,
            'gov_name_en'=>$selected_gov -> gov_name_en ,
            'area_name_ar'=>$selected_area -> area_name , 
            'area_name_en'=>$selected_area -> area_name_en , 
            'full_address' => $default_address -> full_Address ,
            'apartment_type' =>  $default_address -> apartment_type ,
            'floor' =>  $default_address -> floor ,
            'apartment' =>  $default_address -> apartment,
            'building_number'=>$one_address -> building_number ,
        );
    echo json_encode($address_data);
    }
   

}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







