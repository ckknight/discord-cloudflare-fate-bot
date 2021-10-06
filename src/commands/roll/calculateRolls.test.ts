import test, { ExecutionContext } from 'ava';
import { Random, MersenneTwister19937 } from 'random-js';
import { calculateRolls } from './calculateRolls';
import { fixtures } from './fixtures';
import { tokenize } from './tokenize';

function macro(t: ExecutionContext) {
  const random = new Random(MersenneTwister19937.seed(1234));
  t.snapshot(calculateRolls(tokenize(t.title), random));
}

fixtures.forEach(input => test(input, macro))
