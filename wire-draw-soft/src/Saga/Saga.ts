import { all } from '@redux-saga/core/effects';
import updatesHandlerSaga from 'src/Common/Sagas';
export default function* Saga() {
    yield all([
      updatesHandlerSaga()      
    ])
  }