import { PushNotificationPayload } from '../payloads/notification.payload'
import { NotificationType } from '../types/notification.type'

export const pushNotification = (payload: PushNotificationPayload) => ({
  type: NotificationType.PUSH_NOTIFICATION,
  payload,
})

export const resetNotification = () => ({
  type: NotificationType.RESET_NOTIFICATION,
})
