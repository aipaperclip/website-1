(async function() {
    await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic-config.js', function() {});

    //load civic lib CSS
    //$('head').append('<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/civic-login/civic/civic.min.css?v='+new Date().getTime()+'"/>')
    $('head').append('<link rel="stylesheet" type="text/css" href="https://hosted-sip.civic.com/css/civic-modal.min.css?v='+new Date().getTime()+'"/>');

    //load civic lib JS
    // await $.getScript('https://dentacoin.com/assets/libs/civic-login/civic/civic.min.js?v='+new Date().getTime(), function() {});
    await $.getScript('https://hosted-sip.civic.com/js/civic.sip.min.js?v='+new Date().getTime(), function() {});

    var civic_custom_btn;
    //init civic
    var civicSip = new civic.sip({appId: civic_config.app_id});

    //bind click event for the civic button
    $('body').on('click', '.civic-custom-btn.kyc-approval', function(){
        civic_custom_btn = $(this);
        customCivicEvent('civicCustomBtnClicked', 'Button .civic-custom-btn.kyc-approval was clicked.');

        civicSip.signup({
            style: 'popup',
            scopeRequest: civicSip.ScopeRequests.PROOF_OF_IDENTITY
        });
    });

    // Listen for data
    civicSip.on('auth-code-received', function (event) {
        customCivicEvent('civicRead', '');
        
        if (event.clientVersion == 'v2') {
            customCivicEvent('CivicLegacyAppForbiddenKYC', 'KYC via Civic Legacy App is forbidden.');
        } else if (event.clientVersion == 'v3') {
            var jwtToken = event.response;
            customCivicEvent('receivedKYCCivicToken', 'Received civic token successfully.', jwtToken);
        }
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

    function customCivicEvent(type, message, response_data) {
        var event_obj = {
            type: type,
            message: message,
            time: new Date()
        };

        if(response_data != undefined) {
            event_obj.response_data = response_data;
        }
        $.event.trigger(event_obj);
    }
})();
