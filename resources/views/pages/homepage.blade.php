@extends("layout")
@section("content")
    <div class="homepage-container @if($mobile) mobile @endif">
        <section class="intro fullpage-section one" data-section="one">
            <div class="bg-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 btn-container">
                            <div class="inline-block btn-and-line">
                                <a href="javascript:void(0)" class="white-black-btn visibility-hidden" tabindex="-1">JOIN US</a>
                                <span class="first-dot custom-dot">&nbsp;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container content-wrapper">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                            <h1 class="title">DENTACOIN</h1>
                            <h3 class="subtitle">The Blockchain Solution for the Global Dental Industry</h3>
                            <div class="description italic">“Sick Care is the plaque of the century. <br> <b>4,000+ dentists</b> are shifting the paradigm towards a Health system that Cares.”</div>
                            <div class="description">Secure Blockchain infrastructure, patient-centered care and intelligent prevention used jointly to improve long-term health, reduce costs and pain and ensure mutual benefits.</div>
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
                                            <source src="{{URL::asset('assets/videos/dentacoin-introduction.mp4') }}" type="video/mp4">
                                            <track src="{{URL::asset('assets/videos/dentacoin-introduction.vtt') }}" kind="captions" srclang="en" label="English" default="">
                                            Your browser does not support HTML5 video.
                                        </video>
                                        <meta itemprop="name" content="Dentacoin Introduction Video">
                                        <meta itemprop="description" content="Explainer video: Dentacoin, the Blockchain Solution for the Global Dentistry">
                                        <meta itemprop="uploadDate" content="2017-03-20T08:00:00+08:00">
                                        <link itemprop="thumbnailUrl" href="{{URL::asset('assets/uploads/dentacoin-video-thumb.jpg') }}">
                                        <link itemprop="contentURL" href="{{URL::asset('assets/videos/dentacoin-introduction.mp4') }}">
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
        <section class="dentacoin-ecosystem fullpage-section two" data-section="two">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 btn-container">
                        <div class="inline-block btn-and-line">
                            <a href="" class="white-blue-btn visibility-hidden">JOIN US</a>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="rotated-text"><span>DENTACOIN ECOSYSTEM</span></h3>
            <div class="container list">
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                        <div class="container-fluid">
                            <div class="row fs-0">
                                @foreach($applications as $application)
                                    <button class="col-md-3 col-xs-4 inline-block-top single-application">
                                        <figure class="wrapper" @if($application->media) data-image="{{URL::asset('assets/uploads/'.$application->media->name) }}" data-image-alt="@if($application->media->alt){{$application->media->alt}}@endif" @endif @if($application->popup_logo) data-popup-logo="{{URL::asset('assets/uploads/'.$application->popup_logo->name) }}" data-popup-logo-alt="@if($application->popup_logo->alt){{$application->popup_logo->alt}}@endif" @endif @if($application->text) data-description="{{ json_encode($application->text) }}" @endif  @if($application->slug == 'blog') data-articles="{{json_encode($latest_blog_articles)}}" @endif itemscope="" data-slug="{{$application->slug}}" itemtype="http://schema.org/ImageObject">
                                            @if($application->logo)
                                                <img src="{{URL::asset('assets/uploads/'.$application->logo->name) }}" itemprop="contentUrl" @if(!empty($application->logo->alt)) alt="{{$application->logo->alt}}" @endif/>
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
                        <figure class="logo-over-line" itemscope="" itemtype="http://schema.org/ImageObject">
                            @if($mobile)
                                <div class="mobile-vertical-line-50"></div>
                            @endif
                            <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                        </figure>
                    </div>
                </div>
                <div class="row">
                    <h2 class="col-xs-12 section-title">Building Successful Patient-Driven Dental Practices</h2>
                </div>
                <div class="row content flex">
                    <div class="col-xs-12 col-md-5 col-md-offset-2 content-container">
                        <h2 class="section-subtitle">Moving From Sick Care to Preventive Care</h2>
                        <div class="description">The new generation of Dentacoin dentists brings patients back into focus by promoting intelligent prevention, implementing dedicated Blockchain-based software solutions and using an industry-specific cryptocurrency.</div>
                        <div class="btn-container"><a href="https://dentists.dentacoin.com/" target="_blank" class="white-blue-rounded-btn">I’M A DENTIST</a></div>
                    </div>
                    <figure class="col-xs-12 col-md-5" itemscope="" itemtype="http://schema.org/ImageObject">
                        <div class="fourth-dot inline-block">&nbsp;</div>
                        <div class="fifth-dot inline-block">&nbsp;</div>
                        <img src="{{URL::asset('assets/images/animation-chair-left-to-right-smooth.gif') }}" data-svg="{{URL::asset('assets/images/chair.svg') }}" data-gif="{{URL::asset('assets/images/animation-chair-left-to-right-smooth.gif') }}" alt="Dental chair icon" class="refresh-image desktop-image" itemprop="contentUrl"/>
                        <img src="{{URL::asset('assets/images/chair-mobile.svg') }}" alt="Dental chair icon" class="mobile-image" itemprop="contentUrl"/>
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
                        <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                    </figure>
                    <div class="col-xs-12 section-title">GLOBAL DENTACOIN NETWORK</div>
                </div>
                <div class="row flex">
                    <div class="col-md-7 col-xs-8 col-xs-offset-2 col-md-offset-0 description-over-line">
                        <div class="wrapper">
                            <div class="first-dot inline-block">&nbsp;</div>
                            <div class="second-dot inline-block">&nbsp;</div>
                            <div class="description inline-block"><div class="wrapper visibility-hidden">Dental practices, labs, shops in <span>16 Countries</span> accept payments in Dentacoin</div></div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-5 cells no-gutter-xs">
                        <div class="between-sections-description visibility-hidden inline-block-top">
                            <div class="title">60K+</div>
                            <div class="description">Users of the Dentacoin tools</div>
                        </div>
                        <div class="between-sections-description visibility-hidden inline-block-top">
                            <div class="title">4K+</div>
                            <div class="description">Dentists in the Dentacoin Ecosystem</div>
                        </div>
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
                                    <figure class="start" itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/quote-left.svg') }}" alt="Quote left" itemprop="contentUrl"/></figure>
                                    {{$testimonial->text}}
                                    <figure class="end" itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/quote-right.svg') }}" alt="Quote right" itemprop="contentUrl"/></figure>
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
                                <div class="title">32K+</div>
                                <div class="description">Dentacoin (DCN) <br> Token Holders Globally</div>
                            </div>
                            <div class="between-sections-description inline-block-top">
                                <div class="title">140K+</div>
                                <div class="description">Transactions With Dentacoin (DCN) Tokens</div>
                            </div>
                        </div>
                    @endif
                    <div class="col-xs-12 below-expressions">
                        <div class="show-more">
                            <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject"><a href="{{ route('testimonials', ['page' => 1]) }}"><img src="{{URL::asset('assets/images/plus-solid.svg') }}" itemprop="contentUrl" alt="Plus icon"/></a></figure>
                            <p class="inline-block">Show 100 more quotes</p>
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
                        <img src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                    </figure>
                    <div class="col-xs-12">
                        <div class="first-dot inline-block">&nbsp;</div>
                    </div>
                </div>
                <div class="row">
                    <h2 class="col-xs-12 section-title">BUY & STORE DENTACOIN</h2>
                </div>
                <div class="row wallet-app-and-gif">
                    <div class="fifth-dot inline-block">&nbsp;</div>
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-5 col-md-offset-1 wallet-app inline-block-top">
                        <h2 class="section-subtitle">Available Options</h2>
                        <div class="description">Dentacoin (DCN) is available for purchase with a card through Changelly, as well as against 100+ other cryptocurrencies. It is also supported by trusted exchange platforms and wallets listed below:</div>
                        <div class="exchange-platforms-and-wallets">
                            <div class="exchange-platforms exchange-method inline-block-top">
                                <button class="title"><div class="icon inline-block"></div><span class="inline-block">Exchange Platforms</span></button>
                                <ul class="list">
                                    <li><a href="https://hitbtc.com/DCN-to-BTC" target="_blank">HitBTC</a></li>
                                    <li><a href="https://www.cryptopia.co.nz/Exchange/?market=DCN_BTC" target="_blank">Cryptopia</a></li>
                                    <li><a href="https://www.coinexchange.io/market/DCN/BTC" target="_blank">CoinExchange</a></li>
                                    <li><a href="https://mercatox.com/exchange/DCN/BTC" target="_blank">Mercatox</a></li>
                                    <li><a href="https://upcoin.com/trade/DCN-BTC" target="_blank">UPcoin</a></li>
                                    <li><a href="https://idex.market/eth/dcn" target="_blank">IDEX</a></li>
                                    <li><a href="https://etherdelta.com/#DCN-ETH" target="_blank">EtherDelta</a></li>
                                    <li><a href="https://www.buyucoin.com/trade?currency=dcn" target="_blank">BuyUcoin</a></li>
                                    <li><a href="https://www.koinok.com/exchange/DCN-INR" target="_blank">KoinOK</a></li>
                                    <li><a href="https://godex.io/" target="_blank">Godex</a></li>
                                    <li><a href="https://easyrabbit.net/" target="_blank">EasyRabit</a></li>
                                    <li><a href="https://changenow.io/" target="_blank">ChangeNOW</a></li>
                                </ul>
                            </div>
                            <div class="wallets exchange-method inline-block-top">
                                <button class="title"><div class="icon inline-block"></div><span class="inline-block">Wallets</span></button>
                                <ul class="list">
                                    <li><a href="https://jaxx.io/" target="_blank">Jaxx</a></li>
                                    <li><a href="https://mycrypto.com/account" target="_blank">MyCrypto</a></li>
                                    <li><a href="https://www.myetherwallet.com/" target="_blank">MyEtherWallet</a></li>
                                    <li><a href="https://metamask.io/" target="_blank">MetaMask</a></li>
                                    <li><a href="https://token.im/" target="_blank">imToken</a></li>
                                    <li><a href="https://coinomi.com/" target="_blank">Coinomi</a></li>
                                    <li><a href="https://www.exodus.io/" target="_blank">Exodus</a></li>
                                    <li><a href="https://lumiwallet.com/?pid=Tokenreferral&c=token&af_sub1=DCNE" target="_blank">Lumi Wallet</a></li>
                                    <li><a href="https://atomicwallet.io/" target="_blank">Atomic Wallet</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="buy-btn"><a href="{{ route('changelly') }}" class="white-blue-rounded-btn">BUY WITH CHANGELLY</a></div>
                    </div>
                    <div class="col-xs-12 col-md-5 col-md-offset-1 gif inline-block-top">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/images/animation-hand-with-credit-card.gif') }}" data-svg="{{URL::asset('assets/images/hand-with-credit-card.svg') }}" data-gif="{{URL::asset('assets/images/animation-hand-with-credit-card.gif') }}" alt="Hand holding credit card icon" class="refresh-image desktop-image" itemprop="contentUrl"/>
                            <img src="{{URL::asset('assets/images/hand-with-credit-card-mobile.svg') }}" alt="Hand holding credit card icon" class="mobile-image" itemprop="contentUrl"/>
                            <div class="second-dot inline-block">&nbsp;</div>
                            <div class="third-dot inline-block">&nbsp;</div>
                        </figure>
                        <div class="between-sections-description visibility-hidden">
                            <div class="title">32K+</div>
                            <div class="description">Dentacoin (DCN) <br> Token Holders Globally</div>
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
                    <img src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                </figure>
                <div class="first-dot inline-block">&nbsp;</div>
                <div class="second-dot inline-block">&nbsp;</div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="between-sections-description visibility-hidden">
                            <div class="title">140K+</div>
                            <div class="description">Transactions With Dentacoin (DCN) Tokens</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="awards-and-publications">
            <div class="container">
                <div class="row">
                    <h2 class="col-xs-12 section-title">AWARDS & PUBLICATIONS</h2>
                </div>
                <div class="row awards">
                    <h2 class="col-xs-12 col-sm-10 col-sm-offset-1">
                        <div class="container-fluid">
                            <div class="row fs-0">
                                <figure class="col-xs-12 col-sm-4 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/corporate-excellence-awards-2018.jpg') }}" itemprop="contentUrl" alt="Corporate excellence awards 2018"/>
                                </figure>
                                <figure class="col-xs-12 col-sm-4 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/20-most-promising-blockchain-technology-solution.jpg') }}" itemprop="contentUrl" alt="20 most promising blockchain technology solutions"/>
                                </figure>
                                <figure class="col-xs-12 col-sm-4 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/50-most-valuable-brands-of-the-year.jpg') }}" itemprop="contentUrl" alt="50 most valuable brands of the year"/>
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
                                            <img src="{{URL::asset('assets/uploads/' . $publication->media->name)}}" itemprop="contentUrl" @if(!empty($publication->media->alt)) alt="{{$publication->media->alt}}" @endif/>
                                        </figure>
                                    @endif
                                    <div class="headline">{{$publication->headline}}</div>
                                    <div class="description">{{$publication->text}}</div>
                                    <div class="btn-container"><a href="{{ $publication->link }}" rel="nofollow" target="_blank">Continue reading +</a></div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    @if($mobile) <div class="clearfix"></div> @endif
                    <figure class="logo-over-line" itemscope="" itemtype="http://schema.org/ImageObject">
                        @if($mobile)
                            <div class="mobile-vertical-line-50"></div>
                        @endif
                        <img src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                    </figure>
                </div>
            </div>
        </section>
        <section class="roadmap">
            <div class="container">
                <div class="first-dot inline-block">&nbsp;</div>
                <div class="second-dot inline-block">&nbsp;</div>
                <div class="row">
                    <div class="col-xs-12 section-title">ROADMAP</div>
                </div>
            </div>
        </section>
        <section class="roadmap-timeline">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 gif">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/images/roadmap.gif') }}" data-gif="{{URL::asset('assets/images/roadmap.gif') }}"  data-svg="{{URL::asset('assets/images/roadmap.svg') }}" class="refresh-image desktop-image" itemprop="contentUrl" alt="Roadmap timeline"/>
                            <div class="first-dot inline-block">&nbsp;</div>
                        </figure>
                    </div>
                    <div class="roadmap-content col-xs-12 fs-0">
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/roadmap-circle-2017-quarter-1.svg') }}" itemprop="contentUrl" alt="Roadmap 2017 Quarter 1"/>
                                </figure>
                            @endif
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.1 Dentacoin ERC20 Token Released</div>
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.2 Dentacoin Foundation Established</div>
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/roadmap-circle-2017-quarter-3.svg') }}" itemprop="contentUrl" alt="Roadmap 2017 Quarter 3"/>
                                </figure>
                            @endif
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.3 Initial Public Presale (16.2 Bill DCN, 8 000 Contributors)</div>
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.4 Trusted Reviews Release</div>
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/roadmap-circle-2017-quarter-4.svg') }}" itemprop="contentUrl" alt="Roadmap 2017 Quarter 4"/>
                                </figure>
                            @endif
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.5 Initial Coin Offering (17.9 Bill DCN, 10 000 Contributors)</div>
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.6 DentaVox Release</div>
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.7 DentaCare Mobile App</div>
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/roadmap-circle-2018.svg') }}" itemprop="contentUrl" alt="Roadmap 2018"/>
                                </figure>
                            @endif
                            <div><i class="fa fa-check-circle" aria-hidden="true"></i>V.0.8 Dentacoin Integrated Hub Release</div>
                            <div>- V.0.9 Dentacoin Assurance</div>
                        </div>
                        <div class="roadmap-cell inline-block-top">
                            @if($mobile)
                                <figure class="mobile-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/roadmap-circle-2019.svg') }}" itemprop="contentUrl" alt="Roadmap 2019"/>
                                </figure>
                            @endif
                            <div>- V.0.9 Denta Health Database</div>
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
                                <img src="{{URL::asset('assets/images/logo.svg') }}" itemprop="contentUrl" alt="Dentacoin section logo"/>
                                <div class="second-dot inline-block">&nbsp;</div>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection
