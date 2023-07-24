<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");

global $wpdb;
$results = $wpdb->get_results("Select * from pwa_shipping_gov");
$data = [];
if ($results) {
    foreach ($results as $gov) {
        $data [] = [
            'id' => $gov->gov_id,
            'name_ar' => $gov->gov_name,
            'name_en' => $gov->gov_name_en];
    }
}
echo json_encode($data, JSON_THROW_ON_ERROR);