import type { ApplicationCommand } from '@glenstack/cf-workers-discord-bot';

// eslint-disable-next-line @typescript-eslint/require-await
export async function calculateCommandsHash(
  commands: readonly ApplicationCommand[],
): Promise<string> {
  return JSON.stringify(commands);
}
