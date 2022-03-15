import type {
  ApplicationCommand,
  ApplicationCommandOptionType,
  InteractionResponse,
} from '@glenstack/cf-workers-discord-bot';
import type {
  ApplicationCommandPair,
  Interaction,
  ReadonlyApplicationCommand,
} from '../types';
import { extractOptions } from './extractOptions';

// SUB_COMMAND = 1,
// SUB_COMMAND_GROUP = 2,

type Cast<X, Y> = X extends Y ? X : Y;

type ExtractValue<T> = T extends {
  readonly choices: readonly {
    readonly value: infer V;
  }[];
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
        | ApplicationCommandOptionType.CHANNEL
        | ApplicationCommandOptionType.ROLE
        | ApplicationCommandOptionType.STRING
        | ApplicationCommandOptionType.USER;
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
  : T extends {
      readonly type: ApplicationCommandOptionType.SUB_COMMAND;
      readonly options: readonly ApplicationCommand[];
    }
  ? T extends { readonly required: true }
    ? ExtractOptions<T['options']>
    : ExtractOptions<T['options']> | undefined
  : unknown;

type ExtractOptions<T> = T extends readonly {
  readonly name: infer Key;
}[]
  ? {
      readonly [K in Cast<Key, string>]: ExtractValue<
        Extract<
          T[number],
          {
            readonly name: K;
          }
        >
      >;
    }
  : { readonly [key in string]: unknown };

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
      handler(
        extractOptions(interaction.data?.options ?? []) as ExtractOptions<
          NonNullable<TCommand['options']>
        >,
        interaction,
      ),
  ];
}
