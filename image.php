<?php
	if (isset($_GET['url']) && $_GET['url'] != undefined) {
		$path = $_GET['url'];
		$type = str_replace('jpg', 'jpeg', pathinfo($path, PATHINFO_EXTENSION));
		//$data = file_get_contents($path);
		//$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

		header('Content-Type: image/'.$type);
		readfile($path);exit;
	}
?>
