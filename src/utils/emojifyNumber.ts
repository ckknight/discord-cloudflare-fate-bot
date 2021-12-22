export function emojifyNumeralDie(value: number) {
  switch (value) {
    case 0:
      return ':zero:';
    case 1:
      return ':one:';
    case 2:
      return ':two:';
    case 3:
      return ':three:';
    case 4:
      return ':four:';
    case 5:
      return ':five:';
    case 6:
      return ':six:';
    case 7:
      return ':seven:';
    case 8:
      return ':eight:';
    case 9:
      return ':nine:';
    case 10:
      return ':keycap_ten:';
    default:
      return `${value}`;
  }
}

export function emojifyPercentageDie(value: number) {
  if (value === 100) {
    return ':100:';
  } else {
    return `${emojifyNumeralDie(Math.floor(value / 10))}${emojifyNumeralDie(
      value % 10,
    )}`;
  }
}

export function emojifyPermillageDie(value: number) {
  if (value === 100) {
    return ':100:';
  } else {
    return `${emojifyNumeralDie(Math.floor(value / 100))}${emojifyNumeralDie(
      Math.floor(value / 10) % 10,
    )}${emojifyNumeralDie(value % 10)}`;
  }
}

export function emojifyNumber(value: number) {
  if (!Number.isSafeInteger(value) || value < 0) {
    return `${value}`;
  }
  if (value <= 10) {
    return emojifyNumeralDie(value);
  }
  if (value === 100) {
    return ':100:';
  }
  const digitCount = Math.floor(Math.log10(value)) + 1;
  return Array.from({ length: digitCount }, (_, index) =>
    emojifyNumeralDie(Math.floor((value / 10 ** index) % 10)),
  )
    .reverse()
    .join('');
}
