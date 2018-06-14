/* global $ */
var initElements = require('./initElements');
var renderPrice = require('./render').renderPrice;
var renderOldPrice = require('./render').renderOldPrice;
var renderAvailable = require('./render').renderAvailable;
var renderSku = require('./render').renderSku;
var renderQuantity = require('./render').renderQuantity;
var renderImage = require('./render').renderImage;
var getDataParam = require('./getDataParam');
var updateProductGallery = require('./productGallery').updateProductGallery;

function Modifier ($form, options, action) {
  var self = this;
  self.options = $.extend(true, {}, {}, options);

  self.$form = $form;
  self.productInstance = action.productInstance;
  self.productJSON = action.productJSON;
  self.initElements = initElements;

  self.renderPrice = renderPrice;
  self.renderOldPrice = renderOldPrice;
  self.renderAvailable = renderAvailable;
  self.renderSku = renderSku;
  self.renderQuantity = renderQuantity;
  self.renderImage = renderImage;
  self.getDataParam = getDataParam;
  self.updateProductGallery = updateProductGallery;

  self.isInitImage = false;

  if (options.initVariantImage) {
    self.isInitImage = true;
  }

  self.getDataParam();
  self.initElements();
}

Modifier.prototype.updateVariant = function (data, quantityChange) {
  var $form = (data.action.product) ? data.action.product[0] : null;
  var self = this;
  self.updateOption(data);

  self.activeImage = data.first_image.filename;

  self.renderPrice(data);
  self.renderOldPrice(data);
  self.renderAvailable(data);
  self.renderSku(data);
  self.renderQuantity(data);
  if (!quantityChange) {  
    self.renderImage(data);
    self.updateProductGallery(self.$productGallery, data);
  }

  self.options.updateVariant(data, $form);

};

Modifier.prototype.updateOption = function(data) {
  $.each(data.option_values, function(index, el) {
    var withOption = data.action && data.action.productJSON && data.action.productJSON.option_names;
    if (!withOption) {
      return;
    }
    $.each(data.action.productJSON.option_names, function(_index, _el) {
      if (el.option_name_id == _el.id) {
        el.option_name = _el;
      }
    });
  });
};

module.exports = Modifier;
