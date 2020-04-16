if (typeof jQuery == 'undefined') {
    // no jquery installed
    console.error('Dentacoin login gateway requires the usage of jQuery.');
} else {
    var loadedSocialLibs = false;
    var loadedAddressSuggesterLib = false;
    var croppie_instance;
    var allowedImagesExtensions = ['png', 'jpg', 'jpeg'];
    var apiDomain = 'https://api.dentacoin.com';
    var environment = 'live';
    var dcnGateway = {
        dcnGatewayRequests: {
            getPlatformsData: async function() {
                return await $.ajax({
                    type: 'GET',
                    url: 'https://dentacoin.com/info/platforms',
                    dataType: 'json'
                });
            },
            getGatewayHtml: async function(data) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/dentacoin-login-gateway',
                    dataType: 'json',
                    data: data
                });
            },
            getUserCountry: async function() {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/get-country-code',
                    dataType: 'json'
                });
            },
            checkIfFreeEmail: async function(email) {
                return await $.ajax({
                    type: 'POST',
                    url: apiDomain + '/api/check-email',
                    dataType: 'json',
                    data: {
                        email: email
                    }
                });
            },
            editUserData: async function(data, token) {
                return await $.ajax({
                    type: 'POST',
                    url: apiDomain + '/api/user/',
                    dataType: 'json',
                    data: data,
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    }
                });
            },
            saveIncompleteRegistration: async function(data) {
                return await $.ajax({
                    type: 'POST',
                    url: apiDomain + '/api/incomplete-registration/',
                    dataType: 'json',
                    data: data
                });
            },
            checkDentistAccount: async function (email, password) {
                var data = {
                    email: email,
                    password: password
                };

                if (environment == 'staging') {
                    data.staging = true;
                }

                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/check-dentist-account',
                    dataType: 'json',
                    data: data
                })
            },
            validatePhone: async function (phone, country_code) {
                return await $.ajax({
                    type: 'POST',
                    url: apiDomain + '/api/phone/',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        country_code: country_code
                    }
                });
            },
            dentistRegistration: async function (data) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/dentacoin-login-gateway/handle-dentist-register',
                    dataType: 'json',
                    data: data
                });
            },
            dentistLogin: async function (data) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/dentacoin-login-gateway/handle-dentist-login',
                    dataType: 'json',
                    data: data
                });
            },
            getAfterDentistRegistrationPopup: async function (data) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/dentacoin-login-gateway/get-after-dentist-registration-popup',
                    dataType: 'json',
                    data: data
                });
            },
            enrichProfile: async function (data) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/dentacoin-login-gateway/handle-enrich-profile',
                    dataType: 'json',
                    data: data
                });
            },
            createUserSession: async function (url, data) {
                return await $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: 'json',
                    data: data
                });
            }
        },
        utils: {
            hasNumber: function(myString) {
                return /\d/.test(myString);
            },
            hasLowerCase: function(str) {
                return (/[a-z]/.test(str));
            },
            hasUpperCase: function(str) {
                return (/[A-Z]/.test(str));
            },
            validatePassword: function(password) {
                return password.trim().length >= 8 && password.trim().length <= 30 && dcnGateway.utils.hasLowerCase(password) && dcnGateway.utils.hasUpperCase(password) && dcnGateway.utils.hasNumber(password);
            },
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
            customErrorHandle: function(el, string) {
                el.append('<div class="error-handle">'+string+'</div>');
            },
            fireGoogleAnalyticsEvent: function(category, action, label, value) {
                console.log('commenter fireGoogleAnalyticsEvent event');
                /*var event_obj = {
                    'event_action' : action,
                    'event_category': category,
                    'event_label': label
                };

                if (value != undefined) {
                    event_obj.value = value;
                }

                gtag('event', label, event_obj);*/
            },
            validateUrl: function(url)   {
                var pattern = new RegExp(/*'^(https?:\\/\\/)?' +*/ // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                return !!pattern.test(url);
            },
            validateEmail: function(email)   {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            showLoader: function(message) {
                if (message == undefined) {
                    message = 'Loading ...';
                }

                $('body').append('<div class="dentacoin-login-gateway-response-layer"><div class="dentacoin-login-gateway-response-layer-wrapper"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="https://dentacoin.com/assets/images/loader.gif" alt="Loader"></figure><div class="dentacoin-login-gateway-response-message gateway-platform-color text-center dentacoin-login-gateway-fs-30">'+message+'</div></div></div>');
            },
            hideLoader: function() {
                $('.dentacoin-login-gateway-response-layer').hide();
            },
            showPopup: function(message, type, callback, data) {
                if (type == 'alert') {
                    $('body').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper popup dentacoin-login-gateway-fs-18">'+message+'<div class="popup-buttons"><button class="platform-button gateway-platform-background-color cancel-custom-popup">OK</button></div></div></div>');

                    $('.cancel-custom-popup').click(function() {
                        $(this).closest('.dentacoin-login-gateway-container').remove();
                    });
                } else if (type == 'warning') {
                    $('body').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper popup dentacoin-login-gateway-fs-18">'+message+'<div class="popup-buttons"><button class="platform-button proceed-custom-popup green-button">YES</button><button class="platform-button cancel-custom-popup red-button">NO</button></div></div></div>');
                    

                    $('.proceed-custom-popup').click(function() {
                        callback();
                        $(this).closest('.dentacoin-login-gateway-container').remove();
                    });

                    $('.cancel-custom-popup').click(function() {
                        $(this).closest('.dentacoin-login-gateway-container').remove();
                    });
                } else if (type == 'enrich-profile') {
                    $('body').addClass('dentacoin-login-gateway-overflow-hidden').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper enrich-profile">'+message+'</div></div>');

                    $('form#enrich-profile').on('submit', async function(event) {
                        event.preventDefault();
                        var this_form = $(this);
                        this_form.find('.error-handle').remove();

                        if (this_form.find('#description').val().trim() == '') {
                            dcnGateway.utils.customErrorHandle(this_form.find('#description').closest('.form-row'), 'This field is required.');
                        } else {
                            var enrichProfileData = {
                                user: data.user,
                                description: this_form.find('#description').val().trim()
                            };

                            if (environment == 'staging') {
                                enrichProfileData.staging = true;
                            }

                            var enrichProfileResponse = await dcnGateway.dcnGatewayRequests.enrichProfile(enrichProfileData);
                            if (enrichProfileResponse.success) {
                                $('form#enrich-profile').html('<div class="alert alert-success">'+enrichProfileResponse.data+'</div>')
                            } else if (enrichProfileResponse.error) {
                                dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                            } else {
                                dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                            }
                        }
                    });
                } else if (type == 'enrich-profile-response') {
                    $('body').addClass('dentacoin-login-gateway-overflow-hidden').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper enrich-profile">'+message+'</div></div>');
                }
            },
            bytesToMegabytes: function(bytes) {
                return bytes / Math.pow(1024, 2);
            },
            readURL: function(input, megaBytesLimit, allowedImagesExtensions, callback, failed_callback) {
                if (input.files && input.files[0]) {
                    var filename = input.files[0].name;

                    // check file size
                    if (megaBytesLimit < dcnGateway.utils.bytesToMegabytes(input.files[0].size)) {
                        if (failed_callback != undefined) {
                            failed_callback();
                        }

                        $(input).closest('.upload-btn-parent').append('<div class="error-handle task-error">The file you selected is large. Max size: '+megaBytesLimit+'MB.</div>');
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
                            for(var i = 0, len = allowedImagesExtensions.length; i < len; i+=1) {
                                if (firstLoop) {
                                    firstLoop = false;
                                    allowedExtensionsHtml += allowedImagesExtensions[i];
                                } else {
                                    allowedExtensionsHtml += ', ' + allowedImagesExtensions[i];
                                }
                            }

                            $(input).closest('.upload-btn-parent').append('<div class="error-handle task-error">Please select file in '+allowedExtensionsHtml+' format.</div>');
                            return false;
                        }
                    }
                }
            },
            styleAvatarUploadButton: function() {
                if (jQuery('.upload-file.avatar').length) {
                    var inputs = document.querySelectorAll('.inputfile');
                    Array.prototype.forEach.call(inputs, function(input) {
                        var this_file_btn_parent = $(input).parent();
                        if (this_file_btn_parent.attr('data-current-user-avatar')) {
                            this_file_btn_parent.find('.btn-wrapper').append('<label for="custom-upload-avatar" role="button" style="background-image:url('+this_file_btn_parent.attr('data-current-user-avatar')+');"><div class="inner"><div class="inner-label dentacoin-login-gateway-fs-0">Add profile photo</div></div></label>');
                        } else {
                            this_file_btn_parent.find('.btn-wrapper').append('<label for="custom-upload-avatar" role="button"><div class="inner"><i class="fa fa-plus" aria-hidden="true"></i><div class="inner-label">Add profile photo</div></div></label>');
                        }

                        input.addEventListener('change', function(e) {
                            var this_input = $(this);
                            dcnGateway.utils.readURL(this, 2, allowedImagesExtensions, function(e, filename) {
                                if (filename != '' && filename != undefined) {
                                    $('.avatar-name').show().find('span').html(filename.slice(0, 20) + '...');
                                    $('.upload-label-btn').addClass('less-padding');
                                }

                                $('#cropper-container').addClass('width-and-height');
                                if (croppie_instance != undefined) {
                                    croppie_instance.croppie('destroy');
                                    $('#cropper-container').html('');
                                }

                                var croppieParams = {
                                    enableOrientation: true,
                                    enforceBoundary: false
                                };

                                if ($(window).width() < 768) {
                                    croppieParams.viewport = {
                                        width: 200,
                                        height: 200
                                    };
                                    croppieParams.boundary = {width: 200, height: 200};
                                } else {
                                    croppieParams.viewport = {
                                        width: 140,
                                        height: 140
                                    };
                                    croppieParams.boundary = {width: 140, height: 140};
                                }

                                croppie_instance = $('#cropper-container').croppie(croppieParams);

                                $('.avatar.module .btn-wrapper').hide();
                                $('.max-size-label').addClass('active');

                                croppie_instance.croppie('bind', {
                                    url: e.target.result
                                });

                                croppie_instance.croppie('bind', 'url').then(function(){
                                    croppie_instance.croppie('setZoom', 1);
                                });

                                $('#cropper-container').on('update.croppie', function(ev, cropData) {
                                    croppie_instance.croppie('result', {
                                        type: 'canvas',
                                        size: {width: 300, height: 300}
                                    }).then(function (src) {
                                        $('#hidden-image').val(src);
                                    });
                                });
                            }, function() {
                                this_input.val('');
                            });
                        });
                        // Firefox bug fix
                        input.addEventListener('focus', function(){ input.classList.add('has-focus'); });
                        input.addEventListener('blur', function(){ input.classList.remove('has-focus'); });
                    });
                }
            },
            cookies: {
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
                    document.cookie = name + "=" + value + "; " + expires + ";domain=.dentacoin.com;path=/;secure";
                },
                erase: function(name) {
                    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                },
                get: function(name) {
                    name = name + "=";
                    var ca = document.cookie.split(';');
                    for(var i=0; i<ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0)==' ') c = c.substring(1);
                        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                    }
                    return "";
                }
            },
            initCustomCheckboxes: function() {
                for (var i = 0, len = $('.custom-checkbox-style').length; i < len; i+=1) {
                    if (!$('.custom-checkbox-style').eq(i).hasClass('already-custom-style')) {
                        $('.custom-checkbox-style').eq(i).prepend('<label for="'+$('.custom-checkbox-style').eq(i).find('input[type="checkbox"]').attr('id')+'" class="custom-checkbox"></label>');
                        $('.custom-checkbox-style').eq(i).addClass('already-custom-style');
                    }
                }

                $('.custom-checkbox-style .custom-checkbox-input').unbind('change').on('change', function() {
                    if ($(this).is(':checked')) {
                        $(this).closest('.custom-checkbox-style').find('.custom-checkbox').addClass('gateway-platform-background-color-important').html('✓');
                    } else {
                        $(this).closest('.custom-checkbox-style').find('.custom-checkbox').removeClass('gateway-platform-background-color-important').html('');
                    }

                    if ($(this).attr('data-radio-group') != undefined) {
                        for (var i = 0, len = $('[data-radio-group="'+$(this).attr('data-radio-group')+'"]').length; i < len; i+=1) {
                            if (!$(this).is($('[data-radio-group="'+$(this).attr('data-radio-group')+'"]').eq(i))) {
                                $('[data-radio-group="'+$(this).attr('data-radio-group')+'"]').eq(i).prop('checked', false);
                                $('[data-radio-group="'+$(this).attr('data-radio-group')+'"]').eq(i).closest('.custom-checkbox-style').find('.custom-checkbox').removeClass('gateway-platform-background-color-important').html('');
                            }
                        }
                    }
                });
            },
            hideGateway: function(removeEvents) {
                // remove popup
                $('.dentacoin-login-gateway-container').remove();
                $('body').removeClass('dentacoin-login-gateway-overflow-hidden');

                if (removeEvents != undefined && removeEvents == true) {
                    // reset the event listeners
                    $(document).off('civicCustomBtnClicked');
                    $(document).off('civicRead');
                    $(document).off('receivedFacebookToken');
                    $(document).off('facebookCustomBtnClicked');
                    $(document).off('cannotLoginBecauseOfMissingCookies');
                    $(document).off('noUserIdReceived');
                    $(document).off('noCoreDBApiConnection');
                    $(document).off('customCivicFbStopperTriggered');
                    $(document).off('registeredAccountMissingEmail');
                    $(document).off('patientAuthSuccessResponse');
                    $(document).off('patientAuthErrorResponse');
                    $(document).off('dentistAuthSuccessResponse');
                    $(document).off('noExternalLoginProviderConnection');
                    $(document).off('civicSipError');
                    $(document).off('getAfterDentistRegistrationPopupForDentist');
                    $(document).off('getAfterDentistRegistrationPopupForClinic');
                }
            },
            hidePopup: function() {
                // remove popup
                $('.dentacoin-login-gateway-container').remove();

                $('body').removeClass('dentacoin-login-gateway-overflow-hidden');
            }
        },
        init: async function(params) {
            if ((typeof params !== 'object' && params === null) || (!hasOwnProperty.call(params, 'platform') || !hasOwnProperty.call(params, 'forgotten_password_link'))) {
                // false params
                console.error('False params passed to dentacoin login gateway.');
            } else {
                // check internet connection
                if (!navigator.onLine) {
                    console.error('Dentacoin login gateway requires internet connection.');
                    return false;
                }

                if (hasOwnProperty.call(params, 'environment') && params.environment == 'staging') {
                    apiDomain = 'https://dev-api.dentacoin.com';
                    environment = 'staging';
                }

                var platformsData = await dcnGateway.dcnGatewayRequests.getPlatformsData();
                var validPlatform = false;
                var currentPlatformColor;
                var currentPlatformDomain;
                for (var i = 0, len = platformsData.length; i < len; i+=1) {
                    if (platformsData[i].slug == params.platform) {
                        validPlatform = true;
                        currentPlatformColor = platformsData[i].color;
                        currentPlatformDomain = platformsData[i].link;
                        break;
                    }
                }

                // load platform styles
                var platform_color_and_background = '<style class="platform-colors">.gateway-platform-color{color:'+currentPlatformColor+';}.gateway-platform-color-important{color:'+currentPlatformColor+' !important;}.gateway-platform-background-color{background-color:'+currentPlatformColor+'}.gateway-platform-background-color-important{background-color:'+currentPlatformColor+' !important;}.gateway-platform-border-color{border-color:'+currentPlatformColor+';}.gateway-platform-border-color-important{border-color:'+currentPlatformColor+' !important;}.tooltip-label:after {border-top-color:'+currentPlatformColor+' !important;}</style>';
                $('head').append(platform_color_and_background);

                // load avatar cropper
                $('head').append('<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/croppie/croppie.css"/>');
                await $.getScript('https://dentacoin.com/assets/libs/croppie/croppie.min.js', function() {});

                // platform parameter
                if (!validPlatform) {
                    console.error('False \'platform\' parameter passed to dentacoin login gateway.');
                    return false;
                }

                // show login gateway by url
                var getParams = dcnGateway.utils.getGETParameters();
                console.log(getParams, 'getParams');

                async function showGateway(type, data) {
                    var gatewayData = {
                        'type' : type
                    };

                    if (data != undefined) {
                        gatewayData.data = data;
                    }

                    if (environment == 'staging') {
                        gatewayData.staging = true;
                    }

                    // if inviter in the URL pass it to the gateway
                    if (getParams.hasOwnProperty('inviter')) {
                        gatewayData.inviter = getParams.inviter;
                    }

                    var gatewayHtml = await dcnGateway.dcnGatewayRequests.getGatewayHtml(gatewayData);
                    if (gatewayHtml.success) {
                        if (!loadedSocialLibs) {
                            console.log('Load external libraries.');
                            // =============================================== CIVIC =======================================================
                            await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic-combined-login.js?v='+new Date().getTime(), function() {});

                            // =============================================== FACEBOOK ====================================================
                            await $.getScript('https://dentacoin.com/assets/libs/facebook-login/facebook-combined-login.js?v='+new Date().getTime(), function() {});
                            loadedSocialLibs = true;
                        }

                        dcnGateway.utils.hideGateway(true);

                        $('body').addClass('dentacoin-login-gateway-overflow-hidden').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper">'+gatewayHtml.data+'</div></div>');

                        //setup forgotten password link
                        $('.dentacoin-login-gateway-container .forgotten-password-link').attr('href', params.forgotten_password_link);

                        if (params.platform == 'assurance' || params.platform == 'trusted-reviews') {
                            $('.popup-header-action a[data-type="patient"]').html('PATIENTS');
                        }

                        // init custom checkboxes style
                        dcnGateway.utils.initCustomCheckboxes();
                        
                        // init custom inputs styles
                        $('body').on('click', '.custom-google-label-style label', function() {
                            $(this).addClass('active-label gateway-platform-color-important');
                            if ($('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                                $(this).parent().find('input').addClass('gateway-platform-border-color-important');
                            }
                        });

                        $('body').on('keyup change focusout', '.custom-google-label-style input', function() {
                            var value = $(this).val().trim();
                            if (value.length) {
                                $(this).closest('.custom-google-label-style').find('label').addClass('active-label gateway-platform-color-important');
                                if ($(this).closest('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                                    $(this).addClass('gateway-platform-border-color-important');
                                }
                            } else {
                                $(this).closest('.custom-google-label-style').find('label').removeClass('active-label gateway-platform-color-important');
                                if ($(this).closest('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                                    $(this).removeClass('gateway-platform-border-color-important');
                                }
                            }
                        });

                        $('.dentacoin-login-gateway-container .popup-header-action a').click(function() {
                            $('.dentacoin-login-gateway-container .popup-header-action a').removeClass('active gateway-platform-background-color-important');
                            if ($(this).attr('data-type') == 'patient') {
                                $(this).addClass('active gateway-platform-background-color-important');
                            } else {
                                $(this).addClass('active');
                            }

                            $('.dentacoin-login-gateway-container .popup-body > .inline-block').addClass('custom-hide');
                            $('.dentacoin-login-gateway-container .popup-body .'+$(this).attr('data-type')).removeClass('custom-hide');
                        });

                        $('.dentacoin-login-gateway-container .call-sign-up').click(function() {
                            $('.dentacoin-login-gateway-container .form-login').addClass('display-none');
                            $('.dentacoin-login-gateway-container .form-register').removeClass('display-none');
                        });

                        $('.dentacoin-login-gateway-container .call-log-in').click(function() {
                            $('.dentacoin-login-gateway-container .form-login').removeClass('display-none');
                            $('.dentacoin-login-gateway-container .form-register').addClass('display-none');
                        });

                        // ====================== PATIENT LOGIN/ SIGNUP LOGIC ======================

                        $('.dentacoin-login-gateway-container .patient .form-register #privacy-policy-registration-patient').on('change', function() {
                            if ($(this).is(':checked') && $('.dentacoin-login-gateway-container .patient .form-register #agree-over-eighteen').is(':checked')) {
                                $('.dentacoin-login-gateway-container .patient .form-register .facebook-custom-btn').removeAttr('custom-stopper');
                                $('.dentacoin-login-gateway-container .patient .form-register .civic-custom-btn').removeAttr('custom-stopper');
                            } else {
                                $('.dentacoin-login-gateway-container .patient .form-register .facebook-custom-btn').attr('custom-stopper', 'true');
                                $('.dentacoin-login-gateway-container .patient .form-register .civic-custom-btn').attr('custom-stopper', 'true');
                            }
                        });

                        $('.dentacoin-login-gateway-container .patient .form-register #agree-over-eighteen').on('change', function() {
                            if ($(this).is(':checked') && $('.dentacoin-login-gateway-container .patient .form-register #privacy-policy-registration-patient').is(':checked')) {
                                $('.dentacoin-login-gateway-container .patient .form-register .facebook-custom-btn').removeAttr('custom-stopper');
                                $('.dentacoin-login-gateway-container .patient .form-register .civic-custom-btn').removeAttr('custom-stopper');
                            } else {
                                $('.dentacoin-login-gateway-container .patient .form-register .facebook-custom-btn').attr('custom-stopper', 'true');
                                $('.dentacoin-login-gateway-container .patient .form-register .civic-custom-btn').attr('custom-stopper', 'true');
                            }
                        });

                        $(document).on('civicCustomBtnClicked', function (event) {
                            $('.dentacoin-login-gateway-container .patient .form-register .step-errors-holder').html('');
                        });

                        $(document).on('civicRead', async function (event) {
                            dcnGateway.utils.hideGateway();
                            dcnGateway.utils.showLoader('Receiving your details from Civic...');
                        });

                        $(document).on('receivedFacebookToken', async function (event) {
                            dcnGateway.utils.hideGateway();
                            dcnGateway.utils.showLoader('Receiving your details from Facebook...');
                        });

                        $(document).on('facebookCustomBtnClicked', function (event) {
                            $('.dentacoin-login-gateway-container .patient .form-register .step-errors-holder').html('');
                        });

                        $(document).on('cannotLoginBecauseOfMissingCookies', function (event) {
                            dcnGateway.utils.showPopup('Please accept the strictly necessary cookies in order to continue with logging in.', 'alert');
                        });

                        $(document).on('noUserIdReceived', function (event) {
                            dcnGateway.utils.showPopup(event.message, 'alert');
                        });

                        $(document).on('noCoreDBApiConnection', function (event) {
                            dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                        });

                        $(document).on('customCivicFbStopperTriggered', function (event) {
                            dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .patient .form-register .step-errors-holder'), 'Please confirm you\'re 18 years of age and agree with our Privacy Policy.');
                        });

                        $(document).on('registeredAccountMissingEmail', async function (event) {
                            dcnGateway.utils.hideLoader();

                            $('.login-section-title').html('UPDATE YOUR EMAIL');

                            $('.dentacoin-login-gateway-container .patient .form-login .form-login-fields').hide();
                            $('.dentacoin-login-gateway-container .patient .form-login').append('<div class="registered-user-without-email-parent"><div class="padding-bottom-10 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="registered-patient-without-email">Email address:</label><input class="full-rounded form-field" maxlength="100" type="email" id="registered-patient-without-email" /></div><div class="dentacoin-login-gateway-fs-14 light-gray-color padding-top-5">Please add your email address to continue.</div></div><div class="patient-register-checkboxes padding-top-5"><div class="custom-checkbox-style"><input type="checkbox" class="custom-checkbox-input" id="privacy-policy-registered-user-without-email"/><label class="dentacoin-login-gateway-fs-15 custom-checkbox-label" for="privacy-policy-registered-user-without-email">I agree with <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label></div></div><div class="text-right padding-top-15"><a href="javascript:void(0);" class="platform-button opposite gateway-platform-color-important dentacoin-login-gateway-fs-20 save-registered-patient-without-email inline-block">CONTINUE</a></div></div>');

                            dcnGateway.utils.initCustomCheckboxes();

                            $('.dentacoin-login-gateway-container .patient .form-login .save-registered-patient-without-email').click(async function() {
                                $('.registered-user-without-email-parent .error-handle').remove();

                                if ($('.dentacoin-login-gateway-container .patient .form-login #registered-patient-without-email').val().trim() == '' || !dcnGateway.utils.validateEmail($('.dentacoin-login-gateway-container .patient .form-login #registered-patient-without-email').val().trim())) {
                                    dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .patient .form-login #registered-patient-without-email').closest('.field-parent'), 'Please use valid email address.');
                                } else if (!$('.dentacoin-login-gateway-container .patient .form-login #privacy-policy-registered-user-without-email').is(':checked')) {
                                    dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .patient .form-login #privacy-policy-registered-user-without-email').closest('.patient-register-checkboxes'), 'Please agree with our Privacy Policy.');
                                } else {
                                    var editUserDataData = {
                                        email: $('.dentacoin-login-gateway-container .patient .form-login #registered-patient-without-email').val().trim()
                                    };
                                    var editUserDataResponse = await dcnGateway.dcnGatewayRequests.editUserData(editUserDataData, event.response_data.token);
                                    if (editUserDataResponse.success) {
                                        // on success save email to db
                                        $.event.trigger({
                                            type: 'patientAuthSuccessResponse',
                                            response_data: event.response_data,
                                            platform_type: event.platform_type,
                                            time: new Date()
                                        });

                                        dcnGateway.utils.hideGateway(true);
                                    } else if (editUserDataResponse.errors) {
                                        var error_popup_html = '';
                                        for(var key in editUserDataResponse.errors) {
                                            error_popup_html += editUserDataResponse.errors[key]+'<br>';
                                        }

                                        dcnGateway.utils.showPopup(error_popup_html, 'alert');
                                    } else {
                                        dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                                    }
                                }
                            });
                        });

                        $(document).on('patientAuthSuccessResponse', async function (event) {
                            var createPatientSessionResponse = await dcnGateway.dcnGatewayRequests.createUserSession(currentPlatformDomain + 'patient-login', {
                                token: event.response_data.token,
                                id: event.response_data.data.id
                            });

                            if (createPatientSessionResponse.success) {
                                window.location.reload();
                            } else {
                                dcnGateway.utils.hideLoader();
                                dcnGateway.utils.showPopup('Something went wrong with the external login provider, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                            }
                        });

                        $(document).on('dentistAuthSuccessResponse', async function (event) {
                            var createDentistSessionResponse = await dcnGateway.dcnGatewayRequests.createUserSession(currentPlatformDomain + 'dentist-login', {
                                token: event.response_data.token,
                                id: event.response_data.data.id
                            });

                            if (createDentistSessionResponse.success) {
                                window.location.reload();
                            } else {
                                dcnGateway.utils.hideLoader();
                                dcnGateway.utils.showPopup('Something went wrong with the external login provider, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                            }
                        });

                        $(document).on('dentistRegisterSuccessResponse', async function (event) {
                            if (event.response_data.data.is_clinic) {
                                $.event.trigger({
                                    type: 'getAfterDentistRegistrationPopupForClinic',
                                    time: new Date(),
                                    response_data: {
                                        user: event.response_data.data.id
                                    }
                                });
                            } else {
                                $.event.trigger({
                                    type: 'getAfterDentistRegistrationPopupForDentist',
                                    time: new Date(),
                                    response_data: {
                                        user: event.response_data.data.id
                                    }
                                });
                            }
                        });

                        $(document).on('getAfterDentistRegistrationPopupForDentist', async function (event) {
                            console.log('getAfterDentistRegistrationPopupForDentist');
                            var afterDentistRegistrationPopupForDentist = await dcnGateway.dcnGatewayRequests.getAfterDentistRegistrationPopup({
                                'user-type': 'dentist'
                            });

                            if (afterDentistRegistrationPopupForDentist.success) {
                                dcnGateway.utils.showPopup(afterDentistRegistrationPopupForDentist.data, 'enrich-profile', null, {
                                    user: event.response_data.user
                                });
                            }
                        });

                        $(document).on('getAfterDentistRegistrationPopupForClinic', async function (event) {
                            console.log('getAfterDentistRegistrationPopupForClinic');
                            var afterDentistRegistrationPopupForClinic = await dcnGateway.dcnGatewayRequests.getAfterDentistRegistrationPopup({
                                'user-type': 'clinic'
                            });

                            if (afterDentistRegistrationPopupForClinic.success) {
                                dcnGateway.utils.showPopup(afterDentistRegistrationPopupForClinic.data, 'enrich-profile', null, {
                                    user: event.response_data.user
                                });
                            }
                        });

                        $(document).on('patientAuthErrorResponse', function (event) {
                            var error_popup_html = '';
                            console.log(event.response_data, 'event.response_data');
                            // I need type here or separated messages for each platform
                            // currently the messages for not existing account or deleted one are WRONG
                            if (event.response_data.errors) {
                                for(var key in event.response_data.errors) {
                                    error_popup_html += event.response_data.errors[key]+'<br>';
                                }
                            }

                            dcnGateway.utils.hideLoader();
                            dcnGateway.utils.showPopup(error_popup_html, 'alert');
                        });

                        $(document).on('noExternalLoginProviderConnection', function (event) {
                            dcnGateway.utils.hideLoader();
                            dcnGateway.utils.showPopup('Something went wrong with the external login provider, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                        });

                        $(document).on('civicSipError', function (event) {
                            dcnGateway.utils.hideLoader();
                            dcnGateway.utils.showPopup('Something went wrong with the external login provider, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                        });

                        // ====================== /PATIENT LOGIN/ SIGNUP LOGIC ======================

                        // ====================== DENTIST LOGIN/ SIGNUP LOGIC ======================
                        //DENTIST LOGIN
                        $('.dentacoin-login-gateway-container form#dentist-login').on('submit', async function(event) {
                            $('.dentist-login-errors').html('');

                            var this_form_native = this;
                            var this_form = $(this_form_native);
                            event.preventDefault();

                            if (dcnGateway.utils.cookies.get('strictly_necessary_policy') != '1') {
                                dcnGateway.utils.showPopup('Please accept the strictly necessary cookies in order to continue with logging in.', 'alert');
                            } else {
                                //clear prev errors
                                if ($('.dentacoin-login-gateway-container form#dentist-login .error-handle').length) {
                                    $('.dentacoin-login-gateway-container form#dentist-login .error-handle').remove();
                                }

                                var form_fields = this_form.find('.form-field');
                                var submit_form = true;
                                for(var i = 0, len = form_fields.length; i < len; i+=1) {
                                    if (form_fields.eq(i).attr('type') == 'email' && !dcnGateway.utils.validateEmail(form_fields.eq(i).val().trim())) {
                                        dcnGateway.utils.customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Please use valid email address.');
                                        submit_form = false;
                                    }

                                    if (form_fields.eq(i).val().trim() == '') {
                                        dcnGateway.utils.customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'This field is required.');
                                        submit_form = false;
                                    }
                                }

                                if (submit_form) {
                                    //check if existing account
                                    var check_account_response = await dcnGateway.dcnGatewayRequests.checkDentistAccount($('.dentacoin-login-gateway-container form#dentist-login input[name="email"]').val().trim(), $('.dentacoin-login-gateway-container form#dentist-login input[name="password"]').val().trim());
                                }

                                if (submit_form && check_account_response.success) {
                                    dcnGateway.utils.fireGoogleAnalyticsEvent('DentistLogin', 'Click', 'Dentist Login');

                                    var dentistLoginParams = {
                                        'email' : $('.dentacoin-login-gateway-container form#dentist-login input[name="email"]').val().trim(),
                                        'password' : $('.dentacoin-login-gateway-container form#dentist-login input[name="password"]').val().trim()
                                    };

                                    if (environment == 'staging') {
                                        dentistLoginParams.staging = true;
                                    }

                                    var loggingDentistResponse = await dcnGateway.dcnGatewayRequests.dentistLogin(dentistLoginParams);

                                    if (loggingDentistResponse.success) {
                                        // if password is weak force dentist to update it
                                        if (!dcnGateway.utils.validatePassword($('.dentacoin-login-gateway-container form#dentist-login input[name="password"]').val().trim())) {
                                            console.log(loggingDentistResponse.success, 'loggingDentistResponse.success');
                                            $('.dentist .form-login').html('<h2>UPDATE YOUR PASSWORD</h2><form method="POST" id="dentist-update-password"><div class="padding-bottom-10 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="dentist-update-password-field">Password:</label><input class="full-rounded form-field required password" minlength="8" maxlength="30" type="password" id="dentist-update-password-field"/></div></div><div class="padding-bottom-20 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="dentist-update-repeat-password-field">Repeat password:</label><input class="full-rounded form-field required repeat-password" minlength="8" maxlength="30" type="password" id="dentist-update-repeat-password-field"/></div></div><div class="dentist-update-password-errors"></div><div class="btn-container text-center padding-top-20 padding-bottom-50"><input type="submit" value="SAVE" class="platform-button gateway-platform-background-color-important dentacoin-login-gateway-fs-20"/></div></form>');
                                            
                                            $('.dentist .form-login #dentist-update-password').on('submit', async function(event) {
                                                var this_form_native = this;
                                                var this_form = $(this_form_native);
                                                var errors = false;
                                                event.preventDefault();
                                                $('.dentist .form-login #dentist-update-password .error-handle').remove();
                                                var dentist_update_password_inputs = $('.dentist .form-login #dentist-update-password .form-field.required');
                                                
                                                for(var i = 0, len = dentist_update_password_inputs.length; i < len; i+=1) {
                                                    if (dentist_update_password_inputs.eq(i).val().trim() == '') {
                                                        dcnGateway.utils.customErrorHandle(dentist_update_password_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                                        errors = true;
                                                    }
                                                }

                                                var password = $('.dentist .form-login #dentist-update-password #dentist-update-password-field').val().trim();

                                                if (password != $('.dentist .form-login #dentist-update-password #dentist-update-repeat-password-field').val().trim()) {
                                                    dcnGateway.utils.customErrorHandle($('.dentist .form-login #dentist-update-password .dentist-update-password-errors'), 'Both passwords don\'t match.');
                                                    errors = true;
                                                }

                                                if (!dcnGateway.utils.validatePassword(password)) {
                                                    dcnGateway.utils.customErrorHandle($('.dentist .form-login #dentist-update-password .dentist-update-password-errors'), 'Password must contain between 8 and 30 symbols with at least one uppercase letter, one lowercase letter and a number or a special character.');
                                                    errors = true;
                                                }
                                                
                                                if (!errors) {
                                                    // update pass
                                                    var editUserDataData = {
                                                        'password': password,
                                                        'password-repeat': $('.dentist .form-login #dentist-update-password #dentist-update-repeat-password-field').val().trim()
                                                    };
                                                    var editUserDataResponse = await dcnGateway.dcnGatewayRequests.editUserData(editUserDataData, loggingDentistResponse.data.token);
                                                    if (editUserDataResponse.success) {
                                                        // on success save email to db
                                                        $.event.trigger({
                                                            type: 'dentistAuthSuccessResponse',
                                                            response_data: loggingDentistResponse.data,
                                                            platform_type: params.platform,
                                                            time: new Date()
                                                        });

                                                        dcnGateway.utils.hideGateway(true);
                                                    } else if (editUserDataResponse.errors) {
                                                        var error_popup_html = '';
                                                        for(var key in editUserDataResponse.errors) {
                                                            error_popup_html += editUserDataResponse.errors[key]+'<br>';
                                                        }

                                                        dcnGateway.utils.showPopup(error_popup_html, 'alert');
                                                    } else {
                                                        dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                                                    }
                                                }
                                            });
                                        } else {
                                            $.event.trigger({
                                                type: 'dentistAuthSuccessResponse',
                                                response_data: loggingDentistResponse.data,
                                                platform_type: params.platform,
                                                time: new Date()
                                            });

                                            dcnGateway.utils.hideGateway(true);
                                        }
                                    } else if (loggingDentistResponse.error) {
                                        if (typeof(loggingDentistResponse.message) === 'object' && loggingDentistResponse.message !== null) {
                                            var error_popup_html = '';
                                            for(var key in loggingDentistResponse.message) {
                                                error_popup_html += loggingDentistResponse.message[key]+'<br>';
                                            }
                                            $('.dentist-login-errors').html('<div class="error-handle">'+error_popup_html+'</div>');
                                        } else {
                                            $('.dentist-login-errors').html('<div class="error-handle">'+loggingDentistResponse.message+'</div>');
                                        }
                                    } else {
                                        dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                                    }
                                } else if (submit_form && check_account_response.error) {
                                    dcnGateway.utils.customErrorHandle(this_form.find('input[name="password"]').closest('.field-parent'), check_account_response.message);
                                }
                            }
                        });

                        //DENTIST REGISTER
                        $('.dentacoin-login-gateway-container .dentist .form-register .prev-step').click(function() {
                            var current_step = $('.dentacoin-login-gateway-container .dentist .form-register .step.visible');
                            var current_prev_step = current_step.prev();
                            current_step.removeClass('visible');
                            if (current_prev_step.hasClass('first')) {
                                $(this).hide();
                            }
                            current_prev_step.addClass('visible');

                            $('.dentacoin-login-gateway-container .dentist .form-register .next-step').val('Next');
                            $('.dentacoin-login-gateway-container .dentist .form-register .next-step').attr('data-current-step', current_prev_step.attr('data-step'));
                        });

                        $('.changeable-color-on-selected-value').on('change', function() {
                            if ($(this).val() == '') {
                                $(this).addClass('dcn-gateway-gray-color');
                            } else {
                                $(this).removeClass('dcn-gateway-gray-color');
                            }
                        });

                        // change htmls based on the selected option
                        for (var i = 0, len = $('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').length; i < len; i+=1) {
                            if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                $('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).html($('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).attr('data-dentist'));
                            } else {
                                $('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).html($('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).attr('data-clinic'));
                            }
                        }

                        // change htmls based on the selected option
                        for (var i = 0, len = $('.dentacoin-login-gateway-container .changeable-html-based-on-resolution').length; i < len; i+=1) {
                            if ($(window).width() < 1200) {
                                $('.dentacoin-login-gateway-container .changeable-html-based-on-resolution').eq(i).html($('.dentacoin-login-gateway-container .changeable-html-based-on-resolution').eq(i).attr('data-mobile'));
                            } else {
                                $('.dentacoin-login-gateway-container .changeable-html-based-on-resolution').eq(i).html($('.dentacoin-login-gateway-container .changeable-html-based-on-resolution').eq(i).attr('data-desktop'));
                            }
                        }

                        //SECOND STEP INIT LOGIC
                        $('.dentacoin-login-gateway-container .step.second .user-type-container .user-type').click(function() {
                            $('.dentacoin-login-gateway-container .step.second .show-on-user-type-first-change').show();
                            $('.dentacoin-login-gateway-container .step.second .user-type-container .error-handle').hide();

                            $('.dentacoin-login-gateway-container .step.second .user-type-container .user-type').removeClass('active');
                            $('.dentacoin-login-gateway-container .step.second .user-type-container .custom-button').removeClass('gateway-platform-border-color-important');
                            $('.dentacoin-login-gateway-container .step.second .user-type-container .custom-button .circle').removeClass('gateway-platform-background-color-important');
                            $('.dentacoin-login-gateway-container .step.second .user-type-container .user-type-label').removeClass('gateway-platform-color');

                            $(this).addClass('active');
                            $(this).find('.custom-button .circle').addClass('gateway-platform-background-color-important');
                            $(this).find('.custom-button').addClass('gateway-platform-border-color-important');
                            $(this).find('.user-type-label').addClass('gateway-platform-color');
                            $('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val($(this).attr('data-type'));

                            // change htmls based on the selected option
                            for (var i = 0, len = $('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').length; i < len; i+=1) {
                                if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                    $('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).html($('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).attr('data-dentist'));
                                } else {
                                    $('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).html($('.dentacoin-login-gateway-container .changeable-html-based-on-user-type').eq(i).attr('data-clinic'));
                                }
                            }

                            // show addition fields only if dentist
                            if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                $('.show-if-dentist').show();
                                $('.show-if-clinic').hide();
                                $('.show-if-clinic .to-be-required').removeClass('required');

                                if ($('.dentacoin-login-gateway-container .step.second [name="dentist-type"]:checked').val() == undefined) {
                                    $('.show-if-dentist-type-selected').hide();
                                }
                            } else {
                                $('.show-if-dentist').hide();
                                $('.show-if-clinic').show();
                                $('.show-if-dentist-type-selected').show();
                                $('.show-if-clinic .to-be-required').addClass('required');
                            }
                        });

                        $('.dentacoin-login-gateway-container .step.second select[name="clinic-member-job-title"]').on('change', function() {
                            if ($(this).val() == 'other') {
                                $(this).closest('.field-parent').append('<div class="custom-google-label-style module clinic-member-job-title-other-parent" data-input-colorful-border="true"><label for="clinic-member-job-title-other">Please specify:</label><input class="full-rounded form-field required" name="clinic-member-job-title-other" maxlength="50" type="text" id="clinic-member-job-title-other"/></div>');

                                $('.dentacoin-login-gateway-container .step.second .clinic-member-job-title-other-parent #clinic-member-job-title-other').focus();
                                $('.dentacoin-login-gateway-container .step.second .clinic-member-job-title-other-parent label[for="clinic-member-job-title-other"]').addClass('active-label');
                            } else {
                                $(this).closest('.field-parent').find('.clinic-member-job-title-other-parent').remove();
                            }
                        });

                        $('.dentacoin-login-gateway-container .step.second [name="dentist-type"]').on('change', function() {
                            $('.dentacoin-login-gateway-container .step.second .show-if-dentist-type-selected').show();

                            if ($(this).val() == 'work_at_practice') {
                                $('.dentacoin-login-gateway-container .step.second .if-work-for-a-practice').html('<div class="padding-bottom-15 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="practice-name">Practice name:</label><input class="full-rounded form-field" name="practice-name" maxlength="255" type="text" id="practice-name"/></div></div><div class="padding-bottom-15 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="practice-email">Official email:</label><input class="full-rounded form-field" name="practice-email" maxlength="100" type="text" id="practice-email"/></div></div>');
                            } else {
                                $('.dentacoin-login-gateway-container .step.second .if-work-for-a-practice').html('');
                            }
                        });

                        //THIRD STEP INIT LOGIC
                        $('.dentacoin-login-gateway-container #dentist-country').on('change', function() {
                            $('.dentacoin-login-gateway-container .step.third .phone .country-code').html('+'+$(this).find('option:selected').attr('data-code'));
                        });

                        //FOURTH STEP INIT LOGIC
                        dcnGateway.utils.styleAvatarUploadButton();

                        function collectFirstAndSecondStepData() {
                            var secondStepIncompleteRegistrationParams = {
                                'platform' : params.platform,
                                'email' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-email').val().trim(),
                                'password' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-password').val().trim(),
                                'name' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-latin-name').val().trim(),
                                'type' : $('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val()
                            };

                            if ($('.dentacoin-login-gateway-container form#dentist-register #dentist-register-alternative-name').val().trim() != '') {
                                secondStepIncompleteRegistrationParams['name_alternative'] = $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-alternative-name').val().trim();
                            }

                            if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                secondStepIncompleteRegistrationParams['title'] = $('.dentacoin-login-gateway-container form#dentist-register select[name="dentist-title"]').val().trim();
                                secondStepIncompleteRegistrationParams['dentist_practice'] = $('.dentacoin-login-gateway-container .step.second [name="dentist-type"]:checked').val();

                                if (secondStepIncompleteRegistrationParams['dentist_practice'] == 'work_at_practice') {
                                    secondStepIncompleteRegistrationParams['clinic_name'] = $('.dentacoin-login-gateway-container .step.second #practice-name').val().trim();
                                    secondStepIncompleteRegistrationParams['clinic_email'] = $('.dentacoin-login-gateway-container .step.second #practice-email').val().trim();
                                }
                            } else if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'clinic') {
                                secondStepIncompleteRegistrationParams['worker_name'] = $('.dentacoin-login-gateway-container .step.second #clinic-member-name').val().trim();
                                secondStepIncompleteRegistrationParams['working_position'] = $('.dentacoin-login-gateway-container .step.second [name="clinic-member-job-title"]').val();

                                if (secondStepIncompleteRegistrationParams['working_position'] == 'other') {
                                    secondStepIncompleteRegistrationParams['working_position_label'] = $('.dentacoin-login-gateway-container .step.second #clinic-member-job-title-other').val().trim();
                                }
                            }

                            return secondStepIncompleteRegistrationParams;
                        }

                        var userCountryCode;

                        async function initThirdStepLogic() {
                            // get user country code
                            userCountryCode = await dcnGateway.dcnGatewayRequests.getUserCountry();
                            // setup current country in the dropdown and phone number
                            if(userCountryCode.success) {
                                $('.step.third #dentist-country').attr('data-current-user-country-code', userCountryCode.success);
                                $('.step.third #dentist-country option[value="'+userCountryCode.success+'"]').prop('selected', true);
                            }
                            $('.step.third .country-code').html('+'+$('.step.third #dentist-country option[value="'+userCountryCode.success+'"]').attr('data-code'));

                            // ====================================== GOOGLE ADDRESS SUGGESTER =============================================
                            if (!loadedAddressSuggesterLib) {
                                await $.getScript('https://dentacoin.com/assets/js/address-combined-login.js?v='+new Date().getTime(), function() {});
// init Google address suggester
                                if (typeof initAddressSuggesters === 'function') {
                                    initAddressSuggesters();
                                }
                                loadedAddressSuggesterLib = false;
                            }
                        }

                        async function initFourthStepLogic() {
                            // ====================================== GOOGLE ADDRESS SUGGESTER =============================================
                            if (!loadedAddressSuggesterLib) {
                                await $.getScript('https://dentacoin.com/assets/js/address-combined-login.js?v='+new Date().getTime(), function() {});
// init Google address suggester
                                if (typeof initAddressSuggesters === 'function') {
                                    initAddressSuggesters();
                                }
                                loadedAddressSuggesterLib = false;
                            }

                            await $.getScript('https://www.google.com/recaptcha/api.js', function() {});
                        }

                        if ($('.next-step').attr('data-cached-step') == 'true') {
                            switch($('.next-step').attr('data-current-step')) {
                                case 'third':
                                    initThirdStepLogic();
                                    break;
                                case 'fourth':
                                    initFourthStepLogic();
                                    break;
                            }
                        }

                        //DENTIST REGISTERING FORM
                        $('.dentacoin-login-gateway-container .dentist .form-register .next-step').click(async function() {
                            var this_btn = $(this);

                            switch(this_btn.attr('data-current-step')) {
                                case 'first':
                                    var first_step_inputs = $('.dentacoin-login-gateway-container .dentist .form-register .step.first .form-field');
                                    var errors = false;
                                    $('.dentacoin-login-gateway-container .dentist .form-register .step.first').parent().find('.error-handle').remove();
                                    for(var i = 0, len = first_step_inputs.length; i < len; i+=1) {
                                        if (first_step_inputs.eq(i).attr('type') == 'email' && !dcnGateway.utils.validateEmail(first_step_inputs.eq(i).val().trim())) {
                                            dcnGateway.utils.customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'Please use valid email address.');
                                            errors = true;
                                        } else if (first_step_inputs.eq(i).attr('type') == 'email' && dcnGateway.utils.validateEmail(first_step_inputs.eq(i).val().trim())) {
                                            //coredb check if email is free
                                            var check_email_if_free_response = await dcnGateway.dcnGatewayRequests.checkIfFreeEmail(first_step_inputs.eq(i).val().trim());
                                            if (check_email_if_free_response.success == false) {
                                                dcnGateway.utils.customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), check_email_if_free_response.errors.email);
                                                errors = true;
                                            }
                                        }

                                        if (first_step_inputs.eq(i).val().trim() == '') {
                                            dcnGateway.utils.customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                            errors = true;
                                        }
                                    }

                                    var password = $('.dentacoin-login-gateway-container .dentist .form-register .step.first .form-field.password').val().trim();
                                    if (!dcnGateway.utils.validatePassword(password)) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.first .form-field.repeat-password').closest('.field-parent'), 'Password must contain between 8 and 30 symbols with at least one uppercase letter, one lowercase letter and a number or a special character.');
                                        errors = true;
                                    }

                                    if (password != $('.dentacoin-login-gateway-container .step.first .form-field.repeat-password').val().trim()) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.first .form-field.repeat-password').closest('.field-parent'), 'Both passwords don\'t match.');
                                        errors = true;
                                    }

                                    if (!errors) {
                                        dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep1');

                                        $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                        $('.dentacoin-login-gateway-container .dentist .form-register .step.second').addClass('visible');
                                        $('.dentacoin-login-gateway-container .prev-step').show();

                                        this_btn.attr('data-current-step', 'second');
                                        this_btn.val('Next');
                                    }
                                    break;
                                case 'second':
                                    var second_step_inputs = $('.dentacoin-login-gateway-container .dentist .form-register .step.second .form-field.required');
                                    var errors = false;
                                    $('.dentacoin-login-gateway-container .dentist .form-register .step.second').find('.error-handle').remove();

                                    //check form-field fields
                                    for (var i = 0, len = second_step_inputs.length; i < len; i+=1) {
                                        if (second_step_inputs.eq(i).is('select')) {
                                            //IF SELECT TAG
                                            if (second_step_inputs.eq(i).val().trim() == '') {
                                                dcnGateway.utils.customErrorHandle(second_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            }
                                        } else if (second_step_inputs.eq(i).is('input')) {
                                            //IF INPUT TAG
                                            if (second_step_inputs.eq(i).val().trim() == '') {
                                                dcnGateway.utils.customErrorHandle(second_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            } else if (second_step_inputs.eq(i).attr('type') == 'email' && !dcnGateway.utils.validateEmail(second_step_inputs.eq(i).val().trim())) {
                                                dcnGateway.utils.customErrorHandle(second_step_inputs.eq(i).closest('.field-parent'), 'Please use valid email address.');
                                                errors = true;
                                            }
                                        }
                                    }

                                    //check if latin name accepts only LATIN characters
                                    if (!/^[a-z A-Z.&'-]+$/.test($('.dentacoin-login-gateway-container .dentist .form-register .step.second input[name="latin-name"]').val().trim())) {

                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .dentist .form-register .step.second input[name="latin-name"]').closest('.field-parent'), 'This field should contain only latin characters.');
                                        errors = true;
                                    }

                                    //check if privacy policy checkbox is checked
                                    if (!$('.dentacoin-login-gateway-container .dentist .form-register .step.second #privacy-policy-registration').is(':checked')) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .dentist .form-register .step.second .privacy-policy-row'), 'Please agree with our <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a>.');
                                        errors = true;
                                    }

                                    if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == '') {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.second .user-type-container'), 'Please select which type you\'re - Dentist or Clinic.');
                                        errors = true;
                                    }

                                    // if dentist
                                    if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                        if ($('.dentacoin-login-gateway-container .step.second [name="dentist-type"]:checked').val() == undefined) {
                                            dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.second .dentist-type-checkboxes'), 'Please select one of the options.');
                                            errors = true;
                                        }

                                        if ($('.dentacoin-login-gateway-container .step.second [name="dentist-type"]:checked').val() == 'work_at_practice') {
                                            if ($('.dentacoin-login-gateway-container .step.second #practice-name').val().trim() == '') {
                                                dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.second #practice-name').closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            }

                                            if ($('.dentacoin-login-gateway-container .step.second #practice-email').val().trim() == '') {
                                                dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.second #practice-email').closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            } else if (!dcnGateway.utils.validateEmail($('.dentacoin-login-gateway-container .step.second #practice-email').val().trim())) {
                                                dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.second #practice-email').closest('.field-parent'), 'Please use valid email address.');
                                                errors = true;
                                            }
                                        }
                                    }

                                    // if clinic
                                    if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'clinic') {
                                        if ($('.dentacoin-login-gateway-container .step.second [name="clinic-member-job-title"]').val() == '') {
                                            dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.second [name="clinic-member-job-title"]').closest('.field-parent'), 'Please select job title.');
                                            errors = true;
                                        }
                                    }

                                    if (!errors) {
                                        dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep2');
                                        // save incomplete account creation data
                                        dcnGateway.dcnGatewayRequests.saveIncompleteRegistration(collectFirstAndSecondStepData());

                                        $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                        $('.dentacoin-login-gateway-container .dentist .form-register .step.third').addClass('visible');

                                        await initThirdStepLogic();

                                        this_btn.attr('data-current-step', 'third');
                                        this_btn.val('Next');
                                    }
                                    break;
                                case 'third':
                                    var third_step_inputs = $('.dentacoin-login-gateway-container .dentist .form-register .step.third .form-field.required');
                                    var errors = false;
                                    $('.dentacoin-login-gateway-container .dentist .form-register .step.third').find('.error-handle').remove();

                                    for(var i = 0, len = third_step_inputs.length; i < len; i+=1) {
                                        if (third_step_inputs.eq(i).is('select')) {
                                            //IF SELECT TAG
                                            if (third_step_inputs.eq(i).val().trim() == '') {
                                                dcnGateway.utils.customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            }
                                        } else if (third_step_inputs.eq(i).is('input')) {
                                            //IF INPUT TAG
                                            if (third_step_inputs.eq(i).val().trim() == '') {
                                                dcnGateway.utils.customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            }
                                            if (third_step_inputs.eq(i).attr('type') == 'url' && !dcnGateway.utils.validateUrl(third_step_inputs.eq(i).val().trim())) {
                                                dcnGateway.utils.customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'Please enter your website URL starting with http:// or https://.');
                                                errors = true;
                                            }
                                        }
                                    }

                                    var validate_phone = await dcnGateway.dcnGatewayRequests.validatePhone($('.dentacoin-login-gateway-container .dentist .form-register .step.third input[name="phone"]').val().trim(), $('.dentacoin-login-gateway-container .dentist .form-register .step.third select[name="country-code"]').val());
                                    if (hasOwnProperty.call(validate_phone, 'success') && !validate_phone.success) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .dentist .form-register .step.third input[name="phone"]').closest('.field-parent'), 'Please use valid phone.');
                                        errors = true;
                                    }

                                    if (stopThirdRegistrationStep == true) {
                                        errors = true;
                                    }

                                    if (!errors) {
                                        if ($('#dentist-country').attr('data-current-user-country-code') != undefined && $('#dentist-country').val() != $('#dentist-country').attr('data-current-user-country-code')) {
                                            dcnGateway.utils.showPopup('Your IP thinks differently. Sure you\'ve entered the right country?', 'warning', function() {
                                                dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep3');
                                                // save incomplete account creation data
                                                var thirdStepIncompleteRegistrationParams = collectFirstAndSecondStepData();
                                                thirdStepIncompleteRegistrationParams.platform = params.platform;
                                                thirdStepIncompleteRegistrationParams.email = $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-email').val().trim();
                                                thirdStepIncompleteRegistrationParams.country_id = $('.dentacoin-login-gateway-container .step.third [name="country-code"] option:selected').attr('data-id');
                                                thirdStepIncompleteRegistrationParams.address = $('.dentacoin-login-gateway-container .step.third #dentist-register-address').val().trim();
                                                thirdStepIncompleteRegistrationParams.website = $('.dentacoin-login-gateway-container .step.third #dentist-register-website').val().trim();
                                                thirdStepIncompleteRegistrationParams.phone = $('.dentacoin-login-gateway-container .step.third #dentist-register-phone').val().trim();
                                                dcnGateway.dcnGatewayRequests.saveIncompleteRegistration(thirdStepIncompleteRegistrationParams);

                                                $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                                $('.dentacoin-login-gateway-container .dentist .form-register .step.fourth').addClass('visible');

                                                this_btn.attr('data-current-step', 'fourth');
                                                this_btn.val('Create account');
                                            });
                                        } else {
                                            dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep3');
// save incomplete account creation data
                                            var thirdStepIncompleteRegistrationParams = collectFirstAndSecondStepData();
                                            thirdStepIncompleteRegistrationParams.platform = params.platform;
                                            thirdStepIncompleteRegistrationParams.email = $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-email').val().trim();
                                            thirdStepIncompleteRegistrationParams.country_id = $('.dentacoin-login-gateway-container .step.third [name="country-code"] option:selected').attr('data-id');
                                            thirdStepIncompleteRegistrationParams.address = $('.dentacoin-login-gateway-container .step.third #dentist-register-address').val().trim();
                                            thirdStepIncompleteRegistrationParams.website = $('.dentacoin-login-gateway-container .step.third #dentist-register-website').val().trim();
                                            thirdStepIncompleteRegistrationParams.phone = $('.dentacoin-login-gateway-container .step.third #dentist-register-phone').val().trim();
                                            dcnGateway.dcnGatewayRequests.saveIncompleteRegistration(thirdStepIncompleteRegistrationParams);

                                            $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                            $('.dentacoin-login-gateway-container .dentist .form-register .step.fourth').addClass('visible');

                                            this_btn.attr('data-current-step', 'fourth');
                                            this_btn.val('Create account');
                                        }

                                        await $.getScript('https://www.google.com/recaptcha/api.js', function() {});
                                    }
                                    break;
                                case 'fourth':
                                    $('.dentacoin-login-gateway-container .dentist .form-register .step.fourth').find('.error-handle').remove();
                                    var errors = false;
                                    //checking if empty avatar
                                    if ($('.dentist .form-register .step.fourth #custom-upload-avatar').val().trim() == '') {
                                        dcnGateway.utils.customErrorHandle($('.step.fourth .step-errors-holder'), 'Please add a profile photo.');
                                        errors = true;
                                    }

                                    //checking if no specialization checkbox selected
                                    if ($('.dentacoin-login-gateway-container .dentist .form-register .step.fourth [name="specializations[]"]:checked').val() == undefined) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.fourth .step-errors-holder'), 'Please select specialization/s.');
                                        errors = true;
                                    }

                                    //checking if no specialization checkbox selected
                                    if (typeof(grecaptcha) != undefined && grecaptcha.getResponse().length == 0) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.fourth .step-errors-holder'), 'Please prove that you\'re not a robot.');
                                        errors = true;
                                    }

                                    if (!errors) {
                                        $('.dentacoin-login-gateway-container form#dentist-register .step.fourth .step-errors-holder').html('');
                                        dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationComplete');

                                        var registerParams = {
                                            'platform' : params.platform,
                                            'grecaptcha' : grecaptcha.getResponse(),
                                            'email' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-email').val().trim(),
                                            'password' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-password').val().trim(),
                                            'repeat-password' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-repeat-password').val().trim(),
                                            'latin-name' : $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-latin-name').val().trim(),
                                            'user-type' : $('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val(),
                                            'country-code' : $('.dentacoin-login-gateway-container .step.third [name="country-code"]').val(),
                                            'address' : $('.dentacoin-login-gateway-container .step.third #dentist-register-address').val().trim(),
                                            'website' : $('.dentacoin-login-gateway-container .step.third #dentist-register-website').val().trim(),
                                            'phone' : $('.dentacoin-login-gateway-container .step.third #dentist-register-phone').val().trim(),
                                            'specializations' : $('.dentacoin-login-gateway-container form#dentist-register input[name="password"]').val().trim(),
                                            'hidden-image' : $('.dentacoin-login-gateway-container form#dentist-register .step.fourth #hidden-image').val().trim()
                                        };

                                        var specializationsArr = [];
                                        for (var i = 0, len = $('.dentacoin-login-gateway-container form#dentist-register .step.fourth [name="specializations[]"]:checked').length; i < len; i+=1) {
                                            specializationsArr.push($('.dentacoin-login-gateway-container form#dentist-register .step.fourth [name="specializations[]"]:checked').eq(i).val());
                                        }
                                        registerParams['specializations'] = JSON.stringify(specializationsArr);

                                        if ($('.dentacoin-login-gateway-container form#dentist-register #dentist-register-alternative-name').val().trim() != '') {
                                            registerParams['alternative-name'] = $('.dentacoin-login-gateway-container form#dentist-register #dentist-register-alternative-name').val().trim();
                                        }

                                        if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                            registerParams['dentist-title'] = $('.dentacoin-login-gateway-container form#dentist-register select[name="dentist-title"]').val().trim();
                                            registerParams['dentist_practice'] = $('.dentacoin-login-gateway-container .step.second [name="dentist-type"]:checked').val();

                                            if (registerParams['dentist_practice'] == 'work_at_practice') {
                                                registerParams['clinic_name'] = $('.dentacoin-login-gateway-container .step.second #practice-name').val().trim();
                                                registerParams['clinic_email'] = $('.dentacoin-login-gateway-container .step.second #practice-email').val().trim();
                                            }
                                        } else if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'clinic') {
                                            registerParams['worker_name'] = $('.dentacoin-login-gateway-container .step.second #clinic-member-name').val().trim();
                                            registerParams['working_position'] = $('.dentacoin-login-gateway-container .step.second [name="clinic-member-job-title"]').val();

                                            if (registerParams['working_position'] == 'other') {
                                                registerParams['working_position_label'] = $('.dentacoin-login-gateway-container .step.second #clinic-member-job-title-other').val().trim();
                                            }
                                        }

                                        if (environment == 'staging') {
                                            registerParams.staging = true;
                                        }

                                        var registeringDentistResponse = await dcnGateway.dcnGatewayRequests.dentistRegistration(registerParams);
                                        if (registeringDentistResponse.success) {
                                            $.event.trigger({
                                                type: 'dentistRegisterSuccessResponse',
                                                response_data: registeringDentistResponse.data,
                                                platform_type: params.platform,
                                                time: new Date()
                                            });

                                            dcnGateway.utils.hideGateway(true);
                                        } else if (registeringDentistResponse.error) {
                                            if (typeof(registeringDentistResponse.message) === 'object' && registeringDentistResponse.message !== null) {
                                                var error_popup_html = '';
                                                for(var key in registeringDentistResponse.message) {
                                                    error_popup_html += registeringDentistResponse.message[key]+'<br>';
                                                }
                                                $('.dentacoin-login-gateway-container form#dentist-register .step.fourth .step-errors-holder').html('<div class="error-handle">'+error_popup_html+'</div>');
                                            } else {
                                                $('.dentacoin-login-gateway-container form#dentist-register .step.fourth .step-errors-holder').html('<div class="error-handle">'+registeringDentistResponse.message+'</div>');
                                            }
                                        } else {
                                            dcnGateway.utils.showPopup('Something went wrong, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.', 'alert');
                                        }
                                    }
                                    break;
                            }
                        });
                        return false;
                        // ====================== /DENTIST LOGIN/ SIGNUP LOGIC ======================
                    } else {
                        console.error('Something failed, please contact developer.');
                        return false;
                    }
                }

                $(document).on('click', '.dentacoin-login-gateway-container', function(event) {
                    if (event.target.className == 'dentacoin-login-gateway-container') {
                        dcnGateway.utils.hideGateway(true);
                    }
                });

                // bind gateway showing event
                $('.open-dentacoin-gateway').click(function() {
                    if ($(this).hasClass('patient-login')) {
                        showGateway('patient-login');
                    } else if ($(this).hasClass('patient-register')) {
                        showGateway('patient-register');
                    } else if ($(this).hasClass('dentist-login')) {
                        showGateway('dentist-login');
                    } else if ($(this).hasClass('dentist-register')) {
                        showGateway('dentist-register');
                    } else {
                        showGateway('patient-login');
                    }
                });

                if (hasOwnProperty.call(getParams, 'dcn-gateway-type')) {
                    if (['patient-login', 'patient-register', 'dentist-login', 'dentist-register'].indexOf(getParams['dcn-gateway-type']) == -1) {
                        console.error('Wrong dcn-gateway-type get parameter value in the url.');
                    } else {
                        showGateway(getParams['dcn-gateway-type']);
                    }
                } else if (hasOwnProperty.call(getParams, 'inviter') || hasOwnProperty.call(getParams, 'show-patient-register')) {
                    showGateway('patient-register');
                } else if (hasOwnProperty.call(getParams, 'show-login')) {
                    showGateway('patient-login');
                } else if (hasOwnProperty.call(getParams, 'temp-data-key') && hasOwnProperty.call(getParams, 'temp-data-id')) {
                    showGateway('incompleted-dentist-register', {
                        key: getParams['temp-data-key'],
                        id: getParams['temp-data-id']
                    });
                }
            }
        }
    };
}