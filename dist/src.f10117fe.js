// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/TreeComponent.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetHighlight = exports.wrapAll = exports.templateItemTree = exports.templateItemsTree = void 0;

function templateItemsTree(children, parent) {
  let items = children.map(templateItemTree);
  parent === null || parent === void 0 ? void 0 : parent.append(...items);
  return items;
}

exports.templateItemsTree = templateItemsTree;

function templateItemTree(item) {
  const itemDom = document.createElement('li');
  if (item.page) itemDom.setAttribute('data-page', item.page.toString());
  const itemTextDom = document.createElement('span');
  itemTextDom.classList.add('item-text');
  itemTextDom.innerText = item.text;
  itemTextDom.addEventListener('click', function (e) {
    if (item.onClick) item.onClick(item, itemDom, e);
  });
  itemDom.append(itemTextDom);

  if (item.children && item.children.length > 0) {
    const caretDom = document.createElement('span');
    caretDom.classList.add('caret');
    caretDom.addEventListener('click', function () {
      this.parentElement.querySelector('.nested').classList.toggle('active');
      this.classList.toggle('down');
    });
    itemDom.prepend(caretDom);
    const nestedDom = document.createElement('ul');
    nestedDom.classList.add('nested');

    for (const child of item.children) {
      nestedDom.append(templateItemTree(child));
    }

    itemDom.append(nestedDom);
  } else {
    itemTextDom.classList.add('no-caret');
  }

  return itemDom;
}

exports.templateItemTree = templateItemTree;

function wrapAll(rootElement) {
  rootElement.querySelectorAll('.nested.active').forEach(openElement => openElement.classList.toggle('active'));
}

exports.wrapAll = wrapAll;

function resetHighlight(rootElement) {
  rootElement.querySelectorAll('.highlight').forEach(highlightedElement => highlightedElement.classList.toggle('highlight'));
}

exports.resetHighlight = resetHighlight;
},{}],"output/outline.json":[function(require,module,exports) {
module.exports = [{
  "text": "Basic combinatorics",
  "type": "chapter",
  "page": 1,
  "children": [{
    "text": "How to count",
    "type": "section",
    "page": 1,
    "children": [{
      "text": "Sum rule",
      "type": "subsection",
      "page": 1,
      "children": []
    }, {
      "text": "Product rule",
      "type": "subsection",
      "page": 1,
      "children": [{
        "text": "Example 1.1.",
        "type": "example",
        "page": 2
      }, {
        "text": "...",
        "type": "other",
        "page": 3
      }, {
        "text": "Example 1.2.",
        "type": "example",
        "page": 4
      }]
    }, {
      "text": "Difference rule",
      "type": "subsection",
      "page": 5,
      "children": [{
        "text": "Example 1.3.",
        "type": "example",
        "page": 6
      }]
    }, {
      "text": "Quotient rule",
      "type": "subsection",
      "page": 7,
      "children": [{
        "text": "Example 1.4.",
        "type": "example",
        "page": 8
      }]
    }]
  }, {
    "text": "Counting maps and subsets",
    "type": "section",
    "page": 9,
    "children": [{
      "text": "Maps",
      "type": "subsection",
      "page": 9,
      "children": [{
        "text": "Example 2.1.",
        "type": "example",
        "page": 10
      }, {
        "text": "...",
        "type": "other",
        "page": 11
      }]
    }, {
      "text": "Counting all maps",
      "type": "subsection",
      "page": 12,
      "children": [{
        "text": "Theorem 2.2.",
        "type": "theorem",
        "page": 13
      }, {
        "text": "...",
        "type": "other",
        "page": 14
      }, {
        "text": "Theorem 2.3.",
        "type": "theorem",
        "page": 15
      }, {
        "text": "...",
        "type": "other",
        "page": 16
      }, {
        "text": "Remark 2.4.",
        "type": "remark",
        "page": 17
      }, {
        "text": "Theorem 2.5.",
        "type": "theorem",
        "page": 18
      }, {
        "text": "...",
        "type": "other",
        "page": 19
      }, {
        "text": "Theorem 2.6.",
        "type": "theorem",
        "page": 20
      }, {
        "text": "...",
        "type": "other",
        "page": 21
      }, {
        "text": "Remark 2.7.",
        "type": "remark",
        "page": 22
      }, {
        "text": "...",
        "type": "other",
        "page": 23
      }]
    }, {
      "text": "Counting injective maps and ordered choices",
      "type": "subsection",
      "page": 24,
      "children": [{
        "text": "Theorem 2.8.",
        "type": "theorem",
        "page": 25
      }, {
        "text": "...",
        "type": "other",
        "page": 26
      }, {
        "text": "Corollary 2.9.",
        "type": "corollary",
        "page": 27
      }, {
        "text": "...",
        "type": "other",
        "page": 28
      }, {
        "text": "Theorem 2.10.",
        "type": "theorem",
        "page": 29
      }, {
        "text": "...",
        "type": "other",
        "page": 30
      }]
    }, {
      "text": "Unordered choices",
      "type": "subsection",
      "page": 31,
      "children": [{
        "text": "Theorem 2.11.",
        "type": "theorem",
        "page": 32
      }, {
        "text": "...",
        "type": "other",
        "page": 33
      }]
    }, {
      "text": "Birthday problem",
      "type": "subsection",
      "page": 34,
      "children": []
    }]
  }, {
    "text": "Many faces of $binom{n}{k}$",
    "type": "section",
    "page": 34,
    "children": [{
      "text": "Subsets or unordered choices",
      "type": "subsection",
      "page": 34,
      "children": [{
        "text": "Theorem 3.1.",
        "type": "theorem",
        "page": 35
      }, {
        "text": "...",
        "type": "other",
        "page": 36
      }, {
        "text": "Theorem 3.2.",
        "type": "theorem",
        "page": 37
      }, {
        "text": "...",
        "type": "other",
        "page": 38
      }, {
        "text": "Theorem 3.3.",
        "type": "theorem",
        "page": 39
      }, {
        "text": "...",
        "type": "other",
        "page": 40
      }]
    }, {
      "text": "Monotone paths",
      "type": "subsection",
      "page": 41,
      "children": [{
        "text": "Theorem 3.4.",
        "type": "theorem",
        "page": 42
      }, {
        "text": "...",
        "type": "other",
        "page": 43
      }]
    }, {
      "text": "Pascal's triangle",
      "type": "subsection",
      "page": 44,
      "children": [{
        "text": "Theorem 3.5.",
        "type": "theorem",
        "page": 45
      }, {
        "text": "...",
        "type": "other",
        "page": 46
      }, {
        "text": "Lemma 3.6.",
        "type": "lemma",
        "page": 47
      }, {
        "text": "...",
        "type": "other",
        "page": 48
      }]
    }, {
      "text": "Binomial theorem",
      "type": "subsection",
      "page": 49,
      "children": [{
        "text": "Theorem 3.7.",
        "type": "theorem",
        "page": 50
      }, {
        "text": "...",
        "type": "other",
        "page": 51
      }, {
        "text": "Theorem 3.8.",
        "type": "theorem",
        "page": 52
      }, {
        "text": "...",
        "type": "other",
        "page": 53
      }]
    }, {
      "text": "Compositions",
      "type": "subsection",
      "page": 54,
      "children": [{
        "text": "Definition 3.9.",
        "type": "definition",
        "page": 55
      }, {
        "text": "Theorem 3.10.",
        "type": "theorem",
        "page": 56
      }, {
        "text": "...",
        "type": "other",
        "page": 57
      }, {
        "text": "Corollary 3.11.",
        "type": "corollary",
        "page": 58
      }, {
        "text": "...",
        "type": "other",
        "page": 59
      }, {
        "text": "Definition 3.12.",
        "type": "definition",
        "page": 60
      }, {
        "text": "Theorem 3.13.",
        "type": "theorem",
        "page": 61
      }, {
        "text": "...",
        "type": "other",
        "page": 62
      }]
    }, {
      "text": "Multisets",
      "type": "subsection",
      "page": 63,
      "children": [{
        "text": "Definition 3.14.",
        "type": "definition",
        "page": 64
      }, {
        "text": "...",
        "type": "other",
        "page": 65
      }, {
        "text": "Theorem 3.15.",
        "type": "theorem",
        "page": 66
      }, {
        "text": "...",
        "type": "other",
        "page": 67
      }]
    }]
  }, {
    "text": "Multinomial coefficients",
    "type": "section",
    "page": 68,
    "children": [{
      "text": "Words with repeating letters",
      "type": "subsection",
      "page": 68,
      "children": [{
        "text": "Theorem 4.1.",
        "type": "theorem",
        "page": 69
      }, {
        "text": "...",
        "type": "other",
        "page": 70
      }]
    }, {
      "text": "Multinomial theorem",
      "type": "subsection",
      "page": 71,
      "children": [{
        "text": "Theorem 4.2. (Multinomial theorem)",
        "type": "theorem",
        "page": 72
      }, {
        "text": "...",
        "type": "other",
        "page": 73
      }]
    }, {
      "text": "Monotone paths in higher dimensions",
      "type": "subsection",
      "page": 74,
      "children": [{
        "text": "Theorem 4.3.",
        "type": "theorem",
        "page": 75
      }, {
        "text": "...",
        "type": "other",
        "page": 76
      }]
    }]
  }, {
    "text": "Inclusion-exclusion formula",
    "type": "section",
    "page": 77,
    "children": [{
      "text": "The formula",
      "type": "subsection",
      "page": 77,
      "children": [{
        "text": "Theorem 5.1. (Inclusion-exclusion formula)",
        "type": "theorem",
        "page": 78
      }, {
        "text": "...",
        "type": "other",
        "page": 79
      }, {
        "text": "Remark 5.2.",
        "type": "remark",
        "page": 80
      }]
    }, {
      "text": "De Montmort problem, or counting the derangements",
      "type": "subsection",
      "page": 81,
      "children": [{
        "text": "Theorem 5.3.",
        "type": "theorem",
        "page": 82
      }, {
        "text": "...",
        "type": "other",
        "page": 83
      }]
    }, {
      "text": "Euler's totient function",
      "type": "subsection",
      "page": 84,
      "children": [{
        "text": "Theorem 5.4.",
        "type": "theorem",
        "page": 85
      }, {
        "text": "...",
        "type": "other",
        "page": 86
      }]
    }]
  }]
}, {
  "text": "Graph theory",
  "type": "chapter",
  "page": 87,
  "children": [{
    "text": "Basic notions",
    "type": "section",
    "page": 87,
    "children": [{
      "text": "Types of graphs",
      "type": "subsection",
      "page": 87,
      "children": [{
        "text": "Definition 1.1.",
        "type": "definition",
        "page": 88
      }, {
        "text": "...",
        "type": "other",
        "page": 89
      }]
    }, {
      "text": "Some graphs known by names",
      "type": "subsection",
      "page": 90,
      "children": [{
        "text": "Definition 1.2.",
        "type": "definition",
        "page": 91
      }, {
        "text": "...",
        "type": "other",
        "page": 92
      }]
    }, {
      "text": "Isomorphic graphs and subgraphs",
      "type": "subsection",
      "page": 93,
      "children": [{
        "text": "Definition 1.3.",
        "type": "definition",
        "page": 94
      }, {
        "text": "Example 1.4.",
        "type": "example",
        "page": 95
      }, {
        "text": "...",
        "type": "other",
        "page": 96
      }, {
        "text": "Remark 1.5.",
        "type": "remark",
        "page": 97
      }, {
        "text": "...",
        "type": "other",
        "page": 98
      }, {
        "text": "Definition 1.6.",
        "type": "definition",
        "page": 99
      }, {
        "text": "...",
        "type": "other",
        "page": 100
      }]
    }, {
      "text": "Incidence and adjacency",
      "type": "subsection",
      "page": 101,
      "children": [{
        "text": "Definition 1.7.",
        "type": "definition",
        "page": 102
      }, {
        "text": "Theorem 1.8. (Handshake lemma)",
        "type": "theorem",
        "page": 103
      }, {
        "text": "...",
        "type": "other",
        "page": 104
      }, {
        "text": "Corollary 1.9.",
        "type": "corollary",
        "page": 105
      }, {
        "text": "...",
        "type": "other",
        "page": 106
      }, {
        "text": "Definition 1.10.",
        "type": "definition",
        "page": 107
      }, {
        "text": "...",
        "type": "other",
        "page": 108
      }, {
        "text": "Theorem 1.11.",
        "type": "theorem",
        "page": 109
      }, {
        "text": "...",
        "type": "other",
        "page": 110
      }]
    }, {
      "text": "Connectivity and components",
      "type": "subsection",
      "page": 111,
      "children": [{
        "text": "Definition 1.12.",
        "type": "definition",
        "page": 112
      }, {
        "text": "Remark 1.13.",
        "type": "remark",
        "page": 113
      }, {
        "text": "Definition 1.14.",
        "type": "definition",
        "page": 114
      }, {
        "text": "...",
        "type": "other",
        "page": 115
      }, {
        "text": "Definition 1.15.",
        "type": "definition",
        "page": 116
      }, {
        "text": "...",
        "type": "other",
        "page": 117
      }, {
        "text": "Definition 1.16.",
        "type": "definition",
        "page": 118
      }]
    }, {
      "text": "Eulerian graphs",
      "type": "subsection",
      "page": 119,
      "children": [{
        "text": "Definition 1.17.",
        "type": "definition",
        "page": 120
      }, {
        "text": "...",
        "type": "other",
        "page": 121
      }, {
        "text": "Theorem 1.18.",
        "type": "theorem",
        "page": 122
      }, {
        "text": "...",
        "type": "other",
        "page": 123
      }]
    }]
  }, {
    "text": "Trees",
    "type": "section",
    "page": 124,
    "children": [{
      "text": "Basics",
      "type": "subsection",
      "page": 124,
      "children": [{
        "text": "Definition 2.1.",
        "type": "definition",
        "page": 125
      }, {
        "text": "...",
        "type": "other",
        "page": 126
      }, {
        "text": "Theorem 2.2.",
        "type": "theorem",
        "page": 127
      }, {
        "text": "...",
        "type": "other",
        "page": 128
      }]
    }, {
      "text": "Leaves",
      "type": "subsection",
      "page": 129,
      "children": [{
        "text": "Definition 2.3.",
        "type": "definition",
        "page": 130
      }, {
        "text": "...",
        "type": "other",
        "page": 131
      }, {
        "text": "Lemma 2.4.",
        "type": "lemma",
        "page": 132
      }, {
        "text": "...",
        "type": "other",
        "page": 133
      }, {
        "text": "Definition 2.5.",
        "type": "definition",
        "page": 134
      }, {
        "text": "Lemma 2.6.",
        "type": "lemma",
        "page": 135
      }, {
        "text": "...",
        "type": "other",
        "page": 136
      }]
    }, {
      "text": "The number of edges in a tree",
      "type": "subsection",
      "page": 137,
      "children": [{
        "text": "Theorem 2.7.",
        "type": "theorem",
        "page": 138
      }, {
        "text": "...",
        "type": "other",
        "page": 139
      }, {
        "text": "Corollary 2.8.",
        "type": "corollary",
        "page": 140
      }, {
        "text": "...",
        "type": "other",
        "page": 141
      }]
    }, {
      "text": "Spanning trees",
      "type": "subsection",
      "page": 142,
      "children": [{
        "text": "Definition 2.9.",
        "type": "definition",
        "page": 143
      }, {
        "text": "...",
        "type": "other",
        "page": 144
      }, {
        "text": "Theorem 2.10.",
        "type": "theorem",
        "page": 145
      }, {
        "text": "...",
        "type": "other",
        "page": 146
      }, {
        "text": "Theorem 2.11.",
        "type": "theorem",
        "page": 147
      }, {
        "text": "...",
        "type": "other",
        "page": 148
      }]
    }, {
      "text": "The number of spanning trees",
      "type": "subsection",
      "page": 149,
      "children": [{
        "text": "Theorem 2.12. (Borchardt, Cayley)",
        "type": "theorem",
        "page": 150
      }, {
        "text": "...",
        "type": "other",
        "page": 151
      }, {
        "text": "Definition 2.13.",
        "type": "definition",
        "page": 152
      }, {
        "text": "...",
        "type": "other",
        "page": 153
      }, {
        "text": "Theorem 2.14. (Kirchhoff)",
        "type": "theorem",
        "page": 154
      }, {
        "text": "...",
        "type": "other",
        "page": 155
      }]
    }, {
      "text": "Minimum spanning tree: Kruskal's algorithm",
      "type": "subsection",
      "page": 156,
      "children": [{
        "text": "Definition 2.15.",
        "type": "definition",
        "page": 157
      }, {
        "text": "Definition 2.16.",
        "type": "definition",
        "page": 158
      }, {
        "text": "Chap. 2. > 2.2. Trees > 2.2.6. Minimum spanning tree",
        "type": "other",
        "page": 159
      }, {
        "text": "Theorem 2.17. (Kruskal's algorithm)",
        "type": "theorem",
        "page": 160
      }, {
        "text": "Chap. 2. > 2.2. Trees > 2.2.6. Minimum spanning tree",
        "type": "other",
        "page": 161
      }, {
        "text": "Remark 2.18.",
        "type": "remark",
        "page": 162
      }, {
        "text": "Remark 2.19.",
        "type": "remark",
        "page": 163
      }]
    }]
  }, {
    "text": "Planar graphs",
    "type": "section",
    "page": 164,
    "children": [{
      "text": "Basics",
      "type": "subsection",
      "page": 164,
      "children": [{
        "text": "Definition 3.1.",
        "type": "definition",
        "page": 165
      }, {
        "text": "...",
        "type": "other",
        "page": 166
      }, {
        "text": "Remark 3.2.",
        "type": "remark",
        "page": 167
      }, {
        "text": "Theorem 3.3.",
        "type": "theorem",
        "page": 168
      }, {
        "text": "...",
        "type": "other",
        "page": 169
      }, {
        "text": "Theorem 3.4. (F'ary)",
        "type": "theorem",
        "page": 170
      }, {
        "text": "...",
        "type": "other",
        "page": 171
      }]
    }, {
      "text": "Euler's formula",
      "type": "subsection",
      "page": 172,
      "children": [{
        "text": "Definition 3.5.",
        "type": "definition",
        "page": 173
      }, {
        "text": "...",
        "type": "other",
        "page": 174
      }, {
        "text": "Theorem 3.6.",
        "type": "theorem",
        "page": 175
      }, {
        "text": "...",
        "type": "other",
        "page": 176
      }, {
        "text": "Theorem 3.7. (Euler)",
        "type": "theorem",
        "page": 177
      }, {
        "text": "Example 3.8.",
        "type": "example",
        "page": 178
      }, {
        "text": "...",
        "type": "other",
        "page": 179
      }, {
        "text": "Theorem 3.9.",
        "type": "theorem",
        "page": 180
      }, {
        "text": "...",
        "type": "other",
        "page": 181
      }]
    }, {
      "text": "Planarity criteria",
      "type": "subsection",
      "page": 182,
      "children": [{
        "text": "Theorem 3.10. (Kuratowski)",
        "type": "theorem",
        "page": 183
      }, {
        "text": "...",
        "type": "other",
        "page": 184
      }, {
        "text": "Theorem 3.11. (Wagner)",
        "type": "theorem",
        "page": 185
      }, {
        "text": "...",
        "type": "other",
        "page": 186
      }]
    }, {
      "text": "Duality for embedded graphs",
      "type": "subsection",
      "page": 187,
      "children": [{
        "text": "Definition 3.12.",
        "type": "definition",
        "page": 188
      }, {
        "text": "...",
        "type": "other",
        "page": 189
      }, {
        "text": "Lemma 3.13.",
        "type": "lemma",
        "page": 190
      }, {
        "text": "...",
        "type": "other",
        "page": 191
      }]
    }]
  }, {
    "text": "Matchings",
    "type": "section",
    "page": 192,
    "children": [{
      "text": "Basics",
      "type": "subsection",
      "page": 192,
      "children": [{
        "text": "Definition 4.1.",
        "type": "definition",
        "page": 193
      }, {
        "text": "...",
        "type": "other",
        "page": 194
      }, {
        "text": "Definition 4.2.",
        "type": "definition",
        "page": 195
      }, {
        "text": "...",
        "type": "other",
        "page": 196
      }]
    }, {
      "text": "Augmenting paths and maximum matchings",
      "type": "subsection",
      "page": 197,
      "children": [{
        "text": "Definition 4.3.",
        "type": "definition",
        "page": 198
      }, {
        "text": "...",
        "type": "other",
        "page": 199
      }, {
        "text": "Definition 4.4.",
        "type": "definition",
        "page": 200
      }, {
        "text": "...",
        "type": "other",
        "page": 201
      }, {
        "text": "Theorem 4.5. (Berge)",
        "type": "theorem",
        "page": 202
      }, {
        "text": "...",
        "type": "other",
        "page": 203
      }]
    }, {
      "text": "Matchings in bipartite graphs: Hall's theorem",
      "type": "subsection",
      "page": 204,
      "children": [{
        "text": "Definition 4.6.",
        "type": "definition",
        "page": 205
      }, {
        "text": "Chap. 2. > 2.4. Matchings > 2.4.3. Matchings in bipartite graphs",
        "type": "other",
        "page": 206
      }, {
        "text": "Theorem 4.7. (Hall)",
        "type": "theorem",
        "page": 207
      }, {
        "text": "Chap. 2. > 2.4. Matchings > 2.4.3. Matchings in bipartite graphs",
        "type": "other",
        "page": 208
      }, {
        "text": "Corollary 4.8.",
        "type": "corollary",
        "page": 209
      }, {
        "text": "Chap. 2. > 2.4. Matchings > 2.4.3. Matchings in bipartite graphs",
        "type": "other",
        "page": 210
      }]
    }]
  }]
}, {
  "text": "Propositional logic",
  "type": "chapter",
  "page": 211,
  "children": [{
    "text": "Syntax and semantics of propositional logic",
    "type": "section",
    "page": 211,
    "children": [{
      "text": "Propositional formulas",
      "type": "subsection",
      "page": 211,
      "children": [{
        "text": "Definition 1.1.",
        "type": "definition",
        "page": 212
      }, {
        "text": "...",
        "type": "other",
        "page": 213
      }]
    }, {
      "text": "Truth tables",
      "type": "subsection",
      "page": 214,
      "children": [{
        "text": "Definition 1.2.",
        "type": "definition",
        "page": 215
      }, {
        "text": "...",
        "type": "other",
        "page": 216
      }, {
        "text": "Example 1.3.",
        "type": "example",
        "page": 217
      }, {
        "text": "...",
        "type": "other",
        "page": 218
      }]
    }, {
      "text": "Satisfiability, tautologies, logical equivalence",
      "type": "subsection",
      "page": 219,
      "children": [{
        "text": "Definition 1.4.",
        "type": "definition",
        "page": 220
      }, {
        "text": "Definition 1.5.",
        "type": "definition",
        "page": 221
      }, {
        "text": "...",
        "type": "other",
        "page": 222
      }, {
        "text": "Theorem 1.6.",
        "type": "theorem",
        "page": 223
      }, {
        "text": "...",
        "type": "other",
        "page": 224
      }, {
        "text": "Definition 1.7.",
        "type": "definition",
        "page": 225
      }, {
        "text": "Example 1.8.",
        "type": "example",
        "page": 226
      }, {
        "text": "Remark 1.9.",
        "type": "remark",
        "page": 227
      }, {
        "text": "Theorem 1.10.",
        "type": "theorem",
        "page": 228
      }, {
        "text": "...",
        "type": "other",
        "page": 229
      }]
    }, {
      "text": "Boolean functions",
      "type": "subsection",
      "page": 230,
      "children": [{
        "text": "Definition 1.11.",
        "type": "definition",
        "page": 231
      }, {
        "text": "...",
        "type": "other",
        "page": 232
      }, {
        "text": "Theorem 1.12.",
        "type": "theorem",
        "page": 233
      }, {
        "text": "...",
        "type": "other",
        "page": 234
      }, {
        "text": "Definition 1.13.",
        "type": "definition",
        "page": 235
      }, {
        "text": "...",
        "type": "other",
        "page": 236
      }, {
        "text": "Lemma 1.14.",
        "type": "lemma",
        "page": 237
      }, {
        "text": "...",
        "type": "other",
        "page": 238
      }, {
        "text": "Lemma 1.15.",
        "type": "lemma",
        "page": 239
      }, {
        "text": "...",
        "type": "other",
        "page": 240
      }]
    }, {
      "text": "Disjunctive and conjunctive normal forms",
      "type": "subsection",
      "page": 241,
      "children": [{
        "text": "Definition 1.16.",
        "type": "definition",
        "page": 242
      }, {
        "text": "Corollary 1.17.",
        "type": "corollary",
        "page": 243
      }, {
        "text": "...",
        "type": "other",
        "page": 244
      }, {
        "text": "Definition 1.18.",
        "type": "definition",
        "page": 245
      }, {
        "text": "Theorem 1.19.",
        "type": "theorem",
        "page": 246
      }, {
        "text": "...",
        "type": "other",
        "page": 247
      }, {
        "text": "Remark 1.20.",
        "type": "remark",
        "page": 248
      }, {
        "text": "...",
        "type": "other",
        "page": 249
      }]
    }]
  }, {
    "text": "Proof theories",
    "type": "section",
    "page": 250,
    "children": [{
      "text": "Deductive systems",
      "type": "subsection",
      "page": 250,
      "children": [{
        "text": "Definition 2.1.",
        "type": "definition",
        "page": 251
      }, {
        "text": "...",
        "type": "other",
        "page": 252
      }, {
        "text": "Definition 2.2.",
        "type": "definition",
        "page": 253
      }, {
        "text": "...",
        "type": "other",
        "page": 254
      }, {
        "text": "Definition 2.3.",
        "type": "definition",
        "page": 255
      }, {
        "text": "...",
        "type": "other",
        "page": 256
      }]
    }, {
      "text": "A Hilbert system",
      "type": "subsection",
      "page": 257,
      "children": [{
        "text": "Example 2.4.",
        "type": "example",
        "page": 258
      }, {
        "text": "Theorem 2.5.",
        "type": "theorem",
        "page": 259
      }, {
        "text": "...",
        "type": "other",
        "page": 260
      }]
    }, {
      "text": "Gentzen's sequent calculus: the idea",
      "type": "subsection",
      "page": 261,
      "children": []
    }, {
      "text": "Sequents and inference rules",
      "type": "subsection",
      "page": 261,
      "children": [{
        "text": "Definition 2.6.",
        "type": "definition",
        "page": 262
      }, {
        "text": "...",
        "type": "other",
        "page": 263
      }, {
        "text": "Definition 2.7.",
        "type": "definition",
        "page": 264
      }, {
        "text": "Definition 2.8.",
        "type": "definition",
        "page": 265
      }, {
        "text": "Lemma 2.9.",
        "type": "lemma",
        "page": 266
      }, {
        "text": "...",
        "type": "other",
        "page": 267
      }]
    }, {
      "text": "Axioms and proofs",
      "type": "subsection",
      "page": 268,
      "children": [{
        "text": "Definition 2.10.",
        "type": "definition",
        "page": 269
      }, {
        "text": "Example 2.11.",
        "type": "example",
        "page": 270
      }, {
        "text": "Lemma 2.12.",
        "type": "lemma",
        "page": 271
      }, {
        "text": "...",
        "type": "other",
        "page": 272
      }, {
        "text": "Definition 2.13.",
        "type": "definition",
        "page": 273
      }, {
        "text": "...",
        "type": "other",
        "page": 274
      }, {
        "text": "Definition 2.14.",
        "type": "definition",
        "page": 275
      }]
    }, {
      "text": "Soundness of the sequent calculus",
      "type": "subsection",
      "page": 276,
      "children": [{
        "text": "Theorem 2.15.",
        "type": "theorem",
        "page": 277
      }, {
        "text": "Lemma 2.16.",
        "type": "lemma",
        "page": 278
      }, {
        "text": "...",
        "type": "other",
        "page": 279
      }]
    }, {
      "text": "Closed deduction trees and completeness of the sequent calculus",
      "type": "subsection",
      "page": 280,
      "children": [{
        "text": "Definition 2.17.",
        "type": "definition",
        "page": 281
      }, {
        "text": "Lemma 2.18.",
        "type": "lemma",
        "page": 282
      }, {
        "text": "...",
        "type": "other",
        "page": 283
      }, {
        "text": "Theorem 2.19.",
        "type": "theorem",
        "page": 284
      }, {
        "text": "...",
        "type": "other",
        "page": 285
      }]
    }, {
      "text": "A byproduct: CNF and DNF",
      "type": "subsection",
      "page": 286,
      "children": [{
        "text": "Theorem 2.20.",
        "type": "theorem",
        "page": 287
      }, {
        "text": "Chap. 3. > 3.2. Proof theories > 3.2.8. A byproduct",
        "type": "other",
        "page": 288
      }]
    }]
  }]
}, {
  "text": "Predicate logic",
  "type": "chapter",
  "page": 289,
  "children": [{
    "text": "Syntax and semantics of predicate logic",
    "type": "section",
    "page": 289,
    "children": [{
      "text": "First-order languages",
      "type": "subsection",
      "page": 289,
      "children": [{
        "text": "Definition 1.1.",
        "type": "definition",
        "page": 290
      }, {
        "text": "...",
        "type": "other",
        "page": 291
      }, {
        "text": "Definition 1.2.",
        "type": "definition",
        "page": 292
      }, {
        "text": "...",
        "type": "other",
        "page": 293
      }, {
        "text": "Definition 1.3.",
        "type": "definition",
        "page": 294
      }, {
        "text": "...",
        "type": "other",
        "page": 295
      }, {
        "text": "Definition 1.4.",
        "type": "definition",
        "page": 296
      }]
    }, {
      "text": "Free and bound variables",
      "type": "subsection",
      "page": 297,
      "children": [{
        "text": "Definition 1.5.",
        "type": "definition",
        "page": 298
      }, {
        "text": "...",
        "type": "other",
        "page": 299
      }, {
        "text": "Example 1.6.",
        "type": "example",
        "page": 300
      }, {
        "text": "Remark 1.7.",
        "type": "remark",
        "page": 301
      }]
    }, {
      "text": "Closed formulas and universal closure",
      "type": "subsection",
      "page": 302,
      "children": [{
        "text": "Definition 1.8.",
        "type": "definition",
        "page": 303
      }, {
        "text": "Definition 1.9.",
        "type": "definition",
        "page": 304
      }, {
        "text": "Example 1.10.",
        "type": "example",
        "page": 305
      }]
    }, {
      "text": "First-order structures",
      "type": "subsection",
      "page": 306,
      "children": [{
        "text": "Definition 1.11.",
        "type": "definition",
        "page": 307
      }, {
        "text": "...",
        "type": "other",
        "page": 308
      }, {
        "text": "Example 1.12.",
        "type": "example",
        "page": 309
      }, {
        "text": "...",
        "type": "other",
        "page": 310
      }, {
        "text": "Definition 1.13.",
        "type": "definition",
        "page": 311
      }, {
        "text": "Definition 1.14.",
        "type": "definition",
        "page": 312
      }]
    }, {
      "text": "Propositional logic inside predicate logic",
      "type": "subsection",
      "page": 313,
      "children": [{
        "text": "Theorem 1.15.",
        "type": "theorem",
        "page": 314
      }]
    }]
  }, {
    "text": "Proof theory",
    "type": "section",
    "page": 315,
    "children": [{
      "text": "Substitutions",
      "type": "subsection",
      "page": 315,
      "children": [{
        "text": "Definition 2.1.",
        "type": "definition",
        "page": 316
      }, {
        "text": "...",
        "type": "other",
        "page": 317
      }, {
        "text": "Lemma 2.2.",
        "type": "lemma",
        "page": 318
      }, {
        "text": "...",
        "type": "other",
        "page": 319
      }, {
        "text": "Lemma 2.3.",
        "type": "lemma",
        "page": 320
      }, {
        "text": "...",
        "type": "other",
        "page": 321
      }]
    }, {
      "text": "Inference rules",
      "type": "subsection",
      "page": 322,
      "children": [{
        "text": "Definition 2.4.",
        "type": "definition",
        "page": 323
      }, {
        "text": "...",
        "type": "other",
        "page": 324
      }, {
        "text": "Lemma 2.5.",
        "type": "lemma",
        "page": 325
      }, {
        "text": "...",
        "type": "other",
        "page": 326
      }, {
        "text": "Theorem 2.6.",
        "type": "theorem",
        "page": 327
      }, {
        "text": "...",
        "type": "other",
        "page": 328
      }, {
        "text": "Example 2.7.",
        "type": "example",
        "page": 329
      }, {
        "text": "Example 2.8.",
        "type": "example",
        "page": 330
      }, {
        "text": "...",
        "type": "other",
        "page": 331
      }]
    }, {
      "text": "Completeness of the sequent calculus",
      "type": "subsection",
      "page": 332,
      "children": [{
        "text": "Theorem 2.9.",
        "type": "theorem",
        "page": 333
      }, {
        "text": "...",
        "type": "other",
        "page": 334
      }, {
        "text": "Example 2.10.",
        "type": "example",
        "page": 335
      }, {
        "text": "Example 2.11.",
        "type": "example",
        "page": 336
      }, {
        "text": "Remark 2.12.",
        "type": "remark",
        "page": 337
      }, {
        "text": "...",
        "type": "other",
        "page": 338
      }]
    }]
  }, {
    "text": "Gödel's incompleteness theorems",
    "type": "section",
    "page": 339,
    "children": [{
      "text": "Theories and models",
      "type": "subsection",
      "page": 339,
      "children": [{
        "text": "Definition 3.1.",
        "type": "definition",
        "page": 340
      }, {
        "text": "Example 3.2.",
        "type": "example",
        "page": 341
      }, {
        "text": "Definition 3.3.",
        "type": "definition",
        "page": 342
      }, {
        "text": "Example 3.4.",
        "type": "example",
        "page": 343
      }, {
        "text": "Example 3.5.",
        "type": "example",
        "page": 344
      }, {
        "text": "...",
        "type": "other",
        "page": 345
      }, {
        "text": "Definition 3.6.",
        "type": "definition",
        "page": 346
      }, {
        "text": "Definition 3.7.",
        "type": "definition",
        "page": 347
      }, {
        "text": "Example 3.8.",
        "type": "example",
        "page": 348
      }, {
        "text": "Remark 3.9.",
        "type": "remark",
        "page": 349
      }, {
        "text": "Definition 3.10.",
        "type": "definition",
        "page": 350
      }, {
        "text": "Example 3.11.",
        "type": "example",
        "page": 351
      }, {
        "text": "Lemma 3.12.",
        "type": "lemma",
        "page": 352
      }, {
        "text": "...",
        "type": "other",
        "page": 353
      }]
    }, {
      "text": "Models and proofs: Gödel's completeness theorem",
      "type": "subsection",
      "page": 354,
      "children": [{
        "text": "Definition 3.13.",
        "type": "definition",
        "page": 355
      }, {
        "text": "Chap. 4. > 4.3. Gödel's incompleteness theorems > 4.3.2. Models and proofs",
        "type": "other",
        "page": 356
      }, {
        "text": "Example 3.14.",
        "type": "example",
        "page": 357
      }, {
        "text": "Lemma 3.15.",
        "type": "lemma",
        "page": 358
      }, {
        "text": "Chap. 4. > 4.3. Gödel's incompleteness theorems > 4.3.2. Models and proofs",
        "type": "other",
        "page": 359
      }, {
        "text": "Theorem 3.16. (Gödel's completeness theorem)",
        "type": "theorem",
        "page": 360
      }, {
        "text": "Chap. 4. > 4.3. Gödel's incompleteness theorems > 4.3.2. Models and proofs",
        "type": "other",
        "page": 361
      }, {
        "text": "Definition 3.17.",
        "type": "definition",
        "page": 362
      }, {
        "text": "Lemma 3.18.",
        "type": "lemma",
        "page": 363
      }, {
        "text": "Chap. 4. > 4.3. Gödel's incompleteness theorems > 4.3.2. Models and proofs",
        "type": "other",
        "page": 364
      }, {
        "text": "Theorem 3.19. (Gödel's completeness theorem, second version)",
        "type": "theorem",
        "page": 365
      }, {
        "text": "Corollary 3.20.",
        "type": "corollary",
        "page": 366
      }]
    }, {
      "text": "Peano arithmetic",
      "type": "subsection",
      "page": 367,
      "children": []
    }, {
      "text": "Recursive functions and recursive sets",
      "type": "subsection",
      "page": 367,
      "children": [{
        "text": "Definition 3.21.",
        "type": "definition",
        "page": 368
      }, {
        "text": "...",
        "type": "other",
        "page": 369
      }, {
        "text": "Definition 3.22.",
        "type": "definition",
        "page": 370
      }, {
        "text": "...",
        "type": "other",
        "page": 371
      }, {
        "text": "Definition 3.23.",
        "type": "definition",
        "page": 372
      }, {
        "text": "...",
        "type": "other",
        "page": 373
      }, {
        "text": "Example 3.24.",
        "type": "example",
        "page": 374
      }, {
        "text": "Lemma 3.25.",
        "type": "lemma",
        "page": 375
      }, {
        "text": "...",
        "type": "other",
        "page": 376
      }, {
        "text": "Definition 3.26.",
        "type": "definition",
        "page": 377
      }, {
        "text": "Theorem 3.27.",
        "type": "theorem",
        "page": 378
      }]
    }, {
      "text": "Gödel's incompleteness theorems",
      "type": "subsection",
      "page": 379,
      "children": [{
        "text": "Definition 3.28.",
        "type": "definition",
        "page": 380
      }, {
        "text": "...",
        "type": "other",
        "page": 381
      }, {
        "text": "Lemma 3.29.",
        "type": "lemma",
        "page": 382
      }, {
        "text": "...",
        "type": "other",
        "page": 383
      }, {
        "text": "Theorem 3.30.",
        "type": "theorem",
        "page": 384
      }, {
        "text": "...",
        "type": "other",
        "page": 385
      }, {
        "text": "Theorem 3.31.",
        "type": "theorem",
        "page": 386
      }, {
        "text": "...",
        "type": "other",
        "page": 387
      }, {
        "text": "Theorem 3.32. (First Gödel's incompleteness theorem)",
        "type": "theorem",
        "page": 388
      }, {
        "text": "...",
        "type": "other",
        "page": 389
      }, {
        "text": "Corollary 3.33.",
        "type": "corollary",
        "page": 390
      }, {
        "text": "...",
        "type": "other",
        "page": 391
      }]
    }]
  }, {
    "text": "Own summary",
    "type": "section",
    "page": 392,
    "children": [{
      "text": "Equivalences between propositional formulas",
      "type": "subsection",
      "page": 392,
      "children": []
    }, {
      "text": "All inference rules",
      "type": "subsection",
      "page": 392,
      "children": []
    }]
  }]
}, {
  "text": "Combinatorics II",
  "type": "chapter",
  "page": 393,
  "children": [{
    "text": "Linear recursive sequences",
    "type": "section",
    "page": 393,
    "children": [{
      "text": "Fibonacci sequence and Binet formula",
      "type": "subsection",
      "page": 393,
      "children": [{
        "text": "Theorem 1.1. (Binet)",
        "type": "theorem",
        "page": 394
      }, {
        "text": "...",
        "type": "other",
        "page": 395
      }]
    }, {
      "text": "Linear recursive sequences of order 2",
      "type": "subsection",
      "page": 396,
      "children": [{
        "text": "Definition 1.2.",
        "type": "definition",
        "page": 397
      }, {
        "text": "...",
        "type": "other",
        "page": 398
      }, {
        "text": "Definition 1.3.",
        "type": "definition",
        "page": 399
      }, {
        "text": "Theorem 1.4.",
        "type": "theorem",
        "page": 400
      }, {
        "text": "...",
        "type": "other",
        "page": 401
      }]
    }, {
      "text": "Linear recursive sequences of higher order",
      "type": "subsection",
      "page": 402,
      "children": [{
        "text": "Definition 1.5.",
        "type": "definition",
        "page": 403
      }, {
        "text": "...",
        "type": "other",
        "page": 404
      }, {
        "text": "Definition 1.6.",
        "type": "definition",
        "page": 405
      }, {
        "text": "Theorem 1.7.",
        "type": "theorem",
        "page": 406
      }, {
        "text": "...",
        "type": "other",
        "page": 407
      }]
    }, {
      "text": "The case of complex roots",
      "type": "subsection",
      "page": 408,
      "children": []
    }, {
      "text": "An application of the Binet formula",
      "type": "subsection",
      "page": 408,
      "children": [{
        "text": "Theorem 1.8.",
        "type": "theorem",
        "page": 409
      }, {
        "text": "...",
        "type": "other",
        "page": 410
      }]
    }]
  }, {
    "text": "Generating functions",
    "type": "section",
    "page": 411,
    "children": [{
      "text": "Fibonacci again",
      "type": "subsection",
      "page": 411,
      "children": []
    }, {
      "text": "Operations with formal power series",
      "type": "subsection",
      "page": 411,
      "children": [{
        "text": "Definition 2.1.",
        "type": "definition",
        "page": 412
      }, {
        "text": "...",
        "type": "other",
        "page": 413
      }, {
        "text": "Definition 2.2.",
        "type": "definition",
        "page": 414
      }, {
        "text": "Lemma 2.3.",
        "type": "lemma",
        "page": 415
      }, {
        "text": "...",
        "type": "other",
        "page": 416
      }, {
        "text": "Example 2.4.",
        "type": "example",
        "page": 417
      }, {
        "text": "Definition 2.5.",
        "type": "definition",
        "page": 418
      }, {
        "text": "...",
        "type": "other",
        "page": 419
      }, {
        "text": "Lemma 2.6.",
        "type": "lemma",
        "page": 420
      }, {
        "text": "...",
        "type": "other",
        "page": 421
      }, {
        "text": "Example 2.7.",
        "type": "example",
        "page": 422
      }, {
        "text": "...",
        "type": "other",
        "page": 423
      }]
    }, {
      "text": "Linear recursive sequences and partial fraction decomposition",
      "type": "subsection",
      "page": 424,
      "children": [{
        "text": "Definition 2.8.",
        "type": "definition",
        "page": 425
      }, {
        "text": "Theorem 2.9.",
        "type": "theorem",
        "page": 426
      }, {
        "text": "...",
        "type": "other",
        "page": 427
      }, {
        "text": "Theorem 2.10. (Partial fraction decomposition)",
        "type": "theorem",
        "page": 428
      }, {
        "text": "Remark 2.11.",
        "type": "remark",
        "page": 429
      }, {
        "text": "...",
        "type": "other",
        "page": 430
      }]
    }, {
      "text": "Generalized binomial theorem",
      "type": "subsection",
      "page": 431,
      "children": [{
        "text": "Theorem 2.12.",
        "type": "theorem",
        "page": 432
      }, {
        "text": "...",
        "type": "other",
        "page": 433
      }, {
        "text": "Remark 2.13.",
        "type": "remark",
        "page": 434
      }, {
        "text": "...",
        "type": "other",
        "page": 435
      }, {
        "text": "Definition 2.14.",
        "type": "definition",
        "page": 436
      }, {
        "text": "...",
        "type": "other",
        "page": 437
      }, {
        "text": "Theorem 2.15. (Vandermonde's identity)",
        "type": "theorem",
        "page": 438
      }, {
        "text": "...",
        "type": "other",
        "page": 439
      }, {
        "text": "Corollary 2.16.",
        "type": "corollary",
        "page": 440
      }, {
        "text": "...",
        "type": "other",
        "page": 441
      }]
    }]
  }, {
    "text": "Partition of integers",
    "type": "section",
    "page": 442,
    "children": [{
      "text": "Money changing problem",
      "type": "subsection",
      "page": 442,
      "children": [{
        "text": "Theorem 3.1.",
        "type": "theorem",
        "page": 443
      }, {
        "text": "...",
        "type": "other",
        "page": 444
      }]
    }, {
      "text": "Compositions again",
      "type": "subsection",
      "page": 445,
      "children": [{
        "text": "Theorem 3.2.",
        "type": "theorem",
        "page": 446
      }, {
        "text": "...",
        "type": "other",
        "page": 447
      }]
    }, {
      "text": "Fibonacci once again",
      "type": "subsection",
      "page": 448,
      "children": []
    }, {
      "text": "Partitions and their generating function",
      "type": "subsection",
      "page": 448,
      "children": [{
        "text": "Definition 3.3.",
        "type": "definition",
        "page": 449
      }, {
        "text": "...",
        "type": "other",
        "page": 450
      }, {
        "text": "Example 3.4.",
        "type": "example",
        "page": 451
      }, {
        "text": "...",
        "type": "other",
        "page": 452
      }, {
        "text": "Theorem 3.5.",
        "type": "theorem",
        "page": 453
      }, {
        "text": "...",
        "type": "other",
        "page": 454
      }, {
        "text": "Definition 3.6.",
        "type": "definition",
        "page": 455
      }, {
        "text": "Definition 3.7.",
        "type": "definition",
        "page": 456
      }, {
        "text": "Definition 3.8.",
        "type": "definition",
        "page": 457
      }, {
        "text": "Lemma 3.9.",
        "type": "lemma",
        "page": 458
      }]
    }, {
      "text": "Algebraic and bijective proofs",
      "type": "subsection",
      "page": 459,
      "children": [{
        "text": "Theorem 3.10.",
        "type": "theorem",
        "page": 460
      }, {
        "text": "...",
        "type": "other",
        "page": 461
      }, {
        "text": "Example 3.11.",
        "type": "example",
        "page": 462
      }]
    }, {
      "text": "Ferrers diagrams",
      "type": "subsection",
      "page": 463,
      "children": [{
        "text": "Definition 3.12.",
        "type": "definition",
        "page": 464
      }, {
        "text": "Example 3.13.",
        "type": "example",
        "page": 465
      }, {
        "text": "...",
        "type": "other",
        "page": 466
      }, {
        "text": "Theorem 3.14.",
        "type": "theorem",
        "page": 467
      }, {
        "text": "...",
        "type": "other",
        "page": 468
      }, {
        "text": "Theorem 3.15.",
        "type": "theorem",
        "page": 469
      }, {
        "text": "...",
        "type": "other",
        "page": 470
      }]
    }, {
      "text": "Recursive formulas for the number of partitions",
      "type": "subsection",
      "page": 471,
      "children": [{
        "text": "Theorem 3.16.",
        "type": "theorem",
        "page": 472
      }, {
        "text": "...",
        "type": "other",
        "page": 473
      }, {
        "text": "Remark 3.17.",
        "type": "remark",
        "page": 474
      }, {
        "text": "...",
        "type": "other",
        "page": 475
      }, {
        "text": "Theorem 3.18. (MacMahon's recurrence)",
        "type": "theorem",
        "page": 476
      }, {
        "text": "...",
        "type": "other",
        "page": 477
      }]
    }, {
      "text": "Pentagonal numbers and the Euler identity",
      "type": "subsection",
      "page": 478,
      "children": [{
        "text": "Theorem 3.19. (Euler)",
        "type": "theorem",
        "page": 479
      }, {
        "text": "...",
        "type": "other",
        "page": 480
      }, {
        "text": "Lemma 3.20.",
        "type": "lemma",
        "page": 481
      }, {
        "text": "...",
        "type": "other",
        "page": 482
      }, {
        "text": "Lemma 3.21.",
        "type": "lemma",
        "page": 483
      }, {
        "text": "...",
        "type": "other",
        "page": 484
      }]
    }, {
      "text": "More about partitions",
      "type": "subsection",
      "page": 485,
      "children": []
    }]
  }, {
    "text": "Catalan numbers",
    "type": "section",
    "page": 485,
    "children": [{
      "text": "Rooted binary trees",
      "type": "subsection",
      "page": 485,
      "children": [{
        "text": "Definition 4.1.",
        "type": "definition",
        "page": 486
      }, {
        "text": "...",
        "type": "other",
        "page": 487
      }, {
        "text": "Theorem 4.2.",
        "type": "theorem",
        "page": 488
      }, {
        "text": "...",
        "type": "other",
        "page": 489
      }]
    }, {
      "text": "Generating function and the formula for $c_n$",
      "type": "subsection",
      "page": 490,
      "children": [{
        "text": "Theorem 4.3.",
        "type": "theorem",
        "page": 491
      }, {
        "text": "Lemma 4.4.",
        "type": "lemma",
        "page": 492
      }, {
        "text": "...",
        "type": "other",
        "page": 493
      }]
    }, {
      "text": "Bracket-variable expressions",
      "type": "subsection",
      "page": 494,
      "children": [{
        "text": "Theorem 4.5.",
        "type": "theorem",
        "page": 495
      }, {
        "text": "...",
        "type": "other",
        "page": 496
      }]
    }, {
      "text": "Triangulations of polygons",
      "type": "subsection",
      "page": 497,
      "children": [{
        "text": "Theorem 4.6.",
        "type": "theorem",
        "page": 498
      }, {
        "text": "...",
        "type": "other",
        "page": 499
      }]
    }, {
      "text": "Dyck paths",
      "type": "subsection",
      "page": 500,
      "children": [{
        "text": "Definition 4.7.",
        "type": "definition",
        "page": 501
      }, {
        "text": "...",
        "type": "other",
        "page": 502
      }, {
        "text": "Theorem 4.8.",
        "type": "theorem",
        "page": 503
      }, {
        "text": "...",
        "type": "other",
        "page": 504
      }, {
        "text": "Corollary 4.9.",
        "type": "corollary",
        "page": 505
      }, {
        "text": "...",
        "type": "other",
        "page": 506
      }]
    }, {
      "text": "A combinatorial proof of the formula for $c_n$",
      "type": "subsection",
      "page": 507,
      "children": [{
        "text": "Lemma 4.10.",
        "type": "lemma",
        "page": 508
      }, {
        "text": "...",
        "type": "other",
        "page": 509
      }]
    }]
  }]
}, {
  "text": "Automata theory",
  "type": "chapter",
  "page": 510,
  "children": [{
    "text": "Finite automata",
    "type": "section",
    "page": 510,
    "children": [{
      "text": "Alphabets, words, and languages",
      "type": "subsection",
      "page": 510,
      "children": []
    }, {
      "text": "Deterministic finite automata",
      "type": "subsection",
      "page": 510,
      "children": [{
        "text": "Definition 1.1.",
        "type": "definition",
        "page": 511
      }, {
        "text": "...",
        "type": "other",
        "page": 512
      }, {
        "text": "Definition 1.2.",
        "type": "definition",
        "page": 513
      }, {
        "text": "Example 1.3.",
        "type": "example",
        "page": 514
      }, {
        "text": "Definition 1.4.",
        "type": "definition",
        "page": 515
      }, {
        "text": "...",
        "type": "other",
        "page": 516
      }, {
        "text": "Remark 1.5.",
        "type": "remark",
        "page": 517
      }]
    }, {
      "text": "Nondeterministic finite automata",
      "type": "subsection",
      "page": 518,
      "children": [{
        "text": "Definition 1.6.",
        "type": "definition",
        "page": 519
      }, {
        "text": "...",
        "type": "other",
        "page": 520
      }, {
        "text": "Example 1.7.",
        "type": "example",
        "page": 521
      }, {
        "text": "...",
        "type": "other",
        "page": 522
      }, {
        "text": "Definition 1.8.",
        "type": "definition",
        "page": 523
      }, {
        "text": "Theorem 1.9.",
        "type": "theorem",
        "page": 524
      }, {
        "text": "...",
        "type": "other",
        "page": 525
      }, {
        "text": "Example 1.10.",
        "type": "example",
        "page": 526
      }, {
        "text": "...",
        "type": "other",
        "page": 527
      }, {
        "text": "Example 1.11.",
        "type": "example",
        "page": 528
      }, {
        "text": "...",
        "type": "other",
        "page": 529
      }]
    }, {
      "text": "Finite automata with epsilon-transitions",
      "type": "subsection",
      "page": 530,
      "children": [{
        "text": "Definition 1.12.",
        "type": "definition",
        "page": 531
      }, {
        "text": "...",
        "type": "other",
        "page": 532
      }, {
        "text": "Example 1.13.",
        "type": "example",
        "page": 533
      }, {
        "text": "...",
        "type": "other",
        "page": 534
      }, {
        "text": "Definition 1.14.",
        "type": "definition",
        "page": 535
      }, {
        "text": "...",
        "type": "other",
        "page": 536
      }, {
        "text": "Definition 1.15.",
        "type": "definition",
        "page": 537
      }, {
        "text": "...",
        "type": "other",
        "page": 538
      }, {
        "text": "Theorem 1.16.",
        "type": "theorem",
        "page": 539
      }, {
        "text": "...",
        "type": "other",
        "page": 540
      }, {
        "text": "Example 1.17.",
        "type": "example",
        "page": 541
      }]
    }]
  }, {
    "text": "Regular expressions",
    "type": "section",
    "page": 542,
    "children": [{
      "text": "Definition and examples",
      "type": "subsection",
      "page": 542,
      "children": [{
        "text": "Example 2.1.",
        "type": "example",
        "page": 543
      }, {
        "text": "...",
        "type": "other",
        "page": 544
      }, {
        "text": "Theorem 2.2.",
        "type": "theorem",
        "page": 545
      }, {
        "text": "...",
        "type": "other",
        "page": 546
      }, {
        "text": "Example 2.3.",
        "type": "example",
        "page": 547
      }, {
        "text": "Example 2.4.",
        "type": "example",
        "page": 548
      }, {
        "text": "Example 2.5.",
        "type": "example",
        "page": 549
      }]
    }, {
      "text": "Equivalence of regular expressions and regular languages",
      "type": "subsection",
      "page": 550,
      "children": [{
        "text": "Lemma 2.6.",
        "type": "lemma",
        "page": 551
      }, {
        "text": "...",
        "type": "other",
        "page": 552
      }, {
        "text": "Example 2.7.",
        "type": "example",
        "page": 553
      }, {
        "text": "...",
        "type": "other",
        "page": 554
      }, {
        "text": "Definition 2.8.",
        "type": "definition",
        "page": 555
      }, {
        "text": "Lemma 2.9.",
        "type": "lemma",
        "page": 556
      }, {
        "text": "...",
        "type": "other",
        "page": 557
      }, {
        "text": "Example 2.10.",
        "type": "example",
        "page": 558
      }]
    }]
  }, {
    "text": "Properties of regular languages",
    "type": "section",
    "page": 559,
    "children": [{
      "text": "Closure under boolean operations",
      "type": "subsection",
      "page": 559,
      "children": [{
        "text": "Theorem 3.1.",
        "type": "theorem",
        "page": 560
      }, {
        "text": "...",
        "type": "other",
        "page": 561
      }, {
        "text": "Theorem 3.2.",
        "type": "theorem",
        "page": 562
      }, {
        "text": "...",
        "type": "other",
        "page": 563
      }]
    }, {
      "text": "The pumping lemma",
      "type": "subsection",
      "page": 564,
      "children": [{
        "text": "Lemma 3.3.",
        "type": "lemma",
        "page": 565
      }, {
        "text": "...",
        "type": "other",
        "page": 566
      }, {
        "text": "Theorem 3.4. (Pumping lemma for regular languages)",
        "type": "theorem",
        "page": 567
      }, {
        "text": "...",
        "type": "other",
        "page": 568
      }, {
        "text": "Example 3.5.",
        "type": "example",
        "page": 569
      }, {
        "text": "...",
        "type": "other",
        "page": 570
      }, {
        "text": "Example 3.6.",
        "type": "example",
        "page": 571
      }, {
        "text": "...",
        "type": "other",
        "page": 572
      }, {
        "text": "Theorem 3.7.",
        "type": "theorem",
        "page": 573
      }, {
        "text": "...",
        "type": "other",
        "page": 574
      }]
    }, {
      "text": "Closure under homomorphisms",
      "type": "subsection",
      "page": 575,
      "children": [{
        "text": "Definition 3.8.",
        "type": "definition",
        "page": 576
      }, {
        "text": "Lemma 3.9.",
        "type": "lemma",
        "page": 577
      }, {
        "text": "...",
        "type": "other",
        "page": 578
      }, {
        "text": "Definition 3.10.",
        "type": "definition",
        "page": 579
      }, {
        "text": "Example 3.11.",
        "type": "example",
        "page": 580
      }, {
        "text": "Theorem 3.12.",
        "type": "theorem",
        "page": 581
      }, {
        "text": "...",
        "type": "other",
        "page": 582
      }, {
        "text": "Example 3.13.",
        "type": "example",
        "page": 583
      }, {
        "text": "Lemma 3.14.",
        "type": "lemma",
        "page": 584
      }, {
        "text": "...",
        "type": "other",
        "page": 585
      }]
    }, {
      "text": "Closure under inverse homomorphism",
      "type": "subsection",
      "page": 586,
      "children": [{
        "text": "Definition 3.15.",
        "type": "definition",
        "page": 587
      }, {
        "text": "Example 3.16.",
        "type": "example",
        "page": 588
      }, {
        "text": "...",
        "type": "other",
        "page": 589
      }, {
        "text": "Theorem 3.17.",
        "type": "theorem",
        "page": 590
      }, {
        "text": "...",
        "type": "other",
        "page": 591
      }]
    }]
  }, {
    "text": "The Myhill-Nerode theorem",
    "type": "section",
    "page": 592,
    "children": [{
      "text": "Equivalence of words with respect to a language",
      "type": "subsection",
      "page": 592,
      "children": [{
        "text": "Definition 4.1.",
        "type": "definition",
        "page": 593
      }, {
        "text": "...",
        "type": "other",
        "page": 594
      }, {
        "text": "Example 4.2.",
        "type": "example",
        "page": 595
      }, {
        "text": "Lemma 4.3.",
        "type": "lemma",
        "page": 596
      }, {
        "text": "...",
        "type": "other",
        "page": 597
      }, {
        "text": "Example 4.4.",
        "type": "example",
        "page": 598
      }, {
        "text": "Example 4.5.",
        "type": "example",
        "page": 599
      }, {
        "text": "Lemma 4.6.",
        "type": "lemma",
        "page": 600
      }, {
        "text": "...",
        "type": "other",
        "page": 601
      }]
    }, {
      "text": "The theorem",
      "type": "subsection",
      "page": 602,
      "children": [{
        "text": "Theorem 4.7.",
        "type": "theorem",
        "page": 603
      }, {
        "text": "...",
        "type": "other",
        "page": 604
      }]
    }, {
      "text": "Minimization of a DFA",
      "type": "subsection",
      "page": 605,
      "children": [{
        "text": "Corollary 4.8.",
        "type": "corollary",
        "page": 606
      }, {
        "text": "...",
        "type": "other",
        "page": 607
      }, {
        "text": "Example 4.9.",
        "type": "example",
        "page": 608
      }, {
        "text": "...",
        "type": "other",
        "page": 609
      }]
    }]
  }, {
    "text": "Context-free grammars and languages",
    "type": "section",
    "page": 610,
    "children": [{
      "text": "Generating a language by a grammar",
      "type": "subsection",
      "page": 610,
      "children": [{
        "text": "Definition 5.1.",
        "type": "definition",
        "page": 611
      }, {
        "text": "Example 5.2.",
        "type": "example",
        "page": 612
      }, {
        "text": "...",
        "type": "other",
        "page": 613
      }, {
        "text": "Definition 5.3.",
        "type": "definition",
        "page": 614
      }, {
        "text": "...",
        "type": "other",
        "page": 615
      }, {
        "text": "Example 5.4.",
        "type": "example",
        "page": 616
      }, {
        "text": "...",
        "type": "other",
        "page": 617
      }, {
        "text": "Example 5.5.",
        "type": "example",
        "page": 618
      }]
    }, {
      "text": "Grammars in Chomsky form",
      "type": "subsection",
      "page": 619,
      "children": [{
        "text": "Theorem 5.6.",
        "type": "theorem",
        "page": 620
      }, {
        "text": "...",
        "type": "other",
        "page": 621
      }, {
        "text": "Definition 5.7.",
        "type": "definition",
        "page": 622
      }, {
        "text": "...",
        "type": "other",
        "page": 623
      }, {
        "text": "Lemma 5.8.",
        "type": "lemma",
        "page": 624
      }, {
        "text": "...",
        "type": "other",
        "page": 625
      }, {
        "text": "Example 5.9.",
        "type": "example",
        "page": 626
      }, {
        "text": "Example 5.10.",
        "type": "example",
        "page": 627
      }, {
        "text": "...",
        "type": "other",
        "page": 628
      }, {
        "text": "Example 5.11.",
        "type": "example",
        "page": 629
      }]
    }]
  }, {
    "text": "Pushdown automata",
    "type": "section",
    "page": 630,
    "children": [{
      "text": "Definition",
      "type": "subsection",
      "page": 630,
      "children": [{
        "text": "Definition 6.1.",
        "type": "definition",
        "page": 631
      }, {
        "text": "...",
        "type": "other",
        "page": 632
      }, {
        "text": "Example 6.2.",
        "type": "example",
        "page": 633
      }, {
        "text": "...",
        "type": "other",
        "page": 634
      }, {
        "text": "Example 6.3.",
        "type": "example",
        "page": 635
      }, {
        "text": "...",
        "type": "other",
        "page": 636
      }, {
        "text": "Example 6.4.",
        "type": "example",
        "page": 637
      }, {
        "text": "...",
        "type": "other",
        "page": 638
      }, {
        "text": "Example 6.5.",
        "type": "example",
        "page": 639
      }, {
        "text": "...",
        "type": "other",
        "page": 640
      }]
    }, {
      "text": "Instantaneous description",
      "type": "subsection",
      "page": 641,
      "children": [{
        "text": "Definition 6.6.",
        "type": "definition",
        "page": 642
      }, {
        "text": "...",
        "type": "other",
        "page": 643
      }, {
        "text": "Definition 6.7.",
        "type": "definition",
        "page": 644
      }]
    }, {
      "text": "Equivalence of acceptance by final state and empty stack",
      "type": "subsection",
      "page": 645,
      "children": [{
        "text": "Theorem 6.8.",
        "type": "theorem",
        "page": 646
      }, {
        "text": "...",
        "type": "other",
        "page": 647
      }, {
        "text": "Theorem 6.9.",
        "type": "theorem",
        "page": 648
      }, {
        "text": "...",
        "type": "other",
        "page": 649
      }]
    }, {
      "text": "Equivalence of PDA's and CFL's",
      "type": "subsection",
      "page": 650,
      "children": [{
        "text": "Theorem 6.10.",
        "type": "theorem",
        "page": 651
      }, {
        "text": "...",
        "type": "other",
        "page": 652
      }, {
        "text": "Theorem 6.11.",
        "type": "theorem",
        "page": 653
      }, {
        "text": "...",
        "type": "other",
        "page": 654
      }]
    }]
  }, {
    "text": "Properties of context-free languages",
    "type": "section",
    "page": 655,
    "children": [{
      "text": "Closure properties of CFLs",
      "type": "subsection",
      "page": 655,
      "children": [{
        "text": "Theorem 7.1.",
        "type": "theorem",
        "page": 656
      }, {
        "text": "...",
        "type": "other",
        "page": 657
      }, {
        "text": "Corollary 7.2.",
        "type": "corollary",
        "page": 658
      }, {
        "text": "...",
        "type": "other",
        "page": 659
      }]
    }, {
      "text": "The pumping lemma for CFLs",
      "type": "subsection",
      "page": 660,
      "children": [{
        "text": "Theorem 7.3.",
        "type": "theorem",
        "page": 661
      }, {
        "text": "...",
        "type": "other",
        "page": 662
      }, {
        "text": "Example 7.4.",
        "type": "example",
        "page": 663
      }, {
        "text": "...",
        "type": "other",
        "page": 664
      }, {
        "text": "Example 7.5.",
        "type": "example",
        "page": 665
      }, {
        "text": "...",
        "type": "other",
        "page": 666
      }, {
        "text": "Lemma 7.6.",
        "type": "lemma",
        "page": 667
      }, {
        "text": "...",
        "type": "other",
        "page": 668
      }]
    }, {
      "text": "Non-closure properties of CFLs",
      "type": "subsection",
      "page": 669,
      "children": [{
        "text": "Theorem 7.7.",
        "type": "theorem",
        "page": 670
      }, {
        "text": "...",
        "type": "other",
        "page": 671
      }, {
        "text": "Theorem 7.8.",
        "type": "theorem",
        "page": 672
      }, {
        "text": "...",
        "type": "other",
        "page": 673
      }, {
        "text": "Remark 7.9.",
        "type": "remark",
        "page": 674
      }, {
        "text": "...",
        "type": "other",
        "page": 675
      }]
    }]
  }, {
    "text": "Turing machines",
    "type": "section",
    "page": 676,
    "children": [{
      "text": "Definition",
      "type": "subsection",
      "page": 676,
      "children": [{
        "text": "Definition 8.1.",
        "type": "definition",
        "page": 677
      }, {
        "text": "...",
        "type": "other",
        "page": 678
      }, {
        "text": "Example 8.2.",
        "type": "example",
        "page": 679
      }, {
        "text": "...",
        "type": "other",
        "page": 680
      }, {
        "text": "Definition 8.3.",
        "type": "definition",
        "page": 681
      }, {
        "text": "...",
        "type": "other",
        "page": 682
      }, {
        "text": "Lemma 8.4.",
        "type": "lemma",
        "page": 683
      }, {
        "text": "...",
        "type": "other",
        "page": 684
      }]
    }, {
      "text": "Modifications of Turing machines",
      "type": "subsection",
      "page": 685,
      "children": []
    }, {
      "text": "Problems and languages",
      "type": "subsection",
      "page": 685,
      "children": [{
        "text": "Definition 8.5.",
        "type": "definition",
        "page": 686
      }]
    }, {
      "text": "The universal language",
      "type": "subsection",
      "page": 687,
      "children": [{
        "text": "Definition 8.6.",
        "type": "definition",
        "page": 688
      }, {
        "text": "...",
        "type": "other",
        "page": 689
      }, {
        "text": "Lemma 8.7.",
        "type": "lemma",
        "page": 690
      }, {
        "text": "...",
        "type": "other",
        "page": 691
      }]
    }, {
      "text": "Undecidability of the halting problem",
      "type": "subsection",
      "page": 692,
      "children": [{
        "text": "Theorem 8.8.",
        "type": "theorem",
        "page": 693
      }, {
        "text": "...",
        "type": "other",
        "page": 694
      }, {
        "text": "Lemma 8.9.",
        "type": "lemma",
        "page": 695
      }, {
        "text": "...",
        "type": "other",
        "page": 696
      }, {
        "text": "Remark 8.10.",
        "type": "remark",
        "page": 697
      }]
    }]
  }]
}];
},{}],"output/indexes.json":[function(require,module,exports) {
module.exports = {
  "1": "output/mmi-1.st",
  "2": "output/mmi-2.st",
  "3": "output/mmi-3.st",
  "4": "output/mmi-4.st",
  "5": "output/mmi-5.st",
  "6": "output/mmi-6.st",
  "all": "output/mmi-all.st",
  "4-no-godel": "output/mmi-4-no-godel.st",
  "3-4": "output/mmi-3-4.st",
  "3-4-no-godel": "output/mmi-3-4-no-godel.st",
  "1-2-3-4": "output/mmi-1-2-3-4.st",
  "1-5": "output/mmi-1-5.st",
  "5-6": "output/mmi-5-6.st"
};
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const TreeComponent_1 = require("./TreeComponent");

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js';

const outline = require('../output/outline.json');

const indexes = require('../output/indexes.json');

const mmiPdf = "output/OrigMMI2020.pdf";
const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
let numPages = 1;
let searchFor = "";
const container = document.getElementById("viewerContainer");
const treeRoot = document.getElementById('treeView');
const initialDispatch = pdfjsViewer.EventBus.prototype.dispatch;

pdfjsViewer.EventBus.prototype.dispatch = function (eventName) {
  const superReturn = initialDispatch.apply(this, arguments);
  return superReturn;
};

const eventBus = new pdfjsViewer.EventBus();
const pdfLinkService = new pdfjsViewer.PDFLinkService({
  eventBus: eventBus
});
const pdfFindController = new pdfjsViewer.PDFFindController({
  eventBus: eventBus,
  linkService: pdfLinkService
});
const pdfViewer = new pdfjsViewer.PDFSinglePageViewer({
  container,
  eventBus,
  linkService: pdfLinkService,
  findController: pdfFindController
});
pdfLinkService.setViewer(pdfViewer);
const initialPush = pdfjsViewer.PDFHistory.prototype.push;

pdfjsViewer.PDFHistory.prototype.push = function ({
  pageNumber
}) {
  const parentReturn = initialPush.apply(this, arguments);
  goToPage(pageNumber);
  return parentReturn;
};

const pdfHistory = new pdfjsViewer.PDFHistory({
  linkService: pdfLinkService,
  eventBus
});
pdfLinkService.setHistory(pdfHistory);
eventBus.on("pagesinit", function () {
  pdfViewer.currentScaleValue = "page-width";
});

function goToPage(page, executeFind = false, query) {
  page = checkPages(page);
  pdfViewer.currentPageNumber = page;
  if (executeFind && query) pdfFindController.executeCommand("find", {
    query
  });
  TreeComponent_1.wrapAll(treeRoot);
  TreeComponent_1.resetHighlight(treeRoot);
  makeSureVisible(page, treeRoot);
}

function loadDocument() {
  return __awaiter(this, void 0, void 0, function* () {
    const loadingTask = pdfjsLib.getDocument({
      url: mmiPdf,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED
    });
    const pdfDocument = yield loadingTask.promise;
    numPages = pdfDocument.numPages;
    pdfViewer.setDocument(pdfDocument);
    pdfLinkService.setDocument(pdfDocument, null);
  });
}

function populateIndexesSelection() {
  const indexSelectDom = document.querySelector("#index-selection");
  indexSelectDom.innerHTML = Object.entries(indexes).map(([key, index]) => `<option value="${key}">${key}</option>`).join('');
  const defaultIndex = indexes.hasOwnProperty('all') ? 'all' : Object.keys(indexes)[0];
  const indexQueryParam = getQueryVariable('index', defaultIndex);
  const indexNameToLoad = indexes.hasOwnProperty(indexQueryParam) ? indexQueryParam : defaultIndex;
  indexSelectDom.value = indexNameToLoad;
  indexSelectDom.addEventListener('change', ({
    target
  }) => {
    const {
      value
    } = target;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('index', value);
    window.location.search = searchParams.toString();
  });
}

function getIndexSelection() {
  const {
    value
  } = document.querySelector("#index-selection");
  return value;
}

function hookIndexLoadOnActivate(dataStorkSelector) {
  const inputElement = document.querySelector(`input[data-stork="${dataStorkSelector}"]`);
  inputElement.addEventListener('focus', () => {
    loadIndex(dataStorkSelector).then(() => inputElement.classList.remove('disabled'));
  }, {
    once: true
  });
}

function loadIndex(dataStorkSelector) {
  return __awaiter(this, void 0, void 0, function* () {
    const indexNameToLoad = getIndexSelection();
    stork.downloadIndex(dataStorkSelector, indexes[indexNameToLoad], {
      onQueryUpdate: function (search, results) {
        console.log("on query update");
      },
      onResultSelected: function (search, {
        entry: {
          fields: {
            page
          }
        },
        excerpts
      }) {
        searchFor = search;
        console.log("page:", page);
        return goToPage(parseInt(page), excerpts.length > 0, search);
      }
    });
    yield stork.attach('mmi');
  });
}

(() => __awaiter(void 0, void 0, void 0, function* () {
  populateIndexesSelection();
  hookIndexLoadOnActivate('mmi');
  yield Promise.all([loadDocument(), stork.initialize()]);
  TreeComponent_1.templateItemsTree(outline.map(addPageNavigationOnTreeItem), treeRoot);
  document.addEventListener('keyup', ({
    key,
    target
  }) => {
    if (target === document.body) {
      switch (key) {
        case "b":
          goToPage(pdfViewer.currentPageNumber - 1);
          break;

        case "n":
          goToPage(pdfViewer.currentPageNumber + 1);
          break;
      }
    }
  });
}))();

function checkPages(page) {
  return Math.max(0, Math.min(page, numPages));
}

function addPageNavigationOnTreeItem(tree) {
  const currentListener = tree.onClick;

  tree.onClick = (item, domTarget, mouseEvent) => {
    TreeComponent_1.resetHighlight(treeRoot);
    domTarget.querySelector('.item-text').classList.add('highlight');
    if (item.page) pdfViewer.currentPageNumber = item.page;

    if (currentListener) {
      currentListener(item, domTarget, mouseEvent);
    }
  };

  if (tree.children) {
    tree.children = tree.children.map(addPageNavigationOnTreeItem);
  }

  return tree;
}

function makeSureVisible(page, rootElement) {
  let domItem = rootElement.querySelector(`[data-page="${page}"]`);

  if (domItem) {
    domItem.querySelector('.item-text').classList.add('highlight');

    while (domItem.parentElement && domItem.parentElement !== rootElement) {
      if (domItem.classList.contains('nested') && !domItem.classList.contains('active')) domItem.classList.toggle('active');
      domItem = domItem.parentElement;
    }
  }
}

function getQueryVariable(variable, defaultValue) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');

    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  return defaultValue;
}
},{"./TreeComponent":"src/TreeComponent.ts","../output/outline.json":"output/outline.json","../output/indexes.json":"output/indexes.json"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59130" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map