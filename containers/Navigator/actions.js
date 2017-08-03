import { CHANGE_SCREEN } from './constants'

export function changeScreen(screenName) {
  return {
    type: CHANGE_SCREEN,
    data: screenName
  }
}
