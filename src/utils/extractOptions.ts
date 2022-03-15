import type { ApplicationCommandInteractionDataOption } from '@glenstack/cf-workers-discord-bot';

export function extractOptions(
  options: readonly ApplicationCommandInteractionDataOption[],
): unknown {
  return Object.fromEntries(
    options.map((option) => [
      option.name,
      option.options !== undefined
        ? extractOptions(option.options)
        : option.value,
    ]),
  );
}
