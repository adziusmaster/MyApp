import { Painting } from "./AdminTypes"

export async function fetchData(): Promise<Array<Painting>> {
  try {
    const endpoint = 'http://localhost:5000/api/paintings'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'get', 
      headers: headers
    })

    if (!res.ok) throw Error(res.statusText)
 
    let json = await res.json() as Array<Painting>
    console.log(json)
    return json

  } catch (e) {
    console.error(e)
    return []
  }
}



export async function addData(painting: Painting) {
  try {
    const endpoint = 'http://localhost:5000/api/paintings'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'put',
      headers: headers, 
      body: JSON.stringify(painting)
    })

    if (!res.ok) throw Error(res.statusText)

    let json = await res.json()

    console.log(json)

  } catch (e) {
    console.error(e)
  }
}
export async function removeData(id: number) {
  try {
    const endpoint = 'http://localhost:5000/api/paintings'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'delete',
      headers: headers, 
      body: JSON.stringify(id)
    })

    if (!res.ok) throw Error(res.statusText)

    let json = await res.json()

    console.log(json)

  } catch (e) {
    console.error(e)
  }
}