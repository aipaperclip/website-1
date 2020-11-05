//binding click event for all the faceboon login btns
$('body').on('click', '.facebook-custom-btn', function(rerequest){
    if(document.cookie.indexOf('strictly_necessary_policy=') == -1 && !$(this).hasClass('mobile-app')) {
        customFacebookEvent('cannotLoginBecauseOfMissingCookies', '');
    } else {
        var this_btn = $(this);
        const fb_config = {
            app_id: '1906201509652855'
        };
        customFacebookEvent('facebookCustomBtnClicked', 'Button #facebook-custom-btn was clicked.');

        //based on some logic and conditions you can add or remove this attribute, if custom-stopped="true" the facebook login won't proceed
        if ($(this).attr('custom-stopper') && $(this).attr('custom-stopper') == 'true') {
            customFacebookEvent('customCivicFbStopperTriggered', '');
            return false;
        }

        var obj = {
            //scope: 'email,first_name,last_name,user_gender,user_birthday,user_location'
            scope: 'email,public_profile,user_link',
            auth_type: 'rerequest'
        };

        if (this_btn.hasClass('mobile-app')) {
            console.log('loading facebook from mobile app');
            // loading facebook from mobile app
            if (typeof(openFB) != 'undefined') {
                console.log('openFB.init');
                openFB.init({appId: fb_config.app_id});

                openFB.login(
                    function(response) {
                        console.log(response, 'response');
                        proceedWithFacebookLogin(response, this_btn, 'mobile');
                    },
                    obj
                );
            } else {
                alert('Something went wrong with the external login provider, please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>.');
            }
        } else {
            console.log('loading facebook from browser');
            // loading facebook from browser
            $.getScript('https://connect.facebook.net/bg_BG/sdk.js', async function( data, textStatus, jqxhr ) {

                //application init
                window.fbAsyncInit = await function () {
                    FB.init({
                        appId: fb_config.app_id,
                        cookie: true,
                        xfbml: true,
                        version: 'v2.8'
                    });
                };

                FB.login(function (response) {
                    proceedWithFacebookLogin(response, this_btn, 'desktop');
                }, obj);
            }).fail(function() {
                alert('Looks like your browser is blocking Facebook login. Please check and edit your privacy settings in order to login in Dentacoin tools.');
            });
        }
    }
});

function proceedWithFacebookLogin(response, this_btn, type) {
    console.log('proceedWithFacebookLogin');
    if (response.authResponse && response.status == 'connected') {
        //fbGetData();

        //setTimeout(function() {
        customFacebookEvent('receivedFacebookToken', 'Received facebook token successfully.', response);

        var register_data = {
            platform: this_btn.attr('data-platform'),
            auth_token: response.authResponse.accessToken,
            social_network: 'fb',
            type: 'patient'
        };

        if (getCookie('first_test') != '') {
            register_data.country_id = JSON.parse(decodeURIComponent(getCookie('first_test')))['location'];
        }

        if (this_btn.attr('data-inviter') != undefined) {
            register_data.invited_by = this_btn.attr('data-inviter');
        }

        if (this_btn.attr('data-inviteid') != undefined) {
            register_data.inviteid = this_btn.attr('data-inviteid');
        }

        //exchanging the token for user data
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: this_btn.attr('data-url'),
            data: register_data,
            success: function(data) {
                if (data.success) {
                    if (data.deleted) {
                        var redirectUrl;
                        if (data.appeal) {
                            redirectUrl = 'https://account.dentacoin.com/blocked-account-thank-you?platform=' + this_btn.attr('data-platform');
                        } else {
                            redirectUrl = 'https://account.dentacoin.com/blocked-account?platform=' + this_btn.attr('data-platform') + '&key=' + encodeURIComponent(data.data.encrypted_id);
                        }

                        if (type == 'mobile') {
                            hideDcnGatewayLoader();
                            window.open(redirectUrl);
                        } else if (type == 'desktop') {
                            window.location.replace(redirectUrl);
                        }
                        return false;
                    } else if (data.bad_ip || data.suspicious_admin) {
                        var on_hold_type = '';
                        if (data.bad_ip) {
                            on_hold_type = '&on-hold-type=bad_ip';
                        } else if (data.suspicious_admin) {
                            on_hold_type = '&on-hold-type=suspicious_admin';
                        }

                        var redirectUrl;
                        if (data.appeal) {
                            redirectUrl = 'https://account.dentacoin.com/account-on-hold-thank-you?platform=' + this_btn.attr('data-platform');
                        } else {
                            redirectUrl = 'https://account.dentacoin.com/account-on-hold?platform=' + this_btn.attr('data-platform') + '&key=' + encodeURIComponent(data.data.encrypted_id) + on_hold_type;
                        }

                        if (type == 'mobile') {
                            hideDcnGatewayLoader();
                            window.open(redirectUrl);
                        } else if (type == 'desktop') {
                            window.location.replace(redirectUrl);
                        }
                        return false;
                    } else if (data.new_account) {
                        customFacebookEvent('successfulFacebookPatientRegistration', '');
                    } else {
                        customFacebookEvent('successfulFacebookPatientLogin', '');
                    }

                    if (data.data.email == '' || data.data.email == null) {
                        console.log('registeredAccountMissingEmail');
                        customFacebookEvent('registeredAccountMissingEmail', '', data);
                    } else {
                        if (type == 'mobile') {
                            console.log('fire patientAuthSuccessResponse');
                            $.event.trigger({
                                type: 'patientAuthSuccessResponse',
                                response_data: data,
                                platform_type: register_data.platform,
                                time: new Date()
                            });
                            hideDcnGatewayLoader();
                        } else if (type == 'desktop') {
                            customFacebookEvent('patientProceedWithCreatingSession', 'Request to CoreDB-API succeed.', data);
                        }
                    }
                } else if (!data.success) {
                    customFacebookEvent('patientAuthErrorResponse', 'Request to CoreDB-API succeed, but conditions failed.', data);
                } else {
                    customFacebookEvent('noCoreDBApiConnection', 'Request to CoreDB-API failed.');
                }
            },
            error: function() {
                //ajax to the external url is not working properly
                customFacebookEvent('noCoreDBApiConnection', 'Request to CoreDB-API failed.');
            }
        });
        //}, 5000);
    } else {
        console.log('noExternalLoginProviderConnection');
        customCivicEvent('noExternalLoginProviderConnection', 'Request to Facebook failed while exchanging token for data.');
    }
}

    //exchanging token for data
    /*function fbGetData() {
        FB.api('/me?fields=id,email,name,permissions,link', function (response) {
            FB.api(
                "/"+response.id+"/",
                function (second_response) {
                    console.log(second_response, 'second_response');
                }
            );
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

    if (response_data != undefined) {
        event_obj.response_data = response_data;
    }
    $.event.trigger(event_obj);
}

function getCookie(name) {
    name = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function hideDcnGatewayLoader() {
    if ($('.dentacoin-login-gateway-response-layer').length) {
        $('.dentacoin-login-gateway-response-layer').hide();
    }
}