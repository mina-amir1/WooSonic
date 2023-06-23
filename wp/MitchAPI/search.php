<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = $request ? json_decode($request, true, 512, JSON_THROW_ON_ERROR):"";
if (isset($request_data['keyword'],$request_data['products_per_page'],$request_data['page'])){
    $products_per_page = $request_data['products_per_page'];
    $page = $request_data['page'];
    $keyword = $request_data['keyword'];
    $params = array(
        'posts_per_page' => $products_per_page,
        'paged' => $page,
        'post_type'      => 'product',
        's'              => $keyword,
        'post_status'    => 'publish',
        'tax_query'      => array(
            'relation'     => 'AND',
            array(
                'taxonomy'         => 'product_visibility',
                'terms'            => array('exclude-from-catalog', 'exclude-from-search'),
                'field'            => 'slug',
                'operator'         => 'Not IN',
                'include_children' => false,
            ),
        ),
    );

    $query = new WP_Query($params);

    if ($query->posts){
        $productsData = [];
        foreach ($query->posts as $post){
            $product = wc_get_product($post->ID);
            $productsData [] =[
                'id' => $product->get_id(),
                'title' => $product->get_title(),
                'ar_title' => $product->get_meta('title_ar', true),
                'slug' => $product->get_slug(),
                'price' => $product->get_regular_price() ?? $product->get_price(),
                'sale_price' => $product->get_sale_price(),
                'qty' => $product->get_stock_quantity(),
                'main_img' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            ];

        }
        echo json_encode($productsData  );
    }else{
        echo json_encode("No products found");
    }

}else{
    echo json_encode(["Err in Payload"]);
}
