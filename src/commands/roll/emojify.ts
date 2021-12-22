import { emojifyNumeralDie, emojifyPercentageDie, emojifyPermillageDie } from '../../utils/emojifyNumber';
import { Token } from './tokenize';

function emojifyFateDie(value: number) {
  switch (value) {
    case -1:
      return '⊟';
    case 0:
      return '⊡';
    case 1:
      return '⊞';
    default:
      return `${value}`;
  }
}

export function emojify(
  tokens: readonly Token[],
  rolls: ReadonlyArray<readonly number[]>,
): string {
  const strings: string[] = [];
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
        let emojifier: (value: number) => string = String;
        if (token.min === 1) {
          if (token.max <= 10) {
            emojifier = emojifyNumeralDie;
          } else if (token.max === 100) {
            emojifier = emojifyPercentageDie;
          } else if (token.max === 1000) {
            emojifier = emojifyPermillageDie;
          }
        } else if (token.min === -1 && token.max === 1) {
          emojifier = emojifyFateDie;
        }
        const roll = rolls[index]!;
        if (roll.length === 1) {
          strings.push(emojifier(roll[0]!));
        } else {
          strings.push('(', roll.map(emojifier).join(' + '), ')');
        }
        break;
      case 'literal':
        strings.push(`${token.value}`);
        break;
      case 'operator':
        strings.push(' ', token.operator, ' ');
        break;
    }
  }
  return strings.join('');
}
