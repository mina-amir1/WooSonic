<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: x-requested-with,content-type, Set-Cookie');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
// Set cache-related headers
header('Cache-Control: public, max-age=86400'); // Cache the response for 24 hours

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight OPTIONS request
    header('Access-Control-Allow-Credentials: true');
    exit();
}
$request = file_get_contents("php://input");
$request_data = json_decode($request, true);
if (!isset($request_data['order_id'])) {
    echo json_encode(['ERR' => "ERR_No_Payload"]);
} else {
    $order_id = $request_data['order_id'];
    /** @var WC_Order $order */
    $order = wc_get_order($order_id);
    $data = [];
    if ($order) {
        $items = $order->get_items();
        if (is_array($items)) {
            $items_data = [];
            /** @var WC_Order_Item $item */
            foreach ($items as $item_id => $item) {
                $product = $item->get_product();
                $product_type = "simple";
                $product_slug = $product->get_slug();
                if ($product->is_type('variation')) {
                    $product_type = "variable";
                    $parent_id = $product->get_parent_id();
                    //$product_slug =
                    $variation_attributes = $product->get_variation_attributes();
                    $attr = [];
                    foreach ($variation_attributes as $attribute_taxonomy => $term_slug) {

                        $taxonomy = str_replace('attribute_', '', $attribute_taxonomy);
                        // The label name from the product attribute
                        $attribute_name = wc_attribute_label($taxonomy, $product);
                        $attribute_value = get_term_by('slug', $term_slug, $taxonomy)->name;
                        $attr [] = ['name' => $attribute_name, 'value' => $attribute_value];
                    }
                }
                $items_data[] = [
                    'name' => $item->get_name(),
                    'thumbnail' =>  get_the_post_thumbnail_url($product->get_id()),
                    'type' => $product_type,
                    'slug' => $product_slug,
                    'quantity' => $item->get_quantity(),
                    'subtotal' => $order->get_item_subtotal($item),
                    'total' => $order->get_item_subtotal($item) * $item->get_quantity(),
                    'attr' => $attr ?? '',
                ];
            }
        }
        $fees = $order->get_fees();
        if ($fees) {
            $fees_data = [];
            /** @var WC_Order_Item_Fee $fee */
            foreach ($fees as $fee) {
                $fees_data = ['name' => $fee->get_name(), 'amount' => $fee->get_amount()];
            }
        }
        $data = [
            'billing' => [
                'first_name' => $order->get_billing_first_name(),
                'last_name' => $order->get_billing_last_name(),
                'email' => $order->get_billing_email(),
                'phone' => $order->get_billing_phone(),
                'created_at' => $order->get_date_created()->date('Y-m-d'),
                'gov' => $order->get_meta('_billing_gov')??'',
                'city' => $order->get_meta('_billing_city')??'',
                'apartment_type' => $order->get_meta('_billing_apartment_type')??'',
                'area' => $order->get_meta('_billing_area',true)??'',
                'country' => $order->get_meta('_billing_country')??'',
                'address1' => $order->get_billing_address_1(),
            ],
            'order' => [
                'status' => $order->get_status(),
                'items' => $items_data,
                'subtotal' => $order->get_subtotal(),
                'shipping_fees' => $order->get_shipping_total(),
                'total' => $order->get_total(),
                'discount' => $order->get_total_discount(),
                'payment_method' => $order->get_payment_method_title(),
                'fees' => $fees_data,
            ]
        ];
        echo json_encode($data);
    }else{
        echo json_encode(['No order found']);
    }
}