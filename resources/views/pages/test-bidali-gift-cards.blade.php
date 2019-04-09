<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
    <h1>This is how we test.</h1>
    <div>
        <button id="bidali-btn">Init BIDALI</button>
    </div>

    <script type="text/javascript" src="https://commerce.bidali.com/commerce.min.js"></script>
    <script>
        alert('This payment method is still in testing phase, DO NOT purchase anything yet.');
        $('#bidali-btn').click(function() {
            bidaliSdk.Commerce.render({
                apiKey: 'pk_n6mvpompwzm83egzrz2vnh',
                paymentCurrencies: ['DCN']
            });
        });
    </script>
</body>
</html>
