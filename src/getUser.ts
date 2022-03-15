import type { GuildMember } from '@glenstack/cf-workers-discord-bot';
import type { Interaction } from './types';

export function getUser(interaction: Interaction): GuildMember['user'] {
  if ('user' in interaction) {
    return interaction.user;
  } else {
    return interaction.member.user;
  }
}
