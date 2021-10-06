import { Token } from "./tokenize";

function stringifyToken(token: Token) {
  switch (token.type) {
    case 'dice':
      if (token.min === 1) {
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

export function stringify(tokens: readonly Token[]) {
  return tokens.map(stringifyToken).join(' ');
}