import { call, put, takeEvery } from '@redux-saga/core/effects';
import { IProcessState } from 'src/Common/Interfaces';
import { parseToString } from 'src/Common/Parser';
import socket from 'src/WebSocket/WebSocket';
import { ISubmitUpdateAction } from './UpdatesHandler.actions';
import { ACTION_SUBMIT, ACTION_UPDATE } from './UpdatesHandler.constans';

export function* submitUpdate(action: ISubmitUpdateAction) {
    yield call(sendUpdate, action.payload)
    yield put({ type: ACTION_UPDATE })
}

async function sendUpdate(update: IProcessState) {
    const message = await parseToString(update) as string;
    socket.send(message);
}

export default function* updatesHandlerSaga() {
    yield takeEvery(ACTION_SUBMIT, submitUpdate)
}