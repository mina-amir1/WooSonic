<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
if (isset($request_data['username'],$request_data['password'],$request_data['remember'])){
    $username = $request_data['username'];
    $password = $request_data['password'];
    $remember = (boolean)$request_data['remember'];

    /** @var WP_User $user */
    $user = wp_signon(['user_login'=>$username,
        'user_password'=>$password,
        'remember'=>$remember]);

    if ($user instanceof WP_Error){
        echo json_encode("Invalid Credentials");
    }else{
        echo json_encode("logged in successfully");
    }

}else{
    echo json_encode(['ERR' => "ERR_No_Payload"]);
}
