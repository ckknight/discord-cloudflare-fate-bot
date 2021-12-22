import {
  ApplicationCommandOptionType,
} from '@glenstack/cf-workers-discord-bot';
import { ApplicationCommandPair } from '../../types';

export const shuffle: ApplicationCommandPair = [
  {
    name: 'shuffle',
    description: 'Shuffle a list of items',
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'items',
        description: 'The items to shuffle, separated by a semicolon `;`, comma `,`, or spaces',
        required: true,
      },
    ],
  },
  async (interaction) => {
    const items = interaction.data?.options?.find(
      ({ name }) => name === 'items',
    )?.value;
    const { shuffle: impl } = await import('./impl');
    return impl(items);
  },
];

export const pick: ApplicationCommandPair = [
  {
    name: 'pick',
    description: 'Pick from a list of items',
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'items',
        description: 'The items to pick from, separated by a semicolon `;`, comma `,`, or spaces',
        required: true,
      },
    ],
  },
  async (interaction) => {
    const items = interaction.data?.options?.find(
      ({ name }) => name === 'items',
    )?.value;
    const { pick: impl } = await import('./impl');
    return impl(items);
  },
];
