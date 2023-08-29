<?php
// Add featured fields to product data
function add_featured_field_to_product() {

    add_meta_box(
        'featured_fields_metabox', // Metabox ID
        'Featured Fields', // Metabox title
        'render_featured_fields_metabox', // Callback function to render the metabox content
        'product', // Post type (adjust as needed)
        'normal', // Metabox position
        'high' // Metabox priority
    );
    add_meta_box(
        'product_country_metabox', // Metabox ID
        'Product Countries', // Metabox title
        'render_product_country_metabox', // Callback function to render the metabox content
        'product', // Post type (adjust as needed)
        'normal', // Metabox position
        'high' // Metabox priority
    );
}
add_action('add_meta_boxes', 'add_featured_field_to_product');
function render_featured_fields_metabox($post){
// Get the fields
    $featured_text = get_post_meta($post->ID, 'featured_text',true);
    $featured_text_ar = get_post_meta($post->ID, 'featured_text_ar',true);
    $featured_image = get_post_meta($post->ID, 'featured_image',true);
    // Output the HTML for the gallery

    echo '<label>English Featured Text</label>
          <input type="text" name="featured_text" value="'.$featured_text.'"/>
          <br>
          <label>Arabic Featured Text</label>
          <input type="text" name="featured_text_ar" value="'.$featured_text_ar.'" />
          <br>
          <label>Featured Image URL</label>
          <input type="text" name="featured_image" value="'.$featured_image.'" />';
}

function render_product_country_metabox($post){
    // Retrieve saved product IDs from post meta
    $selected_countries = get_post_meta($post->ID, 'selected_countries',true);
    $Countries = ['EG','UAE'];
    $selected_array = explode(',', $selected_countries);
    // Output the metabox content
    echo '<select name="selected_countries[]" id="country-select" multiple>';
        foreach ($Countries as $country) {
            if (isset($selected_array)) {
                $checked = in_array($country, $selected_array) ? 'selected="selected"' : '';
            }else{
                $checked = '';
            }
            echo '<option value="' . esc_attr($country) . '" ' . $checked . '>';
            echo $country;
            echo '</option>';
    }
    echo '</select>';
    wp_enqueue_media();
    wp_enqueue_script('productFields', get_template_directory_uri() . '/productFields/productFields.js', array('jquery'), null, true);

}

function save_metabox_data($post_id) {
    $featured_text = get_post_meta($post_id, 'featured_text');
    if (isset($_POST['featured_text'])) {
        update_post_meta($post_id, 'featured_text', $_POST['featured_text']);
    }elseif (get_post_meta($post_id, 'featured_text') && !isset($_POST['featured_text'])){
        update_post_meta($post_id, 'featured_text', '');
    }

    $featured_text_ar = get_post_meta($post_id, 'featured_text_ar');
    if (isset($_POST['featured_text_ar'])) {
        update_post_meta($post_id, 'featured_text_ar', $_POST['featured_text_ar']);
    }elseif (get_post_meta($post_id, 'featured_text_ar') && !isset($_POST['featured_text_ar'])){
        update_post_meta($post_id, 'featured_text_ar', '');
    }

    $featured_image = get_post_meta($post_id, 'featured_image');
    if (isset($_POST['featured_image'])) {
        update_post_meta($post_id, 'featured_image', $_POST['featured_image']);
    }elseif (get_post_meta($post_id, 'featured_image') && !isset($_POST['featured_image'])){
        update_post_meta($post_id, 'featured_image', '');
    }

    $selected_countries = get_post_meta($post_id, 'selected_countries');
    if (isset($_POST['selected_countries'])) {
        $countries = '';
        foreach ($_POST['selected_countries'] as $country){
            $countries.=  $country.',';
        }
        $countries = substr($countries,0,-1);
        update_post_meta($post_id, 'selected_countries', $countries);
    }
    // Handle to save empty array after unselecting
    elseif ($selected_countries && !isset($_POST['selected_countries'])){
        update_post_meta($post_id, 'selected_countries', '');
    }

}
add_action('save_post', 'save_metabox_data');

// Add custom fields to product page
function add_custom_product_fields() {
    // Add your custom fields here
    woocommerce_wp_text_input(
        array(
            'id' => 'regular_price_UAE',
            'label' => __('Regular Price UAE', 'woocommerce'),
            'desc_tip' => 'false',
            'wrapper_class' => 'form-field',
        ),
    );
    woocommerce_wp_text_input(
        array(
            'id' => 'sale_price_UAE',
            'label' => __('Sale Price UAE', 'woocommerce'),
            'desc_tip' => 'false',
            'wrapper_class' => 'form-field',
        ),
    );

    woocommerce_wp_select(
        array(
            'id' => 'stock_UAE',
            'label' => __('Stock For UAE', 'woocommerce'),
            'options' => array(
                '1' => __('In Stock', 'woocommerce'),
                '0' => __('Out of Stock', 'woocommerce'),
            ),
            'desc_tip' => 'false',
            'wrapper_class' => 'form-field',
        )
    );
}
add_action('woocommerce_product_options_general_product_data', 'add_custom_product_fields');

// Display custom fields in product tabs
function display_UAE_field_in_tabs() {
    global $product;
    $regular_price_UAE = get_post_meta($product, 'regular_price_UAE', true);
    $sale_price_UAE = get_post_meta($product, 'sale_price_UAE', true);
    $stock_uae = get_post_meta($product, 'stock_UAE', true);


    echo '<div class="form-field">';
    echo '<p>' . $regular_price_UAE . '</p>';
    echo '</div>';

    echo '<div class="form-field">';
    echo '<p>' . $sale_price_UAE . '</p>';
    echo '</div>';

    echo '<div class="form-field">';
    echo '<p>' . $stock_uae . '</p>';
    echo '</div>';
}

// Display custom field in the "General" tab for simple products
add_action('woocommerce_product_data_panels', 'display_UAE_field_in_tabs');



// Save custom fields data
function save_custom_product_fields($product_id) {
    $product = wc_get_product($product_id);
    if ($product->is_type('variable')){
        return;
    }
    $custom_field = sanitize_text_field($_POST['regular_price_UAE']);
    update_post_meta($product_id, 'regular_price_UAE', $custom_field);
    $custom_field = sanitize_text_field($_POST['sale_price_UAE']);
    update_post_meta($product_id, 'sale_price_UAE', $custom_field);
    $custom_field = sanitize_text_field($_POST['stock_UAE']);
    update_post_meta($product_id, 'stock_UAE', $custom_field);
}
add_action('woocommerce_process_product_meta', 'save_custom_product_fields');






// Display custom field for each variation in the Variations tab
add_action('woocommerce_variation_options', 'display_custom_field_for_variations', 10, 3);
function display_custom_field_for_variations($loop, $variation_data, $variation) {
    $regular_price_UAE = get_post_meta($variation->ID, 'regular_price_UAE', true);
    woocommerce_wp_text_input(
        array(
            'id' => 'regular_price_UAE[' . $loop . ']',
            'label' => __('Regular Price (UAE)', 'woocommerce'),
            'value' => $regular_price_UAE,
            'desc_tip' => 'false',
        )
    );
    $sale_price_UAE = get_post_meta($variation->ID, 'sale_price_UAE', true);
    woocommerce_wp_text_input(
        array(
            'id' => 'sale_price_UAE[' . $loop . ']',
            'label' => __('Sale Price (UAE)', 'woocommerce'),
            'value' => $sale_price_UAE,
            'desc_tip' => 'false',
        )
    );
    $sale_price_UAE = get_post_meta($variation->ID, 'stock_UAE', true);
    woocommerce_wp_select(
        array(
            'id' => 'stock_UAE[' . $loop . ']',
            'label' => __('Stock For UAE', 'woocommerce'),
            'options' => array(
                '1' => __('In Stock', 'woocommerce'),
                '0' => __('Out of Stock', 'woocommerce'),
            ),
            'value' => $sale_price_UAE,
            'desc_tip' => 'false',
            'wrapper_class' => 'form-field',
        )
    );
}

// Save custom field for each variation
add_action('woocommerce_save_product_variation', 'save_variation_custom_field', 10, 2);
function save_variation_custom_field($variation_id, $i) {
    $custom_field = sanitize_text_field($_POST['regular_price_UAE'][$i]);
    update_post_meta($variation_id, 'regular_price_UAE', $custom_field);
    $custom_field = sanitize_text_field($_POST['sale_price_UAE'][$i]);
    update_post_meta($variation_id, 'sale_price_UAE', $custom_field);
    $custom_field = sanitize_text_field($_POST['stock_UAE'][$i]);
    update_post_meta($variation_id, 'stock_UAE', $custom_field);
}
