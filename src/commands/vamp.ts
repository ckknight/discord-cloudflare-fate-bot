import {
  ApplicationCommandOptionType,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';
import { createCommandPair } from '../utils/createCommandPair';

export const vamp = createCommandPair(
  {
    name: 'vamp',
    description: 'Roll some vampire dice!',
    options: [
      {
        type: ApplicationCommandOptionType.INTEGER,
        name: 'dice',
        description: 'Number of dice to roll',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.INTEGER,
        name: 'hunger',
        description: 'Amount of hunger',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.INTEGER,
        name: 'rouse',
        description: 'Number of rouse checks',
        required: false,
        choices: [
          { name: '0', value: 0 },
          { name: '1', value: 1 },
          { name: '2', value: 2 },
        ],
      },
    ],
  } as const,
  (
    { dice, hunger, rouse = 0 },
  ) => {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Rolling \`${JSON.stringify({ dice, hunger, rouse })}\``,
      },
    };
  },
);
