import {
  ApplicationCommand,
  ApplicationCommandOptionType,
  InteractionResponse,
} from '@glenstack/cf-workers-discord-bot';
import {
  ApplicationCommandPair,
  Interaction,
  ReadonlyApplicationCommand,
} from '../types';
import { extractOptions } from './extractOptions';

type Cast<X, Y> = X extends Y ? X : Y;

type ExtractValue<T> = T extends {
  readonly choices: ReadonlyArray<{
    readonly value: infer V;
  }>;
}
  ? T extends { readonly required: true }
    ? V
    : V | undefined
  : T extends {
      readonly type: ApplicationCommandOptionType.BOOLEAN;
    }
  ? T extends { readonly required: true }
    ? boolean
    : boolean | undefined
  : T extends {
      readonly type:
        | ApplicationCommandOptionType.STRING
        | ApplicationCommandOptionType.USER
        | ApplicationCommandOptionType.CHANNEL
        | ApplicationCommandOptionType.ROLE;
    }
  ? T extends { readonly required: true }
    ? string
    : string | undefined
  : T extends {
      readonly type: ApplicationCommandOptionType.INTEGER;
    }
  ? T extends { readonly required: true }
    ? number
    : number | undefined
  : unknown;
// SUB_COMMAND = 1,
// SUB_COMMAND_GROUP = 2,

type ExtractOptions<T> = T extends ReadonlyArray<{
  readonly name: infer Key;
}>
  ? {
      [K in Cast<Key, string>]: ExtractValue<
        Extract<
          T[number],
          {
            readonly name: K;
          }
        >
      >;
    }
  : { [key in string]: unknown };

export function createCommandPair<TCommand extends ReadonlyApplicationCommand>(
  command: TCommand,
  handler: (
    options: ExtractOptions<NonNullable<TCommand['options']>>,
    interaction: Interaction,
  ) => InteractionResponse | Promise<InteractionResponse>,
): ApplicationCommandPair {
  return [
    command as ApplicationCommand,
    (interaction) =>
      handler(extractOptions(interaction.data?.options), interaction),
  ];
}
