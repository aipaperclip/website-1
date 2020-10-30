<!DOCTYPE html>
<html>
<head>
    <title>Dentacoin Map</title>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <link rel="stylesheet" type="text/css" href="/dist/css/front-style.css?v={{time()}}">
</head>
<body class="dentacoin-map-iframe">
    <div class="camping-loader"></div>
    @php($type = \Illuminate\Support\Facades\Input::get('type'))
    <section class="section-google-map module @if ($type == 'dentists') dentists-color-style @endif"><div class="map-container"></div></section>
    <script src="/dist/js/front-libs-script.js"></script>
    <script src="/dist/js/front-script.js?v={{time()}}"></script>
    <script>
        projectData.general_logic.data.showLoader();
        projectData.general_logic.data.dentacoinGoogleMap();
    </script>
</body>
</html>