import { combineReducers } from 'redux'
import { UserReducer } from './user.reducer'
import { AuthReducer } from './auth.reducer'

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
})

export default rootReducer
