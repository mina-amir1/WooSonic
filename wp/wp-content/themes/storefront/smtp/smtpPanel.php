<?php
add_action('admin_menu', 'smtp_menu');
function smtp_menu()
{
add_submenu_page(
'pwa_settings', // parent slug
'SMTP', // page title
'SMTP', // menu title
'manage_options', // capability
'pwa_smtp', // menu slug
'smtp' // callback function for edit page
);
}

function smtp()
{
    ?>
    <h1>SMTP</h1>
        <?php
    global $wpdb;
    if (isset($_POST['host'], $_POST['SMTPAuth'], $_POST['port'],$_POST['username'],$_POST['password']) && $_POST['action'] === 'submit_smtp_form') {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $host = $_POST['host'];
        $port = $_POST['port'];
        $auth = $_POST['SMTPAuth'];
        $secure = $_POST['secure'];
        $enabled = $_POST['enabled'] ?? 0;
        $query = $wpdb->query("UPDATE pwa_settings
                            SET setting_value = CASE
                                             WHEN setting_name = 'smtp_username' THEN '$username'
                                             WHEN setting_name = 'smtp_password' THEN '$password'
                                             WHEN setting_name = 'smtp_host' THEN '$host'
                                             WHEN setting_name = 'smtp_port' THEN '$port'
                                             WHEN setting_name = 'smtp_SMTPAuth' THEN '$auth'
                                             WHEN setting_name = 'smtp_enabled' THEN '$enabled'
                                             WHEN setting_name = 'smtp_secure' THEN '$secure'
                                         END");
        if ($query){
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Data Updated successfully</span></div>';
        }else{
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to update Data</span></div>';
        }
    }
    $res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%smtp%'");
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
                <?php echo ($settings['smtp_enabled']) ? 'checked' : '' ?> value="1">
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="username" style="margin-right: 20px">Username</label>
            <input type="text" class="form-field" name="username" id="username"
                   value="<?php echo $settings['smtp_username'] ?>" required>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="password" style="margin-right: 22px">Password</label>
            <input type="text" class="form-field" name="password" id="password"
                   value="<?php echo $settings['smtp_password'] ?>" required>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="host" style="margin-right: 50px">Host</label>
            <input type="text" class="form-field" name="host" id="host" value="<?php echo $settings['smtp_host'] ?>"
                   required/>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="port" style="margin-right: 50px">Port</label>
            <input type="text" class="form-field" name="port" id="port" value="<?php echo $settings['smtp_port'] ?>"
                   required/>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="auth" style="margin-right: 15px">SMTPAuth</label>
            <select id="auth" name="SMTPAuth" style="width: 150px" required>
                <option hidden><?php echo ($settings['smtp_SMTPAuth']) ?'True':'False'?></option>
                <option value="1">True</option>
                <option value="0">False</option>
            </select>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="secure" style="margin-right: 15px">Security</label>
            <select id="secure" name="secure" style="width: 150px" required>
                <option hidden><?php echo $settings['smtp_secure'];?></option>
                <option value="TLS">TLS</option>
                <option value="SMTPS">SMTPS</option>
            </select>
        </div>
        <input type="hidden" name="action" value="submit_smtp_form">
        <input type="submit" class="button button-primary button-large" value="Submit">
    </form>
    <?php

}