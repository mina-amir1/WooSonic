<?php

// Add custom field to category add form
add_action('product_cat_add_form_fields', 'add_category_fields');
function add_category_fields() {
    ?>
    <div class="form-field">
        <label for="ar_category_name"><?php echo __('Mega banner Link', 'text-domain'); ?></label>
        <input type="text" name="mega_banner_link" id="ar_category_name" value="">
    </div>
    <div class="form-field">
        <label for="ar_category_name"><?php echo __('Arabic Description', 'text-domain'); ?></label>
        <input type="text" name="ar_desc" id="ar_category_name" value="">
    </div>
    <?php
}

// Add custom field to category edit form
add_action('product_cat_edit_form_fields', 'edit_category_field');
function edit_category_field($term) {
    $mega_banner_link_value = get_term_meta($term->term_id, 'mega_banner_link', true);
    $ar_desc_value = get_term_meta($term->term_id, 'ar_desc', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="custom_field"><?php echo __('Mega banner Link', 'text-domain'); ?></label>
        </th>
        <td>
            <input type="text" name="mega_banner_link" id="custom_field" value="<?php echo esc_url($mega_banner_link_value); ?>">
        </td>
    </tr>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="custom_field"><?php echo __('Arabic Description', 'text-domain'); ?></label>
        </th>
        <td>
            <input type="text" name="ar_desc" id="custom_field" value="<?php echo esc_attr($ar_desc_value); ?>">
        </td>
    </tr>
    <?php
}

// Save custom field value when adding or editing category
add_action('created_product_cat', 'save_category_field');
add_action('edited_product_cat', 'save_category_field');
function save_category_field($term_id) {
    if (isset($_POST['mega_banner_link'])) {
        $mega_banner_link_value = esc_url($_POST['mega_banner_link']);
        update_term_meta($term_id, 'mega_banner_link', $mega_banner_link_value);
    }
    if (isset($_POST['ar_desc'])) {
        $ar_desc_value = sanitize_text_field($_POST['ar_desc']);
        update_term_meta($term_id, 'ar_desc', $ar_desc_value);
    }
}