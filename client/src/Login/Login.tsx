import React from "react";
import axios from 'axios';


export const EMPTY_USER: User = {
  login: "",
  password: ""
}

export type LoginProps = {

}

export type LoginState = {
  mode: "newUser" | "existingUser" | "justRegistered" | "loggedIn" | "loginFailed",
  user: User
  passwordVisible: boolean
}
class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    mode: "existingUser",
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

  render(): React.ReactNode {
    return (
      <div>
        {this.state.mode == "existingUser" && (
          <div>
            <p>Login!</p>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(this.state.user) }}>
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
    </div>
    )
  }
}

export default Login

export type User = {
  login: string
  password: string
}

export function validateUser() {
  return axios.get(`${process.env.REACT_APP_BASE_API_URL}/authorization`)
    .then(() => {
      debugger
      // User is authenticated, return true
      return true;
    })
    .catch(() => {
      // User is not authenticated, return false
      return false;
    });
}

function handleLogin(user: User) {
  axios.post(`${process.env.REACT_APP_BASE_API_URL}/authorization`, { user })
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('token', token);
      // Redirect to authenticated page
    })
    .catch(error => {
      // Handle login error
    });
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