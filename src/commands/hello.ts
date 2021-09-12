import { InteractionResponseType } from '@glenstack/cf-workers-discord-bot';
import { getUser } from '../getUser';
import { ApplicationCommandPair } from '../types';

export const hello: ApplicationCommandPair = [
  {
    name: 'hello',
    description: 'Bot will say hello to you!',
  },
  (interaction) => {
    const userID = getUser(interaction).id;

    /**
     * {
          "guild_id": "885252764958064680",
          "member": {
            "avatar": null,
            "deaf": false,
            "is_pending": false,
            "joined_at": "2021-09-08T19:58:26.379000+00:00",
            "mute": false,
            "nick": null,
            "pending": false,
            "permissions": "1099511627775",
            "premium_since": null,
            "roles": [],
            "user": {
              "avatar": "2daa029779e5fc7acddf863de13d39a8",
              "discriminator": "3947",
              "id": "105873190076596224",
              "public_flags": 0,
              "username": "ckknight"
            }
          },
        }
     */
    /**
     * 
        {
          "user": {
            "avatar": "2daa029779e5fc7acddf863de13d39a8",
            "discriminator": "3947",
            "id": "105873190076596224",
            "public_flags": 0,
            "username": "ckknight"
          }
        }
     */

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
