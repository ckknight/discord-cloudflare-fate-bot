import test from 'ava';
import { commands as commandPairs } from './';

test('commands', (t) => {
  const commands = commandPairs.map(([command]) => command);

  t.snapshot(commands);
});
