<?php
add_action('admin_menu', 'pwa_settings_menu');
function pwa_settings_menu()
{
    add_menu_page(
        'PWA Settings', // page title
        'PWA Settings', // menu title
        'manage_options', // capability
        'pwa_settings', // menu slug
        'general' // callback function for view page
    );
}

function general()
{
    global $wpdb;
    if (isset($_POST['action'])&& $_POST['action']==='submit_feature_form'){
        $enable_govs = $_POST['shipping_enable_govs']??0;
        $enable_areas = $_POST['shipping_enable_areas']??0;
        $query = $wpdb->query("Update pwa_settings set setting_value = CASE 
                                        WHEN setting_name = 'feature_shipping_enable_govs' THEN '$enable_govs'
                                        WHEN setting_name = 'feature_shipping_enable_areas' THEN '$enable_areas'
                                        END
                                         WHERE setting_name IN ('feature_shipping_enable_govs', 'feature_shipping_enable_areas');");
        if ($query){
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Data Updated successfully</span></div>';
        }else{
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to update Data'.$wpdb->last_error.'</span></div>';
        }
    }
    $res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%feature%'");
    $settings = [];
    if ($res) {
        foreach ($res as $item) {
            $settings[$item->setting_name] = $item->setting_value;
        }
    }
    echo '<h1>PWA Features</h1>';
    ?>
    <div class="wrap" style="margin-top: 70px;font-size: medium">
        <form method="post"> 
            <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 400px; margin-top: 50px;margin-bottom: 50px">
            <label for="shipping_enable_govs" style="margin-right: 20px">Enable Shipping level one (Govs)</label>
            <input type="checkbox" class="form-field" style="margin-right: 10vh" name="shipping_enable_govs" value="1" id="shipping_enable_govs"
            <?php echo ($settings['feature_shipping_enable_govs']) ? 'checked' : '' ?>
            />
            </div>
            <div class="form-group"
                 style="display: flex; align-items: center; justify-content: space-between; width: 400px; margin-top: 50px;margin-bottom: 50px">
                <label for="shipping_enable_areas" style="margin-right: 20px">Enable Shipping level Two (Areas)</label>
                <input type="checkbox" class="form-field" style="margin-right: 10vh" value="1" name="shipping_enable_areas" id="shipping_enable_areas"
                    <?php echo ($settings['feature_shipping_enable_areas']) ? 'checked' : '' ?>
                />
            </div>
            <input type="hidden" name="action" value="submit_feature_form">
            <input type="submit" class="button button-primary button-large" value="Submit">
        </form>
    </div>
<?php
    min_checkout_amount();
}

function min_checkout_amount (){
    global $wpdb;
    if (isset($_POST['action'], $_POST['rule_id']) && $_POST['action'] === 'Delete') {
        $rule_id = $_POST['rule_id'];
        if ($wpdb->query("Delete from pwa_settings where setting_id= $rule_id")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Rule Deleted successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to Delete Rule</span></div>';
        }
    }
    if (isset($_POST['action'], $_POST['country_code'], $_POST['min_amount']) && $_POST['action'] === 'Add') {
        $setting_name = "min_checkout_amount_".$_POST['country_code'];
        $amount = $_POST['min_amount'];
        if ($wpdb->query("Insert into pwa_settings (setting_name,setting_value) value ('$setting_name','$amount')")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Rule Saved successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px; margin-left: 0px !important"><span>Failed to save Rule</span></div>';
        }
    }
    echo '<h2>Add Min Checkout Rule</h2>
          <form method="post" style="display: flex; flex-direction: column; width: 30%">
            <label for="country_code">Country Code</label>
            <input required style="margin-bottom: 10px" type="text" name="country_code" id="country_code">';
    echo ' <label for="min_amount">Min Amount</label>
             <input required type="number" style=" margin-bottom: 10px" name="min_amount" id="min_amount">
             <input type="submit" name="action" style="width: 60px" class="button button-primary button-large" value="Add">
          </form>';
    $rules = $wpdb->get_results("Select * from pwa_settings where `setting_name` like '%min_checkout_amount%';");
    echo '<div class="wrap">';
    echo '<h1>Cities</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead>
            <tr>  
                <th>Rule ID</th>  
                <th>Country</th>
                <th>Min Amount</th>
                <th>Action</th>
                </tr>
           </thead>';
    echo '<tbody>';
    foreach ($rules as $rule) {
        $country_code = str_replace("min_checkout_amount_","",$rule->setting_name);
        echo '<tr>';
        echo '<td>' . $rule->setting_id. '</td>';
        echo '<td>' . $country_code. '</td>';
        echo '<td>' . $rule->setting_value . '</td>';
        echo '<td style="display: flex">
        <input style="margin-right: 10px" type="button" name="action" class="button action edit-min-btn" value="Edit">
        <form method="post">
        <input type="hidden" name="rule_id" value="' . $rule->setting_id . '">
        <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure?\')" value="Delete"></form></td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';

}


function enqueue_main_panel_scripts()
{
    wp_enqueue_script('jquery');
    wp_enqueue_script('main_panel', get_template_directory_uri() . '/pwaSettings/mainPanel.js', array('jquery'), '1.0', false);

}

add_action('admin_enqueue_scripts', 'enqueue_main_panel_scripts');
