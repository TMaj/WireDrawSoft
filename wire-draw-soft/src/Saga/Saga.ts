import { all } from '@redux-saga/core/effects';
import updatesHandlerSaga from 'src/Containers/UpdatesHandler/UpdatesHandler.sagas';
export default function* Saga() {
    yield all([
      updatesHandlerSaga()      
    ])
  }