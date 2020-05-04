<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon" />
    @if(!empty(Route::current()) && Route::current()->getName() == 'christmas-calendar')
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>
    @else
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    @endif
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    @if(!empty(Route::current()) && Route::current()->getName() == 'careers' && empty(!request()->route()->parameters))
        <title>{{$job_offer->meta_title}}</title>
        <meta name="description" content="{{$job_offer->meta_description}}" />
        <meta name="keywords" content="{{$job_offer->keywords}}" />
        <meta property="og:url" content="{{Request::url()}}"/>
        <meta property="og:title" content="{{$job_offer->social_title}}"/>
        <meta property="og:description" content="{{$job_offer->social_description}}"/>
        @if(!empty($job_offer->social_media))
            <meta property="og:image" content="{{URL::asset('assets/uploads/'.$job_offer->social_media->name)}}"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
        @endif
    @elseif(!empty($meta_data))
        <title>{{$meta_data->title}}</title>
        <meta name="description" content="{{$meta_data->description}}" />
        <meta name="keywords" content="{{$meta_data->keywords}}" />
        <meta property="og:url" content="{{Request::url()}}"/>
        <meta property="og:title" content="{{$meta_data->social_title}}"/>
        <meta property="og:description" content="{{$meta_data->social_description}}"/>
        @if(!empty($meta_data->media))
            <meta property="og:image" content="{{URL::asset('assets/uploads/'.$meta_data->media->name)}}"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
        @endif
    @endif
    <meta name="p:domain_verify" content="dce2e29c27694ac250a2f58e6a8fa551"/>
    @if(!empty(Route::current()) && Route::current()->getName() == 'home')
        <link rel="canonical" href="{{route('home')}}" />
    @endif
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css?v=1.1.2">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css?v=1.1.2">
    <link rel="stylesheet" type="text/css" href="https://dentacoin.com/assets/libs/dentacoin-login-gateway/css/dentacoin-login-gateway-style.css?v=1.1.2"/>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97167262-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        @if(empty($_COOKIE['performance_cookies']))
            gtag('config', 'UA-97167262-1', {'anonymize_ip': true});
        @else
            gtag('config', 'UA-97167262-1');
        @endif
    </script>

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2366034370318681');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=2366034370318681&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->
</head>
<body data-current="one" class="@if((new \App\Http\Controllers\UserController())->checkSession()) logged-in @endif @if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif @if(!empty(Route::current()) && ((Route::current()->getName() == 'careers' && empty(request()->route()->parameters) || Route::current()->getName() == 'corporate-design'))) allow-draw-lines @endif">
    <svg class="svg-with-lines">
        <line class="first" x1="0" y1="0" x2="0" y2="0"/>
        <line class="second" x1="0" y1="0" x2="0" y2="0"/>
        <line class="third" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fourth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fifth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="sixth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="seventh" x1="0" y1="0" x2="0" y2="0"/>
        <line class="eighth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="ninth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="tenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="eleventh" x1="0" y1="0" x2="0" y2="0"/>
        <line class="twelfth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="thirteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fourteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fifteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="sixteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="seventeenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="eighteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="nineteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="twentieth" x1="0" y1="0" x2="0" y2="0"/>
    </svg>
    <header class="container">
        <div class="row fs-0">
            <figure itemscope="" itemtype="http://schema.org/Organization" class="col-xs-3 logo-container inline-block">
                <a itemprop="url" @if((new \App\Http\Controllers\UserController())->checkSession()) href="{{ route('foundation') }}" @else  href="{{ route('home') }}" @endif @if(!empty(Route::current())) @if(Route::current()->getName() == "home") tabindex="=-1" @endif @endif>
                    <img src="@if((new \App\Http\Controllers\UserController())->checkSession() && Route::current()->getName() == 'home') {{URL::asset('assets/images/round-logo-white.svg') }} @else {{URL::asset('assets/images/logo.svg') }} @endif" itemprop="logo" alt="Dentacoin logo"/>
                    @if(!empty(Route::current()))
                        @if(Route::current()->getName() == 'careers' || Route::current()->getName() == 'corporate-design')
                            <div class="first-dot logo-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    @endif
                </a>
            </figure>
            @if(!(new \App\Http\Controllers\UserController())->checkSession())
                <div class="col-xs-9 btn-container inline-block">
                    <a href="//dentists.dentacoin.com" class="inline-block fs-20 margin-right-20 main-color init-dentists-click-event" target="_blank">For dentists</a>
                    <div class="inline-block btn-and-line">
                        <a href="javascript:void(0)" class="white-black-btn open-dentacoin-gateway patient-login" tabindex="-1">SIGN IN</a>
                        <span class="first-dot custom-dot">&nbsp;</span>
                        @if(!\App\Http\Controllers\UserController::instance()->checkSession() && !empty(Route::current()) && Route::current()->getName() == 'christmas-calendar')
                            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="christmas-ball">
                                <img src="/assets/images/christmas-calendar-campaign/christmas-ball.svg" class="width-100 max-width-40" alt="Christmas ball" itemprop="contentUrl"/>
                            </figure>
                        @endif
                    </div>
                </div>
            @else
                @include('partials.logged-user-desktop-header-menu')
            @endif
        </div>
    </header>
    <main>@yield("content")</main>
    <footer class="padding-bottom-50 padding-bottom-xs-100 padding-bottom-sm-100">
        <div class="container">
            @if(!\App\Http\Controllers\UserController::instance()->checkSession() && !empty(Route::current()) && Route::current()->getName() != 'careers' && Route::current()->getName() != 'corporate-identity' && Route::current()->getName() != 'corporate-design' && Route::current()->getName() != 'christmas-calendar')
                @if(isset($footer_data))
                    <div class="row">
                        <h2 class="col-xs-12 section-title">{!! $footer_data[0]['html'] !!}</h2>
                    </div>
                    @include('partials.newsletter-registration')
                @endif
            @endif
            @if(!empty($socials))
                <div class="row socials">
                    <div class="col-xs-12" itemscope="" itemtype="http://schema.org/Organization">
                        <link itemprop="url" href="{{ route('home') }}">
                        <ul>
                            @foreach($socials as $social)
                                <li class="inline-block">
                                    <a itemprop="sameAs" target="_blank" href="{{$social->link}}">
                                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                            <img src="{{URL::asset('assets/uploads/'.$social->media->name) }}"  @if(!empty($social->media->alt)) alt="{{$social->media->alt}}" @endif  itemprop="contentUrl"/>
                                        </figure>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            @endif
            @if(!empty($footer_menu))
            <div class="row menu">
                <nav class="col-xs-12">
                    <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">
                        @php($first_el = false)
                        @foreach($footer_menu as $el)
                            @if($first_el)
                                <li class="inline-block separator">|</li>
                            @endif
                            <li class="inline-block @if($el->url == '/assets/uploads/dentacoin-fact-sheet.pdf') has-submenu padding-right-xs-20 @endif">
                                <a @if($el->new_window) target="_blank" @endif itemprop="url" href="{{$el->url}}"><span itemprop="name">{{$el->name}}</span></a>
                                @if($el->url == '/assets/uploads/dentacoin-fact-sheet.pdf')
                                    <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement" class="submenu">
                                        <li>
                                            <a href="/assets/uploads/was-ist-dentacoin.pdf" itemprop="url" target="_blank"><span itemprop="name">Fact Sheet DE</span></a>
                                        </li>
                                    </ul>
                                @endif
                            </li>
                            @if(!$first_el)
                                @php($first_el = true)
                            @endif
                        @endforeach
                    </ul>
                </nav>
            </div>
            @endif
            @if(isset($footer_data))
                <div class="row media-inquiries">
                    <div class="col-xs-12">
                        {!! $footer_data[4]['html'] !!}
                    </div>
                </div>
                <div class="row all-rights">
                    <div class="col-xs-12">
                        {!! $footer_data[5]['html'] !!}
                    </div>
                </div>
            @endif
        </div>
    </footer>
    @if(!\App\Http\Controllers\UserController::instance()->checkSession())
        {{--@php($inviter = \Illuminate\Support\Facades\Input::get('inviter'))
        @php($api_enums = (new \App\Http\Controllers\APIRequestsController())->getAllEnums())
        <div class="hidden-login-form hide">
            <div class="fs-0 popup-header-action">
                <a href="javascript:void(0)" class="inline-block" data-type="patient">I'm a Patient</a>
                <a href="javascript:void(0)" class="inline-block init-dentists-click-event" data-type="dentist">I'm a Dentist</a>
            </div>
            <div class="fs-0 popup-body">
                <div class="patient inline-block">
                    <div class="form-login">
                        <h2>LOG IN</h2>
                        <div class="padding-bottom-10">
                            <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/login" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient"><i class="fa fa-facebook-official inline-block fs-30 margin-right-20" aria-hidden="true"></i><span class="inline-block">Continue with Facebook</span></a>
                        </div>
                        <div>
                            <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/login" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient">with Civic</a>
                        </div>
                        <div class="popup-half-footer">
                            Don't have an account? <a href="javascript:void(0)" class="call-sign-up color-white">Sign up</a>
                        </div>
                    </div>
                    <div class="form-register">
                        <h2>SIGN UP</h2>
                        <div class="padding-bottom-10">
                            <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/register" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient" custom-stopper="true"><i class="fa fa-facebook-official inline-block fs-30 margin-right-20" aria-hidden="true"></i><span class="inline-block">Continue with Facebook</span></a>
                        </div>
                        <div>
                            <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/register" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient" custom-stopper="true">with Civic</a>
                        </div>
                        <div class="privacy-policy-row padding-top-20">
                            <div class="pretty p-svg p-curve black-style agree-with">
                                <input type="checkbox" id="privacy-policy-registration-patient"/>
                                <div class="state p-success">
                                    <!-- svg path -->
                                    <svg class="svg svg-icon" viewBox="0 0 20 20">
                                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                                    </svg>
                                    <label class="fs-14">I agree with <a href="//dentacoin.com/privacy-policy" class="color-white" target="_blank">Privacy Policy</a></label>
                                </div>
                            </div>
                        </div>
                        <div class="step-errors-holder"></div>
                        <div class="popup-half-footer">
                            Already have an account? <a href="javascript:void(0)" class="call-log-in color-white">Log in</a>
                        </div>
                    </div>
                </div>
                <div class="dentist inline-block custom-hide">
                    <div class="form-login">
                        <h2>LOG IN</h2>
                        <form method="POST" action="{{ route('dentist-login') }}" id="dentist-login">
                            <div class="padding-bottom-10 field-parent">
                                <div class="custom-google-label-style module" data-input-colorful-border="true">
                                    <label for="dentist-login-email">Email address:</label>
                                    <input class="full-rounded form-field" name="email" maxlength="100" type="email" id="dentist-login-email" placeholder=""/>
                                </div>
                            </div>
                            <div class="padding-bottom-20 field-parent">
                                <div class="custom-google-label-style module" data-input-colorful-border="true">
                                    <label for="dentist-login-password">Password:</label>
                                    <input class="full-rounded form-field" name="password" maxlength="50" id="dentist-login-password" type="password"/>
                                </div>
                            </div>
                            <div class="btn-container text-center">
                                <input type="submit" value="Log in" class="white-black-btn fs-20"/>
                                <input type="hidden" name="_token" value="{{csrf_token()}}">
                                @if(!\App\Http\Controllers\UserController::instance()->checkSession() && !empty(Route::current()) && Route::current()->getName() == 'christmas-calendar')
                                    <input type="hidden" name="route" value="christmas-calendar"/>
                                @endif
                            </div>
                            <div class="text-center padding-top-40 fs-16">Don't have an account? <a href="javascript:void(0)" class="call-sign-up fs-20">Sign up</a></div>
                        </form>
                        <div class="popup-half-footer">
                            <a href="{{route('forgotten-password')}}">Forgotten password?</a>
                        </div>
                    </div>
                    <div class="form-register">
                        <h2>Sign Up Now - Quick & Easy!</h2>
                        <form method="POST" enctype="multipart/form-data" id="dentist-register" action="{{ route('dentist-register') }}">
                            <div class="step first visible" data-step="first">
                                <div class="padding-bottom-10 field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-email">Work Email Address:</label>
                                        <input class="full-rounded form-field" name="email" maxlength="100" type="email" id="dentist-register-email"/>
                                    </div>
                                </div>
                                <div class="padding-bottom-10 field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-password">Password:</label>
                                        <input class="full-rounded form-field password" name="password" minlength="6" maxlength="50" type="password" id="dentist-register-password"/>
                                    </div>
                                </div>
                                <div class="padding-bottom-20 field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-repeat-password">Repeat password:</label>
                                        <input class="full-rounded form-field repeat-password" name="repeat-password" minlength="6" maxlength="50" type="password" id="dentist-register-repeat-password"/>
                                    </div>
                                </div>
                            </div>
                            <div class="step second" data-step="second">
                                <div class="padding-bottom-20 user-type-container fs-0">
                                    <input type="hidden" name="user-type" value="dentist"/>
                                    <div class="inline-block-top user-type active padding-right-15" data-type="dentist">
                                        <a href="javascript:void(0)" class="custom-button">
                                            <span class="custom-radio inline-block"><span class="circle"></span></span> <span class="inline-block">Dentist</span>
                                        </a>
                                        <div class="fs-14 light-gray-color">For associate dentists OR independent practitioners</div>
                                    </div>
                                    <div class="inline-block-top user-type padding-left-15" data-type="clinic">
                                        <a href="javascript:void(0)" class="custom-button">
                                            <span class="custom-radio inline-block"><span class="circle"></span></span> <span class="inline-block">Clinic</span>
                                        </a>
                                        <div class="fs-14 light-gray-color">For clinics with more than one dental practitioners</div>
                                    </div>
                                </div>
                                <div class="padding-bottom-25 field-parent">
                                    <div class="custom-google-select-style module">
                                        <label>Title:</label>
                                        <select class="form-field required" name="dentist-title">
                                            @foreach($api_enums->titles as $key => $title)
                                                <option value="{{$key}}">{{$title}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="padding-bottom-15 field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-latin-name">Your Name (Latin letters):</label>
                                        <input class="full-rounded form-field required" name="latin-name" maxlength="100" type="text" id="dentist-register-latin-name"/>
                                    </div>
                                    <div class="fs-14 light-gray-color">Ex: Vladimir Alexandrovich (First name, Last name)</div>
                                </div>
                                <div class="padding-bottom-30 field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-alternative-name">Alternative Spelling (optional):</label>
                                        <input class="full-rounded form-field" name="alternative-name" maxlength="100" type="text" id="dentist-register-alternative-name"/>
                                    </div>
                                    <div class="fs-14 light-gray-color">Ex: Владимир Александрович</div>
                                </div>
                                <div class="privacy-policy-row padding-bottom-20">
                                    <div class="pretty p-svg p-curve on-white-background">
                                        <input type="checkbox" id="privacy-policy-registration"/>
                                        <div class="state p-success">
                                            <svg class="svg svg-icon" viewBox="0 0 20 20">
                                                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                                            </svg>
                                            <label class="fs-14">I've read and agree to the <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="step third address-suggester-wrapper" data-step="third">
                                <div class="padding-bottom-20 field-parent">
                                    <div class="custom-google-select-style module">
                                        @php($countries = (new \App\Http\Controllers\APIRequestsController())->getAllCountries())
                                        <label>Select country:</label>
                                        @php($current_phone_code = '+'.$countries[0]->phone_code)
                                        @if(isset($client_ip) && $client_ip != '127.0.0.1')
                                            @php($current_user_country_code = (new \App\Http\Controllers\APIRequestsController())->getCountry($client_ip))
                                        @endif
                                        <select name="country-code" id="dentist-country" class="form-field required country-select" @if(!empty($current_user_country_code)) data-current-user-country-code="{{$current_user_country_code}}" @endif>
                                            @if(!empty($countries))
                                                @foreach($countries as $country)
                                                    @php($selected = '')
                                                    @if(!empty($current_user_country_code))
                                                        @if($current_user_country_code == $country->code)
                                                            @php($current_phone_code = '+'.$country->phone_code)
                                                            @php($selected = 'selected')
                                                        @endif
                                                    @endif
                                                    <option value="{{$country->code}}" data-code="{{$country->phone_code}}" {{$selected}}>{{$country->name}}</option>
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>
                                </div>
                                <div class="padding-bottom-15 suggester-parent module field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-address">Address: Start typing street, No, city</label>
                                        <input type="text" name="address" class="full-rounded form-field required address-suggester dont-init" autocomplete="off" id="dentist-register-address">
                                    </div>
                                    <div class="suggester-map-div margin-top-15 margin-bottom-10"></div>
                                    <div class="alert alert-notice geoip-confirmation margin-top-10 margin-bottom-10 hide-this">Please check the map to make sure we got your correct address. If you're not happy - please drag the map to adjust it.</div>
                                    <div class="alert alert-warning geoip-hint margin-top-10 margin-bottom-10">Please enter a valid address for your practice (including street name and number)</div>
                                </div>
                                <div class="padding-bottom-15 field-parent">
                                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                                        <label for="dentist-register-website">Website: http(s)://:</label>
                                        <input class="full-rounded form-field required" name="website" id="dentist-register-website" maxlength="250" type="url"/>
                                    </div>
                                    <div class="fs-14 light-gray-color">No website? Add your most popular social page.</div>
                                </div>
                                <div class="padding-bottom-10 field-parent">
                                    <div class="phone">
                                        <div class="country-code" name="phone-code">{{$current_phone_code}}</div>
                                        <div class="custom-google-label-style module input-phone" data-input-colorful-border="true">
                                            <label for="dentist-register-phone">Phone number:</label>
                                            <input class="full-rounded form-field required" name="phone" maxlength="50" type="number" id="dentist-register-phone"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="step fourth" data-step="fourth">
                                <div class="padding-bottom-20 fs-0">
                                    <div class="inline-block-top avatar module upload-file">
                                        <input type="file" class="visualise-image inputfile" id="custom-upload-avatar" name="image" accept=".jpg,.png,.jpeg,.svg,.bmp"/>
                                        <input type="hidden" id="hidden-image" name="hidden-image"/>
                                        <div class="btn-wrapper"></div>
                                        <div id="cropper-container"></div>
                                        <div class="fs-14 padding-top-5 italic max-size-label"><label for="custom-upload-avatar" class="inline-block margin-right-10 max-width-30"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="width-100"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" class=""></path></svg></label>Max size: 2MB</div>
                                    </div>
                                    <div class="inline-block-top specializations">
                                        <h4>Please select your specializations:</h4>
                                        @foreach($api_enums->specialisations as $key => $specialisation)
                                            <div class="pretty p-svg p-curve on-white-background">
                                                <input type="checkbox" name="specializations[]" value="{{$key}}"/>
                                                <div class="state p-success">
                                                    <!-- svg path -->
                                                    <svg class="svg svg-icon" viewBox="0 0 20 20">
                                                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                                                    </svg>
                                                    <label class="fs-14">{{$specialisation}}</label>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                    <div class="fs-0 captcha-parent padding-bottom-15 padding-top-20">
                                        <div class="inline-block width-50 width-xs-100 padding-bottom-xs-15">
                                            <div class="captcha-container flex text-center">
                                                <span>{!! captcha_img() !!}</span>
                                                <button type="button" class="refresh-captcha">
                                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="inline-block fs-14 width-50 width-xs-100 padding-left-10">
                                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                                <label for="register-captcha">Enter captcha:</label>
                                                <input type="text" name="captcha" id="register-captcha" maxlength="5" class="full-rounded form-field"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="step-errors-holder padding-top-10"></div>
                                </div>
                            </div>
                            <div class="btns-container">
                                <div class="inline-block">
                                    <input type="button" value="< back" class="prev-step"/>
                                </div>
                                <div class="inline-block text-right">
                                    <input type="button" value="Next" class="white-black-btn fs-20 next-step" data-current-step="first"/>
                                    <input type="hidden" name="_token" value="{{csrf_token()}}">
                                    @if(isset($inviter))
                                        <input type="hidden" name="inviter" value="{{\Illuminate\Support\Facades\Input::get('inviter')}}">
                                    @endif
                                </div>
                            </div>
                        </form>
                        <div class="popup-half-footer">
                            Already have an account? <a href="javascript:void(0)" class="call-log-in">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>--}}
        @if(!empty(session('logout_token')))
            <img src="//dentists.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//assurance.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//reviews.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//dentavox.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//account.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
        @endif
    @else
        @php($slug = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['id'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')))
        @php($type = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['type'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')))
        @php($token = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['token'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')))
        <img src="//dentists.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//assurance.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//reviews.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//dentavox.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//account.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
    @endif
    <div class="bottom-fixed-container">
        {{--@if(!empty(Route::current()) && Route::current()->getName() != 'christmas-calendar')
            <a href="https://dentacoin.com/holiday-calendar-2019" target="_blank" class="display-block banner">
                <picture itemscope="" itemtype="http://schema.org/ImageObject">
                    <source media="(max-width: 992px)" srcset="/assets/uploads/mobile-christmas-banner-small.gif"/>
                    <img src="/assets/uploads/christmas-banner.gif" alt="Holiday calendar banner" class="width-100" itemprop="contentUrl"/>
                </picture>
            </a>
        @endif--}}
        @if(empty($_COOKIE['performance_cookies']) && empty($_COOKIE['functionality_cookies']) && empty($_COOKIE['marketing_cookies']) && empty($_COOKIE['strictly_necessary_policy']))
            <div class="privacy-policy-cookie">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="text inline-block">This site uses cookies. Find out more on how we use cookies in our <a href="https://dentacoin.com/privacy-policy" class="link" target="_blank">Privacy Policy</a>. | <a href="javascript:void(0);" class="link adjust-cookies">Adjust cookies</a></div>
                            <div class="button inline-block"><a href="javascript:void(0);" class="white-blue-rounded-btn accept-all">Accept all cookies</a></div>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </div>
    <div class="response-layer">
        <div class="wrapper">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/loader.gif" class="max-width-160" alt="Loader">
            </figure>
        </div>
    </div>
    @if(!empty($_COOKIE['marketing_cookies']))
        <!--Start of Tawk.to Script-->
        <script type="text/javascript">
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/5c5810737cf662208c93f22e/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
            })();
        </script>
    @endif
    <!--End of Tawk.to Script-->

    <!--Start of Schema Markup-->
    <script type='application/ld+json'>{"@context":"http://www.schema.org","@type":"Corporation","name":"Dentacoin Foundation","description":"Dentacoin develops the dental industry as well as creates market intelligence through a crypto currency reward system that inspires participation throughout the community. Dentacoin is the first crypto currency that uses a decentralized review platform and transparently rewards patients and dentists who make contributions that benefit the community. The Dentacoin Foundation team strongly believes in building a future healthcare industry that will fall into the hands of the people, resulting in the disruption of the existing industries and the creation of new industries in the short and long term.","logo":"https://dentacoin.com/assets/uploads/rounded-logo.svg","image":"https://dentacoin.com/assets/uploads/two-line-logo.svg","url":"https://dentacoin.com","sameAs":["https://www.facebook.com/dentacoin/","https://www.instagram.com/dentacoin_official/","https://twitter.com/dentacoin","https://www.linkedin.com/company/dentacoin/","https://www.youtube.com/dentacoin","https://medium.com/@dentacoin/","https://github.com/Dentacoin","https://steemit.com/@dentacoin","https://www.reddit.com/r/Dentacoin/"],"address":{"@type":"PostalAddress","streetAddress":"Wim Duisenbergplantsoen 31, ","addressLocality":"Maastricht","postalCode":"6221 SE ","addressCountry":"Netherlands"},"foundingDate":"03/22/2017","founders":[{"@type":"Person","jobTitle":"Founder","familyName":"Dimitrakiev","givenName":"Dimitar ","honorificPrefix":"Prof. Dr. ","sameAs":"https://www.linkedin.com/in/dimitar-dimitrakiev/"},{"@type":"Person","familyName":"Grenzebach","givenName":"Philipp","jobTitle":"Co-Founder & Business Developer","sameAs":"https://www.linkedin.com/in/philipp-g-986861146/"},{"@type":"Person","familyName":"Grenzebach","givenName":"Jeremias","jobTitle":"Co-Founder & Core Developer","sameAs":"https://twitter.com/neptox"}],"owns":[{"@type":"Product","name":"DentaVox","image":"https://dentavox.dentacoin.com/new-vox-img/logo-vox.png","description":"Take genuine paid surveys online and get rewarded! DentaVox is a market research platfom designed to provide valuable patient insights to the dental industry. Our large database with reliable dental statistics is available for free for anyone who's interested. Feel free to become a respondent yourself and help improve global dental care while also earning your first Dentacoin tokens with DentaVox.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"31"},"url":"https://dentavox.dentacoin.com/"},{"@type":"Product","name":"Dentacoin Trusted Reviews","image":"https://dentacoin.com/assets/uploads/trusted-reviews.svg","description":"Dentacoin Trusted Reviews is the first platform for detailed, verified and incentivized dental treatment reviews. Patients are invited by their dentists, verified through Blockchain-based identity system and rewarded for providing valuable feedback. Dentists have the chance to improve upon the feedback received and are incentivized for willing to do so.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"23"},"url":"https://reviews.dentacoin.com/"},{"@type":"Product","name":"Dentacoin Assurance","image":"https://assurance.dentacoin.com/assets/uploads/assurance-logo.svg","description":"Dentacoin Assurance is a revolutionary dental insurance-like program that shifts the focus from treatment to prevention and brings the financial interests of patients and dentists into complete alignment without any intermediaries. Patients are entitled to a lifelong, prevention-focused dental care by paying a low monthly premium in DCN to their dentists.Dentists receive a stable basic income while simultaneously establish strong, lasting bonds with their patients.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"13"},"url":"https://assurance.dentacoin.com/"},{"@type":"Product","name":"Dentacare App","image":"https://dentacoin.com/assets/uploads/pop-up-dentacare-app-icon.svg","description":"Dentacare is a mobile app which teaches kids and adults to maintain good oral hygiene through a 3-month, incentivized challenge. Users are guided through reminders, notifications, voice navigation and tutorials towards establishing and maintaining dental care habits. Dentists recommend the app to their patients to ensure proper in-home care.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"19"},"url":"https://dentacare.dentacoin.com/"},{"@type":"Product","name":"Dentacoin Blog","image":"https://dentacoin.com/assets/uploads/pop-up-blog-app-icon.svg","description":"Dentacoin Blog provides the most recent news around the project, as well as regular weekly updates.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"27"},"url":"https://blog.dentacoin.com/"},{"@type":"Product","name":"Wallet dApp","image":"https://dentacoin.com/assets/uploads/pop-up-wallet-app-icon.svg","description":"Dentacoin Wallet allows users to easily and securely store, send, receive DCN tokens, as well as buy DCN against fiat and crypto currencies. Users are entitled to the combination between account security and a very friendly user interface. Dentists, patients, suppliers can easily handle payments between each other without any significant tech knowledge required.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"48"},"url":"https://wallet.dentacoin.com/"}]}</script>
    <!--End of Schema Markup-->

    {{--<script src="/assets/js/basic.js"></script>--}}
    @if(!empty(Route::current()) && Route::current()->getName() == 'partner-network')
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaVeHq_LOhQndssbmw-aDnlMwUG73yCdk&libraries=places&language=en"></script>
    @endif
    {{----}}
    {{--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
    --}}<script src="/dist/js/front-libs-script.js?v=1.1.2"></script>
    <script src="https://dentacoin.com/assets/libs/dentacoin-login-gateway/js/init.js?v=1.1.2"></script>
    @yield("script_block")
    <script src="/dist/js/front-script.js?v=1.1.2"></script>
    {{--<script src="/assets/js/markerclusterer-v2.js"></script>
    <script src="/assets/js/google-map.js"></script>
    <script src="/assets/js/address.js"></script>
    <script src="/assets/js/index.js"></script>--}}

    {{--Multiple errors from laravel validation--}}
    @if(!empty($errors) && count($errors) > 0)
        <script>
            var errors = '';
            @foreach($errors->all() as $error)
                errors+="{{ $error }}" + '<br>';
            @endforeach
            basic.showAlert(errors, '', true);
        </script>
    @endif

    {{--Single error from controller response--}}
    @if (session('error'))
        <script>
            basic.showAlert("{!! session('error') !!}", '', true);
        </script>
    @endif

    {{--Multiple errors from controller response--}}
    @if(session('errors_response') && count(session('errors_response')) > 0)
        <script>
            var errors = '';
            @foreach(session('errors_response') as $error)
                errors+="{{ $error }}" + '<br>';
            @endforeach
            basic.showAlert(errors, '', true);
        </script>
    @endif

    {{--Success from controller response--}}
    @if(session('success'))
        @if(session('popup-html'))
            <script>
                basic.showDialog('{!! session('popup-html') !!}', 'popup-html', null, true);
                $('.close-popup').click(function() {
                    basic.closeDialog();
                });
            </script>
        @else
            <script>
                basic.showAlert("{!! session('success') !!}", '', true);
            </script>
        @endif
    @endif
</body>
</html>