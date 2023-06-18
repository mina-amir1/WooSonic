<?php
/// Modify the shipping data shown in the admin panel order view
function modify_admin_shipping_fields($fields)
{
    // Add the 'gov' field to the billing data
    $fields['shipping_method'] = array(
        'label' => __('Shipping Method', 'text-domain'),
        'show'  => true,
    );
    $fields['branch_name'] = array(
        'label' => __('Branch Name', 'text-domain'),
        'show'  => true,
    );
    $fields['delivery_date'] = array(
        'label' => __('Delivery Date', 'text-domain'),
        'show'  => true,
    );
    return $fields;
}
add_filter('woocommerce_admin_shipping_fields', 'modify_admin_shipping_fields', 10, 1);
