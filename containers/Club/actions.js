import {
  TOGGLE_PLAYER,
  RESET_PLAYERS,
  GENERATE_LINEUP,
  GENERATE_LINEUP_DURATION_IN_MS,
  RESET_LINEUP
} from './constants'
import { lineUpGenerator } from '../../util'

export function togglePlayer(player) {
  return {
    type: TOGGLE_PLAYER,
    data: player
  }
}

export function resetPlayers() {
  return {
    type: RESET_PLAYERS
  }
}

export function generateLineUp(players, selectedPlayers) {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: GENERATE_LINEUP,
        data: lineUpGenerator(players, selectedPlayers)
      })
    }, GENERATE_LINEUP_DURATION_IN_MS)
  }
}

export function resetLineUp() {
  return {
    type: RESET_LINEUP
  }
}
