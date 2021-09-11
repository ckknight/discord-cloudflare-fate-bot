/// <reference types="@cloudflare/workers-types" />

addEventListener('fetch', (_event) => {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  });
});
