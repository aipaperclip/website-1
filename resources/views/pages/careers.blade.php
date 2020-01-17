@extends("layout")

@section("content")
    <section class="careers-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 page-h1-title">{{ $meta_data->page_title }}</h1>
            </div>
            <div class="row join-our-team fs-0">
                <div class="col-xs-12 col-sm-6 inline-block image">
                    <div class="second-dot fs-16 inline-block">&nbsp;</div>
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="{{URL::asset('assets/images/person-in-magnifier.svg') }}" alt="Person in magnifier"
                             itemprop="contentUrl"/>
                        <div class="third-dot fs-16 inline-block">&nbsp;</div>
                    </figure>
                </div>
                <div class="col-xs-12 col-sm-6 inline-block text">
                    <div class="section-subtitle">{{$titles[0]->html}}</div>
                    <div class="section-description">{!! $sections[0]->html !!}</div>
                    <div class="btn-container"><a href="javascript:void(0)"
                                                  class="white-blue-rounded-btn">{{$sections[1]->html}}</a></div>
                </div>
            </div>
            @include('partials.benefits', ['borders' => true])
            <div class="row open-job-positions-title">
                <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                    <div class="logo-over-line">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo"
                                 itemprop="contentUrl"/>
                        </figure>
                        <div class="border-behind-logo"></div>
                    </div>
                    <h2 class="col-xs-12 section-title">{{$titles[1]->html}}</h2>
                </div>
            </div>
            <div class="row open-job-positions">
                <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                    @if(sizeof($job_offers) > 0)
                        <div class="row fs-0">
                            @foreach($job_offers as $job_offer)
                                <div class="col-xs-12 col-sm-4 single inline-block-top" itemscope=""
                                     itemtype="http://schema.org/JobPosting">
                                    @if(!empty($job_offer->remote_work))
                                        <meta itemprop="employmentType" content="{{$job_offer->remote_work}}">
                                    @endif
                                    <meta itemprop="title" content="{{$job_offer->title}}">
                                    <meta itemprop="datePosted" content="{{$job_offer->created_at}}">
                                    @if(!empty($job_offer->location))
                                        <div itemprop="jobLocation" itemscope itemtype="http://schema.org/Place">
                                            <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                                                <meta itemprop="addressLocality" content="{{$job_offer->location}}">
                                            </div>
                                        </div>
                                    @endif
                                    <div class="wrapper">
                                        <a href="{{route('careers', ['slug' => $job_offer->slug])}}">
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="{{URL::asset('assets/uploads/'.$job_offer->media->name) }}"
                                                     alt="{{$job_offer->media->alt}}" itemprop="contentUrl"/>
                                                <figcaption>{{$job_offer->title}}</figcaption>
                                            </figure>
                                        </a>
                                        <div class="border"></div>
                                        <div class="btn-container">
                                            <a href="{{route('careers', ['slug' => $job_offer->slug])}}"
                                               class="white-blue-rounded-btn">APPLY</a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="col-xs-12 no-results">{!! $sections[2]->html !!}</div>
                    @endif
                </div>
            </div>
        </div>
    </section>
@endsection