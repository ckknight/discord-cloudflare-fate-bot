import type { ApplicationCommandInteractionDataOption } from '@glenstack/cf-workers-discord-bot';
import test, { type ExecutionContext } from 'ava';
import { extractOptions } from './extractOptions';

function macro(t: ExecutionContext) {
  const title = t.title.slice(1, -1);
  const input = JSON.parse(title) as
    | readonly ApplicationCommandInteractionDataOption[];
  t.snapshot(extractOptions(input), 'result');
}

const cases: (readonly ApplicationCommandInteractionDataOption[])[] = [
  [],
  [
    {
      name: 'alpha',
    },
    {
      name: 'bravo',
      value: 'charlie',
    },
    {
      name: 'delta',
      value: 123.456,
    },
    {
      name: 'echo',
      value: true,
    },
    {
      name: 'foxtrot',
      value: false,
    },
    {
      name: 'golf',
      options: [
        {
          name: 'hotel',
          value: 'india',
        },
        {
          name: 'juliet',
          value: 42,
        },
      ],
    },
  ],
];
cases.forEach((input) => {
  test(`\`${JSON.stringify(input)}\``, macro);
});
