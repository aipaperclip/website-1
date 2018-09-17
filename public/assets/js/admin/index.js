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

//opening media popup with all the images in the DB
function openMedia(id, close_btn, type)    {
    if(id === undefined) {
        id = null;
    }
    if(close_btn === undefined) {
        close_btn = false;
    }
    if(type === undefined) {
        type = null;
    }
    $.ajax({
        type: 'POST',
        url: SITE_URL + '/media/open',
        data: {
            'type' : type
        },
        dataType: 'json',
        success: function (response) {
            if(response.success) {
                basic.showDialog(response.success, 'media-popup');
                initDataTable();
                $('table.table.table-without-reorder.media-table').attr('data-id-in-action', id).attr('data-close-btn', close_btn);
                saveImageAltsEvent();
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

    $('select[name="subtype"] option[data-type-id="'+$('select[name="type"]').val()+'"]').addClass('show');
    if(!edit) {
        $('select[name="subtype"]').val($('select[name="subtype"] option:first').val());
    }
    $('select[name="type"]').on('change', function() {
        $('select[name="subtype"] option').removeClass('show').removeAttr('selected');
        $('select[name="subtype"] option[data-type-id="'+$('select[name="type"]').val()+'"]').addClass('show');
        $('select[name="subtype"] option.show:first').attr('selected', 'selected').trigger('change');
    });

    $('select[name="clinic"] option[data-subtype-id="'+$('select[name="subtype"]').val()+'"]').addClass('show');
    if(!edit) {
        $('select[name="clinic"]').val($('select[name="clinic"] option:first').val());
    }
    $('select[name="subtype"]').on('change', function() {
        $('select[name="clinic"] option').removeClass('show').removeAttr('selected');
        $('select[name="clinic"] option[data-subtype-id="'+$('select[name="subtype"]').val()+'"]').addClass('show');
        $('select[name="clinic"] option.show:first').attr('selected', 'selected');
    });

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

        var styles = [
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bbbbbb"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 26
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#dddddd"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -3
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];

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

if($('body').hasClass('add-location'))  {
    addLocationMap();
}

if($('body').hasClass('edit-location'))  {
    addLocationMap(true);
}