import { ApplicationCommandPair } from './types';

export function withLogging(
  commands: ApplicationCommandPair[],
): ApplicationCommandPair[] {
  return commands.map(
    ([command, handler]): ApplicationCommandPair => [
      command,
      async (interaction) => {
        const response = await handler(interaction);
        console.log(response);
        return response;
      },
    ],
  );
}
