basic.init();

var intervals_arr = [];
var stoppers = [];
const draw_line_interval = 10;
const draw_line_increment = 10;
const border_width = 2;

$(document).ready(function() {

});

$(window).on('load', function() {
    //HOMEPAGE
    if($('body').hasClass('home') && !basic.isMobile()) {
        $(window).scrollTop(0);
    }
});

$('body').bind('wheel', onMousewheel);

$(window).on("load", function()   {
    if($('body').hasClass('home') && !basic.isMobile()) {
        console.log("Don't touch the code. Or do ... ¯\\_(ツ)_/¯");
        setLinesDots();
        drawLine('first', 'vertical');
    }
});

$(window).on('resize', function(){
    //HOMEPAGE
    if($('body').hasClass('home') && !basic.isMobile()) {
        setLinesDots(true);
    }
    //TESTIMONIALS
    if($('body').hasClass('testimonials')) {
        initListingPageLine();
    }
    //PRESS CENTER
    if($('body').hasClass('press-center')) {
        initListingPageLine();
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
    if($('body').hasClass('home') && !basic.isMobile() && !$('body').hasClass('modal-open')) {
        if(event.originalEvent.deltaY < 0)  {
            //scroll up
            if($('body').attr('data-current') == 'two') {
                scrollToSectionAnimation('one', null, null, true);
            }else if ($(window).scrollTop() < $('.fullpage-section.two').offset().top + $('.fullpage-section.two').outerHeight() && $('body').attr('data-current') == 'rest-data') {
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
    if(full_height === undefined) {
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
    $('body').attr('data-current', to_become_current);
}

function setLinesDots(resize)    {
    //doing this check, because IE 11 not support ES6
    if(resize === undefined) {
        resize = null;
    }
    //init starting dots for all lines

    //FIRST LINE
    $('line.first').attr('x1', $('.intro .first-dot').offset().left);
    $('line.first').attr('x1', $('.intro .first-dot').offset().left);
    //$('line.first').attr('y1', $('.intro .first-dot').offset().top);
    $('line.first').attr('x2', $('.intro .second-dot').offset().left);
    $('line.first').attr('max-y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());

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
        $('line.first').attr('y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());
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
        $('line.first')/*.attr('y2', $('.intro .first-dot').offset().top)*/.attr('fresh-y2', 0);
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
    if($('body').hasClass('home') && !basic.isMobile()) {
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
            if(basic.isInViewport($('.homepage-container .roadmap-timeline img')))    {
                $('.homepage-container .roadmap-timeline img').attr("src", $('.homepage-container .roadmap-timeline img').attr('data-gif')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .roadmap-timeline img').addClass('active');
                });
            }else {
                $('.homepage-container .roadmap-timeline img').attr("src", $('.homepage-container .roadmap-timeline img').attr('data-svg')+'?'+new Date().getTime()).on('load', function()    {
                    $('.homepage-container .roadmap-timeline img').addClass('active');
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
if($('body').hasClass('home')) {
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

    // ===== first section video logic =====
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
                });
            }
        });
    });

    function openVideo()    {
        $(this).slideUp(500);
        $(this).unbind("click", openVideo).closest('.video').find('.video-wrapper').show().animate({
            width: "100%"
        }, 500);
    }
    // ===== /first section video logic =====

    //logic for open application popup
    $('.single-application').click(function()   {
        var this_btn = $(this).find('.wrapper');
        var extra_html = '';
        if(this_btn.attr('data-articles') != undefined)    {
            extra_html+='<div class="extra-html"><div class="extra-title">Latest Blog articles:</div><ul>';
            var articles_arr = $.parseJSON(this_btn.attr('data-articles'));
            for(var i = 0, len = articles_arr.length; i < len; i+=1)    {
                extra_html+='<li class="link"><a href="https://blog.dentacoin.com/'+articles_arr[i]['post_name']+'" target="_blank">'+articles_arr[i]['post_title']+'</a></li>';
            }
            extra_html+='</ul><div class="see-all"><a href="https://blog.dentacoin.com/" class="white-blue-rounded-btn" target="_blank">GO TO ALL</a></div></div>';
        }
        var html = '<div class="container-fluid"><div class="row"><figure class="col-sm-6 gif"><img src="'+this_btn.attr('data-image')+'?'+new Date().getTime()+'" alt="'+this_btn.attr('data-image-alt')+'"/></figure><div class="col-sm-6 col-xs-12 content"><figure class="logo"><img src="'+this_btn.attr('data-popup-logo')+'" alt="'+this_btn.attr('data-popup-logo-alt')+'"/></figure><div class="title">'+this_btn.find('figcaption').html()+'</div><div class="description">'+$.parseJSON(this_btn.attr('data-description'))+'</div>'+extra_html+'</div></div></div>';
        basic.showDialog(html, 'application-popup', this_btn.attr('data-slug'));
    });

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

    //filtering google map by location type
    $('.partner-network-container .filter select').on('change', function()  {
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
                success: function (response) {
                    if(response.success)    {
                        basic.closeDialog();
                        basic.showDialog(response.success, 'media-inquries', 'media-inquries');
                        var required_inputs = [];
                        for(var i = 0, len = $('.required').length; i < len; i+=1)  {
                            required_inputs.push($('.required').eq(i).attr('name'));
                        }
                        required_inputs.push('answer');
                        $('.selectpicker').selectpicker('refresh');

                        $('select[name="reason"]').on('change', function()    {
                            $('.waiting-for-action').html('');
                            if($(this).find('option:selected').attr('data-action') == 'newsletter-register')  {
                                $('.waiting-for-action').html('<input type="hidden" name="answer" value="Manual email register to newletter receivers list."/>');
                            }else if($(this).find('option:selected').attr('data-action') == 'long-text')  {
                                $('.waiting-for-action').html('<div class="popup-row"><textarea placeholder="'+$(this).find('option:selected').attr('data-title')+'" rows="3" name="answer" maxlength="3000"></textarea></div>');
                            }else if($(this).find('option:selected').attr('data-action') == 'long-text-and-attachments')  {
                                $('.waiting-for-action').html('<textarea placeholder="'+$(this).find('option:selected').attr('data-title')+'" rows="3" name="answer" class="padding-bottom-10" maxlength="3000"></textarea></div><div class="popup-row text-center-xs"><div class="upload-file inline-block-top" id="media-package" data-label="Attach file (media package):"><input type="file" name="media-package" class="inputfile inputfile-1 hide-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"><button type="button"></button></div><div class="upload-file inline-block-top" id="individual-offer" data-label="Attach file (individual offer, if present):"><input type="file" class="inputfile inputfile-1 hide-input" name="individual-offer" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"><button type="button"></button></div>');
                                styleContactFormUploadBtn();

                                //ADD CUSTOM EVENTS ON ENTER OR SPACE CLICK FOR accessibility
                                $('#media-package button').keypress(function(event){
                                    if(event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32){
                                        document.getElementById('file-media-package').click();
                                    }
                                });
                                $('#individual-offer button').keypress(function(event){
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
                                    if($('[name="'+required_inputs[i]+'"]').length > 0) {
                                        if($('[name="'+required_inputs[i]+'"]').val().trim() == '') {
                                            errors.push('<strong>Reason for contract extra field</strong> is required.');
                                        }
                                    }else {
                                        errors.push('<strong>Reason for contract extra field</strong> is required.');
                                    }
                                }else {
                                    if($('[name="'+required_inputs[i]+'"]').length > 0) {
                                        if($('[name="'+required_inputs[i]+'"]').val().trim() == '')    {
                                            if($('[name="'+required_inputs[i]+'"]').is('input'))    {
                                                errors.push('<strong>'+$('[name="'+required_inputs[i]+'"]').attr('placeholder')+'</strong> is required.');
                                            }else if($('[name="'+required_inputs[i]+'"]').is('select')) {
                                                errors.push('<strong>'+$('[name="'+required_inputs[i]+'"]').attr('title')+'</strong> is required.');
                                            }
                                        }
                                    }else {
                                        window.location.reload();
                                    }
                                }
                            }

                            if(!$('#agree-with-privacy-policy-popup').is(':checked'))   {
                                errors.push($('#agree-with-privacy-policy-popup').closest('.checkbox-row').attr('data-valid-message'));
                            }

                            if(errors.length > 0) {
                                event.preventDefault();
                                var errors_html = '';
                                for(var y = 0, len = errors.length; y < len; y+=1)  {
                                    errors_html+='<div class="alert alert-danger">'+errors[y]+'</div>';
                                }
                                $('.errors.popup-row').html(errors_html);
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
}

function styleContactFormUploadBtn()    {
    jQuery(".upload-file").each(function(key, form){
        var this_file_btn_parent = jQuery(this);
        var current_form_id = this_file_btn_parent.prop("id");
        jQuery(this).find("input").attr("id","file-"+current_form_id);
        jQuery(this).find("button").append("<label for='file-"+current_form_id+"'><span class='white-blue-rounded-btn'>"+this_file_btn_parent.attr('data-label')+"</span></label>");

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

                if(fileName)
                    label.querySelector('span').innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
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
        var errors = [];
        if(!basic.validateEmail(this_form.find('input[type="email"]').val().trim()))    {
            this_form.addClass('not-valid').append('<div class="alert alert-danger">'+this_form.find('input[type="email"]').closest('.form-row').attr('data-valid-email-message')+'</div>');
            errors.push(this_form.find('input[type="email"]').closest('.form-row').attr('data-valid-email-message'));
        }
        if(!this_form.find('#agree-with-privacy-policy').is(':checked'))  {
            errors.push(this_form.find('#agree-with-privacy-policy').closest('.form-row').attr('data-valid-message'));
        }

        if(errors.length > 0)   {
            event.preventDefault();
            this_form.addClass('not-valid').find('.alert').remove();
            for(var i = 0, len = errors.length; i < len; i+=1)  {
                this_form.append('<div class="alert alert-danger">'+errors[i]+'</div>');
            }
        }else {
            this_form.removeClass('not-valid').find('.alert').remove();
            //this_form.find('input[type="email"]').val('');
            //this_form.find('#agree-with-privacy-policy').prop('checked', false);
            this_form.append('<div class="alert alert-success">'+this_form.attr('data-success-message')+'</div>');
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
stopMaliciousInspect();

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function(){
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if(classname && !$('.' + classname).parents('.modal-dialog').length) {
            bootbox.hideAll();
        }
    });
}
hidePopupOnBackdropClick();