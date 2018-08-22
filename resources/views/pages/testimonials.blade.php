@extends("layout")

@section("content")
    <div class="testimonials-container">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 section-title">Dentacoin Network Speaking</div>
            </div>
            <div class="row list">
                @php($first = false)
                @php($i = 0)
                @foreach($testimonials as $testimonial)
                    @php($i = $i + 1)
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single fs-0">
                        <div class="inline-block-top image @if(empty($testimonial->media)) no-avatar @endif" @if(!empty($testimonial->media)) style="background-image: url({{URL::asset('assets/uploads/'.$testimonial->media->name) }})" @endif>
                            @if(!$first)
                                <div class="inline-block dot first-dot">&nbsp;</div>
                                @php($first = true)
                            @endif
                            @if($i == count($testimonials))
                                <div class="inline-block dot last-dot">&nbsp;</div>
                            @endif
                        </div>
                        <div class="inline-block-top content">
                            <div class="description">{!! $testimonial->text !!}</div>
                            @if(!empty($testimonial->name_job))
                                <div class="name_job">{!! $testimonial->name_job !!}</div>
                            @endif
                            @if(!empty($testimonial->location))
                                <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>{!! $testimonial->location !!}</div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="row">
                <div class="col-xs-12">@include('partials.pagination')</div>
            </div>
        </div>
    </div>
@endsection