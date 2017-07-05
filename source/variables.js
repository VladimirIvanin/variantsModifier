var defaults = {
  selectors: {
    oldPrice: '[data-product-old-price]',
    price: '[data-product-price]',
    sku: '[data-product-sku]',
    quantity: '[data-quantity-message]',
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
    quantityEnds: 'Заканчивается',
    quantityAlot: 'Много',
    quantityNotAvailable: 'Нет в наличии'
  },
  classes: {
    withOldPrice: 'with-old-price',
    withoutOldPrice: 'without-old-price',
    withSku: 'with-sku',
    withoutSku: 'without-sku',
    isAvailable: 'is-available',
    notAvailable: 'not-available',
    quantityEnds: 'is-quantity-ends',
    quantityAlot: 'is-quantity-alot',
    quantityNotAvailable: 'is-quantity-not-available'
  },
  quantityEnds: 10, // граница между заканчивается и много
  thumbSize: 'compact',
  thumbWrap: '.js-image-variant',
  initVariantImage: false, // Кликнуть по миниатюре варианта при инициализации?
  useTriggerThumb: true, // кликать по миниатюрам после смены варианта?
  useToggleOldPrice: true, // использовать show/hide на old price?
  useToggleSku: true, // использовать show/hide на sku?
  checkQuantityVariant: true, // проверять остаток варианта? Иначе продукта.
  quantityNull: 'quantityAlot', // Если кол-во не заполнено quantityEnds/quantityAlot/quantityNotAvailable
  dataParam: { // параметры первого уровня, задаются из дата атрибутов. Например data-quantity-null="quantityNotAvailable"
    quantityNull: 'quantity-null',
    quantityEnds: 'quantity-ends',
    checkQuantytiVariant: 'check-quantity-variant'
  },
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
