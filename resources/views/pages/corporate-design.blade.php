@extends("layout")
@section("content")
    <div class="corporate-design-container">
        <section class="container">
            <div class="row">
                <h1 class="col-xs-12 page-h1-title">Corporate Design Manual</h1>
            </div>
        </section>
    </div>
    <div class="corporate-design-container">
        <section class="container">
            <div class="row image-and-text fs-0">
                <div class="col-xs-12 col-sm-6 col-lg-5 col-lg-offset-1 inline-block image">
                    <div class="second-dot fs-16 inline-block">&nbsp;</div>
                    <figure itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Drawing tools" itemprop="contentUrl" src="/assets/images/corporate-design-main-image-grey.svg">
                        <div class="third-dot fs-16 inline-block">&nbsp;</div>
                    </figure>
                </div>
                <div class="col-xs-12 col-sm-6 col-lg-5 inline-block text">
                    <div class="section-subtitle lato-heavy">Dentacoin Visual Identity</div>
                    <div class="section-description">Our core values are visually represented first and foremost by the Dentacoin logo.Dentacoin stands for equal access to prevention-oriented dental care for all people,achieved through an intelligent Assurance program, a set of incentivized Blockchain-basedtools and a same-named cryptocurrency.&nbsp;<strong><a class="color-bright-blue" href="/corporate-identity">Read more...</a></strong></div>
                </div>
            </div>
        </section>
        <section class="download-logo-section text-center-xs">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 col-md-offset-1 fs-0">
                        <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject"><img
                                    alt="Dentacoin logo" itemprop="contentUrl"
                                    data-defer-src="https://dentacoin.com/assets/uploads/flipping-coin-logo.gif"></figure>
                        <p class="description inline-block"><strong><span
                                        style="font-size:24px;">LOGO MEANING</span></strong>The white symbol in the logo
                            is the Arabic number 8, associated with luck and infinity. Visually, the logo also
                            represents the key players in the Dentacoin Ecosystem: Patients and Dentists. Their
                            continuous and mutually beneficial cooperation focused on preventive dental care, healthy
                            nutrition and lifestyle, is essential for the improvement of global oral health.</p>
                        <div class="btn-container inline-block text-center-xs"><a class="white-bright-blue-btn"
                                                                                  download=""
                                                                                  href="https://dentacoin.com\assets\uploads\dentacoin-logos-rar.zip"><i
                                        aria-hidden="true" class="fa fa-download"></i> DOWNLOAD</a></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="corporate-design-container" id="scroll-to-content">
        <section class="page-navigation container">
            <nav class="row">
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'round-logo'])}}#scroll-to-content"
                       class="black-white-btn @if(request()->route()->parameters['slug'] == 'round-logo') active @endif">
                        ROUND LOGO
                        @if(request()->route()->parameters['slug'] == 'round-logo')
                            <div class="nav-to-bottom-first-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    </a>
                    @if(request()->route()->parameters['slug'] == 'round-logo')
                        <div class="nav-to-bottom-second-dot fs-16 inline-block">&nbsp;</div>
                    @endif
                </div>
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'one-line-logo'])}}#scroll-to-content"
                       class="black-white-btn @if(request()->route()->parameters['slug'] == 'one-line-logo') active @endif">ONE-LINE
                        LOGO
                        @if(request()->route()->parameters['slug'] == 'one-line-logo')
                            <div class="nav-to-bottom-first-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    </a>
                    @if(request()->route()->parameters['slug'] == 'one-line-logo')
                        <div class="nav-to-bottom-second-dot fs-16 inline-block">&nbsp;</div>
                    @endif
                </div>
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'two-line-logo'])}}#scroll-to-content"
                       class="black-white-btn @if(request()->route()->parameters['slug'] == 'two-line-logo') active @endif">TWO-LINE
                        LOGO
                        @if(request()->route()->parameters['slug'] == 'two-line-logo')
                            <div class="nav-to-bottom-first-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    </a>
                    @if(request()->route()->parameters['slug'] == 'two-line-logo')
                        <div class="nav-to-bottom-second-dot fs-16 inline-block">&nbsp;</div>
                    @endif
                </div>
            </nav>
        </section>
    </div>
    @if(request()->route()->parameters['slug'] == 'round-logo')
        @include('partials.corporate-design-round-logo')
    @elseif(request()->route()->parameters['slug'] == 'one-line-logo')
        @include('partials.corporate-design-one-line-logo')
    @elseif(request()->route()->parameters['slug'] == 'two-line-logo')
        @include('partials.corporate-design-two-line-logo')
    @endif
    <div class="corporate-design-container">
        <section>
            <div class="container">
                <div class="row padding-left-35 padding-right-35 padding-top-30 padding-top-xs-0 padding-bottom-xs-20 padding-bottom-50 no-gutter-xs">
                    <div class="section-subtitle fs-xs-24 lato-heavy subsection-title">Background Color Suggestions</div>
                </div>
                <div class="row padding-left-40 padding-right-40">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 padding-bottom-15 lato-black fs-18">Use with black &amp; blue logos</div>
                </div>
                <div class="row padding-left-40 padding-right-40 padding-bottom-70 clickable-squares-row">
                    <div class="col-xs-12 col-lg-10 col-lg-offset-1"><a class="square border active" href="javascript:void(0)" style="background-color: #ffffff;"><span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/logo.svg"><br>RGB: 255 255 255<br>HEX: #ffffff<br>CMYK: 0 0 0 0 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #f2f2f2;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/logo.svg"><br>RGB: 242 242 242<br>HEX: #f2f2f2<br>CMYK: 4 2 2 0 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #e6e6e6;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/logo.svg"><br>RGB: 230 230 230<br>HEX: #e6e6e6<br>CMYK: 9 6 7 0 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #d3ebfb;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/logo.svg"><br>RGB: 211 235 251<br>HEX: #d3ebfb<br>CMYK: 4 2 2 0 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #36c0ff;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/logo.svg"><br>RGB: 54 192 255<br>HEX: #36c0ff<br>CMYK: 60 7 0 0 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #08abe0;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/logo.svg"><br>RGB: 8 171 224<br>HEX: #08abe0<br>CMYK: 72 13 1 0 </span>
                        </a></div>
                </div>
                <div class="row padding-left-40 padding-right-40">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 padding-bottom-15 lato-black fs-18">Use with white logo</div>
                </div>
                <div class="row padding-left-40 padding-right-40 padding-bottom-100 clickable-squares-row white-color">
                    <div class="col-xs-12 col-lg-10 col-lg-offset-1">
                        <a class="square active" href="javascript:void(0)" style="background-color: #000000;"><span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/rounded-logo-white.svg"><br>RGB: 0 0 0<br>HEX: #000000<br>CMYK: 75 68 67 90 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #001833;"> <span class="content"><img alt="Dentacoin logo" data-defer-src="/assets/images/rounded-logo-white.svg"><br>RGB: 0 24 51<br>HEX: #001833<br>CMYK: 96 83 48 63 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #041e42;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/rounded-logo-white.svg"><br>RGB: 4 30 66<br>HEX: #041e42<br>CMYK: 100 88 42 51 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #004593;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/rounded-logo-white.svg"><br>RGB: 0 69 147<br>HEX: #004593<br>CMYK: 100 84 11 1 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #126585;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/rounded-logo-white.svg"><br>RGB: 18 101 133<br>HEX: #126585<br>CMYK: 91 54 32 9 </span>
                        </a>
                        <a class="square" href="javascript:void(0)" style="background-color: #004c67;"> <span class="content"> <img alt="Dentacoin logo" data-defer-src="/assets/images/rounded-logo-white.svg"><br>RGB: 0 76 103<br>HEX: #004c67<br>CMYK: 98 65 40 24 </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section class="last-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="nav-to-bottom-fourth-dot fs-16 inline-block">&nbsp;</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="download-logo-section text-center-xs">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 col-md-offset-1 fs-0">
                        <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin logo" itemprop="contentUrl" data-defer-src="/assets/images/logo.svg"></figure>
                        <p class="description inline-block"><strong><span style="font-size:24px;">IMPORTANT</span></strong>The logo is an integral part of our visual identity and should therefore be used thoughtfully and consistently. Every company or individual must follow the guidelines above when using the Dentacoin logo. Dentacoin B.V. reserves the right to withdraw permission to use its logo at any time if the use is inconsistent with these guidelines or is otherwise deemed inappropriate by Dentacoin B.V.</p>
                        <div class="btn-container inline-block text-center-xs">
                            <a class="white-bright-blue-btn" download="" href="https://dentacoin.com\assets\uploads\dentacoin-logos-rar.zip"><i aria-hidden="true" class="fa fa-download"></i> DOWNLOAD</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection