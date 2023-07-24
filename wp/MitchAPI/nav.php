<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);

$main_menu_fields = get_field('main_menu', 'options');
$supporting_menu_fields = get_field('supporting_menu', 'options');
$footer_menu_fields = get_field('footer_menu', 'options');
$site_name_fields = get_field('site_name', 'options');
$site_name_ar_fields = get_field('site_name_ar', 'options');
$promotion_content_fields = get_field('promotion_content', 'options');
$data = ['main_menu' => $main_menu_fields,
    'supporting_menu' => $supporting_menu_fields,
    'footer_menu' => $footer_menu_fields,
    'site_name' => $site_name_fields,
    'site_name_ar' => $site_name_ar_fields,
    'promotion_content' => $promotion_content_fields];
if (is_array($data['main_menu'])) {
    foreach ($data['main_menu'] as &$menu) {
        if (!empty($menu['page_link'])) {
            $post_name = get_post_field('post_name', $menu['page_link']);
            $menu['page_link'] = $post_name;
        }
    }
    unset($menu);
}
if (is_array($data['supporting_menu'])) {
    foreach ($data['supporting_menu'] as &$menu) {
        if (!empty($menu['page_link'])) {
            $post_name = get_post_field('post_name', $menu['page_link']);
            $menu['page_link'] = $post_name;
        }
    }
    unset($menu);
}
if (is_array($data['footer_menu'])) {
    foreach ($data['footer_menu'] as &$menu) {
        if (!empty($menu['page_link'])) {
            $post_name = get_post_field('post_name', $menu['page_link']);
            $menu['page_link'] = $post_name;
        }
    }
    unset($menu);
}
echo json_encode($data);
