@extends("layout")
@section("content")
    @if(strtotime('2020/01/02 00:00:00') < time())
        <div class="christmas-calendar-not-logged challenge-passed">
            <section class="container text-center">
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="lato-black fs-38 fs-xs-25 padding-bottom-15 padding-top-15 padding-top-xs-30 max-width-600 margin-0-auto line-height-46">Dentacoin Holiday<br>CALENDAR CHALLENGE 2019 IS OVER!</h1>
                        <p class="fs-22 fs-xs-20 lato-regular padding-bottom-xs-25">We picked 9 big winners on January 10, 2020:</p>
                    </div>
                </div>
            </section>
            <section class="container-fluid text-center presents-list padding-bottom-50 padding-bottom-xs-30">
                <div class="row">
                    <div class="col-xs-12 padding-left-xs-0 padding-right-xs-0">
                        <picture itemscope="" itemtype="http://schema.org/ImageObject">
                            <source media="(max-width: 768px)" srcset="/assets/images/christmas-calendar-campaign/holiday-calendar-prizes-mobile.png" />
                            <img src="/assets/images/christmas-calendar-campaign/holiday-calendar-prizes.png" alt="Presents list" itemprop="contentUrl"/>
                        </picture>
                    </div>
                </div>
            </section>
            <section class="container tasks-section padding-top-50 padding-bottom-100 text-center">
                <div class="row">
                    <div class="col-xs-12">
                        <p class="fs-22 fs-xs-20 padding-bottom-30 lato-regular max-width-470 margin-0-auto">See the winners in our Telegram group and be the first to know about future raffles!</p>
                        <a href="https://t.me/dentacoin/255508" target="_blank">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                <img src="/assets/images/christmas-calendar-campaign/see-winners-in-dentacoin-telegram.png" class="" alt="Join dentacoin telegram button" itemprop="contentUrl"/>
                            </figure>
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <picture itemscope="" itemtype="http://schema.org/ImageObject">
                    <source media="(max-width: 768px)" srcset="/assets/images/christmas-calendar-campaign/footer-presents-mobile.png" />
                    <img src="/assets/images/christmas-calendar-campaign/footer-presents.png" class="width-100" alt="Santa flying in the sky" itemprop="contentUrl"/>
                </picture>
            </section>
        </div>
    @else
        <div class="christmas-calendar-not-logged">
            <section class="container text-center">
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="lato-black fs-38 fs-xs-25 padding-bottom-15 padding-top-15 padding-top-xs-30 max-width-600 margin-0-auto">Join Dentacoin Holiday CALENDAR CHALLENGE 2019</h1>
                        <p class="fs-22 fs-xs-20 lato-regular">Unlock a new surprise every day from December 1 to 31!</p>
                        <div class="padding-bottom-35 padding-top-10">
                            <a href="javascript:void(0);" class="show-login-signin">
                                <img src="" class="Sign up button"/>
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/christmas-calendar-campaign/sign-up-button.svg" class="max-width-280 max-width-xs-300" alt="Sign up button" itemprop="contentUrl"/>
                                </figure>
                            </a>
                        </div>
                        <p class="fs-22 fs-xs-20 lato-regular">We are picking 9 big winners on January 10, 2020:</p>
                    </div>
                </div>
            </section>
            <section class="container-fluid text-center presents-list padding-bottom-50 padding-bottom-xs-30">
                <div class="row">
                    <div class="col-xs-12 padding-left-xs-0 padding-right-xs-0">
                        <picture itemscope="" itemtype="http://schema.org/ImageObject">
                            <source media="(max-width: 768px)" srcset="/assets/images/christmas-calendar-campaign/presents-mobile.png" />
                            <img src="/assets/images/christmas-calendar-campaign/presents.png" alt="Presents list" itemprop="contentUrl"/>
                        </picture>
                    </div>
                </div>
            </section>
            <section class="container tasks-section">
                <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-offset-1">
                        <div class="row fs-0 position-relative">
                            @for($i = 1; $i <= 31; $i+=1)
                                @if($i == 31)
                                    <a href="javascript:void(0);" class="col-xs-6 col-sm-4 col-md-2 padding-left-15 padding-right-15 padding-bottom-30 inline-block padding-left-xs-10 padding-right-xs-10 padding-bottom-xs-15 show-login-signin show-on-mobile show-xs dots"><span></span><span></span><span></span></a>
                                @endif
                                <a href="javascript:void(0);" class="col-xs-6 col-sm-4 col-md-2 padding-left-15 padding-right-15 padding-bottom-30 inline-block padding-left-xs-10 padding-right-xs-10 padding-bottom-xs-15 show-login-signin @if($i > 4 && $i < 31) hide-xs @endif">
                                    <div class="wrapper">
                                        <div class="present__pane">
                                            <h2 class="present__date">{{$i}}</h2>
                                        </div>
                                        <div class="present__content">
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/present.png" class="width-100" alt="Present" itemprop="contentUrl"/>
                                            </figure>
                                        </div>
                                    </div>
                                </a>
                            @endfor
                            <a href="{{route('holiday-calendar-terms')}}" target="_blank" class="text-decoration-underline padding-right-15 padding-right-xs-0 fs-18 terms-link">Terms &  Conditions</a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="santa-section">
                <picture itemscope="" itemtype="http://schema.org/ImageObject">
                    <source media="(max-width: 768px)" srcset="/assets/images/christmas-calendar-campaign/santa-flying-in-the-sky-mobile.png" />
                    <img src="/assets/images/christmas-calendar-campaign/santa-flying-in-the-sky-1400.png" class="width-100" alt="Santa flying in the sky" itemprop="contentUrl"/>
                </picture>
            </section>
        </div>
    @endif
@endsection