<?php
//if home is not added add it
function create_home_page_if_not_exists() {
    // Check if the page already exists
    $page = get_page_by_path('home');
    // If the page doesn't exist, create it
    if (!$page) {
        $page_args = array(
            'post_title'    => 'Home',
            'post_name'     => 'home',
            'post_content'  => '',
            'post_status'   => 'publish',
            'post_type'     => 'page',
        );

        wp_insert_post($page_args);
    }
}

add_action('init', 'create_home_page_if_not_exists');

function add_home_gallery_metabox() {
    $current_page_id = get_the_ID();
    // Specify the IDs of the pages where you want to display the gallery metabox
    $page = get_post($current_page_id);
    $page_slug = $page->post_name;
    // Check if the current page is in the allowed list
    if ($page_slug === 'home') {
        add_meta_box(
            'desktop_gallery_metabox', // Metabox ID
            'Desktop Banners Gallery', // Metabox title
            'render_desktop_gallery_metabox', // Callback function to render the metabox content
            'page', // Post type (adjust as needed)
            'normal', // Metabox position
            'high' // Metabox priority
        );
        add_meta_box(
            'mobile_gallery_metabox', // Metabox ID
            'Mobile Banners Gallery', // Metabox title
            'render_mobile_gallery_metabox', // Callback function to render the metabox content
            'page', // Post type (adjust as needed)
            'normal', // Metabox position
            'high' // Metabox priority
        );
        add_meta_box(
            'gifts_gallery_metabox', // Metabox ID
            'Gifts Banners Gallery', // Metabox title
            'render_gifts_gallery_metabox', // Callback function to render the metabox content
            'page', // Post type (adjust as needed)
            'normal', // Metabox position
            'high' // Metabox priority
        );
        add_meta_box(
            'featured_products_metabox', // Metabox ID
            'Featured Products', // Metabox title
            'render_featured_products_metabox', // Callback function to render the metabox content
            'page', // Post type (adjust as needed)
            'normal', // Metabox position
            'high' // Metabox priority
        );
        add_meta_box(
            'selected_category_metabox', // Metabox ID
            'Selected Category', // Metabox title
            'render_selected_category_metabox', // Callback function to render the metabox content
            'page', // Post type (adjust as needed)
            'normal', // Metabox position
            'high' // Metabox priority
        );
    }
}
add_action('add_meta_boxes', 'add_home_gallery_metabox');

function render_desktop_gallery_metabox($post){
// Get the current gallery images
    $gallery_images = get_post_meta($post->ID, 'desktop_banners_gallery',true);

    // Output the HTML for the gallery
    echo '<div id="desktop-gallery-images">';

    if ($gallery_images) {
        foreach ($gallery_images as $image_id) {
            echo wp_get_attachment_image($image_id, 'thumbnail');
        }
    }

    echo '</div>';
    echo '<input type="hidden" name="desktop_banners_gallery" id="desktop_banners_gallery" value="' . esc_attr(json_encode($gallery_images)) . '" />';
    echo '<input type="button" class="button desktop-gallery-upload-btn" value="Upload Photo">';
    // Enqueue JavaScript
    wp_enqueue_media();
    wp_enqueue_script('home-gallery', get_template_directory_uri() . '/home/custom-gallery.js', array('jquery'), null, true);

}
function render_mobile_gallery_metabox($post){
// Get the current gallery images
    $gallery_images = get_post_meta($post->ID, 'mobile_banners_gallery',true);
    // Output the HTML for the gallery
    echo '<div id="mobile-gallery-images">';

    if ($gallery_images) {
        foreach ($gallery_images as $image_id) {
            echo wp_get_attachment_image($image_id, 'thumbnail');
        }
    }

    echo '</div>';
    echo '<input type="hidden" name="mobile_banners_gallery" id="mobile_banners_gallery" value="' . esc_attr(json_encode($gallery_images)) . '" />';
    echo '<input type="button" class="button mobile-gallery-upload-btn" value="Upload Photo">';
}
function render_gifts_gallery_metabox($post){
// Get the current gallery images
    $gallery_images = get_post_meta($post->ID, 'gifts_banners_gallery',true);
    $subtitle = get_post_meta($post->ID, 'subtitle',true);
    $subtitle_ar = get_post_meta($post->ID, 'subtitle_ar',true);
    $title = get_post_meta($post->ID, 'title',true);
    $title_ar = get_post_meta($post->ID, 'title_ar',true);
    $description = get_post_meta($post->ID, 'description',true);
    $description_ar = get_post_meta($post->ID, 'description_ar',true);
    $category_slug = get_post_meta($post->ID, 'category_slug',true);
    // Output the HTML for the gallery
    echo '<p>Please choose 5 Pictures not more or less</p>';
    echo '<div id="gifts-gallery-images">';
    if ($gallery_images) {
        foreach ($gallery_images as $image_id) {
            echo wp_get_attachment_image($image_id, 'thumbnail');
        }
    }
    echo '</div>';
    echo '<input type="hidden" name="gifts_banners_gallery" id="gifts_banners_gallery" value="' . esc_attr(json_encode($gallery_images)) . '" />';
    echo '<input type="button" class="button gifts-gallery-upload-btn" value="Upload Photo">';
    echo '<br>
          <label>English subtitle</label>
          <input type="text" name="subtitle" value="'.$subtitle.'"/>
          <br>
          <label>Arabic subtitle</label>
          <input type="text" name="subtitle_ar" value="'.$subtitle_ar.'" />
          <br>
          <label>English Title</label>
          <input type="text" name="title" value="'.$title.'" />
          <br>
          <label>Arabic Title</label>
          <input type="text" name="title_ar" value="'.$title_ar.'" />
          <br>
          <label>English description</label>
          <input type="text" name="description" value="'.$description.'" />
          <br>
          <label>Arabic description</label>
          <input type="text" name="description_ar" value="'.$description_ar.'" />
          <br>
          <label>Category Slug</label>
          <input type="text" name="category_slug" value="'.$category_slug.'" />';
}
function render_featured_products_metabox($post){
        // Retrieve saved product IDs from post meta
        $featured_products = get_post_meta($post->ID, 'featured_products');
        // Get all products
        $products = new WP_Query(array(
            'post_type' => 'product',
            'posts_per_page' => -1,
        ));

        // Output the metabox content
        echo '<select name="featured_products[]" id="product-select" multiple>';
        if ($products->posts) {
            foreach ($products->posts as $product) {
                $product_name = $product->post_title;
                $slug = $product->post_name;
                if (isset($featured_products[0])) {
                    $checked = in_array($product->post_name, $featured_products[0]) ? 'selected="selected"' : '';
                }else{
                    $checked ='';
                }
                echo '<option value="' . esc_attr($slug) . '" ' . $checked . '>';
                echo $product_name;
                echo '</option>';
            }
        }
        echo '</select>';
}
function render_selected_category_metabox($post){
    // Retrieve saved product IDs from post meta
    $selected_categories = get_post_meta($post->ID, 'selected_categories');
    $categories = get_terms(array(
        'taxonomy' => 'product_cat', // Use 'product_cat' taxonomy for product categories
        'hide_empty' => false,       // Include empty categories
    ));
    // Output the metabox content
    echo '<select name="selected_categories[]" id="category-select" multiple>';
    if ($categories && !is_wp_error($categories)) {
        foreach ($categories as $category) {
            if (isset($selected_categories[0])) {
                $checked = in_array($category->slug, $selected_categories[0]) ? 'selected="selected"' : '';
            }else{
                $checked ='';
            }
            echo '<option value="' . esc_attr($category->slug) . '" ' . $checked . '>';
            echo $category->name;
            echo '</option>';
        }
    }
    echo '</select>';
}

function save_home_gallery_data($post_id) {
    $featured_products = get_post_meta($post_id, 'featured_products');
    $selected_categories = get_post_meta($post_id, 'selected_categories');
    if (isset($_POST['subtitle'])) {
        update_post_meta($post_id, 'subtitle', $_POST['subtitle']);
    }elseif (get_post_meta($post_id, 'subtitle') && !isset($_POST['subtitle'])){
        update_post_meta($post_id, 'subtitle', '');
    }
    if (isset($_POST['subtitle_ar'])) {
        update_post_meta($post_id, 'subtitle_ar', $_POST['subtitle_ar']);
    }elseif (get_post_meta($post_id, 'subtitle_ar') && !isset($_POST['subtitle_ar'])){
        update_post_meta($post_id, 'subtitle_ar', '');
    }
    if (isset($_POST['title'])) {
        update_post_meta($post_id, 'title', $_POST['title']);
    }elseif (get_post_meta($post_id, 'title') && !isset($_POST['title'])){
        update_post_meta($post_id, 'title', '');
    }
    if (isset($_POST['title_ar'])) {
        update_post_meta($post_id, 'title_ar', $_POST['title_ar']);
    }elseif (get_post_meta($post_id, 'title_ar') && !isset($_POST['title_ar'])){
        update_post_meta($post_id, 'title_ar', '');
    }
    if (isset($_POST['description'])) {
        update_post_meta($post_id, 'description', $_POST['description']);
    }elseif (get_post_meta($post_id, 'description') && !isset($_POST['description'])){
        update_post_meta($post_id, 'description', '');
    }
    if (isset($_POST['description_ar'])) {
        update_post_meta($post_id, 'description_ar', $_POST['description_ar']);
    }elseif (get_post_meta($post_id, 'description_ar') && !isset($_POST['description_ar'])){
        update_post_meta($post_id, 'description_ar', '');
    }
    if (isset($_POST['category_slug'])) {
        update_post_meta($post_id, 'category_slug', $_POST['category_slug']);
    }elseif (get_post_meta($post_id, 'category_slug') && !isset($_POST['category_slug'])){
        update_post_meta($post_id, 'category_slug', '');
    }
    if (isset($_POST['desktop_banners_gallery'])) {
        $gallery_images = json_decode(stripslashes($_POST['desktop_banners_gallery']), true);
        update_post_meta($post_id, 'desktop_banners_gallery', $gallery_images);
    }
    if (isset($_POST['mobile_banners_gallery'])) {
        $gallery_images = json_decode(stripslashes($_POST['mobile_banners_gallery']), true);
        update_post_meta($post_id, 'mobile_banners_gallery', $gallery_images);
    }
    if (isset($_POST['gifts_banners_gallery'])) {
        $gallery_images = json_decode(stripslashes($_POST['gifts_banners_gallery']), true);
        update_post_meta($post_id, 'gifts_banners_gallery', $gallery_images);
    }
    if (isset($_POST['featured_products'])) {
        update_post_meta($post_id, 'featured_products', $_POST['featured_products']);
    }
    // Handle to save empty array after unselecting
    elseif ($featured_products && !isset($_POST['featured_products'])){
        update_post_meta($post_id, 'featured_products', []);
    }

    if (isset($_POST['selected_categories'])) {
        update_post_meta($post_id, 'selected_categories', $_POST['selected_categories']);
    }
    // Handle to save empty array after unselecting
    elseif ($selected_categories && !isset($_POST['selected_categories'])){
        update_post_meta($post_id, 'selected_categories', []);
    }
}
add_action('save_post', 'save_home_gallery_data');