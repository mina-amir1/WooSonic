<?php
add_action('admin_menu', 'emails_menu');
function emails_menu()
{
    add_submenu_page(
        'pwa_settings', // parent slug
        'Email Configuration', // page title
        'Email Configuration', // menu title
        'manage_options', // capability
        'pwa_emails', // menu slug
        'pwa_emails' // callback function for edit page
    );
}

function render_posttagy()
{
    ?>
    <h1>Posttagy</h1>
    <?php
    global $wpdb;
    if (isset($_POST['apiKey']) && $_POST['action'] === 'submit_posttagy_form') {
        $apiKey = $_POST['apiKey'];
        $processing = $_POST['processing'] ?? '';
        $shipready = $_POST['shipready'] ?? '';
        $shipped = $_POST['shipped'] ?? '';
        $completed = $_POST['completed'] ?? '';
        $cancelled = $_POST['cancelled'] ?? '';
        $refunded = $_POST['refunded'] ?? '';
        $failed = $_POST['failed'] ?? '';
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
                                         END
                                         WHERE setting_name IN ('posttagy_enabled', 'posttagy_api_key', 'posttagy_processing', 'posttagy_ready_to_ship','posttagy_shipped','posttagy_completed','posttagy_cancelled','posttagy_refunded','posttagy_failed');");
        if ($query) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Data Updated successfully</span></div>';
        } else {
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
                   value="<?php echo $settings['posttagy_api_key'] ?>" >
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="processing" style="margin-right: 22px">Processing Email ID</label>
            <input type="text" class="form-field" name="processing" id="processing"
                   value="<?php echo $settings['posttagy_processing'] ?>">
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="shipready" style="margin-right: 50px">Ready To Ship Email ID</label>
            <input type="text" class="form-field" name="shipready" id="shipready"
                   value="<?php echo $settings['posttagy_ready_to_ship'] ?>"
            />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="shipped" style="margin-right: 50px">Shipped Email ID</label>
            <input type="text" class="form-field" name="shipped" id="shipped"
                   value="<?php echo $settings['posttagy_shipped'] ?>"
            />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="completed" style="margin-right: 50px">Completed Email ID</label>
            <input type="text" class="form-field" name="completed" id="completed"
                   value="<?php echo $settings['posttagy_completed'] ?>"
            />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="cancelled" style="margin-right: 50px">Cancelled Email ID</label>
            <input type="text" class="form-field" name="cancelled" id="cancelled"
                   value="<?php echo $settings['posttagy_cancelled'] ?>"
            />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="refunded" style="margin-right: 50px">Refunded Email ID</label>
            <input type="text" class="form-field" name="refunded" id="refunded"
                   value="<?php echo $settings['posttagy_refunded'] ?>"
            />
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="failed" style="margin-right: 50px">Failed Email ID</label>
            <input type="text" class="form-field" name="failed" id="failed"
                   value="<?php echo $settings['posttagy_failed'] ?>"
            />
        </div>
        <input type="hidden" name="action" value="submit_posttagy_form">
        <input type="submit" class="button button-primary button-large" value="Submit">
    </form>
    <?php

}

function render_smtp()
{
    ?>
    <h1>SMTP</h1>
    <?php
    global $wpdb;
    if (isset($_POST['host'], $_POST['SMTPAuth'], $_POST['port'], $_POST['username'], $_POST['password']) && $_POST['action'] === 'submit_smtp_form') {
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
                                         END
                                          WHERE setting_name IN ('smtp_username', 'smtp_password', 'smtp_host', 'smtp_port','smtp_SMTPAuth','smtp_enabled','smtp_secure');");
        if ($query) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Data Updated successfully</span></div>';
        } else {
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
                <option hidden><?php echo ($settings['smtp_SMTPAuth']) ? 'True' : 'False' ?></option>
                <option value="1">True</option>
                <option value="0">False</option>
            </select>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="secure" style="margin-right: 15px">Security</label>
            <select id="secure" name="secure" style="width: 150px" required>
                <option hidden><?php echo $settings['smtp_secure']; ?></option>
                <option value="TLS">TLS</option>
                <option value="SMTPS">SMTPS</option>
            </select>
        </div>
        <input type="hidden" name="action" value="submit_smtp_form">
        <input type="submit" class="button button-primary button-large" value="Submit">
    </form>
    <?php

}

function pwa_emails()
{
    ?>
    <div class="wrap">
    <h1>Payment Settings</h1>
    <h2 class="nav-tab-wrapper">
        <a href="?page=pwa_emails&tab=posttagy"
           class="nav-tab <?php echo ((isset($_GET['tab']) && $_GET['tab'] === 'posttagy') || empty($_GET['tab'])) ? 'nav-tab-active' : ''; ?>">Posttagy</a>
        <a href="?page=pwa_emails&tab=SMTP"
           class="nav-tab <?php echo (isset($_GET['tab']) && $_GET['tab'] === 'SMTP') ? 'nav-tab-active' : ''; ?>">SMTP</a>
    </h2>

    <?php
    $active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'posttagy';

    // Render the appropriate tab content based on the active tab
    switch ($active_tab) {
        case 'posttagy':
            render_posttagy();
            break;
        case 'SMTP':
            render_smtp();
            break;
    }
}