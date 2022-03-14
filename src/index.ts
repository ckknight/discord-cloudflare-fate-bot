/// <reference types="@cloudflare/workers-types" />

import './polyfills';
import { createSlashCommandHandler } from '@glenstack/cf-workers-discord-bot';
import { commands } from './commands';
import { withLogging } from './withLogging';

declare const APPLICATION_SECRET: string;

const slashCommandHandler = createSlashCommandHandler({
  applicationID: '356117733638799360',
  applicationSecret: APPLICATION_SECRET,
  publicKey: '510df19c289da6847bd4d00c946b94fae022a1f79e3e316cdc40f17163b2ee92',
  commands: withLogging(commands),
});

const LOG_FETCH = true as boolean;

addEventListener('fetch', (event) => {
  if (LOG_FETCH) {
    console.log('fetch', {
      method: event.request.method,
      url: event.request.url,
      headers: Object.fromEntries(event.request.headers.entries()),
      redirect: event.request.redirect,
      cf: event.request.cf,
    });
  }
  event.respondWith(slashCommandHandler(event.request));
});
