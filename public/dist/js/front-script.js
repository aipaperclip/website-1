var basic = {
    cookies: {
        set: function(name, value) {
            if(name == undefined){
                name = "cookieLaw";
            }
            if(value == undefined){
                value = 1;
            }
            var d = new Date();
            d.setTime(d.getTime() + (100*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + ";domain=.dentacoin.com;path=/;secure";
            if(name == "cookieLaw"){
                $(".cookies_popup").slideUp();
            }
        },
        erase: function(name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        get: function(name) {

            if(name == undefined){
                var name = "cookieLaw";
            }
            name = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        }
    },
    fixBodyModal: function() {
        if($(".modal-dialog").length>0 && !$("body").hasClass('modal-open')){
            $("body").addClass('modal-open');
        }
    },
    fixZIndexBackdrop: function() {
        if(jQuery('.bootbox').length > 1) {
            var last_z = jQuery('.bootbox').eq(jQuery('.bootbox').length - 2).css("z-index");
            jQuery('.bootbox').last().css({'z-index': last_z+2}).next('.modal-backdrop').css({'z-index': last_z+1});
        }
    },
    showAlert: function(message, class_name, vertical_center) {
        basic.realShowDialog(message, "alert", class_name, null, null, vertical_center);
    },
    showConfirm: function(message, class_name, params, vertical_center) {
        basic.realShowDialog(message, "confirm", class_name, params, null, vertical_center);
    },
    showDialog: function(message, class_name, type, vertical_center, params) {
        if(type === undefined){
            type = null;
        }
        if(params === undefined){
            params = null;
        }
        basic.realShowDialog(message, "dialog", class_name, params, type, vertical_center);
    },
    realShowDialog: function(message, dialog_type, class_name, params, type, vertical_center) {
        if(class_name === undefined){
            class_name = "";
        }
        if(type === undefined){
            type = null;
        }
        if(vertical_center === undefined){
            vertical_center = null;
        }

        var atrs = {
            "message": message,
            "animate": false,
            "show": false,
            "className": class_name
        };

        if(dialog_type == "confirm" && params!=undefined && params.buttons == undefined){
            atrs.buttons = {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            }
        }
        if(params != undefined){
            for (var key in params) {
                console.log(key, 'key');
                atrs[key] = params[key];
                console.log(key, 'key');
                console.log(params[key], 'params[key]');
            }
        }

        var dialog = eval("bootbox." + dialog_type)(atrs);
        dialog.on('hidden.bs.modal', function(){
            basic.fixBodyModal();
            if(type != null)    {
                if(type == 'media-inquries')    {
                    $('.press-center-container .subtitle .open-form').focus();
                }else {
                    $('.single-application figure[data-slug="'+type+'"]').parent().focus();
                }
            }
        });
        dialog.on('shown.bs.modal', function(){
            if(vertical_center != null) {
                basic.verticalAlignModal();
            }
            basic.fixZIndexBackdrop();
        });
        dialog.modal('show');
    },
    verticalAlignModal: function(message) {
        $("body .modal-dialog").each(function(){
            $(this).css("margin-top", Math.max(20, ($(window).height() - $(this).height()) / 2));
        })
    },
    closeDialog: function (){
        bootbox.hideAll();
    },
    validateEmail: function(email)   {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    },
    validatePhone: function(phone) {
        return /^[\d\.\-]+$/.test(phone);
    },
    validateUrl: function(url)   {
        var pattern = new RegExp(/*'^(https?:\\/\\/)?' +*/ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    },
    hasNumber: function(myString) {
        return /\d/.test(myString);
    },
    hasLowerCase: function(str) {
        return (/[a-z]/.test(str));
    },
    hasUpperCase: function(str) {
        return (/[A-Z]/.test(str));
    },
    validatePassword: function(password) {
        return password.trim().length >= 8 && password.trim().length <= 30 && basic.hasLowerCase(password) && basic.hasUpperCase(password) && basic.hasNumber(password);
    },
    isInViewport: function(el, elementExtraTopOffset) {
        if (elementExtraTopOffset != undefined) {
            var elementTop = $(el).offset().top + elementExtraTopOffset;
        } else {
            var elementTop = $(el).offset().top;
        }

        var elementBottom = elementTop + $(el).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    },
    isMobile: function() {
        var isMobile = false; //initiate as false
// device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))  {
            isMobile = true;
        }
        return isMobile;
    },
    getMobileOperatingSystem: function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    },
    addCsrfTokenToAllAjax: function ()    {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    },
    isJsonString: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    bytesToMegabytes: function(bytes) {
        // converting bytes to megabytes
        return bytes / Math.pow(1024, 2);
    },
    property_exists: function(object, key) {
        return object ? hasOwnProperty.call(object, key) : false;
    },
    getGETParameters: function() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? basic.transformToAssocArray(prmstr) : {};
    },
    transformToAssocArray: function(prmstr) {
        var params = {};
        var prmarr = prmstr.split("&");
        for (var i = 0, len = prmarr.length; i < len; i+=1) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    },
    stopMaliciousInspect: function () {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        document.onkeydown = function(e) {
            if (event.keyCode == 123) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                return false;
            }
        }
    },
    customValidateWalletAddress: function() {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
    },
    initCustomCheckboxes: function(parent, type) {
        if (typeof(parent) == undefined) {
            parent = '';
        } else {
            parent = parent + ' ';
        }

        if (type == undefined) {
            type = 'prepend';
        }

        for (var i = 0, len = jQuery(parent + '.custom-checkbox-style').length; i < len; i+=1) {
            if (!jQuery(parent + '.custom-checkbox-style').eq(i).hasClass('already-custom-style')) {
                if (jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').is(':checked')) {
                    if (type == 'prepend') {
                        jQuery(parent + '.custom-checkbox-style').eq(i).prepend('<label for="'+jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').attr('id')+'" class="custom-checkbox">✓</label>');
                    } else if (type == 'append') {
                        jQuery(parent + '.custom-checkbox-style').eq(i).append('<label for="'+jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').attr('id')+'" class="custom-checkbox">✓</label>');
                    }
                } else {
                    jQuery(parent + '.custom-checkbox-style').eq(i).prepend('<label for="'+jQuery(parent + '.custom-checkbox-style').eq(i).find('input[type="checkbox"]').attr('id')+'" class="custom-checkbox"></label>');
                }
                jQuery(parent + '.custom-checkbox-style').eq(i).addClass('already-custom-style');
            }
        }

        jQuery(parent + '.custom-checkbox-style .custom-checkbox-input').unbind('change').on('change', function() {
            if (!jQuery(this).closest('.custom-checkbox-style').hasClass('predefined')) {
                if (jQuery(this).is(':checked')) {
                    jQuery(this).closest(parent + '.custom-checkbox-style').find('.custom-checkbox').html('✓');
                } else {
                    jQuery(this).closest(parent + '.custom-checkbox-style').find('.custom-checkbox').html('');
                }

                if (jQuery(this).attr('data-radio-group') != undefined) {
                    for (var i = 0, len = jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').length; i < len; i+=1) {
                        if (!jQuery(this).is(jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').eq(i))) {
                            jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').eq(i).prop('checked', false);
                            jQuery('[data-radio-group="'+jQuery(this).attr('data-radio-group')+'"]').eq(i).closest(parent + '.custom-checkbox-style').find('.custom-checkbox').html('');
                        }
                    }
                }
            }
        });
    }
};
/*jslint browser: true, confusion: true, sloppy: true, vars: true, nomen: false, plusplus: false, indent: 2 */
/*global window,google */

/**
 * @name MarkerClustererPlus for Google Maps V3
 * @version 2.0.1 [July 27, 2011]
 * @author Gary Little
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of markers.
 * <p>
 * This is an enhanced V3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >V2 MarkerClusterer</a> by Xiaoxi Wu. It is based on the
 * <a href="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/"
 * >V3 MarkerClusterer</a> port by Luke Mahe. MarkerClustererPlus was created by Gary Little.
 * <p>
 * v2.0 release: MarkerClustererPlus v2.0 is backward compatible with MarkerClusterer v1.0. It
 *  adds support for the <code>ignoreHidden</code>, <code>title</code>, <code>printable</code>,
 *  <code>batchSizeIE</code>, and <code>calculator</code> properties as well as support for
 *  four more events. It also allows greater control over the styling of the text that appears
 *  on the cluster marker. The documentation has been significantly improved and the overall
 *  code has been simplified and polished. Very large numbers of markers can now be managed
 *  without causing Javascript timeout errors on Internet Explorer. Note that the name of the
 *  <code>clusterclick</code> event has been deprecated. The new name is <code>click</code>,
 *  so please change your application code now.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @name ClusterIconStyle
 * @class This class represents the object for values in the <code>styles</code> array passed
 *  to the {@link MarkerClusterer} constructor. The element in this array that is used to
 *  style the cluster icon is determined by calling the <code>calculator</code> function.
 *
 * @property {string} url The URL of the cluster icon image file. Required.
 * @property {number} height The height (in pixels) of the cluster icon. Required.
 * @property {number} width The width (in pixels) of the cluster icon. Required.
 * @property {Array} [anchor] The anchor position (in pixels) of the label text to be shown on
 *  the cluster icon, relative to the top left corner of the icon.
 *  The format is <code>[yoffset, xoffset]</code>. The <code>yoffset</code> must be positive
 *  and less than <code>height</code> and the <code>xoffset</code> must be positive and less
 *  than <code>width</code>. The default is to anchor the label text so that it is centered
 *  on the icon.
 * @property {string} [textColor="black"] The color of the label text shown on the
 *  cluster icon.
 * @property {number} [textSize=11] The size (in pixels) of the label text shown on the
 *  cluster icon.
 * @property {number} [textDecoration="none"] The value of the CSS <code>text-decoration</code>
 *  property for the label text shown on the cluster icon.
 * @property {number} [fontWeight="bold"] The value of the CSS <code>font-weight</code>
 *  property for the label text shown on the cluster icon.
 * @property {number} [fontStyle="normal"] The value of the CSS <code>font-style</code>
 *  property for the label text shown on the cluster icon.
 * @property {number} [fontFamily="Arial,sans-serif"] The value of the CSS <code>font-family</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [backgroundPosition="0 0"] The position of the cluster icon image
 *  within the image defined by <code>url</code>. The format is <code>"xpos ypos"</code>
 *  (the same format as for the CSS <code>background-position</code> property). You must set
 *  this property appropriately when the image defined by <code>url</code> represents a sprite
 *  containing multiple images.
 */
/**
 * @name ClusterIconInfo
 * @class This class is an object containing general information about a cluster icon. This is
 *  the object that a <code>calculator</code> function returns.
 *
 * @property {string} text The text of the label to be shown on the cluster icon.
 * @property {number} index The index plus 1 of the element in the <code>styles</code>
 *  array to be used to style the cluster icon.
 */
/**
 * A cluster icon.
 *
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Cluster} cluster The cluster with which the icon is to be associated.
 * @param {Array} [styles] An array of {@link ClusterIconStyle} defining the cluster icons
 *  to use for various cluster sizes.
 * @private
 */
function ClusterIcon(cluster, styles) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.cluster_ = cluster;
    this.styles_ = styles;
    this.center_ = null;
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
}


/**
 * Adds the icon to the DOM.
 */
ClusterIcon.prototype.onAdd = function () {
    var cClusterIcon = this;

    this.div_ = document.createElement("div");
    if (this.visible_) {
        this.show();
    }

    this.getPanes().overlayMouseTarget.appendChild(this.div_);

    google.maps.event.addDomListener(this.div_, "click", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when a cluster marker is clicked.
         * @name MarkerClusterer#click
         * @param {Cluster} c The cluster that was clicked.
         * @event
         */
        google.maps.event.trigger(mc, "click", cClusterIcon.cluster_);
        google.maps.event.trigger(mc, "clusterclick", cClusterIcon.cluster_); // deprecated name

        // The default click handler follows. Disable it by setting
        // the zoomOnClick property to false.
        var mz = mc.getMaxZoom();
        if (mc.getZoomOnClick()) {
            // Zoom into the cluster.
            mc.getMap().fitBounds(cClusterIcon.cluster_.getBounds());
            // Don't zoom beyond the max zoom level
            if (mz && (mc.getMap().getZoom() > mz)) {
                mc.getMap().setZoom(mz + 1);
            }
        }
    });

    google.maps.event.addDomListener(this.div_, "mouseover", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when the mouse moves over a cluster marker.
         * @name MarkerClusterer#mouseover
         * @param {Cluster} c The cluster that the mouse moved over.
         * @event
         */
        google.maps.event.trigger(mc, "mouseover", cClusterIcon.cluster_);
    });

    google.maps.event.addDomListener(this.div_, "mouseout", function () {
        var mc = cClusterIcon.cluster_.getMarkerClusterer();
        /**
         * This event is fired when the mouse moves out of a cluster marker.
         * @name MarkerClusterer#mouseout
         * @param {Cluster} c The cluster that the mouse moved out of.
         * @event
         */
        google.maps.event.trigger(mc, "mouseout", cClusterIcon.cluster_);
    });
};


/**
 * Removes the icon from the DOM.
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        google.maps.event.clearInstanceListeners(this.div_);
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};


/**
 * Draws the icon.
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + "px";
        this.div_.style.left = pos.x + "px";
    }
};


/**
 * Hides the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = "none";
    }
    this.visible_ = false;
};


/**
 * Positions and shows the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        if (this.cluster_.printable_) {
            // (Would like to use "width: inherit;" below, but doesn't work with MSIE)
            this.div_.innerHTML = "<img src='" + this.url_ + "'><div style='position: absolute; top: 0px; left: 0px; width: " + this.width_ + "px;'>" + this.sums_.text + "</div>";
        } else {
            this.div_.innerHTML = this.sums_.text;
        }
        this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
        this.div_.style.display = "";
    }
    this.visible_ = true;
};


/**
 * Sets the icon styles to the appropriate element in the styles array.
 *
 * @param {ClusterIconInfo} sums The icon label text and styles index.
 */
ClusterIcon.prototype.useStyle = function (sums) {
    this.sums_ = sums;
    var index = Math.max(0, sums.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style.url;
    this.height_ = style.height;
    this.width_ = style.width;
    this.anchor_ = style.anchor;
    this.textColor_ = style.textColor || "white";
    this.textSize_ = style.textSize || 11;
    this.textDecoration_ = style.textDecoration || "none";
    this.fontWeight_ = style.fontWeight || "bold";
    this.fontStyle_ = style.fontStyle || "normal";
    this.fontFamily_ = style.fontFamily || "Arial,sans-serif";
    this.backgroundPosition_ = style.backgroundPosition || "0 0";
};


/**
 * Sets the position at which to center the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};


/**
 * Creates the cssText style parameter based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position of the icon.
 * @return {string} The CSS style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    if (!this.cluster_.printable_) {
        style.push('background-image:url(' + this.url_ + ');');
        style.push('background-position:' + this.backgroundPosition_ + ';');
    }

    if (typeof this.anchor_ === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
            this.anchor_[0] < this.height_) {
            style.push('height:' + (this.height_ - this.anchor_[0]) +
                'px; padding-top:' + this.anchor_[0] + 'px;');
        } else {
            style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
                'px;');
        }
        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
            this.anchor_[1] < this.width_) {
            style.push('width:' + (this.width_ - this.anchor_[1]) +
                'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
            style.push('width:' + this.width_ + 'px; text-align:center;');
        }
    } else {
        style.push('height:' + this.height_ + 'px; line-height:' +
            this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
        pos.x + 'px; color:' + this.textColor_ + '; position:absolute; font-size:' +
        this.textSize_ + 'px; font-family:' + this.fontFamily_ + '; font-weight:' +
        this.fontWeight_ + '; font-style:' + this.fontStyle_ + '; text-decoration:' +
        this.textDecoration_ + ';');
    return style.join("");
};


/**
 * Returns the position at which to place the DIV depending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
    return pos;
};


/**
 * Creates a single cluster that manages a group of proximate markers.
 *  Used internally, do not call this constructor directly.
 * @constructor
 * @param {MarkerClusterer} mc The <code>MarkerClusterer</code> object with which this
 *  cluster is associated.
 */
function Cluster(mc) {
    this.markerClusterer_ = mc;
    this.map_ = mc.getMap();
    this.gridSize_ = mc.getGridSize();
    this.minClusterSize_ = mc.getMinimumClusterSize();
    this.averageCenter_ = mc.getAverageCenter();
    this.printable_ = mc.getPrintable();
    this.markers_ = [];
    this.center_ = null;
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, mc.getStyles());
}


/**
 * Returns the number of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {number} The number of markers in the cluster.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};


/**
 * Returns the array of markers managed by the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {Array} The array of markers in the cluster.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 * Returns the center of the cluster. You can call this from
 * a <code>click</code>, <code>mouseover</code>, or <code>mouseout</code> event handler
 * for the <code>MarkerClusterer</code> object.
 *
 * @return {google.maps.LatLng} The center of the cluster.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};


/**
 * Returns the map with which the cluster is associated.
 *
 * @return {google.maps.Map} The map.
 * @ignore
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};


/**
 * Returns the <code>MarkerClusterer</code> object with which the cluster is associated.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 * @ignore
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 * @ignore
 */
Cluster.prototype.getBounds = function () {
    var i;
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    return bounds;
};


/**
 * Removes the cluster from the map.
 *
 * @ignore
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.setMap(null);
    this.markers_ = [];
    delete this.markers_;
};


/**
 * Adds a marker to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to be added.
 * @return {boolean} True if the marker was added.
 * @ignore
 */
Cluster.prototype.addMarker = function (marker) {
    var i;
    var mCount;

    if (this.isMarkerAlreadyAdded_(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    mCount = this.markers_.length;
    if (this.map_.getZoom() > this.markerClusterer_.getMaxZoom()) {
        // Zoomed in past max zoom, so show the marker.
        if (marker.getMap() !== this.map_) {
            marker.setMap(this.map_);
        }
    } else if (mCount < this.minClusterSize_) {
        // Min cluster size not reached so show the marker.
        if (marker.getMap() !== this.map_) {
            marker.setMap(this.map_);
        }
    } else if (mCount === this.minClusterSize_) {
        // Hide the markers that were showing.
        for (i = 0; i < mCount; i++) {
            this.markers_[i].setMap(null);
        }
    } else {
        marker.setMap(null);
    }

    this.updateIcon_();
    return true;
};


/**
 * Determines if a marker lies within the cluster's bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 * @ignore
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};


/**
 * Calculates the extended bounds of the cluster with the grid.
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Updates the cluster icon.
 */
Cluster.prototype.updateIcon_ = function () {
    var mCount = this.markers_.length;

    if (this.map_.getZoom() > this.markerClusterer_.getMaxZoom()) {
        this.clusterIcon_.hide();
        return;
    }

    if (mCount < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.useStyle(sums);
    this.clusterIcon_.show();
};


/**
 * Determines if a marker has already been added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker has already been added.
 */
Cluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
    var i;
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) !== -1;
    } else {
        for (i = 0; i < this.markers_.length; i++) {
            if (marker === this.markers_[i]) {
                return true;
            }
        }
    }
    return false;
};


/**
 * @name MarkerClustererOptions
 * @class This class represents the optional parameter passed to
 *  the {@link MarkerClusterer} constructor.
 * @property {number} [gridSize=60] The grid size of a cluster in pixels. The grid is a square.
 * @property {number} [maxZoom=null] The maximum zoom level at which clustering is enabled or
 *  <code>null</code> if clustering is to be enabled at all zoom levels.
 * @property {boolean} [zoomOnClick=true] Whether to zoom the map when a cluster marker is
 *  clicked. You may want to set this to <code>false</code> if you have installed a handler
 *  for the <code>click</code> event and it deals with zooming on its own.
 * @property {boolean} [averageCenter=false] Whether the position of a cluster marker should be
 *  the average position of all markers in the cluster. If set to <code>false</code>, the
 *  cluster marker is positioned at the location of the first marker added to the cluster.
 * @property {number} [minimumClusterSize=2] The minimum number of markers needed in a cluster
 *  before the markers are hidden and a cluster marker appears.
 * @property {boolean} [ignoreHidden=false] Whether to ignore hidden markers in clusters. You
 *  may want to set this to <code>true</code> to ensure that hidden markers are not included
 *  in the marker count that appears on a cluster marker (this count is the value of the
 *  <code>text</code> property of the result returned by the default <code>calculator</code>).
 *  If set to <code>true</code> and you change the visibility of a marker being clustered, be
 *  sure to also call <code>MarkerClusterer.repaint()</code>.
 * @property {boolean} [printable=false] Whether to make the cluster icons printable. Do not
 *  set to <code>true</code> if the <code>url</code> fields in the <code>styles</code> array
 *  refer to image sprite files.
 * @property {string} [title=""] The tooltip to display when the mouse moves over a cluster
 *  marker.
 * @property {function} [calculator=MarkerClusterer.CALCULATOR] The function used to determine
 *  the text to be displayed on a cluster marker and the index indicating which style to use
 *  for the cluster marker. The input parameters for the function are (1) the array of markers
 *  represented by a cluster marker and (2) the number of cluster icon styles. It returns a
 *  {@link ClusterIconInfo} object. The default <code>calculator</code> returns a
 *  <code>text</code> property which is the number of markers in the cluster and an
 *  <code>index</code> property which is one higher than the lowest integer such that
 *  <code>10^i</code> exceeds the number of markers in the cluster, or the size of the styles
 *  array, whichever is less. The <code>styles</code> array element used has an index of
 *  <code>index</code> minus 1. For example, the default <code>calculator</code> returns a
 *  <code>text</code> value of <code>"125"</code> and an <code>index</code> of <code>3</code>
 *  for a cluster icon representing 125 markers so the element used in the <code>styles</code>
 *  array is <code>2</code>.
 * @property {Array} [styles] An array of {@link ClusterIconStyle} elements defining the styles
 *  of the cluster markers to be used. The element to be used to style a given cluster marker
 *  is determined by the function defined by the <code>calculator</code> property.
 *  The default is an array of {@link ClusterIconStyle} elements whose properties are derived
 *  from the values for <code>imagePath</code>, <code>imageExtension</code>, and
 *  <code>imageSizes</code>.
 * @property {number} [batchSizeIE=MarkerClusterer.BATCH_SIZE_IE] When Internet Explorer is
 *  being used, markers are processed in several batches with a small delay inserted between
 *  each batch in an attempt to avoid Javascript timeout errors. Set this property to the
 *  number of markers to be processed in a single batch; select as high a number as you can
 *  without causing a timeout error in the browser. This number might need to be as low as 100
 *  if 15,000 markers are being managed, for example.
 * @property {string} [imagePath=MarkerClusterer.IMAGE_PATH]
 *  The full URL of the root name of the group of image files to use for cluster icons.
 *  The complete file name is of the form <code>imagePath</code>n.<code>imageExtension</code>
 *  where n is the image file number (1, 2, etc.).
 * @property {string} [imageExtension=MarkerClusterer.IMAGE_EXTENSION]
 *  The extension name for the cluster icon image files (e.g., <code>"png"</code> or
 *  <code>"jpg"</code>).
 * @property {Array} [imageSizes=MarkerClusterer.IMAGE_SIZES]
 *  An array of numbers containing the widths of the group of
 *  <code>imagePath</code>n.<code>imageExtension</code> image files.
 *  (The images are assumed to be square.)
 */
/**
 * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
 * @constructor
 * @extends google.maps.OverlayView
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>} [opt_markers] The markers to be added to the cluster.
 * @param {MarkerClustererOptions} [opt_options] The optional parameters.
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);

    opt_markers = opt_markers || [];
    opt_options = opt_options || {};

    this.markers_ = [];
    this.clusters_ = [];
    this.listeners_ = [];
    this.activeMap_ = null;
    this.ready_ = false;

    this.gridSize_ = opt_options.gridSize || 60;
    this.minClusterSize_ = opt_options.minimumClusterSize || 2;
    this.maxZoom_ = opt_options.maxZoom || null;
    this.styles_ = opt_options.styles || [];
    this.title_ = opt_options.title || "";
    this.zoomOnClick_ = true;
    if (opt_options.zoomOnClick !== undefined) {
        this.zoomOnClick_ = opt_options.zoomOnClick;
    }
    this.averageCenter_ = false;
    if (opt_options.averageCenter !== undefined) {
        this.averageCenter_ = opt_options.averageCenter;
    }
    this.ignoreHidden_ = false;
    if (opt_options.ignoreHidden !== undefined) {
        this.ignoreHidden_ = opt_options.ignoreHidden;
    }
    this.printable_ = false;
    if (opt_options.printable !== undefined) {
        this.printable_ = opt_options.printable;
    }
    this.imagePath_ = opt_options.imagePath || MarkerClusterer.IMAGE_PATH;
    this.imageExtension_ = opt_options.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
    this.imageSizes_ = opt_options.imageSizes || MarkerClusterer.IMAGE_SIZES;
    this.calculator_ = opt_options.calculator || MarkerClusterer.CALCULATOR;
    this.batchSizeIE_ = opt_options.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;

    if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
        // Try to avoid IE timeout when processing a huge number of markers:
        this.batchSize_ = this.batchSizeIE_;
    } else {
        this.batchSize_ = MarkerClusterer.BATCH_SIZE;
    }

    this.setupStyles_();

    this.addMarkers(opt_markers, true);
    this.setMap(map); // Note: this causes onAdd to be called
}


/**
 * Implementation of the onAdd interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    var cMarkerClusterer = this;

    this.activeMap_ = this.getMap();
    this.ready_ = true;

    this.repaint();

    // Add the map event listeners
    this.listeners_ = [
        google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
            cMarkerClusterer.resetViewport_(false);
        }),
        google.maps.event.addListener(this.getMap(), "idle", function () {
            cMarkerClusterer.redraw_();
        })
    ];
};


/**
 * Implementation of the onRemove interface method.
 * Removes map event listeners and all cluster icons from the DOM.
 * All managed markers are also put back on the map.
 * @ignore
 */
MarkerClusterer.prototype.onRemove = function () {
    var i;

    // Put all the managed markers back on the map:
    for (i = 0; i < this.markers_.length; i++) {
        this.markers_[i].setMap(this.activeMap_);
    }

    // Remove all clusters:
    for (i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].remove();
    }
    this.clusters_ = [];

    // Remove map event listeners:
    for (i = 0; i < this.listeners_.length; i++) {
        google.maps.event.removeListener(this.listeners_[i]);
    }
    this.listeners_ = [];

    this.activeMap_ = null;
    this.ready_ = false;
};


/**
 * Implementation of the draw interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {};


/**
 * Sets up the styles object.
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    var i, size;
    if (this.styles_.length > 0) {
        return;
    }

    for (i = 0; i < this.imageSizes_.length; i++) {
        size = this.imageSizes_[i];
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
            height: size,
            width: size
        });
    }
};


/**
 *  Fits the map to the bounds of the markers managed by the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var i;
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }

    this.getMap().fitBounds(bounds);
};


/**
 * Returns the value of the <code>gridSize</code> property.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};


/**
 * Sets the value of the <code>gridSize</code> property.
 *
 * @param {number} gridSize The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (gridSize) {
    this.gridSize_ = gridSize;
};


/**
 * Returns the value of the <code>minimumClusterSize</code> property.
 *
 * @return {number} The minimum cluster size.
 */
MarkerClusterer.prototype.getMinimumClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the value of the <code>minimumClusterSize</code> property.
 *
 * @param {number} minimumClusterSize The minimum cluster size.
 */
MarkerClusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
    this.minClusterSize_ = minimumClusterSize;
};


/**
 *  Returns the value of the <code>maxZoom</code> property.
 *
 *  @return {number} The maximum zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_ || this.getMap().mapTypes[this.getMap().getMapTypeId()].maxZoom;
};


/**
 *  Sets the value of the <code>maxZoom</code> property.
 *
 *  @param {number} maxZoom The maximum zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};


/**
 *  Returns the value of the <code>styles</code> property.
 *
 *  @return {Array} The array of styles defining the cluster markers to be used.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};


/**
 *  Sets the value of the <code>styles</code> property.
 *
 *  @param {Array.<ClusterIconStyle>} styles The array of styles to use.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};


/**
 * Returns the value of the <code>title</code> property.
 *
 * @return {string} The content of the title text.
 */
MarkerClusterer.prototype.getTitle = function () {
    return this.title_;
};


/**
 *  Sets the value of the <code>title</code> property.
 *
 *  @param {string} title The value of the title property.
 */
MarkerClusterer.prototype.setTitle = function (title) {
    this.title_ = title;
};


/**
 * Returns the value of the <code>zoomOnClick</code> property.
 *
 * @return {boolean} True if zoomOnClick property is set.
 */
MarkerClusterer.prototype.getZoomOnClick = function () {
    return this.zoomOnClick_;
};


/**
 *  Sets the value of the <code>zoomOnClick</code> property.
 *
 *  @param {boolean} zoomOnClick The value of the zoomOnClick property.
 */
MarkerClusterer.prototype.setZoomOnClick = function (zoomOnClick) {
    this.zoomOnClick_ = zoomOnClick;
};


/**
 * Returns the value of the <code>averageCenter</code> property.
 *
 * @return {boolean} True if averageCenter property is set.
 */
MarkerClusterer.prototype.getAverageCenter = function () {
    return this.averageCenter_;
};


/**
 *  Sets the value of the <code>averageCenter</code> property.
 *
 *  @param {boolean} averageCenter The value of the averageCenter property.
 */
MarkerClusterer.prototype.setAverageCenter = function (averageCenter) {
    this.averageCenter_ = averageCenter;
};


/**
 * Returns the value of the <code>ignoreHidden</code> property.
 *
 * @return {boolean} True if ignoreHidden property is set.
 */
MarkerClusterer.prototype.getIgnoreHidden = function () {
    return this.ignoreHidden_;
};


/**
 *  Sets the value of the <code>ignoreHidden</code> property.
 *
 *  @param {boolean} ignoreHidden The value of the ignoreHidden property.
 */
MarkerClusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
    this.ignoreHidden_ = ignoreHidden;
};


/**
 * Returns the value of the <code>imageExtension</code> property.
 *
 * @return {string} The value of the imageExtension property.
 */
MarkerClusterer.prototype.getImageExtension = function () {
    return this.imageExtension_;
};


/**
 *  Sets the value of the <code>imageExtension</code> property.
 *
 *  @param {string} imageExtension The value of the imageExtension property.
 */
MarkerClusterer.prototype.setImageExtension = function (imageExtension) {
    this.imageExtension_ = imageExtension;
};


/**
 * Returns the value of the <code>imagePath</code> property.
 *
 * @return {string} The value of the imagePath property.
 */
MarkerClusterer.prototype.getImagePath = function () {
    return this.imagePath_;
};


/**
 *  Sets the value of the <code>imagePath</code> property.
 *
 *  @param {string} imagePath The value of the imagePath property.
 */
MarkerClusterer.prototype.setImagePath = function (imagePath) {
    this.imagePath_ = imagePath;
};


/**
 * Returns the value of the <code>imageSizes</code> property.
 *
 * @return {Array} The value of the imageSizes property.
 */
MarkerClusterer.prototype.getImageSizes = function () {
    return this.imageSizes_;
};


/**
 *  Sets the value of the <code>imageSizes</code> property.
 *
 *  @param {Array} imageSizes The value of the imageSizes property.
 */
MarkerClusterer.prototype.setImageSizes = function (imageSizes) {
    this.imageSizes_ = imageSizes;
};


/**
 * Returns the value of the <code>calculator</code> property.
 *
 * @return {function} the value of the calculator property.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};


/**
 * Sets the value of the <code>calculator</code> property.
 *
 * @param {function(Array.<google.maps.Marker>, number)} calculator The value
 *  of the calculator property.
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};


/**
 * Returns the value of the <code>printable</code> property.
 *
 * @return {boolean} the value of the printable property.
 */
MarkerClusterer.prototype.getPrintable = function () {
    return this.printable_;
};


/**
 * Sets the value of the <code>printable</code> property.
 *
 *  @param {boolean} printable The value of the printable property.
 */
MarkerClusterer.prototype.setPrintable = function (printable) {
    this.printable_ = printable;
};


/**
 * Returns the value of the <code>batchSizeIE</code> property.
 *
 * @return {number} the value of the batchSizeIE property.
 */
MarkerClusterer.prototype.getBatchSizeIE = function () {
    return this.batchSizeIE_;
};


/**
 * Sets the value of the <code>batchSizeIE</code> property.
 *
 *  @param {number} batchSizeIE The value of the batchSizeIE property.
 */
MarkerClusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
    this.batchSizeIE_ = batchSizeIE;
};


/**
 *  Returns the array of markers managed by the clusterer.
 *
 *  @return {Array} The array of markers managed by the clusterer.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 *  Returns the number of markers managed by the clusterer.
 *
 *  @return {number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};


/**
 * Returns the number of clusters formed by the clusterer.
 *
 * @return {number} The number of clusters formed by the clusterer.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};


/**
 * Adds a marker to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw_();
    }
};


/**
 * Adds an array of markers to the clusterer. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    var i;
    for (i = 0; i < markers.length; i++) {
        this.pushMarkerTo_(markers[i]);
    }
    if (!opt_nodraw) {
        this.redraw_();
    }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    // If the marker is draggable add a listener so we can update the clusters on the dragend:
    if (marker.getDraggable()) {
        var cMarkerClusterer = this;
        google.maps.event.addListener(marker, "dragend", function () {
            if (cMarkerClusterer.ready_) {
                this.isAdded = false;
                cMarkerClusterer.repaint();
            }
        });
    }
    marker.isAdded = false;
    this.markers_.push(marker);
};


/**
 * Removes a marker from the cluster.  The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if the
 *  marker was removed from the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if the marker was removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.repaint();
    }

    return removed;
};


/**
 * Removes an array of markers from the cluster. The clusters are redrawn unless
 *  <code>opt_nodraw</code> is set to <code>true</code>. Returns <code>true</code> if markers
 *  were removed from the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean} [opt_nodraw] Set to <code>true</code> to prevent redrawing.
 * @return {boolean} True if markers were removed from the clusterer.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    var i, r;
    var removed = false;

    for (i = 0; i < markers.length; i++) {
        r = this.removeMarker_(markers[i]);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.repaint();
    }

    return removed;
};


/**
 * Removes a marker and returns true if removed, false if not.
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var i;
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (i = 0; i < this.markers_.length; i++) {
            if (marker === this.markers_[i]) {
                index = i;
                break;
            }
        }
    }

    if (index === -1) {
        // Marker is not in our list of markers, so do nothing:
        return false;
    }

    marker.setMap(null);
    this.markers_.splice(index, 1); // Remove the marker from the list of managed markers
    return true;
};


/**
 * Removes all clusters and markers from the map and also removes all markers
 *  managed by the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport_(true);
    this.markers_ = [];
};


/**
 * Recalculates and redraws all the marker clusters from scratch.
 *  Call this after changing any properties.
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_ = [];
    this.resetViewport_(false);
    this.redraw_();

    // Remove the old clusters.
    // Do it in a timeout to prevent blinking effect.
    setTimeout(function () {
        var i;
        for (i = 0; i < oldClusters.length; i++) {
            oldClusters[i].remove();
        }
    }, 0);
};


/**
 * Returns the current bounds extended by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 * @ignore
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
        bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
        bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};


/**
 * Redraws all the clusters.
 */
MarkerClusterer.prototype.redraw_ = function () {
    this.createClusters_(0);
};


/**
 * Removes all clusters from the map. The markers are also removed from the map
 *  if <code>opt_hide</code> is set to <code>true</code>.
 *
 * @param {boolean} [opt_hide] Set to <code>true</code> to also remove the markers
 *  from the map.
 */
MarkerClusterer.prototype.resetViewport_ = function (opt_hide) {
    var i, marker;
    // Remove all the clusters
    for (i = 0; i < this.clusters_.length; i++) {
        this.clusters_[i].remove();
    }
    this.clusters_ = [];

    // Reset the markers to not be added and to be removed from the map.
    for (i = 0; i < this.markers_.length; i++) {
        marker = this.markers_[i];
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }
};


/**
 * Calculates the distance between two latlng locations in km.
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 */
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};


/**
 * Determines if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};


/**
 * Adds a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var i, d, cluster, center;
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    for (i = 0; i < this.clusters_.length; i++) {
        cluster = this.clusters_[i];
        center = cluster.getCenter();
        if (center) {
            d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};


/**
 * Creates the clusters. This is done in batches to avoid timeout errors
 *  in some browsers when there is a huge number of markers.
 *
 * @param {number} iFirst The index of the first marker in the batch of
 *  markers to be added to clusters.
 */
MarkerClusterer.prototype.createClusters_ = function (iFirst) {
    var i, marker;
    var cMarkerClusterer = this;
    if (!this.ready_) {
        return;
    }

    // Cancel previous batch processing if we're working on the first batch:
    if (iFirst === 0) {
        /**
         * This event is fired when the <code>MarkerClusterer</code> begins
         *  clustering markers.
         * @name MarkerClusterer#clusteringbegin
         * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
         * @event
         */
        google.maps.event.trigger(this, "clusteringbegin", this);

        if (typeof this.timerRefStatic !== "undefined") {
            clearTimeout(this.timerRefStatic);
            delete this.timerRefStatic;
        }
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),
        this.getMap().getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);

    for (i = iFirst; i < iLast; i++) {
        marker = this.markers_[i];
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            if (!this.ignoreHidden_ || (this.ignoreHidden_ && marker.getVisible())) {
                this.addToClosestCluster_(marker);
            }
        }
    }

    if (iLast < this.markers_.length) {
        this.timerRefStatic = setTimeout(function () {
            cMarkerClusterer.createClusters_(iLast);
        }, 0);
    } else {
        delete this.timerRefStatic;

        /**
         * This event is fired when the <code>MarkerClusterer</code> stops
         *  clustering markers.
         * @name MarkerClusterer#clusteringend
         * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
         * @event
         */
        google.maps.event.trigger(this, "clusteringend", this);
    }
};


/**
 * Extends an object's prototype by another's.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return (function (object) {
        var property;
        for (property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }).apply(obj1, [obj2]);
};


/**
 * The default function for determining the label text and style
 * for a cluster icon.
 *
 * @param {Array.<google.maps.Marker>} markers The array of represented by the cluster.
 * @param {number} numStyles The number of marker styles available.
 * @return {ClusterIconInfo} The information resource for the cluster.
 * @constant
 * @ignore
 */
MarkerClusterer.CALCULATOR = function (markers, numStyles) {
    var index = 0;
    var count = markers.length.toString();

    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index
    };
};


/**
 * The number of markers to process in one batch.
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE = 2000;


/**
 * The number of markers to process in one batch (IE only).
 *
 * @type {number}
 * @constant
 */
MarkerClusterer.BATCH_SIZE_IE = 500;


/**
 * The default root name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_PATH = HOME_URL + "/assets/images/m";


/**
 * The default extension name for the marker cluster images.
 *
 * @type {string}
 * @constant
 */
MarkerClusterer.IMAGE_EXTENSION = "png";


/**
 * The default array of sizes for the marker cluster images.
 *
 * @type {Array.<number>}
 * @constant
 */
MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];
var markerCluster;
function initMap(map_locations, initialLat, initialLng, initialZoom, filter_country, location_id, location_source, categories, campForZoomChange, filter_city, location_content) {

    console.log(categories, 'categories');
    if (categories.includes('category-5') && !categories.includes('category-1')) {
        categories.push('category-1');
    }

    console.log(categories, 'categories');

    if (initialLat === undefined) {
        initialLat = 28.508742;
    }

    if (initialLng === undefined) {
        initialLng = -0.120850;
    }

    if (initialZoom === undefined) {
        initialZoom = 2;
    }

    if (campForZoomChange === undefined) {
        campForZoomChange = false;
    }

    Gmap = jQuery('.google-map-box');
    Gmap.each(function () {
        var $this = jQuery(this),
            scrollwheel = true,
            zoomcontrol = true,
            draggable = true,
            mapType = google.maps.MapTypeId.ROADMAP,
            dataLat = initialLat,
            dataLng = initialLng,
            dataType = 'roadmap',
            dataZoomcontrol = $this.data('zoomcontrol');

        /*if (dataScrollwheel !== undefined && dataScrollwheel !== null) {
            scrollwheel = dataScrollwheel;
        }*/

        if (dataZoomcontrol !== undefined && dataZoomcontrol !== null) {
            zoomcontrol = dataZoomcontrol;
        }

        if (dataType !== undefined && dataType !== false) {
            if (dataType == 'satellite') {
                mapType = google.maps.MapTypeId.SATELLITE;
            } else if (dataType == 'hybrid') {
                mapType = google.maps.MapTypeId.HYBRID;
            } else if (dataType == 'terrain') {
                mapType = google.maps.MapTypeId.TERRAIN;
            }
        }

        if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            draggable = true;
        }

        var styles = [{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#dddddd"},{"saturation":-100},{"lightness":-3},{"visibility":"on"}]}];

        var mapOptions = {
            zoom: initialZoom,
            /*scrollwheel: scrollwheel,*/
            zoomControl: zoomcontrol,
            draggable: draggable,
            center: new google.maps.LatLng(dataLat, dataLng),
            mapTypeId: mapType,
            styles: styles,
            minZoom: 1
        };

        var map = new google.maps.Map($this[0], mapOptions);

        markerCluster = new MarkerClusterer(map);
        var infowindow;
        var markers_arr = [];

        if (typeof(map_locations) != 'undefined' && map_locations.length > 0) {
            for (var i = 0, len = map_locations.length; i < len; i+=1) {
                if (location_id != undefined && location_source != undefined)  {
                    if (location_id != map_locations[i].id && location_source != map_locations[i].source) {
                        continue;
                    }
                }

                if (filter_country != undefined)  {
                    if (filter_country instanceof Array) {
                        if (!filter_country.includes(map_locations[i].country_code)) {
                            continue;
                        }
                    } else {
                        if (filter_country != map_locations[i].country_code) {
                            continue;
                        }
                    }
                }

                if (filter_city != undefined) {
                    if (filter_city != map_locations[i].city) {
                        continue;
                    }
                }

                if (categories != undefined) {
                    if (!categories.includes(map_locations[i].category)) {
                        continue;
                    }
                }

                var marker_options = {
                    position: new google.maps.LatLng(map_locations[i].lat, map_locations[i].lng),
                    lat: map_locations[i].lat,
                    lng: map_locations[i].lng,
                    map: map,
                    icon: '/assets/uploads/' + map_locations[i].marker,
                    name: map_locations[i].name,
                    country_code: map_locations[i].country_code,
                    database_id: map_locations[i].id,
                    source: map_locations[i].source
                };

                if (map_locations[i].clinic_media != undefined)    {
                    marker_options.clinic_media = map_locations[i].clinic_media;
                }
                if (map_locations[i].address != undefined)    {
                    marker_options.address = map_locations[i].address;
                }
                if (map_locations[i].clinic_media_alt != undefined)    {
                    marker_options.clinic_media_alt = map_locations[i].clinic_media_alt;
                }
                if (map_locations[i].clinic_link != undefined)    {
                    marker_options.clinic_link = map_locations[i].clinic_link;
                }
                markers_arr[i] = new google.maps.Marker(marker_options);

                google.maps.event.addListener(markers_arr[i], 'click', function (event) {
                    var country_code = this.country_code;
                    var database_id = this.database_id;
                    var source = this.source;
                    var content = '<div style="font-size: 20px;">'+this.name+'</div>';

                    $.event.trigger({
                        type: 'showLocationInList',
                        time: new Date(),
                        response_data: {
                            'country_code' : country_code,
                            'id' : database_id,
                            'source' : source,
                            'lat' : this.getPosition().lat(),
                            'lng' : this.getPosition().lng(),
                            'content' : content
                        }
                    });

                    /*map.panTo(this.getPosition());
                    map.setZoom(18);*/

                    if (infowindow != null){
                        infowindow.close();
                    }

                    infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    infowindow.open(map, this);
                });
                markerCluster.addMarker(markers_arr[i]);

                if (location_id != undefined && location_source != undefined && location_id == map_locations[i].id && location_source == map_locations[i].source) {

                    console.log(location_content, 'location_content');
                    // new google.maps.event.trigger(markers_arr[i], 'click');

                    if (location_content != undefined) {
                        if (infowindow != null){
                            infowindow.close();
                        }

                        infowindow = new google.maps.InfoWindow({
                            content: location_content
                        });

                        infowindow.open(map, markers_arr[i]);
                    }
                }
            }
        }
        map.setOptions({minZoom: 2.2, maxZoom: 20});

        if (campForZoomChange) {
            var camperZoom = 0;
            google.maps.event.addListener(map, 'zoom_changed', function() {
                var zoomLevel = map.getZoom();

                if (camperZoom != 0 && zoomLevel < camperZoom) {
                    $('.selectpicker.locations').val('');
                    $('.selectpicker.locations').selectpicker('refresh');
                    initMap(map_locations, initialLat, initialLng, initialZoom - 1, undefined, undefined, undefined, categories, undefined);
                }

                camperZoom = zoomLevel;
            });
        }
    });
}
var initAddressSuggesters;
var checkAddress;
var setupMap;
var mapsLoaded = true;
var mapsWaiting = [];

var prepareMapFunction = function( callback ) {
    if(mapsLoaded) {
        callback();
    } else {
        mapsWaiting.push(callback);
    }
};

$(document).ready(function($){
    setupMap = function(suggester_container, coords) {
        console.log('setupMap');
        suggester_container.find('.suggester-map-div').show();
        if(!suggester_container.find('.suggester-map-div').attr('inited') ) {
            var profile_address_map = new google.maps.Map( suggester_container.find('.suggester-map-div')[0], {
                center: coords,
                zoom: 14,
                backgroundColor: 'none'
            });
            var marker = new google.maps.Marker({
                map: profile_address_map,
                icon: '/assets/images/map-pin-inactive.png',
                draggable:true,
                position: coords,
            });

            marker.addListener('dragend', function(e) {
                this.map.panTo( this.getPosition() );
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'location': this.getPosition()}, (function(results, status) {
                    if (status == 'OK') {
                        var gstring = results[0].formatted_address;
                        var country_name = this.find('.country-select option:selected').text();
                        gstring = gstring.replace(', '+country_name, '');

                        this.find('.address-suggester').val(gstring).blur();
                    } else {
                        checkAddress(null, this);
                    }
                }).bind(suggester_container) );
            });
            suggester_container.find('.suggester-map-div').attr('inited', 1);
            suggester_container.find('.suggester-map-div').data('map', profile_address_map);
            suggester_container.find('.suggester-map-div').data('marker', marker);
        } else {
            suggester_container.find('.suggester-map-div').data('map').panTo(coords);
            suggester_container.find('.suggester-map-div').data('marker').setPosition(coords);
        }
    };

    initAddressSuggesters = function() {
        console.log('initAddressSuggesters');
        prepareMapFunction(function() {
            $('.address-suggester').each( function() {
                //dont init map which are not supposed to be inited at this time
                if($(this).hasClass('dont-init')) {
                    return false;
                }
                var suggester_container = $(this).closest('.address-suggester-wrapper');
                suggester_container.find('.country-select').change( function() {
                    var cc = $(this).find('option:selected').val();
                    GMautocomplete.setComponentRestrictions({
                        'country': cc
                    });
                });

                if( suggester_container.find('.suggester-map-div').attr('lat') ) {
                    var coords = {
                        lat: parseFloat(suggester_container.find('.suggester-map-div').attr('lat')),
                        lng: parseFloat(suggester_container.find('.suggester-map-div').attr('lon'))
                    };
                    setupMap(suggester_container, coords);
                }

                var input = $(this)[0];
                var cc = suggester_container.find('.country-select option:selected').val();
                var options = {
                    componentRestrictions: {
                        country: cc
                    },
                    types: ['address']
                };

                var GMautocomplete = new google.maps.places.Autocomplete(input, options);
                GMautocomplete.suggester_container = suggester_container;
                google.maps.event.addListener(GMautocomplete, 'place_changed', (function () {
                    var place = this.getPlace();
                    this.suggester_container.find('.address-suggester').val(place.formatted_address ? place.formatted_address : place.name).blur();
                }).bind(GMautocomplete));

                $(this).blur( function(e) {
                    var suggester_container = $(this).closest('.address-suggester-wrapper');
                    var country_name = suggester_container.find('.country-select option:selected').text();
                    var country_code = suggester_container.find('.country-select option:selected').val();

                    var geocoder = new google.maps.Geocoder();
                    var address = $(this).val();
                    geocoder.geocode( {
                        'address': address,
                        'region': country_code
                    }, (function(results, status) {
                        if (status == 'OK') {
                            checkAddress(results[0], this);
                        } else {
                            checkAddress(null, this);
                        }
                    }).bind(suggester_container) );
                });
            });
        });

        $('.address-suggester').on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
    };

    checkAddress = function(place, suggester_container) {
        //suggester_container.find('.address-suggester').blur();
        suggester_container.find('.geoip-hint').hide();
        suggester_container.find('.geoip-confirmation').hide();
        suggester_container.find('.suggester-map-div').hide();

        if( place && place.geometry ) {
            //address_components
            var gstring = suggester_container.find('.address-suggester').val();
            var country_name = suggester_container.find('.country-select option:selected').text();
            gstring = gstring.replace(', '+country_name, '');
            suggester_container.find('.address-suggester').val(gstring);

            var coords = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setupMap(suggester_container, coords);

            suggester_container.find('.geoip-confirmation').show();
            return;
        } else {
            suggester_container.find('.geoip-hint').show();
        }
    };

    console.log($('.address-suggester').length, '$(\'.address-suggester\').length');
    if($('.address-suggester').length) {
        initAddressSuggesters();
    }
});
console.log('Don\'t touch the code. Or do ... ¯\\_(ツ)_/¯');

//load images after website load
function loadDeferImages() {
    for (var i = 0, len = jQuery('[data-defer-src]').length; i < len; i += 1) {
        var elementInViewport = jQuery('[data-defer-src]').eq(i);

        if (basic.isInViewport(elementInViewport) && jQuery('[data-defer-src]').eq(i).attr('src') == undefined) {
            jQuery('[data-defer-src]').eq(i).attr('src', jQuery('[data-defer-src]').eq(i).attr('data-defer-src'));
        }
    }
}

loadDeferImages();

var allowedImagesExtensions = ['png', 'jpg', 'jpeg'];
var allowedDocumentExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'odt', 'rtf'];
var get_params = basic.getGETParameters();

$(window).on('load', function () {
    if (($('body').hasClass('home') && !$('body').hasClass('logged-in')) || ($('body').hasClass('logged-in') && $('body').hasClass('foundation'))) {
        var current_url = new URL(window.location.href);
        if (current_url.searchParams.get('application') != null) {
            scrollToSectionAnimation('two', null, true);

            setTimeout(function () {
                $('.dentacoin-ecosystem .single-application figure[data-slug="' + current_url.searchParams.get('application') + '"]').click();
            }, 500)
        } else if (current_url.searchParams.get('payment') != null && current_url.searchParams.get('payment') == 'bidali-gift-cards') {
            $('html').animate({
                scrollTop: $('.wallet-app-and-gif').offset().top
            }, {
                duration: 500,
                complete: function () {
                    setTimeout(function () {
                        $('#bidali-init-btn').click();
                    }, 1000);
                }
            });
        } else if (current_url.searchParams.get('section') != null && current_url.searchParams.get('section') == 'buy-dentacoin') {
            $('html').animate({
                scrollTop: $('.buy-dentacoin').offset().top
            }, {
                duration: 500
            });
        }
    }

    if ($('body.corporate-design').length > 0) {
        var drawCorporateDesignLine = false;
        $('body').addClass('overflow-hidden');
        if ($(window).width() > 768) {
            drawCorporateDesignLine = true;
        }
        $('body').removeClass('overflow-hidden');

        if (drawCorporateDesignLine) {
            drawNavToBottomSectionLine();
        }
    }
});

$(window).on('scroll', function () {
    loadDeferImages();
});

$(window).on('resize', function () {
    if ($('body').hasClass('testimonials')) {
        //TESTIMONIALS
        initListingPageLine();
    } else if ($('body').hasClass('press-center')) {
        //PRESS CENTER
        initListingPageLine();
    } else if ($('body.careers.allow-draw-lines').length > 0) {
        //CAREERSdentacoin-ecosystem
        drawHeaderToFirstSectionLine();
    } else if ($('body.corporate-design').length > 0) {
        //CORPORATE DESIGN
        var drawCorporateDesignLine = false;
        $('body').addClass('overflow-hidden');
        if ($(window).width() > 768) {
            drawCorporateDesignLine = true;
        }
        $('body').removeClass('overflow-hidden');

        if (drawCorporateDesignLine) {
            drawNavToBottomSectionLine();
        }
    }
});

// ==================== PAGES ====================

var projectData = {
    pages: {
        not_logged_in: function () {
            projectData.pages.data.homepage();
            projectData.pages.data.users(true);
            projectData.pages.data.dentists(true);
            projectData.pages.data.traders(true);
            projectData.pages.data.testimonials();
            projectData.pages.data.corporateDesign();
            projectData.pages.data.claimDentacoin();
            projectData.pages.data.careers();
            projectData.pages.data.team();
            projectData.pages.data.pressCenter();
            projectData.pages.data.howToCreateWallet();
        },
        logged_in: function() {
            projectData.pages.data.homepage();
            projectData.pages.data.users(true);
            projectData.pages.data.dentists(true);
            projectData.pages.data.traders(true);
            projectData.pages.data.testimonials();
            projectData.pages.data.corporateDesign();
            projectData.pages.data.careers();
            projectData.pages.data.team();
            projectData.pages.data.pressCenter();
            projectData.pages.data.howToCreateWallet();
        },
        data: {
            homepage: async function() {
                if ($('body').hasClass('home')) {
                    projectData.general_logic.data.showLoader();

                    setTimeout(async function() {
                        var usersPageData = '';
                        var dentistsPageData = '';
                        var tradersPageData = '';

                        var takeHomepageDataResponse = await projectData.requests.takeHomepageData();
                        console.log(takeHomepageDataResponse, 'takeHomepageDataResponse');

                        if (takeHomepageDataResponse.success) {
                            projectData.general_logic.data.hideLoader();
                            projectData.general_logic.data.showStickyHomepageNav();

                            usersPageData = takeHomepageDataResponse.data.usersPageData;
                            dentistsPageData = takeHomepageDataResponse.data.dentistsPageData;
                            tradersPageData = takeHomepageDataResponse.data.tradersPageData;

                            $('.call-users-page').click(function() {
                                console.log('click');
                                projectData.general_logic.data.slideInUsersContent(usersPageData);
                            });

                            $('.call-dentists-page').click(function() {
                                console.log('click');
                                projectData.general_logic.data.slideInDentistsContent(dentistsPageData);
                            });

                            $('.call-traders-page').click(function() {
                                console.log('click');
                                projectData.general_logic.data.slideInTradersContent(tradersPageData);
                            });
                        } else {
                            $('.section-homepage-nav .single-element a').click(function() {
                                basic.closeDialog();
                                basic.showAlert('Something went wrong. Please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a> with description of the problem.', '', true);
                            });
                        }
                    }, 2000);
                }
            },
            users: function(bodyClassCheck) {
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('users')) {
                        return false;
                    }
                }

                // adjust header to black style
                $('header .white-black-btn').removeClass('white-black-btn').addClass('black-white-btn');
                $('header .logo-container img').attr('src', ' /assets/images/logo.svg ');

                // remove footer black style
                if ($('footer').hasClass('black-style')) {
                    $('footer').removeClass('black-style');
                    for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                        var currentSocial = $('.socials ul li a img').eq(i);
                        currentSocial.attr('src', currentSocial.attr('data-default-src')).attr('alt', currentSocial.attr('data-default-alt'));
                    }
                }

                // add intro section animation
                $('.section-wait-until-user-page .hidden-picture img').addClass('animated');

                projectData.general_logic.data.hideStickyHomepageNav();
                projectData.general_logic.data.showStickySubpagesNav();

                if ($('#append-big-hub-dentacoin').length) {
                    var bigHubParams = {
                        'element_id_to_append' : 'append-big-hub-dentacoin',
                        'type_hub' : 'dentacoin',
                        'local_environment' : 'https://dev.dentacoin.com'
                    };

                    dcnHub.initBigHub(bigHubParams);
                }

                $('body').addClass('overflow-hidden');
                if ($(window).width() < 767) {
                    $('.class-video-container').html('<div class="black-border-left margin-top-20 padding-left-10"><h3 class="fs-22 lato-black">PATIENTS</h3><div class="fs-18">Earn rewards for reviews, surveys, better oral hygiene and reduce your dental costs!</div></div><figure class="padding-top-15 padding-bottom-15 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Patient dentist triangle" class="max-width-400 width-100 margin-0-auto" src="/assets/uploads/dentacoin-dentist-patient-ecosystem.png" itemprop="contentUrl"></figure><div class="black-border-right padding-right-10 text-right"><h3 class="fs-22 lato-black">DENTISTS</h3><div class="fs-18">Earn rewards for reviews, surveys, better oral hygiene and reduce your dental costs!</div></div><figure class="padding-top-25 padding-bottom-10 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin currency" class="max-width-80 width-100 margin-0-auto" src="/assets/uploads/dcn-coin.svg" itemprop="contentUrl"><figcaption class="fs-18"><span class="display-block fs-22 lato-black padding-bottom-5">Dentacoin Currency</span>An Ethereum-based utility token, used for rewards, payments, and exchange within and beyond the  dental industry.</figcaption></figure><figure class="padding-top-25 padding-bottom-10 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin Apps" class="max-width-80 width-100 margin-0-auto" src="/assets/uploads/dcn-phone-apps.svg" itemprop="contentUrl"><figcaption class="fs-18"><span class="display-block fs-22 lato-black padding-bottom-5">Dentacoin Apps</span>Promoting better oral health and rewarding users for submitting feedback, taking surveys, maintaining oral hygiene.</figcaption></figure><figure class="padding-top-25 padding-bottom-10 text-center" itemscope="" itemtype="http://schema.org/ImageObject"><img alt="Dentacoin Assurance" class="max-width-80 width-100 margin-0-auto" src="/assets/uploads/dcn-assurance.svg" itemprop="contentUrl"><figcaption class="fs-18"><span class="display-block fs-22 lato-black padding-bottom-5">Dentacoin Assurance</span>The first smart contract-based dental assurance plan, focused on prevention and paid exclusively in DCN currency.</figcaption></figure>');
                } else {
                    var videoPlayed = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.patient-dentist-triangle-video'), 200) && !videoPlayed) {
                            videoPlayed = true;
                            $('.patient-dentist-triangle-video').html('<video muted="muted" autoplay><source src="/assets/uploads/patient-dentist-triangle-animation.mp4" type="video/mp4"> Your browser does not support HTML5 video.</video><meta itemprop="name" content="Dentacoin Currency Video"><meta itemprop="description" content="Relation between patients and dentists via Dentacoin Currency."><meta itemprop="uploadDate" content="2020-08-30T08:00:00+08:00"><meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png"><link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/patient-dentist-triangle-animation.mp4">');
                        }
                    });
                }
                $('body').removeClass('overflow-hidden');

                projectData.general_logic.data.videoExpressionsSlider('users');
                projectData.general_logic.data.userExpressionsSlider('users');

                if ($('.section-google-map.module').length) {
                    var mapVisible = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.section-google-map.module'), 200) && !mapVisible) {
                            console.log('LOAD MAP');
                            mapVisible = true;

                            projectData.general_logic.data.dentacoinGoogleMap();
                        }
                    });
                }
            },
            dentists: function(bodyClassCheck) {
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('dentists')) {
                        return false;
                    }
                }

                // add intro section animation
                $('.section-the-era-dentist-page .hidden-picture img').addClass('animated');

                // adjust header to white style
                $('header .black-white-btn').removeClass('black-white-btn').addClass('white-black-btn');
                $('header .logo-container img').attr('src', ' /assets/images/logo.svg ');

                // adjust footer to white style
                if ($('footer').hasClass('black-style')) {
                    $('footer').removeClass('black-style');
                    for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                        var currentSocial = $('.socials ul li a img').eq(i);
                        currentSocial.attr('src', currentSocial.attr('data-default-src')).attr('alt', currentSocial.attr('data-default-alt'));
                    }
                }

                projectData.general_logic.data.hideStickyHomepageNav();
                projectData.general_logic.data.showStickySubpagesNav();

                if ($('.benefits-row').length && $('.benefits-row video').length) {
                    var videosPlayed = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.benefits-row'), 200) && !videosPlayed) {
                            videosPlayed = true;

                            for (var i = 0, len = $('.benefits-row video').length; i < len; i+=1) {
                                $('.benefits-row video').get(i).play();
                            }

                            $('.section-list-with-benefits-dentists-page .white-purple-btn.with-white-arrow').addClass('animated');
                            setTimeout(function() {
                                $('.section-list-with-benefits-dentists-page .white-purple-btn.with-white-arrow').removeClass('animated').addClass('hover-effect');
                            }, 2000);
                        }
                    });
                }

                projectData.general_logic.data.videoExpressionsSlider('dentists');
                projectData.general_logic.data.userExpressionsSlider('dentists');

                if ($('.section-google-map.module').length) {
                    var mapVisible = false;
                    $(window).on('scroll', function () {
                        if (basic.isInViewport($('.section-google-map.module'), 200) && !mapVisible) {
                            console.log('LOAD MAP');
                            mapVisible = true;

                            projectData.general_logic.data.dentacoinGoogleMap();
                        }
                    });
                }
            },
            traders: function(bodyClassCheck) {
                if (bodyClassCheck != undefined) {
                    if (!$('body').hasClass('traders')) {
                        return false;
                    }
                }

                // if exchange bullets exist bind them logic to show/ hide exchanges
                /*if ($('.exchanges-bullets').length) {
                    $('.exchanges-bullets a').click(function() {
                        $('.exchanges-bullets a').removeClass('active');
                        $(this).addClass('active');

                        $('.mobile-exchanges .mobile-extra-row').removeClass('active');
                        $('.mobile-exchanges .mobile-extra-row[data-bullet="'+$(this).attr('data-bullet')+'"]').addClass('active');
                    });
                }*/

                if ($('.mobile-exchanges').length) {
                    $('.mobile-exchanges .slider-row').slick({
                        slidesToShow: 1,
                        infinite: true,
                        arrows: true,
                        dots: true,
                        adaptiveHeight: true
                    });
                }

                // add intro section animation
                $('.section-bringing-blockchain-solutions-trader-page .trader').addClass('animated');
                $('.section-bringing-blockchain-solutions-trader-page .trader-animated-background').addClass('animated');

                // adjust header to black style
                $('header .white-black-btn').removeClass('white-black-btn').addClass('black-white-btn');
                $('header .logo-container img').attr('src', '//dentacoin.com/assets/images/rounded-logo-white.svg');

                // adjust footer to black style
                $('footer').addClass('black-style');
                for (var i = 0, len = $('.socials ul li a img').length; i < len; i+=1) {
                    var currentSocial = $('.socials ul li a img').eq(i);
                    currentSocial.attr('src', currentSocial.attr('data-black-style-src')).attr('alt', currentSocial.attr('data-black-style-alt'));
                }

                if (basic.isMobile()) {
                    if (basic.getMobileOperatingSystem() == 'iOS') {
                        $('.app-store-btn').fadeIn(500);
                    } else  if (basic.getMobileOperatingSystem() == 'Android') {
                        $('.google-play-btn').fadeIn(500);
                    }
                } else {
                    $('.app-store-btn').fadeIn(500);
                    $('.google-play-btn').fadeIn(500);
                }

                // add styles for latest twitter tweets iframe
                var twitterStyleInterval = setInterval(function() {
                    if ($('iframe.twitter-timeline').length) {
                        $('body').addClass('overflow-hidden');
                        if ($(window).width() < 767) {
                            $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-Header, .timeline-Footer{display:none}.timeline-Widget{max-width: none !important;}.timeline-TweetList{font-size: 0;position:relative;}li.timeline-TweetList-tweet {display: inline-block;vertical-align: top;width:100%}.SandboxRoot.env-bp-970 .timeline-Tweet-text {font-size: 16px !important; line-height: 22px !important;font-weight: 300;}.timeline-TweetList-tweet:nth-of-type(2){top: 0;position: absolute;left: 100%;background: white;--moz-transition: 0.3s;-ms-transition: 0.3s;transition: 0.3s;z-index:50;}.timeline-TweetList-tweet:nth-of-type(3){top: 0;position: absolute;left: 100%;background: white;--moz-transition: 0.3s;-ms-transition: 0.3s;transition: 0.3s;z-index:100;}</style>');

                            $('iframe.twitter-timeline').height('auto');

                            $('.tweets-iframe-container').append('<div class="tweet-bullets padding-top-10 padding-bottom-15"><a href="javascript:void(0);" class="inline-block first active"></a><a href="javascript:void(0);" class="inline-block second"></a><a href="javascript:void(0);" class="inline-block third"></a></div>');

                            $('.tweet-bullets a').click(function() {
                                $('.tweet-bullets a').removeClass('active');
                                $(this).addClass('active');

                                if ($(this).hasClass('first')) {
                                    $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-TweetList-tweet:nth-of-type(2){left: 100% !important}.timeline-TweetList-tweet:nth-of-type(3){left: 100% !important}</style>');
                                } else if ($(this).hasClass('second')) {
                                    $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-TweetList-tweet:nth-of-type(2){left: 0 !important}.timeline-TweetList-tweet:nth-of-type(3){left: 100% !important}</style>');
                                } else if ($(this).hasClass('third')) {
                                    $('iframe.twitter-timeline').contents().find('head').append('<style>.timeline-TweetList-tweet:nth-of-type(2){left: 100% !important}.timeline-TweetList-tweet:nth-of-type(3){left: 0 !important}</style>');
                                }

                                $('iframe.twitter-timeline').height('auto');
                            });
                        } else {
                            $('iframe.twitter-timeline').height('auto').contents().find('head').append('<style>.timeline-Header, .timeline-Footer{display:none}.timeline-Widget{max-width: none !important;}.timeline-TweetList{font-size: 0;}li.timeline-TweetList-tweet {display: inline-block;vertical-align: top;width:33.33333%}.SandboxRoot.env-bp-970 .timeline-Tweet-text {font-size: 16px !important; line-height: 22px !important;font-weight: 300;}</style>');
                        }
                        $('body').removeClass('overflow-hidden');

                        clearInterval(twitterStyleInterval);
                    }
                }, 500);

                // add roadmap show logic
                if ($('.section-dentacoin-roadmap').length) {
                    $('.single-year-content.active').fadeIn(500);

                    $('.section-dentacoin-roadmap .years-line a').click(function() {
                        $('.section-dentacoin-roadmap .years-line a').removeClass('active');
                        $(this).addClass('active');

                        $('.single-year-content').hide();
                        $('.single-year-content[data-year="'+$(this).attr('data-year')+'"]').fadeIn(500);
                    });
                }

                $(window).on('scroll', function() {
                    // animate everything you need to know section
                    if (basic.isInViewport($('.section-everything-you-need-to-know .middle-animated-subsection'), $(window).height() / 2) && !$('.section-everything-you-need-to-know .middle-animated-subsection').hasClass('fade-in-animation')) {
                        $('.section-everything-you-need-to-know .middle-animated-subsection').addClass('fade-in-animation');
                        $('.section-everything-you-need-to-know .left-animated-border').addClass('add-animation');
                        $('.section-everything-you-need-to-know .right-animated-border').addClass('add-animation');
                    }

                    // animate wallet section
                    if (basic.isInViewport($('.section-wallet .laptop'), $(window).height() / 2) && !$('.section-wallet .laptop').hasClass('animated')) {
                        $('.section-wallet .laptop').addClass('animated');
                        $('.section-wallet .phone').addClass('animated');
                    }
                });

                projectData.general_logic.data.hideStickyHomepageNav();
                projectData.general_logic.data.showStickySubpagesNav();
            },
            testimonials: function() {
                if ($('body').hasClass('testimonials')) {
                    var testimonial_icons_listing_page = ['avatar-icon-1.svg', 'avatar-icon-2.svg'];
                    for (var i = 0; i < $('.list .single .image.no-avatar').length; i += 1) {
                        $('.list .single .image.no-avatar').eq(i).css({'background-image': 'url(/assets/images/' + testimonial_icons_listing_page[Math.floor(Math.random() * testimonial_icons_listing_page.length)] + ')'});
                    }

                    $('svg.svg-with-lines').height($(document).height());

                    // LINE GOING UNDER TESTIMONIAL AVATARS
                    initListingPageLine();
                }
            },
            corporateDesign: function() {
                if ($('body').hasClass('corporate-design')) {
                    $('.clickable-squares-row .square').click(function () {
                        $(this).closest('.clickable-squares-row').find('.square').removeClass('active');
                        $(this).addClass('active');
                    });
                }
            },
            claimDentacoin: function() {
                if ($('body').hasClass('claim-dentacoin')) {
                    var redeemExecute = true;
                    $('.redeem-dcn').click(function () {
                        if (redeemExecute) {
                            redeemExecute = false;
                            $('#wallet-address').closest('.field-parent').find('.error-handle').remove();

                            var errors = false;
                            if ($('#wallet-address').val().trim().length != 42 || !basic.customValidateWalletAddress($('#wallet-address').val().trim())) {
                                customErrorHandle($('#wallet-address').closest('.field-parent'), 'Please enter valid Wallet Address.');
                                errors = true;
                                redeemExecute = true;
                            }

                            if (!errors) {
                                projectData.general_logic.data.showLoader();
                                setTimeout(function () {
                                    $.ajax({
                                        type: 'POST',
                                        url: 'https://external-payment-server.dentacoin.com/withdraw-by-key',
                                        dataType: 'json',
                                        data: {
                                            key: get_params['withdraw-key'],
                                            walletAddress: $('#wallet-address').val().trim()
                                        },
                                        success: function (response) {
                                            projectData.general_logic.data.hideLoader();
                                            redeemExecute = true;

                                            if (response.success) {
                                                $('.changeable-on-success').html('<div class="success-handle margin-bottom-50 margin-top-30 fs-18">Your transaction is being processed... <b><a href="https://etherscan.io/tx/' + response.transactionHash + '" target="_blank" style="color: #3c763d; text-decoration: underline;">CHECK STATUS</a></b></div>.');
                                            } else {
                                                basic.showAlert('Something went wrong. Please try again later or contact <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a> with description of the problem.', '', true);
                                            }
                                        }
                                    });
                                }, 2000);
                            }
                        }
                    });
                }
            },
            careers: function() {
                if ($('body').hasClass('careers')) {
                    if ($('.scroll-to-job-offers').length) {
                        $('.scroll-to-job-offers').click(function()  {
                            $('html, body').animate({'scrollTop': $('.open-job-positions-title .logo-over-line').offset().top}, 300);
                        });
                    }

                    if ($('.single-job-offer-container').length) {
                        // init buttons style
                        styleUploadButton(function(thisInput) {
                            $(thisInput).closest('.upload-btn-parent').find('.error-handle').remove();

                            readURL(thisInput, 2, allowedDocumentExtensions, function(e, filename) {
                                $(thisInput).closest('.button-row').find('.file-name').html('<span class="text-decoration-underline padding-right-10 inline-block">'+filename+'</span><a href="javascript:void(0);" class="remove-file inline-block">×</a>');

                                $('.remove-file').unbind().click(function() {
                                    $(this).closest('.button-row').find('input[type="file"]').val('');
                                    $(this).closest('.button-row').find('.file-name').html('');
                                });
                            });
                        }, 'bright-blue-white-btn');

                        basic.initCustomCheckboxes('.single-job-offer-container');

                        //handle apply from submission
                        $('.apply-for-position form').on('submit', async function (event) {
                            event.preventDefault();
                            var this_form_native = this;
                            var this_form = $(this_form_native);
                            var errors = false;
                            this_form.find('.error-handle').remove();

                            var check_captcha_response = await checkCaptcha(this_form.find('#captcha').val().trim());

                            for (var i = 0, len = this_form.find('input[type="text"].required').length; i < len; i+=1) {
                                if (this_form.find('input[type="text"].required').eq(i).val().trim() == '') {
                                    customErrorHandle(this_form.find('input[type="text"].required').eq(i).closest('.field-parent'), 'This field is required.');
                                    errors = true;
                                } else if (this_form.find('input[type="text"].required').eq(i).attr('name') == 'email' && !basic.validateEmail(this_form.find('input[type="text"].required').eq(i).val().trim())) {
                                    customErrorHandle(this_form.find('input[type="text"].required').eq(i).closest('.field-parent'), 'Please use valid email address.');
                                    errors = true;
                                } else if (this_form.find('input[type="text"].required').eq(i).attr('name') == 'captcha' && check_captcha_response.error) {
                                    customErrorHandle(this_form.find('input[type="text"].required').eq(i).closest('.field-parent'), 'Please enter correct captcha.');
                                    errors = true;
                                }
                            }

                            if (!this_form.find('#privacy-policy').is(':checked')) {
                                customErrorHandle(this_form.find('#privacy-policy').closest('.form-row'), this_form.find('#privacy-policy').closest('.form-row').attr('data-valid-message'));
                                errors = true;
                            }

                            if (!errors) {
                                this_form_native.submit();
                            } else {
                                $('html, body').animate({'scrollTop': $('.below-apply-for-position').offset().top}, 300);
                            }
                        });
                    }
                }
            },
            team: function() {
                if ($('body').hasClass('team')) {
                    $('.team-container .advisors .advisors-slider').slick({
                        slidesToShow: 3,
                        autoplay: true,
                        autoplaySpeed: 8000,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 2
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    adaptiveHeight: true
                                }
                            }
                        ]
                    });

                    //bind click event for show more advisors
                    $('.team-container .more-advisors .read-more a').click(function () {
                        $(this).closest('.more-advisors').find('.list').slideDown(300);
                        $(this).closest('.read-more').slideUp(300);
                    });
                }
            },
            pressCenter: function() {
                if ($('body').hasClass('press-center')) {
                    // PRESS CENTER
                    initListingPageLine();

                    if ($('.open-form').length > 0) {
                        $('.open-form').click(function () {
                            $.ajax({
                                type: 'POST',
                                url: HOME_URL + '/press-center-popup',
                                dataType: 'json',
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                },
                                success: function (response) {
                                    if (response.success) {
                                        basic.closeDialog();
                                        basic.showDialog(response.success, 'media-inquries', 'media-inquries');

                                        initCaptchaRefreshEvent();

                                        basic.initCustomCheckboxes('.bootbox.media-inquries');

                                        $('.selectpicker').selectpicker('refresh');

                                        $('.bootbox.media-inquries select[name="reason"]').on('change', function () {
                                            $('.bootbox.media-inquries .waiting-for-action').html('');
                                            if ($(this).find('option:selected').attr('data-action') == 'newsletter-register') {
                                                $('.bootbox.media-inquries .waiting-for-action').html('<input type="hidden" name="answer" value="Manual email register to newletter receivers list."/>');
                                            } else if ($(this).find('option:selected').attr('data-action') == 'long-text') {
                                                $('.bootbox.media-inquries .waiting-for-action').html('<div class="padding-bottom-15 field-parent"><textarea placeholder="' + $(this).find('option:selected').attr('data-title') + '" rows="3" name="answer" maxlength="3000" class="required"></textarea></div>');
                                            } else if ($(this).find('option:selected').attr('data-action') == 'long-text-and-attachments') {
                                                $('.bootbox.media-inquries .waiting-for-action').html('<div class="padding-bottom-15 field-parent"><textarea placeholder="' + $(this).find('option:selected').attr('data-title') + '" rows="3" name="answer" class="padding-bottom-10 required" maxlength="3000"></textarea></div><div class="padding-bottom-10 text-center-xs button-row fs-0 upload-btn-parent"><div class="upload-file module inline-block" data-label="Attach file (media package)"><input type="file" name="media-package" id="media-package" class="upload-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"></div><div class="file-text inline-block"><div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx up to 5MB</div><div class="file-name lato-bold"></div></div></div><div class="padding-bottom-15 text-center-xs button-row fs-0 upload-btn-parent"><div class="upload-file module inline-block" data-label="Attach file (individual offer, if present)"><input type="file" name="individual-offer" id="individual-offer" class="upload-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx"></div><div class="file-text inline-block"><div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf,.xls,.xlsx up to 5MB</div><div class="file-name lato-bold"></div></div></div>');

                                                styleUploadButton(function(thisInput) {
                                                    $(thisInput).closest('.upload-btn-parent').find('.error-handle').remove();

                                                    readURL(thisInput, 5, ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'odt', 'rtf', 'xls', 'xlsx'], function(e, filename) {
                                                        $(thisInput).closest('.button-row').find('.file-name').html('<span class="text-decoration-underline padding-right-10 inline-block">'+filename+'</span><a href="javascript:void(0);" class="remove-file inline-block">×</a>');

                                                        $('.remove-file').unbind().click(function() {
                                                            $(this).closest('.button-row').find('input[type="file"]').val('');
                                                            $(this).closest('.button-row').find('.file-name').html('');
                                                        });
                                                    });
                                                }, 'bright-blue-white-btn');

                                                //ADD CUSTOM EVENTS ON ENTER OR SPACE CLICK FOR accessibility
                                                $('.bootbox.media-inquries #media-package button').keypress(function (event) {
                                                    if (event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32) {
                                                        document.getElementById('file-media-package').click();
                                                    }
                                                });
                                                $('.bootbox.media-inquries #individual-offer button').keypress(function (event) {
                                                    if (event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32) {
                                                        document.getElementById('file-individual-offer').click();
                                                    }
                                                });
                                            }
                                        });

                                        $('.bootbox.media-inquries form').on('submit', async function (event) {
                                            event.preventDefault();
                                            var this_form_native = this;
                                            var this_form = $(this_form_native);
                                            var errors = false;
                                            this_form.find('.error-handle').remove();

                                            var check_captcha_response = await checkCaptcha(this_form.find('#captcha').val().trim());

                                            for (var i = 0, len = this_form.find('.required').length; i < len; i+=1) {
                                                if (this_form.find('.required').eq(i).val().trim() == '') {
                                                    customErrorHandle(this_form.find('.required').eq(i).closest('.field-parent'), 'This field is required.');
                                                    errors = true;
                                                } else if (this_form.find('.required').eq(i).attr('name') == 'email' && !basic.validateEmail(this_form.find('.required').eq(i).val().trim())) {
                                                    customErrorHandle(this_form.find('.required').eq(i).closest('.field-parent'), 'Please use valid email address.');
                                                    errors = true;
                                                } else if (this_form.find('.required').eq(i).attr('name') == 'captcha' && check_captcha_response.error) {
                                                    customErrorHandle(this_form.find('.required').eq(i).closest('.field-parent'), 'Please enter correct captcha.');
                                                    errors = true;
                                                }
                                            }

                                            if (this_form.find('select.required-select').val().trim() == '') {
                                                customErrorHandle(this_form.find('select.required-select').closest('.field-parent'), 'This field is required.');
                                                errors = true;
                                            }

                                            if (!this_form.find('#privacy-policy').is(':checked')) {
                                                customErrorHandle(this_form.find('#privacy-policy').closest('.field-parent'), this_form.find('#privacy-policy').closest('.field-parent').attr('data-valid-message'));
                                                errors = true;
                                            }

                                            if (!errors) {
                                                this_form_native.submit();
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            },
            howToCreateWallet: function() {
                if ($('body').hasClass('how-to-create-wallet')) {
                    var wallet_video_time_watched = 0;
                    var wallet_video_timer;

                    $('video.wallet-instructions-video').on('play', function () {
                        wallet_video_timer = setInterval(function () {
                            wallet_video_time_watched += 1;
                        }, 1000);
                    });

                    $('video.wallet-instructions-video').on('pause', function () {
                        clearInterval(wallet_video_timer);
                        projectData.events.fireGoogleAnalyticsEvent('Video', 'Play', 'How to Create a Wallet Demo', wallet_video_time_watched);
                    });

                    if ($('.section-wallet-questions .question').length > 0) {
                        $('.section-wallet-questions .question').click(function () {
                            $(this).toggleClass('active');
                            $(this).closest('li').find('.question-content').toggle(300);
                        });
                    }
                }
            },
            partnerNetwork: function() {
                if ($('body').hasClass('partner-network')) {
                    // PARTNER NETWORK
                    initMap();
                }
            },
            berlinRoundtable: function() {
                if ($('body').hasClass('berlin-roundtable')) {
                    // BERLIN ROUNDTABLE

                    $(document).on('click', '.reserve-your-spot', function() {
                        $('html, body').animate({'scrollTop': $('.reserve-your-spot-form').offset().top }, 300);
                    });

                    $('select[name="company-profile"]').on('change', function() {
                        if ($(this).find('option:selected').val() == 'Other:') {
                            $('.camping-select-result').html('<div class="padding-bottom-20 field-parent"><textarea id="please-specify" name="please-specify" placeholder="Please specify" rows="3" maxlength="3000" class="required form-field"></textarea></div>');
                        } else {
                            $('.camping-select-result').html('');
                        }
                    });

                    var init_form = true;
                    $('form.reserve-your-spot-form').on('submit', async function(event) {
                        var this_form = $(this);
                        event.preventDefault();
                        if (init_form) {
                            //clear prev errors
                            if (this_form.find('.error-handle').length) {
                                this_form.find('.error-handle').remove();
                            }

                            var form_fields = this_form.find('.form-field.required');
                            var submit_form = true;
                            for (var i = 0, len = form_fields.length; i < len; i += 1) {
                                if (form_fields.eq(i).is('select')) {
                                    if (form_fields.eq(i).val() == 'disabled') {
                                        customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Please choose from list.');
                                        submit_form = false;
                                    }
                                } else {
                                    if (form_fields.eq(i).attr('type') == 'email' && !basic.validateEmail(form_fields.eq(i).val().trim())) {
                                        customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'Please use valid email address.');
                                        submit_form = false;
                                    }

                                    if (form_fields.eq(i).val().trim() == '') {
                                        customErrorHandle(form_fields.eq(i).closest('.field-parent'), 'This field is required.');
                                        submit_form = false;
                                    }
                                }
                            }

                            var check_captcha_response = await checkCaptcha(this_form.find('#register-captcha').val().trim());
                            if (check_captcha_response.error) {
                                customErrorHandle(this_form.find('#register-captcha').closest('.field-parent'), 'Please enter correct captcha.');
                                submit_form = false;
                            }

                            if (submit_form && init_form) {
                                init_form = false;
                                projectData.general_logic.data.showLoader();
                                setTimeout(async function() {
                                    $.ajax({
                                        type: 'POST',
                                        url: '/submit-berlin-roundtable-form',
                                        dataType: 'json',
                                        data: this_form.serialize(),
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                        },
                                        success: function (response) {
                                            if (response.success) {
                                                init_form = true;
                                                basic.showAlert(response.success);
                                                $('form.reserve-your-spot-form input.required, form.reserve-your-spot-form textarea.required').val('');
                                                $('.refresh-captcha').click();
                                                projectData.general_logic.data.hideLoader();
                                            }
                                        }
                                    });
                                }, 1000);
                            }
                        }
                    });

                    if ($('.attendees-slider').length) {
                        $('.attendees-slider').slick({
                            slidesToShow: 1,
                            infinite: true,
                            arrows: true,
                            dots: false
                        });
                    }
                }
            }
        }
    },
    general_logic: {
        not_logged_in: function() {
            projectData.general_logic.data.gateway();
            projectData.general_logic.data.cookie();
        },
        logged_in: function() {
            projectData.general_logic.data.miniHub();
            projectData.general_logic.data.cookie();
        },
        data: {
            gateway: function() {
                dcnGateway.init({
                    'platform': 'dentacoin',
                    /*'environment' : 'staging',*/
                    'combined_login_environment' : 'staging',
                    'forgotten_password_link': 'https://account.dentacoin.com/forgotten-password'
                });

                $(document).on('dentistAuthSuccessResponse', async function (event) {
                    console.log('dentistAuthSuccessResponse');
                    window.location.href = window.location.href + '?cross-login=true';
                });

                $(document).on('patientAuthSuccessResponse', async function (event) {
                    console.log('patientAuthSuccessResponse');
                    window.location.href = window.location.href + '?cross-login=true';
                });
            },
            cookie: function() {
                if (typeof(dcnCookie) != undefined) {
                    dcnCookie.init({
                        'google_app_id': 'UA-97167262-1',
                        'fb_app_id': '2366034370318681'
                    });
                }
            },
            showLoader: function() {
                $('.response-layer').show();
            },
            hideLoader: function() {
                $('.response-layer').hide();
            },
            handlePushStateRedirects: function(event) {
                if (window.location.href.includes('users')) {
                    window.location.href = HOME_URL + '/users';
                } else if (window.location.href.includes('dentists')) {
                    window.location.href = HOME_URL + '/dentists';
                } else if (window.location.href.includes('traders')) {
                    window.location.href = HOME_URL + '/traders';
                } else if (window.location.href.includes(HOME_URL)) {
                    window.location.href = HOME_URL;
                }
            },
            miniHub: function() {
                console.log('miniHub');
                var miniHubParams = {
                    'element_id_to_bind': 'header-avatar',
                    'platform': 'dentacoin',
                    'log_out_link': 'https://dentacoin.com/user-logout'
                };

                if ($('body').hasClass('logged-patient')) {
                    miniHubParams.type_hub = 'mini-hub-patients';
                    if ($('body').hasClass('home')) {
                        miniHubParams.without_apps = true;
                    }
                } else if ($('body').hasClass('logged-dentist')) {
                    miniHubParams.type_hub = 'mini-hub-dentists';
                    if ($('body').hasClass('home')) {
                        miniHubParams.without_apps = true;
                    }
                }

                dcnHub.initMiniHub(miniHubParams);
            },
            videoExpressionsSlider: function(type) {
                if ($('.module.video-expressions-slider[data-type="'+type+'"]').length) {
                    // add youtube API
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    $('.module.video-expressions-slider[data-type="'+type+'"]').slick({
                        slidesToShow: 3,
                        responsive: [
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    });

                    var xsScreen = false;
                    $('body').addClass('overflow-hidden');
                    if ($(window).width() < 767) {
                        xsScreen = true;
                    }
                    $('body').removeClass('overflow-hidden');

                    if (!xsScreen) {
                        $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').next().next().addClass('after-middle');
                        $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').next().addClass('middle-slide');
                        $('.module.video-expressions-slider[data-type="'+type+'"] .slick-current').addClass('before-middle');
                    }

                    var clearIframesOnSlickChange = true;
                    $('.module.video-expressions-slider[data-type="'+type+'"]').on('afterChange', function(event, slick, currentSlide, nextSlide) {

                        if ($('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').length) {
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                            $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');
                        }

                        if (!xsScreen) {
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-slide').removeClass('middle-slide after-middle before-middle');
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-current').next().next().addClass('after-middle');
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-current').next().addClass('middle-slide');
                            $('.module.video-expressions-slider[data-type="' + type + '"] .slick-current').addClass('before-middle');
                        }

                        if (clearIframesOnSlickChange) {
                            $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                            $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');
                        } else {
                            clearIframesOnSlickChange = true;
                        }

                        if ($('.module.video-expressions-slider[data-type="'+type+'"] .slick-active.middle-slide').find('.youtube-play-button').attr('data-play') == 'true') {
                            playYTVideo($('.module.video-expressions-slider[data-type="'+type+'"] .slick-active.middle-slide').find('.youtube-play-button'), $('.module.video-expressions-slider[data-type="'+type+'"] .slick-active.middle-slide').attr('data-video-id'));
                            $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').removeAttr('data-play');
                        }
                    });

                    $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').click(function() {
                        $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button').removeAttr('data-play');
                        $('.module.video-expressions-slider[data-type="'+type+'"] .youtube-play-button[data-id="'+$(this).attr('data-id')+'"]').attr('data-play', 'true');
                        var videoId = $(this).closest('.single-slide').attr('data-video-id');
                        clearIframesOnSlickChange = false;

                        $('.module.video-expressions-slider[data-type="'+type+'"] .slide-wrapper iframe').remove();
                        $('.module.video-expressions-slider[data-type="'+type+'"] .single-slide .video-thumb').removeClass('visibility-hidden');

                        if (xsScreen) {
                            playYTVideo($('.middle-slide .youtube-play-button'), videoId);
                        } else {
                            if ($(this).closest('.slick-slide').hasClass('middle-slide')) {
                                // play video
                                playYTVideo($('.middle-slide .youtube-play-button'), videoId);
                            } else {
                                // make slide active and play video
                                $('.module.video-expressions-slider[data-type="'+type+'"]').slick('slickGoTo', $(this).closest('.slick-slide').prev().attr('data-slick-index'));
                                // playYTVideo($('.middle-slide .youtube-play-button'));
                            }
                        }
                    });

                    function playYTVideo(el, videoId) {
                        el.closest('.slide-wrapper').append('<div id="main-video-player"></div>');
                        el.closest('.single-slide').find('.video-thumb').addClass('visibility-hidden');

                        var playerEvents = {};

                        playerEvents.onReady = onPlayerReady;

                        new YT.Player('main-video-player', {
                            videoId: videoId,
                            events: playerEvents
                        });

                        function onPlayerReady(event) {
                            if (!xsScreen) {
                                $('iframe#main-video-player').height($('iframe#main-video-player').closest('.single-slide').find('.video-thumb figure img').height());
                            }
                            event.target.playVideo();
                        }
                    }
                }
            },
            userExpressionsSlider(type) {
                if ($('.user-expressions-slider[data-type="'+type+'"]').length) {
                    $('.user-expressions-slider[data-type="'+type+'"]').slick({
                        slidesToShow: 3,
                        infinite: true,
                        dots: true,
                        arrows: false,
                        adaptiveHeight: true,
                        responsive: [
                            {
                                breakpoint: 1800,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    });

                    var xsScreen = false;
                    $('body').addClass('overflow-hidden');
                    if ($(window).width() < 767) {
                        xsScreen = true;
                    }
                    $('body').removeClass('overflow-hidden');

                    if (!xsScreen) {
                        setupUserExpressionsSlidesSameHeight();

                        $('.user-expressions-slider[data-type="'+type+'"]').on('afterChange', function(event, slick, currentSlide, nextSlide) {
                            $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active .user-expression-text').outerHeight('auto');

                            setupUserExpressionsSlidesSameHeight();
                        });

                        function setupUserExpressionsSlidesSameHeight() {
                            var height = 0;
                            for (var i = 0, len = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').length; i < len; i+=1) {
                                if ($('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).find('.user-expression-text').outerHeight() > height) {
                                    height = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).find('.user-expression-text').outerHeight();
                                }
                            }

                            $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active .user-expression-text').animate({height: height}, 300);

                            // update slick list height
                            var slickListHeight = 0;
                            for (var i = 0, len = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').length; i < len; i+=1) {
                                if ($('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).outerHeight() > slickListHeight) {
                                    slickListHeight = $('.user-expressions-slider[data-type="'+type+'"] .slick-list .slick-active').eq(i).outerHeight();
                                }
                            }
                            $('.user-expressions-slider[data-type="'+type+'"] .slick-list').animate({height: slickListHeight}, 500);
                        }
                    }
                }
            },
            async dentacoinGoogleMap() {
                var mapHtml = await projectData.requests.getMapHtml();
                if (mapHtml.success) {
                    $('.section-google-map.module .map-container').html(mapHtml.data);

                    $('.selectpicker').selectpicker();

                    var locationsOnInit = JSON.parse($('.google-map-box').attr('data-locations'));
                    var lastMapData = {
                        map_locations: locationsOnInit,
                        initialLat: undefined,
                        initialLng: undefined,
                        initialZoom: undefined,
                        filter_country: undefined,
                        location_id: undefined,
                        location_source: undefined,
                        categories: $('.selectpicker.location-types').val()
                    };
                    initMap(locationsOnInit, undefined, undefined, undefined, undefined, undefined, undefined, $('.selectpicker.location-types').val());

                    basic.initCustomCheckboxes('.google-map-and-bottom-filters', 'append');

                    $('.show-locations-list').click(function() {
                        if (!$(this).parent().hasClass('list-shown')) {
                            $('.hide-on-map-open').addClass('hide');
                            $(this).parent().addClass('list-shown');
                            $(this).addClass('with-map-pin').removeClass('with-list-icon').html(' GO BACK TO MAP');

                            $('.subpages-sticky-nav').addClass('hide');
                            $('.picker-and-map .google-map-box').hide();
                            $('.picker-and-map .left-picker').fadeIn(500);
                            $('.locations-list .invite-text').fadeIn();

                            $('body').addClass('overflow-hidden');
                            if ($(window).width() < 992) {
                                // scroll to open location everytime on list showing, because the scrolling doesn't work when element is with display none
                                if ($('.single-location.toggled').length) {
                                    $('.results-list').scrollTop(0);
                                    $('.results-list').scrollTop($('.single-location.toggled').position().top - 15);
                                }
                            }
                            $('body').removeClass('overflow-hidden');
                        } else {
                            $('.hide-on-map-open').removeClass('hide');
                            $(this).removeClass('with-map-pin').addClass('with-list-icon').html(' SEE RESULTS IN LIST');
                            $(this).parent().removeClass('list-shown');

                            $('.subpages-sticky-nav').removeClass('hide');
                            $('.picker-and-map .google-map-box').fadeIn(500);
                            $('.picker-and-map .left-picker').hide();
                            $('.locations-list .invite-text').hide();

                            $('html, body').animate({'scrollTop': $('.section-google-map.module').offset().top }, 300);
                        }

                        $('html, body').animate({'scrollTop': $('.map-container').offset().top }, 300);
                    });

                    function dynamicSort(property) {
                        var sortOrder = 1;
                        if(property[0] === "-") {
                            sortOrder = -1;
                            property = property.substr(1);
                        }
                        return function (a,b) {
                            /* next line works with strings and numbers,
                             * and you may want to customize it to your needs
                             */
                            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                            return result * sortOrder;
                        }
                    }

                    var locationsCountsArr = [];

                    // set continent count BY adding the countries locations for THIS continent
                    for (var i = 0, len = $('.single-continent').length; i < len; i+=1) {
                        var currentContinentLocationsCount = 0;
                        for (var y = 0, leny = $('.single-continent').eq(i).find('.country-list-parent').length; y < leny; y+=1) {
                            if ($('.single-continent').eq(i).find('.country-list-parent').eq(y).find('[data-locations-count]').length) {
                                currentContinentLocationsCount += parseInt($('.single-continent').eq(i).find('.country-list-parent').eq(y).find('[data-locations-count]').attr('data-locations-count'));
                            }
                        }
                        $('.single-continent').eq(i).find('> a').append('<span class="lato-bold inline-block locations-count fs-18 fs-xs-14">('+currentContinentLocationsCount+' locations)</span>');

                        locationsCountsArr.push({'count' : currentContinentLocationsCount, 'location_id' : $('.single-continent').eq(i).find('> a').attr('data-continent-id')});
                    }

                    // reorder the continents list by count from bigger to smallest count
                    var orderedLocationsCountsArr = locationsCountsArr.sort(dynamicSort('count'));
                    orderedLocationsCountsArr.reverse();
                    var reorderedCountriesListHtml = '';
                    for (var i = 0, len = orderedLocationsCountsArr.length; i < len; i+=1) {
                        reorderedCountriesListHtml += $('.continent-name[data-continent-id='+orderedLocationsCountsArr[i].location_id+']').parent().get(0).outerHTML;
                    }
                    $('.continents-list ul').html(reorderedCountriesListHtml);

                    $('body').addClass('overflow-hidden');
                    if ($(window).width() > 992) {
                        $('.results-list').css({'max-height' : ($('.google-map-and-bottom-filters').height() - $('.left-picker .inner-gray-line').height()) + 'px'});
                    }
                    $('body').removeClass('overflow-hidden');

                    $('.selectpicker.location-types').on('change', function() {
                        var thisValue = $(this).val();

                        // dont allow users to filter only category-5
                        if (thisValue.includes('category-5') && !thisValue.includes('category-1')) {
                            thisValue.push('category-1');
                        }

                        $('.right-side-filters input[type="checkbox"]').prop('checked', true);
                        updateTopLocationsSelectOnBottomFilterChange(thisValue);

                        // update bottom filter checkboxes
                        $('.right-side-filters input[type="checkbox"]').prop('checked', false);
                        $('.right-side-filters .custom-checkbox').html('');
                        if (thisValue.length > 0) {
                            for (var i = 0; i < thisValue.length; i += 1) {
                                if ($('.right-side-filters input[type="checkbox"]#' + thisValue[i]).length) {
                                    $('.right-side-filters input[type="checkbox"]#' + thisValue[i]).prop('checked', true);
                                    $('.right-side-filters input[type="checkbox"]#' + thisValue[i]).parent().find('.custom-checkbox').html('✓');
                                }
                            }
                        }
                    });

                    // this event is fired in 2 cases:
                    // - when someone click a marker pin right on the map
                    // - when someone select location right from the select dropdown with locations
                    $(document).on('showLocationInList', async function (event) {
                        if (event.response_data) {
                            console.log(event.response_data, 'event.response_data');

                            var listAlreadyLoaded = false;
                            var disallowAlreadyLoaded = false;
                            for (var i = 0, len = $('.locations-category-list').length; i < len; i+=1) {
                                if ($('.locations-category-list').eq(i).find('li').length > 0) {
                                    listAlreadyLoaded = true;
                                    break;
                                }
                            }

                            if (event.response_data.disallowAlreadyLoaded) {
                                disallowAlreadyLoaded = true;
                            }

                            // if trying to request location which is visible on the map, but from different country and not visible in the results list
                            if ($('.country-list-parent.open-item > a').length && event.response_data.country_code != $('.country-list-parent.open-item > a').attr('data-country-code')) {
                                disallowAlreadyLoaded = true;
                            }

                            if (listAlreadyLoaded && !disallowAlreadyLoaded) {
                                $('.locations-list .single-location').removeClass('toggled');
                                $('.results-list').scrollTop(0);

                                if (event.response_data.id && event.response_data.source) {
                                    $('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').addClass('toggled');
                                    $('.results-list').scrollTop($('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').position().top - 15);
                                }
                            } else {
                                // close countries
                                $('.results-list .shown').removeClass('shown');
                                $('.results-list .countries-nav').addClass('shown');
                                $('.countries-list .country-list-parent').removeClass('hide open-item');

                                // close continents
                                $('.continents-list > ul > li').removeClass('hide open-item');
                                $('.results-list .shown').removeClass('shown');
                                $('.results-list .continents-nav').addClass('shown');

                                for (var i = 0, len = $('.continents-list .single-continent').length; i < len; i+=1) {
                                    if (JSON.parse($('.continents-list .single-continent').eq(i).find('> a').attr('data-country-codes')).includes(event.response_data.country_code)) {
                                        $('.continents-list .single-continent').addClass('hide');
                                        $('.continents-list .single-continent').eq(i).addClass('open-item');

                                        for (var y = 0, leny = $('.single-continent.open-item .countries-list li').length; y < leny; y+=1) {
                                            if ($('.single-continent.open-item .countries-list li').eq(y).find('> a').attr('data-country-code') == event.response_data.country_code) {
                                                $('.continents-list .single-continent').eq(i).find('.country-list-parent').addClass('hide');
                                                $('.countries-list a[data-country-code="'+event.response_data.country_code+'"]').closest('.country-list-parent').addClass('open-time');

                                                var city = undefined;
                                                if (event.response_data.city) {
                                                    city = event.response_data.city;
                                                }

                                                lastMapData = {
                                                    map_locations: locationsOnInit,
                                                    initialLat: event.response_data.lat,
                                                    initialLng: event.response_data.lng,
                                                    initialZoom: 15,
                                                    filter_country: event.response_data.country_code,
                                                    location_id: undefined,
                                                    location_source: undefined,
                                                    categories: $('.selectpicker.location-types').val()
                                                };

                                                if (event.response_data.id && event.response_data.source && event.response_data.content) {
                                                    initMap(locationsOnInit, event.response_data.lat, event.response_data.lng, 15, event.response_data.country_code, event.response_data.id, event.response_data.source, $('.selectpicker.location-types').val(), true, city, event.response_data.content);
                                                } else {
                                                    initMap(locationsOnInit, event.response_data.lat, event.response_data.lng, 15, event.response_data.country_code, undefined, undefined, $('.selectpicker.location-types').val(), true, city);
                                                }

                                                await buildCountryLocationsList($('.countries-list a[data-country-code="'+event.response_data.country_code+'"]').parent().find('.locations-category-list'), event.response_data.country_code, $('.countries-list a[data-country-code="'+event.response_data.country_code+'"]'));

                                                $('.locations-list .single-location').removeClass('toggled');

                                                $('.results-list').scrollTop(0);

                                                if (event.response_data.id && event.response_data.source) {
                                                    $('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').addClass('toggled');
                                                    $('.results-list').scrollTop($('.locations-list .single-location a[data-location-id="'+event.response_data.id+'"][data-location-source="'+event.response_data.source+'"]').closest('.single-location').position().top - 15);
                                                }
                                                break;
                                            }
                                        }

                                        break;
                                    }
                                }
                            }
                        }
                    });

                    $('.selectpicker.locations').on('change', function() {
                        var thisValue = $(this).val().trim();

                        if ($(this).find('option:selected').hasClass('option-type')) {
                            $.event.trigger({
                                type: 'showLocationInList',
                                time: new Date(),
                                response_data: {
                                    'country_code' : $(this).find('option:selected').attr('data-country-code'),
                                    'id' : $(this).find('option:selected').attr('data-id'),
                                    'source' : thisValue,
                                    'zoom' : 15,
                                    'lat' : $(this).find('option:selected').attr('data-lat'),
                                    'lng' : $(this).find('option:selected').attr('data-lng'),
                                    'disallowAlreadyLoaded' : true,
                                    'content' : '<div style="font-size: 20px;">'+$(this).find('option:selected').html().trim()+'</div>'
                                }
                            });
                        } else {
                            var eventData = {
                                'country_code' : $(this).find('option:selected').attr('data-country-code'),
                                'city' : $(this).find('option:selected').attr('data-city'),
                                'zoom' : 5,
                                'disallowAlreadyLoaded' : true
                            };

                            if ($(this).find('option:selected').attr('data-centroid-lat') != undefined) {
                                eventData.lat = $(this).find('option:selected').attr('data-centroid-lat');
                            }
                            if ($(this).find('option:selected').attr('data-centroid-lng') != undefined) {
                                eventData.lng = $(this).find('option:selected').attr('data-centroid-lng');
                            }

                            $.event.trigger({
                                type: 'showLocationInList',
                                time: new Date(),
                                response_data: eventData
                            });
                        }
                    });

                    $('.locations-splitted-by-category .bs-searchbox input').on('change keyup focusout paste', function() {
                        if ($(this).val().trim() != '') {
                            $(this).closest('.dropdown-menu').find('.inner').show();
                        } else {
                            $(this).closest('.dropdown-menu').find('.inner').hide();
                        }
                    });

                    // set continents locations
                    var continentCodes = {};
                    for (var i = 0, len = $('.continents-list > ul > li > a').length; i < len; i+=1) {
                        continentCodes[$('.continents-list > ul > li > a').eq(i).attr('data-continent-id')] = $('.continents-list > ul > li > a').eq(i).attr('data-country-codes');
                    }

                    if (Object.keys(continentCodes).length > 0) {
                        var continentLocationsCount = await projectData.requests.getMapData({action: 'get-continent-locations-count', data: continentCodes});
                        if (continentLocationsCount.success) {
                            Object.keys(continentLocationsCount.data).forEach(key => {
                                $('.continent-name[data-country-codes="'+key+'"]').append('<span class="locations-count lato-bold fs-20">('+continentLocationsCount.data[key]+' locations)</span>');
                            });
                        }
                    }

                    // =================== CONTINENTS LOGIC ====================
                    $('.continents-list > ul > li > a').click(async function() {
                        // MAKE REQUEST TO QUERY ALL LOCATIONS ONLY FOR THIS CONTINENT

                        $('.continents-list > ul > li').addClass('hide');

                        $(this).closest('li').addClass('open-item');
                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .countries-nav').addClass('shown');

                        $('.dentacoin-stats-category-label span').html('in ' + $(this).find('.element-name').html());

                        $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-continents"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+$(this).find('.element-name').html().trim()).attr('data-last-continent', $(this).find('.element-name').html().trim()+'</a>');

                        $('.results-list').scrollTop(0);

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: undefined,
                            initialLng: undefined,
                            initialZoom: undefined,
                            filter_country: JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')),
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, undefined, undefined, undefined, JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')), undefined, undefined, $('.selectpicker.location-types').val(), true);

                        updateContinentData($(this).attr('data-country-codes'));
                    });

                    async function updateContinentData(codes) {
                        if (codes != undefined && basic.isJsonString(codes)) {
                            var continentCountriesCodes = codes;

                            // request to update the locations count in the gray header line
                            var currentContinentLocationsCount = await projectData.requests.getMapData({action: 'get-continent-stats', data: continentCountriesCodes});
                            if (currentContinentLocationsCount.success) {
                                $('.picker-and-map .picker-value').html('<span class="lato-black">'+currentContinentLocationsCount.data+'</span> Results').attr('data-last-continent', currentContinentLocationsCount.data);
                            }

                            // make request to update partners, non partners and users stats at the bottom
                            var combinedCountByMultipleCountry = await projectData.requests.getMapData({action: 'combined-count-by-multiple-country', data: continentCountriesCodes});
                            if (combinedCountByMultipleCountry.success) {
                                if ($('.changeable-stats .partners').length) {
                                    $('.changeable-stats .partners span').html(combinedCountByMultipleCountry.data['partners']);
                                    $('.changeable-stats .partners').attr('data-last-continent', combinedCountByMultipleCountry.data['partners']);
                                }
                                if ($('.changeable-stats .non-partners').length) {
                                    $('.changeable-stats .non-partners span').html(combinedCountByMultipleCountry.data['non_partners']);
                                    $('.changeable-stats .non-partners').attr('data-last-continent', combinedCountByMultipleCountry.data['non_partners'])
                                }
                                if ($('.changeable-stats .users').length) {
                                    $('.changeable-stats .users span').html(combinedCountByMultipleCountry.data['patients']);
                                    $('.changeable-stats .users').attr('data-last-continent', combinedCountByMultipleCountry.data['patients']);
                                }
                            }
                        }
                    }

                    $(document).on('click', '.go-back-to-continents', function() {
                        $('.continents-list > ul > li').removeClass('hide open-item');

                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .continents-nav').addClass('shown');

                        $('.dentacoin-stats-category-label span').html('Worldwide');
                        $('.picker-and-map .picker-label').html('Worldwide');

                        $('.results-list').scrollTop(0);

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: undefined,
                            initialLng: undefined,
                            initialZoom: undefined,
                            filter_country: undefined,
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, undefined, undefined, undefined, undefined, undefined, undefined, $('.selectpicker.location-types').val());

                        if ($('.picker-and-map .picker-value').attr('data-worldwide') != '') {
                            $('.picker-and-map .picker-value').html('<span class="lato-black">'+$('.picker-and-map .picker-value').attr('data-worldwide')+'</span> Results');
                        }

                        if ($('.changeable-stats .partners').length) {
                            $('.changeable-stats .partners span').html($('.changeable-stats .partners').attr('data-worldwide'));
                        }

                        if ($('.changeable-stats .non-partners').length) {
                            $('.changeable-stats .non-partners span').html($('.changeable-stats .non-partners').attr('data-worldwide'));
                        }

                        if ($('.changeable-stats .users').length) {
                            $('.changeable-stats .users span').html($('.changeable-stats .users').attr('data-worldwide'));
                        }
                    });
                    // =================== /CONTINENTS LOGIC ===================

                    // =================== COUNTRIES LOGIC ====================
                    async function buildCountryLocationsList(list, code, thisBtn) {
                        projectData.general_logic.data.showLoader();
                        var totalLocationsCountByCountry = 0;

                        // Partner Dental Practices
                        var currentCountryPartnersData = await projectData.requests.getMapData({action: 'all-partners-data-by-country', data: code});
                        if (currentCountryPartnersData.success && currentCountryPartnersData.data.length > 0) {
                            // checking if visibility allowed by bottom category filter
                            var iconClass = 'fa-minus-circle';
                            var parentElementClass = '';
                            if (!$('.right-side-filters #category-1').is(':checked') && !$('.right-side-filters #category-5').is(':checked')) {
                                iconClass = 'fa-plus-circle';
                                parentElementClass = 'closed';
                            }

                            var bindPartnersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button partners fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Partner Dental Practices</span></a><ul class="locations-list">';
                            for (var i = 0, len = currentCountryPartnersData.data.length; i < len; i+=1) {
                                bindPartnersCategoryHtml += buildSingleLocationTile(currentCountryPartnersData.data[i].avatar_url, currentCountryPartnersData.data[i].name, currentCountryPartnersData.data[i].address, currentCountryPartnersData.data[i].is_partner, currentCountryPartnersData.data[i].city_name, currentCountryPartnersData.data[i].phone, currentCountryPartnersData.data[i].website, currentCountryPartnersData.data[i].top_dentist_month, currentCountryPartnersData.data[i].avg_rating, currentCountryPartnersData.data[i].ratings, currentCountryPartnersData.data[i].trp_public_profile_link, thisBtn.find('.element-name').html(), currentCountryPartnersData.data[i].id, 'core-db', currentCountryPartnersData.data[i].lat, currentCountryPartnersData.data[i].lon);
                            }

                            bindPartnersCategoryHtml+='</ul></li>';
                            list.append(bindPartnersCategoryHtml);
                        }

                        // Partner Dental Labs, Partner Dental Suppliers, Other Industry Partners
                        var getLabsSuppliersAndIndustryPartnersData = await projectData.requests.getLabsSuppliersAndIndustryPartners({'country-code' : code});
                        if (getLabsSuppliersAndIndustryPartnersData.success) {
                            // Partner Dental Labs
                            if (getLabsSuppliersAndIndustryPartnersData.data.labs.length > 0) {
                                // checking if visibility allowed by bottom category filter
                                var iconClass = 'fa-minus-circle';
                                var parentElementClass = '';
                                if (!$('.right-side-filters #category-2').is(':checked')) {
                                    iconClass = 'fa-plus-circle';
                                    parentElementClass = 'closed';
                                }

                                totalLocationsCountByCountry += getLabsSuppliersAndIndustryPartnersData.data.labs.length;
                                var bindLabsCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button labs fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Partner Dental Labs</span></a><ul class="locations-list">';
                                for (var i = 0, len = getLabsSuppliersAndIndustryPartnersData.data.labs.length; i < len; i+=1) {
                                    bindLabsCategoryHtml += buildSingleLocationTile('//dentacoin.com/assets/uploads/' + getLabsSuppliersAndIndustryPartnersData.data.labs[i].clinic_media, getLabsSuppliersAndIndustryPartnersData.data.labs[i].clinic_name, getLabsSuppliersAndIndustryPartnersData.data.labs[i].address, null, null, null, null, getLabsSuppliersAndIndustryPartnersData.data.labs[i].clinic_link, null, null, null, thisBtn.find('.element-name').html(), getLabsSuppliersAndIndustryPartnersData.data.labs[i].id, 'dentacoin-db', getLabsSuppliersAndIndustryPartnersData.data.labs[i].lat, getLabsSuppliersAndIndustryPartnersData.data.labs[i].lng);
                                }

                                bindLabsCategoryHtml+='</ul></li>';
                                list.append(bindLabsCategoryHtml);
                            }

                            // Partner Dental Suppliers
                            if (getLabsSuppliersAndIndustryPartnersData.data.suppliers.length > 0) {
                                // checking if visibility allowed by bottom category filter
                                var iconClass = 'fa-minus-circle';
                                var parentElementClass = '';
                                if (!$('.right-side-filters #category-3').is(':checked')) {
                                    iconClass = 'fa-plus-circle';
                                    parentElementClass = 'closed';
                                }

                                totalLocationsCountByCountry += getLabsSuppliersAndIndustryPartnersData.data.suppliers.length;
                                var bindSuppliersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button suppliers fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Partner Dental Suppliers</span></a><ul class="locations-list">';
                                for (var i = 0, len = getLabsSuppliersAndIndustryPartnersData.data.suppliers.length; i < len; i+=1) {
                                    bindSuppliersCategoryHtml += buildSingleLocationTile('//dentacoin.com/assets/uploads/' + getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].clinic_media, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].clinic_name, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].address, null, null, null, null, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].clinic_link, null, null, null, thisBtn.find('.element-name').html(), getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].id, 'dentacoin-db', getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].lat, getLabsSuppliersAndIndustryPartnersData.data.suppliers[i].lng);
                                }

                                bindSuppliersCategoryHtml+='</ul></li>';
                                list.append(bindSuppliersCategoryHtml);
                            }

                            // Other Industry Partners
                            if (getLabsSuppliersAndIndustryPartnersData.data.industryPartners.length > 0) {
                                // checking if visibility allowed by bottom category filter
                                var iconClass = 'fa-minus-circle';
                                var parentElementClass = '';
                                if (!$('.right-side-filters #category-4').is(':checked')) {
                                    iconClass = 'fa-plus-circle';
                                    parentElementClass = 'closed';
                                }

                                totalLocationsCountByCountry += getLabsSuppliersAndIndustryPartnersData.data.industryPartners.length;
                                var bindIndustryPartnersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button industryPartners fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> Other Industry Partners</span></a><ul class="locations-list">';
                                for (var i = 0, len = getLabsSuppliersAndIndustryPartnersData.data.industryPartners.length; i < len; i+=1) {
                                    bindIndustryPartnersCategoryHtml += buildSingleLocationTile('//dentacoin.com/assets/uploads/' + getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].clinic_media, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].clinic_name, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].address, null, null, null, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].clinic_link, null, null, null, null, thisBtn.find('.element-name').html(), getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].id, 'dentacoin-db', getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].lat, getLabsSuppliersAndIndustryPartnersData.data.industryPartners[i].lng);
                                }

                                bindIndustryPartnersCategoryHtml+='</ul></li>';
                                list.append(bindIndustryPartnersCategoryHtml);
                            }
                        }

                        // All Registered Dental Practices
                        var currentCountryNonPartnersData = await projectData.requests.getMapData({action: 'all-non-partners-data-by-country', data: code});
                        if (currentCountryNonPartnersData.success && currentCountryNonPartnersData.data.length > 0) {
                            // checking if visibility allowed by bottom category filter
                            var iconClass = 'fa-minus-circle';
                            var parentElementClass = '';
                            if (!$('.right-side-filters #category-5').is(':checked')) {
                                iconClass = 'fa-plus-circle';
                                parentElementClass = 'closed';
                            }

                            var bindNonPartnersCategoryHtml = '<li class="'+parentElementClass+'"><a href="javascript:void(0);" class="category-toggle-button non-partners fs-20 fs-xs-18"><span><i class="fa '+iconClass+'" aria-hidden="true"></i> All Registered Dental Practices</span></a><ul class="locations-list">';
                            for (var i = 0, len = currentCountryNonPartnersData.data.length; i < len; i+=1) {
                                bindNonPartnersCategoryHtml += buildSingleLocationTile(currentCountryNonPartnersData.data[i].avatar_url, currentCountryNonPartnersData.data[i].name, currentCountryNonPartnersData.data[i].address, currentCountryNonPartnersData.data[i].is_partner, currentCountryNonPartnersData.data[i].city_name, currentCountryNonPartnersData.data[i].phone, currentCountryNonPartnersData.data[i].website, currentCountryNonPartnersData.data[i].top_dentist_month, currentCountryNonPartnersData.data[i].avg_rating, currentCountryNonPartnersData.data[i].ratings, currentCountryNonPartnersData.data[i].trp_public_profile_link, thisBtn.find('.element-name').html(), currentCountryNonPartnersData.data[i].id, 'core-db', currentCountryNonPartnersData.data[i].lat, currentCountryNonPartnersData.data[i].lon);
                            }

                            bindNonPartnersCategoryHtml+='</ul></li>';
                            list.append(bindNonPartnersCategoryHtml);
                        }

                        list.append('<li><div class="invite-text padding-left-15 padding-right-15 padding-top-15 padding-bottom-25"><div class="color-white lato-black fs-28 fs-sm-22 fs-xs-20 padding-bottom-15">KNOW A GREAT DENTIST, BUT IT’S NOT ON OUR MAP?</div><div><a href="https://reviews.dentacoin.com/?popup=invite-new-dentist-popup" target="_blank" class="bright-blue-white-btn with-border fs-xs-16">INVITE DENTIST</a></div></div></li>');

                        // make request to select all locations DATA for this country FOR THE MAP
                        var currentCountryLocationsData = await projectData.requests.getMapData({action: 'all-partners-and-non-partners-data-by-country', data: code});
                        if (currentCountryLocationsData.success) {
                            totalLocationsCountByCountry += currentCountryLocationsData.data.length;

                            $('.dentacoin-stats-category-label span').html('in ' + thisBtn.find('.element-name').html());
                            $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-countries"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+thisBtn.find('.element-name').html().trim()+'</a>');
                            $('.picker-and-map .picker-value').html('<span class="lato-black">'+totalLocationsCountByCountry+'</span> Results');

                            for (var i = 0, len = currentCountryLocationsData.data.length; i < len; i+=1) {
                                // console.log(currentCountryLocationsData.data[i], 'THIS WILL BE USED TO BE SHOWN ON THE MAP');
                            }
                        }

                        $('.results-list').scrollTop(0);

                        if (thisBtn.parent().find('.locations-category-list li').length == 0) {
                            thisBtn.parent().find('.locations-category-list').html('<div class="fs-18 padding-top-20 padding-bottom-20 text-center">No locations found.</div>');
                        } else {
                            // toggle category button hide/ show logic
                            $('.locations-category-list .category-toggle-button').click(function() {
                                $(this).closest('li').toggleClass('closed');

                                if ($(this).find('i').hasClass('fa-minus-circle')) {
                                    $(this).find('i').removeClass('fa-minus-circle').addClass('fa-plus-circle');

                                    if ($(this).hasClass('partners')) {
                                        // uncheck category-1
                                        updateTopAndBottomLocationTypesFilters('category-1', false);
                                    } else if ($(this).hasClass('labs')) {
                                        // check category-2
                                        updateTopAndBottomLocationTypesFilters('category-2', false);
                                    } else if ($(this).hasClass('suppliers')) {
                                        // check category-3
                                        updateTopAndBottomLocationTypesFilters('category-3', false);
                                    } else if ($(this).hasClass('industryPartners')) {
                                        // check category-4
                                        updateTopAndBottomLocationTypesFilters('category-4', false);
                                    } else if ($(this).hasClass('non_partners')) {
                                        // check category-5
                                        updateTopAndBottomLocationTypesFilters('category-5', false);
                                    }

                                    $('.selectpicker.location-types').selectpicker('refresh');
                                } else {
                                    $(this).find('i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                    if ($(this).hasClass('partners')) {
                                        // check category-1
                                        updateTopAndBottomLocationTypesFilters('category-1', true);
                                    } else if ($(this).hasClass('labs')) {
                                        // check category-2
                                        updateTopAndBottomLocationTypesFilters('category-2', true);
                                    } else if ($(this).hasClass('suppliers')) {
                                        // check category-3
                                        updateTopAndBottomLocationTypesFilters('category-3', true);
                                    } else if ($(this).hasClass('industryPartners')) {
                                        // check category-4
                                        updateTopAndBottomLocationTypesFilters('category-4', true);
                                    } else if ($(this).hasClass('non-partners')) {
                                        // check category-5
                                        updateTopAndBottomLocationTypesFilters('category-5', true);
                                    }

                                    $('.selectpicker.location-types').selectpicker('refresh');
                                }

                                // updating lastMapData categories
                                lastMapData.categories = $('.selectpicker.location-types').val();
                                initMap(lastMapData.map_locations, lastMapData.initialLat, lastMapData.initialLng, lastMapData.initialZoom, lastMapData.filter_country, lastMapData.location_id, lastMapData.location_source, lastMapData.categories, true);
                            });

                            function updateTopAndBottomLocationTypesFilters(category_id, bool) {
                                $('select.location-types option[value="'+category_id+'"]').prop('selected', bool);

                                $('.right-side-filters input[type="checkbox"]#'+category_id).prop('checked', bool);
                                if (bool) {
                                    $('.right-side-filters input[type="checkbox"]#'+category_id).parent().find('.custom-checkbox').html('✓');
                                } else {
                                    $('.right-side-filters input[type="checkbox"]#'+category_id).parent().find('.custom-checkbox').html('');
                                }
                            }
                        }

                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .locations-nav').addClass('shown');

                        $('.continents-list .single-continent .country-list-parent').addClass('hide');
                        thisBtn.parent().removeClass('hide').addClass('open-item');

                        // make request to select all partners COUNT for this country
                        var combinedCountByCountry = await projectData.requests.getMapData({action: 'combined-count-by-country', data: code});
                        if (combinedCountByCountry.success) {
                            if ($('.changeable-stats .partners').length) {
                                $('.changeable-stats .partners span').html(combinedCountByCountry.data['partners']);
                            }
                            if ($('.changeable-stats .non-partners').length) {
                                $('.changeable-stats .non-partners span').html(combinedCountByCountry.data['non_partners']);
                            }
                            if ($('.changeable-stats .users').length) {
                                $('.changeable-stats .users span').html(combinedCountByCountry.data['patients']);
                            }
                        }

                        projectData.general_logic.data.hideLoader();
                    }

                    // toggle bottom filter hide/ show logic
                    $('.right-side-filters input[type="checkbox"]').on('change', function() {
                        var thisCheckbox = $(this);
                        switch(thisCheckbox.attr('id')) {
                            case 'category-1':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-2':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-3':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-4':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());

                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                            case 'category-5':
                                if (thisCheckbox.is(':checked')) {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', true);
                                } else {
                                    $('select.location-types option[value="'+thisCheckbox.attr('id')+'"]').prop('selected', false);
                                }

                                updateTopLocationsSelectOnBottomFilterChange($('.selectpicker.location-types').val());
                                $('.selectpicker.location-types').selectpicker('refresh');

                                break;
                        }
                    });

                    function updateTopLocationsSelectOnBottomFilterChange(valuesArray) {
                        // refresh locations selectpicker
                        if (Object.keys(JSON.parse($('.locations-style').attr('data-groups-html'))).length > 0) {
                            $('select.selectpicker.locations').html('');
                            var newLocationsSelectHtml = '';
                            Object.keys(JSON.parse($('.locations-style').attr('data-groups-html'))).forEach(function(key,index) {
                                newLocationsSelectHtml += JSON.parse($('.locations-style').attr('data-groups-html'))[key];
                            });
                            $('select.selectpicker.locations').html('<option value="">Show All Locations</option>' + newLocationsSelectHtml);
                        }

                        if (valuesArray.length > 0) {
                            $('select.selectpicker.locations optgroup.optgroup-for-types').addClass('to-remove');

                            $('.category-toggle-button').parent().addClass('closed');
                            $('.category-toggle-button i').removeClass('fa-minus-circle').addClass('fa-plus-circle');

                            // filter
                            for (var i = 0, len = $('select.selectpicker.locations optgroup.optgroup-for-types').length; i < len; i+=1) {
                                for (var y = 0; y < valuesArray.length; y+=1) {
                                    if ($('select.selectpicker.locations optgroup.optgroup-for-types').eq(i).hasClass(valuesArray[y])) {
                                        $('select.selectpicker.locations optgroup.optgroup-for-types').eq(i).removeClass('to-remove');

                                        switch(valuesArray[y]) {
                                            case 'category-1':
                                                $('.category-toggle-button.partners').parent().removeClass('closed');
                                                $('.category-toggle-button.partners i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-2':
                                                $('.category-toggle-button.labs').parent().removeClass('closed');
                                                $('.category-toggle-button.labs i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-3':
                                                $('.category-toggle-button.suppliers').parent().removeClass('closed');
                                                $('.category-toggle-button.suppliers i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-4':
                                                $('.category-toggle-button.industryPartners').parent().removeClass('closed');
                                                $('.category-toggle-button.industryPartners i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                            case 'category-5':
                                                $('.category-toggle-button.non-partners').parent().removeClass('closed');
                                                $('.category-toggle-button.non-partners i').removeClass('fa-plus-circle').addClass('fa-minus-circle');

                                                break;
                                        }
                                        break;
                                    }
                                }
                            }

                            $('select.selectpicker.locations optgroup.optgroup-for-types.to-remove').remove();
                        } else {
                            $('select.selectpicker.locations optgroup.optgroup-for-types').addClass('to-remove');
                        }

                        $('.selectpicker.locations').selectpicker('refresh');

                        // updating lastMapData categories
                        lastMapData.categories = $('.selectpicker.location-types').val();
                        initMap(lastMapData.map_locations, lastMapData.initialLat, lastMapData.initialLng, lastMapData.initialZoom, lastMapData.filter_country, lastMapData.location_id, lastMapData.location_source, lastMapData.categories, true);
                    }

                    $('.countries-list > li > a').click(async function() {
                        var thisBtn = $(this);
                        thisBtn.parent().find('.locations-category-list').html('');

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: thisBtn.attr('data-country-centroid-lat'),
                            initialLng: thisBtn.attr('data-country-centroid-lng'),
                            initialZoom: 6,
                            filter_country: $(this).attr('data-country-code'),
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, thisBtn.attr('data-country-centroid-lat'), thisBtn.attr('data-country-centroid-lng'), 5, $(this).attr('data-country-code'), undefined, undefined, $('.selectpicker.location-types').val(), true);

                        buildCountryLocationsList(thisBtn.parent().find('.locations-category-list'), $(this).attr('data-country-code'), thisBtn);
                    });

                    function buildSingleLocationTile(avatar_url, name, address, is_partner, city_name, phone, website, top_dentist_month, avg_rating, ratings, trp_public_profile_link, country, location_id, location_source, lat, lng) {
                        var partnerHtml = '';
                        if (is_partner) {
                            partnerHtml = '<div class="is-partner fs-14 lato-bold padding-top-5"><span>Partner</span></div>';
                        }

                        var trpStatsHtml = '<div class="trp-stats padding-top-5">';
                        if (avg_rating != undefined) {
                            trpStatsHtml += '<div class="stars inline-block margin-right-5"><div class="active-stars" style="width: '+avg_rating / 5 * 100+'%"></div></div>'
                        }

                        if (ratings != undefined && ratings != null) {
                            trpStatsHtml += ' <span class="inline-block fs-14 base-on-x-reviews">(based on '+ratings+' reviews)</span> ';
                        }

                        if (trp_public_profile_link != null && trp_public_profile_link != undefined) {
                            trpStatsHtml += ' <a href="'+trp_public_profile_link+'" target="_blank" class="fs-26 inline-block margin-left-5"><i class="fa fa-external-link" aria-hidden="true"></i></a>';
                        }

                        trpStatsHtml += '</div>';

                        var visibleAddress = '';
                        if (city_name != null && city_name != undefined) {
                            visibleAddress = city_name + ', ' + country;
                        } else {
                            visibleAddress = country;
                        }

                        var hiddenContent = '<div class="fs-16 hidden-content padding-top-5">';

                        // remove urls from the address, because some address are saved with urls in the DB
                        if (address != null && address != undefined) {
                            address = address.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                            hiddenContent += '<div><img src="/assets/images/map-results-location-pin.svg" alt="Location icon" class="width-100 max-width-20 inline-block"/> '+address+'</div>';
                        }

                        if (phone != null && phone != undefined) {
                            hiddenContent += '<div><img src="/assets/images/map-results-phone.svg" alt="Phone icon" class="width-100 max-width-20 inline-block"/> <a href="tel:'+phone+'">'+phone+'</a></div>';
                        }

                        if (website != null && website != undefined) {
                            hiddenContent += '<div><img src="/assets/images/map-results-website-icon.svg" alt="Website icon" class="width-100 max-width-20 inline-block"/> <a href="'+website+'" target="_blank">Visit website</a></div>';
                        }

                        if (top_dentist_month) {
                            hiddenContent += '<div><img src="/assets/images/top-dentists-badge.png" alt="Top dentist badge icon" class="width-100 max-width-20 inline-block"/> Top Dentist</div>';
                        }

                        hiddenContent += '</div>';

                        return '<li class="fs-0 single-location"><figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block"><img src="'+avatar_url+'" alt="Location logo" itemprop="contentUrl"/></figure><div class="right-location-content inline-block padding-left-10"><h3 class="fs-26 fs-xs-20 fs-sm-22 lato-black color-black">'+name+'</h3>'+trpStatsHtml+'<div class="fs-16 color-black padding-top-5 padding-bottom-5">'+visibleAddress+'</div>'+partnerHtml+hiddenContent+'<div class="text-right padding-top-10"><a href="javascript:void(0);" class="toggle-location-tile" data-location-id="'+location_id+'" data-location-source="'+location_source+'" data-lat="'+lat+'" data-lng="'+lng+'" data-name="'+name.replace(/"/g, "&quot;")+'"><img src="/assets/images/down-arrow.svg"/></a></div></div></li>';
                    }

                    // on location tile open and close
                    $(document).on('click', '.single-location', function() {
                        var arrowBtn = $(this).find('.toggle-location-tile');

                        for (var i = 0, len = $('.toggle-location-tile').length; i < len; i+=1) {
                            if (!$('.toggle-location-tile').eq(i).is(arrowBtn)) {
                                $('.toggle-location-tile').eq(i).closest('.single-location').removeClass('toggled');
                            }
                        }

                        $(this).toggleClass('toggled');

                        if ($(this).hasClass('toggled')) {
                            lastMapData = {
                                map_locations: locationsOnInit,
                                initialLat: arrowBtn.attr('data-lat'),
                                initialLng: arrowBtn.attr('data-lng'),
                                initialZoom: 15,
                                filter_country: undefined,
                                location_id: arrowBtn.attr('data-location-id'),
                                location_source: arrowBtn.attr('data-location-source'),
                                categories: $('.selectpicker.location-types').val()
                            };
                            initMap(locationsOnInit, arrowBtn.attr('data-lat'), arrowBtn.attr('data-lng'), 15, undefined, arrowBtn.attr('data-location-id'), arrowBtn.attr('data-location-source'), $('.selectpicker.location-types').val(), true, undefined, '<div style="font-size: 20px;">'+arrowBtn.attr('data-name')+'</div>');
                        } else {
                            lastMapData = {
                                map_locations: locationsOnInit,
                                initialLat: $('.country-list-parent.open-item > a').attr('data-country-centroid-lat'),
                                initialLng: $('.country-list-parent.open-item > a').attr('data-country-centroid-lng'),
                                initialZoom: 5,
                                filter_country: $('.country-list-parent.open-item > a').attr('data-country-code'),
                                location_id: undefined,
                                location_source: undefined,
                                categories: $('.selectpicker.location-types').val()
                            };
                            initMap(locationsOnInit, $('.country-list-parent.open-item > a').attr('data-country-centroid-lat'), $('.country-list-parent.open-item > a').attr('data-country-centroid-lng'), 5, $('.country-list-parent.open-item > a').attr('data-country-code'), undefined, undefined, $('.selectpicker.location-types').val(), true, undefined, '<div style="font-size: 20px;">'+arrowBtn.attr('data-name')+'</div>');
                        }
                    });

                    $(document).on('click', '.go-back-to-countries', function() {
                        if ($('.picker-and-map .picker-label').attr('data-last-continent') == undefined || $('.single-continent.open-item > a .element-name').html() != $('.picker-and-map .picker-label').attr('data-last-continent')) {
                            var continentName = $('.single-continent.open-item > a .element-name').html();
                            console.log(continentName, 'set continent name');
                            $('.dentacoin-stats-category-label span').html('in ' + continentName);
                            $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-continents"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+continentName+'</a>');

                            $('.single-continent.open-item > a .element-name').attr('data-last-continent', continentName);

                            updateContinentData($('.single-continent.open-item > a').attr('data-country-codes'));
                        } else {
                            $('.dentacoin-stats-category-label span').html($('.picker-and-map .picker-label').attr('data-last-continent'));

                            $('.picker-and-map .picker-label').html('<a href="javascript:void(0);" class="go-back-to-continents"><img src="/assets/uploads/back-map-arrow.svg" alt="Red left arrow" class="margin-right-5 inline-block"/> '+$('.picker-and-map .picker-label').attr('data-last-continent')+'</a>');
                        }


                        if ($('.picker-and-map .picker-value').attr('data-last-continent') != '') {
                            $('.picker-and-map .picker-value').html('<span class="lato-black">'+$('.picker-and-map .picker-value').attr('data-last-continent')+'</span> Results');
                        }

                        lastMapData = {
                            map_locations: locationsOnInit,
                            initialLat: undefined,
                            initialLng: undefined,
                            initialZoom: undefined,
                            filter_country: JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')),
                            location_id: undefined,
                            location_source: undefined,
                            categories: $('.selectpicker.location-types').val()
                        };
                        initMap(locationsOnInit, undefined, undefined, undefined, JSON.parse($('.single-continent.open-item > a').attr('data-country-codes')), undefined, undefined, $('.selectpicker.location-types').val(), true);

                        $('.results-list .shown').removeClass('shown');
                        $('.results-list .countries-nav').addClass('shown');

                        $('.locations-category-list').html('');
                        $('.results-list').scrollTop(0);

                        $('.countries-list .country-list-parent').removeClass('hide open-item');


                        if ($('.changeable-stats .partners').length) {
                            $('.changeable-stats .partners span').html($('.changeable-stats .partners').attr('data-last-continent'));
                        }

                        if ($('.changeable-stats .non-partners').length) {
                            $('.changeable-stats .non-partners span').html($('.changeable-stats .non-partners').attr('data-last-continent'));
                        }

                        if ($('.changeable-stats .users').length) {
                            $('.changeable-stats .users span').html($('.changeable-stats .users').attr('data-last-continent'));
                        }
                    });
                    // =================== /COUNTRIES LOGIC ===================
                }
            },
            showStickyHomepageNav() {
                if ($('.homepage-sticky-nav').length) {
                    $('.homepage-sticky-nav').fadeIn(500);
                }
            },
            hideStickyHomepageNav() {
                if ($('.homepage-sticky-nav').length) {
                    $('.homepage-sticky-nav').remove();
                }
            },
            showStickySubpagesNav() {
                if (!$('.subpages-sticky-nav').length) {
                    $('body').append('<div class="subpages-sticky-nav text-center fs-0"><a href="javascript:void(0);" data-type="users" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">USERS</span></a><a href="javascript:void(0);" data-type="dentists" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">DENTISTS</span></a><a href="javascript:void(0);" data-type="traders" class="inline-block"><span class="element-icon inline-block"></span><span class="inline-block padding-left-10 fs-24 fs-xs-20 padding-left-xs-0 lato-bold label-content">TRADERS</span></a></div>');

                    if (location.href.indexOf('users') >= 0) {
                        $('.subpages-sticky-nav [data-type="users"]').addClass('active');
                    } else if (location.href.indexOf('dentists') >= 0) {
                        $('.subpages-sticky-nav [data-type="dentists"]').addClass('active');
                    } else if (location.href.indexOf('traders') >= 0) {
                        $('.subpages-sticky-nav [data-type="traders"]').addClass('active');
                    }

                    $('.subpages-sticky-nav [data-type="users"]').click(function() {
                        var currentPage = $('.subpages-sticky-nav a.active').attr('data-type');
                        $('.subpages-sticky-nav a').removeClass('active');
                        $(this).addClass('active');

                        switch(currentPage) {
                            case 'dentists':
                                projectData.general_logic.data.slideOutDentistsContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'users'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInUsersContent(takeHomepageDataResponse.data.usersPageData);
                                    }
                                });
                                break;
                            case 'traders':
                                projectData.general_logic.data.slideOutTradersContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'users'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInUsersContent(takeHomepageDataResponse.data.usersPageData);
                                    }
                                });
                                break;
                        }
                    });

                    $('.subpages-sticky-nav [data-type="dentists"]').click(function() {
                        var currentPage = $('.subpages-sticky-nav a.active').attr('data-type');
                        $('.subpages-sticky-nav a').removeClass('active');
                        $(this).addClass('active');

                        switch(currentPage) {
                            case 'users':
                                projectData.general_logic.data.slideOutUsersContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'dentists'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInDentistsContent(takeHomepageDataResponse.data.dentistsPageData);
                                    }
                                });
                                break;
                            case 'traders':
                                projectData.general_logic.data.slideOutTradersContent(async function() {
                                    projectData.general_logic.data.showLoader();
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'dentists'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.hideLoader();
                                        projectData.general_logic.data.slideInDentistsContent(takeHomepageDataResponse.data.dentistsPageData);
                                    }
                                });
                                break;
                        }
                    });

                    $('.subpages-sticky-nav [data-type="traders"]').click(function() {
                        var currentPage = $('.subpages-sticky-nav a.active').attr('data-type');
                        $('.subpages-sticky-nav a').removeClass('active');
                        $(this).addClass('active');

                        switch(currentPage) {
                            case 'users':
                                projectData.general_logic.data.slideOutUsersContent(async function() {
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'traders'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.slideInTradersContent(takeHomepageDataResponse.data.tradersPageData);
                                    }
                                });
                                break;
                            case 'dentists':
                                projectData.general_logic.data.slideOutDentistsContent(async function() {
                                    var takeHomepageDataResponse = await projectData.requests.takeHomepageData({type: 'traders'});

                                    if (takeHomepageDataResponse.success) {
                                        projectData.general_logic.data.slideInTradersContent(takeHomepageDataResponse.data.tradersPageData);
                                    }
                                });
                                break;
                        }
                    });

                    $('.subpages-sticky-nav').fadeIn(500);
                }
            },
            hideStickySubpagesNav: function() {
                console.log($('.subpages-sticky-nav').length, 'hideStickySubpagesNav');
                if ($('.subpages-sticky-nav').length) {
                    $('.subpages-sticky-nav').remove();
                }
            },
            slideInUsersContent: function(usersPageData) {
                // doing this fix, because brower back arrow is not working via pushState
                window.removeEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);
                window.addEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);

                window.scrollTo(0, 0);

                history.pushState({data: 'users'},'', HOME_URL + '/users');
                $('.hidden-users-page-content').css({'display' : 'block'}).html(usersPageData).animate({'left' : '0', 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-users-page-content').addClass('position-static');

                    projectData.pages.data.users();
                });
            },
            slideOutUsersContent: function(callback) {
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-users-page-content').removeClass('position-static').animate({'left' : '-100%', 'opacity' : 0}, 1000, function() {
                    $('.hidden-users-page-content').hide();
                    callback();
                });
            },
            slideInDentistsContent: function(dentistsPageData) {
                // doing this fix, because brower back arrow is not working via pushState
                window.removeEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);
                window.addEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);

                window.scrollTo(0, 0);

                history.pushState({data: 'dentists'},'', HOME_URL + '/dentists');
                $('.hidden-dentists-page-content').css({'display' : 'block'}).html(dentistsPageData).animate({'top' : $('header').outerHeight(), 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-dentists-page-content').addClass('position-static');

                    projectData.pages.data.dentists();
                });
            },
            slideOutDentistsContent: function(callback) {
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-dentists-page-content').removeClass('position-static').animate({'top' : $('.hidden-dentists-page-content').height() + 'px', 'opacity' : 0}, 750, function() {
                    $('.hidden-dentists-page-content').hide();
                    callback();
                });
            },
            slideInTradersContent: function(tradersPageData) {
                // doing this fix, because brower back arrow is not working via pushState
                window.removeEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);
                window.addEventListener('popstate', projectData.general_logic.data.handlePushStateRedirects);

                window.scrollTo(0, 0);

                history.pushState({data: 'traders'},'', HOME_URL + '/traders');
                $('.hidden-traders-page-content').css({'display' : 'block'}).html(tradersPageData).animate({'right' : '0', 'opacity' : 1}, 750, function() {
                    $('.hide-on-users-category-selected').addClass('hide');
                    $('.hidden-traders-page-content').addClass('position-static');

                    projectData.pages.data.traders();
                });
            },
            slideOutTradersContent: function(callback) {
                window.scrollTo(0, 0);

                $('.hide-on-users-category-selected').removeClass('hide');
                $('.hidden-traders-page-content').removeClass('position-static').animate({'right' : '-100%', 'opacity' : 0}, 750, function() {
                    $('.hidden-traders-page-content').hide();
                    callback();
                });
            },
        }
    },
    requests: {
        takeHomepageData: async function(data) {
            var ajaxData = {
                type: 'POST',
                url: HOME_URL + '/take-homepage-data',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            };

            if (data != undefined) {
                ajaxData.data = data;
            }

            return await $.ajax(ajaxData);
        },
        getMapHtml: async function() {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-map-html',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        },
        getMapData: async function(data) {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-map-data',
                dataType: 'json',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        },
        getLabsSuppliersAndIndustryPartners: async function(data) {
            return await $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-labs-suppliers-and-industry-partners',
                dataType: 'json',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        }
    },
    events: {
        eventTrackers: function() {

        },
        fireGoogleAnalyticsEvent: function (category, action, label, value) {
            var event_obj = {
                'event_action': action,
                'event_category': category,
                'event_label': label
            };

            if (value != undefined) {
                event_obj.value = value;
            }

            gtag('event', label, event_obj);
        }
    }
};

if ($('body').hasClass('logged-in')) {
    projectData.pages.logged_in();
    projectData.general_logic.logged_in();
} else {
    projectData.pages.not_logged_in();
    projectData.general_logic.not_logged_in();
}

projectData.events.eventTrackers();

function drawHeaderToFirstSectionLine() {
    //FIRST LINE
    $('line.first').attr('x1', $('header .first-dot').offset().left);
    $('line.first').attr('y1', $('header .first-dot').offset().top);
    $('line.first').attr('x2', $('.second-dot').offset().left);
    $('line.first').attr('y2', $('.second-dot').offset().top + $('.second-dot').height() - 1);

    //SECOND LINE
    $('line.second').attr('x1', $('.second-dot').offset().left);
    $('line.second').attr('y1', $('.second-dot').offset().top + $('.second-dot').height() - 1);
    $('line.second').attr('x2', $('.third-dot').offset().left);
    $('line.second').attr('y2', $('.third-dot').offset().top + $('.third-dot').height() - 1);
}

function drawNavToBottomSectionLine() {
    $('line.third').attr('x1', $('.nav-to-bottom-first-dot').offset().left);
    $('line.third').attr('y1', $('.nav-to-bottom-first-dot').offset().top + $('.nav-to-bottom-first-dot').height());
    $('line.third').attr('x2', $('.nav-to-bottom-second-dot').offset().left);
    $('line.third').attr('y2', $('.nav-to-bottom-second-dot').offset().top + $('.nav-to-bottom-second-dot').height());

    $('line.fourth').attr('x1', $('.nav-to-bottom-second-dot').offset().left);
    $('line.fourth').attr('y1', $('.nav-to-bottom-second-dot').offset().top + $('.nav-to-bottom-second-dot').height());
    $('line.fourth').attr('x2', $('.nav-to-bottom-third-dot').offset().left);
    $('line.fourth').attr('y2', $('.nav-to-bottom-third-dot').offset().top);

    $('line.fifth').attr('x1', $('.nav-to-bottom-third-dot').offset().left);
    $('line.fifth').attr('y1', $('.nav-to-bottom-third-dot').offset().top);
    $('line.fifth').attr('x2', $('.nav-to-bottom-fourth-dot').offset().left);
    $('line.fifth').attr('y2', $('.nav-to-bottom-fourth-dot').offset().top);
}

function initListingPageLine() {
    $('line.first').attr('x1', $('.list .single .first-dot').offset().left + $('.list .single .first-dot').width() / 2);
    $('line.first').attr('x2', $('.list .single .last-dot').offset().left + $('.list .single .last-dot').width() / 2);
    $('line.first').attr('y1', $('.list .single .first-dot').offset().top);
    $('line.first').attr('y2', $('.list .single .last-dot').offset().top);
}

// to be edited
function styleUploadButton(callbackOnChange, buttonClass) {
    if ($('.upload-file.module').length) {
        for (var i = 0, len = $('.upload-file.module').length; i < len; i+=1) {
            var thisFileUpload = $('.upload-file.module').eq(i);
            var thisFileInput = thisFileUpload.find('.upload-input');
            $('.upload-file.module').eq(i).append('<button type="button"><label for="'+thisFileInput.attr('name')+'" class="'+buttonClass+'">'+$('.upload-file.module').eq(i).attr('data-label')+'</label></button>');
            thisFileInput.on('change', function() {
                callbackOnChange(this);
            });
        }
    }
}

// ==================== /PAGES ====================

if ($('.newsletter-register').length) {
    basic.initCustomCheckboxes('.newsletter-register');

    $('.newsletter-register form').on('submit', function (event) {
        event.preventDefault();
        var this_form_native = this;
        var this_form = $(this_form_native);

        var error = false;
        this_form.find('.error-handle').remove();

        if (!basic.validateEmail(this_form.find('input[type="email"]').val().trim())) {
            error = true;
            customErrorHandle(this_form.find('input[type="email"]').closest('.newsletter-field'), this_form.find('input[type="email"]').closest('.newsletter-field').attr('data-valid-message'));
        }

        if (!this_form.find('#newsletter-privacy-policy').is(':checked')) {
            error = true;
            customErrorHandle(this_form.find('#newsletter-privacy-policy').closest('.newsletter-field'), this_form.find('#newsletter-privacy-policy').closest('.newsletter-field').attr('data-valid-message'));
        }

        if (!error) {
            projectData.events.fireGoogleAnalyticsEvent('Subscription', 'Sign-up', 'Newsletter');

            $('.newsletter-register form .custom-checkbox').html('');
            $('.newsletter-register form #newsletter-privacy-policy').prop('checked', false);
            this_form.find('input[type="email"]').val('');
            $('.newsletter-register .form-container').append('<div class="alert alert-success fs-16 margin-top-10">Thank you for signing up.</div>');

            this_form_native.submit();
        }
    });
}

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function () {
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if (classname.indexOf('christmas-calendar-task') === -1) {
            if (classname && !$('.' + classname).parents('.modal-dialog').length) {
                if ($('.bootbox.login-signin-popup').length) {
                    $('.hidden-login-form').html(hidden_popup_content);
                }
                bootbox.hideAll();
            }
        }
    });
}

hidePopupOnBackdropClick();

function initCaptchaRefreshEvent() {
//refreshing captcha on trying to log in admin
    if ($('.refresh-captcha').length > 0) {
        $('.refresh-captcha').click(function () {
            $.ajax({
                type: 'GET',
                url: '/refresh-captcha',
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    $('.captcha-container span').html(response.captcha);
                }
            });
        });
    }
}
initCaptchaRefreshEvent();

//INIT LOGIC FOR ALL STEPS
function customErrorHandle(el, string) {
    el.append('<div class="error-handle">' + string + '</div>');
}

// reading file and check size and extension
function readURL(input, megaBytesLimit, allowedImagesExtensions, callback, failed_callback) {
    if (input.files && input.files[0]) {
        var filename = input.files[0].name;

        // check file size
        if (megaBytesLimit < basic.bytesToMegabytes(input.files[0].size)) {
            if (failed_callback != undefined) {
                failed_callback();
            }

            $(input).closest('.upload-btn-parent').append('<div class="error-handle">The file you selected is large. Max size: ' + megaBytesLimit + 'MB.</div>');
            return false;
        } else {
            //check file extension
            if (jQuery.inArray(filename.split('.').pop().toLowerCase(), allowedImagesExtensions) !== -1) {
                if (callback != undefined) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        callback(e, filename);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            } else {
                if (failed_callback != undefined) {
                    failed_callback();
                }

                var allowedExtensionsHtml = '';
                var firstLoop = true;
                for (var i = 0, len = allowedImagesExtensions.length; i < len; i += 1) {
                    if (firstLoop) {
                        firstLoop = false;
                        allowedExtensionsHtml += allowedImagesExtensions[i];
                    } else {
                        allowedExtensionsHtml += ', ' + allowedImagesExtensions[i];
                    }
                }

                $(input).closest('.upload-btn-parent').append('<div class="error-handle">Please select file in ' + allowedExtensionsHtml + ' format.</div>');
                return false;
            }
        }
    }
}

async function checkCaptcha(captcha) {
    return await $.ajax({
        type: 'POST',
        url: '/check-captcha',
        dataType: 'json',
        data: {
            captcha: captcha
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}

function bindGoogleAlikeButtonsEvents() {
    //google alike style for label/placeholders
    $('body').on('click', '.custom-google-label-style label', function () {
        $(this).addClass('active-label');
        if ($('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
            $(this).parent().find('input').addClass('blue-green-border');
        }
    });

    $('body').on('keyup change focusout', '.custom-google-label-style input', function () {
        var value = $(this).val().trim();
        if (value.length) {
            $(this).closest('.custom-google-label-style').find('label').addClass('active-label');
            if ($(this).closest('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                $(this).addClass('blue-green-border');
            }
        } else {
            $(this).closest('.custom-google-label-style').find('label').removeClass('active-label');
            if ($(this).closest('.custom-google-label-style').attr('data-input-colorful-border') == 'true') {
                $(this).removeClass('blue-green-border');
            }
        }
    });
}

bindGoogleAlikeButtonsEvents();

// =================================== GOOGLE ANALYTICS TRACKING LOGIC ======================================


// =================================== /GOOGLE ANALYTICS TRACKING LOGIC ======================================