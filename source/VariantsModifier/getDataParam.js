function getDataParam() {
  var self = this;
  var options = self.options;
  var $form = self.$form;
  var dataParam = options.dataParam;

  $.each(dataParam, function(index, el) {
    var _param = $form.data(el);
    if (_param) {
      options[index] = _param;
    }
  });

}

module.exports = getDataParam;
