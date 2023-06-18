<?php


namespace payment\MPGS;


use JsonException;

class AbstractController
{
    protected $curl;
    protected $username = 'merchant.TESTEGPTEST';
    protected $password = 'c622b7e9e550292df400be7d3e846476';
    protected $url = "https://test-nbe.gateway.mastercard.com/api/rest/version/71/merchant/TESTEGPTEST/";
    protected $sessionID;
    protected $orderID;
    protected $orderData = [
        "amount" => 00.00,
        "currency" => 'EGP'
    ];

    public function __construct($orderData,$sessionID,$orderID='',$url=null,$username=null,$password=null)
    {
        $this->orderData = $orderData;
        $this->sessionID = $sessionID;
        $this->orderID = $orderID;
        $tranxID = time();
        if ($url)$this->url = $url;
        if ($username)$this->username = $username;
        if ($password)$this->password = $password;
        $this->url .= 'order/' . $orderID . '/transaction/' . $tranxID;
        $this->curl = curl_init();
        curl_setopt($this->curl, CURLOPT_URL, $this->url);
        curl_setopt($this->curl, CURLOPT_USERPWD, $this->username.":". $this->password);
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',));
        curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, "PUT");
    }

    /** Set the request Data and Send it
     * @param $data array
     * @return array|false|string
     * @throws JsonException
     */
    protected function sendData(array $data)
    {
        $jsonData = json_encode($data, JSON_THROW_ON_ERROR);
        curl_setopt($this->curl, CURLOPT_POSTFIELDS, $jsonData);
        $response = curl_exec($this->curl);
        if ($response !== false) {
            return json_decode($response, true, 512, JSON_THROW_ON_ERROR);
        }
        if (curl_error($this->curl)){
           return 'Curl Error: '.curl_error($this->curl);
        }
        return $response;
    }
}