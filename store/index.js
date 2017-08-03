import { createStore, combineReducers } from 'redux'
import pickView from '../containers/PickView/reducer'

const reducer = combineReducers({
  club: pickView
})

const store = createStore(reducer)
export default store