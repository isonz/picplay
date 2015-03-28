var START = 0, LEND = 0, NAME, FOLDER=new Array(), CURRI=0, IW, IH, DBCLICKSTATUS=0, PLAY;

$(document).ready(function() {
	getDirs();
	$("#pop_close").click(function(){
		$("#bgMask").hide();
		$("#pop").hide();
	});
	
	$("#pop_top").click(function(){
		nextFolder(-1);
	});
	
	$("#pop_left").click(function(){
		START = START-1;
		if(START>=0){
			var files = tree[NAME];
			var pic = files[START];
			pop(pic, START, LEND);
		}else{
			nextFolder(-1);
		}
		
	});
	
	$("#pop_right").click(function(){
		play();
	});
	
	$("#pop_bottom").click(function(){
		nextFolder(1);
	});
	
	$("#pop_autoplay").click(function(){
		PLAY = setInterval("play()", 2000);
		$("#pop_autoplay").hide();
		$("#pop_pause").show();
	});
	
	$("#pop_pause").click(function(){
		clearInterval(PLAY);
		$("#pop_autoplay").show();
		$("#pop_pause").hide();
	});
	
});

function play()
{
	START = START+1;
	if(LEND>START){
		var files = tree[NAME];
		var pic = files[START];
		pop(pic, START, LEND);
	}else{
		nextFolder(1);
	}
}

function nextFolder(n)
{
	for(var i=0; i<FOLDER.length; i++){
		if(FOLDER[i]==NAME) CURRI = i;
	}
	
	if(n>0){
		if(FOLDER.length<=CURRI+n){
			CURRI = 0;
		}else{
			CURRI++;
		}
	}else{
		if(0>CURRI+n){
			CURRI = FOLDER.length-1;
		}else{
			CURRI--;
		}
	}
	
	NAME = FOLDER[CURRI];
	START = 0;
	var files = tree[NAME];
	var pic = files[START];
	LEND = files.length;
	pop(pic, START, LEND);
}

function getDirs()
{
	var i=0;
	for(var o in tree){
		FOLDER[i]=o;
		i++;
		var name = o.replace("../", "")
		if('..'==o) name = '/';
        $("#folder_list").append('<li class="folder folder-childs" onclick="getFiles(\''+o+'\')">'+name+'</li>');
    }  
}

function getFiles(name)
{
	NAME = name;
	$("#main-right").html('');
	var files = tree[name];
	var len = files.length;
	for(var i=0; i<len; i++){
		$("#main-right").append('<a href="javascript:pop(\''+files[i]+'\', '+i+', '+len+')"><img src="'+files[i]+'" width="100" /></a>');
	}
}

function pop(pic, start, end)
{
	$("#pop").css("top", "50%");
	$("#bgMask").show();
	$("#pop").show();
	$("#pop_pic").html('<img onload="resetBoxSize(0)" id="loadimg" src="'+pic+'" />');
	START = start;
	LEND = end;
}

function getLoadimgSize()
{
	var iwidth = $("#loadimg").width();
	var iheight = $("#loadimg").height();
	IW = iwidth;
	IH = iheight;
	var wwidth = $(window).width();
	var wheight = $(window).height();

	if(iwidth > wwidth){
		$("#loadimg").width(wwidth);
		$("#loadimg").css("height",'');
	}
	if(iheight > wheight){
		$("#loadimg").height(wheight);
		$("#loadimg").css("width",'');
	}
	console.log(DBCLICKSTATUS);
	if(DBCLICKSTATUS<1){
		//$("#loadimg").dblclick(function(){
		$("#loadimg").click(function(){
			if(DBCLICKSTATUS < 2){
				$("#loadimg").width(IW);
				$("#loadimg").height(IH);
				resetBoxSize(1);
				DBCLICKSTATUS = 2;
			}else{
				getLoadimgSize();
				resetBoxSize(1);
				DBCLICKSTATUS = 1;
				$("#pop").css("top","50%");
			}
		});
	}
}

function resetBoxSize(n)
{
	if(n<1) {
		DBCLICKSTATUS = 0;
		getLoadimgSize();
	}
	$("#pop").css("margin-top", -($("#pop").height()/2));
	$("#pop").css("margin-left", -($("#pop").width()/2));
	if($(window).height() < $("#pop").height()) $("#pop").css("top",($("#pop").height()/2));
}



