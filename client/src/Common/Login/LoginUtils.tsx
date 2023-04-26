import { User } from "./LoginTypes"

export async function createUser(user: User): Promise<boolean> {
  try {
    const endpoint = 'http://localhost:5000/api/user'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'put', 
      headers: headers,
      body: JSON.stringify(user)
    })

    if (!res.ok) throw Error(res.statusText)
 
    let json = await res.json()
    console.log(json)
    return true

  } catch (e) {
    console.error(e)
    return false
  }
}

export async function login(user: User): Promise<boolean> {
  try {
    const endpoint = 'http://localhost:5000/api/user'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'post', 
      headers: headers,
      body: JSON.stringify(user)
    })

    if (!res.ok) throw Error(res.statusText)
 
    let json = await res.json()
    console.log(json)
    return true

  } catch (e) {
    console.error(e)
    return false
  }
}