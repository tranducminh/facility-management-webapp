import {
  NotificationType,
  NotificationStatus,
} from '../types/notification.type'

const defaultState: {
  id?: number
  title: string
  description?: string
  status: NotificationStatus
  isEnabled: boolean
} = {
  title: '',
  description: '',
  status: NotificationStatus.INFO,
  isEnabled: false,
}

export const NotificationReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case NotificationType.PUSH_NOTIFICATION:
      if (state.id !== action.payload.id || !state.id) {
        debugger
        return {
          ...defaultState,
          isEnabled: true,
          ...action.payload,
        }
      }
      debugger
      return defaultState
    case NotificationType.RESET_NOTIFICATION:
      return defaultState
    default:
      return state
  }
}
