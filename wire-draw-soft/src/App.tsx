import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IProcessState, IState } from './Common/Interfaces';
import logo from './logo.svg';

interface IAppProps {
  currentState: IProcessState;    
}
class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wire Draw Soft</h1>
          <h1 className="App-title">Speed 1: {this.props.currentState.speed1} Speed 2: {this.props.currentState.speed2} Temp: {this.props.currentState.temperature}</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state: IState ) => {
  return {
  currentState: state.currentState
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps    
)(App)