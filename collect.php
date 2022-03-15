<?php
    if(!function_exists('GetUserIP')){
		function GetUserIP(){
			//Returning user/client IP in or out the proxy server.
			$ipaddress = '';
			if (isset($_SERVER['HTTP_CLIENT_IP']))
				$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
			else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
				$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
			else if(isset($_SERVER['HTTP_X_FORWARDED']))
				$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
			else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
				$ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
			else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
				$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
			else if(isset($_SERVER['HTTP_FORWARDED']))
				$ipaddress = $_SERVER['HTTP_FORWARDED'];
			else if(isset($_SERVER['REMOTE_ADDR']))
				$ipaddress = $_SERVER['REMOTE_ADDR'];
			else
				$ipaddress = 'UNKNOWN';
			return $ipaddress;
		}
	}
	
	if(!function_exists('DateTimeTS')){
		function DateTimeTS($timestamp){
			$return = (object)array('time' => date('h:i:s A', $timestamp),
									'date' => date('F jS Y', $timestamp),
									'datetime' => date('F jS Y - h:i:s A', $timestamp));
			return $return;
		}
	}
	
	if(!function_exists('GetTimestamp')){
		function GetTimestamp(){
			$date = new DateTime();
			return $date->getTimestamp();
		}
	}
	
	$iplog = fopen("accessIP.log", "a") or die("Unable to open file!");
	$logdata = GetUserIP() . ' => ' . DateTimeTS(GetTimestamp())->datetime . "\r\n";
	fwrite($iplog, $logdata);
	
?>