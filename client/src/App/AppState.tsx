import { Painting } from "../Common/Admin/AdminTypes"
import { HeaderState } from "../Common/Header/HeaderState"

export type UserType = "user" | "admin" | "notLoggedIn"

export type AppState = {
  isLoggedIn: boolean
  userType: UserType
  headerState: HeaderState
  paintings?: Array<Painting> 
}

export type AppProps = {
  
}

export const intialAppState: AppState = {
  isLoggedIn: false,
  userType: "notLoggedIn",

  headerState: {
    isOpened: false
  },

  paintings: []
}