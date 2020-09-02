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
            basic.showAlert('This user has no tasks to approve.', '', true);
        }
    });
} else if($('body').hasClass('add-available-buying-option') || $('body').hasClass('edit-available-buying-option')) {
    $('select[name="type"]').on('change', function() {
        if ($(this).val() == 'exchange-platforms') {
            $('.camping-for-exchange-platform-type').show();
            $('[name="clear-exchange-pairs"]').val(false);
        } else {
            $('.camping-for-exchange-platform-type').hide();
            $('[name="clear-exchange-pairs"]').val(true);
        }
    });

    $(document).on('click', '.remove-pair', function() {
        $(this).closest('.single-child').remove();

        if ($('.sortable-container .single-child').length == 0) {
            $('.no-pairs').removeClass('hide');
            $('.sortable-container').addClass('hide');
        }
    });

    $('.sortable-container').sortable();
    $('.add-new-exchange-pair').click(function() {
        if ($('.pair-title').val().trim() == '') {
            basic.showDialog('Please enter pair title.', '', true);
        } else {
            var url = '';
            if ($('.sortable-container').hasClass('hide')) {
                $('.sortable-container').removeClass('hide');
                $('.no-pairs').addClass('hide');
            }

            if ($('.pair-url').val().trim() != '') {
                url = '<div><label>URL:</label> <a href="'+$('.pair-url').val().trim()+'" target="_blank">'+$('.pair-url').val().trim()+'</a></div>';
            }

            var time = (new Date()).getTime();

            $('.sortable-container').append('<div class="single-child clearfix"><div style="float: left;"><div><label>Title:</label> '+$('.pair-title').val().trim()+'</div>'+url+'</div><div style="float: right;"><a href="javascript:void(0);" class="btn remove-pair">Remove</a><input type="hidden" name="pairs['+time+'][title]" value="'+$('.pair-title').val().trim()+'"/><input type="hidden" name="pairs['+time+'][url]" value="'+$('.pair-url').val().trim()+'"/></div></div>');

            $('.pair-title').val('');
            $('.pair-url').val('');
        }
    });
} else if($('body').hasClass('add-roadmap-year') || $('body').hasClass('edit-roadmap-year')) {
    function initColorPicker() {
        var color_picker_options = {
            preferredFormat: "hex",
            showInput: true,
            clickoutFiresChange: true,
            showButtons: false,
            move: function(color) {
                $('.event-color').val(color.toHexString());
                if ($('[name="predefined-color"]').length) {
                    $('[name="predefined-color"]').prop('checked', false);
                }
            },
            change: function(color) {
                $('.event-color').val(color.toHexString());
                if ($('[name="predefined-color"]').length) {
                    $('[name="predefined-color"]').prop('checked', false);
                }
            }
        };

        $('.event-color').spectrum(color_picker_options);
    }

    initColorPicker();

    $(document).on('click', '.remove-event', function() {
        $(this).closest('.single-child').remove();

        if ($('.sortable-container .single-child').length == 0) {
            $('.no-pairs').removeClass('hide');
            $('.sortable-container').addClass('hide');
        }
    });

    if ($('[name="predefined-color"]').length) {
        $('[name="predefined-color"]').on('change', function() {
            if ($(this).val() != '') {
                $('.event-color').val($(this).val());

                initColorPicker();
            }
        });
    }

    $('.clear-label-color').click(function() {
        if ($('[name="predefined-color"]').length) {
            $('[name="predefined-color"]').prop('checked', false);
        }

        $('.event-color').val('');
        initColorPicker();
    });

    $('.sortable-container').sortable();
    $('.add-new-roadmap-event').click(function() {
        var roadmapEventTitle = CKEDITOR.instances['event-title'].getData().trim();

        if (roadmapEventTitle == '') {
            basic.showDialog('Please enter title.', '', true);
        } else if (roadmapEventTitle.length > 1000) {
            basic.showDialog('Please enter title within max length limit of 1000 symbols.', '', true);
        } else if ($('.event-label').val().trim() != '' && $('.event-color').val().trim() == '') {
            basic.showDialog('You have entered label value, but you did not select label color.', '', true);
        } else if ($('.event-label').val().trim() == '' && $('.event-color').val().trim() != '') {
            basic.showDialog('You have entered label color, but you did not select label value.', '', true);
        } else {
            if ($('.sortable-container').hasClass('hide')) {
                $('.sortable-container').removeClass('hide');
                $('.no-pairs').addClass('hide');
            }

            var time = (new Date()).getTime();
            var eventLabel = '';
            var eventLabelColor = '';
            var eventChecked = '<div><label>Checked:</label> No</div>';
            var eventBorder = '<div><label>Bottom border:</label> No</div>';
            if ($('.event-label').val().trim() != '') {
                eventLabel = '<div><label>Label:</label> '+$('.event-label').val().trim()+'</div><input type="hidden" name="events['+time+'][label]" value="'+$('.event-label').val().trim()+'"/>';
            }

            if ($('.event-color').val().trim() != '') {
                eventLabelColor = '<div><label>Label color:</label> <span style="display: inline-block; width: 30px; height: 30px; background-color: '+$('.event-color').val().trim()+';"></span></div><input type="hidden" name="events['+time+'][color]" value="'+$('.event-color').val().trim()+'"/>';
            }

            if ($('.event-checked').is(':checked')) {
                eventChecked = '<div><label>Checked:</label> Yes</div><input type="hidden" name="events['+time+'][checked]" value="true"/>';
            }

            if ($('.event-border').is(':checked')) {
                eventBorder = '<div><label>Bottom border:</label> Yes</div><input type="hidden" name="events['+time+'][border]" value="true"/>';
            }

            if ($('.event-coin-burn').is(':checked')) {
                eventBorder = '<div><label>Coin burn:</label> Yes</div><input type="hidden" name="events['+time+'][coin-burn]" value="true"/>';
            }

            $('.sortable-container').append('<div class="single-child clearfix"><div style="float: left;"><div><label>Title:</label> '+roadmapEventTitle+'</div>'+eventLabel+eventLabelColor+eventChecked+eventBorder+'</div><div style="float: right;"><a href="javascript:void(0);" class="btn remove-event">Remove</a><input type="hidden" name="events['+time+'][title]" class="event-'+time+'"/></div></div>');

            $('.event-'+time).val(roadmapEventTitle);

            CKEDITOR.instances['event-title'].setData('');
            $('.event-label').val('');
            $('.event-checked').prop('checked', false);
            $('.event-border').prop('checked', false);
            if ($('[name="predefined-color"]').length) {
                $('[name="predefined-color"]').prop('checked', false);
            }

            $('.event-color').val('');
            initColorPicker();
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
        } else if($('table.table.table-without-reorder').hasClass('holiday-calendar-participants'))  {
            $('table.table.table-without-reorder').DataTable({
                ordering: true,
                order: [],
                columnDefs: [{
                    orderable: false,
                    targets: 'no-sort'
                }],
                aaSorting: []
            });
        } else {
            $('table.table.table-without-reorder').DataTable({
                sort: false
            });
        }
    } else if($('table.table.table-with-reorder').length > 0) {
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
                    contentsCss : ['/dist/css/front-libs-style.css', '/assets/css/style.css', '/assets/libs/dentacoin-mini-hub/css/styles-big-hub.css']
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
                }else {
                    $('.image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').attr('data-src')+'"/>');
                    $('input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
                }
                if(close_btn) {
                    if(id != null)	{
                        $('.media[data-id="'+id+'"] .image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
                    } else {
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
} else if($('body').hasClass('add-dcn-hub-element') || $('body').hasClass('edit-dcn-hub-element'))   {
    if ($('body').hasClass('add-dcn-hub-element')) {
        $("input[name='title']").on('input', function()    {
            $("input[name='slug']").val(generateUrl($(this).val()));
        });
    }

    $("input[name='type']").on('change', function()    {
        if ($(this).val() == 'folder') {
            $('.if-folder-type').removeClass('hide');
        } else {
            $('.if-folder-type').addClass('hide');
        }
    });

    $(document).on('click', '.remove-hub-element', function() {
        $(this).closest('.single-child').remove();
    });

    $('.add-hub-element-to-folder').click(function() {
        if ($('select.all-hub-elements option:selected').attr('value') != undefined) {
            var selectedOption = $('select.all-hub-elements option:selected');
            var imgHtml = '';
            if (selectedOption.attr('data-image') != undefined) {
                imgHtml = '<img src="/assets/uploads/'+selectedOption.attr('data-image')+'" style="margin-right: 15px;width: 100px;"/>';
            }

            if ($('.content').attr('data-post') != undefined) {
                // if editing
                $.ajax({
                    type: 'POST',
                    url: SITE_URL + '/dcn-hub-elements/add-dcn-element-to-folder/'+$('select.all-hub-elements').attr('data-dcn-folder')+'/'+selectedOption.val(),
                    dataType: 'json',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        if(response.success) {
                            selectedOption.addClass('hide');

                            $('.sortable-container').append('<div class="single-child" data-id="'+selectedOption.val()+'">'+imgHtml+selectedOption.html()+'<div style="float: right;"><a href="'+SITE_URL+'/dcn-hub-elements/edit/'+selectedOption.val()+'" target="_blank" class="btn">Edit</a> <a href="'+SITE_URL+'/dcn-hub-elements/remove-dcn-element-from-folder/'+$('select.all-hub-elements').attr('data-dcn-folder')+'/'+selectedOption.val()+'" onclick="return confirm(\'Are you sure you want to delete this resource?\')" class="btn">Remove</a></div></div>');
                        } else {
                            basic.showAlert(response.error, '', true);
                        }
                    }
                });
            } else {
                // if adding
                $('.sortable-container').append('<div class="single-child" data-id="'+selectedOption.val()+'"><input type="hidden" name="sub_elements[]" value="'+selectedOption.val()+'"/>'+imgHtml+selectedOption.html()+'<div style="float: right;"><a href="'+SITE_URL+'/dcn-hub-elements/edit/'+selectedOption.val()+'" class="btn" target="_blank">Edit</a> <a href="javascript:void(0);" class="btn remove-hub-element">Remove</a></div></div>');
            }
        } else {
            basic.showAlert('Please select hub element.', '', true);
        }
    });
} else if($('body').hasClass('view-dcn-hub'))   {
    if ($('.add-hub-element').length) {
        $('.add-hub-element').click(function() {
            if ($('select.all-hub-elements option:selected').attr('value') != undefined) {
                var selectedOption = $('select.all-hub-elements option:selected');
                var imgHtml = '';
                if (selectedOption.attr('data-image') != undefined) {
                    imgHtml = '<img src="/assets/uploads/'+selectedOption.attr('data-image')+'" style="margin-right: 15px;width: 100px;"/>';
                }

                $.ajax({
                    type: 'POST',
                    url: SITE_URL + '/dcn-hub-elements/add-dcn-element-to-dcn-hub/'+$('select.all-hub-elements').attr('data-dcn-hub')+'/'+selectedOption.val(),
                    dataType: 'json',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        if(response.success) {
                            selectedOption.addClass('hide');
                            $('.sortable-container').append('<div class="single-child" data-id="'+selectedOption.val()+'">'+imgHtml+selectedOption.html()+'<div style="float: right;"><a href="'+SITE_URL+'/dcn-hub-elements/edit/'+selectedOption.val()+'" target="_blank" class="btn">Edit</a> <a href="'+SITE_URL+'/dcn-hub-elements/remove-dcn-element-from-dcn-hub/'+$('select.all-hub-elements').attr('data-dcn-hub')+'/'+selectedOption.val()+'" onclick="return confirm(\'Are you sure you want to delete this resource?\')" class="btn">Remove</a></div></div>');

                            var changedValue = false;
                            for (var i = 0, len = $('select.all-hub-elements option[value]').length; i < len; i+=1) {
                                if (!$('select.all-hub-elements option[value]').eq(i).hasClass('hide')) {
                                    $('select.all-hub-elements').val($('select.all-hub-elements option[value]').eq(i).val());
                                    changedValue = true;
                                    break;
                                }
                            }

                            if (!changedValue) {
                                $('select.all-hub-elements').prop('selectedIndex', 0);
                            }
                        } else {
                            basic.showAlert(response.error, '', true);
                        }
                    }
                });
            } else {
                basic.showAlert('Please select hub element.', '', true);
            }
        });
    }
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

if($('.sortable-container').length) {
    for(var i = 0, len = $('.sortable-container').length; i < len; i+=1) {
        if($('.sortable-container').eq(i).hasClass('update-menu-children-order')) {
            $('.sortable-container').eq(i).sortable({
                stop: function() {
                    var array_with_menu_chilren = {};
                    for(var y = 0, len_y = $('.single-child').length; y < len_y; y+=1) {
                        array_with_menu_chilren[$('.single-child').eq(y).attr('data-id')] = parseInt($('.single-child').eq(y).index());
                    }

                    $.ajax({
                        type: 'POST',
                        url: SITE_URL + $('.sortable-container').attr('data-route-update-order'),
                        data: {
                            'order_object' : array_with_menu_chilren,
                            'binded_to' : $('.sortable-container').attr('data-binded-to')
                        },
                        dataType: 'json',
                        success: function (response) {
                            if(response.success)    {
                                basic.showAlert(response.success, '', true);
                            }
                        },
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                }
            });
        }
    }
}