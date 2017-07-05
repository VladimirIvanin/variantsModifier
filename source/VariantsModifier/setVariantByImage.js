function setVariantByImage(options) {
  var $form = options.$form;
  var src = options.src;
  var size = options.size;
  var file = getFileName(src, size);

  var _form = $form.get(0);
  if (!_form) {
    return;
  }
  var ModifierInstance = _form.instanceVariantsModifier;
  if (!ModifierInstance) {
    return;
  }

  var productJSON = ModifierInstance.productJSON;
  var variantId = false;

  $.each(productJSON.variants, function(index, el) {
    var filename = el.first_image.filename;
    if (file === filename && !variantId) {
      variantId = el.id;
      return;
    };
  });

  if (!ModifierInstance.inProcess) {
    if (variantId && file !== ModifierInstance.activeImage) {
      ModifierInstance.inProcess = true;
      Products.getInstance(ModifierInstance.productInstance).done(function (_product) {
        ModifierInstance.inProcess = false;
        ModifierInstance.activeImage = file;
        _product.variants.setVariant(variantId);
      })
    }
  }
}

// compact/large/medium/micro/thumb/original
function getFileName(src, size) {
  if (typeof src != 'string') {
    src = '';
    console.warn('Передан пустой url для изображения');
  }
  var arraySrc = src.split('/');
  var result = arraySrc[arraySrc.length - 1];
  var sizes = [
    'compact_', 'large_', 'medium_', 'micro_', 'thumb_'
  ]

  if (!size || size && size == '') {
    $.each(sizes, function(index, el) {
      if (result.indexOf(el) === 0) {
        result = result.replace(el, '');
        return;
      }
    });
  }else{
    if (size != 'original') {
      result = result.replace(size + '_', '');
    }
  }

  return result;
}

module.exports = setVariantByImage;
