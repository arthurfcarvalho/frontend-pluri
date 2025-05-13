(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(window.jQuery);
  }
}(function ($) {
  $.extend($.summernote.plugins, {
    'math': function (context) {
      const ui = $.summernote.ui;

      context.memo('button.math', function () {
        return ui.button({
          contents: '<i class="fa fa-square-root-alt"></i>',
          tooltip: 'Inserir fórmula (KaTeX)',
          click: function () {
            const latex = prompt('Digite a fórmula em LaTeX:');
            if (latex) {
              const katexEl = document.createElement('span');
              katex.render(latex, katexEl, { throwOnError: false });
              context.invoke('editor.insertNode', katexEl);
            }
          }
        }).render();
      });
    }
  });
}));
