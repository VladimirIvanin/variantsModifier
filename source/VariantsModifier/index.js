/* global $ */

var defaults = require('../variables').defaults;
var init = require('./init');
var setVariantByImage = require('./setVariantByImage');
var getQuantityMessage = require('./getQuantityMessage');

var VariantsModifier = function (options) {
  var self = this;
  self.options = $.extend(true, {}, defaults, options);

  self.init = init;
  self.setVariantByImage = setVariantByImage;
  self.getQuantityMessage = getQuantityMessage;

  if (!EventBus) {
    console.warn('Не подключен common.js');
  }else{
    self.init();
  }

  return self;
};

module.exports = VariantsModifier;
