<?php

function generate_fake_products($number_of_products) {
$faker = Faker\Factory::create();

for ($i = 0; $i < $number_of_products; $i++) {
$product_title = $faker->sentence(3);
$product_description = $faker->paragraph(4);
$product_price = $faker->randomFloat(2, 10, 100);
$product_sku = $faker->unique()->randomNumber(6);
$product_image_url = $faker->imageUrl(400, 400); // Generate a fake image URL

// Create the product using the generated data
$new_product = array(
'post_title' => $product_title,
'post_content' => $product_description,
'post_status' => 'publish',
'post_type' => 'product'
);
$product_id = wp_insert_post($new_product);

// Set product data
update_post_meta($product_id, '_price', $product_price);
update_post_meta($product_id, '_sku', $product_sku);

// Generate and attach product image
$image_id = media_sideload_image($product_image_url, $product_id, $product_title, 'id');
set_post_thumbnail($product_id, $image_id);
}
}
