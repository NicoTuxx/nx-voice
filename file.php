<?php
	if (isset($_GET['url']) && $_GET['url'] != undefined) {
		$fn = $_GET['url'];
    		$headers = apache_request_headers(); 
$contentType = getUrlMimeType($_GET['url']);

   		if (isset($headers['If-Modified-Since']) && (strtotime($headers['If-Modified-Since']) == filemtime($fn))) {
        		header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($fn)).' GMT', true, 304);
    		} else {
        		header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($fn)).' GMT', true, 200);
        		header('Content-Length: '.filesize($fn));
       			header('Content-Type: image/jpeg');
        		print file_get_contents($fn);
    		}

		$contentType = getUrlMimeType($_GET['url']);
		header('Content-type: '+$contentType);
		header('Content-Transfer-Encoding: binary');
		readfile($_GET['url']);
	}

	function getUrlMimeType($url) {
                $buffer = file_get_contents($url);
                $finfo = new finfo(FILEINFO_MIME_TYPE);
                return $finfo->buffer($buffer);
        }
?>
