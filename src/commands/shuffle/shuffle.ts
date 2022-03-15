import { ApplicationCommandOptionType } from '@glenstack/cf-workers-discord-bot';
import { createCommandPair } from '../../utils/createCommandPair';

export const shuffle = createCommandPair(
  {
    name: 'shuffle',
    description: 'Shuffle a list of items',
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'items',
        description:
          'The items to shuffle, separated by a semicolon `;`, comma `,`, or spaces',
        required: true,
      },
    ],
  } as const,
  async ({ items }) => (await import('./impl')).shuffle(items),
);

export const pick = createCommandPair(
  {
    name: 'pick',
    description: 'Pick from a list of items',
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'items',
        description:
          'The items to pick from, separated by a semicolon `;`, comma `,`, or spaces',
        required: true,
      },
    ],
  } as const,
  async ({ items }) => (await import('./impl')).pick(items),
);
