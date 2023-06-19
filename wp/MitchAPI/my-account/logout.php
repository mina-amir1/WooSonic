<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
$response = array();

$current_user_id = $request_data['user_id'];
$token = $request_data['token']; 


require_once 'global-functions.php';

$call_back = destroy_token($token); 
if($call_back){
    $response = array('status' => 'success' , 'msg' => "Loggod out and session destroyed");
}else{
    $response = array('status' => 'error' , 'msg' => "Cant find Token Record");
}

echo json_encode($response);