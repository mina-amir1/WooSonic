<?php
function create_recipe_post_type() {
    $labels = array(
        'name'               => 'Recipes',
        'singular_name'      => 'Recipe',
        'menu_name'          => 'Recipes',
        'name_admin_bar'     => 'Recipe',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Recipe',
        'new_item'           => 'New Recipe',
        'edit_item'          => 'Edit Recipe',
        'view_item'          => 'View Recipe',
        'all_items'          => 'All Recipes',
        'search_items'       => 'Search Recipes',
        'parent_item_colon'  => 'Parent Recipes:',
        'not_found'          => 'No recipes found.',
        'not_found_in_trash' => 'No recipes found in Trash.'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array( 'slug' => 'recipe' ),
        'capability_type'     => 'post',
        'has_archive'         => true,
        'hierarchical'        => false,
        'menu_position'       => null,
        'supports'            => array( 'title', 'editor', 'thumbnail', )
    );

    register_post_type( 'recipe', $args );
}
add_action( 'init', 'create_recipe_post_type' );
