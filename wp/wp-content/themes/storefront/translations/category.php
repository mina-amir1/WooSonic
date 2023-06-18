<?php

// Add custom field to category add form
add_action('product_cat_add_form_fields', 'add_ar_category_name_field');
function add_ar_category_name_field() {
    ?>
    <div class="form-field">
        <label for="ar_category_name"><?php echo __('Arabic Name', 'text-domain'); ?></label>
        <input type="text" name="ar_category_name" id="ar_category_name" value="">
    </div>
    <?php
}

// Add custom field to category edit form
add_action('product_cat_edit_form_fields', 'edit_ar_category_name_field');
function edit_ar_category_name_field($term) {
    $custom_field_value = get_term_meta($term->term_id, 'ar_category_name', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="custom_field"><?php echo __('Arabic Name', 'text-domain'); ?></label>
        </th>
        <td>
            <input type="text" name="ar_category_name" id="custom_field" value="<?php echo esc_attr($custom_field_value); ?>">
        </td>
    </tr>
    <?php
}

// Save custom field value when adding or editing category
add_action('created_product_cat', 'save_ar_category_name_field');
add_action('edited_product_cat', 'save_ar_category_name_field');
function save_ar_category_name_field($term_id) {
    if (isset($_POST['ar_category_name'])) {
        $ar_category_name_value = sanitize_text_field($_POST['ar_category_name']);
        update_term_meta($term_id, 'ar_category_name', $ar_category_name_value);
    }
}
