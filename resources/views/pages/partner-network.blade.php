@extends("layout")
@section("content")
    <section class="partner-network-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 section-title">{{ $meta_data->page_title }}</h1>
            </div>
            <div class="row filter">
                <div class="col-xs-12 col-sm-6 text-center">
                    <div class="wrapper">
                        <select class="selectpicker types" data-live-search="true">
                            <option value="">Show All Types</option>
                            @foreach($location_types as $location_type)
                                <option value="{{$location_type->id}}">{{$location_type->name}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 text-center">
                    <div class="wrapper">
                        <select class="selectpicker locations" data-live-search="true">
                            <option value="">Show All Locations</option>
                            @foreach($locations_select as $location)
                                <option value="{{$location->id}}" data-type-id="{{$location->type_id}}">{{$location->address}}</option>
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
                                    <div class="subtype-title section-subtitle"><button>{{$subkey}}</button><i class="fa fa-caret-right"></i></div>
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
@include('partials.map-locations')