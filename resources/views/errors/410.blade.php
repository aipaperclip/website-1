@extends("layout")

@section("content")
    <div class="container-404">
        <div class="text-center padding-left-15 padding-right-15 padding-top-100 padding-bottom-100 calibri-bold fs-120 line-height-80">410 error</div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-center">
                    <div class="ops">Oops! We couldn't find this page.</div>
                    <div class="homepage-link"><a href="{{ route('home') }}" class="white-blue-btn">BACK TO HOME</a></div>
                </div>
            </div>
        </div>
    </div>
@endsection