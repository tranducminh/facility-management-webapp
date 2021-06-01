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
    case NotificationType.PUSH_REALTIME_NOTIFICATION:
      if (state.id !== action.payload.id) {
        return {
          ...defaultState,
          isEnabled: true,
          ...action.payload,
        }
      }
      return { ...defaultState, id: state.id }
    case NotificationType.PUSH_NOTIFICATION:
      return {
        ...defaultState,
        isEnabled: true,
        ...action.payload,
      }
    case NotificationType.RESET_NOTIFICATION:
      return { ...defaultState, id: state.id }
    default:
      return state
  }
}
