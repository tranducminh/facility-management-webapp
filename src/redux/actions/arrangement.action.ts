import {
  SetCurrentEmployeePayload,
  SetCurrentRoomPayload,
} from '../payloads/arrangement.payload'
import { ArrangementType } from '../types/arrangement.type'

export const setCurrentEmployee = (payload: SetCurrentEmployeePayload) => ({
  type: ArrangementType.SET_CURRENT_EMPLOYEE,
  payload,
})

export const setCurrentRoom = (payload: SetCurrentRoomPayload) => ({
  type: ArrangementType.SET_CURRENT_ROOM,
  payload,
})
