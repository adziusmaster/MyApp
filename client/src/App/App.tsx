
import React from 'react';
import { Header } from '../Common/Header/Header';
import { AppProps, AppState, UserType, intialAppState } from './AppState';
import Admin from '../Common/Admin/Admin';
import { fetchData } from '../Common/Admin/AdminUtils';
import Login from '../Common/Login/Login';

class App extends React.Component<AppProps, AppState> {
  state: AppState = {...intialAppState}

  onAdminLoad = () => {
    this.loadAdmin()
  }

  onLoginSuccessful = (userType: UserType) => {
    this.loginSuccessfull(userType)
  }

  render(): React.ReactNode { 
    return (
      <div>
        {Header({
          isLoggedIn: this.state.isLoggedIn
        })}
        {this.state.isLoggedIn && this.state.userType === "admin" ? 
          <Admin 
            isLoggedIn={this.state.isLoggedIn}
            paintings={this.state.paintings ? this.state.paintings : []}
            handleAdminLoad={this.onAdminLoad}
          /> : <></>
        }
       {!this.state.isLoggedIn ? 
        <Login
          handleLogin={this.onLoginSuccessful} 
        /> : <></>
      }
      </div>
    )
  }

  loadAdmin(){
    fetchData().then(result => 
      this.setState((currentState) => {
        return {
          ...currentState, 
          paintings: result
        }
      })
    )
  }

  loginSuccessfull(userType: UserType){
    debugger
    this.setState((currentState) => {
      return {
        ...currentState,
        isLoggedIn: true,
        userType: userType
      }
    })
  }
  
}

export default App;
