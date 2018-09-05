<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <style>
        body {
            margin: 0;
        }
        .map-canvas {
            position: relative;
            overflow: hidden;
            height: 450px;
        }
    </style>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif">

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