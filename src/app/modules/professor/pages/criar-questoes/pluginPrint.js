// summernote-print-plugin.js

(function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
      // Node/CommonJS
      module.exports = factory(require('jquery'));
    } else {
      // Browser globals
      factory(window.jQuery);
    }
  }(function ($) {
    // Extends lang for print plugin.
    $.extend(true, $.summernote.lang, {
      'en-US': {
        print: {
          print: 'Imprimir'
        }
      },
      'ko-KR': {
        print: {
          print: '인쇄'
        }
      },
      'pt-BR': {
        print: {
          print: 'Imprimir'
        }
      }
    });
  
    // Extends plugins for print plugin.
    $.extend($.summernote.plugins, {
      'print': function (context) {
        var self = this;
  
        var ui = $.summernote.ui;
        var $editor = context.layoutInfo.editor;
        var options = context.options;
        var lang = options.langInfo;
  
        var isFF = function () {
          const userAgent = navigator.userAgent;
          const isEdge = /Edge\/\d+/.test(userAgent);
          return !isEdge && /firefox/i.test(userAgent)
        }
  
        var fillContentAndPrint = function($frame, content) {
          $frame.contents().find('body').html(content);
  
          setTimeout(function () {
            $frame[0].contentWindow.focus();
            $frame[0].contentWindow.print();
            $frame.remove();
            $frame = null;
          }, 250);
        }
  
        var getPrintframe = function ($container) {
          var $frame = $(
            '<iframe name="summernotePrintFrame"' +
            'width="0" height="0" frameborder="0" src="about:blank" style="visibility:hidden">' +
            '</iframe>');
          $frame.appendTo($editor.parent());
  
          var $head = $frame.contents().find('head');
          if (options.print && options.print.stylesheetUrl) {
            var css = document.createElement('link');
            css.href = options.print.stylesheetUrl;
            css.rel = 'stylesheet';
            css.type = 'text/css';
            $head.append(css);
          } else {
            $('style, link[rel=stylesheet]', document).each(function () {
              $head.append($(this).clone());
            });
          }
          
          return $frame;
        };
  
        context.memo('button.print', function () {
          var button = ui.button({
            contents: '<i class="fa fa-print"/> ' + lang.print.print,
            tooltip: lang.print.print,
            container: options.container,
            click: function () {
              var $frame = getPrintframe();
              var content = context.invoke('code');
  
              if (isFF()) {
                $frame[0].onload = function () {
                  fillContentAndPrint($frame, content);
                };
              } else {
                fillContentAndPrint($frame, content);
              }
            }
          });
          return button.render();
        });
      }
    });
  }));
  