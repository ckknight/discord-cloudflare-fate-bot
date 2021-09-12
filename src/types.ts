import type {
  ApplicationCommand,
  InteractionHandler,
} from '@glenstack/cf-workers-discord-bot';

export type ApplicationCommandPair = [ApplicationCommand, InteractionHandler];
