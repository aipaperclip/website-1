<div class="popup-header">
    <figure itemscope="" itemtype="http://schema.org/ImageObject" class="text-center">
        <img src="/assets/images/christmas-calendar-campaign/popup-gifts-header.png" alt="Dentacoins" itemprop="contentUrl"/>
    </figure>
    <div class="lines-and-day">
        <div class="lines">
            <div class="small-red-line"></div>
            <div class="small-yellow-line"></div>
            <div class="big-red-line"></div>
            <div class="small-yellow-line"></div>
            <div class="small-red-line"></div>
        </div>
        <div class="day">DEC {{$task->id}}</div>
    </div>
</div>
<div class="popup-body">
    @if($type == 'task')
        @if($task->id == 9)
            <div class="newsletter-register">
                <form action="https://dentacoin.us16.list-manage.com/subscribe/post?u=61ace7d2b009198ca373cb213&amp;id=993df5967d" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                    <div class="padding-bottom-15 padding-top-25 fs-0 text-center-xs">
                        <div class="inline-block task-present">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                @if($task['type'] == 'dcn-reward')
                                    <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                    <figcaption class="color-white lato-bold padding-top-5">{{$task['value']}} DCN</figcaption>
                                @elseif($task['type'] == 'ticket-reward')
                                    <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                    <figcaption class="color-white lato-bold padding-top-5">+{{$task['value']}} raffle ticket</figcaption>
                                @elseif($task['type'] == 'face-sticker')
                                    <img src="/assets/images/christmas-calendar-campaign/christmas-sticker.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                    <figcaption class="color-white lato-bold padding-top-5">Face sticker</figcaption>
                                @elseif($task['type'] == 'facebook-holiday-frame')
                                    <img src="/assets/images/christmas-calendar-campaign/christmas-fb-frame.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                    <figcaption class="color-white lato-bold padding-top-5">Facebook frame</figcaption>
                                @elseif($task['type'] == 'free-oracle-health-guide')
                                    <img src="/assets/images/christmas-calendar-campaign/christmas-pdf.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                    <figcaption class="color-white lato-bold padding-top-5">Oracle health guide</figcaption>
                                @elseif($task['type'] == 'custom-holiday-card')
                                    <img src="/assets/images/christmas-calendar-campaign/christmas-card-gift.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                    <figcaption class="color-white lato-bold padding-top-5">Holiday card</figcaption>
                                @endif
                            </figure>
                        </div>
                        <div class="task-name inline-block lato-black fs-26 fs-xs-20 line-height-30 padding-left-20 padding-left-xs-0">{!! $task->task !!}</div>
                    </div>
                    <div class="text-center">
                        <div id="mc_embed_signup">
                            <div id="mc_embed_signup_scroll">
                                <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
                                <input type="hidden" name="b_61ace7d2b009198ca373cb213_993df5967d" tabindex="-1" value="">
                                <div class="clear btn-container"><input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                            </div>
                            <div class="checkbox-row"><input type="checkbox" required id="newsletter-privacy-policy"/><label for="newsletter-privacy-policy">I agree with <a href="/privacy-policy" target="_blank">Privacy Policy</a></label></div>
                        </div>
                    </div>
                    <div class="lato-bold fs-12 padding-bottom-20 padding-top-40 text-center">All DCN daily rewards will be gradually unlocked for withdrawal in the period Jan 1-15, 2020.<br> Other gifts are sent via email within 5 days after the task is completed. Only users who have submitted proofs for their tasks get rewards and participate in the raffle. All posts, likes and follows must remain at least until the raffle is finished. Terms & Conditions</div>
                </form>
            </div>
        @else
            <form enctype="multipart/form-data">
                <div class="padding-bottom-15 padding-top-25 fs-0 text-center-xs">
                    <div class="inline-block task-present">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            @if($task['type'] == 'dcn-reward')
                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                <figcaption class="color-white lato-bold padding-top-5">{{$task['value']}} DCN</figcaption>
                            @elseif($task['type'] == 'ticket-reward')
                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                <figcaption class="color-white lato-bold padding-top-5">+{{$task['value']}} raffle ticket</figcaption>
                            @elseif($task['type'] == 'face-sticker')
                                <img src="/assets/images/christmas-calendar-campaign/christmas-sticker.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                <figcaption class="color-white lato-bold padding-top-5">Face sticker</figcaption>
                            @elseif($task['type'] == 'facebook-holiday-frame')
                                <img src="/assets/images/christmas-calendar-campaign/christmas-fb-frame.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                <figcaption class="color-white lato-bold padding-top-5">Facebook frame</figcaption>
                            @elseif($task['type'] == 'free-oracle-health-guide')
                                <img src="/assets/images/christmas-calendar-campaign/christmas-pdf.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                <figcaption class="color-white lato-bold padding-top-5">Oracle health guide</figcaption>
                            @elseif($task['type'] == 'custom-holiday-card')
                                <img src="/assets/images/christmas-calendar-campaign/christmas-card-gift.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                <figcaption class="color-white lato-bold padding-top-5">Holiday card</figcaption>
                            @endif
                        </figure>
                    </div>
                    <div class="task-name inline-block lato-black fs-26 fs-xs-20 line-height-30 padding-left-20 padding-left-xs-0">{!! $task->task !!}</div>
                </div>
                <div class="task-body">
                    @switch($task->id)
                        @case(1)
                        <input type="file" id="upload-avatar"/>
                        <input type="hidden" name="avatar" />
                        <input type="hidden" name="background_scale" value="1"/>
                        <input type="hidden" name="avatar-border" id="avatar-border"/>
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span> Join the official Telegram group of Dentacoin: <a href="https://t.me/dentacoin" class="color-christmas-calendar-red" target="_blank">https://t.me/dentacoin</a>.</div>
                            <div class="padding-bottom-20">
                                <a href="https://t.me/dentacoin" target="_blank" class="inline-block">
                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/christmas-calendar-campaign/join-now.svg" class="width-100 max-width-150" alt="Join now Dentacoin telegram group" itemprop="contentUrl"/>
                                    </figure>
                                </a>
                                <div class="inline-block link-text fs-16 lato-regular padding-left-10 padding-left-xs-0 padding-top-xs-10">Don’t have Telegram yet? <a href="https://telegram.org/" target="_blank" class="color-christmas-calendar-red">Get it here.</a></div>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="telegram-username">Telegram username:</label>
                                    <input type="text" id="telegram-username" name="proof-text" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 3:</span> Let’s prepare  your custom sticker!</div>
                            <div class="fs-16 padding-bottom-10">Attach a portrait photo and choose a character:</div>
                            <div class="text-center fs-16 padding-bottom-20 gender-radio-btns">
                                <input type="radio" name="character-type" id="character-type-male" value="male"/> <label class="fs-16 lato-bold" for="character-type-male">Male character</label>
                                <input type="radio" name="character-type" id="character-type-female" class="margin-left-15" value="female"/> <label class="fs-16 lato-bold" for="character-type-female">Female character</label>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-offset-1 col-sm-10 upload-image">
                                    <div class="rotate">
                                        <img src="/assets/images/christmas-calendar-campaign/rotate.png"/>
                                    </div>
                                    <div class="rotation fs-0">
                                        <div class="up-triangle"><img src="/assets/images/christmas-calendar-campaign/triangle.png"/></div>
                                        <div class="left-triangle inline-block"><img src="/assets/images/christmas-calendar-campaign/left-triangle.png"/></div>
                                        <label class="photo inline-block" for="upload-avatar">
                                            <div class="avatar">
                                                <img src="/assets/images/christmas-calendar-campaign/upload-photo.png"/>
                                            </div>
                                            <div class="border"></div>
                                        </label>
                                        <div class="right-triangle inline-block"><img src="/assets/images/christmas-calendar-campaign/left-triangle.png"/></div>
                                        <div class="down-triangle"><img src="/assets/images/christmas-calendar-campaign/triangle.png"/></div>
                                    </div>
                                    <div class="legend">Select a photo, move it with the arrow keys, rotate it with the button, zoom in / out with the slider.<div>Max size 2MB.</div></div>
                                    <div class="zoom-scroll-container">
                                        <div class="wrapper">
                                            <span class="scroll"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @break
                        @case(2)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Share the best joke about dentists and oral health you’ve ever heard:</div>
                            <textarea name="text_proof" rows="4" maxlength="1000"></textarea>
                        </div>
                        @break
                        @case(3)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Find Dentacoin on Facebook, go to the “Reviews” tab and post a recommendation. Text comment is required.</div>
                            <a href="https://www.facebook.com/pg/dentacoin/reviews/" class="white-red-btn" target="_blank">POST NOW</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(4)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10">SHARE this post on your Facebook profile:</div>
                            <a href="https://www.facebook.com/pg/dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.facebook.com/pg/dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15"><span class="color-christmas-calendar-red">OR:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15 padding-bottom-10">RETWEET this tweet on your Twitter profile:</div>
                            <a href="https://www.twitter.com/pg/dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.twitter.com/pg/dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Link to your post/ tweet:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(5)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span> Save this image and send it to 5 friends using any channel:</div>
                            <div>Here is a sample text you may send them with the image:<br>
                                I care about you and your oral health. Here are 5 tips on how to take better care of your teeth.</div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-10">
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof_1" name="screenshot_proof[0]"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof_1" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                            <div class="padding-bottom-10">
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof_2" name="screenshot_proof[1]"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof_2" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                            <div class="padding-bottom-10">
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof_3" name="screenshot_proof[2]"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof_3" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                            <div class="padding-bottom-10">
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof_4" name="screenshot_proof[3]"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof_4" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof_5" name="screenshot_proof[4]"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof_5" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(6)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span> Join the official Announcements channel of Dentacoin: https://t.me/Dentacoin_Official.</div>
                            <div class="inline-block link-text fs-16 lato-regular padding-left-10">Don’t have Telegram yet? <a href="https://telegram.org/" target="_blank" class="color-christmas-calendar-red">Get it here.</a></div>
                            <div class="padding-top-15">
                                <a href="https://t.me/Dentacoin_Official" target="_blank" class="white-red-btn padding-left-30 padding-right-30 inline-block">JOIN</a>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="telegram-username">Your Telegram username:</label>
                                    <input type="text" id="telegram-username" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                        </div>
                        @break
                        @case(7)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10">SHARE this post on your Facebook profile:</div>
                            <a href="https://www.facebook.com/pg/dentavox.dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.facebook.com/pg/dentavox.dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15"><span class="color-christmas-calendar-red">OR:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15 padding-bottom-10">RETWEET this tweet on your Twitter profile:</div>
                            <a href="https://www.twitter.com/pg/dentavox.dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.twitter.com/pg/dentavox.dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Link to your post/ tweet:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(8)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span> Find DentaVox Surveys on Facebook, go to the “Reviews” tab and post a recommendation. Text comment is required.</div>
                            <div>
                                <a href="https://www.facebook.com/pg/dentavox,dentacoin/reviews/" class="white-red-btn" target="_blank">POST NOW</a>
                            </div>

                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(10)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10">SHARE this post on your Facebook profile:</div>
                            <a href="https://www.facebook.com/pg/reviews.dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.facebook.com/pg/reviews.dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15"><span class="color-christmas-calendar-red">OR:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15 padding-bottom-10">RETWEET this tweet on your Twitter profile:</div>
                            <a href="https://www.twitter.com/pg/reviews.dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.twitter.com/pg/reviews.dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Link to your post/ tweet:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(11)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">We’ve heard about robots instead of dentist, tablettes instead of brushing, gels for eternal caries protection and many other brave dreams. What are you dreaming about in terms of oral health? Be brave.</div>
                            <textarea name="text_proof" rows="4" maxlength="1000"></textarea>
                        </div>
                        @break
                        @case(12)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Invite your dentist or another dentist nearby to join Trusted Reviews by filling out the form below. Only real entries will be rewarded after a thorough verification.</div>
                            <div class="padding-top-15">
                                <a href="https://reviews.dentacoin.com/?popup=invite-new-dentist-popup" target="_blank" class="white-red-btn">INVITE NOW</a>
                            </div>
                        </div>
                        @break
                        @case(13)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Find DentaVox Surveys on Facebook, go to the “Reviews” tab and post a recommendation. Text comment is required.</div>
                            <a href="https://www.facebook.com/pg/dentavox,dentacoin/reviews/" class="white-red-btn" target="_blank">POST NOW</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(14)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Download Dentacare: Jaws of Battle game</div>
                            <div>
                                <a href="#" onclick="alert('Coming soon!');" target="_blank" class="max-width-150 width-100 inline-block"><img src="/assets/images/google-store-button.svg" alt="Google play button"/></a>
                                <a href="#" onclick="alert('Coming soon!');" target="_blank" class="max-width-150 width-100 inline-block margin-left-10"><img src="/assets/images/apple-store-button.svg" alt="App store button"/></a>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(15)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Find Dentacare: Jaws of Battle on Google Play or App Store and post your review. Text comment is required.</div>
                            <div>
                                <a href="#" onclick="alert('Coming soon!');" target="_blank" class="max-width-150 width-100 inline-block"><img src="/assets/images/google-store-button.svg" alt="Google play button"/></a>
                                <a href="#" onclick="alert('Coming soon!');" target="_blank" class="max-width-150 width-100 inline-block margin-left-10"><img src="/assets/images/apple-store-button.svg" alt="App store button"/></a>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(16)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Cover the requirements:</div>
                            <div class="fs-16">
                                1. Make a photo/ video/ boomerang of yourself with a holiday motive (Christmas three, any decoration, drawing, etc.) and an oral health related object (toothbrush, toothpaste, floss, etc.).<br>
                                2. Post it on Facebook/ Twitter/ Instagram and make the post public.<br>
                                3. Tag Dentacoin’s official account on this social network and add hashtags: #BrushYourTeeth #Dentacoin #DentacoinCalendar
                            </div>

                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Link to your post:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(17)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Download Dentacare - Health Training App</div>
                            <div>
                                <a href="https://play.google.com/store/apps/details?id=com.dentacoin.dentacare&hl=en" target="_blank" class="max-width-150 width-100 inline-block"><img src="/assets/images/google-store-button.svg" alt="Google play button"/></a>
                                <a href="https://apps.apple.com/us/app/dentacare-health-training/id1274148338" target="_blank" class="max-width-150 width-100 inline-block margin-left-10"><img src="/assets/images/apple-store-button.svg" alt="App store button"/></a>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot of the screen after brushing teeth</label></button>
                            </div>
                        </div>
                        @break
                        @case(18)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Find Dentacare - Health Training on Google Play or App Store and post your review. Text comment is required.</div>
                            <div>
                                <a href="https://play.google.com/store/apps/details?id=com.dentacoin.dentacare&hl=en" target="_blank" class="max-width-150 width-100 inline-block"><img src="/assets/images/google-store-button.svg" alt="Google play button"/></a>
                                <a href="https://apps.apple.com/us/app/dentacare-health-training/id1274148338" target="_blank" class="max-width-150 width-100 inline-block margin-left-10"><img src="/assets/images/apple-store-button.svg" alt="App store button"/></a>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(19)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 1:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10">SHARE this post on your Facebook profile:</div>
                            <a href="https://www.facebook.com/pg/dentacare.dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.facebook.com/pg/dentacare.dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15"><span class="color-christmas-calendar-red">OR:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15 padding-bottom-10">RETWEET this tweet on your Twitter profile:</div>
                            <a href="https://www.twitter.com/pg/dentacare.dentacoin/sample post/" class="color-christmas-calendar-red" target="_blank">https://www.twitter.com/pg/dentacare.dentacoin/sample post/</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Link to your post/ tweet:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(20)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Christmas, New Year, Divali, Easter… So many holidays all over the world and so many food temptations! Yes, some of those are harmful for your teeth but today we are not here to judge!</div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Share what’s your most favorite holiday food!</div>
                            <textarea name="text_proof" rows="4" maxlength="1000"></textarea>
                        </div>
                        @break
                        @case(21)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Go to “My Account”, tab “Invite Friends”, and choose the preferred way to invite friends.</div>
                            <div class="padding-top-15">
                                <a href="https://account.dentacoin.com/invite" target="_blank" class="white-red-btn">INVITE NOW</a>
                            </div>
                        </div>
                        @break
                        @case(22)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">If you’ve done all tasks up to now, you should already be familiar with most Dentacoin products - DentaVox Surveys, Dentacoin Trusted Reviews, Dentacare: Jaws of Battle, Dentacare - Health Training. </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Do you think we can do something to optimise them? Share your ideas!<div class="color-christmas-calendar-red">Answers related to price, exchange platforms and supply will be disqualified.</div></div>
                            <textarea name="text_proof" rows="4" maxlength="1000"></textarea>
                        </div>
                        @break
                        @case(23)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Join the official Facebook group of Dentacoin: <a href="https://www.facebook.com/groups/dentacoin.official/" target="_blank" class="color-christmas-calendar-red">https://www.facebook.com/groups/dentacoin.official/</a>.</div>
                            <a href="https://www.facebook.com/groups/dentacoin.official/" class="white-red-btn" target="_blank">JOIN NOW</a>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-20 padding-top-15">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Your Facebook name:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                        </div>
                        @break
                        @case(24)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20">Make a gift, help someone, donate to an organisation of your choosing… Just do something good for someone today. We don’t need any proof. Just share what you did:</div>
                            <textarea name="text_proof" rows="4" maxlength="1000"></textarea>
                        </div>
                        @break
                        @case(25)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20">Holidays often take us out of our routines… How are your oral hygiene habits changing during holidays? Have you had any dental emergency in such festive times?<br>
                                Share in the latest DentaVox survey “Oral Care during Holidays”!</div>
                            <a href="#" onclick="alert('Coming soon!');" class="white-red-btn" target="_blank">TAKE SURVEY</a>
                        </div>
                        @break
                        @case(26)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Dream big! What product would you like to see from Dentacoin in the next 5 years?<div class="color-christmas-calendar-red">Answers related to price, exchange platforms and supply will be disqualified.</div></div>
                            <textarea name="text_proof" rows="4" maxlength="1000"></textarea>
                        </div>
                        @break
                        @case(27)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">What’s the main message of Dentacoin in your opinion? What are we trying to achieve?<br>Make it sound like a new slogan!</div>
                            <div class="padding-bottom-20 padding-top-15">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Your slogan:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                        </div>
                        @break
                        @case(28)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10">Share Dentacoin’s Facebook page: <a href="https://www.facebook.com/dentacoin/" target="_blank" class="color-christmas-calendar-red">https://www.facebook.com/dentacoin/</a> in ONE crypto-related Facebook group you participate in.</div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15"><span class="color-christmas-calendar-red">OR:</span></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15 padding-bottom-10">Share Dentacoin’s Telegram group: <a href="https://t.me/dentacoin" target="_blank" class="color-christmas-calendar-red">https://t.me/dentacoin</a> in ONE crypto-related Telegram group you participate in.</div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-30 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Add a nice, short text description to your post. Example:<div>Check out Dentacoin, the first blockchain solution for dentistry with 90K+ users and 1.8K+ dental offices on board!</div></div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-15 padding-bottom-10 color-christmas-calendar-red">People who have posted in more than one groups OR multiple times in one group will be disqualified.</div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 3:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break
                        @case(29)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-10 padding-top-15">Finish the sentence: “Thank you, Dentacoin, for...”</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Your sentence:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                        </div>
                        @break
                        @case(30)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20">How many times did you change your toothbrush in 2019? What about your dentist? Did your oral hygiene habits changed somehow? Share in the latest DentaVox survey “My Oral Health Diary 2019”!</div>
                            <a href="#" onclick="alert('Coming soon!');" class="white-red-btn" target="_blank">TAKE SURVEY</a>
                        </div>
                        @break
                        @case(31)
                        <div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-bottom-20"><span class="color-christmas-calendar-red">• STEP 1:</span> Cover the requirements:
                                <div class="fs-16">1. Post on Facebook/ Twitter/ Instagram what’s one thing you promise yourself to do better next year in terms of oral care. </div>
                                <div class="fs-16">2. Make the post public.</div>
                                <div class="fs-16">3. Tag Dentacoin’s official account on this social network and add hashtags: #Dentacoin2020resolutions #Dentacoin #DentacoinCalendar</div>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 2:</span> Submit proof after completing the task:</div>
                            <div class="padding-bottom-20">
                                <div class="custom-google-label-style module max-width-400">
                                    <label for="text_proof">Link to your post:</label>
                                    <input type="text" id="text_proof" name="text_proof" maxlength="1000" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div class="fs-18 fs-xs-16 lato-bold padding-top-20 padding-bottom-10"><span class="color-christmas-calendar-red">• STEP 3:</span> Submit proof after completing the task:</div>
                            <div>
                                <input type="file" class="hide screenshot_proof" id="screenshot_proof" name="screenshot_proof"/>
                                <button type="button" class="white-red-btn"><label for="screenshot_proof" class="margin-bottom-0">Attach a screenshot</label></button>
                            </div>
                        </div>
                        @break

                        @default
                        <div class="text-center padding-top-50 padding-bottom-50 padding-left-10 padding-right-10 fs-20 lato-black">Something went wrong, please try again</div>
                    @endswitch
                </div>
                <div class="padding-top-40 padding-bottom-10 text-center">
                    <button>
                        <img src="/assets/images/christmas-calendar-campaign/submit-btn-present.svg" class="width-100 max-width-180" alt="Submit button" itemprop="contentUrl"/>
                    </button>
                </div>
                <div class="lato-bold fs-12 padding-bottom-20 text-center">All DCN daily rewards will be gradually unlocked for withdrawal in the period Jan 1-15, 2020.<br> Other gifts are sent via email within 5 days after the task is completed. Only users who have submitted proofs for their tasks get rewards and participate in the raffle. All posts, likes and follows must remain at least until the raffle is finished. Terms & Conditions</div>
            </form>
        @endif
    @elseif($type == 'congrats')
        <div class="text-center padding-top-50 padding-bottom-50">
            <h2 class="fs-50 fs-xs-32 lato-black">CONGRATS!</h2>
            <div class="fs-20 fs-xs-18 lato-bold color-christmas-calendar-red padding-bottom-30 padding-top-10">YOUR DAILY REWARD.</div>
            <button type="button" class="white-red-btn custom-close-bootbox width-100 max-width-220">SEE YOU TOMORROW!</button>
        </div>
    @elseif($type == 'already-completed')
        <div class="text-center padding-top-50 padding-bottom-50">
            <h2 class="fs-50 fs-xs-32 lato-black">COMPLETED</h2>
            <div class="fs-20 fs-xs-18 lato-bold color-christmas-calendar-red padding-bottom-20">You have already completed this task.</div>
            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="text-center max-width-150 margin-0-auto task-present-tile">
                @if($task['type'] == 'dcn-reward')
                    <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                    <figcaption class="lato-bold color-white padding-top-5">{{$task['value']}} DCN</figcaption>
                @elseif($task['type'] == 'ticket-reward')
                    <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                    <figcaption class="lato-bold color-white padding-top-5">+{{$task['value']}} raffle ticket</figcaption>
                @elseif($task['type'] == 'face-sticker')
                    <img src="/assets/images/christmas-calendar-campaign/christmas-sticker.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                    <figcaption class="lato-bold color-white padding-top-5">Face sticker</figcaption>
                @elseif($task['type'] == 'facebook-holiday-frame')
                    <img src="/assets/images/christmas-calendar-campaign/christmas-fb-frame.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                    <figcaption class="lato-bold color-white padding-top-5">Facebook frame</figcaption>
                @elseif($task['type'] == 'free-oracle-health-guide')
                    <img src="/assets/images/christmas-calendar-campaign/christmas-pdf.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                    <figcaption class="lato-bold color-white padding-top-5">Oracle health guide</figcaption>
                @elseif($task['type'] == 'custom-holiday-card')
                    <img src="/assets/images/christmas-calendar-campaign/christmas-card-gift.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                    <figcaption class="lato-bold color-white padding-top-5">Holiday card</figcaption>
                @endif
            </figure>
            @if($task->id == 1 || $task->id == 16)
                @if($task->id == 1)
                    @php($downloadLink = 'https://christmas-calendar-api.dentacoin.com/assets/uploads/face-stickers/'.$coredbData->slug.'.png')
                @elseif($task->id == 16)
                    @php($downloadLink = 'https://christmas-calendar-api.dentacoin.com/assets/uploads/holiday-cards/'.$coredbData->slug.'.png')
                @endif
                <div class="row padding-top-30">
                    <div class="col-xs-12 col-md-6 text-right text-center-xs text-center-sm"><a href="{{$downloadLink}}" target="_blank" download class="red-white-btn width-100 max-width-150 inline-block text-center">DOWNLOAD</a></div>
                    <div class="col-xs-12 col-md-6 text-left text-center-xs text-center-sm"><button type="button" class="white-red-btn custom-close-bootbox width-100 max-width-150">CLOSE</button></div>
                </div>
            @else
                <button type="button" class="white-red-btn custom-close-bootbox width-100 max-width-150">CLOSE</button>
            @endif
        </div>
    @elseif($type == 'not-active-yet')
        <div class="text-center padding-top-50 padding-bottom-50">
            <div class="fs-20 fs-xs-18 lato-bold color-christmas-calendar-red padding-bottom-30">This present is not active yet. Please kindly wait until {{$task->date}}.</div>
            <button type="button" class="white-red-btn custom-close-bootbox width-100 max-width-150">OK</button>
        </div>
    @elseif($type == 'no-hurries')
        <div class="text-center padding-top-50 padding-bottom-50">
            <h2 class="fs-50 fs-xs-32 lato-black">Hey, no hurries!</h2>
            <div class="fs-20 fs-xs-18 lato-bold color-christmas-calendar-red padding-bottom-30 padding-top-10">You must complete all previous tasks.</div>
            <button type="button" class="white-red-btn custom-close-bootbox width-100 max-width-150">OK</button>
        </div>
    @endif
</div>