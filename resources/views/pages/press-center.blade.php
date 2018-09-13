@extends("layout")

@section("content")
    <div class="press-center-container">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12 section-title">{{ $meta_data->page_title }}</h1>
            </div>
            <div class="row">
                @if(!empty($sections))
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2  col-lg-6 col-lg-offset-3 subtitle">{!! $sections[0]->html !!}
                        <div class="errors">
                            @include('admin.partials.error')
                            @include('admin.partials.success')
                        </div>
                    </div>
                @endif
            </div>
            <div class="row list">
                @php($first = false)
                @php($i = 0)
                @foreach($posts as $post)
                    @php($i = $i + 1)
                    <article class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single fs-0">
                        @if($first)
                            <div class="mobile-vertical-line-30"></div>
                        @endif
                        <div class="inline-block-top image">
                            <figure @if(!empty($post->media)) itemscope="" itemtype="http://schema.org/ImageObject" @endif>
                                <img src="{{URL::asset('assets/uploads/'.$post->media->name) }}" @if(!empty($post->media->alt)) alt="{{$post->media->alt}}" @endif itemprop="contentUrl"/>
                            </figure>
                            @if(!empty($post) && !empty($post->created_at))
                                <time>{{$post->created_at->format('d-m-Y')}}</time>
                            @endif
                            @if(!$first)
                                <div class="inline-block dot first-dot">&nbsp;</div>
                                @php($first = true)
                            @endif
                            @if($i == count($posts))
                                <div class="inline-block dot last-dot">&nbsp;</div>
                            @endif
                        </div>
                        <div class="inline-block-top content fs-16">
                            <div class="title">{{ $post->headline }}</div>
                            {!! $post->text !!}<a href="{{ $post->link }}" class="read-more" target="_blank">... read more</a>
                        </div>
                    </article>
                @endforeach
            </div>
            <div class="row">
                <div class="col-xs-12 gutter-xs-5">@include('partials.pagination')</div>
            </div>
        </div>
    </div>
@endsection