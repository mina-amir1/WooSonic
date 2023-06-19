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
global $wpdb ;
if($authentication ){
    $product_ids =  $wpdb->get_results("SELECT product_id FROM pwa_myaccount_wishlist WHERE user_id = {$current_user_id}");
    $Product_array = [] ;
    foreach($product_ids as $product_id){      
        $product = wc_get_product( $product_id->product_id );
      //  var_dump($product);
        if($product){
            $Product_array[] = [
                'id'    => $product_id->product_id ,
                'slug' => $product->get_slug() ,
                'name' => $product->get_name() ,
                'price' =>$product->get_price() , 
                'is_on_sale' => $product->is_on_sale() ,
                'regular_price' => $product->get_regular_price() ,
                'main_image' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
                'main_image_small' => wp_get_attachment_image_src($product->get_image_id(), 'thumbnail')[0] ?? false,
                'sale_price'    => $product->get_sale_price() 
            ];
        }
       

    }
   // $response = array('status' => 'success', 'msg' => "Product Removed Successfully");
    
}else{
    $Product_array = array('status' => 'error', 'msg' => "Authentication Error");
}
 echo json_encode($Product_array);







