import { ApplicationCommand, InteractionResponse } from "@glenstack/cf-workers-discord-bot";
import { ApplicationCommandPair, Interaction } from "../types";
import { extractOptions } from "./extractOptions";

export function createCommandPair(
  command: ApplicationCommand,
  handler: (
    interaction: Interaction,
    options: any,
  ) => InteractionResponse | Promise<InteractionResponse>
): ApplicationCommandPair {
  return [command, (interaction) => handler(interaction, extractOptions(interaction.data?.options))];
}