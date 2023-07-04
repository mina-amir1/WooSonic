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
                                        END ");
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
}