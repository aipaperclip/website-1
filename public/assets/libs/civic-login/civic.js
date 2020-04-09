(async function() {
    await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic-config.js', function() {});

    //load civic lib CSS
    $('head').append('<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/civic-login/civic/civic.min.css?v='+new Date().getTime()+'"/>');
    //$('head').append('<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/civic-login/civic/civic.min.css"/>"/>');

    //load civic lib JS
    //await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic/civic.min.js', function() {});
    await $.getScript('https://hosted-sip.civic.com/js/civic.sip.min.js?v='+new Date().getTime(), function() {});

    var civic_custom_btn;
    //init civic
    var civicSip = new civic.sip({appId: civic_config.app_id});

    //bind click event for the civic button
    $('body').on('click', '.civic-custom-btn', function(){
        if(document.cookie.indexOf('strictly_necessary_policy=') == -1) {
            customFacebookEvent('cannotLoginBecauseOfMissingCookies', '');
        } else {
            civic_custom_btn = $(this);
            customCivicEvent('civicCustomBtnClicked', 'Button .civic-custom-btn was clicked.');

            if(civic_custom_btn.attr('custom-stopper') && civic_custom_btn.attr('custom-stopper') == 'true') {
                customCivicEvent('customCivicFbStopperTriggered', '');
                return false;
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
        // customCivicEvent('receivedCivicToken', 'Received civic token successfully.', jwtToken);

        //ajax for exchanging received token from civic for user personal data
        $.ajax({
            type: 'POST',
            url: civic_config.url_exchange_token_for_data,
            data: {
                jwtToken: jwtToken
            },
            dataType: 'json',
            success: function (ret) {
                if(!ret.userId) {
                    customCivicEvent('noUserIdReceived', 'No userId found after civic token/data exchange.', ret);
                } else {
                    customCivicEvent('userIdReceived', 'UserId found after civic token/data exchange.', ret);

                    setTimeout(function () {
                        var register_data = {
                            platform: civic_custom_btn.attr('data-platform'),
                            auth_token: jwtToken,
                            social_network: 'civic',
                            type: 'patient'
                        };

                        if(civic_custom_btn.attr('data-inviter') != undefined) {
                            register_data.invited_by = civic_custom_btn.attr('data-inviter');
                        }

                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: civic_custom_btn.attr('data-url'),
                            data: register_data,
                            success: function(data) {
                                /* else {
                                    if (data.success) {
                                        customCivicEvent('successResponseCoreDBApi', 'Request to CoreDB-API succeed.', data);
                                    } else {
                                        customCivicEvent('errorResponseCoreDBApi', 'Request to CoreDB-API succeed, but conditions failed.', data);
                                    }
                                }*/

                                // uncopy this part above and remove this part below

                                if (data.success) {
                                    if (data.data.email == '' || data.data.email == null) {
                                        console.log('registeredAccountMissingEmail');
                                        customCivicEvent('registeredAccountMissingEmail', '', data);
                                    }

                                    customCivicEvent('successResponseCoreDBApi', 'Request to CoreDB-API succeed.', data);
                                } else {
                                    customCivicEvent('errorResponseCoreDBApi', 'Request to CoreDB-API succeed, but conditions failed.', data);
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
                customCivicEvent('noCivicApiConnection', 'Request to Civic NodeJS API failed while exchanging token for data.');
            }
        });
    });

    civicSip.on('user-cancelled', function (event) {
        customCivicEvent('civicUserCancelled', '');
    });

    civicSip.on('read', function (event) {
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

    if(response_data != undefined) {
        event_obj.response_data = response_data;
    }
    $.event.trigger(event_obj);
}