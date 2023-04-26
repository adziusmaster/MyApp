import React from "react"
import { LoginProps, LoginState } from "./LoginProps"
import { User } from "./LoginTypes"
import { EMPTY_USER, createUser, login } from "./LoginUtils"


class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    mode: "existingUser",
    user: EMPTY_USER,
    passwordVisible: false
  }

  componentDidMount(): void {

  }

  handleCreateSubmit(user: User): void {
    createUser(user)
    this.setState({
      ...this.state,
      user: EMPTY_USER
    })
  }

  async handleLoginSubmit(user: User): Promise<void> {
    let loginSuccess = await login(user)

    if(loginSuccess == "admin" || loginSuccess == "user"){
      this.setState({
        ...this.state,
        user: EMPTY_USER,
        mode: "loggedIn"
      })
      this.props.handleLogin(loginSuccess)
    } else {
      this.setState({
        ...this.state,
        user: EMPTY_USER,
        mode: "loginFailed"
      })
    }
  }

  handleLoginChange(newLogin: string) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        login: newLogin
      }
    })
  }

  handlePasswordChange(newPassword: string) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        password: newPassword
      }
    })
  }

  handlePasswordVisibilityToggle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    this.setState({
      ...this.state,
      passwordVisible: !this.state.passwordVisible
    })
  }
  


  render(): React.ReactNode {
    return (
      <div>
        {this.state.mode == "existingUser" && (
          <div>
            <p>Login!</p>
            <form onSubmit={(e) => { e.preventDefault(); this.handleLoginSubmit(this.state.user) }}>
              <label>
                Login:
                <input type="text" value={this.state.user.login} name="login" onChange={(e) => this.handleLoginChange(e.currentTarget.value)} />
              </label>
              <label>
                Password:
                <input type={this.state.passwordVisible ? "text" : "password"} value={this.state.user.password} name="password" onChange={(e) => this.handlePasswordChange(e.currentTarget.value)} />
              </label>
              <button onClick={(e) => this.handlePasswordVisibilityToggle(e)}>{this.state.passwordVisible? "Hide password" : "Show password"}</button>
              <input type="submit" value="Submit" />
            </form>
            <p>Not a user yet?</p>
            <button onClick={() =>  this.setState({ ...this.state, mode: "newUser", user: EMPTY_USER})}>Register here</button>
          </div>
        )} 
        {this.state.mode == "newUser" && (
          <div>
            <p>Create Account</p>
            <form onSubmit={(e) => { e.preventDefault(); this.handleCreateSubmit(this.state.user) }}>
              <label>
                Login:
                <input type="text" value={this.state.user.login} name="login" onChange={(e) => this.handleLoginChange(e.currentTarget.value)} />
              </label>
              <label>
                Password:
                <input type={this.state.passwordVisible ? "text" : "password"} value={this.state.user.password} name="password" onChange={(e) => this.handlePasswordChange(e.currentTarget.value)} />
              </label>
              <button onClick={(e) => this.handlePasswordVisibilityToggle(e)}>{this.state.passwordVisible? "Hide password" : "Show password"}</button>
              <input type="submit" value="Submit" />
            </form>
            <p>Already a user?</p>
            <button onClick={() => this.setState({ ...this.state, mode: "existingUser", user: EMPTY_USER })}>Login here</button>
          </div>
        )}
        {this.state.mode == "loginFailed" && (
          <div>
            <p>LOGIN FAILED</p>
            <button onClick={() => this.setState({ ...this.state, mode: "existingUser", user: EMPTY_USER })}>Login here</button>
          </div>
        )}
      </div>
    )
  }
}

export default Login