var min=8;
var max=18;

var FS_S = "65";
var FS_M = "75";
var FS_L = "85";
var FS_X = "95";
var sel_fs = "75";
var p = document.getElementsByTagName('body');
var s = document.getElementsByTagName('select');


if(Get_Cookie('FONT_SIZE')){	
	}
else{	
	Set_Cookie( 'FONT_SIZE', FS_M+"%", '', '/', '', '' );
}

if(Get_Cookie('FONT_SIZE')){
	for(i=0;i<p.length;i++) {
		p[i].style.fontSize = Get_Cookie('FONT_SIZE');
	}
	for(i=0;i<s.length;i++) {
		s[i].style.fontSize = Get_Cookie('FONT_SIZE');
	}
}





function setFontSize(fs) {
	document.getElementById('sfs_div').className="font_size";
	document.getElementById('mfs_div').className="font_size";
	document.getElementById('lfs_div').className="font_size";
	document.getElementById('xfs_div').className="font_size";
	
	if(fs == 'S'){
		sel_fs=FS_S;
		document.getElementById('sfs_div').className="font_size_sel";
	}	
	else if(fs == 'M'){
		sel_fs=FS_M;
		document.getElementById('mfs_div').className="font_size_sel";
	}
	else if(fs == 'L'){	
		sel_fs=FS_L;		
		document.getElementById('lfs_div').className="font_size_sel";
	}
	else if(fs == 'X'){
		sel_fs=FS_X;
		document.getElementById('xfs_div').className="font_size_sel";
	}
	else{
		sel_fs=FS_M;
		document.getElementById('mfs_div').className="font_size_sel";					
	}
		
   for(i=0;i<p.length;i++) { 	

      p[i].style.fontSize = sel_fs+"%";
      Set_Cookie( 'FONT_SIZE', sel_fs+"%", '', '/', '', '' );
   }

   for(i=0;i<s.length;i++) { 
   	 s[i].style.fontSize = sel_fs+"%";
   }

}



function setFontSizeMouseOverColor(fs){	
	if(fs == 'S'){
		temp_color_s = document.getElementById('sfs_alink').style.color;
		document.getElementById('sfs_alink').style.color="#ffffff";
	}
	else if(fs == 'M'){
		temp_color_m=document.getElementById('mfs_alink').style.color;
		document.getElementById('mfs_alink').style.color="#ffffff";
	}
	else if(fs == 'L'){
		temp_color_l=document.getElementById('lfs_alink').style.color;
		document.getElementById('lfs_alink').style.color="#ffffff";
	}
	else if(fs == 'X'){
		temp_color_x=document.getElementById('xfs_alink').style.color;
		document.getElementById('xfs_alink').style.color="#ffffff";
	}
}

function setFontSizeMouseOutColor(fs){
	if(fs == 'S'){
		document.getElementById('sfs_alink').style.color=temp_color_s;
	}
	else if(fs == 'M'){
		document.getElementById('mfs_alink').style.color=temp_color_m;
	}
	else if(fs == 'L'){
		document.getElementById('lfs_alink').style.color=temp_color_l;
	}
	else if(fs == 'X'){
		document.getElementById('xfs_alink').style.color=temp_color_x;
	}

}


function increaseFontSize() {
   for(i=0;i<p.length;i++) {
   	
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
         var s = 12;
      }
      if(s!=max) {
         s += 1;
      }
      
      p[i].style.fontSize = s+"px"
      Set_Cookie( 'FONT_SIZE', s+"px", '', '/', '', '' );
   }
   for(i=0;i<s.length;i++) {
   	
      if(s[i].style.fontSize) {
         var r = parseInt(s[i].style.fontSize.replace("px",""));
      } else {
         var r = 12;
      }
      if(r!=max) {
         r += 1;
      }
      s[i].style.fontSize = r+"px"
   }
}

function decreaseFontSize() {
   for(i=0;i<p.length;i++) {
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
         var s = 12;
      }
      if(s!=min) {
         s -= 1;
      }
      p[i].style.fontSize = s+"px"
      Set_Cookie( 'FONT_SIZE', s+"px", '', '/', '', '' );
   }   
   for(i=0;i<s.length;i++) {
      if(s[i].style.fontSize) {
         var r = parseInt(s[i].style.fontSize.replace("px",""));
      } else {
         var r = 12;
      }
      if(r!=min) {
         r -= 1;
      }
      s[i].style.fontSize = r+"px"
   }   

}

function Set_Cookie( name, value, expires, path, domain, secure ){
	// set time in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	
	/*
	if the expires variable is set, make the correct
	expires time, the current script below will set
	it for x number of days, to make it for hours,
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires )
	{
	expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	
	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}



function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


