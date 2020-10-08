var markerCluster;
function initMap(map_locations, options) {
    //initialLat, initialLng, initialZoom, filter_country, location_id, location_source, categories, campForZoomChange, filter_city, location_content, center_city
    console.log(map_locations, 'map_locations');
    console.log(options, 'options');

    if (options.categories != undefined && options.categories.includes('category-5') && !options.categories.includes('category-1')) {
        options.categories.push('category-1');
    }

    if (options.initialLat === undefined) {
        options.initialLat = 28.508742;
    }

    if (options.initialLng === undefined) {
        options.initialLng = -0.120850;
    }

    if (options.initialZoom === undefined) {
        options.initialZoom = 2;
    }

    if (options.campForZoomChange === undefined) {
        options.campForZoomChange = false;
    }

    Gmap = jQuery('.google-map-box');
    Gmap.each(function () {
        var $this = jQuery(this),
            /*scrollwheel = true,*/
            zoomcontrol = true,
            draggable = true,
            mapType = google.maps.MapTypeId.ROADMAP,
            dataLat = options.initialLat,
            dataLng = options.initialLng,
            dataType = 'roadmap',
            dataZoomcontrol = $this.data('zoomcontrol');

        /*if (dataScrollwheel !== undefined && dataScrollwheel !== null) {
            scrollwheel = dataScrollwheel;
        }*/

        if (dataZoomcontrol !== undefined && dataZoomcontrol !== null) {
            zoomcontrol = dataZoomcontrol;
        }

        // allow draggable for mobile devices
        if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            draggable = true;
        }

        var styles = [{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#dddddd"},{"saturation":-100},{"lightness":-3},{"visibility":"on"}]}];

        var mapOptions = {
            zoom: options.initialZoom,
            /*scrollwheel: scrollwheel,*/
            zoomControl: zoomcontrol,
            draggable: draggable,
            center: new google.maps.LatLng(dataLat, dataLng),
            mapTypeId: mapType,
            styles: styles,
            minZoom: 1
        };

        var map = new google.maps.Map($this[0], mapOptions);

        markerCluster = new MarkerClusterer(map, [], {
            minimumClusterSize: 1
        });

        if (options.initialZoom > 10) {
            markerCluster.setMinimumClusterSize(2);
        }

        google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
            wrapSingleLocationsIntoClusters();
        });

        google.maps.event.addListener(map, 'zoom_changed', function() {
            wrapSingleLocationsIntoClusters();
        });

        // doing this so when the map is not zoomed much to show all locations with map clusters, even the ones that are single in their area
        function wrapSingleLocationsIntoClusters() {
            var zoomLevel = map.getZoom();
            console.log(zoomLevel, 'zoomLevel');
            if (zoomLevel > 15) {
                markerCluster.setMinimumClusterSize(10);
            } else if (zoomLevel > 10) {
                markerCluster.setMinimumClusterSize(2);
            } else {
                markerCluster.setMinimumClusterSize(1);
            }
        }

        var currentLocationsOnMapLngs = [];
        var currentLocationsOnMapLats = [];

        var infowindow;
        var markers_arr = [];
        if (typeof(map_locations) != 'undefined' && map_locations.length > 0) {
            var visibleLocationsCount = 0;
            for (var i = 0, len = map_locations.length; i < len; i+=1) {
                if (options.location_id_and_source_pairs != undefined && options.location_id_and_source_pairs instanceof Array && options.location_id_and_source_pairs.length)  {
                    if (JSON.stringify(options.location_id_and_source_pairs).indexOf(JSON.stringify([parseInt(map_locations[i].id), map_locations[i].source])) == -1) {
                        continue;
                    }
                }

                if (options.filter_country != undefined)  {
                    if (options.filter_country instanceof Array && options.filter_country.length) {
                        if (!options.filter_country.includes(map_locations[i].country_code)) {
                            continue;
                        }
                    } else {
                        if (options.filter_country != map_locations[i].country_code) {
                            continue;
                        }
                    }
                }

                if (options.filter_city != undefined) {
                    if (options.filter_city != map_locations[i].city) {
                        continue;
                    }
                }

                if (options.categories != undefined) {
                    if (!options.categories.includes(map_locations[i].category)) {
                        continue;
                    }
                }

                currentLocationsOnMapLats.push(map_locations[i].lat);
                currentLocationsOnMapLngs.push(map_locations[i].lng);

                var marker_options = {
                    position: new google.maps.LatLng(map_locations[i].lat, map_locations[i].lng),
                    lat: map_locations[i].lat,
                    lng: map_locations[i].lng,
                    map: map,
                    icon: '/assets/uploads/' + map_locations[i].marker,
                    name: map_locations[i].name,
                    country_code: map_locations[i].country_code,
                    location_id: map_locations[i].id,
                    location_source: map_locations[i].source
                };

                if (map_locations[i].clinic_media != undefined)    {
                    marker_options.clinic_media = map_locations[i].clinic_media;
                }
                if (map_locations[i].address != undefined)    {
                    marker_options.address = map_locations[i].address;
                }
                if (map_locations[i].clinic_media_alt != undefined)    {
                    marker_options.clinic_media_alt = map_locations[i].clinic_media_alt;
                }
                if (map_locations[i].clinic_link != undefined)    {
                    marker_options.clinic_link = map_locations[i].clinic_link;
                }
                markers_arr[i] = new google.maps.Marker(marker_options);

                google.maps.event.addListener(markers_arr[i], 'click', function (event) {
                    /*map.panTo(this.getPosition());
                    map.setZoom(18);*/
                    var content = '<div class="map-infowindow"><button>'+this.name+'</button></div>';
                    var _location_id = this.location_id;
                    var _location_source = this.location_source;

                    if (options.type == 'custom-search') {

                        if ($('.custom-search-list .toggle-location-tile[data-location-id="'+_location_id+'"][data-location-source="'+_location_source+'"]').length) {
                            $('.results-list').scrollTop(0);
                            $('.custom-search-list .single-location').removeClass('toggled');
                            $('.custom-search-list .toggle-location-tile[data-location-id="'+_location_id+'"][data-location-source="'+_location_source+'"]').closest('.single-location').addClass('toggled');
                            $('.results-list').scrollTop($('.toggle-location-tile[data-location-id="'+_location_id+'"][data-location-source="'+_location_source+'"]').closest('.single-location').position().top - 15);
                        }
                    } else {
                        var country_code = this.country_code;

                        $.event.trigger({
                            type: 'showLocationInList',
                            time: new Date(),
                            response_data: {
                                'country_code' : country_code,
                                'id' : _location_id,
                                'source' : _location_source,
                                'zoom' : 18,
                                'lat' : this.getPosition().lat(),
                                'lng' : this.getPosition().lng(),
                                'content' : content
                            }
                        });
                    }

                    if (infowindow != null){
                        infowindow.close();
                    }

                    infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    infowindow.open(map, this);
                });
                markerCluster.addMarker(markers_arr[i]);

                if (options.location_id != undefined && options.location_source != undefined && options.location_id == map_locations[i].id && options.location_source == map_locations[i].source) {
                    if (options.location_content != undefined) {
                        if (infowindow != null){
                            infowindow.close();
                        }

                        infowindow = new google.maps.InfoWindow({
                            content: options.location_content
                        });

                        infowindow.open(map, markers_arr[i]);
                    }
                }

                visibleLocationsCount+=1;
            }

            console.log(visibleLocationsCount, 'visibleLocationsCount');
            

            // calculate city center
            if (options.center_city != undefined && currentLocationsOnMapLats.length && currentLocationsOnMapLngs.length) {
                if (currentLocationsOnMapLats.length > 1 && currentLocationsOnMapLngs.length > 1) {
                    var cityLat = (Math.min.apply(Math, currentLocationsOnMapLats) + Math.max.apply(Math, currentLocationsOnMapLats)) / 2;
                    var cityLng = (Math.min.apply(Math, currentLocationsOnMapLngs) + Math.max.apply(Math, currentLocationsOnMapLngs)) / 2;
                } else {
                    // if only lat and lng for one location are collect no point to calculate the city center
                    var cityLat = currentLocationsOnMapLats[0];
                    var cityLng = currentLocationsOnMapLngs[0];
                }

                map.setCenter(new google.maps.LatLng(cityLat, cityLng));
            }
        }
        map.setOptions({minZoom: 2, maxZoom: 20});

        if (options.campForZoomChange) {
            var camperZoom = 0;
            google.maps.event.addListener(map, 'zoom_changed', function() {
                var zoomLevel = map.getZoom();

                if (camperZoom != 0 && zoomLevel < camperZoom) {
                    $('.selectpicker.locations').val('');
                    $('.selectpicker.locations').selectpicker('refresh');

                    initMap(map_locations, {
                        initialLat: options.initialLat,
                        initialLng: options.initialLng,
                        initialZoom: options.initialZoom - 1,
                        categories: options.categories
                    });
                }

                camperZoom = zoomLevel;
            });
        }
    });
}