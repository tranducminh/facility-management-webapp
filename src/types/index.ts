export type BUILDING = {
  id?: number
  name?: string
  floors?: [
    {
      id?: number
      name?: string
      rooms?: [
        {
          id?: number
          name?: string
        }
      ]
    }
  ]
}

export type FLOOR = {
  id?: number
  name?: string
  building?: {
    name?: string
  }
  rooms?: [
    {
      id?: number
      name?: string
    }
  ]
}

export type ROOM = {
  id?: number
  name?: string
  building?: {
    id?: number
    name?: string
  }
  floor?: {
    id?: number
    name?: string
  }
  employees?: [
    {
      id?: number
      name?: string
    }
  ]
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
  facilities?: []
  room?: {
    id?: number
    name?: string
    floor?: {
      id?: number
      name?: number
      building?: {
        id?: number
        name?: string
      }
    }
  }
}

export type REPAIRMAN = {
  id?: number
  identity?: string
  name?: string
  unit?: string
  phone?: string
  email?: string
  avatar?: string
  specializes?: [
    {
      description?: string
      facilityType?: {
        name?: string
      }
    }
  ]
  histories?: HISTORY[]
}

export type FACILITY = {
  id?: number
  name?: string
  origin?: string
  price?: number
  status?: string
  configuration?: {
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
  employee?: {
    id?: number
    identity?: string
    name?: string
  }
  facilityType?: {
    id?: number
    name?: string
  }
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
  repairman?: {
    id?: number
    name?: string
    identity?: string
    unit?: string
    specializes?: [
      {
        facilityType?: {
          name?: string
        }
      }
    ]
  }
  facility?: {
    id?: number
    name?: string
    facilityType?: {
      id?: number
      name?: string
    }
  }
  employee?: {
    id?: number
    identity?: string
    name?: string
    dateOfBirth?: Date
    phone?: string
    email?: string
    unit?: string
    hasRoom?: string
    facilities?: []
    room?: {
      id?: number
      name?: string
      floor?: {
        id?: number
        name?: number
        building?: {
          id?: number
          name?: string
        }
      }
    }
  }
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
