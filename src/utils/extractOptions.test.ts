import { ApplicationCommandInteractionDataOption } from '@glenstack/cf-workers-discord-bot';
import test, { ExecutionContext } from 'ava';
import { extractOptions } from './extractOptions';

function macro(t: ExecutionContext) {
  const title = t.title.slice(1, -1);
  const input:
    | readonly ApplicationCommandInteractionDataOption[]
    | null
    | undefined = title === 'undefined' ? undefined : JSON.parse(title);
  t.snapshot(extractOptions(input), 'result');
}

const cases: (
  | readonly ApplicationCommandInteractionDataOption[]
  | null
  | undefined
)[] = [
  null,
  undefined,
  [],
  [
    {
      name: 'alpha',
    },
    {
      name: 'bravo',
      value: 'charlie'
    },
    {
      name: 'delta',
      value: 123.456
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
          value: 42
        }
      ]
    }
  ],
];
cases.forEach((input) =>
  test(`\`${input == null ? String(input) : JSON.stringify(input)}\``, macro),
);
