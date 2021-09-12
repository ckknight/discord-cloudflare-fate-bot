import { ApplicationCommandPair } from '../types';
import { eightBall } from './8ball';
import { hello } from './hello';

export const commands: ApplicationCommandPair[] = [hello, eightBall];
