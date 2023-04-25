export type HeaderState = {
  isOpened: boolean
}

export async function fetchData() {
  try {
    const endpoint = 'http://localhost:5000/api/paintings'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'get', 
      headers: headers
    })

    if (!res.ok) throw Error(res.statusText)

    let json = await res.json()

    console.log(json)

  } catch (e) {
    console.error(e)
  }
}


export async function addData(painting: Painting) {
  try {
    const endpoint = 'http://localhost:5000/api/paintings'

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    let res = await fetch(endpoint, {
      method: 'post',
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

type Painting = {
  Title?: string
  Description?: string
  Price?: number
}

export const newPainting: Painting = {
  Title: "newPainting1",
  Description: "newDescription1",
  Price: 10.00
}