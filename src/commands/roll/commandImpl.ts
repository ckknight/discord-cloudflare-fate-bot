import { InteractionResponse, InteractionResponseType } from "@glenstack/cf-workers-discord-bot";
import { nativeMath } from "random-js";
import { calculateRolls } from "./calculateRolls";
import { calculateTotal } from "./calculateTotal";
import { emojify } from "./emojify";
import { stringify } from "./stringify";
import { tokenize } from "./tokenize";

export function roll(input: string): InteractionResponse | Promise<InteractionResponse> {
  try {
    const tokens = tokenize(input);
    const rolls = calculateRolls(tokens, nativeMath);

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Rolling ${stringify(tokens)}: ${emojify(tokens, rolls)} = ${calculateTotal(tokens, rolls)}`,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Error rolling ${input}: ${message}`,
      },
    };
  }
}