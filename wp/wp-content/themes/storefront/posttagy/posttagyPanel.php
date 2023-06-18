<?php
add_action('admin_menu', 'posttagy_menu');
function posttagy_menu()
{
    add_submenu_page(
        'pwa_settings', // parent slug
        'Posttagy', // page title
        'Posttagy', // menu title
        'manage_options', // capability
        'pwa_posttagy', // menu slug
        'posttagy' // callback function for edit page
    );
}

function posttagy()
{
    ?>
    <h1>Posttagy</h1>
    <?php
    global $wpdb;
    if (isset($_POST['apiKey']) && $_POST['action'] === 'submit_posttagy_form') {
        $apiKey = $_POST['apiKey'];
        $processing = $_POST['processing']??'';
        $shipready = $_POST['shipready']??'';
        $shipped = $_POST['shipped']??'';
        $completed = $_POST['completed']??'';
        $cancelled = $_POST['cancelled']??'';
        $refunded = $_POST['refunded']??'';
        $failed = $_POST['failed']??'';
        $enabled = $_POST['enabled'] ?? 0;
        $query = $wpdb->query("UPDATE pwa_settings
                            SET setting_value = CASE
                                             WHEN setting_name = 'posttagy_enabled' THEN '$enabled'
                                             WHEN setting_name = 'posttagy_api_key' THEN '$apiKey'
                                             WHEN setting_name = 'posttagy_processing' THEN '$processing'
                                             WHEN setting_name = 'posttagy_ready_to_ship' THEN '$shipready'
                                             WHEN setting_name = 'posttagy_shipped' THEN '$shipped'
                                             WHEN setting_name = 'posttagy_completed' THEN '$completed'
                                             WHEN setting_name = 'posttagy_cancelled' THEN '$cancelled'
                                             WHEN setting_name = 'posttagy_refunded' THEN '$refunded'
                                             WHEN setting_name = 'posttagy_failed' THEN '$failed'

                                         END");
        if ($query){
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Data Updated successfully</span></div>';
        }else{
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to update Data</span></div>';
        }
    }
    $res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%posttagy%'");
    $settings = [];
    if ($res) {
        foreach ($res as $item) {
            $settings[$item->setting_name] = $item->setting_value;
        }
    }
    ?>
    <form id="mpgs-form" method="post">
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-top: 50px;margin-bottom: 50px">
            <label for="enabled" style="margin-right: 20px">Enabled</label>
            <input type="checkbox" class="form-field" style="margin-right: 10vh" name="enabled" id="enabled"
                <?php echo ($settings['posttagy_enabled']) ? 'checked' : '' ?> value="1">
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="apiKey" style="margin-right: 20px">API Key</label>
            <input type="text" class="form-field" name="apiKey" id="apiKey"
                   value="<?php echo $settings['posttagy_api_key'] ?>" required>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="processing" style="margin-right: 22px">Processing Email ID</label>
            <input type="text" class="form-field" name="processing" id="processing"
                   value="<?php echo $settings['posttagy_processing'] ?>" >
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="shipready" style="margin-right: 50px">Ready To Ship Email ID</label>
            <input type="text" class="form-field" name="shipready" id="shipready" value="<?php echo $settings['posttagy_ready_to_ship'] ?>"
                   />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="shipped" style="margin-right: 50px">Shipped Email ID</label>
            <input type="text" class="form-field" name="shipped" id="shipped" value="<?php echo $settings['posttagy_shipped'] ?>"
                   />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="completed" style="margin-right: 50px">Completed Email ID</label>
            <input type="text" class="form-field" name="completed" id="completed" value="<?php echo $settings['posttagy_completed'] ?>"
                   />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="cancelled" style="margin-right: 50px">Cancelled Email ID</label>
            <input type="text" class="form-field" name="cancelled" id="cancelled" value="<?php echo $settings['posttagy_cancelled'] ?>"
                   />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="refunded" style="margin-right: 50px">Refunded Email ID</label>
            <input type="text" class="form-field" name="refunded" id="refunded" value="<?php echo $settings['posttagy_refunded'] ?>"
            />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="failed" style="margin-right: 50px">Failed Email ID</label>
            <input type="text" class="form-field" name="failed" id="failed" value="<?php echo $settings['posttagy_failed'] ?>"
            />
        </div>
        <input type="hidden" name="action" value="submit_posttagy_form">
        <input type="submit" class="button button-primary button-large" value="Submit">
    </form>
    <?php

}