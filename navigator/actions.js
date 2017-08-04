import {
  CHANGE_SCREEN,
  CHANGE_SCREEN_START,
  CHANGE_SCREEN_END,
  CHANGE_SCREEN_DURATION_IN_MS
} from './constants'

export function changeScreen(screenName) {
  return async dispatch => {
    dispatch({
      type: CHANGE_SCREEN_START
    })
    setTimeout(() => {
      dispatch({
        type: CHANGE_SCREEN,
        data: screenName
      })
      dispatch({
        type: CHANGE_SCREEN_END
      })
    }, CHANGE_SCREEN_DURATION_IN_MS / 2)
  }
}
