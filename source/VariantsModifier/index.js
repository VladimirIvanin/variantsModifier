var defaults = require('../variables').defaults;
var init = require('./init');
var setVariantByImage = require('./setVariantByImage');

var VariantsModifier = function (options) {
  var self = this;

  self.options = $.extend(true, {}, defaults, options);

  self.init = init;
  self.setVariantByImage = setVariantByImage;

  if (!EventBus) {
    console.warn('Не подключен common.js');
  }else{
    self.init();
  }

  return self;
};

module.exports = VariantsModifier;
