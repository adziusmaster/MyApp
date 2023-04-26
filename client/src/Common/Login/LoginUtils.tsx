import { UserType } from "../../App/AppState"
import { User } from "./LoginTypes"

export async function createUser(user: User): Promise<boolean> {
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

export async function login(user: User): Promise<UserType> {
  try {
    const endpoint = `${process.env.REACT_APP_BASE_API_URL}/user`

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

    const role = await res.text();
    
    if(role == "user") return "user"
    if(role == "admin") return "admin"
    return "notLoggedIn"

  } catch (e) {
    return "notLoggedIn"
  }
}

export const EMPTY_USER: User = {
  login: "",
  password: ""
}
