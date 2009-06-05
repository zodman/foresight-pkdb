/**
 * Dialog
 * Multi dialog control
 * ---
 *  Written by José Carlos Nieto Jarquín <xiam@astrata.com.mx>
 *
 * Copyright (c) 2007 Astrata Software S.A. de C.V.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @author          José Carlos Nieto Jarquín
 * @copyright       Copyright (c) 2007, Astrata Software S.A. de C.V.
 * @link            http://astrata.com.mx Astrata Open Source Projects
 * @version         $Revision: $
 * @modifiedby      $LastChangedBy: $
 * @lastmodified    $Date: $
 * @license         http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 */

var Dialog = new Class({
  
  'Implements': [ Control ],

  'initialize': function(el, options) {

    this.options = {
      'title':        ' ',
      'allowClose':   true,
      'startHidden':  false,
      'autoClose':    false,
      'width':        350,
      'height':       130,
      'onClose':      function() {},
      'onShow':       function() {},
      'onHide':       function() {}
    }

    if (!Dialog.trailFocus) {
      Dialog.trailFocus = [];
    }

    this.__buildComponents();  
    
    this.setOptions(options);

    if (this.options.buttons) {

      this.components.form = Widget.form({'method': 'post', 'action': 'index.php'});

      var form = this.components.form;

      var buttons = Widget.div({'class': 'm-buttons'});
      var defaultButton = null;
      
      for (var i in this.options.buttons) {

        var button = this.options.buttons[i];

        // creating button
        var buttel = Widget.button({
          'class':  button['default'] ? 'm-form-submit' : 'm-form-button',
          'type':   button['default'] ? 'submit' : 'button'
        }, button.caption);

        if (button['default']) {
          
          this.defaultButton = buttel;

          form.onsubmit = function(f) {
            f(this);
            return false;
          }.bind(this, [ button.onClick ]);

        } else {
          // adding events
          for (var prop in button) {
            if (prop.match(/^on.+/)) {
              buttel.addEvent(
                prop.replace(/^on/, '').toLowerCase(),
                button[prop].bind(this, [ this ])
              )
            }
          }
        }
        buttons.appendChild(buttel);
      }
      form.setContent(el);
      form.appendChild(buttons);
      el = form;
    }

    if (this.options.allowClose) {
      this.components.close = Widget.div({'class': 'm-close'}, Widget.fromHTML('&times;')); 
      this.addListener(
        this.components.close,
        'click',
        this.close
      );
      this.components.frame.appendChild(this.components.close);
    }

    this.setContent(el);

    this.hide();
   
    this.setTitle(this.options.title);

    document.body.appendChild(this.components.dialog);

    this.center();

    if (!this.options.startHidden) {
      this.show();
      this.focus();
    }

    if (this.options.autoClose) {
      this.addListener(
        document,
        'mousedown',
        this.__autoClose
      );
    }

    this.resizeTo(this.options.width, this.options.height);
    
    this.__bindEvents();
  },

  'focusInput': function(el) {
    if (el.nodeName.toLowerCase() == 'input') {
      if (Browser.Engine.gecko) {
        el.parentNode.style.overflow = 'auto';
      }
      el.blur();
      el.focus();
    }
  },

  '__caretFix': function(e) {
    e = new Event(e);
    this.focusInput(e.target);
  },

  '__bindEvents': function () {
    if (Browser.Engine.gecko) {
      this.element.addEvent(
        'mousedown',
        this.__caretFix.bindWithEvent(this)
      );
    }
  },

  '__autoClose': function(e) {
    e = new Event(e);

    var parent = e.target;

    while (parent) {
      if (parent == this.components.dialog) {
        return;
      }
      parent = parent.parentNode;
    }

    this.close();
  },

  '__buildComponents': function() {
    
    this.components = {
      'dialog': Widget.div({'class': 'm-dialog'}),
      'tL': Widget.div({'class': 'm-corner-tl'}),
      'tR': Widget.div({'class': 'm-corner-tr'}),
      'bL': Widget.div({'class': 'm-corner-bl'}),
      'bR': Widget.div({'class': 'm-corner-br'}),
      'frame': Widget.div({'class': 'm-frame'}),
      'title': Widget.div({'class': 'm-title'}),
      'body': Widget.div({'class': 'm-body'}),
      'foot': Widget.div({'class': 'm-foot'})
    };

    if (Browser.Engine.trident4) {
      this.components.dialog.className = 'm-select-hack m-dialog';
      this.components.dialog.appendChild(Widget.iframe({'class': 'm-ie-hack'}));
    }

    this.components.frame.appendChildren([
      this.components.tL,
      this.components.tR,
      this.components.bL,
      this.components.bR,
      this.components.title,
      this.components.body,
      this.components.foot
    ]);

    this.components.dialog.appendChild(this.components.frame);
    
    this.components.title.hide();
  },
  
  'close': function () {
    
    this.blur();
    
    Dialog.trailFocus.remove(this);

    if (Dialog.trailFocus.length) {
      var temp = Dialog.trailFocus.pop();
      temp.focus();
    }

    this.element.remove();
    
    this.components.dialog.dump();
    
    this.fireEvent('onClose');

    this.destroy();
  },

  'focus': function() {
    
    if (Dialog.focused) {
      Dialog.focused.blur();
    }
    
    this.components.dialog.setOnTop();
    this.components.dialog.className += ' m-active';
    
    Dialog.focused = this;
    Dialog.trailFocus.push(this);
    
    this.fireEvent('onFocus', this);
  },
  
  'blur': function() {
    
    if (Dialog.focused == this) {
      Dialog.focused = null;
    }

    this.components.dialog.className = this.components.dialog.className.replace('m-active', '');

    this.fireEvent('onBlur', this);
  },

  'setTitle': function(title) {
    this.components.title.show();
    this.components.title.setContent(title); 
  },

  'setContent': function(el) {
    this.element = Widget.div(null, el);
    this.components.body.setContent(this.element);
  }, 

  'show': function() {
   
    var inputs = [];

    inputs.extend(this.element.getElementsByTagName('input'));
    inputs.extend(this.element.getElementsByTagName('select'));
    inputs.extend(this.element.getElementsByTagName('textarea'));
    
    if (inputs) {
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != 'hidden') {
          try {
            inputs[i].focus();
          } catch(e) {
          
          }
          break;
        }
      }
    }

    this.components.dialog.show();
    this.fireEvent('onShow');
  },

  'hide': function() {
    this.components.dialog.hide();
    this.fireEvent('onHide');
  },

  'top': function() {
    this.components.dialog.style.top = '0px';
  },
  
  'left': function() {
    this.components.dialog.style.left = '0px';
  },
  
  'right': function() {
    this.components.dialog.style.left = 'auto';
    this.components.dialog.style.right = '0px';
  },

  'bottom': function() {
    this.components.dialog.style.top = 'auto';
    this.components.dialog.style.bottom = '0px';
  },

  'center': function(effect) {
    var x = Browser.pageScrollX()+((Browser.clientWidth() - this.components.dialog.offsetWidth)/2);
    var y = Browser.pageScrollY()+((Browser.clientHeight() - this.components.dialog.offsetHeight)/2);
    this.moveTo(y > 0 ? y : 0, x > 0 ? x : 0, effect);
  },

  'moveTo': function(top, left, effect) {
    if (effect == true) {
      Effect.moveTo(this.components.dialog, top, left, {
        'onComplete': this.__adjustToScreen.bind(this)
      });
    } else {
      this.components.dialog.moveTo(top, left);
      this.__adjustToScreen();
    }
  },

  '__adjustToScreen': function() {
    // screen adjustment
    //
    var box = this.components.dialog;
    var coord = box.getCoordinates();

    // bottom 
    var offset = coord.top + coord.height - (Browser.pageScrollY()+Browser.clientHeight() );
    if (offset > 0) {
      box.style.top = (coord.top - offset - 30) + 'px';
    }

    // right
    var offset = coord.left + coord.width - (Browser.pageScrollX()+Browser.clientWidth() );
    if (offset > 0) {
      box.style.left = (coord.left - offset - 30) + 'px';
    }
    
    // window is too small?
    var coord = box.getCoordinates();
    // top
    if (coord.top < 0) {
      box.style.top = (Browser.pageScrollY()+10)+'px';
    }
    // left
    if (coord.left < 0) {
      box.style.left = (Browser.pageScrollX()+10)+'px';
    }
  },

  'resizeTo': function(width, height, effect) {
    var offset = this.components.dialog.offsetHeight - this.components.body.offsetHeight;
    if (effect == true) {
      Effect.width(this.components.dialog, width);
      Effect.height(this.components.body, height - offset);
    } else {
      if (height >= offset) {
        this.components.dialog.style.width = width + 'px';
        this.components.body.style.height = (height - offset) + 'px';
      }
    }
  }

});

Dialog.alert = function(content, options) {
  if (!options) options = {};

  var dialog = new Dialog(
    content,
    {
      'title': options.title ? options.title : __('Alert'),
      'buttons': {
        'buttonOk': {
          'caption': __('Ok'),
          'default': 'true',
          'onClick': options.onOk ? options.onOk : function(dialog) { dialog.close() }
        }
      }
    }
  );

  dialog.center();

  dialog.defaultButton.focus();

  return dialog;
}

Dialog.question = function(content, options) {
  if (!options) options = {};
  
  var dialog = new Dialog(
    content,
    {
      'title': options.title ? options.title : __('Question'),
      'buttons': {
        'buttonNo': {
          'caption': __('No'),
          'onClick': options.onNo ? options.onNo    : function(dialog) { dialog.close(); }
        },
        'buttonYes': {
          'caption': __('Yes'),
          'default': true,
          'onClick': options.onYes ? options.onYes  : function(dialog) { dialog.close(); }
        }
      }
    }
  );

  dialog.center();

  return dialog;
}

Dialog.prompt = function(content, options) {
  if (!options) options = {};
  
  var input = Widget.input({'value': options['default'] || '', 'class': 'm-form-input', 'type': 'text', 'style': 'margin-top: 10px; width: 97%'});

  var content = Widget.div(null, [
    content,
    Widget.br(),
    input
  ]);

  var dialog = new Dialog(
    content,
    {
      'title': options.title ? options.title : __('Prompt'),
      'buttons': {
        'buttonCancel': {
          'caption': __('Cancel'),
          'onClick': options.onCancel ? options.onCancel : function(dialog) { dialog.close(); }
        },
        'buttonOk': {
          'caption': __('Ok'),
          'default': true,
          'onClick': options.onOk ? options.onOk : function(dialog) { dialog.close(); }
        }
      }
    }
  );

  dialog.input = input;

  dialog.center();

  input.focus();
  
  return dialog;
}


