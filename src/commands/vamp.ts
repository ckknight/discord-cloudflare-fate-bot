import {
  ApplicationCommandOptionType,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';
import { ApplicationCommandPair } from '../types';

export const vamp: ApplicationCommandPair = [
  {
    name: 'vamp',
    description: 'Roll some :vampire: dice!',
    options: [
      {
        type: ApplicationCommandOptionType.INTEGER,
        name: 'dice',
        description:
          'Number of dice to roll',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.INTEGER,
        name: 'hunger',
        description:
          'Amount of hunger',
        required: true,
      },
      {
        type: ApplicationCommandOptionType.BOOLEAN,
        name: 'rouse',
        description:
          'Number of rouse checks',
        required: false,
      },
    ],
  },
  (interaction) => {
    const dice: number = interaction.data?.options?.find(
      ({ name }) => name === 'dice',
    )?.value ?? 0;
    const hunger: number = interaction.data?.options?.find(
      ({ name }) => name === 'hunger',
    )?.value ?? 0;
    const rouse: boolean = interaction.data?.options?.find(
      ({ name }) => name === 'rouse',
    )?.value ?? false;

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Rolling \`${JSON.stringify({ dice, hunger, rouse })}\``,
      },
    };
  },
];
