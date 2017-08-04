import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import navigator from '../navigator/reducer'
import pickScreen from '../containers/PickScreen/reducer'

const reducer = combineReducers({
  navigator,
  club: pickScreen
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store