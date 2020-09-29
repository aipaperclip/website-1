console.log('Don\'t touch the code. Or do ... ¯\\_(ツ)_/¯');

//load images after website load
function loadDeferImages() {
    for (var i = 0, len = jQuery('[data-defer-src]').length; i < len; i += 1) {
        var elementInViewport = jQuery('[data-defer-src]').eq(i);

        if (basic.isInViewport(elementInViewport) && jQuery('[data-defer-src]').eq(i).attr('src') == undefined) {
            jQuery('[data-defer-src]').eq(i).attr('src', jQuery('[data-defer-src]').eq(i).attr('data-defer-src'));
        }
    }
}

loadDeferImages();

var allowedImagesExtensions = ['png', 'jpg', 'jpeg'];
var allowedDocumentExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'odt', 'rtf'];
var get_params = basic.getGETParameters();

$(window).on('load', function () {
    if (($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) {
        var current_url = new URL(window.location.href);
        if (current_url.searchParams.get('application') != null) {
            scrollToSectionAnimation('two', null, true);

            setTimeout(function () {
                $('.dentacoin-ecosystem .single-application figure[data-slug="' + current_url.searchParams.get('application') + '"]').click();
            }, 500)
        } else if (current_url.searchParams.get('payment') != null && current_url.searchParams.get('payment') == 'bidali-gift-cards') {
            $('html').animate({
                scrollTop: $('.wallet-app-and-gif').offset().top
            }, {
                duration: 500,
                complete: function () {
                    setTimeout(function () {
                        $('#bidali-init-btn').click();
                    }, 1000);
                }
            });
        } else if (current_url.searchParams.get('section') != null && current_url.searchParams.get('section') == 'buy-dentacoin') {
            $('html').animate({
                scrollTop: $('.buy-dentacoin').offset().top
            }, {
                duration: 500
            });
        }
    }

    if ($('body.corporate-design').length > 0) {
        var drawCorporateDesignLine = false;
        $('body').addClass('overflow-hidden');
        if ($(window).width() > 768) {
            drawCorporateDesignLine = true;
        }
        $('body').removeClass('overflow-hidden');

        if (drawCorporateDesignLine) {
            drawNavToBottomSectionLine();
        }
    }
});

$(window).on('scroll', function () {
    loadDeferImages();
});

$(window).on('resize', function () {
    if ($('body').hasClass('testimonials')) {
        //TESTIMONIALS
        initListingPageLine();
    } else if ($('body').hasClass('press-center')) {
        //PRESS CENTER
        initListingPageLine();
    } else if ($('body.careers.allow-draw-lines').length > 0) {
        //CAREERSdentacoin-ecosystem
        drawHeaderToFirstSectionLine();
    } else if ($('body.corporate-design').length > 0) {
        //CORPORATE DESIGN
        var drawCorporateDesignLine = false;
        $('body').addClass('overflow-hidden');
        if ($(window).width() > 768) {
            drawCorporateDesignLine = true;
        }
        $('body').removeClass('overflow-hidden');

        if (drawCorporateDesignLine) {
            drawNavToBottomSectionLine();
        }
    }
});

// ==================== PAGES ====================

var projectData = {
    pages: {
        not_logged_in: function () {
            projectData.pages.data.homepage();
            projectData.pages.data.users(true);
            projectData.pages.data.dentists(true);
            projectData.pages.data.traders(true);
            projectData.pages.data.testimonials();
            projectData.pages.data.corporateDesign();
            projectData.pages.data.claimDentacoin();
            projectData.pages.data.careers();
            projectData.pages.data.team();
            projectData.pages.data.pressCenter();
            projectData.pages.data.howToCreateWallet();
        },
        logged_in: function() {
            projectData.pages.data.homepage();
            projectData.pages.data.users(true);
            projectData.pages.data.dentists(true);
            projectData.pages.data.traders(true);
            projectData.pages.data.testimonials();
            projectData.pages.data.corporateDesign();
            projectData.pages.data.careers();
            projectData.pages.data.team();
            projectData.pages.data.pressCenter();
            projectData.pages.data.howToCreateWallet();
        },
        data: {
            homepage: async function() {
                if ($('body').hasClass('home')) {
                    projectData.general_logic.data.showLoader();

                    setTimeout(async function() {
                        var usersPageData = '';
                        var dentistsPageData = '';
                        var tradersPageData = '';

                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();
                        console.log(takeHomepageDataResponse, 'takeHomepageDataResponse');

                        if (takeHomepageDataResponse.success) {
                            projectData.general_logic.data.hideLoader();
                            projectData.general_logic.data.showStickyHomepageNav();

                            usersPageData = takeHomepageDataResponse.data.usersPageData;
                            dentistsPageData = takeHomepageDataResponse.data.dentistsPageData;
                            tradersPageData = takeHomepageDataResponse.data.tradersPageData;

                            $('.call-users-page').click(function() {
                                console.log('click');
                                projectData.general_logic.data.slideInUsersContent(usersPageData);
                            });

                            $('.call-dentists-page').click(function() {
                                console.log('click');
                                projectData.general_logic.data.slideInDentistsContent(dentistsPageData);
                            });

                            $('.call-traders-page').click(function() {
                                console.log('click');
                                projectData.general_logic.data.slideInTradersContent(tradersPageData);
                            });
                        } else {
                            $('.section-homepage-nav .single-element a').click(function() {
                                basic.closeDialog();
                                basic.showAlert('Something went wrong. Please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a> with description of the problem.', '', true);
                            });
                        }
                    }, 2000);
                }
            },
            users: function(bodyClassCheck) {
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('users')) {
                        return false;
                    }
                }

                // adjust header to black style
                $('header .white-black-btn').removeClass('white-black-btn').addClass('black-white-btn');
                $('header .logo-container img').attr('src', ' /assets/images/logo.svg ');

                // remove footer black style
                if ($('footer').hasClass('black-style')) {
                    $('footer').removeClass('black-style');
                    for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                        var currentSocial = $('.socials ul li a img').eq(i);
                        currentSocial.attr('src', currentSocial.attr('data-default-src')).attr('alt', currentSocial.attr('data-default-alt'));
                    }
                }

                // add intro section animation
                $('.section-wait-until-user-page .hidden-picture img').addClass('animated');

                projectData.general_logic.data.hideStickyHomepageNav();
                projectData.general_logic.data.showStickySubpagesNav();

                if ($('#append-big-hub-dentacoin').length) {
                    var bigHubParams = {
                        'element_id_to_append' : 'append-big-hub-dentacoin',
                        'type_hub' : 'dentacoin',
                        'local_environment' : 'https://dev.dentacoin.com'
                    };

                    dcnHub.initBigHub(bigHubParams);
                }

                $('body').addClass('overflow-hidden');
                if ($(window).width() < 767) {
                    $('.class-video-container').html('<div class="black-border-left margin-top-20 padding-left-10"><h3 class="fs-22 lato-black">PATIENTS</h3><div class="fs-18">Earn rewards for reviews, surveys, better oral hygiene and reduce your dental costs!</div></div><figure class="padding-top-15 padding-bottom-15 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Patient dentist triangle" class="max-width-400 width-100 margin-0-auto" src="/assets/uploads/dentacoin-dentist-patient-ecosystem.png" itemprop="contentUrl"></figure><div class="black-border-right padding-right-10 text-right"><h3 class="fs-22 lato-black">DENTISTS</h3><div class="fs-18">Earn rewards for reviews, surveys, better oral hygiene and reduce your dental costs!</div></div><figure class="padding-top-25 padding-bottom-10 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin currency" class="max-width-80 width-100 margin-0-auto" src="/assets/uploads/dcn-coin.svg" itemprop="contentUrl"><figcaption class="fs-18"><span class="display-block fs-22 lato-black padding-bottom-5">Dentacoin Currency</span>An Ethereum-based utility token, used for rewards, payments, and exchange within and beyond the  dental industry.</figcaption></figure><figure class="padding-top-25 padding-bottom-10 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin Apps" class="max-width-80 width-100 margin-0-auto" src="/assets/uploads/dcn-phone-apps.svg" itemprop="contentUrl"><figcaption class="fs-18"><span class="display-block fs-22 lato-black padding-bottom-5">Dentacoin Apps</span>Promoting better oral health and rewarding users for submitting feedback, taking surveys, maintaining oral hygiene.</figcaption></figure><figure class="padding-top-25 padding-bottom-10 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin Assurance" class="max-width-80 width-100 margin-0-auto" src="/assets/uploads/dcn-assurance.svg" itemprop="contentUrl"><figcaption class="fs-18"><span class="display-block fs-22 lato-black padding-bottom-5">Dentacoin Assurance</span>The first smart contract-based dental assurance plan, focused on prevention and paid exclusively in DCN currency.</figcaption></figure>');
                } else {
                    var videoPlayed = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.patient-dentist-triangle-video'), 200) && !videoPlayed) {
                            videoPlayed = true;
                            $('.patient-dentist-triangle-video').html('<video muted="muted" autoplay><source src="/assets/uploads/patient-dentist-triangle-animation.mp4" type="video/mp4"> Your browser does not support HTML5 video.</video><meta itemprop="name" content="Dentacoin Currency Video"><meta itemprop="description" content="Relation between patients and dentists via Dentacoin Currency."><meta itemprop="uploadDate" content="2020-08-30T08:00:00+08:00"><meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png"><link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/patient-dentist-triangle-animation.mp4">');
                        }
                    });
                }
                $('body').removeClass('overflow-hidden');

                projectData.general_logic.data.videoExpressionsSlider('users');
                projectData.general_logic.data.userExpressionsSlider('users');

                if ($('.section-google-map.module').length) {
                    var mapVisible = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.section-google-map.module'), 200) && !mapVisible) {
                            console.log('LOAD MAP');
                            mapVisible = true;

                            projectData.general_logic.data.dentacoinGoogleMap();
                        }
                    });
                }
            },
            dentists: function(bodyClassCheck) {
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('dentists')) {
                        return false;
                    }
                }

                // add intro section animation
                $('.section-the-era-dentist-page .hidden-picture img').addClass('animated');

                // adjust header to white style
                $('header .black-white-btn').removeClass('black-white-btn').addClass('white-black-btn');
                $('header .logo-container img').attr('src', ' /assets/images/logo.svg ');

                // adjust footer to white style
                if ($('footer').hasClass('black-style')) {
                    $('footer').removeClass('black-style');
                    for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                        var currentSocial = $('.socials ul li a img').eq(i);
                        currentSocial.attr('src', currentSocial.attr('data-default-src')).attr('alt', currentSocial.attr('data-default-alt'));
                    }
                }

                projectData.general_logic.data.hideStickyHomepageNav();
                projectData.general_logic.data.showStickySubpagesNav();

                if ($('.benefits-row').length && $('.benefits-row video').length) {
                    var videosPlayed = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.benefits-row'), 200) && !videosPlayed) {
                            videosPlayed = true;

                            for (var i = 0, len = $('.benefits-row video').length; i < len; i+=1) {
                                $('.benefits-row video').get(i).play();
                            }

                            $('.section-list-with-benefits-dentists-page .white-purple-btn.with-white-arrow').addClass('animated');
                            setTimeout(function() {
                                $('.section-list-with-benefits-dentists-page .white-purple-btn.with-white-arrow').removeClass('animated').addClass('hover-effect');
                            }, 2000);
                        }
                    });
                }

                projectData.general_logic.data.videoExpressionsSlider('dentists');
                projectData.general_logic.data.userExpressionsSlider('dentists');

                if ($('.section-google-map.module').length) {
                    var mapVisible = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.section-google-map.module'), 200) && !mapVisible) {
                            console.log('LOAD MAP');
                            mapVisible = true;

                            projectData.general_logic.data.dentacoinGoogleMap();
                        }
                    });
                }
            },
            traders: function(bodyClassCheck) {
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('traders')) {
                        return false;
                    }
                }

                // if exchange bullets exist bind them logic to show/ hide exchanges
                /*if ($('.exchanges-bullets').length) {
                    $('.exchanges-bullets a').click(function() {
                        $('.exchanges-bullets a').removeClass('active');
                        $(this).addClass('active');

                        $('.mobile-exchanges .mobile-extra-row').removeClass('active');
                        $('.mobile-exchanges .mobile-extra-row[data-bullet="'+$(this).attr('data-bullet')+'"]').addClass('active');
                    });
                }*/

                if ($('.mobile-exchanges').length) {
                    $('.mobile-exchanges .slider-row').slick({
                        slidesToShow: 1,
                        infinite: true,
                        arrows: true,
                        dots: true,
                        adaptiveHeight: true
                    });
                }

                // add intro section animation
                $('.section-bringing-blockchain-solutions-trader-page .trader').addClass('animated');
                $('.section-bringing-blockchain-solutions-trader-page .trader-animated-background').addClass('animated');

                // adjust header to black style
                $('header .white-black-btn').removeClass('white-black-btn').addClass('black-white-btn');
                $('header .logo-container img').attr('src', '//dentacoin.com/assets/images/rounded-logo-white.svg');

                // adjust footer to black style
                $('footer').addClass('black-style');
                for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                    var currentSocial = $('.socials ul li a img').eq(i);
                    currentSocial.attr('src', currentSocial.attr('data-black-style-src')).attr('alt', currentSocial.attr('data-black-style-alt'));
                }

                if (basic.isMobile()) {
                    if (basic.getMobileOperatingSystem() == 'iOS') {
                        $('.app-store-btn').fadeIn(500);
                    } else  if (basic.getMobileOperatingSystem() == 'Android') {
                        $('.google-play-btn').fadeIn(500);
                    }
                } else {
                    $('.app-store-btn').fadeIn(500);
                    $('.google-play-btn').fadeIn(500);
                }

                // add styles for latest twitter tweets iframe
                var twitterStyleInterval = setInterval(function() {
                    if ($('iframe.twitter-timeline').length) {
                        $('body').addClass('overflow-hidden');
                        if ($(window).width() < 767) {
                            $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-Header, .timeline-Footer{display:none}.timeline-Widget{max-width: none !important;}.timeline-TweetList{font-size: 0;position:relative;}li.timeline-TweetList-tweet {display: inline-block;vertical-align: top;width:100%}.SandboxRoot.env-bp-970 .timeline-Tweet-text {font-size: 16px !important; line-height: 22px !important;font-weight: 300;}.timeline-TweetList-tweet:nth-of-type(2){top: 0;position: absolute;left: 100%;background: white;--moz-transition: 0.3s;-ms-transition: 0.3s;transition: 0.3s;z-index:50;}.timeline-TweetList-tweet:nth-of-type(3){top: 0;position: absolute;left: 100%;background: white;--moz-transition: 0.3s;-ms-transition: 0.3s;transition: 0.3s;z-index:100;}</style>');

                            $('iframe.twitter-timeline').height('auto');

                            $('.tweets-iframe-container').append('<div class="tweet-bullets padding-top-10 padding-bottom-15"><a href="javascript:void(0);" class="inline-block first active"></a><a href="javascript:void(0);" class="inline-block second"></a><a href="javascript:void(0);" class="inline-block third"></a></div>');

                            $('.tweet-bullets a').click(function() {
                                $('.tweet-bullets a').removeClass('active');
                                $(this).addClass('active');

                                if ($(this).hasClass('first')) {
                                    $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-TweetList-tweet:nth-of-type(2){left: 100% !important}.timeline-TweetList-tweet:nth-of-type(3){left: 100% !important}</style>');
                                } else if ($(this).hasClass('second')) {
                                    $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-TweetList-tweet:nth-of-type(2){left: 0 !important}.timeline-TweetList-tweet:nth-of-type(3){left: 100% !important}</style>');
                                } else if ($(this).hasClass('third')) {
                                    $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-TweetList-tweet:nth-of-type(2){left: 100% !important}.timeline-TweetList-tweet:nth-of-type(3){left: 0 !important}</style>');
                                }

                                $('iframe.twitter-timeline').height('auto');
                            });
                        } else {
                            $('iframe.twitter-timeline').height('auto').contents().find('head').append('<style>.timeline-Header, .timeline-Footer{display:none}.timeline-Widget{max-width: none !important;}.timeline-TweetList{font-size: 0;}li.timeline-TweetList-tweet {display: inline-block;vertical-align: top;width:33.33333%}.SandboxRoot.env-bp-970 .timeline-Tweet-text {font-size: 16px !important; line-height: 22px !important;font-weight: 300;}</style>');
                        }
                        $('body').removeClass('overflow-hidden');

                        clearInterval(twitterStyleInterval);
                    }
                }, 500);

                // add roadmap show logic
                if ($('.section-dentacoin-roadmap').length) {
                    $('.single-year-content.active').fadeIn(500);

                    $('.section-dentacoin-roadmap .years-line a').click(function() {
                        $('.section-dentacoin-roadmap .years-line a').removeClass('active');
                        $(this).addClass('active');

                        $('.single-year-content').hide();
                        $('.single-year-content[data-year="'+$(this).attr('data-year')+'"]').fadeIn(500);
                    });
                }

                $(window).on('scroll', function() {
                    // animate everything you need to know section
                    if (basic.isInViewport($('.section-everything-you-need-to-know .middle-animated-subsection'), $(window).height() / 2) && !$('.section-everything-you-need-to-know .middle-animated-subsection').hasClass('fade-in-animation')) {
                        $('.section-everything-you-need-to-know .middle-animated-subsection').addClass('fade-in-animation');
                        $('.section-everything-you-need-to-know .left-animated-border').addClass('add-animation');
                        $('.section-everything-you-need-to-know .right-animated-border').addClass('add-animation');
                    }

                    // animate wallet section
                    if (basic.isInViewport($('.section-wallet .laptop'), $(window).height() / 2) && !$('.section-wallet .laptop').hasClass('animated')) {
                        $('.section-wallet .laptop').addClass('animated');
                        $('.section-wallet .phone').addClass('animated');
                    }
                });

                projectData.general_logic.data.hideStickyHomepageNav();
                projectData.general_logic.data.showStickySubpagesNav();
            },
            testimonials: function() {
                if ($('body').hasClass('testimonials')) {
                    var testimonial_icons_listing_page = ['avatar-icon-1.svg', 'avatar-icon-2.svg'];
                    for (var i = 0; i < $('.list .single .image.no-avatar').length; i += 1) {
                        $('.list .single .image.no-avatar').eq(i).css({'background-image': 'url(/assets/images/' + testimonial_icons_listing_page[Math.floor(Math.random() * testimonial_icons_listing_page.length)] + ')'});
                    }

                    $('svg.svg-with-lines').height($(document).height());

                    // LINE GOING UNDER TESTIMONIAL AVATARS
                    initListingPageLine();
                }
            },
            corporateDesign: function() {
                if ($('body').hasClass('corporate-design')) {
                    $('.clickable-squares-row .square').click(function () {
                        $(this).closest('.clickable-squares-row').find('.square').removeClass('active');
                        $(this).addClass('active');
                    });
                }
            },
            claimDentacoin: function() {
                if ($('body').hasClass('claim-dentacoin')) {
                    var redeemExecute = true;
                    $('.redeem-dcn').click(function () {
                        if (redeemExecute) {
                            redeemExecute = false;
                            $('#wallet-address').closest('.field-parent').find('.error-handle').remove();

                            var errors = false;
                            if ($('#wallet-address').val().trim().length != 42 || !basic.customValidateWalletAddress($('#wallet-address').val().trim())) {
                                customErrorHandle($('#wallet-address').closest('.field-parent'), 'Please enter valid Wallet Address.');
                                errors = true;
                                redeemExecute = true;
                            }

                            if (!errors) {
                                projectData.general_logic.data.showLoader();
                                setTimeout(function () {
                                    $.ajax({
                                        type: 'POST',
                                        url: 'https://external-payment-server.dentacoin.com/withdraw-by-key',
                                        dataType: 'json',
                                        data: {
                                            key: get_params['withdraw-key'],
                                            walletAddress: $('#wallet-address').val().trim()
                                        },
                                        success: function (response) {
                                            projectData.general_logic.data.hideLoader();
                                            redeemExecute = true;

                                            if (response.success) {
                                                $('.changeable-on-success').html('<div class="success-handle margin-bottom-50 margin-top-30 fs-18">Your transaction is being processed... <b><a href="https://etherscan.io/tx/' + response.transactionHash + '" target="_blank" style="color: #3c763d; text-decoration: underline;">CHECK STATUS</a></b></div>.');
                                            } else {
                                                basic.showAlert('Something went wrong. Please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a> with description of the problem.', '', true);
                                            }
                                        }
                                    });
                                }, 2000);
                            }
                        }
                    });
                }
            },
            careers: function() {
                if ($('body').hasClass('careers')) {
                    if ($('.scroll-to-job-offers').length) {
                        $('.scroll-to-job-offers').click(function()  {
                            $('html, body').animate({'scrollTop': $('.open-job-positions-title .logo-over-line').offset().top}, 300);
                        });
                    }

                    if ($('.single-job-offer-container').length) {
                        // init buttons style
                        styleUploadButton(function(thisInput) {
                            $(thisInput).closest('.upload-btn-parent').find('.error-handle').remove();

                            readURL(thisInput, 2, allowedDocumentExtensions, function(e, filename) {
                                $(thisInput).closest('.button-row').find('.file-name').html('<span class="text-decoration-underline padding-right-10 inline-block">'+filename+'</span><a href="javascript:void(0);" class="remove-file inline-block">×</a>');

                                $('.remove-file').unbind().click(function() {
                                    $(this).closest('.button-row').find('input[type="file"]').val('');
                                    $(this).closest('.button-row').find('.file-name').html('');
                                });
                            });
                        }, 'bright-blue-white-btn');

                        basic.initCustomCheckboxes('.single-job-offer-container');

                        //handle apply from submission
                        $('.apply-for-position form').on('submit', async function (event) {
                            event.preventDefault();
                            var this_form_native = this;
                            var this_form = $(this_form_native);
                            var errors = false;
                            this_form.find('.error-handle').remove();

                            var check_captcha_response = await checkCaptcha(this_form.find('#captcha').val().trim());

                            for (var i = 0, len = this_form.find('input[type="text"].required').length; i < len; i+=1) {
                                if (this_form.find('input[type="text"].required').eq(i).val().trim() == '') {
                                    customErrorHandle(this_form.find('input[type="text"].required').eq(i).closest('.field-parent'), 'This field is required.');
                                    errors = true;
                                } else if (this_form.find('input[type="text"].required').eq(i).attr('name') == 'email' && !basic.validateEmail(this_form.find('input[type="text"].required').eq(i).val().trim())) {
                                    customErrorHandle(this_form.find('input[type="text"].required').eq(i).closest('.field-parent'), 'Please use valid email address.');
                                    errors = true;
                                } else if (this_form.find('input[type="text"].required').eq(i).attr('name') == 'captcha' && check_captcha_response.error) {
                                    customErrorHandle(this_form.find('input[type="text"].required').eq(i).closest('.field-parent'), 'Please enter correct captcha.');
                                    errors = true;
                                }
                            }

                            if (!this_form.find('#privacy-policy').is(':checked')) {
                                customErrorHandle(this_form.find('#privacy-policy').closest('.form-row'), this_form.find('#privacy-policy').closest('.form-row').attr('data-valid-message'));
                                errors = true;
                            }

                            if (!errors) {
                                this_form_native.submit();
                            } else {
                                $('html, body').animate({'scrollTop': $('.below-apply-for-position').offset().top}, 300);
                            }
                        });
                    }
                }
            },
            team: function() {
                if ($('body').hasClass('team')) {
                    $('.team-container .advisors .advisors-slider').slick({
                        slidesToShow: 3,
                        autoplay: true,
                        autoplaySpeed: 8000,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 2
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    adaptiveHeight: true
                                }
                            }
                        ]
                    });

                    //bind click event for show more advisors
                    $('.team-container .more-advisors .read-more a').click(function () {
                        $(this).closest('.more-advisors').find('.list').slideDown(300);
                        $(this).closest('.read-more').slideUp(300);
                    });
                }
            },
            pressCenter: function() {
                if ($('body').hasClass('press-center')) {
                    // PRESS CENTER
                    initListingPageLine();

                    if ($('.open-form').length > 0) {
                        $('.open-form').click(function () {
                            $.ajax({
                                type: 'POST',
                                url: HOME_URL + '/press-center-popup',
                                dataType: 'json',
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                },
                                success: function (response) {
                                    if (response.success) {
                                        basic.closeDialog();
                                        basic.showDialog(response.success, 'media-inquries', 'media-inquries');

                                        initCaptchaRefreshEvent();

                                        basic.initCustomCheckboxes('.bootbox.media-inquries');

                                        $('.selectpicker').selectpicker('refresh');

                                        $('.bootbox.media-inquries select[name="reason"]').on('change', function () {
                                            $('.bootbox.media-inquries .waiting-for-action').html('');
                                            if ($(this).find('option:selected').attr('data-action') == 'newsletter-register') {
                                                $('.bootbox.media-inquries .waiting-for-action').html('<input type="hidden" name="answer" value="Manual email register to newletter receivers list."/>');
                                            } else if ($(this).find('option:selected').attr('data-action') == 'long-text') {
                                                $('.bootbox.media-inquries .waiting-for-action').html('<div class="padding-bottom-15 field-parent"><textarea placeholder="' + $(this).find('option:selected').attr('data-title') + '" rows="3" name="answer" maxlength="3000" class="required"></textarea></div>');
                                            } else if ($(this).find('option:selected').attr('data-action') == 'long-text-and-attachments') {
                                                $('.bootbox.media-inquries .waiting-for-action').html('<div class="padding-bottom-15 field-parent"><textarea placeholder="' + $(this).find('option:selected').attr('data-title') + '" rows="3" name="answer" class="padding-bottom-10 required" maxlength="3000"></textarea></div><div class="padding-bottom-10 text-center-xs button-row fs-0 upload-btn-parent"><div class="upload-file module inline-block" data-label="Attach file (media package)"><input type="file" name="media-package" id="media-package" class="upload-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"></div><div class="file-text inline-block"><div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx up to 5MB</div><div class="file-name lato-bold"></div></div></div><div class="padding-bottom-15 text-center-xs button-row fs-0 upload-btn-parent"><div class="upload-file module inline-block" data-label="Attach file (individual offer, if present)"><input type="file" name="individual-offer" id="individual-offer" class="upload-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"></div><div class="file-text inline-block"><div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx up to 5MB</div><div class="file-name lato-bold"></div></div></div>');

                                                styleUploadButton(function(thisInput) {
                                                    $(thisInput).closest('.upload-btn-parent').find('.error-handle').remove();

                                                    readURL(thisInput, 5, ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'odt', 'rtf', 'xls', 'xlsx'], function(e, filename) {
                                                        $(thisInput).closest('.button-row').find('.file-name').html('<span class="text-decoration-underline padding-right-10 inline-block">'+filename+'</span><a href="javascript:void(0);" class="remove-file inline-block">×</a>');

                                                        $('.remove-file').unbind().click(function() {
                                                            $(this).closest('.button-row').find('input[type="file"]').val('');
                                                            $(this).closest('.button-row').find('.file-name').html('');
                                                        });
                                                    });
                                                }, 'bright-blue-white-btn');

                                                //ADD CUSTOM EVENTS ON ENTER OR SPACE CLICK FOR accessibility
                                                $('.bootbox.media-inquries #media-package button').keypress(function (event) {
                                                    if (event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32) {
                                                        document.getElementById('file-media-package').click();
                                                    }
                                                });
                                                $('.bootbox.media-inquries #individual-offer button').keypress(function (event) {
                                                    if (event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32) {
                                                        document.getElementById('file-individual-offer').click();
                                                    }
                                                });
                                            }
                                        });

                                        $('.bootbox.media-inquries form').on('submit', async function (event) {
                                            event.preventDefault();
                                            var this_form_native = this;
                                            var this_form = $(this_form_native);
                                            var errors = false;
                                            this_form.find('.error-handle').remove();

                                            var check_captcha_response = await checkCaptcha(this_form.find('#captcha').val().trim());

                                            for (var i = 0, len = this_form.find('.required').length; i < len; i+=1) {
                                                if (this_form.find('.required').eq(i).val().trim() == '') {
                                                    customErrorHandle(this_form.find('.required').eq(i).closest('.field-parent'), 'This field is required.');
                                                    errors = true;
                                                } else if (this_form.find('.required').eq(i).attr('name') == 'email' && !basic.validateEmail(this_form.find('.required').eq(i).val().trim())) {
                                                    customErrorHandle(this_form.find('.required').eq(i).closest('.field-parent'), 'Please use valid email address.');
                                                    errors = true;
                                                } else if (this_form.find('.required').eq(i).attr('name') == 'captcha' && check_captcha_response.error) {
                                                    customErrorHandle(this_form.find('.required').eq(i).closest('.field-parent'), 'Please enter correct captcha.');
                                                    errors = true;
                                                }
                                            }

                                            if (this_form.find('select.required-select').val().trim() == '') {
                                                customErrorHandle(this_form.find('select.required-select').closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            }

                                            if (!this_form.find('#privacy-policy').is(':checked')) {
                                                customErrorHandle(this_form.find('#privacy-policy').closest('.field-parent'), this_form.find('#privacy-policy').closest('.field-parent').attr('data-valid-message'));
                                                errors = true;
                                            }

                                            if (!errors) {
                                                this_form_native.submit();
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            },
            howToCreateWallet: function() {
                if ($('body').hasClass('how-to-create-wallet')) {
                    var wallet_video_time_watched = 0;
                    var wallet_video_timer;

                    $('video.wallet-instructions-video').on('play', function () {
                        wallet_video_timer = setInterval(function () {
                            wallet_video_time_watched += 1;
                        }, 1000);
                    });

                    $('video.wallet-instructions-video').on('pause', function () {
                        clearInterval(wallet_video_timer);
                        projectData.events.fireGoogleAnalyticsEvent('Video', 'Play', 'How to Create a Wallet Demo', wallet_video_time_watched);
                    });

                    if ($('.section-wallet-questions .question').length > 0) {
                        $('.section-wallet-questions .question').click(function () {
                            $(this).toggleClass('active');
                            $(this).closest('li').find('.question-content').toggle(300);
                        });
                    }
                }
            },
            partnerNetwork: function() {
                if ($('body').hasClass('partner-network')) {
                    // PARTNER NETWORK
                    initMap();
                }
            },
            berlinRoundtable: function() {
                if ($('body').hasClass('berlin-roundtable')) {
                    // BERLIN ROUNDTABLE

                    $(document).on('click', '.reserve-your-spot', function() {
                        $('html, body').animate({'scrollTop': $('.reserve-your-spot-form').offset().top }, 300);
                    });

                    $('select[name="company-profile"]').on('change', function() {
                        if ($(this).find('option:selected').val() == 'Other:') {
                            $('.camping-select-result').html('<div class="padding-bottom-20 field-parent"><textarea id="please-specify" name="please-specify" placeholder="Please specify" rows="3" maxlength="3000" class="required form-field"></textarea></div>');
                        } else {
                            $('.camping-select-result').html('');
                        }
                    });

                    var init_form = true;
                    $('form.reserve-your-spot-form').on('submit', async function(event) {
                        var this_form = $(this);
                        event.preventDefault();
                        if (init_form) {
                            //clear prev errors
                            if (this_form.find('.error-handle').length) {
                                this_form.find('.error-handle').remove();
                            }

                            var form_fields = this_form.find('.form-field.required');
                            var submit_form = true;
                            for (var i = 0, len = form_fields.length; i < len; i += 1) {
                                if (form_fields.eq(i).is('select')) {
                                    if (form_fields.eq(i).val() == 'disabled') {
                                        customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Please choose from list.');
                                        submit_form = false;
                                    }
                                } else {
                                    if (form_fields.eq(i).attr('type') == 'email' && !basic.validateEmail(form_fields.eq(i).val().trim())) {
                                        customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Please use valid email address.');
                                        submit_form = false;
                                    }

                                    if (form_fields.eq(i).val().trim() == '') {
                                        customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'This field is required.');
                                        submit_form = false;
                                    }
                                }
                            }

                            var check_captcha_response = await checkCaptcha(this_form.find('#register-captcha').val().trim());
                            if (check_captcha_response.error) {
                                customErrorHandle(this_form.find('#register-captcha').closest('.field-parent'), 'Please enter correct captcha.');
                                submit_form = false;
                            }

                            if (submit_form && init_form) {
                                init_form = false;
                                projectData.general_logic.data.showLoader();
                                setTimeout(async function() {
                                    $.ajax({
                                        type: 'POST',
                                        url: '/submit-berlin-roundtable-form',
                                        dataType: 'json',
                                        data: this_form.serialize(),
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        success: function (response) {
                                            if (response.success) {
                                                init_form = true;
                                                basic.showAlert(response.success);
                                                $('form.reserve-your-spot-form input.required, form.reserve-your-spot-form textarea.required').val('');
                                                $('.refresh-captcha').click();
                                                projectData.general_logic.data.hideLoader();
                                            }
                                        }
                                    });
                                }, 1000);
                            }
                        }
                    });

                    if ($('.attendees-slider').length) {
                        $('.attendees-slider').slick({
                            slidesToShow: 1,
                            infinite: true,
                            arrows: true,
                            dots: false
                        });
                    }
                }
            }
        }
    },
    general_logic: {
        not_logged_in: function() {
            projectData.general_logic.data.gateway();
            projectData.general_logic.data.cookie();
        },
        logged_in: function() {
            projectData.general_logic.data.miniHub();
            projectData.general_logic.data.cookie();
        },
        data: {
            gateway: function() {
                dcnGateway.init({
                    'platform': 'dentacoin',
                    /*'environment' : 'staging',*/
                    'forgotten_password_link': 'https://account.dentacoin.com/forgotten-password'
                });

                $(document).on('dentistAuthSuccessResponse', async function (event) {
                    console.log('dentistAuthSuccessResponse');
                    window.location.href = window.location.href + '?cross-login=true';
                });

                $(document).on('patientAuthSuccessResponse', async function (event) {
                    console.log('patientAuthSuccessResponse');
                    window.location.href = window.location.href + '?cross-login=true';
                });
            },
            cookie: function() {
                if (typeof(dcnCookie) != undefined) {
                    dcnCookie.init({
                        'google_app_id': 'UA-97167262-1',
                        'fb_app_id': '2366034370318681'
                    });
                }
            },
            showLoader: function() {
                $('.response-layer').show();
            },
            hideLoader: function() {
                $('.response-layer').hide();
            },
            handlePushStateRedirects: function(event) {
                if (window.location.href.includes('users')) {
                    window.location.href = HOME_URL + '/users';
                } else if (window.location.href.includes('dentists')) {
                    window.location.href = HOME_URL + '/dentists';
                } else if (window.location.href.includes('traders')) {
                    window.location.href = HOME_URL + '/traders';
                } else if (window.location.href.includes(HOME_URL)) {
                    window.location.href = HOME_URL;
                }
            },
            miniHub: function() {
                console.log('miniHub');
                var miniHubParams = {
                    'element_id_to_bind': 'header-avatar',
                    'platform': 'dentacoin',
                    'log_out_link': 'https://dentacoin.com/user-logout'
                };

                if ($('body').hasClass('logged-patient')) {
                    miniHubParams.type_hub = 'mini-hub-patients';
                    if ($('body').hasClass('home')) {
                        miniHubParams.without_apps = true;
                    }
                } else if ($('body').hasClass('logged-dentist')) {
                    miniHubParams.type_hub = 'mini-hub-dentists';
                    if ($('body').hasClass('home')) {
                        miniHubParams.without_apps = true;
                    }
                }

                dcnHub.initMiniHub(miniHubParams);
            },
            videoExpressionsSlider: function(type) {
                if ($('.module.video-expressions-slider[data-type="'+type+'"]').length) {
                    // add youtube API
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    $('.module.video-expressions-slider[data-type="'+type+'"]').slick({
                        slidesToShow: 3,
                        responsive: [
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    });

                    var xsScreen = false;
                    $('body').addClass('overflow-hidden');
                    if ($(window).width() < 767) {
                        xsScreen = true;
                    }
                    $('body').removeClass('overflow-hidden');

                    if (!xsScreen) {
                        $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').next().next().addClass('after-middle');
                        $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').next().addClass('middle-slide');
                        $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').addClass('before-middle');
                    }

                    var clearIframesOnSlickChange = true;
                    $('.module.video-expressions-slider[data-type="'+type+'"]').on('afterChange', function(event, slick, currentSlide, nextSlide) {

                        if ($('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').length) {
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                            $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');
                        }

                        if (!xsScreen) {
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-slide').removeClass('middle-slide after-middle before-middle');
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-current').next().next().addClass('after-middle');
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-current').next().addClass('middle-slide');
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-current').addClass('before-middle');
                        }

                        if (clearIframesOnSlickChange) {
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                            $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');
                        } else {
                            clearIframesOnSlickChange = true;
                        }

                        if ($('.module.video-expressions-slider[data-type="'+type+'"] .slick-active.middle-slide').find('.youtube-play-button').attr('data-play') == 'true') {
                            playYTVideo($('.module.video-expressions-slider[data-type="'+type+'"] .slick-active.middle-slide').find('.youtube-play-button'), $('.module.video-expressions-slider[data-type="'+type+'"] .slick-active.middle-slide').attr('data-video-id'));
                            $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').removeAttr('data-play');
                        }
                    });

                    $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').click(function() {
                        $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').removeAttr('data-play');
                        $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button[data-id="'+$(this).attr('data-id')+'"]').attr('data-play', 'true');
                        var videoId = $(this).closest('.single-slide').attr('data-video-id');
                        clearIframesOnSlickChange = false;

                        $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                        $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');

                        if (xsScreen) {
                            playYTVideo($('.middle-slide .youtube-play-button'), videoId);
                        } else {
                            if ($(this).closest('.slick-slide').hasClass('middle-slide')) {
                                // play video
                                playYTVideo($('.middle-slide .youtube-play-button'), videoId);
                            } else {
                                // make slide active and play video
                                $('.module.video-expressions-slider[data-type="'+type+'"]').slick('slickGoTo', $(this).closest('.slick-slide').prev().attr('data-slick-index'));
                                // playYTVideo($('.middle-slide .youtube-play-button'));
                            }
                        }
                    });

                    function playYTVideo(el, videoId) {
                        el.closest('.slide-wrapper').append('<div id="main-video-player"></div>');
                        el.closest('.single-slide').find('.video-thumb').addClass('visibility-hidden');

                        var playerEvents = {};

                        playerEvents.onReady = onPlayerReady;

                        new YT.Player('main-video-player', {
                            videoId: videoId,
                            events: playerEvents
                        });

                        function onPlayerReady(event) {
                            if (!xsScreen) {
                                $('iframe#main-video-player').height($('iframe#main-video-player').closest('.single-slide').find('.video-thumb figure img').height());
                            }
                            event.target.playVideo();
                        }
                    }
                }
            },
            userExpressionsSlider(type) {
                if ($('.user-expressions-slider[data-type="'+type+'"]').length) {
                    $('.user-expressions-slider[data-type="'+type+'"]').slick({
                        slidesToShow: 3,
                        infinite: true,
                        dots: true,
                        arrows: false,
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 1800,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    });

                    var xsScreen = false;
                    $('body').addClass('overflow-hidden');
                    if ($(window).width() < 767) {
                        xsScreen = true;
                    }
                    $('body').removeClass('overflow-hidden');

                    if (!xsScreen) {
                        setupUserExpressionsSlidesSameHeight();

                        $('.user-expressions-slider[data-type="'+type+'"]').on('afterChange', function(event, slick, currentSlide, nextSlide) {
                            $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active .user-expression-text').outerHeight('auto');

                            setupUserExpressionsSlidesSameHeight();
                        });

                        function setupUserExpressionsSlidesSameHeight() {
                            var height = 0;
                            for (var i = 0, len = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').length; i < len; i+=1) {
                                if ($('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).find('.user-expression-text').outerHeight() > height) {
                                    height = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).find('.user-expression-text').outerHeight();
                                }
                            }

                            $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active .user-expression-text').animate({height: height}, 300);

                            // update slick list height
                            var slickListHeight = 0;
                            for (var i = 0, len = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').length; i < len; i+=1) {
                                if ($('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).outerHeight() > slickListHeight) {
                                    slickListHeight = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).outerHeight();
                                }
                            }
                            $('.user-expressions-slider[data-type="'+type+'"] .slick-list').animate({height: slickListHeight}, 500);
                        }
                    }
                }
            },
            async dentacoinGoogleMap() {
                var mapHtml = await projectData.requests.getMapHtml();
                if (mapHtml.success) {
                    $('.section-google-map.module .map-container').html(mapHtml.data);

                    $('.selectpicker').selectpicker();

                    var locationsOnInit = JSON.parse($('.google-map-box').attr('data-locations'));
                    var lastMapData = {
                        map_locations: locationsOnInit,
                        initialLat: undefined,
                        initialLng: undefined,
                        initialZoom: undefined,
                        filter_country: undefined,
                        location_id: undefined,
                        location_source: undefined,
                        categories: $('.selectpicker.location-types').val()
                    };
                    initMap(locationsOnInit, undefined, undefined, undefined, undefined, undefined, undefined, $('.selectpicker.location-types').val());

                    basic.initCustomCheckboxes('.google-map-and-bottom-filters', 'append');

                    $('.show-locations-list').click(function() {
                        if (!$(this).parent().hasClass('list-shown')) {
                            $('.hide-on-map-open').addClass('hide');
                            $(this).parent().addClass('list-shown');
                            $(this).addClass('with-map-pin').removeClass('with-list-icon').html(' GO BACK TO MAP');

                            $('.subpages-sticky-nav').addClass('hide');
                            $('.picker-and-map .google-map-box').hide();
                            $('.picker-and-map .left-picker').fadeIn(500);
                            $('.locations-list .invite-text').fadeIn();

                            $('body').addClass('overflow-hidden');
                            if ($(window).width() < 992) {
                                // scroll to open location everytime on list showing, because the scrolling doesn't work when element is with display none
                                if ($('.single-location.toggled').length) {
                                    $('.results-list').scrollTop(0);
                                    $('.results-list').scrollTop($('.single-location.toggled').position().top - 15);
                                }
                            }
                            $('body').removeClass('overflow-hidden');
                        } else {
                            $('.hide-on-map-open').removeClass('hide');
                            $(this).removeClass('with-map-pin').addClass('with-list-icon').html(' SEE RESULTS IN LIST');
                            $(this).parent().removeClass('list-shown');

                            $('.subpages-sticky-nav').removeClass('hide');
                            $('.picker-and-map .google-map-box').fadeIn(500);
                            $('.picker-and-map .left-picker').hide();
                            $('.locations-list .invite-text').hide();

                            $('html, body').animate({'scrollTop': $('.section-google-map.module').offset().top }, 300);
                        }

                        $('html, body').animate({'scrollTop': $('.map-container').offset().top }, 300);
                    });

                    function dynamicSort(property) {
                        var sortOrder = 1;
                        if(property[0] === "-") {
                            sortOrder = -1;
                            property = property.substr(1);
                        }
                        return function (a,b) {
                            /* next line works with strings and numbers,
                             * and you may want to customize it to your needs
                             */
                            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                            return result * sortOrder;
                        }
                    }

                    var locationsCountsArr = [];

                    // set continent count BY adding the countries locations for THIS continent
                    for (var i = 0, len = $('.single-continent').length; i < len; i+=1) {
                        var currentContinentLocationsCount = 0;
                        for (var y = 0, leny = $('.single-continent').eq(i).find('.country-list-parent').length; y < leny; y+=1) {
                            if ($('.single-continent').eq(i).find('.country-list-parent').eq(y).find('[data-locations-count]').length) {
                                currentContinentLocationsCount += parseInt($('.single-continent').eq(i).find('.country-list-parent').eq(y).find('[data-locations-count]').attr('data-locations-count'));
                            }
                        }
                        $('.single-continent').eq(i).find('> a').append('<span class="lato-bold inline-block locations-count fs-18 fs-xs-14">('+currentContinentLocationsCount+' locations)</span>');

                        locationsCountsArr.push({'count' : currentContinentLocationsCount, 'location_id' : $('.single-continent').eq(i).find('> a').attr('data-continent-id')});
                    }

                    // reorder the continents list by count from bigger to smallest count
                    var orderedLocationsCountsArr = locationsCountsArr.sort(dynamicSort('count'));
                    orderedLocationsCountsArr.reverse();
                    var reorderedCountriesListHtml = '';
                    for (var i = 0, len = orderedLocationsCountsArr.length; i < len; i+=1) {
                        reorderedCountriesListHtml += $('.continent-name[data-continent-id='+orderedLocationsCountsArr[i].location_id+']').parent().get(0).outerHTML;
                    }
                    $('.continents-list ul').html(reorderedCountriesListHtml);

                    $('body').addClass('overflow-hidden');
                    if ($(window).width() > 992) {
                        $('.results-list').css({'max-height' : ($('.google-map-and-bottom-filters').height() - $('.left-picker .inner-gray-line').height()) + 'px'});
                    }
                    $('body').removeClass('overflow-hidden');

                    $('.selectpicker.location-types').on('change', function() {
                        var thisValue = $(this).val();

                        // dont allow users to filter only category-5
                        if (thisValue.includes('category-5') && !thisValue.includes('category-1')) {
                            thisValue.push('category-1');
                        }

                        $('.right-side-filters input[type="checkbox"]').prop('checked', true);
                        updateTopLocationsSelectOnBottomFilterChange(thisValue);

                        // update bottom filter checkboxes
                        $('.right-side-filters input[type="checkbox"]').prop('checked', false);
                        $('.right-side-filters .custom-checkbox').html('');
                        if (thisValue.length > 0) {
                            for (var i = 0; i < thisValue.length; i += 1) {
                                if ($('.right-side-filters input[type="checkbox"]#' + thisValue[i]).length) {
                                    $('.right-side-filters input[type="checkbox"]#' + thisValue[i]).prop('checked', true);
                                    $('.right-side-filters input[type="checkbox"]#' + thisValue[i]).parent().find('.custom-checkbox').html('✓');
                                }
                            }
                        }
                    });

                    // this event is fired in 2 cases:
                    // - when someone click a marker pin right on the map
                    // - when someone select location right from the select dropdown with locations
                    $(document).on('showLocationInList', async function (event) {
                        if (event.response_data) {
                            console.log(event.response_data, 'event.response_data');

                            var listAlreadyLoaded = false;
                            var disallowAlreadyLoaded = false;
                            for (var i = 0, len = $('.locations-category-list').length; i < len; i+=1) {
                                if ($('.locations-category-list').eq(i).find('li').length > 0) {
                                    listAlreadyLoaded = true;
                                    break;
                                }
                            }

                            if (event.response_data.disallowAlreadyLoaded) {
                                disallowAlreadyLoaded = true;
                            }

                            // if trying to request location which is visible on the map, but from different country and not visible in the results list
                            if ($('.country-list-parent.open-item > a').length && event.response_data.country_code != $('.country-list-parent.open-item > a').attr('data-country-code')) {
                                disallowAlreadyLoaded = true;
                            }

                            if (listAlreadyLoaded && !disallowAlreadyLoaded) {
                                $('.locations-list .single-location').removeClass('toggled');
                                $('.results-list').scrollTop(0);

                                if (event.response_data.id && event.response_data.source) {
                                    $('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').addClass('toggled');
                                    $('.results-list').scrollTop($('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').position().top - 15);
                                }
                            } else {
                                // close countries
                                $('.results-list .shown').removeClass('shown');
                                $('.results-list .countries-nav').addClass('shown');
                                $('.countries-list .country-list-parent').removeClass('hide open-item');

                                // close continents
                                $('.continents-list > ul > li').removeClass('hide open-item');
                                $('.results-list .shown').removeClass('shown');
                                $('.results-list .continents-nav').addClass('shown');

                                for (var i = 0, len = $('.continents-list .single-continent').length; i < len; i+=1) {
                                    if (JSON.parse($('.continents-list .single-continent').eq(i).find('> a').attr('data-country-codes')).includes(event.response_data.country_code)) {
                                        $('.continents-list .single-continent').addClass('hide');
                                        $('.continents-list .single-continent').eq(i).addClass('open-item');

                                        for (var y = 0, leny = $('.single-continent.open-item .countries-list li').length; y < leny; y+=1) {
                                            if ($('.single-continent.open-item .countries-list li').eq(y).find('> a').attr('data-country-code') == event.response_data.country_code) {
                                                $('.continents-list .single-continent').eq(i).find('.country-list-parent').addClass('hide');
                                                $('.countries-list a[data-country-code="'+event.response_data.country_code+'"]').closest('.country-list-parent').addClass('open-time');

                                                var city = undefined;
                                                if (event.response_data.city) {
                                                    city = event.response_data.city;
                                                }

                                                lastMapData = {
                                                    map_locations: locationsOnInit,
                                                    initialLat: event.response_data.lat,
                                                    initialLng: event.response_data.lng,
                                                    initialZoom: 15,
                                                    filter_country: event.response_data.country_code,
                                                    location_id: undefined,
                                                    location_source: undefined,
                                                    categories: $('.selectpicker.location-types').val()
                                                };

                                                if (event.response_data.id && event.response_data.source && event.response_data.content) {
                                                    initMap(locationsOnInit, event.response_data.lat, event.response_data.lng, 15, event.response_data.country_code, event.response_data.id, event.response_data.source, $('.selectpicker.location-types').val(), true, city, event.response_data.content);
                                                } else {
                                                    initMap(locationsOnInit, event.response_data.lat, event.response_data.lng, 15, event.response_data.country_code, undefined, undefined, $('.selectpicker.location-types').val(), true, city);
                                                }

                                                await buildCountryLocationsList($('.countries-list a[data-country-code="'+event.response_data.country_code+'"]').parent().find('.locations-category-list'), event.response_data.country_code, $('.countries-list a[data-country-code="'+event.response_data.country_code+'"]'));

                                                $('.locations-list .single-location').removeClass('toggled');

                                                $('.results-list').scrollTop(0);

                                                if (event.response_data.id && event.response_data.source) {
                                                    $('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').addClass('toggled');
                                                    $('.results-list').scrollTop($('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').position().top - 15);
                                                }
                                                break;
                                            }
                                        }

                                        break;
                                    }
                                }
                            }
                        }
                    });

                    $('.selectpicker.locations').on('change', function() {
                        var thisValue = $(this).val().trim();

                        if ($(this).find('option:selected').hasClass('option-type')) {
                            $.event.trigger({
                                type: 'showLocationInList',
                                time: new Date(),
                                response_data: {
                                    'country_code' : $(this).find('option:selected').attr('data-country-code'),
                                    'id' : $(this).find('option:selected').attr('data-id'),
                                    'source' : thisValue,
                                    'zoom' : 15,
                                    'lat' : $(this).find('option:selected').attr('data-lat'),
                                    'lng' : $(this).find('option:selected').attr('data-lng'),
                                    'disallowAlreadyLoaded' : true,
                                    'content' : '<div style="font-size: 20px;">'+$(this).find('option:selected').html().trim()+'</div>'
                                }
                            });
                        } else {
                            var eventData = {
                                'country_code' : $(this).find('option:selected').attr('data-country-code'),
                                'city' : $(this).find('option:selected').attr('data-city'),
                                'zoom' : 5,
                                'disallowAlreadyLoaded' : true
                            };

                            if ($(this).find('option:selected').attr('data-centroid-lat') != undefined) {
                                eventData.lat = $(this).find('option:selected').attr('data-centroid-lat');
                            }
                            if ($(this).find('option:selected').attr('data-centroid-lng') != undefined) {
                                eventData.lng = $(this).find('option:selected').attr('data-centroid-lng');
                            }

                            $.event.trigger({
                                type: 'showLocationInList',
                                time: new Date(),
                                response_data: eventData
                            });
                        }
                    });

                    $('.locations-splitted-by-category .bs-searchbox input').on('change keyup focusout paste', function() {
                        if ($(this).val().trim() != '') {
                            $(this).closest('.dropdown-menu').find('.inner').show();
                        } else {
                            $(this).closest('.dropdown-menu').find('.inner').hide();
                        }
                    });

                    // set continents locations
                    var continentCodes = {};
                    for (var i = 0, len = $('.continents-list > ul > li > a').length; i < len; i+=1) {
                        continentCodes[$('.continents-list > ul > li > a').eq(i).attr('data-continent-id')] = $('.continents-list > ul > li > a').eq(i).attr('data-country-codes');
                    }

                    if (Object.keys(continentCodes).length > 0) {
                        var continentLocationsCount = await projectData.requests.getMapData({action: 'get-continent-locations-count', data: continentCodes});
                        if (continentLocationsCount.success) {
                            Object.keys(continentLocationsCount.data).forEach(key => {
                                $('.continent-name[data-country-codes="'+key+'"]').append('<span class="locations-count lato-bold fs-20">('+continentLocationsCount.data[key]+' locations)</span>');
                            });
                        }
                    }

                    // =================== CONTINENTS LOGIC ====================
                    $('.continents-list > ul > li > a').click(async function() {
                        // MAKE REQUEST TO QUERY ALL LOCATIONS ONLY FOR THIS CONTINENT

                        $('.continents-list > ul > li').addClass('hide');

                        $(this).closest('li').addClass('open-item');
                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .countries-nav').addClass('shown');

                        $('.dentacoin-stats-category-label span').html('in ' + $(this).find('.element-name').html());

                        $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-continents"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+$(this).find('.element-name').html().trim()).attr('data-last-continent', $(this).find('.element-name').html().trim()+'</a>');

                        $('.results-list').scrollTop(0);

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: undefined,
                            initialLng: undefined,
                            initialZoom: undefined,
                            filter_country: JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')),
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, undefined, undefined, undefined, JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')), undefined, undefined, $('.selectpicker.location-types').val(), true);

                        updateContinentData($(this).attr('data-country-codes'));
                    });

                    async function updateContinentData(codes) {
                        if (codes != undefined && basic.isJsonString(codes)) {
                            var continentCountriesCodes = codes;

                            // request to update the locations count in the gray header line
                            var currentContinentLocationsCount = await projectData.requests.getMapData({action: 'get-continent-stats', data: continentCountriesCodes});
                            if (currentContinentLocationsCount.success) {
                                $('.picker-and-map .picker-value').html('<span class="lato-black">'+currentContinentLocationsCount.data+'</span> Results').attr('data-last-continent', currentContinentLocationsCount.data);
                            }

                            // make request to update partners, non partners and users stats at the bottom
                            var combinedCountByMultipleCountry = await projectData.requests.getMapData({action: 'combined-count-by-multiple-country', data: continentCountriesCodes});
                            if (combinedCountByMultipleCountry.success) {
                                if ($('.changeable-stats .partners').length) {
                                    $('.changeable-stats .partners span').html(combinedCountByMultipleCountry.data['partners']);
                                    $('.changeable-stats .partners').attr('data-last-continent', combinedCountByMultipleCountry.data['partners']);
                                }
                                if ($('.changeable-stats .non-partners').length) {
                                    $('.changeable-stats .non-partners span').html(combinedCountByMultipleCountry.data['non_partners']);
                                    $('.changeable-stats .non-partners').attr('data-last-continent', combinedCountByMultipleCountry.data['non_partners'])
                                }
                                if ($('.changeable-stats .users').length) {
                                    $('.changeable-stats .users span').html(combinedCountByMultipleCountry.data['patients']);
                                    $('.changeable-stats .users').attr('data-last-continent', combinedCountByMultipleCountry.data['patients']);
                                }
                            }
                        }
                    }

                    $(document).on('click', '.go-back-to-continents', function() {
                        $('.continents-list > ul > li').removeClass('hide open-item');

                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .continents-nav').addClass('shown');

                        $('.dentacoin-stats-category-label span').html('Worldwide');
                        $('.picker-and-map .picker-label').html('Worldwide');

                        $('.results-list').scrollTop(0);

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: undefined,
                            initialLng: undefined,
                            initialZoom: undefined,
                            filter_country: undefined,
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, undefined, undefined, undefined, undefined, undefined, undefined, $('.selectpicker.location-types').val());

                        if ($('.picker-and-map .picker-value').attr('data-worldwide') != '') {
                            $('.picker-and-map .picker-value').html('<span class="lato-black">'+$('.picker-and-map .picker-value').attr('data-worldwide')+'</span> Results');
                        }

                        if ($('.changeable-stats .partners').length) {
                            $('.changeable-stats .partners span').html($('.changeable-stats .partners').attr('data-worldwide'));
                        }

                        if ($('.changeable-stats .non-partners').length) {
                            $('.changeable-stats .non-partners span').html($('.changeable-stats .non-partners').attr('data-worldwide'));
                        }

                        if ($('.changeable-stats .users').length) {
                            $('.changeable-stats .users span').html($('.changeable-stats .users').attr('data-worldwide'));
                        }
                    });
                    // =================== /CONTINENTS LOGIC ===================

                    // =================== COUNTRIES LOGIC ====================
                    async function buildCountryLocationsList(list, code, thisBtn) {
                        projectData.general_logic.data.showLoader();
                        var totalLocationsCountByCountry = 0;

                        // Partner Dental Practices
                        var currentCountryPartnersData = await projectData.requests.getMapData({action: 'all-partners-data-by-country', data: code});
                        if (currentCountryPartnersData.success && currentCountryPartnersData.data.length > 0) {
                            // checking if visibility allowed by bottom category filter
                            var iconClass = 'fa-minus-circle';
                            var parentElementClass = '';
                            if (!$('.right-side-filters #category-1').is(':checked') && !$('.right-side-filters #category-5').is(':checked')) {
                                iconClass = 'fa-plus-circle';
                                parentElementClass = 'closed';
                            }

                            var bindPartnersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button partners fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Partner Dental Practices</span></a><ul class="locations-list">';
                            for (var i = 0, len = currentCountryPartnersData.data.length; i < len; i+=1) {
                                bindPartnersCategoryHtml += buildSingleLocationTile(currentCountryPartnersData.data[i].avatar_url, currentCountryPartnersData.data[i].name, currentCountryPartnersData.data[i].address, currentCountryPartnersData.data[i].is_partner, currentCountryPartnersData.data[i].city_name, currentCountryPartnersData.data[i].phone, currentCountryPartnersData.data[i].website, currentCountryPartnersData.data[i].top_dentist_month, currentCountryPartnersData.data[i].avg_rating, currentCountryPartnersData.data[i].ratings, currentCountryPartnersData.data[i].trp_public_profile_link, thisBtn.find('.element-name').html(), currentCountryPartnersData.data[i].id, 'core-db', currentCountryPartnersData.data[i].lat, currentCountryPartnersData.data[i].lon);
                            }

                            bindPartnersCategoryHtml+='</ul></li>';
                            list.append(bindPartnersCategoryHtml);
                        }

                        // Partner Dental Labs, Partner Dental Suppliers, Other Industry Partners
                        var getLabsSuppliersAndIndustryPartnersData = await projectData.requests.getLabsSuppliersAndIndustryPartners({'country-code' : code});
                        if (getLabsSuppliersAndIndustryPartnersData.success) {
                            // Partner Dental Labs
                            if (getLabsSuppliersAndIndustryPartnersData.data.labs.length > 0) {
                                // checking if visibility allowed by bottom category filter
                                var iconClass = 'fa-minus-circle';
                                var parentElementClass = '';
                                if (!$('.right-side-filters #category-2').is(':checked')) {
                                    iconClass = 'fa-plus-circle';
                                    parentElementClass = 'closed';
                                }

                                totalLocationsCountByCountry += getLabsSuppliersAndIndustryPartnersData.data.labs.length;
                                var bindLabsCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button labs fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Partner Dental Labs</span></a><ul class="locations-list">';
                                for (var i = 0, len = getLabsSuppliersAndIndustryPartnersData.data.labs.length; i < len; i+=1) {
                                    bindLabsCategoryHtml += buildSingleLocationTile('//dentacoin.com/assets/uploads/' + getLabsSuppliersAndIndustryPartnersData.data.labs[i].clinic_media, getLabsSuppliersAndIndustryPartnersData.data.labs[i].clinic_name, getLabsSuppliersAndIndustryPartnersData.data.labs[i].address, null, null, null, null, getLabsSuppliersAndIndustryPartnersData.data.labs[i].clinic_link, null, null, null, thisBtn.find('.element-name').html(), getLabsSuppliersAndIndustryPartnersData.data.labs[i].id, 'dentacoin-db', getLabsSuppliersAndIndustryPartnersData.data.labs[i].lat, getLabsSuppliersAndIndustryPartnersData.data.labs[i].lng);
                                }

                                bindLabsCategoryHtml+='</ul></li>';
                                list.append(bindLabsCategoryHtml);
                            }

                            // Partner Dental Suppliers
                            if (getLabsSuppliersAndIndustryPartnersData.data.suppliers.length > 0) {
                                // checking if visibility allowed by bottom category filter
                                var iconClass = 'fa-minus-circle';
                                var parentElementClass = '';
                                if (!$('.right-side-filters #category-3').is(':checked')) {
                                    iconClass = 'fa-plus-circle';
                                    parentElementClass = 'closed';
                                }

                                totalLocationsCountByCountry += getLabsSuppliersAndIndustryPartnersData.data.suppliers.length;
                                var bindSuppliersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button suppliers fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Partner Dental Suppliers</span></a><ul class="locations-list">';
                                for (var i = 0, len = getLabsSuppliersAndIndustryPartnersData.data.suppliers.length; i < len; i+=1) {
                                    bindSuppliersCategoryHtml += buildSingleLocationTile('//dentacoin.com/assets/uploads/' + getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].clinic_media, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].clinic_name, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].address, null, null, null, null, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].clinic_link, null, null, null, thisBtn.find('.element-name').html(), getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].id, 'dentacoin-db', getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].lat, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].lng);
                                }

                                bindSuppliersCategoryHtml+='</ul></li>';
                                list.append(bindSuppliersCategoryHtml);
                            }

                            // Other Industry Partners
                            if (getLabsSuppliersAndIndustryPartnersData.data.industryPartners.length > 0) {
                                // checking if visibility allowed by bottom category filter
                                var iconClass = 'fa-minus-circle';
                                var parentElementClass = '';
                                if (!$('.right-side-filters #category-4').is(':checked')) {
                                    iconClass = 'fa-plus-circle';
                                    parentElementClass = 'closed';
                                }

                                totalLocationsCountByCountry += getLabsSuppliersAndIndustryPartnersData.data.industryPartners.length;
                                var bindIndustryPartnersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button industryPartners fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Other Industry Partners</span></a><ul class="locations-list">';
                                for (var i = 0, len = getLabsSuppliersAndIndustryPartnersData.data.industryPartners.length; i < len; i+=1) {
                                    bindIndustryPartnersCategoryHtml += buildSingleLocationTile('//dentacoin.com/assets/uploads/' + getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].clinic_media, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].clinic_name, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].address, null, null, null, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].clinic_link, null, null, null, null, thisBtn.find('.element-name').html(), getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].id, 'dentacoin-db', getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].lat, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].lng);
                                }

                                bindIndustryPartnersCategoryHtml+='</ul></li>';
                                list.append(bindIndustryPartnersCategoryHtml);
                            }
                        }

                        // All Registered Dental Practices
                        var currentCountryNonPartnersData = await projectData.requests.getMapData({action: 'all-non-partners-data-by-country', data: code});
                        if (currentCountryNonPartnersData.success && currentCountryNonPartnersData.data.length > 0) {
                            // checking if visibility allowed by bottom category filter
                            var iconClass = 'fa-minus-circle';
                            var parentElementClass = '';
                            if (!$('.right-side-filters #category-5').is(':checked')) {
                                iconClass = 'fa-plus-circle';
                                parentElementClass = 'closed';
                            }

                            var bindNonPartnersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button non-partners fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> All Registered Dental Practices</span></a><ul class="locations-list">';
                            for (var i = 0, len = currentCountryNonPartnersData.data.length; i < len; i+=1) {
                                bindNonPartnersCategoryHtml += buildSingleLocationTile(currentCountryNonPartnersData.data[i].avatar_url, currentCountryNonPartnersData.data[i].name, currentCountryNonPartnersData.data[i].address, currentCountryNonPartnersData.data[i].is_partner, currentCountryNonPartnersData.data[i].city_name, currentCountryNonPartnersData.data[i].phone, currentCountryNonPartnersData.data[i].website, currentCountryNonPartnersData.data[i].top_dentist_month, currentCountryNonPartnersData.data[i].avg_rating, currentCountryNonPartnersData.data[i].ratings, currentCountryNonPartnersData.data[i].trp_public_profile_link, thisBtn.find('.element-name').html(), currentCountryNonPartnersData.data[i].id, 'core-db', currentCountryNonPartnersData.data[i].lat, currentCountryNonPartnersData.data[i].lon);
                            }

                            bindNonPartnersCategoryHtml+='</ul></li>';
                            list.append(bindNonPartnersCategoryHtml);
                        }

                        list.append('<li><div class="invite-text padding-left-15 padding-right-15 padding-top-15 padding-bottom-25"><div class="color-white lato-black fs-28 fs-sm-22 fs-xs-20 padding-bottom-15">KNOW A GREAT DENTIST, BUT IT’S NOT ON OUR MAP?</div><div><a href="https://reviews.dentacoin.com/?popup=invite-new-dentist-popup" target="_blank" class="bright-blue-white-btn with-border fs-xs-16">INVITE DENTIST</a></div></div></li>');

                        // make request to select all locations DATA for this country FOR THE MAP
                        var currentCountryLocationsData = await projectData.requests.getMapData({action: 'all-partners-and-non-partners-data-by-country', data: code});
                        if (currentCountryLocationsData.success) {
                            totalLocationsCountByCountry += currentCountryLocationsData.data.length;

                            $('.dentacoin-stats-category-label span').html('in ' + thisBtn.find('.element-name').html());
                            $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-countries"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+thisBtn.find('.element-name').html().trim()+'</a>');
                            $('.picker-and-map .picker-value').html('<span class="lato-black">'+totalLocationsCountByCountry+'</span> Results');

                            for (var i = 0, len = currentCountryLocationsData.data.length; i < len; i+=1) {
                                // console.log(currentCountryLocationsData.data[i], 'THIS WILL BE USED TO BE SHOWN ON THE MAP');
                            }
                        }

                        $('.results-list').scrollTop(0);

                        if (thisBtn.parent().find('.locations-category-list li').length == 0) {
                            thisBtn.parent().find('.locations-category-list').html('<div class="fs-18 padding-top-20 padding-bottom-20 text-center">No locations found.</div>');
                        } else {
                            // toggle category button hide/ show logic
                            $('.locations-category-list .category-toggle-button').click(function() {
                                $(this).closest('li').toggleClass('closed');

                                if ($(this).find('i').hasClass('fa-minus-circle')) {
                                    $(this).find('i').removeClass('fa-minus-circle').addClass('fa-plus-circle');

                                    if ($(this).hasClass('partners')) {
                                        // uncheck category-1
                                        updateTopAndBottomLocationTypesFilters('category-1', false);
                                    } else if ($(this).hasClass('labs')) {
                                        // check category-2
                                        updateTopAndBottomLocationTypesFilters('category-2', false);
                                    } else if ($(this).hasClass('suppliers')) {
                                        // check category-3
                                        updateTopAndBottomLocationTypesFilters('category-3', false);
                                    } else if ($(this).hasClass('industryPartners')) {
                                        // check category-4
                                        updateTopAndBottomLocationTypesFilters('category-4', false);
                                    } else if ($(this).hasClass('non_partners')) {
                                        // check category-5
                                        updateTopAndBottomLocationTypesFilters('category-5', false);
                                    }

                                    $('.selectpicker.location-types').selectpicker('refresh');
                                } else {
                                    $(this).find('i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                    if ($(this).hasClass('partners')) {
                                        // check category-1
                                        updateTopAndBottomLocationTypesFilters('category-1', true);
                                    } else if ($(this).hasClass('labs')) {
                                        // check category-2
                                        updateTopAndBottomLocationTypesFilters('category-2', true);
                                    } else if ($(this).hasClass('suppliers')) {
                                        // check category-3
                                        updateTopAndBottomLocationTypesFilters('category-3', true);
                                    } else if ($(this).hasClass('industryPartners')) {
                                        // check category-4
                                        updateTopAndBottomLocationTypesFilters('category-4', true);
                                    } else if ($(this).hasClass('non-partners')) {
                                        // check category-5
                                        updateTopAndBottomLocationTypesFilters('category-5', true);
                                    }

                                    $('.selectpicker.location-types').selectpicker('refresh');
                                }

                                // updating lastMapData categories
                                lastMapData.categories = $('.selectpicker.location-types').val();
                                initMap(lastMapData.map_locations, lastMapData.initialLat, lastMapData.initialLng, lastMapData.initialZoom, lastMapData.filter_country, lastMapData.location_id, lastMapData.location_source, lastMapData.categories, true);
                            });

                            function updateTopAndBottomLocationTypesFilters(category_id, bool) {
                                $('select.location-types option[value="'+category_id+'"]').prop('selected', bool);

                                $('.right-side-filters input[type="checkbox"]#'+category_id).prop('checked', bool);
                                if (bool) {
                                    $('.right-side-filters input[type="checkbox"]#'+category_id).parent().find('.custom-checkbox').html('✓');
                                } else {
                                    $('.right-side-filters input[type="checkbox"]#'+category_id).parent().find('.custom-checkbox').html('');
                                }
                            }
                        }

                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .locations-nav').addClass('shown');

                        $('.continents-list .single-continent .country-list-parent').addClass('hide');
                        thisBtn.parent().removeClass('hide').addClass('open-item');

                        // make request to select all partners COUNT for this country
                        var combinedCountByCountry = await projectData.requests.getMapData({action: 'combined-count-by-country', data: code});
                        if (combinedCountByCountry.success) {
                            if ($('.changeable-stats .partners').length) {
                                $('.changeable-stats .partners span').html(combinedCountByCountry.data['partners']);
                            }
                            if ($('.changeable-stats .non-partners').length) {
                                $('.changeable-stats .non-partners span').html(combinedCountByCountry.data['non_partners']);
                            }
                            if ($('.changeable-stats .users').length) {
                                $('.changeable-stats .users span').html(combinedCountByCountry.data['patients']);
                            }
                        }

                        projectData.general_logic.data.hideLoader();
                    }

                    // toggle bottom filter hide/ show logic
                    $('.right-side-filters input[type="checkbox"]').on('change', function() {
                        var thisCheckbox = $(this);
                        switch(thisCheckbox.attr('id')) {
                            case 'category-1':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-2':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-3':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-4':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-5':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());
                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                        }
                    });

                    function updateTopLocationsSelectOnBottomFilterChange(valuesArray) {
                        // refresh locations selectpicker
                        if (Object.keys(JSON.parse($('.locations-style').attr('data-groups-html'))).length > 0) {
                            $('select.selectpicker.locations').html('');
                            var newLocationsSelectHtml = '';
                            Object.keys(JSON.parse($('.locations-style').attr('data-groups-html'))).forEach(function(key,index) {
                                newLocationsSelectHtml += JSON.parse($('.locations-style').attr('data-groups-html'))[key];
                            });
                            $('select.selectpicker.locations').html('<option value="">Show All Locations</option>' + newLocationsSelectHtml);
                        }

                        if (valuesArray.length > 0) {
                            $('select.selectpicker.locations optgroup.optgroup-for-types').addClass('to-remove');

                            $('.category-toggle-button').parent().addClass('closed');
                            $('.category-toggle-button i').removeClass('fa-minus-circle').addClass('fa-plus-circle');

                            // filter
                            for (var i = 0, len = $('select.selectpicker.locations optgroup.optgroup-for-types').length; i < len; i+=1) {
                                for (var y = 0; y < valuesArray.length; y+=1) {
                                    if ($('select.selectpicker.locations optgroup.optgroup-for-types').eq(i).hasClass(valuesArray[y])) {
                                        $('select.selectpicker.locations optgroup.optgroup-for-types').eq(i).removeClass('to-remove');

                                        switch(valuesArray[y]) {
                                            case 'category-1':
                                                $('.category-toggle-button.partners').parent().removeClass('closed');
                                                $('.category-toggle-button.partners i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-2':
                                                $('.category-toggle-button.labs').parent().removeClass('closed');
                                                $('.category-toggle-button.labs i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-3':
                                                $('.category-toggle-button.suppliers').parent().removeClass('closed');
                                                $('.category-toggle-button.suppliers i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-4':
                                                $('.category-toggle-button.industryPartners').parent().removeClass('closed');
                                                $('.category-toggle-button.industryPartners i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-5':
                                                $('.category-toggle-button.non-partners').parent().removeClass('closed');
                                                $('.category-toggle-button.non-partners i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                        }
                                        break;
                                    }
                                }
                            }

                            $('select.selectpicker.locations optgroup.optgroup-for-types.to-remove').remove();
                        } else {
                            $('select.selectpicker.locations optgroup.optgroup-for-types').addClass('to-remove');
                        }

                        $('.selectpicker.locations').selectpicker('refresh');

                        // updating lastMapData categories
                        lastMapData.categories = $('.selectpicker.location-types').val();
                        initMap(lastMapData.map_locations, lastMapData.initialLat, lastMapData.initialLng, lastMapData.initialZoom, lastMapData.filter_country, lastMapData.location_id, lastMapData.location_source, lastMapData.categories, true);
                    }

                    $('.countries-list > li > a').click(async function() {
                        var thisBtn = $(this);
                        thisBtn.parent().find('.locations-category-list').html('');

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: thisBtn.attr('data-country-centroid-lat'),
                            initialLng: thisBtn.attr('data-country-centroid-lng'),
                            initialZoom: 6,
                            filter_country: $(this).attr('data-country-code'),
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, thisBtn.attr('data-country-centroid-lat'), thisBtn.attr('data-country-centroid-lng'), 5, $(this).attr('data-country-code'), undefined, undefined, $('.selectpicker.location-types').val(), true);

                        buildCountryLocationsList(thisBtn.parent().find('.locations-category-list'), $(this).attr('data-country-code'), thisBtn);
                    });

                    function buildSingleLocationTile(avatar_url, name, address, is_partner, city_name, phone, website, top_dentist_month, avg_rating, ratings, trp_public_profile_link, country, location_id, location_source, lat, lng) {
                        var partnerHtml = '';
                        if (is_partner) {
                            partnerHtml = '<div class="is-partner fs-14 lato-bold padding-top-5"><span>Partner</span></div>';
                        }

                        var trpStatsHtml = '<div class="trp-stats padding-top-5">';
                        if (avg_rating != undefined) {
                            trpStatsHtml += '<div class="stars inline-block margin-right-5"><div class="active-stars" style="width: '+avg_rating / 5 * 100+'%"></div></div>'
                        }

                        if (ratings != undefined && ratings != null) {
                            trpStatsHtml += ' <span class="inline-block fs-14 base-on-x-reviews">(based on '+ratings+' reviews)</span> ';
                        }

                        if (trp_public_profile_link != null && trp_public_profile_link != undefined) {
                            trpStatsHtml += ' <a href="'+trp_public_profile_link+'" target="_blank" class="fs-26 inline-block margin-left-5"><i class="fa fa-external-link" aria-hidden="true"></i></a>';
                        }

                        trpStatsHtml += '</div>';

                        var visibleAddress = '';
                        if (city_name != null && city_name != undefined) {
                            visibleAddress = city_name + ', ' + country;
                        } else {
                            visibleAddress = country;
                        }

                        var hiddenContent = '<div class="fs-16 hidden-content padding-top-5">';

                        // remove urls from the address, because some address are saved with urls in the DB
                        if (address != null && address != undefined) {
                            address = address.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                            hiddenContent += '<div><img src="/assets/images/map-results-location-pin.svg" alt="Location icon" class="width-100 max-width-20 inline-block"/> '+address+'</div>';
                        }

                        if (phone != null && phone != undefined) {
                            hiddenContent += '<div><img src="/assets/images/map-results-phone.svg" alt="Phone icon" class="width-100 max-width-20 inline-block"/> <a href="tel:'+phone+'">'+phone+'</a></div>';
                        }

                        if (website != null && website != undefined) {
                            hiddenContent += '<div><img src="/assets/images/map-results-website-icon.svg" alt="Website icon" class="width-100 max-width-20 inline-block"/> <a href="'+website+'" target="_blank">Visit website</a></div>';
                        }

                        if (top_dentist_month) {
                            hiddenContent += '<div><img src="/assets/images/top-dentists-badge.png" alt="Top dentist badge icon" class="width-100 max-width-20 inline-block"/> Top Dentist</div>';
                        }

                        hiddenContent += '</div>';

                        return '<li class="fs-0 single-location"><figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block"><img src="'+avatar_url+'" alt="Location logo" itemprop="contentUrl"/></figure><div class="right-location-content inline-block padding-left-10"><h3 class="fs-26 fs-xs-20 fs-sm-22 lato-black color-black">'+name+'</h3>'+trpStatsHtml+'<div class="fs-16 color-black padding-top-5 padding-bottom-5">'+visibleAddress+'</div>'+partnerHtml+hiddenContent+'<div class="text-right padding-top-10"><a href="javascript:void(0);" class="toggle-location-tile" data-location-id="'+location_id+'" data-location-source="'+location_source+'" data-lat="'+lat+'" data-lng="'+lng+'" data-name="'+name.replace(/"/g, "&quot;")+'"><img src="/assets/images/down-arrow.svg"/></a></div></div></li>';
                    }

                    // on location tile open and close
                    $(document).on('click', '.single-location', function() {
                        var arrowBtn = $(this).find('.toggle-location-tile');

                        for (var i = 0, len = $('.toggle-location-tile').length; i < len; i+=1) {
                            if (!$('.toggle-location-tile').eq(i).is(arrowBtn)) {
                                $('.toggle-location-tile').eq(i).closest('.single-location').removeClass('toggled');
                            }
                        }

                        $(this).toggleClass('toggled');

                        if ($(this).hasClass('toggled')) {
                            lastMapData = {
                                map_locations: locationsOnInit,
                                initialLat: arrowBtn.attr('data-lat'),
                                initialLng: arrowBtn.attr('data-lng'),
                                initialZoom: 15,
                                filter_country: undefined,
                                location_id: arrowBtn.attr('data-location-id'),
                                location_source: arrowBtn.attr('data-location-source'),
                                categories: $('.selectpicker.location-types').val()
                            };
                            initMap(locationsOnInit, arrowBtn.attr('data-lat'), arrowBtn.attr('data-lng'), 15, undefined, arrowBtn.attr('data-location-id'), arrowBtn.attr('data-location-source'), $('.selectpicker.location-types').val(), true, undefined, '<div style="font-size: 20px;">'+arrowBtn.attr('data-name')+'</div>');
                        } else {
                            lastMapData = {
                                map_locations: locationsOnInit,
                                initialLat: $('.country-list-parent.open-item > a').attr('data-country-centroid-lat'),
                                initialLng: $('.country-list-parent.open-item > a').attr('data-country-centroid-lng'),
                                initialZoom: 5,
                                filter_country: $('.country-list-parent.open-item > a').attr('data-country-code'),
                                location_id: undefined,
                                location_source: undefined,
                                categories: $('.selectpicker.location-types').val()
                            };
                            initMap(locationsOnInit, $('.country-list-parent.open-item > a').attr('data-country-centroid-lat'), $('.country-list-parent.open-item > a').attr('data-country-centroid-lng'), 5, $('.country-list-parent.open-item > a').attr('data-country-code'), undefined, undefined, $('.selectpicker.location-types').val(), true, undefined, '<div style="font-size: 20px;">'+arrowBtn.attr('data-name')+'</div>');
                        }
                    });

                    $(document).on('click', '.go-back-to-countries', function() {
                        if ($('.picker-and-map .picker-label').attr('data-last-continent') == undefined || $('.single-continent.open-item > a .element-name').html() != $('.picker-and-map .picker-label').attr('data-last-continent')) {
                            console.log('set continent name');
                            $('.dentacoin-stats-category-label span').html('in ' + $('.single-continent.open-item > a .element-name').html());
                            $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-continents"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+$('.single-continent.open-item > a .element-name').html().trim()+'</a>');

                            $('.single-continent.open-item > a .element-name').attr('data-last-continent', $('.single-continent.open-item > a .element-name').html().trim());

                            updateContinentData($('.single-continent.open-item > a').attr('data-country-codes'));
                        } else {
                            $('.dentacoin-stats-category-label span').html($('.picker-and-map .picker-label').attr('data-last-continent'));
                        }

                        $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-continents"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+$('.picker-and-map .picker-label').attr('data-last-continent')+'</a>');


                        if ($('.picker-and-map .picker-value').attr('data-last-continent') != '') {
                            $('.picker-and-map .picker-value').html('<span class="lato-black">'+$('.picker-and-map .picker-value').attr('data-last-continent')+'</span> Results');
                        }

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: undefined,
                            initialLng: undefined,
                            initialZoom: undefined,
                            filter_country: JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')),
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, undefined, undefined, undefined, JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')), undefined, undefined, $('.selectpicker.location-types').val(), true);

                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .countries-nav').addClass('shown');

                        $('.locations-category-list').html('');
                        $('.results-list').scrollTop(0);

                        $('.countries-list .country-list-parent').removeClass('hide open-item');


                        if ($('.changeable-stats .partners').length) {
                            $('.changeable-stats .partners span').html($('.changeable-stats .partners').attr('data-last-continent'));
                        }

                        if ($('.changeable-stats .non-partners').length) {
                            $('.changeable-stats .non-partners span').html($('.changeable-stats .non-partners').attr('data-last-continent'));
                        }

                        if ($('.changeable-stats .users').length) {
                            $('.changeable-stats .users span').html($('.changeable-stats .users').attr('data-last-continent'));
                        }
                    });
                    // =================== /COUNTRIES LOGIC ===================
                }
            },
            showStickyHomepageNav() {
                if ($('.homepage-sticky-nav').length) {
                    $('.homepage-sticky-nav').fadeIn(500);
                }
            },
            hideStickyHomepageNav() {
                if ($('.homepage-sticky-nav').length) {
                    $('.homepage-sticky-nav').remove();
                }
            },
            showStickySubpagesNav() {
                if (!$('.subpages-sticky-nav').length) {
                    $('body').append('<div class="subpages-sticky-nav text-center fs-0"><a href="javascript:void(0);" data-type="users" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">USERS</span></a><a href="javascript:void(0);" data-type="dentists" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">DENTISTS</span></a><a href="javascript:void(0);" data-type="traders" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">TRADERS</span></a></div>');

                    if (location.href.indexOf('users') >= 0) {
                        $('.subpages-sticky-nav [data-type="users"]').addClass('active');
                    } else if (location.href.indexOf('dentists') >= 0) {
                        $('.subpages-sticky-nav [data-type="dentists"]').addClass('active');
                    } else if (location.href.indexOf('traders') >= 0) {
                        $('.subpages-sticky-nav [data-type="traders"]').addClass('active');
                    }

                    $('.subpages-sticky-nav [data-type="users"]').click(function() {
                        var currentPage = $('.subpages-sticky-nav a.active').attr('data-type');
                        $('.subpages-sticky-nav a').removeClass('active');
                        $(this).addClass('active');

                        switch(currentPage) {
                            case 'dentists':
                                projectData.general_logic.data.slideOutDentistsContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'users'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInUsersContent(takeHomepageDataResponse.data.usersPageData);
                                    }
                                });
                                break;
                            case 'traders':
                                projectData.general_logic.data.slideOutTradersContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'users'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInUsersContent(takeHomepageDataResponse.data.usersPageData);
                                    }
                                });
                                break;
                        }
                    });

                    $('.subpages-sticky-nav [data-type="dentists"]').click(function() {
                        var currentPage = $('.subpages-sticky-nav a.active').attr('data-type');
                        $('.subpages-sticky-nav a').removeClass('active');
                        $(this).addClass('active');

                        switch(currentPage) {
                            case 'users':
                                projectData.general_logic.data.slideOutUsersContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'dentists'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInDentistsContent(takeHomepageDataResponse.data.dentistsPageData);
                                    }
                                });
                                break;
                            case 'traders':
                                projectData.general_logic.data.slideOutTradersContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'dentists'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInDentistsContent(takeHomepageDataResponse.data.dentistsPageData);
                                    }
                                });
                                break;
                        }
                    });

                    $('.subpages-sticky-nav [data-type="traders"]').click(function() {
                        var currentPage = $('.subpages-sticky-nav a.active').attr('data-type');
                        $('.subpages-sticky-nav a').removeClass('active');
                        $(this).addClass('active');

                        switch(currentPage) {
                            case 'users':
                                projectData.general_logic.data.slideOutUsersContent(async function() {
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'traders'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.slideInTradersContent(takeHomepageDataResponse.data.tradersPageData);
                                    }
                                });
                                break;
                            case 'dentists':
                                projectData.general_logic.data.slideOutDentistsContent(async function() {
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'traders'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.slideInTradersContent(takeHomepageDataResponse.data.tradersPageData);
                                    }
                                });
                                break;
                        }
                    });

                    $('.subpages-sticky-nav').fadeIn(500);
                }
            },
            hideStickySubpagesNav: function() {
                console.log($('.subpages-sticky-nav').length, 'hideStickySubpagesNav');
                if ($('.subpages-sticky-nav').length) {
                    $('.subpages-sticky-nav').remove();
                }
            },
            slideInUsersContent: function(usersPageData) {
                // doing this fix, because brower back arrow is not working via pushState
                window.removeEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);
                window.addEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);

                window.scrollTo(0, 0);

                history.pushState({data: 'users'},'', HOME_URL + '/users');
                $('.hidden-users-page-content').css({'display' : 'block'}).html(usersPageData).animate({'left' : '0', 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-users-page-content').addClass('position-static');

                    projectData.pages.data.users();
                });
            },
            slideOutUsersContent: function(callback) {
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-users-page-content').removeClass('position-static').animate({'left' : '-100%', 'opacity' : 0}, 1000, function() {
                    $('.hidden-users-page-content').hide();
                    callback();
                });
            },
            slideInDentistsContent: function(dentistsPageData) {
                // doing this fix, because brower back arrow is not working via pushState
                window.removeEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);
                window.addEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);

                window.scrollTo(0, 0);

                history.pushState({data: 'dentists'},'', HOME_URL + '/dentists');
                $('.hidden-dentists-page-content').css({'display' : 'block'}).html(dentistsPageData).animate({'top' : $('header').outerHeight(), 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-dentists-page-content').addClass('position-static');

                    projectData.pages.data.dentists();
                });
            },
            slideOutDentistsContent: function(callback) {
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-dentists-page-content').removeClass('position-static').animate({'top' : $('.hidden-dentists-page-content').height() + 'px', 'opacity' : 0}, 750, function() {
                    $('.hidden-dentists-page-content').hide();
                    callback();
                });
            },
            slideInTradersContent: function(tradersPageData) {
                // doing this fix, because brower back arrow is not working via pushState
                window.removeEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);
                window.addEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);

                window.scrollTo(0, 0);

                history.pushState({data: 'traders'},'', HOME_URL + '/traders');
                $('.hidden-traders-page-content').css({'display' : 'block'}).html(tradersPageData).animate({'right' : '0', 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-traders-page-content').addClass('position-static');

                    projectData.pages.data.traders();
                });
            },
            slideOutTradersContent: function(callback) {
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-traders-page-content').removeClass('position-static').animate({'right' : '-100%', 'opacity' : 0}, 750, function() {
                    $('.hidden-traders-page-content').hide();
                    callback();
                });
            },
        }
    },
    requests: {
        takeHomepageData: async function(data) {
            var ajaxData = {
                type: 'POST',
                url: HOME_URL + '/take-homepage-data',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            };

            if (data != undefined) {
                ajaxData.data = data;
            }

            return await $.ajax(ajaxData);
        },
        getMapHtml: async function() {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-map-html',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        },
        getMapData: async function(data) {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-map-data',
                dataType: 'json',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        },
        getLabsSuppliersAndIndustryPartners: async function(data) {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-labs-suppliers-and-industry-partners',
                dataType: 'json',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        }
    },
    events: {
        eventTrackers: function() {

        },
        fireGoogleAnalyticsEvent: function (category, action, label, value) {
            var event_obj = {
                'event_action': action,
                'event_category': category,
                'event_label': label
            };

            if (value != undefined) {
                event_obj.value = value;
            }

            gtag('event', label, event_obj);
        }
    }
};

if ($('body').hasClass('logged-in')) {
    projectData.pages.logged_in();
    projectData.general_logic.logged_in();
} else {
    projectData.pages.not_logged_in();
    projectData.general_logic.not_logged_in();
}

projectData.events.eventTrackers();

function drawHeaderToFirstSectionLine() {
    //FIRST LINE
    $('line.first').attr('x1', $('header .first-dot').offset().left);
    $('line.first').attr('y1', $('header .first-dot').offset().top);
    $('line.first').attr('x2', $('.second-dot').offset().left);
    $('line.first').attr('y2', $('.second-dot').offset().top + $('.second-dot').height() - 1);

    //SECOND LINE
    $('line.second').attr('x1', $('.second-dot').offset().left);
    $('line.second').attr('y1', $('.second-dot').offset().top + $('.second-dot').height() - 1);
    $('line.second').attr('x2', $('.third-dot').offset().left);
    $('line.second').attr('y2', $('.third-dot').offset().top + $('.third-dot').height() - 1);
}

function drawNavToBottomSectionLine() {
    $('line.third').attr('x1', $('.nav-to-bottom-first-dot').offset().left);
    $('line.third').attr('y1', $('.nav-to-bottom-first-dot').offset().top + $('.nav-to-bottom-first-dot').height());
    $('line.third').attr('x2', $('.nav-to-bottom-second-dot').offset().left);
    $('line.third').attr('y2', $('.nav-to-bottom-second-dot').offset().top + $('.nav-to-bottom-second-dot').height());

    $('line.fourth').attr('x1', $('.nav-to-bottom-second-dot').offset().left);
    $('line.fourth').attr('y1', $('.nav-to-bottom-second-dot').offset().top + $('.nav-to-bottom-second-dot').height());
    $('line.fourth').attr('x2', $('.nav-to-bottom-third-dot').offset().left);
    $('line.fourth').attr('y2', $('.nav-to-bottom-third-dot').offset().top);

    $('line.fifth').attr('x1', $('.nav-to-bottom-third-dot').offset().left);
    $('line.fifth').attr('y1', $('.nav-to-bottom-third-dot').offset().top);
    $('line.fifth').attr('x2', $('.nav-to-bottom-fourth-dot').offset().left);
    $('line.fifth').attr('y2', $('.nav-to-bottom-fourth-dot').offset().top);
}

function initListingPageLine() {
    $('line.first').attr('x1', $('.list .single .first-dot').offset().left + $('.list .single .first-dot').width() / 2);
    $('line.first').attr('x2', $('.list .single .last-dot').offset().left + $('.list .single .last-dot').width() / 2);
    $('line.first').attr('y1', $('.list .single .first-dot').offset().top);
    $('line.first').attr('y2', $('.list .single .last-dot').offset().top);
}

// to be edited
function styleUploadButton(callbackOnChange, buttonClass) {
    if ($('.upload-file.module').length) {
        for (var i = 0, len = $('.upload-file.module').length; i < len; i+=1) {
            var thisFileUpload = $('.upload-file.module').eq(i);
            var thisFileInput = thisFileUpload.find('.upload-input');
            $('.upload-file.module').eq(i).append('<button type="button"><label for="'+thisFileInput.attr('name')+'" class="'+buttonClass+'">'+$('.upload-file.module').eq(i).attr('data-label')+'</label></button>');
            thisFileInput.on('change', function() {
                callbackOnChange(this);
            });
        }
    }
}

// ==================== /PAGES ====================

if ($('.newsletter-register').length) {
    basic.initCustomCheckboxes('.newsletter-register');

    $('.newsletter-register form').on('submit', function (event) {
        event.preventDefault();
        var this_form_native = this;
        var this_form = $(this_form_native);

        var error = false;
        this_form.find('.error-handle').remove();

        if (!basic.validateEmail(this_form.find('input[type="email"]').val().trim())) {
            error = true;
            customErrorHandle(this_form.find('input[type="email"]').closest('.newsletter-field'), this_form.find('input[type="email"]').closest('.newsletter-field').attr('data-valid-message'));
        }

        if (!this_form.find('#newsletter-privacy-policy').is(':checked')) {
            error = true;
            customErrorHandle(this_form.find('#newsletter-privacy-policy').closest('.newsletter-field'), this_form.find('#newsletter-privacy-policy').closest('.newsletter-field').attr('data-valid-message'));
        }

        if (!error) {
            projectData.events.fireGoogleAnalyticsEvent('Subscription', 'Sign-up', 'Newsletter');

            $('.newsletter-register form .custom-checkbox').html('');
            $('.newsletter-register form #newsletter-privacy-policy').prop('checked', false);
            this_form.find('input[type="email"]').val('');
            $('.newsletter-register .form-container').append('<div class="alert alert-success fs-16 margin-top-10">Thank you for signing up.</div>');

            this_form_native.submit();
        }
    });
}

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function () {
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if (classname.indexOf('christmas-calendar-task') === -1) {
            if (classname && !$('.' + classname).parents('.modal-dialog').length) {
                if ($('.bootbox.login-signin-popup').length) {
                    $('.hidden-login-form').html(hidden_popup_content);
                }
                bootbox.hideAll();
            }
        }
    });
}

hidePopupOnBackdropClick();

function initCaptchaRefreshEvent() {
//refreshing captcha on trying to log in admin
    if ($('.refresh-captcha').length > 0) {
        $('.refresh-captcha').click(function () {
            $.ajax({
                type: 'GET',
                url: '/refresh-captcha',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    $('.captcha-container span').html(response.captcha);
                }
            });
        });
    }
}
initCaptchaRefreshEvent();

//INIT LOGIC FOR ALL STEPS
function customErrorHandle(el, string) {
    el.append('<div class="error-handle">' + string + '</div>');
}

// reading file and check size and extension
function readURL(input, megaBytesLimit, allowedImagesExtensions, callback, failed_callback) {
    if (input.files && input.files[0]) {
        var filename = input.files[0].name;

        // check file size
        if (megaBytesLimit < basic.bytesToMegabytes(input.files[0].size)) {
            if (failed_callback != undefined) {
                failed_callback();
            }

            $(input).closest('.upload-btn-parent').append('<div class="error-handle">The file you selected is large. Max size: ' + megaBytesLimit + 'MB.</div>');
            return false;
        } else {
            //check file extension
            if (jQuery.inArray(filename.split('.').pop().toLowerCase(), allowedImagesExtensions) !== -1) {
                if (callback != undefined) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        callback(e, filename);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            } else {
                if (failed_callback != undefined) {
                    failed_callback();
                }

                var allowedExtensionsHtml = '';
                var firstLoop = true;
                for (var i = 0, len = allowedImagesExtensions.length; i < len; i += 1) {
                    if (firstLoop) {
                        firstLoop = false;
                        allowedExtensionsHtml += allowedImagesExtensions[i];
                    } else {
                        allowedExtensionsHtml += ', ' + allowedImagesExtensions[i];
                    }
                }

                $(input).closest('.upload-btn-parent').append('<div class="error-handle">Please select file in ' + allowedExtensionsHtml + ' format.</div>');
                return false;
            }
        }
    }
}

async function checkCaptcha(captcha) {
    return await $.ajax({
        type: 'POST',
        url: '/check-captcha',
        dataType: 'json',
        data: {
            captcha: captcha
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

function bindGoogleAlikeButtonsEvents() {
    //google alike style for label/placeholders
    $('body').on('click', '.custom-google-label-style label', function () {
        $(this).addClass('active-label');
        if ($('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
            $(this).parent().find('input').addClass('blue-green-border');
        }
    });

    $('body').on('keyup change focusout', '.custom-google-label-style input', function () {
        var value = $(this).val().trim();
        if (value.length) {
            $(this).closest('.custom-google-label-style').find('label').addClass('active-label');
            if ($(this).closest('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                $(this).addClass('blue-green-border');
            }
        } else {
            $(this).closest('.custom-google-label-style').find('label').removeClass('active-label');
            if ($(this).closest('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                $(this).removeClass('blue-green-border');
            }
        }
    });
}

bindGoogleAlikeButtonsEvents();

// =================================== GOOGLE ANALYTICS TRACKING LOGIC ======================================


// =================================== /GOOGLE ANALYTICS TRACKING LOGIC ======================================