@extends("layout")

@section("content")
    <section class="testimonials-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 section-title">{{ $meta_data->page_title }}</h1>
            </div>
            <div class="row list">
                @php($first = false)
                @php($i = 0)
                @foreach($testimonials as $testimonial)
                    @php($i = $i + 1)
                    <article class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single fs-0">
                        @if($first)
                            <div class="mobile-vertical-line-30"></div>
                        @endif
                        <figure class="inline-block-top image @if(empty($testimonial->media)) no-avatar @endif" @if(!empty($testimonial->media)) itemscope="" itemtype="http://schema.org/ImageObject" @endif>
                            @if(!empty($testimonial->media))
                                <img src="{{URL::asset('assets/uploads/'.$testimonial->media->name) }}" @if(!empty($testimonial->media->alt)) alt="{{$testimonial->media->alt}}" itemprop="contentUrl" @endif/>
                            @endif
                            @if(!$first)
                                <div class="inline-block dot first-dot">&nbsp;</div>
                                @php($first = true)
                            @endif
                            @if($i == count($testimonials))
                                <div class="inline-block dot last-dot">&nbsp;</div>
                            @endif
                        </figure>
                        <div class="inline-block-top content">
                            <div class="description">
                                <figure class="start" itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/quote-left.svg') }}" alt="Quote left" itemprop="contentUrl"/></figure>
                                {!! $testimonial->text !!}
                                <figure class="end" itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/quote-right.svg') }}" alt="Quote right" itemprop="contentUrl"/></figure>
                            </div>
                            @if(!empty($testimonial->name_job))
                                <div class="name_job">{!! $testimonial->name_job !!}</div>
                            @endif
                            @if(!empty($testimonial->location))
                                <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>{!! $testimonial->location !!}</div>
                            @endif
                        </div>
                    </article>
                @endforeach
            </div>
            <div class="row">
                <div class="col-xs-12 gutter-xs-5">@include('partials.pagination')</div>
            </div>
        </div>
    </section>
@endsection