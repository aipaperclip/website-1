@if(!empty($benefits))
    @if(!empty($title))
        <div class="row">
            <h2 class="col-xs-12 section-title">BENEFITS AT DENTACOIN</h2>
        </div>
    @endif
    <div class="row benefits fs-0">
        @foreach($benefits as $benefit)
            <div class="col-xs-12 col-sm-3 single inline-block-top text-center">
                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="{{URL::asset('assets/uploads/'.$benefit->media->name) }}" alt="{{$benefit->media->alt}}" itemprop="contentUrl"/>
                    <figcaption>{!! $benefit->text !!}</figcaption>
                </figure>
            </div>
        @endforeach
        <div class="left-border custom-border"></div>
        <div class="right-border custom-border"></div>
    </div>
@endif