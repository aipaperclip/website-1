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
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css?v=1.1.11">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css?v=1.1.11">

    @if((!(new \App\Http\Controllers\UserController())->checkSession() && !empty(Route::current()) && (Route::current()->getName() == 'home')) || ((new \App\Http\Controllers\UserController())->checkSession() && !empty(Route::current()) && (Route::current()->getName() == 'foundation')) || (!empty(Route::current()) && (Route::current()->getName() == 'users' || Route::current()->getName() == 'dentists' || Route::current()->getName() == 'traders')))
        <link rel="stylesheet" type="text/css" href="/assets/libs/dentacoin-package/css/styles-big-hub.css?v={{time()}}">
    @endif

    @if(empty($_COOKIE['performance_cookies']) && empty($_COOKIE['functionality_cookies']) && empty($_COOKIE['marketing_cookies']) && empty($_COOKIE['strictly_necessary_policy']))
        <link rel="stylesheet" type="text/css" href="/assets/libs/dentacoin-package/css/style-cookie.css?v={{time()}}">
    @endif

    @if((new \App\Http\Controllers\UserController())->checkSession())
        <link rel="stylesheet" type="text/css" href="/assets/libs/dentacoin-package/css/style.css?v={{time()}}">
    @elseif (!(new \App\Http\Controllers\UserController())->checkSession())
        <link rel="stylesheet" type="text/css" href="/assets/libs/dentacoin-login-gateway/css/dentacoin-login-gateway-style.css?v={{time()}}"/>
    @endif
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97167262-1"></script>
    <script id="google-analytics-script">
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
    <script id="facebook-pixel-script">
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

        @if(empty($_COOKIE['marketing_cookies']))
            fbq('consent', 'revoke');
        @else
            fbq('consent', 'grant');
        @endif

        fbq('init', '2366034370318681');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=2366034370318681&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->
</head>
<body data-current="one" class="@if((new \App\Http\Controllers\UserController())->checkSession()) logged-in @if((new \App\Http\Controllers\UserController())->checkPatientSession()) logged-patient @elseif((new \App\Http\Controllers\UserController())->checkDentistSession()) logged-dentist @endif @endif @if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif">
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
    <header class="hide-on-map-open hide-on-hub-open">
        <div class="container">
            <div class="row fs-0">
                <figure itemscope="" itemtype="http://schema.org/Organization" class="col-xs-3 logo-container inline-block">
                    <a itemprop="url" @if((new \App\Http\Controllers\UserController())->checkSession()) href="{{ route('foundation') }}" @else  href="{{ route('home') }}" @endif @if(!empty(Route::current())) @if(Route::current()->getName() == "home") tabindex="=-1" @endif @endif>
                        <img src="@if((new \App\Http\Controllers\UserController())->checkSession() && Route::current()->getName() == 'traders') {{URL::asset('assets/images/round-logo-white.svg') }} @else {{URL::asset('assets/images/logo.svg') }} @endif" itemprop="logo" alt="Dentacoin logo"/>
                        @if(!empty(Route::current()))
                            @if(Route::current()->getName() == 'careers' || Route::current()->getName() == 'corporate-design')
                                <div class="first-dot logo-dot fs-16 inline-block">&nbsp;</div>
                            @endif
                        @endif
                    </a>
                </figure>
                @if(!(new \App\Http\Controllers\UserController())->checkSession())
                    <div class="col-xs-9 btn-container inline-block">
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
        </div>
    </header>
    <main @if(!empty(Route::current()) && (Route::current()->getName() != 'home' && Route::current()->getName() != 'users' && Route::current()->getName() != 'dentists' && Route::current()->getName() != 'traders')) class="main-container" @endif>@yield("content")</main>
    <footer class="padding-bottom-80 hide-on-map-open hide-on-hub-open @if(!empty(Route::current()) && Route::current()->getName() == 'traders') black-style @endif">
        <div class="container">
            @if(!empty($socials))
                <div class="row socials">
                    <div class="col-xs-12" itemscope="" itemtype="http://schema.org/Organization">
                        <link itemprop="url" href="{{ route('home') }}">
                        <ul>
                            @foreach($socials as $social)
                                <li class="inline-block">
                                    <a itemprop="sameAs" target="_blank" href="{{$social->link}}">
                                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                            @if(!empty(Route::current()) && Route::current()->getName() == 'traders')
                                                @php($currentMedia = URL::asset('assets/uploads/'.$social->reversed_media->name))
                                                @php($currentAlt = $social->reversed_media->alt)
                                            @else
                                                @php($currentMedia = URL::asset('assets/uploads/'.$social->media->name))
                                                @php($currentAlt = $social->media->alt)
                                            @endif
                                            <img src="{{$currentMedia}}" data-default-src="{{URL::asset('assets/uploads/'.$social->media->name) }}" alt="{{$currentMedia}}" data-default-alt="{{$social->media->alt}}" data-black-style-src="{{URL::asset('assets/uploads/'.$social->reversed_media->name) }}" data-black-style-alt="{{$social->reversed_media->alt}}" itemprop="contentUrl"/>
                                        </figure>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            @endif
            @include('partials.newsletter-registration')
            @if(!empty($footer_menu))
            <div class="row menu">
                <nav class="col-xs-12">
                    <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">
                        @php($first_el = false)
                        @foreach($footer_menu as $el)
                            @if($first_el)
                                <li class="inline-block separator">|</li>
                            @endif
                            <li class="inline-block @if($el->url == '/assets/uploads/dentacoin-fact-sheet.pdf') has-submenu padding-right-15 padding-right-xs-20 @endif">
                                @if($el->url == '/assets/uploads/dentacoin-fact-sheet.pdf')
                                    <a href="javascript:void(0);"><span itemprop="name">{{$el->name}}</span></a>
                                    <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement" class="submenu">
                                        <li>
                                            <a @if($el->new_window) target="_blank" @endif href="/assets/uploads/dentacoin-fact-sheet.pdf" itemprop="url"><span itemprop="name">English</span></a>
                                        </li>
                                        <li>
                                            <a @if($el->new_window) target="_blank" @endif href="/assets/uploads/was-ist-dentacoin.pdf" itemprop="url"><span itemprop="name">Deutsch</span></a>
                                        </li>
                                    </ul>
                                @else
                                    <a @if($el->new_window) target="_blank" @endif itemprop="url" href="{{$el->url}}"><span itemprop="name">{{$el->name}}</span></a>
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
            <div class="row all-rights">
                <div class="col-xs-12">
                    <div>© {{date('Y')}} Dentacoin Foundation. All rights reserved.</div>
                    <div><a href="\assets\uploads\dentacoin-foundation.pdf" target="_blank" class="footer-bottom-link">Verify Dentacoin Foundation</a> <span class="separator">|</span> <a href="https://dentacoin.com/privacy-policy" target="_blank" class="footer-bottom-link">Privacy Policy</a></div>
                    <div class="padding-top-xs-25">Contract Address:</div>
                    <div><a href="https://etherscan.io/address/0x08d32b0da63e2C3bcF8019c9c5d849d7a9d791e6#code" target="_blank" class="footer-bottom-link fs-xs-13">0x08d32b0da63e2C3bcF8019c9c5d849d7a9d791e6</a></div>
                </div>
            </div>
        </div>
    </footer>
    @php($crossLogin = \Illuminate\Support\Facades\Input::get('cross-login'))
    @if(\App\Http\Controllers\UserController::instance()->checkSession() && !empty($crossLogin))
        @php($slug = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['id'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')))
        @php($type = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['type'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')))
        @php($token = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['token'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')))
        <img src="//dentists.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//assurance.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//reviews.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//dentavox.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
        <img src="//account.dentacoin.com/custom-cookie?slug={{ urlencode($slug) }}&type={{ urlencode($type) }}&token={{ urlencode($token) }}" class="hide"/>
    @else
        @if(!empty(session('logout_token')))
            <img src="//dentists.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//assurance.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//reviews.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//dentavox.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//account.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
            <img src="//hub.dentacoin.com/custom-cookie?logout-token={{ urlencode(session('logout_token')) }}" class="hide"/>
        @endif
    @endif
    <div class="response-layer">
        <div class="wrapper">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/dcn-flipping-coin-logo-loader-V3.gif" class="max-width-250 max-width-xs-200" alt="Loader">
            </figure>
        </div>
    </div>
    @if(!empty($_COOKIE['marketing_cookies']))
        <!--Start of Tawk.to Script-->
        {{--<script type="text/javascript">
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/5c5810737cf662208c93f22e/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
            })();
        </script>--}}
    @endif
    <!--End of Tawk.to Script-->

    <!--Start of Schema Markup-->
    <script type='application/ld+json'>{"@context":"http://www.schema.org","@type":"Corporation","name":"Dentacoin Foundation","description":"Dentacoin develops the dental industry as well as creates market intelligence through a crypto currency reward system that inspires participation throughout the community. Dentacoin is the first crypto currency that uses a decentralized review platform and transparently rewards patients and dentists who make contributions that benefit the community. The Dentacoin Foundation team strongly believes in building a future healthcare industry that will fall into the hands of the people, resulting in the disruption of the existing industries and the creation of new industries in the short and long term.","logo":"https://dentacoin.com/assets/uploads/rounded-logo.svg","image":"https://dentacoin.com/assets/uploads/two-line-logo.svg","url":"https://dentacoin.com","sameAs":["https://www.facebook.com/dentacoin/","https://www.instagram.com/dentacoin_official/","https://twitter.com/dentacoin","https://www.linkedin.com/company/dentacoin/","https://www.youtube.com/dentacoin","https://medium.com/@dentacoin/","https://github.com/Dentacoin","https://steemit.com/@dentacoin","https://www.reddit.com/r/Dentacoin/"],"address":{"@type":"PostalAddress","streetAddress":"Wim Duisenbergplantsoen 31, ","addressLocality":"Maastricht","postalCode":"6221 SE ","addressCountry":"Netherlands"},"foundingDate":"03/22/2017","founders":[{"@type":"Person","jobTitle":"Founder","familyName":"Dimitrakiev","givenName":"Dimitar ","honorificPrefix":"Prof. Dr. ","sameAs":"https://www.linkedin.com/in/dimitar-dimitrakiev/"},{"@type":"Person","familyName":"Grenzebach","givenName":"Philipp","jobTitle":"Co-Founder & Business Developer","sameAs":"https://www.linkedin.com/in/philipp-g-986861146/"},{"@type":"Person","familyName":"Grenzebach","givenName":"Jeremias","jobTitle":"Co-Founder & Core Developer","sameAs":"https://twitter.com/neptox"}],"owns":[{"@type":"Product","name":"DentaVox","image":"https://dentavox.dentacoin.com/new-vox-img/logo-vox.png","description":"Take genuine paid surveys online and get rewarded! DentaVox is a market research platfom designed to provide valuable patient insights to the dental industry. Our large database with reliable dental statistics is available for free for anyone who's interested. Feel free to become a respondent yourself and help improve global dental care while also earning your first Dentacoin tokens with DentaVox.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"31"},"url":"https://dentavox.dentacoin.com/"},{"@type":"Product","name":"Dentacoin Trusted Reviews","image":"https://dentacoin.com/assets/uploads/trusted-reviews.svg","description":"Dentacoin Trusted Reviews is the first platform for detailed, verified and incentivized dental treatment reviews. Patients are invited by their dentists, verified through Blockchain-based identity system and rewarded for providing valuable feedback. Dentists have the chance to improve upon the feedback received and are incentivized for willing to do so.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"23"},"url":"https://reviews.dentacoin.com/"},{"@type":"Product","name":"Dentacoin Assurance","image":"https://assurance.dentacoin.com/assets/uploads/assurance-logo.svg","description":"Dentacoin Assurance is a revolutionary dental insurance-like program that shifts the focus from treatment to prevention and brings the financial interests of patients and dentists into complete alignment without any intermediaries. Patients are entitled to a lifelong, prevention-focused dental care by paying a low monthly premium in DCN to their dentists.Dentists receive a stable basic income while simultaneously establish strong, lasting bonds with their patients.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"13"},"url":"https://assurance.dentacoin.com/"},{"@type":"Product","name":"Dentacare App","image":"https://dentacoin.com/assets/uploads/pop-up-dentacare-app-icon.svg","description":"Dentacare is a mobile app which teaches kids and adults to maintain good oral hygiene through a 3-month, incentivized challenge. Users are guided through reminders, notifications, voice navigation and tutorials towards establishing and maintaining dental care habits. Dentists recommend the app to their patients to ensure proper in-home care.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"19"},"url":"https://dentacare.dentacoin.com/"},{"@type":"Product","name":"Dentacoin Blog","image":"https://dentacoin.com/assets/uploads/pop-up-blog-app-icon.svg","description":"Dentacoin Blog provides the most recent news around the project, as well as regular weekly updates.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"27"},"url":"https://blog.dentacoin.com/"},{"@type":"Product","name":"Wallet dApp","image":"https://dentacoin.com/assets/uploads/pop-up-wallet-app-icon.svg","description":"Dentacoin Wallet allows users to easily and securely store, send, receive DCN tokens, as well as buy DCN against fiat and crypto currencies. Users are entitled to the combination between account security and a very friendly user interface. Dentists, patients, suppliers can easily handle payments between each other without any significant tech knowledge required.","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","ratingCount":"48"},"url":"https://wallet.dentacoin.com/"}]}</script>
    <!--End of Schema Markup-->

    {{--<script src="/assets/js/basic.js"></script>--}}
    @if(!empty(Route::current()) && (Route::current()->getName() == 'home' || Route::current()->getName() == 'users' || Route::current()->getName() == 'dentists'  || Route::current()->getName() == 'traders' || Route::current()->getName() == 'partner-network'))
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaVeHq_LOhQndssbmw-aDnlMwUG73yCdk&libraries=places&language=en"></script>
    @endif
    {{----}}
    {{--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
    --}}<script src="/dist/js/front-libs-script.js?v=1.1.11"></script>
    <script src="/assets/libs/dentacoin-package/js/init.js?v={{time()}}"></script>
    @if (!(new \App\Http\Controllers\UserController())->checkSession())
        <script src="/assets/libs/dentacoin-login-gateway/js/init.js?v={{time()}}"></script>
    @endif
    @yield("script_block")
    <script src="/dist/js/front-script.js?v=1.1.11"></script>
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