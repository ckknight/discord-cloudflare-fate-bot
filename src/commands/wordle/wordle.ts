import { ApplicationCommandOptionType } from '@glenstack/cf-workers-discord-bot';
import { getUser } from '../../getUser';
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
            required: true,
          },
        ],
      },
      {
        type: ApplicationCommandOptionType.SUB_COMMAND,
        name: 'get',
        description: 'Add an entry for Wordle',
        options: [
          {
            type: ApplicationCommandOptionType.STRING,
            name: 'date',
            description: `Date of the entry e.g. 2022-03-15T03:39:36.531Z`,
            required: true,
          },
        ],
      },
      {
        type: ApplicationCommandOptionType.SUB_COMMAND,
        name: 'list',
        description: 'List Wordle entries',
      },
    ],
  } as const,
  async (opts, interaction) => {
    const serverId =
      'guild_id' in interaction ? interaction.guild_id : undefined;
    const userId = getUser(interaction).id;
    const impl = await import('./impl');
    if (opts.add != null) {
      return await impl.add({ userId, serverId, entry: opts.add.entry });
    } else if (opts.get != null) {
      return await impl.get({ userId, serverId, date: opts.get.date });
    } else {
      return await impl.list({ userId, serverId });
    }
  },
);
