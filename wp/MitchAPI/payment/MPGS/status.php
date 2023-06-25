<?php
include_once '../../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input") ?? '';
$request_data = json_decode($request, true);
global $wpdb;
if (isset($request_data['sessionID'])) {
    $sessionID = $request_data['sessionID'];
    $result = $wpdb->get_results("Select * from pwa_mpgs_status where sessionID='$sessionID'");
    if ($result) {
        echo json_encode($result[0], JSON_THROW_ON_ERROR);
    } else {
        echo json_encode(["No status found"], JSON_THROW_ON_ERROR);
    }
} elseif (isset($request_data['orderId'])) {
    $orderId = $request_data['orderId'];
    $result = $wpdb->get_results("Select * from pwa_mpgs_status where sessionID='$orderId'");
    if ($result) {
        echo json_encode($result[0], JSON_THROW_ON_ERROR);
    } else {
        echo json_encode(["No status found"], JSON_THROW_ON_ERROR);
    }
} else {
    echo json_encode(["Err in payload"], JSON_THROW_ON_ERROR);
}

