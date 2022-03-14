import { InteractionResponseType } from '@glenstack/cf-workers-discord-bot';
import { getUser } from '../getUser';
import { createCommandPair } from '../utils/createCommandPair';

export const hello = createCommandPair(
  {
    name: 'hello',
    description: 'Bot will say hello to you!',
  },
  (interaction) => {
    const userID = getUser(interaction).id;

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Hello, <@${userID}>!`,
        allowed_mentions: {
          users: [userID],
        },
      },
    };
  },
);
