var popupwindow;

function ClearNonPopupLinks() {
    /* Replaces the href of all links targeted to popup to Javascript:void(0) disabling them */
    for(var i=0;i<document.links.length;i++) if (document.links[i].target=='popup') {
        document.links[i].href="javascript:void(0)";
        document.links[i].target="";
    }
}

function VOver(Var) {
    /* Function called to change the status line when a mouse goes over a variable link */
    window.status= "Variable Information for " + Var;
    return true;
}

function GOver(File,LCtl) {
    /* Function called to change the status line when a mouse goes over a variable group link */
    window.status= "Description of HC-" + File.substr(2,File.length-2) + " variable group " + LCtl.text;
    return true;
}

function MOut(Var) {
    /* Function called to clear status line when the mouse is no longer over a link */
    window.status= "";
    return true;
}

function CheckWeightBox() {
    /* Checks the WEIGHT box if the standard error box is checked */
    if (document.forms[0].CALCSE.checked) document.forms[0].WEIGHT.checked = true;
}

function ChangeImage(ControlName,NewSource) {
    /* Changes the source of an image on an image button and the alt text. */
    var f = document.forms[0];
    if (document.images[ControlName].src != NewSource) document.images[ControlName].src = NewSource;
}

function EnableTabs() {
/* Enables variable recoding, record selection, and descriptive statistics tabs. */
//ChangeImage("Variable Recoding","hc_images/TabGIF/VariableRecodingNS.gif")
//ChangeImage("Record Selection","hc_images/TabGIF/RecordSelectionNS.gif")
//ChangeImage("Descriptive Statistics","hc_images/TabGIF/DescriptiveStatisticsNS.gif")
}

function DisableTabs() {
/* Disables record selection and descriptive statistics tabs. */
//ChangeImage("Variable Recoding","hc_images/TabGIF/VariableRecodingNE.gif")
//ChangeImage("Record Selection","hc_images/TabGIF/RecordSelectionNE.gif")
//ChangeImage("Descriptive Statistics","hc_images/TabGIF/DescriptiveStatisticsNE.gif")
}

function CheckTabs() {
    /* On variable selection screen, checks to see if any variables are selected and
enables or disables the variable recoding, record selection, and descriptive statists tabs if necessary */
    var anychecked = false;
    var f = document.forms[0];
    for (var i=0;i<f.length;i++) if ((f[i].name == "SELVAR") && (f[i].type == "checkbox")) if (f[i].checked) anychecked = true;
    if (anychecked) EnableTabs();
    else DisableTabs();
}