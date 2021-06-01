export type BUILDING = {
  id?: number
  name?: string
  floors?: FLOOR[]
}

export type FLOOR = {
  id?: number
  name?: string
  building?: BUILDING
  rooms?: ROOM[]
}

export type ROOM_FACILITY = {
  id?: number
  name?: string
}

export type ROOM = {
  id?: number
  name?: string
  building?: BUILDING
  floor?: FLOOR
  employees?: EMPLOYEE[]
  roomFacilities?: ROOM_FACILITY[]
}

export type EMPLOYEE = {
  id?: number
  identity?: string
  name?: string
  dateOfBirth?: Date
  phone?: string
  email?: string
  unit?: string
  hasRoom?: string
  avatar?: string
  facilities?: FACILITY[]
  room?: ROOM
  requests?: REQUEST[]
}

export type REPAIRMAN = {
  id?: number
  identity?: string
  name?: string
  unit?: string
  phone?: string
  email?: string
  avatar?: string
  dateOfBirth?: Date
  specializes?: SPECIALIZE[]
  histories?: HISTORY[]
}

export type SPECIALIZE = {
  id: number
  active?: boolean
  description?: string
  facilityType?: FACILITY_TYPE
}

export type FACILITY_TYPE = {
  id?: number
  name?: string
}

export type FACILITY = {
  id?: number
  name?: string
  origin?: string
  price?: number
  status?: string
  handoveredDate?: Date
  configuration?: CONFIGURATION
  employee?: EMPLOYEE
  facilityType?: FACILITY_TYPE
}

export type CONFIGURATION = {
  cpu?: string
  mainboard?: string
  psu?: string
  ram?: string
  vga?: string
  hardDrive?: string
  opticalDrive?: string
  monitor?: string
  mouse?: string
  keyboard?: string
  headPhone?: string
  webcam?: string
  cardReader?: string
  fanCase?: string
  resolution?: string
  printSpeed?: string
  paperSize?: string
  model?: string
  duplexPrint?: string
  communication?: string
  printInk?: string
  faxSpeed?: string
  nodeName?: string
}

export type REQUEST = {
  id?: number
  problem?: string
  solution?: string
  status?: string
  uncompletedReason?: string
  rejectedReason?: string
  repairman?: REPAIRMAN
  facility?: FACILITY
  employee?: EMPLOYEE
  replacements?: REPLACEMENT[]
}

export type REPLACEMENT = {
  id?: number
  component?: string
  source?: string
  target?: string
}

export type HISTORY = {
  id?: number
  status?: string
  uncompletedReason?: string
  repairman?: REPAIRMAN
  request?: REQUEST
  createdAt?: string
}

export type NOTIFICATION = {
  id?: number
  content?: string
  receiverType?: string
  receiverId?: string
  senderType?: string
  senderId?: string
  isRead?: boolean
  type?: NotificationType
  room?: ROOM
  request?: REQUEST
  facility?: FACILITY
}

export enum NotificationType {
  NEW_REQUEST = 'new-request',
  APPROVED_REQUEST = 'approved-request',
  REJECTED_REQUEST = 'rejected-request',
  INPROCESS_REQUEST = 'inprocess-request',
  COMPLETED_REQUEST = 'completed-request',
  UNCOMPLETED_REQUEST = 'uncompleted-request',

  ASSIGNED_TASK = 'assigned-task',
  STARTED_TASK = 'started-task',
  REJECTED_TASK = 'rejected-task',
  COMPLETED_TASK = 'completed-task',
  UNCOMPLETED_TASK = 'uncompleted-task',
  CANCELED_TASK = 'canceled-task',

  NEW_ROOM = 'new-room',
  PENDING_ROOM = 'pending-room',

  NEW_FACILITY_OWNER = 'new-facility-owner',
  REMOVED_FACILITY_OWNER = 'removed-facility-owner',
  UPDATED_FACILITY_INFO = 'updated-facility-info',

  UPDATED_PROFILE = 'updated-profile',
}
