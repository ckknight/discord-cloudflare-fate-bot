import { InteractionResponseType } from '@glenstack/cf-workers-discord-bot';
import { ApplicationCommandPair } from '../types';

export const date: ApplicationCommandPair = [
  {
    name: 'date',
    description: 'What is the current date and time?',
  },
  () => {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `It is currently ${new Date().toString()}`,
      },
    };
  },
];
