import {
  ApplicationCommandOptionType,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';
import { random } from '../random';
import { ApplicationCommandPair } from '../types';

const possibilities = [
  {
    // affirmative
    emoji: ':+1:',
    options: [
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes definitely',
      'You may rely on it',
      'As I see it, yes',
      'Most likely',
      'Outlook good',
      'Yes',
      'Signs point to yes',
    ],
  },
  {
    // non-committal
    emoji: ':shrug:',
    options: [
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
    ],
  },
  {
    // negative
    emoji: ':-1:',
    options: [
      "Don't count on it",
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful',
    ],
  },
];

export const eightBall: ApplicationCommandPair = [
  {
    name: '8ball',
    description: 'Shake the 8-ball and see your results',
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'question',
        description: 'The question you wish to ask the magic 8-ball',
        required: false,
      },
    ],
  },
  (interaction) => {
    const question = interaction.data?.options?.find(
      ({ name }) => name === 'question',
    )?.value;
    const picked = random.pick(
      possibilities.flatMap(({ emoji, options }) =>
        options.map((text) => ({ emoji, text })),
      ),
    );

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `:8ball: ${question != null ? `${question} - ` : ''}${picked.text} ${
          picked.emoji
        }`,
      },
    };
  },
];
