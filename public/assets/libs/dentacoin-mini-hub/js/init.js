if (typeof $ == 'undefined') {
    // no $ installed
    console.error('Dentacoin hub requires the usage of $.');
} else if (!navigator.onLine) {
    // check internet connection
    console.error('Dentacoin hub requires internet connection.');
} else {
    var fireHubAjax = true;
    var fireBigHubAjax = true;
    var dcnHub = {
        dcnHubRequests: {
            getHubData: async function(hubType) {
                if (fireHubAjax) {
                    fireHubAjax = false;

                    var ajaxCall = await $.ajax({
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

                    var ajaxCall = await $.ajax({
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

                    var ajaxCall = await $.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-platform-menu/'+menu,
                        dataType: 'json'
                    });

                    fireBigHubAjax = true;
                    return ajaxCall;
                }
            },
            getBigHubHtml: async function(hubType, ajaxData) {
                if (fireBigHubAjax) {
                    fireBigHubAjax = false;

                    var ajaxParams = {
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-big-hub-html/'+hubType,
                        dataType: 'json'
                    };

                    if (ajaxData != undefined || Object.keys(ajaxData).length > 0) {
                        ajaxParams.data = ajaxData;
                    }

                    var ajaxCall = await $.ajax(ajaxParams);

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
                var elementToAppend = $('#' + params.element_id_to_append);
                if (elementToAppend.length) {
                    var bigHubParams = {};
                    if (hasOwnProperty.call(params, 'hub_title')) {
                        bigHubParams.hubTitleParam = params.hub_title;
                    }

                    var getBigHubHtml = await dcnHub.dcnHubRequests.getBigHubHtml(params.type_hub, bigHubParams);

                    if (getBigHubHtml.success) {
                        elementToAppend.html(getBigHubHtml.data);

                        if (params.type_hub == 'dentists') {
                            elementToAppend.find('.app-list').addClass('dark-blue-background');
                        }

                        elementToAppend.find('.single-application.link').click(function() {
                            var extra_html = '';
                            elementToAppend.find('.single-application.link').removeClass('active');
                            $(this).addClass('active');

                            elementToAppend.find('.info-section .logo img').attr('alt', $(this).attr('data-image-alt')).attr('src', $(this).attr('data-image'));
                            elementToAppend.find('.info-section .title').html($(this).attr('data-title'));

                            if ($(this).attr('data-articles') != undefined) {
                                extra_html+='<div class="extra-html"><div class="extra-title">Latest Blog articles:</div><div class="slider-with-tool-data">';
                                var articles_arr = $.parseJSON($(this).attr('data-articles'));
                                for(var i = 0, len = articles_arr.length; i < len; i+=1)    {
                                    var post_title = articles_arr[i]['post_title'];
                                    if (post_title.length > 35) {
                                        post_title = post_title.substring(0, 35) + '...';
                                    }
                                    extra_html+='<a target="_blank" href="'+articles_arr[i]['link']+'"><div class="single-slide"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="'+articles_arr[i]['thumb']+'" alt="" itemprop="contentUrl"/></figure><div class="content"><div class="slide-title">'+post_title+'</div><time>'+dateObjToFormattedDate(new Date(parseInt(articles_arr[i]['date']) * 1000))+'</time></div></div></a>';
                                }
                                extra_html+='</div><div class="go-to-all"><a href="//blog.dentacoin.com/" class="dcn-big-hub-btn" target="_blank">GO TO ALL</a></div></div>';

                                elementToAppend.find('.extra-html-content').html(extra_html);

                                initToolsPostsSlider();
                            } else {
                                $('.extra-html-content').html('');
                            }

                            elementToAppend.find('.info-section .html-content').html($.parseJSON($(this).attr('data-html')));

                            if ($(this).attr('data-video') != '') {
                                var youtubeVideoId = getYoutubeVideoId($(this).attr('data-video'));
                                if (youtubeVideoId) {
                                    elementToAppend.find('.video-content').html('<iframe src="https://www.youtube.com/embed/'+youtubeVideoId+'"></iframe>');
                                }
                            } else {
                                elementToAppend.find('.video-content').html('');
                            }

                            $('body').addClass('overflow-hidden');
                            if ($(window).width() < 992) {
                                elementToAppend.find('.app-list').hide();
                                elementToAppend.find('.info-section').fadeIn(500);

                                var scrollTop = $('.info-section').offset().top;
                                if ($('header.sticky-header').length) {
                                    scrollTop = scrollTop - $('header.sticky-header').outerHeight();
                                }

                                $('html').animate({
                                    scrollTop: scrollTop
                                }, {
                                    duration: 500
                                });
                            }
                            $('body').removeClass('overflow-hidden');
                        });

                        $('body').addClass('overflow-hidden');
                        if ($(window).width() > 992) {
                            elementToAppend.find('.single-application.link').eq(0).click();
                        } else {
                            elementToAppend.find('.info-section .close-application').click(function() {
                                elementToAppend.find('.app-list').fadeIn(500);
                                elementToAppend.find('.info-section').hide();
                            });
                        }
                        $('body').removeClass('overflow-hidden');
                    }
                }

                // check if element is visible in the screen viewport
                function isInViewport(el) {
                    var elementTop = $(el).offset().top;
                    var elementBottom = elementTop + $(el).outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();
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
                    $(window).on('scroll', function(){
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
                    $('.slider-with-tool-data').slick({
                        slidesToShow: 2,
                        infinite: false,
                        responsive: [
                            {
                                breakpoint: 1200,
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
                var elementToBind = $('#'+params.element_id_to_bind);
                if (elementToBind.length) {
                    var add_overflow_hidden_on_hidden_box_show = false;
                    $('body').addClass('overflow-hidden');
                    if ($(window).width() < 992) {
                        add_overflow_hidden_on_hidden_box_show = true;
                    }
                    $('body').removeClass('overflow-hidden');

                    if (add_overflow_hidden_on_hidden_box_show) {
                        elementToBind.click(function() {
                            $('.dcn-hub-mini').addClass('custom-show');
                            setHubPosition();

                            if (!hasOwnProperty.call(params, 'without_apps')) {
                                $('body').addClass('overflow-hidden');

                                window.scrollTo(0, 0);
                            }
                        });
                    } else {
                        elementToBind.hover(function () {
                            $('.dcn-hub-mini').addClass('custom-show');
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

                            $('body').append(miniHubHtml);
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

                            $('body').append(miniHubHtml);
                            playApplicationsAnimation();

                            $(document).on('click', '.go-back', function() {
                                $('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child').remove();
                                $('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child').show();
                            });

                            $(document).on('click', '.dcn-hub-mini .dcn-min-hub-application.folder', async function() {
                                var thisBtn = $(this);
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
                                $('.dcn-hub-mini .list-with-apps .apps-wrapper').hide();
                                $('.dcn-hub-mini .list-with-apps').append(refreshedMiniHubHtml);
                                $('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child').show();

                                playApplicationsAnimation();

                                $(document).unbind('click', checkIfClickedOutsideSearchResult);
                                $(document).bind('click', checkIfClickedOutsideSearchResult);
                            });
                        }
                        $(document).bind('click', checkIfClickedOutsideSearchResult);

                        $(window).on('resize', function() {
                            setHubPosition();
                        });

                        $(window).on('scroll', function() {
                            setHubPosition();
                        });
                    }
                    showMiniHub();

                    function setHubPosition() {
                        var topToAppear = elementToBind.offset().top + elementToBind.outerHeight();
                        var leftToAppear = elementToBind.offset().left + elementToBind.outerWidth();

                        $('.dcn-hub-mini').offset({top: topToAppear + $('.dcn-hub-mini .up-arrow').outerHeight(), left: leftToAppear - $('.dcn-hub-mini').outerWidth() + ($('.dcn-hub-mini .up-arrow').outerWidth() / 2)});
                    }

                    function checkIfClickedOutsideSearchResult(event) {
                        if (!add_overflow_hidden_on_hidden_box_show) {
                            if (!$(event.target).closest('#dcn-hub-mini').length && !$(event.target).hasClass('dcn-hub-mini-go-back-image')) {
                                $('.dcn-hub-mini').removeClass('custom-show');
                            }
                        }
                    }
                    
                    $(document).on('click', '.dcn-hub-mini-close-btn', function() {
                        $('.dcn-hub-mini').removeClass('custom-show');
                        $('body').removeClass('overflow-hidden');
                    });

                    function playApplicationsAnimation() {
                        var elementsToAddAnimation = $('.dcn-hub-mini .list-with-apps .apps-wrapper:last-child .dcn-min-hub-application');
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
                } else {
                    console.error('False element to bind passed to Dentacoin hub.');
                    return false;
                }
            }
        }
    };
}