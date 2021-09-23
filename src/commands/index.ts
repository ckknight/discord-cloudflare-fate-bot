import { ApplicationCommandPair } from '../types';
import { eightBall } from './8ball';
import { date } from './date';
import { hello } from './hello';
import { roll } from './roll';
import { vamp } from './vamp';

export const commands: ApplicationCommandPair[] = [hello, eightBall, roll, vamp, date];
