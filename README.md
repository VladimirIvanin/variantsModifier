# Плагин для обновления информации товара на платформе InSales

:flower_playing_cards: поддержка изображений варианта

:no_bell: обновление варианта без событий quantity

:battery: статусы остатка варианта

:pencil: возможность менять шаблоны для вывода информации на страницу

:warning: совместимо только с common.js v2!

## CDN

```
  <script src="https://cdn.jsdelivr.net/gh/VladimirIvanin/variantsModifier@0.5.6/dist/variantsModifier.js"></script>
```

```js
var myVariants = new VariantsModifier ({
  templates: {
    price: '%s%', // %s% - 100 руб
    oldPrice: '%s%', // %s% - 100 руб
    emptyOldPrice: '',
    sku: 'арт. %s%', // %s% - 12345
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
  initVariantImage: false, // Выбор слайда при инициализации?
  updateVariantFromSlider: false, // Обновлять вариант при перелистывании слайдов 
  useToggleOldPrice: true, // использовать show/hide на old price?
  useToggleSku: true, // использовать show/hide на sku?
  checkQuantityVariant: true, // проверять остаток варианта? Иначе продукта.
  quantityNull: 'quantityAlot', // Если кол-во не заполнено quantityEnds/quantityAlot/quantityNotAvailable
  dataParam: { // параметры первого уровня, задаются из дата атрибутов. Например data-quantity-null="quantityNotAvailable"
    quantityNull: 'quantity-null',
    quantityEnds: 'quantity-ends',
    checkQuantytiVariant: 'check-quantity-variant'
  },
  updateImage: function (data, $form, $images, first_image, $links) {
    console.log(data, $form, $images, first_image, $links);
  },
  updateVariant: function (data, $form) {
    console.log(data, $form);
  }
});

// есть метод для установки варианта по картинке
// $form - селектор формы товара
// src - ссылка на картинку варианта
// size - не обязательное поле, но чтобы не было конфликтов
// когда в названии файла присутствуют
// спец префиксы размеров - `original/compact/large/medium/micro/thumb`
myVariants.setVariantByImage({
  $form: $('#product-form'),
  src: 'https://static-eu.insales.ru/images/products/1/2587/85207579/variant_image.jpg',
  size: 'original'
});
```

```html

<form id="product-form" action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}" data-product-gallery=".js-product-gallery">

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

- `data-quantity-message` - для сообщения о статусе остатка

- `data-product-gallery` - Для связки формы и слайдера укажите атрибут data-product-gallery в теге form, в качестве значения передайте селектор слайдера. (Поддерживаются Swiper и SlickSlider)
  

## Templates

В templates `%s%` заменяется на значение из варианта.

## Classes

Классы добавляются к форме.


## Полезные ссылки

- [Ранее просмотренные товары](https://github.com/VladimirIvanin/RecentlyView)

- [Определение местоположения пользователя](https://github.com/VladimirIvanin/geoManager)

- [Избранное](https://github.com/VladimirIvanin/favorites)

- [Отправка сообщений](https://github.com/VladimirIvanin/InSalesFeedback)

- [Утилита для работы с темами InSales на локальном диске](https://github.com/brainmurder/insales-uploader)

- [Сборщик шаблонов для InSales](https://github.com/VladimirIvanin/insales-template-builder)

- [Табы на jQuery](https://github.com/VladimirIvanin/dataTabs)
