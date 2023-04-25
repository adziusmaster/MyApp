import React from "react"
import { LoginProps, LoginState } from "./LoginProps"
import { User } from "./LoginTypes"
import { createUser } from "./LoginUtils"


class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    newUser: {
      login: "",
      password: ""
    }
  }

  componentDidMount(): void {
    
  }


  handleSubmit(user: User): void {
    createUser(user)
  }

  handleLoginChange(newLogin: string){
    this.setState({
      ...this.state,
      newUser: {
        ...this.state.newUser,
        login: newLogin
      }
    })
  }

  handlePasswordChange(newPassword: string){
    this.setState({
      ...this.state,
      newUser: {
        ...this.state.newUser,
        password: newPassword
      }
    })
  }


  render(): React.ReactNode {
    return (
      <div>
        <div>
          <p>Create Account</p>
          <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit(this.state.newUser)}}>
            <label>
              Login:
              <input type="text" value={this.state.newUser.login} name="login" onChange={(e) => this.handleLoginChange(e.currentTarget.value)}/>
            </label>
            <label>
              Password:
              <input type="text" value={this.state.newUser.password} name="password" onChange={(e) => this.handlePasswordChange(e.currentTarget.value)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login