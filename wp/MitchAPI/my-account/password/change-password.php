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
 if($authentication){

    $user_info = get_userdata($current_user_id);
    $wp_pass = $user_info->user_pass;
   
    $confirm = wp_check_password($request_data['current_password'], $wp_pass, $current_user_id);
    if($confirm){
   
      wp_set_password(sanitize_text_field($request_data['new_password'] ) , $current_user_id ) ;
   
        $response = array(
          'status'       => 'success', 
          'msg'         => 'Passwords Changed Successfully' 
        );
    }
    else{
      $response = array(
        'status'       => 'error',
        'msg'         => 'Invalid Current Password !' 
      );
   
    }
 }else{
    $response = array('status' => 'error', 'msg' => "Auth Failed");
 }



echo json_encode($response);
status_header($response['code']);


