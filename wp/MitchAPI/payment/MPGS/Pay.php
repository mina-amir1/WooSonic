<?php


namespace payment\MPGS;


class Pay extends ThreeDS
{
    protected $auth_tranxID;
    public function __construct($orderData, $sessionID,$auth_tranxID, $orderID, $url = null, $username = null, $password = null)
    {
        $this->auth_tranxID = $auth_tranxID;
        parent::__construct($orderData, $sessionID, $orderID, $url, $username, $password);
    }

    /**
     * Authorize and Capture the amount of order if authentication is done
     * @return array
     * @throws \JsonException
     */
    public function Capture()
    {
        $res = $this->sendData([
            "apiOperation"=>"PAY",
            "transaction"=>["reference"=>$this->orderID],
            "authentication" => ["transactionId" => $this->auth_tranxID],
            "order" => ["amount"=>(float)$this->orderData['amount'],"currency" => $this->orderData['currency'],"reference"=>$this->orderID],
            "session" => ["id" =>$this->sessionID],
        ]);
        if (is_array($res)){
            if (isset($res['response']['gatewayCode']) && $res['response']['gatewayCode'] === 'APPROVED'){
                return ["status"=>"success","sessionID"=>$this->sessionID,"orderID"=>$this->orderID,"paymentCode"=>$res['response']['gatewayCode'],"obj"=>$res];
            }
            return ["status"=>"failed","sessionID"=>$this->sessionID,"orderID"=>$this->orderID,"paymentCode"=>$res['response']['gatewayCode'],"orderID"=>$res['order']['id'],"obj"=>$res];
        }
        return ["status"=>"error","obj"=>$res];
    }
}