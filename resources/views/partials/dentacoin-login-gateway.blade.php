@php($api_enums = (new \App\Http\Controllers\APIRequestsController())->getAllEnums())
<div class="dentacoin-login-gateway-fs-0 popup-header-action">
    <a href="javascript:void(0)" class="inline-block gateway-platform-background-color" data-type="patient">USERS</a>
    <a href="javascript:void(0)" class="inline-block init-dentists-click-event" data-type="dentist">DENTISTS</a>
</div>
<div class="dentacoin-login-gateway-fs-0 popup-body">
    <div class="patient inline-block gateway-platform-background-color">
        <div class="form-login">
            <h2>LOG IN</h2>
            <div class="padding-bottom-10">
                <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//api.dentacoin.com/api/login" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient"><i class="fa fa-facebook-official inline-block dentacoin-login-gateway-fs-30 margin-right-20" aria-hidden="true"></i><span class="inline-block">Continue with Facebook</span></a>
            </div>
            <div>
                <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//api.dentacoin.com/api/login" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient">Continue with Civic</a>
            </div>
            <div class="have-old-account">Have an old profile with email and password? Contact us
            </div>
            <div class="popup-half-footer">
                Don't have an account? <a href="javascript:void(0)" class="call-sign-up">Sign up</a>
            </div>
        </div>
        <div class="form-register">
            <h2>SIGN UP</h2>
            <div class="padding-bottom-10">
                <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//api.dentacoin.com/api/register" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient" custom-stopper="true"><i class="fa fa-facebook-official inline-block dentacoin-login-gateway-fs-30 margin-right-20" aria-hidden="true"></i><span class="inline-block">Continue with Facebook</span></a>
            </div>
            <div>
                <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//api.dentacoin.com/api/register" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif data-type="patient" custom-stopper="true">Continue with Civic</a>
            </div>
            <div class="privacy-policy-row padding-top-20">
                <div class="custom-checkbox-style">
                    <input type="checkbox" class="custom-checkbox-input" id="privacy-policy-registration-patient"/>
                    <label class="dentacoin-login-gateway-fs-15" for="privacy-policy-registration-patient">I agree with <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label>
                </div>
            </div>
            <div class="step-errors-holder"></div>
            <div class="popup-half-footer">
                Already have an account? <a href="javascript:void(0)" class="call-log-in">Log in</a>
            </div>
        </div>
    </div>
    <div class="dentist inline-block custom-hide">
        <div class="form-login">
            <h2>LOG IN</h2>
            <form method="POST" id="dentist-login">
                <div class="padding-bottom-10 field-parent">
                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                        <label for="dentist-login-email">Email address:</label>
                        <input class="full-rounded form-field" name="email" maxlength="100" type="email" id="dentist-login-email" placeholder=""/>
                    </div>
                </div>
                <div class="padding-bottom-20 field-parent">
                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                        <label for="dentist-login-password">Password:</label>
                        <input class="full-rounded form-field" name="password" maxlength="50" id="dentist-login-password" type="password"/>
                    </div>
                </div>
                <div class="btn-container text-center">
                    <input type="submit" value="Log in" class="platform-button gateway-platform-background-color dentacoin-login-gateway-fs-20"/>
                </div>
                <div class="text-center padding-top-40 dentacoin-login-gateway-fs-16">Don't have an account? <a href="javascript:void(0)" class="call-sign-up dentacoin-login-gateway-fs-20">Sign up</a></div>
            </form>
            <div class="popup-half-footer">
                <a href="#">Forgotten password?</a>
            </div>
        </div>
        <div class="form-register">
            <h2>Sign Up Now - Quick & Easy!</h2>
            <form method="POST" enctype="multipart/form-data" id="dentist-register">
                <div class="step first visible" data-step="first">
                    <div class="padding-bottom-10 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-email">Work Email Address:</label>
                            <input class="full-rounded form-field" name="email" maxlength="100" type="email" id="dentist-register-email"/>
                        </div>
                    </div>
                    <div class="padding-bottom-10 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-password">Password:</label>
                            <input class="full-rounded form-field password" name="password" minlength="6" maxlength="50" type="password" id="dentist-register-password"/>
                        </div>
                    </div>
                    <div class="padding-bottom-20 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-repeat-password">Repeat password:</label>
                            <input class="full-rounded form-field repeat-password" name="repeat-password" minlength="6" maxlength="50" type="password" id="dentist-register-repeat-password"/>
                        </div>
                    </div>
                </div>
                <div class="step second" data-step="second">
                    <div class="padding-bottom-20 user-type-container dentacoin-login-gateway-fs-0">
                        <input type="hidden" name="user-type" value="dentist"/>
                        <div class="inline-block-top user-type active padding-right-15" data-type="dentist">
                            <a href="javascript:void(0)" class="custom-button gateway-platform-border-color-important">
                                <span class="custom-radio inline-block"><span class="circle"></span></span> <span class="inline-block user-type-label gateway-platform-color">Dentist</span>
                            </a>
                            <div class="dentacoin-login-gateway-fs-14 light-gray-color">For associate dentists OR independent practitioners</div>
                        </div>
                        <div class="inline-block-top user-type padding-left-15" data-type="clinic">
                            <a href="javascript:void(0)" class="custom-button">
                                <span class="custom-radio inline-block"><span class="circle"></span></span> <span class="inline-block user-type-label">Clinic</span>
                            </a>
                            <div class="dentacoin-login-gateway-fs-14 light-gray-color">For clinics with more than one dental practitioners</div>
                        </div>
                    </div>
                    <div class="padding-bottom-25 field-parent">
                        <div class="custom-google-select-style module">
                            <label>Title:</label>
                            <select class="form-field required gateway-platform-border-color" name="dentist-title">
                                @foreach($api_enums->titles as $key => $title)
                                    <option value="{{$key}}">{{$title}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="padding-bottom-15 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-latin-name">Your Name (Latin letters):</label>
                            <input class="full-rounded form-field required" name="latin-name" maxlength="100" type="text" id="dentist-register-latin-name"/>
                        </div>
                        <div class="dentacoin-login-gateway-fs-14 light-gray-color">Ex: Vladimir Alexandrovich (First name, Last name)</div>
                    </div>
                    <div class="padding-bottom-30 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-alternative-name">Alternative Spelling (optional):</label>
                            <input class="full-rounded form-field" name="alternative-name" maxlength="100" type="text" id="dentist-register-alternative-name"/>
                        </div>
                        <div class="dentacoin-login-gateway-fs-14 light-gray-color">Ex: Владимир Александрович</div>
                    </div>
                    <div class="privacy-policy-row padding-bottom-20 custom-checkbox-style">
                        <input type="checkbox" class="custom-checkbox-input" id="privacy-policy-registration"/>
                        <label class="dentacoin-login-gateway-fs-15" for="privacy-policy-registration">I've read and agree to the <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label>
                    </div>
                </div>
                <div class="step third address-suggester-wrapper" data-step="third">
                    <div class="padding-bottom-20 field-parent">
                        <div class="custom-google-select-style module">
                            @php($countries = (new \App\Http\Controllers\APIRequestsController())->getAllCountries())
                            <label>Select country:</label>
                            @php($current_phone_code = '+'.$countries[0]->phone_code)
                            @if(isset($client_ip) && $client_ip != '127.0.0.1')
                                @php($current_user_country_code = (new \App\Http\Controllers\APIRequestsController())->getCountry($client_ip))
                            @endif
                            <select name="country-code" id="dentist-country" class="form-field required country-select gateway-platform-border-color" @if(!empty($current_user_country_code)) data-current-user-country-code="{{$current_user_country_code}}" @endif>
                                @if(!empty($countries))
                                    @foreach($countries as $country)
                                        @php($selected = '')
                                        @if(!empty($current_user_country_code))
                                            @if($current_user_country_code == $country->code)
                                                @php($current_phone_code = '+'.$country->phone_code)
                                                @php($selected = 'selected')
                                            @endif
                                        @endif
                                        <option value="{{$country->code}}" data-code="{{$country->phone_code}}" {{$selected}}>{{$country->name}}</option>
                                    @endforeach
                                @endif
                            </select>
                        </div>
                    </div>
                    <div class="padding-bottom-15 suggester-parent module field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-address">Address: Start typing street, No, city</label>
                            <input type="text" name="address" class="full-rounded form-field required address-suggester dont-init" autocomplete="off" id="dentist-register-address">
                        </div>
                        <div class="suggester-map-div margin-top-15 margin-bottom-10"></div>
                        <div class="alert alert-notice geoip-confirmation margin-top-10 margin-bottom-10 hide-this">Please check the map to make sure we got your correct address. If you're not happy - please drag the map to adjust it.</div>
                        <div class="alert alert-warning geoip-hint margin-top-10 margin-bottom-10">Please enter a valid address for your practice (including street name and number)</div>
                    </div>
                    <div class="padding-bottom-15 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-website">Website: http(s)://:</label>
                            <input class="full-rounded form-field required" name="website" id="dentist-register-website" maxlength="250" type="url"/>
                        </div>
                        <div class="dentacoin-login-gateway-fs-14 light-gray-color">No website? Add your most popular social page.</div>
                    </div>
                    <div class="padding-bottom-10 field-parent">
                        <div class="phone">
                            <div class="country-code" name="phone-code">{{$current_phone_code}}</div>
                            <div class="custom-google-label-style module input-phone" data-input-colorful-border="true">
                                <label for="dentist-register-phone">Phone number:</label>
                                <input class="full-rounded form-field required" name="phone" maxlength="50" type="number" id="dentist-register-phone"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step fourth" data-step="fourth">
                    <div class="padding-bottom-20 dentacoin-login-gateway-fs-0">
                        <div class="inline-block-top avatar module upload-file">
                            <input type="file" class="visualise-image inputfile" id="custom-upload-avatar" name="image" accept=".jpg,.png,.jpeg,.svg,.bmp"/>
                            <input type="hidden" id="hidden-image" name="hidden-image"/>
                            <div class="btn-wrapper"></div>
                            <div id="cropper-container"></div>
                            <div class="dentacoin-login-gateway-fs-14 padding-top-5 italic max-size-label"><label for="custom-upload-avatar" class="inline-block margin-right-10 max-width-30"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="width-100"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" class=""></path></svg></label>Max size: 2MB</div>
                        </div>
                        <div class="inline-block-top specializations">
                            <h4>Please select your specializations:</h4>
                            @foreach($api_enums->specialisations as $key => $specialisation)
                                <div class="custom-checkbox-style padding-bottom-5">
                                    <input type="checkbox" class="custom-checkbox-input" name="specializations[]" id="specialization-{{$key}}" value="{{$key}}"/>
                                    <label class="dentacoin-login-gateway-fs-15" for="specialization-{{$key}}">{{$specialisation}}</label>
                                </div>
                            @endforeach
                        </div>
                        <div class="step-errors-holder padding-top-10"></div>
                    </div>
                </div>
                <div class="btns-container">
                    <div class="inline-block">
                        <input type="button" value="< back" class="prev-step"/>
                    </div>
                    <div class="inline-block text-right">
                        <input type="button" value="Next" class="platform-button gateway-platform-background-color dentacoin-login-gateway-fs-20 next-step" data-current-step="first"/>
                        @if(isset($inviter))
                            <input type="hidden" name="inviter" value="{{\Illuminate\Support\Facades\Input::get('inviter')}}">
                        @endif
                    </div>
                </div>
            </form>
            <div class="popup-half-footer">
                Already have an account? <a href="javascript:void(0)" class="call-log-in">Log in</a>
            </div>
        </div>
    </div>
</div>