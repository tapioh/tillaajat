import {
  CHANGE_SCREEN,
  CHANGE_SCREEN_START,
  CHANGE_SCREEN_END,
  SCREEN_PICK_SCREEN
} from './constants'

const initialState = {
  screen: SCREEN_PICK_SCREEN,
  screenChangeStatus: ''
}

export default function navigator(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {...state, screen: action.data}
    case CHANGE_SCREEN_START:
      return {...state, screenChangeStatus: CHANGE_SCREEN_START}
    case CHANGE_SCREEN_END:
      return {...state, screenChangeStatus: CHANGE_SCREEN_END}
    default:
      return state
  }
}
