var Modifier = require('./Modifier');

function init() {
  var self = this;

  EventBus.subscribe('update_variant:insales:product', function (data) {
    var $form = (data.action.product) ? data.action.product[0] : null;

    if ($form && !$form.instanceVariantsModifier) {
      $form.instanceVariantsModifier = new Modifier($($form), self.options, data.action);
    }

    if ($form && $form.instanceVariantsModifier) {
      // Обновление варианта может быть при пересчете quantity
      var isQuantity = data.action.quantityState.change || data.action.quantityState.less;
      if (!isQuantity) {
        $form.instanceVariantsModifier.updateVariant(data);
      }
    }
  });
}

module.exports = init;
