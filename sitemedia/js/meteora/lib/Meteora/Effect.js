/** 
 * Effects
 * ---
 * Written by José Carlos Nieto <xiam@astrata.com.mx>
 *
 * Copyright (c) 2007-2009 Astrata Software S.A. de C.V.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @author          José Carlos Nieto
 * @copyright       Copyright (c) 2007-2009, Astrata Software S.A. de C.V.
 * @link            http://astrata.com.mx Astrata Open Source Projects
 * @version         $Revision: $
 * @modifiedby      $LastChangedBy: $
 * @lastmodified    $Date: $
 * @license         http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 */

var Effect = new Class({ 
  
  'Implements': [ Control ],

  /* Fx.Slide wrapper */
  '__FxSlide': function(callback, el, options) {
    el = $(el);
    var options = $extend(
      {}, options || {}
    );
    el.fxSlide = new Fx.Slide(el, options);
    el.fxSlide[callback]();
  },

  'slideToggle': function(el, options) {
    this.__FxSlide('toggle', el, options);
  },

  'slideIn': function(el, options) {
    this.__FxSlide('slideIn', el, options);
  },

  'slideOut': function(el, options) {
    this.__FxSlide('slideOut', el, options);
  },

  'slideShow': function(el, options) {
    this.__FxSlide('slideShow', el, options);
  },

  'slideHide': function(el, options) {
    this.__FxSlide('slideHide', el, options);
  },

  'moveTo': function(obj, top, left, options) {
    this.top(obj, top, {
      onComplete: function() {
        this.left(obj, left, options);
      }.bind(this, obj)
    });
  },

  'left': function(el, x, options) {
    var el = $(el);
    
    var options = $extend(
    {
      'duration': 200,
      'wait': false,
      'onStart': function() {},
      'onComplete': function() {}
    }, options || {}
    );

    var fx = new Fx.Morph(el, options);

    fx.start({
      'left': x
    });
  },
  
  'top': function(el, x, options) {
    var el = $(el);
    
    var options = $extend(
    {
      'duration': 200,
      'wait': false,
      'onStart': function() {},
      'onComplete': function() {}
    }, options || {}
    );

    var fx = new Fx.Morph(el, options);

    fx.start({
      'top': x
    });
  },


  'width': function(el, x, options) {
    var el = $(el);
    
    var options = $extend(
    {
      'duration': 200,
      'wait': false,
      'onStart': function() {},
      'onComplete': function() {}
    }, options || {}
    );

    var fx = new Fx.Morph(el, options);

    fx.start({
      'width': x
    });
  },

  'height': function(el, y, options) {
    var el = $(el);

    var options = $extend(
    {
      'duration': 200,
      'wait': false,
      'onStart': function() {},
      'onComplete': function() {}
    }, options || {}
    );

    var fx = new Fx.Morph(el, options);

    fx.start({
      'height': y
    });
  },

  'resizeTo': function(obj, x, y, options) {
    this.width(obj, x, {
      onComplete: function() {
        this.height(obj, y, options);
      }.bind(this, obj)
    });
  },

  'transform': function(ela, elb, options) {

    ela = $(ela);
    elb = $(elb);

    options = $extend({
      'duration': 200
    }, options);

    var copy = elb.getSize();

    this.width(ela, copy.size.x, options);
    this.height(ela, copy.size.y, options);
  },

  'pulsate': function(el, options) {

    var el = $(el);

    var options = $extend({
      'duration': 150,
      'startColor': '#FFFFFF',
      'endColor': '#FCFF7E',
      'onStart': function() {},
      'onComplete': function() {}
    }, options || {});


    var fx = new Fx.Morph(el, options);

    fx.start({
      'background-color': options.startColor
    }).chain(
      function() { this.start({ 'background-color': this.options.endColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.startColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.endColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.startColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.endColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.startColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.endColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.startColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.endColor }); } 
    ).chain(
      function() { this.start({ 'background-color': this.options.startColor }); } 
    );

  },

  'appear': function(el, options) {

    var el = $(el);

    var options = $extend({
      'startOpacity': 0,
      'endOpacity': 1
    }, options || {});

    el.setOpacity(options.startOpacity);
    el.show();

    this.fade(el, options);
  },

  'fade': function(el, options) {

    var el = $(el);

    var options = $extend(
    {
      'duration': 500,
      'wait': false,
      'startOpacity': 1,
      'endOpacity': 0,
      'onStart': function() {},
      'onComplete': function() {}
    }, options || {}
    );

    var fx = new Fx.Morph(el, options);

    el.setOpacity(options.startOpacity);

    fx.start({
      'opacity': options.endOpacity
    });
  },

  'drop': function(el, options) {
    var el = $(el);

    var options = $extend({
      'duration': 400,
      'onComplete': function() {}
    }, options || {});

    el.style.position = 'relative';

    var fx = new Fx.Morph(el, options);

    fx.start({
      'top':      [0, el.offsetHeight],
      'opacity':  [1, 0]
    }).chain(
      function(el) {
        el.style.position = '';
        el.style.top = '';
      }.bind(fx, el)
    );
  },

  'shake': function(el, options) {
    var el = $(el);

    var options = $extend({
      'duration': 100,
      'onComplete': function() {}
    }, options || {});

    el.style.position = 'relative';

    var fx = new Fx.Morph(el, options);

    fx.start({
      'left': -20
    }).chain(
      function() { this.start({ 'left': -20 }) }
    ).chain(
      function() { this.start({ 'left':  20 }) }
    ).chain(
      function() { this.start({ 'left': -20 }) }
    ).chain(
      function() { this.start({ 'left':  20 }) }
    ).chain(
      function() { this.start({ 'left': -20 }) }
    ).chain(
      function() { this.start({ 'left':  20 }) }
    ).chain(
      function() { this.start({ 'left':   0 }) }
    ).chain(
      function(el) {
        el.style.position = '';
      }.bind(fx, el)
    );
  },
  'shrink': function(el, options) {
    var el = $(el);

    var options = $extend({
      'onComplete': function() {}
    }, options || {});

    el.style.position = 'relative';

    var fx = new Fx.Morph(el, options);

    var w = el.offsetWidth;
    var h = el.offsetHeight;

    fx.start({
      'height':   [h, 0],
      'width':    [w, 0],
      'top':      [0, h/2],
      'left':     [0, w/2],
      'opacity':  [1, 0]
    }).chain(
      function(el) {
        el.style.position = '';
        el.style.top = '';
        el.style.left = '';
        el.style.width = '';
        el.style.height = '';
      }.bind(fx, el)
    );
  },
  
  'expand': function(el, width, height, options) {
    var el = $(el);

    var options = $extend({
      'duration': 500,
      'onComplete': function() {}
    }, options || {});

    el.style.position = 'relative';

    var fx = new Fx.Morph(el, options);

    var h = el.offsetHeight;
    var w = el.offsetWidth;

    fx.start({
      'height':   [h, height],
      'width':    [w, width],
      'top':      [0, -1*(height/2-h/2)],
      'left':     [0, -1*(width/2-w/2)]
    });
  },

  'puff': function(el, options) {
    var el = $(el);

    var options = $extend({
      'onComplete': function() {},
      'onStart': function() {}
    }, options || {});

    el.style.position = 'relative';

    var fx = new Fx.Morph(el, options);

    var w = el.offsetWidth;
    var h = el.offsetHeight;

    fx.start({
      'height':   [h, h*2],
      'width':    [w, w*2],
      'top':      [0, -1*h/2],
      'left':     [0, -1*w/2],
      'opacity':  [1, 0]
    }).chain(
      function(el) {
        el.style.position = '';
        el.style.top = '';
        el.style.left = '';
        el.style.width = '';
        el.style.height = '';
      }.bind(fx, el)
    );

  },

  '__guessColor': function(el, color) {
    if (!color) {
      color = '#ffffff';
    }
    var curr = el.style.backgroundColor;
    if (curr.match(/^#[0-9a-f]{6}$/i)) {
      color = curr;
    } else if (curr.match(/^rgb\([0-9,\s]+\)$/)) {
      color = curr.rgbToHex();
    } else if (curr.match(/^#([0-9a-f]{3})$/i)) {
      color = '#'+curr.substr(1, 1)+curr.substr(1, 1)+curr.substr(2, 1)+curr.substr(2, 1)+curr.substr(3, 1)+curr.substr(3, 1);
    }
    return color;
  },

  'highlight': function(el, options) {

    var el = $(el);

    var options = $extend({
      'duration':     900,
      'wait':         false,
      'startColor':   this.__guessColor(el, '#ffffff'),
      'endColor':     '#FCFF7E',
      'onStart':      function() {},
      'onComplete':   function() {}
    }, options || {});
    
    var fx = new Fx.Morph(el, options);

    el.style.backgroundColor = options.startColor;

    fx.start({
      'background-color': options.endColor
    }).chain(
      function() {
        this.start({ 'background-color': this.options.startColor });
      }
    );
  }
});

var Effect = new Effect();