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
$request_data = json_decode($request, true);
if (isset($request_data['slug'],$request_data['type'])) {
    $post_slug = $request_data['slug'];
    $post_type = ($request_data['type']==='blog')?'post':$request_data['type'];
    $post = get_page_by_path($post_slug, OBJECT,$post_type);
    if ($post) {
        $meta_data = get_post_meta($post->ID);
        //filter the metas to get only the needed data
        $excluded_meta_keys = array('rank_math_', '_');
        $filtered_meta_data = array_filter($meta_data, function($key) use ($excluded_meta_keys) {
            foreach ($excluded_meta_keys as $excluded_key) {
                if (strpos($key, $excluded_key) === 0) {
                    return false;
                }
            }
            return true;
        }, ARRAY_FILTER_USE_KEY);
        $data  = [
            'ID' => $post->ID,
            'slug' => $post->post_name,
            'title' => $post->post_title,
            'content' => $post->post_content,
            'extra_data' => $filtered_meta_data,
            'image' => wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full')[0] ?? '',
        ];
        echo json_encode($data);
    } else {
        echo json_encode(['No Post Found']);
    }

} else {
    echo json_encode(['Err in payload']);
}
