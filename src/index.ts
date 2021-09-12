/// <reference lib="WebWorker" />
/// <reference types="@cloudflare/workers-types" />

import {
  createSlashCommandHandler,
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';

const helloCommand: ApplicationCommand = {
  name: 'hello',
  description: 'Bot will say hello to you!',
};

const helloHandler: InteractionHandler = async (
  interaction: Interaction,
): Promise<InteractionResponse> => {
  const userID = interaction.member.user.id;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Hello, <@${userID}>!`,
      allowed_mentions: {
        users: [userID],
      },
    },
  };
};

declare const APPLICATION_SECRET: string;

const slashCommandHandler = createSlashCommandHandler({
  applicationID: '356117733638799360',
  applicationSecret: APPLICATION_SECRET,
  publicKey: '510df19c289da6847bd4d00c946b94fae022a1f79e3e316cdc40f17163b2ee92',
  commands: [[helloCommand, helloHandler]],
});

addEventListener('fetch', (event) => {
  event.respondWith(slashCommandHandler(event.request));
});
