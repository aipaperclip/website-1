if (typeof jQuery == 'undefined') {
    // no jQuery installed
    console.error('Dentacoin hub requires the usage of jQuery.');
} else if (!navigator.onLine) {
    // check internet connection
    console.error('Dentacoin hub requires internet connection.');
} else {
    var fireHubAjax = true;
    var fireBigHubAjax = true;

    var dcnAdditionals = {
        utils: {
            fireGoogleAnalyticsEvent: function (category, action, label, value) {
                if (typeof(gtag) != 'undefined') {
                    var event_obj = {
                        'event_action' : action,
                        'event_category': category,
                        'event_label': label
                    };

                    if (value != undefined) {
                        event_obj.value = value;
                    }

                    gtag('event', label, event_obj);
                }
            },
            cookies: {
                get: function(name) {
                    if(name == undefined){
                        var name = "cookieLaw";
                    }
                    name = name + "=";
                    var ca = document.cookie.split(';');
                    for(var i = 0 ; i < ca.length; i+=1) {
                        var c = ca[i];
                        while (c.charAt(0)==' ') c = c.substring(1);
                        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                    }

                    return "";
                },
                set: function(name, value) {
                    if(name == undefined){
                        name = "cookieLaw";
                    }
                    if(value == undefined){
                        value = 1;
                    }
                    var d = new Date();
                    d.setTime(d.getTime() + (100*24*60*60*1000));
                    var expires = "expires="+d.toUTCString();
                    if (location.hostname == 'localhost') {
                        document.cookie = name + "=" + value + "; " + expires + ";domain="+location.hostname+";path=/;";
                    } else {
                        document.cookie = name + "=" + value + "; " + expires + ";domain=."+location.hostname+";path=/;secure";
                    }
                    if(name == "cookieLaw"){
                        jQuery(".cookies_popup").slideUp();
                    }
                },
                erase: function(name) {
                    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }
            },
            initCustomCheckboxes: function(parent) {
                if (typeof(parent) == undefined) {
                    parent = '';
                } else {
                    parent = parent + ' ';
                }

                for (var i = 0, len = jQuery(parent + '.custom-checkbox-style').length; i < len; i+=1) {
                    if (!jQuery(parent + '.custom-checkbox-style').eq(i).hasClass('already-custom-style')) {
                        if (jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').is(':checked')) {
                            jQuery(parent + '.custom-checkbox-style').eq(i).prepend('<label for="'+jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').attr('id')+'" class="custom-checkbox">✓</label>');
                        } else {
                            jQuery(parent + '.custom-checkbox-style').eq(i).prepend('<label for="'+jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').attr('id')+'" class="custom-checkbox"></label>');
                        }
                        jQuery(parent + '.custom-checkbox-style').eq(i).addClass('already-custom-style');
                    }
                }

                jQuery(parent + '.custom-checkbox-style .custom-checkbox-input').unbind('change').on('change', function() {
                    if (!jQuery(this).closest('.custom-checkbox-style').hasClass('predefined')) {
                        if (jQuery(this).is(':checked')) {
                            jQuery(this).closest(parent + '.custom-checkbox-style').find('.custom-checkbox').html('✓');
                        } else {
                            jQuery(this).closest(parent + '.custom-checkbox-style').find('.custom-checkbox').html('');
                        }

                        if (jQuery(this).attr('data-radio-group') != undefined) {
                            for (var i = 0, len = jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').length; i < len; i+=1) {
                                if (!jQuery(this).is(jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').eq(i))) {
                                    jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').eq(i).prop('checked', false);
                                    jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').eq(i).closest(parent + '.custom-checkbox-style').find('.custom-checkbox').html('');
                                }
                            }
                        }
                    }
                });
            }
        }
    };

    var dcnHub = {
        dcnHubRequests: {
            getHubData: async function(hubType) {
                if (fireHubAjax) {
                    fireHubAjax = false;

                    var ajaxCall = await jQuery.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-hub-data/'+hubType,
                        dataType: 'json'
                    });

                    fireHubAjax = true;
                    return ajaxCall;
                }
            },
            getHubChildren: async function(folderSlug) {
                if (fireHubAjax) {
                    fireHubAjax = false;

                    var ajaxCall = await jQuery.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-hub-children/'+folderSlug,
                        dataType: 'json'
                    });

                    fireHubAjax = true;
                    return ajaxCall;
                }
            },
            getPlatformMenu: async function(menu) {
                if (fireBigHubAjax) {
                    fireBigHubAjax = false;

                    var ajaxCall = await jQuery.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-platform-menu/'+menu,
                        dataType: 'json'
                    });

                    fireBigHubAjax = true;
                    return ajaxCall;
                }
            },
            getBigHubHtml: async function(hubType, ajaxData, url) {
                if (url == undefined) {
                    url = 'https://dentacoin.com';
                }

                if (fireBigHubAjax) {
                    fireBigHubAjax = false;

                    var ajaxParams = {
                        type: 'POST',
                        url: url + '/combined-hub/get-big-hub-html/'+hubType,
                        dataType: 'json'
                    };

                    if (ajaxData != undefined || Object.keys(ajaxData).length > 0) {
                        ajaxParams.data = ajaxData;
                    }

                    var ajaxCall = await jQuery.ajax(ajaxParams);

                    fireBigHubAjax = true;
                    return ajaxCall;
                }
            },
        },
        initBigHub: async function(params) {
            if ((typeof params !== 'object' && params === undefined) || (!hasOwnProperty.call(params, 'element_id_to_append') || !hasOwnProperty.call(params, 'type_hub'))) {
                // false params
                console.error('False params passed to Dentacoin hub.');
            } else {
                var elementToAppend = jQuery('#' + params.element_id_to_append);
                if (elementToAppend.length) {
                    var bigHubParams = {};
                    if (hasOwnProperty.call(params, 'hub_title')) {
                        bigHubParams.hubTitleParam = params.hub_title;
                    }

                    if (hasOwnProperty.call(params, 'local_environment')) {
                        var getBigHubHtml = await dcnHub.dcnHubRequests.getBigHubHtml(params.type_hub, bigHubParams, params.local_environment);
                    } else {
                        var getBigHubHtml = await dcnHub.dcnHubRequests.getBigHubHtml(params.type_hub, bigHubParams);
                    }

                    if (getBigHubHtml.success) {
                        elementToAppend.html(getBigHubHtml.data);

                        if (params.type_hub == 'dentists') {
                            elementToAppend.find('.app-list').addClass('dark-blue-background');
                        }

                        function dateObjToFormattedDate(object) {
                            if (object.getDate() < 10) {
                                var date = '0' + object.getDate();
                            } else {
                                var date = object.getDate();
                            }

                            if (object.getMonth() + 1 < 10) {
                                var month = '0' + (object.getMonth() + 1);
                            } else {
                                var month = object.getMonth() + 1;
                            }
                            return date + '/' + month + '/' + object.getFullYear();
                        }

                        // bind right arrow click event
                        $('.dcn-big-hub .right-arrow').click(function() {
                            if ($('.dcn-big-hub .single-application.active').next().length) {
                                $('.dcn-big-hub .single-application.active').next().click();
                            } else {
                                // click first element
                                $('.dcn-big-hub .single-application').eq(0).click();
                            }
                        });

                        // bind left arrow click event
                        $('.dcn-big-hub .left-arrow').click(function() {
                            if ($('.dcn-big-hub .single-application.active').prev().length) {
                                $('.dcn-big-hub .single-application.active').prev().click();
                            } else {
                                // click last element
                                $('.dcn-big-hub .single-application').eq($('.dcn-big-hub .single-application').length - 1).click();
                            }
                        });

                        var allowScrolling = false;
                        elementToAppend.find('.single-application.link').click(function() {
                            var extra_html = '';
                            elementToAppend.find('.single-application.link').removeClass('active');
                            jQuery(this).addClass('active');

                            elementToAppend.find('.info-section .logo img').attr('alt', jQuery(this).attr('data-image-alt')).attr('src', jQuery(this).attr('data-image'));
                            elementToAppend.find('.info-section .title').html(jQuery(this).attr('data-title'));

                            if (jQuery(this).attr('data-articles') != undefined) {
                                extra_html+='<div class="extra-html"><div class="extra-title">Latest Blog articles:</div><div class="slider-with-tool-data">';
                                var articles_arr = jQuery.parseJSON(jQuery(this).attr('data-articles'));
                                for(var i = 0, len = articles_arr.length; i < len; i+=1)    {
                                    var post_title = articles_arr[i]['post_title'];
                                    if (post_title.length > 35) {
                                        post_title = post_title.substring(0, 35) + '...';
                                    }
                                    extra_html+='<a target="_blank" href="'+articles_arr[i]['link']+'"><div class="single-slide"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="'+articles_arr[i]['thumb']+'" alt="" itemprop="contentUrl"/></figure><div class="content"><div class="slide-title">'+post_title+'</div><time>'+dateObjToFormattedDate(new Date(parseInt(articles_arr[i]['date']) * 1000))+'</time></div></div></a>';
                                }
                                extra_html+='</div><div class="go-to-all"><a href="//blog.dentacoin.com/" class="dcn-big-hub-white-light-blue-btn on-blog-website-button-click-event-tracker" target="_blank">GO TO ALL</a></div></div>';

                                elementToAppend.find('.extra-html-content').html(extra_html);

                                initToolsPostsSlider();
                            } else {
                                jQuery('.extra-html-content').html('');
                            }

                            elementToAppend.find('.info-section .html-content').html(jQuery.parseJSON(jQuery(this).attr('data-html')));

                            $('.title-and-html .title').removeClass('text-center');

                            switch(jQuery(this).attr('data-platform')) {
                                case 'dentavox':
                                    elementToAppend.find('.info-section .html-content').append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn on-vox-button-click-event-tracker" href="https://dentavox.dentacoin.com/" target="_blank">GO TO DENTAVOX</a></div>');
                                    break;
                                case 'trusted-reviews':
                                    elementToAppend.find('.info-section .html-content').append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn on-trp-button-click-event-tracker" href="https://reviews.dentacoin.com/" target="_blank">SIGN UP NOW</a></div>');
                                    break;
                                case 'dentacare-oral-health-app':
                                    elementToAppend.find('.info-section .html-content').append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn hide website-btn on-dentacare-website-button-click-event-tracker" href="https://dentacare.dentacoin.com/" target="_blank">GO TO DENTACARE</a><figure class="inline-block hide app-store-btn"><a href="https://itunes.apple.com/us/app/dentacare/id1274148338?mt=8" target="_blank" class="on-dentacare-ios-button-click-event-tracker"><img alt="Apple store button" src="//dentacoin.com/assets/images/apple-store-button.svg" width="180" /> </a></figure><figure class="inline-block hide google-play-btn"><a href="https://play.google.com/store/apps/details?id=com.dentacoin.dentacare&amp;hl=en" target="_blank" class="on-dentacare-google-button-click-event-tracker"><img alt="Google store button" src="//dentacoin.com/assets/images/google-store-button.svg" width="180" /> </a></figure></div>');
                                    break;
                                case 'jaws-of-battle':
                                    elementToAppend.find('.info-section .html-content').append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn hide website-btn on-jaws-website-button-click-event-tracker" href="https://jawsofbattle.dentacoin.com/" target="_blank">GO TO JAWS OF BATTLE</a><figure class="inline-block hide app-store-btn on-jaws-ios-button-click-event-tracker"><a href="https://testflight.apple.com/join/hOg8An1t" target="_blank"><img alt="Apple store button" src="//dentacoin.com/assets/images/apple-store-button.svg" width="180" /> </a></figure><figure class="inline-block hide google-play-btn"><a class="on-jaws-google-button-click-event-tracker" href="https://play.google.com/store/apps/details?id=com.DentaCare.JawsOfBattle&amp;hl=en" target="_blank"><img alt="Google store button" src="//dentacoin.com/assets/images/google-store-button.svg" width="180" /> </a></figure></div>');
                                    break;
                                case 'wallet-dapp':
                                    elementToAppend.find('.info-section .html-content').append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn hide website-btn on-wallet-website-button-click-event-tracker" href="https://wallet.dentacoin.com/" target="_blank">GO TO WEB WALLET</a><figure class="inline-block hide app-store-btn"><a class="on-wallet-ios-button-click-event-tracker" href="https://apps.apple.com/us/app/dentacoin-wallet/id1478732657" target="_blank"><img alt="Apple store button" src="//dentacoin.com/assets/images/apple-store-button.svg" width="180" /> </a></figure><figure class="inline-block hide google-play-btn"><a class="on-wallet-google-button-click-event-tracker" href="https://play.google.com/store/apps/details?id=wallet.dentacoin.com" target="_blank"><img alt="Google store button" src="//dentacoin.com/assets/images/google-store-button.svg" width="180" /> </a></figure></div>');
                                    break;
                                case 'assurance':
                                    elementToAppend.find('.info-section .html-content').append('<div class="padding-top-15"><a class="dcn-big-hub-white-light-blue-btn on-assurance-button-click-event-tracker" href="https://assurance.dentacoin.com/" target="_blank">GO TO ASSURANCE</a></div>');
                                    break;
                                case 'dentacoin-blog':
                                    $('.title-and-html .title').addClass('text-center');
                                    break;
                                default:
                                // code block
                            }

                            if (typeof(basic) != 'undefined') {
                                if (basic.isMobile()) {
                                    if (basic.getMobileOperatingSystem() == 'Android') {
                                        $('.google-play-btn').removeClass('hide');
                                    } else if (basic.getMobileOperatingSystem() == 'iOS') {
                                        $('.app-store-btn').removeClass('hide');
                                    }
                                } else {
                                    $('.website-btn').removeClass('hide');
                                }
                            }

                            if (jQuery(this).attr('data-video') != '') {
                                var youtubeVideoId = getYoutubeVideoId(jQuery(this).attr('data-video'));
                                if (youtubeVideoId) {
                                    $('.video-and-html-holder').removeClass('no-video');
                                    elementToAppend.find('.video-content').html('<iframe src="https://www.youtube.com/embed/'+youtubeVideoId+'"></iframe>');
                                }
                            } else {
                                $('.video-and-html-holder').addClass('no-video');
                                elementToAppend.find('.video-content').html('');
                            }

                            jQuery('body').addClass('overflow-hidden');
                            if (jQuery(window).width() < 992) {
                                if ($('.hide-on-hub-open').length) {
                                    $('.hide-on-hub-open').addClass('hide');
                                }

                                if (params.type_hub == 'dentacoin' && typeof(projectData.general_logic.data.hideStickySubpagesNav) == 'function') {
                                    projectData.general_logic.data.hideStickySubpagesNav();
                                }

                                elementToAppend.find('.app-list').hide();
                                elementToAppend.find('.info-section').fadeIn(500);

                                scrollToHubElementContent();
                            } else {
                                if (allowScrolling) {
                                    scrollToHubElementContent();
                                }
                            }
                            jQuery('body').removeClass('overflow-hidden');

                            function scrollToHubElementContent() {
                                var scrollTop = jQuery('.info-section').offset().top;
                                if (jQuery('header.sticky-header').length) {
                                    scrollTop = scrollTop - jQuery('header.sticky-header').outerHeight();
                                }

                                jQuery('html').animate({
                                    scrollTop: scrollTop
                                }, {
                                    duration: 500
                                });
                            }
                        });

                        jQuery('body').addClass('overflow-hidden');
                        if (jQuery(window).width() > 992) {
                            elementToAppend.find('.single-application.link').eq(0).click();
                            allowScrolling = true;
                        } else {
                            elementToAppend.find('.info-section .close-application').click(function() {
                                if ($('.hide-on-hub-open.hide').length) {
                                    $('.hide-on-hub-open').removeClass('hide');
                                }

                                elementToAppend.find('.app-list').fadeIn(500);
                                elementToAppend.find('.info-section').hide();

                                if ($('#append-big-hub-dentacoin').length) {
                                    $('html, body').animate({'scrollTop': $('#append-big-hub-dentacoin').offset().top}, 300);
                                }

                                if ($('#append-big-hub-dentists').length) {
                                    $('html, body').animate({'scrollTop': $('#append-big-hub-dentists').offset().top - $('header.sticky-header').outerHeight()}, 300);
                                }

                                if ($('#append-big-hub-ids').length) {
                                    $('html, body').animate({'scrollTop': $('#append-big-hub-ids').offset().top - $('header.sticky-header').outerHeight()}, 300);
                                }

                                if (params.type_hub == 'dentacoin' && typeof(projectData.general_logic.data.showStickySubpagesNav) == 'function') {
                                    projectData.general_logic.data.showStickySubpagesNav();
                                }
                            });
                        }
                        jQuery('body').removeClass('overflow-hidden');
                    }
                }

                jQuery(document).on('click', '.on-jaws-google-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Jaws Google');
                });

                jQuery(document).on('click', '.on-jaws-ios-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Jaws iOS');
                });

                jQuery(document).on('click', '.on-jaws-website-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Jaws');
                });

                jQuery(document).on('click', '.on-assurance-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Assurance');
                });

                jQuery(document).on('click', '.on-vox-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Vox');
                });

                jQuery(document).on('click', '.on-trp-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'TRP');
                });

                jQuery(document).on('click', '.on-dentacare-website-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Dentacare');
                });

                jQuery(document).on('click', '.on-dentacare-ios-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Dentacare IOS');
                });

                jQuery(document).on('click', '.on-dentacare-google-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Dentacare Google');
                });

                jQuery(document).on('click', '.on-wallet-ios-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Wallet IOS');
                });

                jQuery(document).on('click', '.on-wallet-google-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Wallet Google');
                });

                jQuery(document).on('click', '.on-wallet-website-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Wallet Btn');
                });

                jQuery(document).on('click', '.on-blog-website-button-click-event-tracker', function() {
                    dcnAdditionals.utils.fireGoogleAnalyticsEvent('Tools', 'Click', 'Blog');
                });

                // check if element is visible in the screen viewport
                function isInViewport(el) {
                    var elementTop = jQuery(el).offset().top;
                    var elementBottom = elementTop + jQuery(el).outerHeight();
                    var viewportTop = jQuery(window).scrollTop();
                    var viewportBottom = viewportTop + jQuery(window).height();
                    return elementBottom > viewportTop && elementTop < viewportBottom;
                }

                // method for loading images only when they are visible in the viewport
                function loadDeferImages() {
                    for(var i = 0, len = elementToAppend.find('img[data-defer-src]').length; i < len; i+=1) {
                        if(isInViewport(elementToAppend.find('img[data-defer-src]').eq(i)) && elementToAppend.find('img[data-defer-src]').eq(i).attr('src') == undefined) {
                            elementToAppend.find('img[data-defer-src]').eq(i).attr('src', elementToAppend.find('img[data-defer-src]').eq(i).attr('data-defer-src'));
                        }
                    }
                }

                //load images which are visible in the viewport on page load
                loadDeferImages();

                //load images which are visible in the viewport on scroll
                if(elementToAppend.find('img[data-defer-src]').length) {
                    jQuery(window).on('scroll', function(){
                        loadDeferImages();
                    });
                }

                // get youtube link id from youtube URL
                function getYoutubeVideoId(link) {
                    var video_id = link.split('v=')[1];
                    var ampersandPosition = video_id.indexOf('&');
                    if (ampersandPosition != -1) {
                        video_id.substring(0, ampersandPosition);
                    }

                    return video_id;
                }

                function initToolsPostsSlider()   {
                    //init slider for most popular posts
                    jQuery('.slider-with-tool-data').slick({
                        slidesToShow: 2,
                        infinite: false,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });
                }
            }
        },
        initMiniHub: async function(params) {
            if ((typeof params !== 'object' && params === undefined) || (!hasOwnProperty.call(params, 'element_id_to_bind') || !hasOwnProperty.call(params, 'platform') || !hasOwnProperty.call(params, 'log_out_link'))) {
                // false params
                console.error('False params passed to Dentacoin hub.');
            } else {
                var historyChildren = [];
                var elementToBind = jQuery('#'+params.element_id_to_bind);
                if (elementToBind.length) {
                    var add_overflow_hidden_on_hidden_box_show = false;
                    jQuery('body').addClass('overflow-hidden');
                    if (jQuery(window).width() < 992) {
                        add_overflow_hidden_on_hidden_box_show = true;
                    }
                    jQuery('body').removeClass('overflow-hidden');

                    if (add_overflow_hidden_on_hidden_box_show) {
                        elementToBind.click(function() {
                            jQuery('.dcn-hub-mini').addClass('custom-show');
                            setHubPosition();

                            if (!hasOwnProperty.call(params, 'without_apps')) {
                                jQuery('body').addClass('overflow-hidden');

                                window.scrollTo(0, 0);
                            }
                        });
                    } else {
                        elementToBind.hover(function () {
                            jQuery('.dcn-hub-mini').addClass('custom-show');
                            setHubPosition();
                        });
                    }

                    async function showMiniHub() {
                        if (hasOwnProperty.call(params, 'without_apps') && params.without_apps) {
                            var platformMenu = '';
                            var platform_home_link = '';
                            if (params.platform == 'dentists') {
                                if (hasOwnProperty.call(params, 'type_logged_in') && params.type_logged_in == 'patient') {
                                    platform_home_link = '//dentacoin.com/foundation';
                                } else {
                                    platform_home_link = '//dentists.dentacoin.com/home';
                                    var dentistsMenu = await dcnHub.dcnHubRequests.getPlatformMenu('dentists');
                                    if (dentistsMenu.success) {
                                        platformMenu = dentistsMenu.data;
                                    }
                                }
                            } else if (params.platform == 'dentacoin') {
                                platform_home_link = '//dentacoin.com/foundation';
                            }

                            var miniHubHtml = '<div class="dcn-hub-mini without-apps" id="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"><div class="hidden-box-footer">'+platformMenu+'<div class="hidden-box-wrapper"><div class="home-btn"><a href="'+platform_home_link+'"><img src="//dentacoin.com/assets/images/home-btn-dentacoin-hub.svg" alt="Home button"/></a></div><div class="logout-btn-parent"> <a href="'+params.log_out_link+'"><i class="fa fa-power-off" aria-hidden="true"></i> Log out</a> </div> <div class="my-account-btn-parent"><a href="//account.dentacoin.com?platform='+params.platform+'">My Account</a></div></div></div></div></div>';

                            jQuery('body').append(miniHubHtml);
                        } else if (hasOwnProperty.call(params, 'type_hub')) {
                            var miniHubHtml = '<div class="dcn-hub-mini with-apps" id="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"> <div class="hidden-box-hub"><div class="dcn-hub-mini-close-btn"><a href="javascript:void(0)">Close <span>X</span></a></div><div class="list-with-apps"><div class="apps-wrapper">';

                            var hubData = await dcnHub.dcnHubRequests.getHubData(params.type_hub);
                            if (hubData.success) {
                                historyChildren.push(JSON.stringify(hubData.data));
                                for (var i = 0, len = hubData.data.length; i < len; i+=1) {
                                    if (hubData.data[i].type == 'link') {
                                        var hrefHtml = '';
                                        if (hubData.data[i].link && hubData.data[i].link != '' && hubData.data[i].link != undefined && hubData.data[i].link != null) {
                                            hrefHtml = hubData.data[i].link;

                                            if (hrefHtml.includes('hub.dentacoin.com')) {
                                                hrefHtml += '?platform=dentists';
                                            }
                                        } else {
                                            hrefHtml = "javascript:alert('Coming soon!');";
                                        }

                                        miniHubHtml += '<a href="'+hrefHtml+'" target="_blank" class="dcn-min-hub-application"><figure itemtype="http://schema.org/ImageObject"><img src="//dentacoin.com/assets/uploads/'+hubData.data[i].media_name+'" itemprop="contentUrl" alt="'+hubData.data[i].alt+'"> <figcaption>'+hubData.data[i].title+'</figcaption></figure></a>';
                                    } else if (hubData.data[i].type == 'folder') {
                                        if (hubData.data[i].media_name == null) {
                                            // if no folder image saved in the admin
                                            miniHubHtml += "<a href='javascript:void(0);' data-children='"+JSON.stringify(hubData.data[i].children)+"' class='dcn-min-hub-application inner "+hubData.data[i].type+"'><div class='hub-folder all-width'><div class='apps-in-folder-list'>";

                                            for (var y = 0, leny = hubData.data[i].children.length; y < leny; y+=1) {
                                                miniHubHtml += '<img src="//dentacoin.com/assets/uploads/'+hubData.data[i].children[y].media_name+'" alt="'+hubData.data[i].children[y].alt+'"/>';
                                            }

                                            miniHubHtml += '</div></div><div class="folder-title">'+hubData.data[i].title+'</div></a></li>';
                                        } else {
                                            // if folder image saved in the admin
                                            miniHubHtml += "<a href='javascript:void(0);' data-children='"+JSON.stringify(hubData.data[i].children)+"' class='dcn-min-hub-application inner "+hubData.data[i].type+"'><figure itemtype='http://schema.org/ImageObject'><img src='//dentacoin.com/assets/uploads/"+hubData.data[i].media_name+"' itemprop='contentUrl' alt='"+hubData.data[i].alt+"'> <figcaption>"+hubData.data[i].title+"</figcaption></figure></a>";
                                        }
                                    }
                                }
                            }

                            miniHubHtml += '</div></div></div><div class="hidden-box-footer"><div class="logout-btn-parent"> <a href="'+params.log_out_link+'"><i class="fa fa-power-off" aria-hidden="true"></i> Log out</a> </div> <div class="my-account-btn-parent"><a href="//account.dentacoin.com?platform='+params.platform+'">My Account</a></div></div></div></div>';

                            jQuery('body').append(miniHubHtml);
                            playApplicationsAnimation();

                            jQuery(document).on('click', '.go-back', function() {
                                jQuery('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child').remove();
                                jQuery('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child').show();
                            });

                            jQuery(document).on('click', '.dcn-hub-mini .dcn-min-hub-application.folder', async function() {
                                var thisBtn = jQuery(this);
                                var children = JSON.parse(thisBtn.attr('data-children'));
                                historyChildren.push(thisBtn.attr('data-children'));

                                var refreshedMiniHubHtml = "<div class='apps-wrapper'><a href='javascript:void(0);' class='go-back dcn-min-hub-application'><figure itemtype='http://schema.org/ImageObject'><img src='//dentacoin.com/assets/images/dcn-mini-hub-back-arrow.png' itemprop='contentUrl' alt='Go back icon' class='dcn-hub-mini-go-back-image'></figure></a>";
                                for (var i = 0, len = children.length; i < len; i+=1) {
                                    if (children[i].type == 'link') {
                                        var hrefHtml = '';
                                        if (children[i].link && children[i].link != '' && children[i].link != undefined && children[i].link != null) {
                                            hrefHtml = children[i].link;
                                        } else {
                                            hrefHtml = "javascript:alert('Coming soon!');";
                                        }

                                        refreshedMiniHubHtml += '<a href="'+hrefHtml+'" target="_blank" class="dcn-min-hub-application"><figure itemtype="http://schema.org/ImageObject"><img src="//dentacoin.com/assets/uploads/'+children[i].media_name+'" itemprop="contentUrl" alt="'+children[i].alt+'"> <figcaption>'+children[i].title+'</figcaption></figure></a>';
                                    } else if (children[i].type == 'folder') {
                                        // ajax to take the children
                                        var hubChildren = await dcnHub.dcnHubRequests.getHubChildren(children[i].slug);
                                        if (hubChildren.success) {
                                            if (children[i].media_name == null) {
                                                // if no folder image saved in the admin
                                                refreshedMiniHubHtml += "<a href='javascript:void(0);' data-children='"+JSON.stringify(hubChildren.data)+"' class='dcn-min-hub-application inner "+children[i].type+"'><div class='hub-folder all-width'><div class='apps-in-folder-list'>";

                                                for (var y = 0, leny = hubChildren.data[i].children.length; y < leny; y+=1) {
                                                    refreshedMiniHubHtml += '<img src="//dentacoin.com/assets/uploads/'+hubChildren.data[i].children[y].media_name+'" alt="'+hubChildren.data[i].children[y].alt+'"/>';
                                                }

                                                refreshedMiniHubHtml += '</div></div><div class="folder-title">'+children[i].title+'</div></a></li>';
                                            } else {
                                                // if folder image saved in the admin
                                                refreshedMiniHubHtml += "<a href='javascript:void(0);' data-children='"+JSON.stringify(hubChildren.data)+"' class='dcn-min-hub-application inner "+children[i].type+"'><figure itemtype='http://schema.org/ImageObject'><img src='//dentacoin.com/assets/uploads/"+children[i].media_name+"' itemprop='contentUrl' alt='"+children[i].alt+"'> <figcaption>"+children[i].title+"</figcaption></figure></a>";
                                            }
                                        }
                                    }
                                }

                                refreshedMiniHubHtml += "</div>";
                                jQuery('.dcn-hub-mini .list-with-apps .apps-wrapper').hide();
                                jQuery('.dcn-hub-mini .list-with-apps').append(refreshedMiniHubHtml);
                                jQuery('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child').show();

                                playApplicationsAnimation();

                                jQuery(document).unbind('click', hideHubIfClickedOutside);
                                jQuery(document).bind('click', hideHubIfClickedOutside);
                            });
                        }
                        jQuery(document).bind('click', hideHubIfClickedOutside);

                        jQuery(window).on('resize', function() {
                            setHubPosition();
                        });

                        jQuery(window).on('scroll', function() {
                            setHubPosition();
                        });
                    }
                    showMiniHub();

                    function setHubPosition() {
                        var topToAppear = elementToBind.offset().top + elementToBind.outerHeight();
                        var leftToAppear = elementToBind.offset().left + elementToBind.outerWidth();

                        jQuery('.dcn-hub-mini').offset({top: topToAppear + jQuery('.dcn-hub-mini .up-arrow').outerHeight(), left: leftToAppear - jQuery('.dcn-hub-mini').outerWidth() + (jQuery('.dcn-hub-mini .up-arrow').outerWidth() / 2)});
                    }

                    function hideHubIfClickedOutside(event) {
                        if (!jQuery(event.target).closest('#dcn-hub-mini').length && !jQuery(event.target).closest('#'+params.element_id_to_bind).length && !jQuery(event.target).hasClass('dcn-hub-mini-go-back-image')) {
                            jQuery('.dcn-hub-mini').removeClass('custom-show');
                        }
                    }

                    jQuery(document).on('click', '.dcn-hub-mini-close-btn', function() {
                        jQuery('.dcn-hub-mini').removeClass('custom-show');
                        jQuery('body').removeClass('overflow-hidden');
                    });

                    function playApplicationsAnimation() {
                        var elementsToAddAnimation = jQuery('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child .dcn-min-hub-application');
                        var animationSeconds = 150;
                        for (var i = 0, lenz = elementsToAddAnimation.length; i < lenz; i+=1) {
                            fadeInAnimation(elementsToAddAnimation.eq(i), animationSeconds);
                            animationSeconds += 150;
                        }
                    }

                    function fadeInAnimation(selector, animationSeconds) {
                        setTimeout(function() {
                            selector.addClass('dcn-min-hub-fade-in-animation');
                        }, animationSeconds);
                    }

                    jQuery(document).on('setHubPosition', async function (event) {
                        setHubPosition();
                    });
                } else {
                    console.error('False element to bind passed to Dentacoin hub.');
                    return false;
                }
            }
        }
    };

    var dcnCookie = {
        init: async function(params) {
            if (typeof params !== 'object' && params === undefined) {
                // false params
                console.error('False params passed to Dentacoin cookie.');
            } else {
                if (dcnAdditionals.utils.cookies.get('performance_cookies') == '' && dcnAdditionals.utils.cookies.get('functionality_cookies') == '' && dcnAdditionals.utils.cookies.get('marketing_cookies') == '' && dcnAdditionals.utils.cookies.get('strictly_necessary_policy') == '')  {

                    jQuery('body').append('<div class="dcn-privacy-policy-cookie"><div class="dcn-cookie-wrapper"><div class="text">This site uses cookies. Find out more on how we use cookies in our <a href="https://dentacoin.com/privacy-policy" class="link" target="_blank">Privacy Policy</a>. | <a href="javascript:void(0);" class="link adjust-cookies">Adjust cookies</a></div><div class="button"><a href="javascript:void(0);" class="white-colorful-cookie-btn accept-all">Accept all cookies</a></div></div></div>');

                    jQuery('.dcn-privacy-policy-cookie .accept-all').click(function()    {
                        dcnAdditionals.utils.cookies.set('performance_cookies', 1);
                        dcnAdditionals.utils.cookies.set('functionality_cookies', 1);
                        dcnAdditionals.utils.cookies.set('marketing_cookies', 1);
                        dcnAdditionals.utils.cookies.set('strictly_necessary_policy', 1);

                        if (hasOwnProperty.call(params, 'google_app_id')) {
                            window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', params.google_app_id);
                        }

                        if (hasOwnProperty.call(params, 'fb_app_id')) {
                            !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window,document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('consent', 'grant');
                            fbq('init', params.fb_app_id);
                            if (hasOwnProperty.call(params, 'second_fb_app_id')) {
                                fbq('init', params.second_fb_app_id);
                            }
                            fbq('track', 'PageView');
                        }

                        jQuery('.dcn-privacy-policy-cookie').remove();
                    });

                    jQuery('.dcn-privacy-policy-cookie .adjust-cookies').click(function() {
                        jQuery('.dcn-privacy-policy-cookie .customize-cookies').remove();

                        var dcnCookieBalloonHtml = '<div class="customize-cookies"><button class="close-customize-cookies close-customize-cookies-popup">×</button> <div class="text-center"><img src="https://dentacoin.com/assets/images/cookie-icon.svg" alt="Cookie icon" class="cookie-icon"/></div><div class="text-center subtitle">Select cookies to accept:</div><div class="cookies-options-list"> <ul> <li> <div class="custom-checkbox-style predefined"><input type="checkbox" class="custom-checkbox-input" checked id="strictly-necessary-cookies"/> <label class="custom-checkbox-label" for="strictly-necessary-cookies">Strictly necessary</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">Cookies essential to navigate around the website and use its features. Without them, you wouldn’t be able to use basic services like signup or login.</div></button></div></li><li> <div class="custom-checkbox-style"> <input type="checkbox" class="custom-checkbox-input" checked id="functionality-cookies"/> <label class="custom-checkbox-label" for="functionality-cookies">Functionality cookies</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">These cookies allow users to customise how a website looks for them; they can remember usernames, preferences, etc.</div></button> </div></li></ul> <ul> <li> <div class="custom-checkbox-style"><input type="checkbox" class="custom-checkbox-input" checked id="performance-cookies"/> <label class="custom-checkbox-label" for="performance-cookies">Performance cookies</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">These cookies collect data for statistical purposes on how visitors use a website, they don’t contain personal data and are used to improve user experience.</div></button> </div></li><li> <div class="custom-checkbox-style"><input type="checkbox" class="custom-checkbox-input" checked id="marketing-cookies"/> <label class="custom-checkbox-label" for="marketing-cookies">Marketing cookies</label><button class="tooltip-init info-button" type="button"><img src="https://dentacoin.com/assets/images/info.svg" alt="Info icon"/><div class="tooltip-label">Marketing cookies are used e.g. to deliver advertisements more relevant to you or limit the number of times you see an advertisement.</div></button> </div></li></ul> </div><div class="text-center actions"><a href="javascript:void(0);" class="colorful-white-cookie-btn close-customize-cookies-popup">CANCEL</a><a href="javascript:void(0);" class="white-colorful-cookie-btn custom-cookie-save">SAVE</a></div><div class="custom-triangle"></div></div>';

                        jQuery('.dcn-privacy-policy-cookie').append(dcnCookieBalloonHtml);

                        dcnAdditionals.utils.initCustomCheckboxes('.dcn-privacy-policy-cookie');

                        jQuery('.dcn-privacy-policy-cookie .close-customize-cookies-popup').click(function() {
                            jQuery('.customize-cookies').remove();
                        });

                        jQuery('.dcn-privacy-policy-cookie .custom-cookie-save').click(function()   {
                            dcnAdditionals.utils.cookies.set('strictly_necessary_policy', 1);

                            if(jQuery('.dcn-privacy-policy-cookie #functionality-cookies').is(':checked')) {
                                dcnAdditionals.utils.cookies.set('functionality_cookies', 1);
                            }

                            if(jQuery('.dcn-privacy-policy-cookie #marketing-cookies').is(':checked')) {
                                dcnAdditionals.utils.cookies.set('marketing_cookies', 1);

                                if (hasOwnProperty.call(params, 'fb_app_id')) {
                                    !function (f, b, e, v, n, t, s) {
                                        if (f.fbq) return;
                                        n = f.fbq = function () {
                                            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                                        };
                                        if (!f._fbq) f._fbq = n;
                                        n.push = n;
                                        n.loaded = !0;
                                        n.version = '2.0';
                                        n.queue = [];
                                        t = b.createElement(e);
                                        t.async = !0;
                                        t.src = v;
                                        s = b.getElementsByTagName(e)[0];
                                        s.parentNode.insertBefore(t, s)
                                    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                                    fbq('consent', 'grant');
                                    fbq('init', params.fb_app_id);
                                    if (hasOwnProperty.call(params, 'second_fb_app_id')) {
                                        fbq('init', params.second_fb_app_id);
                                    }
                                    fbq('track', 'PageView');
                                }
                            }

                            if(jQuery('.dcn-privacy-policy-cookie #performance-cookies').is(':checked')) {
                                dcnAdditionals.utils.cookies.set('performance_cookies', 1);

                                if (hasOwnProperty.call(params, 'google_app_id')) {
                                    window.dataLayer = window.dataLayer || [];

                                    function gtag() {
                                        dataLayer.push(arguments);
                                    }

                                    gtag('js', new Date());
                                    gtag('config', params.google_app_id);
                                }
                            }

                            jQuery('.dcn-privacy-policy-cookie').remove();
                        });
                    });
                }
            }
        }
    };
}