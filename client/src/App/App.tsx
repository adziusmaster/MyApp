
import React from 'react';
import { Header } from '../Common/Header/Header';
import { AppProps, AppState, intialAppState } from './AppState';

class App extends React.Component<AppProps, AppState> {
  state: AppState = {...intialAppState}

  render(): React.ReactNode { 
    return (
      <div>
        {Header({
          isLoggedIn: this.state.isLoggedIn
        })}
      </div>
    )
  }
}

export default App;
