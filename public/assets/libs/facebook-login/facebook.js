const fb_config = {
    //app_id: '299398824049604',
    app_id: '1906201509652855',
    platform: 'fb'
};

//application init
window.fbAsyncInit = function () {
    console.log(2);
    console.log(typeof(FB));
    FB.init({
        appId: fb_config.app_id,
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
};

(function (d, s, id) {
    console.log(1);
    console.log(typeof(FB));
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/bg_BG/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//binding click event for all the faceboon login btns
$('body').on('click', '.facebook-custom-btn', function(rerequest){
    var this_btn = $(this);
    customFacebookEvent('facebookCustomBtnClicked', 'Button #facebook-custom-btn was clicked.');

    //based on some logic and conditions you can add or remove this attribute, if custom-stopped="true" the facebook login won't proceed
    if($(this).attr('custom-stopper') && $(this).attr('custom-stopper') == 'true') {
        customFacebookEvent('customCivicFbStopperTriggered', '');
        return false;
    }

    FB.login(function (response) {
        if(response.authResponse && response.status == 'connected') {
            customFacebookEvent('receivedFacebookToken', 'Received facebook token successfully.', response);

            var fb_token = response.authResponse.accessToken;

            var register_data = {
                platform: this_btn.attr('data-platform'),
                social_network: fb_config.platform,
                auth_token: fb_token,
                type: this_btn.attr('data-type')
            };

            if(this_btn.attr('data-inviter') != undefined) {
                register_data.invited_by = this_btn.attr('data-inviter');
            }

            //exchanging the token for user data
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: this_btn.attr('data-url'),
                data: register_data,
                success: function(data){
                    if (data.success) {
                        //firing success event
                        customFacebookEvent('successResponseCoreDBApi', 'Request to CoreDB-API succeed.', data);
                    } else {
                        //firing error event
                        customFacebookEvent('errorResponseCoreDBApi', 'Request to CoreDB-API succeed, but conditions failed.', data);
                    }
                },
                error: function() {
                    //ajax to the external url is not working properly
                    customFacebookEvent('noCoreDBApiConnection', 'Request to CoreDB-API failed.');
                }
            });
        }
    });
});

//exchanging token for data
/*function fbGetData() {
    FB.api('/me?fields=id,email,name,permissions', function (response) {
        customFacebookEvent('receivedFacebookData', 'Received facebook data successfully.', response);
    });
}*/

//custom function for firing events
function customFacebookEvent(type, message, response_data) {
    var event_obj = {
        type: type,
        message: message,
        platform_type: 'facebook',
        time: new Date()
    };

    if(response_data != undefined) {
        event_obj.response_data = response_data;
    }
    $.event.trigger(event_obj);
}

async function init() {
    await $.getScript('https://connect.facebook.net/bg_BG/sdk.js', function() {
        console.log('loaded sdk.js');
        console.log(typeof(FB));
    });
}
init();