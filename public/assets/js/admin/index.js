basic.init();

jQuery(window).on('load', function()   {

});

jQuery(window).on('resize', function(){

});

jQuery(document).ready(function()   {
    addHTMLEditor();
    initDataTable();
});

jQuery(window).on('scroll', function () {

});


// =========================================== PAGES ===========================================

if($('body').hasClass('add-job-offer')) {
    $('body.add-job-offer input[name="title"]').on('input', function() {
        $('body.add-job-offer input[name="slug"]').val(generateUrl($(this).val().trim()));
    });

    initSkillsLogic();

    bindDontSubmitFormOnEnter();
} else if($('body').hasClass('edit-job-offer'))    {
    initSkillsLogic();

    bindDontSubmitFormOnEnter();
} else if($('body').hasClass('additionals')) {
    $('.box.api-endpoints .remove-box').unbind().click(function()   {
        $(this).closest('.custom-box').remove();
    });

    $('.box.api-endpoints .add-new-api-endpoint').click(function() {
        if($('.box.api-endpoints .new-api-endpoint-name').val().trim() == '' || $('.box.api-endpoints .new-api-endpoint-value').val().trim() == '') {
            basic.showAlert('Please enter name and value for API Endpoint.');
        }else {
            $('.box.api-endpoints .appending-body').append('<div class="box"><div class="box-header with-border"><h3 class="box-title">'+$('.box.api-endpoints .new-api-endpoint-name').val().trim()+'</h3><div class="box-tools pull-right"><button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove"><i class="fa fa-times"></i></button></div></div><div class="box-body"><div class="form-group"><input type="text" class="form-control" name="api-endpoints['+generateUrl($('.box.api-endpoints .new-api-endpoint-name').val().trim())+'][data]" placeholder="Enter circulating supply" value="'+$('.box.api-endpoints .new-api-endpoint-value').val().trim()+'"><input type="hidden" class="form-control" name="api-endpoints['+generateUrl($('.box.api-endpoints .new-api-endpoint-name').val().trim())+'][name]" placeholder="Enter circulating supply" value="'+$('.box.api-endpoints .new-api-endpoint-name').val().trim()+'"></div></div></div>');
            $('.box.api-endpoints .new-api-endpoint-name').val('');
            $('.box.api-endpoints .new-api-endpoint-value').val('');
            $('.box.api-endpoints .remove-box').unbind().click(function()   {
                $(this).closest('.custom-box').remove();
            });
        }
    });
} else if($('body').hasClass('add-location'))  {
    addLocationMap();
} else if($('body').hasClass('edit-location'))  {
    addLocationMap(true);
} else if($('body').hasClass('add-clinic') || $('body').hasClass('edit-clinic')) {
    $('.add-edit-clinic #featured').change(function() {
        if($(this).is(':checked')) {
            $('.add-edit-clinic .clinic-text').removeClass('hide');
        } else {
            $('.add-edit-clinic .clinic-text').addClass('hide');
        }
    });

    $('select[name="type"]').on('change', function() {
        $('select[name="subtype"] .subtype-option').addClass('hide');
        $('select[name="subtype"] .subtype-option[data-type-id="'+$(this).val()+'"]').removeClass('hide');
    });
} else if($('body').hasClass('add-type') || $('body').hasClass('edit-type') || $('body').hasClass('add-platform') || $('body').hasClass('edit-platform')) {
    var color_picker_options = {
        preferredFormat: "hex",
        showInput: true,
        clickoutFiresChange: true,
        showButtons: false,
        move: function(color) {
            $('input[name="color"]').val(color.toHexString());
        },
        change: function(color) {
            $('input[name="color"]').val(color.toHexString());
        }
    };

    if($('input[name="color"]').attr('data-color') != undefined) {
        color_picker_options.color = $('input[name="color"]').attr('data-color');
    }

    $('input[name="color"]').spectrum(color_picker_options);
} else if($('body').hasClass('view-christmas-calendar-participant')) {
    $('.approve-user-calendar-participation').click(function() {
        var approvedTasksLength = $('tr.passed-not-payed-task').length;
        if(approvedTasksLength) {
            var dcnAmount = 0;
            var ticketAmount = 0;
            var doubleReward = false;
            var tasksToApprove = [];
            for(var i = 0; i < approvedTasksLength; i+=1) {
                if($('tr.passed-not-payed-task').eq(i).attr('data-type') == 'dcn-reward') {
                    dcnAmount += parseInt($('tr.passed-not-payed-task').eq(i).attr('data-value'));
                } else if($('tr.passed-not-payed-task').eq(i).attr('data-type') == 'ticket-reward') {
                    ticketAmount += parseInt($('tr.passed-not-payed-task').eq(i).attr('data-value'));
                }
                tasksToApprove.push($('tr.passed-not-payed-task').eq(i).attr('data-id'));
            }

            var warningMsg = 'Are you sure you want to approve these user tasks? They make in total ' + dcnAmount + ' DCN and ' + ticketAmount + ' tickets.';

            if ($('tr.passed-not-payed-task.on-time').length == 31) {
                doubleReward = true;
                warningMsg += ' This user has also completed all tasks in the tasks days so he will receive x2 DCN reward => ' + (dcnAmount*2) + ' DCN.';
            }

            var confirm_obj = {};
            confirm_obj.callback = function (result) {
                if(result) {
                    $.ajax({
                        type: 'POST',
                        url: SITE_URL + '/christmas-calendar-participants/approve-tasks',
                        data: {
                            'tasksToApprove' : tasksToApprove,
                            'participant' : $('table').attr('data-participant-id'),
                            'doubleReward' : doubleReward
                        },
                        dataType: 'json',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function (response) {
                            if (response.success) {
                                basic.showAlert(response.success, '', true);

                                $('tr.passed-not-payed-task').find('.reward-sent-td').html('<i class="fa fa-check text-success" aria-hidden="true"></i>').removeClass('passed-not-payed-task');
                                $('tr.passed-not-payed-task').removeClass('passed-not-payed-task');
                            } else if (response.error) {
                                basic.showAlert(response.error, '', true);
                            }
                        }
                    });
                }
            };
            basic.showConfirm(warningMsg, '', confirm_obj, true);
        } else {
            basic.showAlert('Before approving user calendar participation please select which tasks to approve.', '', true);
        }
    });
}

// =========================================== /PAGES ===========================================

function initDataTable()    {
    if($('table.table.table-without-reorder').length > 0) {
        if($('table.table.table-without-reorder').hasClass('media-table'))  {
            $('table.table.table-without-reorder.media-table').DataTable().on('draw.dt', function (){
                var pagination_id = null;
                if($(this).attr('data-id-in-action') != undefined) {
                    pagination_id = $(this).attr('data-id-in-action');
                }
                var close_button;
                if($(this).attr('data-close-btn') == 'false')   {
                    close_button = false;
                }else if($(this).attr('data-close-btn') == 'true')   {
                    close_button = true;
                }
                useMediaEvent(pagination_id, close_button);
            });
        }else {
            $('table.table.table-without-reorder').DataTable({
                sort: false
            });
        }
    }
    if($('table.table.table-with-reorder').length > 0) {
        var table = $('table.table.table-with-reorder').DataTable({
            rowReorder: true
        });
        $('table.table.table-with-reorder').addClass('sortable');
        table.on('row-reorder', function(e, diff, edit) {
            var order_object = {};
            for(let i = 0, len = diff.length; i < len; i+=1) {
                order_object[$(diff[i].node).data('id')] = diff[i].newPosition;
            }
            $.ajax({
                type: 'POST',
                url: SITE_URL + '/'+$('table.table.table-with-reorder').attr('data-action')+'/update-order',
                data: {
                    'order_object' : order_object
                },
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if(response.success)    {
                        basic.showAlert(response.success);
                    }
                }
            });
        });
    }
}

function addHTMLEditor(){
    if($('.ckeditor-init').length > 0)   {
        $('.ckeditor-init').each(function() {
            var options = $.extend({
                    height: 350,
                    allowedContent: true,
                    disallowedContent: 'script',
                    contentsCss : ['/dist/css/front-libs-style.css', '/assets/css/style.css']
                }, {on: {
                        pluginsLoaded: function() {
                            var editor = this,
                                config = editor.config;
                            config.removeButtons = 'Image';

                            //registering command to call the callery
                            editor.addCommand("openGalleryCommand", {
                                exec:function() {
                                    openMedia(null, null, null, editor);
                                }
                            });

                            //adding button to the ckeditor which interrupts with command
                            editor.ui.addButton("GalleryButton", {
                                label: "Gallery",
                                command: "openGalleryCommand",
                                toolbar: "insert",
                                icon: "/assets/images/logo.svg"
                            });
                        }, instanceReady: function() {
                            // Use line breaks for block elements, tables, and lists.
                            var dtd = CKEDITOR.dtd;
                            for ( var e in CKEDITOR.tools.extend( {}, dtd.$nonBodyContent, dtd.$block, dtd.$listItem, dtd.$tableContent ) ) {
                                this.dataProcessor.writer.setRules( e, {
                                    indent: true,
                                });
                            }
                        }
                    }},
                options);
            CKEDITOR.replace($(this).attr('id'), options);
            //CKEDITOR.addCss('body{background:blue;}');
        });
    }
}

//opening media popup with all the images in the DB
function openMedia(id, close_btn, type, editor)    {
    var data = {};
    if(id === undefined) {
        id = null;
    }
    if(close_btn === undefined) {
        close_btn = false;
    }
    if(type === undefined) {
        type = null;
    }else {
        data['type'] = type;
    }
    if(editor === undefined) {
        editor = null;
    }
    $.ajax({
        type: 'POST',
        url: SITE_URL + '/media/open',
        data: data,
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if(response.success) {
                basic.showDialog(response.success, 'media-popup');
                initDataTable();
                $('table.table.table-without-reorder.media-table').attr('data-id-in-action', id).attr('data-close-btn', close_btn);
                saveImageAltsEvent();
                initUploadMediaLogic();
                useMediaEvent(id, close_btn, editor);
            }
        }
    });
}

//on click append image to post before saving the post
function useMediaEvent(id, close_btn, editor) {
    $('.media-popup .use-media').click(function()   {
        var type = $(this).attr('data-type');
        if(editor != null)  {
            if(type == 'file') {
                editor.insertHtml('<a href="'+$(this).closest('tr').attr('data-src')+'">'+$(this).closest('tr').attr('data-src')+'</a>');
            }else if(type == 'image')   {
                editor.insertHtml('<img class="small-image" src="'+$(this).closest('tr').attr('data-src')+'"/>');
            }
        }else {
            if(type == 'file')  {
                if(id != null)	{
                    $('.media[data-id="'+id+'"] .image-visualization').html('<a href="'+$(this).closest('tr').attr('data-src')+'">'+$(this).closest('tr').attr('data-src')+'</a>');
                    $('.media[data-id="'+id+'"] input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
                    $('.media[data-id="'+id+'"] input.hidden-input-url').val($(this).closest('tr').attr('data-src'));
                    if(close_btn) {
                        $('.media[data-id="'+id+'"] .image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
                    }
                }else {
                    $('.image-visualization').html('<a href="'+$(this).closest('tr').attr('data-src')+'">'+$(this).closest('tr').attr('data-src')+'</a>');
                    $('input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
                    $('input.hidden-input-url').val($(this).closest('tr').attr('data-src'));
                    if(close_btn) {
                        $('.image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
                    }
                }
            }else if(type == 'image')    {
                if(id != null)	{
                    $('.media[data-id="'+id+'"] .image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').attr('data-src')+'"/>');
                    $('.media[data-id="'+id+'"] input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
                    if(close_btn) {
                        $('.media[data-id="'+id+'"] .image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
                    }
                }else {
                    $('.image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').attr('data-src')+'"/>');
                    $('input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
                    if(close_btn) {
                        $('.image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
                    }
                }
            }
        }
        basic.closeDialog();
    });
}

//removing image from posts listing pages
function removeImage()  {
    $(document).on('click', '.remove-image', function()    {
        $(this).closest('.media').find('.hidden-input-image').val('');
        $(this).closest('.media').find('.image-visualization').html('');
    });
}
removeImage();

function deleteMedia() {
    $(document).on('click', '.delete-media', function()    {
        var this_btn = $(this);
        $.ajax({
            type: 'POST',
            url: SITE_URL + '/media/delete/'+this_btn.closest('tr').attr('data-id'),
            dataType: 'json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                if(response.success)    {
                    basic.showAlert(response.success, '', true);
                    this_btn.closest('tr').remove();
                } else if(response.error) {
                    basic.showAlert(response.error, '', true);
                }
            }
        });
    });
}
deleteMedia();

//saving image alts on media listing pages
function saveImageAltsEvent()   {
    if($('.save-image-alts').length > 0)    {
        $('.save-image-alts').click(function()  {
            var alts_object = {};
            for(let i = 0, len = $('.media-table tbody tr').length; i < len; i+=1)  {
                alts_object[$('.media-table tbody tr').eq(i).attr('data-id')] = $('.media-table tbody tr').eq(i).find('.alt-attribute').val().trim();
            }
            $.ajax({
                type: 'POST',
                url: SITE_URL + '/media/update-media-alts',
                data: {
                    'alts_object' : alts_object
                },
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if(response.success)    {
                        basic.showAlert(response.success);
                    }
                }
            });
        });
    }
}
saveImageAltsEvent();

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

//creating job offer slug from the title on input
if($('body').hasClass('add-application'))   {
    $("input[name='title']").on('input', function()    {
        $("input[name='slug']").val(generateUrl($(this).val()));
    });
}

function generateUrl(str)  {
    var str_arr = str.toLowerCase().split('');
    var cyr = [
        'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п', 'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я',' ','_'
    ];
    var lat = [
        'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p', 'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya', '-', '-'
    ];
    for(var i = 0; i < str_arr.length; i+=1)  {
        for(var y = 0; y < cyr.length; y+=1)    {
            if(str_arr[i] == cyr[y])    {
                str_arr[i] = lat[y];
            }
        }
    }
    return str_arr.join('').replace(/-+/g, '-');
}

if($('.datepicker').length > 0) {
    $('.datepicker').datepicker({
        format: 'dd-mm-yyyy',
        startDate: '-3d'
    });
}

function addLocationMap(edit) {
    if(edit === undefined) {
        edit = false;
    }

    Gmap = jQuery('.add-edit-location-map');
    Gmap.each(function () {
        var $this = jQuery(this),
            lat = '',
            lng = '',
            zoom = 1,
            scrollwheel = true,
            zoomcontrol = true,
            draggable = true,
            mapType = google.maps.MapTypeId.ROADMAP,
            title = '',
            contentString = '',
            dataZoom = 2,
            dataType = 'roadmap',
            dataScrollwheel = scrollwheel,
            dataZoomcontrol = $this.data('zoomcontrol'),
            dataHue = $this.data('hue'),
            dataTitle = $this.data('title'),
            dataContent = "";

        if(edit)    {
            var dataLat = $('input[type="number"][name="lat"]').val().trim();
            var dataLng = $('input[type="number"][name="lng"]').val().trim();
        }else {
            var dataLat = 42.7825182;
            var dataLng = 25.6929199;
        }


        if (dataZoom !== undefined && dataZoom !== false) {
            zoom = parseFloat(dataZoom);
        }
        if (dataScrollwheel !== undefined && dataScrollwheel !== null) {
            scrollwheel = dataScrollwheel;
        }
        if (dataZoomcontrol !== undefined && dataZoomcontrol !== null) {
            zoomcontrol = dataZoomcontrol;
        }
        if (dataType !== undefined && dataType !== false) {
            if (dataType == 'satellite') {
                mapType = google.maps.MapTypeId.SATELLITE;
            } else if (dataType == 'hybrid') {
                mapType = google.maps.MapTypeId.HYBRID;
            } else if (dataType == 'terrain') {
                mapType = google.maps.MapTypeId.TERRAIN;
            }
        }
        if (dataTitle !== undefined && dataTitle !== false) {
            title = dataTitle;
        }
        if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            draggable = true;
        }

        var styles = [{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#dddddd"},{"saturation":-100},{"lightness":-3},{"visibility":"on"}]}];

        var mapOptions = {
            zoom: zoom,
            scrollwheel: scrollwheel,
            zoomControl: zoomcontrol,
            draggable: draggable,
            center: new google.maps.LatLng(dataLat, dataLng),
            mapTypeId: mapType,
            gestureHandling: 'greedy',
            styles: styles
        };

        var map = new google.maps.Map($this[0], mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(dataLat, dataLng),
            map: map,
            lat : dataLat,
            lng : dataLng,
            draggable : true
        });

        google.maps.event.addListener(marker, 'drag', function() {
            $('input[type="number"][name="lat"]').val(marker.position.lat().toFixed(5));
            $('input[type="number"][name="lng"]').val(marker.position.lng().toFixed(5));
        });
    });
}

if($('.add-edit-menu-element select[name="type"]').length > 0) {
    $('.add-edit-menu-element select[name="type"]').on('change', function() {
        var type = $(this).val();
        $.ajax({
            type: 'POST',
            url: SITE_URL + '/footer/menu/change-url-option',
            data: {
                'type' : type
            },
            dataType: 'json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                if(response.success) {
                    $('.add-edit-menu-element .type-result').html(response.success);
                }
            }
        });
    });
}

function initSkillsLogic()  {
    $('.skills-body').sortable();

    bindSingleSkillActions();

    $('.skills-section .btn-container button').click(function() {
        addSkillFromInput();
    });
}

function addSkillFromInput() {
    if($('.skills-section input[type="text"]').val().trim() == '') {
        alert('Please enter skill in the field.');
        return false;
    }else {
        $('.skills-section .skills-body').append('<div class="single-skill"><div class="skill-text">'+$('.skills-section input[type="text"]').val().trim()+'<input type="hidden" name="skills[]" value="'+$('.skills-section input[type="text"]').val().trim()+'"/></div><div class="skill-action"><a href="javascript:void(0);" class="remove-skill"><i class="fa fa-times" aria-hidden="true"></i></a></div></div>');
        bindSingleSkillActions();
        $('.skills-section input[type="text"]').val('');
    }
}

function bindSingleSkillActions()   {
    $('.skills-body .single-skill .skill-action .remove-skill').click(function()    {
        $(this).closest('.single-skill').remove();
    });
}

function bindDontSubmitFormOnEnter()    {
    $('form').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $('.skills-section input[type="text"]').keydown(function(event){
        if(event.keyCode == 13) {
            addSkillFromInput();
        }
    });
}

function initUploadMediaLogic() {
    if($('form#upload-media').length) {
        $('form#upload-media').submit(function(event) {
            $('.response-layer').addClass('show-this');
            event.preventDefault();
            var this_form = this;

            setTimeout(function() {
                $.ajax({
                    type: 'POST',
                    url: SITE_URL + '/media/ajax-upload',
                    data: new FormData($(this_form)[0]),
                    async: false,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function (response) {
                        if(response.success) {
                            basic.showAlert(response.success, '', true);

                            if($('.media-table').length) {
                                $('.media-table tbody').prepend(response.html_with_images);

                                if($('table.table.table-without-reorder.media-table').attr('data-id-in-action') != undefined) {
                                    useMediaEvent($('table.table.table-without-reorder.media-table').attr('data-id-in-action'), $('table.table.table-without-reorder.media-table').attr('data-close-btn'), null);
                                }
                            }
                        } else if(response.error) {
                            basic.showAlert(response.error, '', true);
                        }

                        $('.response-layer').removeClass('show-this');

                        $(this_form).find('input[name="images[]"]').val('');
                    }
                });
            }, 300);
        });
    }
}
initUploadMediaLogic();