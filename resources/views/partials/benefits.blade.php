@if(!empty($benefits))
    @if(!empty($title))
        <div class="row">
            <h2 class="col-xs-12 section-title">WHY WORK WITH US</h2>
        </div>
    @endif
    <div class="row benefits fs-0">
        <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 wrapper">
            <div class="row">
                @foreach($benefits as $benefit)
                    <div class="col-xs-12 col-sm-3 single inline-block-top text-center">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img data-defer-src="{{URL::asset('assets/uploads/'.$benefit->media->name) }}" alt="{{$benefit->media->alt}}" itemprop="contentUrl"/>
                            <figcaption>{!! $benefit->text !!}</figcaption>
                        </figure>
                    </div>
                @endforeach
            </div>
        </div>
        @if(!empty($borders))
            <div class="left-border custom-border"></div>
            <div class="right-border custom-border"></div>
        @endif
    </div>
@endif