import test, { type ExecutionContext } from 'ava';
import { MersenneTwister19937 } from 'random-js';
import { calculateRolls } from './calculateRolls';
import { calculateTotal } from './calculateTotal';
import { fixtures } from './fixtures';
import { tokenize } from './tokenize';

function macro(t: ExecutionContext) {
  const tokens = tokenize(t.title);
  const rolls = calculateRolls(tokens, MersenneTwister19937.seed(1234));
  t.snapshot(
    calculateTotal(tokens, rolls),
    `with rolls ${JSON.stringify(rolls)}`,
  );
}

fixtures.forEach((input) => {
  test(input, macro);
});
