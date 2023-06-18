<?php


namespace payment\MPGS;


use JsonException;

class ThreeDS extends AbstractController
{
    /** Step 2 of the 3DS initiate the authentication
     * The needed params are [authentication.redirectResponseUrl,
     *                       device.channel, device.browserDetails.javaEnabled,device.browserDetails.language
     *                       session.id,
     *                       order.amount,order.currency]
     * @returns  array
     * @throws JsonException
     */
    public function AuthenticatePayer($redirect_url): array
    {
        $initate = $this->InitiateAuth();
        if ($initate === true) {
            $res = $this->sendData([
                "authentication" =>["redirectResponseUrl"=>$redirect_url],
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
                "session"=>["id"=>$this->sessionID],
                "order" => $this->orderData,
            ]);
            if (is_array($res) && $res['response']['gatewayRecommendation'] ==='PROCEED'){
                return ["status"=>"success",'html'=>$this->extractHtmlFromText($res['authentication']['redirect']['html'])];
            }
            return ["status"=>"err","msg"=>"Authentication initiated successfully but SendData in Authenticate payer failed", "obj"=>$res];
        }
        return ["status"=>"err","msg"=>"Initiate Auth failed","obj"=>$initate];
    }

    /** Step 1 of the 3DS initiate the authentication
     * The needed params are [Session_id, Authentication.channel, Order.Currency]
     * @return string|true|array
     * @throws JsonException
     */
    protected function InitiateAuth()
    {
        if ($this->sessionID) {
            $resp = $this->sendData([
                "apiOperation" => "INITIATE_AUTHENTICATION",
                "session" => ["id" => $this->sessionID],
                "authentication" => ["channel" => "PAYER_BROWSER"],
                "order" => ["currency" => $this->orderData['currency']],
            ]);
            if (is_array($resp) && $resp['response']['gatewayRecommendation'] === 'PROCEED') {
                return true;
            }
            return $resp;
        }
        return "ERROR No session ID";
    }

    protected function extractHtmlFromText($text) {
        $pattern = '/<div\b[^>]*>(.*?)<\/div>/s';
        preg_match($pattern, $text, $matches);
        if (isset($matches[0])) {
            return $matches[0];
        }
        return 'Error in extractHtmlFromText function';
    }
}