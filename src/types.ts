import type {
  ApplicationCommand,
  ApplicationCommandInteractionData,
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
