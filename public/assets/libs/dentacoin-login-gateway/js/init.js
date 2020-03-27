if (typeof jQuery == 'undefined') {
    // no jquery installed
    console.error('Dentacoin login gateway requires the usage of jQuery.');
} else {
    var dcnGateway = {
        dcnGatewayRequests: {
            getPlatformsData: async function() {
                return await $.ajax({
                    type: 'GET',
                    url: 'https://dentacoin.com/info/platforms',
                    dataType: 'json'
                });
            },
            getGatewayHtml: async function(type, user_ip) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/dentacoin-login-gateway',
                    dataType: 'json',
                    data: {
                        'type' : type,
                        'user_ip' : user_ip
                    }
                });
            }
        },
        utils: {
            getGETParameters: function() {
                var prmstr = window.location.search.substr(1);
                return prmstr != null && prmstr != "" ? dcnGateway.utils.transformToAssocArray(prmstr) : {};
            },
            transformToAssocArray: function(prmstr) {
                var params = {};
                var prmarr = prmstr.split("&");
                for (var i = 0, len = prmarr.length; i < len; i+=1) {
                    var tmparr = prmarr[i].split("=");
                    params[tmparr[0]] = tmparr[1];
                }
                return params;
            },
            showLoader: function() {
                $('body').append('<div class="dentacoin-login-gateway-response-layer"><div class="dentacoin-login-gateway-response-layer-wrapper"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="https://dentacoin.com/assets/images/loader.gif" alt="Loader"></figure><div class="dentacoin-login-gateway-response-message gateway-platform-color text-center dentacoin-login-gateway-fs-26">Loading</div></div></div>');
            },
            hideLoader: function() {
                $('.dentacoin-login-gateway-response-layer').hide();
            }
        },
        init: async function(params) {
            if ((typeof params !== 'object' && params === null) || (!hasOwnProperty.call(params, 'platform') || !hasOwnProperty.call(params, 'forgotten_password_link') || !hasOwnProperty.call(params, 'user_ip'))) {
                // false params
                console.error('False params passed to dentacoin login gateway.');
            } else {
                // check internet connection
                if (!navigator.onLine) {
                    console.error('Dentacoin login gateway requires internet connection.');
                    return false;
                }

                var platformsData = await dcnGateway.dcnGatewayRequests.getPlatformsData();
                var validPlatform = false;
                var currentPlatformColor;
                for (var i = 0, len = platformsData.length; i < len; i+=1) {
                    if (platformsData[i].slug == params.platform) {
                        validPlatform = true;
                        currentPlatformColor = platformsData[i].color;
                        break;
                    }
                }

                var platform_color_and_background = '<style class="platform-colors">.gateway-platform-color{color:'+currentPlatformColor+';}.gateway-platform-background-color{background-color:'+currentPlatformColor+';}</style>';

                $('head').append(platform_color_and_background);

                // platform parameter
                if (!validPlatform) {
                    console.error('False \'platform\' parameter passed to dentacoin login gateway.');
                    return false;
                }

                async function showGateway(type) {
                    var gatewayHtml = await dcnGateway.dcnGatewayRequests.getGatewayHtml(type, params.user_ip);
                    if (gatewayHtml.success) {
                        $('body').append('<div id="dentacoin-login-gateway-container"><div class="wrapper">'+gatewayHtml.data+'</div></div>')

                        $('.login-signin-popup .popup-header-action a').click(function() {
                            $('.login-signin-popup .popup-body > .inline-block').addClass('custom-hide');
                            $('.login-signin-popup .popup-body .'+$(this).attr('data-type')).removeClass('custom-hide');
                        });

                        $('.login-signin-popup .call-sign-up').click(function() {
                            $('.login-signin-popup .form-login').hide();
                            $('.login-signin-popup .form-register').show();
                        });

                        $('.login-signin-popup .call-log-in').click(function() {
                            $('.login-signin-popup .form-login').show();
                            $('.login-signin-popup .form-register').hide();
                        });

                        $(document).on('civicCustomBtnClicked', function (event) {
                            $('.login-signin-popup .patient .form-register .step-errors-holder').html('');
                        });

                        $(document).on('civicRead', async function (event) {
                            dcnGateway.utils.showLoader();
                        });

                        $(document).on('receivedFacebookToken', async function (event) {
                            dcnGateway.utils.showLoader();
                        });

                        $(document).on('facebookCustomBtnClicked', function (event) {
                            $('.login-signin-popup .patient .form-register .step-errors-holder').html('');
                        });
                    } else {
                        console.error('Something failed, please contact developer.');
                        return false;
                    }
                }

                // bind gateway showing event
                $('.open-dentacoin-gateway').click(function() {
                    if ($(this).hasClass('patient-login')) {
                        showGateway('patient-login');
                    } else if ($(this).hasClass('patient-register')) {
                        showGateway('patient-register');
                    } else if ($(this).hasClass('dentist-login')) {
                        showGateway('patient-login');
                    } else if ($(this).hasClass('dentist-register')) {
                        showGateway('patient-register');
                    } else {
                        showGateway('patient-login');
                    }
                });


                console.log(params, 'params');
                console.log(platformsData, 'platformsData');
                console.log(dcnGateway.utils.getGETParameters(), 'dcnGateway.utils.getGETParameters()');
            }
        }
    };
}