import { TOGGLE_PLAYER } from './constants'

export function togglePlayer(player) {
  return {
    type: TOGGLE_PLAYER,
    data: player
  }
}
