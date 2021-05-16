import { combineReducers } from 'redux'
import { UserReducer } from './user.reducer'
import { AuthReducer } from './auth.reducer'
import { NotificationReducer } from './notification.reducer'

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  notification: NotificationReducer,
})

export default rootReducer
