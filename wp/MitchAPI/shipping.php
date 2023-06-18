<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true, 512, JSON_THROW_ON_ERROR):"";
global $wpdb;

if(isset($request_data['gov_id'])){
    $gov_id = $request_data['gov_id'];
    $areas = $wpdb->get_results("select * from pwa_shipping_area where gov_id='$gov_id'");
    echo json_encode($areas, JSON_THROW_ON_ERROR);
}else{
    $govs = $wpdb->get_results("select * from pwa_shipping_gov");
    echo json_encode($govs, JSON_THROW_ON_ERROR);
}