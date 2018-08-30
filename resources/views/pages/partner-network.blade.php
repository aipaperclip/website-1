@extends("layout")
@section("content")
    <section class="partner-network-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 section-title">Partner Network</h1>
            </div>
            <div class="row filter">
                <div class="col-xs-12 text-center">
                    <div class="wrapper">
                        <select class="selectpicker">
                            <option value="">Show All Locations</option>
                            @foreach($location_types as $location_type)
                                <option value="{{$location_type->id}}">{{$location_type->name}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="map-canvas"></div>
        <div class="container list-with-locations">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                    @foreach($list_locations_with_subtypes_types as $key=>$type)
                        <div class="single-type">
                            <h2 class="type-title section-title">{{$key}}</h2>
                            <div class="subtypes">
                                @foreach($type as $subkey=>$subtype)
                                    <div class="subtype-title section-subtitle"><span>{{$subkey}}</span><i class="fa fa-caret-right"></i></div>
                                    <div class="clinics">
                                        @foreach($subtype as $clinic)
                                            <div class="clinic-title section-title">{{$clinic['name']}}</div>
                                            <div class="clinic-link">
                                                <a href="{{$clinic['link']}}" target="_blank">{{$clinic['link']}}</a>
                                            </div>
                                            <div class="locations">
                                                <ul>
                                                    @foreach($clinic['locations'] as $location)
                                                        <li>{{$location->address}}</li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                        @endforeach
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
@endsection
@section("script_block")
    <script>
        var map_locations = [];
        @foreach($locations as $location)
            var temp_obj = {
                'address' : '{{$location->address}}',
                'lat' : '{{$location->lat}}',
                'lng' : '{{$location->lng}}',
                'clinic_name' : '{{$location->clinic_name}}',
                'clinic_link' : '{{$location->clinic_link}}',
                'location_type_id' : '{{$location->location_type_id}}',
                'marker_icon' : '{{URL::asset('assets/uploads/'.$location->marker_icon)}}'
            };
            @if(!empty($location->clinic_media))
                temp_obj['clinic_media'] = '{{URL::asset('assets/uploads/'.$location->clinic_media)}}';
            @endif
            map_locations.push(temp_obj);
        @endforeach
    </script>
@endsection