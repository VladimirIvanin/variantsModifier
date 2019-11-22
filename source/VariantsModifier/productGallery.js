var setVariantByImage = require('./setVariantByImage');

var updateProductGallery = function ($productGallery, data) {
  var self = this;
  if (!$productGallery) {
    return;
  }


  var sliders = [
    {
      name: 'swiper',
      method: 'slideTo', // метод установки слайда по индексу
      onUpdate: 'onTransitionEnd',
      onUpdateCallback: function (e) {
        if (self._gallery) {
          setVariantByImage({
            $form: self.$form,
            src: $(e.slides[e.activeIndex]).find('img').attr('src')
          });
        }
      },
      slideClass: '.swiper-slide',
      activeClass: 'swiper-slide-active'
    },
    {
      name: 'slick',
      method: 'slickGoTo',
      onUpdate: 'afterChange',
      onUpdateCallback: function (e, slick, currentSlide) {
        setVariantByImage({
          $form: self.$form,
          src: $(slick.$slides[currentSlide]).find('img').attr('src')
        });
      },
      slideClass: '.slick-slide',
      activeClass: 'slick-current'
    }
  ];

  if (!self._updateGallery) {
    var i = 0;
    for (i; i < sliders.length; i++) {
      var slider = sliders[i];
      var name = slider.name;
      var Gallery = ($productGallery[0] && typeof $productGallery[0][name] != 'undefined' && $productGallery[0][name]) ? $productGallery[0][name] : false;
      if (Gallery && Gallery[slider.method]) {
        var _index = $productGallery.find(slider.slideClass + ' [src*="'+data.image_id+'/'+self.activeImage+'"]').parents(slider.slideClass + ':first').index();
        self._slider = slider;
        self._gallery = Gallery;
        self._updateGallery = Gallery[slider.method];
        i = sliders.length;
      }
    }
  }

  if (self._updateGallery) {
    var slider = self._slider;
    var Gallery = self._gallery;

    var $image = $productGallery.find(slider.slideClass + ' [src*="'+data.image_id+'/'+self.activeImage+'"]');
    var $slide = $image.parents(slider.slideClass + ':first');
    var _index = $slide.index();

    if (_index > -1 && self.isInitImage) {
      if (!$slide.is(slider.activeClass) && data.image_id && self._updateGallery) {
        self._gallery[self._slider.method](_index);
      }
    }

    self.isInitImage = true;

    // Подписываемся на обновление слайда
    if (!self._isInitCallback && self.options.updateVariantFromSlider) {
      Gallery.on(slider.onUpdate, slider.onUpdateCallback);
      self._isInitCallback = true;
    }
  }

}

module.exports = {
  'updateProductGallery': updateProductGallery
}
