import {
  ApplicationCommandOptionType,
} from '@glenstack/cf-workers-discord-bot';
import { createCommandPair } from '../../utils/createCommandPair';

export const roll = createCommandPair(
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
  } as const,
  async (_interaction, { dice: unparsedDiceValue }) => {
    return (await import('./commandImpl')).roll(unparsedDiceValue);
  },
);
