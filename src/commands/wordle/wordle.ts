import {
  ApplicationCommandOptionType,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';
import { createCommandPair } from '../../utils/createCommandPair';

export const wordle = createCommandPair(
  {
    name: 'wordle',
    description: 'Wordle-related stuff',
    options: [
      {
        type: ApplicationCommandOptionType.SUB_COMMAND,
        name: 'add',
        description: 'Add an entry for Wordle',
        options: [
          {
            type: ApplicationCommandOptionType.STRING,
            name: 'entry',
            description: 'Entry to add',
          },
        ],
      },
      {
        type: ApplicationCommandOptionType.SUB_COMMAND,
        name: 'list',
        description: 'List Wordle entries',
      },
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'test',
        description: 'test entry',
      },
    ],
  } as const,
  (opts) => {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `TODO: ${JSON.stringify(opts)}`,
      },
    };
  },
);
