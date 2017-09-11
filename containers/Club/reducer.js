import {
  TOGGLE_PLAYER,
  RESET_PLAYERS,
  GENERATE_LINEUP,
  RESET_LINEUP,
  ANIMATE_LINEUP_IN,
  ANIMATE_LINEUP_OUT_START,
  ANIMATE_LINEUP_OUT_END,
  LINEUP_SCREEN_STATUS_ANIMATE_OUT,
  LINEUP_SCREEN_STATUS_HIDDEN,
  LINEUP_SCREEN_STATUS_VISIBLE
} from './constants'
import players from '../../players'
import _ from 'lodash'

const initialState = {
  players,
  selectedPlayers: [],
  lineUp: {
    lines: [],
    goalkeepers: []
  },
  lineUpScreenStatus: LINEUP_SCREEN_STATUS_HIDDEN
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
    case ANIMATE_LINEUP_OUT_START:
      return {...state, lineUpScreenStatus: LINEUP_SCREEN_STATUS_ANIMATE_OUT}
    case ANIMATE_LINEUP_OUT_END:
      return {...state, lineUpScreenStatus: LINEUP_SCREEN_STATUS_HIDDEN}
    case ANIMATE_LINEUP_IN:
      return {...state, lineUpScreenStatus: LINEUP_SCREEN_STATUS_VISIBLE}
    default:
      return state
  }
}
