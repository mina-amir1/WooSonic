## How to use MPGS module
- use the pay.html to generate session ID
- Copy session ID and use postman to the pay.php to get the otp form
```
Request
{
  "sessionID" : "SESSION0002980765922J71265302L8",
  "orderData" : {
  "amount" :100.06,
  "currency": "EGP"
  }
}
  
Response
  {
    "status": "success",
    "html": "<div id=\"threedsChallengeRedirect\" xmlns=\"http://www.w3.org/1999/html\" style=\" height: 100vh\"> <form id =\"threedsChallengeRedirectForm\" method=\"POST\" action=\"https://mtf.gateway.mastercard.com/acs/mastercard/v2/prompt\" target=\"challengeFrame\"> <input type=\"hidden\" name=\"creq\" value=\"eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjdlYmQ0NjU3LWJlOTktNDQxNS1hMzdiLTNjMDc5MGQyYThkZSJ9\" /> </form> <iframe id=\"challengeFrame\" name=\"challengeFrame\" width=\"100%\" height=\"100%\" ></iframe> <script id=\"authenticate-payer-script\"> var e=document.getElementById(\"threedsChallengeRedirectForm\"); if (e) { e.submit(); if (e.parentNode !== null) { e.parentNode.removeChild(e); } } </script> </div>"
  }
```
- copy the html code and replace the div in otp.html file
- submit the OTP and you will be redirected to pay.php with response of an array of ["status", "paymentCode","obj"]