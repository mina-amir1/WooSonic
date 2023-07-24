<?php
add_action('admin_menu', 'payment_custom_menu');
function payment_custom_menu()
{
    add_submenu_page(
        'pwa_settings', // parent slug
        'Payment', // page title
        'Payment Configuration', // menu title
        'manage_options', // capability
        'pwa_payment', // menu slug
        'payment' // callback function for edit page
    );
}

function payment()
{
    ?>
    <div class="wrap">
        <h1>Payment Settings</h1>
        <h2 class="nav-tab-wrapper">
            <a href="?page=pwa_payment&tab=mpgs"
               class="nav-tab <?php echo ((isset($_GET['tab']) && $_GET['tab'] === 'mpgs') || empty($_GET['tab'])) ? 'nav-tab-active' : ''; ?>">MPGS</a>
            <a href="?page=pwa_payment&tab=cybersource"
               class="nav-tab <?php echo (isset($_GET['tab']) && $_GET['tab'] === 'cybersource') ? 'nav-tab-active' : ''; ?>">Cyber
                Source</a>
            <a href="?page=pwa_payment&tab=paymob"
               class="nav-tab <?php echo (isset($_GET['tab']) && $_GET['tab'] === 'paymob') ? 'nav-tab-active' : ''; ?>">Paymob</a>
        </h2>

        <?php
        $active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'mpgs';

        // Render the appropriate tab content based on the active tab
        switch ($active_tab) {
            case 'mpgs':
                render_mpgs();
                break;
            case 'cybersource':
                ?>
                <h1>appearance</h1>
                <?php break;
            case 'paymob':
                ?>
                <h1>advanced</h1>
                <?php break;
            default:
                ?>
                <h1>general</h1>
            <?php
        }
        ?>
    </div>
    <?php
}


function render_mpgs()
{
    global $wpdb;
    if (isset($_POST['username'], $_POST['password'], $_POST['url']) && $_POST['action'] === 'submit_mpgs_form') {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $url = $_POST['url'];
        $enabled = $_POST['enabled'] ?? 0;
        $query = $wpdb->query("UPDATE pwa_settings
                            SET setting_value = CASE
                                             WHEN setting_name = 'mpgs_username' THEN '$username'
                                             WHEN setting_name = 'mpgs_password' THEN '$password'
                                             WHEN setting_name = 'mpgs_api_url' THEN '$url'
                                             WHEN setting_name = 'mpgs_enabled' THEN '$enabled'
                                         END
                                         WHERE setting_name IN ('mpgs_username', 'mpgs_password', 'mpgs_api_url', 'mpgs_enabled');");
        if ($query){
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Data Updated successfully</span></div>';
        }else{
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to update Data</span></div>';
        }
    }
    $res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%mpgs%'");
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
            <label for="username" style="margin-right: 20px">Enabled</label>
            <input type="checkbox" class="form-field" style="margin-right: 10vh" name="enabled" id="username"
                <?php echo ($settings['mpgs_enabled']) ? 'checked' : '' ?> value="1">
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="username" style="margin-right: 20px">Username</label>
            <input type="text" class="form-field" name="username" id="username"
                   value="<?php echo $settings['mpgs_username'] ?>" required>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 220px; margin-bottom: 50px">
            <label for="password" style="margin-right: 22px">Password</label>
            <input type="text" class="form-field" name="password" id="password"
                   value="<?php echo $settings['mpgs_password'] ?>" required>
        </div>
        <div class="form-group"
             style="display: flex; align-items: center; justify-content: space-between; width: 260px; margin-bottom: 50px">
            <label for="url">API Full URl</label>
            <input type="text" class="form-field" name="url" id="url" value="<?php echo $settings['mpgs_api_url'] ?>"
                   required/>
        </div>
        <input type="hidden" name="action" value="submit_mpgs_form">
        <input type="submit" class="button button-primary button-large" value="Submit">
    </form>
    <?php
}