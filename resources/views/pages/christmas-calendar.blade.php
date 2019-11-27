@extends("layout")
@section("content")
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
                    <p class="fs-22 fs-xs-20 lato-regular">We are picking 10 big winners on January 10, 2020:</p>
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
                    <div class="row fs-0">
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
                                            <img src="/assets/images/christmas-calendar-campaign/present.jpg" class="width-100" alt="Present" itemprop="contentUrl"/>
                                        </figure>
                                    </div>
                                </div>
                            </a>
                        @endfor
                    </div>
                </div>
            </div>
        </section>
        <section class="santa-section">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/christmas-calendar-campaign/santa-flying-in-the-sky.svg" class="width-100" alt="Sign up button" itemprop="contentUrl"/>
            </figure>
        </section>
    </div>
@endsection