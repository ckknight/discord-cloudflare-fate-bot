import {
  InteractionResponseType,
  type InteractionResponse,
} from '@glenstack/cf-workers-discord-bot';
import { shuffle as randomShuffle, integer, nativeMath } from 'random-js';
import { emojifyNumber } from '../../utils/emojifyNumber';

function tryParse(
  unparsedItems: string,
  separator: RegExp | string,
): string[] | null {
  const items = unparsedItems
    .split(separator)
    .map((x) => x.trim())
    .filter(Boolean);
  if (items.length >= 2) {
    return items;
  }
  return null;
}

function parseItems(unparsedItems: string): string[] {
  if (unparsedItems.trim() === '') {
    return [];
  }
  return (
    tryParse(unparsedItems, ';') ??
    tryParse(unparsedItems, ',') ??
    tryParse(unparsedItems, /\s+/g) ?? [unparsedItems.trim()]
  );
}

export function shuffle(
  unparsedItems = '',
): InteractionResponse | Promise<InteractionResponse> {
  const items = parseItems(unparsedItems);
  const shuffled = randomShuffle(nativeMath, items);

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `:black_joker: ${shuffled
        .map((value, index) => `${emojifyNumber(index + 1)} ${value}`)
        .join(' ')}`,
    },
  };
}

export function pick(
  unparsedItems = '',
): InteractionResponse | Promise<InteractionResponse> {
  const items = parseItems(unparsedItems);
  if (items.length < 1) {
    throw new TypeError(`Expected at least 1 item`);
  }
  const pickedIndex = integer(0, items.length - 1)(nativeMath);

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `:black_joker: ${items
        .map((value, index) => `${emojifyNumber(index + 1)} ${value}`)
        // make the picked one bold and italic
        .map((text, index) => (index === pickedIndex ? `***${text}***` : text))
        .join(' ')}`,
    },
  };
}
