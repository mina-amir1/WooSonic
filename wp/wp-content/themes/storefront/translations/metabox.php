<?php
// Add translation post box to product page
function add_translation_box() {
    add_meta_box(
        'translation_post_box',
        __('PWA Translations', 'your-text-domain'),
        'render_translation_box',
        'product',
        'normal',
        'high'
    );
    add_meta_box(
        'translation_post_box',
        __('PWA Translations', 'your-text-domain'),
        'render_translation_box',
        'post',
        'normal',
        'high'
    );
    add_meta_box(
        'translation_post_box',
        __('PWA Translations', 'your-text-domain'),
        'render_translation_box',
        'page',
        'normal',
        'high'
    );
    add_meta_box(
        'translation_post_box',
        __('PWA Translations', 'your-text-domain'),
        'render_translation_box',
        'recipe',
        'normal',
        'high'
    );
    add_meta_box(
        'translation_post_box',
        __('PWA Translations', 'your-text-domain'),
        'render_translation_box',
        'faq',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_translation_box');

// Render content for translation post box
function render_translation_box($post) {
    // Retrieve custom field value if it exists
    $title_ar_value = get_post_meta($post->ID, 'title_ar', true);
    $desc_ar_value = get_post_meta($post->ID, 'desc_ar', true);
    $short_desc_ar_value = get_post_meta($post->ID, 'short_desc_ar', true);
    ?>

    <p style="display: flex;align-items: start;">
        <label for="title_ar" style="width: 35%"><?php _e('Title in Arabic', 'your-text-domain'); ?>:</label>
        <input type="text" name="title_ar" class="form-field" style="width: 100%" size="30" id="title_ar" value="<?php echo esc_attr($title_ar_value); ?>">
    </p>
    <p style="display: flex;align-items: start;">

        <label for="desc_ar" style="width: 35%"><?php _e('Description in Arabic', 'your-text-domain'); ?>:</label>
        <!--        <textarea name="desc_ar"  id="desc_ar" style="width: 100%;">--><?php //echo esc_attr($desc_ar_value); ?><!--</textarea>-->
        <?php wp_editor($desc_ar_value, 'desc_ar', array('textarea_rows' => 5)); ?>
    </p>
    <p style="display: flex;align-items: start;">
        <label for="short_desc_ar" style="width: 35%"><?php _e('Short Description in Arabic', 'your-text-domain'); ?>:</label>
        <!--        <textarea name="short_desc_ar"  id="short_desc_ar" style="width: 100%;">--><?php //echo esc_attr($short_desc_ar_value); ?><!--</textarea>-->
        <?php wp_editor($short_desc_ar_value, 'short_desc_ar', array('textarea_rows' => 5)); ?>
    </p>

    <?php
}

// Save translation field value
function save_translation_fields_value($post_id) {
    if (isset($_POST['title_ar'])) {
        $title_value = wp_kses_post($_POST['title_ar']);
        update_post_meta($post_id, 'title_ar', $title_value);
    }
    if (isset($_POST['desc_ar'])) {
        $desc_ar_value = wp_kses_post($_POST['desc_ar']);
        update_post_meta($post_id, 'desc_ar', $desc_ar_value);
    }
    if (isset($_POST['short_desc_ar'])) {
        $short_desc_ar_value = wp_kses_post($_POST['short_desc_ar']);
        update_post_meta($post_id, 'short_desc_ar', $short_desc_ar_value);
    }
}
add_action('save_post_product', 'save_translation_fields_value');

// Save translations fields for recipes
function my_custom_recipe_save_action( $post_id ) {
    // Check if the post is of the "recipe" post type
    if ( 'recipe' === get_post_type( $post_id ) ) {
       save_translation_fields_value($post_id);
    }
    // Check if the post is of the "blog" post type
    if ( 'post' === get_post_type( $post_id ) ) {
        save_translation_fields_value($post_id);
    }
    // Check if the post is of the "blog" post type
    if ( 'page' === get_post_type( $post_id ) ) {
        save_translation_fields_value($post_id);
    }
    // Check if the post is of the "faq" post type
    if ( 'faq' === get_post_type( $post_id ) ) {
        save_translation_fields_value($post_id);
    }
}
add_action( 'save_post', 'my_custom_recipe_save_action' );
