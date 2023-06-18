<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input");
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
global  $wpdb;
$price_range =$request_data['price_range'];
$category=$request_data['category']??'';
$attributes = $request_data['attributes'];
$page =$request_data['page'];
$products_per_page =$request_data['products_per_page'];
$limit_index = $products_per_page * ($page-1);
if (isset($request_data['sort'])){
    $criteria = $request_data['sort']['criteria']??'';
    $arrangement = $request_data['sort']['arrangement']??' ASC';
    switch ($criteria){
        case 'date':
            $sortBy = ' ORDER BY p.post_date';
            break;
        case 'price':
            $sortBy = " AND pm.meta_key = '_price'
          ORDER BY CAST(pm.meta_value AS DECIMAL) ";
            break;
        case 'alphabetical':
            $sortBy = " ORDER BY p.post_title ";
            break;
        default:
            $sortBy ="";
    }
    $sort_query = $sortBy." ".$arrangement;
}
$attr_query ="";
if (!empty($attributes)) {
    foreach ($attributes as $name => $value) {
        $attr_query .= "(";
        foreach ($value as $item) {
            $attr_query .= "post_excerpt LIKE '%" . $name . ": " . $item . "%' OR ";
        }
        $attr_query = substr($attr_query, 0, -4);
        $attr_query .= ") AND";
    }
    $attr_query = substr($attr_query, 0, -3);
    $price_condition = (!empty($price_range))? "AND pm.meta_key = '_price' AND pm.meta_value BETWEEN ". $price_range[0] ." AND ". $price_range[1]:"";
    $query = "SELECT DISTINCT p.ID FROM wp_posts p 
    INNER JOIN wp_term_relationships tr ON tr.object_id = p.ID 
    INNER JOIN wp_term_taxonomy tt ON tt.term_taxonomy_id = tr.term_taxonomy_id 
    INNER JOIN wp_terms t ON t.term_id = tt.term_id
    Inner JOIN wp_postmeta pm ON pm.post_id = p.ID
    WHERE tt.taxonomy = 'product_cat' AND t.slug = '$category' AND p.post_status = 'publish'".$price_condition." AND p.ID 
    IN (SELECT DISTINCT post_parent FROM wp_posts WHERE".$attr_query.")".$sort_query." LIMIT ".$products_per_page. " offset " .$limit_index;
    $results = $wpdb->get_results($query);
}
//filter by price only with no attributes
if (!empty($price_range) && !isset($results)) {
    $args = array(
        'status' => 'publish',
        'category' => $category,
        //products per page
        'limit' => $products_per_page,
        //page number
        'page' => $page,
        'price_range' => "$price_range[0]|$price_range[1]",
        'order' => 'ASC',
    );
    if (isset($criteria)){
        switch ($criteria){
            case 'date':
                $args['orderby'] = 'date';
                $args['order'] = $arrangement??'ASC';
                break;
            case 'alphabetical':
                $args['orderby'] = 'name';
                $args['order'] = $arrangement??'ASC';
                break;
            case 'price':
                $args['orderby'] = 'price';
                $args['order'] = $arrangement??'ASC';
        }
    }
    /** @var WC_Product[] $products */
    $products = wc_get_products($args);
    $data = [];
    foreach ($products as $product) {
        $price = $product->get_price();
        if ($product->get_status() !=='publish'){
            continue;
        }
        if (!(($price_range[0] <= $price) && ($price <= $price_range[1]))) {
            continue;
        }
        $product_type = $product instanceof WC_Product_Variable ? "variable" : "simple";
        $productData = [
            'id' => $product->get_id(),
            'status' => $product->get_status(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'price' => $product->get_regular_price() != '' ? $product->get_regular_price() : $product->get_price(),
            'sale_price' => $product->get_sale_price(),
            'main_image' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            'type' => $product_type,
            // 'image'=> wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
            //'images' => [],
        ];
        /** Gallery */
//        if ($product->get_gallery_image_ids()) {
//            $attachment_ids = $product->get_gallery_image_ids();
//            foreach ($attachment_ids as $attachment_id) {
//                $productData['images'][] = wp_get_attachment_image_src($attachment_id, 'full')[0];
//            }
//        }
        $data[] = $productData;
    }}
else {
    $data = [];
    foreach ($results as $product) {
        /** @var WC_Product $product */
        $product = wc_get_product($product->ID);
        $product_type = $product instanceof WC_Product_Variable ? "variable" : "simple";

//        if ($product->get_status() !=='publish'){
//            continue;
//        }
//        $term = get_the_terms($product->get_id(), 'product_cat');
//        if ($category !== $term[0]->slug) {
//            continue;
//        }
//        if (!empty($price_range)) {
//            $price = $product->get_price();
//            if (!(($price_range[0] <= $price) && ($price <= $price_range[1]))) {
//                continue;
//            }
//        }
        $productData = [
            'id' => $product->get_id(),
            'status' => $product->get_status(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'type' => $product_type,
            'price' => $product->get_regular_price() ?: $product->get_price(),
            'sale_price' => $product->get_sale_price(),
            'main_image' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            // 'image'=> wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
            //'images' => [],
        ];
        /** Gallery */
//        if ($product->get_gallery_image_ids()) {
//            $attachment_ids = $product->get_gallery_image_ids();
//            foreach ($attachment_ids as $attachment_id) {
//                $productData['images'][] = wp_get_attachment_image_src($attachment_id, 'full')[0];
//            }
//        }
        /** Variations */
//        if ($product_type === 'variable') {
//            $productData['attributes'] = $product->get_variation_attributes();
//            $variations = $product->get_available_variations();
//            foreach ($variations as $variation) {
//                $productData['variations'][] = [
//                    'id' => $variation['variation_id'],
//                    'attributes' => $variation['attributes'],
//                    'qty' => $variation['max_qty'],
//                    'price' => $variation['display_regular_price'],
//                    'sale_price' => $variation['display_price'],
//                ];
//            }
//        }
        $data[] = $productData;
    }
}
echo json_encode($data, JSON_THROW_ON_ERROR);