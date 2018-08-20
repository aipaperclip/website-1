var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

$(document).ready(function() {
    $(this).scrollTop(0);

    //HOMEPAGE
    if($('.homepage-container').length > 0) {
        //set all fullpage sections with window height
        $('.fullpage-section').outerHeight($(window).height());

        //center vertically the 'show more' button in testimonials section
        $('.homepage-container .testimonials .below-expressions .show-more').css({'top' : 'calc(50% - '+$('.homepage-container .testimonials .expressions').height()/2+'px)'});
    }
    $('svg.svg-with-lines').height($(document).height());

    setLinesDots();
    drawLine('first', 'vertical');
});

jQuery(window).on("load", function()   {
    checkInWhichSectionWeAre();
});

jQuery(window).on('resize', function(){
    setLinesDots(true);
});

jQuery(window).on('scroll', function(){
    checkIfLineIsReadyToBeCreated('second', 'vertical', ['third', 'fourth'], ['horizontal', 'vertical'], 'load-successful-practices-gif');
    checkIfLineIsReadyToBeCreated('fifth', 'vertical', ['sixth'], ['horizontal']);
    checkIfLineIsReadyToBeCreated('seventh', 'vertical', ['eighth'], ['horizontal']);
    checkIfLineIsReadyToBeCreated('ninth', 'vertical');
    checkIfLineIsReadyToBeCreated('tenth', 'horizontal', ['eleventh'], ['vertical'], 'load-buy-dentacoin-gif');
    checkIfLineIsReadyToBeCreated('twelfth', 'vertical');
    checkIfLineIsReadyToBeCreated('thirteenth', 'horizontal', ['fourteenth'], ['vertical']);
    checkIfLineIsReadyToBeCreated('fifteenth', 'horizontal', ['sixteenth'], ['vertical']);
    checkIfLineIsReadyToBeCreated('seventeenth', 'horizontal', ['eighteenth'], ['vertical'], 'load-roadmap-gif');
});

$(window).on('wheel', onMousewheel);

function scrollToSectionAnimation(to_become_current, full_height) {
    //doing this check, because IE 11 not support ES6
    if(full_height === undefined) {
        full_height = null;
    }

    var scroll_obj = {};
    if(full_height != null) {
        scroll_obj.scrollTop = $('.'+to_become_current).offset().top;
    }else {
        scroll_obj.scrollTop = $('.fullpage-section.'+to_become_current).offset().top;
    }
    $(window).unbind('wheel');
    jQuery('html, body').animate(scroll_obj, 500).promise().then(function() {
        $(window).on('wheel', onMousewheel);
    });
    $('body').attr('data-current', to_become_current);
}

function onMousewheel(event) {
    if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        //up
        if($('body').attr('data-current') == 'two') {
            scrollToSectionAnimation('one');
        }else if($(window).scrollTop() < $('.fullpage-section.two').offset().top + $('.fullpage-section.two').outerHeight() && $('body').attr('data-current') == 'rest-data') {
            scrollToSectionAnimation('two');
        }
    }else {
        //down
        if($('body').attr('data-current') == 'one') {
            scrollToSectionAnimation('two');
        }else if($('body').attr('data-current') == 'two') {
            scrollToSectionAnimation('rest-data', true);
        }
    }
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
    $('line.fifth').attr('x1', $('.successful-practices .fifth-dot').offset().left + $('.successful-practices .fifth-dot').width());
    $('line.fifth').attr('y1', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
    $('line.fifth').attr('x2', $('.below-successful-practices .first-dot').offset().left);
    $('line.fifth').attr('max-y2', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);

    //SIXTH LINE
    $('line.sixth').attr('x1', $('.below-successful-practices .first-dot').offset().left);
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
    $('line.twelfth').attr('x1', $('.buy-dentacoin .third-dot').offset().left);
    $('line.twelfth').attr('y1', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height());
    $('line.twelfth').attr('x2', $('.buy-dentacoin .fourth-dot').offset().left);
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
    $('line.eighteenth').attr('x1', $('.roadmap .first-dot').offset().left + $('.roadmap .first-dot').width());
    $('line.eighteenth').attr('y1', $('.roadmap .first-dot').offset().top);
    $('line.eighteenth').attr('x2', $('.roadmap .second-dot').offset().left + $('.roadmap .second-dot').width());
    $('line.eighteenth').attr('max-y2', $('.roadmap .second-dot').offset().top + $('.roadmap .second-dot').height());

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
    }else {
        $('line.first').attr('y2', $('.intro .first-dot').offset().top);
        $('line.second').attr('y2', $('.successful-practices .first-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .second-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .third-dot').offset().top);
        $('line.fifth').attr('y2', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
        $('line.sixth').attr('x2', $('.below-successful-practices .first-dot').offset().left);
        $('line.seventh').attr('y2', $('.below-successful-practices .second-dot').offset().top + $('.below-successful-practices .second-dot').height() / 2);
        $('line.eighth').attr('x2', $('.testimonials .first-dot').offset().left + $('.testimonials .first-dot').width());
        $('line.ninth').attr('y2', $('.testimonials .second-dot').offset().top + $('.testimonials .second-dot').height() / 2);
        $('line.tenth').attr('x2', $('.testimonials .third-dot').offset().left);
        $('line.eleventh').attr('y2', $('.buy-dentacoin .first-dot').offset().top);
        $('line.twelfth').attr('y2', $('.buy-dentacoin .third-dot').offset().top + $('.buy-dentacoin .third-dot').height());
        $('line.thirteenth').attr('x2', $('.buy-dentacoin .fourth-dot').offset().left);
        $('line.fourteenth').attr('y2', $('.buy-dentacoin .fifth-dot').offset().top);
        $('line.fifteenth').attr('x2', $('.below-buy-dentacoin .first-dot').offset().left);
        $('line.sixteenth').attr('y2', $('.below-buy-dentacoin .second-dot').offset().top + $('.below-buy-dentacoin .second-dot').height());
        $('line.seventeenth').attr('x2', $('.awards-and-publications .first-dot').offset().left + $('.awards-and-publications .first-dot').width());
        $('line.eighteenth').attr('y2', $('.roadmap .first-dot').offset().top);
    }
}

var intervals_arr = [];
var stoppers = [];
const draw_line_interval = 10;
const draw_line_increment = 10;
function checkIfLineIsReadyToBeCreated(el, position, tail, tail_position, action) {
    //doing this check, because IE 11 not support ES6
    if(action === undefined) {
        action = null;
    }
    //checking if element offset top passed the viewport middle vertically and if it has been executed before
    if($(window).height() / 2 + $(window).scrollTop() > $('line.'+el).offset().top)    {
        //checking if it's not the first line and if the line before the current one is executed
        if($('line.'+el).index() - 1 > -1 && $('line').eq($('line.'+el).index() - 1).attr('executed') == 'true')   {
            drawLine(el, position, tail, tail_position, action);
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
                $('line.' + el).attr('y2', $('line.' + el).attr('max-y2')).attr('executed', 'true');
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }

        function horizontalTimerBackwards()  {
            if(parseFloat($('line.'+el).attr('x2')) + draw_line_increment > parseFloat($('line.'+el).attr('max-x2'))) {
                $('line.'+el).attr('x2', parseFloat($('line.'+el).attr('x2')) - draw_line_increment);
            }else {
                $('line.'+el).attr('x2', $('line.'+el).attr('max-x2')).attr('executed', 'true');
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }

        function horizontalTimerForward()  {
            if(parseFloat($('line.'+el).attr('x2')) + draw_line_increment < parseFloat($('line.'+el).attr('max-x2'))) {
                $('line.'+el).attr('x2', parseFloat($('line.'+el).attr('x2')) + draw_line_increment);
            }else {
                $('line.'+el).attr('x2', $('line.'+el).attr('max-x2')).attr('executed', 'true');
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
            $('.homepage-container .successful-practices .content figure img').addClass('active').attr("src", $('.homepage-container .successful-practices .content figure img').attr('src')+'?'+new Date().getTime());
            break;
        case 'load-buy-dentacoin-gif':
            $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').addClass('active').attr("src", $('.homepage-container .buy-dentacoin .wallet-app-and-gif .gif img').attr('src')+'?'+new Date().getTime());
            break;
        case 'load-roadmap-gif':
            $('.homepage-container .roadmap-timeline img').addClass('active').attr("src", $('.homepage-container .roadmap-timeline img').attr('src')+'?'+new Date().getTime());
            break;
    }
}

//HOMEPAGE
if($('.homepage-container').length > 0) {
    // ===== first section video logic =====
    $('.homepage-container .intro .bg-wrapper .video .play-btn').bind("click", openVideo);
    $('.homepage-container .intro .bg-wrapper .video .video-wrapper figure.close-video').click(function()   {
        $(this).closest('.video-wrapper').find('video').get(0).pause();
        $(this).closest('.video-wrapper').animate({
            width: "60px"
        }, {
            duration: 500,
            complete: function () {
                $(this).closest('.video-wrapper').addClass('visibility-hidden');
                $(this).closest('.video').find('.play-btn').slideDown(500, function() {
                    $(this).bind("click", openVideo);
                });
            }
        });
    });

    function openVideo()    {
        $(this).slideUp(500);
        $(this).unbind("click", openVideo).closest('.video').find('.video-wrapper').removeClass('visibility-hidden').animate({
            width: "100%"
        }, 500);
    }
    // ===== /first section video logic =====

    //logic for open testimonials and close the ones that are too near to the current opening one
    $('.homepage-container .testimonials .circle-wrapper').click(function()   {
        $(this).addClass('active').removeClass('not-active');
        var this_text = $(this).find('.text');
        var text_width = 250;
        for(let i = 0; i < $('.homepage-container .testimonials .circle-wrapper.active').length; i+=1)  {
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
    for(let i = 0; i < $('.homepage-container .testimonials .circle-wrapper.no-image').length; i+=1)  {
        $('.homepage-container .testimonials .circle-wrapper.no-image').eq(i).find('.circle .background').css({'background-image' : 'url(/assets/images/'+testimonial_icons[Math.floor(Math.random()*testimonial_icons.length)]+')'});
    }

    //logic for show/hide different exchange methods on click in BUY DCN section
    $('.homepage-container .exchange-platforms-and-wallets .exchange-method .title').click(function() {
        if($(this).closest('.exchange-method').hasClass('active'))  {
            $(this).closest('.exchange-method').removeClass('active').find('.list').slideUp(300);
        }else {
            $('.homepage-container .exchange-platforms-and-wallets .exchange-method').removeClass('active').find('.list').slideUp(300);
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
        autoplaySpeed: 4000
    });

    //on click make slide active
    $('.homepage-container .awards-and-publications .publications-slider .single-slide').on("click", function (){
        $('.homepage-container .awards-and-publications .publications-slider').slick('slickGoTo', $(this).attr('data-slick-index'));
    });
}

//if on refresh page our scrollTop is more than 0 we check in which section we are
function checkInWhichSectionWeAre() {
    var current_screen_middle_scroll = $(window).scrollTop() + $(window).height() / 2;
    for(let i = 0, len = $('.fullpage-section').length; i < len; i+=1)  {
        var section = $('.fullpage-section').eq(i);
        if(current_screen_middle_scroll > section.offset().top && current_screen_middle_scroll < section.offset().top + section.height()) {
            scrollToSectionAnimation(section.attr('data-section'));
            return false;
        }
    }
    $('body').attr('data-current', 'rest-data');
}

//checking if submitted email is valid
function newsletterRegisterValidation() {
    $('.newsletter-register form').on('submit', function(event)  {
        var this_form = $(this);
        if(!basic.validateEmail(this_form.find('input[type="email"]').val().trim()))    {
            event.preventDefault();
            this_form.find('.alert').remove();
            this_form.addClass('not-valid').append('<div class="alert alert-danger">'+this_form.find('.form-row').attr('data-valid-email-message')+'</div>');
        }
    });
}
newsletterRegisterValidation();