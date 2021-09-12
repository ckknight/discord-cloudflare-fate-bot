import { InteractionResponseType } from '@glenstack/cf-workers-discord-bot';
import { ApplicationCommandPair } from '../types';

export const hello: ApplicationCommandPair = [
  {
    name: 'hello',
    description: 'Bot will say hello to you!',
  },
  async (interaction) => {
    const userID = interaction.member.user.id;

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
];
