import { TOGGLE_PLAYER } from './constants'
import players from '../../players'
import _ from 'lodash'

const initialState = { players, selectedPlayers: [] }

export default function pickScreen(state = initialState, action) {
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
    default:
      return state
  }
}
