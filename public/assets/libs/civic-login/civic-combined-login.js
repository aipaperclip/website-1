(async function() {
    console.log('civic loaded');
    await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic-config.js', function() {});

    //load civic lib CSS
    // downloaded from https://hosted-sip.civic.com/css/civic-modal.min.css
    $('head').append('<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/civic-login/civic/civic.min.css?v='+new Date().getTime()+'"/>');

    //load civic lib JS
    //await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic/civic.min.js', function() {});
    await $.getScript('https://hosted-sip.civic.com/js/civic.sip.min.js?v='+new Date().getTime(), function() {});

    var civic_custom_btn;
    var civicApiVersion;
    var civicActionType;
    var civicAjaxUrl = 123;

    //init civic
    var civicSip = new civic.sip({appId: civic_config.app_id});

    //bind click event for the civic button
    $('body').on('click', '.civic-custom-btn', function() {
        civic_custom_btn = $(this);
        if (civic_custom_btn.hasClass('type-login')) {
            civicActionType = 'login';
        } else if (civic_custom_btn.hasClass('type-register')) {
            civicActionType = 'register';
        }

        if (document.cookie.indexOf('strictly_necessary_policy=') == -1) {
            customCivicEvent('cannotLoginBecauseOfMissingCookies', '');
        } else {
            customCivicEvent('civicCustomBtnClicked', 'Button .civic-custom-btn was clicked.');

            if (civic_custom_btn.length) {
                civicAjaxUrl = civic_custom_btn.attr('data-url');
                if (civic_custom_btn.attr('custom-stopper') && civic_custom_btn.attr('custom-stopper') == 'true') {
                    customCivicEvent('customCivicFbStopperTriggered', '');
                    return false;
                }
            }

            civicSip.signup({
                style: 'popup',
                scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP
            });
        }
    });

    // Listen for data
    civicSip.on('auth-code-received', function (event) {
        var jwtToken = event.response;
        if (civicActionType == 'register') {
            if (civicApiVersion == 'v2') {
                // this should work on first phase
                // old legacy app
                console.log('stop civic register');

                var data = {};
                data.tempData = {
                    civicActionType: civicActionType,
                    civicAjaxUrl: civicAjaxUrl
                };
                console.log(data, 'auth-code-received');

                customCivicEvent('CivicLegacyAppForbiddenRegistrations', 'Registering via Civic Legacy App is forbidden.', data);
            } else {
                proceedWithDentacoinAuth(jwtToken);
            }
        } else {
            proceedWithDentacoinAuth(jwtToken);
        }
    });

    function proceedWithDentacoinAuth(jwtToken) {
        $.ajax({
            type: 'POST',
            url: civic_config.url_exchange_token_for_data,
            data: {
                jwtToken: jwtToken
            },
            dataType: 'json',
            success: function (ret) {
                if (!ret.userId) {
                    customCivicEvent('noUserIdReceived', 'No userId found after civic token/data exchange.', ret);
                } else {
                    customCivicEvent('userIdReceived', 'UserId found after civic token/data exchange.', ret);
                    var register_data = {
                        auth_token: jwtToken,
                        social_network: 'civic',
                        type: 'patient'
                    };

                    var currentPlatform;

                    if (civic_custom_btn.length) {
                        currentPlatform = civic_custom_btn.attr('data-platform');
                        register_data.platform = currentPlatform;
                    } else {
                        // civic popup called by library get param condition and not, because of Dentacoin login call
                        if (location.hostname == 'dentacoin.com') {
                            currentPlatform = 'dentacoin';
                        } else if (location.hostname == 'reviews.dentacoin.com') {
                            currentPlatform = 'trusted-reviews';
                        } else if (location.hostname == 'dentavox.dentacoin.com') {
                            currentPlatform = 'dentavox';
                        } else if (location.hostname == 'dentists.dentacoin.com') {
                            currentPlatform = 'dentists';
                        } else if (location.hostname == 'assurance.dentacoin.com') {
                            currentPlatform = 'assurance';
                        }
                        register_data.platform = currentPlatform;
                    }

                    console.log(currentPlatform, 'currentPlatform');

                    if (dcnGateway.utils.cookies.get('first_test') != '') {
                        register_data.country_id = JSON.parse(decodeURIComponent(dcnGateway.utils.cookies.get('first_test')))['location'];
                    }

                    if ($('.patient .form-register [name="user_patient_type[]"]:checked').val() != 'undefined') {
                        var tempArr = [];
                        for (var i = 0, len = $('.patient .form-register [name="user_patient_type[]"]:checked').length; i < len; i+=1) {
                            tempArr.push($('.patient .form-register [name="user_patient_type[]"]:checked').eq(i).val());
                        }

                        register_data.user_patient_type = JSON.stringify(tempArr);
                    }

                    setTimeout(function () {
                        if (civic_custom_btn.length) {
                            if (civic_custom_btn.attr('data-inviter') != undefined) {
                                register_data.invited_by = civic_custom_btn.attr('data-inviter');
                            }

                            if (civic_custom_btn.attr('data-inviteid') != undefined) {
                                register_data.inviteid = civic_custom_btn.attr('data-inviteid');
                            }
                        }

                        $.ajax({
                            type: 'POST',
                            url: civicAjaxUrl,
                            dataType: 'json',
                            data: register_data,
                            success: function(data) {
                                if (data.success) {
                                    if (data.deleted) {
                                        if (currentPlatform != undefined) {
                                            if (data.appeal) {
                                                window.location.replace('https://account.dentacoin.com/blocked-account-thank-you?platform=' + currentPlatform);
                                            } else {
                                                window.location.replace('https://account.dentacoin.com/blocked-account?platform=' + currentPlatform + '&key=' + encodeURIComponent(data.data.encrypted_id));
                                            }
                                        } else {
                                            if (data.appeal) {
                                                window.location.replace('https://account.dentacoin.com/blocked-account-thank-you');
                                            } else {
                                                window.location.replace('https://account.dentacoin.com/blocked-account?key=' + encodeURIComponent(data.data.encrypted_id));
                                            }
                                        }
                                        return false;
                                    } else if (data.bad_ip || data.suspicious_admin) {
                                        var on_hold_type = '';
                                        if (data.bad_ip) {
                                            on_hold_type = '&on-hold-type=bad_ip';
                                        } else if (data.suspicious_admin) {
                                            on_hold_type = '&on-hold-type=suspicious_admin';
                                        }

                                        if (currentPlatform != undefined) {
                                            if (data.appeal) {
                                                window.location.replace('https://account.dentacoin.com/account-on-hold-thank-you?platform=' + currentPlatform);
                                            } else {
                                                window.location.replace('https://account.dentacoin.com/account-on-hold?platform=' + currentPlatform + '&key=' + encodeURIComponent(data.data.encrypted_id) + on_hold_type);
                                            }
                                        } else {
                                            if (data.appeal) {
                                                window.location.replace('https://account.dentacoin.com/account-on-hold-thank-you');
                                            } else {
                                                window.location.replace('https://account.dentacoin.com/account-on-hold?key=' + encodeURIComponent(data.data.encrypted_id) + on_hold_type);
                                            }
                                        }
                                        return false;
                                    } else if (data.new_account) {
                                        customCivicEvent('successfulCivicPatientRegistration', '');
                                    } else {
                                        customCivicEvent('successfulCivicPatientLogin', '');
                                    }

                                    if (data.data.email == '' || data.data.email == null) {
                                        customCivicEvent('registeredAccountMissingEmail', '', data);
                                    } else {
                                        if (civicActionType == 'login') {
                                            if (civicApiVersion == 'v2') {
                                                // this should work on second phase
                                                console.log('stop civic login');

                                                data.tempData = {
                                                    civicActionType: civicActionType,
                                                    civicAjaxUrl: civicAjaxUrl
                                                };

                                                console.log('CivicLegacyAppForbiddenLogging');
                                                customCivicEvent('CivicLegacyAppForbiddenLogging', 'Logging via Civic Legacy App is forbidden.', data);
                                            } else {
                                                customCivicEvent('patientProceedWithCreatingSession', 'Request to CoreDB-API succeed.', data);
                                            }
                                        } else {
                                            customCivicEvent('patientProceedWithCreatingSession', 'Request to CoreDB-API succeed.', data);
                                        }
                                    }

                                } else if (!data.success) {
                                    customCivicEvent('patientAuthErrorResponse', 'Request to CoreDB-API succeed, but conditions failed.', data);
                                } else {
                                    customCivicEvent('noCoreDBApiConnection', 'Request to CoreDB-API failed.');
                                }
                            },
                            error: function() {
                                customCivicEvent('noCoreDBApiConnection', 'Request to CoreDB-API failed.');
                            }
                        });
                    }, 3000);
                }
            },
            error: function (ret) {
                customCivicEvent('noExternalLoginProviderConnection', 'Request to Civic NodeJS API failed while exchanging token for data.');
            }
        });
    }

    /*civicSip.on('user-cancelled', function (event) {
        customCivicEvent('civicUserCancelled', '');
    });*/

    civicSip.on('read', function (event) {
        console.log(event, 'reading');
        civicApiVersion = event.clientVersion;
        customCivicEvent('civicRead', '');
    });

    civicSip.on('civic-sip-error', function (error) {
        customCivicEvent('civicSipError', '');
    });
})();


function customCivicEvent(type, message, response_data) {
    var event_obj = {
        type: type,
        message: message,
        platform_type: 'civic',
        time: new Date()
    };

    if (response_data != undefined) {
        event_obj.response_data = response_data;
    }
    $.event.trigger(event_obj);
}