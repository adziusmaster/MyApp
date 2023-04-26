import { UserType } from "../../App/AppState"
import { User } from "./LoginTypes"

export type LoginProps = {
  handleLogin: (userType: UserType) => void
}

export type LoginState = {
  mode: "newUser" | "existingUser" | "justRegistered" | "loggedIn" | "loginFailed",
  user: User
  passwordVisible: boolean
}