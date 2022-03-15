/// <reference types="@cloudflare/workers-types" />

declare const APPLICATION_SECRET: string;
declare const COMMAND_META: KVNamespace<'commands-hash'>;
declare const WORDLE: KVNamespace;
