<?php 
header("Access-Control-Allow-Origin: *");
$ip = '';

function ip_visitor_country($ip){
    if(empty($ip)){
        $ip = getUserIpAddr();
    }
    $ip_data_in = get_web_page("http://ipinfo.io/".$ip."/json"); //add the ip to the url and retrieve the json data
    $ip_data = json_decode($ip_data_in['content'],true); //json_decode it for php use
    $ip_data['request_ip'] = $ip;
    
    if($ip_data['country'] == 'GH') {
        $ip_data['currency'] = 'GHS';
        $ip_data['exchange'] = 7.9;
    } else {
        $ip_data['currency'] = 'GBP';
        $ip_data['exchange'] = 1.00;
    }

    //this ip-lookup service returns 404 if the ip is invalid/not found so return false if this is the case.
    if(empty($ip_data) || $ip_data_in['httpcode'] == 404){
        return false;
    }else{
        return $ip_data; 
    }
}

function get_web_page($url){
    $user_agent = 'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

    $options = array(
        CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
        CURLOPT_POST           =>false,        //set to GET
        CURLOPT_USERAGENT      => $user_agent, //set user agent
        CURLOPT_RETURNTRANSFER => true,     // return web page
        CURLOPT_HEADER         => false,    // don't return headers
        CURLOPT_FOLLOWLOCATION => true,     // follow redirects
        CURLOPT_ENCODING       => "",       // handle all encodings
        CURLOPT_AUTOREFERER    => true,     // set referer on redirect
        CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
        CURLOPT_TIMEOUT        => 120,      // timeout on response
        CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
    );
    $ch = curl_init( $url );
    curl_setopt_array( $ch, $options );
    $content = curl_exec( $ch );
    $err     = curl_errno( $ch );
    $errmsg  = curl_error( $ch );
    $header  = curl_getinfo( $ch );
    $httpCode = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
    curl_close( $ch );  
    $header['errno']   = $err; //curl error code
    $header['errmsg']  = $errmsg; //curl error message
    $header['content'] = $content; //the webpage result (In this case the ip data in json array form)
    $header['httpcode'] = $httpCode; //the webpage response codeip
    return $header; //return the collected data and response codes
}

function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}


$query = ip_visitor_country($ip);
echo json_encode($query);

?>