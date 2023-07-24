<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true);
if (isset($request_data['firstname'], $request_data['lastname'], $request_data['email'], $request_data['msg'])) {
    global $wpdb;
    $firstname = $request_data['firstname'];
    $lastname = $request_data['lastname'];
    $email = $request_data['email'];
    $msg = $request_data['msg'];
    $phone = $request_data['phone']??'';

    if ($wpdb->query("Insert into pwa_contact_us (email,firstname,lastname,phone,msg) value ('$email','$firstname','$lastname','$phone','$msg')")) {
        echo json_encode(1);
    }else{
        echo json_encode(['status'=>'error','msg'=>$wpdb->last_error]);
    }
} else {
    echo json_encode(['Err in payload']);
}
