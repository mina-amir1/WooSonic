<?php
require_once '../wp-load.php';
////$header_content = get_field('header_content_en' , 'options');
////var_dump($header_content);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: '.PWA_Base_Link);
//$conn = new mysqli("DB","root","root","local",null);
//$res = $conn->query("select * from wp_posts where post_title='Has Mega'");
//$data = $res->fetch_assoc();
//$post_content = unserialize($data['post_content']);
////echo json_encode($res->fetch_assoc());
//echo json_encode($post_content);

//$response = array(
//    'status' => 'success',
//    'code'   => '200',
//    'msg'    => get_field('header_content_en','option')
//);
//status_header($response['code']);
echo json_encode(get_field('header_content_en','option'));
