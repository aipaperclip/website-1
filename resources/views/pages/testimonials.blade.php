@extends("layout")

@section("content")
    <div class="testimonials-container">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 section-title">Dentacoin Network Speaking: Partner Testimonials</div>
            </div>
            <div class="row list">
                @foreach($testimonials as $testimonial)
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                        <figure class="inline-block-top">
                            <img src="@if(!empty($testimonial->media)) {{URL::asset('assets/uploads/'.$testimonial->media->name) }} @endif"/>
                        </figure>
                        <div class="inline-block-top content">
                            <div class="description">{!! $testimonial->text !!}</div>
                        </div>
                    </div>
                @endforeach
                @include('partials.pagination')
            </div>
        </div>
    </div>
@endsection