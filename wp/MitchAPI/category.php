<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: '.PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if (!isset($request_data['category'],$request_data['products_per_page'],$request_data['page_number'])) {
    echo json_encode(['ERR'=>"ERR_No_Payload"]);
}
else {
    $branch_slug = $request_data['branch_slug']??'';
    $args = array(
        'status' => 'publish',
        'category' => $request_data['category'],
        //products per page
        'limit' => $request_data['products_per_page'],
        //page number
        'page' => $request_data['page_number'],
        'order' => 'DESC',
//        'tax_query' => array(
//            array(
//                'taxonomy' => 'exclude_branches', // the slug of your custom taxonomy
//                'field' => 'slug',
//                'terms' => array($branch_slug), // an array of term slugs to include
//                'operator' => 'NOT IN'
//            )
//        )
    );
    /** @var WC_Product[] $products */
    $products = wc_get_products($args);
    $data = [];
    foreach ($products as $product) {
        $product_type = $product instanceof WC_Product_Variable ? "variable" : "simple";
        $excluded_branches = get_the_terms($product->get_id(), 'exclude_branches') ?: [];
        $excluded_array = [];
        if (!empty($excluded_branches)){
            /** @var WP_Term $branch */
            foreach ($excluded_branches as $branch){
                $excluded_array []= $branch->slug;
            }
        }
        $productData = [
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'ar_title' => $product->get_meta('title_ar', true),
            'slug' => $product->get_slug(),
            'price' => $product->get_regular_price()!=''? $product->get_regular_price() :$product->get_price(),
            'sale_price' => $product->get_sale_price(),
            //'excluded_branches' => get_the_terms($product->get_id(),'exclude_branches'),
            'main_image' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            // 'image'=> wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
            'images' => [],
            'type' => $product_type,
            'availability' => in_array($branch_slug,$excluded_array,true)?"out of stock":$product->get_stock_status(),
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