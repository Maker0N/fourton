import { createStore, combineReducers } from 'redux'
import cartReducer from './cartReducer'

const reducers = combineReducers({
  cartReducer
})

const store = createStore(reducers)

export default store