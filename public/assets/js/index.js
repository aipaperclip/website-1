var {getWeb3} = require('./helper');

basic.init();

checkIfCookie();

//load images after website load
if($('img[data-defer-src]').length) {
    for(var i = 0, len = $('img[data-defer-src]').length; i < len; i+=1) {
        $('img[data-defer-src]').eq(i).attr('src', $('img[data-defer-src]').eq(i).attr('data-defer-src'));
    }
}

var is_mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
var intervals_arr = [];
var stoppers = [];
const draw_line_interval = 10;
const draw_line_increment = 10;
const border_width = 2;

var dApp = {
    infura_node: 'https://rinkeby.infura.io/v3/c3a8017424324e47be615fb4028275bb',
    web3Provider: null,
    web3_0_2: null,
    web3_1_0: null,
    init: function () {
        return dApp.initWeb3();
    },
    initWeb3: async function () {
        dApp.web3_1_0 = getWeb3(new Web3.providers.HttpProvider(dApp.infura_node));
    }
};

dApp.init();

//checking if passed address is valid
function innerAddressCheck(address)    {
    return dApp.web3_1_0.utils.isAddress(address);
}

$(document).ready(async function() {
    if($('body.corporate-design.allow-draw-lines').length > 0) {
        drawNavToBottomSectionLine();
    }

    setTimeout(function() {
        //fix chat bottom position
        if($('body > [style="display: block !important;"]').length) {
            if($('body > [style="display: block !important;"]').attr('id') != undefined) {
                var parent_id = $('body > [style="display: block !important;"]').attr('id');

                $('#' + parent_id).attr('style', $('#' + parent_id).attr('style') + 'left:20px !important;right:auto !important;');
                $('#' + parent_id).children().eq(1).attr('style', $('#' + parent_id).children().eq(1).attr('style') + 'left:20px !important;right:auto !important;');
            }
        }

        if($('#tawkchat-container').length) {
            $('#tawkchat-container').attr('style', $('#tawkchat-container').attr('style') + 'width: 100% !important;');
            $('#tawkchat-container').children().eq(0).attr('style', $('#tawkchat-container').children().eq(0).attr('style') + 'left:10px !important;right:auto !important;');
        }
    }, 2000);

    if(!$('body').hasClass('logged-in')) {
        await $.getScript('/assets/libs/civic-login/civic.js', function() {});
        await $.getScript('/assets/libs/facebook-login/facebook.js', function() {});
    }
});

$(window).on('load', function() {
    //HOMEPAGE
    if((($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) && !basic.isMobile()) {
        console.log('Don\'t touch the code. Or do ... ¯\\_(ツ)_/¯');
        setLinesDots();

        if($('body').hasClass('home')) {
            drawLine('first', 'vertical');
        }
    }

    if($('body.careers.allow-draw-lines').length > 0) {
        //init lines
        drawHeaderToFirstSectionLine();
    }else if($('body.corporate-design.allow-draw-lines').length > 0) {
        //init lines
        drawHeaderToFirstSectionLine();
    }

    if(($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) {
        var current_url = new URL(window.location.href);
        if(current_url.searchParams.get('application') != null) {
            scrollToSectionAnimation('two', null, true);

            setTimeout(function()   {
                $('.dentacoin-ecosystem .single-application figure[data-slug="'+current_url.searchParams.get('application')+'"]').click();
            }, 500)
        } else if(current_url.searchParams.get('payment') != null && current_url.searchParams.get('payment') == 'bidali-gift-cards') {
            $('html').animate({
                scrollTop: $('.wallet-app-and-gif').offset().top
            }, {
                duration: 500,
                complete: function() {
                    setTimeout(function() {
                        $('#bidali-init-btn').click();
                    }, 1000);
                }
            });
        } else if(current_url.searchParams.get('section') != null && current_url.searchParams.get('section') == 'buy-dentacoin') {
            $('html').animate({
                scrollTop: $('.buy-dentacoin').offset().top
            }, {
                duration: 500
            });
        }
    }
});

$('body').bind('wheel', onMousewheel);

$(window).on('resize', function(){
    if((($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) && !basic.isMobile()) {
        //HOMEPAGE
        setLinesDots(true);
    }else if($('body').hasClass('testimonials')) {
        //TESTIMONIALS
        initListingPageLine();
    }else if($('body').hasClass('press-center')) {
        //PRESS CENTER
        initListingPageLine();
    }else if($('body.careers.allow-draw-lines').length > 0) {
        //CAREERSdentacoin-ecosystem
        drawHeaderToFirstSectionLine();
    }else if($('body.corporate-design.allow-draw-lines').length > 0) {
        //CORPORATE DESIGN
        drawHeaderToFirstSectionLine();
        drawNavToBottomSectionLine();
    }
});

$(window).on('scroll', function()  {
    checkIfLineIsReadyToBeCreated('second', 'vertical', ['third', 'fourth'], ['horizontal', 'vertical'], 'load-successful-practices-gif');
    checkIfLineIsReadyToBeCreated('fifth', 'vertical', [], [], 'call-sixth-and-animation');
    checkIfLineIsReadyToBeCreated('eighth', 'horizontal', ['ninth'], ['vertical']);
    checkIfLineIsReadyToBeCreated('tenth', 'horizontal', ['eleventh'], ['vertical'], 'load-buy-dentacoin-gif');
    checkIfLineIsReadyToBeCreated('twelfth', 'vertical');
    checkIfLineIsReadyToBeCreated('thirteenth', 'horizontal', ['fourteenth'], ['vertical'], 'fade-in-transaction-with-dcn');
    checkIfLineIsReadyToBeCreated('fifteenth', 'horizontal', ['sixteenth'], ['vertical']);
    checkIfLineIsReadyToBeCreated('seventeenth', 'horizontal', ['eighteenth'], ['vertical'], 'load-roadmap-gif');
    checkIfLineIsReadyToBeCreated('nineteenth', 'vertical');
    checkIfLineIsReadyToBeCreated('twentieth', 'horizontal');
});

function onMousewheel(event)    {
    if((($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) && !basic.isMobile() && !$('body').hasClass('modal-open') && !is_mac) {
        if(event.originalEvent.deltaY < 0)  {
            //scroll up
            if($('body').attr('data-current') == 'two') {
                scrollToSectionAnimation('one', null, null, true);
            }else if($(window).scrollTop() < $('.fullpage-section.two').offset().top + $('.fullpage-section.two').outerHeight() && $('body').attr('data-current') == 'rest-data') {
                scrollToSectionAnimation('two', null, true);
            }
        }else {
            //scroll down
            if($('body').attr('data-current') == 'one') {
                scrollToSectionAnimation('two', null, true);
            }else if ($('body').attr('data-current') == 'two') {
                scrollToSectionAnimation('rest-data', true);
            }
        }
    }
}

function scrollToSectionAnimation(to_become_current, full_height, clear_dots, draw_first) {
    //doing this check, because IE 11 not support ES6
    /*if(full_height === undefined) {
        full_height = null;
    }
    if(clear_dots === undefined) {
        clear_dots = null;
    }

    var scroll_obj = {};
    if(full_height != null) {
        scroll_obj.scrollTop = $('.'+to_become_current).offset().top;
    }else {
        scroll_obj.scrollTop = $('.fullpage-section.'+to_become_current).offset().top;
    }
    $('body').unbind('wheel', onMousewheel);
    $('html, body').stop().animate(scroll_obj, 500).promise().then(function() {
        $('body').bind('wheel', onMousewheel);
        if(clear_dots != null)  {
            refreshingMainDots();
        }else if(draw_first != null)  {
            drawLine('first', 'vertical');
        }
    });
    $('body').attr('data-current', to_become_current);*/
}

function setLinesDots(resize)    {
    //doing this check, because IE 11 not support ES6
    if(resize === undefined) {
        resize = null;
    }
    //init starting dots for all lines

    if($('body').hasClass('home')) {
        //FIRST LINE
        $('line.first').attr('x1', $('header .first-dot').offset().left);
        $('line.first').attr('y1', $('header .first-dot').offset().top);
        $('line.first').attr('x2', $('.intro .second-dot').offset().left);
        $('line.first').attr('max-y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());
    }

    //SECOND LINE
    $('line.second').attr('x1', $('.successful-practices .first-dot').offset().left);
    $('line.second').attr('y1', $('.successful-practices .first-dot').offset().top);
    $('line.second').attr('x2', $('.successful-practices .second-dot').offset().left);
    $('line.second').attr('max-y2', $('.successful-practices .second-dot').offset().top);

    //THIRD LINE
    $('line.third').attr('x1', $('.successful-practices .second-dot').offset().left);
    $('line.third').attr('y1', $('.successful-practices .second-dot').offset().top);
    $('line.third').attr('y2', $('.successful-practices .third-dot').offset().top);
    $('line.third').attr('max-x2', $('.successful-practices .third-dot').offset().left);

    //FOURTH LINE
    $('line.fourth').attr('x1', $('.successful-practices .third-dot').offset().left);
    $('line.fourth').attr('y1', $('.successful-practices .third-dot').offset().top);
    $('line.fourth').attr('x2', $('.successful-practices .fourth-dot').offset().left);
    $('line.fourth').attr('max-y2', $('.successful-practices .fourth-dot').offset().top + $('.successful-practices .fourth-dot').height());

    //FIFTH LINE
    $('line.fifth').attr('x1', $('.successful-practices .fifth-dot').offset().left + border_width);
    $('line.fifth').attr('y1', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
    $('line.fifth').attr('x2', $('.below-successful-practices .first-dot').offset().left - $('.below-successful-practices .first-dot').width() + border_width);
    $('line.fifth').attr('max-y2', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);

    //SIXTH LINE
    $('line.sixth').attr('x1', $('.below-successful-practices .first-dot').offset().left - border_width);
    $('line.sixth').attr('y1', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);
    $('line.sixth').attr('y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
    $('line.sixth').attr('max-x2', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width());

    //SEVENTH LINE
    $('line.seventh').attr('x1', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width());
    $('line.seventh').attr('y1', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
    $('line.seventh').attr('x2', $('.testimonials .first-dot').offset().left + $('.below-successful-practices .second-dot').width());
    $('line.seventh').attr('max-y2', $('.testimonials .first-dot').offset().top + $('.testimonials .first-dot').height() / 2);

    //EIGHTH LINE
    $('line.eighth').attr('x1', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width());
    $('line.eighth').attr('y1', $('.testimonials .first-dot').offset().top + $('.testimonials .first-dot').height() / 2);
    $('line.eighth').attr('y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
    $('line.eighth').attr('max-x2', $('.testimonials .second-dot').offset().left);

    //NINTH LINE
    $('line.ninth').attr('x1', $('.testimonials .second-dot').offset().left);
    $('line.ninth').attr('y1', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
    $('line.ninth').attr('x2', $('.testimonials .third-dot').offset().left);
    $('line.ninth').attr('max-y2', $('.testimonials .third-dot').offset().top + $('.testimonials .third-dot').height());

    //TENTH LINE
    $('line.tenth').attr('x1', $('.testimonials .third-dot').offset().left);
    $('line.tenth').attr('y1', $('.testimonials .third-dot').offset().top + $('.testimonials .third-dot').height());
    $('line.tenth').attr('y2', $('.buy-dentacoin .first-dot').offset().top);
    $('line.tenth').attr('max-x2', $('.buy-dentacoin .first-dot').offset().left + $('.buy-dentacoin .first-dot').width());

    //ELEVENTH LINE
    $('line.eleventh').attr('x1', $('.buy-dentacoin .first-dot').offset().left + $('.buy-dentacoin .first-dot').width());
    $('line.eleventh').attr('y1', $('.buy-dentacoin .first-dot').offset().top);
    $('line.eleventh').attr('x2', $('.buy-dentacoin .second-dot').offset().left + $('.buy-dentacoin .second-dot').width());
    $('line.eleventh').attr('max-y2', $('.buy-dentacoin .second-dot').offset().top + $('.buy-dentacoin .second-dot').height());

    //TWELFTH LINE
    $('line.twelfth').attr('x1', $('.buy-dentacoin .third-dot').offset().left + border_width / border_width);
    $('line.twelfth').attr('y1', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height() - border_width / border_width);
    $('line.twelfth').attr('x2', $('.buy-dentacoin .fourth-dot').offset().left + border_width / border_width);
    $('line.twelfth').attr('max-y2', $('.buy-dentacoin .fourth-dot').offset().top + $('.buy-dentacoin .fourth-dot').height());

    //THIRTEENTH LINE
    $('line.thirteenth').attr('x1', $('.buy-dentacoin .fourth-dot').offset().left);
    $('line.thirteenth').attr('y1', $('.buy-dentacoin .fourth-dot').offset().top + $('.buy-dentacoin .fourth-dot').height());
    $('line.thirteenth').attr('y2', $('.buy-dentacoin .fifth-dot').offset().top + $('.buy-dentacoin .fifth-dot').height() / 2);
    $('line.thirteenth').attr('max-x2', $('.buy-dentacoin .fifth-dot').offset().left);

    //FOURTEENTH LINE
    $('line.fourteenth').attr('x1', $('.buy-dentacoin .fifth-dot').offset().left);
    $('line.fourteenth').attr('y1', $('.buy-dentacoin .fifth-dot').offset().top);
    $('line.fourteenth').attr('x2', $('.below-buy-dentacoin .first-dot').offset().left);
    $('line.fourteenth').attr('max-y2', $('.below-buy-dentacoin .first-dot').offset().top + $('.below-buy-dentacoin .first-dot').height());

    //FIFTEENTH LINE
    $('line.fifteenth').attr('x1', $('.below-buy-dentacoin .first-dot').offset().left);
    $('line.fifteenth').attr('y1', $('.below-buy-dentacoin .first-dot').offset().top + $('.below-buy-dentacoin .first-dot').height());
    $('line.fifteenth').attr('y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
    $('line.fifteenth').attr('max-x2', $('.below-buy-dentacoin .second-dot').offset().left + $('.below-buy-dentacoin .second-dot').width());

    //SIXTEENTH LINE
    $('line.sixteenth').attr('x1', $('.below-buy-dentacoin .second-dot').offset().left + $('.below-buy-dentacoin .second-dot').width());
    $('line.sixteenth').attr('y1', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
    $('line.sixteenth').attr('x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
    $('line.sixteenth').attr('max-y2', $('.awards-and-publications .first-dot').offset().top + $('.awards-and-publications .first-dot').height());

    //SEVENTEENTH LINE
    $('line.seventeenth').attr('x1', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
    $('line.seventeenth').attr('y1', $('.awards-and-publications .first-dot').offset().top + $('.awards-and-publications .first-dot').height());
    $('line.seventeenth').attr('y2', $('.roadmap .first-dot').offset().top);
    $('line.seventeenth').attr('max-x2', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());

    //EIGHTEENTH LINE
    $('line.eighteenth').attr('y1', $('.roadmap .first-dot').offset().top);
    $('line.eighteenth').attr('max-y2', $('.roadmap .second-dot').offset().top + $('.roadmap .second-dot').height());
    $('body').addClass('overflow-hidden');
    if($(window).width() < 1600)    {
        $('body').removeClass('overflow-hidden');
        $('line.eighteenth').attr('x1', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());
        $('line.eighteenth').attr('x2', $('.roadmap .second-dot').offset().left + $('.roadmap .second-dot').width());
    }else {
        $('body').removeClass('overflow-hidden');
        $('line.eighteenth').attr('x1', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width() + 1);
        $('line.eighteenth').attr('x2', $('.roadmap .second-dot').offset().left + $('.roadmap .second-dot').width() + 1);
    }

    //NINETEENTH LINE
    $('line.nineteenth').attr('x1', $('.roadmap-timeline .first-dot').offset().left + $('.roadmap-timeline .first-dot').width());
    $('line.nineteenth').attr('y1', $('.roadmap-timeline .first-dot').offset().top + $('.roadmap-timeline .first-dot').height());
    $('line.nineteenth').attr('x2', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width());
    $('line.nineteenth').attr('max-y2', $('.below-roadmap-timeline .first-dot').offset().top + $('.below-roadmap-timeline .first-dot').height() / 2);

    //TWENTIETH LINE
    $('line.twentieth').attr('x1', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width());
    $('line.twentieth').attr('y1', $('.below-roadmap-timeline .first-dot').offset().top + $('.below-roadmap-timeline .first-dot').height() / 2);
    $('line.twentieth').attr('y2', $('.below-roadmap-timeline .second-dot').offset().top + $('.below-roadmap-timeline .second-dot').height() / 2);
    $('line.twentieth').attr('max-x2', $('.below-roadmap-timeline .second-dot').offset().left);

    //MUST SET ATTR WHEN LINE IS EXECUTED AND CHECK FOR IT ALSO
    if(resize)  {
        if($('body').hasClass('home')) {
            $('line.first').attr('y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());
        }

        $('line.second').attr('y2', $('.successful-practices .second-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .third-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .fourth-dot').offset().top + $('.successful-practices .fourth-dot').height());
        $('line.fifth').attr('y2', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);
        $('line.sixth').attr('x2', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width());
        $('line.seventh').attr('y2', $('.testimonials .first-dot').offset().top + $('.testimonials .first-dot').height() / 2);
        $('line.eighth').attr('x2', $('.testimonials .second-dot').offset().left);
        $('line.ninth').attr('y2', $('.testimonials .third-dot').offset().top + $('.testimonials .third-dot').height());
        $('line.tenth').attr('x2', $('.buy-dentacoin .first-dot').offset().left + $('.buy-dentacoin .first-dot').width());
        $('line.eleventh').attr('y2', $('.buy-dentacoin .second-dot').offset().top + $('.buy-dentacoin .second-dot').height());
        $('line.twelfth').attr('y2', $('.buy-dentacoin .fourth-dot').offset().top + $('.buy-dentacoin .fourth-dot').height());
        $('line.thirteenth').attr('x2', $('.buy-dentacoin .fifth-dot').offset().left);
        $('line.fourteenth').attr('y2', $('.below-buy-dentacoin .first-dot').offset().top + $('.below-buy-dentacoin .first-dot').height());
        $('line.fifteenth').attr('x2', $('.below-buy-dentacoin .second-dot').offset().left + $('.below-buy-dentacoin .second-dot').width());
        $('line.sixteenth').attr('y2', $('.awards-and-publications .first-dot').offset().top + $('.awards-and-publications .first-dot').height());
        $('line.seventeenth').attr('x2', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());
        $('line.eighteenth').attr('y2', $('.roadmap .second-dot').offset().top + $('.roadmap .second-dot').height());
        $('line.nineteenth').attr('y2', $('.below-roadmap-timeline .first-dot').offset().top + $('.below-roadmap-timeline .first-dot').height() / 2);
        $('line.twentieth').attr('x2', $('.below-roadmap-timeline .second-dot').offset().left);
    }else {
        //SETTING UP FRESH ATTRIBUTES ALSO FOR REFRESHING THE MAIN DOTS AT THEIR STARTING POSITION
        if($('body').hasClass('home')) {
            $('line.first')/*.attr('y2', $('header .first-dot').offset().top)*/.attr('fresh-y2', 0);
        }

        $('line.second').attr('y2', $('.successful-practices .first-dot').offset().top).attr('fresh-y2', $('.successful-practices .first-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .second-dot').offset().left).attr('fresh-x2', $('.successful-practices .second-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .third-dot').offset().top).attr('fresh-y2', $('.successful-practices .third-dot').offset().top);
        $('line.fifth').attr('y2', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height()).attr('fresh-y2', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
        $('line.sixth').attr('x2', $('.below-successful-practices .first-dot').offset().left - border_width).attr('fresh-x2', $('.below-successful-practices .first-dot').offset().left - border_width);
        $('line.seventh').attr('y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2).attr('fresh-y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
        $('line.eighth').attr('x2', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width()).attr('fresh-x2', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width());
        $('line.ninth').attr('y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2).attr('fresh-y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
        $('line.tenth').attr('x2', $('.testimonials .third-dot').offset().left).attr('fresh-x2', $('.testimonials .third-dot').offset().left);
        $('line.eleventh').attr('y2', $('.buy-dentacoin .first-dot').offset().top).attr('fresh-y2', $('.buy-dentacoin .first-dot').offset().top);
        $('line.twelfth').attr('y2', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height() - 1).attr('fresh-y2', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height() - 1);
        $('line.thirteenth').attr('x2', $('.buy-dentacoin .fourth-dot').offset().left).attr('fresh-x2', $('.buy-dentacoin .fourth-dot').offset().left);
        $('line.fourteenth').attr('y2', $('.buy-dentacoin .fifth-dot').offset().top).attr('fresh-y2', $('.buy-dentacoin .fifth-dot').offset().top);
        $('line.fifteenth').attr('x2', $('.below-buy-dentacoin .first-dot').offset().left).attr('fresh-x2', $('.below-buy-dentacoin .first-dot').offset().left);
        $('line.sixteenth').attr('y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height()).attr('fresh-y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
        $('line.seventeenth').attr('x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width()).attr('fresh-x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
        $('line.eighteenth').attr('y2', $('.roadmap .first-dot').offset().top).attr('fresh-y2', $('.roadmap .first-dot').offset().top);
        $('line.nineteenth').attr('y2', $('.roadmap-timeline .first-dot').offset().top + $('.roadmap-timeline .first-dot').height()).attr('fresh-y2', $('.roadmap-timeline .first-dot').offset().top + $('.roadmap-timeline .first-dot').height());
        $('line.twentieth').attr('x2', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width()).attr('fresh-x2', $('.below-roadmap-timeline .first-dot').offset().left + $('.below-roadmap-timeline .first-dot').width());
    }
}

function refreshingMainDots()   {
    stoppers = [];
    //refresh dots
    for(var i = 0, len = $('svg.svg-with-lines line').length; i < len; i+=1)    {
        if($('svg.svg-with-lines line').eq(i).attr('fresh-x2') != undefined)   {
            $('svg.svg-with-lines line').eq(i).attr('x2', $('svg.svg-with-lines line').eq(i).attr('fresh-x2'));
        }else if($('svg.svg-with-lines line').eq(i).attr('fresh-y2') != undefined)   {
            $('svg.svg-with-lines line').eq(i).attr('y2', $('svg.svg-with-lines line').eq(i).attr('fresh-y2'));
        }
    }

    //clear intervals
    for(var item in intervals_arr) {
        clearInterval(intervals_arr[item]);
    }
    intervals_arr = [];

    //bring back gifs to their starting position
    $('img.refresh-image').removeClass('active');

    //bring back gifs texts to their starting position
    $('.between-sections-description').addClass('visibility-hidden').removeClass('fade-in-animation');
    $('.below-successful-practices .description-over-line .description .wrapper').addClass('visibility-hidden').removeClass('fade-in-animation');
    for(var i = 0, len = $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').length; i < len; i+=1)   {
        $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').eq(i).removeClass('fade-in-animation-'+(i+1));
    }
}

function checkIfLineIsReadyToBeCreated(el, position, tail, tail_position, action) {
    //HOMEPAGE
    if((($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) && !basic.isMobile()) {
        //doing this check, because IE 11 not support ES6
        if (action === undefined) {
            action = null;
        }
        //checking if element offset top passed the viewport middle vertically and if it has been executed before
        //if($(window).height() / 2 + $(window).scrollTop() > $('line.' + el).offset().top) {
        //CHANGED $('line.' + el).offset().top to $('line.' + el).attr('y1') because offset() not working in Safari
        if($(window).height() / 2 + $(window).scrollTop() > $('line.' + el).attr('y1')) {
            //checking if it's not the first line and if the line before the current one is executed
            if ($('line.' + el).index() - 1 > -1/* && $('line').eq($('line.' + el).index() - 1).attr('executed') == 'true'*/) {
                drawLine(el, position, tail, tail_position, action);
            }
        }
    }
}

//function for drawing single line, tail and tail_position are arrays with tail lines and are used to draw group of lines, action is an event executed when the line or the group of lines execution is done
function drawLine(el, position, tail, tail_position, action) {
    //doing this check, because IE 11 not support ES6
    if(tail === undefined) {
        tail = null;
    }
    if(tail_position === undefined) {
        tail_position = null;
    }
    if(action === undefined) {
        action = null;
    }

    if($.inArray(el, stoppers) == -1)   {
        stoppers.push(el);
        if(position == 'vertical') {
            intervals_arr[el] = setInterval(verticalTimer, draw_line_interval);
        }else if(position == 'horizontal')    {
            if(parseFloat($('line.'+el).attr('x2')) > parseFloat($('line.'+el).attr('max-x2'))) {
                //if horizontal line drawing from right to left
                intervals_arr[el] = setInterval(horizontalTimerBackwards, draw_line_interval);
            }else {
                //if horizontal line drawing from left to right
                intervals_arr[el] = setInterval(horizontalTimerForward, draw_line_interval);
            }
        }

        function verticalTimer()  {
            if (parseFloat($('line.' + el).attr('y2')) + draw_line_increment < parseFloat($('line.' + el).attr('max-y2'))) {
                $('line.' + el).attr('y2', parseFloat($('line.' + el).attr('y2')) + draw_line_increment);
            } else {
                $('line.' + el).attr('y2', $('line.' + el).attr('max-y2'))/*.attr('executed', 'true')*/;
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }

        function horizontalTimerBackwards()  {
            if(parseFloat($('line.'+el).attr('x2')) + draw_line_increment > parseFloat($('line.'+el).attr('max-x2'))) {
                $('line.'+el).attr('x2', parseFloat($('line.'+el).attr('x2')) - draw_line_increment);
            }else {
                $('line.'+el).attr('x2', $('line.'+el).attr('max-x2'))/*.attr('executed', 'true')*/;
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }

        function horizontalTimerForward()  {
            if(parseFloat($('line.'+el).attr('x2')) + draw_line_increment < parseFloat($('line.'+el).attr('max-x2'))) {
                $('line.'+el).attr('x2', parseFloat($('line.'+el).attr('x2')) + draw_line_increment);
            }else {
                $('line.'+el).attr('x2', $('line.'+el).attr('max-x2'))/*.attr('executed', 'true')*/;
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }
    }
}

//checking if there is tail and it position and call it on parent finish
function callTheTail(tail, tail_position, action)  {
    //doing this check, because IE 11 not support ES6
    if(tail === undefined) {
        tail = null;
    }
    if(tail_position === undefined) {
        tail_position = null;
    }
    if(action === undefined) {
        action = null;
    }

    if(tail != null && tail_position != null) {
        if(tail.length > 0 && tail_position.length > 0) {
            var next_tail = tail[0];
            var next_tail_position = tail_position[0];
            tail.shift();
            tail_position.shift();
            drawLine(next_tail, next_tail_position, tail, tail_position, action);
        }else if(action != null)    {
            callActionOnLastTailFinish(action);
        }
    }
}

//execute logic when group of lines is being executed
function callActionOnLastTailFinish(action)    {
    switch(action) {
        case 'load-successful-practices-gif':
            if(basic.isInViewport($('.homepage-container .successful-practices .content figure img')))    {
                $('.homepage-container .successful-practices .content figure img').attr("src", $('.homepage-container .successful-practices .content figure img').attr('data-gif')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .successful-practices .content figure img').addClass('active');
                });

            }else {
                $('.homepage-container .successful-practices .content figure img').attr("src", $('.homepage-container .successful-practices .content figure img').attr('data-svg')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .successful-practices .content figure img').addClass('active');
                });
            }
            //description fade-in animation
            $('.homepage-container .below-successful-practices .between-sections-description').removeClass('visibility-hidden').addClass('fade-in-animation');
            break;
        case 'load-buy-dentacoin-gif':
            if(basic.isInViewport($('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img')))    {
                $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr("src", $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr('data-gif')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').addClass('active');
                });
            }else {
                $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr("src", $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr('data-svg')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').addClass('active');
                });
            }
            //description fade-in animation
            $('.homepage-container .buy-dentacoin .between-sections-description').removeClass('visibility-hidden').addClass('fade-in-animation');
            break;
        case 'load-roadmap-gif':
            if(basic.isInViewport($('.homepage-container .roadmap-timeline img.desktop-image')))    {
                $('.homepage-container .roadmap-timeline img.desktop-image').attr("src", $('.homepage-container .roadmap-timeline img.desktop-image').attr('data-gif')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .roadmap-timeline img.desktop-image').addClass('active');
                });
            }else {
                $('.homepage-container .roadmap-timeline img.desktop-image').attr("src", $('.homepage-container .roadmap-timeline img.desktop-image').attr('data-svg')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .roadmap-timeline img.desktop-image').addClass('active');
                });
            }
            for(var i = 0, len = $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').length; i < len; i+=1)   {
                $('.homepage-container .roadmap-timeline .roadmap-content .roadmap-cell').eq(i).addClass('fade-in-animation-'+(i+1));
            }
            break;
        case 'fade-in-transaction-with-dcn':
            $('.homepage-container .below-buy-dentacoin .between-sections-description').removeClass('visibility-hidden').addClass('fade-in-animation');
        case 'call-sixth-and-animation':
            $('.homepage-container .below-successful-practices .description .wrapper').removeClass('visibility-hidden').addClass('fade-in-animation');
            drawLine('sixth', 'horizontal', ['seventh'], ['vertical']);
    }
}

// ==================== PAGES ====================

//HOMEPAGE
if(($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) {
    if(basic.isMobile())    {
        $('.homepage-container.mobile .successful-practices .content .content-container').removeClass('col-md-5 col-md-offset-2').addClass('col-md-12');
        $('.homepage-container.mobile .successful-practices .content figure').removeClass('col-md-5').addClass('col-md-10 col-md-offset-1');
        $('.homepage-container.mobile .below-successful-practices .flex .description-over-line').removeClass('col-md-7 col-md-offset-0').addClass('col-md-8 col-md-offset-2');
        $('.homepage-container.mobile .below-successful-practices .flex .cells').removeClass('col-md-5');
        $('.homepage-container.mobile .buy-dentacoin .wallet-app-and-gif .wallet-app').removeClass('col-md-5 col-md-offset-1');
        $('.homepage-container.mobile .buy-dentacoin .wallet-app-and-gif .gif').removeClass('col-md-5 col-md-offset-1').addClass('col-sm-10 col-sm-offset-1');
    }else {
        //set all fullpage sections with window height
        for(var i = 0, len = $('.fullpage-section').length; i < len; i+=1)  {
            if($('.fullpage-section').eq(i).outerHeight() != $(window).height())    {
                $('.fullpage-section').outerHeight($(window).height());
            }
        }

        //center vertically the 'show more' button in testimonials section
        $('.homepage-container .testimonials .below-expressions .show-more').css({'top' : 'calc(50% - '+$('.homepage-container .testimonials .expressions').height()/2+'px)'});
    }

    if($('#bidali-init-btn').length) {
        $('#bidali-init-btn').click(function() {
            fireGoogleAnalyticsEvent('Tools', 'Buy', 'Giftcard');

            bidaliSdk.Commerce.render({
                apiKey: 'pk_n6mvpompwzm83egzrz2vnh',
                paymentCurrencies: ['DCN']
            });
        });
    }

    // ===== first section video logic =====
    var homepage_video_time_watched = 0;
    var homepage_video_timer;

    $('.homepage-container .intro .bg-wrapper .video .play-btn').bind("click", openVideo);
    $('.homepage-container .intro .bg-wrapper .video .video-wrapper .close-video').click(function()   {
        $(this).closest('.video-wrapper').find('video').get(0).pause();
        $(this).closest('.video-wrapper').animate({
            width: "60px"
        }, {
            duration: 500,
            complete: function () {
                $(this).closest('.video-wrapper').hide();
                $(this).closest('.video').find('.play-btn').slideDown(500, function() {
                    $(this).bind("click", openVideo).focus();
                    $('.homepage-container .intro .bg-wrapper .section-description').show();
                });
            }
        });
    });

    $('.homepage-container .intro .video-wrapper').find('video').on('pause', function() {
        clearInterval(homepage_video_timer);
        fireGoogleAnalyticsEvent('Video', 'Play', 'Dentacoin Explainer', fmtMSS(homepage_video_time_watched));
    });

    $('.homepage-container .intro .video-wrapper').find('video').on('play', function() {
        homepage_video_timer = setInterval(function() {
            homepage_video_time_watched+=1;
        }, 1000);
    });

    function openVideo()    {
        $(this).slideUp(500);
        $(this).unbind("click", openVideo).closest('.video').find('.video-wrapper').show().animate({
            width: "100%"
        }, 500);
        $('.homepage-container .intro .video-wrapper').find('video').get(0).play();
        $('.homepage-container .intro .bg-wrapper .section-description').hide();
    }
    // ===== /first section video logic =====

    var start_clicking_from_num = 1;
    var init_apps_interval_slide;
    //logic for open application popup
    $('.single-application').click(function()   {
        singleApplicationClick($(this), true);
    });

    function singleApplicationClick(element, stop_interval_sliding) {
        $('.single-application').removeClass('show-shadow');
        element.addClass('show-shadow');
        var this_btn = element.find('.wrapper');
        var extra_html = '';
        var media_html = '';

        if(this_btn.attr('data-articles') != undefined)    {
            extra_html+='<div class="extra-html"><div class="extra-title">Latest Blog articles:</div><div class="slider-with-tool-data">';
            var articles_arr = $.parseJSON(this_btn.attr('data-articles'));
            for(var i = 0, len = articles_arr.length; i < len; i+=1)    {
                extra_html+='<a target="_blank" href="'+articles_arr[i]['link']+'"><div class="single-slide text-left fs-0"><figure class="inline-block-top" itemscope="" itemtype="http://schema.org/ImageObject"><img src="'+articles_arr[i]['thumb']+'" alt="" itemprop="contentUrl"/></figure><div class="content inline-block-top"><div class="slide-title">'+articles_arr[i]['post_title']+'</div><time>'+dateObjToFormattedDate(new Date(parseInt(articles_arr[i]['date']) * 1000))+'</time></div></div></a>';
            }
            extra_html+='</div><div class="text-center padding-top-15"><a href="//blog.dentacoin.com/" class="white-blue-rounded-btn" target="_blank">GO TO ALL</a></div></div>';
        }

        var html = '<div class="container-fluid"><div class="row">'+media_html+'<div class="col-sm-12 content"><figure class="logo"><img src="'+this_btn.attr('data-popup-logo')+'" alt="'+this_btn.attr('data-popup-logo-alt')+'"/></figure><div class="title">'+this_btn.find('figcaption').html()+'</div><div class="description">'+$.parseJSON(this_btn.attr('data-description'))+'</div>'+extra_html+'</div></div></div>';

        $('.dentacoin-ecosystem .info-section .html-content').html(html);

        if(extra_html != '') {
            initToolsPostsSlider();
        }

        $('.dentacoin-ecosystem .info-section video').removeAttr('controls');

        $('body').addClass('overflow-hidden');
        if($(window).width() > 992) {
            clearInterval(init_apps_interval_slide);

            if(stop_interval_sliding == undefined) {
                start_clicking_from_num = element.index() + 1;
                if(start_clicking_from_num == 8) {
                    start_clicking_from_num = 0;
                }

                init_apps_interval_slide = setTimeout(function() {
                    singleApplicationClick($('.dentacoin-ecosystem .single-application').eq(start_clicking_from_num));
                }, 10000);
            }
        } else {
            $('.dentacoin-ecosystem .apps-list').hide();
            $('.dentacoin-ecosystem .info-section').fadeIn(500);
        }

        $('.dentacoin-ecosystem .info-section .close-application').click(function() {
            $('.dentacoin-ecosystem .apps-list').fadeIn(500);
            $('.dentacoin-ecosystem .info-section').hide();
        });

        $('body').removeClass('overflow-hidden');
    }

    $('body').addClass('overflow-hidden');
    if($(window).width() > 992) {
        singleApplicationClick($('.dentacoin-ecosystem .single-application').eq(0));
    }
    $('body').removeClass('overflow-hidden');

    //logic for open testimonials and close the ones that are too near to the current opening one (TESTIMONIALS)
    $('.homepage-container .testimonials .circle-wrapper').click(function()   {
        $(this).addClass('active').removeClass('not-active');
        var this_text = $(this).find('.text');
        var text_width = 250;
        for(var i = 0; i < $('.homepage-container .testimonials .circle-wrapper.active').length; i+=1)  {
            var current_active_testimonial = $('.homepage-container .testimonials .circle-wrapper.active').eq(i);
            if(!current_active_testimonial.is($(this))) {
                if(current_active_testimonial.find('.text').offset().left > this_text.offset().left)   {
                    if(current_active_testimonial.find('.text').offset().left - this_text.offset().left < text_width) {
                        current_active_testimonial.removeClass('active').addClass('not-active');
                    }
                }else if(current_active_testimonial.find('.text').offset().left < this_text.offset().left)  {
                    if(this_text.offset().left - current_active_testimonial.find('.text').offset().left < text_width) {
                        current_active_testimonial.removeClass('active').addClass('not-active');
                    }
                }
            }
        }
    });

    //load random default avatar for testimonial givers without avatar
    var testimonial_icons = ['avatar-icon-1.svg', 'avatar-icon-2.svg'];
    for(var i = 0; i < $('.homepage-container .testimonials .circle-wrapper.no-image').length; i+=1)  {
        $('.homepage-container .testimonials .circle-wrapper.no-image').eq(i).find('.circle .background').css({'background-image' : 'url(/assets/images/'+testimonial_icons[Math.floor(Math.random()*testimonial_icons.length)]+')'});
    }

    //logic for show/hide different exchange methods on click in BUY DCN section
    $('.homepage-container .exchange-platforms-and-wallets .exchange-method .title').click(function() {
        if($(this).closest('.exchange-method').hasClass('active'))  {
            $(this).closest('.exchange-method').removeClass('active').find('.list').slideUp(300);
        }else {
            if(basic.isMobile())    {
                $('.homepage-container .exchange-platforms-and-wallets .exchange-method').removeClass('active').find('.list').slideUp(300);
            }
            $(this).closest('.exchange-method').addClass('active').find('.list').slideDown(300);
        }
    });

    //init slider for publications
    $('.homepage-container .awards-and-publications .publications-slider').slick({
        centerMode: true,
        centerPadding: '140px',
        slidesToShow: 3,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000,
        accessibility: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '200px',
                }
            },{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '50px'
                }
            }
        ]
    });

    //on click make slide active
    $('.homepage-container .awards-and-publications .publications-slider .single-slide').on("click", function (){
        $('.homepage-container .awards-and-publications .publications-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
    });

    $('.homepage-container .awards-and-publications .publications-slider .single-slide').keypress(function (e) {
        if (e.key === ' ' || e.key === 'Spacebar' || e.which === 13) {
            // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
            e.preventDefault();
            $('.homepage-container .ainitListingPageLinewards-and-publications .publications-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
        }
    });

    function introDentistsNumberCounter()   {
        if($('.intro b.counter span').length > 0) {
            $('.intro b.counter span').prop('Counter', 0).animate({
                Counter: parseInt($('.intro b.counter').attr('data-number'))
            }, {
                duration: 5000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        }
    }
    introDentistsNumberCounter();
}else if($('body').hasClass('testimonials')) {
    //TESTIMONIALS
    //load random default avatar for testimonial givers without avatar
    var testimonial_icons_listing_page = ['avatar-icon-1.svg', 'avatar-icon-2.svg'];
    for(var i = 0; i < $('.list .single .image.no-avatar').length; i+=1)  {
        $('.list .single .image.no-avatar').eq(i).css({'background-image' : 'url(/assets/images/'+testimonial_icons_listing_page[Math.floor(Math.random()*testimonial_icons_listing_page.length)]+')'});
    }

    $('svg.svg-with-lines').height($(document).height());

    //LINE GOING UNDER TESTIMONIAL AVATARS
    initListingPageLine();
}else if($('body').hasClass('partner-network') || $('body').hasClass('google-map-iframe')) {
    //PARTNER NETWORK
    initMap();

    if($('.featured-clinics-slider').length) {
        $('.featured-clinics-slider').slick({
            centerMode: true,
            centerPadding: '250px',
            slidesToShow: 3,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 8000,
            accessibility: true,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        centerPadding: '160px',
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '200px',
                    }
                },{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '50px'
                    }
                }
            ]
        });

        //on click make slide active
        $('.featured-clinics-slider .single-slide').on("click", function (){
            $('.featured-clinics-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
        });

        $('.featured-clinics-slider .single-slide').keypress(function (e) {
            if (e.key === ' ' || e.key === 'Spacebar' || e.which === 13) {
                // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
                e.preventDefault();
                $('.featured-clinics-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
            }
        });
    }

    //filtering google map by location type
    $('.filter select').on('change', function()  {
        var types_val = '';
        if($(this).is('.types'))    {
            types_val = $(this).val();
        }
        $('select.locations option').removeClass('hidden');
        if(types_val != '') {
            for(var i = 0, len = $('select.locations option').length; i < len; i+=1)   {
                if($('select.locations option').eq(i).attr('data-type-id') != '' && $('select.locations option').eq(i).attr('data-type-id') != types_val) {
                    $('select.locations option').eq(i).addClass('hidden');
                }
            }
            $('.selectpicker').selectpicker('refresh');
            $('.bootstrap-select.locations .dropdown-menu li a.hidden').parent().hide();
            initMap(true);
        }else {
            $('.selectpicker').selectpicker('refresh');
            initMap();
        }
    });

    //logic for show/hide locations
    $('.partner-network-container .list-with-locations .subtype-title').click(function()    {
        var this_title = $(this);
        if(!this_title.hasClass('opened'))  {
            $('.partner-network-container .list-with-locations .clinics').slideUp(300);
            $('.partner-network-container .list-with-locations .subtype-title').removeClass('opened').find('i').removeClass('active');
            this_title.addClass('opened').find('i').addClass('active');
            this_title.next().slideDown({
                duration: 300,
                complete: function()    {
                    $('html, body').animate({'scrollTop': this_title.offset().top - this_title.outerHeight()}, 300);
                }
            });
        }else {
            $('.partner-network-container .list-with-locations .clinics').slideUp(300);
            $('.partner-network-container .list-with-locations .subtype-title').removeClass('opened').find('i').removeClass('active');
        }
    });
}else if($('body').hasClass('press-center')) {
    //PRESS CENTER

    initListingPageLine();

    if($('.open-form').length > 0)  {
        $('.open-form').click(function()    {
            $.ajax({
                type: 'POST',
                url: HOME_URL + '/press-center-popup',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if(response.success)    {
                        basic.closeDialog();
                        basic.showDialog(response.success, 'media-inquries', 'media-inquries');
                        initCaptchaRefreshEvent();


                        var required_inputs = [];
                        for(var i = 0, len = $('.bootbox.media-inquries .required').length; i < len; i+=1)  {
                            required_inputs.push($('.bootbox.media-inquries .required').eq(i).attr('name'));
                        }
                        required_inputs.push('answer');

                        $('.selectpicker').selectpicker('refresh');

                        $('.bootbox.media-inquries select[name="reason"]').on('change', function()    {
                            $('.bootbox.media-inquries .waiting-for-action').html('');
                            if($(this).find('option:selected').attr('data-action') == 'newsletter-register')  {
                                $('.bootbox.media-inquries .waiting-for-action').html('<input type="hidden" name="answer" value="Manual email register to newletter receivers list."/>');
                            }else if($(this).find('option:selected').attr('data-action') == 'long-text')  {
                                $('.bootbox.media-inquries .waiting-for-action').html('<div class="popup-row"><textarea placeholder="'+$(this).find('option:selected').attr('data-title')+'" rows="3" name="answer" maxlength="3000"></textarea></div>');
                            }else if($(this).find('option:selected').attr('data-action') == 'long-text-and-attachments')  {
                                $('.bootbox.media-inquries .waiting-for-action').html('<textarea placeholder="'+$(this).find('option:selected').attr('data-title')+'" rows="3" name="answer" class="padding-bottom-10" maxlength="3000"></textarea></div><div class="popup-row text-center-xs"><div class="upload-file inline-block-top" id="media-package" data-label="Attach file (media package):"><input type="file" name="media-package" class="inputfile inputfile-1 hide-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"><button type="button"></button></div><div class="upload-file inline-block-top" id="individual-offer" data-label="Attach file (individual offer, if present):"><input type="file" class="inputfile inputfile-1 hide-input" name="individual-offer" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"><button type="button"></button></div>');
                                styleContactFormUploadBtn();

                                //ADD CUSTOM EVENTS ON ENTER OR SPACE CLICK FOR accessibility
                                $('.bootbox.media-inquries #media-package button').keypress(function(event){
                                    if(event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32){
                                        document.getElementById('file-media-package').click();
                                    }
                                });
                                $('.bootbox.media-inquries #individual-offer button').keypress(function(event){
                                    if(event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32){
                                        document.getElementById('file-individual-offer').click();
                                    }
                                });
                            }
                        });

                        $('.bootbox.media-inquries form').on('submit', function(event)    {
                            var errors = [];
                            for(var i = 0, len = required_inputs.length; i < len; i+=1) {
                                if(required_inputs[i] == 'answer')  {
                                    if($('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').length > 0) {
                                        if($('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').val().trim() == '') {
                                            errors.push('<strong>Reason for contract extra field</strong> is required.');
                                        }
                                    }else {
                                        errors.push('<strong>Reason for contract extra field</strong> is required.');
                                    }
                                }else {
                                    if($('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').length > 0) {
                                        if($('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').val().trim() == '')    {
                                            if($('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').is('input'))    {
                                                errors.push('<strong>'+$('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').attr('placeholder')+'</strong> is required.');
                                            }else if($('[name="'+required_inputs[i]+'"]').is('select')) {
                                                errors.push('<strong>'+$('.bootbox.media-inquries [name="'+required_inputs[i]+'"]').attr('title')+'</strong> is required.');
                                            }
                                        }
                                    }else {
                                        window.location.reload();
                                    }
                                }
                            }

                            if(!$('.bootbox.media-inquries #agree-with-privacy-policy-popup').is(':checked'))   {
                                errors.push($('.bootbox.media-inquries #agree-with-privacy-policy-popup').closest('.checkbox-row').attr('data-valid-message'));
                            }

                            if(errors.length > 0) {
                                event.preventDefault();
                                var errors_html = '';
                                for(var y = 0, len = errors.length; y < len; y+=1)  {
                                    errors_html+='<div class="alert alert-danger">'+errors[y]+'</div>';
                                }
                                $('.bootbox.media-inquries .errors.popup-row').html(errors_html);
                            }
                        });
                    }
                }
            });
        });
    }
}else if($('body').hasClass('team')) {
    //TEAM

    //init slider for advisors
    $('.team-container .advisors .advisors-slider').slick({
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 8000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    //bind click event for show more advisors
    $('.team-container .more-advisors .read-more a').click(function()   {
        $(this).closest('.more-advisors').find('.list').slideDown(300);
        $(this).closest('.read-more').slideUp(300);
    });
}else if($('body.careers.allow-draw-lines').length > 0) {
    $('.join-our-team .text .btn-container a').click(function()  {
        $('html, body').animate({'scrollTop': $('.open-job-positions-title .logo-over-line').offset().top}, 300);
    });
}else if($('body.careers').length > 0) {
    //init buttons style
    styleContactFormUploadBtn(true);

    var required_inputs = [];
    for(var i = 0, len = $('.apply-for-position form .required').length; i < len; i+=1)  {
        required_inputs.push($('.apply-for-position form .required').eq(i).attr('name'));
    }

    //handle apply from submission
    $('.apply-for-position form').on('submit', function()   {
        var this_form = $(this);
        var errors = [];
        for(var i = 0, len = required_inputs.length; i < len; i+=1) {
            if($('.apply-for-position form [name="'+required_inputs[i]+'"]').length > 0) {
                if($('.apply-for-position form [name="'+required_inputs[i]+'"]').val().trim() == '') {
                    errors.push('<strong>'+$('.apply-for-position form [name="'+required_inputs[i]+'"]').attr('placeholder')+'</strong> is required.');
                }
            }else {
                window.location.reload();
            }
        }

        if(!this_form.find('.privacy-policy #privacy-policy').is(':checked'))   {
            errors.push(this_form.find('.privacy-policy').attr('data-valid-message'));
        }

        if(errors.length > 0) {
            event.preventDefault();
            var errors_html = '';
            for(var y = 0, len = errors.length; y < len; y+=1)  {
                errors_html+='<div class="alert alert-danger">'+errors[y]+'</div>';
            }
            $('.errors.form-row').html(errors_html);
            $('html, body').animate({'scrollTop': $('.below-apply-for-position').offset().top}, 300);
        }
    });
}else if($('body.corporate-design').length > 0) {
    $('.clickable-squares-row .square').click(function()    {
        $(this).closest('.clickable-squares-row').find('.square').removeClass('active');
        $(this).addClass('active');
    });
}

function drawHeaderToFirstSectionLine() {
    //FIRST LINE
    $('line.first').attr('x1', $('header .first-dot').offset().left);
    $('line.first').attr('y1', $('header .first-dot').offset().top);
    $('line.first').attr('x2', $('.second-dot').offset().left);
    $('line.first').attr('y2', $('.second-dot').offset().top + $('.second-dot').height() - 1);

    //SECOND LINE
    $('line.second').attr('x1', $('.second-dot').offset().left);
    $('line.second').attr('y1', $('.second-dot').offset().top + $('.second-dot').height() - 1);
    $('line.second').attr('x2', $('.third-dot').offset().left);
    $('line.second').attr('y2', $('.third-dot').offset().top + $('.third-dot').height() - 1);
}

function drawNavToBottomSectionLine() {
    $('line.third').attr('x1', $('.nav-to-bottom-first-dot').offset().left);
    $('line.third').attr('y1', $('.nav-to-bottom-first-dot').offset().top + $('.nav-to-bottom-first-dot').height());
    $('line.third').attr('x2', $('.nav-to-bottom-second-dot').offset().left);
    $('line.third').attr('y2', $('.nav-to-bottom-second-dot').offset().top + $('.nav-to-bottom-second-dot').height());

    $('line.fourth').attr('x1', $('.nav-to-bottom-second-dot').offset().left);
    $('line.fourth').attr('y1', $('.nav-to-bottom-second-dot').offset().top + $('.nav-to-bottom-second-dot').height());
    $('line.fourth').attr('x2', $('.nav-to-bottom-third-dot').offset().left);
    $('line.fourth').attr('y2', $('.nav-to-bottom-third-dot').offset().top);

    $('line.fifth').attr('x1', $('.nav-to-bottom-third-dot').offset().left);
    $('line.fifth').attr('y1', $('.nav-to-bottom-third-dot').offset().top);
    $('line.fifth').attr('x2', $('.nav-to-bottom-fourth-dot').offset().left);
    $('line.fifth').attr('y2', $('.nav-to-bottom-fourth-dot').offset().top);
}

function styleContactFormUploadBtn(load_filename_to_other_el)    {
    if(load_filename_to_other_el === undefined) {
        load_filename_to_other_el = null;
    }
    jQuery(".upload-file").each(function(key, form){
        var this_file_btn_parent = jQuery(this);
        var current_form_id = this_file_btn_parent.prop("id");
        jQuery(this).find("input").attr("id","file-"+current_form_id);
        if(load_filename_to_other_el){
            jQuery(this).find("button").append("<label for='file-"+current_form_id+"'><span class='blue-white-rounded-btn'>"+this_file_btn_parent.attr('data-label')+"</span></label>");
        }else {
            jQuery(this).find("button").append("<label for='file-"+current_form_id+"'><span class='white-blue-rounded-btn'>"+this_file_btn_parent.attr('data-label')+"</span></label>");
        }

        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call( inputs, function( input ) {
            var label    = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener('change', function(e) {
                var fileName = '';
                if(this.files && this.files.length > 1)
                    fileName = ( this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
                else
                    fileName = e.target.value.split('\\').pop();

                if(fileName) {
                    if(load_filename_to_other_el)    {
                        $(this).closest('.form-row').find('.file-name').html('<i class="fa fa-file-text-o" aria-hidden="true"></i>' + fileName);
                    }else {
                        label.querySelector('span').innerHTML = fileName;
                    }
                }else{
                    label.innerHTML = labelVal;
                }
            });
            // Firefox bug fix
            input.addEventListener('focus', function(){ input.classList.add('has-focus'); });
            input.addEventListener('blur', function(){ input.classList.remove('has-focus'); });
        });
    });
}

function initListingPageLine()   {
    $('line.first').attr('x1', $('.list .single .first-dot').offset().left + $('.list .single .first-dot').width() / 2);
    $('line.first').attr('x2', $('.list .single .last-dot').offset().left + $('.list .single .last-dot').width() / 2);
    $('line.first').attr('y1', $('.list .single .first-dot').offset().top);
    $('line.first').attr('y2', $('.list .single .last-dot').offset().top);
}

// ==================== /PAGES ====================

//checking if submitted email is valid
function newsletterRegisterValidation() {
    $('.newsletter-register form').on('submit', function(event)  {
        var this_form = $(this);
        var error = false;
        if(!basic.validateEmail(this_form.find('input[type="email"]').val().trim()))    {
            error = true;
        }else if(!this_form.find('#newsletter-privacy-policy').is(':checked'))  {
            error = true;
        }

        if(!error) {
            fireGoogleAnalyticsEvent('Subscription', 'Sign-up', 'Newsletter');
        }
    });
}
newsletterRegisterValidation();

function stopMaliciousInspect()  {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.onkeydown = function(e) {
        if(event.keyCode == 123) {
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    }
}
//stopMaliciousInspect();

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function(){
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if(classname && !$('.' + classname).parents('.modal-dialog').length) {
            if($('.bootbox.login-signin-popup').length) {
                $('.hidden-login-form').html(hidden_popup_content);
            }
            bootbox.hideAll();
        }
    });
}
hidePopupOnBackdropClick();

function generateUrl(str)  {
    var str_arr = str.split("");
    var cyr = [
        'Ð°','Ð±','Ð²','Ð³','Ð´','Ðµ','Ñ‘','Ð¶','Ð·','Ð¸','Ð¹','Ðº','Ð»','Ð¼','Ð½','Ð¾','Ð¿',
        'Ñ€','Ñ','Ñ‚','Ñƒ','Ñ„','Ñ…','Ñ†','Ñ‡','Ñˆ','Ñ‰','ÑŠ','Ñ‹','ÑŒ','Ñ','ÑŽ','Ñ',
        'Ð','Ð‘','Ð’','Ð“','Ð”','Ð•','Ð','Ð–','Ð—','Ð˜','Ð™','Ðš','Ð›','Ðœ','Ð','Ðž','ÐŸ',
        'Ð ','Ð¡','Ð¢','Ð£','Ð¤','Ð¥','Ð¦','Ð§','Ð¨','Ð©','Ðª','Ð«','Ð¬','Ð­','Ð®','Ð¯',' '
    ];
    var lat = [
        'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p',
        'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya',
        'A','B','V','G','D','E','Io','Zh','Z','I','Y','K','L','M','N','O','P',
        'R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','I','Y','e','Yu','Ya','-'
    ];
    for(var i = 0; i < str_arr.length; i+=1)  {
        for(var y = 0; y < cyr.length; y+=1)    {
            if(str_arr[i] == cyr[y])    {
                str_arr[i] = lat[y];
            }
        }
    }
    return str_arr.join("").toLowerCase();
}

function checkIfCookie()    {
    if($('.privacy-policy-cookie').length > 0)  {
        $('.privacy-policy-cookie .accept').click(function()    {
            basic.cookies.set('privacy_policy', 1);
            $('.privacy-policy-cookie').hide();
        });
    }
}

function initCaptchaRefreshEvent()  {
//refreshing captcha on trying to log in admin
    if($('.refresh-captcha').length > 0)    {
        $('.refresh-captcha').click(function()  {
            $.ajax({
                type: 'GET',
                url: '/refresh-captcha',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    $('.captcha-container span').html(response.captcha);
                }
            });
        });
    }
}
initCaptchaRefreshEvent();

var hidden_popup_content = $('.hidden-login-form').html();
//call the popup for login/sign for patient and dentist
function bindLoginSigninPopupShow() {
    $(document).on('click', '.show-login-signin', function() {
        basic.closeDialog();
        $('.hidden-login-form').html('');
        basic.showDialog(hidden_popup_content, 'login-signin-popup', null, true);

        $('.login-signin-popup .dentist .form-register .address-suggester').removeClass('dont-init');

        initAddressSuggesters();

        $('.login-signin-popup .popup-header-action a').click(function() {
            $('.login-signin-popup .popup-body > .inline-block').addClass('custom-hide');
            $('.login-signin-popup .popup-body .'+$(this).attr('data-type')).removeClass('custom-hide');
        });

        $('.login-signin-popup .call-sign-up').click(function() {
            $('.login-signin-popup .form-login').hide();
            $('.login-signin-popup .form-register').show();
        });

        $('.login-signin-popup .call-log-in').click(function() {
            $('.login-signin-popup .form-login').show();
            $('.login-signin-popup .form-register').hide();
        });

        // ====================== PATIENT LOGIN/SIGNUP LOGIC ======================

        //login
        $('.login-signin-popup .patient .form-register #privacy-policy-registration-patient').on('change', function() {
            if($(this).is(':checked')) {
                $('.login-signin-popup .patient .form-register .facebook-custom-btn').removeAttr('custom-stopper');
                $('.login-signin-popup .patient .form-register .civic-custom-btn').removeAttr('custom-stopper');
            } else {
                $('.login-signin-popup .patient .form-register .facebook-custom-btn').attr('custom-stopper', 'true');
                $('.login-signin-popup .patient .form-register .civic-custom-btn').attr('custom-stopper', 'true');
            }
        });

        $(document).on('civicCustomBtnClicked', function (event) {
            $('.login-signin-popup .patient .form-register .step-errors-holder').html('');
        });

        $(document).on('civicRead', async function (event) {
            $('.response-layer').show();
        });

        $(document).on('receivedFacebookToken', async function (event) {
            $('.response-layer').show();
        });

        $(document).on('facebookCustomBtnClicked', function (event) {
            $('.login-signin-popup .patient .form-register .step-errors-holder').html('');
        });

        $(document).on('customCivicFbStopperTriggered', function (event) {
            customErrorHandle($('.login-signin-popup .patient .form-register .step-errors-holder'), 'Please agree with our privacy policy.');
        });
        // ====================== /PATIENT LOGIN/SIGNUP LOGIC ======================

        // ====================== DENTIST LOGIN/SIGNUP LOGIC ======================
        //DENTIST LOGIN
        $('.login-signin-popup form#dentist-login').on('submit', async function(event) {
            var this_form_native = this;
            var this_form = $(this_form_native);
            event.preventDefault();
            //clear prev errors
            if($('.login-signin-popup form#dentist-login .error-handle').length) {
                $('.login-signin-popup form#dentist-login .error-handle').remove();
            }

            var form_fields = this_form.find('.form-field');
            var submit_form = true;
            for(var i = 0, len = form_fields.length; i < len; i+=1) {
                if(form_fields.eq(i).attr('type') == 'email' && !basic.validateEmail(form_fields.eq(i).val().trim())) {
                    customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Please use valid email address.');
                    submit_form = false;
                } else if(form_fields.eq(i).attr('type') == 'password' && form_fields.eq(i).val().length < 6) {
                    customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Passwords must be min length 6.');
                    submit_form = false;
                }

                if(form_fields.eq(i).val().trim() == '') {
                    customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'This field is required.');
                    submit_form = false;
                }
            }

            //check if existing account
            var check_account_response = await $.ajax({
                type: 'POST',
                url: '/check-dentist-account',
                dataType: 'json',
                data: {
                    email: $('.login-signin-popup form#dentist-login input[name="email"]').val().trim(),
                    password: $('.login-signin-popup form#dentist-login input[name="password"]').val().trim()
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            if(submit_form && check_account_response.success) {
                fireGoogleAnalyticsEvent('DentistLogin', 'Click', 'Dentist Login');

                this_form_native.submit();
            } else if(check_account_response.error) {
                customErrorHandle(this_form.find('input[name="password"]').closest('.field-parent'), check_account_response.message);
            }
        });

        //DENTIST REGISTER
        $('.login-signin-popup .dentist .form-register .prev-step').click(function() {
            var current_step = $('.login-signin-popup .dentist .form-register .step.visible');
            var current_prev_step = current_step.prev();
            current_step.removeClass('visible');
            if(current_prev_step.hasClass('first')) {
                $(this).hide();
            }
            current_prev_step.addClass('visible');

            $('.login-signin-popup .dentist .form-register .next-step').val('Next');
            $('.login-signin-popup .dentist .form-register .next-step').attr('data-current-step', current_prev_step.attr('data-step'));
        });

        //SECOND STEP INIT LOGIC
        $('.login-signin-popup .step.second .user-type-container .user-type').click(function() {
            $('.login-signin-popup .step.second .user-type-container .user-type').removeClass('active');
            $(this).addClass('active');
            $('.login-signin-popup .step.second .user-type-container [name="user-type"]').val($(this).attr('data-type'));
        });

        //THIRD STEP INIT LOGIC
        $('.login-signin-popup #dentist-country').on('change', function() {
            $('.login-signin-popup .step.third .phone .country-code').html('+'+$(this).find('option:selected').attr('data-code'));
        });

        //FOURTH STEP INIT LOGIC
        styleAvatarUploadButton('.bootbox.login-signin-popup .dentist .form-register .step.fourth .avatar .btn-wrapper label');
        initCaptchaRefreshEvent();

        //DENTIST REGISTERING FORM
        $('.login-signin-popup .dentist .form-register .next-step').click(async function() {
            var this_btn = $(this);

            switch(this_btn.attr('data-current-step')) {
                case 'first':
                    var first_step_inputs = $('.login-signin-popup .dentist .form-register .step.first .form-field');
                    var errors = false;
                    $('.login-signin-popup .dentist .form-register .step.first').parent().find('.error-handle').remove();
                    for(var i = 0, len = first_step_inputs.length; i < len; i+=1) {
                        if(first_step_inputs.eq(i).attr('type') == 'email' && !basic.validateEmail(first_step_inputs.eq(i).val().trim())) {
                            customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'Please use valid email address.');
                            errors = true;
                        } else if(first_step_inputs.eq(i).attr('type') == 'email' && basic.validateEmail(first_step_inputs.eq(i).val().trim())) {
                            //coredb check if email is free
                            var check_email_if_free_response = await checkIfFreeEmail(first_step_inputs.eq(i).val().trim());
                            if(check_email_if_free_response.error) {
                                customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'The email has already been taken.');
                                errors = true;
                            }
                        }

                        if(first_step_inputs.eq(i).attr('type') == 'password' && first_step_inputs.eq(i).val().length < 6) {
                            customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'Passwords must be min length 6.');
                            errors = true;
                        }

                        if(first_step_inputs.eq(i).val().trim() == '') {
                            customErrorHandle(first_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                            errors = true;
                        }
                    }

                    if($('.login-signin-popup .dentist .form-register .step.first .form-field.password').val().trim() != $('.login-signin-popup .step.first .form-field.repeat-password').val().trim()) {
                        customErrorHandle($('.login-signin-popup .step.first .form-field.repeat-password').closest('.field-parent'), 'Both passwords don\'t match.');
                        errors = true;
                    }

                    if(!errors) {
                        fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep1');

                        $('.login-signin-popup .dentist .form-register .step').removeClass('visible');
                        $('.login-signin-popup .dentist .form-register .step.second').addClass('visible');
                        $('.login-signin-popup .prev-step').show();

                        this_btn.attr('data-current-step', 'second');
                        this_btn.val('Next');
                    }
                    break;
                case 'second':
                    var second_step_inputs = $('.login-signin-popup .dentist .form-register .step.second .form-field.required');
                    var errors = false;
                    $('.login-signin-popup .dentist .form-register .step.second').find('.error-handle').remove();

                    //check form-field fields
                    for(var i = 0, len = second_step_inputs.length; i < len; i+=1) {
                        if(second_step_inputs.eq(i).is('select')) {
                            //IF SELECT TAG
                            if(second_step_inputs.eq(i).val().trim() == '') {
                                customErrorHandle(second_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                errors = true;
                            }
                        } else if(second_step_inputs.eq(i).is('input')) {
                            //IF INPUT TAG
                            if(second_step_inputs.eq(i).val().trim() == '') {
                                customErrorHandle(second_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                errors = true;
                            }
                        }
                    }

                    //check if latin name accepts only LATIN characters
                    if(!/^[a-z A-Z]+$/.test($('.login-signin-popup .dentist .form-register .step.second input[name="latin-name"]').val().trim())) {

                        customErrorHandle($('.login-signin-popup .dentist .form-register .step.second input[name="latin-name"]').closest('.field-parent'), 'This field should contain only latin characters.');
                        errors = true;
                    }

                    //check if privacy policy checkbox is checked
                    if(!$('.login-signin-popup .dentist .form-register .step.second #privacy-policy-registration').is(':checked')) {
                        customErrorHandle($('.login-signin-popup .dentist .form-register .step.second .privacy-policy-row'), 'Please agree with our <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy policy</a>.');
                        errors = true;
                    }

                    if(!errors) {
                        fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep2');

                        $('.login-signin-popup .dentist .form-register .step').removeClass('visible');
                        $('.login-signin-popup .dentist .form-register .step.third').addClass('visible');

                        this_btn.attr('data-current-step', 'third');
                        this_btn.val('Next');
                    }
                    break;
                case 'third':
                    var third_step_inputs = $('.login-signin-popup .dentist .form-register .step.third .form-field.required');
                    var errors = false;
                    $('.login-signin-popup .dentist .form-register .step.third').find('.error-handle').remove();

                    for(var i = 0, len = third_step_inputs.length; i < len; i+=1) {
                        if(third_step_inputs.eq(i).is('select')) {
                            //IF SELECT TAG
                            if(third_step_inputs.eq(i).val().trim() == '') {
                                customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                errors = true;
                            }
                        } else if(third_step_inputs.eq(i).is('input')) {
                            //IF INPUT TAG
                            if(third_step_inputs.eq(i).val().trim() == '') {
                                customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'This field is required.');
                                errors = true;
                            }
                            if(third_step_inputs.eq(i).attr('type') == 'url' && !basic.validateUrl(third_step_inputs.eq(i).val().trim())) {
                                customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'Please enter your website URL starting with http:// or https://.');
                                errors = true;
                            }else if(third_step_inputs.eq(i).attr('type') == 'number' && !basic.validatePhone(third_step_inputs.eq(i).val().trim())) {
                                customErrorHandle(third_step_inputs.eq(i).closest('.field-parent'), 'Please use valid numbers.');
                                errors = true;
                            }
                        }
                    }

                    var validate_phone = await validatePhone($('.login-signin-popup .dentist .form-register .step.third input[name="phone"]').val().trim(), $('.login-signin-popup .dentist .form-register .step.third select[name="country-code"]').val());
                    if(has(validate_phone, 'success') && !validate_phone.success) {
                        customErrorHandle($('.login-signin-popup .dentist .form-register .step.third input[name="phone"]').closest('.field-parent'), 'Please use valid phone.');
                        errors = true;
                    }

                    if(!errors) {
                        fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationStep3');

                        $('.login-signin-popup .dentist .form-register .step').removeClass('visible');
                        $('.login-signin-popup .dentist .form-register .step.fourth').addClass('visible');

                        this_btn.attr('data-current-step', 'fourth');
                        this_btn.val('Create account');
                    }
                    break;
                case 'fourth':
                    $('.login-signin-popup .dentist .form-register .step.fourth').find('.error-handle').remove();
                    var errors = false;
                    //checking if empty avatar
                    if($('.dentist .form-register .step.fourth #custom-upload-avatar').val().trim() == '') {
                        customErrorHandle($('.step.fourth .step-errors-holder'), 'Please select avatar.');
                        errors = true;
                    }

                    //checking if no specialization checkbox selected
                    if($('.login-signin-popup .dentist .form-register .step.fourth [name="specializations[]"]:checked').val() == undefined) {
                        customErrorHandle($('.login-signin-popup .step.fourth .step-errors-holder'), 'Please select specialization/s.');
                        errors = true;
                    }

                    //check captcha
                    if(!$('.login-signin-popup .dentist .form-register .step.fourth .captcha-parent').length || !$('.login-signin-popup .dentist .form-register .step.fourth #register-captcha').length) {
                        errors = true;
                        window.location.reload();
                    } else {
                        var check_captcha_response = await checkCaptcha($('.login-signin-popup .dentist .form-register .step.fourth #register-captcha').val().trim());
                        if(check_captcha_response.error) {
                            customErrorHandle($('.login-signin-popup .step.fourth .step-errors-holder'), 'Please enter correct captcha.');
                            errors = true;
                        }
                    }

                    if(!errors) {
                        fireGoogleAnalyticsEvent('DentistRegistration', 'ClickNext', 'DentistRegistrationComplete');

                        //submit the form
                        $('.response-layer').show();
                        $('.login-signin-popup form#dentist-register').submit();
                    }
                    break;
            }
        });
        return false;
        // ====================== /DENTIST LOGIN/SIGNUP LOGIC ======================
    });
}
bindLoginSigninPopupShow();

//INIT LOGIC FOR ALL STEPS
function customErrorHandle(el, string) {
    el.append('<div class="error-handle">'+string+'</div>');
}

function styleAvatarUploadButton(label_el)    {
    if(jQuery(".upload-file.avatar").length) {
        jQuery(".upload-file.avatar").each(function(key, form){
            var this_file_btn_parent = jQuery(this);
            if(this_file_btn_parent.attr('data-current-user-avatar')) {
                this_file_btn_parent.find('.btn-wrapper').append('<label for="custom-upload-avatar" role="button" style="background-image:url('+this_file_btn_parent.attr('data-current-user-avatar')+');"><div class="inner"><i class="fa fa-plus fs-0" aria-hidden="true"></i><div class="inner-label fs-0">Add profile photo</div></div></label>');
            } else {
                this_file_btn_parent.find('.btn-wrapper').append('<label for="custom-upload-avatar" role="button"><div class="inner"><i class="fa fa-plus" aria-hidden="true"></i><div class="inner-label">Add profile photo</div></div></label>');
            }

            var inputs = document.querySelectorAll('.inputfile');
            Array.prototype.forEach.call(inputs, function(input) {
                var label    = input.nextElementSibling,
                    labelVal = label.innerHTML;

                input.addEventListener('change', function(e) {
                    readURL(this, label_el);

                    var fileName = '';
                    if(this.files && this.files.length > 1)
                        fileName = ( this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
                    else
                        fileName = e.target.value.split('\\').pop();

                    /*if(fileName) {
                        if(load_filename_to_other_el)    {
                            $(this).closest('.form-row').find('.file-name').html('<i class="fa fa-file-text-o" aria-hidden="true"></i>' + fileName);
                        }else {
                            label.querySelector('span').innerHTML = fileName;
                        }
                    }else{
                        label.innerHTML = labelVal;
                    }*/
                });
                // Firefox bug fix
                input.addEventListener('focus', function(){ input.classList.add('has-focus'); });
                input.addEventListener('blur', function(){ input.classList.remove('has-focus'); });
            });
        });
    }
}

function readURL(input, label_el) {
    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //SHOW THE IMAGE ON LOAD
            $(label_el).css({'background-image' : 'url("'+e.target.result+'")'});
            $(label_el).find('.inner i').addClass('fs-0');
            $(label_el).find('.inner .inner-label').addClass('fs-0');
        };
        reader.readAsDataURL(input.files[0]);
    }
}


//transfer all selects to bootstrap combobox
function initComboboxes() {
    $(select.combobox).each(function () {
        $(this).combobox();
    });
}

//return from CoreDB if email is taken
async function checkIfFreeEmail(email) {
    return await $.ajax({
        type: 'POST',
        url: '/check-email',
        dataType: 'json',
        data: {
            email: email
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

async function validatePhone(phone, country_code) {
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

async function checkCaptcha(captcha) {
    return await $.ajax({
        type: 'POST',
        url: '/check-captcha',
        dataType: 'json',
        data: {
            captcha: captcha
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

function apiEventsListeners() {
    //login
    $(document).on('successResponseCoreDBApi', async function (event) {
        if(event.response_data.token) {
            var custom_form_obj = {
                token: event.response_data.token,
                id: event.response_data.data.id,
                _token: $('meta[name="csrf-token"]').attr('content')
            };

            if($('input[type="hidden"][name="route"]').length && $('input[type="hidden"][name="slug"]').length) {
                custom_form_obj.route = $('input[type="hidden"][name="route"]').val();
                custom_form_obj.slug = $('input[type="hidden"][name="slug"]').val();
            }

            //check if CoreDB returned address for this user and if its valid one
            if(basic.objHasKey(custom_form_obj, 'address') != null && innerAddressCheck(custom_form_obj.address)) {
                //var current_dentists_for_logging_user = await App.assurance_methods.getWaitingContractsForPatient(custom_form_obj.address);
                //if(current_dentists_for_logging_user.length > 0) {
                //custom_form_obj.have_contracts = true;
                //}
            }

            if(event.response_data.new_account) {
                //REGISTER
                if(event.platform_type == 'facebook') {
                    fireGoogleAnalyticsEvent('PatientRegistration', 'ClickFB', 'Patient Registration FB');
                } else if(event.platform_type == 'civic') {
                    fireGoogleAnalyticsEvent('PatientRegistration', 'ClickNext', 'Patient Registration Civic');
                }
            } else {
                //LOGIN
                if(event.platform_type == 'facebook') {
                    fireGoogleAnalyticsEvent('PatientLogin', 'Click', 'Login FB');
                } else if(event.platform_type == 'civic') {
                    fireGoogleAnalyticsEvent('PatientLogin', 'Click', 'Login Civic');
                }
            }

            customJavascriptForm('/patient-login', custom_form_obj, 'post');
        }
    });

    $(document).on('errorResponseCoreDBApi', function (event) {
        var error_popup_html = '';
        if(event.response_data.errors) {
            for(var key in event.response_data.errors) {
                error_popup_html += event.response_data.errors[key]+'<br>';
            }
        }

        $('.response-layer').hide();
        basic.showDialog(error_popup_html, '', null, true);
    });
}
apiEventsListeners();

function customJavascriptForm(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

async function loggedOrNotLogic() {
    if($('body').hasClass('logged-in')) {
        var add_overflow_hidden_on_hidden_box_show = false;
        $('body').addClass('overflow-hidden');
        if($(window).width() < 992) {
            add_overflow_hidden_on_hidden_box_show = true;
        }
        $('body').removeClass('overflow-hidden');

        //IF NOT LOGGED LOGIC
        $('.logged-user-right-nav .hidden-box-hover').hover(function () {
            $('.logged-user-right-nav .hidden-box').addClass('show-this');
            if(add_overflow_hidden_on_hidden_box_show) {
                $('body').addClass('overflow-hidden');
                if(!$('.logged-user-right-nav').hasClass('with-hub')) {
                    $('.logged-user-right-nav .up-arrow').addClass('show-this');
                }
            } else {
                $('.logged-user-right-nav .up-arrow').addClass('show-this');
            }
        }, function () {
            $('.logged-user-right-nav .hidden-box').removeClass('show-this');
            if(add_overflow_hidden_on_hidden_box_show) {
                $('body').removeClass('overflow-hidden');
                if(!$('.logged-user-right-nav').hasClass('with-hub')) {
                    $('.logged-user-right-nav .up-arrow').removeClass('show-this');
                }
            } else {
                $('.logged-user-right-nav .up-arrow').removeClass('show-this');
            }
        });

        $('.logged-user-right-nav .close-btn a').click(function() {
            $('.logged-user-right-nav .hidden-box').removeClass('show-this');
            if(add_overflow_hidden_on_hidden_box_show) {
                $('body').removeClass('overflow-hidden');
                if(!$('.logged-user-right-nav').hasClass('with-hub')) {
                    $('.logged-user-right-nav .up-arrow').removeClass('show-this');
                }
            } else {
                $('.logged-user-right-nav .up-arrow').removeClass('show-this');
            }
        });

        if($('.logged-user-hamburger').length) {
            $('.logged-user-hamburger').click(function() {
                $('.logged-mobile-profile-menu').addClass('active');
            });

            $('.close-logged-mobile-profile-menu').click(function() {
                $('.logged-mobile-profile-menu').removeClass('active');
            });
        }

        //LOGGED USER LOGIC BY PAGES
        if ($('body').hasClass('edit-account')) {
            styleAvatarUploadButton('form#patient-update-profile .avatar .btn-wrapper label');

            $('form#patient-update-profile').on('submit', function (event) {
                var this_form = $(this);
                var errors = false;
                //clear prev errors
                if (this_form.find('.error-handle').length) {
                    this_form.find('.error-handle').remove();
                }

                var form_fields = this_form.find('.custom-input.required');
                for (var i = 0, len = form_fields.length; i < len; i += 1) {
                    if (form_fields.eq(i).hasClass('bootstrap-select')) {
                        continue;
                    }

                    if (form_fields.eq(i).attr('type') == 'email' && !basic.validateEmail(form_fields.eq(i).val().trim())) {
                        customErrorHandle(form_fields.eq(i).parent(), 'Please use valid email address.');
                        errors = true;
                    }

                    if (form_fields.eq(i).val().trim() == '') {
                        customErrorHandle(form_fields.eq(i).parent(), 'This field is required.');
                        errors = true;
                    }
                }

                if (this_form.find('[name="dcn_address"]').val().trim().length > 0 && !innerAddressCheck(this_form.find('[name="dcn_address"]').val().trim())) {
                    customErrorHandle(this_form.find('[name="dcn_address"]').parent(), 'Please enter valid Wallet Address.');
                    errors = true;
                }

                if (errors) {
                    event.preventDefault();
                } else {
                    $('.response-layer').show();
                }
            });
        } else if ($('body').hasClass('manage-privacy')) {
            $('.download-gdpr-data').click(function () {
                $.ajax({
                    type: 'POST',
                    url: '/download-gdpr-data',
                    dataType: 'json',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        if (response.success) {
                            window.open(response.success, '_blank');
                        } else if (response.error) {
                            basic.showAlert(response.error, '', true);
                        }
                    }
                });
            });
        } else if($('body').hasClass('my-profile')) {
            $('.my-profile-page-content .dropdown-hidden-menu button').click(function () {
                var this_btn = $(this);
                $('.my-profile-page-content .current-converted-price .amount').html((parseFloat($('.current-dcn-amount').html()) * parseFloat(this_btn.attr('data-multiple-with'))).toFixed(2));
                $('.my-profile-page-content .current-converted-price .symbol span').html(this_btn.html());
            });

            initDataTable();

            if ($('form#withdraw').length) {
                $('form#withdraw').on('submit', function (event) {
                    var this_form_native = this;
                    var this_form = $(this);
                    var form_errors = false;
                    this_form.find('.error-handle').remove();

                    for (var i = 0, len = this_form.find('.required').length; i < len; i += 1) {
                        if (this_form.find('.required').eq(i).val().trim() == '') {
                            customErrorHandle(this_form.find('.required').eq(i).parent(), 'This field is required.');
                            event.preventDefault();
                            form_errors = true;
                        } else if (this_form.find('.required').eq(i).hasClass('address') && !innerAddressCheck(this_form.find('.required').eq(i).val().trim())) {
                            customErrorHandle(this_form.find('.required').eq(i).parent(), 'Please enter valid wallet address.');
                            event.preventDefault();
                            form_errors = true;
                        }
                    }

                    event.preventDefault();
                    if (!form_errors) {
                        $('.response-layer').show();
                        this_form_native.submit();
                        this_form.unbind();
                    }
                });
            }

            if ($('form#add-dcn-address').length) {
                $('form#add-dcn-address').on('submit', function (event) {
                    var this_form = $(this);
                    this_form.find('.error-handle').remove();
                    if (this_form.find('.address').val().trim() == '') {
                        customErrorHandle(this_form.find('.address').parent(), 'Please enter your wallet address.');
                        event.preventDefault();
                    } else if (!innerAddressCheck(this_form.find('.address').val().trim())) {
                        customErrorHandle(this_form.find('.address').parent(), 'Please enter valid wallet address.');
                        event.preventDefault();
                    }
                });
            }

            //loading address logic
            await $.getScript('//dentacoin.com/assets/libs/civic-login/civic-kyc.js', function() {});

            $(document).on('civicRead', async function (event) {
                $('.response-layer').show();
            });

            $(document).on('receivedKYCCivicToken', async function (event) {
                if(event.response_data) {
                    $.ajax({
                        type: 'POST',
                        url: 'https://civic.dentacoin.net/civic',
                        dataType: 'json',
                        data: {
                            jwtToken: event.response_data
                        },
                        success: function (response) {
                            if(response.data && has(response, 'userId') && response.userId != '') {
                                $.ajax({
                                    type: 'POST',
                                    url: '/validate-civic-kyc',
                                    dataType: 'json',
                                    data: {
                                        token: event.response_data
                                    },
                                    headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                    },
                                    success: function (inner_response) {
                                        if(inner_response.success) {
                                            basic.showAlert('Civic KYC authentication passed successfully.', '', true);
                                            setTimeout(function() {
                                                window.location.reload();
                                            }, 2000);
                                        } else if(inner_response.error) {
                                            $('.response-layer').hide();
                                            basic.showAlert(inner_response.error, '', true);
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    $('.response-layer').hide();
                    basic.showAlert('Something went wrong with Civic authentication. Please try again later.', '', true);
                }
            });
        }
    } else {
        //IF NOT LOGGED LOGIC
        if($('body').hasClass('home') || $('body').hasClass('foundation')) {
            $('.info-section .show-login-signin').offset({left: $('header .show-login-signin').offset().left});
        }
    }
}
loggedOrNotLogic();

function initDataTable()    {
    if($('table.table.table-without-reorder').length > 0) {
        $('table.table.table-without-reorder').DataTable({
            ordering: true,
            order: [],
            columnDefs: [{
                orderable: false,
                targets: 'no-sort'
            }],
            aaSorting: []
        });
    }
}

function bindGoogleAlikeButtonsEvents() {
    //google alike style for label/placeholders
    $('body').on('click', '.custom-google-label-style label', function() {
        $(this).addClass('active-label');
        if($('.custom-google-label-style').attr('data-input-blue-green-border') == 'true') {
            $(this).parent().find('input').addClass('blue-green-border');
        }
    });

    $('body').on('keyup change focusout', '.custom-google-label-style input', function() {
        var value = $(this).val().trim();
        if (value.length) {
            $(this).closest('.custom-google-label-style').find('label').addClass('active-label');
            if($(this).closest('.custom-google-label-style').attr('data-input-blue-green-border') == 'true') {
                $(this).addClass('blue-green-border');
            }
        } else {
            $(this).closest('.custom-google-label-style').find('label').removeClass('active-label');
            if($(this).closest('.custom-google-label-style').attr('data-input-blue-green-border') == 'true') {
                $(this).removeClass('blue-green-border');
            }
        }
    });
}
bindGoogleAlikeButtonsEvents();

//check if object has property
function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
}

function initToolsPostsSlider()   {
    //init slider for most popular posts
    jQuery('.slider-with-tool-data').slick({
        slidesToShow: 2,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

function dateObjToFormattedDate(object) {
    if(object.getDate() < 10) {
        var date = '0' + object.getDate();
    } else {
        var date = object.getDate();
    }

    if(object.getMonth() + 1 < 10) {
        var month = '0' + (object.getMonth() + 1);
    } else {
        var month = object.getMonth() + 1;
    }
    return date + '/' + month + '/' + object.getFullYear();
}

function onEnrichProfileFormSubmit() {
    $(document).on('submit', '.enrich-profile-container #enrich-profile', function(event) {
        var errors = false;
        var this_form = $(this);
        this_form.find('.error-handle').remove();
        if(this_form.find('[name="description"]').val().trim() == '') {
            errors = true;
            customErrorHandle(this_form.find('[name="description"]').parent(), 'Please enter short description.');
        }

        if(!errors) {
            if($('.enrich-profile-container').attr('data-type') == 'dentist') {
                fireGoogleAnalyticsEvent('DentistRegistration', 'ClickSave', 'DentistDescr');
            } else if($('.enrich-profile-container').attr('data-type') == 'clinic') {
                fireGoogleAnalyticsEvent('DentistRegistration', 'ClickSave', 'ClinicDescr');
            }
        } else {
            event.preventDefault();
        }
    });
}
onEnrichProfileFormSubmit();

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

// =================================== GOOGLE ANALYTICS TRACKING LOGIC ======================================

function bindTrackerClickDentistsBtnEvent() {
    $(document).on('click', '.init-dentists-click-event', function() {
        fireGoogleAnalyticsEvent('Tools', 'Click', 'Dentists');
    });
}
bindTrackerClickDentistsBtnEvent();

function bindTrackerClickRedirectToWalletBuyPage() {
    $(document).on('click', '.redirect-to-wallet-buy-page', function() {
        fireGoogleAnalyticsEvent('Tools', 'Buy', 'Wallet Buy');
    });
}
bindTrackerClickRedirectToWalletBuyPage();

$(document).on('click', '.logged-user-right-nav .application, .dentacoin-ecosystem-section .single-application, .dentacoin-ecosystem .single-application', function() {
    var this_btn = $(this);

    fireGoogleAnalyticsEvent('Tools', 'Click', this_btn.attr('data-platform'))
});

function fireGoogleAnalyticsEvent(category, action, label, value) {
    var event_obj = {
        'event_action' : action,
        'event_category': category,
        'event_label': label
    };

    if(value != undefined) {
        event_obj.value = value;
    }

    gtag('event', label, event_obj);
}

// =================================== /GOOGLE ANALYTICS TRACKING LOGIC ======================================