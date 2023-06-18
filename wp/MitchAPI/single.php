<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$request = file_get_contents("php://input")??'';
$request_data = json_decode($request, true, 512, JSON_THROW_ON_ERROR);
if (!isset($request_data['slug'],)) {
    echo json_encode(['ERR' => "ERR_No_Payload"]);
} else {
    $slug = $request_data['slug'];
    $branch_slug = $request_data['branch_slug'] ?? '';
    $product = get_page_by_path($slug, OBJECT, 'product');// get product object by slug
    if ($product) {
        /** @var WC_Product $product */
        $product = wc_get_product($product->ID);
        $product_type = $product instanceof WC_Product_Variable ? "variable" : "simple";
        /** @var WP_Term $cat */
        $cat = get_the_terms($product->get_id(), 'product_cat')[0];
        $excluded_branches = get_the_terms($product->get_id(), 'exclude_branches') ?: [];
        $excluded_array = [];
        if (!empty($excluded_branches)) {
            /** @var WP_Term $branch */
            foreach ($excluded_branches as $branch) {
                $excluded_array [] = $branch->slug;
            }
        }
        $productData = [
            'id' => $product->get_id(),
            'category_name' => $cat->name,
            'category_slug' => $cat->slug,
            'title' => $product->get_title(),
            'ar_title' => $product->get_meta('title_ar', true),
            'slug' => $product->get_slug(),
            'description' => $product->get_description(),
            'ar_description' => $product->get_meta('desc_ar', true),
            'price' => $product->get_regular_price() ?? $product->get_price(),
            'sale_price' => $product->get_sale_price(),
            'type' => $product_type,
            'qty' => $product->get_stock_quantity(),
            'availability' => in_array($branch_slug, $excluded_array, true) ? "out of stock" : $product->get_stock_status(),
            'main_img' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
            'images' => [],
        ];
        if ($product->get_gallery_image_ids()) {
            $attachment_ids = $product->get_gallery_image_ids();
            foreach ($attachment_ids as $attachment_id) {
                $productData['images'][] = wp_get_attachment_image_src($attachment_id, 'full')[0];
            }
        }
        if ($product_type === 'variable') {
            $productData['attributes'] = $product->get_variation_attributes();
            $variations = $product->get_available_variations();
            foreach ($variations as $variation) {
                $productData['variations'][] = [
                    'id' => $variation['variation_id'],
                    'attributes' => $variation['attributes'],
                    'qty' => $variation['max_qty'],
                    'price' => $variation['display_regular_price'],
                    'sale_price' => $variation['display_price'],
                ];
            }
        }
        echo json_encode($productData);
        // echo json_encode($variations);
    } else {
        echo json_encode(['ERR' => "No Product with this slug"]);
    }
}
