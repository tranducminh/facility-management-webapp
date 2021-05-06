export type LoginPayload = {
  identity: string
  password: string
}

export type LoginAdminPayload = {
  email: string
  password: string
}

export type LoginSuccessPayload = {
  token: string
  role: string
  user: {
    name?: string
  }
}

export type FetchMePayload = {
  role: string
}

export type FetchMeSuccessPayload = {
  role: string
  user: {
    name?: string
  }
}
