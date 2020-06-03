if (typeof jQuery == 'undefined') {
    // no jquery installed
    console.error('Dentacoin hub requires the usage of jQuery.');
} else if (!navigator.onLine) {
    // check internet connection
    console.error('Dentacoin hub requires internet connection.');
} else {
    var fireAjax = true;
    var dcnHub = {
        dcnHubRequests: {
            getHubData: async function(userType, hubType) {
                if (fireAjax) {
                    fireAjax = false;

                    var ajaxCall = await $.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-hub-data/'+userType+'/'+hubType,
                        dataType: 'json'
                    });

                    fireAjax = true;
                    return ajaxCall;
                }
            },
            getHubChildren: async function(userType, folderSlug) {
                if (fireAjax) {
                    fireAjax = false;

                    var ajaxCall = await $.ajax({
                        type: 'POST',
                        url: 'https://dentacoin.com/combined-hub/get-hub-children/'+userType+'/'+folderSlug,
                        dataType: 'json'
                    });

                    fireAjax = true;
                    return ajaxCall;
                }
            }
        },
        initMiniHub: async function(params) {
            if ((typeof params !== 'object' && params === undefined) || (!hasOwnProperty.call(params, 'element_id_to_bind') || !hasOwnProperty.call(params, 'type_user') || !hasOwnProperty.call(params, 'platform') || !hasOwnProperty.call(params, 'log_out_link'))) {
                // false params
                console.error('False params passed to Dentacoin hub.');
            } else {

                var elementToBind = $('#'+params.element_id_to_bind);
                if (elementToBind.length) {
                    var miniHubHtml = '<div class="dcn-hub-mini"><span class="up-arrow">▲</span><div class="hidden-box"> <div class="hidden-box-hub"><div class="close-btn"><a href="javascript:void(0)">Close <span>X</span></a></div><div class="list-with-apps"> <a href="https://dentacare.dentacoin.com/" target="_blank" class="application" data-platform="Dentacare"> <figure itemtype="http://schema.org/ImageObject"> <img src="https://dentacoin.com/assets/uploads/dentacare.svg" itemprop="contentUrl" alt="Dentacare – App Logo Icon"> <figcaption>Dentacare</figcaption> </figure> </a>';

                    var hubData = await dcnHub.dcnHubRequests.getHubData(params.type_user, 'hub-dentacoin');
                    console.log(hubData, 'hubData');

                    miniHubHtml += '</div> </div> <div class="hidden-box-footer"><div class="logout-btn-parent"> <a href="'+params.log_out_link+'"><i class="fa fa-power-off" aria-hidden="true"></i> Log out</a> </div> <div class="my-account-btn-parent"><a href="//account.dentacoin.com?platform='+params.platform+'">My Account</a></div></div></div></div>';

                    $('body').append(miniHubHtml);
                    function setHubPosition() {
                        var topToAppear = elementToBind.offset().top + elementToBind.outerHeight();
                        var leftToAppear = elementToBind.offset().left + elementToBind.outerWidth();

                        $('.dcn-hub-mini').offset({top: topToAppear + $('.dcn-hub-mini .up-arrow').outerHeight(), left: leftToAppear - $('.dcn-hub-mini').outerWidth() + ($('.dcn-hub-mini .up-arrow').outerWidth() / 2)});
                    }
                    setHubPosition();

                    $(window).on('resize', function() {
                        setHubPosition();
                    });
                } else {
                    console.error('False element to bind passed to Dentacoin hub.');
                    return false;
                }
            }
        }
    };
}