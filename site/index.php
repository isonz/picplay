<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Picture Show</title>
<link type="text/css" href="css/default.css" rel="stylesheet"/>
<script type="text/javascript" src="js/jquery.js"></script>
<script src="js/defult.js"></script>
</head>
<body>
<?php
require_once 'Files.class.php';
$dirs = Files::fileTree("..");
var_dump($dirs);

?>

</body>
</html>