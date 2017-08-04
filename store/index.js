import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import navigator from '../navigator/reducer'
import club from '../containers/Club/reducer'

const reducer = combineReducers({
  navigator,
  club
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store