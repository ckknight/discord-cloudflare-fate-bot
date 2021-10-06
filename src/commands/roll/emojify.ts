import { Token } from './tokenize';

function emojifyNumeralDie(value: number) {
  switch (value) {
    case 0: return ':zero:';
    case 1: return ':one:';
    case 2: return ':two:';
    case 3: return ':three:';
    case 4: return ':four:';
    case 5: return ':five:';
    case 6: return ':six:';
    case 7: return ':seven:';
    case 8: return ':eight:';
    case 9: return ':nine:';
    case 10: return ':keycap_ten:';
    default: return `${value}`;
  }
}

function emojifyPercentageDie(value: number) {
  if (value === 100) {
    return ':100:';
  } else {
    return `${emojifyNumeralDie(Math.floor(value / 10))}${emojifyNumeralDie(value % 10)}`;
  }
}

function emojifyPermillageDie(value: number) {
  if (value === 100) {
    return ':100:';
  } else {
    return `${emojifyNumeralDie(Math.floor(value / 100))}${emojifyNumeralDie(Math.floor(value / 10) % 10)}${emojifyNumeralDie(value % 10)}`;
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
