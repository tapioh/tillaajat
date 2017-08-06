import {
  TOGGLE_PLAYER,
  RESET_PLAYERS,
  GENERATE_LINEUP,
  GENERATE_LINEUP_STATUS,
  REQUEST_GENERATE_LINEUP,
  RECEIVE_GENERATE_LINEUP,
  GENERATE_LINEUP_DURATION_IN_MS
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
    dispatch({
      type: GENERATE_LINEUP_STATUS,
      data: REQUEST_GENERATE_LINEUP
    })
    setTimeout(() => {
      dispatch({
        type: GENERATE_LINEUP,
        data: lineUpGenerator(players, selectedPlayers)
      })
    }, GENERATE_LINEUP_DURATION_IN_MS)
    setTimeout(() => {
      dispatch({
        type: GENERATE_LINEUP_STATUS,
        data: RECEIVE_GENERATE_LINEUP
      })
    }, GENERATE_LINEUP_DURATION_IN_MS * 2)
  }
}
