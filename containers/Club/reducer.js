import { TOGGLE_PLAYER, GENERATE_LINEUP, GENERATE_LINEUP_STATUS } from './constants'
import players from '../../players'
import _ from 'lodash'

const initialState = {
  players,
  selectedPlayers: [],
  lineUpStatus: '',
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
    case GENERATE_LINEUP:
      return {...state, lineUp: action.data}
    case GENERATE_LINEUP_STATUS:
      return {...state, lineUpStatus: action.data}
    default:
      return state
  }
}
