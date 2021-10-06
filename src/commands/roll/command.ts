import {
  ApplicationCommandOptionType,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';
import { random } from '../../random';
import { ApplicationCommandPair } from '../../types';
import { calculateRolls } from './calculateRolls';
import { calculateTotal } from './calculateTotal';
import { emojify } from './emojify';
import { stringify } from './stringify';
import { tokenize } from './tokenize';

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
  (interaction) => {
    const unparsedDiceValue = interaction.data?.options?.find(
      ({ name }) => name === 'dice',
    )?.value;
    const tokens = tokenize(unparsedDiceValue);
    const rolls = calculateRolls(tokens, random);

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Rolling ${stringify(tokens)}: ${emojify(tokens, rolls)} = ${calculateTotal(tokens, rolls)}`,
      },
    };
  },
];
