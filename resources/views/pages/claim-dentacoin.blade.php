@extends('layout')
@section('content')
    <section>
        <div class="container padding-top-50">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1 col-xs-12 col-md-8 col-md-offset-2 text-center">
                    <h1 class="fs-35">REDEEM YOUR REWARD</h1>
                    <h2>for a purchase at <a href="https://toothbrushzone.com/" target="_blank">toothbrushzone.com</a></h2>
                    <div class="padding-top-30 padding-bottom-30">You can claim: <img src="/assets/images/logo.svg" class="width-100 inline-block max-width-20" alt="Dentacoin logo"/> <span>{{$amount}}</span></div>
                </div>
            </div>
        </div>
    </section>
@endsection