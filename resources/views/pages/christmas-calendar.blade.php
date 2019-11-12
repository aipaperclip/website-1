@extends("layout")

@section("content")
<div id="fb-root"></div>
<script src="http://connect.facebook.net/en_US/all.js"></script>
<script>
    FB.init({
        appId  : '1906201509652855',
        status : true,
        cookie : true,
        xfbml  : true
    });
</script>
<style>
    #container_notlike, #container_like {
        display:none
    }
</style>

<div id="container_notlike">
    YOU DONT LIKE
</div>

<div id="container_like">
    YOU LIKE
</div>
@endsection