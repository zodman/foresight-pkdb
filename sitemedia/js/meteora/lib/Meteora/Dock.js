/**
 * Dock
 * An useful dock to store things
 * ---
 *  Written by José Carlos Nieto Jarquín <xiam@astrata.com.mx>
 *
 * Copyright (c) 2007-2009 Astrata Software S.A. de C.V.
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

var Dock = new Class({
  
  'Implements': [ Control ],
  
  'items': {},

  'initialize': function() {
    this.__buildComponents();
    this.autoHide();
  },
  '__buildComponents': function() {
    this.element = Widget.div({'class': 'm-dock'});
    document.body.appendChild(this.element);
  },
  'addItem': function(title, callback) {
    var button = Widget.button({'class': 'm-form-button', 'type': 'button'}, Widget.fromHTML(title)); 
    this.element.appendChild(button);
    button.addEvent(
      'mouseup',
      this.removeItem.bind(this, button)
    );
    button.addEvent(
      'mouseup',
      callback
    );
    this.autoHide();
  },
  'show': function() {
    this.element.show();
    this.element.setOnTop();
  },
  'hide': function() {
    this.element.hide();
  },
  'autoHide': function() {
    if (this.buttonCount() > 0) {
      this.show();
    } else {
      this.hide();
    }
  },
  'buttonCount': function() {
    var buttons = 0;
    for (var i = 0; i < this.element.childNodes.length; i++) {
      var el = this.element.childNodes[i];
      if ($type(el) == 'element' && el.nodeName.toLowerCase() == 'button') {
        buttons++;
      }
    }
    return buttons;
  },
  'removeItem': function(item) {
    item.dump();
    this.autoHide();
  }
});

