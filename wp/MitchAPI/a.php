<?php
$str = "<div id=\"threedsChallengeRedirect\" xmlns=\"http://www.w3.org/1999/html\" style=\" height: 100vh\"> <form id =\"threedsChallengeRedirectForm\" method=\"POST\" action=\"https://mtf.gateway.mastercard.com/acs/mastercard/v2/prompt\" target=\"challengeFrame\"> <input type=\"hidden\" name=\"creq\" value=\"eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImEyZTkxZWY0LTQ5YjktNDJhMy1hNWFiLTFhYmViMDFmYjc1YiJ9\" /> </form> <iframe id=\"challengeFrame\" name=\"challengeFrame\" width=\"100%\" height=\"100%\" ></iframe> <script id=\"authenticate-payer-script\"> var e=document.getElementById(\"threedsChallengeRedirectForm\"); if (e) { e.submit(); if (e.parentNode !== null) { e.parentNode.removeChild(e); } } </script> </div>";

function extractHtmlFromText($text) {
    $pattern = '/<div\b[^>]*>(.*?)<\/div>/s';
    preg_match($pattern, $text, $matches);
    if (isset($matches[0])) {
        return $matches[0];
    }

    return null;
}

echo extractHtmlFromText($str);
