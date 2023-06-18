<?php
/**
 * Storefront engine room
 *
 * @package storefront
 */

/**
 * Assign the Storefront version to a var
 */
$theme = wp_get_theme('storefront');
$storefront_version = $theme['Version'];

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if (!isset($content_width)) {
    $content_width = 980; /* pixels */
}

$storefront = (object)array(
    'version' => $storefront_version,

    /**
     * Initialize all the things.
     */
    'main' => require 'inc/class-storefront.php',
    'customizer' => require 'inc/customizer/class-storefront-customizer.php',
);

require 'inc/storefront-functions.php';
require 'inc/storefront-template-hooks.php';
require 'inc/storefront-template-functions.php';
require 'inc/wordpress-shims.php';

if (class_exists('Jetpack')) {
    $storefront->jetpack = require 'inc/jetpack/class-storefront-jetpack.php';
}

if (storefront_is_woocommerce_activated()) {
    $storefront->woocommerce = require 'inc/woocommerce/class-storefront-woocommerce.php';
    $storefront->woocommerce_customizer = require 'inc/woocommerce/class-storefront-woocommerce-customizer.php';

    require 'inc/woocommerce/class-storefront-woocommerce-adjacent-products.php';

    require 'inc/woocommerce/storefront-woocommerce-template-hooks.php';
    require 'inc/woocommerce/storefront-woocommerce-template-functions.php';
    require 'inc/woocommerce/storefront-woocommerce-functions.php';
}

if (is_admin()) {
    $storefront->admin = require 'inc/admin/class-storefront-admin.php';

    require 'inc/admin/class-storefront-plugin-install.php';
}

/**
 * NUX
 * Only load if wp version is 4.7.3 or above because of this issue;
 * https://core.trac.wordpress.org/ticket/39610?cversion=1&cnum_hist=2
 */
if (version_compare(get_bloginfo('version'), '4.7.3', '>=') && (is_admin() || is_customize_preview())) {
    require 'inc/nux/class-storefront-nux-admin.php';
    require 'inc/nux/class-storefront-nux-guided-tour.php';
    require 'inc/nux/class-storefront-nux-starter-content.php';
}

/**
 * Note: Do not add any custom code here. Please use a custom plugin so that your customizations aren't lost during updates.
 * https://github.com/woocommerce/theme-customisations
 */

//////////////////////// Header And Footer //////////////////////////////////
add_action('acf/init', 'my_acf_op_init');
function my_acf_op_init()
{

    // Check function exists.
    if (function_exists('acf_add_options_page')) {

        // Register options page.
        acf_add_options_page(array(
            'page_title' => __('MitchPWA Settings'),
            'menu_title' => __('MitchPWA Settings'),
            'menu_slug' => 'mitchpwa-general-settings',
            'capability' => 'edit_posts',
            'redirect' => false
        ));
        acf_add_options_sub_page(array(
            'page_title' => 'Header & Footer',
            'menu_title' => 'Header & Footer',
            'parent_slug' => 'mitchpwa-general-settings',
        ));

    }
}


function exclude_branches()
{

    $labels = array(
        'name' => _x('Exclude Branches', 'Exclude Branches'),
        'singular_name' => _x('Exclude Branches', 'Exclude Branch'),
        'search_items' => __('Search Exclude Branches'),
        'all_items' => __('All Exclude Branches'),
        'parent_item' => null,
        'parent_item_colon' => null,
        'edit_item' => __('Edit Exclude Branch'),
        'update_item' => __('Update Exclude Branch'),
        'add_new_item' => __('Add New Branch'),
        'new_item_name' => __('New Exclude Branch'),
        'menu_name' => __('Branches'),
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'show_in_rest' => false, // for Gutenberg support
        'hierarchical' => false, // If you want hierarchical taxonomy, set this to true
        'rewrite' => array('slug' => 'exclude-branches'), // change the slug to whatever you want
    );

    register_taxonomy('exclude_branches', array('product'), $args);
}

add_action('init', 'exclude_branches', 0);


require_once 'shipping/shipping.php';

require_once 'translations/metabox.php';
require_once 'translations/category.php';
require_once 'payment/ccMethod.php';
require_once 'payment/billingData.php';
require_once 'shipping/shippingData.php';
require_once 'payment/paymentPanel.php';
require_once 'smtp/smtpPanel.php';
require_once 'smtp/smtp.php';
require_once 'posttagy/posttagyPanel.php';
require_once 'posttagy/postagy.php';


function pwa_custom_order_statuses()
{
    register_post_status('wc-readyship', array(
        'label' => _x('Ready to Ship', 'Order status', 'text-domain'),
        'public' => true,
        'exclude_from_search' => false,
        'show_in_admin_all_list' => true,
        'show_in_admin_status_list' => true,
        'label_count' => _n_noop('Ready To Ship <span class="count">(%s)</span>', 'Ready To Ship <span class="count">(%s)</span>', 'text-domain')
    ));
    register_post_status('wc-shipped', array(
        'label' => _x('Shipped', 'Order status', 'text-domain'),
        'public' => true,
        'exclude_from_search' => false,
        'show_in_admin_all_list' => true,
        'show_in_admin_status_list' => true,
        'label_count' => _n_noop('Shipped <span class="count">(%s)</span>', 'Shipped <span class="count">(%s)</span>', 'text-domain')
    ));
    add_filter('wc_order_statuses', function ($statuses) {
        $statuses['wc-readyship'] = _x('Ready to Ship', 'Order status', 'text-domain');
        $statuses['wc-shipped'] = _x('Shipped', 'Order status', 'text-domain');
        return $statuses;
    });
}

add_action('init', 'pwa_custom_order_statuses');
