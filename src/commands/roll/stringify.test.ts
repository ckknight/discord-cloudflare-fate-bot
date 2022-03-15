import type { ExecutionContext } from 'ava';
import test from 'ava';
import { fixtures } from './fixtures';
import { stringify } from './stringify';
import { tokenize } from './tokenize';

function macro(t: ExecutionContext) {
  t.snapshot(stringify(tokenize(t.title)));
}

fixtures.forEach((input) => {
  test(input, macro);
});
