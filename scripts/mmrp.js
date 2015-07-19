;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

if (!L.mapbox) throw new Error('include mapbox.js before mmrp.js');

L.mmrp = require('./src/directions');
L.mmrp.format = require('./src/format');
L.mmrp.layer = require('./src/layer');
L.mmrp.inputControl = require('./src/input_control');
L.mmrp.errorsControl = require('./src/errors_control');
L.mmrp.routesControl = require('./src/routes_control');
L.mmrp.instructionsControl = require('./src/instructions_control');
L.mmrp.tracksControl = require('./src/tracks_control.js');

},{"./src/directions":9,"./src/errors_control":10,"./src/format":11,"./src/input_control":12,"./src/instructions_control":13,"./src/layer":14,"./src/routes_control":16,"./src/tracks_control.js":18}],2:[function(require,module,exports){
!function(){
  var d3 = {version: "3.4.1"}; // semver
var d3_arraySlice = [].slice,
    d3_array = function(list) { return d3_arraySlice.call(list); }; // conversion for NodeLists

var d3_document = document,
    d3_documentElement = d3_document.documentElement,
    d3_window = window;

// Redefine d3_array if the browser doesn’t support slice-based conversion.
try {
  d3_array(d3_documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = function(list) {
    var i = list.length, array = new Array(i);
    while (i--) array[i] = list[i];
    return array;
  };
}
var d3_subclass = {}.__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(object, prototype) {
  object.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(object, prototype) {
  for (var property in prototype) object[property] = prototype[property];
};

function d3_vendorSymbol(object, name) {
  if (name in object) return name;
  name = name.charAt(0).toUpperCase() + name.substring(1);
  for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
    var prefixName = d3_vendorPrefixes[i] + name;
    if (prefixName in object) return prefixName;
  }
}

var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];

function d3_selection(groups) {
  d3_subclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return n.querySelectorAll(s); },
    d3_selectMatcher = d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")],
    d3_selectMatches = function(n, s) { return d3_selectMatcher.call(n, s); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0] || null; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
  d3_selectMatches = Sizzle.matchesSelector;
}

d3.selection = function() {
  return d3_selectionRoot;
};

var d3_selectionPrototype = d3.selection.prototype = [];


d3_selectionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      group,
      node;

  selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i, j));
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selector(selector) {
  return typeof selector === "function" ? selector : function() {
    return d3_select(selector, this);
  };
}

d3_selectionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      node;

  selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
        subgroup.parentNode = node;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selectorAll(selector) {
  return typeof selector === "function" ? selector : function() {
    return d3_selectAll(selector, this);
  };
}
var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
    var i = name.indexOf(":"),
        prefix = name;
    if (i >= 0) {
      prefix = name.substring(0, i);
      name = name.substring(i + 1);
    }
    return d3_nsPrefix.hasOwnProperty(prefix)
        ? {space: d3_nsPrefix[prefix], local: name}
        : name;
  }
};

d3_selectionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {

    // For attr(string), return the attribute value for the first node.
    if (typeof name === "string") {
      var node = this.node();
      name = d3.ns.qualify(name);
      return name.local
          ? node.getAttributeNS(name.space, name.local)
          : node.getAttribute(name);
    }

    // For attr(object), the object specifies the names and values of the
    // attributes to set or remove. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.each(d3_selection_attr(value, name[value]));
    return this;
  }

  return this.each(d3_selection_attr(name, value));
};

function d3_selection_attr(name, value) {
  name = d3.ns.qualify(name);

  // For attr(string, null), remove the attribute with the specified name.
  function attrNull() {
    this.removeAttribute(name);
  }
  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  // For attr(string, string), set the attribute with the specified name.
  function attrConstant() {
    this.setAttribute(name, value);
  }
  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

  // For attr(string, function), evaluate the function for each element, and set
  // or remove the attribute as appropriate.
  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttribute(name);
    else this.setAttribute(name, x);
  }
  function attrFunctionNS() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttributeNS(name.space, name.local);
    else this.setAttributeNS(name.space, name.local, x);
  }

  return value == null
      ? (name.local ? attrNullNS : attrNull) : (typeof value === "function"
      ? (name.local ? attrFunctionNS : attrFunction)
      : (name.local ? attrConstantNS : attrConstant));
}
function d3_collapse(s) {
  return s.trim().replace(/\s+/g, " ");
}
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

d3_selectionPrototype.classed = function(name, value) {
  if (arguments.length < 2) {

    // For classed(string), return true only if the first node has the specified
    // class or classes. Note that even if the browser supports DOMTokenList, it
    // probably doesn't support it on SVG elements (which can be animated).
    if (typeof name === "string") {
      var node = this.node(),
          n = (name = d3_selection_classes(name)).length,
          i = -1;
      if (value = node.classList) {
        while (++i < n) if (!value.contains(name[i])) return false;
      } else {
        value = node.getAttribute("class");
        while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
      }
      return true;
    }

    // For classed(object), the object specifies the names of classes to add or
    // remove. The values may be functions that are evaluated for each element.
    for (value in name) this.each(d3_selection_classed(value, name[value]));
    return this;
  }

  // Otherwise, both a name and a value are specified, and are handled as below.
  return this.each(d3_selection_classed(name, value));
};

function d3_selection_classedRe(name) {
  return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
}

function d3_selection_classes(name) {
  return name.trim().split(/^|\s+/);
}

// Multiple class names are allowed (e.g., "foo bar").
function d3_selection_classed(name, value) {
  name = d3_selection_classes(name).map(d3_selection_classedName);
  var n = name.length;

  function classedConstant() {
    var i = -1;
    while (++i < n) name[i](this, value);
  }

  // When the value is a function, the function is still evaluated only once per
  // element even if there are multiple class names.
  function classedFunction() {
    var i = -1, x = value.apply(this, arguments);
    while (++i < n) name[i](this, x);
  }

  return typeof value === "function"
      ? classedFunction
      : classedConstant;
}

function d3_selection_classedName(name) {
  var re = d3_selection_classedRe(name);
  return function(node, value) {
    if (c = node.classList) return value ? c.add(name) : c.remove(name);
    var c = node.getAttribute("class") || "";
    if (value) {
      re.lastIndex = 0;
      if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
    } else {
      node.setAttribute("class", d3_collapse(c.replace(re, " ")));
    }
  };
}

d3_selectionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {

    // For style(object) or style(object, string), the object specifies the
    // names and values of the attributes to set or remove. The values may be
    // functions that are evaluated for each element. The optional string
    // specifies the priority.
    if (typeof name !== "string") {
      if (n < 2) value = "";
      for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
      return this;
    }

    // For style(string), return the computed style value for the first node.
    if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);

    // For style(string, string) or style(string, function), use the default
    // priority. The priority is ignored for style(string, null).
    priority = "";
  }

  // Otherwise, a name, value and priority are specified, and handled as below.
  return this.each(d3_selection_style(name, value, priority));
};

function d3_selection_style(name, value, priority) {

  // For style(name, null) or style(name, null, priority), remove the style
  // property with the specified name. The priority is ignored.
  function styleNull() {
    this.style.removeProperty(name);
  }

  // For style(name, string) or style(name, string, priority), set the style
  // property with the specified name, using the specified priority.
  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  // For style(name, function) or style(name, function, priority), evaluate the
  // function for each element, and set or remove the style property as
  // appropriate. When setting, use the specified priority.
  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant);
}

d3_selectionPrototype.property = function(name, value) {
  if (arguments.length < 2) {

    // For property(string), return the property value for the first node.
    if (typeof name === "string") return this.node()[name];

    // For property(object), the object specifies the names and values of the
    // properties to set or remove. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.each(d3_selection_property(value, name[value]));
    return this;
  }

  // Otherwise, both a name and a value are specified, and are handled as below.
  return this.each(d3_selection_property(name, value));
};

function d3_selection_property(name, value) {

  // For property(name, null), remove the property with the specified name.
  function propertyNull() {
    delete this[name];
  }

  // For property(name, string), set the property with the specified name.
  function propertyConstant() {
    this[name] = value;
  }

  // For property(name, function), evaluate the function for each element, and
  // set or remove the property as appropriate.
  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) delete this[name];
    else this[name] = x;
  }

  return value == null
      ? propertyNull : (typeof value === "function"
      ? propertyFunction : propertyConstant);
}

d3_selectionPrototype.text = function(value) {
  return arguments.length
      ? this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.textContent = v == null ? "" : v; } : value == null
      ? function() { this.textContent = ""; }
      : function() { this.textContent = value; })
      : this.node().textContent;
};

d3_selectionPrototype.html = function(value) {
  return arguments.length
      ? this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.innerHTML = v == null ? "" : v; } : value == null
      ? function() { this.innerHTML = ""; }
      : function() { this.innerHTML = value; })
      : this.node().innerHTML;
};

d3_selectionPrototype.append = function(name) {
  name = d3_selection_creator(name);
  return this.select(function() {
    return this.appendChild(name.apply(this, arguments));
  });
};

function d3_selection_creator(name) {
  return typeof name === "function" ? name
      : (name = d3.ns.qualify(name)).local ? function() { return this.ownerDocument.createElementNS(name.space, name.local); }
      : function() { return this.ownerDocument.createElementNS(this.namespaceURI, name); };
}

d3_selectionPrototype.insert = function(name, before) {
  name = d3_selection_creator(name);
  before = d3_selection_selector(before);
  return this.select(function() {
    return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
  });
};

// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
d3_selectionPrototype.remove = function() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  });
};
function d3_class(ctor, properties) {
  try {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  } catch (e) {
    ctor.prototype = properties;
  }
}

d3.map = function(object) {
  var map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_class(d3_Map, {
  has: d3_map_has,
  get: function(key) {
    return this[d3_map_prefix + key];
  },
  set: function(key, value) {
    return this[d3_map_prefix + key] = value;
  },
  remove: d3_map_remove,
  keys: d3_map_keys,
  values: function() {
    var values = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  },
  entries: function() {
    var entries = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f) {
    for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this[key]);
  }
});

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_prefixCode = d3_map_prefix.charCodeAt(0);

function d3_map_has(key) {
  return d3_map_prefix + key in this;
}

function d3_map_remove(key) {
  key = d3_map_prefix + key;
  return key in this && delete this[key];
}

function d3_map_keys() {
  var keys = [];
  this.forEach(function(key) { keys.push(key); });
  return keys;
}

function d3_map_size() {
  var size = 0;
  for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
  return size;
}

function d3_map_empty() {
  for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
  return true;
}

d3_selectionPrototype.data = function(value, key) {
  var i = -1,
      n = this.length,
      group,
      node;

  // If no value is specified, return the first value.
  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);
    while (++i < n) {
      if (node = group[i]) {
        value[i] = node.__data__;
      }
    }
    return value;
  }

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        updateNodes = new Array(m),
        enterNodes = new Array(m),
        exitNodes = new Array(n),
        node,
        nodeData;

    if (key) {
      var nodeByKeyValue = new d3_Map,
          dataByKeyValue = new d3_Map,
          keyValues = [],
          keyValue;

      for (i = -1; ++i < n;) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[i] = node; // duplicate selection key
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m;) {
        keyValue = key.call(groupData, nodeData = groupData[i], i);
        if (node = nodeByKeyValue.get(keyValue)) {
          updateNodes[i] = node;
          node.__data__ = nodeData;
        } else if (!dataByKeyValue.has(keyValue)) { // no duplicate data key
          enterNodes[i] = d3_selection_dataNode(nodeData);
        }
        dataByKeyValue.set(keyValue, nodeData);
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n;) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = d3_selection_dataNode(groupData[i]);
      }
      for (; i < n; ++i) {
        exitNodes[i] = group[i];
      }
    }

    enterNodes.update
        = updateNodes;

    enterNodes.parentNode
        = updateNodes.parentNode
        = exitNodes.parentNode
        = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var enter = d3_selection_enter([]),
      update = d3_selection([]),
      exit = d3_selection([]);

  if (typeof value === "function") {
    while (++i < n) {
      bind(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], value);
    }
  }

  update.enter = function() { return enter; };
  update.exit = function() { return exit; };
  return update;
};

function d3_selection_dataNode(data) {
  return {__data__: data};
}

d3_selectionPrototype.datum = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.property("__data__");
};

d3_selectionPrototype.filter = function(filter) {
  var subgroups = [],
      subgroup,
      group,
      node;

  if (typeof filter !== "function") filter = d3_selection_filter(filter);

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
        subgroup.push(node);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_filter(selector) {
  return function() {
    return d3_selectMatches(this, selector);
  };
}

d3_selectionPrototype.order = function() {
  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
};
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};

d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
  return this.order();
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
  };
}
function d3_noop() {}

d3.dispatch = function() {
  var dispatch = new d3_dispatch,
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i >= 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  if (type) return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);

  if (arguments.length === 2) {
    if (listener == null) for (type in this) {
      if (this.hasOwnProperty(type)) this[type].on(name, null);
    }
    return this;
  }
};

function d3_dispatch_event(dispatch) {
  var listeners = [],
      listenerByName = new d3_Map;

  function event() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name, listener) {
    var l = listenerByName.get(name),
        i;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}

d3.event = null;

function d3_eventPreventDefault() {
  d3.event.preventDefault();
}

function d3_eventSource() {
  var e = d3.event, s;
  while (s = e.sourceEvent) e = s;
  return e;
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3_eventDispatch(target) {
  var dispatch = new d3_dispatch,
      i = 0,
      n = arguments.length;

  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

  // Creates a dispatch context for the specified `thiz` (typically, the target
  // DOM element that received the source event) and `argumentz` (typically, the
  // data `d` and index `i` of the target element). The returned function can be
  // used to dispatch an event to any registered listeners; the function takes a
  // single argument as input, being the event to dispatch. The event must have
  // a "type" attribute which corresponds to a type registered in the
  // constructor. This context will automatically populate the "sourceEvent" and
  // "target" attributes of the event, as well as setting the `d3.event` global
  // for the duration of the notification.
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      try {
        var e0 =
        e1.sourceEvent = d3.event;
        e1.target = target;
        d3.event = e1;
        dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        d3.event = e0;
      }
    };
  };

  return dispatch;
}

d3_selectionPrototype.on = function(type, listener, capture) {
  var n = arguments.length;
  if (n < 3) {

    // For on(object) or on(object, boolean), the object specifies the event
    // types and listeners to add or remove. The optional boolean specifies
    // whether the listener captures events.
    if (typeof type !== "string") {
      if (n < 2) listener = false;
      for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
      return this;
    }

    // For on(string), return the listener for the first node.
    if (n < 2) return (n = this.node()["__on" + type]) && n._;

    // For on(string, function), use the default capture.
    capture = false;
  }

  // Otherwise, a type, listener and capture are specified, and handled as below.
  return this.each(d3_selection_on(type, listener, capture));
};

function d3_selection_on(type, listener, capture) {
  var name = "__on" + type,
      i = type.indexOf("."),
      wrap = d3_selection_onListener;

  if (i > 0) type = type.substring(0, i);
  var filter = d3_selection_onFilters.get(type);
  if (filter) type = filter, wrap = d3_selection_onFilter;

  function onRemove() {
    var l = this[name];
    if (l) {
      this.removeEventListener(type, l, l.$);
      delete this[name];
    }
  }

  function onAdd() {
    var l = wrap(listener, d3_array(arguments));
    onRemove.call(this);
    this.addEventListener(type, this[name] = l, l.$ = capture);
    l._ = listener;
  }

  function removeAll() {
    var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"),
        match;
    for (var name in this) {
      if (match = name.match(re)) {
        var l = this[name];
        this.removeEventListener(match[1], l, l.$);
        delete this[name];
      }
    }
  }

  return i
      ? listener ? onAdd : onRemove
      : listener ? d3_noop : removeAll;
}

var d3_selection_onFilters = d3.map({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
});

d3_selection_onFilters.forEach(function(k) {
  if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
});

function d3_selection_onListener(listener, argumentz) {
  return function(e) {
    var o = d3.event; // Events can be reentrant (e.g., focus).
    d3.event = e;
    argumentz[0] = this.__data__;
    try {
      listener.apply(this, argumentz);
    } finally {
      d3.event = o;
    }
  };
}

function d3_selection_onFilter(listener, argumentz) {
  var l = d3_selection_onListener(listener, argumentz);
  return function(e) {
    var target = this, related = e.relatedTarget;
    if (!related || (related !== target && !(related.compareDocumentPosition(target) & 8))) {
      l.call(target, e);
    }
  };
}

d3_selectionPrototype.each = function(callback) {
  return d3_selection_each(this, function(node, i, j) {
    callback.call(node, node.__data__, i, j);
  });
};

function d3_selection_each(groups, callback) {
  for (var j = 0, m = groups.length; j < m; j++) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
      if (node = group[i]) callback(node, i, j);
    }
  }
  return groups;
}

d3_selectionPrototype.call = function(callback) {
  var args = d3_array(arguments);
  callback.apply(args[0] = this, args);
  return this;
};

d3_selectionPrototype.empty = function() {
  return !this.node();
};

d3_selectionPrototype.node = function() {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
};

d3_selectionPrototype.size = function() {
  var n = 0;
  this.each(function() { ++n; });
  return n;
};

function d3_selection_enter(selection) {
  d3_subclass(selection, d3_selection_enterPrototype);
  return selection;
}

var d3_selection_enterPrototype = [];

d3.selection.enter = d3_selection_enter;
d3.selection.enter.prototype = d3_selection_enterPrototype;

d3_selection_enterPrototype.append = d3_selectionPrototype.append;
d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
d3_selection_enterPrototype.node = d3_selectionPrototype.node;
d3_selection_enterPrototype.call = d3_selectionPrototype.call;
d3_selection_enterPrototype.size = d3_selectionPrototype.size;


d3_selection_enterPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      upgroup,
      group,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};

d3_selection_enterPrototype.insert = function(name, before) {
  if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
  return d3_selectionPrototype.insert.call(this, name, before);
};

function d3_selection_enterInsertBefore(enter) {
  var i0, j0;
  return function(d, i, j) {
    var group = enter[j].update,
        n = group.length,
        node;
    if (j != j0) j0 = j, i0 = 0;
    if (i >= i0) i0 = i + 1;
    while (!(node = group[i0]) && ++i0 < n);
    return node;
  };
}

// import "../transition/transition";

d3_selectionPrototype.transition = function() {
  var id = d3_transitionInheritId || ++d3_transitionId,
      subgroups = [],
      subgroup,
      node,
      transition = d3_transitionInherit || {time: Date.now(), ease: d3_ease_cubicInOut, delay: 0, duration: 250};

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) d3_transitionNode(node, i, id, transition);
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, id);
};
// import "../transition/transition";

d3_selectionPrototype.interrupt = function() {
  return this.each(d3_selection_interrupt);
};

function d3_selection_interrupt() {
  var lock = this.__transition__;
  if (lock) ++lock.active;
}

// TODO fast singleton implementation?
d3.select = function(node) {
  var group = [typeof node === "string" ? d3_select(node, d3_document) : node];
  group.parentNode = d3_documentElement;
  return d3_selection([group]);
};

d3.selectAll = function(nodes) {
  var group = d3_array(typeof nodes === "string" ? d3_selectAll(nodes, d3_document) : nodes);
  group.parentNode = d3_documentElement;
  return d3_selection([group]);
};

var d3_selectionRoot = d3.select(d3_documentElement);
  if (typeof define === "function" && define.amd) {
    define(d3);
  } else if (typeof module === "object" && module.exports) {
    module.exports = d3;
  } else {
    this.d3 = d3;
  }
}();

},{}],3:[function(require,module,exports){
if (typeof Map === "undefined") {
  Map = function() { this.clear(); };
  Map.prototype = {
    set: function(k, v) { this._[k] = v; return this; },
    get: function(k) { return this._[k]; },
    has: function(k) { return k in this._; },
    delete: function(k) { return k in this._ && delete this._[k]; },
    clear: function() { this._ = Object.create(null); },
    get size() { var n = 0; for (var k in this._) ++n; return n; },
    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
  };
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.xhr = {}));
}(this, function (exports) { 'use strict';

  var dsv = function(delimiter) {
    var reFormat = new RegExp("[\"" + delimiter + "\n]"),
        delimiterCode = delimiter.charCodeAt(0);

    function parse(text, f) {
      var o;
      return parseRows(text, function(row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function(row, i) { return f(a(row), i); } : a;
      });
    }

    function parseRows(text, f) {
      var EOL = {}, // sentinel value for end-of-line
          EOF = {}, // sentinel value for end-of-file
          rows = [], // output rows
          N = text.length,
          I = 0, // current character index
          n = 0, // the current line number
          t, // the current token
          eol; // is the current token followed by EOL?

      function token() {
        if (I >= N) return EOF; // special case: end of file
        if (eol) return eol = false, EOL; // special case: end of line

        // special case: quotes
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.slice(j + 1, i).replace(/""/g, "\"");
        }

        // common case: find next delimiter or newline
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; // \n
          else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
          else if (c !== delimiterCode) continue;
          return text.slice(j, I - k);
        }

        // special case: last token before EOF
        return text.slice(j);
      }

      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && (a = f(a, n++)) == null) continue;
        rows.push(a);
      }

      return rows;
    }

    function format(rows) {
      if (Array.isArray(rows[0])) return formatRows(rows); // deprecated; use formatRows
      var fieldSet = Object.create(null), fields = [];

      // Compute unique fields in order of discovery.
      rows.forEach(function(row) {
        for (var field in row) {
          if (!((field += "") in fieldSet)) {
            fields.push(fieldSet[field] = field);
          }
        }
      });

      return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
        return fields.map(function(field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    }

    function formatRows(rows) {
      return rows.map(formatRow).join("\n");
    }

    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }

    function formatValue(text) {
      return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
    }

    return {
      parse: parse,
      parseRows: parseRows,
      format: format,
      formatRows: formatRows
    };
  }

  var tsv = dsv("\t");

  function responseOf(dsv, row) {
    return function(request) {
      return dsv.parse(request.responseText, row);
    };
  }

  function fixCallback(callback) {
    return function(error, request) {
      callback(error == null ? request : null);
    };
  }

  function hasResponse(request) {
    var type = request.responseType;
    return type && type !== "text"
        ? request.response // null on error
        : request.responseText; // "" on error
  }

  function Dispatch(types) {
    var i = -1,
        n = types.length,
        callbacksByType = {},
        callbackByName = {},
        type,
        that = this;

    that.on = function(type, callback) {
      type = parseType(type);

      // Return the current callback, if any.
      if (arguments.length < 2) {
        return (callback = callbackByName[type.name]) && callback.value;
      }

      // If a type was specified…
      if (type.type) {
        var callbacks = callbacksByType[type.type],
            callback0 = callbackByName[type.name],
            i;

        // Remove the current callback, if any, using copy-on-remove.
        if (callback0) {
          callback0.value = null;
          i = callbacks.indexOf(callback0);
          callbacksByType[type.type] = callbacks = callbacks.slice(0, i).concat(callbacks.slice(i + 1));
          delete callbackByName[type.name];
        }

        // Add the new callback, if any.
        if (callback) {
          callback = {value: callback};
          callbackByName[type.name] = callback;
          callbacks.push(callback);
        }
      }

      // Otherwise, if a null callback was specified, remove all callbacks with the given name.
      else if (callback == null) {
        for (var otherType in callbacksByType) {
          if (callback = callbackByName[otherType + type.name]) {
            callback.value = null;
            var callbacks = callbacksByType[otherType], i = callbacks.indexOf(callback);
            callbacksByType[otherType] = callbacks.slice(0, i).concat(callbacks.slice(i + 1));
            delete callbackByName[callback.name];
          }
        }
      }

      return that;
    };

    while (++i < n) {
      type = types[i] + "";
      if (!type || (type in that)) throw new Error("illegal or duplicate type: " + type);
      callbacksByType[type] = [];
      that[type] = applier(type);
    }

    function parseType(type) {
      var i = (type += "").indexOf("."), name = type;
      if (i >= 0) type = type.slice(0, i); else name += ".";
      if (type && !callbacksByType.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      return {type: type, name: name};
    }

    function applier(type) {
      return function() {
        var callbacks = callbacksByType[type], // Defensive reference; copy-on-remove.
            callback,
            callbackValue,
            i = -1,
            n = callbacks.length;

        while (++i < n) {
          if (callbackValue = (callback = callbacks[i]).value) {
            callbackValue.apply(this, arguments);
          }
        }

        return that;
      };
    }
  }

  function dispatch() {
    return new Dispatch(arguments);
  }

  dispatch.prototype = Dispatch.prototype; // allow instanceof

  var xhr = function(url, callback) {
    var xhr,
        event = dispatch("beforesend", "progress", "load", "error"),
        mimeType,
        headers = new Map,
        request = new XMLHttpRequest,
        response,
        responseType;

    // If IE does not support CORS, use XDomainRequest.
    if (typeof XDomainRequest !== "undefined"
        && !("withCredentials" in request)
        && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest;

    "onload" in request
        ? request.onload = request.onerror = respond
        : request.onreadystatechange = function() { request.readyState > 3 && respond(); };

    function respond() {
      var status = request.status, result;
      if (!status && hasResponse(request)
          || status >= 200 && status < 300
          || status === 304) {
        if (response) {
          try {
            result = response.call(xhr, request);
          } catch (e) {
            event.error.call(xhr, e);
            return;
          }
        } else {
          result = request;
        }
        event.load.call(xhr, result);
      } else {
        event.error.call(xhr, request);
      }
    }

    request.onprogress = function(e) {
      event.progress.call(xhr, e);
    };

    xhr = {
      header: function(name, value) {
        name = (name + "").toLowerCase();
        if (arguments.length < 2) return headers.get(name);
        if (value == null) headers.delete(name);
        else headers.set(name, value + "");
        return xhr;
      },

      // If mimeType is non-null and no Accept header is set, a default is used.
      mimeType: function(value) {
        if (!arguments.length) return mimeType;
        mimeType = value == null ? null : value + "";
        return xhr;
      },

      // Specifies what type the response value should take;
      // for instance, arraybuffer, blob, document, or text.
      responseType: function(value) {
        if (!arguments.length) return responseType;
        responseType = value;
        return xhr;
      },

      // Specify how to convert the response content to a specific type;
      // changes the callback value on "load" events.
      response: function(value) {
        response = value;
        return xhr;
      },

      // Alias for send("GET", …).
      get: function(data, callback) {
        return xhr.send("GET", data, callback);
      },

      // Alias for send("POST", …).
      post: function(data, callback) {
        return xhr.send("POST", data, callback);
      },

      // If callback is non-null, it will be used for error and load events.
      send: function(method, data, callback) {
        if (!callback && typeof data === "function") callback = data, data = null;
        if (callback && callback.length === 1) callback = fixCallback(callback);
        request.open(method, url, true);
        if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
        if (request.setRequestHeader) headers.forEach(function(value, name) { request.setRequestHeader(name, value); });
        if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
        if (responseType != null) request.responseType = responseType;
        if (callback) xhr.on("error", callback).on("load", function(request) { callback(null, request); });
        event.beforesend.call(xhr, request);
        request.send(data == null ? null : data);
        return xhr;
      },

      abort: function() {
        request.abort();
        return xhr;
      },

      on: function() {
        var value = event.on.apply(event, arguments);
        return value === event ? xhr : value;
      }
    };

    return callback
        ? xhr.get(callback)
        : xhr;
  }

  var xhrDsv = function(defaultMimeType, dsv) {
    return function(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var r = xhr(url).mimeType(defaultMimeType);
      r.row = function(_) { return arguments.length ? r.response(responseOf(dsv, row = _)) : row; };
      r.row(row);
      return callback ? r.get(callback) : r;
    };
  }

  var _tsv = xhrDsv("text/tab-separated-values", tsv);

  var csv = dsv(",");

  var _csv = xhrDsv("text/csv", csv);

  var xhrType = function(defaultMimeType, response) {
    return function(url, callback) {
      var r = xhr(url).mimeType(defaultMimeType).response(response);
      return callback ? r.get(callback) : r;
    };
  }

  var xml = xhrType("application/xml", function(request) {
    return request.responseXML;
  });

  var text = xhrType("text/plain", function(request) {
    return request.responseText;
  });

  var json = xhrType("application/json", function(request) {
    return JSON.parse(request.responseText);
  });

  var html = xhrType("text/html", function(request) {
    return document.createRange().createContextualFragment(request.responseText);
  });

  exports.xhr = xhr;
  exports.html = html;
  exports.json = json;
  exports.text = text;
  exports.xml = xml;
  exports.csv = _csv;
  exports.tsv = _tsv;

}));
},{}],4:[function(require,module,exports){
/**
 * Debounces a function by the given threshold.
 *
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, threshold, execAsap){
  var timeout;

  return function debounced(){
    var obj = this, args = arguments;

    function delayed () {
      if (!execAsap) {
        func.apply(obj, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(obj, args);
    }

    timeout = setTimeout(delayed, threshold || 100);
  };
};

},{}],5:[function(require,module,exports){
var polyline = {};

// Based off of [the offical Google document](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
//
// Some parts from [this implementation](http://facstaff.unca.edu/mcmcclur/GoogleMaps/EncodePolyline/PolylineEncoder.js)
// by [Mark McClure](http://facstaff.unca.edu/mcmcclur/)

function encode(coordinate, factor) {
    coordinate = Math.round(coordinate * factor);
    coordinate <<= 1;
    if (coordinate < 0) {
        coordinate = ~coordinate;
    }
    var output = '';
    while (coordinate >= 0x20) {
        output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63);
        coordinate >>= 5;
    }
    output += String.fromCharCode(coordinate + 63);
    return output;
}

// This is adapted from the implementation in Project-OSRM
// https://github.com/DennisOSRM/Project-OSRM-Web/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
polyline.decode = function(str, precision) {
    var index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, precision || 5);

    // Coordinates have variable length when encoded, so just keep
    // track of whether we've hit the end of the string. In each
    // loop iteration, a single coordinate is decoded.
    while (index < str.length) {

        // Reset shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
};

polyline.encode = function(coordinates, precision) {
    if (!coordinates.length) return '';

    var factor = Math.pow(10, precision || 5),
        output = encode(coordinates[0][0], factor) + encode(coordinates[0][1], factor);

    for (var i = 1; i < coordinates.length; i++) {
        var a = coordinates[i], b = coordinates[i - 1];
        output += encode(a[0] - b[0], factor);
        output += encode(a[1] - b[1], factor);
    }

    return output;
};

if (typeof module !== undefined) module.exports = polyline;

},{}],6:[function(require,module,exports){
(function() {
  var slice = [].slice;

  function queue(parallelism) {
    var q,
        tasks = [],
        started = 0, // number of tasks that have been started (and perhaps finished)
        active = 0, // number of tasks currently being executed (started but not finished)
        remaining = 0, // number of tasks not yet finished
        popping, // inside a synchronous task callback?
        error = null,
        await = noop,
        all;

    if (!parallelism) parallelism = Infinity;

    function pop() {
      while (popping = started < tasks.length && active < parallelism) {
        var i = started++,
            t = tasks[i],
            a = slice.call(t, 1);
        a.push(callback(i));
        ++active;
        t[0].apply(null, a);
      }
    }

    function callback(i) {
      return function(e, r) {
        --active;
        if (error != null) return;
        if (e != null) {
          error = e; // ignore new tasks and squelch active callbacks
          started = remaining = NaN; // stop queued tasks from starting
          notify();
        } else {
          tasks[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function notify() {
      if (error != null) await(error);
      else if (all) await(error, tasks);
      else await.apply(null, [error].concat(tasks));
    }

    return q = {
      defer: function() {
        if (!error) {
          tasks.push(arguments);
          ++remaining;
          pop();
        }
        return q;
      },
      await: function(f) {
        await = f;
        all = false;
        if (!remaining) notify();
        return q;
      },
      awaitAll: function(f) {
        await = f;
        all = true;
        if (!remaining) notify();
        return q;
      }
    };
  }

  function noop() {}

  queue.version = "1.0.7";
  if (typeof define === "function" && define.amd) define(function() { return queue; });
  else if (typeof module === "object" && module.exports) module.exports = queue;
  else this.queue = queue;
})();

},{}],7:[function(require,module,exports){
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute'  // Element positioning
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {

  /* CommonJS */
  if (typeof exports == 'object') module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}(this, function () {
  "use strict"

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */
    , sheet /* A stylesheet to hold the @keyframe or VML rules. */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl (tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for (n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins (parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i])
    }

    return parent
  }

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation (alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor (el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) return prop
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop
      if (s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css (el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n]
    }

    return el
  }

  /**
   * Fills in default values.
   */
  function merge (obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n]
      }
    }
    return obj
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor (color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12             // The number of lines to draw
  , length: 7             // The length of each line
  , width: 5              // The line thickness
  , radius: 10            // The radius of the inner circle
  , scale: 1.0            // Scales overall size of the spinner
  , corners: 1            // Roundness (0..1)
  , color: '#000'         // #rgb or #rrggbb
  , opacity: 1/4          // Opacity of the lines
  , rotate: 0             // Rotation offset
  , direction: 1          // 1: clockwise, -1: counterclockwise
  , speed: 1              // Rounds per second
  , trail: 100            // Afterglow percentage
  , fps: 20               // Frames per second when using setTimeout()
  , zIndex: 2e9           // Use a high z-index by default
  , className: 'spinner'  // CSS class to assign to the element
  , top: '50%'            // center vertically
  , left: '50%'           // center horizontally
  , shadow: false         // Whether to render a shadow
  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
  , position: 'absolute'  // Element positioning
  }

  /** The constructor */
  function Spinner (o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function (target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = createEl(null, {className: o.className})

      css(el, {
        position: o.position
      , width: 0
      , zIndex: o.zIndex
      , left: o.left
      , top: o.top
      })

      if (target) {
        target.insertBefore(el, target.firstChild || null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps / o.speed
          , ostep = (1 - o.opacity) / (f * o.trail / 100)
          , astep = f / o.lines

        ;(function anim () {
          i++
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    }

    /**
     * Stops and removes the Spinner.
     */
  , stop: function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    }

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
  , lines: function (el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill (color, shadow) {
        return css(createEl(), {
          position: 'absolute'
        , width: o.scale * (o.length + o.width) + 'px'
        , height: o.scale * o.width + 'px'
        , background: color
        , boxShadow: shadow
        , transformOrigin: 'left'
        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute'
        , top: 1 + ~(o.scale * o.width / 2) + 'px'
        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
        , opacity: o.opacity
        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    }

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
  , opacity: function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML () {

    /* Utility function to create a VML tag */
    function vml (tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width)
        , s = o.scale * 2 * r

      function grp () {
        return css(
          vml('group', {
            coordsize: s + ' ' + s
          , coordorigin: -r + ' ' + -r
          })
        , { width: s, height: s }
        )
      }

      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg (i, dx, filter) {
        ins(
          g
        , ins(
            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
          , ins(
              css(
                vml('roundrect', {arcsize: o.corners})
              , { width: r
                , height: o.scale * o.width
                , left: o.scale * o.radius
                , top: -o.scale * o.width >> 1
                , filter: filter
                }
              )
            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++) {
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
        }

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  if (typeof document !== 'undefined') {
    sheet = (function () {
      var el = createEl('style', {type : 'text/css'})
      ins(document.getElementsByTagName('head')[0], el)
      return el.sheet || el.styleSheet
    }())

    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(probe, 'transform') && probe.adj) initVML()
    else useCssAnimations = vendor(probe, 'animation')
  }

  return Spinner

}));

},{}],8:[function(require,module,exports){
'use strict';

var d3xhr = require('d3-xhr'),
    Spinner = require('spin.js');


function d3post(url, reqData, callback, cors) {
    var sent = false;

    if (typeof cors === 'undefined') {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.hostname +
                (location.port ? ':' + location.port : ''));
    }

    var respData;
    var findPathButton = document.getElementById('find-mmpaths');
    //var spinner = new Spinner({color:'#fff', lines: 12});

    d3xhr.xhr(url)
        .header("Content-Type", "application/json")
        .on("beforesend", function(request) { 
            findPathButton.value = "Searching paths...";
            findPathButton.disabled = true;
            //findPathButton.appendChild(spinner.spin().el);
            //spinner.spin(findPathButton);
        })
        .post(
                JSON.stringify(reqData),
                function(err, rawData){
                    findPathButton.value = "Find multimodal paths";
                    findPathButton.disabled = false;
                    //spinner.stop();
                    respData = rawData;
                    callback.call(err, respData, null);
                }
             );

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    return respData;
}

if (typeof module !== 'undefined') module.exports = d3post;

},{"d3-xhr":3,"spin.js":7}],9:[function(require,module,exports){
'use strict';

var request = require('./request'),
    polyline = require('polyline'),
    d3 = require('../lib/d3'),
    queue = require('queue-async');

var Directions = L.Class.extend({
    includes: [L.Mixin.Events],

    options: {
        units: 'metric'
    },

    statics: {
        MMRP_API_TEMPLATE: 'http://luliu.me/mmrp/api/v1',
        GEOCODER_TEMPLATE: 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places/{query}.json?proximity={proximity}&access_token={token}'
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._waypoints = [];
        this.profile = {
            "available_public_modes": ['underground'],
            "can_use_taxi":           false,
            "has_bicycle":            false,
            "has_motorcycle":         false,
            "has_private_car":        true,
            "need_parking":           true,
            "objective":              "fastest",
            "driving_distance_limit": 500,
            "source": {
                "type": "coordinate",
                "value": {
                    "x": 0.0,
                    "y": 0.0,
                    "srid": 4326
                }
            },
            "target": {
                "type": "coordinate",
                "value": {
                    "x": 0.0,
                    "y": 0.0,
                    "srid": 4326
                }
            }
        };
    },

    getOrigin: function () {
        return this.origin;
    },

    getDestination: function () {
        return this.destination;
    },

    setOrigin: function (origin) {
        origin = this._normalizeWaypoint(origin);

        this.origin = origin;
        this.fire('origin', {origin: origin});

        if (!origin) {
            this._unload();
        }

        if (origin) {
            this.profile.source.value.x = this.origin.geometry.coordinates[0];
            this.profile.source.value.y = this.origin.geometry.coordinates[1];
        }

        return this;
    },

    setDestination: function (destination) {
        destination = this._normalizeWaypoint(destination);

        this.destination = destination;
        this.fire('destination', {destination: destination});

        if (!destination) {
            this._unload();
        }

        if (destination) {
            this.profile.target.value.x = this.destination.geometry.coordinates[0];
            this.profile.target.value.y = this.destination.geometry.coordinates[1];
        }

        return this;
    },

    getProfile: function() {
        //return this.profile || this.options.profile || 'mapbox.driving';
        return this.profile;
    },

    setProfile: function (key, value) {
        this.profile[key] = value;
        //this.fire('profile', {profile: profile});
        return this;
    },

    getWaypoints: function() {
        return this._waypoints;
    },

    setWaypoints: function (waypoints) {
        this._waypoints = waypoints.map(this._normalizeWaypoint);
        return this;
    },

    addWaypoint: function (index, waypoint) {
        this._waypoints.splice(index, 0, this._normalizeWaypoint(waypoint));
        return this;
    },

    removeWaypoint: function (index) {
        this._waypoints.splice(index, 1);
        return this;
    },

    setWaypoint: function (index, waypoint) {
        this._waypoints[index] = this._normalizeWaypoint(waypoint);
        return this;
    },

    reverse: function () {
        var o = this.origin,
            d = this.destination;

        this.origin = d;
        this.destination = o;
        this._waypoints.reverse();

        this.fire('origin', {origin: this.origin})
            .fire('destination', {destination: this.destination});

        return this;
    },

    selectRoute: function (route) {
        this.fire('selectRoute', {route: route});
    },

    selectTrack: function (track) {
        this.fire('selectTrack', {track: track.GeoJSON});
    },

    highlightRoute: function (route) {
        this.fire('highlightRoute', {route: route});
    },

    highlightStep: function (step) {
        this.fire('highlightStep', {step: step});
    },

    queryURL: function () {
        return Directions.MMRP_API_TEMPLATE;
    },

    queryable: function () {
        return this.getOrigin() && this.getDestination();
    },

    query: function (opts) {
        if (!opts) opts = {};
        if (!this.queryable()) return this;

        if (this._query) {
            this._query.abort();
        }

        if (this._requests && this._requests.length) this._requests.forEach(function(request) {
            request.abort();
        });
        this._requests = [];

        var q = queue();

        var pts = [this.origin, this.destination].concat(this._waypoints);
        for (var i in pts) {
            if (!pts[i].geometry.coordinates) {
                q.defer(L.bind(this._geocode, this), pts[i], opts.proximity);
            }
        }

        q.await(L.bind(function(err) {
            if (err) {
                return this.fire('error', {error: err.message});
            }

            var reqData = {"id": 1, "jsonrpc": "2.0", "method": "mmrp.findMultimodalPaths"};
            reqData.params = [this.profile];

            this._query = request(this.queryURL(), reqData, L.bind(function (err, resp) {
                this._query = null;

                if (err) {
                    return this.fire('error', {error: err.message});
                }

                this.directions = resp;
                this.directions.waypoints = [];
                this.directions.origin = resp.source;
                this.directions.destination = resp.target;
                this.directions.routes.forEach(function (route) {
                    route.geometry = route.geojson;
                    route.duration = route.duration * 60;
                    route.steps = [];
                    var i = 0;
                    for (i = 0; i < route.geojson.features.length; i++) { 
                        var stepInfo = route.geojson.features[i];
                        if (stepInfo.properties.type === 'path') {
                            route.steps.push({
                                properties: route.geojson.features[i].properties,
                                loc: route.geojson.features[i].geometry.coordinates[0]
                            });
                        }
                        else if (stepInfo.properties.type === 'switch_point') {
                            route.steps.push({
                                properties: route.geojson.features[i].properties,
                                loc: route.geojson.features[i].geometry.coordinates
                            });
                        }
                    }
                });

                if (!this.origin.properties.name) {
                    this.origin = this.directions.origin;
                } else {
                    this.directions.origin = this.origin;
                }

                if (!this.destination.properties.name) {
                    this.destination = this.directions.destination;
                } else {
                    this.directions.destination = this.destination;
                }

                this.fire('load', this.directions);
            }, this), this);
        }, this));

        return this;
    },

    _geocode: function(waypoint, proximity, cb) {
        if (!this._requests) this._requests = [];
        this._requests.push(request(L.Util.template(Directions.GEOCODER_TEMPLATE, {
            query: waypoint.properties.query,
            token: this.options.accessToken || L.mapbox.accessToken,
            proximity: proximity ? [proximity.lng, proximity.lat].join(',') : ''
        }), L.bind(function (err, resp) {
            if (err) {
                return cb(err);
            }

            if (!resp.features || !resp.features.length) {
                return cb(new Error("No results found for query " + waypoint.properties.query));
            }

            waypoint.geometry.coordinates = resp.features[0].center;
            waypoint.properties.name = resp.features[0].place_name;

            return cb();
        }, this)));
    },

    _unload: function () {
        this._waypoints = [];
        delete this.directions;
        this.fire('unload');
    },

    _normalizeWaypoint: function (waypoint) {
        if (!waypoint || waypoint.type === 'Feature') {
            return waypoint;
        }

        var coordinates,
            properties = {};

        if (waypoint instanceof L.LatLng) {
            waypoint = waypoint.wrap();
            coordinates = properties.query = [waypoint.lng, waypoint.lat];
        } else if (typeof waypoint === 'string') {
            properties.query = waypoint;
        }

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: coordinates
            },
            properties: properties
        };
    }
});

module.exports = function(options) {
    return new Directions(options);
};

},{"../lib/d3":2,"./request":15,"polyline":5,"queue-async":6}],10:[function(require,module,exports){
'use strict';

var d3 = require('../lib/d3'),
    format = require('./format');

module.exports = function (container, directions) {
    var control = {}, map;

    control.addTo = function (_) {
        map = _;
        return control;
    };

    container = d3.select(L.DomUtil.get(container))
        .classed('mapbox-directions-errors', true);

    directions.on('load unload', function () {
        container
            .classed('mapbox-error-active', false)
            .html('');
    });

    directions.on('error', function (e) {
        container
            .classed('mapbox-error-active', true)
            .html('')
            .append('span')
            .attr('class', 'mapbox-directions-error')
            .text(e.error);

        container
            .insert('span', 'span')
            .attr('class', 'mapbox-directions-icon mapbox-error-icon');
    });

    return control;
};

},{"../lib/d3":2,"./format":11}],11:[function(require,module,exports){
'use strict';

module.exports = {
    duration: function (s) {
        var m = Math.floor(s / 60),
            h = Math.floor(m / 60);
        s %= 60;
        m %= 60;
        if (h === 0 && m === 0) return s + ' s';
        if (h === 0) return m + ' min';
        return h + ' h ' + m + ' min';
    },

    imperial: function (m) {
        var mi = m / 1609.344;
        if (mi >= 100) return mi.toFixed(0) + ' mi';
        if (mi >= 10)  return mi.toFixed(1) + ' mi';
        if (mi >= 0.1) return mi.toFixed(2) + ' mi';
        return (mi * 5280).toFixed(0) + ' ft';
    },

    metric: function (m) {
        if (m >= 100000) return (m / 1000).toFixed(0) + ' km';
        if (m >= 10000)  return (m / 1000).toFixed(1) + ' km';
        if (m >= 100)    return (m / 1000).toFixed(2) + ' km';
        return m.toFixed(0) + ' m';
    }
};

},{}],12:[function(require,module,exports){
'use strict';

var d3 = require('../lib/d3');

module.exports = function (container, directions) {
    var control = {}, map;
    var origChange = false,
        destChange = false;

    control.addTo = function (_) {
        map = _;
        return control;
    };

    container = d3.select(L.DomUtil.get(container))
        .classed('mapbox-directions-inputs', true);

    var publicTransitSelection = ['underground'];

    var form = container.append('form')
        .on('keypress', function () {
            if (d3.event.keyCode === 13) {
                d3.event.preventDefault();

                if (origChange)
                    directions.setOrigin(originInput.property('value'));
                if (destChange)
                    directions.setDestination(destinationInput.property('value'));

                if (directions.queryable())
                    directions.query({ proximity: map.getCenter() });

                origChange = false;
                destChange = false;
            }
        });

    var origin = form.append('div')
        .attr('class', 'mapbox-directions-origin');

    origin.append('label')
        .attr('class', 'mapbox-form-label')
        .on('click', function () {
            if (directions.getOrigin() instanceof L.LatLng) {
                map.panTo(directions.getOrigin());
            }
        })
        .append('span')
        .attr('class', 'mapbox-directions-icon mapbox-depart-icon');

    var originInput = origin.append('input')
        .attr('type', 'text')
        .attr('required', 'required')
        .attr('id', 'mmrp-origin-input')
        .attr('placeholder', 'Start')
        .on('input', function() {
            if (!origChange) origChange = true;
        });

    origin.append('div')
        .attr('class', 'mapbox-directions-icon mapbox-close-icon')
        .attr('title', 'Clear value')
        .on('click', function () {
            directions.setOrigin(undefined);
        });

    form.append('span')
        .attr('class', 'mapbox-directions-icon mapbox-reverse-icon mapbox-directions-reverse-input')
        .attr('title', 'Reverse origin & destination')
        .on('click', function () {
            directions.reverse().query();
        });

    var destination = form.append('div')
        .attr('class', 'mapbox-directions-destination');

    destination.append('label')
        .attr('class', 'mapbox-form-label')
        .on('click', function () {
            if (directions.getDestination() instanceof L.LatLng) {
                map.panTo(directions.getDestination());
            }
        })
        .append('span')
        .attr('class', 'mapbox-directions-icon mapbox-arrive-icon');

    var destinationInput = destination.append('input')
        .attr('type', 'text')
        .attr('required', 'required')
        .attr('id', 'mmrp-destination-input')
        .attr('placeholder', 'End')
        .on('input', function() {
            if (!destChange) destChange = true;
        });

    destination.append('div')
        .attr('class', 'mapbox-directions-icon mapbox-close-icon')
        .attr('title', 'Clear value')
        .on('click', function () {
            directions.setDestination(undefined);
        });

    var car_profile = form.append('div')
        .attr('id', 'mmrp-car-profiles')
        .attr('class', 'mapbox-directions-profile');

    car_profile.append('h3')
        .attr('value', 'DRIVING')
        .attr('style', 'margin: 5px 0px 0px 5px')
        .text('DRIVING OPTIONS');

    car_profile.append('input')
        .attr('type', 'checkbox')
        .attr('name', 'profile')
        .attr('id', 'mmrp-profile-private-car')
        .property('checked', true)
        .on('change', function (d) {
            if (this.checked) {
                carParking.property('disabled', false);
                carParking.property('checked', true);
                isDrivingDistLimited.property('disabled', false);
                isDrivingDistLimited.property('checked', true);
                distanceLimit.property('disabled', false);
            }
            else {
                carParking.property('disabled', true);
                carParking.property('checked', false);
                isDrivingDistLimited.property('disabled', true);
                isDrivingDistLimited.property('checked', false);
                distanceLimit.property('disabled', true);
            }
            directions.setProfile('has_private_car', this.checked);
        });

    car_profile.append('label')
        .attr('for', 'mmrp-profile-private-car')
        .text('Private car available on departure');

    var carParking = car_profile.append('input')
        .attr('type', 'checkbox')
        .attr('name', 'profile')
        .attr('id', 'mmrp-profile-car-parking')
        .property('checked', true)
        .property('disabled', false)
        .on('change', function (d) {
            directions.setProfile('need_parking', this.checked);
        });

    car_profile.append('label')
        .attr('for', 'mmrp-profile-car-parking')
        .text('Need parking for the car');

    var isDrivingDistLimited = car_profile.append('input')
        .attr('type', 'checkbox')
        .attr('name', 'driving-profile')
        .attr('id', 'driving-distance-limit')
        .property('checked', true)
        .on('change', function (d) {
            if (this.checked) {
                distanceLimit.property('disabled', false);
            }
            else
                distanceLimit.property('disabled', true);
        });

    car_profile.append('label')
        .attr('for', 'driving-distance-limit')
        .attr('style', 'width: 150px')
        .text('Distance limit (km): ');

    var distanceLimit = car_profile.append('input')
        .attr('type', 'number')
        .attr('min', '10')
        .attr('max', '2617')
        .property('value', '500')
        .attr('id', 'mmrp-driving-distance-limit')
        .attr('style', 'width: 80px;padding-left: 10px;padding-top: 2px;padding-bottom: 2px;background-color: white;border: 1px solid rgba(0,0,0,0.1);height: 30px;vertical-align: middle;');

    var public_profile = form.append('div')
        .attr('id', 'mmrp-public-profiles')
        .attr('class', 'mapbox-directions-profile');

    public_profile.append('h3')
        .attr('value', 'PUBLIC TRANSIT')
        .attr('style', 'margin: 5px 0px 0px 5px')
        .text('PUBLIC TRANSIT PREFERENCES');

    var public_profiles = public_profile.selectAll('span')
        .data([
            ['mmrp.suburban', 'suburban', 'Suburban'],
            ['mmrp.underground', 'underground', 'Underground'],
            ['mmrp.tram', 'tram', 'Tram']])
        .enter()
        .append('span');

    public_profiles.append('input')
        .attr('type', 'checkbox')
        .attr('name', 'profile')
        .attr('id', function (d) { return 'mmrp-profile-' + d[1]; })
        .property('checked', function (d, i) { return i === 1; } )
        .on('change', function (d) {
            if (this.checked) {
                publicTransitSelection.push(d[1]);
            }
            else {
                var index = publicTransitSelection.indexOf(d[1]);
                if (index > -1) {
                    publicTransitSelection.splice(index, 1);
                }
            }
        });

    public_profiles.append('label')
        .attr('for', function (d) { return 'mmrp-profile-' + d[1]; })
        .text(function (d) { return d[2]; });

    public_profile.append('input')
        .attr('type', 'button')
        .attr('value', 'Find multimodal paths')
        .attr('name', 'find paths')
        .attr('id', 'find-mmpaths')
        .attr('class', 'button')
        .on('click', function (d) {
            if (isDrivingDistLimited.property('checked') === true) {
                directions.setProfile('driving_distance_limit', distanceLimit.property('value'));
            }
            directions.setProfile('available_public_modes', publicTransitSelection);
            directions.query();
        });

    function format(waypoint) {
        if (!waypoint) {
            return '';
        } else if (waypoint.properties.name) {
            return waypoint.properties.name;
        } else if (waypoint.geometry.coordinates) {
            var precision = Math.max(0, Math.ceil(Math.log(map.getZoom()) / Math.LN2));
            return waypoint.geometry.coordinates[0].toFixed(precision) + ', ' +
                   waypoint.geometry.coordinates[1].toFixed(precision);
        } else {
            return waypoint.properties.query || '';
        }
    }

    directions
        .on('origin', function (e) {
            originInput.property('value', format(e.origin));
        })
        .on('destination', function (e) {
            destinationInput.property('value', format(e.destination));
        })
        .on('profile', function (e) {
            profiles.selectAll('input')
                .property('checked', function (d) { return d[0] === e.profile; });
        })
        .on('load', function (e) {
            originInput.property('value', format(e.origin));
            destinationInput.property('value', format(e.destination));
        });

    return control;
};

},{"../lib/d3":2}],13:[function(require,module,exports){
'use strict';

var d3 = require('../lib/d3'),
    format = require('./format');

module.exports = function (container, directions) {
    var control = {}, map;

    control.addTo = function (_) {
        map = _;
        return control;
    };

    container = d3.select(L.DomUtil.get(container))
        .classed('mapbox-directions-instructions', true);

    directions.on('error', function () {
        container.html('');
    });

    directions.on('selectRoute', function (e) {
        var route = e.route;

        container.html('');

        var steps = container.append('ol')
            .attr('class', 'mapbox-directions-steps')
            .selectAll('li')
            .data(route.steps)
            .enter().append('li')
            .attr('class', 'mapbox-directions-step');

        steps.append('span')
            .attr('class', function (step) {
                if (step.properties.type === 'path') {
                    return 'mapbox-directions-icon mapbox-continue-icon';
                }
                else if (step.properties.type === 'switch_point') {
                    return 'mapbox-directions-icon mmrp-' + step.properties.switch_type.toLowerCase() + '-icon';
                }
            });

        steps.append('div')
            .attr('class', 'mapbox-directions-step-maneuver')
            .html(function (step) { 
                if (step.properties.type === 'path') { 
                    switch (step.properties.mode) {
                        case 'private_car':
                            return 'Driving'; 
                            break;
                        case 'foot':
                            return 'Walking';
                            break;
                        case 'bicycle':
                            return 'Cycling';
                            break;
                        default:
                            return step.properties.title;
                            break;
                    }
                }
                else if (step.properties.type === 'switch_point') { 
                    if (step.properties.switch_type === 'underground_station') {
                        return step.properties.title + ': Platform ' + step.properties.platform;
                    }
                    return step.properties.title; 
                } 
            });

        steps.append('div')
            .attr('class', 'mapbox-directions-step-distance')
            .text(function (step) {
                return step.properties.distance ? format[directions.options.units](step.properties.distance) : '';
            });

        steps.on('mouseover', function (step) {
            directions.highlightStep(step);
        });

        steps.on('mouseout', function () {
            directions.highlightStep(null);
        });

        steps.on('click', function (step) {
            if (step.loc) {
                map.panTo(L.GeoJSON.coordsToLatLng(step.loc));
            }
        });
    });

    return control;
};

},{"../lib/d3":2,"./format":11}],14:[function(require,module,exports){
'use strict';

var debounce = require('debounce');

var Layer = L.LayerGroup.extend({
    options: {
        readonly: false
    },

    initialize: function(directions, options) {
        L.setOptions(this, options);
        this._directions = directions || new L.Directions();
        L.LayerGroup.prototype.initialize.apply(this);

        this._drag = debounce(L.bind(this._drag, this), 100);

        this.originMarker = L.marker([0, 0], {
            draggable: !this.options.readonly,
            icon: L.mapbox.marker.icon({
                'marker-size': 'medium',
                'marker-color': '#3BB2D0',
                'marker-symbol': 'a'
            })
        }).on('drag', this._drag, this);

        this.destinationMarker = L.marker([0, 0], {
            draggable: !this.options.readonly,
            icon: L.mapbox.marker.icon({
                'marker-size': 'medium',
                'marker-color': '#444',
                'marker-symbol': 'b'
            })
        }).on('drag', this._drag, this);

        this.stepMarker = L.marker([0, 0], {
            icon: L.divIcon({
                className: 'mapbox-marker-drag-icon mapbox-marker-drag-icon-step',
                iconSize: new L.Point(12, 12)
            })
        });

        this.dragMarker = L.marker([0, 0], {
            draggable: !this.options.readonly,
            icon: this._waypointIcon()
        });

        this.dragMarker
            .on('dragstart', this._dragStart, this)
            .on('drag', this._drag, this)
            .on('dragend', this._dragEnd, this);

        this.routeLayer = L.mapbox.featureLayer();
        this.routeHighlightLayer = L.mapbox.featureLayer();
        this.trackLayer = L.mapbox.featureLayer();

        this.waypointMarkers = [];
    },

    onAdd: function() {
        L.LayerGroup.prototype.onAdd.apply(this, arguments);

        if (!this.options.readonly) {
          this._map
              .on('click', this._click, this)
              .on('mousemove', this._mousemove, this);
        }

        this._directions
            .on('origin', this._origin, this)
            .on('destination', this._destination, this)
            .on('load', this._load, this)
            .on('unload', this._unload, this)
            .on('selectRoute', this._selectRoute, this)
            .on('selectTrack', this._selectTrack, this)
            .on('highlightRoute', this._highlightRoute, this)
            .on('highlightStep', this._highlightStep, this);
    },

    onRemove: function() {
        this._directions
            .off('origin', this._origin, this)
            .off('destination', this._destination, this)
            .off('load', this._load, this)
            .off('unload', this._unload, this)
            .off('selectRoute', this._selectRoute, this)
            .off('selectTrack', this._selectTrack, this)
            .off('highlightRoute', this._highlightRoute, this)
            .off('highlightStep', this._highlightStep, this);

        this._map
            .off('click', this._click, this)
            .off('mousemove', this._mousemove, this);

        L.LayerGroup.prototype.onRemove.apply(this, arguments);
    },

    _click: function(e) {
        if (!this._directions.getOrigin()) {
            this._directions.setOrigin(e.latlng);
        } else if (!this._directions.getDestination()) {
            this._directions.setDestination(e.latlng);
        }

        //if (this._directions.queryable()) {
            //this._directions.query();
        //}
    },

    _mousemove: function(e) {
        if (!this.routeLayer || !this.hasLayer(this.routeLayer) || this._currentWaypoint !== undefined) {
            return;
        }

        var p = this._routePolyline().closestLayerPoint(e.layerPoint);

        if (!p || p.distance > 15) {
            return this.removeLayer(this.dragMarker);
        }

        var m = this._map.project(e.latlng),
            o = this._map.project(this.originMarker.getLatLng()),
            d = this._map.project(this.destinationMarker.getLatLng());

        if (o.distanceTo(m) < 15 || d.distanceTo(m) < 15) {
            return this.removeLayer(this.dragMarker);
        }

        for (var i = 0; i < this.waypointMarkers.length; i++) {
            var w = this._map.project(this.waypointMarkers[i].getLatLng());
            if (i !== this._currentWaypoint && w.distanceTo(m) < 15) {
                return this.removeLayer(this.dragMarker);
            }
        }

        this.dragMarker.setLatLng(this._map.layerPointToLatLng(p));
        this.addLayer(this.dragMarker);
    },

    _origin: function(e) {
        if (e.origin && e.origin.geometry.coordinates) {
            this.originMarker.setLatLng(L.GeoJSON.coordsToLatLng(e.origin.geometry.coordinates));
            this.addLayer(this.originMarker);
        } else {
            this.removeLayer(this.originMarker);
        }
    },

    _destination: function(e) {
        if (e.destination && e.destination.geometry.coordinates) {
            this.destinationMarker.setLatLng(L.GeoJSON.coordsToLatLng(e.destination.geometry.coordinates));
            this.addLayer(this.destinationMarker);
        } else {
            this.removeLayer(this.destinationMarker);
        }
    },

    _dragStart: function(e) {
        if (e.target === this.dragMarker) {
            this._currentWaypoint = this._findWaypointIndex(e.target.getLatLng());
            this._directions.addWaypoint(this._currentWaypoint, e.target.getLatLng());
        } else {
            this._currentWaypoint = this.waypointMarkers.indexOf(e.target);
        }
    },

    _drag: function(e) {
        var latLng = e.target.getLatLng();

        if (e.target === this.originMarker) {
            this._directions.setOrigin(latLng);
        } else if (e.target === this.destinationMarker) {
            this._directions.setDestination(latLng);
        } else {
            this._directions.setWaypoint(this._currentWaypoint, latLng);
        }

        if (this._directions.queryable()) {
            this._directions.query();
        }
    },

    _dragEnd: function() {
        this._currentWaypoint = undefined;
    },

    _removeWaypoint: function(e) {
        this._directions.removeWaypoint(this.waypointMarkers.indexOf(e.target)).query();
    },

    _load: function(e) {
        this._origin(e);
        this._destination(e);

        function waypointLatLng(i) {
            return L.GeoJSON.coordsToLatLng(e.waypoints[i].geometry.coordinates);
        }

        var l = Math.min(this.waypointMarkers.length, e.waypoints.length),
            i = 0;

        // Update existing
        for (; i < l; i++) {
            this.waypointMarkers[i].setLatLng(waypointLatLng(i));
        }

        // Add new
        for (; i < e.waypoints.length; i++) {
            var waypointMarker = L.marker(waypointLatLng(i), {
                draggable: !this.options.readonly,
                icon: this._waypointIcon()
            });

            waypointMarker
                .on('click', this._removeWaypoint, this)
                .on('dragstart', this._dragStart, this)
                .on('drag', this._drag, this)
                .on('dragend', this._dragEnd, this);

            this.waypointMarkers.push(waypointMarker);
            this.addLayer(waypointMarker);
        }

        // Remove old
        for (; i < this.waypointMarkers.length; i++) {
            this.removeLayer(this.waypointMarkers[i]);
        }

        this.waypointMarkers.length = e.waypoints.length;
    },

    _unload: function() {
        this.removeLayer(this.routeLayer);
        this.removeLayer(this.trackLayer);
        for (var i = 0; i < this.waypointMarkers.length; i++) {
            this.removeLayer(this.waypointMarkers[i]);
        }
    },

    _selectRoute: function(e) {
        this.routeLayer
            .clearLayers()
            .setGeoJSON(e.route.geometry);
        this.addLayer(this.routeLayer);
    },

    _selectTrack: function(e) {
        this.trackLayer
            .clearLayers()
            .setGeoJSON(e.track);
        this.addLayer(this.trackLayer);
        this.removeLayer(this.routeLayer);
    },

    _highlightRoute: function(e) {
        if (e.route) {
            this.routeHighlightLayer
                .clearLayers()
                .setGeoJSON(e.route.geometry);
            this.addLayer(this.routeHighlightLayer);
        } else {
            this.removeLayer(this.routeHighlightLayer);
        }
    },

    _highlightStep: function(e) {
        if (e.step && e.step.loc) {
            this.stepMarker.setLatLng(L.GeoJSON.coordsToLatLng(e.step.loc));
            this.addLayer(this.stepMarker);
        } else {
            this.removeLayer(this.stepMarker);
        }
    },

    _routePolyline: function() {
        return this.routeLayer.getLayers()[0];
    },

    _findWaypointIndex: function(latLng) {
        var segment = this._findNearestRouteSegment(latLng);

        for (var i = 0; i < this.waypointMarkers.length; i++) {
            var s = this._findNearestRouteSegment(this.waypointMarkers[i].getLatLng());
            if (s > segment) {
                return i;
            }
        }

        return this.waypointMarkers.length;
    },

    _findNearestRouteSegment: function(latLng) {
        var min = Infinity,
            index,
            p = this._map.latLngToLayerPoint(latLng),
            positions = this._routePolyline()._originalPoints;

        for (var i = 1; i < positions.length; i++) {
            var d = L.LineUtil._sqClosestPointOnSegment(p, positions[i - 1], positions[i], true);
            if (d < min) {
                min = d;
                index = i;
            }
        }

        return index;
    },

    _waypointIcon: function() {
        return L.divIcon({
            className: 'mapbox-marker-drag-icon',
            iconSize: new L.Point(12, 12)
        });
    }
});

module.exports = function(directions, options) {
    return new Layer(directions, options);
};

},{"debounce":4}],15:[function(require,module,exports){
'use strict';

var d3post = require('./d3_post');

module.exports = function(url, reqData, callback) {
    return d3post(url, reqData, function (err, resp) {
        if (err && err.type === 'abort') {
            return;
        }

        if (err && !err.responseText) {
            return callback(err);
        }

        resp = resp || err;

        try {
            resp = JSON.parse(resp.response);
        } catch (e) {
            return callback(new Error(resp));
        }

        if (resp.error) {
            return callback(new Error(resp.error));
        }

        return callback(null, resp.result);
    });
};

},{"./d3_post":8}],16:[function(require,module,exports){
'use strict';

var d3 = require('../lib/d3'),
    format = require('./format');

module.exports = function (container, directions) {
    var control = {}, map, selection = 0;

    control.addTo = function (_) {
        map = _;
        return control;
    };

    container = d3.select(L.DomUtil.get(container))
        .classed('mapbox-directions-routes', true);

    directions.on('error', function () {
        container.html('');
    });

    directions.on('load', function (e) {
        container.html('');

        var routes = container.append('ul')
            .selectAll('li')
            .data(e.routes)
            .enter().append('li')
            .attr('class', 'mapbox-directions-route');

        routes.append('div')
            .attr('class','mapbox-directions-route-heading')
            .text(function (route) { return 'Route ' + (e.routes.indexOf(route) + 1); });

        routes.append('div')
            .attr('class', 'mapbox-directions-route-summary')
            .text(function (route) { return route.summary; });

        routes.append('div')
            .attr('class', 'mapbox-directions-route-details')
            .text(function (route) {
                return format[directions.options.units](route.distance) + ', ' + format.duration(route.duration);
            });

        routes.on('mouseover', function (route) {
            directions.highlightRoute(route);
        });

        routes.on('mouseout', function () {
            directions.highlightRoute(null);
        });

        routes.on('click', function (route) {
            directions.selectRoute(route);
        });

        directions.selectRoute(e.routes[0]);
    });

    directions.on('selectRoute', function (e) {
        container.selectAll('.mapbox-directions-route')
            .classed('mapbox-directions-route-active', function (route) { return route === e.route; });
    });

    return control;
};

},{"../lib/d3":2,"./format":11}],17:[function(require,module,exports){
/* @flow */

var renderRow = function(container, data) {
    var row = container.insertRow();
    data.forEach(function(str) {
        var cell = row.insertCell();
        cell.textContent = str;
    });
    return row;
};


var TableControl = function(
    element /*: Object */, /* TableElement */
    headers /*: [string] */,
    model /*: ?[[string]] */
) {
    renderRow(element.createTHead(), headers);
    this.tbody = element.createTBody();
    this.bind(model || []);
};

TableControl.prototype.clear = function() {
    while (this.tbody.hasChildNodes()) {   
        this.tbody.removeChild(this.tbody.firstChild);
    }
};

TableControl.prototype.onSelected = function(handler) {
    this.onSelectedHandler = handler;
};

TableControl.prototype.bind = function(model) {
    this.clear();
    // deal with closure
    var self = this;
    model.forEach(function(data) {
        var row = renderRow(self.tbody, data);
        row.addEventListener('click', function() {
            if (self.onSelectedHandler) {
                self.onSelectedHandler(data);
            }
        });
    });
};

module.exports = TableControl;

},{}],18:[function(require,module,exports){
'use strict';

var tableControl = require('./table_control.js');

module.exports = function(container, directions) {
    var control = {}, map;
    var origChange = false, destChange = false;
    var TRACKINFO_API_URL = "http://luliu.me/tracks/api/v1/trackinfo";
    var TRACK_API_URL = "http://luliu.me/tracks/api/v1/tracks";

    control.addTo = function(_) {
        map = _;
        return control;
    };

    // get page 1 of trackinfo as init data for the table
    // Web browser compatibility:
    // for IE7+, Firefox, Chrome, Opera, Safari
    container = document.getElementById(container);
    container.insertAdjacentHTML('afterbegin', '<table id="table" class="prose"></table>');

    var trackinfoXhr = new XMLHttpRequest();
    var keys = [], values = [];
    trackinfoXhr.onreadystatechange = function() {
        if (trackinfoXhr.readyState === 4 && trackinfoXhr.status === 200) {
            var trackinfoData = JSON.parse(trackinfoXhr.responseText);
            keys = Object.keys(trackinfoData.objects[0]);
            values = [];
            trackinfoData.objects.forEach(function(data) {
                var row = Object.keys(data).map(function(key){
                    return data[key];
                });
                values.push(row);
            });

            var tc = new tableControl(document.getElementById('table'), keys, values);
            tc.onSelected(function(data) {
                var startPos = L.GeoJSON.coordsToLatLng([data[12], data[11]]);
                var endPos = L.GeoJSON.coordsToLatLng([data[4], data[3]]);
                directions.setOrigin(startPos);
                directions.setDestination(endPos);
                map.panTo(startPos);
                // Web browser compatibility: 
                // IE7+, Firefox, Chrome, Opera, Safari
                var trackXhr = new XMLHttpRequest();
                trackXhr.onreadystatechange = function() {
                    if (trackXhr.readyState === 4 && trackXhr.status === 200) {
                        var trackData = JSON.parse(trackXhr.responseText);
                        directions.selectTrack(trackData);
                    }
                }
                trackXhr.open("GET", TRACK_API_URL + "/" + data[6], true);
                trackXhr.send();
            });
        }
    }
    trackinfoXhr.open("GET", TRACKINFO_API_URL, true);
    trackinfoXhr.send();

    return control;
};

},{"./table_control.js":17}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvaW5kZXguanMiLCIvVXNlcnMvdXNlci9Qcm9qZWN0cy9tbXJwLmpzL2xpYi9kMy5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvbm9kZV9tb2R1bGVzL2QzLXhoci9idWlsZC94aHIuanMiLCIvVXNlcnMvdXNlci9Qcm9qZWN0cy9tbXJwLmpzL25vZGVfbW9kdWxlcy9kZWJvdW5jZS9pbmRleC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvbm9kZV9tb2R1bGVzL3BvbHlsaW5lL3NyYy9wb2x5bGluZS5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvbm9kZV9tb2R1bGVzL3F1ZXVlLWFzeW5jL3F1ZXVlLmpzIiwiL1VzZXJzL3VzZXIvUHJvamVjdHMvbW1ycC5qcy9ub2RlX21vZHVsZXMvc3Bpbi5qcy9zcGluLmpzIiwiL1VzZXJzL3VzZXIvUHJvamVjdHMvbW1ycC5qcy9zcmMvZDNfcG9zdC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvc3JjL2RpcmVjdGlvbnMuanMiLCIvVXNlcnMvdXNlci9Qcm9qZWN0cy9tbXJwLmpzL3NyYy9lcnJvcnNfY29udHJvbC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvc3JjL2Zvcm1hdC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvc3JjL2lucHV0X2NvbnRyb2wuanMiLCIvVXNlcnMvdXNlci9Qcm9qZWN0cy9tbXJwLmpzL3NyYy9pbnN0cnVjdGlvbnNfY29udHJvbC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvc3JjL2xheWVyLmpzIiwiL1VzZXJzL3VzZXIvUHJvamVjdHMvbW1ycC5qcy9zcmMvcmVxdWVzdC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvc3JjL3JvdXRlc19jb250cm9sLmpzIiwiL1VzZXJzL3VzZXIvUHJvamVjdHMvbW1ycC5qcy9zcmMvdGFibGVfY29udHJvbC5qcyIsIi9Vc2Vycy91c2VyL1Byb2plY3RzL21tcnAuanMvc3JjL3RyYWNrc19jb250cm9sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaWYgKCFMLm1hcGJveCkgdGhyb3cgbmV3IEVycm9yKCdpbmNsdWRlIG1hcGJveC5qcyBiZWZvcmUgbW1ycC5qcycpO1xuXG5MLm1tcnAgPSByZXF1aXJlKCcuL3NyYy9kaXJlY3Rpb25zJyk7XG5MLm1tcnAuZm9ybWF0ID0gcmVxdWlyZSgnLi9zcmMvZm9ybWF0Jyk7XG5MLm1tcnAubGF5ZXIgPSByZXF1aXJlKCcuL3NyYy9sYXllcicpO1xuTC5tbXJwLmlucHV0Q29udHJvbCA9IHJlcXVpcmUoJy4vc3JjL2lucHV0X2NvbnRyb2wnKTtcbkwubW1ycC5lcnJvcnNDb250cm9sID0gcmVxdWlyZSgnLi9zcmMvZXJyb3JzX2NvbnRyb2wnKTtcbkwubW1ycC5yb3V0ZXNDb250cm9sID0gcmVxdWlyZSgnLi9zcmMvcm91dGVzX2NvbnRyb2wnKTtcbkwubW1ycC5pbnN0cnVjdGlvbnNDb250cm9sID0gcmVxdWlyZSgnLi9zcmMvaW5zdHJ1Y3Rpb25zX2NvbnRyb2wnKTtcbkwubW1ycC50cmFja3NDb250cm9sID0gcmVxdWlyZSgnLi9zcmMvdHJhY2tzX2NvbnRyb2wuanMnKTtcbiIsIiFmdW5jdGlvbigpe1xuICB2YXIgZDMgPSB7dmVyc2lvbjogXCIzLjQuMVwifTsgLy8gc2VtdmVyXG52YXIgZDNfYXJyYXlTbGljZSA9IFtdLnNsaWNlLFxuICAgIGQzX2FycmF5ID0gZnVuY3Rpb24obGlzdCkgeyByZXR1cm4gZDNfYXJyYXlTbGljZS5jYWxsKGxpc3QpOyB9OyAvLyBjb252ZXJzaW9uIGZvciBOb2RlTGlzdHNcblxudmFyIGQzX2RvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgZDNfZG9jdW1lbnRFbGVtZW50ID0gZDNfZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgIGQzX3dpbmRvdyA9IHdpbmRvdztcblxuLy8gUmVkZWZpbmUgZDNfYXJyYXkgaWYgdGhlIGJyb3dzZXIgZG9lc27igJl0IHN1cHBvcnQgc2xpY2UtYmFzZWQgY29udmVyc2lvbi5cbnRyeSB7XG4gIGQzX2FycmF5KGQzX2RvY3VtZW50RWxlbWVudC5jaGlsZE5vZGVzKVswXS5ub2RlVHlwZTtcbn0gY2F0Y2goZSkge1xuICBkM19hcnJheSA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICB2YXIgaSA9IGxpc3QubGVuZ3RoLCBhcnJheSA9IG5ldyBBcnJheShpKTtcbiAgICB3aGlsZSAoaS0tKSBhcnJheVtpXSA9IGxpc3RbaV07XG4gICAgcmV0dXJuIGFycmF5O1xuICB9O1xufVxudmFyIGQzX3N1YmNsYXNzID0ge30uX19wcm90b19fP1xuXG4vLyBVbnRpbCBFQ01BU2NyaXB0IHN1cHBvcnRzIGFycmF5IHN1YmNsYXNzaW5nLCBwcm90b3R5cGUgaW5qZWN0aW9uIHdvcmtzIHdlbGwuXG5mdW5jdGlvbihvYmplY3QsIHByb3RvdHlwZSkge1xuICBvYmplY3QuX19wcm90b19fID0gcHJvdG90eXBlO1xufTpcblxuLy8gQW5kIGlmIHlvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgX19wcm90b19fLCB3ZSdsbCB1c2UgZGlyZWN0IGV4dGVuc2lvbi5cbmZ1bmN0aW9uKG9iamVjdCwgcHJvdG90eXBlKSB7XG4gIGZvciAodmFyIHByb3BlcnR5IGluIHByb3RvdHlwZSkgb2JqZWN0W3Byb3BlcnR5XSA9IHByb3RvdHlwZVtwcm9wZXJ0eV07XG59O1xuXG5mdW5jdGlvbiBkM192ZW5kb3JTeW1ib2wob2JqZWN0LCBuYW1lKSB7XG4gIGlmIChuYW1lIGluIG9iamVjdCkgcmV0dXJuIG5hbWU7XG4gIG5hbWUgPSBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gZDNfdmVuZG9yUHJlZml4ZXMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgdmFyIHByZWZpeE5hbWUgPSBkM192ZW5kb3JQcmVmaXhlc1tpXSArIG5hbWU7XG4gICAgaWYgKHByZWZpeE5hbWUgaW4gb2JqZWN0KSByZXR1cm4gcHJlZml4TmFtZTtcbiAgfVxufVxuXG52YXIgZDNfdmVuZG9yUHJlZml4ZXMgPSBbXCJ3ZWJraXRcIiwgXCJtc1wiLCBcIm1velwiLCBcIk1velwiLCBcIm9cIiwgXCJPXCJdO1xuXG5mdW5jdGlvbiBkM19zZWxlY3Rpb24oZ3JvdXBzKSB7XG4gIGQzX3N1YmNsYXNzKGdyb3VwcywgZDNfc2VsZWN0aW9uUHJvdG90eXBlKTtcbiAgcmV0dXJuIGdyb3Vwcztcbn1cblxudmFyIGQzX3NlbGVjdCA9IGZ1bmN0aW9uKHMsIG4pIHsgcmV0dXJuIG4ucXVlcnlTZWxlY3RvcihzKTsgfSxcbiAgICBkM19zZWxlY3RBbGwgPSBmdW5jdGlvbihzLCBuKSB7IHJldHVybiBuLnF1ZXJ5U2VsZWN0b3JBbGwocyk7IH0sXG4gICAgZDNfc2VsZWN0TWF0Y2hlciA9IGQzX2RvY3VtZW50RWxlbWVudFtkM192ZW5kb3JTeW1ib2woZDNfZG9jdW1lbnRFbGVtZW50LCBcIm1hdGNoZXNTZWxlY3RvclwiKV0sXG4gICAgZDNfc2VsZWN0TWF0Y2hlcyA9IGZ1bmN0aW9uKG4sIHMpIHsgcmV0dXJuIGQzX3NlbGVjdE1hdGNoZXIuY2FsbChuLCBzKTsgfTtcblxuLy8gUHJlZmVyIFNpenpsZSwgaWYgYXZhaWxhYmxlLlxuaWYgKHR5cGVvZiBTaXp6bGUgPT09IFwiZnVuY3Rpb25cIikge1xuICBkM19zZWxlY3QgPSBmdW5jdGlvbihzLCBuKSB7IHJldHVybiBTaXp6bGUocywgbilbMF0gfHwgbnVsbDsgfTtcbiAgZDNfc2VsZWN0QWxsID0gZnVuY3Rpb24ocywgbikgeyByZXR1cm4gU2l6emxlLnVuaXF1ZVNvcnQoU2l6emxlKHMsIG4pKTsgfTtcbiAgZDNfc2VsZWN0TWF0Y2hlcyA9IFNpenpsZS5tYXRjaGVzU2VsZWN0b3I7XG59XG5cbmQzLnNlbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZDNfc2VsZWN0aW9uUm9vdDtcbn07XG5cbnZhciBkM19zZWxlY3Rpb25Qcm90b3R5cGUgPSBkMy5zZWxlY3Rpb24ucHJvdG90eXBlID0gW107XG5cblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHZhciBzdWJncm91cHMgPSBbXSxcbiAgICAgIHN1Ymdyb3VwLFxuICAgICAgc3Vibm9kZSxcbiAgICAgIGdyb3VwLFxuICAgICAgbm9kZTtcblxuICBzZWxlY3RvciA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBbXSk7XG4gICAgc3ViZ3JvdXAucGFyZW50Tm9kZSA9IChncm91cCA9IHRoaXNbal0pLnBhcmVudE5vZGU7XG4gICAgZm9yICh2YXIgaSA9IC0xLCBuID0gZ3JvdXAubGVuZ3RoOyArK2kgPCBuOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKHN1Ym5vZGUgPSBzZWxlY3Rvci5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopKTtcbiAgICAgICAgaWYgKHN1Ym5vZGUgJiYgXCJfX2RhdGFfX1wiIGluIG5vZGUpIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZDNfc2VsZWN0aW9uKHN1Ymdyb3Vwcyk7XG59O1xuXG5mdW5jdGlvbiBkM19zZWxlY3Rpb25fc2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiID8gc2VsZWN0b3IgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2VsZWN0KHNlbGVjdG9yLCB0aGlzKTtcbiAgfTtcbn1cblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHZhciBzdWJncm91cHMgPSBbXSxcbiAgICAgIHN1Ymdyb3VwLFxuICAgICAgbm9kZTtcblxuICBzZWxlY3RvciA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gZDNfYXJyYXkoc2VsZWN0b3IuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKSkpO1xuICAgICAgICBzdWJncm91cC5wYXJlbnROb2RlID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZDNfc2VsZWN0aW9uKHN1Ymdyb3Vwcyk7XG59O1xuXG5mdW5jdGlvbiBkM19zZWxlY3Rpb25fc2VsZWN0b3JBbGwoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiID8gc2VsZWN0b3IgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2VsZWN0QWxsKHNlbGVjdG9yLCB0aGlzKTtcbiAgfTtcbn1cbnZhciBkM19uc1ByZWZpeCA9IHtcbiAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gIHhodG1sOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIixcbiAgeGxpbms6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLFxuICB4bWw6IFwiaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlXCIsXG4gIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvXCJcbn07XG5cbmQzLm5zID0ge1xuICBwcmVmaXg6IGQzX25zUHJlZml4LFxuICBxdWFsaWZ5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSBuYW1lLmluZGV4T2YoXCI6XCIpLFxuICAgICAgICBwcmVmaXggPSBuYW1lO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHByZWZpeCA9IG5hbWUuc3Vic3RyaW5nKDAsIGkpO1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKGkgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGQzX25zUHJlZml4Lmhhc093blByb3BlcnR5KHByZWZpeClcbiAgICAgICAgPyB7c3BhY2U6IGQzX25zUHJlZml4W3ByZWZpeF0sIGxvY2FsOiBuYW1lfVxuICAgICAgICA6IG5hbWU7XG4gIH1cbn07XG5cbmQzX3NlbGVjdGlvblByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG5cbiAgICAvLyBGb3IgYXR0cihzdHJpbmcpLCByZXR1cm4gdGhlIGF0dHJpYnV0ZSB2YWx1ZSBmb3IgdGhlIGZpcnN0IG5vZGUuXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpO1xuICAgICAgbmFtZSA9IGQzLm5zLnF1YWxpZnkobmFtZSk7XG4gICAgICByZXR1cm4gbmFtZS5sb2NhbFxuICAgICAgICAgID8gbm9kZS5nZXRBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsKVxuICAgICAgICAgIDogbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuXG4gICAgLy8gRm9yIGF0dHIob2JqZWN0KSwgdGhlIG9iamVjdCBzcGVjaWZpZXMgdGhlIG5hbWVzIGFuZCB2YWx1ZXMgb2YgdGhlXG4gICAgLy8gYXR0cmlidXRlcyB0byBzZXQgb3IgcmVtb3ZlLiBUaGUgdmFsdWVzIG1heSBiZSBmdW5jdGlvbnMgdGhhdCBhcmVcbiAgICAvLyBldmFsdWF0ZWQgZm9yIGVhY2ggZWxlbWVudC5cbiAgICBmb3IgKHZhbHVlIGluIG5hbWUpIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fYXR0cih2YWx1ZSwgbmFtZVt2YWx1ZV0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goZDNfc2VsZWN0aW9uX2F0dHIobmFtZSwgdmFsdWUpKTtcbn07XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9hdHRyKG5hbWUsIHZhbHVlKSB7XG4gIG5hbWUgPSBkMy5ucy5xdWFsaWZ5KG5hbWUpO1xuXG4gIC8vIEZvciBhdHRyKHN0cmluZywgbnVsbCksIHJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxuICBmdW5jdGlvbiBhdHRyTnVsbCgpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfVxuICBmdW5jdGlvbiBhdHRyTnVsbE5TKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCk7XG4gIH1cblxuICAvLyBGb3IgYXR0cihzdHJpbmcsIHN0cmluZyksIHNldCB0aGUgYXR0cmlidXRlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxuICBmdW5jdGlvbiBhdHRyQ29uc3RhbnQoKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG4gIGZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCwgdmFsdWUpO1xuICB9XG5cbiAgLy8gRm9yIGF0dHIoc3RyaW5nLCBmdW5jdGlvbiksIGV2YWx1YXRlIHRoZSBmdW5jdGlvbiBmb3IgZWFjaCBlbGVtZW50LCBhbmQgc2V0XG4gIC8vIG9yIHJlbW92ZSB0aGUgYXR0cmlidXRlIGFzIGFwcHJvcHJpYXRlLlxuICBmdW5jdGlvbiBhdHRyRnVuY3Rpb24oKSB7XG4gICAgdmFyIHggPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh4ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgeCk7XG4gIH1cbiAgZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoKSB7XG4gICAgdmFyIHggPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh4ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwsIHgpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlID09IG51bGxcbiAgICAgID8gKG5hbWUubG9jYWwgPyBhdHRyTnVsbE5TIDogYXR0ck51bGwpIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pXG4gICAgICA6IChuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKTtcbn1cbmZ1bmN0aW9uIGQzX2NvbGxhcHNlKHMpIHtcbiAgcmV0dXJuIHMudHJpbSgpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpO1xufVxuZDMucmVxdW90ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZShkM19yZXF1b3RlX3JlLCBcIlxcXFwkJlwiKTtcbn07XG5cbnZhciBkM19yZXF1b3RlX3JlID0gL1tcXFxcXFxeXFwkXFwqXFwrXFw/XFx8XFxbXFxdXFwoXFwpXFwuXFx7XFx9XS9nO1xuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUuY2xhc3NlZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuXG4gICAgLy8gRm9yIGNsYXNzZWQoc3RyaW5nKSwgcmV0dXJuIHRydWUgb25seSBpZiB0aGUgZmlyc3Qgbm9kZSBoYXMgdGhlIHNwZWNpZmllZFxuICAgIC8vIGNsYXNzIG9yIGNsYXNzZXMuIE5vdGUgdGhhdCBldmVuIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIERPTVRva2VuTGlzdCwgaXRcbiAgICAvLyBwcm9iYWJseSBkb2Vzbid0IHN1cHBvcnQgaXQgb24gU1ZHIGVsZW1lbnRzICh3aGljaCBjYW4gYmUgYW5pbWF0ZWQpLlxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUoKSxcbiAgICAgICAgICBuID0gKG5hbWUgPSBkM19zZWxlY3Rpb25fY2xhc3NlcyhuYW1lKSkubGVuZ3RoLFxuICAgICAgICAgIGkgPSAtMTtcbiAgICAgIGlmICh2YWx1ZSA9IG5vZGUuY2xhc3NMaXN0KSB7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIXZhbHVlLmNvbnRhaW5zKG5hbWVbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWQzX3NlbGVjdGlvbl9jbGFzc2VkUmUobmFtZVtpXSkudGVzdCh2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZvciBjbGFzc2VkKG9iamVjdCksIHRoZSBvYmplY3Qgc3BlY2lmaWVzIHRoZSBuYW1lcyBvZiBjbGFzc2VzIHRvIGFkZCBvclxuICAgIC8vIHJlbW92ZS4gVGhlIHZhbHVlcyBtYXkgYmUgZnVuY3Rpb25zIHRoYXQgYXJlIGV2YWx1YXRlZCBmb3IgZWFjaCBlbGVtZW50LlxuICAgIGZvciAodmFsdWUgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9jbGFzc2VkKHZhbHVlLCBuYW1lW3ZhbHVlXSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBib3RoIGEgbmFtZSBhbmQgYSB2YWx1ZSBhcmUgc3BlY2lmaWVkLCBhbmQgYXJlIGhhbmRsZWQgYXMgYmVsb3cuXG4gIHJldHVybiB0aGlzLmVhY2goZDNfc2VsZWN0aW9uX2NsYXNzZWQobmFtZSwgdmFsdWUpKTtcbn07XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9jbGFzc2VkUmUobmFtZSkge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcIig/Ol58XFxcXHMrKVwiICsgZDMucmVxdW90ZShuYW1lKSArIFwiKD86XFxcXHMrfCQpXCIsIFwiZ1wiKTtcbn1cblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NsYXNzZXMobmFtZSkge1xuICByZXR1cm4gbmFtZS50cmltKCkuc3BsaXQoL158XFxzKy8pO1xufVxuXG4vLyBNdWx0aXBsZSBjbGFzcyBuYW1lcyBhcmUgYWxsb3dlZCAoZS5nLiwgXCJmb28gYmFyXCIpLlxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NsYXNzZWQobmFtZSwgdmFsdWUpIHtcbiAgbmFtZSA9IGQzX3NlbGVjdGlvbl9jbGFzc2VzKG5hbWUpLm1hcChkM19zZWxlY3Rpb25fY2xhc3NlZE5hbWUpO1xuICB2YXIgbiA9IG5hbWUubGVuZ3RoO1xuXG4gIGZ1bmN0aW9uIGNsYXNzZWRDb25zdGFudCgpIHtcbiAgICB2YXIgaSA9IC0xO1xuICAgIHdoaWxlICgrK2kgPCBuKSBuYW1lW2ldKHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHZhbHVlIGlzIGEgZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiBpcyBzdGlsbCBldmFsdWF0ZWQgb25seSBvbmNlIHBlclxuICAvLyBlbGVtZW50IGV2ZW4gaWYgdGhlcmUgYXJlIG11bHRpcGxlIGNsYXNzIG5hbWVzLlxuICBmdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24oKSB7XG4gICAgdmFyIGkgPSAtMSwgeCA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgd2hpbGUgKCsraSA8IG4pIG5hbWVbaV0odGhpcywgeCk7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gY2xhc3NlZEZ1bmN0aW9uXG4gICAgICA6IGNsYXNzZWRDb25zdGFudDtcbn1cblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NsYXNzZWROYW1lKG5hbWUpIHtcbiAgdmFyIHJlID0gZDNfc2VsZWN0aW9uX2NsYXNzZWRSZShuYW1lKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUsIHZhbHVlKSB7XG4gICAgaWYgKGMgPSBub2RlLmNsYXNzTGlzdCkgcmV0dXJuIHZhbHVlID8gYy5hZGQobmFtZSkgOiBjLnJlbW92ZShuYW1lKTtcbiAgICB2YXIgYyA9IG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIjtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAoIXJlLnRlc3QoYykpIG5vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgZDNfY29sbGFwc2UoYyArIFwiIFwiICsgbmFtZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGQzX2NvbGxhcHNlKGMucmVwbGFjZShyZSwgXCIgXCIpKSk7XG4gICAgfVxuICB9O1xufVxuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUuc3R5bGUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICBpZiAobiA8IDMpIHtcblxuICAgIC8vIEZvciBzdHlsZShvYmplY3QpIG9yIHN0eWxlKG9iamVjdCwgc3RyaW5nKSwgdGhlIG9iamVjdCBzcGVjaWZpZXMgdGhlXG4gICAgLy8gbmFtZXMgYW5kIHZhbHVlcyBvZiB0aGUgYXR0cmlidXRlcyB0byBzZXQgb3IgcmVtb3ZlLiBUaGUgdmFsdWVzIG1heSBiZVxuICAgIC8vIGZ1bmN0aW9ucyB0aGF0IGFyZSBldmFsdWF0ZWQgZm9yIGVhY2ggZWxlbWVudC4gVGhlIG9wdGlvbmFsIHN0cmluZ1xuICAgIC8vIHNwZWNpZmllcyB0aGUgcHJpb3JpdHkuXG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAobiA8IDIpIHZhbHVlID0gXCJcIjtcbiAgICAgIGZvciAocHJpb3JpdHkgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9zdHlsZShwcmlvcml0eSwgbmFtZVtwcmlvcml0eV0sIHZhbHVlKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBGb3Igc3R5bGUoc3RyaW5nKSwgcmV0dXJuIHRoZSBjb21wdXRlZCBzdHlsZSB2YWx1ZSBmb3IgdGhlIGZpcnN0IG5vZGUuXG4gICAgaWYgKG4gPCAyKSByZXR1cm4gZDNfd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5ub2RlKCksIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG5cbiAgICAvLyBGb3Igc3R5bGUoc3RyaW5nLCBzdHJpbmcpIG9yIHN0eWxlKHN0cmluZywgZnVuY3Rpb24pLCB1c2UgdGhlIGRlZmF1bHRcbiAgICAvLyBwcmlvcml0eS4gVGhlIHByaW9yaXR5IGlzIGlnbm9yZWQgZm9yIHN0eWxlKHN0cmluZywgbnVsbCkuXG4gICAgcHJpb3JpdHkgPSBcIlwiO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBhIG5hbWUsIHZhbHVlIGFuZCBwcmlvcml0eSBhcmUgc3BlY2lmaWVkLCBhbmQgaGFuZGxlZCBhcyBiZWxvdy5cbiAgcmV0dXJuIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fc3R5bGUobmFtZSwgdmFsdWUsIHByaW9yaXR5KSk7XG59O1xuXG5mdW5jdGlvbiBkM19zZWxlY3Rpb25fc3R5bGUobmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG5cbiAgLy8gRm9yIHN0eWxlKG5hbWUsIG51bGwpIG9yIHN0eWxlKG5hbWUsIG51bGwsIHByaW9yaXR5KSwgcmVtb3ZlIHRoZSBzdHlsZVxuICAvLyBwcm9wZXJ0eSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS4gVGhlIHByaW9yaXR5IGlzIGlnbm9yZWQuXG4gIGZ1bmN0aW9uIHN0eWxlTnVsbCgpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9XG5cbiAgLy8gRm9yIHN0eWxlKG5hbWUsIHN0cmluZykgb3Igc3R5bGUobmFtZSwgc3RyaW5nLCBwcmlvcml0eSksIHNldCB0aGUgc3R5bGVcbiAgLy8gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJpb3JpdHkuXG4gIGZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQoKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICB9XG5cbiAgLy8gRm9yIHN0eWxlKG5hbWUsIGZ1bmN0aW9uKSBvciBzdHlsZShuYW1lLCBmdW5jdGlvbiwgcHJpb3JpdHkpLCBldmFsdWF0ZSB0aGVcbiAgLy8gZnVuY3Rpb24gZm9yIGVhY2ggZWxlbWVudCwgYW5kIHNldCBvciByZW1vdmUgdGhlIHN0eWxlIHByb3BlcnR5IGFzXG4gIC8vIGFwcHJvcHJpYXRlLiBXaGVuIHNldHRpbmcsIHVzZSB0aGUgc3BlY2lmaWVkIHByaW9yaXR5LlxuICBmdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoeCA9PSBudWxsKSB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB4LCBwcmlvcml0eSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWUgPT0gbnVsbFxuICAgICAgPyBzdHlsZU51bGwgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gc3R5bGVGdW5jdGlvbiA6IHN0eWxlQ29uc3RhbnQpO1xufVxuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUucHJvcGVydHkgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcblxuICAgIC8vIEZvciBwcm9wZXJ0eShzdHJpbmcpLCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIGZvciB0aGUgZmlyc3Qgbm9kZS5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzLm5vZGUoKVtuYW1lXTtcblxuICAgIC8vIEZvciBwcm9wZXJ0eShvYmplY3QpLCB0aGUgb2JqZWN0IHNwZWNpZmllcyB0aGUgbmFtZXMgYW5kIHZhbHVlcyBvZiB0aGVcbiAgICAvLyBwcm9wZXJ0aWVzIHRvIHNldCBvciByZW1vdmUuIFRoZSB2YWx1ZXMgbWF5IGJlIGZ1bmN0aW9ucyB0aGF0IGFyZVxuICAgIC8vIGV2YWx1YXRlZCBmb3IgZWFjaCBlbGVtZW50LlxuICAgIGZvciAodmFsdWUgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9wcm9wZXJ0eSh2YWx1ZSwgbmFtZVt2YWx1ZV0pKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIE90aGVyd2lzZSwgYm90aCBhIG5hbWUgYW5kIGEgdmFsdWUgYXJlIHNwZWNpZmllZCwgYW5kIGFyZSBoYW5kbGVkIGFzIGJlbG93LlxuICByZXR1cm4gdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9wcm9wZXJ0eShuYW1lLCB2YWx1ZSkpO1xufTtcblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX3Byb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG5cbiAgLy8gRm9yIHByb3BlcnR5KG5hbWUsIG51bGwpLCByZW1vdmUgdGhlIHByb3BlcnR5IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLlxuICBmdW5jdGlvbiBwcm9wZXJ0eU51bGwoKSB7XG4gICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gIH1cblxuICAvLyBGb3IgcHJvcGVydHkobmFtZSwgc3RyaW5nKSwgc2V0IHRoZSBwcm9wZXJ0eSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS5cbiAgZnVuY3Rpb24gcHJvcGVydHlDb25zdGFudCgpIHtcbiAgICB0aGlzW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICAvLyBGb3IgcHJvcGVydHkobmFtZSwgZnVuY3Rpb24pLCBldmFsdWF0ZSB0aGUgZnVuY3Rpb24gZm9yIGVhY2ggZWxlbWVudCwgYW5kXG4gIC8vIHNldCBvciByZW1vdmUgdGhlIHByb3BlcnR5IGFzIGFwcHJvcHJpYXRlLlxuICBmdW5jdGlvbiBwcm9wZXJ0eUZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoeCA9PSBudWxsKSBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICBlbHNlIHRoaXNbbmFtZV0gPSB4O1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlID09IG51bGxcbiAgICAgID8gcHJvcGVydHlOdWxsIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHByb3BlcnR5RnVuY3Rpb24gOiBwcm9wZXJ0eUNvbnN0YW50KTtcbn1cblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gZnVuY3Rpb24oKSB7IHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgdGhpcy50ZXh0Q29udGVudCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2OyB9IDogdmFsdWUgPT0gbnVsbFxuICAgICAgPyBmdW5jdGlvbigpIHsgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7IH1cbiAgICAgIDogZnVuY3Rpb24oKSB7IHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTsgfSlcbiAgICAgIDogdGhpcy5ub2RlKCkudGV4dENvbnRlbnQ7XG59O1xuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBmdW5jdGlvbigpIHsgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2OyB9IDogdmFsdWUgPT0gbnVsbFxuICAgICAgPyBmdW5jdGlvbigpIHsgdGhpcy5pbm5lckhUTUwgPSBcIlwiOyB9XG4gICAgICA6IGZ1bmN0aW9uKCkgeyB0aGlzLmlubmVySFRNTCA9IHZhbHVlOyB9KVxuICAgICAgOiB0aGlzLm5vZGUoKS5pbm5lckhUTUw7XG59O1xuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSkge1xuICBuYW1lID0gZDNfc2VsZWN0aW9uX2NyZWF0b3IobmFtZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChuYW1lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9jcmVhdG9yKG5hbWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lXG4gICAgICA6IChuYW1lID0gZDMubnMucXVhbGlmeShuYW1lKSkubG9jYWwgPyBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCk7IH1cbiAgICAgIDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMubmFtZXNwYWNlVVJJLCBuYW1lKTsgfTtcbn1cblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKG5hbWUsIGJlZm9yZSkge1xuICBuYW1lID0gZDNfc2VsZWN0aW9uX2NyZWF0b3IobmFtZSk7XG4gIGJlZm9yZSA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvcihiZWZvcmUpO1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0QmVmb3JlKG5hbWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgYmVmb3JlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgbnVsbCk7XG4gIH0pO1xufTtcblxuLy8gVE9ETyByZW1vdmUoc2VsZWN0b3IpP1xuLy8gVE9ETyByZW1vdmUobm9kZSk/XG4vLyBUT0RPIHJlbW92ZShmdW5jdGlvbik/XG5kM19zZWxlY3Rpb25Qcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIH0pO1xufTtcbmZ1bmN0aW9uIGQzX2NsYXNzKGN0b3IsIHByb3BlcnRpZXMpIHtcbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0b3IucHJvdG90eXBlLCBrZXksIHtcbiAgICAgICAgdmFsdWU6IHByb3BlcnRpZXNba2V5XSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGN0b3IucHJvdG90eXBlID0gcHJvcGVydGllcztcbiAgfVxufVxuXG5kMy5tYXAgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIG1hcCA9IG5ldyBkM19NYXA7XG4gIGlmIChvYmplY3QgaW5zdGFuY2VvZiBkM19NYXApIG9iamVjdC5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHsgbWFwLnNldChrZXksIHZhbHVlKTsgfSk7XG4gIGVsc2UgZm9yICh2YXIga2V5IGluIG9iamVjdCkgbWFwLnNldChrZXksIG9iamVjdFtrZXldKTtcbiAgcmV0dXJuIG1hcDtcbn07XG5cbmZ1bmN0aW9uIGQzX01hcCgpIHt9XG5cbmQzX2NsYXNzKGQzX01hcCwge1xuICBoYXM6IGQzX21hcF9oYXMsXG4gIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXNbZDNfbWFwX3ByZWZpeCArIGtleV07XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzW2QzX21hcF9wcmVmaXggKyBrZXldID0gdmFsdWU7XG4gIH0sXG4gIHJlbW92ZTogZDNfbWFwX3JlbW92ZSxcbiAga2V5czogZDNfbWFwX2tleXMsXG4gIHZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbHVlKSB7IHZhbHVlcy5wdXNoKHZhbHVlKTsgfSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSxcbiAgZW50cmllczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVudHJpZXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oa2V5LCB2YWx1ZSkgeyBlbnRyaWVzLnB1c2goe2tleToga2V5LCB2YWx1ZTogdmFsdWV9KTsgfSk7XG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH0sXG4gIHNpemU6IGQzX21hcF9zaXplLFxuICBlbXB0eTogZDNfbWFwX2VtcHR5LFxuICBmb3JFYWNoOiBmdW5jdGlvbihmKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMpIGlmIChrZXkuY2hhckNvZGVBdCgwKSA9PT0gZDNfbWFwX3ByZWZpeENvZGUpIGYuY2FsbCh0aGlzLCBrZXkuc3Vic3RyaW5nKDEpLCB0aGlzW2tleV0pO1xuICB9XG59KTtcblxudmFyIGQzX21hcF9wcmVmaXggPSBcIlxcMFwiLCAvLyBwcmV2ZW50IGNvbGxpc2lvbiB3aXRoIGJ1aWx0LWluc1xuICAgIGQzX21hcF9wcmVmaXhDb2RlID0gZDNfbWFwX3ByZWZpeC5jaGFyQ29kZUF0KDApO1xuXG5mdW5jdGlvbiBkM19tYXBfaGFzKGtleSkge1xuICByZXR1cm4gZDNfbWFwX3ByZWZpeCArIGtleSBpbiB0aGlzO1xufVxuXG5mdW5jdGlvbiBkM19tYXBfcmVtb3ZlKGtleSkge1xuICBrZXkgPSBkM19tYXBfcHJlZml4ICsga2V5O1xuICByZXR1cm4ga2V5IGluIHRoaXMgJiYgZGVsZXRlIHRoaXNba2V5XTtcbn1cblxuZnVuY3Rpb24gZDNfbWFwX2tleXMoKSB7XG4gIHZhciBrZXlzID0gW107XG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHsga2V5cy5wdXNoKGtleSk7IH0pO1xuICByZXR1cm4ga2V5cztcbn1cblxuZnVuY3Rpb24gZDNfbWFwX3NpemUoKSB7XG4gIHZhciBzaXplID0gMDtcbiAgZm9yICh2YXIga2V5IGluIHRoaXMpIGlmIChrZXkuY2hhckNvZGVBdCgwKSA9PT0gZDNfbWFwX3ByZWZpeENvZGUpICsrc2l6ZTtcbiAgcmV0dXJuIHNpemU7XG59XG5cbmZ1bmN0aW9uIGQzX21hcF9lbXB0eSgpIHtcbiAgZm9yICh2YXIga2V5IGluIHRoaXMpIGlmIChrZXkuY2hhckNvZGVBdCgwKSA9PT0gZDNfbWFwX3ByZWZpeENvZGUpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmQzX3NlbGVjdGlvblByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICB2YXIgaSA9IC0xLFxuICAgICAgbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgZ3JvdXAsXG4gICAgICBub2RlO1xuXG4gIC8vIElmIG5vIHZhbHVlIGlzIHNwZWNpZmllZCwgcmV0dXJuIHRoZSBmaXJzdCB2YWx1ZS5cbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdmFsdWUgPSBuZXcgQXJyYXkobiA9IChncm91cCA9IHRoaXNbMF0pLmxlbmd0aCk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFsdWVbaV0gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kKGdyb3VwLCBncm91cERhdGEpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbiA9IGdyb3VwLmxlbmd0aCxcbiAgICAgICAgbSA9IGdyb3VwRGF0YS5sZW5ndGgsXG4gICAgICAgIG4wID0gTWF0aC5taW4obiwgbSksXG4gICAgICAgIHVwZGF0ZU5vZGVzID0gbmV3IEFycmF5KG0pLFxuICAgICAgICBlbnRlck5vZGVzID0gbmV3IEFycmF5KG0pLFxuICAgICAgICBleGl0Tm9kZXMgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIG5vZGUsXG4gICAgICAgIG5vZGVEYXRhO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgdmFyIG5vZGVCeUtleVZhbHVlID0gbmV3IGQzX01hcCxcbiAgICAgICAgICBkYXRhQnlLZXlWYWx1ZSA9IG5ldyBkM19NYXAsXG4gICAgICAgICAga2V5VmFsdWVzID0gW10sXG4gICAgICAgICAga2V5VmFsdWU7XG5cbiAgICAgIGZvciAoaSA9IC0xOyArK2kgPCBuOykge1xuICAgICAgICBrZXlWYWx1ZSA9IGtleS5jYWxsKG5vZGUgPSBncm91cFtpXSwgbm9kZS5fX2RhdGFfXywgaSk7XG4gICAgICAgIGlmIChub2RlQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWUpKSB7XG4gICAgICAgICAgZXhpdE5vZGVzW2ldID0gbm9kZTsgLy8gZHVwbGljYXRlIHNlbGVjdGlvbiBrZXlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlQnlLZXlWYWx1ZS5zZXQoa2V5VmFsdWUsIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGtleVZhbHVlcy5wdXNoKGtleVZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gLTE7ICsraSA8IG07KSB7XG4gICAgICAgIGtleVZhbHVlID0ga2V5LmNhbGwoZ3JvdXBEYXRhLCBub2RlRGF0YSA9IGdyb3VwRGF0YVtpXSwgaSk7XG4gICAgICAgIGlmIChub2RlID0gbm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlKSkge1xuICAgICAgICAgIHVwZGF0ZU5vZGVzW2ldID0gbm9kZTtcbiAgICAgICAgICBub2RlLl9fZGF0YV9fID0gbm9kZURhdGE7XG4gICAgICAgIH0gZWxzZSBpZiAoIWRhdGFCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZSkpIHsgLy8gbm8gZHVwbGljYXRlIGRhdGEga2V5XG4gICAgICAgICAgZW50ZXJOb2Rlc1tpXSA9IGQzX3NlbGVjdGlvbl9kYXRhTm9kZShub2RlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YUJ5S2V5VmFsdWUuc2V0KGtleVZhbHVlLCBub2RlRGF0YSk7XG4gICAgICAgIG5vZGVCeUtleVZhbHVlLnJlbW92ZShrZXlWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IC0xOyArK2kgPCBuOykge1xuICAgICAgICBpZiAobm9kZUJ5S2V5VmFsdWUuaGFzKGtleVZhbHVlc1tpXSkpIHtcbiAgICAgICAgICBleGl0Tm9kZXNbaV0gPSBncm91cFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAtMTsgKytpIDwgbjA7KSB7XG4gICAgICAgIG5vZGUgPSBncm91cFtpXTtcbiAgICAgICAgbm9kZURhdGEgPSBncm91cERhdGFbaV07XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgbm9kZS5fX2RhdGFfXyA9IG5vZGVEYXRhO1xuICAgICAgICAgIHVwZGF0ZU5vZGVzW2ldID0gbm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbnRlck5vZGVzW2ldID0gZDNfc2VsZWN0aW9uX2RhdGFOb2RlKG5vZGVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICg7IGkgPCBtOyArK2kpIHtcbiAgICAgICAgZW50ZXJOb2Rlc1tpXSA9IGQzX3NlbGVjdGlvbl9kYXRhTm9kZShncm91cERhdGFbaV0pO1xuICAgICAgfVxuICAgICAgZm9yICg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgZXhpdE5vZGVzW2ldID0gZ3JvdXBbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZW50ZXJOb2Rlcy51cGRhdGVcbiAgICAgICAgPSB1cGRhdGVOb2RlcztcblxuICAgIGVudGVyTm9kZXMucGFyZW50Tm9kZVxuICAgICAgICA9IHVwZGF0ZU5vZGVzLnBhcmVudE5vZGVcbiAgICAgICAgPSBleGl0Tm9kZXMucGFyZW50Tm9kZVxuICAgICAgICA9IGdyb3VwLnBhcmVudE5vZGU7XG5cbiAgICBlbnRlci5wdXNoKGVudGVyTm9kZXMpO1xuICAgIHVwZGF0ZS5wdXNoKHVwZGF0ZU5vZGVzKTtcbiAgICBleGl0LnB1c2goZXhpdE5vZGVzKTtcbiAgfVxuXG4gIHZhciBlbnRlciA9IGQzX3NlbGVjdGlvbl9lbnRlcihbXSksXG4gICAgICB1cGRhdGUgPSBkM19zZWxlY3Rpb24oW10pLFxuICAgICAgZXhpdCA9IGQzX3NlbGVjdGlvbihbXSk7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGJpbmQoZ3JvdXAgPSB0aGlzW2ldLCB2YWx1ZS5jYWxsKGdyb3VwLCBncm91cC5wYXJlbnROb2RlLl9fZGF0YV9fLCBpKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBiaW5kKGdyb3VwID0gdGhpc1tpXSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZS5lbnRlciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZW50ZXI7IH07XG4gIHVwZGF0ZS5leGl0ID0gZnVuY3Rpb24oKSB7IHJldHVybiBleGl0OyB9O1xuICByZXR1cm4gdXBkYXRlO1xufTtcblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2RhdGFOb2RlKGRhdGEpIHtcbiAgcmV0dXJuIHtfX2RhdGFfXzogZGF0YX07XG59XG5cbmQzX3NlbGVjdGlvblByb3RvdHlwZS5kYXR1bSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5wcm9wZXJ0eShcIl9fZGF0YV9fXCIpO1xufTtcblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlcikge1xuICB2YXIgc3ViZ3JvdXBzID0gW10sXG4gICAgICBzdWJncm91cCxcbiAgICAgIGdyb3VwLFxuICAgICAgbm9kZTtcblxuICBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJmdW5jdGlvblwiKSBmaWx0ZXIgPSBkM19zZWxlY3Rpb25fZmlsdGVyKGZpbHRlcik7XG5cbiAgZm9yICh2YXIgaiA9IDAsIG0gPSB0aGlzLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgIHN1Ymdyb3VwLnBhcmVudE5vZGUgPSAoZ3JvdXAgPSB0aGlzW2pdKS5wYXJlbnROb2RlO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgZmlsdGVyLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaikpIHtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZDNfc2VsZWN0aW9uKHN1Ymdyb3Vwcyk7XG59O1xuXG5mdW5jdGlvbiBkM19zZWxlY3Rpb25fZmlsdGVyKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2VsZWN0TWF0Y2hlcyh0aGlzLCBzZWxlY3Rvcik7XG4gIH07XG59XG5cbmQzX3NlbGVjdGlvblByb3RvdHlwZS5vcmRlciA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBqID0gLTEsIG0gPSB0aGlzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IHRoaXNbal0sIGkgPSBncm91cC5sZW5ndGggLSAxLCBuZXh0ID0gZ3JvdXBbaV0sIG5vZGU7IC0taSA+PSAwOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBpZiAobmV4dCAmJiBuZXh0ICE9PSBub2RlLm5leHRTaWJsaW5nKSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuZDMuYXNjZW5kaW5nID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG59O1xuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgY29tcGFyYXRvciA9IGQzX3NlbGVjdGlvbl9zb3J0Q29tcGFyYXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBmb3IgKHZhciBqID0gLTEsIG0gPSB0aGlzLmxlbmd0aDsgKytqIDwgbTspIHRoaXNbal0uc29ydChjb21wYXJhdG9yKTtcbiAgcmV0dXJuIHRoaXMub3JkZXIoKTtcbn07XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9zb3J0Q29tcGFyYXRvcihjb21wYXJhdG9yKSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgY29tcGFyYXRvciA9IGQzLmFzY2VuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gY29tcGFyYXRvcihhLl9fZGF0YV9fLCBiLl9fZGF0YV9fKSA6ICFhIC0gIWI7XG4gIH07XG59XG5mdW5jdGlvbiBkM19ub29wKCkge31cblxuZDMuZGlzcGF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRpc3BhdGNoID0gbmV3IGQzX2Rpc3BhdGNoLFxuICAgICAgaSA9IC0xLFxuICAgICAgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBkaXNwYXRjaFthcmd1bWVudHNbaV1dID0gZDNfZGlzcGF0Y2hfZXZlbnQoZGlzcGF0Y2gpO1xuICByZXR1cm4gZGlzcGF0Y2g7XG59O1xuXG5mdW5jdGlvbiBkM19kaXNwYXRjaCgpIHt9XG5cbmQzX2Rpc3BhdGNoLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBpID0gdHlwZS5pbmRleE9mKFwiLlwiKSxcbiAgICAgIG5hbWUgPSBcIlwiO1xuXG4gIC8vIEV4dHJhY3Qgb3B0aW9uYWwgbmFtZXNwYWNlLCBlLmcuLCBcImNsaWNrLmZvb1wiXG4gIGlmIChpID49IDApIHtcbiAgICBuYW1lID0gdHlwZS5zdWJzdHJpbmcoaSArIDEpO1xuICAgIHR5cGUgPSB0eXBlLnN1YnN0cmluZygwLCBpKTtcbiAgfVxuXG4gIGlmICh0eXBlKSByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDJcbiAgICAgID8gdGhpc1t0eXBlXS5vbihuYW1lKVxuICAgICAgOiB0aGlzW3R5cGVdLm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIGlmIChsaXN0ZW5lciA9PSBudWxsKSBmb3IgKHR5cGUgaW4gdGhpcykge1xuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHRoaXNbdHlwZV0ub24obmFtZSwgbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkM19kaXNwYXRjaF9ldmVudChkaXNwYXRjaCkge1xuICB2YXIgbGlzdGVuZXJzID0gW10sXG4gICAgICBsaXN0ZW5lckJ5TmFtZSA9IG5ldyBkM19NYXA7XG5cbiAgZnVuY3Rpb24gZXZlbnQoKSB7XG4gICAgdmFyIHogPSBsaXN0ZW5lcnMsIC8vIGRlZmVuc2l2ZSByZWZlcmVuY2VcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gei5sZW5ndGgsXG4gICAgICAgIGw7XG4gICAgd2hpbGUgKCsraSA8IG4pIGlmIChsID0geltpXS5vbikgbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBkaXNwYXRjaDtcbiAgfVxuXG4gIGV2ZW50Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgICB2YXIgbCA9IGxpc3RlbmVyQnlOYW1lLmdldChuYW1lKSxcbiAgICAgICAgaTtcblxuICAgIC8vIHJldHVybiB0aGUgY3VycmVudCBsaXN0ZW5lciwgaWYgYW55XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gbCAmJiBsLm9uO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBvbGQgbGlzdGVuZXIsIGlmIGFueSAod2l0aCBjb3B5LW9uLXdyaXRlKVxuICAgIGlmIChsKSB7XG4gICAgICBsLm9uID0gbnVsbDtcbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgwLCBpID0gbGlzdGVuZXJzLmluZGV4T2YobCkpLmNvbmNhdChsaXN0ZW5lcnMuc2xpY2UoaSArIDEpKTtcbiAgICAgIGxpc3RlbmVyQnlOYW1lLnJlbW92ZShuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhlIG5ldyBsaXN0ZW5lciwgaWYgYW55XG4gICAgaWYgKGxpc3RlbmVyKSBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lckJ5TmFtZS5zZXQobmFtZSwge29uOiBsaXN0ZW5lcn0pKTtcblxuICAgIHJldHVybiBkaXNwYXRjaDtcbiAgfTtcblxuICByZXR1cm4gZXZlbnQ7XG59XG5cbmQzLmV2ZW50ID0gbnVsbDtcblxuZnVuY3Rpb24gZDNfZXZlbnRQcmV2ZW50RGVmYXVsdCgpIHtcbiAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gZDNfZXZlbnRTb3VyY2UoKSB7XG4gIHZhciBlID0gZDMuZXZlbnQsIHM7XG4gIHdoaWxlIChzID0gZS5zb3VyY2VFdmVudCkgZSA9IHM7XG4gIHJldHVybiBlO1xufVxuXG4vLyBMaWtlIGQzLmRpc3BhdGNoLCBidXQgZm9yIGN1c3RvbSBldmVudHMgYWJzdHJhY3RpbmcgbmF0aXZlIFVJIGV2ZW50cy4gVGhlc2Vcbi8vIGV2ZW50cyBoYXZlIGEgdGFyZ2V0IGNvbXBvbmVudCAoc3VjaCBhcyBhIGJydXNoKSwgYSB0YXJnZXQgZWxlbWVudCAoc3VjaCBhc1xuLy8gdGhlIHN2ZzpnIGVsZW1lbnQgY29udGFpbmluZyB0aGUgYnJ1c2gpIGFuZCB0aGUgc3RhbmRhcmQgYXJndW1lbnRzIGBkYCAodGhlXG4vLyB0YXJnZXQgZWxlbWVudCdzIGRhdGEpIGFuZCBgaWAgKHRoZSBzZWxlY3Rpb24gaW5kZXggb2YgdGhlIHRhcmdldCBlbGVtZW50KS5cbmZ1bmN0aW9uIGQzX2V2ZW50RGlzcGF0Y2godGFyZ2V0KSB7XG4gIHZhciBkaXNwYXRjaCA9IG5ldyBkM19kaXNwYXRjaCxcbiAgICAgIGkgPSAwLFxuICAgICAgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraSA8IG4pIGRpc3BhdGNoW2FyZ3VtZW50c1tpXV0gPSBkM19kaXNwYXRjaF9ldmVudChkaXNwYXRjaCk7XG5cbiAgLy8gQ3JlYXRlcyBhIGRpc3BhdGNoIGNvbnRleHQgZm9yIHRoZSBzcGVjaWZpZWQgYHRoaXpgICh0eXBpY2FsbHksIHRoZSB0YXJnZXRcbiAgLy8gRE9NIGVsZW1lbnQgdGhhdCByZWNlaXZlZCB0aGUgc291cmNlIGV2ZW50KSBhbmQgYGFyZ3VtZW50emAgKHR5cGljYWxseSwgdGhlXG4gIC8vIGRhdGEgYGRgIGFuZCBpbmRleCBgaWAgb2YgdGhlIHRhcmdldCBlbGVtZW50KS4gVGhlIHJldHVybmVkIGZ1bmN0aW9uIGNhbiBiZVxuICAvLyB1c2VkIHRvIGRpc3BhdGNoIGFuIGV2ZW50IHRvIGFueSByZWdpc3RlcmVkIGxpc3RlbmVyczsgdGhlIGZ1bmN0aW9uIHRha2VzIGFcbiAgLy8gc2luZ2xlIGFyZ3VtZW50IGFzIGlucHV0LCBiZWluZyB0aGUgZXZlbnQgdG8gZGlzcGF0Y2guIFRoZSBldmVudCBtdXN0IGhhdmVcbiAgLy8gYSBcInR5cGVcIiBhdHRyaWJ1dGUgd2hpY2ggY29ycmVzcG9uZHMgdG8gYSB0eXBlIHJlZ2lzdGVyZWQgaW4gdGhlXG4gIC8vIGNvbnN0cnVjdG9yLiBUaGlzIGNvbnRleHQgd2lsbCBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBcInNvdXJjZUV2ZW50XCIgYW5kXG4gIC8vIFwidGFyZ2V0XCIgYXR0cmlidXRlcyBvZiB0aGUgZXZlbnQsIGFzIHdlbGwgYXMgc2V0dGluZyB0aGUgYGQzLmV2ZW50YCBnbG9iYWxcbiAgLy8gZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgbm90aWZpY2F0aW9uLlxuICBkaXNwYXRjaC5vZiA9IGZ1bmN0aW9uKHRoaXosIGFyZ3VtZW50eikge1xuICAgIHJldHVybiBmdW5jdGlvbihlMSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGUwID1cbiAgICAgICAgZTEuc291cmNlRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgZTEudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBkMy5ldmVudCA9IGUxO1xuICAgICAgICBkaXNwYXRjaFtlMS50eXBlXS5hcHBseSh0aGl6LCBhcmd1bWVudHopO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZDMuZXZlbnQgPSBlMDtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBkaXNwYXRjaDtcbn1cblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICBpZiAobiA8IDMpIHtcblxuICAgIC8vIEZvciBvbihvYmplY3QpIG9yIG9uKG9iamVjdCwgYm9vbGVhbiksIHRoZSBvYmplY3Qgc3BlY2lmaWVzIHRoZSBldmVudFxuICAgIC8vIHR5cGVzIGFuZCBsaXN0ZW5lcnMgdG8gYWRkIG9yIHJlbW92ZS4gVGhlIG9wdGlvbmFsIGJvb2xlYW4gc3BlY2lmaWVzXG4gICAgLy8gd2hldGhlciB0aGUgbGlzdGVuZXIgY2FwdHVyZXMgZXZlbnRzLlxuICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKG4gPCAyKSBsaXN0ZW5lciA9IGZhbHNlO1xuICAgICAgZm9yIChjYXB0dXJlIGluIHR5cGUpIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fb24oY2FwdHVyZSwgdHlwZVtjYXB0dXJlXSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEZvciBvbihzdHJpbmcpLCByZXR1cm4gdGhlIGxpc3RlbmVyIGZvciB0aGUgZmlyc3Qgbm9kZS5cbiAgICBpZiAobiA8IDIpIHJldHVybiAobiA9IHRoaXMubm9kZSgpW1wiX19vblwiICsgdHlwZV0pICYmIG4uXztcblxuICAgIC8vIEZvciBvbihzdHJpbmcsIGZ1bmN0aW9uKSwgdXNlIHRoZSBkZWZhdWx0IGNhcHR1cmUuXG4gICAgY2FwdHVyZSA9IGZhbHNlO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBhIHR5cGUsIGxpc3RlbmVyIGFuZCBjYXB0dXJlIGFyZSBzcGVjaWZpZWQsIGFuZCBoYW5kbGVkIGFzIGJlbG93LlxuICByZXR1cm4gdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9vbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkpO1xufTtcblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX29uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gIHZhciBuYW1lID0gXCJfX29uXCIgKyB0eXBlLFxuICAgICAgaSA9IHR5cGUuaW5kZXhPZihcIi5cIiksXG4gICAgICB3cmFwID0gZDNfc2VsZWN0aW9uX29uTGlzdGVuZXI7XG5cbiAgaWYgKGkgPiAwKSB0eXBlID0gdHlwZS5zdWJzdHJpbmcoMCwgaSk7XG4gIHZhciBmaWx0ZXIgPSBkM19zZWxlY3Rpb25fb25GaWx0ZXJzLmdldCh0eXBlKTtcbiAgaWYgKGZpbHRlcikgdHlwZSA9IGZpbHRlciwgd3JhcCA9IGQzX3NlbGVjdGlvbl9vbkZpbHRlcjtcblxuICBmdW5jdGlvbiBvblJlbW92ZSgpIHtcbiAgICB2YXIgbCA9IHRoaXNbbmFtZV07XG4gICAgaWYgKGwpIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsLCBsLiQpO1xuICAgICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25BZGQoKSB7XG4gICAgdmFyIGwgPSB3cmFwKGxpc3RlbmVyLCBkM19hcnJheShhcmd1bWVudHMpKTtcbiAgICBvblJlbW92ZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzW25hbWVdID0gbCwgbC4kID0gY2FwdHVyZSk7XG4gICAgbC5fID0gbGlzdGVuZXI7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbGwoKSB7XG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcIl5fX29uKFteLl0rKVwiICsgZDMucmVxdW90ZSh0eXBlKSArIFwiJFwiKSxcbiAgICAgICAgbWF0Y2g7XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICBpZiAobWF0Y2ggPSBuYW1lLm1hdGNoKHJlKSkge1xuICAgICAgICB2YXIgbCA9IHRoaXNbbmFtZV07XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihtYXRjaFsxXSwgbCwgbC4kKTtcbiAgICAgICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlcbiAgICAgID8gbGlzdGVuZXIgPyBvbkFkZCA6IG9uUmVtb3ZlXG4gICAgICA6IGxpc3RlbmVyID8gZDNfbm9vcCA6IHJlbW92ZUFsbDtcbn1cblxudmFyIGQzX3NlbGVjdGlvbl9vbkZpbHRlcnMgPSBkMy5tYXAoe1xuICBtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuICBtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCJcbn0pO1xuXG5kM19zZWxlY3Rpb25fb25GaWx0ZXJzLmZvckVhY2goZnVuY3Rpb24oaykge1xuICBpZiAoXCJvblwiICsgayBpbiBkM19kb2N1bWVudCkgZDNfc2VsZWN0aW9uX29uRmlsdGVycy5yZW1vdmUoayk7XG59KTtcblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX29uTGlzdGVuZXIobGlzdGVuZXIsIGFyZ3VtZW50eikge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHZhciBvID0gZDMuZXZlbnQ7IC8vIEV2ZW50cyBjYW4gYmUgcmVlbnRyYW50IChlLmcuLCBmb2N1cykuXG4gICAgZDMuZXZlbnQgPSBlO1xuICAgIGFyZ3VtZW50elswXSA9IHRoaXMuX19kYXRhX187XG4gICAgdHJ5IHtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50eik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGQzLmV2ZW50ID0gbztcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9vbkZpbHRlcihsaXN0ZW5lciwgYXJndW1lbnR6KSB7XG4gIHZhciBsID0gZDNfc2VsZWN0aW9uX29uTGlzdGVuZXIobGlzdGVuZXIsIGFyZ3VtZW50eik7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMsIHJlbGF0ZWQgPSBlLnJlbGF0ZWRUYXJnZXQ7XG4gICAgaWYgKCFyZWxhdGVkIHx8IChyZWxhdGVkICE9PSB0YXJnZXQgJiYgIShyZWxhdGVkLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHRhcmdldCkgJiA4KSkpIHtcbiAgICAgIGwuY2FsbCh0YXJnZXQsIGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICByZXR1cm4gZDNfc2VsZWN0aW9uX2VhY2godGhpcywgZnVuY3Rpb24obm9kZSwgaSwgaikge1xuICAgIGNhbGxiYWNrLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaik7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2VhY2goZ3JvdXBzLCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGNhbGxiYWNrKG5vZGUsIGksIGopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZ3JvdXBzO1xufVxuXG5kM19zZWxlY3Rpb25Qcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBhcmdzID0gZDNfYXJyYXkoYXJndW1lbnRzKTtcbiAgY2FsbGJhY2suYXBwbHkoYXJnc1swXSA9IHRoaXMsIGFyZ3MpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmQzX3NlbGVjdGlvblByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMubm9kZSgpO1xufTtcblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaiA9IDAsIG0gPSB0aGlzLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgIGZvciAodmFyIGdyb3VwID0gdGhpc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIHZhciBub2RlID0gZ3JvdXBbaV07XG4gICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG4gPSAwO1xuICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7ICsrbjsgfSk7XG4gIHJldHVybiBuO1xufTtcblxuZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2VudGVyKHNlbGVjdGlvbikge1xuICBkM19zdWJjbGFzcyhzZWxlY3Rpb24sIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZSk7XG4gIHJldHVybiBzZWxlY3Rpb247XG59XG5cbnZhciBkM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGUgPSBbXTtcblxuZDMuc2VsZWN0aW9uLmVudGVyID0gZDNfc2VsZWN0aW9uX2VudGVyO1xuZDMuc2VsZWN0aW9uLmVudGVyLnByb3RvdHlwZSA9IGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZTtcblxuZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLmFwcGVuZCA9IGQzX3NlbGVjdGlvblByb3RvdHlwZS5hcHBlbmQ7XG5kM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGUuZW1wdHkgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuZW1wdHk7XG5kM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGUubm9kZSA9IGQzX3NlbGVjdGlvblByb3RvdHlwZS5ub2RlO1xuZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLmNhbGwgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuY2FsbDtcbmQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5zaXplID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNpemU7XG5cblxuZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHZhciBzdWJncm91cHMgPSBbXSxcbiAgICAgIHN1Ymdyb3VwLFxuICAgICAgc3Vibm9kZSxcbiAgICAgIHVwZ3JvdXAsXG4gICAgICBncm91cCxcbiAgICAgIG5vZGU7XG5cbiAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgdXBncm91cCA9IChncm91cCA9IHRoaXNbal0pLnVwZGF0ZTtcbiAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICBzdWJncm91cC5wYXJlbnROb2RlID0gZ3JvdXAucGFyZW50Tm9kZTtcbiAgICBmb3IgKHZhciBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2godXBncm91cFtpXSA9IHN1Ym5vZGUgPSBzZWxlY3Rvci5jYWxsKGdyb3VwLnBhcmVudE5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopKTtcbiAgICAgICAgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJncm91cC5wdXNoKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkM19zZWxlY3Rpb24oc3ViZ3JvdXBzKTtcbn07XG5cbmQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbihuYW1lLCBiZWZvcmUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSBiZWZvcmUgPSBkM19zZWxlY3Rpb25fZW50ZXJJbnNlcnRCZWZvcmUodGhpcyk7XG4gIHJldHVybiBkM19zZWxlY3Rpb25Qcm90b3R5cGUuaW5zZXJ0LmNhbGwodGhpcywgbmFtZSwgYmVmb3JlKTtcbn07XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9lbnRlckluc2VydEJlZm9yZShlbnRlcikge1xuICB2YXIgaTAsIGowO1xuICByZXR1cm4gZnVuY3Rpb24oZCwgaSwgaikge1xuICAgIHZhciBncm91cCA9IGVudGVyW2pdLnVwZGF0ZSxcbiAgICAgICAgbiA9IGdyb3VwLmxlbmd0aCxcbiAgICAgICAgbm9kZTtcbiAgICBpZiAoaiAhPSBqMCkgajAgPSBqLCBpMCA9IDA7XG4gICAgaWYgKGkgPj0gaTApIGkwID0gaSArIDE7XG4gICAgd2hpbGUgKCEobm9kZSA9IGdyb3VwW2kwXSkgJiYgKytpMCA8IG4pO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xufVxuXG4vLyBpbXBvcnQgXCIuLi90cmFuc2l0aW9uL3RyYW5zaXRpb25cIjtcblxuZDNfc2VsZWN0aW9uUHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGlkID0gZDNfdHJhbnNpdGlvbkluaGVyaXRJZCB8fCArK2QzX3RyYW5zaXRpb25JZCxcbiAgICAgIHN1Ymdyb3VwcyA9IFtdLFxuICAgICAgc3ViZ3JvdXAsXG4gICAgICBub2RlLFxuICAgICAgdHJhbnNpdGlvbiA9IGQzX3RyYW5zaXRpb25Jbmhlcml0IHx8IHt0aW1lOiBEYXRlLm5vdygpLCBlYXNlOiBkM19lYXNlX2N1YmljSW5PdXQsIGRlbGF5OiAwLCBkdXJhdGlvbjogMjUwfTtcblxuICBmb3IgKHZhciBqID0gLTEsIG0gPSB0aGlzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICBmb3IgKHZhciBncm91cCA9IHRoaXNbal0sIGkgPSAtMSwgbiA9IGdyb3VwLmxlbmd0aDsgKytpIDwgbjspIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGQzX3RyYW5zaXRpb25Ob2RlKG5vZGUsIGksIGlkLCB0cmFuc2l0aW9uKTtcbiAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGQzX3RyYW5zaXRpb24oc3ViZ3JvdXBzLCBpZCk7XG59O1xuLy8gaW1wb3J0IFwiLi4vdHJhbnNpdGlvbi90cmFuc2l0aW9uXCI7XG5cbmQzX3NlbGVjdGlvblByb3RvdHlwZS5pbnRlcnJ1cHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChkM19zZWxlY3Rpb25faW50ZXJydXB0KTtcbn07XG5cbmZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9pbnRlcnJ1cHQoKSB7XG4gIHZhciBsb2NrID0gdGhpcy5fX3RyYW5zaXRpb25fXztcbiAgaWYgKGxvY2spICsrbG9jay5hY3RpdmU7XG59XG5cbi8vIFRPRE8gZmFzdCBzaW5nbGV0b24gaW1wbGVtZW50YXRpb24/XG5kMy5zZWxlY3QgPSBmdW5jdGlvbihub2RlKSB7XG4gIHZhciBncm91cCA9IFt0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIiA/IGQzX3NlbGVjdChub2RlLCBkM19kb2N1bWVudCkgOiBub2RlXTtcbiAgZ3JvdXAucGFyZW50Tm9kZSA9IGQzX2RvY3VtZW50RWxlbWVudDtcbiAgcmV0dXJuIGQzX3NlbGVjdGlvbihbZ3JvdXBdKTtcbn07XG5cbmQzLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG5vZGVzKSB7XG4gIHZhciBncm91cCA9IGQzX2FycmF5KHR5cGVvZiBub2RlcyA9PT0gXCJzdHJpbmdcIiA/IGQzX3NlbGVjdEFsbChub2RlcywgZDNfZG9jdW1lbnQpIDogbm9kZXMpO1xuICBncm91cC5wYXJlbnROb2RlID0gZDNfZG9jdW1lbnRFbGVtZW50O1xuICByZXR1cm4gZDNfc2VsZWN0aW9uKFtncm91cF0pO1xufTtcblxudmFyIGQzX3NlbGVjdGlvblJvb3QgPSBkMy5zZWxlY3QoZDNfZG9jdW1lbnRFbGVtZW50KTtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGQzKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkMztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmQzID0gZDM7XG4gIH1cbn0oKTtcbiIsImlmICh0eXBlb2YgTWFwID09PSBcInVuZGVmaW5lZFwiKSB7XG4gIE1hcCA9IGZ1bmN0aW9uKCkgeyB0aGlzLmNsZWFyKCk7IH07XG4gIE1hcC5wcm90b3R5cGUgPSB7XG4gICAgc2V0OiBmdW5jdGlvbihrLCB2KSB7IHRoaXMuX1trXSA9IHY7IHJldHVybiB0aGlzOyB9LFxuICAgIGdldDogZnVuY3Rpb24oaykgeyByZXR1cm4gdGhpcy5fW2tdOyB9LFxuICAgIGhhczogZnVuY3Rpb24oaykgeyByZXR1cm4gayBpbiB0aGlzLl87IH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihrKSB7IHJldHVybiBrIGluIHRoaXMuXyAmJiBkZWxldGUgdGhpcy5fW2tdOyB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHsgdGhpcy5fID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgfSxcbiAgICBnZXQgc2l6ZSgpIHsgdmFyIG4gPSAwOyBmb3IgKHZhciBrIGluIHRoaXMuXykgKytuOyByZXR1cm4gbjsgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihjKSB7IGZvciAodmFyIGsgaW4gdGhpcy5fKSBjKHRoaXMuX1trXSwgaywgdGhpcyk7IH1cbiAgfTtcbn1cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICBmYWN0b3J5KChnbG9iYWwueGhyID0ge30pKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBkc3YgPSBmdW5jdGlvbihkZWxpbWl0ZXIpIHtcbiAgICB2YXIgcmVGb3JtYXQgPSBuZXcgUmVnRXhwKFwiW1xcXCJcIiArIGRlbGltaXRlciArIFwiXFxuXVwiKSxcbiAgICAgICAgZGVsaW1pdGVyQ29kZSA9IGRlbGltaXRlci5jaGFyQ29kZUF0KDApO1xuXG4gICAgZnVuY3Rpb24gcGFyc2UodGV4dCwgZikge1xuICAgICAgdmFyIG87XG4gICAgICByZXR1cm4gcGFyc2VSb3dzKHRleHQsIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgICAgICBpZiAobykgcmV0dXJuIG8ocm93LCBpIC0gMSk7XG4gICAgICAgIHZhciBhID0gbmV3IEZ1bmN0aW9uKFwiZFwiLCBcInJldHVybiB7XCIgKyByb3cubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobmFtZSkgKyBcIjogZFtcIiArIGkgKyBcIl1cIjtcbiAgICAgICAgfSkuam9pbihcIixcIikgKyBcIn1cIik7XG4gICAgICAgIG8gPSBmID8gZnVuY3Rpb24ocm93LCBpKSB7IHJldHVybiBmKGEocm93KSwgaSk7IH0gOiBhO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VSb3dzKHRleHQsIGYpIHtcbiAgICAgIHZhciBFT0wgPSB7fSwgLy8gc2VudGluZWwgdmFsdWUgZm9yIGVuZC1vZi1saW5lXG4gICAgICAgICAgRU9GID0ge30sIC8vIHNlbnRpbmVsIHZhbHVlIGZvciBlbmQtb2YtZmlsZVxuICAgICAgICAgIHJvd3MgPSBbXSwgLy8gb3V0cHV0IHJvd3NcbiAgICAgICAgICBOID0gdGV4dC5sZW5ndGgsXG4gICAgICAgICAgSSA9IDAsIC8vIGN1cnJlbnQgY2hhcmFjdGVyIGluZGV4XG4gICAgICAgICAgbiA9IDAsIC8vIHRoZSBjdXJyZW50IGxpbmUgbnVtYmVyXG4gICAgICAgICAgdCwgLy8gdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICBlb2w7IC8vIGlzIHRoZSBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPTD9cblxuICAgICAgZnVuY3Rpb24gdG9rZW4oKSB7XG4gICAgICAgIGlmIChJID49IE4pIHJldHVybiBFT0Y7IC8vIHNwZWNpYWwgY2FzZTogZW5kIG9mIGZpbGVcbiAgICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7IC8vIHNwZWNpYWwgY2FzZTogZW5kIG9mIGxpbmVcblxuICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IHF1b3Rlc1xuICAgICAgICB2YXIgaiA9IEk7XG4gICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IDM0KSB7XG4gICAgICAgICAgdmFyIGkgPSBqO1xuICAgICAgICAgIHdoaWxlIChpKysgPCBOKSB7XG4gICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpID09PSAzNCkge1xuICAgICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkgKyAxKSAhPT0gMzQpIGJyZWFrO1xuICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIEkgPSBpICsgMjtcbiAgICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgaWYgKGMgPT09IDEzKSB7XG4gICAgICAgICAgICBlb2wgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpICsgMikgPT09IDEwKSArK0k7XG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAxMCkge1xuICAgICAgICAgICAgZW9sID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiArIDEsIGkpLnJlcGxhY2UoL1wiXCIvZywgXCJcXFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tbW9uIGNhc2U6IGZpbmQgbmV4dCBkZWxpbWl0ZXIgb3IgbmV3bGluZVxuICAgICAgICB3aGlsZSAoSSA8IE4pIHtcbiAgICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChJKyspLCBrID0gMTtcbiAgICAgICAgICBpZiAoYyA9PT0gMTApIGVvbCA9IHRydWU7IC8vIFxcblxuICAgICAgICAgIGVsc2UgaWYgKGMgPT09IDEzKSB7IGVvbCA9IHRydWU7IGlmICh0ZXh0LmNoYXJDb2RlQXQoSSkgPT09IDEwKSArK0ksICsrazsgfSAvLyBcXHJ8XFxyXFxuXG4gICAgICAgICAgZWxzZSBpZiAoYyAhPT0gZGVsaW1pdGVyQ29kZSkgY29udGludWU7XG4gICAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiwgSSAtIGspO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlOiBsYXN0IHRva2VuIGJlZm9yZSBFT0ZcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2Uoaik7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICgodCA9IHRva2VuKCkpICE9PSBFT0YpIHtcbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgd2hpbGUgKHQgIT09IEVPTCAmJiB0ICE9PSBFT0YpIHtcbiAgICAgICAgICBhLnB1c2godCk7XG4gICAgICAgICAgdCA9IHRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYgJiYgKGEgPSBmKGEsIG4rKykpID09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICByb3dzLnB1c2goYSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb3dzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdChyb3dzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyb3dzWzBdKSkgcmV0dXJuIGZvcm1hdFJvd3Mocm93cyk7IC8vIGRlcHJlY2F0ZWQ7IHVzZSBmb3JtYXRSb3dzXG4gICAgICB2YXIgZmllbGRTZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpLCBmaWVsZHMgPSBbXTtcblxuICAgICAgLy8gQ29tcHV0ZSB1bmlxdWUgZmllbGRzIGluIG9yZGVyIG9mIGRpc2NvdmVyeS5cbiAgICAgIHJvd3MuZm9yRWFjaChmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgZm9yICh2YXIgZmllbGQgaW4gcm93KSB7XG4gICAgICAgICAgaWYgKCEoKGZpZWxkICs9IFwiXCIpIGluIGZpZWxkU2V0KSkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goZmllbGRTZXRbZmllbGRdID0gZmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBbZmllbGRzLm1hcChmb3JtYXRWYWx1ZSkuam9pbihkZWxpbWl0ZXIpXS5jb25jYXQocm93cy5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHJldHVybiBmaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1hdFZhbHVlKHJvd1tmaWVsZF0pO1xuICAgICAgICB9KS5qb2luKGRlbGltaXRlcik7XG4gICAgICB9KSkuam9pbihcIlxcblwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRSb3dzKHJvd3MpIHtcbiAgICAgIHJldHVybiByb3dzLm1hcChmb3JtYXRSb3cpLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgICAgcmV0dXJuIHJvdy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh0ZXh0KSB7XG4gICAgICByZXR1cm4gcmVGb3JtYXQudGVzdCh0ZXh0KSA/IFwiXFxcIlwiICsgdGV4dC5yZXBsYWNlKC9cXFwiL2csIFwiXFxcIlxcXCJcIikgKyBcIlxcXCJcIiA6IHRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhcnNlOiBwYXJzZSxcbiAgICAgIHBhcnNlUm93czogcGFyc2VSb3dzLFxuICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICBmb3JtYXRSb3dzOiBmb3JtYXRSb3dzXG4gICAgfTtcbiAgfVxuXG4gIHZhciB0c3YgPSBkc3YoXCJcXHRcIik7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2VPZihkc3YsIHJvdykge1xuICAgIHJldHVybiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICByZXR1cm4gZHN2LnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0LCByb3cpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBmaXhDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbihlcnJvciwgcmVxdWVzdCkge1xuICAgICAgY2FsbGJhY2soZXJyb3IgPT0gbnVsbCA/IHJlcXVlc3QgOiBudWxsKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzUmVzcG9uc2UocmVxdWVzdCkge1xuICAgIHZhciB0eXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gICAgcmV0dXJuIHR5cGUgJiYgdHlwZSAhPT0gXCJ0ZXh0XCJcbiAgICAgICAgPyByZXF1ZXN0LnJlc3BvbnNlIC8vIG51bGwgb24gZXJyb3JcbiAgICAgICAgOiByZXF1ZXN0LnJlc3BvbnNlVGV4dDsgLy8gXCJcIiBvbiBlcnJvclxuICB9XG5cbiAgZnVuY3Rpb24gRGlzcGF0Y2godHlwZXMpIHtcbiAgICB2YXIgaSA9IC0xLFxuICAgICAgICBuID0gdHlwZXMubGVuZ3RoLFxuICAgICAgICBjYWxsYmFja3NCeVR5cGUgPSB7fSxcbiAgICAgICAgY2FsbGJhY2tCeU5hbWUgPSB7fSxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdGhhdCA9IHRoaXM7XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHR5cGUgPSBwYXJzZVR5cGUodHlwZSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBjYWxsYmFjaywgaWYgYW55LlxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAoY2FsbGJhY2sgPSBjYWxsYmFja0J5TmFtZVt0eXBlLm5hbWVdKSAmJiBjYWxsYmFjay52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWTigKZcbiAgICAgIGlmICh0eXBlLnR5cGUpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IGNhbGxiYWNrc0J5VHlwZVt0eXBlLnR5cGVdLFxuICAgICAgICAgICAgY2FsbGJhY2swID0gY2FsbGJhY2tCeU5hbWVbdHlwZS5uYW1lXSxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGNhbGxiYWNrLCBpZiBhbnksIHVzaW5nIGNvcHktb24tcmVtb3ZlLlxuICAgICAgICBpZiAoY2FsbGJhY2swKSB7XG4gICAgICAgICAgY2FsbGJhY2swLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICBpID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2swKTtcbiAgICAgICAgICBjYWxsYmFja3NCeVR5cGVbdHlwZS50eXBlXSA9IGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwLCBpKS5jb25jYXQoY2FsbGJhY2tzLnNsaWNlKGkgKyAxKSk7XG4gICAgICAgICAgZGVsZXRlIGNhbGxiYWNrQnlOYW1lW3R5cGUubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlIG5ldyBjYWxsYmFjaywgaWYgYW55LlxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjayA9IHt2YWx1ZTogY2FsbGJhY2t9O1xuICAgICAgICAgIGNhbGxiYWNrQnlOYW1lW3R5cGUubmFtZV0gPSBjYWxsYmFjaztcbiAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlLCBpZiBhIG51bGwgY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmVtb3ZlIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICAgIGVsc2UgaWYgKGNhbGxiYWNrID09IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIgb3RoZXJUeXBlIGluIGNhbGxiYWNrc0J5VHlwZSkge1xuICAgICAgICAgIGlmIChjYWxsYmFjayA9IGNhbGxiYWNrQnlOYW1lW290aGVyVHlwZSArIHR5cGUubmFtZV0pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBjYWxsYmFja3NCeVR5cGVbb3RoZXJUeXBlXSwgaSA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGNhbGxiYWNrc0J5VHlwZVtvdGhlclR5cGVdID0gY2FsbGJhY2tzLnNsaWNlKDAsIGkpLmNvbmNhdChjYWxsYmFja3Muc2xpY2UoaSArIDEpKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja0J5TmFtZVtjYWxsYmFjay5uYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcblxuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICB0eXBlID0gdHlwZXNbaV0gKyBcIlwiO1xuICAgICAgaWYgKCF0eXBlIHx8ICh0eXBlIGluIHRoYXQpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIG9yIGR1cGxpY2F0ZSB0eXBlOiBcIiArIHR5cGUpO1xuICAgICAgY2FsbGJhY2tzQnlUeXBlW3R5cGVdID0gW107XG4gICAgICB0aGF0W3R5cGVdID0gYXBwbGllcih0eXBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVR5cGUodHlwZSkge1xuICAgICAgdmFyIGkgPSAodHlwZSArPSBcIlwiKS5pbmRleE9mKFwiLlwiKSwgbmFtZSA9IHR5cGU7XG4gICAgICBpZiAoaSA+PSAwKSB0eXBlID0gdHlwZS5zbGljZSgwLCBpKTsgZWxzZSBuYW1lICs9IFwiLlwiO1xuICAgICAgaWYgKHR5cGUgJiYgIWNhbGxiYWNrc0J5VHlwZS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgICAgcmV0dXJuIHt0eXBlOiB0eXBlLCBuYW1lOiBuYW1lfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBsaWVyKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IGNhbGxiYWNrc0J5VHlwZVt0eXBlXSwgLy8gRGVmZW5zaXZlIHJlZmVyZW5jZTsgY29weS1vbi1yZW1vdmUuXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGNhbGxiYWNrVmFsdWUsXG4gICAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgICBuID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIGlmIChjYWxsYmFja1ZhbHVlID0gKGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldKS52YWx1ZSkge1xuICAgICAgICAgICAgY2FsbGJhY2tWYWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICByZXR1cm4gbmV3IERpc3BhdGNoKGFyZ3VtZW50cyk7XG4gIH1cblxuICBkaXNwYXRjaC5wcm90b3R5cGUgPSBEaXNwYXRjaC5wcm90b3R5cGU7IC8vIGFsbG93IGluc3RhbmNlb2ZcblxuICB2YXIgeGhyID0gZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIsXG4gICAgICAgIGV2ZW50ID0gZGlzcGF0Y2goXCJiZWZvcmVzZW5kXCIsIFwicHJvZ3Jlc3NcIiwgXCJsb2FkXCIsIFwiZXJyb3JcIiksXG4gICAgICAgIG1pbWVUeXBlLFxuICAgICAgICBoZWFkZXJzID0gbmV3IE1hcCxcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgIHJlc3BvbnNlVHlwZTtcblxuICAgIC8vIElmIElFIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgdXNlIFhEb21haW5SZXF1ZXN0LlxuICAgIGlmICh0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgJiYgIShcIndpdGhDcmVkZW50aWFsc1wiIGluIHJlcXVlc3QpXG4gICAgICAgICYmIC9eKGh0dHAocyk/Oik/XFwvXFwvLy50ZXN0KHVybCkpIHJlcXVlc3QgPSBuZXcgWERvbWFpblJlcXVlc3Q7XG5cbiAgICBcIm9ubG9hZFwiIGluIHJlcXVlc3RcbiAgICAgICAgPyByZXF1ZXN0Lm9ubG9hZCA9IHJlcXVlc3Qub25lcnJvciA9IHJlc3BvbmRcbiAgICAgICAgOiByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkgeyByZXF1ZXN0LnJlYWR5U3RhdGUgPiAzICYmIHJlc3BvbmQoKTsgfTtcblxuICAgIGZ1bmN0aW9uIHJlc3BvbmQoKSB7XG4gICAgICB2YXIgc3RhdHVzID0gcmVxdWVzdC5zdGF0dXMsIHJlc3VsdDtcbiAgICAgIGlmICghc3RhdHVzICYmIGhhc1Jlc3BvbnNlKHJlcXVlc3QpXG4gICAgICAgICAgfHwgc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDBcbiAgICAgICAgICB8fCBzdGF0dXMgPT09IDMwNCkge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2UuY2FsbCh4aHIsIHJlcXVlc3QpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGV2ZW50LmVycm9yLmNhbGwoeGhyLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5sb2FkLmNhbGwoeGhyLCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQuZXJyb3IuY2FsbCh4aHIsIHJlcXVlc3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGV2ZW50LnByb2dyZXNzLmNhbGwoeGhyLCBlKTtcbiAgICB9O1xuXG4gICAgeGhyID0ge1xuICAgICAgaGVhZGVyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgICBuYW1lID0gKG5hbWUgKyBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiBoZWFkZXJzLmdldChuYW1lKTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIGhlYWRlcnMuZGVsZXRlKG5hbWUpO1xuICAgICAgICBlbHNlIGhlYWRlcnMuc2V0KG5hbWUsIHZhbHVlICsgXCJcIik7XG4gICAgICAgIHJldHVybiB4aHI7XG4gICAgICB9LFxuXG4gICAgICAvLyBJZiBtaW1lVHlwZSBpcyBub24tbnVsbCBhbmQgbm8gQWNjZXB0IGhlYWRlciBpcyBzZXQsIGEgZGVmYXVsdCBpcyB1c2VkLlxuICAgICAgbWltZVR5cGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG1pbWVUeXBlO1xuICAgICAgICBtaW1lVHlwZSA9IHZhbHVlID09IG51bGwgPyBudWxsIDogdmFsdWUgKyBcIlwiO1xuICAgICAgICByZXR1cm4geGhyO1xuICAgICAgfSxcblxuICAgICAgLy8gU3BlY2lmaWVzIHdoYXQgdHlwZSB0aGUgcmVzcG9uc2UgdmFsdWUgc2hvdWxkIHRha2U7XG4gICAgICAvLyBmb3IgaW5zdGFuY2UsIGFycmF5YnVmZmVyLCBibG9iLCBkb2N1bWVudCwgb3IgdGV4dC5cbiAgICAgIHJlc3BvbnNlVHlwZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmVzcG9uc2VUeXBlO1xuICAgICAgICByZXNwb25zZVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHhocjtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFNwZWNpZnkgaG93IHRvIGNvbnZlcnQgdGhlIHJlc3BvbnNlIGNvbnRlbnQgdG8gYSBzcGVjaWZpYyB0eXBlO1xuICAgICAgLy8gY2hhbmdlcyB0aGUgY2FsbGJhY2sgdmFsdWUgb24gXCJsb2FkXCIgZXZlbnRzLlxuICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJlc3BvbnNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB4aHI7XG4gICAgICB9LFxuXG4gICAgICAvLyBBbGlhcyBmb3Igc2VuZChcIkdFVFwiLCDigKYpLlxuICAgICAgZ2V0OiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4geGhyLnNlbmQoXCJHRVRcIiwgZGF0YSwgY2FsbGJhY2spO1xuICAgICAgfSxcblxuICAgICAgLy8gQWxpYXMgZm9yIHNlbmQoXCJQT1NUXCIsIOKApikuXG4gICAgICBwb3N0OiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4geGhyLnNlbmQoXCJQT1NUXCIsIGRhdGEsIGNhbGxiYWNrKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIElmIGNhbGxiYWNrIGlzIG5vbi1udWxsLCBpdCB3aWxsIGJlIHVzZWQgZm9yIGVycm9yIGFuZCBsb2FkIGV2ZW50cy5cbiAgICAgIHNlbmQ6IGZ1bmN0aW9uKG1ldGhvZCwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgZGF0YSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICAgICAgICBpZiAoY2FsbGJhY2sgJiYgY2FsbGJhY2subGVuZ3RoID09PSAxKSBjYWxsYmFjayA9IGZpeENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgICAgaWYgKG1pbWVUeXBlICE9IG51bGwgJiYgIWhlYWRlcnMuaGFzKFwiYWNjZXB0XCIpKSBoZWFkZXJzLnNldChcImFjY2VwdFwiLCBtaW1lVHlwZSArIFwiLCovKlwiKTtcbiAgICAgICAgaWYgKHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcikgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSk7IH0pO1xuICAgICAgICBpZiAobWltZVR5cGUgIT0gbnVsbCAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZSk7XG4gICAgICAgIGlmIChyZXNwb25zZVR5cGUgIT0gbnVsbCkgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG4gICAgICAgIGlmIChjYWxsYmFjaykgeGhyLm9uKFwiZXJyb3JcIiwgY2FsbGJhY2spLm9uKFwibG9hZFwiLCBmdW5jdGlvbihyZXF1ZXN0KSB7IGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpOyB9KTtcbiAgICAgICAgZXZlbnQuYmVmb3Jlc2VuZC5jYWxsKHhociwgcmVxdWVzdCk7XG4gICAgICAgIHJlcXVlc3Quc2VuZChkYXRhID09IG51bGwgPyBudWxsIDogZGF0YSk7XG4gICAgICAgIHJldHVybiB4aHI7XG4gICAgICB9LFxuXG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmV0dXJuIHhocjtcbiAgICAgIH0sXG5cbiAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZXZlbnQub24uYXBwbHkoZXZlbnQsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZXZlbnQgPyB4aHIgOiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrXG4gICAgICAgID8geGhyLmdldChjYWxsYmFjaylcbiAgICAgICAgOiB4aHI7XG4gIH1cblxuICB2YXIgeGhyRHN2ID0gZnVuY3Rpb24oZGVmYXVsdE1pbWVUeXBlLCBkc3YpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odXJsLCByb3csIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIGNhbGxiYWNrID0gcm93LCByb3cgPSBudWxsO1xuICAgICAgdmFyIHIgPSB4aHIodXJsKS5taW1lVHlwZShkZWZhdWx0TWltZVR5cGUpO1xuICAgICAgci5yb3cgPSBmdW5jdGlvbihfKSB7IHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gci5yZXNwb25zZShyZXNwb25zZU9mKGRzdiwgcm93ID0gXykpIDogcm93OyB9O1xuICAgICAgci5yb3cocm93KTtcbiAgICAgIHJldHVybiBjYWxsYmFjayA/IHIuZ2V0KGNhbGxiYWNrKSA6IHI7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBfdHN2ID0geGhyRHN2KFwidGV4dC90YWItc2VwYXJhdGVkLXZhbHVlc1wiLCB0c3YpO1xuXG4gIHZhciBjc3YgPSBkc3YoXCIsXCIpO1xuXG4gIHZhciBfY3N2ID0geGhyRHN2KFwidGV4dC9jc3ZcIiwgY3N2KTtcblxuICB2YXIgeGhyVHlwZSA9IGZ1bmN0aW9uKGRlZmF1bHRNaW1lVHlwZSwgcmVzcG9uc2UpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHIgPSB4aHIodXJsKS5taW1lVHlwZShkZWZhdWx0TWltZVR5cGUpLnJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiBjYWxsYmFjayA/IHIuZ2V0KGNhbGxiYWNrKSA6IHI7XG4gICAgfTtcbiAgfVxuXG4gIHZhciB4bWwgPSB4aHJUeXBlKFwiYXBwbGljYXRpb24veG1sXCIsIGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gcmVxdWVzdC5yZXNwb25zZVhNTDtcbiAgfSk7XG5cbiAgdmFyIHRleHQgPSB4aHJUeXBlKFwidGV4dC9wbGFpblwiLCBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICB9KTtcblxuICB2YXIganNvbiA9IHhoclR5cGUoXCJhcHBsaWNhdGlvbi9qc29uXCIsIGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gIH0pO1xuXG4gIHZhciBodG1sID0geGhyVHlwZShcInRleHQvaHRtbFwiLCBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgfSk7XG5cbiAgZXhwb3J0cy54aHIgPSB4aHI7XG4gIGV4cG9ydHMuaHRtbCA9IGh0bWw7XG4gIGV4cG9ydHMuanNvbiA9IGpzb247XG4gIGV4cG9ydHMudGV4dCA9IHRleHQ7XG4gIGV4cG9ydHMueG1sID0geG1sO1xuICBleHBvcnRzLmNzdiA9IF9jc3Y7XG4gIGV4cG9ydHMudHN2ID0gX3RzdjtcblxufSkpOyIsIi8qKlxuICogRGVib3VuY2VzIGEgZnVuY3Rpb24gYnkgdGhlIGdpdmVuIHRocmVzaG9sZC5cbiAqXG4gKiBAc2VlIGh0dHA6Ly91bnNjcmlwdGFibGUuY29tLzIwMDkvMDMvMjAvZGVib3VuY2luZy1qYXZhc2NyaXB0LW1ldGhvZHMvXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbiB0byB3cmFwXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCBpbiBtcyAoYDEwMGApXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHdoZXRoZXIgdG8gZXhlY3V0ZSBhdCB0aGUgYmVnaW5uaW5nIChgZmFsc2VgKVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHRocmVzaG9sZCwgZXhlY0FzYXApe1xuICB2YXIgdGltZW91dDtcblxuICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKCl7XG4gICAgdmFyIG9iaiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBmdW5jdGlvbiBkZWxheWVkICgpIHtcbiAgICAgIGlmICghZXhlY0FzYXApIHtcbiAgICAgICAgZnVuYy5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgfVxuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9IGVsc2UgaWYgKGV4ZWNBc2FwKSB7XG4gICAgICBmdW5jLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgfVxuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZGVsYXllZCwgdGhyZXNob2xkIHx8IDEwMCk7XG4gIH07XG59O1xuIiwidmFyIHBvbHlsaW5lID0ge307XG5cbi8vIEJhc2VkIG9mZiBvZiBbdGhlIG9mZmljYWwgR29vZ2xlIGRvY3VtZW50XShodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vdXRpbGl0aWVzL3BvbHlsaW5lYWxnb3JpdGhtKVxuLy9cbi8vIFNvbWUgcGFydHMgZnJvbSBbdGhpcyBpbXBsZW1lbnRhdGlvbl0oaHR0cDovL2ZhY3N0YWZmLnVuY2EuZWR1L21jbWNjbHVyL0dvb2dsZU1hcHMvRW5jb2RlUG9seWxpbmUvUG9seWxpbmVFbmNvZGVyLmpzKVxuLy8gYnkgW01hcmsgTWNDbHVyZV0oaHR0cDovL2ZhY3N0YWZmLnVuY2EuZWR1L21jbWNjbHVyLylcblxuZnVuY3Rpb24gZW5jb2RlKGNvb3JkaW5hdGUsIGZhY3Rvcikge1xuICAgIGNvb3JkaW5hdGUgPSBNYXRoLnJvdW5kKGNvb3JkaW5hdGUgKiBmYWN0b3IpO1xuICAgIGNvb3JkaW5hdGUgPDw9IDE7XG4gICAgaWYgKGNvb3JkaW5hdGUgPCAwKSB7XG4gICAgICAgIGNvb3JkaW5hdGUgPSB+Y29vcmRpbmF0ZTtcbiAgICB9XG4gICAgdmFyIG91dHB1dCA9ICcnO1xuICAgIHdoaWxlIChjb29yZGluYXRlID49IDB4MjApIHtcbiAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKDB4MjAgfCAoY29vcmRpbmF0ZSAmIDB4MWYpKSArIDYzKTtcbiAgICAgICAgY29vcmRpbmF0ZSA+Pj0gNTtcbiAgICB9XG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29vcmRpbmF0ZSArIDYzKTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBUaGlzIGlzIGFkYXB0ZWQgZnJvbSB0aGUgaW1wbGVtZW50YXRpb24gaW4gUHJvamVjdC1PU1JNXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGVubmlzT1NSTS9Qcm9qZWN0LU9TUk0tV2ViL2Jsb2IvbWFzdGVyL1dlYkNvbnRlbnQvcm91dGluZy9PU1JNLlJvdXRpbmdHZW9tZXRyeS5qc1xucG9seWxpbmUuZGVjb2RlID0gZnVuY3Rpb24oc3RyLCBwcmVjaXNpb24pIHtcbiAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICBsYXQgPSAwLFxuICAgICAgICBsbmcgPSAwLFxuICAgICAgICBjb29yZGluYXRlcyA9IFtdLFxuICAgICAgICBzaGlmdCA9IDAsXG4gICAgICAgIHJlc3VsdCA9IDAsXG4gICAgICAgIGJ5dGUgPSBudWxsLFxuICAgICAgICBsYXRpdHVkZV9jaGFuZ2UsXG4gICAgICAgIGxvbmdpdHVkZV9jaGFuZ2UsXG4gICAgICAgIGZhY3RvciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgNSk7XG5cbiAgICAvLyBDb29yZGluYXRlcyBoYXZlIHZhcmlhYmxlIGxlbmd0aCB3aGVuIGVuY29kZWQsIHNvIGp1c3Qga2VlcFxuICAgIC8vIHRyYWNrIG9mIHdoZXRoZXIgd2UndmUgaGl0IHRoZSBlbmQgb2YgdGhlIHN0cmluZy4gSW4gZWFjaFxuICAgIC8vIGxvb3AgaXRlcmF0aW9uLCBhIHNpbmdsZSBjb29yZGluYXRlIGlzIGRlY29kZWQuXG4gICAgd2hpbGUgKGluZGV4IDwgc3RyLmxlbmd0aCkge1xuXG4gICAgICAgIC8vIFJlc2V0IHNoaWZ0LCByZXN1bHQsIGFuZCBieXRlXG4gICAgICAgIGJ5dGUgPSBudWxsO1xuICAgICAgICBzaGlmdCA9IDA7XG4gICAgICAgIHJlc3VsdCA9IDA7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgYnl0ZSA9IHN0ci5jaGFyQ29kZUF0KGluZGV4KyspIC0gNjM7XG4gICAgICAgICAgICByZXN1bHQgfD0gKGJ5dGUgJiAweDFmKSA8PCBzaGlmdDtcbiAgICAgICAgICAgIHNoaWZ0ICs9IDU7XG4gICAgICAgIH0gd2hpbGUgKGJ5dGUgPj0gMHgyMCk7XG5cbiAgICAgICAgbGF0aXR1ZGVfY2hhbmdlID0gKChyZXN1bHQgJiAxKSA/IH4ocmVzdWx0ID4+IDEpIDogKHJlc3VsdCA+PiAxKSk7XG5cbiAgICAgICAgc2hpZnQgPSByZXN1bHQgPSAwO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGJ5dGUgPSBzdHIuY2hhckNvZGVBdChpbmRleCsrKSAtIDYzO1xuICAgICAgICAgICAgcmVzdWx0IHw9IChieXRlICYgMHgxZikgPDwgc2hpZnQ7XG4gICAgICAgICAgICBzaGlmdCArPSA1O1xuICAgICAgICB9IHdoaWxlIChieXRlID49IDB4MjApO1xuXG4gICAgICAgIGxvbmdpdHVkZV9jaGFuZ2UgPSAoKHJlc3VsdCAmIDEpID8gfihyZXN1bHQgPj4gMSkgOiAocmVzdWx0ID4+IDEpKTtcblxuICAgICAgICBsYXQgKz0gbGF0aXR1ZGVfY2hhbmdlO1xuICAgICAgICBsbmcgKz0gbG9uZ2l0dWRlX2NoYW5nZTtcblxuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtsYXQgLyBmYWN0b3IsIGxuZyAvIGZhY3Rvcl0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb29yZGluYXRlcztcbn07XG5cbnBvbHlsaW5lLmVuY29kZSA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzLCBwcmVjaXNpb24pIHtcbiAgICBpZiAoIWNvb3JkaW5hdGVzLmxlbmd0aCkgcmV0dXJuICcnO1xuXG4gICAgdmFyIGZhY3RvciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgNSksXG4gICAgICAgIG91dHB1dCA9IGVuY29kZShjb29yZGluYXRlc1swXVswXSwgZmFjdG9yKSArIGVuY29kZShjb29yZGluYXRlc1swXVsxXSwgZmFjdG9yKTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGEgPSBjb29yZGluYXRlc1tpXSwgYiA9IGNvb3JkaW5hdGVzW2kgLSAxXTtcbiAgICAgICAgb3V0cHV0ICs9IGVuY29kZShhWzBdIC0gYlswXSwgZmFjdG9yKTtcbiAgICAgICAgb3V0cHV0ICs9IGVuY29kZShhWzFdIC0gYlsxXSwgZmFjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSBwb2x5bGluZTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgZnVuY3Rpb24gcXVldWUocGFyYWxsZWxpc20pIHtcbiAgICB2YXIgcSxcbiAgICAgICAgdGFza3MgPSBbXSxcbiAgICAgICAgc3RhcnRlZCA9IDAsIC8vIG51bWJlciBvZiB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzdGFydGVkIChhbmQgcGVyaGFwcyBmaW5pc2hlZClcbiAgICAgICAgYWN0aXZlID0gMCwgLy8gbnVtYmVyIG9mIHRhc2tzIGN1cnJlbnRseSBiZWluZyBleGVjdXRlZCAoc3RhcnRlZCBidXQgbm90IGZpbmlzaGVkKVxuICAgICAgICByZW1haW5pbmcgPSAwLCAvLyBudW1iZXIgb2YgdGFza3Mgbm90IHlldCBmaW5pc2hlZFxuICAgICAgICBwb3BwaW5nLCAvLyBpbnNpZGUgYSBzeW5jaHJvbm91cyB0YXNrIGNhbGxiYWNrP1xuICAgICAgICBlcnJvciA9IG51bGwsXG4gICAgICAgIGF3YWl0ID0gbm9vcCxcbiAgICAgICAgYWxsO1xuXG4gICAgaWYgKCFwYXJhbGxlbGlzbSkgcGFyYWxsZWxpc20gPSBJbmZpbml0eTtcblxuICAgIGZ1bmN0aW9uIHBvcCgpIHtcbiAgICAgIHdoaWxlIChwb3BwaW5nID0gc3RhcnRlZCA8IHRhc2tzLmxlbmd0aCAmJiBhY3RpdmUgPCBwYXJhbGxlbGlzbSkge1xuICAgICAgICB2YXIgaSA9IHN0YXJ0ZWQrKyxcbiAgICAgICAgICAgIHQgPSB0YXNrc1tpXSxcbiAgICAgICAgICAgIGEgPSBzbGljZS5jYWxsKHQsIDEpO1xuICAgICAgICBhLnB1c2goY2FsbGJhY2soaSkpO1xuICAgICAgICArK2FjdGl2ZTtcbiAgICAgICAgdFswXS5hcHBseShudWxsLCBhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZSwgcikge1xuICAgICAgICAtLWFjdGl2ZTtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKGUgIT0gbnVsbCkge1xuICAgICAgICAgIGVycm9yID0gZTsgLy8gaWdub3JlIG5ldyB0YXNrcyBhbmQgc3F1ZWxjaCBhY3RpdmUgY2FsbGJhY2tzXG4gICAgICAgICAgc3RhcnRlZCA9IHJlbWFpbmluZyA9IE5hTjsgLy8gc3RvcCBxdWV1ZWQgdGFza3MgZnJvbSBzdGFydGluZ1xuICAgICAgICAgIG5vdGlmeSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tzW2ldID0gcjtcbiAgICAgICAgICBpZiAoLS1yZW1haW5pbmcpIHBvcHBpbmcgfHwgcG9wKCk7XG4gICAgICAgICAgZWxzZSBub3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICBpZiAoZXJyb3IgIT0gbnVsbCkgYXdhaXQoZXJyb3IpO1xuICAgICAgZWxzZSBpZiAoYWxsKSBhd2FpdChlcnJvciwgdGFza3MpO1xuICAgICAgZWxzZSBhd2FpdC5hcHBseShudWxsLCBbZXJyb3JdLmNvbmNhdCh0YXNrcykpO1xuICAgIH1cblxuICAgIHJldHVybiBxID0ge1xuICAgICAgZGVmZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgdGFza3MucHVzaChhcmd1bWVudHMpO1xuICAgICAgICAgICsrcmVtYWluaW5nO1xuICAgICAgICAgIHBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxO1xuICAgICAgfSxcbiAgICAgIGF3YWl0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgIGF3YWl0ID0gZjtcbiAgICAgICAgYWxsID0gZmFsc2U7XG4gICAgICAgIGlmICghcmVtYWluaW5nKSBub3RpZnkoKTtcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgICB9LFxuICAgICAgYXdhaXRBbGw6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgYXdhaXQgPSBmO1xuICAgICAgICBhbGwgPSB0cnVlO1xuICAgICAgICBpZiAoIXJlbWFpbmluZykgbm90aWZ5KCk7XG4gICAgICAgIHJldHVybiBxO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub29wKCkge31cblxuICBxdWV1ZS52ZXJzaW9uID0gXCIxLjAuN1wiO1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHF1ZXVlOyB9KTtcbiAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBxdWV1ZTtcbiAgZWxzZSB0aGlzLnF1ZXVlID0gcXVldWU7XG59KSgpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNCBGZWxpeCBHbmFzc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vc3Bpbi5qcy5vcmcvXG4gKlxuICogRXhhbXBsZTpcbiAgICB2YXIgb3B0cyA9IHtcbiAgICAgIGxpbmVzOiAxMiAgICAgICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIGxpbmVzIHRvIGRyYXdcbiAgICAsIGxlbmd0aDogNyAgICAgICAgICAgICAvLyBUaGUgbGVuZ3RoIG9mIGVhY2ggbGluZVxuICAgICwgd2lkdGg6IDUgICAgICAgICAgICAgIC8vIFRoZSBsaW5lIHRoaWNrbmVzc1xuICAgICwgcmFkaXVzOiAxMCAgICAgICAgICAgIC8vIFRoZSByYWRpdXMgb2YgdGhlIGlubmVyIGNpcmNsZVxuICAgICwgc2NhbGU6IDEuMCAgICAgICAgICAgIC8vIFNjYWxlcyBvdmVyYWxsIHNpemUgb2YgdGhlIHNwaW5uZXJcbiAgICAsIGNvcm5lcnM6IDEgICAgICAgICAgICAvLyBSb3VuZG5lc3MgKDAuLjEpXG4gICAgLCBjb2xvcjogJyMwMDAnICAgICAgICAgLy8gI3JnYiBvciAjcnJnZ2JiXG4gICAgLCBvcGFjaXR5OiAxLzQgICAgICAgICAgLy8gT3BhY2l0eSBvZiB0aGUgbGluZXNcbiAgICAsIHJvdGF0ZTogMCAgICAgICAgICAgICAvLyBSb3RhdGlvbiBvZmZzZXRcbiAgICAsIGRpcmVjdGlvbjogMSAgICAgICAgICAvLyAxOiBjbG9ja3dpc2UsIC0xOiBjb3VudGVyY2xvY2t3aXNlXG4gICAgLCBzcGVlZDogMSAgICAgICAgICAgICAgLy8gUm91bmRzIHBlciBzZWNvbmRcbiAgICAsIHRyYWlsOiAxMDAgICAgICAgICAgICAvLyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuICAgICwgZnBzOiAyMCAgICAgICAgICAgICAgIC8vIEZyYW1lcyBwZXIgc2Vjb25kIHdoZW4gdXNpbmcgc2V0VGltZW91dCgpXG4gICAgLCB6SW5kZXg6IDJlOSAgICAgICAgICAgLy8gVXNlIGEgaGlnaCB6LWluZGV4IGJ5IGRlZmF1bHRcbiAgICAsIGNsYXNzTmFtZTogJ3NwaW5uZXInICAvLyBDU1MgY2xhc3MgdG8gYXNzaWduIHRvIHRoZSBlbGVtZW50XG4gICAgLCB0b3A6ICc1MCUnICAgICAgICAgICAgLy8gY2VudGVyIHZlcnRpY2FsbHlcbiAgICAsIGxlZnQ6ICc1MCUnICAgICAgICAgICAvLyBjZW50ZXIgaG9yaXpvbnRhbGx5XG4gICAgLCBzaGFkb3c6IGZhbHNlICAgICAgICAgLy8gV2hldGhlciB0byByZW5kZXIgYSBzaGFkb3dcbiAgICAsIGh3YWNjZWw6IGZhbHNlICAgICAgICAvLyBXaGV0aGVyIHRvIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24gKG1pZ2h0IGJlIGJ1Z2d5KVxuICAgICwgcG9zaXRpb246ICdhYnNvbHV0ZScgIC8vIEVsZW1lbnQgcG9zaXRpb25pbmdcbiAgICB9XG4gICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKVxuICAgIHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIob3B0cykuc3Bpbih0YXJnZXQpXG4gKi9cbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblxuICAvKiBDb21tb25KUyAqL1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcpIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpXG5cbiAgLyogQU1EIG1vZHVsZSAqL1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGZhY3RvcnkpXG5cbiAgLyogQnJvd3NlciBnbG9iYWwgKi9cbiAgZWxzZSByb290LlNwaW5uZXIgPSBmYWN0b3J5KClcbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIlxuXG4gIHZhciBwcmVmaXhlcyA9IFsnd2Via2l0JywgJ01veicsICdtcycsICdPJ10gLyogVmVuZG9yIHByZWZpeGVzICovXG4gICAgLCBhbmltYXRpb25zID0ge30gLyogQW5pbWF0aW9uIHJ1bGVzIGtleWVkIGJ5IHRoZWlyIG5hbWUgKi9cbiAgICAsIHVzZUNzc0FuaW1hdGlvbnMgLyogV2hldGhlciB0byB1c2UgQ1NTIGFuaW1hdGlvbnMgb3Igc2V0VGltZW91dCAqL1xuICAgICwgc2hlZXQgLyogQSBzdHlsZXNoZWV0IHRvIGhvbGQgdGhlIEBrZXlmcmFtZSBvciBWTUwgcnVsZXMuICovXG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gY3JlYXRlIGVsZW1lbnRzLiBJZiBubyB0YWcgbmFtZSBpcyBnaXZlbixcbiAgICogYSBESVYgaXMgY3JlYXRlZC4gT3B0aW9uYWxseSBwcm9wZXJ0aWVzIGNhbiBiZSBwYXNzZWQuXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVFbCAodGFnLCBwcm9wKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcgfHwgJ2RpdicpXG4gICAgICAsIG5cblxuICAgIGZvciAobiBpbiBwcm9wKSBlbFtuXSA9IHByb3Bbbl1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGNoaWxkcmVuIGFuZCByZXR1cm5zIHRoZSBwYXJlbnQuXG4gICAqL1xuICBmdW5jdGlvbiBpbnMgKHBhcmVudCAvKiBjaGlsZDEsIGNoaWxkMiwgLi4uKi8pIHtcbiAgICBmb3IgKHZhciBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChhcmd1bWVudHNbaV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb3BhY2l0eSBrZXlmcmFtZSBhbmltYXRpb24gcnVsZSBhbmQgcmV0dXJucyBpdHMgbmFtZS5cbiAgICogU2luY2UgbW9zdCBtb2JpbGUgV2Via2l0cyBoYXZlIHRpbWluZyBpc3N1ZXMgd2l0aCBhbmltYXRpb24tZGVsYXksXG4gICAqIHdlIGNyZWF0ZSBzZXBhcmF0ZSBydWxlcyBmb3IgZWFjaCBsaW5lL3NlZ21lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRBbmltYXRpb24gKGFscGhhLCB0cmFpbCwgaSwgbGluZXMpIHtcbiAgICB2YXIgbmFtZSA9IFsnb3BhY2l0eScsIHRyYWlsLCB+fihhbHBoYSAqIDEwMCksIGksIGxpbmVzXS5qb2luKCctJylcbiAgICAgICwgc3RhcnQgPSAwLjAxICsgaS9saW5lcyAqIDEwMFxuICAgICAgLCB6ID0gTWF0aC5tYXgoMSAtICgxLWFscGhhKSAvIHRyYWlsICogKDEwMC1zdGFydCksIGFscGhhKVxuICAgICAgLCBwcmVmaXggPSB1c2VDc3NBbmltYXRpb25zLnN1YnN0cmluZygwLCB1c2VDc3NBbmltYXRpb25zLmluZGV4T2YoJ0FuaW1hdGlvbicpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIHByZSA9IHByZWZpeCAmJiAnLScgKyBwcmVmaXggKyAnLScgfHwgJydcblxuICAgIGlmICghYW5pbWF0aW9uc1tuYW1lXSkge1xuICAgICAgc2hlZXQuaW5zZXJ0UnVsZShcbiAgICAgICAgJ0AnICsgcHJlICsgJ2tleWZyYW1lcyAnICsgbmFtZSArICd7JyArXG4gICAgICAgICcwJXtvcGFjaXR5OicgKyB6ICsgJ30nICtcbiAgICAgICAgc3RhcnQgKyAnJXtvcGFjaXR5OicgKyBhbHBoYSArICd9JyArXG4gICAgICAgIChzdGFydCswLjAxKSArICcle29wYWNpdHk6MX0nICtcbiAgICAgICAgKHN0YXJ0K3RyYWlsKSAlIDEwMCArICcle29wYWNpdHk6JyArIGFscGhhICsgJ30nICtcbiAgICAgICAgJzEwMCV7b3BhY2l0eTonICsgeiArICd9JyArXG4gICAgICAgICd9Jywgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKVxuXG4gICAgICBhbmltYXRpb25zW25hbWVdID0gMVxuICAgIH1cblxuICAgIHJldHVybiBuYW1lXG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdmFyaW91cyB2ZW5kb3IgcHJlZml4ZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IHN1cHBvcnRlZCBwcm9wZXJ0eS5cbiAgICovXG4gIGZ1bmN0aW9uIHZlbmRvciAoZWwsIHByb3ApIHtcbiAgICB2YXIgcyA9IGVsLnN0eWxlXG4gICAgICAsIHBwXG4gICAgICAsIGlcblxuICAgIHByb3AgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKVxuICAgIGlmIChzW3Byb3BdICE9PSB1bmRlZmluZWQpIHJldHVybiBwcm9wXG4gICAgZm9yIChpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcCA9IHByZWZpeGVzW2ldK3Byb3BcbiAgICAgIGlmIChzW3BwXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcHBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBtdWx0aXBsZSBzdHlsZSBwcm9wZXJ0aWVzIGF0IG9uY2UuXG4gICAqL1xuICBmdW5jdGlvbiBjc3MgKGVsLCBwcm9wKSB7XG4gICAgZm9yICh2YXIgbiBpbiBwcm9wKSB7XG4gICAgICBlbC5zdHlsZVt2ZW5kb3IoZWwsIG4pIHx8IG5dID0gcHJvcFtuXVxuICAgIH1cblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIGRlZmF1bHQgdmFsdWVzLlxuICAgKi9cbiAgZnVuY3Rpb24gbWVyZ2UgKG9iaikge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVmID0gYXJndW1lbnRzW2ldXG4gICAgICBmb3IgKHZhciBuIGluIGRlZikge1xuICAgICAgICBpZiAob2JqW25dID09PSB1bmRlZmluZWQpIG9ialtuXSA9IGRlZltuXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGluZSBjb2xvciBmcm9tIHRoZSBnaXZlbiBzdHJpbmcgb3IgYXJyYXkuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRDb2xvciAoY29sb3IsIGlkeCkge1xuICAgIHJldHVybiB0eXBlb2YgY29sb3IgPT0gJ3N0cmluZycgPyBjb2xvciA6IGNvbG9yW2lkeCAlIGNvbG9yLmxlbmd0aF1cbiAgfVxuXG4gIC8vIEJ1aWx0LWluIGRlZmF1bHRzXG5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIGxpbmVzOiAxMiAgICAgICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIGxpbmVzIHRvIGRyYXdcbiAgLCBsZW5ndGg6IDcgICAgICAgICAgICAgLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcbiAgLCB3aWR0aDogNSAgICAgICAgICAgICAgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG4gICwgcmFkaXVzOiAxMCAgICAgICAgICAgIC8vIFRoZSByYWRpdXMgb2YgdGhlIGlubmVyIGNpcmNsZVxuICAsIHNjYWxlOiAxLjAgICAgICAgICAgICAvLyBTY2FsZXMgb3ZlcmFsbCBzaXplIG9mIHRoZSBzcGlubmVyXG4gICwgY29ybmVyczogMSAgICAgICAgICAgIC8vIFJvdW5kbmVzcyAoMC4uMSlcbiAgLCBjb2xvcjogJyMwMDAnICAgICAgICAgLy8gI3JnYiBvciAjcnJnZ2JiXG4gICwgb3BhY2l0eTogMS80ICAgICAgICAgIC8vIE9wYWNpdHkgb2YgdGhlIGxpbmVzXG4gICwgcm90YXRlOiAwICAgICAgICAgICAgIC8vIFJvdGF0aW9uIG9mZnNldFxuICAsIGRpcmVjdGlvbjogMSAgICAgICAgICAvLyAxOiBjbG9ja3dpc2UsIC0xOiBjb3VudGVyY2xvY2t3aXNlXG4gICwgc3BlZWQ6IDEgICAgICAgICAgICAgIC8vIFJvdW5kcyBwZXIgc2Vjb25kXG4gICwgdHJhaWw6IDEwMCAgICAgICAgICAgIC8vIEFmdGVyZ2xvdyBwZXJjZW50YWdlXG4gICwgZnBzOiAyMCAgICAgICAgICAgICAgIC8vIEZyYW1lcyBwZXIgc2Vjb25kIHdoZW4gdXNpbmcgc2V0VGltZW91dCgpXG4gICwgekluZGV4OiAyZTkgICAgICAgICAgIC8vIFVzZSBhIGhpZ2ggei1pbmRleCBieSBkZWZhdWx0XG4gICwgY2xhc3NOYW1lOiAnc3Bpbm5lcicgIC8vIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIGVsZW1lbnRcbiAgLCB0b3A6ICc1MCUnICAgICAgICAgICAgLy8gY2VudGVyIHZlcnRpY2FsbHlcbiAgLCBsZWZ0OiAnNTAlJyAgICAgICAgICAgLy8gY2VudGVyIGhvcml6b250YWxseVxuICAsIHNoYWRvdzogZmFsc2UgICAgICAgICAvLyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuICAsIGh3YWNjZWw6IGZhbHNlICAgICAgICAvLyBXaGV0aGVyIHRvIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24gKG1pZ2h0IGJlIGJ1Z2d5KVxuICAsIHBvc2l0aW9uOiAnYWJzb2x1dGUnICAvLyBFbGVtZW50IHBvc2l0aW9uaW5nXG4gIH1cblxuICAvKiogVGhlIGNvbnN0cnVjdG9yICovXG4gIGZ1bmN0aW9uIFNwaW5uZXIgKG8pIHtcbiAgICB0aGlzLm9wdHMgPSBtZXJnZShvIHx8IHt9LCBTcGlubmVyLmRlZmF1bHRzLCBkZWZhdWx0cylcbiAgfVxuXG4gIC8vIEdsb2JhbCBkZWZhdWx0cyB0aGF0IG92ZXJyaWRlIHRoZSBidWlsdC1pbnM6XG4gIFNwaW5uZXIuZGVmYXVsdHMgPSB7fVxuXG4gIG1lcmdlKFNwaW5uZXIucHJvdG90eXBlLCB7XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgc3Bpbm5lciB0byB0aGUgZ2l2ZW4gdGFyZ2V0IGVsZW1lbnQuIElmIHRoaXMgaW5zdGFuY2UgaXMgYWxyZWFkeVxuICAgICAqIHNwaW5uaW5nLCBpdCBpcyBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgZnJvbSBpdHMgcHJldmlvdXMgdGFyZ2V0IGIgY2FsbGluZ1xuICAgICAqIHN0b3AoKSBpbnRlcm5hbGx5LlxuICAgICAqL1xuICAgIHNwaW46IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHRoaXMuc3RvcCgpXG5cbiAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgICAsIG8gPSBzZWxmLm9wdHNcbiAgICAgICAgLCBlbCA9IHNlbGYuZWwgPSBjcmVhdGVFbChudWxsLCB7Y2xhc3NOYW1lOiBvLmNsYXNzTmFtZX0pXG5cbiAgICAgIGNzcyhlbCwge1xuICAgICAgICBwb3NpdGlvbjogby5wb3NpdGlvblxuICAgICAgLCB3aWR0aDogMFxuICAgICAgLCB6SW5kZXg6IG8uekluZGV4XG4gICAgICAsIGxlZnQ6IG8ubGVmdFxuICAgICAgLCB0b3A6IG8udG9wXG4gICAgICB9KVxuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoZWwsIHRhcmdldC5maXJzdENoaWxkIHx8IG51bGwpXG4gICAgICB9XG5cbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpXG4gICAgICBzZWxmLmxpbmVzKGVsLCBzZWxmLm9wdHMpXG5cbiAgICAgIGlmICghdXNlQ3NzQW5pbWF0aW9ucykge1xuICAgICAgICAvLyBObyBDU1MgYW5pbWF0aW9uIHN1cHBvcnQsIHVzZSBzZXRUaW1lb3V0KCkgaW5zdGVhZFxuICAgICAgICB2YXIgaSA9IDBcbiAgICAgICAgICAsIHN0YXJ0ID0gKG8ubGluZXMgLSAxKSAqICgxIC0gby5kaXJlY3Rpb24pIC8gMlxuICAgICAgICAgICwgYWxwaGFcbiAgICAgICAgICAsIGZwcyA9IG8uZnBzXG4gICAgICAgICAgLCBmID0gZnBzIC8gby5zcGVlZFxuICAgICAgICAgICwgb3N0ZXAgPSAoMSAtIG8ub3BhY2l0eSkgLyAoZiAqIG8udHJhaWwgLyAxMDApXG4gICAgICAgICAgLCBhc3RlcCA9IGYgLyBvLmxpbmVzXG5cbiAgICAgICAgOyhmdW5jdGlvbiBhbmltICgpIHtcbiAgICAgICAgICBpKytcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG8ubGluZXM7IGorKykge1xuICAgICAgICAgICAgYWxwaGEgPSBNYXRoLm1heCgxIC0gKGkgKyAoby5saW5lcyAtIGopICogYXN0ZXApICUgZiAqIG9zdGVwLCBvLm9wYWNpdHkpXG5cbiAgICAgICAgICAgIHNlbGYub3BhY2l0eShlbCwgaiAqIG8uZGlyZWN0aW9uICsgc3RhcnQsIGFscGhhLCBvKVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLnRpbWVvdXQgPSBzZWxmLmVsICYmIHNldFRpbWVvdXQoYW5pbSwgfn4oMTAwMCAvIGZwcykpXG4gICAgICAgIH0pKClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYW5kIHJlbW92ZXMgdGhlIFNwaW5uZXIuXG4gICAgICovXG4gICwgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbFxuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG4gICAgICAgIGlmIChlbC5wYXJlbnROb2RlKSBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuICAgICAgICB0aGlzLmVsID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0aGF0IGRyYXdzIHRoZSBpbmRpdmlkdWFsIGxpbmVzLiBXaWxsIGJlIG92ZXJ3cml0dGVuXG4gICAgICogaW4gVk1MIGZhbGxiYWNrIG1vZGUgYmVsb3cuXG4gICAgICovXG4gICwgbGluZXM6IGZ1bmN0aW9uIChlbCwgbykge1xuICAgICAgdmFyIGkgPSAwXG4gICAgICAgICwgc3RhcnQgPSAoby5saW5lcyAtIDEpICogKDEgLSBvLmRpcmVjdGlvbikgLyAyXG4gICAgICAgICwgc2VnXG5cbiAgICAgIGZ1bmN0aW9uIGZpbGwgKGNvbG9yLCBzaGFkb3cpIHtcbiAgICAgICAgcmV0dXJuIGNzcyhjcmVhdGVFbCgpLCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgLCB3aWR0aDogby5zY2FsZSAqIChvLmxlbmd0aCArIG8ud2lkdGgpICsgJ3B4J1xuICAgICAgICAsIGhlaWdodDogby5zY2FsZSAqIG8ud2lkdGggKyAncHgnXG4gICAgICAgICwgYmFja2dyb3VuZDogY29sb3JcbiAgICAgICAgLCBib3hTaGFkb3c6IHNoYWRvd1xuICAgICAgICAsIHRyYW5zZm9ybU9yaWdpbjogJ2xlZnQnXG4gICAgICAgICwgdHJhbnNmb3JtOiAncm90YXRlKCcgKyB+figzNjAvby5saW5lcyppICsgby5yb3RhdGUpICsgJ2RlZykgdHJhbnNsYXRlKCcgKyBvLnNjYWxlKm8ucmFkaXVzICsgJ3B4JyArICcsMCknXG4gICAgICAgICwgYm9yZGVyUmFkaXVzOiAoby5jb3JuZXJzICogby5zY2FsZSAqIG8ud2lkdGggPj4gMSkgKyAncHgnXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGZvciAoOyBpIDwgby5saW5lczsgaSsrKSB7XG4gICAgICAgIHNlZyA9IGNzcyhjcmVhdGVFbCgpLCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgLCB0b3A6IDEgKyB+KG8uc2NhbGUgKiBvLndpZHRoIC8gMikgKyAncHgnXG4gICAgICAgICwgdHJhbnNmb3JtOiBvLmh3YWNjZWwgPyAndHJhbnNsYXRlM2QoMCwwLDApJyA6ICcnXG4gICAgICAgICwgb3BhY2l0eTogby5vcGFjaXR5XG4gICAgICAgICwgYW5pbWF0aW9uOiB1c2VDc3NBbmltYXRpb25zICYmIGFkZEFuaW1hdGlvbihvLm9wYWNpdHksIG8udHJhaWwsIHN0YXJ0ICsgaSAqIG8uZGlyZWN0aW9uLCBvLmxpbmVzKSArICcgJyArIDEgLyBvLnNwZWVkICsgJ3MgbGluZWFyIGluZmluaXRlJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChvLnNoYWRvdykgaW5zKHNlZywgY3NzKGZpbGwoJyMwMDAnLCAnMCAwIDRweCAjMDAwJyksIHt0b3A6ICcycHgnfSkpXG4gICAgICAgIGlucyhlbCwgaW5zKHNlZywgZmlsbChnZXRDb2xvcihvLmNvbG9yLCBpKSwgJzAgMCAxcHggcmdiYSgwLDAsMCwuMSknKSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gZWxcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdGhhdCBhZGp1c3RzIHRoZSBvcGFjaXR5IG9mIGEgc2luZ2xlIGxpbmUuXG4gICAgICogV2lsbCBiZSBvdmVyd3JpdHRlbiBpbiBWTUwgZmFsbGJhY2sgbW9kZSBiZWxvdy5cbiAgICAgKi9cbiAgLCBvcGFjaXR5OiBmdW5jdGlvbiAoZWwsIGksIHZhbCkge1xuICAgICAgaWYgKGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aCkgZWwuY2hpbGROb2Rlc1tpXS5zdHlsZS5vcGFjaXR5ID0gdmFsXG4gICAgfVxuXG4gIH0pXG5cblxuICBmdW5jdGlvbiBpbml0Vk1MICgpIHtcblxuICAgIC8qIFV0aWxpdHkgZnVuY3Rpb24gdG8gY3JlYXRlIGEgVk1MIHRhZyAqL1xuICAgIGZ1bmN0aW9uIHZtbCAodGFnLCBhdHRyKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWwoJzwnICsgdGFnICsgJyB4bWxucz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC5jb206dm1sXCIgY2xhc3M9XCJzcGluLXZtbFwiPicsIGF0dHIpXG4gICAgfVxuXG4gICAgLy8gTm8gQ1NTIHRyYW5zZm9ybXMgYnV0IFZNTCBzdXBwb3J0LCBhZGQgYSBDU1MgcnVsZSBmb3IgVk1MIGVsZW1lbnRzOlxuICAgIHNoZWV0LmFkZFJ1bGUoJy5zcGluLXZtbCcsICdiZWhhdmlvcjp1cmwoI2RlZmF1bHQjVk1MKScpXG5cbiAgICBTcGlubmVyLnByb3RvdHlwZS5saW5lcyA9IGZ1bmN0aW9uIChlbCwgbykge1xuICAgICAgdmFyIHIgPSBvLnNjYWxlICogKG8ubGVuZ3RoICsgby53aWR0aClcbiAgICAgICAgLCBzID0gby5zY2FsZSAqIDIgKiByXG5cbiAgICAgIGZ1bmN0aW9uIGdycCAoKSB7XG4gICAgICAgIHJldHVybiBjc3MoXG4gICAgICAgICAgdm1sKCdncm91cCcsIHtcbiAgICAgICAgICAgIGNvb3Jkc2l6ZTogcyArICcgJyArIHNcbiAgICAgICAgICAsIGNvb3Jkb3JpZ2luOiAtciArICcgJyArIC1yXG4gICAgICAgICAgfSlcbiAgICAgICAgLCB7IHdpZHRoOiBzLCBoZWlnaHQ6IHMgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHZhciBtYXJnaW4gPSAtKG8ud2lkdGggKyBvLmxlbmd0aCkgKiBvLnNjYWxlICogMiArICdweCdcbiAgICAgICAgLCBnID0gY3NzKGdycCgpLCB7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogbWFyZ2luLCBsZWZ0OiBtYXJnaW59KVxuICAgICAgICAsIGlcblxuICAgICAgZnVuY3Rpb24gc2VnIChpLCBkeCwgZmlsdGVyKSB7XG4gICAgICAgIGlucyhcbiAgICAgICAgICBnXG4gICAgICAgICwgaW5zKFxuICAgICAgICAgICAgY3NzKGdycCgpLCB7cm90YXRpb246IDM2MCAvIG8ubGluZXMgKiBpICsgJ2RlZycsIGxlZnQ6IH5+ZHh9KVxuICAgICAgICAgICwgaW5zKFxuICAgICAgICAgICAgICBjc3MoXG4gICAgICAgICAgICAgICAgdm1sKCdyb3VuZHJlY3QnLCB7YXJjc2l6ZTogby5jb3JuZXJzfSlcbiAgICAgICAgICAgICAgLCB7IHdpZHRoOiByXG4gICAgICAgICAgICAgICAgLCBoZWlnaHQ6IG8uc2NhbGUgKiBvLndpZHRoXG4gICAgICAgICAgICAgICAgLCBsZWZ0OiBvLnNjYWxlICogby5yYWRpdXNcbiAgICAgICAgICAgICAgICAsIHRvcDogLW8uc2NhbGUgKiBvLndpZHRoID4+IDFcbiAgICAgICAgICAgICAgICAsIGZpbHRlcjogZmlsdGVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAsIHZtbCgnZmlsbCcsIHtjb2xvcjogZ2V0Q29sb3Ioby5jb2xvciwgaSksIG9wYWNpdHk6IG8ub3BhY2l0eX0pXG4gICAgICAgICAgICAsIHZtbCgnc3Ryb2tlJywge29wYWNpdHk6IDB9KSAvLyB0cmFuc3BhcmVudCBzdHJva2UgdG8gZml4IGNvbG9yIGJsZWVkaW5nIHVwb24gb3BhY2l0eSBjaGFuZ2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKG8uc2hhZG93KVxuICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IG8ubGluZXM7IGkrKykge1xuICAgICAgICAgIHNlZyhpLCAtMiwgJ3Byb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CbHVyKHBpeGVscmFkaXVzPTIsbWFrZXNoYWRvdz0xLHNoYWRvd29wYWNpdHk9LjMpJylcbiAgICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAxOyBpIDw9IG8ubGluZXM7IGkrKykgc2VnKGkpXG4gICAgICByZXR1cm4gaW5zKGVsLCBnKVxuICAgIH1cblxuICAgIFNwaW5uZXIucHJvdG90eXBlLm9wYWNpdHkgPSBmdW5jdGlvbiAoZWwsIGksIHZhbCwgbykge1xuICAgICAgdmFyIGMgPSBlbC5maXJzdENoaWxkXG4gICAgICBvID0gby5zaGFkb3cgJiYgby5saW5lcyB8fCAwXG4gICAgICBpZiAoYyAmJiBpICsgbyA8IGMuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgYyA9IGMuY2hpbGROb2Rlc1tpICsgb107IGMgPSBjICYmIGMuZmlyc3RDaGlsZDsgYyA9IGMgJiYgYy5maXJzdENoaWxkXG4gICAgICAgIGlmIChjKSBjLm9wYWNpdHkgPSB2YWxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNoZWV0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlbCA9IGNyZWF0ZUVsKCdzdHlsZScsIHt0eXBlIDogJ3RleHQvY3NzJ30pXG4gICAgICBpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSwgZWwpXG4gICAgICByZXR1cm4gZWwuc2hlZXQgfHwgZWwuc3R5bGVTaGVldFxuICAgIH0oKSlcblxuICAgIHZhciBwcm9iZSA9IGNzcyhjcmVhdGVFbCgnZ3JvdXAnKSwge2JlaGF2aW9yOiAndXJsKCNkZWZhdWx0I1ZNTCknfSlcblxuICAgIGlmICghdmVuZG9yKHByb2JlLCAndHJhbnNmb3JtJykgJiYgcHJvYmUuYWRqKSBpbml0Vk1MKClcbiAgICBlbHNlIHVzZUNzc0FuaW1hdGlvbnMgPSB2ZW5kb3IocHJvYmUsICdhbmltYXRpb24nKVxuICB9XG5cbiAgcmV0dXJuIFNwaW5uZXJcblxufSkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDN4aHIgPSByZXF1aXJlKCdkMy14aHInKSxcbiAgICBTcGlubmVyID0gcmVxdWlyZSgnc3Bpbi5qcycpO1xuXG5cbmZ1bmN0aW9uIGQzcG9zdCh1cmwsIHJlcURhdGEsIGNhbGxiYWNrLCBjb3JzKSB7XG4gICAgdmFyIHNlbnQgPSBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgY29ycyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIG0gPSB1cmwubWF0Y2goL15cXHMqaHR0cHM/OlxcL1xcL1teXFwvXSovKTtcbiAgICAgICAgY29ycyA9IG0gJiYgKG1bMF0gIT09IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3RuYW1lICtcbiAgICAgICAgICAgICAgICAobG9jYXRpb24ucG9ydCA/ICc6JyArIGxvY2F0aW9uLnBvcnQgOiAnJykpO1xuICAgIH1cblxuICAgIHZhciByZXNwRGF0YTtcbiAgICB2YXIgZmluZFBhdGhCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZC1tbXBhdGhzJyk7XG4gICAgLy92YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtjb2xvcjonI2ZmZicsIGxpbmVzOiAxMn0pO1xuXG4gICAgZDN4aHIueGhyKHVybClcbiAgICAgICAgLmhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgLm9uKFwiYmVmb3Jlc2VuZFwiLCBmdW5jdGlvbihyZXF1ZXN0KSB7IFxuICAgICAgICAgICAgZmluZFBhdGhCdXR0b24udmFsdWUgPSBcIlNlYXJjaGluZyBwYXRocy4uLlwiO1xuICAgICAgICAgICAgZmluZFBhdGhCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy9maW5kUGF0aEJ1dHRvbi5hcHBlbmRDaGlsZChzcGlubmVyLnNwaW4oKS5lbCk7XG4gICAgICAgICAgICAvL3NwaW5uZXIuc3BpbihmaW5kUGF0aEJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgICAgIC5wb3N0KFxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlcURhdGEpLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVyciwgcmF3RGF0YSl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmRQYXRoQnV0dG9uLnZhbHVlID0gXCJGaW5kIG11bHRpbW9kYWwgcGF0aHNcIjtcbiAgICAgICAgICAgICAgICAgICAgZmluZFBhdGhCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy9zcGlubmVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcERhdGEgPSByYXdEYXRhO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVyciwgcmVzcERhdGEsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICApO1xuXG4gICAgZnVuY3Rpb24gaXNTdWNjZXNzZnVsKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BEYXRhO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZDNwb3N0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpLFxuICAgIHBvbHlsaW5lID0gcmVxdWlyZSgncG9seWxpbmUnKSxcbiAgICBkMyA9IHJlcXVpcmUoJy4uL2xpYi9kMycpLFxuICAgIHF1ZXVlID0gcmVxdWlyZSgncXVldWUtYXN5bmMnKTtcblxudmFyIERpcmVjdGlvbnMgPSBMLkNsYXNzLmV4dGVuZCh7XG4gICAgaW5jbHVkZXM6IFtMLk1peGluLkV2ZW50c10sXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVuaXRzOiAnbWV0cmljJ1xuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIE1NUlBfQVBJX1RFTVBMQVRFOiAnaHR0cDovL2x1bGl1Lm1lL21tcnAvYXBpL3YxJyxcbiAgICAgICAgR0VPQ09ERVJfVEVNUExBVEU6ICdodHRwczovL2FwaS50aWxlcy5tYXBib3guY29tL3Y0L2dlb2NvZGUvbWFwYm94LnBsYWNlcy97cXVlcnl9Lmpzb24/cHJveGltaXR5PXtwcm94aW1pdHl9JmFjY2Vzc190b2tlbj17dG9rZW59J1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fd2F5cG9pbnRzID0gW107XG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHtcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlX3B1YmxpY19tb2Rlc1wiOiBbJ3VuZGVyZ3JvdW5kJ10sXG4gICAgICAgICAgICBcImNhbl91c2VfdGF4aVwiOiAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBcImhhc19iaWN5Y2xlXCI6ICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBcImhhc19tb3RvcmN5Y2xlXCI6ICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBcImhhc19wcml2YXRlX2NhclwiOiAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIFwibmVlZF9wYXJraW5nXCI6ICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgXCJvYmplY3RpdmVcIjogICAgICAgICAgICAgIFwiZmFzdGVzdFwiLFxuICAgICAgICAgICAgXCJkcml2aW5nX2Rpc3RhbmNlX2xpbWl0XCI6IDUwMCxcbiAgICAgICAgICAgIFwic291cmNlXCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjb29yZGluYXRlXCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwieFwiOiAwLjAsXG4gICAgICAgICAgICAgICAgICAgIFwieVwiOiAwLjAsXG4gICAgICAgICAgICAgICAgICAgIFwic3JpZFwiOiA0MzI2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGFyZ2V0XCI6IHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjb29yZGluYXRlXCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwieFwiOiAwLjAsXG4gICAgICAgICAgICAgICAgICAgIFwieVwiOiAwLjAsXG4gICAgICAgICAgICAgICAgICAgIFwic3JpZFwiOiA0MzI2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRPcmlnaW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luO1xuICAgIH0sXG5cbiAgICBnZXREZXN0aW5hdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICB9LFxuXG4gICAgc2V0T3JpZ2luOiBmdW5jdGlvbiAob3JpZ2luKSB7XG4gICAgICAgIG9yaWdpbiA9IHRoaXMuX25vcm1hbGl6ZVdheXBvaW50KG9yaWdpbik7XG5cbiAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgICAgIHRoaXMuZmlyZSgnb3JpZ2luJywge29yaWdpbjogb3JpZ2lufSk7XG5cbiAgICAgICAgaWYgKCFvcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3VubG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlLnNvdXJjZS52YWx1ZS54ID0gdGhpcy5vcmlnaW4uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF07XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGUuc291cmNlLnZhbHVlLnkgPSB0aGlzLm9yaWdpbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXREZXN0aW5hdGlvbjogZnVuY3Rpb24gKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uID0gdGhpcy5fbm9ybWFsaXplV2F5cG9pbnQoZGVzdGluYXRpb24pO1xuXG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgdGhpcy5maXJlKCdkZXN0aW5hdGlvbicsIHtkZXN0aW5hdGlvbjogZGVzdGluYXRpb259KTtcblxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl91bmxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlLnRhcmdldC52YWx1ZS54ID0gdGhpcy5kZXN0aW5hdGlvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXTtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZS50YXJnZXQudmFsdWUueSA9IHRoaXMuZGVzdGluYXRpb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZ2V0UHJvZmlsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vcmV0dXJuIHRoaXMucHJvZmlsZSB8fCB0aGlzLm9wdGlvbnMucHJvZmlsZSB8fCAnbWFwYm94LmRyaXZpbmcnO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9maWxlO1xuICAgIH0sXG5cbiAgICBzZXRQcm9maWxlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnByb2ZpbGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAvL3RoaXMuZmlyZSgncHJvZmlsZScsIHtwcm9maWxlOiBwcm9maWxlfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBnZXRXYXlwb2ludHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2F5cG9pbnRzO1xuICAgIH0sXG5cbiAgICBzZXRXYXlwb2ludHM6IGZ1bmN0aW9uICh3YXlwb2ludHMpIHtcbiAgICAgICAgdGhpcy5fd2F5cG9pbnRzID0gd2F5cG9pbnRzLm1hcCh0aGlzLl9ub3JtYWxpemVXYXlwb2ludCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBhZGRXYXlwb2ludDogZnVuY3Rpb24gKGluZGV4LCB3YXlwb2ludCkge1xuICAgICAgICB0aGlzLl93YXlwb2ludHMuc3BsaWNlKGluZGV4LCAwLCB0aGlzLl9ub3JtYWxpemVXYXlwb2ludCh3YXlwb2ludCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVtb3ZlV2F5cG9pbnQ6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLl93YXlwb2ludHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHNldFdheXBvaW50OiBmdW5jdGlvbiAoaW5kZXgsIHdheXBvaW50KSB7XG4gICAgICAgIHRoaXMuX3dheXBvaW50c1tpbmRleF0gPSB0aGlzLl9ub3JtYWxpemVXYXlwb2ludCh3YXlwb2ludCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvID0gdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICBkID0gdGhpcy5kZXN0aW5hdGlvbjtcblxuICAgICAgICB0aGlzLm9yaWdpbiA9IGQ7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBvO1xuICAgICAgICB0aGlzLl93YXlwb2ludHMucmV2ZXJzZSgpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnb3JpZ2luJywge29yaWdpbjogdGhpcy5vcmlnaW59KVxuICAgICAgICAgICAgLmZpcmUoJ2Rlc3RpbmF0aW9uJywge2Rlc3RpbmF0aW9uOiB0aGlzLmRlc3RpbmF0aW9ufSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHNlbGVjdFJvdXRlOiBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgdGhpcy5maXJlKCdzZWxlY3RSb3V0ZScsIHtyb3V0ZTogcm91dGV9KTtcbiAgICB9LFxuXG4gICAgc2VsZWN0VHJhY2s6IGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICB0aGlzLmZpcmUoJ3NlbGVjdFRyYWNrJywge3RyYWNrOiB0cmFjay5HZW9KU09OfSk7XG4gICAgfSxcblxuICAgIGhpZ2hsaWdodFJvdXRlOiBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgdGhpcy5maXJlKCdoaWdobGlnaHRSb3V0ZScsIHtyb3V0ZTogcm91dGV9KTtcbiAgICB9LFxuXG4gICAgaGlnaGxpZ2h0U3RlcDogZnVuY3Rpb24gKHN0ZXApIHtcbiAgICAgICAgdGhpcy5maXJlKCdoaWdobGlnaHRTdGVwJywge3N0ZXA6IHN0ZXB9KTtcbiAgICB9LFxuXG4gICAgcXVlcnlVUkw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERpcmVjdGlvbnMuTU1SUF9BUElfVEVNUExBVEU7XG4gICAgfSxcblxuICAgIHF1ZXJ5YWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcmlnaW4oKSAmJiB0aGlzLmdldERlc3RpbmF0aW9uKCk7XG4gICAgfSxcblxuICAgIHF1ZXJ5OiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXJ5YWJsZSgpKSByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5fcXVlcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5LmFib3J0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdHMgJiYgdGhpcy5fcmVxdWVzdHMubGVuZ3RoKSB0aGlzLl9yZXF1ZXN0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RzID0gW107XG5cbiAgICAgICAgdmFyIHEgPSBxdWV1ZSgpO1xuXG4gICAgICAgIHZhciBwdHMgPSBbdGhpcy5vcmlnaW4sIHRoaXMuZGVzdGluYXRpb25dLmNvbmNhdCh0aGlzLl93YXlwb2ludHMpO1xuICAgICAgICBmb3IgKHZhciBpIGluIHB0cykge1xuICAgICAgICAgICAgaWYgKCFwdHNbaV0uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgICAgICBxLmRlZmVyKEwuYmluZCh0aGlzLl9nZW9jb2RlLCB0aGlzKSwgcHRzW2ldLCBvcHRzLnByb3hpbWl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBxLmF3YWl0KEwuYmluZChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maXJlKCdlcnJvcicsIHtlcnJvcjogZXJyLm1lc3NhZ2V9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlcURhdGEgPSB7XCJpZFwiOiAxLCBcImpzb25ycGNcIjogXCIyLjBcIiwgXCJtZXRob2RcIjogXCJtbXJwLmZpbmRNdWx0aW1vZGFsUGF0aHNcIn07XG4gICAgICAgICAgICByZXFEYXRhLnBhcmFtcyA9IFt0aGlzLnByb2ZpbGVdO1xuXG4gICAgICAgICAgICB0aGlzLl9xdWVyeSA9IHJlcXVlc3QodGhpcy5xdWVyeVVSTCgpLCByZXFEYXRhLCBMLmJpbmQoZnVuY3Rpb24gKGVyciwgcmVzcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXJ5ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyZSgnZXJyb3InLCB7ZXJyb3I6IGVyci5tZXNzYWdlfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25zID0gcmVzcDtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbnMud2F5cG9pbnRzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25zLm9yaWdpbiA9IHJlc3Auc291cmNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9ucy5kZXN0aW5hdGlvbiA9IHJlc3AudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9ucy5yb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuZ2VvbWV0cnkgPSByb3V0ZS5nZW9qc29uO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5kdXJhdGlvbiA9IHJvdXRlLmR1cmF0aW9uICogNjA7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLnN0ZXBzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHJvdXRlLmdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcEluZm8gPSByb3V0ZS5nZW9qc29uLmZlYXR1cmVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBJbmZvLnByb3BlcnRpZXMudHlwZSA9PT0gJ3BhdGgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuc3RlcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHJvdXRlLmdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiByb3V0ZS5nZW9qc29uLmZlYXR1cmVzW2ldLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGVwSW5mby5wcm9wZXJ0aWVzLnR5cGUgPT09ICdzd2l0Y2hfcG9pbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuc3RlcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHJvdXRlLmdlb2pzb24uZmVhdHVyZXNbaV0ucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiByb3V0ZS5nZW9qc29uLmZlYXR1cmVzW2ldLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcmlnaW4ucHJvcGVydGllcy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5kaXJlY3Rpb25zLm9yaWdpbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbnMub3JpZ2luID0gdGhpcy5vcmlnaW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRlc3RpbmF0aW9uLnByb3BlcnRpZXMubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gdGhpcy5kaXJlY3Rpb25zLmRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9ucy5kZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdsb2FkJywgdGhpcy5kaXJlY3Rpb25zKTtcbiAgICAgICAgICAgIH0sIHRoaXMpLCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfZ2VvY29kZTogZnVuY3Rpb24od2F5cG9pbnQsIHByb3hpbWl0eSwgY2IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0cykgdGhpcy5fcmVxdWVzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdHMucHVzaChyZXF1ZXN0KEwuVXRpbC50ZW1wbGF0ZShEaXJlY3Rpb25zLkdFT0NPREVSX1RFTVBMQVRFLCB7XG4gICAgICAgICAgICBxdWVyeTogd2F5cG9pbnQucHJvcGVydGllcy5xdWVyeSxcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW4gfHwgTC5tYXBib3guYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBwcm94aW1pdHk6IHByb3hpbWl0eSA/IFtwcm94aW1pdHkubG5nLCBwcm94aW1pdHkubGF0XS5qb2luKCcsJykgOiAnJ1xuICAgICAgICB9KSwgTC5iaW5kKGZ1bmN0aW9uIChlcnIsIHJlc3ApIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZXNwLmZlYXR1cmVzIHx8ICFyZXNwLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYihuZXcgRXJyb3IoXCJObyByZXN1bHRzIGZvdW5kIGZvciBxdWVyeSBcIiArIHdheXBvaW50LnByb3BlcnRpZXMucXVlcnkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2F5cG9pbnQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgPSByZXNwLmZlYXR1cmVzWzBdLmNlbnRlcjtcbiAgICAgICAgICAgIHdheXBvaW50LnByb3BlcnRpZXMubmFtZSA9IHJlc3AuZmVhdHVyZXNbMF0ucGxhY2VfbmFtZTtcblxuICAgICAgICAgICAgcmV0dXJuIGNiKCk7XG4gICAgICAgIH0sIHRoaXMpKSk7XG4gICAgfSxcblxuICAgIF91bmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fd2F5cG9pbnRzID0gW107XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRpcmVjdGlvbnM7XG4gICAgICAgIHRoaXMuZmlyZSgndW5sb2FkJyk7XG4gICAgfSxcblxuICAgIF9ub3JtYWxpemVXYXlwb2ludDogZnVuY3Rpb24gKHdheXBvaW50KSB7XG4gICAgICAgIGlmICghd2F5cG9pbnQgfHwgd2F5cG9pbnQudHlwZSA9PT0gJ0ZlYXR1cmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gd2F5cG9pbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29vcmRpbmF0ZXMsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgaWYgKHdheXBvaW50IGluc3RhbmNlb2YgTC5MYXRMbmcpIHtcbiAgICAgICAgICAgIHdheXBvaW50ID0gd2F5cG9pbnQud3JhcCgpO1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSBwcm9wZXJ0aWVzLnF1ZXJ5ID0gW3dheXBvaW50LmxuZywgd2F5cG9pbnQubGF0XTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygd2F5cG9pbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnF1ZXJ5ID0gd2F5cG9pbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcbiAgICAgICAgfTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBEaXJlY3Rpb25zKG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnLi4vbGliL2QzJyksXG4gICAgZm9ybWF0ID0gcmVxdWlyZSgnLi9mb3JtYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb25zKSB7XG4gICAgdmFyIGNvbnRyb2wgPSB7fSwgbWFwO1xuXG4gICAgY29udHJvbC5hZGRUbyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIG1hcCA9IF87XG4gICAgICAgIHJldHVybiBjb250cm9sO1xuICAgIH07XG5cbiAgICBjb250YWluZXIgPSBkMy5zZWxlY3QoTC5Eb21VdGlsLmdldChjb250YWluZXIpKVxuICAgICAgICAuY2xhc3NlZCgnbWFwYm94LWRpcmVjdGlvbnMtZXJyb3JzJywgdHJ1ZSk7XG5cbiAgICBkaXJlY3Rpb25zLm9uKCdsb2FkIHVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbWFwYm94LWVycm9yLWFjdGl2ZScsIGZhbHNlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuICAgIH0pO1xuXG4gICAgZGlyZWN0aW9ucy5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdtYXBib3gtZXJyb3ItYWN0aXZlJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtZXJyb3InKVxuICAgICAgICAgICAgLnRleHQoZS5lcnJvcik7XG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuaW5zZXJ0KCdzcGFuJywgJ3NwYW4nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLWljb24gbWFwYm94LWVycm9yLWljb24nKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb250cm9sO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZHVyYXRpb246IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHZhciBtID0gTWF0aC5mbG9vcihzIC8gNjApLFxuICAgICAgICAgICAgaCA9IE1hdGguZmxvb3IobSAvIDYwKTtcbiAgICAgICAgcyAlPSA2MDtcbiAgICAgICAgbSAlPSA2MDtcbiAgICAgICAgaWYgKGggPT09IDAgJiYgbSA9PT0gMCkgcmV0dXJuIHMgKyAnIHMnO1xuICAgICAgICBpZiAoaCA9PT0gMCkgcmV0dXJuIG0gKyAnIG1pbic7XG4gICAgICAgIHJldHVybiBoICsgJyBoICcgKyBtICsgJyBtaW4nO1xuICAgIH0sXG5cbiAgICBpbXBlcmlhbDogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgdmFyIG1pID0gbSAvIDE2MDkuMzQ0O1xuICAgICAgICBpZiAobWkgPj0gMTAwKSByZXR1cm4gbWkudG9GaXhlZCgwKSArICcgbWknO1xuICAgICAgICBpZiAobWkgPj0gMTApICByZXR1cm4gbWkudG9GaXhlZCgxKSArICcgbWknO1xuICAgICAgICBpZiAobWkgPj0gMC4xKSByZXR1cm4gbWkudG9GaXhlZCgyKSArICcgbWknO1xuICAgICAgICByZXR1cm4gKG1pICogNTI4MCkudG9GaXhlZCgwKSArICcgZnQnO1xuICAgIH0sXG5cbiAgICBtZXRyaWM6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIGlmIChtID49IDEwMDAwMCkgcmV0dXJuIChtIC8gMTAwMCkudG9GaXhlZCgwKSArICcga20nO1xuICAgICAgICBpZiAobSA+PSAxMDAwMCkgIHJldHVybiAobSAvIDEwMDApLnRvRml4ZWQoMSkgKyAnIGttJztcbiAgICAgICAgaWYgKG0gPj0gMTAwKSAgICByZXR1cm4gKG0gLyAxMDAwKS50b0ZpeGVkKDIpICsgJyBrbSc7XG4gICAgICAgIHJldHVybiBtLnRvRml4ZWQoMCkgKyAnIG0nO1xuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJy4uL2xpYi9kMycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbnMpIHtcbiAgICB2YXIgY29udHJvbCA9IHt9LCBtYXA7XG4gICAgdmFyIG9yaWdDaGFuZ2UgPSBmYWxzZSxcbiAgICAgICAgZGVzdENoYW5nZSA9IGZhbHNlO1xuXG4gICAgY29udHJvbC5hZGRUbyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIG1hcCA9IF87XG4gICAgICAgIHJldHVybiBjb250cm9sO1xuICAgIH07XG5cbiAgICBjb250YWluZXIgPSBkMy5zZWxlY3QoTC5Eb21VdGlsLmdldChjb250YWluZXIpKVxuICAgICAgICAuY2xhc3NlZCgnbWFwYm94LWRpcmVjdGlvbnMtaW5wdXRzJywgdHJ1ZSk7XG5cbiAgICB2YXIgcHVibGljVHJhbnNpdFNlbGVjdGlvbiA9IFsndW5kZXJncm91bmQnXTtcblxuICAgIHZhciBmb3JtID0gY29udGFpbmVyLmFwcGVuZCgnZm9ybScpXG4gICAgICAgIC5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZDMuZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdDaGFuZ2UpXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnMuc2V0T3JpZ2luKG9yaWdpbklucHV0LnByb3BlcnR5KCd2YWx1ZScpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVzdENoYW5nZSlcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9ucy5zZXREZXN0aW5hdGlvbihkZXN0aW5hdGlvbklucHV0LnByb3BlcnR5KCd2YWx1ZScpKTtcblxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb25zLnF1ZXJ5YWJsZSgpKVxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zLnF1ZXJ5KHsgcHJveGltaXR5OiBtYXAuZ2V0Q2VudGVyKCkgfSk7XG5cbiAgICAgICAgICAgICAgICBvcmlnQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVzdENoYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHZhciBvcmlnaW4gPSBmb3JtLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLW9yaWdpbicpO1xuXG4gICAgb3JpZ2luLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWZvcm0tbGFiZWwnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbnMuZ2V0T3JpZ2luKCkgaW5zdGFuY2VvZiBMLkxhdExuZykge1xuICAgICAgICAgICAgICAgIG1hcC5wYW5UbyhkaXJlY3Rpb25zLmdldE9yaWdpbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdtYXBib3gtZGlyZWN0aW9ucy1pY29uIG1hcGJveC1kZXBhcnQtaWNvbicpO1xuXG4gICAgdmFyIG9yaWdpbklucHV0ID0gb3JpZ2luLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3JlcXVpcmVkJywgJ3JlcXVpcmVkJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21tcnAtb3JpZ2luLWlucHV0JylcbiAgICAgICAgLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXJ0JylcbiAgICAgICAgLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFvcmlnQ2hhbmdlKSBvcmlnQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICBvcmlnaW4uYXBwZW5kKCdkaXYnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtaWNvbiBtYXBib3gtY2xvc2UtaWNvbicpXG4gICAgICAgIC5hdHRyKCd0aXRsZScsICdDbGVhciB2YWx1ZScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25zLnNldE9yaWdpbih1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgIGZvcm0uYXBwZW5kKCdzcGFuJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLWljb24gbWFwYm94LXJldmVyc2UtaWNvbiBtYXBib3gtZGlyZWN0aW9ucy1yZXZlcnNlLWlucHV0JylcbiAgICAgICAgLmF0dHIoJ3RpdGxlJywgJ1JldmVyc2Ugb3JpZ2luICYgZGVzdGluYXRpb24nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlyZWN0aW9ucy5yZXZlcnNlKCkucXVlcnkoKTtcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgZGVzdGluYXRpb24gPSBmb3JtLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLWRlc3RpbmF0aW9uJyk7XG5cbiAgICBkZXN0aW5hdGlvbi5hcHBlbmQoJ2xhYmVsJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1mb3JtLWxhYmVsJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25zLmdldERlc3RpbmF0aW9uKCkgaW5zdGFuY2VvZiBMLkxhdExuZykge1xuICAgICAgICAgICAgICAgIG1hcC5wYW5UbyhkaXJlY3Rpb25zLmdldERlc3RpbmF0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLWljb24gbWFwYm94LWFycml2ZS1pY29uJyk7XG5cbiAgICB2YXIgZGVzdGluYXRpb25JbnB1dCA9IGRlc3RpbmF0aW9uLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3JlcXVpcmVkJywgJ3JlcXVpcmVkJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21tcnAtZGVzdGluYXRpb24taW5wdXQnKVxuICAgICAgICAuYXR0cigncGxhY2Vob2xkZXInLCAnRW5kJylcbiAgICAgICAgLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFkZXN0Q2hhbmdlKSBkZXN0Q2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICBkZXN0aW5hdGlvbi5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdtYXBib3gtZGlyZWN0aW9ucy1pY29uIG1hcGJveC1jbG9zZS1pY29uJylcbiAgICAgICAgLmF0dHIoJ3RpdGxlJywgJ0NsZWFyIHZhbHVlJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbnMuc2V0RGVzdGluYXRpb24odW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgY2FyX3Byb2ZpbGUgPSBmb3JtLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21tcnAtY2FyLXByb2ZpbGVzJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLXByb2ZpbGUnKTtcblxuICAgIGNhcl9wcm9maWxlLmFwcGVuZCgnaDMnKVxuICAgICAgICAuYXR0cigndmFsdWUnLCAnRFJJVklORycpXG4gICAgICAgIC5hdHRyKCdzdHlsZScsICdtYXJnaW46IDVweCAwcHggMHB4IDVweCcpXG4gICAgICAgIC50ZXh0KCdEUklWSU5HIE9QVElPTlMnKTtcblxuICAgIGNhcl9wcm9maWxlLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgIC5hdHRyKCduYW1lJywgJ3Byb2ZpbGUnKVxuICAgICAgICAuYXR0cignaWQnLCAnbW1ycC1wcm9maWxlLXByaXZhdGUtY2FyJylcbiAgICAgICAgLnByb3BlcnR5KCdjaGVja2VkJywgdHJ1ZSlcbiAgICAgICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGNhclBhcmtpbmcucHJvcGVydHkoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNhclBhcmtpbmcucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpc0RyaXZpbmdEaXN0TGltaXRlZC5wcm9wZXJ0eSgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaXNEcml2aW5nRGlzdExpbWl0ZWQucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZUxpbWl0LnByb3BlcnR5KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhclBhcmtpbmcucHJvcGVydHkoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY2FyUGFya2luZy5wcm9wZXJ0eSgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpc0RyaXZpbmdEaXN0TGltaXRlZC5wcm9wZXJ0eSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpc0RyaXZpbmdEaXN0TGltaXRlZC5wcm9wZXJ0eSgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZUxpbWl0LnByb3BlcnR5KCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlyZWN0aW9ucy5zZXRQcm9maWxlKCdoYXNfcHJpdmF0ZV9jYXInLCB0aGlzLmNoZWNrZWQpO1xuICAgICAgICB9KTtcblxuICAgIGNhcl9wcm9maWxlLmFwcGVuZCgnbGFiZWwnKVxuICAgICAgICAuYXR0cignZm9yJywgJ21tcnAtcHJvZmlsZS1wcml2YXRlLWNhcicpXG4gICAgICAgIC50ZXh0KCdQcml2YXRlIGNhciBhdmFpbGFibGUgb24gZGVwYXJ0dXJlJyk7XG5cbiAgICB2YXIgY2FyUGFya2luZyA9IGNhcl9wcm9maWxlLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgIC5hdHRyKCduYW1lJywgJ3Byb2ZpbGUnKVxuICAgICAgICAuYXR0cignaWQnLCAnbW1ycC1wcm9maWxlLWNhci1wYXJraW5nJylcbiAgICAgICAgLnByb3BlcnR5KCdjaGVja2VkJywgdHJ1ZSlcbiAgICAgICAgLnByb3BlcnR5KCdkaXNhYmxlZCcsIGZhbHNlKVxuICAgICAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25zLnNldFByb2ZpbGUoJ25lZWRfcGFya2luZycsIHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgY2FyX3Byb2ZpbGUuYXBwZW5kKCdsYWJlbCcpXG4gICAgICAgIC5hdHRyKCdmb3InLCAnbW1ycC1wcm9maWxlLWNhci1wYXJraW5nJylcbiAgICAgICAgLnRleHQoJ05lZWQgcGFya2luZyBmb3IgdGhlIGNhcicpO1xuXG4gICAgdmFyIGlzRHJpdmluZ0Rpc3RMaW1pdGVkID0gY2FyX3Byb2ZpbGUuYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAgICAgLmF0dHIoJ25hbWUnLCAnZHJpdmluZy1wcm9maWxlJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2RyaXZpbmctZGlzdGFuY2UtbGltaXQnKVxuICAgICAgICAucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKVxuICAgICAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2VMaW1pdC5wcm9wZXJ0eSgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VMaW1pdC5wcm9wZXJ0eSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICBjYXJfcHJvZmlsZS5hcHBlbmQoJ2xhYmVsJylcbiAgICAgICAgLmF0dHIoJ2ZvcicsICdkcml2aW5nLWRpc3RhbmNlLWxpbWl0JylcbiAgICAgICAgLmF0dHIoJ3N0eWxlJywgJ3dpZHRoOiAxNTBweCcpXG4gICAgICAgIC50ZXh0KCdEaXN0YW5jZSBsaW1pdCAoa20pOiAnKTtcblxuICAgIHZhciBkaXN0YW5jZUxpbWl0ID0gY2FyX3Byb2ZpbGUuYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgIC5hdHRyKCd0eXBlJywgJ251bWJlcicpXG4gICAgICAgIC5hdHRyKCdtaW4nLCAnMTAnKVxuICAgICAgICAuYXR0cignbWF4JywgJzI2MTcnKVxuICAgICAgICAucHJvcGVydHkoJ3ZhbHVlJywgJzUwMCcpXG4gICAgICAgIC5hdHRyKCdpZCcsICdtbXJwLWRyaXZpbmctZGlzdGFuY2UtbGltaXQnKVxuICAgICAgICAuYXR0cignc3R5bGUnLCAnd2lkdGg6IDgwcHg7cGFkZGluZy1sZWZ0OiAxMHB4O3BhZGRpbmctdG9wOiAycHg7cGFkZGluZy1ib3R0b206IDJweDtiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMSk7aGVpZ2h0OiAzMHB4O3ZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Jyk7XG5cbiAgICB2YXIgcHVibGljX3Byb2ZpbGUgPSBmb3JtLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ21tcnAtcHVibGljLXByb2ZpbGVzJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLXByb2ZpbGUnKTtcblxuICAgIHB1YmxpY19wcm9maWxlLmFwcGVuZCgnaDMnKVxuICAgICAgICAuYXR0cigndmFsdWUnLCAnUFVCTElDIFRSQU5TSVQnKVxuICAgICAgICAuYXR0cignc3R5bGUnLCAnbWFyZ2luOiA1cHggMHB4IDBweCA1cHgnKVxuICAgICAgICAudGV4dCgnUFVCTElDIFRSQU5TSVQgUFJFRkVSRU5DRVMnKTtcblxuICAgIHZhciBwdWJsaWNfcHJvZmlsZXMgPSBwdWJsaWNfcHJvZmlsZS5zZWxlY3RBbGwoJ3NwYW4nKVxuICAgICAgICAuZGF0YShbXG4gICAgICAgICAgICBbJ21tcnAuc3VidXJiYW4nLCAnc3VidXJiYW4nLCAnU3VidXJiYW4nXSxcbiAgICAgICAgICAgIFsnbW1ycC51bmRlcmdyb3VuZCcsICd1bmRlcmdyb3VuZCcsICdVbmRlcmdyb3VuZCddLFxuICAgICAgICAgICAgWydtbXJwLnRyYW0nLCAndHJhbScsICdUcmFtJ11dKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdzcGFuJyk7XG5cbiAgICBwdWJsaWNfcHJvZmlsZXMuYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgIC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAgICAgLmF0dHIoJ25hbWUnLCAncHJvZmlsZScpXG4gICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiAnbW1ycC1wcm9maWxlLScgKyBkWzFdOyB9KVxuICAgICAgICAucHJvcGVydHkoJ2NoZWNrZWQnLCBmdW5jdGlvbiAoZCwgaSkgeyByZXR1cm4gaSA9PT0gMTsgfSApXG4gICAgICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBwdWJsaWNUcmFuc2l0U2VsZWN0aW9uLnB1c2goZFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBwdWJsaWNUcmFuc2l0U2VsZWN0aW9uLmluZGV4T2YoZFsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHVibGljVHJhbnNpdFNlbGVjdGlvbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWNfcHJvZmlsZXMuYXBwZW5kKCdsYWJlbCcpXG4gICAgICAgIC5hdHRyKCdmb3InLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gJ21tcnAtcHJvZmlsZS0nICsgZFsxXTsgfSlcbiAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGRbMl07IH0pO1xuXG4gICAgcHVibGljX3Byb2ZpbGUuYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgIC5hdHRyKCd0eXBlJywgJ2J1dHRvbicpXG4gICAgICAgIC5hdHRyKCd2YWx1ZScsICdGaW5kIG11bHRpbW9kYWwgcGF0aHMnKVxuICAgICAgICAuYXR0cignbmFtZScsICdmaW5kIHBhdGhzJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2ZpbmQtbW1wYXRocycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdidXR0b24nKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGlmIChpc0RyaXZpbmdEaXN0TGltaXRlZC5wcm9wZXJ0eSgnY2hlY2tlZCcpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9ucy5zZXRQcm9maWxlKCdkcml2aW5nX2Rpc3RhbmNlX2xpbWl0JywgZGlzdGFuY2VMaW1pdC5wcm9wZXJ0eSgndmFsdWUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXJlY3Rpb25zLnNldFByb2ZpbGUoJ2F2YWlsYWJsZV9wdWJsaWNfbW9kZXMnLCBwdWJsaWNUcmFuc2l0U2VsZWN0aW9uKTtcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucXVlcnkoKTtcbiAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBmb3JtYXQod2F5cG9pbnQpIHtcbiAgICAgICAgaWYgKCF3YXlwb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9IGVsc2UgaWYgKHdheXBvaW50LnByb3BlcnRpZXMubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdheXBvaW50LnByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICh3YXlwb2ludC5nZW9tZXRyeS5jb29yZGluYXRlcykge1xuICAgICAgICAgICAgdmFyIHByZWNpc2lvbiA9IE1hdGgubWF4KDAsIE1hdGguY2VpbChNYXRoLmxvZyhtYXAuZ2V0Wm9vbSgpKSAvIE1hdGguTE4yKSk7XG4gICAgICAgICAgICByZXR1cm4gd2F5cG9pbnQuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0udG9GaXhlZChwcmVjaXNpb24pICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgd2F5cG9pbnQuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0udG9GaXhlZChwcmVjaXNpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHdheXBvaW50LnByb3BlcnRpZXMucXVlcnkgfHwgJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXJlY3Rpb25zXG4gICAgICAgIC5vbignb3JpZ2luJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIG9yaWdpbklucHV0LnByb3BlcnR5KCd2YWx1ZScsIGZvcm1hdChlLm9yaWdpbikpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Rlc3RpbmF0aW9uJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uSW5wdXQucHJvcGVydHkoJ3ZhbHVlJywgZm9ybWF0KGUuZGVzdGluYXRpb24pKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdwcm9maWxlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHByb2ZpbGVzLnNlbGVjdEFsbCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5wcm9wZXJ0eSgnY2hlY2tlZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkWzBdID09PSBlLnByb2ZpbGU7IH0pO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgb3JpZ2luSW5wdXQucHJvcGVydHkoJ3ZhbHVlJywgZm9ybWF0KGUub3JpZ2luKSk7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbklucHV0LnByb3BlcnR5KCd2YWx1ZScsIGZvcm1hdChlLmRlc3RpbmF0aW9uKSk7XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbnRyb2w7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCcuLi9saWIvZDMnKSxcbiAgICBmb3JtYXQgPSByZXF1aXJlKCcuL2Zvcm1hdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbnMpIHtcbiAgICB2YXIgY29udHJvbCA9IHt9LCBtYXA7XG5cbiAgICBjb250cm9sLmFkZFRvID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgbWFwID0gXztcbiAgICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfTtcblxuICAgIGNvbnRhaW5lciA9IGQzLnNlbGVjdChMLkRvbVV0aWwuZ2V0KGNvbnRhaW5lcikpXG4gICAgICAgIC5jbGFzc2VkKCdtYXBib3gtZGlyZWN0aW9ucy1pbnN0cnVjdGlvbnMnLCB0cnVlKTtcblxuICAgIGRpcmVjdGlvbnMub24oJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG4gICAgfSk7XG5cbiAgICBkaXJlY3Rpb25zLm9uKCdzZWxlY3RSb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciByb3V0ZSA9IGUucm91dGU7XG5cbiAgICAgICAgY29udGFpbmVyLmh0bWwoJycpO1xuXG4gICAgICAgIHZhciBzdGVwcyA9IGNvbnRhaW5lci5hcHBlbmQoJ29sJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtYXBib3gtZGlyZWN0aW9ucy1zdGVwcycpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdsaScpXG4gICAgICAgICAgICAuZGF0YShyb3V0ZS5zdGVwcylcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcGJveC1kaXJlY3Rpb25zLXN0ZXAnKTtcblxuICAgICAgICBzdGVwcy5hcHBlbmQoJ3NwYW4nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKHN0ZXApIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5wcm9wZXJ0aWVzLnR5cGUgPT09ICdwYXRoJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ21hcGJveC1kaXJlY3Rpb25zLWljb24gbWFwYm94LWNvbnRpbnVlLWljb24nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGVwLnByb3BlcnRpZXMudHlwZSA9PT0gJ3N3aXRjaF9wb2ludCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdtYXBib3gtZGlyZWN0aW9ucy1pY29uIG1tcnAtJyArIHN0ZXAucHJvcGVydGllcy5zd2l0Y2hfdHlwZS50b0xvd2VyQ2FzZSgpICsgJy1pY29uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzdGVwcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtc3RlcC1tYW5ldXZlcicpXG4gICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoc3RlcCkgeyBcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5wcm9wZXJ0aWVzLnR5cGUgPT09ICdwYXRoJykgeyBcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzdGVwLnByb3BlcnRpZXMubW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJpdmF0ZV9jYXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnRHJpdmluZyc7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZm9vdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdXYWxraW5nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JpY3ljbGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnQ3ljbGluZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVwLnByb3BlcnRpZXMudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RlcC5wcm9wZXJ0aWVzLnR5cGUgPT09ICdzd2l0Y2hfcG9pbnQnKSB7IFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5wcm9wZXJ0aWVzLnN3aXRjaF90eXBlID09PSAndW5kZXJncm91bmRfc3RhdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVwLnByb3BlcnRpZXMudGl0bGUgKyAnOiBQbGF0Zm9ybSAnICsgc3RlcC5wcm9wZXJ0aWVzLnBsYXRmb3JtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVwLnByb3BlcnRpZXMudGl0bGU7IFxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzdGVwcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtc3RlcC1kaXN0YW5jZScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoc3RlcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGVwLnByb3BlcnRpZXMuZGlzdGFuY2UgPyBmb3JtYXRbZGlyZWN0aW9ucy5vcHRpb25zLnVuaXRzXShzdGVwLnByb3BlcnRpZXMuZGlzdGFuY2UpIDogJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzdGVwcy5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKHN0ZXApIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbnMuaGlnaGxpZ2h0U3RlcChzdGVwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RlcHMub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlyZWN0aW9ucy5oaWdobGlnaHRTdGVwKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGVwcy5vbignY2xpY2snLCBmdW5jdGlvbiAoc3RlcCkge1xuICAgICAgICAgICAgaWYgKHN0ZXAubG9jKSB7XG4gICAgICAgICAgICAgICAgbWFwLnBhblRvKEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhzdGVwLmxvYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb250cm9sO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnZGVib3VuY2UnKTtcblxudmFyIExheWVyID0gTC5MYXllckdyb3VwLmV4dGVuZCh7XG4gICAgb3B0aW9uczoge1xuICAgICAgICByZWFkb25seTogZmFsc2VcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oZGlyZWN0aW9ucywgb3B0aW9ucykge1xuICAgICAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbnMgPSBkaXJlY3Rpb25zIHx8IG5ldyBMLkRpcmVjdGlvbnMoKTtcbiAgICAgICAgTC5MYXllckdyb3VwLnByb3RvdHlwZS5pbml0aWFsaXplLmFwcGx5KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2RyYWcgPSBkZWJvdW5jZShMLmJpbmQodGhpcy5fZHJhZywgdGhpcyksIDEwMCk7XG5cbiAgICAgICAgdGhpcy5vcmlnaW5NYXJrZXIgPSBMLm1hcmtlcihbMCwgMF0sIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZTogIXRoaXMub3B0aW9ucy5yZWFkb25seSxcbiAgICAgICAgICAgIGljb246IEwubWFwYm94Lm1hcmtlci5pY29uKHtcbiAgICAgICAgICAgICAgICAnbWFya2VyLXNpemUnOiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgICAnbWFya2VyLWNvbG9yJzogJyMzQkIyRDAnLFxuICAgICAgICAgICAgICAgICdtYXJrZXItc3ltYm9sJzogJ2EnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS5vbignZHJhZycsIHRoaXMuX2RyYWcsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZGVzdGluYXRpb25NYXJrZXIgPSBMLm1hcmtlcihbMCwgMF0sIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZTogIXRoaXMub3B0aW9ucy5yZWFkb25seSxcbiAgICAgICAgICAgIGljb246IEwubWFwYm94Lm1hcmtlci5pY29uKHtcbiAgICAgICAgICAgICAgICAnbWFya2VyLXNpemUnOiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgICAnbWFya2VyLWNvbG9yJzogJyM0NDQnLFxuICAgICAgICAgICAgICAgICdtYXJrZXItc3ltYm9sJzogJ2InXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS5vbignZHJhZycsIHRoaXMuX2RyYWcsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc3RlcE1hcmtlciA9IEwubWFya2VyKFswLCAwXSwge1xuICAgICAgICAgICAgaWNvbjogTC5kaXZJY29uKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdtYXBib3gtbWFya2VyLWRyYWctaWNvbiBtYXBib3gtbWFya2VyLWRyYWctaWNvbi1zdGVwJyxcbiAgICAgICAgICAgICAgICBpY29uU2l6ZTogbmV3IEwuUG9pbnQoMTIsIDEyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kcmFnTWFya2VyID0gTC5tYXJrZXIoWzAsIDBdLCB7XG4gICAgICAgICAgICBkcmFnZ2FibGU6ICF0aGlzLm9wdGlvbnMucmVhZG9ubHksXG4gICAgICAgICAgICBpY29uOiB0aGlzLl93YXlwb2ludEljb24oKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRyYWdNYXJrZXJcbiAgICAgICAgICAgIC5vbignZHJhZ3N0YXJ0JywgdGhpcy5fZHJhZ1N0YXJ0LCB0aGlzKVxuICAgICAgICAgICAgLm9uKCdkcmFnJywgdGhpcy5fZHJhZywgdGhpcylcbiAgICAgICAgICAgIC5vbignZHJhZ2VuZCcsIHRoaXMuX2RyYWdFbmQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMucm91dGVMYXllciA9IEwubWFwYm94LmZlYXR1cmVMYXllcigpO1xuICAgICAgICB0aGlzLnJvdXRlSGlnaGxpZ2h0TGF5ZXIgPSBMLm1hcGJveC5mZWF0dXJlTGF5ZXIoKTtcbiAgICAgICAgdGhpcy50cmFja0xheWVyID0gTC5tYXBib3guZmVhdHVyZUxheWVyKCk7XG5cbiAgICAgICAgdGhpcy53YXlwb2ludE1hcmtlcnMgPSBbXTtcbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBMLkxheWVyR3JvdXAucHJvdG90eXBlLm9uQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVhZG9ubHkpIHtcbiAgICAgICAgICB0aGlzLl9tYXBcbiAgICAgICAgICAgICAgLm9uKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKVxuICAgICAgICAgICAgICAub24oJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlbW92ZSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb25zXG4gICAgICAgICAgICAub24oJ29yaWdpbicsIHRoaXMuX29yaWdpbiwgdGhpcylcbiAgICAgICAgICAgIC5vbignZGVzdGluYXRpb24nLCB0aGlzLl9kZXN0aW5hdGlvbiwgdGhpcylcbiAgICAgICAgICAgIC5vbignbG9hZCcsIHRoaXMuX2xvYWQsIHRoaXMpXG4gICAgICAgICAgICAub24oJ3VubG9hZCcsIHRoaXMuX3VubG9hZCwgdGhpcylcbiAgICAgICAgICAgIC5vbignc2VsZWN0Um91dGUnLCB0aGlzLl9zZWxlY3RSb3V0ZSwgdGhpcylcbiAgICAgICAgICAgIC5vbignc2VsZWN0VHJhY2snLCB0aGlzLl9zZWxlY3RUcmFjaywgdGhpcylcbiAgICAgICAgICAgIC5vbignaGlnaGxpZ2h0Um91dGUnLCB0aGlzLl9oaWdobGlnaHRSb3V0ZSwgdGhpcylcbiAgICAgICAgICAgIC5vbignaGlnaGxpZ2h0U3RlcCcsIHRoaXMuX2hpZ2hsaWdodFN0ZXAsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbnNcbiAgICAgICAgICAgIC5vZmYoJ29yaWdpbicsIHRoaXMuX29yaWdpbiwgdGhpcylcbiAgICAgICAgICAgIC5vZmYoJ2Rlc3RpbmF0aW9uJywgdGhpcy5fZGVzdGluYXRpb24sIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdsb2FkJywgdGhpcy5fbG9hZCwgdGhpcylcbiAgICAgICAgICAgIC5vZmYoJ3VubG9hZCcsIHRoaXMuX3VubG9hZCwgdGhpcylcbiAgICAgICAgICAgIC5vZmYoJ3NlbGVjdFJvdXRlJywgdGhpcy5fc2VsZWN0Um91dGUsIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdzZWxlY3RUcmFjaycsIHRoaXMuX3NlbGVjdFRyYWNrLCB0aGlzKVxuICAgICAgICAgICAgLm9mZignaGlnaGxpZ2h0Um91dGUnLCB0aGlzLl9oaWdobGlnaHRSb3V0ZSwgdGhpcylcbiAgICAgICAgICAgIC5vZmYoJ2hpZ2hsaWdodFN0ZXAnLCB0aGlzLl9oaWdobGlnaHRTdGVwLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9tYXBcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJywgdGhpcy5fY2xpY2ssIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZW1vdmUsIHRoaXMpO1xuXG4gICAgICAgIEwuTGF5ZXJHcm91cC5wcm90b3R5cGUub25SZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuXG4gICAgX2NsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGlyZWN0aW9ucy5nZXRPcmlnaW4oKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9ucy5zZXRPcmlnaW4oZS5sYXRsbmcpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kaXJlY3Rpb25zLmdldERlc3RpbmF0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbnMuc2V0RGVzdGluYXRpb24oZS5sYXRsbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiAodGhpcy5fZGlyZWN0aW9ucy5xdWVyeWFibGUoKSkge1xuICAgICAgICAgICAgLy90aGlzLl9kaXJlY3Rpb25zLnF1ZXJ5KCk7XG4gICAgICAgIC8vfVxuICAgIH0sXG5cbiAgICBfbW91c2Vtb3ZlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghdGhpcy5yb3V0ZUxheWVyIHx8ICF0aGlzLmhhc0xheWVyKHRoaXMucm91dGVMYXllcikgfHwgdGhpcy5fY3VycmVudFdheXBvaW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwID0gdGhpcy5fcm91dGVQb2x5bGluZSgpLmNsb3Nlc3RMYXllclBvaW50KGUubGF5ZXJQb2ludCk7XG5cbiAgICAgICAgaWYgKCFwIHx8IHAuZGlzdGFuY2UgPiAxNSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGF5ZXIodGhpcy5kcmFnTWFya2VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtID0gdGhpcy5fbWFwLnByb2plY3QoZS5sYXRsbmcpLFxuICAgICAgICAgICAgbyA9IHRoaXMuX21hcC5wcm9qZWN0KHRoaXMub3JpZ2luTWFya2VyLmdldExhdExuZygpKSxcbiAgICAgICAgICAgIGQgPSB0aGlzLl9tYXAucHJvamVjdCh0aGlzLmRlc3RpbmF0aW9uTWFya2VyLmdldExhdExuZygpKTtcblxuICAgICAgICBpZiAoby5kaXN0YW5jZVRvKG0pIDwgMTUgfHwgZC5kaXN0YW5jZVRvKG0pIDwgMTUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxheWVyKHRoaXMuZHJhZ01hcmtlcik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2F5cG9pbnRNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdyA9IHRoaXMuX21hcC5wcm9qZWN0KHRoaXMud2F5cG9pbnRNYXJrZXJzW2ldLmdldExhdExuZygpKTtcbiAgICAgICAgICAgIGlmIChpICE9PSB0aGlzLl9jdXJyZW50V2F5cG9pbnQgJiYgdy5kaXN0YW5jZVRvKG0pIDwgMTUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVMYXllcih0aGlzLmRyYWdNYXJrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnTWFya2VyLnNldExhdExuZyh0aGlzLl9tYXAubGF5ZXJQb2ludFRvTGF0TG5nKHApKTtcbiAgICAgICAgdGhpcy5hZGRMYXllcih0aGlzLmRyYWdNYXJrZXIpO1xuICAgIH0sXG5cbiAgICBfb3JpZ2luOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLm9yaWdpbiAmJiBlLm9yaWdpbi5nZW9tZXRyeS5jb29yZGluYXRlcykge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5NYXJrZXIuc2V0TGF0TG5nKEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhlLm9yaWdpbi5nZW9tZXRyeS5jb29yZGluYXRlcykpO1xuICAgICAgICAgICAgdGhpcy5hZGRMYXllcih0aGlzLm9yaWdpbk1hcmtlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVyKHRoaXMub3JpZ2luTWFya2VyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZGVzdGluYXRpb246IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuZGVzdGluYXRpb24gJiYgZS5kZXN0aW5hdGlvbi5nZW9tZXRyeS5jb29yZGluYXRlcykge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbk1hcmtlci5zZXRMYXRMbmcoTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5nKGUuZGVzdGluYXRpb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkTGF5ZXIodGhpcy5kZXN0aW5hdGlvbk1hcmtlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVyKHRoaXMuZGVzdGluYXRpb25NYXJrZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9kcmFnU3RhcnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLmRyYWdNYXJrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRXYXlwb2ludCA9IHRoaXMuX2ZpbmRXYXlwb2ludEluZGV4KGUudGFyZ2V0LmdldExhdExuZygpKTtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbnMuYWRkV2F5cG9pbnQodGhpcy5fY3VycmVudFdheXBvaW50LCBlLnRhcmdldC5nZXRMYXRMbmcoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50V2F5cG9pbnQgPSB0aGlzLndheXBvaW50TWFya2Vycy5pbmRleE9mKGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZHJhZzogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgbGF0TG5nID0gZS50YXJnZXQuZ2V0TGF0TG5nKCk7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLm9yaWdpbk1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9ucy5zZXRPcmlnaW4obGF0TG5nKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldCA9PT0gdGhpcy5kZXN0aW5hdGlvbk1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9ucy5zZXREZXN0aW5hdGlvbihsYXRMbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9ucy5zZXRXYXlwb2ludCh0aGlzLl9jdXJyZW50V2F5cG9pbnQsIGxhdExuZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9ucy5xdWVyeWFibGUoKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9ucy5xdWVyeSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9kcmFnRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFdheXBvaW50ID0gdW5kZWZpbmVkO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlV2F5cG9pbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9ucy5yZW1vdmVXYXlwb2ludCh0aGlzLndheXBvaW50TWFya2Vycy5pbmRleE9mKGUudGFyZ2V0KSkucXVlcnkoKTtcbiAgICB9LFxuXG4gICAgX2xvYWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5fb3JpZ2luKGUpO1xuICAgICAgICB0aGlzLl9kZXN0aW5hdGlvbihlKTtcblxuICAgICAgICBmdW5jdGlvbiB3YXlwb2ludExhdExuZyhpKSB7XG4gICAgICAgICAgICByZXR1cm4gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5nKGUud2F5cG9pbnRzW2ldLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsID0gTWF0aC5taW4odGhpcy53YXlwb2ludE1hcmtlcnMubGVuZ3RoLCBlLndheXBvaW50cy5sZW5ndGgpLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nXG4gICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLndheXBvaW50TWFya2Vyc1tpXS5zZXRMYXRMbmcod2F5cG9pbnRMYXRMbmcoaSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIG5ld1xuICAgICAgICBmb3IgKDsgaSA8IGUud2F5cG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgd2F5cG9pbnRNYXJrZXIgPSBMLm1hcmtlcih3YXlwb2ludExhdExuZyhpKSwge1xuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogIXRoaXMub3B0aW9ucy5yZWFkb25seSxcbiAgICAgICAgICAgICAgICBpY29uOiB0aGlzLl93YXlwb2ludEljb24oKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHdheXBvaW50TWFya2VyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIHRoaXMuX3JlbW92ZVdheXBvaW50LCB0aGlzKVxuICAgICAgICAgICAgICAgIC5vbignZHJhZ3N0YXJ0JywgdGhpcy5fZHJhZ1N0YXJ0LCB0aGlzKVxuICAgICAgICAgICAgICAgIC5vbignZHJhZycsIHRoaXMuX2RyYWcsIHRoaXMpXG4gICAgICAgICAgICAgICAgLm9uKCdkcmFnZW5kJywgdGhpcy5fZHJhZ0VuZCwgdGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMud2F5cG9pbnRNYXJrZXJzLnB1c2god2F5cG9pbnRNYXJrZXIpO1xuICAgICAgICAgICAgdGhpcy5hZGRMYXllcih3YXlwb2ludE1hcmtlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgb2xkXG4gICAgICAgIGZvciAoOyBpIDwgdGhpcy53YXlwb2ludE1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXIodGhpcy53YXlwb2ludE1hcmtlcnNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53YXlwb2ludE1hcmtlcnMubGVuZ3RoID0gZS53YXlwb2ludHMubGVuZ3RoO1xuICAgIH0sXG5cbiAgICBfdW5sb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMYXllcih0aGlzLnJvdXRlTGF5ZXIpO1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVyKHRoaXMudHJhY2tMYXllcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy53YXlwb2ludE1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXIodGhpcy53YXlwb2ludE1hcmtlcnNbaV0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZWxlY3RSb3V0ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnJvdXRlTGF5ZXJcbiAgICAgICAgICAgIC5jbGVhckxheWVycygpXG4gICAgICAgICAgICAuc2V0R2VvSlNPTihlLnJvdXRlLmdlb21ldHJ5KTtcbiAgICAgICAgdGhpcy5hZGRMYXllcih0aGlzLnJvdXRlTGF5ZXIpO1xuICAgIH0sXG5cbiAgICBfc2VsZWN0VHJhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy50cmFja0xheWVyXG4gICAgICAgICAgICAuY2xlYXJMYXllcnMoKVxuICAgICAgICAgICAgLnNldEdlb0pTT04oZS50cmFjayk7XG4gICAgICAgIHRoaXMuYWRkTGF5ZXIodGhpcy50cmFja0xheWVyKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMYXllcih0aGlzLnJvdXRlTGF5ZXIpO1xuICAgIH0sXG5cbiAgICBfaGlnaGxpZ2h0Um91dGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUucm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVIaWdobGlnaHRMYXllclxuICAgICAgICAgICAgICAgIC5jbGVhckxheWVycygpXG4gICAgICAgICAgICAgICAgLnNldEdlb0pTT04oZS5yb3V0ZS5nZW9tZXRyeSk7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMucm91dGVIaWdobGlnaHRMYXllcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVyKHRoaXMucm91dGVIaWdobGlnaHRMYXllcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2hpZ2hsaWdodFN0ZXA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuc3RlcCAmJiBlLnN0ZXAubG9jKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXBNYXJrZXIuc2V0TGF0TG5nKEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhlLnN0ZXAubG9jKSk7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMuc3RlcE1hcmtlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVyKHRoaXMuc3RlcE1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JvdXRlUG9seWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZUxheWVyLmdldExheWVycygpWzBdO1xuICAgIH0sXG5cbiAgICBfZmluZFdheXBvaW50SW5kZXg6IGZ1bmN0aW9uKGxhdExuZykge1xuICAgICAgICB2YXIgc2VnbWVudCA9IHRoaXMuX2ZpbmROZWFyZXN0Um91dGVTZWdtZW50KGxhdExuZyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLndheXBvaW50TWFya2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHMgPSB0aGlzLl9maW5kTmVhcmVzdFJvdXRlU2VnbWVudCh0aGlzLndheXBvaW50TWFya2Vyc1tpXS5nZXRMYXRMbmcoKSk7XG4gICAgICAgICAgICBpZiAocyA+IHNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLndheXBvaW50TWFya2Vycy5sZW5ndGg7XG4gICAgfSxcblxuICAgIF9maW5kTmVhcmVzdFJvdXRlU2VnbWVudDogZnVuY3Rpb24obGF0TG5nKSB7XG4gICAgICAgIHZhciBtaW4gPSBJbmZpbml0eSxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgcCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQobGF0TG5nKSxcbiAgICAgICAgICAgIHBvc2l0aW9ucyA9IHRoaXMuX3JvdXRlUG9seWxpbmUoKS5fb3JpZ2luYWxQb2ludHM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkID0gTC5MaW5lVXRpbC5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocCwgcG9zaXRpb25zW2kgLSAxXSwgcG9zaXRpb25zW2ldLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgbWluID0gZDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSxcblxuICAgIF93YXlwb2ludEljb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTC5kaXZJY29uKHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ21hcGJveC1tYXJrZXItZHJhZy1pY29uJyxcbiAgICAgICAgICAgIGljb25TaXplOiBuZXcgTC5Qb2ludCgxMiwgMTIpXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRpcmVjdGlvbnMsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IExheWVyKGRpcmVjdGlvbnMsIG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzcG9zdCA9IHJlcXVpcmUoJy4vZDNfcG9zdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybCwgcmVxRGF0YSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZDNwb3N0KHVybCwgcmVxRGF0YSwgZnVuY3Rpb24gKGVyciwgcmVzcCkge1xuICAgICAgICBpZiAoZXJyICYmIGVyci50eXBlID09PSAnYWJvcnQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyICYmICFlcnIucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3AgPSByZXNwIHx8IGVycjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcCA9IEpTT04ucGFyc2UocmVzcC5yZXNwb25zZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IocmVzcCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3AuZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IocmVzcC5lcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3AucmVzdWx0KTtcbiAgICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJy4uL2xpYi9kMycpLFxuICAgIGZvcm1hdCA9IHJlcXVpcmUoJy4vZm9ybWF0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9ucykge1xuICAgIHZhciBjb250cm9sID0ge30sIG1hcCwgc2VsZWN0aW9uID0gMDtcblxuICAgIGNvbnRyb2wuYWRkVG8gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBtYXAgPSBfO1xuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyID0gZDMuc2VsZWN0KEwuRG9tVXRpbC5nZXQoY29udGFpbmVyKSlcbiAgICAgICAgLmNsYXNzZWQoJ21hcGJveC1kaXJlY3Rpb25zLXJvdXRlcycsIHRydWUpO1xuXG4gICAgZGlyZWN0aW9ucy5vbignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5odG1sKCcnKTtcbiAgICB9KTtcblxuICAgIGRpcmVjdGlvbnMub24oJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG5cbiAgICAgICAgdmFyIHJvdXRlcyA9IGNvbnRhaW5lci5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpJylcbiAgICAgICAgICAgIC5kYXRhKGUucm91dGVzKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtcm91dGUnKTtcblxuICAgICAgICByb3V0ZXMuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnbWFwYm94LWRpcmVjdGlvbnMtcm91dGUtaGVhZGluZycpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAocm91dGUpIHsgcmV0dXJuICdSb3V0ZSAnICsgKGUucm91dGVzLmluZGV4T2Yocm91dGUpICsgMSk7IH0pO1xuXG4gICAgICAgIHJvdXRlcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtcm91dGUtc3VtbWFyeScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAocm91dGUpIHsgcmV0dXJuIHJvdXRlLnN1bW1hcnk7IH0pO1xuXG4gICAgICAgIHJvdXRlcy5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbWFwYm94LWRpcmVjdGlvbnMtcm91dGUtZGV0YWlscycpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0W2RpcmVjdGlvbnMub3B0aW9ucy51bml0c10ocm91dGUuZGlzdGFuY2UpICsgJywgJyArIGZvcm1hdC5kdXJhdGlvbihyb3V0ZS5kdXJhdGlvbik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXMub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgZGlyZWN0aW9ucy5oaWdobGlnaHRSb3V0ZShyb3V0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlcy5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25zLmhpZ2hsaWdodFJvdXRlKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25zLnNlbGVjdFJvdXRlKHJvdXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlyZWN0aW9ucy5zZWxlY3RSb3V0ZShlLnJvdXRlc1swXSk7XG4gICAgfSk7XG5cbiAgICBkaXJlY3Rpb25zLm9uKCdzZWxlY3RSb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnRhaW5lci5zZWxlY3RBbGwoJy5tYXBib3gtZGlyZWN0aW9ucy1yb3V0ZScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbWFwYm94LWRpcmVjdGlvbnMtcm91dGUtYWN0aXZlJywgZnVuY3Rpb24gKHJvdXRlKSB7IHJldHVybiByb3V0ZSA9PT0gZS5yb3V0ZTsgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29udHJvbDtcbn07XG4iLCIvKiBAZmxvdyAqL1xuXG52YXIgcmVuZGVyUm93ID0gZnVuY3Rpb24oY29udGFpbmVyLCBkYXRhKSB7XG4gICAgdmFyIHJvdyA9IGNvbnRhaW5lci5pbnNlcnRSb3coKTtcbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIHZhciBjZWxsID0gcm93Lmluc2VydENlbGwoKTtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IHN0cjtcbiAgICB9KTtcbiAgICByZXR1cm4gcm93O1xufTtcblxuXG52YXIgVGFibGVDb250cm9sID0gZnVuY3Rpb24oXG4gICAgZWxlbWVudCAvKjogT2JqZWN0ICovLCAvKiBUYWJsZUVsZW1lbnQgKi9cbiAgICBoZWFkZXJzIC8qOiBbc3RyaW5nXSAqLyxcbiAgICBtb2RlbCAvKjogP1tbc3RyaW5nXV0gKi9cbikge1xuICAgIHJlbmRlclJvdyhlbGVtZW50LmNyZWF0ZVRIZWFkKCksIGhlYWRlcnMpO1xuICAgIHRoaXMudGJvZHkgPSBlbGVtZW50LmNyZWF0ZVRCb2R5KCk7XG4gICAgdGhpcy5iaW5kKG1vZGVsIHx8IFtdKTtcbn07XG5cblRhYmxlQ29udHJvbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB3aGlsZSAodGhpcy50Ym9keS5oYXNDaGlsZE5vZGVzKCkpIHsgICBcbiAgICAgICAgdGhpcy50Ym9keS5yZW1vdmVDaGlsZCh0aGlzLnRib2R5LmZpcnN0Q2hpbGQpO1xuICAgIH1cbn07XG5cblRhYmxlQ29udHJvbC5wcm90b3R5cGUub25TZWxlY3RlZCA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uU2VsZWN0ZWRIYW5kbGVyID0gaGFuZGxlcjtcbn07XG5cblRhYmxlQ29udHJvbC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIC8vIGRlYWwgd2l0aCBjbG9zdXJlXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIG1vZGVsLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgcm93ID0gcmVuZGVyUm93KHNlbGYudGJvZHksIGRhdGEpO1xuICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLm9uU2VsZWN0ZWRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vblNlbGVjdGVkSGFuZGxlcihkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlQ29udHJvbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRhYmxlQ29udHJvbCA9IHJlcXVpcmUoJy4vdGFibGVfY29udHJvbC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgZGlyZWN0aW9ucykge1xuICAgIHZhciBjb250cm9sID0ge30sIG1hcDtcbiAgICB2YXIgb3JpZ0NoYW5nZSA9IGZhbHNlLCBkZXN0Q2hhbmdlID0gZmFsc2U7XG4gICAgdmFyIFRSQUNLSU5GT19BUElfVVJMID0gXCJodHRwOi8vbHVsaXUubWUvdHJhY2tzL2FwaS92MS90cmFja2luZm9cIjtcbiAgICB2YXIgVFJBQ0tfQVBJX1VSTCA9IFwiaHR0cDovL2x1bGl1Lm1lL3RyYWNrcy9hcGkvdjEvdHJhY2tzXCI7XG5cbiAgICBjb250cm9sLmFkZFRvID0gZnVuY3Rpb24oXykge1xuICAgICAgICBtYXAgPSBfO1xuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9O1xuXG4gICAgLy8gZ2V0IHBhZ2UgMSBvZiB0cmFja2luZm8gYXMgaW5pdCBkYXRhIGZvciB0aGUgdGFibGVcbiAgICAvLyBXZWIgYnJvd3NlciBjb21wYXRpYmlsaXR5OlxuICAgIC8vIGZvciBJRTcrLCBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcbiAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xuICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPHRhYmxlIGlkPVwidGFibGVcIiBjbGFzcz1cInByb3NlXCI+PC90YWJsZT4nKTtcblxuICAgIHZhciB0cmFja2luZm9YaHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIga2V5cyA9IFtdLCB2YWx1ZXMgPSBbXTtcbiAgICB0cmFja2luZm9YaHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0cmFja2luZm9YaHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB0cmFja2luZm9YaHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHZhciB0cmFja2luZm9EYXRhID0gSlNPTi5wYXJzZSh0cmFja2luZm9YaHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh0cmFja2luZm9EYXRhLm9iamVjdHNbMF0pO1xuICAgICAgICAgICAgdmFsdWVzID0gW107XG4gICAgICAgICAgICB0cmFja2luZm9EYXRhLm9iamVjdHMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbihrZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHJvdyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHRjID0gbmV3IHRhYmxlQ29udHJvbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUnKSwga2V5cywgdmFsdWVzKTtcbiAgICAgICAgICAgIHRjLm9uU2VsZWN0ZWQoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydFBvcyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhbZGF0YVsxMl0sIGRhdGFbMTFdXSk7XG4gICAgICAgICAgICAgICAgdmFyIGVuZFBvcyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhbZGF0YVs0XSwgZGF0YVszXV0pO1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbnMuc2V0T3JpZ2luKHN0YXJ0UG9zKTtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25zLnNldERlc3RpbmF0aW9uKGVuZFBvcyk7XG4gICAgICAgICAgICAgICAgbWFwLnBhblRvKHN0YXJ0UG9zKTtcbiAgICAgICAgICAgICAgICAvLyBXZWIgYnJvd3NlciBjb21wYXRpYmlsaXR5OiBcbiAgICAgICAgICAgICAgICAvLyBJRTcrLCBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcbiAgICAgICAgICAgICAgICB2YXIgdHJhY2tYaHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB0cmFja1hoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNrWGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgdHJhY2tYaHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFja0RhdGEgPSBKU09OLnBhcnNlKHRyYWNrWGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zLnNlbGVjdFRyYWNrKHRyYWNrRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJhY2tYaHIub3BlbihcIkdFVFwiLCBUUkFDS19BUElfVVJMICsgXCIvXCIgKyBkYXRhWzZdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0cmFja1hoci5zZW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cmFja2luZm9YaHIub3BlbihcIkdFVFwiLCBUUkFDS0lORk9fQVBJX1VSTCwgdHJ1ZSk7XG4gICAgdHJhY2tpbmZvWGhyLnNlbmQoKTtcblxuICAgIHJldHVybiBjb250cm9sO1xufTtcbiJdfQ==
;