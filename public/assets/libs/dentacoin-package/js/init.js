if("undefined"==typeof jQuery)console.error("Dentacoin hub requires the usage of jQuery.");else if(navigator.onLine)var fireHubAjax=!0,fireBigHubAjax=!0,dcnAdditionals={utils:{fireGoogleAnalyticsEvent:function(e,t,i,o){if("undefined"!=typeof gtag){var a={event_action:t,event_category:e,event_label:i};null!=o&&(a.value=o),gtag("event",i,a)}},cookies:{get:function(e){if(null==e)e="cookieLaw";e+="=";for(var t=document.cookie.split(";"),i=0;i<t.length;i+=1){for(var o=t[i];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e))return o.substring(e.length,o.length)}return""},set:function(e,t){null==e&&(e="cookieLaw"),null==t&&(t=1);var i=new Date;i.setTime(i.getTime()+864e7);var o="expires="+i.toUTCString();document.cookie=e+"="+t+"; "+o+";domain=.dentacoin.com;path=/;secure","cookieLaw"==e&&jQuery(".cookies_popup").slideUp()},erase:function(e){document.cookie=e+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"}},initCustomCheckboxes:function(e){null==typeof e?e="":e+=" ";for(var t=0,i=jQuery(e+".custom-checkbox-style").length;t<i;t+=1)jQuery(e+".custom-checkbox-style").eq(t).hasClass("already-custom-style")||(jQuery(e+".custom-checkbox-style").eq(t).find('input[type="checkbox"]').is(":checked")?jQuery(e+".custom-checkbox-style").eq(t).prepend('<label for="'+jQuery(e+".custom-checkbox-style").eq(t).find('input[type="checkbox"]').attr("id")+'" class="custom-checkbox">✓</label>'):jQuery(e+".custom-checkbox-style").eq(t).prepend('<label for="'+jQuery(e+".custom-checkbox-style").eq(t).find('input[type="checkbox"]').attr("id")+'" class="custom-checkbox"></label>'),jQuery(e+".custom-checkbox-style").eq(t).addClass("already-custom-style"));jQuery(e+".custom-checkbox-style .custom-checkbox-input").unbind("change").on("change",function(){if(!jQuery(this).closest(".custom-checkbox-style").hasClass("predefined")&&(jQuery(this).is(":checked")?jQuery(this).closest(e+".custom-checkbox-style").find(".custom-checkbox").html("✓"):jQuery(this).closest(e+".custom-checkbox-style").find(".custom-checkbox").html(""),null!=jQuery(this).attr("data-radio-group")))for(var t=0,i=jQuery('[data-radio-group="'+jQuery(this).attr("data-radio-group")+'"]').length;t<i;t+=1)jQuery(this).is(jQuery('[data-radio-group="'+jQuery(this).attr("data-radio-group")+'"]').eq(t))||(jQuery('[data-radio-group="'+jQuery(this).attr("data-radio-group")+'"]').eq(t).prop("checked",!1),jQuery('[data-radio-group="'+jQuery(this).attr("data-radio-group")+'"]').eq(t).closest(e+".custom-checkbox-style").find(".custom-checkbox").html(""))})}}},dcnHub={dcnHubRequests:{getHubData:async function(e){if(fireHubAjax){fireHubAjax=!1;var t=await jQuery.ajax({type:"POST",url:"https://dentacoin.com/combined-hub/get-hub-data/"+e,dataType:"json"});return fireHubAjax=!0,t}},getHubChildren:async function(e){if(fireHubAjax){fireHubAjax=!1;var t=await jQuery.ajax({type:"POST",url:"https://dentacoin.com/combined-hub/get-hub-children/"+e,dataType:"json"});return fireHubAjax=!0,t}},getPlatformMenu:async function(e){if(fireBigHubAjax){fireBigHubAjax=!1;var t=await jQuery.ajax({type:"POST",url:"https://dentacoin.com/combined-hub/get-platform-menu/"+e,dataType:"json"});return fireBigHubAjax=!0,t}},getBigHubHtml:async function(e,t,i){if(null==i&&(i="https://dentacoin.com"),fireBigHubAjax){fireBigHubAjax=!1;var o={type:"POST",url:i+"/combined-hub/get-big-hub-html/"+e,dataType:"json"};(null!=t||Object.keys(t).length>0)&&(o.data=t);var a=await jQuery.ajax(o);return fireBigHubAjax=!0,a}}},initBigHub:async function(e){if("object"!=typeof e&&void 0===e||!hasOwnProperty.call(e,"element_id_to_append")||!hasOwnProperty.call(e,"type_hub"))console.error("False params passed to Dentacoin hub.");else{var t=jQuery("#"+e.element_id_to_append);if(t.length){var i={};if(hasOwnProperty.call(e,"hub_title")&&(i.hubTitleParam=e.hub_title),hasOwnProperty.call(e,"local_environment"))var o=await dcnHub.dcnHubRequests.getBigHubHtml(e.type_hub,i,e.local_environment);else o=await dcnHub.dcnHubRequests.getBigHubHtml(e.type_hub,i);if(o.success){function a(e){if(e.getDate()<10)var t="0"+e.getDate();else t=e.getDate();if(e.getMonth()+1<10)var i="0"+(e.getMonth()+1);else i=e.getMonth()+1;return t+"/"+i+"/"+e.getFullYear()}t.html(o.data),"dentists"==e.type_hub&&t.find(".app-list").addClass("dark-blue-background"),$(".dcn-big-hub .right-arrow").click(function(){$(".dcn-big-hub .single-application.active").next().length?$(".dcn-big-hub .single-application.active").next().click():$(".dcn-big-hub .single-application").eq(0).click()}),$(".dcn-big-hub .left-arrow").click(function(){$(".dcn-big-hub .single-application.active").prev().length?$(".dcn-big-hub .single-application.active").prev().click():$(".dcn-big-hub .single-application").eq($(".dcn-big-hub .single-application").length-1).click()});var n=!1;t.find(".single-application.link").click(function(){var i="";if(t.find(".single-application.link").removeClass("active"),jQuery(this).addClass("active"),t.find(".info-section .logo img").attr("alt",jQuery(this).attr("data-image-alt")).attr("src",jQuery(this).attr("data-image")),t.find(".info-section .title").html(jQuery(this).attr("data-title")),null!=jQuery(this).attr("data-articles")){i+='<div class="extra-html"><div class="extra-title">Latest Blog articles:</div><div class="slider-with-tool-data">';for(var o=jQuery.parseJSON(jQuery(this).attr("data-articles")),c=0,s=o.length;c<s;c+=1){var l=o[c].post_title;l.length>35&&(l=l.substring(0,35)+"..."),i+='<a target="_blank" href="'+o[c].link+'"><div class="single-slide"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="'+o[c].thumb+'" alt="" itemprop="contentUrl"/></figure><div class="content"><div class="slide-title">'+l+"</div><time>"+a(new Date(1e3*parseInt(o[c].date)))+"</time></div></div></a>"}i+='</div><div class="go-to-all"><a href="//blog.dentacoin.com/" class="dcn-big-hub-white-light-blue-btn on-blog-website-button-click-event-tracker" target="_blank">GO TO ALL</a></div></div>',t.find(".extra-html-content").html(i),jQuery(".slider-with-tool-data").slick({slidesToShow:2,infinite:!1,responsive:[{breakpoint:992,settings:{slidesToShow:1}}]})}else jQuery(".extra-html-content").html("");switch(t.find(".info-section .html-content").html(jQuery.parseJSON(jQuery(this).attr("data-html"))),$(".title-and-html .title").removeClass("text-center"),jQuery(this).attr("data-platform")){case"dentavox":t.find(".info-section .html-content").append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn on-vox-button-click-event-tracker" href="https://dentavox.dentacoin.com/" target="_blank">GO TO DENTAVOX</a></div>');break;case"trusted-reviews":t.find(".info-section .html-content").append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn on-trp-button-click-event-tracker" href="https://reviews.dentacoin.com/" target="_blank">SIGN UP NOW</a></div>');break;case"dentacare-oral-health-app":t.find(".info-section .html-content").append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn hide website-btn on-dentacare-website-button-click-event-tracker" href="https://dentacare.dentacoin.com/" target="_blank">GO TO DENTACARE</a><figure class="inline-block hide app-store-btn"><a href="https://itunes.apple.com/us/app/dentacare/id1274148338?mt=8" target="_blank" class="on-dentacare-ios-button-click-event-tracker"><img alt="Apple store button" src="//dentacoin.com/assets/images/apple-store-button.svg" width="180" /> </a></figure><figure class="inline-block hide google-play-btn"><a href="https://play.google.com/store/apps/details?id=com.dentacoin.dentacare&amp;hl=en" target="_blank" class="on-dentacare-google-button-click-event-tracker"><img alt="Google store button" src="//dentacoin.com/assets/images/google-store-button.svg" width="180" /> </a></figure></div>');break;case"jaws-of-battle":t.find(".info-section .html-content").append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn hide website-btn on-jaws-website-button-click-event-tracker" href="https://jawsofbattle.dentacoin.com/" target="_blank">GO TO JAWS OF BATTLE</a><figure class="inline-block hide app-store-btn on-jaws-ios-button-click-event-tracker"><a href="https://testflight.apple.com/join/hOg8An1t" target="_blank"><img alt="Apple store button" src="//dentacoin.com/assets/images/apple-store-button.svg" width="180" /> </a></figure><figure class="inline-block hide google-play-btn"><a class="on-jaws-google-button-click-event-tracker" href="https://play.google.com/store/apps/details?id=com.DentaCare.JawsOfBattle&amp;hl=en" target="_blank"><img alt="Google store button" src="//dentacoin.com/assets/images/google-store-button.svg" width="180" /> </a></figure></div>');break;case"wallet-dapp":t.find(".info-section .html-content").append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn hide website-btn on-wallet-website-button-click-event-tracker" href="https://wallet.dentacoin.com/" target="_blank">GO TO WEB WALLET</a><figure class="inline-block hide app-store-btn"><a class="on-wallet-ios-button-click-event-tracker" href="https://apps.apple.com/us/app/dentacoin-wallet/id1478732657" target="_blank"><img alt="Apple store button" src="//dentacoin.com/assets/images/apple-store-button.svg" width="180" /> </a></figure><figure class="inline-block hide google-play-btn"><a class="on-wallet-google-button-click-event-tracker" href="https://play.google.com/store/apps/details?id=wallet.dentacoin.com" target="_blank"><img alt="Google store button" src="//dentacoin.com/assets/images/google-store-button.svg" width="180" /> </a></figure></div>');break;case"assurance":t.find(".info-section .html-content").append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn on-assurance-button-click-event-tracker" href="https://assurance.dentacoin.com/" target="_blank">GO TO ASSURANCE</a></div>');break;case"dentacoin-blog":$(".title-and-html .title").addClass("text-center")}if("undefined"!=typeof basic&&(basic.isMobile()?"Android"==basic.getMobileOperatingSystem()?$(".google-play-btn").removeClass("hide"):"iOS"==basic.getMobileOperatingSystem()&&$(".app-store-btn").removeClass("hide"):$(".website-btn").removeClass("hide")),""!=jQuery(this).attr("data-video")){var r=function(e){var t=e.split("v=")[1],i=t.indexOf("&");-1!=i&&t.substring(0,i);return t}(jQuery(this).attr("data-video"));r&&($(".video-and-html-holder").removeClass("no-video"),t.find(".video-content").html('<iframe src="https://www.youtube.com/embed/'+r+'"></iframe>'))}else $(".video-and-html-holder").addClass("no-video"),t.find(".video-content").html("");function d(){var e=jQuery(".info-section").offset().top;jQuery("header.sticky-header").length&&(e-=jQuery("header.sticky-header").outerHeight()),jQuery("html").animate({scrollTop:e},{duration:500})}jQuery("body").addClass("overflow-hidden"),jQuery(window).width()<992?($(".hide-on-hub-open").length&&$(".hide-on-hub-open").addClass("hide"),"dentacoin"==e.type_hub&&"function"==typeof projectData.general_logic.data.hideStickySubpagesNav&&projectData.general_logic.data.hideStickySubpagesNav(),t.find(".app-list").hide(),t.find(".info-section").fadeIn(500),d()):n&&d(),jQuery("body").removeClass("overflow-hidden")}),jQuery("body").addClass("overflow-hidden"),jQuery(window).width()>992?(t.find(".single-application.link").eq(0).click(),n=!0):t.find(".info-section .close-application").click(function(){$(".hide-on-hub-open.hide").length&&$(".hide-on-hub-open").removeClass("hide"),t.find(".app-list").fadeIn(500),t.find(".info-section").hide(),$("#append-big-hub-dentacoin").length&&$("html, body").animate({scrollTop:$("#append-big-hub-dentacoin").offset().top},300),$("#append-big-hub-dentists").length&&$("html, body").animate({scrollTop:$("#append-big-hub-dentists").offset().top-$("header.sticky-header").outerHeight()},300),$("#append-big-hub-ids").length&&$("html, body").animate({scrollTop:$("#append-big-hub-ids").offset().top-$("header.sticky-header").outerHeight()},300),"dentacoin"==e.type_hub&&"function"==typeof projectData.general_logic.data.showStickySubpagesNav&&projectData.general_logic.data.showStickySubpagesNav()}),jQuery("body").removeClass("overflow-hidden")}}function c(){for(var e=0,i=t.find("img[data-defer-src]").length;e<i;e+=1)o=t.find("img[data-defer-src]").eq(e),a=void 0,n=void 0,c=void 0,s=void 0,a=jQuery(o).offset().top,n=a+jQuery(o).outerHeight(),c=jQuery(window).scrollTop(),s=c+jQuery(window).height(),n>c&&a<s&&null==t.find("img[data-defer-src]").eq(e).attr("src")&&t.find("img[data-defer-src]").eq(e).attr("src",t.find("img[data-defer-src]").eq(e).attr("data-defer-src"));var o,a,n,c,s}jQuery(document).on("click",".on-jaws-google-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Jaws Google")}),jQuery(document).on("click",".on-jaws-ios-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Jaws iOS")}),jQuery(document).on("click",".on-jaws-website-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Jaws")}),jQuery(document).on("click",".on-assurance-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Assurance")}),jQuery(document).on("click",".on-vox-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Vox")}),jQuery(document).on("click",".on-trp-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","TRP")}),jQuery(document).on("click",".on-dentacare-website-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Dentacare")}),jQuery(document).on("click",".on-dentacare-ios-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Dentacare IOS")}),jQuery(document).on("click",".on-dentacare-google-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Dentacare Google")}),jQuery(document).on("click",".on-wallet-ios-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Wallet IOS")}),jQuery(document).on("click",".on-wallet-google-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Wallet Google")}),jQuery(document).on("click",".on-wallet-website-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Wallet Btn")}),jQuery(document).on("click",".on-blog-website-button-click-event-tracker",function(){dcnAdditionals.utils.fireGoogleAnalyticsEvent("Tools","Click","Blog")}),c(),t.find("img[data-defer-src]").length&&jQuery(window).on("scroll",function(){c()})}},initMiniHub:async function(e){if(("object"==typeof e||void 0!==e)&&hasOwnProperty.call(e,"element_id_to_bind")&&hasOwnProperty.call(e,"platform")&&hasOwnProperty.call(e,"log_out_link")){var t=[],i=jQuery("#"+e.element_id_to_bind);if(!i.length)return console.error("False element to bind passed to Dentacoin hub."),!1;{var o=!1;function a(){var e=i.offset().top+i.outerHeight(),t=i.offset().left+i.outerWidth();jQuery(".dcn-hub-mini").offset({top:e+jQuery(".dcn-hub-mini .up-arrow").outerHeight(),left:t-jQuery(".dcn-hub-mini").outerWidth()+jQuery(".dcn-hub-mini .up-arrow").outerWidth()/2})}function n(t){jQuery(t.target).closest("#dcn-hub-mini").length||jQuery(t.target).closest("#"+e.element_id_to_bind).length||jQuery(t.target).hasClass("dcn-hub-mini-go-back-image")||jQuery(".dcn-hub-mini").removeClass("custom-show")}function c(){for(var e=jQuery(".dcn-hub-mini .list-with-apps .apps-wrapper:last-child .dcn-min-hub-application"),t=150,i=0,o=e.length;i<o;i+=1)s(e.eq(i),t),t+=150}function s(e,t){setTimeout(function(){e.addClass("dcn-min-hub-fade-in-animation")},t)}jQuery("body").addClass("overflow-hidden"),jQuery(window).width()<992&&(o=!0),jQuery("body").removeClass("overflow-hidden"),o?i.click(function(){jQuery(".dcn-hub-mini").addClass("custom-show"),a(),hasOwnProperty.call(e,"without_apps")||(jQuery("body").addClass("overflow-hidden"),window.scrollTo(0,0))}):i.hover(function(){jQuery(".dcn-hub-mini").addClass("custom-show"),a()}),async function(){if(hasOwnProperty.call(e,"without_apps")&&e.without_apps){var i="",o="";if("dentists"==e.platform)if(hasOwnProperty.call(e,"type_logged_in")&&"patient"==e.type_logged_in)o="//dentacoin.com/foundation";else{o="//dentists.dentacoin.com/home";var s=await dcnHub.dcnHubRequests.getPlatformMenu("dentists");s.success&&(i=s.data)}else"dentacoin"==e.platform&&(o="//dentacoin.com/foundation");var l='<div class="dcn-hub-mini without-apps" id="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"><div class="hidden-box-footer">'+i+'<div class="hidden-box-wrapper"><div class="home-btn"><a href="'+o+'"><img src="//dentacoin.com/assets/images/home-btn-dentacoin-hub.svg" alt="Home button"/></a></div><div class="logout-btn-parent"> <a href="'+e.log_out_link+'"><i class="fa fa-power-off" aria-hidden="true"></i> Log out</a> </div> <div class="my-account-btn-parent"><a href="//account.dentacoin.com?platform='+e.platform+'">My Account</a></div></div></div></div></div>';jQuery("body").append(l)}else if(hasOwnProperty.call(e,"type_hub")){l='<div class="dcn-hub-mini with-apps" id="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"> <div class="hidden-box-hub"><div class="dcn-hub-mini-close-btn"><a href="javascript:void(0)">Close <span>X</span></a></div><div class="list-with-apps"><div class="apps-wrapper">';var r=await dcnHub.dcnHubRequests.getHubData(e.type_hub);if(r.success){t.push(JSON.stringify(r.data));for(var d=0,u=r.data.length;d<u;d+=1)if("link"==r.data[d].type){var p="";r.data[d].link&&""!=r.data[d].link&&null!=r.data[d].link&&null!=r.data[d].link?(p=r.data[d].link).includes("hub.dentacoin.com")&&(p+="?platform=dentists"):p="javascript:alert('Coming soon!');",l+='<a href="'+p+'" target="_blank" class="dcn-min-hub-application"><figure itemtype="http://schema.org/ImageObject"><img src="//dentacoin.com/assets/uploads/'+r.data[d].media_name+'" itemprop="contentUrl" alt="'+r.data[d].alt+'"> <figcaption>'+r.data[d].title+"</figcaption></figure></a>"}else if("folder"==r.data[d].type)if(null==r.data[d].media_name){l+="<a href='javascript:void(0);' data-children='"+JSON.stringify(r.data[d].children)+"' class='dcn-min-hub-application inner "+r.data[d].type+"'><div class='hub-folder all-width'><div class='apps-in-folder-list'>";for(var h=0,b=r.data[d].children.length;h<b;h+=1)l+='<img src="//dentacoin.com/assets/uploads/'+r.data[d].children[h].media_name+'" alt="'+r.data[d].children[h].alt+'"/>';l+='</div></div><div class="folder-title">'+r.data[d].title+"</div></a></li>"}else l+="<a href='javascript:void(0);' data-children='"+JSON.stringify(r.data[d].children)+"' class='dcn-min-hub-application inner "+r.data[d].type+"'><figure itemtype='http://schema.org/ImageObject'><img src='//dentacoin.com/assets/uploads/"+r.data[d].media_name+"' itemprop='contentUrl' alt='"+r.data[d].alt+"'> <figcaption>"+r.data[d].title+"</figcaption></figure></a>"}l+='</div></div></div><div class="hidden-box-footer"><div class="logout-btn-parent"> <a href="'+e.log_out_link+'"><i class="fa fa-power-off" aria-hidden="true"></i> Log out</a> </div> <div class="my-account-btn-parent"><a href="//account.dentacoin.com?platform='+e.platform+'">My Account</a></div></div></div></div>',jQuery("body").append(l),c(),jQuery(document).on("click",".go-back",function(){jQuery(".dcn-hub-mini .list-with-apps .apps-wrapper:last-child").remove(),jQuery(".dcn-hub-mini .list-with-apps .apps-wrapper:last-child").show()}),jQuery(document).on("click",".dcn-hub-mini .dcn-min-hub-application.folder",async function(){var e=jQuery(this),i=JSON.parse(e.attr("data-children"));t.push(e.attr("data-children"));for(var o="<div class='apps-wrapper'><a href='javascript:void(0);' class='go-back dcn-min-hub-application'><figure itemtype='http://schema.org/ImageObject'><img src='//dentacoin.com/assets/images/dcn-mini-hub-back-arrow.png' itemprop='contentUrl' alt='Go back icon' class='dcn-hub-mini-go-back-image'></figure></a>",a=0,s=i.length;a<s;a+=1)if("link"==i[a].type)o+='<a href="'+(i[a].link&&""!=i[a].link&&null!=i[a].link&&null!=i[a].link?i[a].link:"javascript:alert('Coming soon!');")+'" target="_blank" class="dcn-min-hub-application"><figure itemtype="http://schema.org/ImageObject"><img src="//dentacoin.com/assets/uploads/'+i[a].media_name+'" itemprop="contentUrl" alt="'+i[a].alt+'"> <figcaption>'+i[a].title+"</figcaption></figure></a>";else if("folder"==i[a].type){var l=await dcnHub.dcnHubRequests.getHubChildren(i[a].slug);if(l.success)if(null==i[a].media_name){o+="<a href='javascript:void(0);' data-children='"+JSON.stringify(l.data)+"' class='dcn-min-hub-application inner "+i[a].type+"'><div class='hub-folder all-width'><div class='apps-in-folder-list'>";for(var r=0,d=l.data[a].children.length;r<d;r+=1)o+='<img src="//dentacoin.com/assets/uploads/'+l.data[a].children[r].media_name+'" alt="'+l.data[a].children[r].alt+'"/>';o+='</div></div><div class="folder-title">'+i[a].title+"</div></a></li>"}else o+="<a href='javascript:void(0);' data-children='"+JSON.stringify(l.data)+"' class='dcn-min-hub-application inner "+i[a].type+"'><figure itemtype='http://schema.org/ImageObject'><img src='//dentacoin.com/assets/uploads/"+i[a].media_name+"' itemprop='contentUrl' alt='"+i[a].alt+"'> <figcaption>"+i[a].title+"</figcaption></figure></a>"}o+="</div>",jQuery(".dcn-hub-mini .list-with-apps .apps-wrapper").hide(),jQuery(".dcn-hub-mini .list-with-apps").append(o),jQuery(".dcn-hub-mini .list-with-apps .apps-wrapper:last-child").show(),c(),jQuery(document).unbind("click",n),jQuery(document).bind("click",n)})}jQuery(document).bind("click",n),jQuery(window).on("resize",function(){a()}),jQuery(window).on("scroll",function(){a()})}(),jQuery(document).on("click",".dcn-hub-mini-close-btn",function(){jQuery(".dcn-hub-mini").removeClass("custom-show"),jQuery("body").removeClass("overflow-hidden")}),jQuery(document).on("setHubPosition",async function(e){a()})}}else console.error("False params passed to Dentacoin hub.")}},dcnCookie={init:async function(e){"object"!=typeof e&&void 0===e?console.error("False params passed to Dentacoin cookie."):""==dcnAdditionals.utils.cookies.get("performance_cookies")&&""==dcnAdditionals.utils.cookies.get("functionality_cookies")&&""==dcnAdditionals.utils.cookies.get("marketing_cookies")&&""==dcnAdditionals.utils.cookies.get("strictly_necessary_policy")&&(jQuery("body").append('<div class="dcn-privacy-policy-cookie"><div class="dcn-cookie-wrapper"><div class="text">This site uses cookies. Find out more on how we use cookies in our <a href="https://dentacoin.com/privacy-policy" class="link" target="_blank">Privacy Policy</a>. | <a href="javascript:void(0);" class="link adjust-cookies">Adjust cookies</a></div><div class="button"><a href="javascript:void(0);" class="white-colorful-cookie-btn accept-all">Accept all cookies</a></div></div></div>'),jQuery(".dcn-privacy-policy-cookie .accept-all").click(function(){if(dcnAdditionals.utils.cookies.set("performance_cookies",1),dcnAdditionals.utils.cookies.set("functionality_cookies",1),dcnAdditionals.utils.cookies.set("marketing_cookies",1),dcnAdditionals.utils.cookies.set("strictly_necessary_policy",1),hasOwnProperty.call(e,"google_app_id")){function t(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],t("js",new Date),t("config",e.google_app_id)}var i,o,a,n,c,s;hasOwnProperty.call(e,"fb_app_id")&&(i=window,o=document,a="script",i.fbq||(n=i.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)},i._fbq||(i._fbq=n),n.push=n,n.loaded=!0,n.version="2.0",n.queue=[],(c=o.createElement(a)).async=!0,c.src="https://connect.facebook.net/en_US/fbevents.js",(s=o.getElementsByTagName(a)[0]).parentNode.insertBefore(c,s)),fbq("consent","grant"),fbq("init",e.fb_app_id),hasOwnProperty.call(e,"second_fb_app_id")&&fbq("init",e.second_fb_app_id),fbq("track","PageView")),jQuery(".dcn-privacy-policy-cookie").remove()}),jQuery(".dcn-privacy-policy-cookie .adjust-cookies").click(function(){jQuery(".dcn-privacy-policy-cookie .customize-cookies").remove();jQuery(".dcn-privacy-policy-cookie").append('<div class="customize-cookies"><button class="close-customize-cookies close-customize-cookies-popup">×</button> <div class="text-center"><img src="https://dentacoin.com/assets/images/cookie-icon.svg" alt="Cookie icon" class="cookie-icon"/></div><div class="text-center subtitle">Select cookies to accept:</div><div class="cookies-options-list"> <ul> <li> <div class="custom-checkbox-style predefined"><input type="checkbox" class="custom-checkbox-input" checked id="strictly-necessary-cookies"/> <label class="custom-checkbox-label" for="strictly-necessary-cookies">Strictly necessary</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">Cookies essential to navigate around the website and use its features. Without them, you wouldn’t be able to use basic services like signup or login.</div></button></div></li><li> <div class="custom-checkbox-style"> <input type="checkbox" class="custom-checkbox-input" checked id="functionality-cookies"/> <label class="custom-checkbox-label" for="functionality-cookies">Functionality cookies</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">These cookies allow users to customise how a website looks for them; they can remember usernames, preferences, etc.</div></button> </div></li></ul> <ul> <li> <div class="custom-checkbox-style"><input type="checkbox" class="custom-checkbox-input" checked id="performance-cookies"/> <label class="custom-checkbox-label" for="performance-cookies">Performance cookies</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">These cookies collect data for statistical purposes on how visitors use a website, they don’t contain personal data and are used to improve user experience.</div></button> </div></li><li> <div class="custom-checkbox-style"><input type="checkbox" class="custom-checkbox-input" checked id="marketing-cookies"/> <label class="custom-checkbox-label" for="marketing-cookies">Marketing cookies</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">Marketing cookies are used e.g. to deliver advertisements more relevant to you or limit the number of times you see an advertisement.</div></button> </div></li></ul> </div><div class="text-center actions"><a href="javascript:void(0);" class="colorful-white-cookie-btn close-customize-cookies-popup">CANCEL</a><a href="javascript:void(0);" class="white-colorful-cookie-btn custom-cookie-save">SAVE</a></div><div class="custom-triangle"></div></div>'),dcnAdditionals.utils.initCustomCheckboxes(".dcn-privacy-policy-cookie"),jQuery(".dcn-privacy-policy-cookie .close-customize-cookies-popup").click(function(){jQuery(".customize-cookies").remove()}),jQuery(".dcn-privacy-policy-cookie .custom-cookie-save").click(function(){var t,i,o,a,n,c;if(dcnAdditionals.utils.cookies.set("strictly_necessary_policy",1),jQuery(".dcn-privacy-policy-cookie #functionality-cookies").is(":checked")&&dcnAdditionals.utils.cookies.set("functionality_cookies",1),jQuery(".dcn-privacy-policy-cookie #marketing-cookies").is(":checked")&&(dcnAdditionals.utils.cookies.set("marketing_cookies",1),hasOwnProperty.call(e,"fb_app_id")&&(t=window,i=document,o="script",t.fbq||(a=t.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},t._fbq||(t._fbq=a),a.push=a,a.loaded=!0,a.version="2.0",a.queue=[],(n=i.createElement(o)).async=!0,n.src="https://connect.facebook.net/en_US/fbevents.js",(c=i.getElementsByTagName(o)[0]).parentNode.insertBefore(n,c)),fbq("consent","grant"),fbq("init",e.fb_app_id),hasOwnProperty.call(e,"second_fb_app_id")&&fbq("init",e.second_fb_app_id),fbq("track","PageView"))),jQuery(".dcn-privacy-policy-cookie #performance-cookies").is(":checked")&&(dcnAdditionals.utils.cookies.set("performance_cookies",1),hasOwnProperty.call(e,"google_app_id"))){function s(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],s("js",new Date),s("config",e.google_app_id)}jQuery(".dcn-privacy-policy-cookie").remove()})}))}};else console.error("Dentacoin hub requires internet connection.");
