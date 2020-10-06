@extends("layout")
@section("content")
    <div class="hidden-page-content hidden-users-page-content"></div>
    <div class="hidden-page-content hidden-dentists-page-content"></div>
    <div class="hidden-page-content hidden-traders-page-content"></div>
    @include('partials.homepage-content')
    <div class="hide-on-users-category-selected blank-container hide"></div>
@endsection