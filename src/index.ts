/// <reference types="@cloudflare/workers-types" />

import './polyfills';
import { createSlashCommandHandler } from '@glenstack/cf-workers-discord-bot';
import { commands } from './commands';
import { withLogging } from './withLogging';
import { calculateCommandsHash } from './utils/calculateCommandsHash';

declare const APPLICATION_SECRET: string;
declare const COMMAND_META: KVNamespace<string>;

const slashCommandHandler = createSlashCommandHandler({
  applicationID: '356117733638799360',
  applicationSecret: APPLICATION_SECRET,
  publicKey: '510df19c289da6847bd4d00c946b94fae022a1f79e3e316cdc40f17163b2ee92',
  commands: withLogging(commands),
});

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname === '/setup') {
    const hash = await calculateCommandsHash(commands.map(([command]) => command));
    const key = 'commands-hash';
    if (await COMMAND_META.get(key) === hash) {
      console.log('skipping setup, as there is no change');
      return new Response('No change');
    }
    const response = await slashCommandHandler(request);
    await COMMAND_META.put(key, hash);
    return response;
  } else {
    return slashCommandHandler(request);
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handler(event.request));
});


