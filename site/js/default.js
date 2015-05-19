var standbytime = 10000, picshowtime = 5000;
var PLAYS = ["ads/2.jpg", "ads/1.mp4","ads/1.jpg","ads/3.mp4"];
var VIDEO, SRCinit, SIE, STO, CURRENTPLAY = 0, vhandler;
$(document).ready(function() {
	scrollBtn();
	closeBtn();
	VIDEO= document.getElementById("play_video");
	SRCinit = VIDEO.src;
	SIE = setInterval(VIDEOPlay, standbytime);	
	$("body,div,a,img").click(function(){initV();});
	vhandler = function(){countCurrentPlay();};
	document.onselectstart=function(){return false;}
	document.oncontextmenu=function(){return false;}
	document.onmousedown=function(){if(event.button==2)return false;}
});
function initV(){
	clearInterval(SIE);
	SIE = setInterval(VIDEOPlay, standbytime);	
}
function fs(){
	var elem = $(document.body);
	if ($.fullscreen.isFullScreen()) {
		//$.fullscreen.exit();
	}else{
		elem.fullscreen();
	}
}
function setVideoFrameMiddle(){
	var heights = $("#videos .videodiv video").height();
	if("none" == $("#videos .videodiv video").css("display")){
		heights = $("#videos .videodiv img").height();
	}
	$("#videos").css("top","50%").css("margin-top", -(heights/2)+"px");
}
function closeBtn(){
	$("#videos .videodiv a.close").click(function(){
		$("#maskdiv").hide();
		$("#videos").hide();
		VIDEO.pause();
		initV();
		clearTimeout(STO);
	});	
	$("#maskdiv").click(function(){
		$("#maskdiv").hide();
		$("#videos").hide();
		VIDEO.pause();
		initV();
		clearTimeout(STO);
	});	
}
function VIDEOPlay(){
	var files = PLAYS[CURRENTPLAY];
	var types = files.substr(files.length-3,3);
	var currentfile = SRCinit+"/"+files;
	clearInterval(SIE);
	//console.log(files);
	if("mp4"==types){
		if(VIDEO.src == currentfile && "none"!=$("#videos").css("display")) return false;
		VIDEO.src = currentfile;
		if (VIDEO.paused){
			$("#maskdiv").show();
			$("#videos").show();
			$("#videos img").hide();
			$("#videos video").show();
			setTimeout("setVideoFrameMiddle()",1000);
			VIDEO.play();
			VIDEO.addEventListener("ended", vhandler, false);
		}
	}else if("jpg"==types){
		if($("#play_img").attr("src") == currentfile && "none"!=$("#videos").css("display")) return false;
		$("#maskdiv").show();
		$("#videos").show();
		$("#videos video").hide();
		$("#videos img").show();
		$("#play_img").attr("src",currentfile);
		setTimeout("setVideoFrameMiddle()",1000);
		STO = setTimeout("countCurrentPlay()",picshowtime);
	}
}
function countCurrentPlay(){
	CURRENTPLAY++;
	VIDEO.removeEventListener("ended", vhandler, false);
	if(CURRENTPLAY < 0 || CURRENTPLAY > PLAYS.length-1) CURRENTPLAY = 0;
	VIDEOPlay();
}

function scrollBtn(){
	$("#scrollbtntop").click(function(){
		var moved = $(window).scrollTop()-300;
		if(moved<0) moved = 0;
		return $("html, body").animate({scrollTop: moved}, "fast"),!1
	});
	$("#scrollbtndown").click(function(){
		var moved = $(window).scrollTop()+300;
		var maxs = $(document).height() - $(window).height();
		if(moved>maxs) moved = maxs;
		return $("html, body").animate({scrollTop: moved}, "fast"),!1
	});
}
