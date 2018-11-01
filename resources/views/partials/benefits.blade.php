@if(!empty($benefits))
    @if(!empty($title))
        <div class="row">
            <h2 class="col-xs-12 section-title">{{$titles[4]->html}}</h2>
        </div>
    @endif
    <div class="row benefits fs-0">
        <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 wrapper">
            <div class="row">
                @foreach($benefits as $benefit)
                    <div class="col-xs-12 col-sm-3 single inline-block-top text-center">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/uploads/'.$benefit->media->name) }}" alt="{{$benefit->media->alt}}" itemprop="contentUrl"/>
                            <figcaption>{!! $benefit->text !!}</figcaption>
                        </figure>
                    </div>
                @endforeach
            </div>
        </div>
        <div class="left-border custom-border"></div>
        <div class="right-border custom-border"></div>
    </div>
@endif