import { Token } from './tokenize';

function sum(values: readonly number[]): number {
  return values.reduce((x, y) => x + y, 0);
}

export function calculateTotal(
  tokens: readonly Token[],
  rolls: ReadonlyArray<readonly number[]>,
): number {
  let multiplier = 1;
  let total = 0;
  const { length } = tokens;
  if (rolls.length !== length) {
    throw new RangeError(
      `Expected rolls.length (${rolls.length}) to be the same as tokens.length (${tokens.length})`,
    );
  }
  for (let index = 0; index < length; ++index) {
    const token = tokens[index]!;
    switch (token.type) {
      case 'dice':
        total += multiplier * sum(rolls[index]!);
        break;
      case 'literal':
        total += multiplier * token.value;
        break;
      case 'operator':
        switch (token.operator) {
          case '+':
            multiplier = 1;
            break;
          case '-':
            multiplier = -1;
            break;
          default:
            throw new TypeError(`Unknown operator ${token.operator}`);
        }
        break;
    }
  }
  return total;
}
