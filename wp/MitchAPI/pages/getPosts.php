<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true);
if (isset($request_data['post_type'], $request_data['page'], $request_data['posts_per_page'])) {
    $post_type = ($request_data['type']==='blog')?'post':$request_data['type'];
    $page = $request_data['page'];
    $posts_per_page = $request_data['posts_per_page'];
    $metas = $request_data['extra_fields'] ?? [];
    $args = array(
        'post_type' => $post_type ?? 'branch',
        'post_status' => 'publish',
        'posts_per_page' => $posts_per_page, // Retrieve all posts
        'paged' => $page,
    );

    $posts_query = new WP_Query($args);
    $data = [];
    foreach ($posts_query->posts as $post) {
        $title_ar = get_post_meta($post->ID, 'title_ar', true);
        $cont_ar = get_post_meta($post->ID, 'desc_ar', true);
        $extra_data = [];
        foreach ($metas as $meta) {
            $extra_data [$meta] = get_post_meta($post->ID, $meta, true);
        }
        $data [] = [
            'ID' => $post->ID,
            'slug' => $post->post_name,
            'title' => $post->post_title,
            'content' => $post->post_content,
            'ar_title' => $title_ar,
            'ar_content' => $cont_ar,
            'extra_data'=>$extra_data,
            'image' => wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full')[0] ?? '',
        ];
    }
    echo json_encode($data);
} else {
    echo json_encode(['Err in payload']);
}
