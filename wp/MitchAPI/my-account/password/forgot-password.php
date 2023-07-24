<?php
require_once '../../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
$response = array();

$user_email = $request_data['user_email'];
$user = get_user_by('email', $user_email); 
if($user){
    //Check if User Registered By FB 
    if(get_user_meta($user->ID , 'registered_by' , true) == 'fb'){
        $response = array('status' => 'error', 'msg' => "You Registered Using Social Media Login  ! "); 
        echo json_encode($response);
        return;
    }
    $key = wp_generate_password(20, false);
    update_user_meta($user->ID, 'reset_password_key', $key);
    update_user_meta($user->ID, 'reset_password_time', time());
   // $reset_link =  $theme_settings['site_url'].'/myaccount/reset-password'.'?key='.$key.'&email='.$user_email;
    wp_mail($user_email, 'Reset Your Password', $message);
    
    $response = array('status' => 'success', 'msg' => "An Email Sent To You With Instructions to reset password" , "reset_key" => $key ); 
}else {
    $response = array('status' => 'error', 'msg' => "This E-mail is not registered"); 
}


echo json_encode($response);
