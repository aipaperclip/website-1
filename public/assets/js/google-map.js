var markerCluster;
function initMap(map_locations, initialLat, initialLng, initialZoom, filter_country, location_id, location_source, categories) {
    console.log(filter_country, 'filter_country');
    console.log(location_id, 'location_id');
    console.log(location_source, 'location_source');
    console.log(categories, 'categories');

    if(initialLat === undefined) {
        initialLat = 28.508742;
    }

    if(initialLng === undefined) {
        initialLng = -0.120850;
    }

    if(initialZoom === undefined) {
        initialZoom = 2;
    }

    Gmap = jQuery('.google-map-box');
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
            dataLat = initialLat,
            dataLng = initialLng,
            dataType = 'roadmap',
            dataScrollwheel = scrollwheel,
            dataZoomcontrol = $this.data('zoomcontrol'),
            dataTitle = $this.data('title');


        var dataZoom = initialZoom;

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

        if (typeof(map_locations) != 'undefined' && map_locations.length > 0) {
            for (var i = 0, len = map_locations.length; i < len; i+=1) {
                if(filter_country != undefined)  {
                    if (filter_country instanceof Array) {
                        if (!filter_country.includes(map_locations[i].country_code)) {
                            continue;
                        }
                    } else {
                        if (filter_country != map_locations[i].country_code) {
                            continue;
                        }
                    }
                }

                if(location_id != undefined && location_source != undefined && location_id != map_locations[i].id && location_source != map_locations[i].source)  {
                    continue;
                }

                if (categories != undefined) {
                    if (!categories.includes(map_locations[i].category)) {
                        continue;
                    }
                }

                var marker_options = {
                    position: new google.maps.LatLng(map_locations[i].lat, map_locations[i].lng),
                    lat: map_locations[i].lat,
                    lng: map_locations[i].lng,
                    map: map,
                    icon: '/assets/uploads/' + map_locations[i].marker,
                    name: map_locations[i].name,
                    country_code: map_locations[i].country_code,
                    database_id: map_locations[i].id,
                    source: map_locations[i].source
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
                    var country_code = this.country_code;
                    var database_id = this.database_id;
                    var source = this.source;
                    $.event.trigger({
                        type: 'showLocationInList',
                        time: new Date(),
                        response_data: {
                            'country_code' : country_code,
                            'id' : database_id,
                            'source' : source,
                            'lat' : this.getPosition().lat(),
                            'lng' : this.getPosition().lng()
                        }
                    });

                    /*map.panTo(this.getPosition());
                    map.setZoom(18);*/

                    if(infowindow != null){
                        infowindow.close();
                    }

                    var content = '<div style="font-size: 20px;">'+this.name+'</div>';
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
}