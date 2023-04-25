import { HeaderState } from "../Common/Header/HeaderState"

export type AppState = {
  isLoggedIn: boolean
  headerState: HeaderState
}

export type AppProps = {
  
}

export const intialAppState: AppState = {
  isLoggedIn: false,

  headerState: {
    isOpened: false
  }
}