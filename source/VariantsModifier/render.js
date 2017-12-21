var setVariantByImage = require('./setVariantByImage');
var getQuantityMessage = require('./getQuantityMessage');

function renderQuantity(data) {
  var self = this;
  var quantity = data.quantity;
  var options = self.options;
  var quantityStatus = getQuantityMessage(quantity, data.available, options);

  var message = quantityStatus.message;
  var activeClass = quantityStatus.activeClass;
  var _removeClasses = quantityStatus.classes;

  // селектор сообщения о статусе остатка
  var $quantity = self.$quantity;

  // считаем quantity товара
  if (!options.checkQuantityVariant) {
    var templates = options.templates;
    var classes = options.classes;
    var productQuantity = 0;
    $.each(self.productJSON.variants, function(index, el) {
      if (el.quantity) {
        productQuantity += el.quantity;
      }
    });

    quantity = productQuantity;

    if (quantity <= options.quantityEnds) {
      message = templates.quantityEnds;
      activeClass = classes.quantityEnds;
    }
    if (!self.productJSON.available) {
      message = templates.quantityNotAvailable;
      activeClass = classes.quantityNotAvailable;
    }else{
      if (quantity === 0) {
        message = templates[options.quantityNull];
        activeClass = classes[options.quantityNull];
      }
    }
  }

  var status = getTemplate(message, '');

  $quantity.removeClass(_removeClasses);

  $quantity.html( status ).addClass(activeClass);
}

function renderPrice(data) {
  var self = this;
  var $price = self.$price;
  var options = self.options;
  var templates = options.templates;
  var _price = (data.action && data.action.price) ? data.action.price : data.price;
  var money = Shop.money.format(_price);
  var price = getTemplate(templates.price, money);

  $price.html( price );

  self.options.updatePrice(data, self.$form);
}

function renderOldPrice(data) {
  var self = this;
  var $form = self.$form;
  var $oldPrice = self.$oldPrice;
  var _oldPrice = Shop.money.format(data.old_price || data.price);
  var options = self.options;
  var classes = options.classes;
  var templates = options.templates;
  var money = Shop.money.format(data.old_price);
  var oldPrice = getTemplate(templates.oldPrice, money);
  var emptyOldPrice = getTemplate(templates.emptyOldPrice, money);

  if (data.old_price) {
    $oldPrice.html( oldPrice );
    $form.addClass(classes.withOldPrice)
    $form.removeClass(classes.withoutOldPrice);
    if (options.useToggleOldPrice) {
      $oldPrice.show();
    }
  }else{
    $oldPrice.html( emptyOldPrice );
    $form.addClass(classes.withoutOldPrice)
    $form.removeClass(classes.withOldPrice);
    if (options.useToggleOldPrice) {
      $oldPrice.hide();
    }
  }

  self.options.updateOldPrice(data, $form);
}

function renderAvailable(data) {
  var self = this;
  var $form = self.$form;
  var $available = self.$available;
  var options = self.options;
  var classes = options.classes;
  var templates = options.templates;
  var available = getTemplate(templates.available, '');
  var notAvailable = getTemplate(templates.notAvailable, '');

  if (data.available) {
    $available.html(available);
    $form.addClass(classes.isAvailable).removeClass(classes.notAvailable);
  }else{
    $available.html(notAvailable);
    $form.addClass(classes.notAvailable).removeClass(classes.isAvailable);
  }

  self.options.updateAvailable(data, $form);
}

function renderSku(data) {
  var self = this;
  var $form = self.$form;
  var $sku = self.$sku;
  var options = self.options;
  var classes = options.classes;
  var templates = options.templates;
  var sku = getTemplate(templates.sku, data.sku);
  var emptySku = getTemplate(templates.emptySku, data.sku);

  if (data.sku) {
    $sku.html(sku);
    $form.addClass(classes.withSku).removeClass(classes.withoutSku);
    if (options.useToggleSku) {
      $sku.show();
    }
  }else{
    $sku.html(emptySku);
    $form.addClass(classes.withoutSku).removeClass(classes.withSku);
    if (options.useToggleSku) {
      $sku.hide();
    }
  }

  self.options.updateSku(data, $form);
}

function renderImage(data) {
  var self = this;
  var options = self.options;
  var first_image = data.first_image;
  var filename = data.first_image.filename;

  var $links = $('[href*="'+filename+'"]');
  var $images = {
    $all: $('[src*="'+filename+'"]'),
    $compacts: $('[src*="compact_'+filename+'"]'),
    $larges: $('[src*="large_'+filename+'"]'),
    $mediums: $('[src*="medium_'+filename+'"]'),
    $micros: $('[src*="micro_'+filename+'"]'),
    $thumb: $('[src*="thumb_'+filename+'"]'),
    $originals: $('[src$="'+filename+'"]')
  }

  self.options.updateImage(data, self.$form, $images, first_image, $links);
}

function getTemplate(template, data) {
  if (!template || typeof template != 'string') {
    template = '';
  }
  if (!data || typeof data != 'string') {
    data = '';
  }
  return template.replace(/%s%/g, data)
}

module.exports = {
  'renderQuantity': renderQuantity,
  'renderPrice': renderPrice,
  'renderOldPrice': renderOldPrice,
  'renderAvailable': renderAvailable,
  'renderSku': renderSku,
  'renderImage': renderImage
};
