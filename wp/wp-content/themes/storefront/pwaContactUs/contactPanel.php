<?php
add_action('admin_menu', 'contact_menu');
function contact_menu()
{
    // Parent menu in pwaSettings main panel
    add_submenu_page(
        'pwa_settings', // parent slug
        'Contact Us', // page title
        'Contact Us', // menu title
        'manage_options', // capability
        'contact_us', // menu slug
        'contact_us' // callback function for edit page
    );
}

function contact_us()
{
    global $wpdb;
    if (isset($_POST['action'], $_POST['msg_id']) && $_POST['action'] === 'Delete') {
        $msg_id = $_POST['msg_id'];
        if ($wpdb->query("Delete from pwa_contact_us where msg_id= '$msg_id'")) {
            echo '<div class="notice notice-success is-dismissible" style="padding: 10px"><span>Message Deleted successfully</span></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible" style="padding: 10px"><span>Failed to Delete Message</span></div>';
        }
    }
    $msgs = $wpdb->get_results("SELECT * FROM pwa_contact_us");
    echo '<div class="wrap">';
    echo '<h1>Messages</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead>
            <tr>    
                <th style="width: 2%">ID</th>
                <th style="width: 15%">Email</th>
                <th style="width: 7%">FirstName</th>
                <th style="width: 7%">LastName</th>
                <th style="width: 7%">Phone</th>
                <th style="width: 45%">Message</th>
                <th>Action</th>
                </tr>
           </thead>';
    echo '<tbody>';
    foreach ($msgs as $msg) {
        echo '<tr>';
        echo '<td>' . $msg->msg_id . '</td>';
        echo '<td>' . $msg->email . '</td>';
        echo '<td>' . $msg->firstname . '</td>';
        echo '<td>' . $msg->lastname . '</td>';
        echo '<td>' . $msg->phone . '</td>';
        echo '<td>' . $msg->msg . '</td>';
        echo '<td style="display: flex">
        <form method="post">
        <input type="hidden" name="msg_id" value="' . $msg->msg_id . '">
        <input type="submit" name="action" class="button action" onclick="return confirm(\'Are you sure?\')" value="Delete"></form></td>';
        echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';

}