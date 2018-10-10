@extends("layout")

@section("content")
    <section class="careers-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 section-title">DENTACOIN CAREERS</h1>
            </div>
            <div class="row join-our-team fs-0">
                <div class="col-xs-12 col-sm-6 inline-block image">
                    <div class="second-dot fs-16 inline-block">&nbsp;</div>
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="{{URL::asset('assets/images/person-in-magnifier.svg') }}" alt="Person in magnifier" itemprop="contentUrl"/>
                        <div class="third-dot fs-16 inline-block">&nbsp;</div>
                    </figure>
                </div>
                <div class="col-xs-12 col-sm-6 inline-block text">
                    <div class="section-subtitle">Join Our Team</div>
                    <div class="description">Eager to join Dentacoin Foundation in its quest to reshape the global dental industry? In line with the fast global expansion of our project, we are looking for bright individuals who are fascinated by new technologies, able to work in a demanding work environment and passionate to deliver solutions with a global impact!</div>
                    <div class="btn-container"><a href="javascript:void(0)" class="white-blue-rounded-btn">SEE OPEN JOB POSITIONS</a></div>
                </div>
            </div>
            @include('partials.benefits')
        </div>
        <div class="open-job-positions-title">
            <div class="logo-over-line">
                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                </figure>
                <div class="border-behind-logo"></div>
            </div>
            <div class="container">
                <div class="row">
                    <h1 class="col-xs-12 section-title">OPEN JOB POSITIONS</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row open-job-positions fs-0">
                @if(sizeof($job_offers) > 0)
                    @foreach($job_offers as $job_offer)
                        <div class="col-xs-12 col-sm-4 single inline-block-top">
                            <div class="wrapper">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/uploads/'.$job_offer->media->name) }}" alt="{{$job_offer->media->alt}}" itemprop="contentUrl"/>
                                    <figcaption>{{$job_offer->title}}</figcaption>
                                </figure>
                                <div class="border"></div>
                                <div class="btn-container">
                                    <a href="{{route('careers', ['slug' => $job_offer->slug])}}" class="white-blue-rounded-btn">APPLY</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="col-xs-12 no-results">No open positions at this moment.</div>
                @endif
            </div>
        </div>
    </section>
@endsection