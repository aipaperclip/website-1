<section class="section-bringing-blockchain-solutions-trader-page">
    <div class="absolute-content padding-bottom-50 padding-bottom-xs-5 text-center-xs">
        <h2 class="fs-46 fs-md-40 fs-sm-30 color-white lato-black users-title padding-bottom-lgll-20 hide-xs">TRADERS</h2>
        <h3 class="fs-46 fs-md-40 fs-sm-30 fs-xs-22 lato-black color-white padding-top-10 padding-bottom-25">Bringing<br class="hide-xs"> Blockchain<br class="show-xs"> solutions<br class="hide-xs"> to the masses.</h3>
        <div class="fs-24 fs-md-22 fs-sm-18 fs-xs-18 color-white lato-bold">Join 201,326 people who care about sustainable oral health and capitalize on prevention!</div>
    </div>
    @php ($webmVideoUrl = 'traders-page-monitors-animation.webm')
    @php ($mp4VideoUrl = 'traders-page-monitors-animation.mp4')
    @if (isset($mobile_device) && $mobile_device)
        @php ($webmVideoUrl = 'traders-page-monitors-animation-mobile.webm')
        @php ($mp4VideoUrl = 'traders-page-monitors-animation-mobile.mp4')
    @endif
    @php($arrWithPossibilities = array ('male', 'female'))
    @if ($arrWithPossibilities[rand(0, count($arrWithPossibilities) - 1)] == 'male')
        <div class="hidden-picture padding-top-xs-40">
            <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="changeable-video trader-animated-background" data-mp4="https://dentacoin.com/assets/uploads/{{$mp4VideoUrl}}" data-webm="https://dentacoin.com/assets/uploads/{{$webmVideoUrl}}" data-video-attributes="autoplay muted loop" data-video-class="width-100">
                <meta itemprop="name" content="Dentacoin traders page animation">
                <meta itemprop="description" content="Dentacoin traders page first view animated monitors background">
                <meta itemprop="uploadDate" content="2020-10-14T08:00:00+08:00">
                <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/{{$mp4VideoUrl}}">
            </div>
            <picture itemscope="" itemtype="http://schema.org/ImageObject" class="trader">
                <source media="(max-width: 992px)" srcset="/assets/uploads/man-trader-mobile-img.png">
                <img alt="Male dentacoin trader" class="width-100" itemprop="contentUrl" src="/assets/uploads/man-trader-img.png"/>
            </picture>
        </div>
    @else
        <div class="hidden-picture padding-top-xs-40">
            <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="changeable-video trader-animated-background" data-mp4="https://dentacoin.com/assets/uploads/{{$mp4VideoUrl}}" data-webm="https://dentacoin.com/assets/uploads/{{$webmVideoUrl}}" data-video-attributes="autoplay muted loop" data-video-class="width-100">
                <meta itemprop="name" content="Dentacoin traders page animation">
                <meta itemprop="description" content="Dentacoin traders page first view animated monitors background">
                <meta itemprop="uploadDate" content="2020-10-14T08:00:00+08:00">
                <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/{{$mp4VideoUrl}}">
            </div>
            <picture itemscope="" itemtype="http://schema.org/ImageObject" class="trader">
                <source media="(max-width: 992px)" srcset="/assets/uploads/woman-trader-mobile-img.png">
                <img alt="Female dentacoin trader" class="width-100" itemprop="contentUrl" src="/assets/uploads/woman-trader-img.png"/>
            </picture>
        </div>
    @endif
</section>
@if (!empty($exchange_platforms))
    <section class="section-exchange-platforms padding-top-30 padding-bottom-50">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 padding-bottom-50 text-center color-black">
                    <h2 class="lato-bold fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10">TRADE DENTACOIN:</h2>
                    <h3 class="lato-black fs-50 fs-sm-40 fs-xs-26 fs-lgll-65">EXCHANGE PLATFORMS:</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 exchanges-container @if($mobile_device) mobile-exchanges @endif padding-left-50 padding-right-50 padding-left-xs-15 padding-right-xs-15">
                    @php($bulletsArray = array())
                    @if($mobile_device)
                        <div class="slider-row padding-left-15 padding-right-15">
                        @php($exchangeCounter = 0)
                        @php($showOnce = true)
                        @foreach ($exchange_platforms as $exchange_platform)
                            @php($exchangeCounter = $exchangeCounter + 1)
                            @if ($showOnce)
                                @php($showOnce = false)
                                <div class="mobile-extra-row active row fs-0" data-bullet="{{$exchangeCounter}}">
                                    @php(array_push($bulletsArray, $exchangeCounter))
                                    @endif
                                    <div class="col-xs-6 inline-block-top single-exchange padding-bottom-30 padding-left-10 padding-right-10" data-exchange-name="{{$exchange_platform->title}}">
                                        <a href="{{$exchange_platform->link}}" target="_blank"
                                           class="exchange-link text-center lato-bold display-block padding-bottom-10 traders-page-exchange-click-gtag-event">
                                            @if($exchange_platform->media) <img
                                                    data-defer-src="{{URL::asset('assets/uploads/' . $exchange_platform->media->name) }}"
                                                    alt="{{$exchange_platform->media->alt}}"
                                                    class="inline-block"/> @endif
                                            <span class="inline-block padding-left-5 fs-18">{{$exchange_platform->title}}</span>
                                        </a>
                                        @php($pairs = \App\ExchangePair::where(array('exchange_id' => $exchange_platform->id))->get()->sortBy('order_id'))
                                        @if(sizeof($pairs) > 0)
                                            <ul class="lato-semibold fs-18 fs-xs-16 padding-top-10">
                                                @foreach($pairs as $pair)
                                                    <li class="padding-bottom-5"><a href="{{$pair->url}}" target="_blank" class="display-block padding-left-15 padding-right-15 padding-left-xs-10 padding-right-xs-10 traders-page-exchange-pair-click-gtag-event">{{$pair->title}}</a>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        @endif
                                    </div>
                                    @if(sizeof($exchange_platforms) == $exchangeCounter)
                                </div>
                            @else
                                @if ($exchangeCounter % 4 == 0)
                </div>
                @if(sizeof($exchange_platforms) != $exchangeCounter)
                    <div class="mobile-extra-row fs-0" data-bullet="{{$exchangeCounter}}">
                        @php(array_push($bulletsArray, $exchangeCounter))
                        @endif
                        @endif
                        @endif
                        @endforeach
                    </div>
                    @else
                        <div class="row fs-0">
                            @php($exchangeCounter = 0)
                            @foreach ($exchange_platforms as $exchange_platform)
                                @php($exchangeCounter = $exchangeCounter + 1)
                                <div class="col-xs-6 col-md-4 col-lg-2 inline-block-top padding-bottom-50 padding-bottom-xs-30 single-exchange" data-exchange-name="{{$exchange_platform->title}}">
                                    <a href="{{$exchange_platform->link}}" target="_blank" class="exchange-link text-center lato-bold display-block padding-bottom-10 traders-page-exchange-click-gtag-event">
                                        @if($exchange_platform->media) <img data-defer-src="{{URL::asset('assets/uploads/' . $exchange_platform->media->name) }}" alt="{{$exchange_platform->media->alt}}" class="inline-block"/> @endif
                                        <span class="inline-block padding-left-5 fs-18">{{$exchange_platform->title}}</span>
                                    </a>
                                    @php($pairs = \App\ExchangePair::where(array('exchange_id' => $exchange_platform->id))->get()->sortBy('order_id'))
                                    @if(sizeof($pairs) > 0)
                                        <ul class="lato-semibold fs-16 padding-top-10">
                                            @foreach($pairs as $pair)
                                                <li class="padding-bottom-5"><a href="{{$pair->url}}" target="_blank" class="display-block padding-left-15 padding-right-15 traders-page-exchange-pair-click-gtag-event">{{$pair->title}}</a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </div>
                            @endforeach
                        </div>
                    @endif
                    </div>
                    {{--@if($mobile_device && sizeof($bulletsArray) > 0)
                        <div class="exchanges-bullets padding-top-10 padding-bottom-15">
                            @php($addClassActive = true)
                            @foreach ($bulletsArray as $bullet)
                                <a href="javascript:void(0);" data-bullet="{{$bullet}}" class="inline-block @if($addClassActive) @php($addClassActive = false) active @endif"></a>
                            @endforeach
                        </div>
                    @endif--}}
            </div>
            <div class="row disclaimer padding-top-25">
                <div class="col-xs-12 text-center color-black fs-16">
                    <div class="inline-block padding-left-60 padding-left-xs-0 padding-top-xs-60 text-content text-left">
                        <div><span class="lato-black">Disclaimer</span>: Exchange platforms are third parties. Choose
                            where to trade at your own risk.
                        </div>
                        <div>And remember: It is always better to store your DCN tokens in a wallet where you own your
                            private key.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endif
<section
        class="section-rules-and-figures container-fluid padding-top-lgll-80 padding-top-30 padding-bottom-30 padding-left-50 padding-right-50">
    <div class="row">
        <div class="col-xs-12 color-black text-center padding-bottom-70 padding-bottom-xs-30">
            <h2 class="lato-bold fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10">RULES AND FIGURES:</h2>
            <h3 class="lato-black fs-50 fs-sm-40 fs-xs-26 fs-lgll-65">DENTACOIN SUPPLY</h3>
        </div>
    </div>
    <div class="row fs-0">
        <div class="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1 padding-bottom-50">
            <figure class="max-width-60 inline-block-top" itemscope="" itemtype="http://schema.org/ImageObject">
                <img alt="Max supply icon" itemprop="contentUrl" class="width-100"
                     data-defer-src="/assets/uploads/max-supply-icon.svg"/>
            </figure>
            <div class="right-to-image inline-block-top padding-left-15 padding-left-xs-0 padding-left-sm-0 lato-bold">
                <h4 class="fs-28 fs-xs-22 color-black">Max supply:</h4>
                <div class="fs-36 fs-xs-24">{{$max_supply->data}} DCN</div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6 col-lg-5 padding-bottom-50">
            <figure class="max-width-60 inline-block-top" itemscope="" itemtype="http://schema.org/ImageObject">
                <img alt="Unlocked supply icon" itemprop="contentUrl" class="width-100"
                     data-defer-src="/assets/uploads/total-unlocked-icon.svg"/>
            </figure>
            <div class="right-to-image inline-block-top padding-left-15 padding-left-xs-0 padding-left-sm-0 lato-bold">
                <h4 class="fs-28 fs-xs-22 color-black">Total unlocked:</h4>
                <div class="fs-36 fs-xs-24">{{$total_supply->data}} DCN</div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6 col-lg-5 col-lg-offset-1 padding-bottom-50">
            <figure class="max-width-60 inline-block-top" itemscope="" itemtype="http://schema.org/ImageObject">
                <img alt="Locked supply icon" itemprop="contentUrl" class="width-100"
                     data-defer-src="/assets/uploads/locked-icon.svg"/>
            </figure>
            <div class="right-to-image inline-block-top padding-left-15 padding-left-xs-0 padding-left-sm-0 lato-bold">
                <h4 class="fs-28 fs-xs-22 color-black padding-bottom-10">Partly Locked:</h4>
                <div class="fs-20 fs-xs-18 lato-regular">Approx. 70% of the total supply is locked in TimeLock contracts and is
                    being released in minor parts at the beginning of each year.
                    <div><a href="https://github.com/Dentacoin/ERC20-token/blob/master/DCN%20time%20lock/DCN%20TimeLock%20addresses.pdf" target="_blank" class="lato-bold color-bright-blue">See all TimeLock contract addresses.</a></div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6 col-lg-5 padding-bottom-50">
            <figure class="max-width-60 inline-block-top" itemscope="" itemtype="http://schema.org/ImageObject">
                <img alt="Coin burn icon" itemprop="contentUrl" class="width-100"
                     data-defer-src="/assets/uploads/burned-icon.svg"/>
            </figure>
            <div class="right-to-image inline-block-top padding-left-15 lato-bold">
                <h4 class="fs-28 fs-xs-22 color-black padding-bottom-10">Coin Burn Sessions:</h4>
                <div class="fs-20 fs-xs-18 lato-regular">The excessive amount of DCN supply is being gradually burned to destroy
                    the coins that are not demanded.
                    <div><a href="https://etherscan.io/token/0x08d32b0da63e2c3bcf8019c9c5d849d7a9d791e6?a=0x000000000000000000000000000000000000dead" target="_blank" class="lato-bold color-bright-blue">See all coin burn sessions.</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section-everything-you-need-to-know container padding-top-30 padding-top-lgll-80 padding-bottom-30">
    <div class="row">
        <div class="col-xs-12 color-black text-center padding-bottom-30 padding-bottom-lgll-60">
            <h2 class="lato-bold fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10">EVERYTHING YOU</h2>
            <h3 class="lato-black fs-50 fs-sm-40 fs-xs-26 fs-lgll-65">NEED TO KNOW</h3>
        </div>
    </div>
    <div class="row middle-animated-subsection padding-top-20 padding-bottom-20">
        <figure class="left-animated-border" itemscope="" itemtype="http://schema.org/ImageObject">
            <img alt="Animated border" itemprop="contentUrl" data-defer-src="/assets/uploads/left-animated-border.svg"/>
        </figure>
        <figure class="right-animated-border" itemscope="" itemtype="http://schema.org/ImageObject">
            <img alt="Animated border" itemprop="contentUrl" data-defer-src="/assets/uploads/right-animated-border.svg"/>
        </figure>
        <div class="col-xs-12 col-lg-10 col-lg-offset-1">
            <div class="animation-wrapper">
                <div class="padding-bottom-15 myth">
                    <span class="question inline-block lato-black text-center">?</span>
                    <span class="label-tag inline-block color-white fs-42 fs-md-34 fs-sm-32 fs-xs-26 lato-bold">Myth:</span>
                    <span class="label-value padding-left-20 inline-block fs-42 fs-md-34 fs-sm-32 fs-xs-24 lato-bold">It is for dentists only.</span>
                </div>
                <div class="padding-bottom-15 fact">
                    <span class="question inline-block lato-black text-center">!</span>
                    <span class="label-tag inline-block color-white fs-42 fs-md-34 fs-sm-32 fs-xs-26 lato-bold">Fact:</span>
                    <span class="label-value padding-left-20 inline-block fs-42 fs-md-34 fs-sm-32 fs-xs-24 lato-bold">It is for everyone.</span>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 fs-22 fs-xs-18 padding-bottom-40">
            Dentacoin’s target audience extends far beyond the narrow blockchain community, creating a solid bridge
            towards everyday life and existing business environments.
        </div>
    </div>
    <div class="row text-center links padding-top-50 padding-top-lgll-70">
        <div class="col-xs-12 col-sm-4 padding-top-15 padding-bottom-15 single-link @if (isset($mobile_device) && !$mobile_device) allow-hover @endif">
            <a href="//dentacoin.com/assets/uploads/dentacoin-company-introduction.pdf" target="_blank" class="display-block color-black traders-page-dentacoin-intro-click-gtag-event">
                @if (isset($mobile_device) && !$mobile_device)
                    <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="changeable-video video-version fs-0 width-100 max-width-100" data-mp4="https://dentacoin.com/assets/uploads/dentacoin-info-icon-animation.mp4" data-webm="https://dentacoin.com/assets/uploads/dentacoin-info-icon-animation.webm" data-video-attributes="autoplay muted loop" data-video-class="width-100">
                        <meta itemprop="name" content="Dentacoin info">
                        <meta itemprop="description" content="Dentacoin info animated icon">
                        <meta itemprop="uploadDate" content="2020-10-14T08:00:00+08:00">
                        <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                        <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/dentacoin-info-icon-animation.webm">
                    </div>
                @endif
                <figure class="width-100 max-width-100 image-version" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img alt="Dentacoin image icon" itemprop="contentUrl" class="width-100" data-defer-src="/assets/uploads/dcn-info-icon-animation.png"/>
                </figure>
                <div class="lato-bold fs-20 padding-top-10">Dentacoin Intro</div>
            </a>
        </div>
        <div class="col-xs-12 col-sm-4 padding-top-15 padding-bottom-15 single-link @if (isset($mobile_device) && !$mobile_device) allow-hover @endif">
            <a href="https://dentacoin.com/assets/uploads/whitepaper.pdf" target="_blank"
               class="display-block color-black traders-page-whitepaper-click-gtag-event">
                @if (isset($mobile_device) && !$mobile_device)
                    <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="changeable-video video-version fs-0 width-100 max-width-100" data-mp4="https://dentacoin.com/assets/uploads/dentacoin-whitepaper-icon-animation.mp4" data-webm="https://dentacoin.com/assets/uploads/dentacoin-whitepaper-icon-animation.webm" data-video-attributes="autoplay muted loop" data-video-class="width-100">
                        <meta itemprop="name" content="Dentacoin whitepaper">
                        <meta itemprop="description" content="Dentacoin whitepaper animated icon">
                        <meta itemprop="uploadDate" content="2020-10-14T08:00:00+08:00">
                        <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                        <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/dentacoin-whitepaper-icon-animation.webm">
                    </div>
                @endif
                <figure class="width-100 max-width-100 image-version" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img alt="Whitepaper image icon" itemprop="contentUrl" class="width-100" data-defer-src="/assets/uploads/dcn-whitepaper-icon-animation.png"/>
                </figure>
                <div class="lato-bold fs-20 padding-top-10">Dentacoin Whitepaper</div>
            </a>
        </div>
        <div class="col-xs-12 col-sm-4 padding-top-15 padding-bottom-15 single-link @if (isset($mobile_device) && !$mobile_device) allow-hover @endif">
            <a href="https://coinmarketcap.com/currencies/dentacoin/" target="_blank" class="display-block color-black traders-page-cmc-click-gtag-event">
                @if (isset($mobile_device) && !$mobile_device)
                    <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="changeable-video video-version fs-0 width-100 max-width-100" data-mp4="https://dentacoin.com/assets/uploads/cmc-icon-animation.mp4" data-webm="https://dentacoin.com/assets/uploads/cmc-icon-animation.webm" data-video-attributes="autoplay muted loop" data-video-class="width-100">
                        <meta itemprop="name" content="Dentacoin CoinMarketCap">
                        <meta itemprop="description" content="Dentacoin CoinMarketCap animated icon">
                        <meta itemprop="uploadDate" content="2020-10-14T08:00:00+08:00">
                        <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                        <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/cmc-icon-animation.webm">
                    </div>
                @endif
                <figure class="width-100 max-width-100 image-version" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img alt="CoinMarketCap image icon" itemprop="contentUrl" class="width-100" data-defer-src="/assets/uploads/cmc-icon-animation.png"/>
                </figure>
                <div class="lato-bold fs-20 padding-top-10">CoinMarketCap</div>
            </a>
        </div>
    </div>
</section>
@if (!empty($roadmap_years))
    <section class="section-dentacoin-roadmap padding-top-80 padding-top-xs-20 padding-top-lgll-110 padding-bottom-30">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 color-black text-center padding-bottom-30 padding-bottom-xs-10">
                    <h2 class="lato-bold fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10">WHAT'S THE PLAN:</h2>
                    <h3 class="lato-black fs-50 fs-sm-40 fs-xs-26 fs-lgll-65">DENTACOIN ROADMAP</h3>
                </div>
            </div>
        </div>
        <div class="container-fluid years-line padding-top-20 padding-bottom-20">
            <div class="row">
                <div class="col-xs-12 padding-left-xs-5 padding-right-xs-5 text-center fs-0 years-wrapper">
                    @foreach ($roadmap_years as $roadmap_year)
                        @php($roadmap_year['roadmap_year_events'] = (new \App\Http\Controllers\Admin\RoadmapController())->getRoadmapEvents($roadmap_year->id))
                        <a href="javascript:void(0);" data-year="{{$roadmap_year->year}}"
                           class="lato-bold inline-block fs-20 fs-xs-16 @if($roadmap_year->year == date('Y')) active @endif">{{$roadmap_year->year}}</a>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-lg-7 col-lg-offset-2 padding-bottom-30 padding-top-lgll-20 padding-left-xs-10 padding-right-xs-10">
                    @foreach ($roadmap_years as $roadmap_year)
                        @if (!empty($roadmap_year['roadmap_year_events']))
                            <div class="single-year-content @if($roadmap_year->year == date('Y')) active @endif"
                                 data-year="{{$roadmap_year->year}}">
                                <ul>
                                    @foreach ($roadmap_year['roadmap_year_events'] as $event)
                                        <li @if(filter_var($event->bottom_border, FILTER_VALIDATE_BOOLEAN)) class="border-bottom-bright-blue" @endif>
                                            <div class="label-tag inline-block text-right fs-20 @if(filter_var($event->coin_burn, FILTER_VALIDATE_BOOLEAN)) fs-xs-15 @else fs-xs-16 @endif">
                                                <span class="label-btn"
                                                      style="background-color: {{$event->label_color}}">{{$event->label}}</span>
                                            </div>
                                            <div class="title inline-block padding-left-10 padding-right-10 padding-right-xs-0 fs-20 fs-xs-16">
                                                @if(filter_var($event->coin_burn, FILTER_VALIDATE_BOOLEAN))
                                                    <svg version="1.1" id="Layer_1" xmlns:x="&amp;ns_extend;"
                                                         xmlns:i="&amp;ns_ai;" xmlns:graph="&amp;ns_graphs;"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                         viewBox="0 0 69.8 85.2"
                                                         xml:space="preserve"><metadata>
                                                            <sfw xmlns="&amp;ns_sfw;">
                                                                <slices></slices>
                                                                <slicesourcebounds bottomleftorigin="true" height="85.2"
                                                                                   width="69.8" x="11.8"
                                                                                   y="31.1"></slicesourcebounds>
                                                            </sfw>
                                                        </metadata>
                                                        <g>
                                                            <path style="fill:none;"
                                                                  d="M43.4,42.2c-1.7,0-3,1.4-3,3.1c0,1.1,0.6,2.1,1.5,2.6v5.1c0,0.9,0.7,1.6,1.5,1.6c0.8,0,1.5-0.7,1.5-1.6v-5.1c0.9-0.5,1.5-1.5,1.5-2.6C46.5,43.6,45.1,42.2,43.4,42.2z"></path>
                                                            <path style="fill:none;"
                                                                  d="M43.4,24.9c-4,0-7.3,3.4-7.3,7.5v5.7c2.4-0.5,4.8-0.8,7.3-0.8c2.5,0,4.9,0.3,7.3,0.8v0l-1-0.3l1,0.3v-5.7C50.7,28.2,47.4,24.9,43.4,24.9z"></path>
                                                            <path style="fill:#FFFFFF;"
                                                                  d="M51.1,38.1c-2.4-0.5-4.8-0.8-7.3-0.8c-2.5,0-4.9,0.3-7.3,0.8v-5.7c0-4.1,3.3-7.5,7.3-7.5c2.4,0,4.6,1.2,6,3.2c0.4,0.6,0.6,1.2,0.9,1.8c0.3,0.7,0.6,1.7,1.4,1.9c0.7,0.2,1.6,0,2.1-0.6c0.8-0.9,0.4-2.1,0-3c-0.9-2-2.2-3.8-4-5.1c-1.9-1.4-4.1-2.1-6.4-2.1c-6.1,0-11.1,5.1-11.1,11.4v6.8c-0.6,0.2-1.1,0.4-1.7,0.6c-0.5,0.2-0.9,0.7-0.9,1.3v14.5c0,0.6,0.4,1.2,0.9,1.4c4.1,1.7,8.4,2.5,12.8,2.5c4.4,0,8.7-0.8,12.8-2.5c0.5-0.2,0.9-0.8,0.9-1.4c0,0,0-14.5,0-14.5c0-0.6-0.4-1.1-0.9-1.3c-0.2-0.1-0.5-0.2-0.7-0.3c-0.3-0.1-0.7-0.3-1-0.4l-2-0.6 M45.4,47.9v5.1c0,0.9-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5v-5.1c-0.9-0.5-1.5-1.5-1.5-2.6c0-1.7,1.4-3.1,3-3.1c1.7,0,3,1.4,3,3.1C46.9,46.4,46.2,47.4,45.4,47.9z"></path>
                                                        </g>
                                                        <path d="M51.1,31.4C49.8,19.2,38.8,4,28.8,0c1.8,9.6-2.3,21.3-15.4,39.1c0.1-1.3,0.5-8-3.2-14c1,6.8-8.5,18.8-9.9,31.1s6.8,22,19.3,29.1h0.4C10.3,72.6,23.2,53.3,32,49.3c-2.5,6.1,2.7,15.2,6.1,17.2c-1.6-5.1,0.8-7.8,2-9.1c0.7,9.8,15.4,13.1,8.2,27.2c10.7-6.3,18-16,20.7-26.1c2.7-10.3-1.7-27.8-16.4-42.5C54.2,18.4,56.1,27.5,51.1,31.4z"></path></svg>
                                                @endif
                                                {!! $event->title !!}
                                            </div>
                                            <div class="check inline-block">
                                                @if(filter_var($event->check, FILTER_VALIDATE_BOOLEAN))
                                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                        <img alt="Checked icon" itemprop="contentUrl"
                                                             class="width-100 max-width-40 max-width-xs-30"
                                                             data-defer-src="/assets/uploads/roadmap-checked-icon.svg"/>
                                                    </figure>
                                                @else
                                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                        <img alt="Unchecked icon" itemprop="contentUrl"
                                                             class="width-100 max-width-40 max-width-xs-30"
                                                             data-defer-src="/assets/uploads/roadmap-not-checked-icon.svg"/>
                                                    </figure>
                                                @endif
                                            </div>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
    </section>
@endif
<section class="section-latest-twitter-data container-fluid padding-top-50 padding-top-xs-20 padding-top-lgll-100 padding-bottom-90">
    <div class="row">
        <div class="col-xs-12 color-black text-center padding-bottom-40 padding-bottom-lgll-60">
            <h2 class="lato-bold fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10">FOLLOW US ON</h2>
            <h3 class="lato-black fs-50 fs-sm-40 fs-xs-26 fs-lgll-65">TWITTER</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 color-black tweets-iframe-container">
            <a class="twitter-timeline" href="https://twitter.com/dentacoin" data-tweet-limit="3">Tweets by @dentacoin</a>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 padding-top-40 text-center">
            <a href="https://twitter.com/dentacoin" target="_blank" class="bright-blue-white-btn">SEE MORE</a>
        </div>
    </div>
</section>
<section class="section-wallet padding-top-50 padding-bottom-70 padding-bottom-lgll-100 color-white">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2 class="lato-bold fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10 padding-bottom-5">MANAGE, SPEND,
                    RECEIVE, AND BUY DCN</h2>
                <h3 class="lato-black fs-50 fs-sm-40 fs-xs-26 fs-lgll-65">DENTACOIN WALLET</h3>
                <div class="padding-top-25 padding-top-lgll-40 padding-bottom-10 text-center">
                    <a href="https://play.google.com/store/apps/details?id=wallet.dentacoin.com" target="_blank"
                       class="inline-block padding-left-10 padding-right-10 padding-bottom-10 google-play-btn">
                        <img data-defer-src="/assets/uploads/google-play-badge.svg" class="width-100 max-width-220"
                             alt="Google Play button">
                    </a>
                    <a href="https://apps.apple.com/us/app/dentacoin-wallet/id1478732657" target="_blank"
                       class="inline-block padding-left-10 padding-right-10 padding-bottom-10 app-store-btn">
                        <img data-defer-src="/assets/uploads/app-store.svg" class="width-100 max-width-220" alt="App store button">
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-12 col-md-offset-0 padding-top-40 padding-top-xs-10">
                <figure itemscope="" itemtype="http://schema.org/ImageObject" class="laptop-phone-holder">
                    <img alt="Dentacoin wallet app on laptop" class="laptop" itemprop="contentUrl"
                         data-defer-src="/assets/uploads/laptop-wallet-app-banner.png"/>
                    <img alt="Dentacoin wallet app on phone" class="phone" itemprop="contentUrl"
                         data-defer-src="/assets/uploads/phone-wallet-app-banner.png"/>
                </figure>
            </div>
        </div>
    </div>
</section>