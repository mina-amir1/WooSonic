<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);

// Check Phone Exists 
function Check_phone_number_exist($phone_number){
    global $wpdb;
    $result = $wpdb->get_row("SELECT user_id FROM wp_usermeta WHERE meta_key = 'phone_number' AND meta_value = '$phone_number'");
    return $result ;
}

$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true):[];
$response = array();

$vaild_data = true ;

//Check Email Exists 
if(email_exists($request_data['email'])){
    $vaild_data = false ;
    $response = array('status' => 'error', 'msg_code' => "register_error_email" , 'msg' => "Email Exists" ,);
}

if($vaild_data){
    if(!empty(Check_phone_number_exist($request_data['phone']))){
        $vaild_data = false ;
        $response = array('status' => 'error','msg_code' => "register_error_phone" , 'msg' => " Phone Exists");
    }
}



require_once 'global-functions.php';
if( $vaild_data){
    $result = wp_create_user($request_data['email'], $request_data['password'], $request_data['email']);
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
      update_user_meta($user->ID, 'first_name', sanitize_text_field($request_data['first_name']));
      update_user_meta($user->ID, 'last_name', sanitize_text_field($request_data['last_name']));
      update_user_meta($user->ID, 'phone_number', $request_data['phone']);
      update_user_meta($user->ID, 'registered_by', sanitize_text_field("wp"));

      add_user_meta($user->ID , 'birth_day' , sanitize_text_field($request_data['birth_day'] ) );
      add_user_meta($user->ID , 'birth_month' , sanitize_text_field($request_data['birth_month'] ) );
      add_user_meta($user->ID , 'birth_year' , sanitize_text_field($request_data['birth_year'] ) );
      add_user_meta($user->ID , 'gender' , sanitize_text_field($request_data['gender'] ) );
      wp_set_current_user($user->ID);
      wp_set_auth_cookie($user->ID);

      $encrypted_token = generate_user_token($user->ID);

      $response = array('status' => 'success', 'msg' => "Account Created " , "user_id" => $user->ID , 'token' => $encrypted_token );
    }
  }



echo json_encode($response);
status_header($response['code']);





