/// <reference lib="WebWorker" />
/// <reference types="@cloudflare/workers-types" />

addEventListener('fetch', (event) => {
  event.respondWith(
    new Response('Hello worker!', {
      headers: { 'content-type': 'text/plain' },
    }),
  );
});
