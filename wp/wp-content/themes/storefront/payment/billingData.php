<?php
/// Modify the billing data shown in the admin panel order view
function modify_admin_billing_fields($fields)
{
    // Add the 'gov' field to the billing data
    $fields['country'] = array(
        'label' => __('Country', 'text-domain'),
        'show'  => true,
    );
    $fields['gov'] = array(
        'label' => __('Gov', 'text-domain'),
        'show'  => true,
    );
    $fields['area'] = array(
        'label' => __('Area', 'text-domain'),
        'show'  => true,
    );
    $fields['building_no'] = array(
        'label' => __('Building No', 'text-domain'),
        'show'  => true,
    );
    $fields['floor_no'] = array(
        'label' => __('Floor No', 'text-domain'),
        'show'  => true,
    );
    $fields['apartment_no'] = array(
        'label' => __('Apartment No', 'text-domain'),
        'show'  => true,
    );
    $fields['property_type'] = array(
        'label' => __('Property Type', 'text-domain'),
        'show'  => true,
    );

    return $fields;
}
add_filter('woocommerce_admin_billing_fields', 'modify_admin_billing_fields', 10, 1);
