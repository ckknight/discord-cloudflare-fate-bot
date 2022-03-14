import { ApplicationCommandOptionType } from '@glenstack/cf-workers-discord-bot';
import { createCommandPair } from '../../utils/createCommandPair';

export const eightBall = createCommandPair(
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
  async (_interaction, { question }: { question: string }) => {
    return (await import('./impl')).eightBall(question);
  },
);
