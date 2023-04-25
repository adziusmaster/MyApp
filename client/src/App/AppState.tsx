import { Painting } from "../Common/Admin/AdminTypes"
import { HeaderState } from "../Common/Header/HeaderState"



export type AppState = {
  isLoggedIn: boolean
  userType?: "user" | "admin"
  headerState: HeaderState
  paintings?: Array<Painting> 
}

export type AppProps = {
  
}

export const intialAppState: AppState = {
  isLoggedIn: false,
  userType: undefined,

  headerState: {
    isOpened: false
  },

  paintings: []
}