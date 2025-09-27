(() => {
  "use strict";
  console.clear();

  const windowWrapped = window.wrappedJSObject;
  const wrap = _function => exportFunction(_function, window);

  const requests = [];
  windowWrapped.get = wrap
    (async () => console.log((await Promise.all(requests)).map(JSON.parse)));

  const decoder = new TextDecoder();

  windowWrapped.proxy.setFetch(wrap((..._arguments) => {
    const body = _arguments[1].body;
    requests.push(
      body instanceof windowWrapped.Uint8Array ?
        (async _body => decoder.decode(await (new Response(
          new Blob([_body]).stream().pipeThrough
            (new DecompressionStream('gzip'))
        )).arrayBuffer()))(body) : Promise.resolve(body)
    );
  }));
})();
