import test from 'ava';
import { commands as commandPairs } from './';

test('commands', (t) => {
  const commands = commandPairs.map(pair => pair[0]);

  t.snapshot(commands);
});