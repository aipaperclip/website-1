@if (sizeof($video_expressions) > 0)
    <div class="container-fluid padding-top-50">
        <div class="row padding-bottom-10">
            <div class="col-xs-12 text-center color-black">
                <h3 class="fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10 lato-bold">{{$title}}</h3>
                <h2 class="fs-50 fs-sm-40 fs-xs-26 fs-lgll-65 lato-black">TESTIMONIALS</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 video-expressions-slider module" data-type="{{$type}}">
                @foreach ($video_expressions as $video_expression)
                    @if (isset($mobile))
                        @if(($mobile && !filter_var($video_expression->mobile_visible, FILTER_VALIDATE_BOOLEAN)) || (!$mobile && !filter_var($video_expression->desktop_visible, FILTER_VALIDATE_BOOLEAN)))
                            @continue
                        @endif
                    @endif
                    @php($videoId = (new \App\Http\Controllers\Controller())->getYoutubeVideoId($video_expression->url))
                    <div class="single-slide" data-video-id="{{$videoId}}" data-order-id="{{$video_expression->order_id}}">
                        <div class="slide-wrapper">
                            <div class="video-thumb">
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img data-defer-src="https://img.youtube.com/vi/{{$videoId}}/maxresdefault.jpg" alt="Youtube video thumbnail" itemprop="contentUrl"/>
                                </figure>
                                <a href="javascript:void(0);" class="youtube-play-button" data-id="{{$video_expression->id}}">
                                    <img data-defer-src="/assets/images/youtube-play-button.png" alt="Youtube play video" itemprop="contentUrl"/>
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endif