<?php
add_action('admin_menu', 'shipping_custom_menu');
function shipping_custom_menu()
{
    add_menu_page(
        'PWA Settings', // page title
       'PWA Settings', // menu title
        'manage_options', // capability
        'pwa_settings', // menu slug
        'general' // callback function for view page
    );
    add_submenu_page(
        'pwa_settings', // parent slug
        'PWA Shipping', // page title
        'PWA Shipping Govs', // menu title
        'manage_options', // capability
        'pwa_shipping', // menu slug
        'shipping_govs' // callback function for edit page
    );
    add_submenu_page(
        'pwa_settings', // parent slug
        'Shipping Areas', // page title
        'Shipping Areas', // menu title
        'manage_options', // capability
        'shipping_areas', // menu slug
        'shipping_areas' // callback function for edit page
    );
    add_submenu_page(
        'pwa_settings', // parent slug
        'Branches', // page title
        'Branches', // menu title
        'manage_options', // capability
        'exclude_branches', // menu slug
        'exclude_branches_page' // callback function for edit page
    );
}

function shipping_govs()
{
    global $wpdb;

    if (isset($_POST['action'], $_POST['gov_name']) && $_POST['action'] === 'Add') {
        $gov_name = $_POST['gov_name'];
        $gov_name_en = $_POST['gov_name_en'];
        if ($wpdb->query("Insert into pwa_shipping_gov (gov_name,gov_name_en) values ('$gov_name','$gov_name_en')")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Government Saved successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to save Government</span></div>';
        }
    }

    if (isset($_POST['action'], $_POST['gov_id']) && $_POST['action'] === 'Delete') {
        $gov_id = $_POST['gov_id'];
        if ($wpdb->query("Delete from pwa_shipping_gov where gov_id= '$gov_id'")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Government Deleted successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to Delete Government</span></div>';
        }
    }
    echo '<h1>Shipping rates</h1>';
    echo '<h2>Add Government</h2>' .
        '<form method="post">
        <label for="name">Government Name</label>
        <input id="name" type="text" name="gov_name">
        <label for="name_en">Government Name in English</label>
        <input id="name_en" type="text" name="gov_name_en">
        <input type="submit" name="action" class="button button-primary button-large" value="Add"></form>';
    $govs = $wpdb->get_results("SELECT * FROM pwa_shipping_gov");
    echo '<div class="wrap">';
    echo '<h1>Governments</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead>
            <tr>    
                <th>ID</th>
                <th>Name</th>
                <th>English Name</th>
                <th>Action</th>
                </tr>
           </thead>';
    echo '<tbody>';
    foreach ($govs as $gov) {
        echo '<tr>';
        echo '<td>' . $gov->gov_id . '</td>';
        echo '<td>' . $gov->gov_name . '</td>';
        echo '<td>' . $gov->gov_name_en . '</td>';
        echo '<td style="display: flex">
        <input style="margin-right: 10px" type="button" name="action" class="button action edit-btn" value="Edit">
        <form method="post">
        <input type="hidden" name="gov_id" value="' . $gov->gov_id . '">
        <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure?\')" value="Delete"></form></td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';

}

function shipping_areas()
{
    global $wpdb;

    if (isset($_POST['action'], $_POST['area_name'], $_POST['rate'], $_POST['gov_id']) && $_POST['action'] === 'Add') {
        $area_name = $_POST['area_name'];
        $rate = $_POST['rate'];
        $gov_id = $_POST['gov_id'];
        $area_en = $_POST['area_name_en']??"";
        if ($wpdb->query("Insert into pwa_shipping_area (gov_id,area_name,area_rate,area_name_en) value ('$gov_id','$area_name','$rate','$area_en')")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Area Saved successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Failed to save Area</span></div>';
        }
    }
    if (isset($_POST['action'], $_POST['area_id']) && $_POST['action'] === 'Delete') {
        $area_id = $_POST['area_id'];
        if ($wpdb->query("Delete from pwa_shipping_area where area_id= '$area_id'")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Area Deleted successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to Delete Area</span></div>';
        }
    }

    $govs = $wpdb->get_results("Select * from pwa_shipping_gov");
    echo '<h2>Add Area</h2>
          <form method="post" style="display: flex; flex-direction: column; width: 30%">
            <label for="area_name">Area name</label>
            <input required style="margin-bottom: 10px" type="text" name="area_name" id="area_name">
            <label for="govs">Government</label>
            <select required name="gov_id" id="govs" style="margin-bottom: 10px">
            <option value="" hidden>-- Select Government -- </option>';
    foreach ($govs as $gov) {
        echo '<option value="' . $gov->gov_id . '">' . $gov->gov_name . '</option>';
    }
    echo '</select>
             <label for="rate">Area Rate</label>
             <input required type="number" style=" margin-bottom: 10px" name="rate" id="rate">
             <label for="area_name">Area name in English</label>
             <input style="margin-bottom: 10px" type="text" name="area_name_en" id="area_name_en">
             <input type="submit" name="action" style="width: 60px" class="button button-primary button-large" value="Add">
          </form>';

    $areas = $wpdb->get_results("Select * from pwa_shipping_area inner join pwa_shipping_gov on pwa_shipping_area.`gov_id`=`pwa_shipping_gov`.`gov_id`");
    echo '<div class="wrap">';
    echo '<h1>Areas</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead>
            <tr>    
                <th>ID</th>
                <th>Name</th>
                <th>Government</th>
                <th>Rate</th>
                <th>English Name</th>
                <th>Branch</th>
                <th>Action</th>
                </tr>
           </thead>';
    echo '<tbody>';
    foreach ($areas as $area) {
        $branch = $wpdb->get_results("select * from pwa_branch_areas inner join pwa_branches on branch_areas_branch_id = branch_id where branch_areas_area_id ='$area->area_id'");
        $branch_name = $branch[0]->branch_name??'';
        echo '<tr>';
        echo '<td>' . $area->area_id . '</td>';
        echo '<td>' . $area->area_name . '</td>';
        echo '<td>' . $area->gov_name . '</td>';
        echo '<td>' . $area->area_rate . '</td>';
        echo '<td>' . $area->area_name_en . '</td>';
        echo '<td>' . $branch_name . '</td>';
        echo '<td style="display: flex">
        <input style="margin-right: 10px" type="button" name="action" class="button action edit-area-btn" value="Edit">
        <form method="post">
        <input type="hidden" name="area_id" value="' . $area->area_id . '">
        <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure?\')" value="Delete"></form></td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';

}

function exclude_branches_page(){
    global $wpdb;

    if (isset($_POST['action'], $_POST['branch_id']) && $_POST['action'] === 'Delete') {
        $branch_id = $_POST['branch_id'];
        if ($wpdb->query("Delete from pwa_branches where branch_id= '$branch_id'")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Branch Deleted successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to Delete Branch '.$wpdb->last_error.'</span></div>';
        }
    }

    if (isset($_POST['action'], $_POST['branch_name'], $_POST['areas_ids'], $_POST['branch_slug']) && $_POST['action'] === 'Add') {
        $branch_name = $_POST['branch_name'];
        $areas_ids = $_POST['areas_ids'];
        $branch_slug = $_POST['branch_slug'];
        $branch_en = $_POST['branch_name_en']??"";
        $branch_notes = $_POST['branch_notes']??"";
        if ($wpdb->query("Insert into pwa_branches (branch_name,branch_notes,branch_name_en,branch_slug) value ('$branch_name','$branch_notes','$branch_en','$branch_slug')")) {
            $branch_id = $wpdb->insert_id;
            wp_insert_term($branch_name, 'exclude_branches',
                array(
                    'slug' => $branch_slug,
                )
            );
            foreach ($areas_ids as $area_id){
                if(!$wpdb->query("Insert into pwa_branch_areas (branch_areas_branch_id,branch_areas_area_id) value ('$branch_id','$area_id')")){
                    break;
                    echo '<div class="notice notice-error is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Failed to save Branch</span></div>';
                }
            }
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Branch Saved successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Failed to save Branch</span></div>';
        }
    }

    echo '<h2>Add Branch</h2>
          <form method="post" style="display: flex; flex-direction: column; width: 30%">
            <label for="branch_name">Branch name</label>
            <input required style="margin-bottom: 10px" type="text" name="branch_name" id="branch_name">
            <label for="areas">Select the serving area</label>
            <select multiple required name="areas_ids[]" id="areas" style="margin-bottom: 10px">';
    $areas = $wpdb->get_results("Select area_id, area_name from pwa_shipping_area");
    foreach ($areas as $area) {
        echo '<option class="form-field" value="'.$area->area_id.'">'.$area->area_name.'</option>';
    }
    echo '</select>
             <label for="branch_slug">Branch Slug in English with no spaces</label>
             <input required type="text" style=" margin-bottom: 10px" name="branch_slug" id="branch_slug">
             <label for="branch_name_en">Branch name in English</label>
             <input style="margin-bottom: 10px" type="text" name="branch_name_en" id="branch_name_en">
             <label for="branch_notes">Branch notes</label>
             <textarea style="margin-bottom: 10px" type="text" name="branch_notes" id="branch_notes"></textarea>
             <input type="submit" name="action" style="width: 60px" class="button button-primary button-large" value="Add">
          </form>';

    $branches = $wpdb->get_results('Select * from pwa_branches');
    echo '<div class="wrap">';
    echo '<h1>Branches</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead>
            <tr>    
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>English Name</th>
                <th>Notes</th>
                <th>Serving Areas</th>
                <th>Action</th>
                </tr>
           </thead>';
    echo '<tbody>';
    foreach ($branches as $branch) {
        $areas = $wpdb->get_results("select * from pwa_branch_areas inner join pwa_shipping_area on branch_areas_area_id = area_id where branch_areas_branch_id ='$branch->branch_id'");
        $area_string = '';
        if ($areas){
            foreach ($areas as $area){
                $area_string .=$area->area_name.' ,';
            }
            $area_string = substr($area_string,0,-1);
        }
        echo '<tr>';
        echo '<td>' . $branch->branch_id . '</td>';
        echo '<td>' . $branch->branch_name . '</td>';
        echo '<td>' . $branch->branch_slug . '</td>';
        echo '<td>' . $branch->branch_name_en . '</td>';
        echo '<td>' . $branch->branch_notes . '</td>';
        echo '<td>' . $area_string . '</td>';
        echo '<td style="display: flex">
        <input style="margin-right: 10px" type="button" name="action" class="button action edit-branch-btn" value="Edit">
        <form method="post">
        <input type="hidden" name="branch_id" value="' . $branch->branch_id . '">
        <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure?\')" value="Delete"></form></td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';

}
function general(){

}


function enqueue_custom_scripts() {
    wp_enqueue_script('jquery');
    wp_enqueue_script( 'shipping',get_template_directory_uri().'/shipping/shipping.js'  , array('jquery'), '1.0',  false );

}
add_action('admin_enqueue_scripts', 'enqueue_custom_scripts');
