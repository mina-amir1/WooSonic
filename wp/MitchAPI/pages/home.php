<?php
require_once '../../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: x-requested-with,content-type, Set-Cookie');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
header('Cache-Control: public, max-age=86400');

$page = get_page_by_path('home');

if ($page) {
    $page_id = $page->ID;
    $desktop_banners_gallery_ids = get_post_meta($page_id, "desktop_banners_gallery", true);
    $mobile_banners_gallery_ids = get_post_meta($page_id, "mobile_banners_gallery", true);
    $gifts_banners_gallery_ids = get_post_meta($page_id, "gifts_banners_gallery", true);
    $subtitle = get_post_meta($page_id, "subtitle", true);
    $subtitle_ar = get_post_meta($page_id, "subtitle_ar", true);
    $title = get_post_meta($page_id, "title", true);
    $title_ar = get_post_meta($page_id, "title_ar", true);
    $description = get_post_meta($page_id, "description", true);
    $description_ar = get_post_meta($page_id, "description_ar", true);
    $category_slug = get_post_meta($page_id, "category_slug", true);
    $featured_products = get_post_meta($page_id, "featured_products", true);
    $selected_categories = get_post_meta($page_id,'selected_categories',true);

    $desktop_banners_gallery = [];
    $mobile_banners_gallery = [];
    $gifts_banners_gallery = [];
    $featured_products_data = [];
    $selected_categories_data = [];
    if (is_array($desktop_banners_gallery_ids)) {
        foreach ($desktop_banners_gallery_ids as $gallery_id) {
            $image_url = wp_get_attachment_image_src($gallery_id, 'full')[0] ?? '';
            $desktop_banners_gallery[] = $image_url;
        }
    }
    if (is_array($mobile_banners_gallery_ids)) {
        foreach ($mobile_banners_gallery_ids as $gallery_id) {
            $image_url = wp_get_attachment_image_src($gallery_id, 'full')[0] ?? '';
            $mobile_banners_gallery[] = $image_url;
        }
    }
    if (is_array($gifts_banners_gallery_ids)) {
        foreach ($gifts_banners_gallery_ids as $gallery_id) {
            $image_url = wp_get_attachment_image_src($gallery_id, 'full')[0] ?? '';
            $gifts_banners_gallery[] = $image_url;
        }
    }
    if (is_array($featured_products)) {
        foreach ($featured_products as $product_id) {
            $product = wc_get_product($product_id);
            $product_data = [
                'slug' => $product->get_slug(),
                'featured_text' => get_post_meta($product_id,'featured_text',true),
                'featured_text_ar' => get_post_meta($product_id,'featured_text_ar',true),
                'featured_image' => get_post_meta($product_id,'featured_image',true),
                'product_image' => get_the_post_thumbnail_url($product_id,'full')
            ];
            $featured_products_data [] = $product_data;
        }
    }
    if (is_array($selected_categories)) {
        foreach ($selected_categories as $category_slug) {
            /** @var WP_Term $category */
            $category = get_category_by_slug($category_slug);
            $cat_data = [
                'slug' => $category_slug,
                'name' => $category->name,
                'name_ar' => get_term_meta($category->term_id,"ar_category_name",true),
                'min_price' => $category->description,
                'image' => get_term_meta($category->term_id, 'category_thumbnail', true),
            ];
            $selected_categories_data[] = $cat_data;
        }
    }
    $data = [
        'desktop_banners_gallery' => $desktop_banners_gallery,
        'mobile_banners_gallery' => $mobile_banners_gallery,
        'gifts_data' => ['gallery' => $gifts_banners_gallery,
            'title' => $title,
            'title_ar' => $title_ar,
            'subtitle' => $subtitle,
            'subtitle_ar' => $subtitle_ar,
            'description' => $description,
            'description_ar' => $description_ar,
            'category_slug' => $category_slug
        ],
        'featured_products' => $featured_products_data,
        'selected_categories' => $selected_categories_data
    ];
    //print_r($selected_categories);
    echo json_encode($data);
} else {
    echo json_encode(['ERR' => "No homepage"]);
}