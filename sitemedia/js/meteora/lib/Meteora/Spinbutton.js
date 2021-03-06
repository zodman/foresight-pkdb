/*
 * Spinbutton
 * ---
 * Written by Diego Carrera <diego@astrata.com.mx>
 * Rewritten by José Carlos Nieto <xiam@astrata.com.mx>
 *
 * Copyright (c) 2007-2009 Astrata Software S.A. de C.V.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @author          Diego Carrera
 * @author          José Carlos Nieto
 * @copyright       Copyright (c) 2007-2009, Astrata Software S.A. de C.V.
 * @link            http://astrata.com.mx Astrata Open Source Projects
 * @version         $Revision: $
 * @modifiedby      $LastChangedBy: $
 * @lastmodified    $Date: $
 * @license         http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 */

var Spinbutton = new Class({
  
  'Implements': [ Control ],
    
  'options': {
    'values':       null,
    'minValue':     0,
    'maxValue':     100,
    'step':         1,
    'cycle':        true,
    'precition':    1,
    'defaultValue': 1,
    'onChange':     function() {}
  },

  'initialize': function (el, options) {

    this.setMainElement(el);

    // overwriting options
    if (options.values && !options.maxValue && !options.minValue) {
      options.maxValue  = options.values.length - 1;
      options.minValue  = 0;
    }

    if (!options.precition) {
      if (options.step && options.step.toString().match(/\./)) {
        options.precition = options.step.toString();
        options.precition = options.precition.replace(/^.+\./, '');
        options.precition = options.precition.length;
      }
    }

    if (!options.defaultValue) {
      options.defaultValue = this.element.value;
    }

    if (options.onChange) {
      options.onChange = options.onChange.bind(null, this.element);
    }

    // setting options
    this.setOptions(options);

    this.__buildComponents();
    this.__bindEvents();

    this.setValue(this.options.defaultValue);

    this.stop();
  },
 
  '__inputKeyDown': function(e) {
    var e = new Event(e);
    switch (e.key) {
      case 'up':  
        this.up();
      break;
      case 'down':
        this.down();
      break;
    }
  },

  '__buildComponents': function() {

    this.clone = this.element.clone(true);

    this.components = {
      'frame':      Widget.table({'class': 'm-spinbutton'}),
      'buttonUp':   Widget.img({'class': 'increase', src: $meteora['mediaDir']+'spinbutton/spin-up.png'}),
      'buttonDown': Widget.img({'class': 'decrease', src: $meteora['mediaDir']+'spinbutton/spin-down.png'})
    };
    
    this.components.frame.appendChild(
      Widget.tbody(null,
        Widget.tr(null,
          [
            Widget.td(null, this.clone),
            Widget.td(
              {'class': 'buttons'},
              [
                this.components.buttonUp,
                this.components.buttonDown
              ]
            )
          ]
        )
      )
    );

    this.element.parentNode.insertBefore(this.components.frame, this.element);

    this.clone.setProperty('readonly', 'readonly');

    this.element.hide();
  },

  'stop': function() {
    this.interval = 500;
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  },
  
  'up': function(keep) {
    this.factor = 1;
    this.step(keep);
  },

  'down': function(keep) {
    this.factor = -1;
    this.step(keep);
  },

  '__bindEvents': function() {

    this.addListener(
      this.clone,
      'keydown',
      this.__inputKeyDown
    );

    this.addListener(
      this.clone,
      'keyup',
      this.stop
    );

    this.addListener(
      this.clone,
      'blur',
      this.stop
    );
    
    this.addListener(
      this.components.buttonUp,
      'mousedown',
      this.up.bind(this, true)
    );

    this.addListener(
      this.components.buttonDown,
      'mousedown',
      this.down.bind(this, true)
    );

    this.addListener(
      document.body,
      'mouseup',
      this.stop
    );

  },

  'setValue': function(value) {
    var value = new Number(value);
    if (value >= this.options.minValue && value <= this.options.maxValue) {
      
      if (value.toString().match(/\./)) {
        value = value.toFixed(this.options.precition);
      }
      value = value.toString();

      this.element.value  = value;
      this.clone.value    = this.options.values ? $pick(this.options.values[value], value) : value;
    }
  },

  'getValue': function() {
    return new Number(this.element.value);
  },

  'step': function(keep) {

    var val = new Number(this.element.value);

    val = val + this.options.step * this.factor;

    if (val > this.options.maxValue) {
      if (this.options.cycle) {
        val = this.options.minValue;
      } else {
        val = this.options.maxValue;
      }
    }

    if (val < this.options.minValue) {
      if (this.options.cycle) {
        val = this.options.maxValue;
      } else {
        val = this.options.minValue;
      }
    }

    if (this.options.onChange) {
      this.options.onChange(this.element);
    }
    
    this.setValue(val);

    this.interval -= Math.ceil(this.interval/6);

    this.fireEvent('onChange');

    if (this.element.onchange) {
      this.element.onchange(this.element);
    }

    if (keep) {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(this.step.bind(this, true), this.interval);
    }
  }
});

// deprecated
var spinButton = Spinbutton;
var SpinButton = Spinbutton;