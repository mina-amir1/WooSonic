<?php
// Define a custom class for the payment method
class WC_cdc_Payment extends WC_Payment_Gateway {

    public $domain;

    public function __construct() {
        $this->domain = 'cc';
        // Add settings for the payment method
        $this->id = 'cc';
        $this->title = 'Credit/Debit Card';
        $this->method_title = 'Credit/Debit Card';
        $this->method_description = 'Pay With Credit/Debit Card ';

        $this->has_fields         = false;

        // Add payment method-specific options
        $this->init_form_fields();
        $this->init_settings();


        // Define user set variables
        $this->title        = $this->get_option( 'title' );
        $this->description  = $this->get_option( 'description' );
        $this->instructions = $this->get_option( 'instructions', $this->description );
        $this->order_status = $this->get_option( 'order_status', 'completed' );

        // Add actions to handle the payment process
        add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
        //add_action( 'woocommerce_thankyou_' . $this->id, array( $this, 'thankyou_page' ) );
    }

    // Add settings fields for the payment method
    public function init_form_fields() {

        $this->form_fields = array(
            'enabled' => array(
                'title'   => __( 'Enable/Disable', $this->domain ),
                'type'    => 'checkbox',
                'label'   => __( 'Enable Credit/Debit Card', $this->domain ),
                'default' => 'yes'
            ),
            'title' => array(
                'title'       => __( 'Title', $this->domain ),
                'type'        => 'text',
                'description' => __( 'This controls the title which the user sees during checkout.', $this->domain ),
                'default'     => __( 'Credit/Debit Card', $this->domain ),
                'desc_tip'    => true,
            ),
            'order_status' => array(
                'title'       => __( 'Order Status', $this->domain ),
                'type'        => 'select',
                'class'       => 'wc-enhanced-select',
                'description' => __( 'Choose whether status you wish after checkout.', $this->domain ),
                'default'     => 'wc-pending',
                'desc_tip'    => true,
                'options'     => wc_get_order_statuses()
            ),
            'description' => array(
                'title'       => __( 'Description', $this->domain ),
                'type'        => 'textarea',
                'description' => __( 'Payment method description that the customer will see on your checkout.', $this->domain ),
                'default'     => __('', $this->domain),
                'desc_tip'    => true,
            ),
        );
    }

}

// Add the Wallet Payment method to WooCommerce
function add_wallet_payment_method( $methods ) {
    $methods[] = 'WC_cdc_Payment';
    return $methods;
}
add_filter( 'woocommerce_payment_gateways', 'add_wallet_payment_method' );

