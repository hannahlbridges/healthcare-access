document.getElementById('displayYesNo1').className="displayYes";
document.getElementById('displayYesNo2').className="displayYes";

if(Get_Cookie('FONT_SIZE')== FS_S+"%"){
	document.getElementById('sfs_div').className="font_size_sel";
}
else if(Get_Cookie('FONT_SIZE')== FS_M+"%"){
	document.getElementById('mfs_div').className="font_size_sel";
}
else if(Get_Cookie('FONT_SIZE')== FS_L+"%"){
	document.getElementById('lfs_div').className="font_size_sel";
}
else if(Get_Cookie('FONT_SIZE')== FS_X+"%"){
	document.getElementById('xfs_div').className="font_size_sel";
}
else{
	document.getElementById('mfs_div').className="font_size_sel";
}	