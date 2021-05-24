import { ArrangementType } from '../types/arrangement.type'

const defaultState: {
  currentRoomId: number
  currentEmployeeId: number
} = {
  currentRoomId: 1,
  currentEmployeeId: 1,
}

export const ArrangementReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ArrangementType.SET_CURRENT_EMPLOYEE:
      return {
        ...defaultState,
        currentEmployeeId: action.payload.employeeId,
      }
    case ArrangementType.SET_CURRENT_ROOM:
      return {
        ...defaultState,
        currentRoomId: action.payload.roomId,
      }
    default:
      return state
  }
}
