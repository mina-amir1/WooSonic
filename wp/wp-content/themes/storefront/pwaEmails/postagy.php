<?php
/** @param $order WC_Order */
function send_posttagy_notification($order_id, $old_status, $new_status, $order)
{
    require_once ABSPATH . 'wp-content/themes/storefront/pwaEmails/createsend-php-master/csrest_transactional_smartemail.php';
    global $wpdb;
    $res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%posttagy%'");
    $settings = [];
    if ($res) {
        foreach ($res as $item) {
            $settings[$item->setting_name] = $item->setting_value;
        }
    }
    if ($settings['posttagy_api_key'] && $settings['posttagy_enabled']) {
        $auth = array('api_key' => $settings['posttagy_api_key']);
        $smart_email_id = '';
        $message = [];
        /** @var WC_Order_Item[] $items */
        $items = $order->get_items();
        $items_data = [];
        foreach ($items as $item) {
            $product_id = $item->get_variation_id() ?? $item->get_product_id();
            $product = wc_get_product($product_id);
            $items_data[] = [
                'thumbnail' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? false,
                'name_ar' => $product->get_meta('title_ar', true),
                'variation' => $product->get_variation_attributes() ?? '',
                'price' => $product->get_price(),
                'quantity' => $item->get_quantity(),
                'subtotal' => $item->get_subtotal()
            ];
        }
        $msg_data = array(
            'order_total' => $order->get_total(),
            'order_number' => $order_id,
            'order_currency' => $order->get_currency(),
            'items' => $items_data,
            'first_name' => $order->get_billing_first_name(),
            'last_name' => $order->get_billing_last_name(),
            'email' => $order->get_billing_email(),
            'shipping_method' => $order->get_shipping_method(),
            'billing_address' => $order->get_billing_address_1(),
            'billing_area' => $order->get_meta('_billing_area', true) ?? '',
            'billing_state' => $order->get_meta('_billing_city')??'',
            'billing_country' => $order->get_billing_country(),
            'phone' => $order->get_billing_phone(),
            'order_date' => $order->get_date_created()->date(),
            'order_subtotal_to_display' => $order->get_subtotal_to_display(),
            'shipping_to_display' => $order->get_shipping_to_display(),
            'order_total_discount' => $order->get_discount_total(),
        );
        switch ($new_status) {
            case 'completed':
                if ($settings['posttagy_completed']) {
                    $smart_email_id = $settings['posttagy_completed'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
            case 'processing':
                if ($settings['posttagy_processing']) {
                    $smart_email_id = $settings['posttagy_processing'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
            case 'readyship':
                if ($settings['posttagy_ready_to_ship']) {
                    $smart_email_id = $settings['posttagy_ready_to_ship'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
            case 'shipped':
                if ($settings['posttagy_shipped']) {
                    $smart_email_id = $settings['posttagy_shipped'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
            case 'cancelled':
                if ($settings['posttagy_cancelled']) {
                    $smart_email_id = $settings['posttagy_cancelled'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
            case 'refunded':
                if ($settings['posttagy_refunded']) {
                    $smart_email_id = $settings['posttagy_refunded'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
            case 'failed':
                if ($settings['posttagy_failed']) {
                    $smart_email_id = $settings['posttagy_failed'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => $msg_data,
                    );
                }
                break;
        }
        $wrap = new CS_REST_Transactional_SmartEmail($smart_email_id, $auth);
        $consent_to_track = 'yes'; # Valid: 'yes', 'no', 'unchanged'
        $wrap->send($message, $consent_to_track);
    }
}

add_action('woocommerce_order_status_changed', 'send_posttagy_notification', 10, 4);

function send_posttagy_on_create($order_id) {
    $order = wc_get_order($order_id);
    $new_status = $order->get_status();
    send_posttagy_notification($order_id,'',$new_status,$order);
}

add_action('woocommerce_new_order', 'send_posttagy_on_create',10,1);
