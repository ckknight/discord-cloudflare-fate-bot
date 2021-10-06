import test, { ExecutionContext } from 'ava';
import { Random, MersenneTwister19937 } from 'random-js';
import { calculateRolls } from './calculateRolls';
import { calculateTotal } from './calculateTotal';
import { fixtures } from './fixtures';
import { tokenize } from './tokenize';

function macro(t: ExecutionContext) {
  const random = new Random(MersenneTwister19937.seed(1234));
  const tokens = tokenize(t.title);
  const rolls = calculateRolls(tokens, random);
  t.snapshot(calculateTotal(tokens, rolls), `with rolls ${JSON.stringify(rolls)}`);
}

fixtures.forEach(input => test(input, macro))
