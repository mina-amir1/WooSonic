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
    $all_addresses = get_all_addresses($current_user_id);
    $addresses_array = [] ;
    foreach($all_addresses as $one_address){
        $selected_gov = get_gov_name($one_address -> gov_id );
        $selected_area = get_area_name($one_address -> area_id);

        $addresses_array[] = [
            'id' => $one_address -> id ,
            'status' => $one_address -> status ,
            'gov_id' => $one_address -> gov_id ,
            'area_id' => $one_address -> area_id ,
            'gov_name_ar'=>$selected_gov -> gov_name ,
            'gov_name_en'=>$selected_gov -> gov_name_en ,
            'area_name_ar'=>$selected_area -> area_name , 
            'area_name_en'=>$selected_area -> area_name_en , 
            'full_address' => $one_address -> full_Address ,
            'apartment_type' =>  $one_address -> apartment_type ,
            'floor' =>  $one_address -> floor ,
            'apartment' =>  $one_address -> apartment,
            'building_number'=>$one_address -> building_number ,
        ];
    }
    echo json_encode($addresses_array);

}else{
    echo json_encode(['status' => "error"  , 'msg' => "Authentication Failed !"]);
}







