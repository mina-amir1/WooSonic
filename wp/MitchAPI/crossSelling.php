<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if ($request_data['product_id']) {
    $product_id = $request_data['product_id'];
    $cross_sell_ids = get_post_meta($product_id, '_crosssell_ids', true);
    foreach ($cross_sell_ids as $cross_sell_id) {
        $product = wc_get_product($cross_sell_id);
        $product_type = $product instanceof WC_Product_Variable ? "variable" : "simple";
        $productData = [
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'price' => $product->get_regular_price() != '' ? $product->get_regular_price() : $product->get_price(),
            'sale_price' => $product->get_sale_price(),
            'main_image' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            // 'image'=> wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
            'images' => [],
            'type' => $product_type,
        ];
        if ($product->get_gallery_image_ids()) {
            $attachment_ids = $product->get_gallery_image_ids();
            foreach ($attachment_ids as $attachment_id) {
                $productData['images'][] = wp_get_attachment_image_src($attachment_id, 'full')[0];
            }
        }
        $data[] = $productData;
    }
    echo json_encode($data, JSON_THROW_ON_ERROR);
} else {
    echo json_encode("Err in payload", JSON_THROW_ON_ERROR);
}