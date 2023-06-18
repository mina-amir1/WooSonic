<?php
require_once 'createsend-php-master/csrest_transactional_smartemail.php';
$auth = array('api_key' => '14rQQ9EchaRJW/wbDVJNO1ND+BOCe1+Ui3q+h/TjqBEJmLQsrpzb2rku1yQRGYwbOreqKZRu+iEQfGykIFjDihsmqcQ8NgHWCFu+yHPnYx6rFZxFVNknlalnMZcjsZLpeJKKDc08nlNKIpX5NOi/UA==');
# The unique identifier for this smart email
$smart_email_id = 'f2a50b59-2dec-4cbd-a8e6-97031e7e0856';
$wrap = new CS_REST_Transactional_SmartEmail($smart_email_id, $auth);
$message = array(
//    "To" => 'Mina AMir <mina.amir@mitchdesigns.com>',
    "To" => 'Martina <martinaaymandawood@gmail.com>',
    "Data" => array(
        'order_total' => "123.45",

    ),
);
# Add consent to track value
$consent_to_track = 'yes'; # Valid: 'yes', 'no', 'unchanged'
# Send the message and save the response
$result = $wrap->send($message, $consent_to_track);
?>