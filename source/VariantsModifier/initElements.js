function initElements() {
  var self = this;
  var $form = self.$form;
  var selectors = self.options.selectors;

  self.$price = $form.find(selectors.price);
  self.$oldPrice = $form.find(selectors.oldPrice);
  self.$sku = $form.find(selectors.sku);
  self.$quantity = $form.find(selectors.quantity);
  self.$available = $form.find(selectors.available);
}

module.exports = initElements;
