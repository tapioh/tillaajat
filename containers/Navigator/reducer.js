import { CHANGE_SCREEN } from './constants'

const initialState = { screen: 'PickScreen' }

export default function navigator(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {...state, screen: action.type.data}
    default:
      return state
  }
}
