if (typeof jQuery == 'undefined') {
    // no jquery installed
    console.error('Dentacoin hub requires the usage of jQuery.');
} else {
    var fireAjax = true;
    var dcnHub = {
        dcnHubRequests: {
            getHubData: async function() {
                if (fireAjax) {
                    fireAjax = false;

                    var ajaxCall = await $.ajax({
                        type: 'GET',
                        url: 'https://dentacoin.com/info/platforms',
                        dataType: 'json'
                    });

                    fireAjax = true;
                    return ajaxCall;
                }
            }
        },
        init: async function(params) {
            if ((typeof params !== 'object' && params === null) || (!hasOwnProperty.call(params, 'type_user') || !hasOwnProperty.call(params, 'platform'))) {
                // false params
                console.error('False params passed to Dentacoin hub.');
            } else {
                // check internet connection
                if (!navigator.onLine) {
                    console.error('Dentacoin hub requires internet connection.');
                    return false;
                }
            }
        }
    };
}