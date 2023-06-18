<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if (!isset($request_data['category'],
    $request_data['products_per_page'],
    $request_data['page_number'],
    $request_data['attributes'])) {
    echo json_encode(['ERR' => "ERR_No_Payload"], JSON_THROW_ON_ERROR);
} else {
    $attributes = $request_data['attributes'];
    $attributes_arr = [];
    foreach ($attributes as $attribute) {
        $attributes_arr[]=[
            'taxonomy' => 'pa_' . $attribute['name'],
            'terms'    => $attribute['value'],
            'operator' => 'IN'
//            'taxonomy' => 'pa_size',
//            'field'    => 'slug',
//            'terms'    => "m"
        ];
    }
    $args = array(
        'category' => $request_data['category'],
        //products per page
        'limit' => $request_data['products_per_page'],
        //page number
        'page' => $request_data['page_number'],
        'attribute' => $attributes_arr,
        //'type' => 'any',
        'order' => 'DESC',
    );
    /** @var WC_Product[] $products */
    $products = wc_get_products($args);
    $data = [];
    foreach ($products as $product) {
        $productData = [
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'price' => $product->get_regular_price()!=''? $product->get_regular_price() :$product->get_price(),
            'sale_price' => $product->get_sale_price(),
            'main_image' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            // 'image'=> wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
            'images' => [],
        ];
        if ($product->get_gallery_image_ids()) {
            $attachment_ids = $product->get_gallery_image_ids();
            foreach ($attachment_ids as $attachment_id) {
                $productData['images'][] = wp_get_attachment_image_src($attachment_id, 'full')[0];
            }
        }
        $data[] = $productData;
    }
    echo json_encode($data);
}