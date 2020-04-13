<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    {{--<script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        @if(empty($_COOKIE['performance_cookies']))
        gtag('config', 'UA-97167262-1', {'anonymize_ip': true});
        @else
        gtag('config', 'UA-97167262-1');
        @endif
    </script>--}}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <style>
        #gateway-iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 100vh;
        }
    </style>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<iframe src="https://dentacoin.com/test-combined-login?dcn-gateway-type=patient-register" id="gateway-iframe"></iframe>
</body>
</html>