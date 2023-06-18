<?php
require '../../../../wp-load.php';
global $wpdb;
$areas = $wpdb->get_results("Select area_id, area_name from pwa_shipping_area ");
if($areas){
    $res = '<select multiple required name="areas_ids[]" id="areas" style="margin-bottom: 10px">';
    foreach ($areas as $area) {
        $res .= '<option class="form-field" value="'.$area->area_id.'">'.$area->area_name.'</option>';
    }
    $res .= '</select>';
    echo $res;
}
else {
    echo "failed";
}