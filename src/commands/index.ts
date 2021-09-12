import { ApplicationCommandPair } from '../types';
import { eightBall } from './8ball';
import { hello } from './hello';
import { roll } from './roll';

export const commands: ApplicationCommandPair[] = [hello, eightBall, roll];
