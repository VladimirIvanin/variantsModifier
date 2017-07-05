/**
 * Получаем message и классы Quantity варианта
 * @param  {number} quantity         кол-во
 * @param  {boolean} availableVariant Доступность варианта
 * @param  {object} _options настройки не обязательны если метод используется в инстансе
 * @return {object}                  message и классы Quantity варианта
 */
function getQuantityMessage(quantity, availableVariant, _options) {
  var self = this;
  var options = _options || self.options;
  var templates = options.templates;
  var classes = options.classes;
  var message = templates.quantityAlot;
  var activeClass = classes.quantityAlot;
  var _removeClasses = [];

  $.each(classes, function(index, el) {
    if (index.indexOf('quantity') > -1) {
      _removeClasses.push(el);
    }
  });

  if (quantity <= options.quantityEnds) {
    message = templates.quantityEnds;
    activeClass = classes.quantityEnds;
  }

  if (!availableVariant) {
    message = templates.quantityNotAvailable;
    activeClass = classes.quantityNotAvailable;
  }else{
    if (quantity === null && typeof quantity === "object") {
      message = templates[options.quantityNull];
      activeClass = classes[options.quantityNull];
    }
  }

  return {
    activeClass: activeClass,
    message: message,
    classes: _removeClasses.join(' ')
  }
}

module.exports = getQuantityMessage;
