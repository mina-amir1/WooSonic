<?php
/**
 * Plugin Name: Mitch test api
 * Description: Test Api custom endpoint
 * Author: Mina
 * Version: 1
 */
function header_api(){
return get_field('header_content_en' , 'options');
}
add_action('rest_api_init',function (){
    register_rest_route('test/v1','header',[
        'methods'=>'GET',
        'callback'=>'header_api']);
});