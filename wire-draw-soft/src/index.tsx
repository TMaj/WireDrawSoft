import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { reducer } from './Common/Reducers'
import { DashboardComponent } from './Components/DashboardComponent';
import UpdatesHandler  from './Containers/UpdatesHandler/UpdatesHandler';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Saga from './Saga/Saga';

const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(reducer, compose(
  applyMiddleware(sagaMiddleware),
 // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()  
  )
);

sagaMiddleware.run(Saga);

ReactDOM.render(
  <Provider store = {store}>   
      <UpdatesHandler>
        <DashboardComponent/>
      </UpdatesHandler>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
