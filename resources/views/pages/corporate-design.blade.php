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
    <div class="corporate-design-container" id="scroll-to-content">
        <section class="page-navigation container">
            <nav class="row">
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'round-logo'])}}#scroll-to-content" class="dark-blue-white-btn @if(request()->route()->parameters['slug'] == 'round-logo') active @endif">
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
                    <a href="{{route('corporate-design', ['slug' => 'one-line-logo'])}}#scroll-to-content" class="dark-blue-white-btn @if(request()->route()->parameters['slug'] == 'one-line-logo') active @endif">ONE-LINE LOGO
                        @if(request()->route()->parameters['slug'] == 'one-line-logo')
                            <div class="nav-to-bottom-first-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    </a>
                    @if(request()->route()->parameters['slug'] == 'one-line-logo')
                        <div class="nav-to-bottom-second-dot fs-16 inline-block">&nbsp;</div>
                    @endif
                </div>
                <div class="col-xs-12 col-sm-3 inline-block single-col">
                    <a href="{{route('corporate-design', ['slug' => 'two-line-logo'])}}#scroll-to-content" class="dark-blue-white-btn @if(request()->route()->parameters['slug'] == 'two-line-logo') active @endif">TWO-LINE LOGO
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
    {!! $parent_sections[1]->html !!}
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
