import React from "react";


export const EMPTY_USER: User = {
  login: "",
  password: ""
}

export type AppMode = "newUser" | "existingUser" | "justRegistered" | "loggedIn" | "loginFailed"

export type LoginProps = {
  liftLoginState: () => void
}

export type LoginState = {
  mode: AppMode,
  user: User
  passwordVisible: boolean
}
class Login extends React.Component<LoginProps, LoginState> {

  state: LoginState = {
    mode: "newUser",
    user: EMPTY_USER,
    passwordVisible: false
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

  handleCreateSubmit(user: User): void {
    createUser(user)
    this.setState({
      ...this.state,
      user: EMPTY_USER
    })
  }

  async handleLogin(user: User) {
    let succeeded = await loginUser(user)
    if(succeeded) {
      this.setState({
        ...this.state,
        mode: "loggedIn",
        user: user
      })
      this.props.liftLoginState()
    } else {
      this.setState({
        ...this.state,
        mode: "loginFailed"
      })
      this.props.liftLoginState()
    }
  }

  handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    sessionStorage.removeItem('token')
    document.location.reload()
  }
  

  render(): React.ReactNode {
    return (
      <div>
        {this.state.mode == "existingUser" && (
          <div>
            <p>Login!</p>
            <form onSubmit={(e) => { e.preventDefault(); this.handleLogin(this.state.user) }}>
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
            <p>Wrong login! Try again</p>
            <form onSubmit={(e) => { e.preventDefault(); this.handleLogin(this.state.user) }}>
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
    </div>
    )
  }
}

export default Login

export type User = {
  login: string
  password: string
}

export async function validateUser() {
  try {
    const endpoint = `${process.env.REACT_APP_BASE_API_URL}/authorization`

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `${sessionStorage.getItem('token')}`)

    let res = await fetch(endpoint, {
      method: 'get', 
      headers: headers
    })

    if (!res.ok) {
      throw new Error('Failed to validate');
    }
    return res.ok

  } catch (e) {
    return false
  }
}

async function loginUser(user: User) {
  try {
    const endpoint = `${process.env.REACT_APP_BASE_API_URL}/authorization?userLogin=${user.login}&userPassword=${user.password}`

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'post', 
      headers: headers,
      body: JSON.stringify(user)
    })

    if (!res.ok) {
      throw new Error('Failed to login');
    }

    await res.json().then(
      token => sessionStorage.setItem('token', token.token)
    )

    return res.ok

  } catch (e) {
    return false
  }
}

async function createUser(user: User): Promise<boolean> {
  try {
    const endpoint = `${process.env.REACT_APP_BASE_API_URL}/user`

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'put', 
      headers: headers,
      body: JSON.stringify(user)
    })

    if (!res.ok) {
      throw new Error('Failed to register');
    }

    return res.ok

  } catch (e) {
    return false
  }
}