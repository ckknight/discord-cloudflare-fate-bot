import type { ExecutionContext } from 'ava';
import test from 'ava';
import { fixtures } from './fixtures';
import { tokenize } from './tokenize';

function macro(t: ExecutionContext) {
  t.snapshot(tokenize(t.title));
}

fixtures.forEach((input) => {
  test(input, macro);
});
