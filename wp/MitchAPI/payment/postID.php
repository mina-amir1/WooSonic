<?php
$session_id = $_POST['sessionId'];
$order_curr = 'EGP';
$order_id = '1234451';
$trans_id = $order_id.'12123';
$channel = 'PAYER_BROWSER';

$ch = curl_init();
$url = "https://test-nbe.gateway.mastercard.com/api/rest/version/71/merchant/TESTEGPTEST/order/".$order_id."/transaction/".$trans_id;
curl_setopt($ch, CURLOPT_URL, $url);
$headers = array(
    'Authorization: Basic ' . base64_encode('merchant.TESTEGPTEST:c622b7e9e550292df400be7d3e846476')
);
//curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_USERPWD, "merchant.TESTEGPTEST:c622b7e9e550292df400be7d3e846476");

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");

// Set the data to send
$data = array(
    "apiOperation"=>"INITIATE_AUTHENTICATION",
    //"apiOperation"=>"AUTHORIZE",
    "session"=>["id"=>$session_id],
    "authentication" => ["channel" => "PAYER_BROWSER"],
    "order" => ["currency" => "EGP"],
//    'sourceOfFunds' => array(
//        'type' => 'CARD',
//        'provided' => array(
//            'card' => array(
//                'number' => '5123 4500 0000 0008',
//                'expiry' => array(
//                    'month' => '01',
//                    'year' => '39'
//                ),
//                'securityCode' => '100'
//            )
//        )
//    ),
);
$jsonData = json_encode($data);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    //'Content-Length: ' . strlen($jsonData)
));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    $error = curl_error($ch);
    // Handle the error
    echo "cURL Error: " . $error;
}
curl_close($ch);
// Process the response
if ($response !== false) {
    $json_response = json_decode($response,true);
    if ($json_response["error"]) {
        print_r($response);
        exit;
    }
    print_r( $json_response['response']['gatewayRecommendation']);
    $recommendation = $json_response['response']['gatewayRecommendation'];
    if ($recommendation === 'PROCEED'){
        $ch = curl_init();
        $url = "https://test-nbe.gateway.mastercard.com/api/rest/version/71/merchant/TESTEGPTEST/order/".$order_id."/transaction/".$trans_id;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_USERPWD, "merchant.TESTEGPTEST:c622b7e9e550292df400be7d3e846476");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        $data = array(
            "authentication" =>["redirectResponseUrl"=>"https://cloudhosta.com:68/MitchAPI/red.php"],
            "apiOperation"=>"AUTHENTICATE_PAYER",
            "device"=>["browser"=>"MOZILLA",
                "browserDetails"=>["javaEnabled"=> true,
                    "language"=> "en-US",
                    "screenHeight"=>640,
                    "screenWidth"=> 480,
                    "timeZone"=> 273,
                    "colorDepth"=> 24,
                    "3DSecureChallengeWindowSize"=> "FULL_SCREEN",
                    "acceptHeaders"=> "application/json",]
            ],
            "session"=>["id"=>$session_id],
            "order" => ["currency" => "EGP","amount"=>100.00],
            );
        $jsonData = json_encode($data);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            // Handle the error
            echo "cURL Error: " . $error;
        }
        curl_close($ch);
        if ($response !== false) {
            echo $response;
        }
    }
}
