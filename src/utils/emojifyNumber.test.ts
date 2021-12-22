import test, { ExecutionContext } from 'ava';
import { emojifyNumber } from './emojifyNumber';

function macro(t: ExecutionContext) {
  const value = Number(t.title);
  t.snapshot(emojifyNumber(value), `with input ${value}`);
}

[
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  -1,
  42,
  -42,
  99,
  100,
  999,
  1000,
  9999,
  10000,
].forEach(input => test(`${input}`, macro))
