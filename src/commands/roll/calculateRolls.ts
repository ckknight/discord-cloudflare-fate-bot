import { Random } from "random-js";
import { Token } from "./tokenize";

export function calculateRolls(tokens: readonly Token[], random: Random): number[][] {
  return tokens.map(token => {
    switch (token.type) {
      case 'dice':
        return Array.from({ length: token.count }, () => random.integer(token.min, token.max));
      default:
        return []
    }
  })
}