<?php
require '../../../../wp-load.php';
global $wpdb;
if (isset($_POST['min_amount'],$_POST['id'],$_POST['page']) && $_POST['page']==='min_checkout'){
    $min_amount = $_POST['min_amount']??'';
    $id =  $_POST['id'];
    if ($wpdb->query("Update pwa_settings set setting_value=$min_amount where setting_id = '$id'")){
        echo 'success';
    }else{
        echo 'failed  ' .$wpdb->last_error ;
    }
}
