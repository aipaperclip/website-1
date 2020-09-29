var markerCluster;
function initMap(filter) {
    if(filter === undefined) {
        filter = null;
    }

    Gmap = jQuery('.map-canvas');
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
            dataLat = 28.508742,
            dataLng = -0.120850,
            dataType = 'roadmap',
            dataScrollwheel = scrollwheel,
            dataZoomcontrol = $this.data('zoomcontrol'),
            dataTitle = $this.data('title');

        if(basic.isMobile())    {
            var dataZoom = 2;
        }else {
            var dataZoom = 0;
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
            zoom: zoom,/*
            scrollwheel: scrollwheel,*/
            zoomControl: zoomcontrol,
            draggable: draggable,
            center: new google.maps.LatLng(dataLat, dataLng),
            mapTypeId: mapType,
            styles: styles,
            minZoom: 1
        };

        var map = new google.maps.Map($this[0], mapOptions);

        markerCluster = new MarkerClusterer(map);
        var infowindow;
        var markers_arr = [];
        if(map_locations.length > 1) {
            for(var i = 0, len = map_locations.length; i < len; i+=1) {
                if(filter != null && map_locations[i].location_type_id != $('.filter select.types option:selected').val())  {
                    continue;
                }
                if($('.filter select.locations option:selected').val() != '' && map_locations[i].id != $('.filter select.locations option:selected').val())  {
                    continue;
                }

                var marker_options = {
                    position: new google.maps.LatLng(map_locations[i].lat, map_locations[i].lng),
                    lat: map_locations[i].lat,
                    lng: map_locations[i].lng,
                    map: map,
                    icon: map_locations[i].marker_icon,
                    clinic_name: map_locations[i].clinic_name,
                };

                if(map_locations[i].clinic_media != undefined)    {
                    marker_options.clinic_media = map_locations[i].clinic_media;
                }
                if(map_locations[i].address != undefined)    {
                    marker_options.address = map_locations[i].address;
                }
                if(map_locations[i].clinic_media_alt != undefined)    {
                    marker_options.clinic_media_alt = map_locations[i].clinic_media_alt;
                }
                if(map_locations[i].clinic_link != undefined)    {
                    marker_options.clinic_link = map_locations[i].clinic_link;
                }
                markers_arr[i] = new google.maps.Marker(marker_options);

                google.maps.event.addListener(markers_arr[i], 'click', function () {
                    map.panTo(this.getPosition());
                    map.setZoom(18);

                    if(infowindow != null){
                        infowindow.close();
                    }

                    var content = '<div>';
                    if(this.clinic_media != undefined)    {
                        content+='<figure style="padding-bottom: 10px;"><img src="'+this.clinic_media+'" ';
                        if(this.clinic_media_alt != undefined)  {
                            content+=' alt="'+this.clinic_media_alt+'"';
                        }
                        content+=' width="100"/></figure>';
                    }
                    content+='<strong>Name: </strong>'+this.clinic_name+'</div><div><strong>Address: </strong>'+this.address+'</div>';
                    if(this.clinic_link != '')    {
                        content+='<div><strong>Website: </strong><a href="'+this.clinic_link+'" target="_blank">'+this.clinic_link+'</a></div>';
                    }

                    infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    infowindow.open(map, this);
                });
                markerCluster.addMarker(markers_arr[i]);
            }
        }
        map.setOptions({minZoom: 2.2, maxZoom: 20});
    });

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
}