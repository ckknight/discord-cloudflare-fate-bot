import {
  type InteractionResponse,
  InteractionResponseType,
} from '@glenstack/cf-workers-discord-bot';

export async function add({
  userId,
  serverId = 'null',
  entry,
}: {
  readonly userId: string;
  readonly serverId: string | undefined;
  readonly entry: string;
}): Promise<InteractionResponse> {
  await WORDLE.put(
    `entries/${serverId}/${userId}/${new Date().toISOString()}`,
    entry,
  );
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: entry,
    },
  };
}

export async function list({
  userId,
  serverId = 'null',
}: {
  readonly userId: string;
  readonly serverId: string | undefined;
}): Promise<InteractionResponse> {
  const prefix = `entries/${serverId}/${userId}/`;
  const result = await WORDLE.list({ prefix });
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: result.keys
        .map((key) => key.name.substring(prefix.length))
        .join('; '),
    },
  };
}
