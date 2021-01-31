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
})({"stork.js":[function(require,module,exports) {
var stork = function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var s = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
  }

  return n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var s in e) n.d(r, s, function (t) {
      return e[t];
    }.bind(null, s));
    return r;
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 5);
}([function (e, t, n) {
  "use strict";

  function r(e) {
    const t = n.p;
    let r = "";
    return (!t || t.indexOf("://") < 0) && (r += window.location.protocol + "//" + window.location.host), r += t || "/", r + e;
  }

  let s;
  n.r(t), n.d(t, "wasm_register_index", function () {
    return v;
  }), n.d(t, "wasm_search", function () {
    return w;
  });
  const o = new Array(32).fill(void 0);

  function i(e) {
    return o[e];
  }

  o.push(void 0, null, !0, !1);
  let l = o.length;

  function a(e) {
    const t = i(e);
    return function (e) {
      e < 36 || (o[e] = l, l = e);
    }(e), t;
  }

  let u = 0,
      c = null;

  function h() {
    return null !== c && c.buffer === s.memory.buffer || (c = new Uint8Array(s.memory.buffer)), c;
  }

  let d = new TextEncoder("utf-8");
  const f = "function" == typeof d.encodeInto ? function (e, t) {
    return d.encodeInto(e, t);
  } : function (e, t) {
    const n = d.encode(e);
    return t.set(n), {
      read: e.length,
      written: n.length
    };
  };

  function g(e, t, n) {
    if (void 0 === n) {
      const n = d.encode(e),
            r = t(n.length);
      return h().subarray(r, r + n.length).set(n), u = n.length, r;
    }

    let r = e.length,
        s = t(r);
    const o = h();
    let i = 0;

    for (; i < r; i++) {
      const t = e.charCodeAt(i);
      if (t > 127) break;
      o[s + i] = t;
    }

    if (i !== r) {
      0 !== i && (e = e.slice(i)), s = n(s, r, r = i + 3 * e.length);
      const t = h().subarray(s + i, s + r);
      i += f(e, t).written;
    }

    return u = i, s;
  }

  let p = null;

  function m() {
    return null !== p && p.buffer === s.memory.buffer || (p = new Int32Array(s.memory.buffer)), p;
  }

  let y = new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
  });

  function b(e, t) {
    return y.decode(h().subarray(e, e + t));
  }

  function v(e, t) {
    try {
      const c = s.__wbindgen_export_0.value - 16;
      s.__wbindgen_export_0.value = c;

      var n = g(e, s.__wbindgen_malloc, s.__wbindgen_realloc),
          r = u,
          o = function (e, t) {
        const n = t(1 * e.length);
        return h().set(e, n / 1), u = e.length, n;
      }(t, s.__wbindgen_malloc),
          i = u;

      s.wasm_register_index(c, n, r, o, i);
      var l = m()[c / 4 + 0],
          a = m()[c / 4 + 1];
      return b(l, a);
    } finally {
      s.__wbindgen_export_0.value += 16, s.__wbindgen_free(l, a);
    }
  }

  function w(e, t) {
    try {
      const c = s.__wbindgen_export_0.value - 16;
      s.__wbindgen_export_0.value = c;
      var n = g(e, s.__wbindgen_malloc, s.__wbindgen_realloc),
          r = u,
          o = g(t, s.__wbindgen_malloc, s.__wbindgen_realloc),
          i = u;
      s.wasm_search(c, n, r, o, i);
      var l = m()[c / 4 + 0],
          a = m()[c / 4 + 1];
      return b(l, a);
    } finally {
      s.__wbindgen_export_0.value += 16, s.__wbindgen_free(l, a);
    }
  }

  y.decode(), t.default = async function e(t) {
    void 0 === t && (t = r("node_modules/stork-search/stork.js").replace(/\.js$/, "_bg.wasm"));
    const n = {
      wbg: {}
    };
    n.wbg.__wbg_new_59cb74e423758ede = function () {
      return function (e) {
        l === o.length && o.push(o.length + 1);
        const t = l;
        return l = o[t], o[t] = e, t;
      }(new Error());
    }, n.wbg.__wbg_stack_558ba5917b466edd = function (e, t) {
      var n = g(i(t).stack, s.__wbindgen_malloc, s.__wbindgen_realloc),
          r = u;
      m()[e / 4 + 1] = r, m()[e / 4 + 0] = n;
    }, n.wbg.__wbg_error_4bb6c2a97407129a = function (e, t) {
      try {
        console.error(b(e, t));
      } finally {
        s.__wbindgen_free(e, t);
      }
    }, n.wbg.__wbindgen_object_drop_ref = function (e) {
      a(e);
    }, ("string" == typeof t || "function" == typeof Request && t instanceof Request || "function" == typeof URL && t instanceof URL) && (t = fetch(t));
    const {
      instance: c,
      module: h
    } = await async function (e, t) {
      if ("function" == typeof Response && e instanceof Response) {
        if ("function" == typeof WebAssembly.instantiateStreaming) try {
          return await WebAssembly.instantiateStreaming(e, t);
        } catch (t) {
          if ("application/wasm" == e.headers.get("Content-Type")) throw t;
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", t);
        }
        const n = await e.arrayBuffer();
        return await WebAssembly.instantiate(n, t);
      }

      {
        const n = await WebAssembly.instantiate(e, t);
        return n instanceof WebAssembly.Instance ? {
          instance: n,
          module: e
        } : n;
      }
    }(await t, n);
    return s = c.exports, e.__wbindgen_wasm_module = h, s;
  };
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.defaultConfig = {
    showProgress: !0,
    printIndexInfo: !1,
    showScores: !1,
    minimumQueryLength: 3,
    onQueryUpdate: void 0,
    onResultSelected: void 0
  }, t.calculateOverriddenConfig = function (e) {
    for (var n = Object.assign({}, t.defaultConfig), r = 0, s = Object.keys(t.defaultConfig); r < s.length; r++) {
      var o = s[r],
          i = e[o];
      void 0 !== i && (n[o] = i);
    }

    return n;
  };
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.htmlToElement = function (e) {
    var t = document.createElement("template");
    return e = e.trim(), t.innerHTML = e, t.content.firstChild;
  }, t.difference = function (e, t) {
    var n = new Set(e),
        r = new Set(t),
        s = new Set(Array.from(n).filter(function (e) {
      return !r.has(e);
    }));
    return Array.from(s);
  };
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = n(0),
      s = n(6);

  t.loadWasm = function () {
    var e = new s.default();
    return r.default("stork.wasm").then(function () {
      e.loaded = !0, e.handleWasmLoad();
    }), e;
  };
}, function (e, t, n) {
  "use strict";

  var r = this && this.__assign || function () {
    return (r = Object.assign || function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) for (var s in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);

      return e;
    }).apply(this, arguments);
  };

  Object.defineProperty(t, "__esModule", {
    value: !0
  });

  var s = n(7),
      o = n(1),
      i = n(13),
      l = n(0),
      a = function () {
    function e(e) {
      this.entities = [], this.wasmQueue = e;
    }

    return e.prototype.handleLoadedIndex = function (e, t) {
      var n = t.target,
          s = n.status,
          o = n.response;
      if (s < 200 || s > 299) throw e.setDownloadError(), new Error("Got a " + s + " error from " + e.url + "!");
      this.wasmQueue.runAfterWasmLoaded(function () {
        if (!e.error) {
          var t = l.wasm_register_index(e.name, new Uint8Array(o));
          e.setDownloadProgress(1), e.performSearch(e.domManager.getQuery()), e.config.printIndexInfo && console.log(r({
            name: e.name,
            sizeInBytes: o.byteLength
          }, JSON.parse(t)));
        }
      });
    }, e.prototype.register = function (e, t, n) {
      var r = this,
          l = o.calculateOverriddenConfig(n),
          a = new s.Entity(e, t, l, this.wasmQueue);
      this.entities.length < 1 && this.entities.push(a), i.loadIndexFromUrl(a, t, {
        load: function (e) {
          return r.handleLoadedIndex(a, e);
        },
        progress: function (e, t) {
          t.setDownloadProgress(e);
        },
        error: function () {
          a.setDownloadError();
        }
      });
    }, e;
  }();

  t.EntityManager = a;
}, function (e, t, n) {
  "use strict";

  n.r(t), n.d(t, "register", function () {
    return u;
  });
  var r = n(2),
      s = n(1),
      o = n(3),
      i = n(4);
  const l = Object(o.loadWasm)(),
        a = new i.EntityManager(l);

  function u(e, t, n = {}) {
    if ("string" != typeof e) throw new Error("Index registration name must be a string.");
    if ("string" != typeof t) throw new Error("URL must be a string.");
    let o = Object(r.difference)(Object.keys(n), Object.keys(s.defaultConfig));
    if (o.size > 0) throw new Error(`Invalid key${o > 1 ? "s" : ""} in config object: ${JSON.stringify(Array.from(o))}`);
    a.register(e, t, n);
  }

  t.default = {
    register: u
  };
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  });

  var r = function () {
    function e() {
      this.loaded = !1, this.queue = [];
    }

    return e.prototype.runAfterWasmLoaded = function (e) {
      this.loaded ? e() : this.queue.push(e);
    }, e.prototype.handleWasmLoad = function () {
      for (var e = 0, t = this.queue; e < t.length; e++) {
        (0, t[e])();
      }

      this.queue = [];
    }, e;
  }();

  t.default = r;
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  });

  var r = n(8),
      s = n(9),
      o = function () {
    function e(e, t, n, r) {
      this.results = [], this.highlightedResult = 0, this.progress = 0, this.error = !1, this.totalResultCount = 0, this.resultsVisible = !1, this.hoverSelectEnabled = !0, this.name = e, this.url = t, this.config = n, this.wasmQueue = r, this.domManager = new s.EntityDom(e, this);
    }

    return e.prototype.getCurrentMessage = function () {
      var e = this.domManager.getQuery();
      return this.error ? "Error! Check the browser console." : this.progress < 1 || !this.wasmQueue.loaded ? "Loading..." : (null == e ? void 0 : e.length) < this.config.minimumQueryLength ? "Filtering..." : this.results ? 0 === this.totalResultCount ? "No files found." : 1 === this.totalResultCount ? "1 file found." : this.totalResultCount + " files found." : null;
    }, e.prototype.generateRenderConfig = function () {
      return {
        results: this.results,
        resultsVisible: !0,
        showScores: this.config.showScores,
        message: this.getCurrentMessage(),
        showProgress: this.config.showProgress,
        progress: this.progress,
        error: this.error
      };
    }, e.prototype.render = function () {
      this.domManager.render(this.generateRenderConfig());
    }, e.prototype.injestSearchData = function (e) {
      this.results = e.results, this.totalResultCount = e.total_hit_count, this.highlightedResult = 0;
      var t = e.url_prefix || "";
      this.results.map(function (e) {
        var n = "";
        e.excerpts && e.excerpts[0] && e.excerpts[0].internal_annotations && e.excerpts[0].internal_annotations[0] && e.excerpts[0].internal_annotations[0].a && "string" == typeof e.excerpts[0].internal_annotations[0].a && (n = e.excerpts[0].internal_annotations[0].a), e.entry.url = "" + t + e.entry.url + n;
      }), this.render();
    }, e.prototype.getSanitizedResults = function () {
      var e = this.results;
      return e.map(function (e) {
        delete e.title_highlight_ranges, e.excerpts.map(function (e) {
          delete e.highlight_ranges, delete e.internal_annotations;
        });
      }), e;
    }, e.prototype.setDownloadProgress = function (e) {
      this.error = !1, this.progress = e, this.config.showProgress && this.render();
    }, e.prototype.setDownloadError = function () {
      this.progress = 1, this.error = !0, this.render();
    }, e.prototype.performSearch = function (e) {
      var t = this;
      this.wasmQueue.loaded && !this.error ? e.length >= this.config.minimumQueryLength ? r.resolveSearch(this.name, e).then(function (n) {
        n && (t.injestSearchData(n), t.config.onQueryUpdate && t.config.onQueryUpdate(e, t.getSanitizedResults()));
      }).catch(function (e) {
        console.error(e);
      }) : (this.results = [], this.render()) : this.render();
    }, e;
  }();

  t.Entity = o;
}, function (e, t, n) {
  "use strict";

  var r = this && this.__awaiter || function (e, t, n, r) {
    return new (n || (n = Promise))(function (s, o) {
      function i(e) {
        try {
          a(r.next(e));
        } catch (e) {
          o(e);
        }
      }

      function l(e) {
        try {
          a(r.throw(e));
        } catch (e) {
          o(e);
        }
      }

      function a(e) {
        var t;
        e.done ? s(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
          e(t);
        })).then(i, l);
      }

      a((r = r.apply(e, t || [])).next());
    });
  },
      s = this && this.__generator || function (e, t) {
    var n,
        r,
        s,
        o,
        i = {
      label: 0,
      sent: function () {
        if (1 & s[0]) throw s[1];
        return s[1];
      },
      trys: [],
      ops: []
    };
    return o = {
      next: l(0),
      throw: l(1),
      return: l(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
      return this;
    }), o;

    function l(o) {
      return function (l) {
        return function (o) {
          if (n) throw new TypeError("Generator is already executing.");

          for (; i;) try {
            if (n = 1, r && (s = 2 & o[0] ? r.return : o[0] ? r.throw || ((s = r.return) && s.call(r), 0) : r.next) && !(s = s.call(r, o[1])).done) return s;

            switch (r = 0, s && (o = [2 & o[0], s.value]), o[0]) {
              case 0:
              case 1:
                s = o;
                break;

              case 4:
                return i.label++, {
                  value: o[1],
                  done: !1
                };

              case 5:
                i.label++, r = o[1], o = [0];
                continue;

              case 7:
                o = i.ops.pop(), i.trys.pop();
                continue;

              default:
                if (!(s = i.trys, (s = s.length > 0 && s[s.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                  i = 0;
                  continue;
                }

                if (3 === o[0] && (!s || o[1] > s[0] && o[1] < s[3])) {
                  i.label = o[1];
                  break;
                }

                if (6 === o[0] && i.label < s[1]) {
                  i.label = s[1], s = o;
                  break;
                }

                if (s && i.label < s[2]) {
                  i.label = s[2], i.ops.push(o);
                  break;
                }

                s[2] && i.ops.pop(), i.trys.pop();
                continue;
            }

            o = t.call(e, i);
          } catch (e) {
            o = [6, e], r = 0;
          } finally {
            n = s = 0;
          }

          if (5 & o[0]) throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          };
        }([o, l]);
      };
    }
  };

  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var o = n(0);

  t.resolveSearch = function (e, t) {
    return r(this, void 0, void 0, function () {
      var n, r;
      return s(this, function (s) {
        n = null, r = null;

        try {
          n = o.wasm_search(e, t), r = JSON.parse(n);
        } catch (e) {
          throw Error("Could not parse data from wasm_search. If you see this, please file a bug: https://jil.im/storkbug " + n);
        }

        if (!r) throw Error("Data was an empty object");
        if (r.error) throw Error("Could not perform search: the WASM binary failed to return search results.\n    You might not be serving your search index properly.\n    If you think this is an error, please file a bug: https://jil.im/storkbug\n    \n    The WASM binary came back with:\n    " + r.error);
        return [2, r];
      });
    });
  };
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  });

  var r = n(10),
      s = n(11),
      o = {
    results: [],
    resultsVisible: !1,
    showScores: !1,
    message: null,
    showProgress: !1,
    progress: 1,
    error: !1
  },
      i = function () {
    function e(e, t) {
      var n,
          s,
          i = this;
      this.scrollAnchorPoint = "end", this.entity = t;
      var l = [{
        selector: 'input[data-stork="' + e + '"]',
        elementName: "input"
      }, {
        selector: 'div[data-stork="' + e + '-output"]',
        elementName: "output"
      }].map(function (t) {
        var n = document.querySelector(t.selector);
        if (!n) throw new Error('Could not register search box "' + e + '": ' + t.elementName + " element not found. Make sure an element matches the query selector `" + t.selector + "`");
        return n;
      }),
          a = l[0],
          u = l[1];
      this.elements = {
        input: a,
        output: u,
        list: r.create("ul", {
          classNames: ["stork-results"]
        }),
        attribution: r.create("div", {
          classNames: ["stork-attribution"]
        }),
        progress: r.create("div", {
          classNames: ["stork-progress"]
        }),
        message: r.create("div", {
          classNames: ["stork-message"]
        }),
        closeButton: r.create("button", {
          classNames: ["stork-close-button"]
        })
      }, this.elements.input.addEventListener("input", function (e) {
        i.handleInputEvent(e);
      }), this.elements.input.addEventListener("keydown", function (e) {
        i.handleKeyDownEvent(e);
      }), null === (n = this.elements.list) || void 0 === n || n.addEventListener("mousemove", function () {
        i.hoverSelectEnabled = !0;
      }), this.elements.attribution.innerHTML = 'Powered by <a href="https://stork-search.net">Stork</a>', r.setText(this.elements.closeButton, "×"), r.add(this.elements.progress, "afterend", this.elements.input), null === (s = this.elements.closeButton) || void 0 === s || s.addEventListener("click", function () {
        i.elements.input.value = "", i.elements.input.focus(), i.render(o);
      });
    }

    return e.prototype.clearDom = function () {
      var e;
      r.clear(this.elements.output), r.clear(this.elements.list), null === (e = this.elements.closeButton) || void 0 === e || e.remove(), this.elements.output.classList.remove("stork-output-visible");
    }, e.prototype.render = function (e) {
      var t,
          n = this,
          o = this.elements.input.value;

      if (this.clearDom(), this.lastRenderState = e, e.showProgress && e.progress && e.progress < 1 ? this.elements.progress.style.width = 100 * e.progress + "%" : e.showProgress && (this.elements.progress.style.width = "100%", this.elements.progress.style.opacity = "0"), e.error && this.elements.input.classList.add("stork-error"), this.getQuery().length > 0 && e.resultsVisible && (this.elements.output.classList.add("stork-output-visible"), r.add(this.elements.message, "beforeend", this.elements.output)), e.message && r.setText(this.elements.message, e.message), (null === (t = e.results) || void 0 === t ? void 0 : t.length) > 0 && e.resultsVisible) {
        r.add(this.elements.list, "beforeend", this.elements.output);

        for (var i = function (t) {
          var o = e.results[t],
              i = {
            selected: t === l.highlightedResult,
            showScores: e.showScores
          },
              a = s.resultToListItem(o, i);
          r.add(a, "beforeend", l.elements.list), a.addEventListener("mousemove", function () {
            n.hoverSelectEnabled && t !== n.highlightedResult && n.changeHighlightedResult({
              to: t,
              shouldScrollTo: !1
            });
          }), a.addEventListener("click", function (e) {
            e.preventDefault(), n.selectResult();
          });
        }, l = this, a = 0; a < e.results.length; a++) i(a);

        r.add(this.elements.attribution, "beforeend", this.elements.output);
      }

      ((null == o ? void 0 : o.length) || 0) > 0 && r.add(this.elements.closeButton, "afterend", this.elements.input);
    }, e.prototype.selectResult = function () {
      if (null != this.highlightedResult) {
        var e = this.entity.results[this.highlightedResult];
        this.entity.config.onResultSelected ? Promise.resolve(this.entity.config.onResultSelected(this.getQuery(), e)).finally(function () {
          window.location.assign(e.entry.url);
        }) : window.location.assign(e.entry.url);
      }
    }, e.prototype.changeHighlightedResult = function (e) {
      var t,
          n = this.highlightedResult,
          s = Math.max(0, Math.min(this.entity.results.length - 1, e.to));
      this.highlightedResult = s, this.scrollAnchorPoint = (n || 0) < s ? "end" : "start";

      for (var o = null, i = 0; i < this.entity.results.length; i++) {
        var l = null === (t = this.elements.list) || void 0 === t ? void 0 : t.children[i];

        if (l) {
          i == s ? (l.classList.add("selected"), o = l) : l.classList.remove("selected");
        }
      }

      return e.shouldScrollTo && (this.hoverSelectEnabled = !1, o && r.existsBeyondContainerBounds(o, this.elements.list) && o.scrollIntoView({
        behavior: "smooth",
        block: this.scrollAnchorPoint,
        inline: "nearest"
      })), s;
    }, e.prototype.handleKeyDownEvent = function (e) {
      switch (e.keyCode) {
        case 40:
          if (null == this.highlightedResult) this.changeHighlightedResult({
            to: 0,
            shouldScrollTo: !0
          });else {
            var t = Math.min(this.highlightedResult + 1, this.entity.results.length - 1);
            this.changeHighlightedResult({
              to: t,
              shouldScrollTo: !0
            });
          }
          break;

        case 38:
          if (null != this.highlightedResult) {
            t = Math.max(0, this.highlightedResult - 1);
            this.changeHighlightedResult({
              to: t,
              shouldScrollTo: !0
            });
          }

          break;

        case 13:
          this.selectResult();
          break;

        case 27:
          this.lastRenderState.resultsVisible || (this.elements.input.value = ""), this.render(o);
          break;

        default:
          return;
      }
    }, e.prototype.handleInputEvent = function (e) {
      this.entity.performSearch(e.target.value);
    }, e.prototype.getQuery = function () {
      return this.elements.input.value;
    }, e;
  }();

  t.EntityDom = i;
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.create = function (e, t) {
    var n = document.createElement(e);
    return t.classNames && n.setAttribute("class", t.classNames.join(" ")), n;
  }, t.add = function (e, t, n) {
    n.insertAdjacentElement(t, e);
  }, t.clear = function (e) {
    for (; e && e.firstChild;) e.removeChild(e.firstChild);
  }, t.setText = function (e, t) {
    var n = document.createTextNode(t);
    e && e.firstChild ? e.replaceChild(n, e.firstChild) : e && e.appendChild(n);
  }, t.existsBeyondContainerBounds = function (e, t) {
    var n = e.getBoundingClientRect(),
        r = t.getBoundingClientRect();
    return n.bottom > r.bottom || n.top < r.top;
  };
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = n(12);

  t.resultToListItem = function (e, t) {
    var n = document.createElement("template");
    return n.innerHTML = '\n<li class="stork-result' + (t.selected ? " selected" : "") + '">\n  <a href="' + e.entry.url + '">\n    <div style="display: flex; justify-content: space-between">\n      <p class="stork-title">' + r.highlight(e.entry.title, e.title_highlight_ranges) + "</p>\n      " + (t.showScores ? "<code><b>" + e.score + "</b></code>" : "") + "\n    </div>\n      " + e.excerpts.map(function (e) {
      return '<div style="display: flex; justify-content: space-between"><p class="stork-excerpt">\n        ...' + r.highlight(e.text, e.highlight_ranges) + "...\n        </p>\n        " + (t.showScores ? "<code>" + e.score + "</code>" : "") + "\n        </div>";
    }).join("") + "\n  </a>\n</li>", n.content.firstElementChild;
  };
}, function (e, t, n) {
  "use strict";

  function r(e, t) {
    function n(e, t, n) {
      return e.substr(0, t) + n + e.substr(t);
    }

    var r = 0;

    for (let s of t) {
      let t = '<span class="stork-highlight">',
          o = "</span>";
      e = n(e, s.beginning + r, t), r += t.length, e = n(e, s.end + r, o), r += o.length;
    }

    return e;
  }

  n.r(t), n.d(t, "highlight", function () {
    return r;
  });
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  });

  t.loadIndexFromUrl = function (e, t, n) {
    var r = new XMLHttpRequest();
    r.addEventListener("load", function (t) {
      n.load && n.load(t, e);
    }), r.addEventListener("error", function () {
      console.error("Could not fetch " + t), n.error();
    }), r.addEventListener("progress", function (t) {
      if (n.progress) {
        var r = Math.min(Math.max(.03, t.loaded / t.total), .94);
        n.progress(r, e);
      }
    }), n.progress && n.progress(.03, e), r.responseType = "arraybuffer", r.open("GET", t), r.send();
  };
}]);
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55663" + '/');

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","stork.js"], null)
//# sourceMappingURL=/stork.55f73be0.js.map