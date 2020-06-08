if (typeof jQuery == 'undefined') {
    // no jquery installed
    console.error('Dentacoin hub requires the usage of jQuery.');
} else if (!navigator.onLine) {
    // check internet connection
    console.error('Dentacoin hub requires internet connection.');
} else {
    var fireAjax = true;
    var dcnHub = {
        dcnHubRequests: {
            getHubData: async function(hubType) {
                if (fireAjax) {
                    fireAjax = false;

                    var ajaxCall = await $.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-hub-data/'+hubType,
                        dataType: 'json'
                    });

                    fireAjax = true;
                    return ajaxCall;
                }
            },
            getHubChildren: async function(folderSlug) {
                if (fireAjax) {
                    fireAjax = false;

                    var ajaxCall = await $.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-hub-children/'+folderSlug,
                        dataType: 'json'
                    });

                    fireAjax = true;
                    return ajaxCall;
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
                        console.log(params, 'showMiniHub');
                        if (hasOwnProperty.call(params, 'without_apps') && params.without_apps) {
                            var miniHubHtml = '<div class="dcn-hub-mini without-apps" id="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"><div class="hidden-box-footer"><div class="logout-btn-parent"> <a href="'+params.log_out_link+'"><i class="fa fa-power-off" aria-hidden="true"></i> Log out</a> </div> <div class="my-account-btn-parent"><a href="//account.dentacoin.com?platform='+params.platform+'">My Account</a></div></div></div></div>';

                            $('body').append(miniHubHtml);
                        } else if (hasOwnProperty.call(params, 'type_hub')) {
                            var miniHubHtml = '<div class="dcn-hub-mini with-apps" id="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"> <div class="hidden-box-hub"><div class="dcn-hub-mini-close-btn"><a href="javascript:void(0)">Close <span>X</span></a></div><div class="list-with-apps"><div class="apps-wrapper">';

                            var hubData = await dcnHub.dcnHubRequests.getHubData(params.type_hub);
                            historyChildren.push(JSON.stringify(hubData.data));
                            if (hubData.success) {
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
                                        console.log(children[i], 'children[i]');
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

                        console.log(topToAppear, 'topToAppear');
                        console.log(leftToAppear, 'leftToAppear');

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