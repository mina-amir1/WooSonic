<?php
require_once '../../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
$response = array();

$user_email = $request_data['user_email'];
$sanitized_user_email = str_replace('/','',$user_email );
$user = get_user_by('email', $sanitized_user_email);
if($user){
    $key = $request_data['reset_key'];
    $stored_key = get_user_meta($user->ID, 'reset_password_key', true);
    $stored_time = get_user_meta($user->ID, 'reset_password_time', true);
    if($key === $stored_key && time() - $stored_time < 3600){
        $new_password = $request_data['new_password'];
        wp_set_password($new_password, $user->ID);
        delete_user_meta($user->ID, 'reset_password_key');
        delete_user_meta($user->ID, 'reset_password_time');
        $response = array('status' => 'success', 'msg' => "Password Updated"); 

    }else{
        $response = array('status' => 'error', 'msg' => "Token Expired"); 
    }
}else{
    $response = array('status' => 'error', 'msg' => "Email Error"); 
}



echo json_encode($response);
