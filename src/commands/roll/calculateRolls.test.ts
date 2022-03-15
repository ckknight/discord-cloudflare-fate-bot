import test, { type ExecutionContext } from 'ava';
import { MersenneTwister19937 } from 'random-js';
import { calculateRolls } from './calculateRolls';
import { fixtures } from './fixtures';
import { tokenize } from './tokenize';

function macro(t: ExecutionContext) {
  t.snapshot(
    calculateRolls(tokenize(t.title), MersenneTwister19937.seed(1234)),
  );
}

fixtures.forEach((input) => {
  test(input, macro);
});
