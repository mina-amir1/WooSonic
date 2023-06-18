<?php
require '../../../../wp-load.php';
global $wpdb;
if (isset($_POST['gov_name'],$_POST['id'],$_POST['page']) && $_POST['page']==='govs'){
    $gov_name = $_POST['gov_name']??'';
    $gov_name_en = $_POST['gov_name_en']??'';
    $id =  $_POST['id'];
    if ($wpdb->query("Update pwa_shipping_gov set gov_name='$gov_name',gov_name_en='$gov_name_en' where gov_id = '$id'")){
        echo 'success';
    }else{
        echo 'failed  ' .$wpdb->last_error ;
    }
}
if (isset($_POST['area_name'],$_POST['rate'],$_POST['page']) && $_POST['page']==='areas'){
    $area_name = $_POST['area_name']??'';
    $rate = $_POST['rate']??'';
    $area_name_en = $_POST['area_name_en']??'';
    $id =  $_POST['id'];
    if ($wpdb->query("Update pwa_shipping_area set area_name='$area_name',area_name_en='$area_name_en',area_rate =$rate where gov_id = '$id'")){
        echo 'success';
    }else{
        echo 'failed  ' .$wpdb->last_error ;
    }
}
if (isset($_POST['branch_name'],$_POST['branch_slug'],$_POST['page']) && $_POST['page']==='areas'){
    $branch_name = $_POST['branch_name']??'';
    $branch_slug = $_POST['branch_slug']??'';
    $branch_name_en = $_POST['branch_name_en']??'';
    $branch_notes = $_POST['branch_notes']??'';
    $serving_ids = $_POST['serving_ids']??'';
    $id =  $_POST['id'];
    if ($wpdb->query("Update pwa_shipping_area set area_name='$area_name',area_name_en='$area_name_en',area_rate =$rate where gov_id = '$id'")){
        echo 'success';
    }else{
        echo 'failed  ' .$wpdb->last_error ;
    }
}