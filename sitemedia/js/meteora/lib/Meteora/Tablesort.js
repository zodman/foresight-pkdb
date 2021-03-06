/**
 * Tablesort
 * ---
 * Written by José Carlos Nieto <xiam@astrata.com.mx>
 * Copyright (c) 2007-2009 Astrata Software S.A. de C.V.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @author          Josué G. Gutiérrez
 * @copyright       Copyright (c) 2007-2009, Astrata Software S.A. de C.V.
 * @link            http://astrata.com.mx Astrata Open Source Projects
 * @version         $Revision: $
 * @modifiedby      $LastChangedBy: $
 * @lastmodified    $Date: $
 * @license         http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 */
var Tablesort = new Class({
  
  'Implements': [ Control ],
  
  '__sortFactor': -1,

  '__bindEvents': function() {
    var el = this.element;

    var thead = el.getElementsByTagName('thead');

    if (thead) {
      thead = thead[0];
      this.addListener(
        thead,
        'click',
        this.__headClick
      );
    } else {
      log('Missing <thead> element.');
    }

  },

  '__headClick': function(e) {
    e = new Event(e);

    var td = $(e.target).findParentWithName('th');

    if (td == null) {
      var td = $(e.target).findParentWithName('td');
    }

    if (td) {
      // left offset 
      var sister = td.previousSibling;
      var offset = 0;
      while (sister) {
        if ($type(sister) == 'element') {
          offset++;
        }
        sister = sister.previousSibling;
      }
      // inverted sortFactor
      this.__sortFactor = this.__sortFactor > 0 ? -1 : 1;
      this.__sortOffset = offset;
      this.__sortKey = null;

      this.__sort();
    }

  },
  
  '__sort': function() {
    
    // building a list of items to be sorted
    var elements = new Array();
    var tbody = this.element.getElementsByTagName('tbody');
    
    if (tbody) {
      tbody = tbody[0];
      var rows = tbody.getElementsByTagName('tr');
      
      for (var i = 0; i < rows.length; i++) {
        // shifting to offset
        var row = rows[i];
        if ($type(row) == 'element') {
          var tds = row.getElementsByTagName('td');
          var sister = row.childNodes[0];
          var j = 0;
          while (sister) {
            if ($type(sister) == 'element') {
              j++; 
            }
            if (j == this.__sortOffset + 1) {
              var el = {
                'string': this.options.sortString(sister),
                'element': sister,
                'row': i
              }
              elements.push(el);
              break;
            }
            sister = sister.nextSibling;
          }
        }
      }

      var rowscopy = new Array();
      for (var i = 0; i < rows.length; i++) {
        rowscopy.push(rows[i]);
      }
      rows = rowscopy;

      var sorted = elements.sort(this.options.sortMethod.bind(this));

      for (var row = 0; row < sorted.length; row++) {
        var curr = sorted[row];
        var rowb = rows[curr['row']];
        tbody.appendChild(rowb);
      }

    }
  },

  'getValue': function(s) {
    s = s.trim();
    if (s.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)) {
      var m = s.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
      s = m[0].replace(/[^0-9]/g, '');
      s = parseInt(s);
    } else if (s.match(/^[+-]?\$?[0-9\.,]+%?/)) {
      s = s.replace(/\s.*/);
      s = parseFloat(s.replace(/[^\.0-9\-]/g, ''));
    } else if (s.match(/^\(\$[0-9\.,]+%?\)/)) {
      s = s.replace(/\s.*/);
      s = parseFloat(s.replace(/[^\.0-9\-]/g, ''))*-1;
    } else {
      s = this.__cleanString(s);
    }
    return s;
  },

  'sortString': function(el) {
    return el.innerHTML.replace(/<[^>]+>/g, '');
  },

  '__cleanString': function(str) {
    str = str.replace(/[áÁàÀ]/g, 'a');
    str = str.replace(/[éÉèÈ]/g, 'e');
    str = str.replace(/[íÍìÌ]/g, 'i');
    str = str.replace(/[óÓòÒ]/g, 'o');
    str = str.replace(/[úÚùÙ]/g, 'u');
    str = str.replace(/[ñÑ]/g, 'n');
    str = str.replace(/[Çç]/g, 'c');
    return str.toLowerCase();
  },

  'sortMethod': function(a, b) {

    var stra = this.getValue(a['string']);
    var strb = this.getValue(b['string']);
   
    if (stra < strb) {
      return 1*this.__sortFactor;
    } else if (stra > strb) {
      return -1*this.__sortFactor;
    } else {
      return 0;
    }
  },

  '__start': function() {
    if ($(this.element)) {
      this.__bindEvents();
      window.clearInterval(this.__startInterval);
    }
  },

  'initialize': function(el, options) {
    
    this.element = $(el);
    this.element.control = this;

    this.options = {
      'sortMethod': this.sortMethod.bind(this),
      'sortString': this.sortString.bind(this)
    }

    this.setOptions(options);

    this.__startInterval = window.setInterval(this.__start.bind(this), 1000);
  }

});

Meteora.onStart(
  function() {
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      if (table.className && table.className.match(/meteora-tablesort/)) {
        new Tablesort(table);
      }
    }
  }
);


