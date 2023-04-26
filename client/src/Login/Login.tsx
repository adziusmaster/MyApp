import React from "react";
import axios from 'axios';

class Login extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        Login
        <button onClick={() => validateUser()}>click</button>
      </div>
    )
  }
}

export default Login

export type User = {
  login: string
  password: string
}

// export async function createUser(user: User): Promise<boolean> {
//   try {
//     const endpoint = `${process.env.REACT_APP_BASE_API_URL}/user`

//     let headers = new Headers()
//     headers.append('Content-Type', 'application/json')

//     let res = await fetch(endpoint, {
//       method: 'put', 
//       headers: headers,
//       body: JSON.stringify(user)
//     })

//     if (!res.ok) {
//       throw new Error('Failed to register');
//     }

//     return res.ok

//   } catch (e) {
//     return false
//   }
// }

function validateUser() {
  return axios.get(`${process.env.REACT_APP_BASE_API_URL}/authorization`)
    .then(() => {
      debugger
      // User is authenticated, return true
      return true;
    })
    .catch(() => {
      debugger
      // User is not authenticated, return false
      return false;
    });
}