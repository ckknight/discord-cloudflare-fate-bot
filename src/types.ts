import type {
  ApplicationCommand,
  ApplicationCommandInteractionData,
  ApplicationCommandOptionType,
  GuildMember,
  InteractionResponse,
  InteractionType,
  Snowflake,
} from '@glenstack/cf-workers-discord-bot';

export interface BaseInteraction {
  id: Snowflake;
  type: InteractionType;
  data?: ApplicationCommandInteractionData;
  channel_id: Snowflake;
  token: string;
  version: number;
}
export interface DirectMessageInteraction extends BaseInteraction {
  user: GuildMember['user'];
}
export interface GuildMessageInteraction extends BaseInteraction {
  guild_id: Snowflake;
  member: GuildMember;
}
export type Interaction = DirectMessageInteraction | GuildMessageInteraction;
export type InteractionHandler = (
  interaction: Interaction,
) => InteractionResponse | Promise<InteractionResponse>;

export type ApplicationCommandPair = [ApplicationCommand, InteractionHandler];

export interface ReadonlyApplicationCommandOptionChoice {
  readonly name: string;
  readonly value: number | string;
}

export interface ReadonlyApplicationCommandOption {
  readonly type: ApplicationCommandOptionType;
  readonly name: string;
  readonly description: string;
  readonly default?: boolean;
  readonly required?: boolean;
  readonly choices?: readonly ReadonlyApplicationCommandOptionChoice[];
  readonly options?: readonly ReadonlyApplicationCommandOption[];
}
export interface ReadonlyApplicationCommand {
  readonly name: string;
  readonly description: string;
  readonly options?: readonly ReadonlyApplicationCommandOption[];
}
