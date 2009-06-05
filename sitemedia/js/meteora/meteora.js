/**
 * Meteora
 * Script autoloader
 * ---
 * Written by José Carlos Nieto <xiam@astrata.com.mx>
 *
 * Copyright (c) 2007 Astrata Software S.A. de C.V.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @author          José Carlo Nieto
 * @copyright       Copyright (c) 2007, Astrata Software S.A. de C.V.
 * @link            http://astrata.com.mx Astrata Open Source Projects
 * @version         $Revision: $
 * @modifiedby      $LastChangedBy: $
 * @lastmodified    $Date: $
 * @license         http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 */

/**
 * Credits:
 *  Meteora is based on MooTools
 *
 * License:
 *  MIT-style license.
 *
 * MooTools Copyright:
 *  copyright (c) 2007 Valerio Proietti, <http://mad4milk.net>
*/

/**
 * Dependency list
 * */

var dependencies = {
  'Core': {
    'Core':
      [],
    'Browser':
      []
  },
  'Native': {
    'Array':
      [],
    'Function':
      [],
    'Number':
      [],
    'String':
      [],
    'Hash':
      [],
    'Event':
      [
        'Core.Browser',
        'Native.Array',
        'Native.Function',
        'Native.Number',
        'Native.String',
        'Native.Hash'
      ]
  },
  'Class': {
    'Class':
      [
        'Native.Array',
        'Native.Function',
        'Native.Number',
        'Native.String',
        'Native.Hash'
      ],
    'Extras':
      [
        'Class.Class'
      ]
  },
  'Drag': {
    'Drag': [
      'Element.Element'
    ],
    'Move': [
      'Drag.Drag',
      'Element.Dimensions'
    ]
  },
  'Element': {
    'Element':
      [
        'Core.Browser',
        'Native.Array',
        'Native.Function',
        'Native.Number',
        'Native.String',
        'Native.Hash'
      ],
    'Event':
      [
        'Element.Element',
        'Native.Event'
      ],
    'Style':
      [
        'Element.Element'
      ],
    'Dimensions':
      [
        'Element.Element'
      ]
  },
  'Utilities': {
    'Selectors':
      [
        'Element.Element'
      ],
    'DomReady':
      [
        'Element.Event'
      ],
    'JSON':
      [
        'Native.Array',
        'Native.Function',
        'Native.Number',
        'Native.String',
        'Native.Hash'
      ],
    'Cookie':
      [
        'Class.Extras'
      ],
    'Swiff':
      [
        'Class.Extras'
      ]
  },
  'Fx': {
    'Fx':
      [
        'Class.Extras'
      ],
    'CSS':
      [
        'Fx.Fx',
        'Class.Extras',
        'Element.Style'
      ],
    'Tween':
      [
        'Fx.CSS'
      ],
    'Scroll':
      [
        'Fx.Fx'
      ],
    'Slide':
      [
        'Fx.Fx'
      ],
    'Morph':
      [
        'Fx.CSS'
      ],
    'Transitions':
      [
        'Fx.Fx'
      ]
  },
  'Request': {
    'Request':
      [
        'Element.Element',
        'Class.Extras'
      ],
    'HTML':
      [
        'Request.Request'
      ],
    'JSON':
      [
        'Utilities.JSON',
        'Request.Request'
      ]
  },
  'Meteora': {
    'Autocomplete': 
      [
        'Meteora.Meteora',
        'Meteora.Jsonrpc',
        'Meteora.Toolbox',
        'Element.Dimensions'
      ]
    ,
    'Bubble': 
      [
        'Meteora.Meteora',
        'Element.Dimensions'
      ],
    'Calendar': 
      [
        'Meteora.Meteora',
        'Meteora.Toolbox',
        'Meteora.Spinbutton'
      ],
    'Carousel': 
      [
        'Meteora.Meteora',
        'Element.Dimensions',
        'Fx.Transitions',
        'Fx.Morph'
      ],
    'Datagrid':
      [
        'Meteora.Meteora',
        'Meteora.Tablesort'
      ],
    'Dialog':
      [
        'Meteora.Meteora',
        'Element.Dimensions',
        'Drag.Move'
      ],
    'Dock': 
      [
        'Meteora.Meteora'
      ],
    'Editor':
      [
        'Meteora.Meteora',
        'Meteora.Notebook',
        'Meteora.Dialog'
      ],
    'Effect': 
      [
        'Fx.Morph',
        'Fx.Slide',
        'Element.Dimensions'
      ],
    'Filebrowser': 
      [
        'Meteora.Meteora'
      ],
    'Form':
      [
        'Meteora.Meteora',
        'Meteora.Jsonrpc',
        'Meteora.Bubble'
      ],
    'Jsonrpc':
      [
        'Meteora.Meteora',
        'Request.HTML'
      ],
    'Menu': 
      [
        'Meteora.Meteora'
      ],
    'Meteora':
      [
        'Utilities.DomReady',
        'Request.HTML',
        'Core.Browser',
        'Element.Element',
        'Element.Style',
        'Element.Event'
      ],
    'Notebook': 
      [
        'Fx.Scroll',
        'Meteora.Meteora',
        'Meteora.Dialog'
      ],
    'Searchlist':
      [
        'Meteora.Meteora'
      ],
    'Selection':
      [
        'Meteora.Meteora',
        'Drag.Move'
      ],
    'Picbox': 
      [
        'Meteora.Meteora',
        'Meteora.Dialog',
        'Meteora.Effect'
      ],
    'Popup': 
      [
        'Meteora.Meteora',
        'Meteora.Dialog',
        'Meteora.Dock'
      ],
    'Panel': 
      [
        'Meteora.Meteora'
      ],
    'Spinbutton': 
      [
        'Meteora.Meteora'
      ],
    'Tablesort': 
      [
        'Meteora.Meteora'
      ],
    'Textprediction': 
      [
        'Meteora.Meteora',
        'Meteora.Jsonrpc'
      ],
    'Treeview': 
      [
        'Meteora.Meteora',
        'Element.Dimensions',
        'Fx.Scroll'
      ],
    'Toolbox': 
      [
        'Meteora.Meteora',
        'Drag.Move'
      ]
  },
  'Plugins': {
    'Sortables':
      [
        'Drag.Move'
      ]
  }
}

// Meteora variables
var $meteora = {
  'root':       '/',
  'lang':       'en',
  'theme':      'default',
  'hacks':      'ie6',
  'mediaDir':   '/media/',
  'cssDir':     '/css/',
  'themesDir':  '/themes/',
  'libDir':     '/',
  'scripts':    {}
}

var loadScript = function(src) {
  src = $meteora['libDir']+src;
  document.write('<script type="text/javascript" src="'+src+'"></script>');
}

var wonderNerdPowersActivate = function() {
  var scripts = document.getElementsByTagName('script');

  // Guessing webroot and setting variables
  for (var i = scripts.length - 1; i >= 0; i--) {
    var m = scripts[i].src.match(/(.*)meteora.js\??(.+?)?$/);
    if (m) {
      if (m[2]) {
        var parse = m[2].match(/[a-z0-9]+=[^&]+/g);
        for (var j = parse.length - 1; j >= 0; j--) {
          var n = parse[j].match(/^([^=]+)=(.+)$/);
          $meteora[n[1]] = n[2];
        }
      }
      $meteora.root       = m[1];
      $meteora.libDir     = $meteora['root']+'lib/';
      $meteora.cssDir     = $meteora['root']+'css/';
      $meteora.themesDir  = $meteora['root']+'themes/';
      $meteora.mediaDir   = $meteora['root']+'media/';
    }
  }

  loadScript('../lang/'+$meteora['lang']+'.js');

  $lib('Meteora.Meteora');
}


/**
 * Loads a library and all its dependencies. Useful only the first time it's called.
 * @author xiam
 * @param name Library name.
 * */
var $lib = function(name, resolve) {
  
  // compatibility
  if (name == 'Core.Jsonrpc') {
    name = 'Meteora.Jsonrpc'; 
  }
  if (name == 'Fx.Visual') {
    name = 'Meteora.Effect';
  }

  // compatibility
  name = name.replace(/^Control\./, 'Meteora\.');
  name = name.replace(/^Plugin\./,  'Plugins\.');

  var load = { 'Core.Core': true };

  var scripts = $meteora.scripts;

  // Nope.
  var path = name.match(/^([^\.]+)\.(.*?)$/);

  // Checking dependencies of the script.
  if (dependencies[path[1]] && dependencies[path[1]][path[2]]) {

    var deps = dependencies[path[1]][path[2]];

    if (deps) {
      var i = 0;
      for (i = 0; i < deps.length; i++) {
        var dep = '';
        for (dep in $lib(deps[i], true)) {
          load[dep] = true;
        }
        load[deps[i]] = true;
      }
      // Pushing the requested script after all its dependencies.
      load[name] = true;
    }
  } else {
    alert(name+' Unknown dependency.');
  }

  if (resolve == true) {
    return load;
  } else {

    var list    = [];

    var script  = '';
    for (script in load) {
      if (!scripts[script]) {
        list.push(script);
        scripts[script] = true;
      }
    }

    if (document.jscompressor) {
      list = list.join(',');
      if (list) {
        document.write('<script type="text/javascript" src="'+document.jscompressor+'?src='+list+'"></script>');
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        loadScript(list[i].replace(/\./, '/')+'.js');
      }
    }

  }
}


/*
  xiam summons Meteora.
  It's supper effective!
*/
wonderNerdPowersActivate();
