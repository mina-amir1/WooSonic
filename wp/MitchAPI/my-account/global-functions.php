<?php 

function generate_user_token($user_id){
    $currentTimestamp = time();
    $currentTime = date('Y-m-d H:i:s', $currentTimestamp);
    $randomNumber = rand(1, 1000);
    $user_token = $user_id . $currentTime . $randomNumber ;
    $encrypted_token = hash('sha256', $user_token); ;
    $data = array(
        'user_id' => $user_id,
        'token' => $encrypted_token,
        'device' => $_SERVER['HTTP_USER_AGENT'],
    );
    global $wpdb;

    $result = $wpdb->insert('pwa_users', $data);
    return $encrypted_token;
}

function check_if_logged_in($user_id , $user_device ){
    global $wpdb;
    return  $wpdb->get_row("SELECT * FROM pwa_users WHERE user_id = $user_id AND device = '{$user_device}'" );

}

function auth_user($user_id , $token){
  //  var_dump($token);
    global $wpdb ; 
    $current_user_record = $wpdb->get_row("SELECT  *  FROM pwa_users WHERE token = '{$token}'"  );  

    if($current_user_record){
        if($user_id == $current_user_record -> user_id){
            return true ;
        }else {
            return false ;
            
        }

    }else{
        return false ;
    }

}

function destroy_token($token){
    global $wpdb;

    // Delete the record
    $wpdb->delete('pwa_users', array('token' => $token)); 
    // Check if any rows were affected
    if ($wpdb->rows_affected > 0) {
        wp_logout();
        return true;
    } else {
      
        return false;
    }

}

function get_default_address($user_id){
    global $wpdb;
    return $wpdb->get_row("SELECT * FROM pwa_shipping_addresses WHERE user_id = $user_id AND status = 'default'");
}

function get_all_addresses($user_id){
    global $wpdb;
    return $wpdb->get_results("SELECT * FROM pwa_shipping_addresses WHERE user_id = $user_id ");
}

function validate_address($user_id , $address_id){
    global $wpdb;
    return  $wpdb->get_row("SELECT * FROM pwa_shipping_addresses WHERE user_id = $user_id AND id = $address_id");


}

function get_gov_name($gov_id){
 global $wpdb;
    return  $wpdb->get_row("SELECT * FROM pwa_shipping_gov WHERE gov_id = $gov_id ");
}

function get_area_name($area_id){
    global $wpdb;
    return  $wpdb->get_row("SELECT * FROM pwa_shipping_area WHERE area_id = $area_id ");
}

