var defaults = {
  selectors: {
    oldPrice: '[data-product-old-price]',
    price: '[data-product-price]',
    sku: '[data-product-sku]',
    available: '[data-product-available]'
  },
  templates: {
    price: '%s%',
    oldPrice: '%s%',
    emptyOldPrice: '',
    sku: 'арт. %s%',
    emptySku: '',
    available: 'Есть в наличии',
    notAvailable: 'Нет в наличии',
  },
  classes: {
    withOldPrice: 'with-old-price',
    withoutOldPrice: 'without-old-price',
    withSku: 'with-sku',
    withoutSku: 'without-sku',
    isAvailable: 'is-available',
    notAvailable: 'not-available'
  },
  thumbSize: 'compact',
  thumbWrap: 'div',
  useTriggerThumb: true, // кликать по миниатюрам после смены варианта?
  useToggleOldPrice: true, // использовать show/hide на old price?
  useToggleSku: true, // использовать show/hide на sku?
  updatePrice: function () {}, // (data, $form)
  updateOldPrice: function () {}, // (data, $form)
  updateAvailable: function () {}, // (data, $form)
  updateSku: function () {}, // (data, $form)
  updateImage: function () {}, // (data, $form, $images, first_image, $links)
  updateVariant: function () {} // (data, $form)
};

var system = {};

module.exports = {
  'defaults': defaults,
  'system': system
}
