var defaults = require('../variables').defaults;
var init = require('./init');

var VariantsModifier = function (options) {
  var self = this;

  self.options = $.extend(true, {}, defaults, options);

  self.init = init;

  if (!EventBus) {
    console.warn('Не подключен common.js');
  }else{
    self.init();
  }

  return self;
};

module.exports = VariantsModifier;
