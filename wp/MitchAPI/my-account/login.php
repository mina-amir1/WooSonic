<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
// Allow sending cookies in CORS requests
header('Access-Control-Allow-Credentials: true');
// Other headers
header('Content-Type: application/json; charset=utf-8');
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];

require_once 'global-functions.php';
if (isset($request_data['username'],$request_data['password'],)){
    $username = $request_data['username'];
    $password = $request_data['password'];

    /** @var WP_User $user */
    $user = wp_signon(['user_login'=>$username,
        'user_password'=>$password,
        'remember'=>1]);

   if(is_wp_error($user)){
    echo json_encode(['status' => "success" , 'msg_code' => "login_error" , 'msg' => "There is a problem with the data, please check again!"]);
   }else{

    //Check if User Token Exists 
    $token = check_if_logged_in($user->ID ,  $_SERVER['HTTP_USER_AGENT']) ;
    if(!empty($token)){
        echo json_encode(['status' => "success" , 'msg_code' => "login_success" , 'msg' => "Logged In Successfuly" , 'user_id' => $user -> ID , 'token' => $token->token ]);
    }else{
        // Update pwa_users table with the record and token 
        $encrypted_token = generate_user_token($user->ID);
        echo json_encode(['status' => "success" , 'msg_code' => "login_success" , 'msg' => "Logged In Successfuly" , 'user_id' => $user -> ID , 'token' => $encrypted_token  ]);
    }
   
   
   }
  

}else{
    echo json_encode(['ERR' => "ERR_No_Payload"]);
}
