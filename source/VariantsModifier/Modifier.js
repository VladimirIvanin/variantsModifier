var initElements = require('./initElements');
var renderPrice = require('./render').renderPrice;
var renderOldPrice = require('./render').renderOldPrice;
var renderAvailable = require('./render').renderAvailable;
var renderSku = require('./render').renderSku;
var renderImage = require('./render').renderImage;
var bindingVariants = require('./bindingVariants');

function Modifier ($form, options, action) {
  var self = this;
  self.options = options;

  self.$form = $form;
  self.productInstance = action.productInstance;
  self.productJSON = action.productJSON;
  self.initElements = initElements;
  self.bindingVariants = bindingVariants;

  self.renderPrice = renderPrice;
  self.renderOldPrice = renderOldPrice;
  self.renderAvailable = renderAvailable;
  self.renderSku = renderSku;
  self.renderImage = renderImage;

  self.initElements();
  self.bindingVariants();
}

Modifier.prototype.updateVariant = function (data) {
  var $form = (data.action.product) ? data.action.product[0] : null;
  var self = this;

  self.options.updateVariant(data, $form);
  self.renderPrice(data);
  self.renderOldPrice(data);
  self.renderAvailable(data);
  self.renderSku(data);
  self.renderImage(data);
};

module.exports = Modifier;
