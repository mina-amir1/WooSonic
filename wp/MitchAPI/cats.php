<?php
require_once '../wp-load.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . PWA_Base_Link);
$categories = get_terms(array(
    'taxonomy' => 'product_cat',
    'hide_empty' => false,
));
if(is_array($categories)){
    $data =[];
    foreach ($categories as $category){
        $category_id = $category->term_id;
        $category_description = $category->description;
        $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
        $thumbnail_url = wp_get_attachment_image_src($thumbnail_id, 'thumbnail')[0]??'';
        $ar_name = get_term_meta($category_id,"ar_category_name",true);
        $subcategories = get_terms( array(
            'taxonomy' => 'product_cat', // WooCommerce product category taxonomy
            'child_of' => $category_id,
            'hide_empty' => false, // Set to true to hide empty subcategories
        ) );
        $subs =[];
        if($subcategories){
            foreach ($subcategories as $subcategory){
                $sub_thumbnail_id = get_term_meta($subcategory->term_id, 'thumbnail_id', true);
                $sub_thumbnail_url = wp_get_attachment_image_src($sub_thumbnail_id, 'thumbnail')[0]??'';
                $sub_ar_name = get_term_meta($subcategory->term_id,"ar_category_name",true);
                $subs [] =[
                    "name"=> $subcategory->name,
                    "slug"=> $subcategory->slug,
                    "description" => $subcategory->description,
                    "ar_name" =>$sub_ar_name,
                    "thumbnail_url" => $sub_thumbnail_url,
                ];
            }
        }
        $data [] = [
            "name" => $category->name,
            "slug" => $category->slug,
            "description" =>$category->description,
            "ar_name"=> $ar_name,
            "thumbnail_url" => $thumbnail_url,
            "subcategories" =>$subs,
        ];
    }
    echo json_encode($data);
}else{
    echo json_encode(["No Categories"]);
}
