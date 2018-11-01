<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
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
    @if(!empty(Route::current()) && Route::current()->getName() == 'home')
        <link rel="canonical" href="{{route('home')}}" />
    @endif
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97167262-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-97167262-1');
    </script>
</head>
<body data-current="one" class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif @if(!empty(Route::current()) && Route::current()->getName() == 'careers' && empty(request()->route()->parameters)) draw-careers-lines @endif">
@if(!empty($privacy_policy_cookie))
    <div class="privacy-policy-cookie">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="text inline-block">This site uses cookies. Read more about the use of personal data in our <a href="{{route('privacy-policy')}}" class="link" target="_blank">Privacy Policy</a>.</div>
                    <div class="button inline-block"><a href="javascript:void(0);" class="white-blue-rounded-btn accept">Accept</a></div>
                </div>
            </div>
        </div>
    </div>
@endif
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
        <div class="row">
            <figure itemscope="" itemtype="http://schema.org/Organization" class="col-xs-12 logo-container">
                <a itemprop="url" href="{{ route('home') }}" @if(!empty(Route::current())) @if(Route::current()->getName() == "home") tabindex="=-1" @endif @endif>
                    <img src="{{URL::asset('assets/images/logo.svg') }}" itemprop="logo" alt="Dentacoin logo"/>
                    @if(!empty(Route::current()))
                        @if(Route::current()->getName() == 'careers')
                            <div class="first-dot careers-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    @endif
                </a>
            </figure>
        </div>
    </header>
    <main>@yield("content")</main>
    <footer>
        <div class="container">
            @if(!empty(Route::current()) && Route::current()->getName() != 'careers')
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
                            <li class="inline-block"><a @if($el->new_window) target="_blank" @endif itemprop="url" href="{{$el->url}}"><span itemprop="name">{{$el->name}}</span></a></li>
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
    <!-- Zendesk Widget script -->
    <script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var e=this.createElement("script");n&&(this.domain=n),e.id="js-iframe-async",e.src="https://assets.zendesk.com/embeddable_framework/main.js",this.t=+new Date,this.zendeskHost="dentacoin.zendesk.com",this.zEQueue=a,this.body.appendChild(e)},o.write('<body onload="document._l();">'),o.close()}();
        /*]]>*/</script>
    <!-- End of Zendesk Widget script -->
    <script src="/assets/js/basic.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
    <script src="/dist/js/front-libs-script.js?v=1.0.8"></script>
    @yield("script_block")
    {{--<script src="/dist/js/front-script.js?v=1.0.8"></script>--}}
<script src="/assets/js/markerclusterer-v2.js?v=1.0.3"></script>
<script src="/assets/js/google-map.js?v=1.0.3"></script>
<script src="/assets/js/index.js?v=1.0.3"></script>
</body>
</html>