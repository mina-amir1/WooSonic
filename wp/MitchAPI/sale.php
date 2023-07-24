<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: '.PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if (!isset($request_data['products_per_page'],$request_data['page_number'])) {
    echo json_encode(['ERR'=>"ERR_No_Payload"]);
}
else {
    $branch_slug = $request_data['branch_slug']??'';
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => $request_data['products_per_page'],
        'page'=>$request_data['page_number'],
        'meta_query' => array(
            'relation' => 'OR',
            array( // Simple products type
                'key' => '_sale_price',
                'value' => 0,
                'compare' => '>',
                'type' => 'numeric'
            ),
            array( // Variable products type
                'key' => '_min_variation_sale_price',
                'value' => 0,
                'compare' => '>',
                'type' => 'numeric'
            )
        )
    );

    /** @var WP_Query $products */
    $products = new WP_Query( $args );
    $data = [];
    foreach ($products->posts as $product) {
        $product = wc_get_product($product->ID);
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