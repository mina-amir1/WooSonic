<?php
function create_branch_post_type()
{
    $labels = array(
        'name' => 'Branches',
        'singular_name' => 'Branch',
        'menu_name' => 'Branches',
        'name_admin_bar' => 'Branch',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Branch',
        'new_item' => 'New Branch',
        'edit_item' => 'Edit Branch',
        'view_item' => 'View Branch',
        'all_items' => 'All Branches',
        'search_items' => 'Search Branches',
        'parent_item_colon' => 'Parent Branches:',
        'not_found' => 'No branches found.',
        'not_found_in_trash' => 'No branches found in Trash.'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'branch'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title', 'editor', 'thumbnail')
    );

    register_post_type('branch', $args);
}

add_action('init', 'create_branch_post_type');

add_action('add_meta_boxes', 'add_branch_custom_fields');
function add_branch_custom_fields()
{
    add_meta_box('branch_custom_fields_meta_box',
        'Branch Data',
        'render_branch_custom_fields_meta_box',
        'branch',
        'normal',
        'high');
}

function render_branch_custom_fields_meta_box($post)
{
    $type_value = get_post_meta($post->ID, 'type', true);
    $name_value = get_post_meta($post->ID, 'name', true);
    $name_ar_value = get_post_meta($post->ID, 'name_ar', true);
    $address_value = get_post_meta($post->ID, 'address', true);
    $address_ar_value = get_post_meta($post->ID, 'address_ar', true);
    $phone_value = get_post_meta($post->ID, 'phone', true);
    $location_value = get_post_meta($post->ID, 'location', true);


    echo '<div>
            <label for="type">Type:</label>';
    echo '<select id="type" name="type">
        <option hidden>' . esc_attr($type_value) . '</option>
        <option value="booth">booth</option>
        <option value="branch">branch</option>
        </select></div>';

    echo '<div>
            <label for="name">Name:</label>';
    echo '<input type="text" id="name" name="name" value="' . esc_attr($name_value) . '" /></div>';

    echo '<div>
            <label for="name_ar">Arabic Name:</label>';
    echo '<input type="text" id="name_ar" name="name_ar" value="' . esc_attr($name_ar_value) . '" /></div>';


    echo '<div>
            <label for="address">Address:</label>';
    echo '<input type="text" id="address" name="address" value="' . esc_attr($address_value) . '" /><div>';

    echo '<div>
            <label for="address_ar">Arabic Address:</label>';
    echo '<input type="text" id="address_ar" name="address_ar" value="' . esc_attr($address_ar_value) . '" /><div>';


    echo '<div>
            <label for="phone">Phone:</label>';
    echo '<input type="text" id="phone" name="phone" value="' . esc_attr($phone_value) . '" /><div>';

    echo '<div>
            <label for="location">Location:</label>';
    echo '<input type="text" id="location" name="location" value="' . esc_attr($location_value) . '" /><div>';

}

add_action('save_post', 'save_branch_meta_box');

function save_branch_meta_box($post_id)
{
    if (isset($_POST['type'])) {
        $type_value = sanitize_text_field($_POST['type']);
        update_post_meta($post_id, 'type', $type_value);
    }
    if (isset($_POST['name'])) {
        $name_value = sanitize_text_field($_POST['name']);
        update_post_meta($post_id, 'name', $name_value);
    }
    if (isset($_POST['name_ar'])) {
        $name_ar_value = sanitize_text_field($_POST['name_ar']);
        update_post_meta($post_id, 'name_ar', $name_ar_value);
    }
    if (isset($_POST['address'])) {
        $address_value = sanitize_text_field($_POST['address']);
        update_post_meta($post_id, 'address', $address_value);
    }
    if (isset($_POST['address_ar'])) {
        $address_ar_value = sanitize_text_field($_POST['address_ar']);
        update_post_meta($post_id, 'address_ar', $address_ar_value);
    }
    if (isset($_POST['phone'])) {
        $phone_value = sanitize_text_field($_POST['phone']);
        update_post_meta($post_id, 'phone', $phone_value);
    }
    if (isset($_POST['location'])) {
        $location_value = sanitize_text_field($_POST['location']);
        update_post_meta($post_id, 'location', $location_value);
    }
}