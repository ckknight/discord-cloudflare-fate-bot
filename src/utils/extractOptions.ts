import { ApplicationCommandInteractionDataOption } from '@glenstack/cf-workers-discord-bot';

export function extractOptions<T = any>(
  options:
    | readonly ApplicationCommandInteractionDataOption[]
    | null
    | undefined,
): T {
  if (options == null) {
    return {} as any;
  } else {
    return Object.fromEntries(
      options.map((option) => [
        option.name,
        option.options !== undefined ? extractOptions(option.options) : option.value,
      ]),
    ) as any;
  }
}
