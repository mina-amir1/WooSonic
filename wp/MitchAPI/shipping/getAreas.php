<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if ($request_data['gov_id']) {
    $gov_id = $request_data['gov_id'];
    global $wpdb;
    $results = $wpdb->get_results("Select * from pwa_shipping_area where `gov_id` = ".$gov_id );
    //print_r($results);
    $data = [];
    if ($results) {
        foreach ($results as $area) {
            $data [] = [
                'area_id' => $area->area_id,
                'name_ar' => $area->area_name,
                'name_en' => $area->area_name_en,
                'rate' => $area->area_rate];
        }
    }
    echo json_encode($data, JSON_THROW_ON_ERROR);
}else {
    echo json_encode("Err in payload", JSON_THROW_ON_ERROR);
}