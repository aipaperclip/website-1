@extends("layout")
@section("content")
    <div class="corporate-design-container">
        <section class="container">
            <div class="row">
                <h1 class="col-xs-12 page-h1-title">Corporate Design Manual</h1>
            </div>
        </section>
    </div>
    {!! $parent_sections[0]->html !!}
    <div class="corporate-design-container">
        {!! $parent_sections[1]->html !!}
        <section class="page-navigation container">
            <nav class="row">
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'round-logo'])}}" class="dark-blue-white-btn @if(request()->route()->parameters['slug'] == 'round-logo') active @endif">
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
                    <a href="{{route('corporate-design', ['slug' => 'one-line-logo'])}}" class="dark-blue-white-btn @if(request()->route()->parameters['slug'] == 'one-line-logo') active @endif">ONE-LINE LOGO
                        @if(request()->route()->parameters['slug'] == 'one-line-logo')
                            <div class="nav-to-bottom-first-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    </a>
                    @if(request()->route()->parameters['slug'] == 'one-line-logo')
                        <div class="nav-to-bottom-second-dot fs-16 inline-block">&nbsp;</div>
                    @endif
                </div>
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'two-line-logo'])}}" class="dark-blue-white-btn @if(request()->route()->parameters['slug'] == 'two-line-logo') active @endif">TWO-LINE LOGO
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
    {!! $sections[0]->html !!}
    <div class="corporate-design-container">
        <section>
            <div class="container">
                <div class="row padding-left-35 padding-right-35 padding-top-30 padding-top-xs-0 padding-bottom-xs-20 padding-bottom-50 no-gutter-xs">
                    <div class="col-xs-12 padding-left-30 padding-right-30 gutter-xs-15">
                        <div class="section-subtitle">Background Color Suggestions</div>
                    </div>
                </div>
                <div class="row padding-left-40 padding-right-40">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 padding-bottom-15 calibri-bold fs-18">Use with black & blue logos</div>
                </div>
                <div class="row padding-left-40 padding-right-40 padding-bottom-70 clickable-squares-row">
                    <div class="col-xs-12 col-lg-10 col-lg-offset-1">
                        <a href="javascript:void(0)" class="square border active" style="background-color: #ffffff;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/logo.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 255 255 255<br>
                                HEX: #ffffff<br>
                                CMYK: 0 0 0 0
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #f2f2f2;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/logo.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 242 242 242<br>
                                HEX: #f2f2f2<br>
                                CMYK: 4 2 2 0
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #e6e6e6;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/logo.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 230 230 230<br>
                                HEX: #e6e6e6<br>
                                CMYK: 9 6 7 0
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #d3ebfb;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/logo.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 211 235 251<br>
                                HEX: #d3ebfb<br>
                                CMYK: 4 2 2 0
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #36c0ff;">
                            <div class="content">
                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/logo.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 54 192 255<br>
                                HEX: #36c0ff<br>
                                CMYK: 60 7 0 0
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #08abe0;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/logo.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 8 171 224<br>
                                HEX: #08abe0<br>
                                CMYK: 72 13 1 0
                            </div>
                        </a>
                    </div>
                </div>
                <div class="row padding-left-40 padding-right-40">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 padding-bottom-15 calibri-bold fs-18">Use with white logo</div>
                </div>
                <div class="row padding-left-40 padding-right-40 padding-bottom-100 clickable-squares-row white-color">
                    <div class="col-xs-12 col-lg-10 col-lg-offset-1">
                        <a href="javascript:void(0)" class="square active" style="background-color: #000000;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/rounded-logo-white.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 0 0 0<br>
                                HEX: #000000<br>
                                CMYK: 75 68 67 90
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #001833;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/rounded-logo-white.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 0 24 51<br>
                                HEX: #001833<br>
                                CMYK: 96 83 48 63
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #041e42;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/rounded-logo-white.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 4 30 66<br>
                                HEX: #041e42<br>
                                CMYK: 100 88 42 51
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #004593;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/rounded-logo-white.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 0 69 147<br>
                                HEX: #004593<br>
                                CMYK: 100 84 11 1
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #126585;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/rounded-logo-white.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 18 101 133<br>
                                HEX: #126585<br>
                                CMYK: 91 54 32 9
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="square" style="background-color: #004c67;">
                            <div class="content">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/rounded-logo-white.svg" alt="" itemprop="contentUrl"/>
                                </figure>
                                RGB: 0 76 103<br>
                                HEX: #004c67<br>
                                CMYK: 98 65 40 24
                            </div>
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
        {!! $parent_sections[2]->html !!}
    </div>
@endsection

{{--
<section class="download-logo-section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-10 col-md-offset-1 fs-0">
                <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                    <img src="/assets/images/logo.svg" alt="Dentacoin logo" itemprop="contentUrl"/>
                </figure>
                <p class="description inline-block">
                    <strong>IMPORTANT</strong>he logo is an integral part of our visual identity and should therefore be used thoughtfully and consistently. Every company or individual must follow the guidelines above when using the Dentacoin logo. Dentacoin B.V. reserves the right to withdraw permission to use its logo at any time if the use is inconsistent with these guidelines or is otherwise deemed inappropriate by Dentacoin B.V.global oral health.
                </p>
                <div class="btn-container inline-block">
                    <a href="" class="white-dark-blue-btn"><i class="fa fa-download" aria-hidden="true"></i> DOWNLOAD LOGO</a>
                </div>
            </div>
        </div>
    </div>
</section>--}}
