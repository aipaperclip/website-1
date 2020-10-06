@extends("layout")

@section("content")
    <div class="hidden-page-content hidden-users-page-content"></div>
    <div class="hidden-page-content hidden-dentists-page-content"></div>
    <div class="hidden-page-content hidden-traders-page-content active-page position-static">
        @include('partials.traders-page-content')
    </div>
    {{--@include('partials.homepage-content', array('class' => 'hide'))--}}
    <div class="hide-on-users-category-selected blank-container hide"></div>
@endsection