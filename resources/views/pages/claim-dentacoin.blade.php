@extends('layout')
@section('content')
    <section>
        <div class="container padding-top-50">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1 col-xs-12 col-md-8 col-md-offset-2 text-center">
                    <h1 class="fs-35">REDEEM YOUR REWARD</h1>
                    <h2>for a purchase at <a href="https://toothbrushzone.com/" target="_blank" class="light_blue">toothbrushzone.com</a></h2>
                    <div class="padding-top-30 padding-bottom-50 fs-28 lato-black">You can claim: <img src="/assets/images/logo.svg" class="width-100 inline-block max-width-30" alt="Dentacoin logo"/> <span>{{$amount}}</span></div>
                    <div class="custom-google-label-style module">
                        <label for="wallet-address">Dentacoin Wallet Address:</label>
                        <input class="full-rounded" name="repeat-password" maxlength="42" type="text" id="wallet-address"/>
                    </div>
                    <div class="padding-top-15 padding-bottom-30">
                        You don't have a wallet yet? <a href="https://wallet.dentacoin.com" target="_blank" class="light_blue">See how to create one.</a>
                    </div>
                    <div>
                        <a href="javascript:void(0);" class="white-dark-blue-btn">REDEEM</a>
                    </div>
                </div>
            </div>
        </div>
        <figure itemscope="" itemtype="http://schema.org/ImageObject">
            <img src="/assets/images/claim-dentacoin-background.png" class="width-100" alt="Claim dentacoin footer image" itemprop="contentUrl"/>
        </figure>
    </section>
@endsection