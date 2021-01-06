// JavaScript Document



var gArgs = new Array(),NNt;
function NN_td_start(obj,c1,c2,t1,t2,cF,sF,s){// v3.0.0 www.neonix.net
	if (obj == null) return;
	var isNet = navigator.appName == 'Netscape' ? true : false;
	var isFF = navigator.userAgent.indexOf('Firefox') != -1 ? true : false;
	var bVer = parseInt(navigator.appVersion);
	gArgs[0]=obj;gArgs[1]=c1;gArgs[2]=c2;gArgs[3]=t1;gArgs[4]=t2;gArgs[5]=s;
	if (isNet){if (isFF && bVer >= 5){NN_td_rollover();
	}else{obj.style.backgroundColor=c1;obj.style.color=c2;}
	}else{NN_td_rollover();}if(cF){obj.style.cursor='hand';}
}
function NN_td_exe(s,e){// v3.0.0 www.neonix.net
	var cntr=0,sp=gArgs[5];
	var r = parseInt(e.substring(1,3),16),g = parseInt(e.substring(3,5),16), b = parseInt(e.substring(5,7),16);
	if (navigator.userAgent.indexOf('Firefox') == -1){
	var rr = parseInt(s.substring(1,3),16),gg = parseInt(s.substring(3,5),16),bb = parseInt(s.substring(5,7),16);}else{
	var rslt = s.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
	var rr = parseInt(rslt[1]),gg = parseInt(rslt[2]),bb = parseInt(rslt[3]);}
		if (r!=rr){if(rr<r){rr=rr+sp>r?r:rr+sp;}else{rr=rr-sp<r?r:rr-sp;}}else{cntr++;}
		if (g!=gg){if(gg<g){gg=gg+sp>g?g:gg+sp;}else{gg=gg-sp<g?g:gg-sp;}}else{cntr++;}
		if (b!=bb){if(bb<b){bb=bb+sp>b?b:bb+sp;}else{bb=bb-sp<b?b:bb-sp;}}else{cntr++;}
	rr=rr.toString(16);gg=gg.toString(16);bb=bb.toString(16);
	rr=rr.length==1?'0'+rr:rr;gg=gg.length==1?'0'+gg:gg;bb=bb.length==1?'0'+bb:bb;
	if (cntr!=3){return '#'+rr.toUpperCase()+gg.toUpperCase()+bb.toUpperCase();}
}
function NN_td_rollover(){// v3.0.0 www.neonix.net
	switch(gArgs[3]){
	case 1:gArgs[0].style.backgroundColor=gArgs[1];break;
	case 2:gArgs[0].style.backgroundColor=NN_td_exe(gArgs[0].style.backgroundColor,gArgs[1]);}
	switch(gArgs[4]){
	case 1:gArgs[0].style.color=gArgs[2];break;
	case 2:gArgs[0].style.color=NN_td_exe(gArgs[0].style.color,gArgs[2]);}
	NNt=setTimeout('NN_td_rollover()',1);
}
function NN_td_reset(obj,hex,tHex){// v3.0.0 www.neonix.net
	if (obj == null) return;	
	obj.style.backgroundColor=hex;obj.style.color=tHex;clearTimeout(NNt);
}
function NN_target_frames(t,l){ // v1.0.0 www.neonix.net
	if(t.length==0){document.location.href=l;}
	else if(top.frames[t]!=undefined){top.frames[t].location=l;}else{window.open(l);}
}

