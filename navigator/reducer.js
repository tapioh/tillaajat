import { CHANGE_SCREEN, SCREEN_PICK_SCREEN } from './constants'

const initialState = { screen: SCREEN_PICK_SCREEN }

export default function navigator(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {...state, screen: action.data}
    default:
      return state
  }
}
