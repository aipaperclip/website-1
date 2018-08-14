var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

$(document).ready(function() {
    $(this).scrollTop(0);

    if($('.homepage-container').length > 0) {
        $('.fullpage-section').outerHeight($(window).height());
    }
    $('svg.svg-with-lines').height($(document).height());

    setLinesDots();
    drawLine('first', 'vertical');
});

jQuery(window).on("load", function()   {

});

jQuery(window).on('resize', function(){
    setLinesDots(true);
});

jQuery(window).on('scroll', function(){
    checkIfLineIsReadyToBeCreated('second', 'vertical', ['third', 'fourth'], ['horizontal', 'vertical'], 'load-successful-practices-gif');
    checkIfLineIsReadyToBeCreated('fifth', 'vertical', ['sixth'], ['horizontal']);
});

$(window).on('wheel', onMousewheel);

function scrollToSectionAnimation(to_become_current) {
    $(window).unbind('wheel');
    jQuery('html, body').animate({
        scrollTop: $('.fullpage-section.'+to_become_current).offset().top
    }, 500).promise().then(function() {
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
            $('body').attr('data-current', 'rest-data');
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
    $('line.first').attr('y1', $('.intro .first-dot').offset().top);
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
    // + 15 for the column right padding
    $('line.sixth').attr('max-x2', $('.below-successful-practices .second-dot').offset().left + $('.below-successful-practices .second-dot').width() + 15);

    //MUST SET ATTR WHEN LINE IS EXECUTED AND CHECK FOR IT ALSO
    if(resize)  {
        $('line.first').attr('y2', $('.intro .second-dot').offset().top + $('.intro .second-dot').height());
        $('line.second').attr('y2', $('.successful-practices .second-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .third-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .fourth-dot').offset().top + $('.successful-practices .fourth-dot').height());
        $('line.fifth').attr('y2', $('.below-successful-practices .first-dot').offset().top + $('.below-successful-practices .first-dot').height() / 2);
        $('line.sixth').attr('x2', $('.successful-practices .second-dot').offset().left + $('.successful-practices .second-dot').width() + 15);
    }else {
        $('line.first').attr('y2', $('.intro .first-dot').offset().top);
        $('line.second').attr('y2', $('.successful-practices .first-dot').offset().top);
        $('line.third').attr('x2', $('.successful-practices .second-dot').offset().left);
        $('line.fourth').attr('y2', $('.successful-practices .third-dot').offset().top);
        $('line.fifth').attr('y2', $('.successful-practices .fifth-dot').offset().top + $('.successful-practices .fifth-dot').height());
        $('line.sixth').attr('x2', $('.below-successful-practices .first-dot').offset().left);
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
        drawLine(el, position, tail, tail_position, action);
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
                $('line.' + el).attr('y2', $('line.' + el).attr('max-y2'));
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }

        function horizontalTimerBackwards()  {
            if(parseFloat($('line.'+el).attr('x2')) + draw_line_increment > parseFloat($('line.'+el).attr('max-x2'))) {
                $('line.'+el).attr('x2', parseFloat($('line.'+el).attr('x2')) - draw_line_increment);
            }else {
                $('line.'+el).attr('x2', $('line.'+el).attr('max-x2'));
                clearInterval(intervals_arr[el]);
                callTheTail(tail, tail_position, action);
            }
        }

        function horizontalTimerForward()  {
            if(parseFloat($('line.'+el).attr('x2')) + draw_line_increment < parseFloat($('line.'+el).attr('max-x2'))) {
                $('line.'+el).attr('x2', parseFloat($('line.'+el).attr('x2')) + draw_line_increment);
            }else {
                $('line.'+el).attr('x2', $('line.'+el).attr('max-x2'));
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
    }
}