// ==UserScript==
// @name graphite
// @match
// @run-at document-start
// ==/UserScript==

(() => {
  "use strict";

  const originals = {fetch: fetch, Request: Request};

  window.proxy = {
    setFetch: _fetch => {window.fetch = _fetch;},
    Request: {}
  };

  window.Request = new Proxy(Request, window.proxy.Request);
  Object.setPrototypeOf(window.Request, originals.Request);
  window.Request.prototype = originals.Request.prototype;
})();

