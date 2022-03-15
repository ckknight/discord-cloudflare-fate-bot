import {
  type InteractionResponse,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';
import { pick, nativeMath } from 'random-js';

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

export function eightBall(
  question: string | undefined,
): InteractionResponse | Promise<InteractionResponse> {
  const picked = pick(
    nativeMath,
    possibilities.flatMap(({ emoji, options }) =>
      options.map((text) => ({ emoji, text })),
    ),
  );

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `:8ball: ${question != null ? `${question} - ` : ''}${
        picked.text
      } ${picked.emoji}`,
    },
  };
}
