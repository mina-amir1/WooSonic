<?php
function send_posttagy_notification($order_id, $old_status, $new_status, $order)
{
    require_once ABSPATH . 'wp-content/themes/storefront/posttagy/createsend-php-master/csrest_transactional_smartemail.php';
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
        $smart_email_id='';
        $message = [];
        switch ($new_status){
            case 'completed':
                if($settings['posttagy_completed']){
                    $smart_email_id = $settings['posttagy_completed'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
                    );
                }
                break;
            case 'processing':
                if($settings['posttagy_processing']){
                    $smart_email_id = $settings['posttagy_processing'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
                    );
                }
                break;
            case 'readyship':
                if($settings['posttagy_ready_to_ship']){
                    $smart_email_id = $settings['posttagy_ready_to_ship'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
                    );
                }
                break;
            case 'shipped':
                if($settings['posttagy_shipped']){
                    $smart_email_id = $settings['posttagy_shipped'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
                    );
                }
                break;
            case 'cancelled':
                if($settings['posttagy_cancelled']){
                    $smart_email_id = $settings['posttagy_cancelled'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
                    );
                }
                break;
            case 'refunded':
                if($settings['posttagy_refunded']){
                    $smart_email_id = $settings['posttagy_refunded'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
                    );
                }
                break;
            case 'failed':
                if($settings['posttagy_failed']){
                    $smart_email_id = $settings['posttagy_failed'];
                    $message = array(
                        "To" => $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . '<' . $order->get_billing_email() . '>',
                        "Data" => array(
                            'order_total' => $order->get_total(),
                            'order_number' => $order_id
                        ),
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