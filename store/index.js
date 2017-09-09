import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import club from '../containers/Club/reducer'

const reducer = combineReducers({
  club
})

export default function configureStore() {
  return createStore(reducer, applyMiddleware(thunk))
}