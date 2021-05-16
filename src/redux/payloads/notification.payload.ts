import { NotificationStatus } from '../types/notification.type'

export type PushNotificationPayload = {
  id?: number
  title?: string
  description?: string
  status?: NotificationStatus
}
