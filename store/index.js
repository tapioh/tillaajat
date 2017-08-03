import { createStore, combineReducers } from 'redux'
import navigator from '../containers/Navigator/reducer'
import pickScreen from '../containers/PickScreen/reducer'

const reducer = combineReducers({
  navigator,
  club: pickScreen
})

const store = createStore(reducer)
export default store