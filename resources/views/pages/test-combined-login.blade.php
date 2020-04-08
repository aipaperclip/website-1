<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
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
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/dentacoin-login-gateway/css/dentacoin-login-gateway-style.css"/>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<button class="open-dentacoin-gateway patient-login">Open patient login</button>
<br><br>
<button class="open-dentacoin-gateway patient-register">Open patient register</button>
<br><br>
<button class="open-dentacoin-gateway dentist-login">Open dentist login</button>
<br><br>
<button class="open-dentacoin-gateway dentist-register">Open dentist register</button>
{{--<div id="dentacoin-login-gateway-container">

</div>--}}
<script src="https://dentacoin.com/assets/libs/dentacoin-login-gateway/js/init.js"></script>
<script>
    console.log('asd');

    dcnGateway.init({
        'platform' : 'assurance',
        'forgotten_password_link' : 'https://google.com',
        'user_ip' : 'localhost'
    });
</script>
</body>
</html>