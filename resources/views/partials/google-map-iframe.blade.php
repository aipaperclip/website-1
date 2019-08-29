<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <style>@font-face{font-family:Lato-Bold;src:url(/assets/fonts/Lato-Bold.eot);src:url(/assets/fonts/Lato-Bold.eot?#iefix) format("embedded-opentype"),url(/assets/fonts/Lato-Bold.woff2) format("woff2"),url(/assets/fonts/Lato-Bold.woff) format("woff"),url(/assets/fonts/Lato-Bold.ttf) format("truetype");font-weight:400;font-style:normal;font-display:auto}@font-face{font-family:Calibri-Bold;src:url("/assets/fonts/Calibri Bold.eot");src:url("/assets/fonts/Calibri Bold.eot?#iefix") format("embedded-opentype"),url("/assets/fonts/Calibri Bold.woff2") format("woff2"),url("/assets/fonts/Calibri Bold.woff") format("woff"),url("/assets/fonts/Calibri Bold.ttf") format("truetype");font-weight:400;font-style:normal;font-display:auto}body{margin: 0;}.bootstrap-select{width:100%!important}.bootstrap-select button.btn{background-position:center right 15px;background-repeat:no-repeat}.bootstrap-select button.btn:focus{outline:0!important}.bootstrap-select .dropdown-menu{min-width:auto!important;width:100%;margin:0}.bootstrap-select .dropdown-menu.open{border:1px solid #679dca}.bootstrap-select .dropdown-menu li{border-bottom:1px solid #679dca}.bootstrap-select .dropdown-menu li a{outline:0!important}.bootstrap-select .dropdown-menu li a:focus{outline:0!important}.bootstrap-select .dropdown-menu li.selected a{font-weight:bold}.bootstrap-select .dropdown-menu li:last-child{border:0}.filter{padding-bottom:40px;padding-top:30px}.filter .wrapper{max-width:300px;width:90%;text-align:left}.filter .wrapper.first{float:right}@media screen and (max-width:767px){.filter .wrapper{margin:0 auto}.filter .wrapper.first{float:none;padding-bottom:15px}}.map-canvas{position:relative;overflow:hidden;height:450px}.featured-clinics-slider{position:relative;padding-top:80px}.featured-clinics-slider .slick-track{display:flex}.featured-clinics-slider .slick-track .slick-slide{display:flex;height:auto;align-items:center;justify-content:center}.featured-clinics-slider .single-slide{cursor:-webkit-grab;cursor:grab}.featured-clinics-slider .single-slide figure{padding:0 20px}.featured-clinics-slider .single-slide figure img{margin:0 auto;width:100%;max-width:200px;max-height:200px}.featured-clinics-slider .single-slide .headline{display:none;padding-top:5px;padding-right:25px;padding-left:25px;text-align:center;font-size:26px;font-family:Lato-Bold}@media screen and (max-width:767px){.featured-clinics-slider .single-slide .headline{padding-right:10px;padding-left:10px}}.featured-clinics-slider .single-slide .description{padding:10px 25px;display:none;line-height:18px}@media screen and (max-width:767px){.featured-clinics-slider .single-slide .description{padding:10px}}.featured-clinics-slider .single-slide .btn-container{font-weight:700;text-align:center;display:none;padding-left:15px;padding-right:15px}.featured-clinics-slider .single-slide .btn-container a{color:#fff;background-color:#041e42;padding:7px 12px;display:inline-block;border:1px solid #041e42;font-size:20px;font-family:Calibri-Bold;-webkit-border-radius:4px;-moz-border-radius:4px;-ms-border-radius:4px;border-radius:4px;-webkit-transition:.3s;-moz-transition:.3s;-o-transition:.3s;-ms-transition:.3s;transition:.3s}.featured-clinics-slider .single-slide .btn-container a:hover{color:#041e42;background-color:#fff}.featured-clinics-slider .single-slide.slick-current{border-left:2px solid #000;border-right:2px solid #000}.featured-clinics-slider .single-slide.slick-current .btn-container,.featured-clinics-slider .single-slide.slick-current .headline{display:block;padding-top:10px}.featured-clinics-slider .single-slide.slick-current .description{display:block;font-size:16px}.featured-clinics-slider .single-slide.slick-current figure{display:none}@media screen and (max-width:1199px){.featured-clinics-slider .single-slide.slick-current figure{display:block}.featured-clinics-slider .single-slide.slick-current figure img{max-width:150px}}</style>
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
@php($hide_clinics = \Illuminate\Support\Facades\Input::get('hide-clinics'))
@if(!empty($clinics) && !isset($hide_clinics))
    <div class="featured-clinics-slider">
        @foreach($clinics as $clinic)
            <div class="single-slide">
                <div class="wrapper">
                    @if(!empty($clinic->media))
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/uploads/' . $clinic->media->name)}}" itemprop="contentUrl" @if(!empty($clinic->media->alt)) alt="{{$clinic->media->alt}}" @endif/>
                        </figure>
                    @else
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/images/logo.svg') }}" width="100" itemprop="contentUrl" alt="Dentacoin logo"/>
                        </figure>
                    @endif
                    <div class="headline">{{$clinic->name}}</div>
                    <div class="description">{!! mb_substr($clinic->text, 0, 250) !!}...</div>
                    @if(!empty($clinic->featured_link))
                        <div class="btn-container"><a href="{{ $clinic->featured_link }}" rel="nofollow" target="_blank">READ MORE</a></div>
                    @endif
                </div>
            </div>
        @endforeach
    </div>
@endif
@include('partials.map-locations')
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
<script src="/dist/js/front-libs-script.js"></script>
@yield("script_block")
<script src="/assets/js/basic.js?v=1.0.48"></script>
<script src="/assets/js/markerclusterer-v2.js?v=1.0.48"></script>
<script src="/assets/js/google-map.js?v=1.0.48"></script>
<script>
    initMap();
</script>
</body>
</html>