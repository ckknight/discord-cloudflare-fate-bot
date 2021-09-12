import { Interaction } from './types';

export function getUser(interaction: Interaction) {
  if ('user' in interaction) {
    return interaction.user;
  } else {
    return interaction.member.user;
  }
}
