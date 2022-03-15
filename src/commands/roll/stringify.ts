import type { Token } from './tokenize';

function stringifyToken(token: Token): string {
  switch (token.type) {
    case 'dice':
      if (token.min === -1 && token.max === 1) {
        return `${token.count}dF`;
      } else if (token.min === 1) {
        return `${token.count}d${token.max}`;
      } else {
        return `${token.count}d${token.min}..${token.max}`;
      }
    case 'literal':
      return `${token.value}`;
    case 'operator':
      return token.operator;
  }
}

export function stringify(tokens: readonly Token[]): string {
  return tokens.map(stringifyToken).join(' ');
}
