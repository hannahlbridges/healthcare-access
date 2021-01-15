/* Author: Quentin Fountain
--
*/
var window_width = null;
/* Clone and place in mobile A-Z Index */
$('<div class="mobile-a-z"></div>').appendTo('#a-z-tablet');
$('.a-z-mega-menu').clone().appendTo($('.mobile-a-z'));
$('#a-z-tablet').css('top', -$('#a-z-tablet').innerHeight()-20);
$('#search-tablet').css('top', -$('#search-tablet').innerHeight()-20);

// Clone left nav and place in mobile left nav
var left_nav = $('nav#left');
var mobile_left = $('#mobile-left');
var open_btn = $('#mobile-left .open-btn');
var close_btn = $('#mobile-left .close-btn');
if($('nav#left').length != 0) {
    $('nav#left').clone().appendTo($('#mobile-left'));
    $(mobile_left).css('display', 'block');
}
onResize = function() {
    window_width = $(window).width();
    // Set Defaults
    if(window_width > 960) {
        $('#hhs-link span').text('U.S. Department of Health & Human Services');
        $('#tablet').css('display', 'none');
        $('#a-z-tablet').css('display', 'none');
       $('#nav-gradient').height('');
        $('#nav-gradient').css('top', '');
        $('nav#primary').css('top', '');
        $(mobile_left).css('display', 'none');
    }
    if(window_width <= 960) {
        $('#hhs-link span').text('U.S. Department of Health & Human Services');
        var nav_height = $('nav#primary').innerHeight();
        if ($.browser.msie) {
        $('nav#primary').css('top', '0');
            }else{
        $('#nav-gradient').height(nav_height+50);
        $('#nav-gradient').css('top', -$('#nav-gradient').height()-5);
        $('nav#primary').css('top', -$('nav#primary').innerHeight());
        }
        $('#nav-gradient').css('display', 'block');
        $('nav#primary').css('display', 'block');
        $('nav.tablet').css('top', 0);
        ($(left_nav).length != 0) ? $(mobile_left).css('display', 'block') : null;
    }
    if(window_width <= 600) {
        $('#hhs-link span').text('HHS.gov');
    }
    if(window_width <= 400) {
        $('#hhs-link span').text('');
    }
    if(window_width >= 680) {
        $(mobile_left).css('left', '');
        $(mobile_left).css('height', '');
        $(open_btn).css('left', '');
        $(open_btn).css('display', '');
        $(close_btn).css('display', '');
    }
    (window_width <= 680) ? $('#map-view-tab').css('display', 'none') : $('#map-view-tab').css('display', 'block');
    (window_width <= 680) ? $('#text-view-tab').css('display', 'none') : $('#text-view-tab').css('display', 'block');
    //(window_width <= 680) ? $('#map-view').css('display', 'none') : $('#map-view').css('display', 'block');
    //(window_width <= 680) ? $('#text-view').css('display', 'block') : $('#text-view').css('display', 'none');
}
onResize();

jQuery(document).ready(function() {
    // Code for Homepage carousel
    var info = $('.carousel-info ul');
    var carousel_groups = $('.carousel-info ul li');
    var carousel_imgs = $('.img-container ul');
    var carousel_btns = $('.carousel-buttons li');
    var group_width = $('.carousel-info').width();
    var img_height = 300;
    var current_item = 0;
    resizeContentBlock(0);
    for(var i = 0; i < carousel_groups.length; i++) {
        var button = $(carousel_btns)[i];
        var item = $(carousel_groups)[i];
        var id = i;
        var move = {
            id:id,
            button:button,
            action: function(e) {
                var element = e.target;
                $(carousel_imgs).animate({top:-this.id*img_height}, 500);
                hideInfo(this.id);
                $(carousel_groups[this.id]).fadeIn(500);
                $(this.button).addClass('active');
                resizeContentBlock(this.id);
                clearInterval(timer);
                e.preventDefault();
            }
        }
        $(button).click($.proxy(move.action, move));
    }
    // Hide All Info
    function hideInfo(num) {
        for(var i = 0; i < carousel_groups.length; i++) {
            if(i != num) {
                $(carousel_groups[i]).fadeOut(300);
                $(carousel_btns[i]).removeClass('active');
            }
        }
    }
    // Auto Transition for Homepage Carousel
    var timer = setInterval(transitionImage, 15*1000);
    var image_num = 0;
    var img_total = carousel_groups.length;
    function transitionImage() {
        if(image_num <= img_total-1) {
            $(carousel_imgs).animate({top:-image_num*img_height}, 500);
            $(carousel_groups[image_num]).fadeIn(500);
            hideInfo(image_num);
            $(info).animate({opacity: 1});
            $(carousel_btns[image_num]).addClass('active');
            resizeContentBlock(image_num);
            image_num++;
        } else if(image_num > img_total-1) {
            image_num = 0;
            $(carousel_imgs).animate({top:-image_num*img_height}, 500);
            $(carousel_groups[image_num]).fadeIn(500);
            hideInfo(image_num);
            $(info).animate({opacity: 1});
            $(carousel_btns[image_num]).addClass('active');
            resizeContentBlock(image_num);
            image_num++;
        }
    }
    transitionImage();

   // Hover Transition for Homepage Carousel PL
    $(carousel_imgs).hover(function() {
            clearInterval(timer);timer = 0;},
     function() {
             timer = setInterval(transitionImage, 15*1000);
    });
    // Resize Carousel Content Block
    function resizeContentBlock(num) {
        var info_height = $(carousel_groups[num]).css('height');
        $('.carousel-info').animate({height: info_height}, 300);
    }
    //Code for tabs on topic and map pages
    var tabs = $('#tabs li a');
    $(tabs[0]).addClass('active-tab');
    var content = $('.content');
    $(content).css('display', 'none');
    $(content[0]).css('display', 'block');
    tabs.click(function(event) {
        $(tabs).removeClass('active-tab');
        $(content).css('display', 'none');
        event.preventDefault();
        $(this).addClass('active-tab');
        var e = $(this).attr('href').substr(1);
        $('#'+e).css('display', 'block');
    });
    // Freeze utility bar when it reaches top of browser screen
    var header = $('#header-container');
    var breadcrumbs = $('#breadcrumb-container');
    var top = header.height()+breadcrumbs.height();
    //console.log('header height: '+header.height()+'\nbreadcrumb height: '+breadcrumbs.height()+'\n= '+toolbar_position+'px');
    var toolbar = $('#toolbar-container');
    $(window).scroll(function() {
        var scroll_position = $(window).scrollTop();
        if(scroll_position >= top) {
            //console.log('set to fixed position');
            $(toolbar).css('position', 'fixed');
            $(toolbar).css('width', 100+'%');
            $(toolbar).css('top', 0+'px');
            $(toolbar).css('left', 0+'px');
        } else {
            $(toolbar).css('position', 'relative');
            //$(toolbar).css('top', 0+'px');
        }
    });

    /**
    RESPONSIVE CODE
    ---------------------------------------------------
    ---------------------------------------------------
    **/
    onResize();
    // Track Open and Closed Items
    var menu_open = false;
    var a_z_open = false;
    var search_open = false;

    // Set Mobile Object
    var nav_gradient = $('#nav-gradient');
    var primary_nav = $('nav#primary');
    var tablet_obj = $('#tablet');
    var tablet_nav = $('nav.tablet');
    var menu_obj = $('#menu-tablet');
    var menu_btn = $('#menu-btn');
    var a_z_obj = $('#a-z-tablet');
    var a_z_btn = $('#a-z-btn');
    var search_btn = $('#search-btn');
    var search_obj = $('#search-tablet');
    var back_btn = $('#mobile-back-btn');

     // Menu Toggle
     $(menu_btn).click(function() {
        if(window_width <= 960) {
            if(!menu_open){
                if(a_z_open) {
                    closeTab("a-z", "menu");
                }
                if(search_open) {
                    closeTab("search", "menu");
                }
                var height = $(primary_nav).innerHeight()+50;
                $(nav_gradient).height(height);
                $(nav_gradient).css('top', -height-5);
                $(nav_gradient).animate({top: '0px'}, 350);
                $(primary_nav).animate({top: '40px'}, 350);
                $(tablet_obj).animate({height: height}, 350);
                $(tablet_nav).animate({top: height+5}, 350);
                $(menu_btn).find('a').addClass('active');
                $(a_z_obj).fadeOut(350, function() {
                    $(a_z_obj).css('display', 'none');
                });
                menu_open = true;
            } else {
                closeTab("menu");
            }
        }
       }
     );

     // Primary Navigation/Mega Menu
     $('nav#primary .menu-parent .mobile-arrow').click(function() {
        if(window_width <= 960) {
            var parent = $(this).parent();
            $(primary_nav).animate({top: -$(primary_nav).height()}, 350);
            var clone = $(this).parent().contents().find('.secondary');
            var mobile_secondary = $('<div class="mobile-secondary"></div>').appendTo('#menu-tablet');
            var secondary_btn = $(clone).clone().appendTo(mobile_secondary);
            /*var mobile_tertiary = $('<div class="mobile-tertiary"></div>').appendTo('#menu-tablet');*/
            $(tablet_obj).css('display', 'block');
            $(tablet_obj).css('height', $(primary_nav).innerHeight()-5);
            $(menu_obj).css('top', $(nav_gradient).height());
            $(menu_obj).animate({opacity: 1, top: 50}, 350);
            $(tablet_obj).animate({height: $(menu_obj).innerHeight()+50}, 350);
            $(nav_gradient).animate({height: $(menu_obj).innerHeight()+50}, 350);
            $(tablet_nav).animate({top: $(menu_obj).innerHeight()+55}, 350);
            $(back_btn).fadeIn(500);
            // Secondary Navigation (maybe someday...)
            /*$('.secondary .mobile-arrow').click(function() {

            });*/
        }
     });

     $(back_btn).click(function() {
        $(back_btn).fadeOut(100);
        var height = $(primary_nav).innerHeight()+50;
        $(nav_gradient).height(height);
        $(nav_gradient).css('top', -height-5);
        $(nav_gradient).animate({top: '0px'}, 350);
        $(primary_nav).animate({top: '40px'}, 350);
        $(tablet_obj).animate({height: height}, 350);
        $(tablet_nav).animate({top: height+5}, 350);
        $(menu_obj).animate({top: $(nav_gradient).height()}, 350,
        function() {
            $('.mobile-secondary').remove();
        });
     });

     // A-Z Index
     $(a_z_btn).click(function() {
        if(window_width <= 960) {
            if(!a_z_open){
                if(menu_open) {
                    closeTab("menu", "a-z");
                }
                if(search_open) {
                    closeTab("search", "a-z");
                }
                $(tablet_obj).css('display', 'block');
                $(tablet_obj).animate({height: $(a_z_obj).innerHeight()+20}, 350);
                $(tablet_obj).animate({top: 0}, 350);
                $(a_z_obj).css('display', 'block');
                $(a_z_obj).animate({top: 10}, 350);
                $(tablet_nav).animate({top: $(a_z_obj).innerHeight()+20}, 350);
                $(a_z_btn).find('a').addClass('active');
                a_z_open = true;
            } else {
                closeTab("a-z");
            }
        }
       });

       // Search Tool
       $(search_btn).click(function() {
        if(window_width <= 960) {
            if(!search_open) {
                if(menu_open) {
                    closeTab("menu", "search");
                }
                if(a_z_open) {
                    closeTab("a-z", "search");
                }
                $(tablet_obj).css('display', 'block');
                $(tablet_obj).animate({height: $(search_obj).innerHeight()+50}, 350);
                $(tablet_obj).animate({top: 0}, 350);
                $(search_obj).css('display', 'block');
                $(search_obj).animate({top: 10}, 350);
                $(tablet_nav).animate({top: $(search_obj).innerHeight()+50}, 350);
                $(search_btn).find('a').addClass('active');
                search_open = true;
            } else {
                closeTab("search");
            }
        }
       });

     // Close Tablet Nav Item
     function closeTab(close, open) {
        $(back_btn).fadeOut(500);
         if(close == "menu") {
            $(nav_gradient).animate({top: -$(nav_gradient).height()-5}, 350);
            $(primary_nav).animate({top: -$(primary_nav).height()}, 350);
            (open != "a-z" && open != "search") ? $(tablet_nav).animate({top: 0}, 350) : null;
            (open != "a-z" && open != "search") ? $(tablet_obj).animate({height: 0}, 350) : null;
            $(menu_btn).find('a').removeClass('active');
            $(menu_obj).animate({top: $(nav_gradient).height()}, 350,
            function() {
                $('.mobile-secondary').remove();
            });
            menu_open = false;
         }
         if(close == "a-z") {
            (open != "search") ? $(tablet_obj).animate({height: 0}, 350) : null;
            $(a_z_obj).animate({top: -$(a_z_obj).innerHeight()-20}, 350);
            $(a_z_obj).fadeOut(350);
            (open != "menu" && open != "search") ? $(tablet_nav).animate({top: 0}, 350) : null;
            $(a_z_btn).find('a').removeClass('active');
            a_z_open = false;
         }
         if(close == "search") {
            (open != "a-z") ? $(tablet_obj).animate({height: 0}, 350) : null;
            $(search_obj).animate({top: -$(search_obj).innerHeight()-20}, 350);
            $(search_obj).fadeOut(350);
            (open != "menu" && open != "a-z") ? $(tablet_nav).animate({top: 0}, 350) : null;
            $(search_btn).find('a').removeClass('active');
            search_open = false;
         }
     }

     // Open Left Nav
     $(open_btn).click(function() {
        if(window_width > 679) {
            $(mobile_left).animate({left: 0}, 350);
        } else {
            $(mobile_left).animate({height: $(mobile_left).find($('nav#left')).innerHeight()+20}, 350);
        }
        $(open_btn).fadeOut(350);
        $(close_btn).fadeIn(350);
     });

     // Close Left Nav
     $(close_btn).click(function() {
        if(window_width > 679) {
            $(mobile_left).animate({left: -210}, 350);
        } else {
            $(mobile_left).animate({height: 10}, 350);
        }
        $(open_btn).fadeIn(350);
        $(close_btn).fadeOut(350);
     });

    // Check for Window Resize
    $(window).resize(function() {
        onResize();
    });

/******************************************************
Author: K D'Augustine   2012-07-31
Process all links in the page,
if external of the AHRQ webspace & not a .gov link,
display the External Link icon after the link.
******************************************************/

var extLinkWin = "&nbsp;<a href='" + navbase + "/externaldisclaimer.html'><img src='" + navbase + "/resources/img/exit_disclaimer.png' alt='Link to Exit Disclaimer' title='Link to Exit Disclaimer'>";
var isLocal = false;
var i = 0;
var $allLinks = $("a");

//$('a:not([href*="ahrqrxdev"]):not([href*="mailto:"]):not([href*=".ahrq."]):not([href*="ahrq.hhs."]):not([href*=".gov"]):not([href^="home.html"]):not([href*="twitter.com"]):not([href*="facebook.com/"]):not([href*="youtube.com/"]):not([href^="../"]):not([href^="#"]):not([href^="/"]):not([class*="skipExtLinkCheck"])').addClass('externalLink').after( extLinkWin );

//$('a:not([href*="ahrqrxdev1"]').css("background","#ccc");
//$('a:not([href*="ahrqrxdev1"]):not([href*=".ahrq."]):not([href*="mailto:"]):not([href*="ahrq.hhs."])').css("background","#ffd");

$.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto\:/)
            && !(obj.href.match(/\.gov/))
            && !(obj.href.match(/ahrq/))
            && !(obj.href.match(/^\#/))
            && !(obj.href.match(/facebook\.com/))
            && !(obj.href.match(/history\.back/))
            && !(obj.href.match(/twitter\.com/))
            && !(obj.href.match(/youtube\.com/))
            && !(obj.href.match(/widget\.uservoice\.com/))
            && (obj.hostname != location.hostname)
            && (obj.href != "");
};

// Add 'external' CSS class to all external links
$('a:external').addClass('externalLink').after(extLinkWin);


});
/********************************************************
Author: K D'Augustine
********************************************************/
var debugme = getParameterByName("debugme");
//if ( debugme ) { console.error("debugging"); }

// =======================================
//   Make A-Z Index Flyout menu visible
// =======================================
    $(".a-z-utility-move").click(function(e) {
        e.preventDefault();
        flyout = $("#azIndexFlyout");

        if ( flyout.hasClass("show") == true      ) {
            flyout.removeClass("show");
        } else {
            flyout.addClass("show");
        }
    });
    // ==============================================
    // Close the flyout menu if a letter is clicked
    // ==============================================
    $("nav#utility #azIndexFlyout ul li a").click(function(){
        $("#azIndexFlyout").removeClass("show");
    });

/****************************
Author: K D'Augustine
****************************/
// ========================
//    Text Resizing
// =======================

    var ahrqFontSize =  "default";
    var container = $('.grid_9')
    var homeContainer = $('#home')
    var allConttainers = $(container, homeContainer)
    ahrqFontSize = readCookie("ahrqFontSize");
     if (   ahrqFontSize == 'undefined'  ) {  ahrqFontSize = "default";  }
     $(container).addClass(ahrqFontSize);
     $(homeContainer).addClass(ahrqFontSize);
     setLink( ahrqFontSize );

     // ======   Click action =======
     $('#text-resize-tool a').click(function()  {
          var ahrqFontSize = $(this).attr('id');

          $(container).removeClass('default bigger biggest').addClass(ahrqFontSize);
          createCookie('ahrqFontSize', ahrqFontSize);


          $(homeContainer).removeClass('default bigger biggest').addClass(ahrqFontSize);
          createCookie('ahrqFontSize', ahrqFontSize);

          setLink( ahrqFontSize );
          return false;

     });
/********************************************************
Setting Font size after AAA tool is clicked.
Author: K D'Augustine
********************************************************/
function setLink( fontsize ) {

    var linkSet = 0;

    $('#text-resize-tool a').each(function() {
         $(this).removeClass("activeLink");
         //alert("removedClass");

         if ( $(this).attr('id') == fontsize ){
            $(this).addClass("activeLink");
            linkSet = 1;
            //alert("linkSet - " + fontsize)
        }
     });

     // If none were selected, use the default (a#id='default')
     if (linkSet == 0) {
        $("#text-resize-tool a#default").addClass("activeLink");
     }

     return true;
}

// Cookie Functions //
function createCookie(name, value, days) {

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
    return true;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/********************************************************
Tooltip
Author: Patty Lozano
********************************************************/
$(document).ready(function() {
  $("div#social a").mouseenter(function (e) { //event fired when mouse cursor enters "a" element
            var $x = e.pageX - this.offsetLeft; //get mouse X coordinate relative to "a" element
            var $tooltip_text = $(this).attr("title"); //get title attribute of "a" element
            if ($tooltip_text) { //display tooltip only if it has more than zero characters

                $(this).append('<div class="tooltip center">' + $tooltip_text + '</div>'); //append tooltip markup, insert class name and tooltip title from the values above

                $("div#social a > div.tooltip.center").fadeIn(300); //display, animate and fade in the tooltip
            }
        });

        $("div#social a").mouseleave(function () { //event fired when mouse cursor leaves "a" element

            //fade out the tooltip, delay for 300ms and then remove the tooltip and end the custom queue
            $("div#social a > div.tooltip.center").fadeOut(300).delay(300).queue(function () {
                $(this).remove();
                $(this).dequeue();
            });
        });
    });

 /********************************************************
Sort
Author: Patty Lozano
********************************************************/
$(document).ready(function() {
function sortUsingNestedText(parent, childSelector, keySelector, caller) {
    var articles;

    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });

    var articles = $();
    items.each(function() {
        if ($(this).text().indexOf("articles") != -1) { //if it contains "articles"
            articles = articles.add($(this)); //adds to the articles jQuery object
            items = items.not($(this)); //and remove from items
        }
    });

    if (caller.data('order_by') == 'asc') {
        articles = articles.sort(function(a, b) {
            var vA = $(a).text();
            var vB = $(b).text();
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
        });
    }

    if (caller.data('order_by') == 'desc') { //alert('desc pattern');
        caller.data('order_by', 'asc');
        parent.append(items.get().reverse());
        parent.append(articles.get().reverse());
    } else { //alert('asc pattern');
        caller.data('order_by', 'desc');
        parent.append(articles);
        parent.append(items);
    }
}

$('#date').data("sortKey", "span.yearNumber").data('order_by', 'desc');
$('#name').data("sortKey", "div.article-preview").data('order_by', 'desc');

$("#date").click(function() {
    //$('.article-preview-left-col > .article-preview-date > span').contents().unwrap();
     $(this).toggleClass("sortAsd")
    $('.blog-year-month').remove();
    sortUsingNestedText($('#sort'), "article", $("#date").data("sortKey"), $(this));

});

$("#name").click(function() {
    //$('.article-preview-left-col > .article-preview-date > span').contents().unwrap();
    $(this).toggleClass("sortAsd")
    $('.blog-year-month').remove();
    sortUsingNestedText($('#sort'), "article", $("#name").data("sortKey"), $(this));
});


});
/********************************************************
Modal Window
Implemented: Patty Lozano
SimpleModal Basic Modal Dialog
http://simplemodal.com
Copyright (c) 2013 Eric Martin - http://ericmmartin.com
Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php
********************************************************/

/********************************************************
Author: B Macias 2013-07-16
Load new URL in same browser window from value attribute of selected option tag.
Purpose: AQ-1156
    Template ahrqPgCaseStudyMap contains multiple select
    elements to navigate to a page for a particular U.S.
    state, U.S. territory, or for a foreign country.
Trigger:
    - select element must have attribute ' name="url"' and
    - selected option value attribute must be a FQDN url of the same site hostname
    else this script does nothing. Specifically, it ignores the select
    elements on same page used in the filtered search form.
********************************************************/
$('select[name="url"]').change(function() {
    // assign the value to a variable, so you can test to see if it is working
    var selectVal = $(this).val();
    // limit loading of URLs to same hostname
    if (selectVal.match(location.hostname)) { // alert(location.hostname);
        window.location.href = selectVal;
    } else { // alert(location.hostname);
    }
});


/********************************************************
TOC for publication hovering over
PL
********************************************************/
$(document).ready(function() {
    $(".toc-dropdown").hide();
     $("li.utility.content-button").mouseenter(function(){
    $(".toc-dropdown").show();
    }).mouseleave(function(){
    $(".toc-dropdown").hide();
    });
});


$(document).ready(function() {
    // Load dialog on page load

      $('#basic-modal .basic').removeAttr("role");
      $('#basic-modal #basic-modal-content').removeAttr("role").attr('role', 'alertdialog').attr('aria-hidden','true');
       $('#basic-modal').attr('aria-hidden','false');
        // Load dialog on click
    $('#basic-modal .basic').click(function (e) {
        $('#basic-modal-content').modal();
        $('#basic-modal-content, .simplemodal-wrap, #simplemodal-container').attr('aria-hidden','false');
        $('#basic-modal').attr('aria-hidden','true');
         return false;
    });
});