@extends("layout")
@section("content")
    <div class="padding-top-100 padding-bottom-200 padding-left-20 padding-right-20 container">
        <div class="padding-bottom-25">
            <button type="button" class="test-mobile">Test isMobile</button>
        </div>
        <div class="padding-bottom-25">
            <button type="button" class="test-os">Test OS</button>
        </div>
        <div class="padding-bottom-25">
            <button type="button" class="test-userAgent">Test navigator.userAgent </button>
        </div>
        <div class="padding-bottom-25">
            <button type="button" class="test-vendor">Test navigator.vendor </button>
        </div>
        <div class="padding-bottom-25">
            <button type="button" class="test-opera">Test window opera </button>
        </div>
    </div>
@endsection