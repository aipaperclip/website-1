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
                    var usersPageData = '';
                    var dentistsPageData = '';
                    var tradersPageData = '';

                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData();
                    console.log(takeHomepageDataResponse, 'takeHomepageDataResponse');

                    if (takeHomepageDataResponse.success) {
                        usersPageData = takeHomepageDataResponse.data.usersPageData;
                        dentistsPageData = takeHomepageDataResponse.data.dentistsPageData;
                        tradersPageData = takeHomepageDataResponse.data.tradersPageData;

                        $('.section-homepage-nav .single-element .users').click(function() {
                            projectData.general_logic.data.slideInUsersContent(usersPageData);
                        });

                        $('.section-homepage-nav .single-element .dentists').click(function() {
                            projectData.general_logic.data.slideInDentistsContent(dentistsPageData);
                        });

                        $('.section-homepage-nav .single-element .traders').click(function() {
                            projectData.general_logic.data.slideInTradersContent(tradersPageData);
                        });
                    } else {
                        $('.section-homepage-nav .single-element a').click(function() {
                            basic.closeDialog();
                            basic.showAlert('Something went wrong. Please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a> with description of the problem.', '', true);
                        });
                    }
                }
            },
            users: function(bodyClassCheck) {
                console.log('dentistsPAGE');
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('users')) {
                        return false;
                    }
                }

                // adjust header to black style
                $('header .main-color').removeClass('main-color').addClass('color-white');
                $('header .white-black-btn').removeClass('white-black-btn').addClass('black-white-btn');

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

                projectData.general_logic.data.showStickyHomepageNav();

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
            },
            dentists: function(bodyClassCheck) {
                console.log('dentistsPAGE');
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('dentists')) {
                        return false;
                    }
                }

                // add intro section animation
                $('.section-the-era-dentist-page .hidden-picture img').addClass('animated');

                // adjust header to white style
                $('header .main-color').removeClass('color-white').addClass('main-color');
                $('header .black-white-btn').removeClass('black-white-btn').addClass('white-black-btn');

                // adjust footer to white style
                if ($('footer').hasClass('black-style')) {
                    $('footer').removeClass('black-style');
                    for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                        var currentSocial = $('.socials ul li a img').eq(i);
                        currentSocial.attr('src', currentSocial.attr('data-default-src')).attr('alt', currentSocial.attr('data-default-alt'));
                    }
                }

                projectData.general_logic.data.showStickyHomepageNav();

                if ($('.benefits-row').length && $('.benefits-row video').length) {
                    var videosPlayed = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.benefits-row'), 200) && !videosPlayed) {
                            videosPlayed = true;

                            for (var i = 0, len = $('.benefits-row video').length; i < len; i+=1) {
                                $('.benefits-row video').get(i).play()
                            }
                        }
                    });
                }

                projectData.general_logic.data.videoExpressionsSlider('dentists');
                projectData.general_logic.data.userExpressionsSlider('dentists');
            },
            traders: function(bodyClassCheck) {
                console.log('tradersPAGE');
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('traders')) {
                        return false;
                    }
                }

                // if exchange bullets exist bind them logic to show/ hide exchanges
                if ($('.exchanges-bullets').length) {
                    $('.exchanges-bullets a').click(function() {
                        $('.exchanges-bullets a').removeClass('active');
                        $(this).addClass('active');

                        $('.mobile-exchanges .mobile-extra-row').removeClass('active');
                        $('.mobile-exchanges .mobile-extra-row[data-bullet="'+$(this).attr('data-bullet')+'"]').addClass('active');
                    });
                }

                // add intro section animation
                $('.section-bringing-blockchain-solutions-trader-page .trader').addClass('animated');
                $('.section-bringing-blockchain-solutions-trader-page .trader-animated-background').addClass('animated');

                // adjust header to black style
                $('header .main-color').removeClass('main-color').addClass('color-white');
                $('header .white-black-btn').removeClass('white-black-btn').addClass('black-white-btn');

                // adjust footer to black style
                $('footer').addClass('black-style');
                for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                    var currentSocial = $('.socials ul li a img').eq(i);
                    currentSocial.attr('src', currentSocial.attr('data-black-style-src')).attr('alt', currentSocial.attr('data-black-style-alt'));
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

                projectData.general_logic.data.showStickyHomepageNav();
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
                                $('.response-layer').show();
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
                                            $('.response-layer').hide();
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
                                $('.response-layer').show();
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
                                                $('.response-layer').hide();
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
            miniHub: function() {
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
                    console.log('===videoExpressionsSlider===');

                    // add youtube API
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    $('.module.video-expressions-slider[data-type="'+type+'"]').slick({
                        slidesToShow: 3,
                        draggable: false,
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
                        if (!xsScreen) {
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slick-slide').removeClass('middle-slide after-middle before-middle');
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').next().next().addClass('after-middle');
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').next().addClass('middle-slide');
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').addClass('before-middle');
                        }

                        if (clearIframesOnSlickChange) {
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                            $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');
                        } else {
                            clearIframesOnSlickChange = true;
                        }
                    });

                    $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').click(function() {
                        var videoId = $(this).closest('.single-slide').attr('data-video-id');
                        clearIframesOnSlickChange = false;

                        $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                        $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');

                        if (xsScreen) {
                            playYTVideo(this);
                        } else {
                            if ($(this).closest('.slick-slide').hasClass('middle-slide')) {
                                // play video
                                playYTVideo(this);
                            } else {
                                // make slide active and play video
                                $('.module.video-expressions-slider[data-type="'+type+'"]').slick('slickGoTo', $(this).closest('.slick-slide').prev().attr('data-slick-index'));
                                playYTVideo(this);
                            }
                        }

                        function playYTVideo(el) {
                            $(el).closest('.slide-wrapper').append('<div id="main-video-player"></div>');
                            $(el).closest('.single-slide').find('.video-thumb').addClass('visibility-hidden');

                            var playerEvents = {};

                            playerEvents.onReady = onPlayerReady;

                            new YT.Player('main-video-player', {
                                videoId: videoId,
                                events: playerEvents
                            });

                            function onPlayerReady(event) {
                                console.log('onPlayerReady');
                                if (xsScreen) {
                                    $('iframe#main-video-player').height($('iframe#main-video-player').closest('.single-slide').find('.video-thumb figure img').height());
                                }
                                event.target.playVideo();
                            }
                        }
                    });
                }
            },
            userExpressionsSlider(type) {
                if ($('.user-expressions-slider[data-type="'+type+'"]').length) {
                    console.log('===userExpressionsSlider===');

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
            showStickyHomepageNav() {
                if (!$('.homepage-and-subpages-sticky-nav').length) {
                    setTimeout(function() {
                        $('body').append('<div class="homepage-and-subpages-sticky-nav text-center fs-0"><a href="javascript:void(0);" data-type="users" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">USERS</span></a><a href="javascript:void(0);" data-type="dentists" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">DENTISTS</span></a><a href="javascript:void(0);" data-type="traders" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">TRADERS</span></a></div>');

                        if (location.href.indexOf('users') >= 0) {
                            $('.homepage-and-subpages-sticky-nav [data-type="users"]').addClass('active');
                        } else if (location.href.indexOf('dentists') >= 0) {
                            $('.homepage-and-subpages-sticky-nav [data-type="dentists"]').addClass('active');
                        } else if (location.href.indexOf('traders') >= 0) {
                            $('.homepage-and-subpages-sticky-nav [data-type="traders"]').addClass('active');
                        }

                        $('.homepage-and-subpages-sticky-nav [data-type="users"]').click(function() {
                            var currentPage = $('.homepage-and-subpages-sticky-nav a.active').attr('data-type');
                            console.log(currentPage, 'currentPage');
                            $('.homepage-and-subpages-sticky-nav a').removeClass('active');
                            $(this).addClass('active');

                            switch(currentPage) {
                                case 'dentists':
                                    projectData.general_logic.data.slideOutDentistsContent(async function() {
                                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();
                                        console.log(takeHomepageDataResponse, 'takeHomepageDataResponse');

                                        if (takeHomepageDataResponse.success) {
                                            projectData.general_logic.data.slideInUsersContent(takeHomepageDataResponse.data.usersPageData);
                                        }
                                    });
                                    break;
                                case 'traders':
                                    projectData.general_logic.data.slideOutTradersContent(async function() {
                                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();

                                        if (takeHomepageDataResponse.success) {
                                            projectData.general_logic.data.slideInUsersContent(takeHomepageDataResponse.data.usersPageData);
                                        }
                                    });
                                    break;
                            }
                        });

                        $('.homepage-and-subpages-sticky-nav [data-type="dentists"]').click(function() {
                            var currentPage = $('.homepage-and-subpages-sticky-nav a.active').attr('data-type');
                            console.log(currentPage, 'currentPage');
                            $('.homepage-and-subpages-sticky-nav a').removeClass('active');
                            $(this).addClass('active');

                            switch(currentPage) {
                                case 'users':
                                    projectData.general_logic.data.slideOutUsersContent(async function() {
                                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();

                                        if (takeHomepageDataResponse.success) {
                                            projectData.general_logic.data.slideInDentistsContent(takeHomepageDataResponse.data.dentistsPageData);
                                        }
                                    });
                                    break;
                                case 'traders':
                                    projectData.general_logic.data.slideOutTradersContent(async function() {
                                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();

                                        if (takeHomepageDataResponse.success) {
                                            projectData.general_logic.data.slideInDentistsContent(takeHomepageDataResponse.data.dentistsPageData);
                                        }
                                    });
                                    break;
                            }
                        });

                        $('.homepage-and-subpages-sticky-nav [data-type="traders"]').click(function() {
                            var currentPage = $('.homepage-and-subpages-sticky-nav a.active').attr('data-type');
                            console.log(currentPage, 'currentPage');
                            $('.homepage-and-subpages-sticky-nav a').removeClass('active');
                            $(this).addClass('active');

                            switch(currentPage) {
                                case 'users':
                                    projectData.general_logic.data.slideOutUsersContent(async function() {
                                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();

                                        if (takeHomepageDataResponse.success) {
                                            projectData.general_logic.data.slideInTradersContent(takeHomepageDataResponse.data.tradersPageData);
                                        }
                                    });
                                    break;
                                case 'dentists':
                                    projectData.general_logic.data.slideOutDentistsContent(async function() {
                                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();
                                        console.log(takeHomepageDataResponse, 'takeHomepageDataResponse');

                                        if (takeHomepageDataResponse.success) {
                                            projectData.general_logic.data.slideInTradersContent(takeHomepageDataResponse.data.tradersPageData);
                                        }
                                    });
                                    break;
                            }
                        });

                        $('.homepage-and-subpages-sticky-nav').fadeIn(500);
                    }, 1000);
                }
            },
            slideInUsersContent: function(usersPageData) {
                window.scrollTo(0, 0);

                history.pushState({},'', HOME_URL + '/users');
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
                window.scrollTo(0, 0);

                history.pushState({},'', HOME_URL + '/dentists');
                $('.hidden-dentists-page-content').css({'display' : 'block'}).html(dentistsPageData).animate({'top' : $('header').outerHeight(), 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-dentists-page-content').addClass('position-static');

                    projectData.pages.data.dentists();
                });
            },
            slideOutDentistsContent: function(callback) {
                console.log('slideOutDentistsContent');
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-dentists-page-content').removeClass('position-static').animate({'top' : $('.hidden-dentists-page-content').height() + 'px', 'opacity' : 0}, 750, function() {
                    $('.hidden-dentists-page-content').hide();
                    callback();
                });
            },
            slideInTradersContent: function(tradersPageData) {
                window.scrollTo(0, 0);

                history.pushState({},'', HOME_URL + '/traders');
                $('.hidden-traders-page-content').css({'display' : 'block'}).html(tradersPageData).animate({'right' : '0', 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-traders-page-content').addClass('position-static');

                    projectData.pages.data.traders();
                });
            },
            slideOutTradersContent: function(callback) {
                console.log('slideOutTradersContent');
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
        takeHomepageData: async function() {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/take-homepage-data',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        }
    },
    events: {
        eventTrackers: function() {
            function bindTrackerClickDentistsBtnEvent() {
                $(document).on('click', '.init-dentists-click-event', function () {
                    projectData.events.fireGoogleAnalyticsEvent('Tools', 'Click', 'Dentists');
                });
            }

            bindTrackerClickDentistsBtnEvent();
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

if (!$('body').hasClass('logged-in')) {
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