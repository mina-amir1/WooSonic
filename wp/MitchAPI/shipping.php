<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true, 512, JSON_THROW_ON_ERROR) : "";
global $wpdb;
$res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%feature%'");
$settings = [];
if ($res) {
    foreach ($res as $item) {
        $settings[$item->setting_name] = $item->setting_value;
    }
}
if (isset($request_data['gov_id'])) {
    if ($settings['feature_shipping_enable_govs']) {
        $gov_id = $request_data['gov_id'];
        $cities = $wpdb->get_results("select * from pwa_shipping_city where gov_id='$gov_id'");
        echo json_encode($cities, JSON_THROW_ON_ERROR);
    }else{
        echo json_encode(['Govs level is not enabled']);
    }
}elseif (isset($request_data['city_id'])) {
    if ($settings['feature_shipping_enable_areas']) {
        $city_id = $request_data['city_id'];
        $areas = $wpdb->get_results("select * from pwa_shipping_area where city_id='$city_id'");
        echo json_encode($areas, JSON_THROW_ON_ERROR);
    }else{
        echo json_encode(['Areas level is not enabled']);
    }
}
else {
    $data = [];
    if ($settings['feature_shipping_enable_govs']) {
        $govs = $wpdb->get_results("select * from pwa_shipping_gov");
        $data['levels']['govs_level'] = true;
        if ($settings['feature_shipping_enable_areas']) {
            $data['levels']['areas_level'] = true;
        } else {
            $data['levels']['areas_level'] = false;
        }
        $data['govs'] = $govs;
    } elseif ($settings['feature_shipping_enable_areas']) {
        $cities = $wpdb->get_results("select * from pwa_shipping_city");
        $data['levels']['govs_level'] = false;
        $data['levels']['areas_level'] = true;
        $data['cities'] = $cities;
    } else {
        $cities = $wpdb->get_results("select * from pwa_shipping_city");
        $data['levels']['govs_level'] = false;
        $data['levels']['areas_level'] = false;
        $data['cities'] = $cities;
    }
    echo json_encode($data, JSON_THROW_ON_ERROR);
}