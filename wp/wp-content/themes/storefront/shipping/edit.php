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
if (isset($_POST['city_name'],$_POST['rate'],$_POST['page']) && $_POST['page']==='cities'){
    $city_name = $_POST['city_name']??'';
    $rate = $_POST['rate']??'';
    $city_name_en = $_POST['city_name_en']??'';
    $id =  $_POST['id'];
    if ($wpdb->query("Update pwa_shipping_city set city_name='$city_name',city_name_en='$city_name_en',city_rate =$rate where city_id = '$id'")){
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
    if ($wpdb->query("Update pwa_shipping_area set area_name='$area_name',area_name_en='$area_name_en',area_rate =$rate where area_id = '$id'")){
        echo 'success';
    }else{
        echo 'failed  ' .$wpdb->last_error ;
    }
}
if (isset($_POST['branch_name'],$_POST['branch_slug'],$_POST['page']) && $_POST['page']==='branches'){
    $branch_name = $_POST['branch_name']??'';
    $branch_slug = $_POST['branch_slug']??'';
    $branch_name_en = $_POST['branch_name_en']??'';
    $branch_notes = $_POST['branch_notes']??'';
    $serving_ids = $_POST['serving_ids']??'';
    $id =  $_POST['id'];
    if (is_array($serving_ids) && !empty($serving_ids)){
        $wpdb->query("Delete from pwa_branch_areas where branch_areas_branch_id ='$id'");
        foreach ($serving_ids as $serving_id){
            $wpdb->query("Insert into pwa_branch_areas (branch_areas_branch_id,branch_areas_area_id)value ('$id','$serving_id')");
        }
        $saved_id =true;
    }
    $wpdb->query("Update pwa_branches set branch_name='$branch_name',branch_name_en='$branch_name_en',branch_notes ='$branch_notes',branch_slug='$branch_slug' where branch_id = '$id'");
    if (isset($saved_id) || !$wpdb->error ){
        echo 'success';
    }
    if($wpdb->last_error){
        echo 'failed  ' .$wpdb->last_error ;
    }
}