<div class="dcn-big-hub">
    <div class="app-list @if (!empty($hubType)) @if ($hubType == 'dentists') dark-blue-background @else light-blue-background @endif @endif">
        <div>
            <h3 class="rotated-text">DENTACOIN ECOSYSTEM</h3>
        </div>
        <div class="list-wrapper">
            @foreach ($hubElements as $hubElement)
                @if ($hubElement->type == 'folder' && empty($hubElement->children))
                    @continue
                @endif

                @if ($hubElement->type == 'link')
                    <button class="single-application link" data-video="{{$hubElement->video_link}}" data-platform="{{$hubElement->slug}}" @if ($hubElement->media_name) data-image="{{URL::asset('assets/uploads/'.$hubElement->media_name) }}" data-image-alt="@if ($hubElement->alt){{$hubElement->alt}}@endif" @endif data-title="{{$hubElement->title}}" data-html="{{ json_encode($hubElement->html) }}" @if ($hubElement->slug == 'dentacoin-blog') @if (!empty($latest_blog_articles)) data-articles="{{json_encode($latest_blog_articles)}}" @endif @endif>
                        <figure class="wrapper" itemscope="" itemtype="http://schema.org/ImageObject">
                            @if ($hubElement->media_name)
                                <img data-defer-src="{{URL::asset('assets/uploads/'.$hubElement->media_name) }}" itemprop="contentUrl" @if (!empty($hubElement->alt)) alt="{{$hubElement->alt}}" @endif/>
                            @endif
                            <figcaption class="hub-element-title">{{$hubElement->title}}</figcaption>
                        </figure>
                    </button>
                @elseif ($hubElement->type == 'folder')
                    <button class="single-application folder">
                        @if (!empty($hubElement->media_name))
                            <figure class="wrapper" itemscope="" itemtype="http://schema.org/ImageObject">
                                @if (!empty($hubElement->media_name))
                                    <img data-defer-src="{{URL::asset('assets/uploads/'.$hubElement->media_name) }}" itemprop="contentUrl" @if (!empty($hubElement->alt)) alt="{{$hubElement->alt}}" @endif/>
                                @endif
                                <figcaption class="hub-element-title">{{$hubElement->title}}</figcaption>
                            </figure>
                        @else
                            <div class="hub-folder">
                                <div class="apps-in-folder-list">
                                    @foreach($hubElement->children as $child)
                                        <img data-defer-src="//dentacoin.com/assets/uploads/{{$child->media_name}}" alt="{{$child->alt}}"/>
                                    @endforeach
                                </div>
                            </div>
                            <div class="hub-element-title">{{$hubElement->title}}</div>
                        @endif
                    </button>
                @endif
            @endforeach
        </div>
    </div>
    <div class="info-section">
        <a href="javascript:void(0)" class="close-application">×</a>
        <figure class="logo"><img></figure>
        <h3 class="title"></h3>
        <div class="video-content"></div>
        <div class="html-content"></div>
        <div class="extra-html-content"></div>
    </div>
</div>