import type { ApplicationCommandPair } from '../types';
import { eightBall } from './8ball';
import { date } from './date';
import { hello } from './hello';
import { roll } from './roll';
import { shuffle, pick } from './shuffle';
import { vamp } from './vamp';
import { wordle } from './wordle';

export const commands: ApplicationCommandPair[] = [
  hello,
  eightBall,
  roll,
  vamp,
  date,
  shuffle,
  pick,
  wordle,
];
