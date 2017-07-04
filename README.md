# Плагин для обновления информации товара на платформе InSales

> Совместимо только с common.js v2

## CDN

```
  <script src="https://cdn.jsdelivr.net/gh/VladimirIvanin/variantsModifier@0.3.0/dist/variantsModifier.js"></script>
```

```js
var myVariants = new VariantsModifier ({
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
  thumbWrap: '.js-image-variant',
  initVariantImage: false, // Кликнуть по миниатюре варианта при инициализации?
  useTriggerThumb: true, // кликать по миниатюрам после смены варианта?
  useToggleOldPrice: true, // использовать show/hide на old price?
  useToggleSku: true, // использовать show/hide на sku?
  updateImage: function (data, $form, $images, first_image, $links) {
    console.log(data, $form, $images, first_image, $links);
  },
  updateVariant: function (data, $form) {
    console.log(data, $form, $images, first_image, $links);
  }
});

// есть метод для установки варианта по картинке
// $form - селектор формы товара
// src - ссылка на картинку варианта
myVariants.setVariantByImage({
  $form: $('#product-form'),
  src: 'https://static-eu.insales.ru/images/products/1/2587/85207579/variant_image.jpg'
});

// Пример для слайдера swiper
var galleryTop = new Swiper('.gallery-top', {
  onTransitionEnd: function (e) {
    myVariants.setVariantByImage({
      $form: $('#product-form'),
      src: $(e.slides[e.activeIndex]).find('img').attr('src')
    })
  }
})
```

```html
<form id="product-form" action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}">

  <div class="product-available" data-product-available>
    {% if product.available %}
      Товар в наличии
      {% else %}
      Товара нет в наличии
    {% endif %}
  </div>

  <div class="product-sku" data-product-sku>
    {% if product.variants.first.sku %}
      арт. {{ product.variants.first.sku }}
    {% endif %}
  </div>

  <div class="product-prices">
    <div class="product-old_price">
      <span data-product-old-price>{{ product.old_price | money }}</span>
    </div>
    <div class="product-price">
      <span data-product-price>{{ product.price | money }}</span>
    </div>
  </div>

  {% if product.show_variants? %}
    <select name="variant_id" data-product-variants>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{product.variants.first.id}}" >
  {% endif %}
  <input type="text" name="comment" value="">
  <div data-quantity>
    <input type="text" name="quantity" value="1" />
    <span data-quantity-change="-1">-</span>
    <span data-quantity-change="1">+</span>
  </div>
  <button type="submit" data-item-add>
    Добавить в корзину
  </button>
</form>
```

## Селекторы/дата атрибуты

- `data-product-price` - для цены

- `data-product-old-price` - для старой цены

- `data-product-sku` - для артикула

- `data-product-available` - для сообщения о доступности

## templates

В templates `%s%` заменяется на значение из варианта.

## Миниатюры

В callback `updateImage` падает информация о всех узлах как то связанных с картинкой варианта. Чтобы узнать больше делайте `console.log` внутри колбека.

- `thumbSize` - размер миниатюр `compact/large/medium/micro/thumb`, по размеру миниатюр происходит поиск.

- `thumbWrap` - селектор кнопки переключения слайда в галарее фотографий.


## Classes

Классы добавляются к форме.
