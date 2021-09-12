import { ApplicationCommandPair } from './types';

export function withLogging(
  commands: ApplicationCommandPair[],
): ApplicationCommandPair[] {
  return commands.map(
    ([command, handler]): ApplicationCommandPair => [
      command,
      async (interaction) => {
        try {
          console.log('interaction:', interaction);
          const response = await handler(interaction);
          console.log('response:', response);
          return response;
        } catch (error) {
          if (error instanceof Error) {
            console.error({
              ...error,
              name: error.name,
              message: error.message,
              stack: error.stack,
            });
          } else {
            console.error(error);
          }
          throw error;
        }
      },
    ],
  );
}
