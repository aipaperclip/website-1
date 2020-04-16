@php($api_enums = (new \App\Http\Controllers\APIRequestsController())->getAllEnums())
@if(!empty($incompletedRegistrationData))
    @if(property_exists($incompletedRegistrationData, 'phone') && !empty($incompletedRegistrationData->phone) && property_exists($incompletedRegistrationData, 'website') && !empty($incompletedRegistrationData->website) && property_exists($incompletedRegistrationData, 'address')  && !empty($incompletedRegistrationData->address) && property_exists($incompletedRegistrationData, 'country_id') && !empty($incompletedRegistrationData->country_id))
        @php($currentActiveStep = 'fourth')
    @else
        @php($currentActiveStep = 'third')
    @endif
@endif
<div class="dentacoin-login-gateway-fs-0 popup-header-action">
    <a href="javascript:void(0)" class="inline-block @if($type == 'patient-login' || $type == 'patient-register') gateway-platform-background-color-important active @endif" data-type="patient">USERS</a>
    <a href="javascript:void(0)" class="inline-block init-dentists-click-event @if($type == 'dentist-login' || $type == 'dentist-register' || $type == 'incompleted-dentist-register') active @endif" data-type="dentist">DENTISTS</a>
</div>
<div class="dentacoin-login-gateway-fs-0 popup-body">
    <div class="patient inline-block gateway-platform-background-color @if($type == 'dentist-login' || $type == 'dentist-register' || $type == 'incompleted-dentist-register') custom-hide @endif">
        <div class="form-login @if($type == 'patient-register' || $type == 'dentist-register' || $type == 'incompleted-dentist-register') display-none @endif">
            <h2 class="login-section-title">LOG IN</h2>
            <div class="form-login-fields">
                <div class="padding-bottom-10">
                    <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//dev-api.dentacoin.com/api/login" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif><i class="fa fa-facebook-official inline-block dentacoin-login-gateway-fs-30 margin-right-20" aria-hidden="true"></i><span class="inline-block">Continue with Facebook</span></a>
                </div>
                <div>
                    <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//dev-api.dentacoin.com/api/login" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif>Continue with Civic</a>
                </div>
                <div class="have-old-account">Have an old profile with email and password? <a href="mailto:admin@dentacoin.com">Contact us</a>
                </div>
                <div class="popup-half-footer">
                    Don't have an account? <a href="javascript:void(0)" class="call-sign-up">Sign up</a>
                </div>
            </div>
        </div>
        <div class="form-register @if($type == 'patient-login' || $type == 'dentist-login') display-none @endif">
            <h2>SIGN UP</h2>
            <div class="padding-bottom-10">
                <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//dev-api.dentacoin.com/api/register" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif custom-stopper="true"><i class="fa fa-facebook-official inline-block dentacoin-login-gateway-fs-30 margin-right-20" aria-hidden="true"></i><span class="inline-block">Continue with Facebook</span></a>
            </div>
            <div>
                <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular dentacoin-login-gateway-fs-20" data-url="//dev-api.dentacoin.com/api/register" data-platform="dentacoin" @if(isset($inviter)) data-inviter="{{$inviter}}" @endif custom-stopper="true">Continue with Civic</a>
            </div>
            <div class="padding-top-20">
                <div class="custom-checkbox-style">
                    <input type="checkbox" class="custom-checkbox-input" id="agree-over-eighteen"/>
                    <label class="dentacoin-login-gateway-fs-15 custom-checkbox-label" for="agree-over-eighteen">I confirm that I'm 18 years of age or older.</label>
                </div>
            </div>
            <div class="patient-register-checkboxes padding-top-5">
                <div class="custom-checkbox-style">
                    <input type="checkbox" class="custom-checkbox-input" id="privacy-policy-registration-patient"/>
                    <label class="dentacoin-login-gateway-fs-15 custom-checkbox-label" for="privacy-policy-registration-patient">I agree with <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label>
                </div>
            </div>
            <div class="step-errors-holder"></div>
            <div class="optional-user-type">
                @if(!empty($api_enums) && property_exists($api_enums, 'user_patient_type') && !empty($api_enums->user_patient_type))
                    <div class="dentacoin-login-gateway-fs-15 padding-top-50">Does any of the following apply to you (optional):</div>
                    <ul class="padding-top-10">
                        @foreach($api_enums->user_patient_type as $key => $title)
                            <li class="padding-bottom-5 custom-checkbox-style">
                                <input type="checkbox" data-radio-group="user_patient_type" name="user_patient_type[]" class="custom-checkbox-input" id="{{$key}}" value="{{$key}}"/>
                                <label class="dentacoin-login-gateway-fs-15 custom-checkbox-label" for="{{$key}}">{{$title}}</label>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>
            <div class="popup-half-footer">
                Already have an account? <a href="javascript:void(0)" class="call-log-in">Log in</a>
            </div>
        </div>
    </div>
    <div class="dentist inline-block @if($type == 'patient-login' || $type == 'patient-register') custom-hide @endif">
        {{var_dump($type)}}
        <div class="form-login @if($type == 'dentist-register' || $type == 'patient-register' || $type = 'incompleted-dentist-register') display-none @endif">
            <h2>LOG IN</h2>
            <form method="POST" id="dentist-login">
                <div class="padding-bottom-10 field-parent">
                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                        <label for="dentist-login-email">Email address:</label>
                        <input class="full-rounded form-field" name="email" maxlength="100" type="email" id="dentist-login-email" />
                    </div>
                </div>
                <div class="padding-bottom-20 field-parent">
                    <div class="custom-google-label-style module" data-input-colorful-border="true">
                        <label for="dentist-login-password">Password:</label>
                        <input class="full-rounded form-field" name="password" maxlength="50" id="dentist-login-password" type="password"/>
                    </div>
                </div>
                <div class="dentist-login-errors"></div>
                <div class="btn-container text-center">
                    <input type="submit" value="Log in" class="platform-button gateway-platform-background-color dentacoin-login-gateway-fs-20"/>
                </div>
                <div class="text-center padding-top-40 dentacoin-login-gateway-fs-16">Don't have an account? <a href="javascript:void(0)" class="call-sign-up dentacoin-login-gateway-fs-20">Sign up</a></div>
            </form>
            <div class="popup-half-footer">
                <a href="#" target="_blank" class="forgotten-password-link">Forgotten password?</a>
            </div>
        </div>
        <div class="form-register @if($type == 'dentist-login' || $type == 'patient-login') display-none @endif">
            <h2>SIGN UP</h2>
            <form method="POST" enctype="multipart/form-data" id="dentist-register">
            <div class="step first @if(!isset($currentActiveStep)) visible @endif" data-step="first">
                    <div class="padding-bottom-10 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-email" @if(!empty($incompletedRegistrationData)) class="active-label gateway-platform-color-important" @endif>Work Email Address:</label>
                            <input class="full-rounded form-field  @if(!empty($incompletedRegistrationData)) gateway-platform-border-color-important @endif" name="email" maxlength="100" type="email" id="dentist-register-email" @if(!empty($incompletedRegistrationData)) value="{{$incompletedRegistrationData->email}}" @endif/>
                        </div>
                    </div>
                    <div class="padding-bottom-10 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-password" @if(!empty($incompletedRegistrationData)) class="active-label gateway-platform-color-important" @endif>Password:</label>
                            <input class="full-rounded form-field password @if(!empty($incompletedRegistrationData)) gateway-platform-border-color-important @endif" name="password" minlength="6" maxlength="50" type="password" id="dentist-register-password" @if(!empty($incompletedRegistrationData)) value="{{$incompletedRegistrationData->password}}" @endif/>
                        </div>
                    </div>
                    <div class="padding-bottom-20 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-repeat-password" @if(!empty($incompletedRegistrationData)) class="active-label gateway-platform-color-important" @endif>Repeat password:</label>
                            <input class="full-rounded form-field repeat-password @if(!empty($incompletedRegistrationData)) gateway-platform-border-color-important @endif" name="repeat-password" minlength="6" maxlength="50" type="password" id="dentist-register-repeat-password" @if(!empty($incompletedRegistrationData)) value="{{$incompletedRegistrationData->password}}" @endif/>
                        </div>
                    </div>
                </div>
                <div class="step second" data-step="second">
                    <div class="padding-bottom-20 user-type-container dentacoin-login-gateway-fs-0">
                        <input type="hidden" name="user-type" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode)) value="{{$incompletedRegistrationData->mode}}" @endif/>
                        <div class="inline-block-top user-type padding-right-15 @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'dentist') active @endif" data-type="dentist">
                            <a href="javascript:void(0)" class="custom-button @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'dentist') gateway-platform-border-color-important @endif">
                                <span class="custom-radio inline-block"><span class="circle @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'dentist') gateway-platform-background-color-important @endif"></span></span> <span class="inline-block user-type-label">Dentist</span>
                            </a>
                            <div class="dentacoin-login-gateway-fs-14 light-gray-color padding-top-5">For associate dentists OR independent practitioners</div>
                        </div>
                        <div class="inline-block-top user-type padding-left-15 @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'clinic') active @endif" data-type="clinic">
                            <a href="javascript:void(0)" class="custom-button @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'clinic') gateway-platform-border-color-important @endif">
                                <span class="custom-radio inline-block"><span class="circle @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'clinic') gateway-platform-background-color-important @endif"></span></span> <span class="inline-block user-type-label">Clinic</span>
                            </a>
                            <div class="dentacoin-login-gateway-fs-14 light-gray-color padding-top-5">For clinics with more than one dental practitioners</div>
                        </div>
                    </div>
                    <div class="show-on-user-type-first-change @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode)) show @endif">
                        <div class="show-if-dentist @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'dentist') show @endif">
                            <div class="padding-bottom-20 field-parent dentacoin-login-gateway-fs-18 dentist-type-checkboxes">
                                <div class="padding-bottom-5"><input type="radio" name="dentist-type" value="own_practice" id="own-practice" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'dentist_practice') && !empty($incompletedRegistrationData->dentist_practice) && $incompletedRegistrationData->dentist_practice == 'own_practice') checked @endif/> <label for="own-practice">I own a practice.</label></div>
                                <div><input type="radio" name="dentist-type" value="work_at_practice" id="work-for-practice" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'dentist_practice') && !empty($incompletedRegistrationData->dentist_practice) && $incompletedRegistrationData->dentist_practice == 'work_at_practice') checked @endif/> <label for="work-for-practice">I work for a practice.</label></div>
                            </div>
                            <div class="show-if-dentist-type-selected @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'dentist') show @endif">
                                @if(!empty($api_enums) && property_exists($api_enums, 'titles') && !empty($api_enums->titles))
                                    <div class="padding-bottom-15 field-parent">
                                        <div class="custom-google-select-style module">
                                            <label class="gateway-platform-color">Title:</label>
                                            <select class="form-field required gateway-platform-border-color" name="dentist-title">
                                                @foreach($api_enums->titles as $key => $title)
                                                    <option value="{{$key}}" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'title') && !empty($incompletedRegistrationData->title) && $incompletedRegistrationData->title == $key) selected value="{{$incompletedRegistrationData->website}}" @endif>{{$title}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                @endif
                            </div>
                        </div>
                        <div class="show-if-dentist-type-selected @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode)) show @endif">
                            <div class="padding-bottom-15 field-parent">
                                <div class="custom-google-label-style module tooltip-init" data-input-colorful-border="true">
                                    <div class="tooltip-label gateway-platform-color gateway-platform-border-color changeable-html-based-on-user-type" data-dentist="Write your names in full! This ensures that patients who search for you will find you easily." data-clinic="Write the full names of the dental clinic! This ensures that patients who search for the clinic will find it easily."></div>
                                    <label for="dentist-register-latin-name" class="changeable-html-based-on-user-type @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'name') && !empty($incompletedRegistrationData->name)) active-label gateway-platform-color-important @endif" data-dentist="Your Name (Latin letters):" data-clinic="Clinic Name (Latin letters only):"></label>
                                    <input class="full-rounded form-field required @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'name') && !empty($incompletedRegistrationData->name)) gateway-platform-border-color-important @endif" name="latin-name" maxlength="100" type="text" id="dentist-register-latin-name" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'name') && !empty($incompletedRegistrationData->name)) value="{{$incompletedRegistrationData->name}}" @endif/>
                                </div>
                                <div class="dentacoin-login-gateway-fs-14 light-gray-color changeable-html-based-on-user-type" data-dentist="Ex: Vladimir Alexandrovich (First name, Last name)" data-clinic="Ex: VitaDent Dental Clinic"></div>
                            </div>
                            <div class="padding-bottom-15 field-parent">
                                <div class="custom-google-label-style module tooltip-init" data-input-colorful-border="true">
                                    <div class="tooltip-label gateway-platform-color gateway-platform-border-color">Patients who search for your name in your language will still find your profile.</div>
                                    <label for="dentist-register-alternative-name" class="changeable-html-based-on-resolution @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'name_alternative') && !empty($incompletedRegistrationData->name_alternative)) active-label gateway-platform-color-important @endif" data-desktop="Name in local language (All alphabets, optional):" data-mobile="Name in local language (Optional):"></label>
                                    <input class="full-rounded form-field @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'name_alternative') && !empty($incompletedRegistrationData->name_alternative)) gateway-platform-border-color-important @endif" name="alternative-name" maxlength="100" type="text" id="dentist-register-alternative-name" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'name_alternative') && !empty($incompletedRegistrationData->name_alternative)) value="{{$incompletedRegistrationData->name_alternative}}" @endif/>
                                </div>
                                <div class="dentacoin-login-gateway-fs-14 light-gray-color changeable-html-based-on-user-type" data-dentist="Ex: Влади́мир Алекса́ндрович" data-clinic='Ex: Стоматологія "ВітаДент"'></div>
                            </div>
                            <div class="show-if-dentist @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'dentist') show @endif">
                                <div class="if-work-for-a-practice">
                                    @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'dentist_practice') && !empty($incompletedRegistrationData->dentist_practice) && $incompletedRegistrationData->dentist_practice == 'work_at_practice')
                                        <div class="padding-bottom-15 field-parent">
                                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                                <label for="practice-name" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'clinic_name') && !empty($incompletedRegistrationData->clinic_name)) class="active-label gateway-platform-color-important" @endif>Practice name:</label>
                                                <input class="full-rounded form-field @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'clinic_name') && !empty($incompletedRegistrationData->clinic_name)) gateway-platform-border-color-important @endif" name="practice-name" maxlength="255" type="text" id="practice-name" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'clinic_name') && !empty($incompletedRegistrationData->clinic_name)) value="{{$incompletedRegistrationData->clinic_name}}" @endif/>
                                            </div>
                                        </div>
                                        <div class="padding-bottom-15 field-parent"><div class="custom-google-label-style module" data-input-colorful-border="true">
                                                <label for="practice-email" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'clinic_email') && !empty($incompletedRegistrationData->clinic_email)) class="active-label gateway-platform-color-important" @endif>Official email:</label>
                                                <input class="full-rounded form-field @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'clinic_email') && !empty($incompletedRegistrationData->clinic_email)) gateway-platform-border-color-important @endif" name="practice-email" maxlength="100" type="text" id="practice-email" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'clinic_email') && !empty($incompletedRegistrationData->clinic_email)) value="{{$incompletedRegistrationData->clinic_email}}" @endif/>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="show-if-clinic @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode) && $incompletedRegistrationData->mode == 'clinic') show @endif">
                            <div class="padding-bottom-15 field-parent">
                                <div class="custom-google-label-style module" data-input-colorful-border="true">
                                    <label for="clinic-member-name" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'worker_name') && !empty($incompletedRegistrationData->worker_name)) class="active-label gateway-platform-color-important" @endif>Your name:</label>
                                    <input class="full-rounded form-field to-be-required @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'worker_name') && !empty($incompletedRegistrationData->worker_name)) gateway-platform-border-color-important @endif" name="clinic-member-name" maxlength="255" type="text" id="clinic-member-name" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'worker_name') && !empty($incompletedRegistrationData->worker_name)) value="{{$incompletedRegistrationData->worker_name}}" @endif/>
                                </div>
                            </div>
                            @if(!empty($api_enums) && property_exists($api_enums, 'working_position') && !empty($api_enums->working_position))
                                <div class="padding-bottom-15 field-parent">
                                    <div class="custom-google-select-style module">
                                        <label class="gateway-platform-color">Job title:</label>
                                        <select class="form-field gateway-platform-border-color changeable-color-on-selected-value @if(empty($incompletedRegistrationData)) dcn-gateway-gray-color @endif" name="clinic-member-job-title">
                                            <option value="">Please, select</option>
                                            @foreach($api_enums->working_position as $key => $title)
                                                <option value="{{$key}}" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'working_position') && !empty($incompletedRegistrationData->working_position) && $incompletedRegistrationData->working_position == $key) selected @endif>{{$title}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'working_position') && !empty($incompletedRegistrationData->working_position) && $incompletedRegistrationData->working_position == 'other')
                                        <div class="custom-google-label-style module clinic-member-job-title-other-parent" data-input-colorful-border="true">
                                            <label for="clinic-member-job-title-other" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'working_position_label') && !empty($incompletedRegistrationData->working_position_label)) class="active-label gateway-platform-color-important" @endif>Please specify:</label>
                                            <input class="full-rounded form-field required @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'working_position_label') && !empty($incompletedRegistrationData->working_position_label)) gateway-platform-border-color-important @endif" name="clinic-member-job-title-other" maxlength="50" type="text" id="clinic-member-job-title-other" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'working_position_label') && !empty($incompletedRegistrationData->working_position_label)) value="{{$incompletedRegistrationData->working_position_label}}" @endif/>
                                        </div>
                                    @endif
                                </div>
                            @endif
                        </div>
                        <div class="privacy-policy-row padding-bottom-20 padding-top-10 custom-checkbox-style show-if-dentist-type-selected @if(!empty($incompletedRegistrationData)) already-custom-style @endif/ @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'mode') && !empty($incompletedRegistrationData->mode)) show @endif">
                            @if(!empty($incompletedRegistrationData))
                                <label for="privacy-policy-registration" class="custom-checkbox gateway-platform-background-color-important">✓</label>
                            @endif
                            <input type="checkbox" class="custom-checkbox-input" id="privacy-policy-registration" @if(!empty($incompletedRegistrationData)) checked @endif/>
                            <label class="dentacoin-login-gateway-fs-15 custom-checkbox-label" for="privacy-policy-registration">I've read and agree to the <a href="//dentacoin.com/privacy-policy" class="gateway-platform-color" target="_blank">Privacy Policy</a></label>
                        </div>
                    </div>
                </div>
                <div class="step third address-suggester-wrapper @if(!empty($currentActiveStep) && $currentActiveStep == 'third') visible @endif" data-step="third">
                    <div class="padding-bottom-20 field-parent">
                        <div class="custom-google-select-style module">
                            @php($countries = (new \App\Http\Controllers\APIRequestsController())->getAllCountries())
                            <label class="gateway-platform-color">Select country:</label>
                            @php($current_phone_code = '+'.$countries[0]->phone_code)
                            <select name="country-code" id="dentist-country" class="form-field required country-select gateway-platform-border-color">
                                @if(!empty($countries))
                                    @foreach($countries as $country)
                                        @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'country_id') && !empty($incompletedRegistrationData->country_id) && $incompletedRegistrationData->country_id == $country->id)
                                            @php($current_phone_code = '+'.$country->phone_code)
                                        @endif
                                        <option value="{{$country->code}}" data-id="{{$country->id}}" data-code="{{$country->phone_code}}" @if(!empty($incompletedRegistrationData->country_id) && $incompletedRegistrationData->country_id == $country->id) selected @endif>{{$country->name}}</option>
                                    @endforeach
                                @endif
                            </select>
                        </div>
                    </div>
                    <div class="padding-bottom-15 suggester-parent module field-parent">
                        <div class="custom-google-label-style module tooltip-init" data-input-colorful-border="true">
                            <div class="tooltip-label gateway-platform-color gateway-platform-border-color changeable-html-based-on-user-type" data-dentist="Enter the full address of your workplace in the same way as it is displayed on your website/ Facebook page/ Google Business profile." data-clinic="Enter the full address of the clinic, the same way it is displayed on the website/ Facebook page or Google Business profile."></div>
                            <label for="dentist-register-address" class="changeable-html-based-on-user-type @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'address') && !empty($incompletedRegistrationData->address)) active-label gateway-platform-color-important @endif" data-dentist="Workplace address: Street, No, city" data-clinic="Address: Street, No, city"></label>
                            <input type="text" name="address" class="full-rounded form-field required address-suggester @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'address') && !empty($incompletedRegistrationData->address)) gateway-platform-border-color-important @endif" autocomplete="off" id="dentist-register-address" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'address') && !empty($incompletedRegistrationData->address)) value="{{$incompletedRegistrationData->address}}" @endif>
                        </div>
                        <div class="dentacoin-login-gateway-fs-14 light-gray-color padding-top-5">Ex: 49 Pembroke Square, Kensington, London</div>
                        <div class="suggester-map-div margin-top-15 margin-bottom-10"></div>
                        <div class="alert alert-notice geoip-confirmation margin-top-10 margin-bottom-10 hide-this">Please check the map to make sure we got your correct address. If you're not happy - please drag the map to adjust it.</div>
                        <div class="alert alert-warning geoip-hint margin-top-10 margin-bottom-10">Please enter a valid address for your practice (including street name and number).</div>
                        <div class="alert alert-warning different-country-hint margin-top-10 margin-bottom-10">Unable to proceed. Please, choose address from your country.</div>
                    </div>
                    <div class="padding-bottom-15 field-parent">
                        <div class="custom-google-label-style module" data-input-colorful-border="true">
                            <label for="dentist-register-website" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'website') && !empty($incompletedRegistrationData->website)) class="active-label gateway-platform-color-important" @endif>Website: http(s)://:</label>
                            <input class="full-rounded form-field required @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'website') && !empty($incompletedRegistrationData->website)) gateway-platform-border-color-important @endif" name="website" id="dentist-register-website" maxlength="250" type="url" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'website') && !empty($incompletedRegistrationData->website)) value="{{$incompletedRegistrationData->website}}" @endif/>
                        </div>
                        <div class="dentacoin-login-gateway-fs-14 light-gray-color padding-top-5">No website? Add your most popular social page.</div>
                    </div>
                    <div class="padding-bottom-10 field-parent">
                        <div class="phone">
                            <div class="country-code" name="phone-code">{{$current_phone_code}}</div>
                            <div class="custom-google-label-style module input-phone" data-input-colorful-border="true">
                                <label for="dentist-register-phone" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'phone') && !empty($incompletedRegistrationData->phone)) class="active-label gateway-platform-color-important" @endif>Phone number:</label>
                                <input class="full-rounded form-field required @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'phone') && !empty($incompletedRegistrationData->phone)) gateway-platform-border-color-important @endif" name="phone" maxlength="50" type="number" id="dentist-register-phone" @if(!empty($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'phone') && !empty($incompletedRegistrationData->phone)) value="{{$incompletedRegistrationData->phone}}" @endif/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step fourth @if(!empty($currentActiveStep) && $currentActiveStep == 'fourth') visible @endif" data-step="fourth">
                    <div class="padding-bottom-20 dentacoin-login-gateway-fs-0">
                        <div class="inline-block-top avatar module upload-file">
                            <input type="file" class="visualise-image inputfile" id="custom-upload-avatar" name="image" accept=".jpg,.png,.jpeg,.svg,.bmp"/>
                            <input type="hidden" id="hidden-image" name="hidden-image"/>
                            <div class="btn-wrapper"></div>
                            <div id="cropper-container"></div>
                            <div class="avatar-name"><span class="dcn-gateway-gray-color"></span><label for="custom-upload-avatar">×</label></div>
                            <div class="dentacoin-login-gateway-fs-14 upload-label-btn italic max-size-label"><label for="custom-upload-avatar" class="inline-block margin-right-10 max-width-30"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="width-100"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" class=""></path></svg></label>Max size: 2MB</div>
                        </div>
                        @if(!empty($api_enums) && property_exists($api_enums, 'specialisations') && !empty($api_enums->specialisations))
                            <div class="inline-block-top specializations">
                                <h4>Please select your specializations:</h4>
                                @foreach($api_enums->specialisations as $key => $specialisation)
                                    <div class="custom-checkbox-style padding-bottom-5">
                                        <input type="checkbox" class="custom-checkbox-input" name="specializations[]" id="specialization-{{$key}}" value="{{$key}}"/>
                                        <label class="dentacoin-login-gateway-fs-15 custom-checkbox-label" for="specialization-{{$key}}">{{$specialisation}}</label>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                        <div class="captcha-container">
                            <div class="g-recaptcha" id="g-recaptcha" data-callback="sendReCaptcha" style="display: inline-block;" data-size="compact" data-sitekey="6LfS5-cUAAAAAFcqPKe4ArUQfv8znLMN9oU5e57A"></div>
                        </div>
                        <div class="step-errors-holder padding-top-10"></div>
                    </div>
                </div>
                <div class="btns-container">
                    <div class="inline-block back-btn-container">
                        <input type="button" value="< back" class="prev-step @if(!empty($incompletedRegistrationData)) show @endif"/>
                    </div>
                    <div class="inline-block text-right next-or-continue-btn-container">
                        <input type="button" @if(!empty($currentActiveStep) && $currentActiveStep == 'fourth') value="Create account" @else value="Next" @endif class="platform-button gateway-platform-background-color dentacoin-login-gateway-fs-20 next-step" @if(!empty($currentActiveStep)) data-current-step="{{$currentActiveStep}}" data-cached-step="true" @else data-current-step="first" @endif/>
                        @if(isset($inviter))
                            <input type="hidden" name="inviter" value="{{$inviter}}">
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