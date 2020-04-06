if (typeof jQuery == 'undefined') {
    // no jquery installed
    console.error('Dentacoin login gateway requires the usage of jQuery.');
} else {
    var loadedSocialLibs = false;
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
            },
            checkIfFreeEmail: async function(email) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://api.dentacoin.com/api/check-email',
                    dataType: 'json',
                    data: {
                        email: email
                    }
                });
            },
            editUserData: async function(email) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://api.dentacoin.com/api/check-email',
                    dataType: 'json',
                    data: {
                        email: email
                    }
                });
            },
            checkDentistAccount: async function (email, password) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://dentacoin.com/check-dentist-account',
                    dataType: 'json',
                    data: {
                        email: email,
                        password: password
                    }
                })
            },
            validatePhone: async function (phone, country_code) {
                return await $.ajax({
                    type: 'POST',
                    url: 'https://api.dentacoin.com/api/phone/',
                    dataType: 'json',
                    data: {
                        phone: phone,
                        country_code: country_code
                    }
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
            showLoader: function() {
                $('body').append('<div class="dentacoin-login-gateway-response-layer"><div class="dentacoin-login-gateway-response-layer-wrapper"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="https://dentacoin.com/assets/images/loader.gif" alt="Loader"></figure><div class="dentacoin-login-gateway-response-message gateway-platform-color text-center dentacoin-login-gateway-fs-30">Loading ...</div></div></div>');
            },
            hideLoader: function() {
                $('.dentacoin-login-gateway-response-layer').hide();
            },
            showPopup: function(message, type, callback) {
                if (type == 'alert') {
                    $('body').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper popup">'+message+'<div class="popup-buttons"><button class="platform-button gateway-platform-background-color cancel-custom-popup">OK</button></div></div></div>');
                } else if (type == 'warning') {
                    $('body').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper popup">'+message+'<div class="popup-buttons"><button class="platform-button proceed-custom-popup green-button">YES</button><button class="platform-button cancel-custom-popup red-button">NO</button></div></div></div>');
                    

                    $('.proceed-custom-popup').click(function() {
                        callback();
                        $(this).closest('.dentacoin-login-gateway-container').remove();
                    });
                }

                $('.cancel-custom-popup').click(function() {
                    $(this).closest('.dentacoin-login-gateway-container').remove();
                });
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

                var platform_color_and_background = '<style class="platform-colors">.gateway-platform-color{color:'+currentPlatformColor+';}.gateway-platform-color-important{color:'+currentPlatformColor+' !important;}.gateway-platform-background-color{background-color:'+currentPlatformColor+'}.gateway-platform-background-color-important{background-color:'+currentPlatformColor+' !important;}.gateway-platform-border-color{border-color:'+currentPlatformColor+';}.gateway-platform-border-color-important{border-color:'+currentPlatformColor+' !important;}.tooltip-label:after {border-top-color:'+currentPlatformColor+' !important;}</style>';

                $('head').append(platform_color_and_background);

                // platform parameter
                if (!validPlatform) {
                    console.error('False \'platform\' parameter passed to dentacoin login gateway.');
                    return false;
                }

                async function showGateway(type) {
                    var gatewayHtml = await dcnGateway.dcnGatewayRequests.getGatewayHtml(type, params.user_ip);
                    if (gatewayHtml.success) {
                        if (!loadedSocialLibs) {
                            console.log('loading social libs ===========');
                            // =============================================== CIVIC =======================================================
                            await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic.js?v='+new Date().getTime(), function() {});

                            // =============================================== FACEBOOK ====================================================
                            await $.getScript('https://dentacoin.com/assets/libs/facebook-login/facebook.js?v='+new Date().getTime(), function() {});
                            loadedSocialLibs = true;
                        }

                        $('.dentacoin-login-gateway-container').remove();
                        $('body').append('<div class="dentacoin-login-gateway-container"><div class="dentacoin-login-gateway-wrapper">'+gatewayHtml.data+'</div></div>');

                        for (var i = 0, len = $('.tooltip-init').length; i < len; i+=1) {

                        }

                        //setup forgotten password link
                        $('.dentacoin-login-gateway-container .forgotten-password-link').attr('href', params.forgotten_password_link);

                        if (params.platform == 'assurance' || params.platform == 'trusted-reviews') {
                            $('.popup-header-action a[data-type="patient"]').html('PATIENTS');
                        }

                        // init custom checkboxes style
                        for (var i = 0, len = $('.custom-checkbox-style').length; i < len; i+=1) {
                            $('.custom-checkbox-style').eq(i).prepend('<div class="custom-checkbox"></div>');
                        }

                        $('.custom-checkbox-style .custom-checkbox-input').on('change', function() {
                            if ($(this).is(':checked')) {
                                $(this).closest('.custom-checkbox-style').find('.custom-checkbox').addClass('gateway-platform-background-color-important').html('✓');
                            } else {
                                $(this).closest('.custom-checkbox-style').find('.custom-checkbox').removeClass('gateway-platform-background-color-important').html('');
                            }
                        });
                        
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
                            dcnGateway.utils.showLoader();
                        });

                        $(document).on('receivedFacebookToken', async function (event) {
                            dcnGateway.utils.showLoader();
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
                            dcnGateway.utils.showPopup('Something went wrong, please try again later.', 'alert');
                        });

                        $(document).on('customCivicFbStopperTriggered', function (event) {
                            dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .patient .form-register .step-errors-holder'), 'Please confirm you\'re 18 years of age and agree with our privacy policy.');
                        });

                        $(document).on('registeredAccountMissingEmail', async function (event) {
                            console.log(event.response_data, 'registeredAccountMissingEmail');
                            console.log('====== request to save email and then fire successful login event =====');
                        });

                        $(document).on('successResponseCoreDBApi', async function (event) {
                            console.log(event.response_data, 'successResponseCoreDBApi');
                        });

                        $(document).on('errorResponseCoreDBApi', function (event) {
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

                        // ====================== /PATIENT LOGIN/ SIGNUP LOGIC ======================

                        // ====================== DENTIST LOGIN/ SIGNUP LOGIC ======================
                        //DENTIST LOGIN
                        $('.dentacoin-login-gateway-container form#dentist-login').on('submit', async function(event) {
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
                                    } else if (form_fields.eq(i).attr('type') == 'password' && form_fields.eq(i).val().length < 6) {
                                        dcnGateway.utils.customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Passwords must be min length 6.');
                                        submit_form = false;
                                    }

                                    if (form_fields.eq(i).val().trim() == '') {
                                        dcnGateway.utils.customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'This field is required.');
                                        submit_form = false;
                                    }
                                }

                                //check if existing account
                                var check_account_response = await dcnGateway.dcnGatewayRequests.checkDentistAccount($('.dentacoin-login-gateway-container form#dentist-login input[name="email"]').val().trim(), $('.dentacoin-login-gateway-container form#dentist-login input[name="password"]').val().trim());

                                if (submit_form && check_account_response.success) {
                                    dcnGateway.utils.fireGoogleAnalyticsEvent('DentistLogin', 'Click', 'Dentist Login');

                                    console.log('===== SUBMIT FORM =======');
                                    //this_form_native.submit();
                                } else if (check_account_response.error) {
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

                            // show addition fields only if dentist
                            if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                $('.show-if-dentist').show();
                                $('.show-if-clinic').hide();
                                $('.show-if-clinic .to-be-required').removeClass('required');
                            } else {
                                $('.show-if-dentist').hide();
                                $('.show-if-clinic').show();
                                $('.show-if-clinic .to-be-required').addClass('required');
                            }

                            // change htmls based on the selected option
                            for (var i = 0, len = $('.dentacoin-login-gateway-container .step.second .changeable-html-based-on-user-type').length; i < len; i+=1) {
                                if ($('.dentacoin-login-gateway-container .step.second .user-type-container [name="user-type"]').val() == 'dentist') {
                                    $('.dentacoin-login-gateway-container .step.second .changeable-html-based-on-user-type').eq(i).html($('.dentacoin-login-gateway-container .step.second .changeable-html-based-on-user-type').eq(i).attr('data-dentist'));
                                } else {
                                    $('.dentacoin-login-gateway-container .step.second .changeable-html-based-on-user-type').eq(i).html($('.dentacoin-login-gateway-container .step.second .changeable-html-based-on-user-type').eq(i).attr('data-clinic'));
                                }
                            }
                        });

                        $('.dentacoin-login-gateway-container .step.second select[name="clinic-member-job-title"]').on('change', function() {
                            if ($(this).val() == 'other') {
                                $(this).closest('.field-parent').append('<div class="custom-google-label-style module clinic-member-job-title-other-parent" data-input-colorful-border="true"><label for="clinic-member-job-title-other">Other:</label><input class="full-rounded form-field required" name="clinic-member-job-title-other" maxlength="50" type="text" id="clinic-member-job-title-other"/></div>');

                                $('.dentacoin-login-gateway-container .step.second .clinic-member-job-title-other-parent #clinic-member-job-title-other').focus();
                                $('.dentacoin-login-gateway-container .step.second .clinic-member-job-title-other-parent label[for="clinic-member-job-title-other"]').addClass('active-label');
                            } else {
                                $(this).closest('.field-parent').find('.clinic-member-job-title-other-parent').remove();
                            }
                        });

                        $('.dentacoin-login-gateway-container .step.second [name="dentist-type"]').on('change', function() {
                            if ($(this).val() == 'work-for-practise') {
                                $('.dentacoin-login-gateway-container .step.second .if-work-for-a-practise').html('<div class="padding-bottom-15 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="practise-name">Practise name:</label><input class="full-rounded form-field required" name="practise-name" maxlength="255" type="text" id="practise-name"/></div></div><div class="padding-bottom-15 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true"><label for="practise-email">Official email:</label><input class="full-rounded form-field required" name="practise-email" maxlength="60" type="email" id="practise-email"/></div></div>');
                            } else {
                                $('.dentacoin-login-gateway-container .step.second .if-work-for-a-practise').html('');
                            }
                        });

                        //THIRD STEP INIT LOGIC
                        $('.dentacoin-login-gateway-container #dentist-country').on('change', function() {
                            $('.dentacoin-login-gateway-container .step.third .phone .country-code').html('+'+$(this).find('option:selected').attr('data-code'));
                        });

                        //FOURTH STEP INIT LOGIC
                        console.log('styleAvatarUploadButton');

                        //DENTIST REGISTERING FORM
                        $('.dentacoin-login-gateway-container .dentist .form-register .next-step').click(async function() {
                            var this_btn = $(this);
                            console.log(this_btn.attr('data-current-step'), 'this_btn.attr(\'data-current-step\')');

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

                                        /*if (first_step_inputs.eq(i).attr('type') == 'password' && first_step_inputs.eq(i).val().length < 6) {
                                            dcnGateway.utils.customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'Passwords must be min length 6.');
                                            errors = true;
                                        }*/

                                        if (first_step_inputs.eq(i).val().trim() == '') {
                                            dcnGateway.utils.customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                            errors = true;
                                        }
                                    }

                                    var password = $('.dentacoin-login-gateway-container .dentist .form-register .step.first .form-field.password').val();
                                    if (password.trim().length < 8 || password.trim().length > 30 || !dcnGateway.utils.hasLowerCase(password) || !dcnGateway.utils.hasUpperCase(password) || !dcnGateway.utils.hasNumber(password)) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.first .form-field.repeat-password').closest('.field-parent'), 'Password must contain between 8 and 30 symbols with at least one uppercase letter, one lowercase letter and a number or a special character.');
                                        errors = true;
                                    }

                                    if (password.trim() != $('.dentacoin-login-gateway-container .step.first .form-field.repeat-password').val().trim()) {
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
                                            }
                                        }
                                    }

                                    //check if latin name accepts only LATIN characters
                                    if (!/^[a-z A-Z]+$/.test($('.dentacoin-login-gateway-container .dentist .form-register .step.second input[name="latin-name"]').val().trim())) {

                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .dentist .form-register .step.second input[name="latin-name"]').closest('.field-parent'), 'This field should contain only latin characters.');
                                        errors = true;
                                    }

                                    //check if privacy policy checkbox is checked
                                    if (!$('.dentacoin-login-gateway-container .dentist .form-register .step.second #privacy-policy-registration').is(':checked')) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .dentist .form-register .step.second .privacy-policy-row'), 'Please agree with our <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy policy</a>.');
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

                                        $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                        $('.dentacoin-login-gateway-container .dentist .form-register .step.third').addClass('visible');

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

                                    if (!errors) {
                                        if ($('#dentist-country').attr('data-current-user-country-code') != undefined && $('#dentist-country').val() != $('#dentist-country').attr('data-current-user-country-code')) {
                                            dcnGateway.utils.showPopup('Please accept the strictly necessary cookies in order to continue with logging in.', 'warning', function() {
                                                dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep3');

                                                $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                                $('.dentacoin-login-gateway-container .dentist .form-register .step.fourth').addClass('visible');

                                                this_btn.attr('data-current-step', 'fourth');
                                                this_btn.val('Create account');
                                            });
                                        } else {
                                            dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep3');

                                            $('.dentacoin-login-gateway-container .dentist .form-register .step').removeClass('visible');
                                            $('.dentacoin-login-gateway-container .dentist .form-register .step.fourth').addClass('visible');

                                            this_btn.attr('data-current-step', 'fourth');
                                            this_btn.val('Create account');
                                        }
                                    }
                                    break;
                                case 'fourth':
                                    $('.dentacoin-login-gateway-container .dentist .form-register .step.fourth').find('.error-handle').remove();
                                    var errors = false;
                                    //checking if empty avatar
                                    if ($('.dentist .form-register .step.fourth #custom-upload-avatar').val().trim() == '') {
                                        dcnGateway.utils.customErrorHandle($('.step.fourth .step-errors-holder'), 'Please select avatar.');
                                        errors = true;
                                    }

                                    //checking if no specialization checkbox selected
                                    if ($('.dentacoin-login-gateway-container .dentist .form-register .step.fourth [name="specializations[]"]:checked').val() == undefined) {
                                        dcnGateway.utils.customErrorHandle($('.dentacoin-login-gateway-container .step.fourth .step-errors-holder'), 'Please select specialization/s.');
                                        errors = true;
                                    }

                                    //check captcha
                                    console.log( ' =-=-------------- check captcha ');

                                    if (!errors) {
                                        dcnGateway.utils.fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationComplete');

                                        //submit the form
                                        dcnGateway.utils.showLoader();
                                        console.log( ' =-=-------------- SUBMIT ');
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

                function hideGateway() {
                    $('.dentacoin-login-gateway-container').remove();
                }

                $(document).on('click', '.dentacoin-login-gateway-container', function(event) {
                    if (event.target.className == 'dentacoin-login-gateway-container') {
                        $(event.target).remove();
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

                // show login gateway by url
                var getParams = dcnGateway.utils.getGETParameters();
                if (hasOwnProperty.call(getParams, 'dcn-gateway-type')) {
                    if (['patient-login', 'patient-register', 'dentist-login', 'dentist-register'].indexOf(getParams['dcn-gateway-type']) == -1) {
                        console.error('Wrong dcn-gateway-type get parameter value in the url.');
                    } else {
                        showGateway(getParams['dcn-gateway-type']);
                    }
                }
            }
        }
    };
}