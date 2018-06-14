/*!
 * VariantsModifier v0.5.8
 * https://github.com/VladimirIvanin/VariantsModifier
 * Vladimir Ivanin
 * 2018
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var initElements=require("./initElements"),renderPrice=require("./render").renderPrice,renderOldPrice=require("./render").renderOldPrice,renderAvailable=require("./render").renderAvailable,renderSku=require("./render").renderSku,renderQuantity=require("./render").renderQuantity,renderImage=require("./render").renderImage,getDataParam=require("./getDataParam"),updateProductGallery=require("./productGallery").updateProductGallery;function Modifier(e,r,t){this.options=$.extend(!0,{},{},r),this.$form=e,this.productInstance=t.productInstance,this.productJSON=t.productJSON,this.initElements=initElements,this.renderPrice=renderPrice,this.renderOldPrice=renderOldPrice,this.renderAvailable=renderAvailable,this.renderSku=renderSku,this.renderQuantity=renderQuantity,this.renderImage=renderImage,this.getDataParam=getDataParam,this.updateProductGallery=updateProductGallery,this.isInitImage=!1,r.initVariantImage&&(this.isInitImage=!0),this.getDataParam(),this.initElements()}Modifier.prototype.updateVariant=function(e,r){var t=e.action.product?e.action.product[0]:null;this.updateOption(e),this.activeImage=e.first_image.filename,this.renderPrice(e),this.renderOldPrice(e),this.renderAvailable(e),this.renderSku(e),this.renderQuantity(e),r||(this.renderImage(e),this.updateProductGallery(this.$productGallery,e)),this.options.updateVariant(e,t)},Modifier.prototype.updateOption=function(e){$.each(e.option_values,function(r,t){e.action&&e.action.productJSON&&e.action.productJSON.option_names&&$.each(e.action.productJSON.option_names,function(e,r){t.option_name_id==r.id&&(t.option_name=r)})})},module.exports=Modifier;
},{"./getDataParam":2,"./initElements":6,"./productGallery":7,"./render":8}],2:[function(require,module,exports){
function getDataParam(){var a=this.options,t=this.$form,o=a.dataParam;$.each(o,function(o,r){var e=t.data(r);e&&(a[o]=e)})}module.exports=getDataParam;
},{}],3:[function(require,module,exports){
function getQuantityMessage(t,a,n){var e=n||this.options,s=e.templates,i=e.classes,u=s.quantityAlot,l=i.quantityAlot,o=[];return $.each(i,function(t,a){t.indexOf("quantity")>-1&&o.push(a)}),t<=e.quantityEnds&&(u=s.quantityEnds,l=i.quantityEnds),a?null===t&&"object"==typeof t&&(u=s[e.quantityNull],l=i[e.quantityNull]):(u=s.quantityNotAvailable,l=i.quantityNotAvailable),{activeClass:l,message:u,classes:o.join(" ")}}module.exports=getQuantityMessage;
},{}],4:[function(require,module,exports){
var defaults=require("../variables").defaults,init=require("./init"),setVariantByImage=require("./setVariantByImage"),getQuantityMessage=require("./getQuantityMessage"),VariantsModifier=function(t){return this.options=$.extend(!0,{},defaults,t),this.init=init,this.setVariantByImage=setVariantByImage,this.getQuantityMessage=getQuantityMessage,EventBus?this.init():console.warn("Не подключен common.js"),this};module.exports=VariantsModifier;
},{"../variables":11,"./getQuantityMessage":3,"./init":5,"./setVariantByImage":9}],5:[function(require,module,exports){
var Modifier=require("./Modifier");function init(){var i=this;EventBus.subscribe("update_variant:insales:product",function(t){var a=t.action.product?t.action.product[0]:null;if(a&&!a.instanceVariantsModifier&&(a.instanceVariantsModifier=new Modifier($(a),i.options,t.action)),a&&a.instanceVariantsModifier){var n=t.action.quantityState.change||t.action.quantityState.less;a.instanceVariantsModifier.updateVariant(t,n)}})}module.exports=init;
},{"./Modifier":1}],6:[function(require,module,exports){
function initElements(){var i=this.$form,t=this.options.selectors;this.$price=i.find(t.price),this.$oldPrice=i.find(t.oldPrice),this.$sku=i.find(t.sku),this.$quantity=i.find(t.quantity),this.$available=i.find(t.available),this.options.productGallery&&(this.$productGallery=$(this.options.productGallery))}module.exports=initElements;
},{}],7:[function(require,module,exports){
var setVariantByImage=require("./setVariantByImage"),updateProductGallery=function(a,e){var i=this;if(a){var s=[{name:"swiper",method:"slideTo",onUpdate:"onTransitionEnd",onUpdateCallback:function(a){i._gallery&&setVariantByImage({$form:i.$form,src:$(a.slides[a.activeIndex]).find("img").attr("src")})},slideClass:".swiper-slide",activeClass:"swiper-slide-active"},{name:"slick",method:"slickGoTo",onUpdate:"afterChange",onUpdateCallback:function(a,e,s){setVariantByImage({$form:i.$form,src:$(e.$slides[s]).find("img").attr("src")})},slideClass:".slick-slide",activeClass:"slick-current"}];if(!i._updateGallery)for(var l=0;l<s.length;l++){var t=(d=s[l]).name;if((n=!(!a[0]||void 0===a[0][t]||!a[0][t])&&a[0][t])&&n[d.method]){var r=a.find(d.slideClass+' [src*="'+i.activeImage+'"]').parents(d.slideClass+":first").index();i._slider=d,i._gallery=n,i._updateGallery=n[d.method],l=s.length}}if(i._updateGallery){var d=i._slider,n=i._gallery,o=a.find(d.slideClass+' [src*="'+i.activeImage+'"]').parents(d.slideClass+":first");(r=o.index())>-1&&i.isInitImage&&!o.is(d.activeClass)&&e.image_id&&i._updateGallery&&i._gallery[i._slider.method](r),i.isInitImage=!0,!i._isInitCallback&&i.options.updateVariantFromSlider&&(n.on(d.onUpdate,d.onUpdateCallback),i._isInitCallback=!0)}}};module.exports={updateProductGallery:updateProductGallery};
},{"./setVariantByImage":9}],8:[function(require,module,exports){
var setVariantByImage=require("./setVariantByImage"),getQuantityMessage=require("./getQuantityMessage");function renderQuantity(e){var t=e.quantity,a=this.options,i=getQuantityMessage(t,e.available,a),s=i.message,r=i.activeClass,l=i.classes,o=this.$quantity;if(!a.checkQuantityVariant){var n=a.templates,u=a.classes,d=0;$.each(this.productJSON.variants,function(e,t){t.quantity&&(d+=t.quantity)}),(t=d)<=a.quantityEnds&&(s=n.quantityEnds,r=u.quantityEnds),this.productJSON.available?0===t&&(s=n[a.quantityNull],r=u[a.quantityNull]):(s=n.quantityNotAvailable,r=u.quantityNotAvailable)}var m=getTemplate(s,"");o.removeClass(l),o.html(m).addClass(r)}function renderPrice(e){var t=this.$price,a=this.options.templates,i=e.action&&e.action.price?e.action.price:e.price,s=Shop.money.format(i),r=getTemplate(a.price,s);t.html(r),this.options.updatePrice(e,this.$form)}function renderOldPrice(e){var t=this.$form,a=this.$oldPrice,i=(Shop.money.format(e.old_price||e.price),this.options),s=i.classes,r=i.templates,l=Shop.money.format(e.old_price),o=getTemplate(r.oldPrice,l),n=getTemplate(r.emptyOldPrice,l);e.old_price?(a.html(o),t.addClass(s.withOldPrice),t.removeClass(s.withoutOldPrice),i.useToggleOldPrice&&a.show()):(a.html(n),t.addClass(s.withoutOldPrice),t.removeClass(s.withOldPrice),i.useToggleOldPrice&&a.hide()),this.options.updateOldPrice(e,t)}function renderAvailable(e){var t=this.$form,a=this.$available,i=this.options,s=i.classes,r=i.templates,l=getTemplate(r.available,""),o=getTemplate(r.notAvailable,"");e.available?(a.html(l),t.addClass(s.isAvailable).removeClass(s.notAvailable)):(a.html(o),t.addClass(s.notAvailable).removeClass(s.isAvailable)),this.options.updateAvailable(e,t)}function renderSku(e){var t=this.$form,a=this.$sku,i=this.options,s=i.classes,r=i.templates,l=getTemplate(r.sku,e.sku),o=getTemplate(r.emptySku,e.sku);e.sku?(a.html(l),t.addClass(s.withSku).removeClass(s.withoutSku),i.useToggleSku&&a.show()):(a.html(o),t.addClass(s.withoutSku).removeClass(s.withSku),i.useToggleSku&&a.hide()),this.options.updateSku(e,t)}function renderImage(e){this.options;var t=e.first_image,a=e.first_image.filename,i=$('[href*="'+a+'"]'),s={$all:$('[src*="'+a+'"]'),$compacts:$('[src*="compact_'+a+'"]'),$larges:$('[src*="large_'+a+'"]'),$mediums:$('[src*="medium_'+a+'"]'),$micros:$('[src*="micro_'+a+'"]'),$thumb:$('[src*="thumb_'+a+'"]'),$originals:$('[src$="'+a+'"]')};this.options.updateImage(e,this.$form,s,t,i)}function getTemplate(e,t){return e&&"string"==typeof e||(e=""),t&&"string"==typeof t||(t=""),e.replace(/%s%/g,t)}module.exports={renderQuantity:renderQuantity,renderPrice:renderPrice,renderOldPrice:renderOldPrice,renderAvailable:renderAvailable,renderSku:renderSku,renderImage:renderImage};
},{"./getQuantityMessage":3,"./setVariantByImage":9}],9:[function(require,module,exports){
function setVariantByImage(e,a){var i=a||function(){},n=e.$form,t=getFileName(e.src,e.size),r=n.get(0);if(r){var c=r.instanceVariantsModifier;if(c){var o=c.productJSON,s=!1;$.each(o.variants,function(e,a){var i=a.first_image.filename;t!==i||s||(s=a.id)}),c.inProcess?i():s&&t!==c.activeImage?(c.inProcess=!0,Products.getInstance(c.productInstance).done(function(e){c.inProcess=!1,c.activeImage=t,e.variants.setVariant(s),i()})):i()}}}function getFileName(e,a){"string"!=typeof e&&(e="",console.warn("Передан пустой url для изображения"));var i=e.split("/"),n=i[i.length-1];return!a||a&&""==a?$.each(["compact_","large_","medium_","micro_","thumb_"],function(e,a){0!==n.indexOf(a)||(n=n.replace(a,""))}):"original"!=a&&(n=n.replace(a+"_","")),n}module.exports=setVariantByImage;
},{}],10:[function(require,module,exports){
window.VariantsModifier=require("VariantsModifier");
},{"VariantsModifier":4}],11:[function(require,module,exports){
var defaults={selectors:{oldPrice:"[data-product-old-price]",price:"[data-product-price]",sku:"[data-product-sku]",quantity:"[data-quantity-message]",available:"[data-product-available]"},templates:{price:"%s%",oldPrice:"%s%",emptyOldPrice:"",sku:"арт. %s%",emptySku:"",available:"Есть в наличии",notAvailable:"Нет в наличии",quantityEnds:"Заканчивается",quantityAlot:"Много",quantityNotAvailable:"Нет в наличии"},classes:{withOldPrice:"with-old-price",withoutOldPrice:"without-old-price",withSku:"with-sku",withoutSku:"without-sku",isAvailable:"is-available",notAvailable:"not-available",quantityEnds:"is-quantity-ends",quantityAlot:"is-quantity-alot",quantityNotAvailable:"is-quantity-not-available"},productGallery:null,quantityEnds:10,thumbSize:"compact",thumbWrap:".js-image-variant",initVariantImage:!1,updateVariantFromSlider:!1,useToggleOldPrice:!0,useToggleSku:!0,checkQuantityVariant:!0,quantityNull:"quantityAlot",dataParam:{quantityNull:"quantity-null",quantityEnds:"quantity-ends",productGallery:"product-gallery",checkQuantytiVariant:"check-quantity-variant"},updatePrice:function(){},updateOldPrice:function(){},updateAvailable:function(){},updateSku:function(){},updateImage:function(){},updateVariant:function(){}},system={};module.exports={defaults:defaults,system:system};
},{}]},{},[10]);
