@extends("layout")
@section("content")
    <div class="corporate-design-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 page-h1-title">Corporate Design Manual</h1>
            </div>
            <div class="row image-and-text fs-0">
                <div class="col-xs-12 col-sm-6 inline-block image">
                    <div class="second-dot fs-16 inline-block">&nbsp;</div>
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/corporate-design-main-image-grey.svg" alt="Drawing tools" itemprop="contentUrl"/>
                        <div class="third-dot fs-16 inline-block">&nbsp;</div>
                    </figure>
                </div>
                <div class="col-xs-12 col-sm-6 inline-block text">
                    <div class="section-subtitle">Dentacoin Visual Identity</div>
                    <div class="description">The logo is an integral part of Dentacoin and should therefore be used thoughtfully and consistently. Every company or individual must follow these guidelines when using the Dentacoin logo. Dentacoin B.V. reserves the right to withdraw permission to use its logo at any time if the use is inconsistent with these guidelines or is otherwise deemed inappropriate by Dentacoin B.V. <a href="">Read more...</a> </div>
                </div>
            </div>
        </div>
        @include('partials.download-logo')
    </div>
@endsection