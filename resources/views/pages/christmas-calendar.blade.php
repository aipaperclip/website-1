@extends("layout")

@section("content")
<div id="fb-root"></div>
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