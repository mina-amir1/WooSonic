<?php
require '../wp-load.php';
$to = 'mina.amir.97@hotmail.com';
$subject = 'Testing SMTP email';
$message = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Email Title</title>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" bgcolor="#f7f7f7" style="padding: 40px 0;">
                <h1>Your Email Heading</h1>
                <p>Hello, John Doe!</p>
                <p>This is an example of an HTML email.</p>
                <p>Feel free to customize it as per your needs.</p>
                <p>Regards,<br>Your Name</p>
            </td>
        </tr>
    </table>
</body>
</html>
';
$headers = array('Content-Type: text/html; charset=UTF-8');

$result = wp_mail($to, $subject, $message, $headers);

if ($result) {
    print_r($result);
echo 'Email sent successfully.';
} else {
echo 'Failed to send the email.';
}
