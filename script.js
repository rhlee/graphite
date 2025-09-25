// ==UserScript==
// @name graphite
// @match
// @run-at document-start
// ==/UserScript==

(() => {
  "use strict";

  const originals = {fetch: fetch, Request: Request};
  window.proxy = {
    setFetch: _fetch => {window.fetch = (..._arguments) => {
      _fetch(..._arguments);
      originals.fetch(..._arguments);
    };},
    Request: {}
  };
  window.Request = new Proxy(Request, window.proxy.Request);
})();

