<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Picture Show</title>
<link type="text/css" href="css/default.css" rel="stylesheet"/>
<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
</head>
<body>
<script type="text/javascript">
<?php
require_once 'Files.class.php';
$dirs = Files::fileTree("..");
echo "var tree=".json_encode($dirs);
?>
</script>

<div id="main-top">
 <font>The Picture POP Show And Auto Play - From  Directory Tree</font>
</div>

<div id="main-left">
	<ul id="folder_list">
		<li id="all-folder" class="folder" onclick="">所有文件</li>
	</ul>
</div>

<div id="main-right">

</div>

<div class="bottom">
	<em>Powered by Ison</em>
</div>


<div id="bgMask"></div>
<div id="pop">
	<div id="pop_top"></div>
	<div id="pop_left"></div>
	<div id="pop_right"></div>
	<div id="pop_bottom"></div>
	<div id="pop_autoplay"></div>
	<div id="pop_pause"></div>
	<div id="pop_close"></div>
	<div id="pop_pic"></div>
</div>


<script type="text/javascript" src="js/default.js"></script>
</body>
</html>