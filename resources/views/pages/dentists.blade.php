@extends("layout")

@section("content")
    <div class="hidden-page-content hidden-users-page-content"></div>
    <div class="hidden-page-content hidden-dentists-page-content active-page position-static">
        @include('partials.dentists-page-content', ['video_expressions' => $video_expressions])
    </div>
    <div class="hidden-page-content hidden-traders-page-content"></div>
    @include('partials.homepage-content', array('class' => 'hide'))
@endsection