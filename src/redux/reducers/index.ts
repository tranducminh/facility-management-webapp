import { combineReducers } from 'redux'
import { UserReducer } from './user.reducer'
import { AuthReducer } from './auth.reducer'
import { NotificationReducer } from './notification.reducer'
import { ArrangementReducer } from './arrangement.reducer'

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  notification: NotificationReducer,
  arrangement: ArrangementReducer,
})

export default rootReducer

export type ReducersType = ReturnType<typeof rootReducer>
