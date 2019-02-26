import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, Store } from 'redux';
import App from './App';
import CommunicationProvider  from './Containers/CommunicationProvider/CommunicationProvider';
import { reducer } from './Containers/CommunicationProvider/CommunicationProvider.reducers'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const store: Store = createStore(reducer, compose(
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <Provider store = {store}>   
      <CommunicationProvider>
        <App/>
      </CommunicationProvider>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
