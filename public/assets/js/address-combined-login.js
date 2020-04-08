var initAddressSuggesters;
var checkAddress;
var setupMap;
var mapsLoaded = true;
var mapsWaiting = [];

var prepareMapFunction = function( callback ) {
    if(mapsLoaded) {
        callback();
    } else {
        mapsWaiting.push(callback);
    }
};

$(document).ready(function($){
    setupMap = function(suggester_container, coords) {
        console.log('setupMap');
        suggester_container.find('.suggester-map-div').show();
        if(!suggester_container.find('.suggester-map-div').attr('inited') ) {
            var profile_address_map = new google.maps.Map( suggester_container.find('.suggester-map-div')[0], {
                center: coords,
                zoom: 14,
                backgroundColor: 'none'
            });
            var marker = new google.maps.Marker({
                map: profile_address_map,
                icon: '/assets/images/map-pin-inactive.png',
                draggable:true,
                position: coords,
            });

            marker.addListener('dragend', function(e) {
                this.map.panTo( this.getPosition() );
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'location': this.getPosition()}, (function(results, status) {
                    if (status == 'OK') {
                        var gstring = results[0].formatted_address;
                        var country_name = this.find('.country-select option:selected').text();
                        gstring = gstring.replace(', '+country_name, '');

                        this.find('.address-suggester').val(gstring).blur();
                    } else {
                        checkAddress(null, this);
                    }
                }).bind(suggester_container) );
            });
            suggester_container.find('.suggester-map-div').attr('inited', 1);
            suggester_container.find('.suggester-map-div').data('map', profile_address_map);
            suggester_container.find('.suggester-map-div').data('marker', marker);
        } else {
            suggester_container.find('.suggester-map-div').data('map').panTo(coords);
            suggester_container.find('.suggester-map-div').data('marker').setPosition(coords);
        }
    };

    initAddressSuggesters = function() {
        console.log('initAddressSuggesters');
        prepareMapFunction(function() {
            $('.address-suggester').each( function() {
                //dont init map which are not supposed to be inited at this time
                if($(this).hasClass('dont-init')) {
                    return false;
                }
                var suggester_container = $(this).closest('.address-suggester-wrapper');
                suggester_container.find('.country-select').change( function() {
                    var cc = $(this).find('option:selected').val();
                    GMautocomplete.setComponentRestrictions({
                        'country': cc
                    });
                });

                if( suggester_container.find('.suggester-map-div').attr('lat') ) {
                    var coords = {
                        lat: parseFloat(suggester_container.find('.suggester-map-div').attr('lat')),
                        lng: parseFloat(suggester_container.find('.suggester-map-div').attr('lon'))
                    };
                    setupMap(suggester_container, coords);
                }

                var input = $(this)[0];
                var cc = suggester_container.find('.country-select option:selected').val();
                var options = {
                    componentRestrictions: {
                        country: cc
                    },
                    types: ['address']
                };

                var GMautocomplete = new google.maps.places.Autocomplete(input, options);
                GMautocomplete.suggester_container = suggester_container;
                google.maps.event.addListener(GMautocomplete, 'place_changed', (function () {
                    var place = this.getPlace();
                    this.suggester_container.find('.address-suggester').val(place.formatted_address ? place.formatted_address : place.name).blur();
                }).bind(GMautocomplete));

                $(this).blur( function(e) {
                    var suggester_container = $(this).closest('.address-suggester-wrapper');
                    var country_name = suggester_container.find('.country-select option:selected').text();
                    var country_code = suggester_container.find('.country-select option:selected').val();

                    var geocoder = new google.maps.Geocoder();
                    var address = $(this).val();
                    geocoder.geocode( {
                        'address': address,
                        'region': country_code
                    }, (function(results, status) {
                        if (status == 'OK') {
                            checkAddress(results[0], this);
                        } else {
                            checkAddress(null, this);
                        }
                    }).bind(suggester_container) );
                });
            });
        });

        $('.address-suggester').on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
    };

    checkAddress = function(place, suggester_container) {
        //suggester_container.find('.address-suggester').blur();
        suggester_container.find('.geoip-hint').hide();
        suggester_container.find('.geoip-confirmation').hide();
        suggester_container.find('.different-country-hint').hide();
        suggester_container.find('.suggester-map-div').hide();

        if( place && place.geometry && place.types && (place.types.indexOf('street_address') != -1 || place.types.indexOf('establishment') != -1 || place.types.indexOf('point_of_interest') != -1 || place.types.indexOf('premise') != -1) ) {
            //address_components
            var gstring = suggester_container.find('.address-suggester').val();
            var country_name = suggester_container.find('.country-select option:selected').text();
            var country_code_name = suggester_container.find('.country-select option:selected').val();

            var address_country;
            for (var i in place.address_components) {
                for( var t in place.address_components[i].types) {
                    if (place.address_components[i].types[t] == 'country') {
                        address_country = place.address_components[i].short_name;
                        break;
                    }
                }
            }

            if (address_country == country_code_name) {
                gstring = gstring.replace(', '+country_name, '');
                suggester_container.find('.address-suggester').val(gstring);

                var coords = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                setupMap(suggester_container, coords);

                suggester_container.find('.geoip-confirmation').show();
            } else {
                suggester_container.find('.different-country-hint').show();
            }
        } else {
            suggester_container.find('.geoip-hint').show();
        }
    };

    console.log($('.address-suggester').length, '$(\'.address-suggester\').length');
    if($('.address-suggester').length) {
        initAddressSuggesters();
    }
});