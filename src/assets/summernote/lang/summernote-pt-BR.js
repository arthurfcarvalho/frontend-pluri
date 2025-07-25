/*!
 *
 * Super simple WYSIWYG editor v0.8.20
 * https://summernote.org
 *
 *
 * Copyright 2013- Alan Hong and contributors
 * Summernote may be freely distributed under the MIT license.
 *
 * Date: 2021-10-14T21:15Z
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else {
    var a = factory();
    for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
  }
})(self, function() {
  return /******/ (() => { // webpackBootstrap
    var __webpack_exports__ = {};
    (function ($) {
      $.extend($.summernote.lang, {
        'pt-BR': {
          font: {
            bold: 'Negrito',
            italic: 'Itálico',
            underline: 'Sublinhado',
            clear: 'Remover estilo da fonte',
            height: 'Altura da linha',
            name: 'Fonte',
            strikethrough: 'Riscado',
            subscript: 'Subscrito',
            superscript: 'Sobrescrito',
            size: 'Tamanho da fonte'
          },
          image: {
            image: 'Imagem',
            insert: 'Inserir imagem',
            resizeFull: 'Redimensionar Completamente',
            resizeHalf: 'Redimensionar pela Metade',
            resizeQuarter: 'Redimensionar a um Quarto',
            floatLeft: 'Flutuar para Esquerda',
            floatRight: 'Flutuar para Direita',
            floatNone: 'Não Flutuar',
            shapeRounded: 'Forma: Arredondado',
            shapeCircle: 'Forma: Círculo',
            shapeThumbnail: 'Forma: Miniatura',
            shapeNone: 'Forma: Nenhum',
            dragImageHere: 'Arraste Imagem ou Texto para cá',
            dropImage: 'Solte Imagem ou Texto',
            selectFromFiles: 'Selecione a partir dos arquivos',
            maximumFileSize: 'Tamanho máximo do arquivo',
            maximumFileSizeError: 'Tamanho máximo do arquivo excedido.',
            url: 'URL da imagem',
            remove: 'Remover Imagem',
            original: 'Original'
          },
          video: {
            video: 'Vídeo',
            videoLink: 'Link para vídeo',
            insert: 'Inserir vídeo',
            url: 'URL do vídeo?',
            providers: '(YouTube, Google Drive, Vimeo, Vine, Instagram, DailyMotion or Youku)'
          },
          link: {
            link: 'Link',
            insert: 'Inserir link',
            unlink: 'Remover link',
            edit: 'Editar',
            textToDisplay: 'Texto para exibir',
            url: 'Para qual URL este link leva?',
            openInNewWindow: 'Abrir em uma nova janela'
          },
          table: {
            table: 'Tabela',
            addRowAbove: 'Adicionar linha acima',
            addRowBelow: 'Adicionar linha abaixo',
            addColLeft: 'Adicionar coluna à esquerda',
            addColRight: 'Adicionar coluna à direita',
            delRow: 'Excluir linha',
            delCol: 'Excluir coluna',
            delTable: 'Excluir tabela'
          },
          hr: {
            insert: 'Linha horizontal'
          },
          style: {
            style: 'Estilo',
            p: 'Normal',
            blockquote: 'Citação',
            pre: 'Código',
            h1: 'Título 1',
            h2: 'Título 2',
            h3: 'Título 3',
            h4: 'Título 4',
            h5: 'Título 5',
            h6: 'Título 6'
          },
          lists: {
            unordered: 'Lista com marcadores',
            ordered: 'Lista numerada'
          },
          options: {
            help: 'Ajuda',
            fullscreen: 'Tela cheia',
            codeview: 'Ver código-fonte'
          },
          paragraph: {
            paragraph: 'Parágrafo',
            outdent: 'Menor tabulação',
            indent: 'Maior tabulação',
            left: 'Alinhar à esquerda',
            center: 'Alinhar ao centro',
            right: 'Alinha à direita',
            justify: 'Justificado'
          },
          color: {
            recent: 'Cor recente',
            more: 'Mais cores',
            background: 'Fundo',
            foreground: 'Fonte',
            transparent: 'Transparente',
            setTransparent: 'Fundo transparente',
            reset: 'Restaurar',
            resetToDefault: 'Restaurar padrão',
            cpSelect: 'Selecionar'
          },
          shortcut: {
            shortcuts: 'Atalhos do teclado',
            close: 'Fechar',
            textFormatting: 'Formatação de texto',
            action: 'Ação',
            paragraphFormatting: 'Formatação de parágrafo',
            documentStyle: 'Estilo de documento',
            extraKeys: 'Extra keys'
          },
          help: {
            'insertParagraph': 'Inserir Parágrafo',
            'undo': 'Desfazer o último comando',
            'redo': 'Refazer o último comando',
            'tab': 'Tab',
            'untab': 'Desfazer tab',
            'bold': 'Colocar em negrito',
            'italic': 'Colocar em itálico',
            'underline': 'Sublinhado',
            'strikethrough': 'Tachado',
            'removeFormat': 'Remover estilo',
            'justifyLeft': 'Alinhar à esquerda',
            'justifyCenter': 'Centralizar',
            'justifyRight': 'Alinhar à esquerda',
            'justifyFull': 'Justificar',
            'insertUnorderedList': 'Lista não ordenada',
            'insertOrderedList': 'Lista ordenada',
            'outdent': 'Recuar parágrafo atual',
            'indent': 'Avançar parágrafo atual',
            'formatPara': 'Alterar formato do bloco para parágrafo(tag P)',
            'formatH1': 'Alterar formato do bloco para H1',
            'formatH2': 'Alterar formato do bloco para H2',
            'formatH3': 'Alterar formato do bloco para H3',
            'formatH4': 'Alterar formato do bloco para H4',
            'formatH5': 'Alterar formato do bloco para H5',
            'formatH6': 'Alterar formato do bloco para H6',
            'insertHorizontalRule': 'Inserir Régua horizontal',
            'linkDialog.show': 'Inserir um Hiperlink'
          },
          history: {
            undo: 'Desfazer',
            redo: 'Refazer'
          },
          specialChar: {
            specialChar: 'CARACTERES ESPECIAIS',
            select: 'Selecionar Caracteres Especiais'
          }
        }
      });
    })(jQuery);
    /******/ 	return __webpack_exports__;
    /******/ })()
    ;
});
//# sourceMappingURL=summernote-pt-BR.js.map
