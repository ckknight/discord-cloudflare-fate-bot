import { ApplicationCommand } from '@glenstack/cf-workers-discord-bot';

export async function calculateCommandsHash(commands: readonly ApplicationCommand[]): Promise<string> {
  return JSON.stringify(commands);
}
