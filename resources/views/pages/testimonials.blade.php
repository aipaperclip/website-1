@extends("layout")

@section("content")
    <section class="testimonials-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 section-title">Dentacoin Network Speaking</h1>
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
    </section>
@endsection

<p>Dentacare is a mobile app which teaches kids and adults to maintain good oral hygiene through a 3-month, incentivized challenge.</p>
<p><strong>Users</strong> are guided through reminders, notifications, voice navigation and tutorials towards establishing and maintaining dental care habits. </p>
<p><strong>Dentists recommend</strong> the app to their patients to ensure proper in-home care.</p>
<p></p>
<a href="https://itunes.apple.com/us/app/dentacare/id1274148338?mt=8" target="_blank">
    <figure>
        <img src="/assets/images/apple-store-button.png"/>
    </figure>
</a>
<p></p>
<a href="https://play.google.com/store/apps/details?id=com.dentacoin.dentacare&hl=en" target="_blank">
    <figure>
        <img src="/assets/images/google-store-button.png"/>
    </figure>
</a>
