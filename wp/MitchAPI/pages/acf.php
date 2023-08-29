<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: x-requested-with,content-type, Set-Cookie');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
header('Cache-Control: public, max-age=86400');

$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if (!isset($request_data['page'])) {
    echo json_encode(['ERR'=>"ERR_No_Payload"]);
}else{
    $page = get_page_by_path($request_data['page']);
    if ($page){
        $fields = get_field('content', $page->ID);
        $json_data = json_encode($fields);
        file_put_contents($request_data['page'].'.json', $json_data);
        echo json_encode($fields);
    }else{
        echo json_encode(['ERR'=>"No page Found"]);
    }
}