export interface DiceToken {
  readonly type: 'dice';
  readonly count: number;
  readonly min: number;
  readonly max: number;
}

export interface LiteralToken {
  readonly type: 'literal';
  readonly value: number;
}

export interface OperatorToken {
  readonly type: 'operator';
  readonly operator: string;
}

export type Token = DiceToken | LiteralToken | OperatorToken;

const diceRegex = /(\d*)d(?:(f)|(\d+)(?:\.\.(\d+))?)/i;
const literalRegex = /\d+/;
const operatorRegex = /[+-]/;

function* tokenizeGen(input: string): Generator<Token> {
  const tokenRegex = new RegExp(
    `\\s+|(?<dice>${diceRegex.source})|(?<literal>${literalRegex.source})|(?<operator>${operatorRegex.source})`,
    'yi',
  );
  while (true) {
    const { lastIndex } = tokenRegex;
    if (lastIndex === input.length) {
      break;
    }
    const match = tokenRegex.exec(input);
    if (match == null) {
      throw new Error(
        `Unknown characters at ${lastIndex}: ${JSON.stringify(
          input.substring(lastIndex),
        )}`,
      );
    }
    if (match.index !== lastIndex) {
      throw new Error(
        `Unknown characters at ${lastIndex}: ${JSON.stringify(
          input.substring(lastIndex, match.index),
        )}`,
      );
    }
    const { groups = {} } = match;
    if (groups.dice) {
      const [, count, f, min, max] = diceRegex.exec(groups.dice)!;
      const countNum = Number(count || '1');
      if (f != null) {
        yield {
          type: 'dice',
          count: countNum,
          min: -1,
          max: 1,
        };
      } else if (max == null) {
        yield {
          type: 'dice',
          count: countNum,
          min: 1,
          max: Number(min),
        };
      } else {
        yield {
          type: 'dice',
          count: countNum,
          min: Number(min),
          max: Number(max),
        };
      }
    } else if (groups.literal) {
      yield {
        type: 'literal',
        value: Number(groups.literal),
      };
    } else if (groups.operator) {
      yield {
        type: 'operator',
        operator: groups.operator,
      };
    }
  }
}

export function tokenize(input: string): Token[] {
  return Array.from(tokenizeGen(input));
}
