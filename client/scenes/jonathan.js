// (function() {
//     var head = document.getElementsByTagName("head")[0];
//     var css = ".disable-hover, .disable-hover * { pointer-events: none; }";
//     var style = document.createElement("style");
//     var timeout;
//     style.type = "text/css";
//     style.appendChild(document.createTextNode(css));
//     head.appendChild(style);
//     window.addEventListener("scroll", function() {
//         clearTimeout(timeout);
//         if (!document.body.classList.contains("disable-hover")) document.body.classList.add("disable-hover");
//         timeout = setTimeout(function() {
//                 document.body.classList.remove("disable-hover")
//             },
//             230)
//     }, false)
// })();
// 
// function get(url, callback, scope) {
//     var xhr = new XMLHttpRequest;
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) callback.call(scope, xhr.responseText)
//     };
//     xhr.open("GET", url, true);
//     xhr.send()
// };
// (function() {
//     var Math = window["Math"],
//         originalRandom = Math.random,
//         originalRound = Math.round;
//     Math.DEFAULT_RANDOM_GENERATOR = function() {
//         return originalRandom.call(Math)
//     };
//     extend(Math, {
//         TWO_PI: Math.PI * 2,
//         HALF_PI: Math.PI / 2,
//         clamp: function(value, min, max) {
//             return Math.max(min, Math.min(max, value))
//         },
//         lerp: function(min, max, amount) {
//             return min + amount * (max - min)
//         },
//         map: function(num, minA, maxA, minB, maxB) {
//             return (num - minA) / (maxA - minA) * (maxB - minB) + minB
//         },
//         cmap: function(num, minA, maxA, minB, maxB) {
//             return Math.map(Math.clamp(num, minA,
//                 maxA), minA, maxA, minB, maxB)
//         },
//         sign: function(num) {
//             return num < 0 ? -1 : 1
//         },
//         sample: function(arr, index) {
//             var lo = ~~index;
//             if (lo == index) return arr[index];
//             else {
//                 var hi = lo + 1;
//                 return Math.lerp(arr[lo], arr[hi], index - lo)
//             }
//         },
//         isNumber: function(obj) {
//             return obj === obj && Object.prototype.toString.call(obj) == "[object Number]"
//         },
//         smoothstep: function(min, max, x) {
//             x = Math.clamp((x - min) / (max - min), 0, 1);
//             return x * x * x * (x * (x * 6 - 15) + 10)
//         },
//         round: function(value, decimals) {
//             var d = Math.pow(10, decimals || 0);
//             return originalRound.call(Math, value * d) / d
//         },
//         snap: function(value,
//             interval) {
//             return originalRound.call(Math, value / interval) * interval
//         },
//         gcf: function() {
//             var values;
//             if (arguments[0].length != undefined) values = arguments[0];
//             else values = arguments;
//             if (values.length == 1) return values[0];
//             var gcf, x = values[0],
//                 y = values[1];
//             for (var i = 1, l = values.length; i < l;) {
//                 var a = Math.max(x, y);
//                 var b = Math.min(x, y);
//                 var c = 1;
//                 do {
//                     c = a % b;
//                     gcf = b;
//                     a = b;
//                     b = c;
//                     if (isNaN(c)) return c
//                 } while (c != 0);
//                 x = gcf;
//                 y = values[++i]
//             }
//             return gcf
//         },
//         noise: noise,
//         random: random,
//         randomGenerator: Math.DEFAULT_RANDOM_GENERATOR,
//         randomInt: function() {
//             return Math.floor(Math.random.apply(Math,
//                 arguments))
//         },
//         randomRange: function() {
//             var args = toArray(arguments);
//             args.unshift(-arguments[0]);
//             return Math.random.apply(Math, args)
//         },
//         randomSign: function() {
//             return Math.chance() ? -1 : 1
//         },
//         chance: function(percent) {
//             return Math.random() < (percent != undefined ? percent : 0.5)
//         }
//     });
// 
//     function random() {
//         if (isArray(arguments[0])) {
//             var array = arguments[0];
//             return array[Math.randomInt(array.length)]
//         }
//         var nargs = arguments.length;
//         var lastArg = arguments[nargs - 1];
//         var val;
//         if (isFunction(lastArg)) {
//             nargs--;
//             val = lastArg()
//         } else val = Math.randomGenerator();
//         if (nargs == 1) val *= arguments[0];
//         else if (nargs == 2) {
//             var min = arguments[0];
//             var max = arguments[1];
//             val *= max - min;
//             val += min
//         }
//         return val
//     }
// 
//     function noise(x, y, z) {
//         if (noiseProfile.generator === undefined) noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
//         var generator = noiseProfile.generator;
//         var effect = 1,
//             k = 1,
//             sum = 0;
//         for (var i = 0; i < noiseProfile.octaves; ++i) {
//             effect *= noiseProfile.fallout;
//             switch (arguments.length) {
//                 case 1:
//                     sum += effect * (1 + generator.noise1d(k * x)) / 2;
//                     break;
//                 case 2:
//                     sum += effect * (1 + generator.noise2d(k * x, k * y)) / 2;
//                     break;
//                 case 3:
//                     sum += effect * (1 + generator.noise3d(k * x, k * y, k * z)) / 2;
//                     break
//             }
//             k *= 2
//         }
//         return sum
//     }
//     var noiseProfile = {
//         generator: undefined,
//         octaves: 4,
//         fallout: 0.5,
//         seed: undefined
//     };
// 
//     function Marsaglia(i1, i2) {
//         var z = i1 || 362436069,
//             w = i2 || 521288629;
//         var nextInt = function() {
//             z = 36969 * (z & 65535) + (z >>> 16) & 4294967295;
//             w = 18E3 * (w & 65535) + (w >>> 16) & 4294967295;
//             return ((z & 65535) << 16 | w & 65535) & 4294967295
//         };
//         this.nextDouble = function() {
//             var i = nextInt() / 4294967296;
//             return i < 0 ? 1 + i : i
//         };
//         this.nextInt = nextInt
//     }
//     Marsaglia.createRandomized = function() {
//         var now =
//             new Date;
//         return new Marsaglia(now / 6E4 & 4294967295, now & 4294967295)
//     };
// 
//     function PerlinNoise(seed) {
//         var rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized();
//         var i, j;
//         var p = new Array(512);
//         for (i = 0; i < 256; ++i) p[i] = i;
//         for (i = 0; i < 256; ++i) {
//             var t = p[j = rnd.nextInt() & 255];
//             p[j] = p[i];
//             p[i] = t
//         }
//         for (i = 0; i < 256; ++i) p[i + 256] = p[i];
// 
//         function grad3d(i, x, y, z) {
//             var h = i & 15;
//             var u = h < 8 ? x : y,
//                 v = h < 4 ? y : h === 12 || h === 14 ? x : z;
//             return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
//         }
// 
//         function grad2d(i, x, y) {
//             var v = (i & 1) === 0 ? x : y;
//             return (i & 2) === 0 ? -v : v
//         }
// 
//         function grad1d(i,
//             x) {
//             return (i & 1) === 0 ? -x : x
//         }
// 
//         function lerp(t, a, b) {
//             return a + t * (b - a)
//         }
//         this.noise3d = function(x, y, z) {
//             var X = Math.floor(x) & 255,
//                 Y = Math.floor(y) & 255,
//                 Z = Math.floor(z) & 255;
//             x -= Math.floor(x);
//             y -= Math.floor(y);
//             z -= Math.floor(z);
//             var fx = (3 - 2 * x) * x * x,
//                 fy = (3 - 2 * y) * y * y,
//                 fz = (3 - 2 * z) * z * z;
//             var p0 = p[X] + Y,
//                 p00 = p[p0] + Z,
//                 p01 = p[p0 + 1] + Z,
//                 p1 = p[X + 1] + Y,
//                 p10 = p[p1] + Z,
//                 p11 = p[p1 + 1] + Z;
//             return lerp(fz, lerp(fy, lerp(fx, grad3d(p[p00], x, y, z), grad3d(p[p10], x - 1, y, z)), lerp(fx, grad3d(p[p01], x, y - 1, z), grad3d(p[p11], x - 1, y - 1, z))), lerp(fy, lerp(fx, grad3d(p[p00 + 1], x,
//                 y, z - 1), grad3d(p[p10 + 1], x - 1, y, z - 1)), lerp(fx, grad3d(p[p01 + 1], x, y - 1, z - 1), grad3d(p[p11 + 1], x - 1, y - 1, z - 1))))
//         };
//         this.noise2d = function(x, y) {
//             var X = Math.floor(x) & 255,
//                 Y = Math.floor(y) & 255;
//             x -= Math.floor(x);
//             y -= Math.floor(y);
//             var fx = (3 - 2 * x) * x * x,
//                 fy = (3 - 2 * y) * y * y;
//             var p0 = p[X] + Y,
//                 p1 = p[X + 1] + Y;
//             return lerp(fy, lerp(fx, grad2d(p[p0], x, y), grad2d(p[p1], x - 1, y)), lerp(fx, grad2d(p[p0 + 1], x, y - 1), grad2d(p[p1 + 1], x - 1, y - 1)))
//         };
//         this.noise1d = function(x) {
//             var X = Math.floor(x) & 255;
//             x -= Math.floor(x);
//             var fx = (3 - 2 * x) * x * x;
//             return lerp(fx, grad1d(p[X], x),
//                 grad1d(p[X + 1], x - 1))
//         }
//     }
// 
//     function isArray(obj) {
//         return Object.prototype.toString.call(obj) === "[object Array]"
//     }
// 
//     function toArray(arr) {
//         return Array.prototype.slice.call(arr)
//     }
// 
//     function isFunction(functionToCheck) {
//         return functionToCheck && {}.toString.call(functionToCheck) == "[object Function]"
//     }
// 
//     function extend(obj, props) {
//         for (var i in props) obj[i] = props[i]
//     }
// })();
// var svg = {
//     NS: "http://www.w3.org/2000/svg",
//     createElement: function(type) {
//         return document.createElementNS(svg.NS, type)
//     },
//     setHref: function(element, href) {
//         element.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href)
//     },
//     create: function() {
//         var s = svg.createElement("svg");
//         s.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
//         return s
//     },
//     svgTextToSymbol: function(text, id) {
//         var symbol = svg.createElement("symbol");
//         symbol.innerHTML = text;
//         var doc = symbol.firstElementChild;
//         var w = parseInt(doc.getAttribute("width").replace(/px/gi, ""));
//         var h = parseInt(doc.getAttribute("height").replace(/px/gi, ""));
//         symbol.setAttribute("id", id);
//         symbol.setAttribute("width", w);
//         symbol.setAttribute("height", h);
//         symbol.setAttribute("viewBox", doc.getAttribute("viewBox"));
//         symbol.width = w;
//         symbol.height = h;
//         symbol.innerHTML = doc.innerHTML;
//         return symbol
//     },
//     createUse: function(id) {
//         var use = svg.createElement("use");
//         svg.setHref(use, "#" + id);
//         return use
//     }
// };
// (function(href) {
//     var url = window["url"] = {};
//     var h = href.indexOf("#");
//     var q = href.indexOf("?");
//     var search = h == -1 ? href.substring(q) : href.substring(q, h);
//     search.replace(/([^?=&]+)(=([^&]+))?/g, function($0, $1, $2, $3) {
//         url[$1] = decodeURIComponent($3)
//     });
//     url["hash"] = h == -1 ? undefined : href.substring(h + 1);
//     url["setUrl"] = arguments.callee;
//     url["defaults"] = {};
//     url["params"] = {};
// 
//     function pre(name, defaultValue) {
//         var d = defaultValue === undefined ? url.defaults[name] : defaultValue;
//         url.params[name] = d;
//         return d
//     }
//     url["boolean"] = function(name,
//         defaultValue) {
//         var d = pre(name, defaultValue);
//         if (!url.hasOwnProperty(name)) return d;
//         return url[name] !== "false"
//     };
//     url["number"] = function(name, defaultValue) {
//         var d = pre(name, defaultValue);
//         var r = parseFloat(url[name]);
//         if (r != r) return d;
//         return r
//     };
//     url["class"] = function(name, defaultValue) {
//         document.body.classList.toggle(name, url.boolean(name, defaultValue))
//     }
// })(location.href);
// TWEEN.__temp__ = {
//     t: 0
// };
// TWEEN.setTimeout = function(callback, delay) {
//     var stopped = false;
//     var t = (new TWEEN.Tween(TWEEN.__temp__)).to(TWEEN.__temp__).delay(delay).onStart(function() {
//         if (!stopped) callback()
//     });
//     t.start();
//     return {
//         stop: function() {
//             stopped = true;
//             t.stop()
//         }
//     }
// };
// TWEEN.clearTimeout = function(timeout) {
//     timeout && timeout.stop()
// };
// (function() {
//     var VENDOR_TRANSFORM = function() {
//         var el = document.createElement("p"),
//             transforms = {
//                 webkitTransform: 1,
//                 transform: 1
//             };
//         for (var t in transforms)
//             if (el.style[t] !== undefined) return t
//     }();
// 
//     function transformAttribute(x, y, z, sx, sy, r) {
//         z = z || 0;
//         r = r || 0;
//         sx = sx || 1;
//         sy = sy || 1;
//         tx = this.$transformOriginX || 0;
//         ty = this.$transformOriginY || 0;
//         this.setAttribute("transform", "translate(" + (x + tx) + " " + (y + ty) + ") scale(" + sx + " " + sy + ") rotate(" + r * 57.2957795 + ") translate(" + -tx + " " + -ty + ")")
//     }
// 
//     function transformOriginAttribute(x, y) {
//         this.$transformOriginX =
//             x;
//         this.$transformOriginY = y
//     }
// 
//     function transformStyle(x, y, z, sx, sy, r) {
//         z = z || 0;
//         r = r || 0;
//         sx = sx || 1;
//         sy = sy || 1;
//         this.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, 0) scale(" + sx + ", " + sy + ") rotate(" + r + "rad)"
//     }
// 
//     function transformOriginStyle(x, y) {
//         this.style.webkitTransformOrigin = x + "px " + y + "px"
//     }
//     SVGElement.prototype.$transform = VENDOR_TRANSFORM == "webkitTransform" ? transformStyle : transformAttribute;
//     SVGElement.prototype.$transformOrigin = VENDOR_TRANSFORM == "webkitTransform" ? transformOriginStyle : transformOriginAttribute
// })();
// var utils = {
//     clone: function(obj) {
//         return JSON.parse(JSON.stringify(obj))
//     },
//     lerpAll: function(output, a, b, t) {
//         for (var k in a) output[k] = Math.lerp(a[k], b[k], t)
//     }
// };
// var Detector = {
//     canvas: !!window.CanvasRenderingContext2D,
//     webgl: function() {
//         try {
//             var canvas = document.createElement("canvas");
//             return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
//         } catch (e) {
//             return false
//         }
//     }(),
//     workers: !!window.Worker,
//     fileapi: window.File && window.FileReader && window.FileList && window.Blob,
//     getWebGLErrorMessage: function() {
//         var element = document.createElement("div");
//         element.id = "webgl-error-message";
//         element.style.fontFamily = "monospace";
//         element.style.fontSize =
//             "13px";
//         element.style.fontWeight = "normal";
//         element.style.textAlign = "center";
//         element.style.background = "#fff";
//         element.style.color = "#000";
//         element.style.padding = "1.5em";
//         element.style.width = "400px";
//         element.style.margin = "5em auto 0";
//         if (!this.webgl) element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n") : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n");
//         return element
//     },
//     addGetWebGLMessage: function(parameters) {
//         var parent, id, element;
//         parameters = parameters || {};
//         parent = parameters.parent !== undefined ? parameters.parent : document.body;
//         id = parameters.id !== undefined ? parameters.id : "oldie";
//         element = Detector.getWebGLErrorMessage();
//         element.id = id;
//         parent.appendChild(element)
//     }
// };
// pointer.EVENTS = ["touch", "release", "tap", "singletap", "doubletap", "hold", "drag", "dragend", "dragstart", "enter", "leave", "move"];
// pointer.DEFAULTS = {
//     tapMoveThreshold: Math.pow(10, 2),
//     holdDuration: 600
// };
// 
// function pointer(ELEMENT, settings) {
//     settings = defaults(settings || {}, pointer.DEFAULTS);
//     var TOUCH = function() {
//         try {
//             document.createEvent("TouchEvent");
//             return true
//         } catch (e) {
//             return false
//         }
//     }();
// 
//     function normalize(e) {
//         if (e.touches) {
//             if (e.touches.length == 0) {
//                 e.x = 0;
//                 e.y = 0
//             } else {
//                 e.x = e.touches[0].clientX;
//                 e.y = e.touches[0].clientY
//             }
//             e.button = 0
//         } else {
//             e.x = e.clientX;
//             e.y = e.clientY
//         }
//     }
// 
//     function localized(func) {
//         return function(e) {
//             var box = ELEMENT.getBoundingClientRect();
//             normalize(e);
//             e.localX = e.x - box.left;
//             e.localY = e.y - box.top;
//             func(e)
//         }
//     }
// 
//     function bind(ev, listener, scope, element) {
//         element = element || ELEMENT;
//         element.addEventListener(ev, listener, false);
//         return function() {
//             element.removeEventListener(ev, listener, false)
//         }
//     }
// 
//     function bindDrag(ev, listener, scope) {
//         var px, py, sx, sy, unbindDrag, unbindDragEnd, dragStarted, box;
// 
//         function dragEnd(e) {
//             normalize(e);
//             if (ev == "dragend") listener.call(this, e);
//             unbindDrag();
//             unbindDragEnd()
//         }
//         bind(TOUCH ? "touchstart" : "mousedown", function(e) {
//             normalize(e);
//             box = ELEMENT.getBoundingClientRect();
//             e.preventDefault();
//             e.stopPropagation();
//             sx = px = e.x;
//             sy = py = e.y;
//             dragStarted = false;
//             unbindDrag = bind(TOUCH ? "touchmove" : "mousemove", function(e) {
//                 normalize(e);
//                 e.localX = e.x - box.left;
//                 e.localY = e.y - box.top;
//                 e.movementX = e.x - px;
//                 e.movementY = e.y - py;
//                 e.deltaX = e.x - sx;
//                 e.deltaY = e.y - sy;
//                 e.px = px;
//                 e.py = py;
//                 px = e.x;
//                 py = e.y;
//                 if (!dragStarted) {
//                     dragStarted = true;
//                     if (ev == "dragstart") listener.call(this, e)
//                 }
//                 if (ev == "drag") listener.call(this, e)
//             }, scope, window);
//             unbindDragEnd = bind(TOUCH ? "touchend" : "mouseup", dragEnd, scope, window);
//             return false
//         })
//     }
// 
//     function bindTap(ev, listener, scope) {
//         var unbindUp,
//             unbindMove, sx, sy, downAt, holdTimeout;
// 
//         function reset() {
//             clearTimeout(holdTimeout);
//             unbindUp && unbindUp();
//             unbindMove && unbindMove()
//         }
// 
//         function up(e) {
//             if (ev == "tap" && now() - downAt < settings.holdDuration) listener.call(this, e);
//             reset()
//         }
// 
//         function move(e) {
//             normalize(e);
//             if (distSquared(e.x, e.y, sx, sy) > settings.tapMoveThreshold) reset()
//         }
//         reset();
//         bind(TOUCH ? "touchstart" : "mousedown", function(e) {
//             normalize(e);
//             downAt = Date.now();
//             sx = e.x;
//             sy = e.y;
//             if (ev == "hold") holdTimeout = setTimeout(function() {
//                 listener.call(scope, e)
//             }, settings.holdDuration);
//             unbindUp = bind(TOUCH ? "touchend" : "mouseup", up, scope, window);
//             unbindMove = bind(TOUCH ? "touchmove" : "mousemove", move, scope, window)
//         }, scope)
//     }
// 
//     function defaults(obj, defaults) {
//         for (var i in defaults)
//             if (obj[i] === undefined) obj[i] = defaults[i];
//         return obj
//     }
// 
//     function now() {
//         return +new Date
//     }
// 
//     function distSquared(x1, y1, x2, y2) {
//         return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
//     }
//     return {
//         on: function(ev, listener, scope) {
//             scope = scope || ELEMENT;
//             switch (ev) {
//                 case "tap":
//                 case "singletap":
//                 case "hold":
//                     bindTap(ev, localized(listener), scope);
//                     break;
//                 case "doubletap":
//                     bind("dblclick",
//                         localized(listener), scope);
//                     break;
//                 case "drag":
//                 case "dragend":
//                 case "dragstart":
//                     bindDrag(ev, listener, scope);
//                     break;
//                 case "touch":
//                     bind(TOUCH ? "touchstart" : "mousedown", localized(listener), scope);
//                     break;
//                 case "move":
//                     bind(TOUCH ? "touchmove" : "mousemove", localized(listener), scope);
//                     break;
//                 case "release":
//                     bind(TOUCH ? "touchend" : "mouseup", localized(listener), scope);
//                     break;
//                 case "enter":
//                     bind(TOUCH ? "touchenter" : "mouseover", localized(listener), scope);
//                     break;
//                 case "leave":
//                     bind(TOUCH ? "touchleave" : "mouseout", localized(listener),
//                         scope);
//                     break
//             }
//             return this
//         }
//     }
// };
// _.each(pointer.EVENTS, function(ev) {
//     Ractive.eventDefinitions["x" + ev] = function(node, fire) {
//         node.pointer = node.pointer || pointer(node);
//         node.pointer.on(ev, function(e) {
//             e.node = node;
//             fire(e)
//         })
//     }
// });
// var Elastic = function() {
//     this.value = 0;
//     this.dest = 0;
//     this.velocity = 0;
//     this.strength = 0.43;
//     this.damping = 0.55;
//     this.epsilon = 0.0010;
//     this.onChange = function(value) {}
// };
// Elastic.prototype.update = function() {
//     this.force = -this.strength * (this.value - this.dest);
//     this.velocity += this.force;
//     this.velocity *= this.damping;
//     this.value += this.velocity;
//     if (Math.abs(this.value - this.prevValue) >= this.epsilon) this.onChange(this.value);
//     this.prevValue = this.value
// };
// 
// function Finger(container) {
//     var EMPTY = {};
//     get("images/fingeri.svg", function(svg) {
//         this.el = document.createElement("div");
//         this.el.innerHTML = svg;
//         this.left = false;
//         this.joints = this.el.querySelectorAll(".joint");
//         _.each(this.joints, function(j) {
//             j.origin = j.getAttribute("data-origin");
//             j.left = parseFloat(j.getAttribute("data-left"));
//             j.right = parseFloat(j.getAttribute("data-right"));
//             j.elastic = new Elastic;
//             j.elastic.strength = parseFloat(j.getAttribute("data-strength"));
//             j.elastic.damping = parseFloat(j.getAttribute("data-damping"));
//             j.elastic.onChange = function(rotation) {
//                 j.setAttribute("transform", "rotate(" + rotation + " " + j.origin + ")")
//             }
//         }, this);
//         container.appendChild(this.el);
//         _.each(this.joints, function(j, i) {
//             j.elastic.dest = j.elastic.value = j.right;
//             j.elastic.onChange(j.elastic.value)
//         }, this)
//     }, this)
// }
// Finger.prototype.setBPM = function(bpm) {
//     this.bpm = bpm
// };
// Finger.prototype.waggle = function() {
//     if (!this.el) return;
//     this.left = !this.left;
//     _.each(this.joints, function(j, i) {
//         j.elastic.dest = this.left ? j.left : j.right
//     }, this)
// };
// Finger.prototype.rest = function() {};
// Finger.prototype.update = function(millis) {
//     var beat = Math.floor(this.millis2beat(millis + 200));
//     if (beat != this.lastBeat) this.waggle();
//     _.each(this.joints, Finger.updateJoint);
//     this.lastBeat = beat
// };
// Finger.updateJoint = function(j) {
//     j.elastic.update()
// };
// Finger.prototype.millis2beat = function(millis) {
//     return this.bpm / 2 / 6E4 * millis
// };
// Background.LastColorA = "#FF0000";
// Background.LastColorB = "#0000FF";
// 
// function Background(options) {
//     this.symbols = options.symbols;
//     this.regions = options.regions;
//     this.width = 1280;
//     this.height = 800;
//     this.symbolWidth = 200;
//     this.el = svg.create();
//     this.defs = svg.createElement("defs");
//     this.el.appendChild(this.defs);
//     this.uses = [];
//     _.each(options.symbols, function(d) {
//         this.defs.appendChild(d);
//         var g = svg.createElement("g");
//         var u = svg.createUse(d.id);
//         g.style.webkitTransition = "all 3s cubic-bezier(0,1.4,0,1)";
//         u.setAttribute("width", this.symbolWidth);
//         u.setAttribute("height", this.symbolWidth);
//         u.$transformOrigin(this.symbolWidth /
//             2, this.symbolWidth / 2);
//         g.appendChild(u);
//         this.uses.push(g);
//         this.uses.push(g.cloneNode(true))
//     }, this);
//     _.each(this.uses, function(u) {
//         this.el.appendChild(u)
//     }, this);
//     this.el.setAttribute("viewBox", "0 0 " + this.width + " " + this.height);
//     this.lastPosition = 0;
//     this.scatter();
//     this.applyRegion(this.regions[0])
// }
// Background.prototype.scatter = function() {
//     this.uses = _.shuffle(this.uses);
//     _.each(this.uses, function(u) {
//         var s = Math.map(Math.pow(Math.random(), 3), 0, 1, 1, 7);
//         u.style.webkitTransitionDuration = Math.random(1) + "s";
//         u.$transform(Math.random(-200, this.width), Math.random(-200, this.height), 0, s, s, Math.randomRange(Math.PI / 4))
//     }, this)
// };
// Background.prototype.setColor = function(a, b) {
//     var _this = this;
//     recurse(this.defs);
// 
//     function recurse(d) {
//         _.each(d.childNodes, recurse);
//         if (!d.getAttribute) return;
//         if (d.getAttribute("fill") == Background.LastColorA || d.getAttribute("fill") == Background.LastColorA.toLowerCase()) d.setAttribute("fill", a);
//         else if (d.getAttribute("fill") == Background.LastColorB || d.getAttribute("fill") == Background.LastColorB.toLowerCase()) d.setAttribute("fill", b);
//         if (d.getAttribute("stroke") == Background.LastColorA || d.getAttribute("stroke") ==
//             Background.LastColorA.toLowerCase()) d.setAttribute("stroke", a);
//         else if (d.getAttribute("stroke") == Background.LastColorB || d.getAttribute("stroke") == Background.LastColorB.toLowerCase()) d.setAttribute("stroke", b)
//     }
//     Background.LastColorA = a;
//     Background.LastColorB = b
// };
// Background.prototype.update = function(position) {
//     var r1 = this.getRegion(position);
//     var r2 = this.getRegion(this.lastPosition);
//     this.lastPosition = position;
//     if (r1 != r2) {
//         this.scatter();
//         this.applyRegion(r1)
//     }
// };
// Background.prototype.getRegion = function(position) {
//     for (var i = 1, l = this.regions.length; i < l; i++)
//         if (position < this.regions[i][0]) return this.regions[i - 1];
//     return this.regions[this.regions.length - 1]
// };
// Background.prototype.applyRegion = function(region) {
//     stage.style.background = region[1];
//     this.setColor(region[1], region[2])
// };
// 
// function Dialogue(container) {
//     this.container = container;
//     this.timeToLines = [];
//     _.each(this.container.children, function(c) {
//         c.start = parseFloat(c.getAttribute("data-start"));
//         c.end = parseFloat(c.getAttribute("data-end"));
//         this.timeToLines.push(c)
//     }, this);
//     this.timeToLines.sort(function(a, b) {
//         return a.start - b.start
//     })
// }
// Dialogue.prototype.show = function(position) {};
// Dialogue.prototype.hide = function() {
//     if (this.lastLine) this.lastLine.classList.remove("showing")
// };
// Dialogue.prototype.update = function(position) {
//     var currentLine;
//     _.each(this.timeToLines, function(line) {
//         if (position >= line.start && position <= line.end) currentLine = line
//     });
//     if (currentLine != this.lastLine) {
//         if (currentLine) currentLine.classList.add("showing");
//         if (this.lastLine) this.lastLine.classList.remove("showing")
//     }
//     this.lastLine = currentLine
// };
// 
// function Video(options) {
//     this.slug = options.slug;
//     Video[options.slug] = this;
//     this.deps = options.deps || {};
//     this._teardown = options.teardown || function() {};
//     this._start = options.start || function(container, callback) {
//         callback()
//     };
//     this._setPosition = options.setPosition || function() {};
//     this._loop = options.loop;
//     this._resize = options.resize;
//     this._canPlay = options.canPlay || function() {
//         return true
//     };
//     _.extend(this, options.methods || {});
//     this.smoothPosition = true;
//     this.maxSmooth = 300;
//     this.offset = options.offset;
//     this.lastPosition = this.position =
//         0;
//     this.started = false
// }
// Video.prototype.start = function(container, forcePlayback, success, failure) {
//     if (!forcePlayback) {
//         var canPlay = this._canPlay();
//         if (canPlay !== true) {
//             failure(canPlay);
//             return
//         }
//     }
//     var _this = this;
//     var count = 0;
//     count += this.player ? 0 : 1;
//     count += countStrings(this.deps);
//     var loaded = _.after(count, function() {
//         _this.depsLoaded = true;
//         if (_this._resize) window.removeEventListener("resize", this._resize, false);
//         start()
//     });
//     container.className = this.slug;
//     if (!this.player) {
//         this.player = new midi.Player("mid/" + this.slug + ".mid");
//         this.player.load(loaded)
//     }
//     if (this.depsLoaded) start();
//     else _.each(this.deps, function(paths, dict) {
//         this.deps[dict] = {};
//         _.each(paths, function(path, key) {
//             get(path, function(text) {
//                 _this.deps[dict][key] = text;
//                 loaded()
//             })
//         })
//     }, this);
// 
//     function start() {
//         _this._start(container, function() {
//             _this.started = true;
//             success()
//         })
//     }
// 
//     function countStrings(obj) {
//         var count = 0;
//         _.each(obj, function(dict, key) {
//             count += _.keys(dict).length
//         });
//         return count
//     }
// };
// Video.prototype.update = function(sourcePosition) {
//     sourcePosition = sourcePosition || 0;
//     this.lastTime = this.time;
//     this.time = Date.now();
//     if (sourcePosition != this.lastPosition) this.position = sourcePosition;
//     else if (this.smoothPosition) {
//         this.position += this.time - this.lastTime;
//         this.position = Math.min(this.position, sourcePosition + this.maxSmooth)
//     }
//     this.lastPosition = sourcePosition;
//     this.player.update(this.position - this.offset)
// };
// Video.prototype.loop = function() {
//     this.started && this._loop && this._loop(this.position, this.lastPosition)
// };
// Video.prototype.setPosition = function(position) {
//     this._loop && this.loop(position, this.lastPosition);
//     this._setPosition(position, this.lastPosition);
//     this.lastTime = this.time = Date.now();
//     this.player.setPosition(position)
// };
// Video.prototype.play = function() {
//     this.lastTime = this.time = Date.now();
//     if (this.player) this.player.play()
// };
// Video.prototype.pause = function() {
//     if (this.player) this.player.pause()
// };
// Video.prototype.teardown = function(container) {
//     this.lastPosition = this.position = 0;
//     this.pause();
//     this._teardown(container);
//     this.started = false;
//     if (this._resize) window.removeEventListener("resize", this._resize, false)
// };
// PianoRollGeometry.TIME_SCALE = 0.016;
// PianoRollGeometry.NOTE_HEIGHT = -60;
// PianoRollGeometry.SCORE_WIDTH = 140;
// PianoRollGeometry.SCORE_OFFSET = 16;
// PianoRollGeometry.x = function(time) {
//     return time * PianoRollGeometry.TIME_SCALE
// };
// PianoRollGeometry.y = function(note) {
//     return note + PianoRollGeometry.NOTE_HEIGHT
// };
// PianoRollGeometry.z = function(track, numTracks) {
//     return -Math.map(track, 0, numTracks - 1, PianoRollGeometry.SCORE_WIDTH / 2 + PianoRollGeometry.SCORE_OFFSET, -PianoRollGeometry.SCORE_WIDTH / 2 + PianoRollGeometry.SCORE_OFFSET)
// };
// 
// function PianoRollGeometry(bpm, numTracks, notesByTrack, bendsByTrack, colors) {
//     THREE.BufferGeometry.call(this);
//     var numFaces = 0;
//     _.each(notesByTrack, function(notes, trackIndex) {
//         for (var i = 0, l = notes.length; i < l; i++) {
//             var note = notes[i];
//             var prev = notes[i - 1];
//             var porta = getBendBefore(trackIndex, note.start);
//             if (i == 0 || prev.end != note.start) {
//                 numFaces += 12;
//                 continue
//             }
//             var bendLength = 60 / bpm * 1E3 * porta / 480;
//             if (bendLength >= note.dur) numFaces += 12;
//             else numFaces += 24
//         }
//     });
//     numFaces *= 2;
//     var scope = this;
//     var attribs = this.attributes = {
//         position: {
//             i: 0,
//             itemSize: 3,
//             array: new Float32Array(numFaces * 3 * 3)
//         },
//         normal: {
//             i: 0,
//             itemSize: 3,
//             array: new Float32Array(numFaces * 3 * 3)
//         },
//         bounds: {
//             i: 0,
//             itemSize: 2,
//             array: new Float32Array(numFaces * 2 * 3)
//         },
//         color: {
//             i: 0,
//             itemSize: 3,
//             array: new Float32Array(numFaces * 3 * 3)
//         }
//     };
//     _.each(notesByTrack, function(notes, trackIndex) {
//         for (var i = 0, l = notes.length; i < l; i++) {
//             var note = notes[i];
//             var prev = notes[i - 1];
//             var next = notes[i + 1];
//             var porta = getBendBefore(trackIndex, note.start);
//             var gap = next && note.end !== next.start;
//             if (i == 0 || prev.end != note.start) {
//                 makeBox(colors[note.velocity],
//                     trackIndex, note.start, note.end, note.note, note.note, gap);
//                 continue
//             }
//             var bendLength = 60 / bpm * 1E3 * porta / 480;
//             if (bendLength >= note.dur) {
//                 var end = Math.map(note.dur, 0, bendLength, prev.note, note.note);
//                 makeBox(colors[note.velocity], trackIndex, note.start, note.end, prev.note, end, gap)
//             } else {
//                 var joint = note.start + bendLength;
//                 makeBox(colors[note.velocity], trackIndex, note.start, joint, prev.note, note.note);
//                 makeBox(colors[note.velocity], trackIndex, joint, note.end, note.note, note.note, gap)
//             }
//         }
//     });
//     this.computeBoundingSphere();
// 
//     function combineBits(bend) {
//         return bend.highValue <<
//             7 | bend.lowValue
//     }
// 
//     function getBendBefore(track, pos) {
//         var bendList = bendsByTrack[track];
//         if (bendList === undefined || bendList.length == 0) return 0;
//         for (var i = 0, l = bendList.length; i < l; i++) {
//             var bend = bendList[i];
//             if (bend.playTime == pos) return combineBits(bend);
//             if (bend.playTime > pos && i > 0) return combineBits(bendList[i - 1])
//         }
//         return 0
//     }
// 
//     function makeBox(color, track, start, end, noteStart, noteEnd, gap) {
//         if (noteEnd == undefined) noteEnd = noteStart;
//         var bounds = {
//             x: start,
//             y: end
//         };
//         var dur = end - start;
//         if (gap) dur = Math.max(0, dur - 25);
//         var height = 1;
//         var depth = 1;
//         var width = PianoRollGeometry.x(dur);
//         var x = PianoRollGeometry.x(start + dur / 2);
//         var y1 = PianoRollGeometry.y(noteStart);
//         var y2 = PianoRollGeometry.y(noteEnd);
//         var z = PianoRollGeometry.z(track, numTracks);
//         var v0 = new THREE.Vector3(x - width / 2, y1 - height / 2, z - depth / 2);
//         var v1 = new THREE.Vector3(x + width / 2, y2 - height / 2, z - depth / 2);
//         var v2 = new THREE.Vector3(x + width / 2, y2 - height / 2, z + depth / 2);
//         var v3 = new THREE.Vector3(x - width / 2, y1 - height / 2, z + depth / 2);
//         var v4 = new THREE.Vector3(x - width / 2, y1 + height / 2, z - depth / 2);
//         var v5 = new THREE.Vector3(x +
//             width / 2, y2 + height / 2, z - depth / 2);
//         var v6 = new THREE.Vector3(x + width / 2, y2 + height / 2, z + depth / 2);
//         var v7 = new THREE.Vector3(x - width / 2, y1 + height / 2, z + depth / 2);
//         makeFace(v0, v1, v2, 0, 1, 0);
//         makeFace(v2, v3, v0, 0, 1, 0);
//         makeFace(v6, v5, v4, 0, -1, 0);
//         makeFace(v4, v7, v6, 0, -1, 0);
//         makeFace(v0, v3, v7, 1, 0, 0);
//         makeFace(v7, v4, v0, 1, 0, 0);
//         makeFace(v2, v1, v5, -1, 0, 0);
//         makeFace(v5, v6, v2, -1, 0, 0);
//         makeFace(v3, v2, v6, 0, 0, 1);
//         makeFace(v6, v7, v3, 0, 0, 1);
//         makeFace(v1, v0, v4, 0, 0, -1);
//         makeFace(v4, v5, v1, 0, 0, -1);
// 
//         function makeFace(a, b, c, nx, ny, nz) {
//             attribs.position.array[attribs.position.i++] =
//                 a.x;
//             attribs.position.array[attribs.position.i++] = a.y;
//             attribs.position.array[attribs.position.i++] = a.z;
//             attribs.position.array[attribs.position.i++] = b.x;
//             attribs.position.array[attribs.position.i++] = b.y;
//             attribs.position.array[attribs.position.i++] = b.z;
//             attribs.position.array[attribs.position.i++] = c.x;
//             attribs.position.array[attribs.position.i++] = c.y;
//             attribs.position.array[attribs.position.i++] = c.z;
//             for (var j = 0; j < 3; j++) {
//                 attribs.normal.array[attribs.normal.i++] = nx;
//                 attribs.normal.array[attribs.normal.i++] =
//                     ny;
//                 attribs.normal.array[attribs.normal.i++] = nz;
//                 attribs.color.array[attribs.color.i++] = color.x;
//                 attribs.color.array[attribs.color.i++] = color.y;
//                 attribs.color.array[attribs.color.i++] = color.z;
//                 attribs.bounds.array[attribs.bounds.i++] = bounds.x;
//                 attribs.bounds.array[attribs.bounds.i++] = bounds.y
//             }
//         }
//     }
// }
// PianoRollGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
// PianoRollVideo.SCALE = 30;
// PianoRollVideo.OFFSET = url.number("offset", -200);
// 
// function PianoRollVideo(slug, bpm, fingerBpm, opts) {
//     opts = opts || {};
//     var EMPTY = {};
//     var FLOOR = 1E3;
//     var colors = [];
//     while (colors.length < 127) colors.push(new THREE.Vector3(Math.random(0.5, 1), Math.random(0.3, 1), Math.random(0.5, 1)));
//     var cameraNeedsUpdate = false;
//     var minTheta = -Math.PI / 2;
//     var maxTheta = 0;
//     var minPhi = Math.PI / 2 - Math.PI / 4;
//     var maxPhi = Math.PI / 2 + Math.PI / 40;
//     var depthSuspended = false;
//     var thetaAccel = 0;
//     var phiAccel = -2E-4 / 8;
//     var thetaVel = 0;
//     var phiVel = 0;
//     var maxVel = 6E-4;
//     var camera, scene, renderer, controls;
//     var geometry,
//         material, mesh, object;
//     var floor, stars;
//     var uniforms = {
//         playhead: {
//             type: "f",
//             value: 0
//         }
//     };
//     var lastPosition;
//     var resize;
//     var particles;
//     var tweening = false;
//     var cameraTween;
//     var cameraPresets = [{
//         position: {
//             x: -2965.8590458155036,
//             y: 2235.5054451015108,
//             z: 3467.8805523319147
//         },
//         rotation: {
//             x: -0.5725920499272357,
//             y: -0.6232494536532424,
//             z: -0.35987178331501773
//         }
//     }, {
//         position: {
//             x: 0,
//             y: 1E4,
//             z: 0
//         },
//         rotation: {
//             x: -Math.HALF_PI,
//             y: 0,
//             z: 0
//         }
//     }, {
//         position: {
//             x: 4952.937923945333,
//             y: -75.39736997065991,
//             z: 1132.5728047255002
//         },
//         rotation: {
//             x: 0.06647368377615936,
//             y: 1.345513565303963,
//             z: -0.06479871684945059
//         }
//     }, {
//         position: {
//             x: 0,
//             y: 0,
//             z: 5080
//         },
//         rotation: {
//             x: 0,
//             y: 0,
//             z: 0
//         }
//     }];
//     var heavenPreset = {
//         position: {
//             x: -3403.9172412110474,
//             y: 2101.353999906835,
//             z: 4036.8047358695467
//         },
//         rotation: {
//             x: -0.4799512237452751,
//             _y: -0.6421887695903379,
//             _z: -0.3022310914885656
//         }
//     };
//     var cameraTarget;
//     var cameraStart = {
//         position: new THREE.Vector3,
//         rotation: new THREE.Vector3,
//         fov: 0
//     };
//     var prevScroll = 0;
//     var PRESET_SCROLL_FADE = 200;
//     var AUTO_PILOT_TIME = 15E3;
//     var onscroll, onresize;
//     var autoPilot = true;
//     var autoPilotInterval;
// 
//     function resetAutoPilot(reschedule) {
//         thetaVel =
//             0;
//         phiVel = 0;
//         clearTimeout(autoPilotInterval);
//         if (reschedule) autoPilotInterval = setTimeout(function() {
//             autoPilot = true
//         }, AUTO_PILOT_TIME)
//     }
//     return new Video({
//         slug: slug,
//         deps: {
//             noteShader: {
//                 "vs": "shaders/pianoroll.vs",
//                 "fs": "shaders/pianoroll.fs"
//             },
//             floorShader: {
//                 "vs": "shaders/floor.vs",
//                 "fs": "shaders/floor.fs"
//             },
//             particleShader: {
//                 "vs": "shaders/particles.vs",
//                 "fs": "shaders/particles.fs"
//             },
//             templates: {
//                 "camera": "camera.html"
//             }
//         },
//         canPlay: function() {
//             if (!Detector.webgl) return "webgl";
//             else return true
//         },
//         setPosition: function(p) {
//             cameraNeedsUpdate =
//                 true;
//             this.loop(p);
//             particles.killAll()
//         },
//         offset: PianoRollVideo.OFFSET,
//         start: function(container, callback) {
//             this.buildScene(container);
//             this.buildEnvironment();
//             particles = new PianoRollParticles(bpm, this.deps.particleShader.vs, this.deps.particleShader.fs);
//             scene.add(particles.object);
//             this.buildNotes();
//             resize = THREEx.WindowResize(renderer, camera);
//             cameraTween = new TWEEN.Tween(EMPTY);
//             opts.start && opts.start();
//             var presetContainer = document.createElement("div");
//             presetContainer.id = "camera-presets";
//             if (slug != "heaven") container.appendChild(presetContainer);
//             var _this = this;
//             var p = new Ractive({
//                 el: presetContainer,
//                 template: this.deps.templates.camera,
//                 data: {
//                     presets: cameraPresets
//                 }
//             });
//             p.on("setPreset", function(e) {
//                 resetAutoPilot(false);
//                 if (e.keypath == "presets.1") depthSuspended = true;
//                 _this.tweenCamera(e.context)
//             });
//             onscroll = function() {
//                 if (document.body.scrollTop > PRESET_SCROLL_FADE && prevScroll <= PRESET_SCROLL_FADE) presetContainer.style.opacity = 0;
//                 else if (document.body.scrollTop < PRESET_SCROLL_FADE && prevScroll >= PRESET_SCROLL_FADE) presetContainer.style.opacity = 1;
//                 prevScroll =
//                     document.body.scrollTop
//             };
//             onresize = function() {
//                 if (!iii.ractive.data.playing) {
//                     cameraNeedsUpdate = true;
//                     _this.loop()
//                 }
//             };
//             window.addEventListener("resize", onresize, false);
//             window.addEventListener("scroll", onscroll, false);
//             callback()
//         },
//         resize: function() {},
//         loop: function(position) {
//             if (position !== undefined && position == lastPosition && !cameraNeedsUpdate) return;
//             cameraNeedsUpdate = false;
//             position = position || lastPosition;
//             var playhead = PianoRollVideo.OFFSET - position;
//             if (mesh) {
//                 uniforms.playhead.value = -playhead;
//                 mesh.position.x =
//                     playhead * PianoRollGeometry.TIME_SCALE * PianoRollVideo.SCALE
//             }
//             particles.object.position.x = playhead * PianoRollGeometry.TIME_SCALE * PianoRollVideo.SCALE;
//             if (controls && !tweening) {
//                 controls.update();
//                 if (slug == "heaven") {
//                     camera.position.normalize();
//                     camera.position.multiplyScalar(Math.cmap(TWEEN.Easing.Quadratic.InOut(Math.min(position || 0, 55E3) / 55E3), 0, 1, 80024, 5080))
//                 } else if (!depthSuspended) {
//                     var dist = camera.position.length();
//                     if (dist > 5080) {
//                         camera.position.normalize();
//                         camera.position.multiplyScalar((dist - 5080) * 0.95 +
//                             5080)
//                     }
//                 }
//             }
//             floor.material.uniforms.offset.value = playhead * PianoRollGeometry.TIME_SCALE * PianoRollVideo.SCALE;
//             stars.rotation.z = position / 4E5;
//             position != lastPosition && particles.update(position - PianoRollVideo.OFFSET);
//             renderer.render(scene, camera);
//             lastPosition = position;
//             opts.loop && opts.loop(position)
//         },
//         teardown: function(container) {
//             if (geometry) geometry.dispose();
//             if (material) material.dispose();
//             if (particles) particles.dispose();
//             if (resize) resize.stop();
//             container.classList.remove("grabbable");
//             container.innerHTML = "";
//             window.removeEventListener("resize", onresize, false);
//             window.removeEventListener("scroll", onscroll, false);
//             opts.teardown && opts.teardown(container)
//         },
//         methods: {
//             tweenCamera: function(preset) {
//                 cameraStart.position.copy(camera.position);
//                 cameraStart.rotation.copy(camera.rotation);
//                 cameraStart.fov = camera.fov;
//                 cameraTween.to(EMPTY, 1E3).onUpdate(function(t) {
//                     camera.position.x = Math.lerp(cameraStart.position.x, preset.position.x, t);
//                     camera.position.y = Math.lerp(cameraStart.position.y, preset.position.y, t);
//                     camera.position.z =
//                         Math.lerp(cameraStart.position.z, preset.position.z, t);
//                     camera.rotation.x = Math.lerp(cameraStart.rotation.x, preset.rotation.x, t);
//                     camera.rotation.y = Math.lerp(cameraStart.rotation.y, preset.rotation.y, t);
//                     camera.rotation.z = Math.lerp(cameraStart.rotation.z, preset.rotation.z, t);
//                     cameraNeedsUpdate = true
//                 }).easing(TWEEN.Easing.Cubic.Out).onStart(function() {
//                     tweening = true
//                 }).onComplete(function() {
//                     tweening = false
//                 }).start()
//             },
//             applyCamera: function(preset) {
//                 camera.position.copy(preset.position);
//                 camera.updateProjectionMatrix()
//             },
//             buildScene: function(container) {
//                 window.camera = camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1E5);
//                 if (slug == "heaven") this.applyCamera(heavenPreset);
//                 else this.applyCamera(cameraPresets[0]);
//                 if (!PianoRollVideo.renderer) {
//                     renderer = PianoRollVideo.renderer = new THREE.WebGLRenderer({
//                         antialias: false,
//                         alpha: false
//                     });
//                     renderer.setSize(window.innerWidth, window.innerHeight);
//                     renderer.setClearColor(1510703, 1);
//                     renderer.sortObjects = false
//                 } else renderer = PianoRollVideo.renderer;
//                 window.controls =
//                     controls = new THREE.OrbitControls(camera, container);
//                 container.classList.add("grabbable");
//                 controls.addEventListener("change", function() {
//                     cameraNeedsUpdate = true;
//                     depthSuspended = false
//                 });
//                 scene = new THREE.Scene;
//                 container.appendChild(renderer.domElement)
//             },
//             buildEnvironment: function() {
//                 var particleCount = 2E3,
//                     pGeometry = new THREE.Geometry,
//                     pMaterial = new THREE.ParticleSystemMaterial({
//                         color: 16777215,
//                         size: 1,
//                         sizeAttenuation: false
//                     });
//                 for (var p = 0; p < particleCount; p++) {
//                     var pX = Math.randomRange(5E4),
//                         pY = Math.randomRange(5E4),
//                         pZ = Math.randomRange(5E4);
//                     particle = new THREE.Vector3(pX, pY, pZ);
//                     pGeometry.vertices.push(particle)
//                 }
//                 stars = new THREE.ParticleSystem(pGeometry, pMaterial);
//                 scene.add(stars);
//                 var planeDivisions = 50;
//                 var planeSize = 2 * planeDivisions * 1 / fingerBpm * 6E4 * PianoRollGeometry.TIME_SCALE * PianoRollVideo.SCALE;
//                 var floorUniforms = {
//                     offset: {
//                         type: "f",
//                         value: 0
//                     },
//                     gridSize: {
//                         type: "f",
//                         value: planeSize / planeDivisions
//                     }
//                 };
//                 var floorGeometry = new THREE.PlaneGeometry(planeSize, planeSize, planeDivisions, planeDivisions);
//                 var floorMaterial = new THREE.ShaderMaterial({
//                     vertexShader: this.deps.floorShader.vs,
//                     fragmentShader: this.deps.floorShader.fs,
//                     uniforms: floorUniforms,
//                     depthWrite: false,
//                     depthTest: false,
//                     transparent: true,
//                     wireframe: true,
//                     wireframeLinewidth: 1,
//                     blending: THREE.AdditiveBlending
//                 });
//                 floor = new THREE.Mesh(floorGeometry, floorMaterial);
//                 floor.rotation.x = -Math.HALF_PI;
//                 floor.position.y = -FLOOR;
//                 scene.add(floor)
//             },
//             buildNotes: function() {
//                 var onsAndOffsByTrack = {};
//                 var bendsByTrack = {};
//                 var notesByTrack = {};
//                 _.each(this.player.events, function(e) {
//                     if (e.type == "pitchBend") {
//                         bendsByTrack[e.track] = bendsByTrack[e.track] || [];
//                         bendsByTrack[e.track].push(e)
//                     }
//                     if (e.type == "noteOff" || e.type == "noteOn") {
//                         onsAndOffsByTrack[e.track] = onsAndOffsByTrack[e.track] || [];
//                         onsAndOffsByTrack[e.track].push(e)
//                     }
//                 });
//                 _.each(onsAndOffsByTrack, function(onsAndOffs, trackIndex) {
//                     var isOn = {};
//                     var onAt = {};
//                     var notes = notesByTrack[trackIndex] = [];
//                     _.each(onsAndOffs, function(e) {
//                         if (!isOn[e.note] && e.type == "noteOn") {
//                             isOn[e.note] = true;
//                             onAt[e.note] = e.playTime;
//                             return
//                         }
//                         if (isOn[e.note] && e.type == "noteOff") {
//                             isOn[e.note] = false;
//                             notes.push({
//                                 note: e.note,
//                                 velocity: e.velocity,
//                                 start: onAt[e.note],
//                                 end: e.playTime,
//                                 dur: e.playTime - onAt[e.note]
//                             })
//                         }
//                     })
//                 });
//                 var keys = _.keys(notesByTrack);
//                 var numTracks = parseInt(keys[keys.length - 1]) + 1;
//                 particles.numTracks = numTracks;
//                 particles.colors = colors;
//                 geometry = new PianoRollGeometry(bpm, numTracks, notesByTrack, bendsByTrack, colors);
//                 material = new THREE.ShaderMaterial({
//                     vertexShader: this.deps.noteShader.vs,
//                     fragmentShader: this.deps.noteShader.fs,
//                     attributes: geometry.attributes,
//                     uniforms: uniforms,
//                     transparent: true,
//                     wireframe: true
//                 });
//                 mesh = new THREE.Mesh(geometry, material);
//                 mesh.scale.multiplyScalar(PianoRollVideo.SCALE);
//                 scene.add(mesh)
//             }
//         }
//     })
// };
// PianoRollParticles.COUNT = 200;
// 
// function PianoRollParticles(bpm, vs, fs) {
//     var sprite = THREE.ImageUtils.loadTexture("images/flare.png");
//     var nextParticleIndex = 0;
//     var particles = [];
//     var geometry = new THREE.Geometry;
//     var material = new THREE.ShaderMaterial({
//         vertexShader: vs,
//         fragmentShader: fs,
//         attributes: {
//             "color": {
//                 type: "v3",
//                 value: []
//             },
//             "size": {
//                 type: "f",
//                 value: []
//             }
//         },
//         uniforms: {
//             "map": {
//                 type: "t",
//                 value: sprite
//             },
//             "pixelRatio": {
//                 type: "f",
//                 value: window.devicePixelRatio || 1
//             }
//         },
//         depthTest: false,
//         transparent: true,
//         blending: THREE.AdditiveBlending
//     });
//     var position = 0;
//     var noteByTrack = {};
//     var prevNoteByTrack = {};
//     var endNoteByTrack = {};
//     var portaByTrack = {};
//     var bendLengthByTrack = {};
//     for (var i = 0; i < PianoRollParticles.COUNT; i++) particles.push(new Particle(i));
//     this.numTracks = 0;
//     this.colors = [];
//     this.object = new THREE.ParticleSystem(geometry, material);
//     this.object.scale.multiplyScalar(PianoRollVideo.SCALE);
//     this.object.sortParticles = false;
//     midi.on({
//         type: "pitchBend"
//     }, function(decoded, e) {
//         bendLengthByTrack[e.track] = 60 / bpm * 1E3 * (e.highValue << 7 | e.lowValue) / 480
//     }, this);
//     midi.on({
//         type: "noteOn"
//     }, function(decoded,
//         e) {
//         e.color = this.colors[e.velocity];
//         e.numTracks = this.numTracks;
//         var prev = prevNoteByTrack[e.track];
//         var cur = e;
//         if (!prev || prev.playTime != cur.playTime) {
//             noteByTrack[e.track] = cur;
//             endNoteByTrack[e.track] = undefined;
//             spawn(PianoRollGeometry.x(e.playTime), PianoRollGeometry.y(e.note), PianoRollGeometry.z(e.track, e.numTracks), e.color);
//             spawn(PianoRollGeometry.x(e.playTime), PianoRollGeometry.y(e.note), PianoRollGeometry.z(e.track, e.numTracks), e.color);
//             spawn(PianoRollGeometry.x(e.playTime), PianoRollGeometry.y(e.note),
//                 PianoRollGeometry.z(e.track, e.numTracks), e.color);
//             spawn(PianoRollGeometry.x(e.playTime), PianoRollGeometry.y(e.note), PianoRollGeometry.z(e.track, e.numTracks), e.color);
//             spawn(PianoRollGeometry.x(e.playTime), PianoRollGeometry.y(e.note), PianoRollGeometry.z(e.track, e.numTracks), e.color)
//         } else {
//             noteByTrack[e.track] = prev;
//             endNoteByTrack[e.track] = cur.note
//         }
//         prevNoteByTrack[e.track] = undefined
//     }, this);
//     this.dispose = midi.on({
//         type: "noteOff"
//     }, function(decoded, e) {
//         e.color = this.colors[e.velocity];
//         e.numTracks = this.numTracks;
//         prevNoteByTrack[e.track] = e;
//         noteByTrack[e.track] = undefined;
//         endNoteByTrack[e.track] = undefined
//     }, this).off;
//     var i = 0;
//     this.update = function(_p) {
//         position = _p;
//         i++;
//         if (i % 3 != 0) _.each(noteByTrack, updateTrack);
//         _.each(particles, update);
//         geometry.verticesNeedUpdate = true
//     };
//     this.killAll = function() {
//         _.each(particles, kill);
//         _.each(noteByTrack, function(e, k) {
//             noteByTrack[k] = undefined
//         })
//     };
// 
//     function spawn(x, y, z, color) {
//         var p = particles[nextParticleIndex];
//         p.init(x + Math.randomRange(0.5), y + Math.randomRange(0.5), z + Math.randomRange(0.5),
//             color);
//         nextParticleIndex++;
//         nextParticleIndex %= particles.length
//     }
// 
//     function update(p) {
//         p.update()
//     }
// 
//     function kill(p) {
//         p.kill()
//     }
// 
//     function updateTrack(e, trackIndex) {
//         if (e != undefined) {
//             var x, y, z;
//             x = PianoRollGeometry.x(position);
//             if (!endNoteByTrack[e.track]) y = PianoRollGeometry.y(e.note);
//             else {
//                 var end = e.playTime + bendLengthByTrack[e.track];
//                 var note;
//                 if (end == e.playTime) note = endNoteByTrack[e.track];
//                 else note = Math.cmap(position, e.playTime, end, e.note, endNoteByTrack[e.track]);
//                 y = PianoRollGeometry.y(note)
//             }
//             z = PianoRollGeometry.z(e.track,
//                 e.numTracks);
//             spawn(x, y, z, e.color)
//         }
//     }
// 
//     function Particle(index) {
//         var alive = false;
//         var vertex = new THREE.Vector3(0, Math.random() * 200, 0);
//         var color = new THREE.Vector3(1, 1, 1);
//         material.attributes.size.value.push(0);
//         material.attributes.color.value.push(color);
//         geometry.vertices.push(vertex);
//         var gravity = 0;
//         var age = 0;
//         var velocity = new THREE.Vector3;
//         this.init = function(x, y, z, _color) {
//             age = 0;
//             velocity.x = Math.random(2, 3);
//             velocity.y = Math.randomRange(1);
//             velocity.z = Math.randomRange(1);
//             velocity.multiplyScalar(iii.params.pianoRollParticleVelocity);
//             vertex.x = x;
//             vertex.y = y;
//             vertex.z = z;
//             alive = true;
//             gravity = iii.params.pianoRollParticleGravity;
//             material.attributes.size.value[index] = iii.params.pianoRollParticleInitialSize;
//             color.copy(_color);
//             material.attributes.color.needsUpdate = true
//         };
//         this.update = function() {
//             if (!alive) return;
//             material.attributes.size.value[index] *= iii.params.pianoRollParticleDecay;
//             material.attributes.size.needsUpdate = true;
//             vertex.addVectors(vertex, velocity);
//             velocity.multiplyScalar(iii.params.pianoRollParticleDrag);
//             velocity.y += gravity;
//             age++;
//             if (age > iii.params.pianoRollParticleLifeSpan) {
//                 material.attributes.size.value[index] = 0;
//                 alive = false
//             }
//         };
//         this.kill = function() {
//             alive = false;
//             material.attributes.size.value[index] = 0;
//             material.attributes.size.needsUpdate = true
//         }
//     }
// };
// Noodle.all = [];
// 
// function Noodle(options) {
//     options = _.defaults(options, {
//         offTime: 200
//     });
//     this.height = options.height;
//     this.id = Noodle.all.length;
//     Noodle.all.push(this);
//     this.el = svg.createElement("g");
//     this.el.$transform(options.x, options.y);
//     this.hole = svg.createElement("ellipse");
//     this.hole.setAttribute("rx", options.holeSize / 2);
//     this.hole.setAttribute("ry", options.holeSize / 4);
//     this.hole.setAttribute("fill", "#3a3835");
//     this.clipID = "noodle-clip-" + this.id;
//     this.clip = svg.createElement("clipPath");
//     this.clip.setAttribute("id", this.clipID);
//     this.clipHole = svg.createElement("ellipse");
//     this.clipHole.setAttribute("rx", options.holeSize / 2);
//     this.clipHole.setAttribute("ry", options.holeSize / 4);
//     this.clipRect = svg.createElement("rect");
//     this.clipRect.setAttribute("x", -this.height);
//     this.clipRect.setAttribute("y", -this.height * 2 - 2);
//     this.clipRect.setAttribute("width", this.height * 2);
//     this.clipRect.setAttribute("height", this.height * 2);
//     this.clip.appendChild(this.clipHole);
//     this.clip.appendChild(this.clipRect);
//     this.bodyWrapper = svg.createElement("g");
//     this.bodyWrapper.setAttribute("clip-path",
//         "url(#" + this.clipID + ")");
//     this.offHeight = options.holeSize / 4 + 5;
//     this.body = svg.createElement("g");
//     this.body.classList && this.body.classList.add("body");
//     this.body.$transformOrigin(this.width / 2, this.height * 1.25);
//     this.body.y = this.offHeight;
//     this.symbolOn = svg.createElement("use");
//     svg.setHref(this.symbolOn, "#" + options.symbolOn.getAttribute("id"));
//     this.symbolOn.setAttribute("x", -options.symbolOn.width / 2);
//     this.symbolOn.setAttribute("width", options.symbolOn.width);
//     this.symbolOn.setAttribute("height", options.symbolOn.height);
//     if (options.vibrato && this.symbolOn.classList) this.symbolOn.classList.add("vibrato");
//     var _this = this;
//     this.body.tween = (new TWEEN.Tween(this.body)).onUpdate(function(t) {
//         _this.updateBodyTransform()
//     });
//     this.body.bendTween = (new TWEEN.Tween(this.body)).onUpdate(function(t) {
//         _this.updateBodyTransform()
//     });
//     this.hole.tween = (new TWEEN.Tween(this.hole)).onUpdate(function(t) {
//         _this.updateHoleTransform()
//     }).easing(TWEEN.Easing.Circular.Out);
//     this.body.appendChild(this.symbolOn);
//     this.bodyWrapper.appendChild(this.body);
//     this.el.appendChild(this.clip);
//     this.el.appendChild(this.hole);
//     this.el.appendChild(this.bodyWrapper);
//     this.onTween = undefined;
//     this.bendTween = undefined;
//     options.container.appendChild(this.el);
//     this.bend = 0;
//     this.currentPose = [];
//     this.lastPose = [];
//     this.hole.sx = 1E-4;
//     this.hole.sy = 1E-4;
//     this.updateBodyTransform();
//     this.updateHoleTransform();
//     this.bindMidi(options)
// }
// Noodle.prototype.bindMidi = function(options) {
//     midi.on({
//         note: options.note,
//         type: "noteOn",
//         channel: options.channel
//     }, function(e) {
//         TWEEN.clearTimeout(this.offTimeout);
//         this.on()
//     }, this);
//     midi.on({
//         note: options.note,
//         type: "noteOff",
//         channel: options.channel
//     }, function(e) {
//         if (this.isOn) {
//             TWEEN.clearTimeout(this.offTimeout);
//             this.offTimeout = TWEEN.setTimeout(_.bind(this.off, this), options.offTime)
//         }
//     }, this);
//     if (options.monophonic && options.note.call) midi.on({
//             note: function(n) {
//                 return !options.note(n)
//             },
//             type: "noteOn",
//             channel: options.channel
//         },
//         function(e) {
//             if (this.isOn) {
//                 TWEEN.clearTimeout(this.offTimeout);
//                 this.off(true)
//             }
//         }, this);
//     midi.on({
//         type: "pitchBend",
//         channel: options.channel
//     }, function(e) {
//         if (this.isOn) {
//             var n = 15;
//             this.setBend(Math.cmap(e.highValue, 64 - n, 64 + n, -1, 1))
//         }
//     }, this)
// };
// Noodle.prototype.updateBodyTransform = function() {
//     this.body.$transform(0, this.body.y, 0, this.body.sx, this.body.sy)
// };
// Noodle.prototype.updateHoleTransform = function() {
//     this.hole.$transform(0, 0, 0, this.hole.sx, this.hole.sy)
// };
// Noodle.prototype.on = function() {
//     TWEEN.clearTimeout(this.offTimeout);
//     if (this.hole.tween) this.hole.tween.stop();
//     var _this = this;
//     this.body.sy = 0.5;
//     this.isOn = true;
//     this.body.tween.stop().to({
//         y: -this.height,
//         sx: 1,
//         sy: 1
//     }, 200).delay(0).easing(TWEEN.Easing.Elastic.Out).start();
//     this.hole.tween.stop();
//     this.hole.sx = 1;
//     this.hole.sy = 1;
//     this.updateHoleTransform()
// };
// Noodle.prototype.off = function(fast) {
//     TWEEN.clearTimeout(this.offTimeout);
//     this.isOn = false;
//     this.setBend(0);
//     if (this.hole.tween) this.hole.tween.stop();
//     var _this = this;
//     this.body.bendTween.stop();
//     this.body.tween.stop().to({
//         y: this.offHeight,
//         sy: Math.min(this.body.sy, 1)
//     }, 270).delay(fast ? 0 : 210).easing(TWEEN.Easing.Quadratic.In).start();
//     this.hole.tween.stop().to({
//         sx: 1E-4,
//         sy: 1E-4
//     }, 400).delay(270 + (fast ? 0 : 210)).start()
// };
// Noodle.prototype.setBend = function(bend) {
//     var sx, sy;
//     if (bend < 0) {
//         sy = Math.map(bend, 0, -1, 1, 0.6);
//         sx = Math.map(bend, 0, -1, 1, 1.2)
//     } else {
//         sy = Math.map(bend, 0, 1, 1, 1.5);
//         sx = Math.map(bend, 0, 1, 1, 0.5)
//     }
//     var _this = this;
//     this.body.bendTween.stop().to({
//         sx: sx,
//         sy: sy
//     }, 200).easing(TWEEN.Easing.Elastic.Out).start()
// };
// (function() {
//     var DRUM_SPACING = 170;
//     var DEFAULT_SPACING = 15;
//     var WIDTH = 900;
//     var HEIGHT = 1E3;
//     var stage, noodles, dogDefs, background;
// 
//     function range(options) {
//         var indeces = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
//         var spacing = (options.holeSize / 2 * 12 + DEFAULT_SPACING * 11) / 12;
//         var addNoodle = function(i) {
//             var opts = _.defaults({
//                 container: noodles,
//                 note: function(n) {
//                     return n % 12 === i
//                 }
//             }, options);
//             var ii = indeces[i];
//             opts.y = options.y + options.holeSize / 4 * (ii % 2 == 0 ? 1 : -1);
//             opts.x = (ii - 6) * spacing;
//             noodle = new Noodle(opts)
//         };
//         _.each([1, 3, 6, 8, 10], addNoodle);
//         _.each([0, 2, 4, 5, 7, 9, 11], addNoodle)
//     }
//     new Video({
//         slug: "puppy-love",
//         deps: {
//             background: {
//                 "bone": "images/puppy-love/background_bone.svg",
//                 "bowl": "images/puppy-love/background_bowl.svg",
//                 "collar": "images/puppy-love/background_collar.svg",
//                 "hydrant": "images/puppy-love/background_hydrant.svg",
//                 "paw": "images/puppy-love/background_paw.svg",
//                 "star": "images/puppy-love/background_star.svg"
//             },
//             dogs: {
//                 "boy-on": "images/puppy-love/dog-boy-on.svg",
//                 "mean-on": "images/puppy-love/dog-mean-on.svg",
//                 "bass-on": "images/puppy-love/dog-bass-on.svg",
//                 "girl-on": "images/puppy-love/dog-girl-on.svg",
//                 "chord-on": "images/puppy-love/dog-chord-on.svg",
//                 "arp-on": "images/puppy-love/dog-arp-on.svg"
//             }
//         },
//         setPosition: function() {
//             _.each(Noodle.all, function(n) {
//                 n.off()
//             })
//         },
//         canPlay: function() {
//             return true
//         },
//         offset: -200,
//         start: function(container, callback) {
//             if (!this.loaded) {
//                 _.each(this.deps.background, function(text, id) {
//                     this.deps.background[id] = svg.svgTextToSymbol(text, id)
//                 }, this);
//                 _.each(this.deps.dogs, function(text, id) {
//                     this.deps.dogs[id] = svg.svgTextToSymbol(text, id)
//                 }, this);
//                 this.loaded = true
//             }
//             background = new Background({
//                 symbols: this.deps.background,
//                 regions: [
//                     [0, "#ffc800", "#ffb000"],
//                     [44100, "#ff8ad2", "#ff286f"],
//                     [66300, "#4EF2A7", "#0EDB9B"],
//                     [103200, "#ff8ad2", "#ff286f"],
//                     [125400, "#000", "#fff"]
//                 ]
//             });
//             container.appendChild(background.el);
//             stage = svg.create();
//             stage.setAttribute("viewBox", -WIDTH / 2 + " " + -HEIGHT / 2 + " " + WIDTH + " " + HEIGHT);
//             stage.setAttribute("preserveAspectRatio", "xMidYMid meet");
//             stage.setAttribute("width", "100%");
//             stage.setAttribute("height", "100%");
//             container.appendChild(stage);
//             dogDefs = svg.createElement("defs");
//             _.each(this.deps.dogs, function(d) {
//                 dogDefs.appendChild(d)
//             });
//             stage.appendChild(dogDefs);
//             noodles = svg.createElement("g");
//             noodles.$transform(0, -50);
//             stage.appendChild(noodles);
//             range({
//                 channel: 1,
//                 y: -200,
//                 monophonic: false,
//                 vibrato: true,
//                 holeSize: 100,
//                 height: 200,
//                 offTime: 0,
//                 symbolOn: this.deps.dogs["chord-on"]
//             });
//             range({
//                 channel: 3,
//                 y: -100,
//                 monophonic: true,
//                 holeSize: 100,
//                 height: 200,
//                 symbolOn: this.deps.dogs["bass-on"]
//             });
//             new Noodle({
//                 container: noodles,
//                 channel: 10,
//                 note: 36,
//                 monophonic: false,
//                 x: -DRUM_SPACING /
//                     2,
//                 y: 0,
//                 holeSize: 155,
//                 height: 200,
//                 symbolOn: this.deps.dogs["mean-on"]
//             });
//             new Noodle({
//                 container: noodles,
//                 channel: 10,
//                 note: 40,
//                 monophonic: false,
//                 x: DRUM_SPACING / 2,
//                 y: 0,
//                 holeSize: 155,
//                 height: 200,
//                 symbolOn: this.deps.dogs["mean-on"]
//             });
//             new Noodle({
//                 container: noodles,
//                 channel: 10,
//                 note: 38,
//                 monophonic: false,
//                 x: DRUM_SPACING * 3 / 2,
//                 y: 0,
//                 holeSize: 155,
//                 height: 200,
//                 symbolOn: this.deps.dogs["mean-on"]
//             });
//             range({
//                 channel: 4,
//                 y: 100,
//                 monophonic: true,
//                 holeSize: 60,
//                 height: 100,
//                 symbolOn: this.deps.dogs["arp-on"]
//             });
//             range({
//                 channel: 8,
//                 y: 200,
//                 monophonic: true,
//                 holeSize: 100,
//                 height: 200,
//                 symbolOn: this.deps.dogs["girl-on"]
//             });
//             range({
//                 channel: 7,
//                 y: 300,
//                 holeSize: 100,
//                 height: 200,
//                 monophonic: true,
//                 symbolOn: this.deps.dogs["boy-on"]
//             });
//             midi.on({
//                 type: "noteOn",
//                 channel: 10,
//                 note: 36
//             }, _.debounce(function() {
//                 background.scatter()
//             }, 1E3, true));
//             callback()
//         },
//         teardown: function(container) {
//             container.style.background = "transparent";
//             container.innerHTML = ""
//         },
//         loop: function(position, lastPosition) {
//             background.update(position, lastPosition)
//         }
//     })
// })();
// iii.params = {
//     updateFinger: true,
//     updateWater: false,
//     updateParticles: true,
//     updateUniforms: false,
//     pianoRollParticleDecay: 0.91,
//     pianoRollParticleLifeSpan: 100,
//     pianoRollParticleInitialSize: 1.6,
//     pianoRollParticleVelocity: 0.1,
//     pianoRollParticleGravity: 0.0030,
//     pianoRollParticleDrag: 0.9
// };
// iii.initGUI = function() {
//     if (url.boolean("gui")) {
//         var gui = iii.gui = new dat.GUI;
//         gui.add(iii.params, "updateFinger");
//         gui.add(iii.params, "updateWater");
//         gui.add(iii.params, "updateParticles");
//         gui.add(iii.params, "updateUniforms");
//         gui.add(iii.params, "pianoRollParticleDecay", 0.8, 1).name("particle decay");
//         gui.add(iii.params, "pianoRollParticleInitialSize", 0, 5).name("particle size");
//         gui.add(iii.params, "pianoRollParticleVelocity", 0.1, 3).name("particle vel");
//         gui.add(iii.params, "pianoRollParticleGravity", -0.1, 0).name("particle grav");
//         gui.add(iii.params, "pianoRollParticleDrag", 0, 1).name("particle drag")
//     }
// };
// iii.DATA = {
//     "tracks": [{
//         "title": "Heaven",
//         "slug": "heaven",
//         "duration": 79,
//         "bpm": 100,
//         "ytid": "raSCKAPvxl4"
//     }, {
//         "title": "Jamn",
//         "slug": "jamn",
//         "duration": 225,
//         "bpm": 195,
//         "fingerBPM": 195 / 2,
//         "ytid": "cNMGMV1gHso"
//     }, {
//         "title": "Puppy Love",
//         "slug": "puppy-love",
//         "duration": 187,
//         "bpm": 65,
//         "special": true,
//         "ytid": "hOo0Hi0gJZQ"
//     }, {
//         "title": "R U IN 2 IT?",
//         "slug": "r-u-in-2-it",
//         "duration": 181,
//         "bpm": 111,
//         "ytid": "z4-XRrhAK3w"
//     }, {
//         "title": "Everyday Problems",
//         "slug": "everyday-problems",
//         "duration": 158,
//         "bpm": 100,
//         "ytid": "Dbw2wTYAl80"
//     }, {
//         "title": "Canopy",
//         "slug": "canopy",
//         "duration": 216,
//         "bpm": 100,
//         "ytid": "FzfrVDdOqLI"
//     }, {
//         "title": "A Brief Moment Of Clarity",
//         "slug": "a-brief-moment-of-clarity",
//         "duration": 133,
//         "bpm": 85,
//         "ytid": "cp4K1uLZVh8"
//     }, {
//         "title": "Rock",
//         "slug": "rock",
//         "duration": 166,
//         "bpm": 190,
//         "ytid": "j1BvCPN-n2k"
//     }, {
//         "title": "Hurtful Things",
//         "slug": "hurtful-things",
//         "duration": 187,
//         "bpm": 120,
//         "ytid": "EiGWIElGJtA"
//     }, {
//         "title": "Crystal",
//         "slug": "crystal",
//         "duration": 232,
//         "bpm": 72.5,
//         "ytid": "JKU3eMMWwTY"
//     }]
// };
// iii.METHODS = {
//     prepareData: function() {
//         var data = iii.DATA;
//         _.extend(data, iii.FILTERS);
//         _.each(data.tracks, function(t, i) {
//             t.index = i;
//             t.video = Video[t.slug] || PianoRollVideo(t.slug, t.bpm, t.fingerBPM || t.bpm)
//         });
//         data.playing = false;
//         data.currentPosition = 0;
//         data.arrow_visible = false;
//         data.ever_scrolled = false;
//         data.audioRequiresTouch = false
//     },
//     init: function() {
//         iii.finger = new Finger(document.getElementById("playbar-finger"));
//         var trackIndex = Math.clamp(parseInt(url.hash) - 1 || 0, 0, this.data.tracks.length - 1);
//         var capture = url.boolean("capture");
//         var position = url.number("p", 0);
//         url.class("playbar", true);
//         this.playbar_progress_bar = document.getElementById("playbar-progress-bar");
//         window.addEventListener("resize", _.bind(this.onResize, this), false);
//         this.onResize();
//         window.addEventListener("keydown", function(e) {
//             if (e.keyCode == 32) {
//                 e.preventDefault();
//                 iii.ractive.togglePlay();
//                 return false
//             }
//         });
//         this.dialogue = new Dialogue(dialogue_intro);
//         this.observe("currentTrack", function(track) {
//             if (history.replaceState) history.replaceState({}, "", "#" + (track.index + 1));
//             if (track.index ==
//                 0) this.dialogue.show();
//             else this.dialogue.hide();
//             this.set("arrow_visible", !(this.get("ever_scrolled") || track.index == 0 && this.get("cantPlay") == false))
//         }, {
//             init: false
//         });
//         var trackScroll = _.bind(function(e) {
//             window.removeEventListener("scroll", trackScroll, true);
//             this.set("ever_scrolled", true);
//             this.set("arrow_visible", false)
//         }, this);
//         window.addEventListener("scroll", trackScroll, false);
//         iii.initGUI();
//         this.set("loading", true);
//         this.setTrack(this.data.tracks[trackIndex], false, _.bind(function() {
//             this.set("loading", false);
//             if (!this.data.audioRequiresTouch && url.boolean("play", true)) this.play()
//         }, this));
//         if (capture) Capture.start("", 60, position, _.bind(function() {}, this));
//         else if (position != 0) setTimeout(_.bind(function() {
//             this.setPosition(position)
//         }, this), 500);
//         this._update = _.bind(this.update, this);
//         this._update()
//     },
//     updatePercentLoaded: _.debounce(function(track, pct) {
//         this.set("tracks." + track.index + ".percentLoaded", pct);
//         if (track == this.data.currentTrack) this.set("currentTrack.percentLoaded", pct)
//     }, 100),
//     tryItAnyway: function(e) {
//         e.original.preventDefault();
//         this.setTrack(this.data.currentTrack, true, _.bind(function() {
//             this.play()
//         }, this))
//     },
//     setPosition: function(millis) {
//         this.data.currentTrack.song.setPosition(millis);
//         this.data.currentTrack.video.setPosition(millis)
//     },
//     setPositionFromPlaybar: function(e) {
//         var duration = this.data.currentTrack.song.duration;
//         var p = duration * (e.localX / this.data.playbar_progress_width);
//         p = Math.clamp(p, 0, duration);
//         this.setPosition(p);
//         this.setDraggingTrue();
//         this.set("currentPosition", p / 1E3)
//     },
//     update: url.boolean("update", true) ? function() {
//         if (this.data.playing ||
//             Capture.isRecording()) {
//             var position = Capture.isRecording() ? Capture.now() : this.data.currentTrack.song.position;
//             this.data.currentTrack.video.update(position);
//             position = this.data.currentTrack.video.position;
//             var secondPosition = Math.floor(position / 1E3 || 0);
//             if (this.data.currentPosition !== secondPosition) this.set("currentPosition", secondPosition)
//         }
//         if (this.data.currentTrack != this.data.tracks[0]) iii.finger.update(this.data.currentTrack.video.position);
//         else this.dialogue.update(position);
//         TWEEN.update();
//         this.data.currentTrack.video.loop();
//         requestAnimationFrame(this._update)
//     } : function() {},
//     onResize: function() {
//         this.set("playbar_progress_width", this.playbar_progress_bar.offsetWidth);
//         if (document.body.classList.contains("playbar")) more.style.marginTop = window.innerHeight - playbar.offsetHeight + "px";
//         else more.style.marginTop = window.innerHeight + "px"
//     },
//     setTrackFromEvent: function(e) {
//         this.set("loading", true);
//         this.setTrack(e.context, false, _.bind(function() {
//             this.set("loading", false);
//             this.play()
//         }, this), _.bind(function() {
//             this.set("loading", false)
//         }, this))
//     },
//     scrollTo: function(element, to) {
//         var _this = this;
//         iii.scrollInterval = requestAnimationFrame(function() {
//             element.scrollTop += (to - element.scrollTop) * 0.1;
//             if (element.scrollTop == to) return;
//             _this.scrollTo(element, to)
//         })
//     },
//     setTrack: function(track, forcePlayback, callback, error) {
//         if (this.data.currentTrack == track && !forcePlayback) return;
//         if (this.data.currentTrack) this.stop();
//         iii.finger.setBPM(track.fingerBPM || track.bpm);
//         this.set("currentPosition", 0);
//         this.set("currentTrack", track);
//         var _this = this;
//         if (this.data.currentTrack.index ==
//             0) iii.finger.rest();
//         if (url.boolean("video", true)) track.video.start(stage, forcePlayback, function() {
//             document.body.classList.add("playbar");
//             _this.set("cantPlay", false);
//             _this.onResize();
//             callback()
//         }, function(reason) {
//             document.body.classList.remove("playbar");
//             _this.set("cantPlay", reason);
//             _this.onResize();
//             error && error()
//         })
//     },
//     setDraggingTrue: function() {
//         this.set("dragging", true)
//     },
//     setDraggingFalse: function() {
//         this.set("dragging", false)
//     },
//     playYouTube: function() {},
//     nextTrack: function() {
//         var i = (this.data.currentTrack.index +
//             1) % this.data.tracks.length;
//         var track = this.data.tracks[i];
//         this.set("loading", true);
//         this.setTrack(track, false, _.bind(function() {
//             this.set("loading", false);
//             this.play()
//         }, this))
//     },
//     prevTrack: function() {
//         var i = this.data.currentTrack.index - 1;
//         if (i < 0) i += this.data.tracks.length;
//         var track = this.data.tracks[i];
//         this.set("loading", true);
//         this.setTrack(track, false, _.bind(function() {
//             this.set("loading", false);
//             this.play()
//         }, this))
//     },
//     play: function() {
//         if (this.data.loading) return;
//         if (this.data.playing) return;
//         this.data.currentTrack.song.play();
//         this.data.currentTrack.video.play()
//     },
//     pause: function() {
//         if (!this.data.playing) return;
//         iii.finger.rest();
//         this.data.currentTrack.song.pause();
//         this.data.currentTrack.video.pause()
//     },
//     stop: function() {
//         this.data.currentTrack.song.stop();
//         this.data.currentTrack.video.teardown(stage)
//     },
//     togglePlay: function() {
//         if (this.data.playing) this.pause();
//         else this.play()
//     }
// };
// iii.FILTERS = {
//     minutesAndSeconds: function(time) {
//         var seconds = time % 60;
//         var minutes = Math.floor(time / 60);
// 
//         function pad(num) {
//             if (num < 10) return "0" + num;
//             return num
//         }
//         return iii.FILTERS.prettyZero(minutes + ":" + pad(Math.floor(seconds)))
//     },
//     prettyZero: function(obj) {
//         return obj.toString().replace(/0/gi, "O")
//     }
// };
// (function() {
//     function init() {
//         iii.METHODS.prepareData();
//         var ractive = Ractive.extend({
//             el: document.querySelector(".ractive"),
//             template: template,
//             data: iii.DATA,
//             init: function() {
//                 _.extend(this, iii.METHODS);
//                 _.each(iii.METHODS, function(v, k) {
//                     this.on(k, v)
//                 }, this);
//                 this.init()
//             }
//         });
//         iii.ractive = new ractive;
//         gnjfader()
//     }
//     var template;
//     var loaded = _.after(2, init);
//     get("template.html", function(t) {
//         template = t.replace(/\n|\r/g, "");
//         loaded()
//     });
//     soundManager.setup({
//         url: "soundmanager/swf/",
//         debugMode: false,
//         onready: function() {
//             _.each(iii.DATA.tracks,
//                 function(t, i) {
//                     t.song = soundManager.createSound({
//                         url: "mp3/" + t.slug + ".mp3",
//                         useHighPerformance: true,
//                         onplay: function() {
//                             iii.ractive.set("playing", true)
//                         },
//                         onresume: function() {
//                             iii.ractive.set("playing", true)
//                         },
//                         onpause: function() {
//                             iii.ractive.set("playing", false)
//                         },
//                         onfinish: function() {
//                             if (iii.ractive.data.dragging) return;
//                             if (url.boolean("loop")) {
//                                 iii.ractive.set("playing", false);
//                                 iii.ractive.setPosition(0);
//                                 iii.ractive.play()
//                             } else {
//                                 iii.ractive.set("playing", false);
//                                 iii.ractive.nextTrack()
//                             }
//                         },
//                         onstop: function() {
//                             iii.ractive.set("playing",
//                                 false)
//                         },
//                         whileloading: function() {
//                             var pct = this.bytesLoaded / this.bytesTotal;
//                             iii.ractive.updatePercentLoaded(t, pct)
//                         }
//                     })
//                 });
//             loaded()
//         },
//         ontimeout: function() {}
//     })
// })();