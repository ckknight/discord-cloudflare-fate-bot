import { InteractionResponseType } from '@glenstack/cf-workers-discord-bot';
import { createCommandPair } from '../utils/createCommandPair';

export const date = createCommandPair(
  {
    name: 'date',
    description: 'What is the current date and time?',
  },
  () => ({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `It is currently ${new Date().toString()}!`,
    },
  }),
);
