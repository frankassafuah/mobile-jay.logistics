/* global jQuery */
// Taaaaaki duży komentarz
(function () {
    'use strict';

    /* ========================================================================
     * Bootstrap: tooltip.js v3.3.7
     * http://getbootstrap.com/javascript/#tooltip
     * Inspired by the original jQuery.tipsy by Jason Frame
     * ========================================================================
     * Copyright 2011-2016 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */

    +function(a){"use strict";function c(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;!e&&/destroy|hide/.test(c)||(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})}var b=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};b.VERSION="3.3.7",b.TRANSITION_DURATION=150,b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},b.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},b.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue()){if(clearTimeout(c.timeout),c.hoverState="out",!c.options.delay||!c.options.delay.hide)return c.hide();c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)}},b.prototype.show=function(){var c=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(c);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(c.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(b.TRANSITION_DURATION):q()}},b.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(c){function g(){"in"!=d.hoverState&&e.detach(),d.$element&&d.$element.removeAttr("aria-describedby").trigger("hidden.bs."+d.type),c&&c()}var d=this,e=a(this.$tip),f=a.Event("hide.bs."+this.type);if(this.$element.trigger(f),!f.isDefaultPrevented())return e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.one("bsTransitionEnd",g).emulateTransitionEnd(b.TRANSITION_DURATION):g(),this.hoverState=null,this},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},b.prototype.getTitle=function(){var b=this.$element,c=this.options;return b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.getUID=function(a){do{a+=~~(1e6*Math.random())}while(document.getElementById(a));return a},b.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=this;b&&((c=a(b.currentTarget).data("bs."+this.type))||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=c,a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery);


    var $ = jQuery;
    var CustomerName =  "";
    var CustomerAddress = "";
    var CustomerPhone = "";
    var CustomerEmail = "";
    var subTotal = "";
    var rid = makeid(6);
    var fail_url = "https://www.jaylogistic.com/app/home/shop_fail/" + rid;
    var success_url = "https://www.jaylogistic.com/app/home/shop_success/" + rid;

    var pluginName = 'ctshop',
        defaults = {
            cart: 'ct-cart',
            small_cart: 'ct-small-cart',
            product: 'ct-product',
            product_title: 'ct-product-title',
            product_price: 'ct-product-price',
            product_button: 'ct-product-button',
            product_image: 'ct-product-image',
            product_wishlist: 'ct-product-wishlist',
            wishlist: 'ct-wishlist',
            currency: '£',
            currency_after_number: 'false',
            permanent_cart_buttons: 'false',
            display_total_value: 'true',
            permanent_total_value: 'false',
            animation: 'fadeIn',
            empty_disable: 'false',
            empty_text: 'Your cart is empty',
            display_small_cart: 'false',
            small_cart_options: {
                display_name: 'Cart:',
                items_name: 'item(s)',
                wishlist: 'true',
                scroll: 'false',
                scroll_style: 'dark',
                scroll_height: '400',
            },
            promo_codes: 'false',
            promo_code_shipment: 'false',
            promo_amount: 0,
            promo_tooltips: 'true',
            promo_tooltips_time: 2000,
            promo_tooltips_animation: 'false',
            promo_tooltips_position: "top",
            promo_tooltips_text: 'Your savings:',
            promo_experies_date: '12-30-2018',
            promo_values: {
                'szebene': '30%',
                'example': '20%',
                'number': 300,
                'mlp': '99.99%'
            },
            shipping_option: 'true',
            shipping_types: {
                'Standard Delivery': 10,
                'Express Delivery': 15,
                'Next Day Delivery': 20,
            },
            paypal: {
                business: 'johnforu2004@hotmail.com',
                currency_code: 'GBP',
                lc: 'EN',
                cpp_cart_border_color: '',
                cpp_payflow_color: '',
                no_note: '1',
                no_shipping: '0',
                return: success_url,
                cancel_return: fail_url,
            },
            init: false,                      // fires before first initialization
            before_add_to_cart: false,        // fires before append to cart happen
            after_add_to_cart: false,         // fires after append to cart happen
            remove_item_from_cart: false,     // fires after remove button in ca/rt
            before_checkout: false,           // fires before redirecting to paypal
            after_clear_cart: false,          // fires after clearing the cart
            after_value_changes: false,       // fires when total value changes
            before_add_to_wishlist: false,    // fires before append to wishlist happen
            after_add_to_wishlist: false,     // fires after append to wishlist happen
            remove_item_from_wishlist: false  // fires after remove button in wishlist
        };


    /* Plugin Constructor */
    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend(true, {}, defaults, options);

        this.promo = null;

        this.cart = this.element.find('.' + this.settings.cart);
        this.small_cart = this.element.find('.' + this.settings.small_cart);
        this.second_cart = this.element.find('.' + this.settings.second_cart);
        this.wishlist = this.element.find('.' + this.settings.wishlist);
        this.product = this.element.find('.' + this.settings.product);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    function makeid(length) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * 
     charactersLength)));
       }
       return result.join('');
    }


    /* Avoid Prototype Conficts */
    $.extend(Plugin.prototype, {
        init: function () {
            var self = this;

            /* Apend small cart */

            if (self.settings.display_small_cart === 'true') {
                if (self.settings.currency_after_number === 'true') {
                    var price = "0" + self.settings.currency;
                } else {
                    var price = self.settings.currency + "0";
                }

                /* Append small cart and elements */

                if (self.settings.display_total_value === 'true') {
                    self.small_cart.append('' +
                        '<i class="fa fa-fw fa-shopping-cart"></i>' +
                        '<span class="' + self.settings.small_cart + '-name">' + self.settings.small_cart_options.display_name + '&nbsp;</span>' +
                        '<span class="' + self.settings.small_cart + '-quantity">0</span>' +
                        '<span class="' + self.settings.small_cart + '-items">&nbsp;' + self.settings.small_cart_options.items_name + '&nbsp; - &nbsp;</span>' +
                        '<span class="' + self.settings.small_cart + '-price">' + price + '</span>' +
                        '<div class="' + self.settings.cart + '-content" data-mcs-theme="' + self.settings.small_cart_options.scroll_style + '" style="display: none;  position: absolute; cursor: auto"> <div class="' + this.settings.cart + '"></div> </div>'
                    ).css('cursor', 'pointer');

                } else {
                    self.small_cart.append('' +
                        '<i class="fa fa-fw fa-shopping-cart"></i>' +
                        '<span class="' + self.settings.small_cart + '-name">' + self.settings.small_cart_options.display_name + '&nbsp;</span>' +
                        '<span class="' + self.settings.small_cart + '-quantity">0</span>' +
                        '<span class="' + self.settings.small_cart + '-items">&nbsp;' + self.settings.small_cart_options.items_name + '</span>' +
                        '<div class="' + self.settings.cart + '-content" data-mcs-theme="' + self.settings.small_cart_options.scroll_style + '" style="display: none;  position: absolute; cursor: auto"> <div class="' + this.settings.cart + '"></div> </div>'
                    ).css('cursor', 'pointer');
                }

                /* Add Whishlist to small cart */

                if (self.settings.small_cart_options.wishlist === 'true') {
                    self.small_cart.find('.' + self.settings.cart + '-content').append('<div class="' + self.settings.wishlist + '"></div>');
                }


                var cart_content = '.' + self.settings.cart + '-content';

                /* Set small cart scroll */

                if (self.settings.small_cart_options.scroll === 'true') {
                    $(cart_content).addClass('mCustomScrollbar').css('max-height', self.settings.small_cart_options.scroll_height + 'px');
                }

                /* Event that shows small cart */

                self.small_cart.on('mouseenter', function () {
                    $(cart_content).fadeIn();
                }).on('mouseleave', function (e) {
                    if(e.target.nodeName.toLowerCase() != 'select'){
                        $(cart_content).fadeOut();
                    }
                });
            }

            /* Append <ul> to Cart */

            if (self.settings.display_small_cart === 'true') {
                this.cart = this.element.find('.' + this.settings.small_cart + ' .' + this.settings.cart);
            }

            self.cart = self.cart.append('<ol/>').find('ol');

            /* Wishlist in small cart */
            if (self.settings.display_small_cart === 'true' && self.settings.small_cart_options.wishlist === 'true') {
                this.wishlist = this.element.find('.' + this.settings.small_cart + ' .' + this.settings.wishlist);
            }

            if (self.settings.wishlist) {
                self.wishlist = self.wishlist.append('<ol/>').find('ol');

                if (window.sessionStorage['ct-shopping-wishlist']) {

                    var $wish_li_length = self.wishlist.find('li').length;
                    self.create_storage_wish();
                    self.remove_item($wish_li_length, true);
                }
            }

            /* Append Permanent */
            self.permanent_total();
            self.permanent_cart_buttons();


            /* Check Storage */
            if ((window.sessionStorage['ct-shopping-cart']) && self.cart.length) {

                self.create_storage_cart();

                var $cart_li = self.cart.find('li'),
                    $cart_li_input = $cart_li.find('.' + self.settings.cart + '-input'),
                    $cart_li_length = $cart_li.length;

                if (self.settings.permanent_cart_buttons === 'false') {
                    self.add_cart_buttons();
                }
                if (self.settings.display_total_value === 'true' && self.settings.permanent_total_value === 'false') {
                    self.append_total();
                }
                if (self.settings.promo_codes === 'true') {
                    self.add_promo_code();
                }

                self.calculate_total_value();
                self.quantity_change($cart_li_input)
                self.remove_item($cart_li_length);
            }


            /* Init Callback */
            if (self.settings.init) {
                self.settings.init();
            }


            /* Check if empty */
            self.cart_empty();


            /* Each Product Function */
            self.product.each(function (num) {
                var that = $(this),
                    $product_image = self.absolute_url() + that.find('.' + self.settings.product_image).attr('src'),
                    $product_title = that.find('.' + self.settings.product_title),
                    $product_price = that.find('.' + self.settings.product_price),
                    $product_button = that.find('.' + self.settings.product_button),
                    $product_title_value = $product_title.text(),
                    $product_price_value = $product_price.text().replace(',', '').replace(/[^\d.]/g, '');

                if (self.settings.wishlist) {

                    var $product_wishlist = that.find('.' + self.settings.product_wishlist);


                    /* Wishlist Button */
                    $product_wishlist.on('click touchend', function (e) {
                        e.preventDefault();

                        if (self.settings.before_add_to_wishlist)
                            self.settings.before_add_to_wishlist();

                        $product_title_value = self.check_if_title($product_title, $product_title_value);
                        $product_price_value = self.check_if_price($product_price, $product_price_value);

                        var $product_attribute = that.attr('data-id',
                            $product_title_value.replace(/ /g, "")
                                .replace(/\r\n|\r|\n/g, "")
                                .replace(/[^a-zA-Z 0-9]+/g, '') + $product_price_value
                                .replace(/\r\n|\r|\n/g, "")
                                .replace(/[^a-zA-Z 0-9]+/g, '') + '_' + (num + 1))
                                .attr('data-id'),
                            $wish_li = self.wishlist.find('li'),
                            $wish_li_current = self.wishlist.find('[data-id=' + $product_attribute + ']'),
                            $wish_li_attribute = $wish_li_current.attr('data-id'),
                            $wish_li_length,
                            $cart_li_current = self.cart.find('[data-id=' + $product_attribute + ']');


                        /* Append Item Conditional */
                        if ((!$cart_li_current.length) && ($wish_li.length !== 0) && ($wish_li_attribute !== $product_attribute)) {
                            self.add_to_wishlist($product_title_value, $product_price_value, $product_attribute, $product_image);
                        } else if (($wish_li.length === 0) && (!$cart_li_current.length)) {
                            self.add_to_wishlist($product_title_value, $product_price_value, $product_attribute, $product_image);
                        }


                        /* Updated Local Variables */
                        $wish_li = self.wishlist.find('li');
                        $wish_li_length = $wish_li.length;


                        /* Functions */
                        self.remove_item($wish_li_length, true);


                        if (self.settings.after_add_to_wishlist)
                            self.settings.after_add_to_wishlist();

                        return false;
                    });

                }


                /* Add to Cart Click Event */
                $product_button.on('click touchend', function (e) {
                    e.preventDefault();


                    /* Before Add to Cart Callback */
                    if (self.settings.before_add_to_cart) {
                        self.settings.before_add_to_cart();
                    }

                    $product_title_value = self.check_if_title($product_title, $product_title_value);
                    $product_price_value = self.check_if_price($product_price, $product_price_value);

                    var $product_attribute = that.attr('data-id',
                        $product_title_value.replace(/ /g, "")
                            .replace(/\r\n|\r|\n/g, "")
                            .replace(/[^a-zA-Z 0-9]+/g, '') + $product_price_value
                            .replace(/\r\n|\r|\n/g, "")
                            .replace(/[^a-zA-Z 0-9]+/g, '') + '_' + (num + 1))
                        .attr('data-id');


                    /* Cart Local Variabls */
                    var $cart_li = self.cart.find('li'),
                        $cart_li_current = self.cart.find('[data-id=' + $product_attribute + ']'),
                        $cart_li_attribute = $cart_li_current.attr('data-id'),
                        $cart_li_input = $cart_li.find('.' + self.settings.cart + '-input'),
                        $cart_li_length;


                    /* Append Item Conditional */
                    if ($cart_li.length !== 0) {
                        if ($cart_li_attribute !== $product_attribute) {
                            self.add_to_cart($product_title_value, $product_price_value, $product_attribute, $product_image);
                        } else {
                            $cart_li_current.find('input').val(function (i, old_val) {
                                return parseInt(old_val, 10) + 1;
                            })
                        }
                    } else {
                        self.add_to_cart($product_title_value, $product_price_value, $product_attribute, $product_image);
                        if (self.settings.permanent_cart_buttons === 'false') {
                            self.add_cart_buttons();
                        }
                        if (self.settings.display_total_value === 'true' && self.settings.permanent_total_value === 'false') {
                            self.append_total();
                        }
                        if (self.settings.promo_codes === 'true') {
                            self.add_promo_code();
                        }
                    }

                    if (self.settings.wishlist) {
                        $('.' + self.settings.wishlist).find('[data-id=' + $product_attribute + ']').remove();
                    }


                    /* Updated Local Variables */
                    $cart_li = self.cart.find('li');
                    $cart_li_input = $cart_li.find('.' + self.settings.cart + '-input');
                    $cart_li_length = $cart_li.length;


                    /* Functions */
                    self.quantity_change($cart_li_input)
                    self.calculate_total_value();
                    self.remove_item($cart_li_length);
                    self.wish_storage_set();


                    /* After Add to Cart Callback */
                    if (self.settings.after_add_to_cart) {
                        self.settings.after_add_to_cart();
                    }

                    /* Counting Quantiti in Small Cart */
                    return false;
                });

            });

            $( document ).ready(function() {
                var url = window.location.href;
                var getUrlParameter = function getUrlParameter(sParam) {
                    var sPageURL = window.location.search.substring(1),
                        sURLVariables = sPageURL.split('&'),
                        sParameterName,
                        i;

                    for (i = 0; i < sURLVariables.length; i++) {
                        sParameterName = sURLVariables[i].split('=');

                        if (sParameterName[0] === sParam) {
                            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                        }
                    }
                };

                var paypal_status = getUrlParameter('paypal');

                function removeURLParameter(url, parameter) {
                    var urlparts= url.split('?');
                    if (urlparts.length>=2) {

                        var prefix= encodeURIComponent(parameter)+'=';
                        var pars= urlparts[1].split(/[&;]/g);

                        for (var i= pars.length; i-- > 0;) {
                            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                                pars.splice(i, 1);
                            }
                        }

                        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
                        return url;
                    } else {
                        return url;
                    }
                }

                if (paypal_status && (paypal_status === 'success')) {
                    var acceptAccess = removeURLParameter(url, 'paypal');
                    $('.ct-paypal-modal-bg').show();

                    $('.ct-paypal-modal-header-close span').on('click',function () {
                        $('.ct-paypal-modal-bg').hide();
                        location.href = acceptAccess;
                        self.cart.find('li').each(function () {
                            $(this).remove();
                        });
                        self.remove_cart_buttons();
                        self.remove_promo_code();
                        self.remove_total(self.total);
                        self.storage_clear();
                        self.cart_empty();
                        self.quantity_count();
                    });
                }
            });

        },


        /* Add To Wishlist */
        add_to_wishlist: function (name, price, attr, image_src) {
            var self = this;

            if (self.settings.product_image) {
                if (self.settings.currency_after_number === 'true') {
                    self.wishlist.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<div class=' + self.settings.wishlist + '-left>' +
                        '<img src=' + image_src + ' /></div>' +
                        '<div class=' + self.settings.wishlist + '-body>' +
                        '<span class=' + self.settings.wishlist + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.wishlist + '-price>' + price + self.settings.currency + '</span>' +
                        '<button class=' + self.settings.wishlist + '-remove>&times;</button>' +
                        '<button class=' + self.settings.wishlist + '-add-to-cart>Add To Cart</button>' +
                        '</div>' +
                        '</li>');
                } else {
                    self.wishlist.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<div class=' + self.settings.wishlist + '-left>' +
                        '<img src=' + image_src + ' /></div>' +
                        '<div class=' + self.settings.wishlist + '-body>' +
                        '<span class=' + self.settings.wishlist + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.wishlist + '-price>' + self.settings.currency + price + '</span>' +
                        '<button class=' + self.settings.wishlist + '-remove>&times;</button>' +
                        '<button class=' + self.settings.wishlist + '-add-to-cart>Add To Cart</button>' +
                        '</div>' +
                        '</li>');
                }
            } else {
                if (self.settings.currency_after_number === 'true') {
                    self.wishlist.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<span class=' + self.settings.wishlist + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.wishlist + '-price>' + price + self.settings.currency + '</span>' +
                        '<button class=' + self.settings.wishlist + '-remove>&times;</button>' +
                        '<button class=' + self.settings.wishlist + '-add-to-cart>Add To Cart</button>' +
                        '</li>');
                } else {
                    self.wishlist.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<span class=' + self.settings.wishlist + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.wishlist + '-price>' + self.settings.currency + price + '</span>' +
                        '<button class=' + self.settings.wishlist + '-remove>&times;</button>' +
                        '<button class=' + self.settings.wishlist + '-add-to-cart>Add To Cart</button>' +
                        '</li>');
                }
            }

            self.wishlist_add_to_cart();
            self.wish_storage_set();
        },

        quantity_count: function () {
            var self = this;
            var value = 0;
            self.cart.find('li').each(function () {
                var that = $(this);
                value += parseFloat(that.find('input').val());
            });
            $('.' + self.settings.small_cart + '-quantity').html(value);
        },


        /* Add Cart Item */
        add_to_cart: function (name, price, attr, image_src) {
            var self = this;
            var image_src = image_src.split("https://www.jaylogistic.com/app/home/").join("");
            if (self.settings.product_image) {
                if (self.settings.currency_after_number === 'true') {
                    self.cart.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<div class=' + self.settings.cart + '-left>' +
                        '<img src=' + image_src + ' /></div>' +
                        '<div class=' + self.settings.cart + '-body>' +
                        '<span class=' + self.settings.cart + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.cart + '-price>' + price + self.settings.currency + '</span>' +
                        '<input type="number" min="1" value="1" class=' + self.settings.cart + '-input>' +
                        '<button class=' + self.settings.cart + '-remove>&times;</button>' +
                        '</div>' +
                        '</li>');
                } else {
                    self.cart.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<div class=' + self.settings.cart + '-left>' +
                        '<img src=' + image_src + ' /></div>' +
                        '<div class=' + self.settings.cart + '-body>' +
                        '<span class=' + self.settings.cart + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.cart + '-price>' + self.settings.currency + price + '</span>' +
                        '<input type="number" min="1" value="1" class=' + self.settings.cart + '-input>' +
                        '<button class=' + self.settings.cart + '-remove>&times;</button>' +
                        '</div>' +
                        '</li>');
                }
            } else {
                if (self.settings.currency_after_number === 'true') {
                    self.cart.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<span class=' + self.settings.cart + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.cart + '-price>' + price + self.settings.currency + '</span>' +
                        '<input type="number" min="1" value="1" class=' + self.settings.cart + '-input>' +
                        '<button class=' + self.settings.cart + '-remove>&times;</button>' +
                        '</li>');
                } else {
                    self.cart.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + attr + '>' +
                        '<span class=' + self.settings.cart + '-name>' + name + '</span>' +
                        '<span class=' + self.settings.cart + '-price>' + self.settings.currency + price + '</span>' +
                        '<input type="number" min="1" value="1" class=' + self.settings.cart + '-input>' +
                        '<button class=' + self.settings.cart + '-remove>&times;</button>' +
                        '</li>');
                }
            }
        },


        /* Add Cart Buttons */
        add_cart_buttons: function () {
            var self = this;

            if (self.settings.shipping_option === 'true') {
                self.cart.parent().append('<select class=' + self.settings.cart + '-shipping></select>');
                for (var key in self.settings.shipping_types) {
                    var price = self.settings.shipping_types[key];
                    if ( self.settings.currency_after_number === 'true'){
                        self.cart.parent().find('select').append('<option data-price="' + price + '" data-name="' + key + '">' + key + ' - ' + price  + self.settings.currency + '</option>');
                    }else{
                        self.cart.parent().find('select').append('<option data-price="' + price + '" data-name="' + key + '">' + key + ' - ' + self.settings.currency + price + '</option>');
                    }

                }
                self.cart.parent().find('.' + self.settings.cart + '-shipping').change(function () {
                    self.calculate_total_value();
                });
            }

            self.cart.parent().append('<button class="' + self.settings.cart + '-clear">Clear Cart</button>');
            
            self.cart.parent().append('<h4 class="' + self.settings.cart + '-heading">Customer Details</h4>');
            self.cart.parent().append('<input type="text" id="name" name="name" placeholder="Full Name" class="form-control ' + self.settings.cart + '-name" required=required />');
            self.cart.parent().append('<input type="text" id="address" name="address" placeholder="Address" class="form-control ' + self.settings.cart + '-address" required=required />');
            self.cart.parent().append('<input type="text" id="phone" name="phone" placeholder="+448574521106" class="form-control ' + self.settings.cart + '-phone" required=required />');
            self.cart.parent().append('<input type="email" id="email" name="email" placeholder="email@email.com" class="form-control ' + self.settings.cart + '-email" required=required />');
            
            self.cart.parent().append('<button type="submit" class="' + self.settings.cart + '-checkout">Checkout With Paypal</button>');
            self.cart.parent().append('<button type="submit" class="' + self.settings.cart + '-paystack">Checkout With Paystack</button>');


            self.clear_cart();
            self.checkout_button();

        },


        /* Paypal checkout function */
        checkout: function () {
            var self = this,
                pp_config = {
                    cmd: "_cart",
                    upload: 1
                },
                form = $('<form />'),
                temp,
                /* paypal variables */
                map = {
                    name: 'item_name',
                    quantity: 'quantity',
                    amount: 'amount'
                };

            $.extend(pp_config, self.settings.paypal);


            /* create form */
            form.attr('action', 'https://www.paypal.com/cgi-bin/webscr');
            form.attr('method', 'post');
            form.attr('target', '_blank');


            /* main paypal inputs */
            for (var config_item in pp_config) {
                temp = $('<input type="hidden" />');
                temp.attr('name', config_item);
                temp.attr('value', pp_config[config_item]);
                form.append(temp);
            }


            /* Paypal inputs for each item in cart */
            self.cart.find('li').each(function (i) {
                var that = $(this),
                    $name = that.find('.' + self.settings.cart + '-name').text(),
                    $price = parseFloat(that.find('.' + self.settings.cart + '-price').text().replace(/^\D+/g, '')),
                    $quantity = that.find('input').val(),
                    temp = {
                        name: $('<input />', {'type': 'hidden', 'name': map.name + '_' + (i + 1), 'value': $name}),
                        amount: $('<input />', {'type': 'hidden', 'name': map.amount + '_' + (i + 1), 'value': $price}),
                        quantity: $('<input />', {
                            'type': 'hidden',
                            'name': map.quantity + '_' + (i + 1),
                            'value': $quantity
                        })
                    };
                form.append(temp.name).append(temp.amount).append(temp.quantity);
            });

            /* Paypal inputs for shiping */

            if (self.settings.shipping_option === 'true') {
                var shipping_price = self.cart.parent().find('.' + self.settings.cart + '-shipping option:selected').data("price");
                form.append('<input type="hidden" name="handling_cart" value="' + shipping_price + '">');
            }
            
            if(1==1) {
               
                
            }

            if (typeof self.promo === 'number') {
                form.append($('<input />', {
                    'type': 'hidden',
                    'name': 'discount_amount_cart',
                    'value': self.promo
                }));
            } else if (self.promo) {
                form.append($('<input />', {
                    'type': 'hidden',
                    'name': 'discount_rate_cart',
                    'value': parseFloat(self.promo)
                }));
            }
            
            CustomerName =  $('#name').val();
            CustomerAddress = $('#address').val();
            CustomerPhone = $('#phone').val();
            CustomerEmail = $('#email').val();
            subTotal = $('.ct-cart-total').html();
            subTotal = subTotal.replace(/[^\d.-]/g, '');
    
            var serial = $(form).serialize();
            serial = serial + "&cname=" + CustomerName + "&cadd=" + CustomerAddress + "&cphone=" + CustomerPhone + "&cemail=" + CustomerEmail + "&sub=" + subTotal + "&rid=" + rid;
            var ref = rid;
  
            $.ajax({
                url : "https://www.jaylogistic.com/app/home/shop_save",
                type: 'POST',
                data : {'string': serial},
                dataType: "json",
                async: false,
            }).done(function(response){ //
                console.log(response);
            });
            
            $('body').append(form);
            
            // CLEAR LOCALSTORAGE
            window.localStorage.clear();
            form.submit();
            form.remove();
            
            setTimeout(function(){
                $(".ct-cart-clear").click();
                //window.location.reload();
            },1);
        },




        /* Checkout Button Click Event */
        checkout_button: function () {
            var self = this;
            $('.' + self.settings.cart + '-checkout').unbind().on('click', function () {
            // PAY PAL
                /* Before Checkout Callback */
                if (self.settings.before_checkout) {
                    self.settings.before_checkout();
                }

                CustomerName = $('#name').val();
                CustomerAddress = $('#address').val();
                CustomerPhone = $('#phone').val();
                CustomerEmail = $('#email').val();
                
                if(CustomerName.length > 0 && CustomerAddress.length > 0 && CustomerPhone.length > 0 && CustomerEmail.length > 0){
                    self.checkout();
                } else {
                    alert('All Customer details are required');
                }
            });



            $('.' + self.settings.cart + '-paystack').unbind().on('click', function () {
            // PAYSTACK

                var form = $('<form />'),
                temp,
                map = {
                    name: 'item_name',
                    quantity: 'quantity',
                    amount: 'amount'
                };

            /* create form */
            form.attr('action', '');
            form.attr('method', 'post');
            form.attr('target', '_blank');

            /* Paypal inputs for each item in cart */
            self.cart.find('li').each(function (i) {
                var that = $(this),
                    $name = that.find('.' + self.settings.cart + '-name').text(),
                    $price = parseFloat(that.find('.' + self.settings.cart + '-price').text().replace(/^\D+/g, '')),
                    $quantity = that.find('input').val(),
                    temp = {
                        name: $('<input />', {'type': 'hidden', 'name': map.name + '_' + (i + 1), 'value': $name}),
                        amount: $('<input />', {'type': 'hidden', 'name': map.amount + '_' + (i + 1), 'value': $price}),
                        quantity: $('<input />', {
                            'type': 'hidden',
                            'name': map.quantity + '_' + (i + 1),
                            'value': $quantity
                        })
                    };
                form.append(temp.name).append(temp.amount).append(temp.quantity);
            });
            
            CustomerName =  $('#name').val();
            CustomerAddress = $('#address').val();
            CustomerPhone = $('#phone').val();
            CustomerEmail = $('#email').val();
            CustomerEmail = encodeURI(CustomerEmail);
            subTotal = $('.ct-cart-total').html();
            subTotal = parseFloat(subTotal.replace(/[^\d.-]/g, '') * 7.9).toFixed(2);
            
            var serial = $(form).serialize();
            serial = serial + "&cname=" + CustomerName + "&cadd=" + CustomerAddress + "&cphone=" + CustomerPhone + "&cemail=" + CustomerEmail + "&sub=" + subTotal + "&rid=" + rid;
            var ref = rid;
 
            $('body').append(form);
        
            if(CustomerName.length > 0 && CustomerAddress.length > 0 && CustomerPhone.length > 0 && CustomerEmail.length > 0){
                    $.ajax({
                        url : "https://www.jaylogistic.com/app/home/shop_save",
                        type: 'POST',
                        data : {'string': serial},
                        dataType: "json",
                        async: false,
                    }).done(function(response){ //
                        console.log(response);
                    });
            
            } else {
                alert('All Customer details are required');
                return false;
            }

                var payment_url = 'https://jaylogistic.com/app/paystack/pay_shop/single/' + subTotal + "/" + CustomerPhone + "/" + CustomerEmail + "/" + rid;
    			window.open(payment_url, '_blank');
    			setTimeout(function(){
                    $(".ct-cart-clear").click();
                    //window.location.reload();
                },1);
            
    			
            });
        },
        
        /* Remove Item from Cart */
        remove_item: function (element, is_wishlist) {
            var self = this,
                wishcart_settings = self.settings.cart,
                wishcart = self.cart;


            if (is_wishlist) {
                wishcart_settings = self.settings.wishlist;
                wishcart = self.wishlist;

            }


            $('.' + wishcart_settings + '-remove').unbind().on('click', function () {
                var that = $(this),
                    $length = wishcart.find('li').length;

                that.closest('li').remove();

                if (!is_wishlist) {

                    self.calculate_total_value();

                    self.storage_set();

                    if ($length === 1) {
                        self.remove_cart_buttons();
                        self.remove_promo_code();
                        self.remove_total(self.total);
                        self.storage_clear();
                        if (self.settings.currency_after_number === 'true' && self.settings.display_total_value === 'true') {
                            self.small_cart_total.html(result + self.settings.currency);
                        } else if (self.settings.display_total_value === 'true') {
                            self.small_cart_total.html(self.settings.currency + result);
                        }
                    }

                    /* Remove Item From Cart Callback */
                    if (self.settings.remove_item_from_cart) {
                        self.settings.remove_item_from_cart();

                    }
                } else {
                    self.wish_storage_set();

                    if ($length === 1)
                        self.wish_storage_clear();

                    if (self.settings.remove_item_from_wishlist) {
                        self.settings.remove_item_from_wishlist();
                    }
                }

            });
        },


        /* Clear Cart */
        clear_cart: function () {
            var self = this;
            $('.' + self.settings.cart + '-clear').on('click', function () {
                self.cart.find('li').each(function () {
                    $(this).remove();
                })
                self.remove_cart_buttons();
                self.remove_promo_code();
                self.remove_total(self.total);
                self.storage_clear();
                self.cart_empty();
                self.quantity_count();
                /* Clear Cart Callback */
                if (self.settings.after_clear_cart) {
                    self.settings.after_clear_cart();
                }
                if (self.settings.currency_after_number === 'true' && self.settings.display_total_value === 'true') {

                    self.small_cart_total.html('0' + self.settings.currency);

                } else if (self.settings.display_total_value === 'true') {
                    self.small_cart_total.html(self.settings.currency + '0');
                }

                $('.' + self.settings.cart + '-content').hide();

            })
        },


        /* Remove Cart Buttons */
        remove_cart_buttons: function () {
            var self = this;
            if (self.settings.permanent_cart_buttons === 'false') {
                self.cart.parent().find('button').remove();
            }
            if (self.settings.shipping_option === 'true') {
                self.cart.parent().find('.' + self.settings.cart + '-shipping').remove();
            }
        },


        /* Check if something in title */
        check_if_title: function (title, value) {
            if (title.find('select').length !== 0) {
                if (title.find('span').length !== 0) {
                    value = title.find('span').text() + ' - ' + title.find('option:selected').val();
                } else {
                    value = title.find('option:selected').text();
                }
            } else if (title.find('input').length !== 0) {
                value = title.find('input').val();
            } else if (title.is(':empty')) {
                value = title.val()
            }
            return value;
        },


        /* Check if something in price */
        check_if_price: function (price, value) {
            if (price.find('select').length !== 0) {
                value = price.find('option:selected').val().replace(/^\D+/g, '');
            } else if (price.find('input').length !== 0) {
                value = price.find('input').val().replace(/^\D+/g, '');
            }
            return value;
        },


        /* Permanent cart buttons */
        permanent_cart_buttons: function () {
            var self = this;
            if (self.settings.permanent_cart_buttons === 'true') {
                self.add_cart_buttons();
            }
        },


        /* Promo code */
        add_promo_code: function () {
            var self = this,
                $promo = $('.' + self.settings.cart + '-promo');

            if (self.settings.promo_codes === 'true' && !$promo.length) {
                $('.' + self.settings.cart).prepend(
                    '<form class="' + self.settings.cart + '-promo">' +
                    '<input type="text" placeholder="Enter your promo code here" />' +
                    '</form>'
                )
            }

            self.promo_change();
        },


        /* Remove Promo Code */
        remove_promo_code: function () {
            var self = this,
                $promo = $('.' + self.settings.cart + '-promo');

            $promo.remove();
        },


        /* Calculate Promo */
        calculate_promo: function (price) {
            var self = this;
            var input = $('.' + self.settings.cart + '-promo input');
            var input_value = input.val();
            var promos = self.settings.promo_values;
            var result = price;
            var amount_value = self.settings.promo_amount;
            var promo_date = self.settings.promo_experies_date;
            var tooltip = self.settings.promo_tooltips;
            var tooltip_time = self.settings.promo_tooltips_time;

            $.each(promos, function (key, value) {

                if (price >= amount_value) {

                    // experies date is false
                    if (input_value === key && promo_date != 'false') {

                        if (typeof value === 'number') {
                            result = price - value;

                            // creating tooltip text
                            if (self.settings.currency_after_number === 'true'){
                                var tooltip_text =  self.settings.promo_tooltips_text + ' ' + Math.floor(value*100)/100 +  self.settings.currency + '.';
                            } else {
                                var tooltip_text =  self.settings.promo_tooltips_text + ' ' + self.settings.currency + Math.floor(value*100)/100 +  '.';
                            }

                        } else {
                            result = price - (price * (parseFloat(value) / 100));

                            // creating tooltip text
                            if (self.settings.currency_after_number === 'true'){
                                var tooltip_text =  self.settings.promo_tooltips_text + ' ' + Math.floor((price * (parseFloat(value) / 100)) * 100) / 100 +  self.settings.currency + '.';
                            } else {
                                var tooltip_text =  self.settings.promo_tooltips_text + ' ' + self.settings.currency + Math.floor((price * (parseFloat(value) / 100)) * 100) / 100 +  '.';
                            }
                        }
                        self.promo = value;

                        // showing tooltip
                        if ( tooltip === 'true' ) {

                            var tooltip_position = self.settings.promo_tooltips_position;

                            input.tooltip({title: tooltip_text, animation: true, trigger: "manual", placement: tooltip_position,}).tooltip("show");

                            if ( self.settings.promo_tooltips_animation !== 'false') {
                                $('.' + self.settings.cart + '-promo .tooltip').addClass('animated ' + self.settings.promo_tooltips_animation);
                            }

                            setTimeout(function(){
                                input.tooltip("destroy");
                            }, tooltip_time)

                        }
                    }

                    // experies date is set

                    if (input_value === key && promo_date !== 'false') {

                        var current_date = Date.parse(new Date());
                        var exp_date = Date.parse(promo_date);

                        if (current_date <= exp_date) {
                            if (typeof value === 'number') {

                                result = price - value;

                                // creating tooltip text
                                if (self.settings.currency_after_number === 'true'){
                                    var tooltip_text =  self.settings.promo_tooltips_text + ' ' + Math.floor(value*100)/100 +  self.settings.currency + '.';
                                } else {
                                    var tooltip_text =  self.settings.promo_tooltips_text + ' ' + self.settings.currency + Math.floor(value*100)/100 +  '.';
                                }

                            } else {
                                result = price - (price * (parseFloat(value) / 100));

                                // creating tooltip text
                                if (self.settings.currency_after_number === 'true'){
                                    var tooltip_text =  self.settings.promo_tooltips_text + ' ' + Math.floor((price * (parseFloat(value) / 100)) * 100) / 100 +  self.settings.currency + '.';
                                } else {
                                    var tooltip_text =  self.settings.promo_tooltips_text + ' ' + self.settings.currency + Math.floor((price * (parseFloat(value) / 100)) * 100) / 100 +  '.';
                                }
                            }
                            self.promo = value;

                        }

                        // showing tooltip
                        if ( tooltip === 'true' ) {

                            var tooltip_position = self.settings.promo_tooltips_position;

                            input.tooltip({title: tooltip_text, animation: true, trigger: "manual", placement: tooltip_position,}).tooltip("show");

                            if ( self.settings.promo_tooltips_animation !== 'false') {
                                $('.' + self.settings.cart + '-promo .tooltip').addClass('animated ' + self.settings.promo_tooltips_animation);
                            }

                            setTimeout(function(){
                                input.tooltip("destroy");
                            }, tooltip_time)

                        }

                    }
                }
            });

            result = parseFloat(result.toString()).toFixed(2);

            return result;
        },


        /* Promo Input Event */
        promo_change: function () {
            var self = this,
                input = $('.' + self.settings.cart + '-promo input');

            input.on('keyup', function () {
                self.calculate_total_value();
            });
        },


        /* Calculate total value */
        calculate_total_value: function () {
            var self = this,
                result = 0,
                temp = 0;

            self.cart.find('li').each(function () {
                var price = parseFloat($(this).find('.' + self.settings.cart + '-price').text().replace(/^\D+/g, '')),
                    input = $(this).find('input').val();

                temp += (price * input);

            });

            if (self.settings.shipping_option === 'true' && self.settings.promo_code_shipment === 'true') {
                var shipping_price = self.cart.parent().find('.' + self.settings.cart + '-shipping option:selected').data("price");
                temp += shipping_price;
                result = parseFloat(temp.toString()).toFixed(2);
                result = self.calculate_promo(result);
            } else if (self.settings.shipping_option === 'true' && self.settings.promo_code_shipment === 'false'){
                var shipping_price = self.cart.parent().find('.' + self.settings.cart + '-shipping option:selected').data("price");
                result = parseFloat(temp.toString()).toFixed(2);
                result = self.calculate_promo(result);
                result = parseFloat(result) + shipping_price;
            } else {
                result = parseFloat(temp.toString()).toFixed(2);
                result = self.calculate_promo(result);

            }

            if (self.settings.display_total_value === 'true') {
                if (self.settings.currency_after_number === 'true') {
                    self.total.html(result + self.settings.currency);
                } else {
                    self.total.html(self.settings.currency + result);
                }
            }

            if (self.settings.display_small_cart === 'true') {


                if (self.settings.currency_after_number === 'true' && self.settings.display_total_value === 'true') {

                    self.small_cart_total.html(result + self.settings.currency)

                } else if (self.settings.display_total_value === 'true') {

                    self.small_cart_total.html(self.settings.currency + result)
                }
            }
            self.cart_empty();


            /* After Value Changes Callback */
            if (self.settings.after_value_changes) {
                self.settings.after_value_changes();
            }

            self.storage_set();

            /* Counting quantity and adding to small cart */
            if (self.settings.display_small_cart === 'true') {
                self.quantity_count();
            }
            return result;
        },


        /* Quantity change */
        quantity_change: function (input, element) {
            var self = this;
            input.change(function () {
                self.calculate_total_value(element);
                if (self.settings.display_small_cart === 'true') {
                    self.quantity_count();
                }
            })
        },


        /* Append total */
        append_total: function () {
            var self = this;
            self.total = self.cart.parent().prepend('<span class="' + self.settings.cart + '-total">').find('.' + self.settings.cart + '-total');
            self.small_cart_total = $('.' + self.settings.small_cart + '-price');
        },


        /* Remove total */
        remove_total: function (element) {
            var self = this;
            if (self.settings.display_total_value === 'true' && self.settings.permanent_total_value === 'false') {
                element.remove();
            } else if (self.settings.permanent_total_value === 'true' && self.settings.display_total_value === 'true') {
                self.calculate_total_value(element);
            }
        },


        /* Permanent total */
        permanent_total: function () {
            var self = this;
            if (self.settings.permanent_total_value === 'true' && self.settings.display_total_value === 'true') {
                self.append_total();
                if (self.settings.display_total_value === 'true') {
                    if (self.settings.currency_after_number === 'true') {
                        self.total.html('0' + self.settings.currency);
                    } else {
                        self.total.html(self.settings.currency + '0');
                    }
                }
            }
        },


        /* Session Storage Set */
        storage_set: function () {
            var self = this,
                cart_storage = {
                    items: []
                };

            $(self.cart).find('li').each(function () {
                var that = $(this),
                    $id = that.attr('data-id'),
                    $name = that.find('.' + self.settings.cart + '-name').text(),
                    $price = that.find('.' + self.settings.cart + '-price').text(),
                    $input = that.find('input').val(),
                    $image = that.find('img').attr('src'),
                    product = {
                        name: $name,
                        id: $id,
                        price: $price,
                        input: $input,
                        image: $image
                    };

                cart_storage.items.push(product);
            });
            window.sessionStorage.setItem('ct-shopping-cart', JSON.stringify(cart_storage))

        },


        /* Session Storage Get */
        storage_get: function () {
            var cart = window.sessionStorage['ct-shopping-cart'];
            cart = JSON.parse(cart);
            return cart;
        },


        /* Clear Session Storage */
        storage_clear: function () {
            window.sessionStorage.removeItem('ct-shopping-cart');
        },


        /* Session Storage Set */
        wish_storage_set: function () {
            var self = this,
                wish_storage = {
                    items: []
                };

            $(self.wishlist).find('li').each(function () {
                var that = $(this),
                    $id = that.attr('data-id'),
                    $name = that.find('.' + self.settings.wishlist + '-name').text(),
                    $price = that.find('.' + self.settings.wishlist + '-price').text(),
                    $image = that.find('img').attr('src'),
                    product = {
                        name: $name,
                        id: $id,
                        price: $price,
                        image: $image
                    };

                wish_storage.items.push(product);
            });
            window.sessionStorage.setItem('ct-shopping-wishlist', JSON.stringify(wish_storage))

        },


        /* Session Storage Get */
        wish_storage_get: function () {
            var wish = window.sessionStorage['ct-shopping-wishlist'];
            wish = JSON.parse(wish);
            return wish;
        },


        /* Clear Session Storage */
        wish_storage_clear: function () {
            window.sessionStorage.removeItem('ct-shopping-wishlist');
        },


        /* Create Storage wish */
        create_storage_wish: function () {
            var self = this,
                wish = self.wish_storage_get();


            for (var i = 0, len = wish.items.length; i < len; i++) {
                var $id = wish.items[i].id,
                    $name = wish.items[i].name,
                    $price = wish.items[i].price,
                    $image = wish.items[i].image;

                if (self.settings.product_image) {
                    self.wishlist.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + $id + '>' +
                        '<div class=' + self.settings.wishlist + '-left>' +
                        '<img src=' + $image + ' /></div>' +
                        '<div class=' + self.settings.wishlist + '-body>' +
                        '<span class=' + self.settings.wishlist + '-name>' + $name + '</span>' +
                        '<span class=' + self.settings.wishlist + '-price>' + $price + '</span>' +
                        '<button class=' + self.settings.wishlist + '-remove>&times;</button>' +
                        '<button class=' + self.settings.wishlist + '-add-to-cart>Add To Cart</button>' +
                        '</div>' +
                        '</li>');
                } else {
                    self.wishlist.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + $id + '>' +
                        '<span class=' + self.settings.wishlist + '-name>' + $name + '</span>' +
                        '<span class=' + self.settings.wishlist + '-price>' + $price + '</span>' +
                        '<button class=' + self.settings.wishlist + '-remove>x</button>' +
                        '<button class=' + self.settings.wishlist + '-add-to-cart>Add To Cart</button>' +
                        '</li>');
                }
            }
            self.wishlist_add_to_cart();
        },


        /* Create Storage Cart */
        create_storage_cart: function () {
            var self = this,
                cart = self.storage_get();


            for (var i = 0, len = cart.items.length; i < len; i++) {
                var $id = cart.items[i].id,
                    $name = cart.items[i].name,
                    $price = cart.items[i].price,
                    $image = cart.items[i].image,
                    $input = cart.items[i].input;

                if (self.settings.product_image) {
                    self.cart.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + $id + '>' +
                        '<div class=' + self.settings.cart + '-left>' +
                        '<img src=' + $image + ' /></div>' +
                        '<div class=' + self.settings.cart + '-body>' +
                        '<span class=' + self.settings.cart + '-name>' + $name + '</span>' +
                        '<span class=' + self.settings.cart + '-price>' + $price + '</span>' +
                        '<input type="number" min="1" value="' + $input + '" class=' + self.settings.cart + '-input>' +
                        '<button class=' + self.settings.cart + '-remove>&times;</button>' +
                        '</div>' +
                        '</li>');
                } else {
                    self.cart.append(
                        '<li class="animated ' + self.settings.animation + '" data-id=' + $id + '>' +
                        '<span class=' + self.settings.cart + '-name>' + $name + '</span>' +
                        '<span class=' + self.settings.cart + '-price>' + $price + '</span>' +
                        '<input type="number" min="1" value="' + $input + '" class=' + self.settings.cart + '-input>' +
                        '<button class=' + self.settings.cart + '-remove>x</button>' +
                        '</li>');
                }
            }

        },


        /* Cart Empty */
        cart_empty: function () {
            var self = this,
                empty = self.settings.cart + '-empty';

            if (self.settings.empty_disable === 'false') {
                if (self.cart.find('li').length) {
                    $('.' + empty).remove();
                } else {
                    self.cart.parent().prepend('<span class="' + empty + '">' + self.settings.empty_text + '</span>')
                }
            }
        },


        /* Wishlist Add to Cart */
        wishlist_add_to_cart: function () {
            /* Cart Local Variabls */
            var self = this,
                $wish = self.wishlist.find('li');

            $wish.each(function () {
                var that = $(this),
                    $wish_add = that.find('.' + self.settings.wishlist + '-add-to-cart');

                $wish_add.on('click touchend', function (e) {
                    e.preventDefault();

                    var $wish_attr = that.attr('data-id'),
                        $wish_title = that.find('.' + self.settings.wishlist + '-name').text(),
                        $wish_price = that.find('.' + self.settings.wishlist + '-price').text().replace(',', '').replace(/[^\d.]/g, ''),

                        $wish_image = that.find('img').attr('src'),
                        $cart_li = self.cart.find('li'),
                        $cart_li_current = self.cart.find('[data-id=' + $wish_attr + ']'),
                        $cart_li_attribute = $cart_li_current.attr('data-id'),
                        $cart_li_input = $cart_li.find('.' + self.settings.cart + '-input'),
                        $cart_li_length;


                    /* Append Item Conditional */
                    if ($cart_li.length !== 0) {
                        if ($cart_li_attribute !== $wish_attr) {
                            self.add_to_cart($wish_title, $wish_price, $wish_attr, $wish_image);
                        }
                    } else {
                        self.add_to_cart($wish_title, $wish_price, $wish_attr, $wish_image);
                        if (self.settings.permanent_cart_buttons === 'false') {
                            self.add_cart_buttons();
                        }
                        if (self.settings.display_total_value === 'true' && self.settings.permanent_total_value === 'false') {
                            self.append_total();
                        }
                        self.add_promo_code();
                    }

                    /* Updated Local Variables */
                    $cart_li = self.cart.find('li');
                    $cart_li_input = $cart_li.find('.' + self.settings.cart + '-input');
                    $cart_li_length = $cart_li.length;


                    /* Functions */
                    self.quantity_change($cart_li_input)
                    self.calculate_total_value();
                    self.remove_item($cart_li_length);

                    that.remove();
                    self.wish_storage_set();

                    return false
                });
            })
        },


        /* Get Absolute URL */
        absolute_url: function () {
            var location = '',
                end_location = window.location.href.split('/');

            end_location.pop();

            location = end_location.join('/') + '/';

            return location;

        }

    });


    /* Plugin Init */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };


})();
