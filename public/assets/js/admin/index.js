jQuery(window).on('load', function()   {

});

jQuery(window).on('resize', function(){

});

jQuery(document).ready(function()   {
    addCsrfTokenToAllAjax();
    addHTMLEditor();
    initDataTable();
});

jQuery(window).on('scroll', function () {

});

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
            $('table.table.table-without-reorder').DataTable();
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
            CKEDITOR.replace($(this).attr('id'));
        });
    }
}

function addCsrfTokenToAllAjax()    {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

//opening media popup with all the images in the DB
function openMedia(id, close_btn)    {
    if(id === undefined) {
        id = null;
    }
    if(close_btn === undefined) {
        close_btn = false;
    }
    $.ajax({
        type: 'POST',
        url: SITE_URL + '/media/open',
        dataType: 'json',
        success: function (response) {
            if(response.success) {
                basic.showDialog(response.success, 'media-popup');
                initDataTable();
                $('table.table.table-without-reorder.media-table').attr('data-id-in-action', id).attr('data-close-btn', close_btn);
                useMediaEvent(id, close_btn);
            }
        }
    });
}

//on click append image to post before saving the post
function useMediaEvent(id, close_btn) {
    $('.media-popup .use-media').click(function()   {
        if(id != null)	{
            $('.media[data-id="'+id+'"] .image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').find('.small-image').attr('src')+'"/>');
            $('.media[data-id="'+id+'"] input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
        }else {
            $('.image-visualization').html('<img class="small-image" src="'+$(this).closest('tr').find('.small-image').attr('src')+'"/>');
            $('input.hidden-input-image').val($(this).closest('tr').attr('data-id'));
        }
        if(close_btn) {
            $('.image-visualization').append('<span class="inline-block-top remove-image"><i class="fa fa-times" aria-hidden="true"></i></span>');
            removeImage();
        }
        basic.closeDialog();
    });
}

//removing image from posts listing pages
function removeImage()  {
    if($('.remove-image').length > 0)   {
        $('.remove-image').click(function()    {
            $('.image-visualization').html('');
            $('input[name="image"]').val('');
        });
    }
}
removeImage();

//saving image alts on media listing pages
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
            success: function (response) {
                if(response.success)    {
                    basic.showAlert(response.success);
                }
            }
        });
    });
}

//refreshing captcha on trying to log in admin
if($('.refresh-captcha').length > 0)    {
    $('.refresh-captcha').click(function()  {
        $.ajax({
            type: 'GET',
            url: '/refresh-captcha',
            dataType: 'json',
            success: function (response) {
                $('.login.form-container .captcha.form-row span').html(response.captcha);
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