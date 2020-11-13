(async function() {
    function isMobile() {
        var isMobile = false; //initiate as false
// device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))  {
            isMobile = true;
        }
        return isMobile;
    }

    console.log('civic loaded');
    await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic-config.js', function() {});

    //load civic lib CSS
    // downloaded from https://hosted-sip.civic.com/css/civic-modal.min.css
    //$('head').append('<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/civic-login/civic/civic.min.css?v='+new Date().getTime()+'"/>');
    $('head').append('<link rel="stylesheet" type="text/css" href="https://hosted-sip.civic.com/css/civic-modal.min.css?v='+new Date().getTime()+'"/>');

    //load civic lib JS
    //await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic/civic.min.js', function() {});
    await $.getScript('https://hosted-sip.civic.com/js/civic.sip.min.js?v='+new Date().getTime(), function() {});

    var civic_custom_btn;
    var civicApiVersion;
    var civicActionType;
    var civicAjaxUrl;

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

        if (document.cookie.indexOf('strictly_necessary_policy=') == -1 && !civic_custom_btn.hasClass('mobile-app')) {
            customCivicEvent('cannotLoginBecauseOfMissingCookies', '');
        } else {
            customCivicEvent('civicCustomBtnClicked', 'Button .civic-custom-btn was clicked.');

            if (civic_custom_btn != undefined) {
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

    console.log('fire civicLibLoaded');
    customCivicEvent('civicLibLoaded', '');

    // Listen for data
    civicSip.on('auth-code-received', function (event) {
        console.log(event, 'event');
        var jwtToken = event.response;
        civicApiVersion = event.clientVersion;
        console.log(civicActionType, 'civicActionType uth-code-received');
        console.log(civicApiVersion, 'civicApiVersion uth-code-received');

        if (civicActionType == undefined) {
            customCivicEvent('civicRead', '');
            if (location.hostname == 'dev.dentacoin.com' || location.hostname == 'urgent.dentavox.dentacoin.com' || location.hostname == 'urgent.reviews.dentacoin.com') {
                civicAjaxUrl = '//dev-api.dentacoin.com/api/login';
            } else {
                civicAjaxUrl = '//api.dentacoin.com/api/login';
            }

            proceedWithDentacoinAuth(jwtToken, true);
        } else {
            if (civicActionType == 'register') {
                if (civicApiVersion == 'v2') {
                    // this should work on first phase
                    // old legacy app
                    console.log('stop civic register');

                    customCivicEvent('CivicLegacyAppForbiddenRegistrations', 'Registering via Civic Legacy App is forbidden.');
                } else if (civicApiVersion == 'v3') {
                    proceedWithDentacoinAuth(jwtToken);
                }
            } else if (civicActionType == 'login') {
                proceedWithDentacoinAuth(jwtToken);
            }
        }
    });

    function proceedWithDentacoinAuth(jwtToken, redirectedFromCivicApp) {
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
                    var loginRegisterData = {
                        clientVersion: civicApiVersion,
                        auth_token: jwtToken,
                        social_network: 'civic',
                        type: 'patient'
                    };

                    if (redirectedFromCivicApp) {
                        loginRegisterData.redirectedFromCivicApp = true;
                    }

                    var currentPlatform;

                    if (civic_custom_btn != undefined) {
                        currentPlatform = civic_custom_btn.attr('data-platform');
                        loginRegisterData.platform = currentPlatform;
                    } else {
                        // civic popup called by library get param condition and not, because of Dentacoin login call
                        if (location.hostname == 'dentacoin.com' || location.hostname == 'dev.dentacoin.com') {
                            currentPlatform = 'dentacoin';
                        } else if (location.hostname == 'reviews.dentacoin.com' || location.hostname == 'urgent.reviews.dentacoin.com') {
                            currentPlatform = 'trusted-reviews';
                        } else if (location.hostname == 'dentavox.dentacoin.com' || location.hostname == 'urgent.dentavox.dentacoin.com') {
                            currentPlatform = 'dentavox';
                        } else if (location.hostname == 'dentists.dentacoin.com') {
                            currentPlatform = 'dentists';
                        } else if (location.hostname == 'assurance.dentacoin.com') {
                            currentPlatform = 'assurance';
                        }
                        loginRegisterData.platform = currentPlatform;
                    }

                    console.log(currentPlatform, 'currentPlatform');

                    if (dcnGateway.utils.cookies.get('first_test') != '') {
                        loginRegisterData.country_id = JSON.parse(decodeURIComponent(dcnGateway.utils.cookies.get('first_test')))['location'];
                    }

                    if ($('.patient .form-register [name="user_patient_type[]"]:checked').val() != 'undefined') {
                        var tempArr = [];
                        for (var i = 0, len = $('.patient .form-register [name="user_patient_type[]"]:checked').length; i < len; i+=1) {
                            tempArr.push($('.patient .form-register [name="user_patient_type[]"]:checked').eq(i).val());
                        }

                        loginRegisterData.user_patient_type = JSON.stringify(tempArr);
                    }

                    setTimeout(function () {
                        if (civic_custom_btn != undefined) {
                            if (civic_custom_btn.attr('data-inviter') != undefined) {
                                loginRegisterData.invited_by = civic_custom_btn.attr('data-inviter');
                            }

                            if (civic_custom_btn.attr('data-inviteid') != undefined) {
                                loginRegisterData.inviteid = civic_custom_btn.attr('data-inviteid');
                            }
                        }

                        $.ajax({
                            type: 'POST',
                            url: civicAjaxUrl,
                            dataType: 'json',
                            data: loginRegisterData,
                            success: async function(data) {
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
                                                if (isMobile()) {
                                                    console.log('logging from phone');
                                                    customCivicEvent('CivicLegacyAppForbiddenRegistrations', 'Registering via Civic Legacy App is forbidden.');
                                                } else {
                                                    console.log('CivicLegacyAppForbiddenLogging');
                                                    customCivicEvent('CivicLegacyAppForbiddenLogging', 'Logging via Civic Legacy App is forbidden.', data);
                                                }
                                            } else {
                                                var logging_from_mobile_app = await checkCivicEmailIfLoggingFromMobileApp(data.data.civic_email);
                                                // request to check if data.data.civic_email is in logging from mobile apps table
                                                if (logging_from_mobile_app.success) {
                                                    location.href = 'dentavoxapp://?token=' + encodeURIComponent(data.token);
                                                } else {
                                                    customCivicEvent('patientProceedWithCreatingSession', 'Request to CoreDB-API succeed.', data);
                                                }
                                            }
                                        } else {
                                            var logging_from_mobile_app = await checkCivicEmailIfLoggingFromMobileApp(data.data.civic_email);
                                            // request to check if data.data.civic_email is in logging from mobile apps table
                                            if (logging_from_mobile_app.success) {
                                                location.href = 'dentavoxapp://?token=' + encodeURIComponent(data.token);
                                            } else {
                                                customCivicEvent('patientProceedWithCreatingSession', 'Request to CoreDB-API succeed.', data);
                                            }
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

async function checkCivicEmailIfLoggingFromMobileApp(email) {
    return await $.ajax({
        type: 'POST',
        url: 'https://dentacoin.com/dentacoin-login-gateway/check-civic-email',
        dataType: 'json',
        data: {
            email: email
        }
    });
}