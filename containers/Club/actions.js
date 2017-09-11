import {
  TOGGLE_PLAYER,
  RESET_PLAYERS,
  GENERATE_LINEUP,
  GENERATE_LINEUP_DURATION_IN_MS,
  RESET_LINEUP,
  ANIMATE_LINEUP_IN,
  ANIMATE_LINEUP_OUT_START,
  ANIMATE_LINEUP_OUT_END,
  LINEUP_ANIMATION_DURATION_IN_MS
} from './constants'
import { lineUpGenerator } from '../../util'

export function togglePlayer(playerNumber) {
  return {
    type: TOGGLE_PLAYER,
    data: playerNumber
  }
}

export function resetPlayers() {
  return {
    type: RESET_PLAYERS
  }
}

export function generateLineUp(players, selectedPlayers) {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: GENERATE_LINEUP,
          data: lineUpGenerator(players, selectedPlayers)
        })
        resolve()
      }, GENERATE_LINEUP_DURATION_IN_MS)
    })
  }
}

export function resetLineUp() {
  return {
    type: RESET_LINEUP
  }
}

export function animateLineUpIn() {
  return {
    type: ANIMATE_LINEUP_IN
  }
}

export function animateLineUpOut() {
  return dispatch => {
    dispatch({
      type: ANIMATE_LINEUP_OUT_START
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: ANIMATE_LINEUP_OUT_END
        })
        resolve()
      }, LINEUP_ANIMATION_DURATION_IN_MS)
    })
  }
}
