<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <style>body{margin: 0;}.bootstrap-select{width:100%!important}.bootstrap-select button.btn{background-position:center right 15px;background-repeat:no-repeat}.bootstrap-select button.btn:focus{outline:0!important}.bootstrap-select .dropdown-menu{min-width:auto!important;width:100%;margin:0}.bootstrap-select .dropdown-menu.open{border:1px solid #679dca}.bootstrap-select .dropdown-menu li{border-bottom:1px solid #679dca}.bootstrap-select .dropdown-menu li a{outline:0!important}.bootstrap-select .dropdown-menu li a:focus{outline:0!important}.bootstrap-select .dropdown-menu li.selected a{font-weight:bold}.bootstrap-select .dropdown-menu li:last-child{border:0}.filter{padding-bottom:40px;padding-top:30px}.filter .wrapper{max-width:300px;width:90%;text-align:left}.filter .wrapper.first{float:right}@media screen and (max-width:767px){.filter .wrapper{margin:0 auto}.filter .wrapper.first{float:none;padding-bottom:15px}}.map-canvas{position:relative;overflow:hidden;height:450px}</style>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif">
<div class="container">
    <div class="row filter">
        <div class="col-xs-12 col-sm-6">
            <div class="wrapper first">
                <select class="selectpicker types" data-live-search="true">
                    <option value="">Show All Partners</option>
                    @foreach($location_types as $location_type)
                        <option value="{{$location_type->id}}">{{$location_type->name}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6">
            <div class="wrapper">
                <select class="selectpicker locations" data-live-search="true">
                    <option value="">Search by Name or Location</option>
                    @foreach($locations_select as $location)
                        <option value="{{$location->id}}" data-type-id="{{$location->type_id}}">{{$location->address}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
</div>
<div class="map-canvas"></div>
@include('partials.map-locations')
<script src="/assets/js/basic.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
<script src="/dist/js/front-libs-script.js"></script>
@yield("script_block")
<script src="/assets/js/markerclusterer-v2.js"></script>
<script src="/assets/js/google-map.js"></script>
<script src="/assets/js/index.js"></script>
</body>
</html>