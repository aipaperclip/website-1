<!DOCTYPE html>
<html>
<head>
    <title>Dentacoin</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon" />
    <meta name="description" content="Description" />
    <meta name="keywords" content="Keywords" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta property="og:url" content=""/>
    <meta property="og:title" content=""/>
    <meta property="og:image" content=""/>

    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body data-current="one" class="@if(Route::current()) {{Route::current()->getName()}} @else class-404 @endif" lang="en">
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
            <figure class="col-xs-12 logo-container">
                <a href="{{ route('home') }}"><img src="{{URL::asset('assets/images/logo.svg') }}"/></a>
            </figure>
        </div>
    </header>
    <main>@yield("content")</main>
    <footer>
        <div class="container">
            <div class="row">
                <h2 class="col-xs-12 section-title">JOIN DENTACOIN COMMUNITY</h2>
            </div>
            @include('partials.newsletter-registration')
            <div class="row socials">
                <div class="col-xs-12">
                    <ul>
                        <li class="inline-block"><a target="_blank" href="admin@dentacoin.com"><figure><img src="{{URL::asset('assets/images/mail-icon.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://t.me/dentacoin"><figure><img src="{{URL::asset('assets/images/iconmonstr-telegram.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://www.facebook.com/dentacoin/"><figure><img src="{{URL::asset('assets/images/facebook.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://twitter.com/dentacoin"><figure><img src="{{URL::asset('assets/images/twitter.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://www.instagram.com/dentacoin_official/"><figure><img src="{{URL::asset('assets/images/instagram.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://www.youtube.com/dentacoin"><figure><img src="{{URL::asset('assets/images/youtube-play-button.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://github.com/Dentacoin"><figure><img src="{{URL::asset('assets/images/github.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://www.reddit.com/r/Dentacoin/"><figure><img src="{{URL::asset('assets/images/reddit.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://medium.com/@dentacoin/"><figure><img src="{{URL::asset('assets/images/medium-m.svg') }}"/></figure></a></li>
                        <li class="inline-block"><a target="_blank" href="https://steemit.com/@dentacoin"><figure><img src="{{URL::asset('assets/images/steemit.svg') }}"/></figure></a></li>
                    </ul>
                </div>
            </div>
            <div class="row menu">
                <nav class="col-xs-12">
                    <ul>
                        <li class="inline-block"><a target="_blank" href="https://blog.dentacoin.com/">Blog</a></li>
                        <li class="inline-block separator">|</li>
                        <li class="inline-block"><a target="_blank" href="https://dentacoin.com/web/white-paper/Whitepaper-en1.pdf">Whitepaper</a></li>
                        <li class="inline-block separator">|</li>
                        <li class="inline-block"><a target="_blank" href="{{ route('privacy-policy') }}">Privacy Policy</a></li>
                    </ul>
                </nav>
            </div>
            <div class="row media-inquiries">
                <div class="col-xs-12">
                    For media inquiries, please contact us at <a href="mailto:press@dentacoin.com">press@dentacoin.com</a>
                </div>
            </div>
            <div class="row all-rights">
                <div class="col-xs-12">
                    <div>© 2018 Dentacoin Foundation. All rights reserved. </div>
                    {{--<div>Wim Duisenbergplantsoen 31, 6221 SE Maastricht, The Netherlands</div>--}}
                    <div><a href="https://dentacoin.com/docs/Dentacoin%20foundation.pdf" target="_blank">Verify Dentacoin Foundation</a></div>
                </div>
            </div>
        </div>
    </footer>
    <script src="/dist/js/front-libs-script.js"></script>
    <!-- Zendesk Widget script -->
    <script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var e=this.createElement("script");n&&(this.domain=n),e.id="js-iframe-async",e.src="https://assets.zendesk.com/embeddable_framework/main.js",this.t=+new Date,this.zendeskHost="dentacoin.zendesk.com",this.zEQueue=a,this.body.appendChild(e)},o.write('<body onload="document._l();">'),o.close()}();
        /*]]>*/</script>
    <!-- End of Zendesk Widget script -->
    <script src="/assets/js/basic.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
    @yield("script_block")
    <script src="/assets/js/markerclusterer-v2.js"></script>
    <script src="/assets/js/google-map.js"></script>
    <script src="/assets/js/index.js"></script>
</body>
</html>