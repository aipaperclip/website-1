@extends("layout")

@section("content")
    <section class="privacy-policy-container">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                    <h1 class="text-center page-h1-title">{{ $meta_data->page_title }}</h1>
                    {!! $sections[0]->html !!}
                </div>
            </div>
        </div>
    </section>
@endsection