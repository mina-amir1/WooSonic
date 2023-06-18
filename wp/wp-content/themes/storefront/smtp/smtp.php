<?php

function pwa_smtp($phpmailer) {
    global $wpdb;
    $res = $wpdb->get_results("select * from pwa_settings where setting_name LIKE '%smtp%'");
    $settings = [];
    if ($res) {
        foreach ($res as $item) {
            $settings[$item->setting_name] = $item->setting_value;
        }
        if($settings['smtp_enabled']) {
            $auth = ($settings['smtp_SMTPAuth'] === 'True') ? True : false;
            if ($settings['smtp_secure']) {
                switch ($settings['smtp_secure']) {
                    case 'TLS':
                        $phpmailer->SMTPSecure = 'ENCRYPTION_STARTTLS';
                        break;
                    case 'SMTPS':
                        $phpmailer->SMTPSecure = 'ENCRYPTION_SMTPS';
                        break;
                }
            }
            $phpmailer->isSMTP();
            $phpmailer->Host = $settings['smtp_host'];
            $phpmailer->SMTPAuth = $auth;
            $phpmailer->Port = $settings['smtp_port'];
            $phpmailer->Username = $settings['smtp_username'];
            $phpmailer->Password = $settings['smtp_password'];
        }
    }

}
add_action('phpmailer_init', 'pwa_smtp');
