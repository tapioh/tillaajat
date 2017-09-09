import {
  TOGGLE_PLAYER,
  RESET_PLAYERS,
  GENERATE_LINEUP,
  RESET_LINEUP
} from './constants'
import players from '../../players'
import _ from 'lodash'

const initialState = {
  players,
  selectedPlayers: [],
  lineUp: {
    lines: [],
    goalkeepers: []
  }
}

export default function club(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER:
      const selectedPlayers = state.selectedPlayers
      const selectedPlayerNumber = action.data.number
      if (_.includes(selectedPlayers, selectedPlayerNumber)) {
        _.remove(selectedPlayers, number => { return number === selectedPlayerNumber })
      } else  {
        selectedPlayers.push(selectedPlayerNumber)
      }
      return {...state, selectedPlayers}
    case RESET_PLAYERS:
      return {...state, selectedPlayers: []}
    case GENERATE_LINEUP:
      return {...state, lineUp: action.data}
    case RESET_LINEUP:
      return {...state, lineUp: initialState.lineUp}
    default:
      return state
  }
}
