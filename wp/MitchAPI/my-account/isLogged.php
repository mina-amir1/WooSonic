<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
// Allow sending cookies in CORS requests
header('Access-Control-Allow-Credentials: true');
// Other headers
header('Content-Type: application/json; charset=utf-8');

$user = wp_get_current_user();
echo $user->ID;