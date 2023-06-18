<?php


class PaymentProcessor
{
    private $gateway;
    public function __construct($gateway){
        if ($gateway === "MPGS"){
            $this->gateway = DB_HOST;
        }
    }
}