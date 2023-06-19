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

    update_user_meta($current_user_id , 'first_name' , sanitize_text_field($request_data['first_name'] ) ); 
    update_user_meta($current_user_id , 'last_name' , sanitize_text_field($request_data['last_name'] ) );
    //update_user_meta($current_user_id , 'phone_number' , sanitize_text_field($request_data['phone'] ) );
    
    update_user_meta($current_user_id , 'birth_day' , sanitize_text_field($request_data['birth_day'] ) );
    update_user_meta($current_user_id , 'birth_month' , sanitize_text_field($request_data['birth_month'] ) );
    update_user_meta($current_user_id , 'birth_year' , sanitize_text_field($request_data['birth_year'] ) );
    update_user_meta($current_user_id , 'gender' , sanitize_text_field($request_data['gender'] ) );

    $response = array('status' => 'success', 'msg' => "Account Data Updated");

}else{

    $response = array('status' => 'error', 'msg' => "Authentication Failed !");
}


echo json_encode($response);
status_header($response['code']);






