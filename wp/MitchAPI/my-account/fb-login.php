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
// Check if User Exist 

if (isset($request_data['email'],$request_data['id'])){
    $username = $request_data['email'];
    $fb_user_id = $request_data['id'];

    if(email_exists($username)){
        // Login
          /** @var WP_User $user */
        $user = wp_signon(['user_login'=>$username,
        'user_password'=>$fb_user_id,
        'remember'=>1]);
        if(is_wp_error($user)){
            echo json_encode(['status' => "error" , 'msg_code' => "login_error" , 'msg' => "There is a problem with the data, please check again!"]);
        }else{
        
            //Check if User Token Exists 
            $token = check_if_logged_in($user->ID ,  $_SERVER['HTTP_USER_AGENT']) ;
            if(!empty($token)){
                echo json_encode(['status' => "success" , 'msg_code' => "login_success" , 'msg' => "Logged In Successfuly" , 'user_id' => $user -> ID , 'token' => $token->token ]);
            }else{
                // Update pwa_users table with the record and token 
                $encrypted_token = generate_user_token($user->ID);
                echo json_encode(['status' => "error" , 'msg_code' => "login_success" , 'msg' => "Logged In Successfuly" , 'user_id' => $user -> ID , 'token' => $encrypted_token  ]);
            }
           
           
        }

    
    }else{
        // Register 
        $result = wp_create_user($request_data['email'], $request_data['id'], $request_data['email']);
        if(is_wp_error($result)){
          $response = array('status' => 'error', 'msg' => $result->get_error_message());
        }else{
          $user = get_user_by('ID', $result);
          // Add role
          // Remove role
          $user->remove_role('subscriber');
          $user->remove_role('shop_manager');
          $user->remove_role('administrator');
          $user->add_role('customer');

          if (str_contains($request_data['name'], ' ')) {
            $full_name = explode(" ", $request_data['name']);
            update_user_meta($user->ID, 'first_name', sanitize_text_field($full_name[0]));
            update_user_meta($user->ID, 'last_name', sanitize_text_field($full_name[1]));
          }
          update_user_meta($user->ID, 'registered_by', sanitize_text_field("fb"));
          wp_set_current_user($user->ID);
          wp_set_auth_cookie($user->ID);
    
          $encrypted_token = generate_user_token($user->ID);
    
          $response = array('status' => 'success', 'msg' => "Account Created " , "user_id" => $user->ID , 'token' => $encrypted_token );
        }
        
        echo json_encode($response);

    }

}else{
    echo json_encode(['ERR' => "ERR_No_Payload"]);
}







?>