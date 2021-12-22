import {
  ApplicationCommandOptionType,
} from '@glenstack/cf-workers-discord-bot';
import { ApplicationCommandPair } from '../../types';

export const roll: ApplicationCommandPair = [
  {
    name: 'roll',
    description: 'Roll some dice!',
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'dice',
        description:
          'Dice to roll in a format like `d20 + 4d10 - 2d6 + 3dF + 5`',
        required: true,
      },
    ],
  },
  async (interaction) => {
    const unparsedDiceValue = interaction.data?.options?.find(
      ({ name }) => name === 'dice',
    )?.value;
    const { roll: impl } = await import('./commandImpl');
    return impl(unparsedDiceValue);
  },
];
