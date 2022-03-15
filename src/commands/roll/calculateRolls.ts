import type { Engine } from 'random-js';
import { integer } from 'random-js';
import type { Token } from './tokenize';

export function calculateRolls(
  tokens: readonly Token[],
  engine: Engine,
): number[][] {
  return tokens.map((token) => {
    switch (token.type) {
      case 'dice': {
        const distribution = integer(token.min, token.max);
        return Array.from({ length: token.count }, () => distribution(engine));
      }
      default:
        return [];
    }
  });
}
