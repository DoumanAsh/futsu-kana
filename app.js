!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var n={},t={},r={},i={}.hasOwnProperty,a=/^\.\.?(\/|$)/,o=function(e,n){for(var t,r=[],i=(a.test(n)?e+"/"+n:n).split("/"),o=0,s=i.length;o<s;o++)t=i[o],".."===t?r.pop():"."!==t&&""!==t&&r.push(t);return r.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},l=function(n){return function(t){var r=o(s(n),t);return e.require(r,n)}},c=function(e,n){var r=g&&g.createHot(e),i={id:e,exports:{},hot:r};return t[e]=i,n(i.exports,l(e),i),i.exports},u=function(e){return r[e]?u(r[e]):e},f=function(e,n){return u(o(s(e),n))},d=function(e,r){null==r&&(r="/");var a=u(e);if(i.call(t,a))return t[a].exports;if(i.call(n,a))return c(a,n[a]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,n){r[n]=e};var h=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,v=function(e){if(h.test(e)){var n=e.replace(h,"");i.call(r,n)&&r[n].replace(h,"")!==n+"/index"||(r[n]=e)}if(p.test(e)){var t=e.replace(p,"");i.call(r,t)||(r[t]=e)}};d.register=d.define=function(e,r){if(e&&"object"==typeof e)for(var a in e)i.call(e,a)&&d.register(a,e[a]);else n[e]=r,delete t[e],v(e)},d.list=function(){var e=[];for(var t in n)i.call(n,t)&&e.push(t);return e};var g=e._hmr&&new e._hmr(f,d,n,t);d._cache=t,d.hmr=g&&g.wrap,d.brunch=!0,e.require=d}}(),function(){"undefined"==typeof window?this:window;require.register("init.js",function(e,n,t){!function(n,r){"object"==typeof e&&"undefined"!=typeof t?r():"function"==typeof define&&define.amd?define(r):r()}(this,function(){"use strict";function e(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}var t=n("./js/UI.js"),r=e(t);window.addEventListener("load",function(){var e=document.body.children[0],n=document.getElementById("Start").children[2],t={wrapper:n,question:n.children[0],answer:n.children[1],input:n.children[2]},i={hiragana:document.getElementById("Hiragana").children[1],katakana:document.getElementById("Katakana").children[1]};i.hiragana.addEventListener("click",r.table_click),i.katakana.addEventListener("click",r.table_click);var a=r.hash_change(e),o=r.init_start(t,i);a(),o(),window.addEventListener("hashchange",a),window.addEventListener("hashchange",o)})})}),require.register("js/UI.js",function(e,n,t){!function(n,r){"object"==typeof e&&"undefined"!=typeof t?r():"function"==typeof define&&define.amd?define(r):r()}(this,function(){"use strict";function t(e,n){var t=[],r=[],i=function(e){if(e.children[0].children[0].checked)for(var n=1;n<e.children.length;n+=1){var t=e.children[n];/\w+/.test(t.title)&&r.push({kana:t.innerHTML,romaji:t.title})}},a=function(){for(var e=n.hiragana.children,a=n.katakana.children,o=0;o<e.length;o+=1)i(e[o]),i(a[o]);t=r.slice(0)},o=function(){if(0===r.length){if(0===t.length)return;r=t.slice(0)}var e=Math.floor(Math.random()*r.length);return r.splice(e,1)[0]},s=function(){var n=o();return void 0!==n&&(e.answer.style.visibility="hidden",e.answer.innerHTML=n.romaji,e.question.className=e.question.className.replace(/ *animate_fade_in */,""),void e.question.offsetWidth,e.question.innerHTML=n.kana,e.question.className+=" animate_fade_in",!0)},l=function(n){var t=e.answer.textContent.toLowerCase(),r=n.target.value.toLowerCase();r===t?(n.target.value="",n.target.className=n.target.className.replace(" wrong",""),s()):r.length>=t.length?/wrong/.test(n.target.className)||(n.target.className+=" wrong"):n.target.className=n.target.className.replace(" wrong","")},c=function(){e.answer.style.visibility=""};return function(){if("#Start"===location.hash){if(a(),!s())return;e.input.disabled=!1,e.input.addEventListener("input",l),e.question.addEventListener("mouseover",c)}else r.length=0,t.length=0,e.input.disabled=!0,e.answer.innerHTML="　",e.question.innerHTML="　",e.answer.style.visibility="hidden",e.input.className=e.input.className.replace(" wrong",""),e.input.removeEventListener("input",l),e.question.removeEventListener("mouseover",c)}}function r(e){return function(){for(var n=new RegExp((location.hash?location.hash:"#")+"$"),t=e.children.length,r=e.children,i=0;i<t;i+=1)r[i].className=r[i].className.replace(" selected","");for(var a=0;a<t;a+=1){var o=r[a];if(n.test(o.href)){o.className+=" selected";break}}}}function i(e){if(!/input/i.test(e.target.tagName)&&!/table/.test(e.target.className)){var n=(0,a.look_up_parent_until)(e.target,"div","column"),t=n.children[0].children[0];t.checked=!t.checked}}Object.defineProperty(e,"__esModule",{value:!0}),e.init_start=t,e.hash_change=r,e.table_click=i;var a=n("./utils.js")})}),require.register("js/utils.js",function(e,n,t){!function(n,r){"object"==typeof e&&"undefined"!=typeof t?r():"function"==typeof define&&define.amd?define(r):r()}(this,function(){"use strict";function n(e,n,t){for(var r=new RegExp(n?n:".*","i"),i=new RegExp(t?t:".*","i"),a=e.parentElement;null!==a;a=a.parentElement)if(r.test(a.tagName)&&i.test(a.className))return a;return null}Object.defineProperty(e,"__esModule",{value:!0}),e.look_up_parent_until=n})}),require.register("___globals___",function(e,n,t){})}(),require("___globals___"),require("init");