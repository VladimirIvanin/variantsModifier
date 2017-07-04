function bindingVariants() {
  var self = this;
  var options = self.options;
  var thumbSize = options.thumbSize;
  var thumbWrap = options.thumbWrap;
  var product = self.productJSON;
  var productInstance = self.productInstance;
  if (product.variants && product.variants.length && options.useTriggerThumb) {
    var _thumbs = {};
    $.each(product.variants, function(index, el) {
      var filename = el.first_image.filename;
      var $trigger = $(''+thumbWrap+' [src*="'+thumbSize+'_'+filename+'"]').eq(0).parents(thumbWrap+':first');
      if (!_thumbs[filename]) {
        _thumbs[filename] = true;
        $trigger.click(function(event) {
          if (self.activeImage != filename) {
            self.activeImage = filename;
            if (!event.isModifier) {
              Products.getInstance(productInstance).done(function (_product) {
                _product.variants.setVariant(el.id);
              })
            }
          }
        });
      }
    });
  }
}

module.exports = bindingVariants;
