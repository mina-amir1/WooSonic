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
    $user_data = get_userdata($current_user_id); 
    $response = array(
        'first_name' => $user_data -> first_name ,
        'last_name' => $user_data -> last_name ,
        'email'     => $user_data -> user_email ,
        'phone' => $user_data -> phone_number , 
        'birth_day' =>  $user_data -> birth_day ,
        'birth_month' => $user_data -> birth_month,
        'birth_year' => $user_data -> birth_year ,
        'gender'     => $user_data -> gender 
    );

}else{
    $response = array('status' => 'error', 'msg' => "Authentication Failed !  ");
}

echo json_encode($response);
status_header($response['code']);

