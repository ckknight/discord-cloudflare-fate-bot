import {
  ApplicationCommandOptionType,
} from '@glenstack/cf-workers-discord-bot';
import { ApplicationCommandPair } from '../../types';

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
  async (interaction) => {
    const question = interaction.data?.options?.find(
      ({ name }) => name === 'question',
    )?.value;
    const { eightBallImpl } = await import('./impl');
    return eightBallImpl(question);
  },
];
