@extends("layout")

@section("content")
    <section class="careers-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 page-h1-title">DENTACOIN CAREERS</h1>
            </div>
            <div class="row join-our-team fs-0">
                <div class="col-xs-12 col-sm-5 col-sm-offset-1 inline-block image">
                    <div class="second-dot fs-16 inline-block">&nbsp;</div>
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="{{URL::asset('assets/uploads/person-in-magnifier.svg') }}" alt="Person in magnifier"
                             itemprop="contentUrl"/>
                        <div class="third-dot fs-16 inline-block">&nbsp;</div>
                    </figure>
                </div>
                <div class="col-xs-12 col-sm-5 inline-block text">
                    <div class="section-subtitle">Join Our Team</div>
                    <div class="fs-18 line-height-26 padding-top-15 padding-bottom-10">Eager to join Dentacoin Foundation in its quest to reshape the global dental industry? In line with the fast global expansion of our project, we are looking for bright individuals who are fascinated by new technologies, able to work in a demanding work environment and passionate to deliver solutions with a global impact!</div>
                    <div class="padding-top-15"><a href="javascript:void(0)" class="white-bright-blue-btn lato-black fs-20 scroll-to-job-offers">SEE JOB OPENINGS</a></div>
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
                    <h2 class="col-xs-12 section-title">OPEN JOB OPENINGS</h2>
                </div>
            </div>
            <div class="row open-job-positions">
                <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                    @if(sizeof($job_offers) > 0)
                        <div class="row fs-0">
                            @foreach($job_offers as $job_offer)
                                <div class="col-xs-12 col-sm-4 single inline-block-top" itemscope="" itemtype="http://schema.org/JobPosting">
                                    @if(!empty($job_offer->remote_work))
                                        <meta itemprop="employmentType" content="Remote work: {{$job_offer->remote_work}}">
                                    @endif
                                    <meta itemprop="title" content="{{$job_offer->title}}">
                                    <meta itemprop="description" content="{{strip_tags($job_offer->text)}}">
                                    <meta itemprop="hiringOrganization" content="Dentacoin Foundation">
                                    <meta itemprop="datePosted" content="{{date('Y-m-d', strtotime($job_offer->created_at))}}">
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
                                               class="white-bright-blue-btn">APPLY</a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="col-xs-12 no-results">No open positions at this moment.</div>
                    @endif
                </div>
            </div>
        </div>
    </section>
@endsection