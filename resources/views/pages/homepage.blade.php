@extends("layout")
@section("content")
    <div class="homepage-container @if($mobile) mobile @endif">
        <section class="intro fullpage-section one" data-section="one">
            <div class="bg-wrapper">
                <div class="container content-wrapper">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                            <h1 class="title lato-black">{{ $meta_data->page_title }}</h1>
                            {!! $sections[0]->html !!}
                            <div class="video">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <button class="play-btn">
                                        <img src="{{URL::asset('assets/images/video-play-icon.svg') }}" alt="Video play icon" itemprop="contentUrl"/>
                                        @if($mobile)
                                            <div class="mobile-vertical-line-70"></div>
                                        @endif
                                    </button>
                                </figure>
                                <div class="video-wrapper">
                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                        <button class="close-video">
                                            <img src="{{URL::asset('assets/images/close.svg') }}" alt="Close video icon" itemprop="contentUrl"/>
                                        </button>
                                    </figure>
                                    <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject">
                                        <video controls>
                                            <source src="{{URL::asset('assets/videos/dentacoin-explainer-video.mp4') }}" type="video/mp4">
                                            {{--<source src="{{URL::asset('assets/videos/dentacoin-introduction.mp4') }}" type="video/mp4">
                                            <track src="{{URL::asset('assets/videos/dentacoin-introduction.vtt') }}" kind="captions" srclang="en" label="English" default="">--}}
                                            Your browser does not support HTML5 video.
                                        </video>
                                        <meta itemprop="name" content="Dentacoin Introduction Video">
                                        <meta itemprop="description" content="Explainer video: Dentacoin, the Blockchain Solution for the Global Dentistry">
                                        <meta itemprop="uploadDate" content="2019-03-19T08:00:00+08:00">
                                        <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                                        <link itemprop="contentURL" href="{{URL::asset('assets/videos/dentacoin-explainer-video.mp4') }}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container second-dot-parent">
                    <div class="wrapper"><span class="second-dot custom-dot">&nbsp;</span></div>
                </div>
            </div>
        </section>
        <section class="dentacoin-ecosystem container-fluid" data-section="two">
            <div class="row">
                <div class="apps-list fullpage-section two col-xs-12 col-md-6">
                    <div class="list">
                        <div class="row">
                            <div class="col-xs-12"><h3 class="rotated-text padding-bottom-50 padding-bottom-xs-20 fs-xs-28 text-center">{!! $titles[0]->html !!}</h3></div>
                            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                                <div class="container-fluid">
                                    <div class="row fs-0">
                                        @foreach($applications as $application)
                                            <button class="col-xs-4 inline-block-top single-application" data-platform="{{$application->title}}">
                                                <figure class="wrapper" @if($application->media) data-image="{{URL::asset('assets/uploads/'.$application->media->name) }}" data-image-alt="@if($application->media->alt){{$application->media->alt}}@endif" data-image-type="{{$application->media->type}}" data-upload-date="{{$application->media->created_at->format('c')}}" @endif @if($application->popup_logo) data-popup-logo="{{URL::asset('assets/uploads/'.$application->popup_logo->name) }}" data-popup-logo-alt="@if($application->popup_logo->alt){{$application->popup_logo->alt}}@endif" @endif @if($application->text) data-title="{{$application->title}}" data-description="{{ json_encode($application->text) }}" @endif  @if($application->slug == 'blog-intro') @if(!empty($latest_blog_articles)) data-articles="{{json_encode($latest_blog_articles)}}" @endif @endif itemscope="" data-slug="{{$application->slug}}" itemtype="http://schema.org/ImageObject">
                                                    @if($application->logo)
                                                        <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/uploads/'.$application->logo->name) }}" itemprop="contentUrl" @if(!empty($application->logo->alt)) alt="{{$application->logo->alt}}" @endif/>
                                                    @endif
                                                    <figcaption>{{$application->title}}</figcaption>
                                                </figure>
                                            </button>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info-section col-xs-12 col-md-6">
                    @if(!\App\Http\Controllers\UserController::instance()->checkSession())
                        <a href="javascript:void(0)" class="white-black-btn show-login-signin">SIGN IN</a>
                    @endif
                    <a href="javascript:void(0)" class="close-application">×</a>
                    <div class="html-content"></div>
                </div>
            </div>
        </section>
        <section class="successful-practices rest-data">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 dots">
                        <div class="first-dot-wrapper">
                            <div class="first-dot inline-block">&nbsp;</div>
                        </div>
                        <div class="second-dot-wrapper">
                            <div class="second-dot inline-block">&nbsp;</div>
                        </div>
                        <div class="third-dot inline-block">&nbsp;</div>
                        <figure class="logo-over-line no-background" itemscope="" itemtype="http://schema.org/ImageObject">
                            @if($mobile)
                                <div class="mobile-vertical-line-50"></div>
                            @endif
                            <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                        </figure>
                    </div>
                </div>
                <div class="row">
                    <h2 class="col-xs-12 section-title">{!! $titles[1]->html !!}</h2>
                </div>
                <div class="row content flex">
                    <div class="col-xs-12 col-md-5 col-md-offset-2 content-container">
                        {!! $sections[1]->html !!}
                    </div>
                    <figure class="col-xs-12 col-md-5" itemscope="" itemtype="http://schema.org/ImageObject">
                        <div class="fourth-dot inline-block">&nbsp;</div>
                        <div class="fifth-dot inline-block">&nbsp;</div>
                        <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/animation-chair-left-to-right-smooth.gif') }}" data-svg="{{URL::asset('assets/images/chair.svg') }}" data-gif="{{URL::asset('assets/images/animation-chair-left-to-right-smooth.gif') }}" alt="Dental chair icon" class="refresh-image desktop-image" itemprop="contentUrl"/>
                        <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/chair-mobile.svg') }}" alt="Dental chair icon" class="mobile-image" itemprop="contentUrl"/>
                    </figure>
                </div>
            </div>
        </section>
        <section class="below-successful-practices">
            <div class="container">
                <div class="row mobile-title text-center">
                    <figure class="col-xs-12" itemscope="" itemtype="http://schema.org/ImageObject">
                        @if($mobile)
                            <div class="mobile-vertical-line-50"></div>
                        @endif
                        <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                    </figure>
                    <div class="col-xs-12 section-title">{!! $titles[5]->html !!}</div>
                </div>
                <div class="row flex">
                    <div class="col-md-7 col-xs-8 col-xs-offset-2 col-md-offset-0 description-over-line">
                        <div class="wrapper">
                            <div class="first-dot inline-block">&nbsp;</div>
                            <div class="second-dot inline-block">&nbsp;</div>
                            <div class="description inline-block"><div class="wrapper visibility-hidden">{!! $sections[2]->html !!}</div></div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-5 cells no-gutter-xs">
                        {!! $sections[3]->html !!}
                    </div>
                </div>
            </div>
        </section>
        <section class="testimonials">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 upper-empty-space">
                        <div class="first-dot inline-block">&nbsp;</div>
                        <div class="second-dot inline-block">&nbsp;</div>
                    </div>
                    <div class="col-xs-12 col-md-10 col-md-offset-1 expressions text-center">
                        @php($first = false)
                        @php($iterator = 0)
                        @foreach($testimonials as $testimonial)
                            @php($iterator+=1)
                            <div class="circle-wrapper inline-block @if($mobile || !$first || ceil(count($testimonials)/2) == $iterator || $iterator == count($testimonials))
                            @php($first = true) active @endif @if(!$testimonial->media) no-image @endif">
                                @if($mobile)
                                    <div class="mobile-vertical-line-30"></div>
                                @endif
                                <div class="circle"><div class="background" @if($testimonial->media) style="background-image: url({{URL::asset('assets/uploads/'.$testimonial->media->name) }})" @endif></div></div>
                                <article class="text">
                                    <figure class="start" itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/quote-left.svg') }}" alt="Quote left" itemprop="contentUrl"/></figure>
                                    {{$testimonial->text}}
                                    <figure class="end" itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/quote-right.svg') }}" alt="Quote right" itemprop="contentUrl"/></figure>
                                    <div class="name_job_location">
                                        @if(!empty($testimonial->name_job))
                                            <div class="name_job">{!! $testimonial->name_job !!}</div>
                                        @endif
                                        @if(!empty($testimonial->location))
                                            <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>{!! $testimonial->location !!}</div>
                                        @endif
                                    </div>
                                </article>
                            </div>
                        @endforeach
                    </div>
                    @if($mobile)
                        <div class="col-xs-12 text-center see-more">
                            <a href="{{ route('testimonials', ['page' => 1]) }}" class="white-blue-rounded-btn">SEE MORE</a>
                        </div>
                        <div class="col-xs-12 token-holders-transactions no-gutter-xs fs-0">
                            <div class="between-sections-description inline-block-top">
                                {!! $sections[6]->html !!}
                            </div>
                            <div class="between-sections-description inline-block-top">
                                {!! $sections[7]->html !!}
                            </div>
                        </div>
                    @endif
                    <div class="col-xs-12 below-expressions">
                        <div class="show-more">
                            <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject"><a href="{{ route('testimonials', ['page' => 1]) }}"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/plus-solid.svg') }}" itemprop="contentUrl" alt="Plus icon"/></a></figure>
                            <p class="inline-block">{!! $sections[4]->html !!}</p>
                        </div>
                        <div class="third-dot inline-block">&nbsp;</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="buy-dentacoin">
            <div class="container">
                <div class="row logo">
                    <figure class="logo-over-line" itemscope="" itemtype="http://schema.org/ImageObject">
                        @if($mobile)
                            <div class="mobile-vertical-line-50"></div>
                        @endif
                        <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                    </figure>
                    <div class="col-xs-12">
                        <div class="first-dot inline-block">&nbsp;</div>
                    </div>
                </div>
                <div class="row">
                    <h2 class="col-xs-12 section-title">{!! $titles[2]->html !!}</h2>
                </div>
                <div class="row wallet-app-and-gif">
                    <div class="fifth-dot inline-block">&nbsp;</div>
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-5 col-md-offset-1 wallet-app inline-block-top">
                        {!! $sections[5]->html !!}
                        <div class="exchange-platforms-and-wallets">
                            <div class="exchange-platforms exchange-method inline-block-top">
                                <button class="title"><div class="icon inline-block"></div><span class="inline-block">Exchange Platforms</span></button>
                                <ul class="list">
                                    @foreach($exchange_platforms as $exchange_platform)
                                        <li><a href="{{$exchange_platform->link}}" target="_blank">{{$exchange_platform->title}}</a></li>
                                    @endforeach
                                </ul>
                            </div>
                            <div class="wallets exchange-method inline-block-top">
                                <button class="title"><div class="icon inline-block"></div><span class="inline-block">Wallets</span></button>
                                <ul class="list">
                                    @foreach($wallets as $wallet)
                                        <li><a href="{{$wallet->link}}" target="_blank">{{$wallet->title}}</a></li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                        <div class="padding-top-20"><a href="https://wallet.dentacoin.com/buy" target="_blank" class="white-blue-rounded-btn redirect-to-wallet-buy-page">BUY WITH A CARD</a></div>
                        {!! $sections[13]->html !!}
                    </div>
                    <div class="col-xs-12 col-md-5 col-md-offset-1 gif inline-block-top">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/animation-hand-with-credit-card.gif') }}" data-svg="{{URL::asset('assets/images/hand-with-credit-card.svg') }}" data-gif="{{URL::asset('assets/images/animation-hand-with-credit-card.gif') }}" alt="Hand holding credit card icon" class="refresh-image desktop-image" itemprop="contentUrl"/>
                            <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/hand-with-credit-card-mobile.svg') }}" alt="Hand holding credit card icon" class="mobile-image" itemprop="contentUrl"/>
                            <div class="second-dot inline-block">&nbsp;</div>
                            <div class="third-dot inline-block">&nbsp;</div>
                        </figure>
                        <div class="between-sections-description visibility-hidden">
                            {!! $sections[6]->html !!}
                            <div class="fourth-dot inline-block">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="below-buy-dentacoin">
            <div class="container">
                <figure class="logo-over-line" itemscope="" itemtype="http://schema.org/ImageObject">
                    @if($mobile)
                        <div class="mobile-vertical-line-50"></div>
                    @endif
                    <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                </figure>
                <div class="first-dot inline-block">&nbsp;</div>
                <div class="second-dot inline-block">&nbsp;</div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="between-sections-description visibility-hidden">
                            {!! $sections[7]->html !!}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="awards-and-publications">
            <div class="container">
                <div class="row">
                    <h2 class="col-xs-12 section-title">{!! $titles[3]->html !!}</h2>
                </div>
                <div class="row awards">
                    <h2 class="col-xs-12 col-sm-10 col-sm-offset-1">
                        <div class="container-fluid">
                            <div class="row fs-0">
                                <figure class="col-xs-12 col-sm-3 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <a href="https://www.cv-magazine.com/2018-forging-a-dental-renaissance" target="_blank"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/corporate-excellence-awards-2018.jpg') }}" itemprop="contentUrl" alt="Corporate excellence awards 2018"/></a>
                                </figure>
                                <figure class="col-xs-12 col-sm-3 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <a href="https://blockchain.cioreview.com/vendor/2017/dentacoin" target="_blank"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/20-most-promising-blockchain-technology-solution.jpg') }}" itemprop="contentUrl" alt="20 most promising blockchain technology solutions"/></a>
                                </figure>
                                <figure class="col-xs-12 col-sm-3 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <a href="https://thesiliconreview.com/magazines/improving-dental-care-worldwide-and-making-it-affordable-through-utilizing-the-blockchain-advantages-dentacoin-foundation/" target="_blank"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/50-most-valuable-brands-of-the-year.jpg') }}" itemprop="contentUrl" alt="50 most valuable brands of the year"/></a>
                                </figure>
                                <figure class="col-xs-12 col-sm-3 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <a href="https://www.insightssuccess.com/dentacoin-foundation-introducing-blockchain-solutions-for-dental-industry/" target="_blank"><img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/most-disruptive-innovation.png') }}" itemprop="contentUrl" alt="50 most valuable brands of the year"/></a>
                                </figure>
                            </div>
                        </div>
                    </h2>
                </div>
            </div>
            <div class="container no-gutter-sm-down">
                <div class="row publications-slider-wrapper">
                    <div class="first-dot inline-block">&nbsp;</div>
                    <div class="col-xs-12 publications-slider">
                        @foreach($publications as $publication)
                            <div class="single-slide">
                                <div class="wrapper">
                                    @if(!empty($publication->media))
                                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                            <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/uploads/' . $publication->media->name)}}" itemprop="contentUrl" @if(!empty($publication->media->alt)) alt="{{$publication->media->alt}}" @endif/>
                                        </figure>
                                    @else
                                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                            <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" width="100" itemprop="contentUrl" alt="Dentacoin logo"/>
                                        </figure>
                                    @endif
                                    <div class="headline">{{$publication->headline}}</div>
                                    <div class="description">{{$publication->text}}</div>
                                    <div class="btn-container"><a href="{{ $publication->link }}" rel="nofollow" target="_blank">Continue reading +</a></div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="see-all-publications text-center">
                        <a href="{{route('press-center', ['page' => 1])}}" class="white-blue-rounded-btn">SEE ALL</a>
                    </div>
                    @if($mobile) <div class="clearfix"></div> @endif
                    <figure class="logo-over-line" itemscope="" itemtype="http://schema.org/ImageObject">
                        @if($mobile)
                            <div class="mobile-vertical-line-50"></div>
                        @endif
                        <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                    </figure>
                </div>
            </div>
        </section>
        <section class="roadmap">
            <div class="container">
                <div class="first-dot inline-block">&nbsp;</div>
                <div class="second-dot inline-block">&nbsp;</div>
                <div class="row">
                    <div class="col-xs-12 section-title">{!! $titles[4]->html !!}</div>
                </div>
            </div>
        </section>
        <section class="roadmap-timeline">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 gif">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/roadmap.gif') }}" data-gif="{{URL::asset('assets/images/roadmap.gif') }}" data-svg="{{URL::asset('assets/images/roadmap.svg') }}" class="refresh-image desktop-image" itemprop="contentUrl" alt="Roadmap timeline"/>
                            <div class="first-dot inline-block">&nbsp;</div>
                        </figure>
                    </div>
                    <div class="roadmap-content col-xs-12 fs-0">
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/roadmap-circle-2017-quarter-1.svg') }}" itemprop="contentUrl" alt="Roadmap 2017 Quarter 1"/>
                                </figure>
                            @endif
                            {!! $sections[8]->html !!}
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/roadmap-circle-2017-quarter-3.svg') }}" itemprop="contentUrl" alt="Roadmap 2017 Quarter 3"/>
                                </figure>
                            @endif
                            {!! $sections[9]->html !!}
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/roadmap-circle-2017-quarter-4.svg') }}" itemprop="contentUrl" alt="Roadmap 2017 Quarter 4"/>
                                </figure>
                            @endif
                            {!! $sections[10]->html !!}
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/roadmap-circle-2018.svg') }}" itemprop="contentUrl" alt="Roadmap 2018"/>
                                </figure>
                            @endif
                            {!! $sections[11]->html !!}
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/roadmap-circle-2019.svg') }}" itemprop="contentUrl" alt="Roadmap 2019"/>
                                </figure>
                            @endif
                            {!! $sections[12]->html !!}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="below-roadmap-timeline">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 wrapper text-center">
                        <div class="figure-wrapper">
                            <div class="first-dot inline-block">&nbsp;</div>
                            <figure class="logo-over-line inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                @if($mobile)
                                    <div class="mobile-vertical-line-50"></div>
                                @endif
                                <img src="{{DEFAULT_IMG_ON_LOAD}}" data-defer-src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                                <div class="second-dot inline-block">&nbsp;</div>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection