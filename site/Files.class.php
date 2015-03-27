<?php
class Files
{
	static private $_filetype = array("jpg", "png", "gif", "bmp");
	static private $_excluded_folder = array("../site");
	static private $_show_hide = false;	 //是否显示隐藏(.开头)文件
	
	static public $dirs = array();
	static public $files = array();
	
	static public function fileTree($sdir)
	{
		self::explorerDir($sdir);
		$dirs = self::$dirs;
		$dirs[] = $sdir;
		$files = self::$files;
		$tree = array();
		
		foreach ($dirs as $dir){
			$dir = mb_convert_encoding($dir, "UTF-8", "GBK");
			$len = strlen($dir);
			foreach ($files as $file){
				$file = mb_convert_encoding($file, "UTF-8", "GBK");
				if($sdir == $dir){
					if(1 == substr_count($file, '/')){
						$tree[$dir][] = $file;
						continue;
					}
				}else{
					$child = str_replace($dir, '', $file);
					//var_dump($dir,$file, $child);
					if($dir.'/' == mb_substr($file, 0,$len+1) && 1 == substr_count($child,'/')) $tree[$dir][] = $file;
				}
			}
		}
		return $tree;
	}
	
	static public function explorerDir($dir)
	{
		$fp = opendir($dir);
		while($file = readdir($fp))
		{
			if($file !="." && $file != "..")
			{
				$path = "$dir/$file";
				if(is_dir($path)){
					if(!in_array($path, self::$_excluded_folder)){
						if("." == mb_substr($file, 0,1)){
							if(self::$_show_hide){						
								self::$dirs[] = $path;
								self::explorerDir($path);
							}
						}else{
							self::$dirs[] = $path;
							self::explorerDir($path);
						}
					}
				}else{
					$len = strlen($file);
					$pos = strrpos($file, '.');
					$type = substr($file, $pos+1, ($len-$pos));
					$type = strtolower($type);
					if(!in_array($type, self::$_filetype)) continue;
						
					if("." == mb_substr($file, 0,1)){
						if(self::$_show_hide){
							self::$files[] = $path;
						}
					}else{
						self::$files[] = $path;
					}
					
				}
			}
		}
		closedir($fp);
	}
	
}