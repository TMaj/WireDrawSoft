import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import { IPreset, IProcessState } from 'src/Common/Interfaces';
import { parseToString } from 'src/Common/Parser';
import { MyWebSocket } from 'src/WebSocket/WebSocket';
import { AddNewPresetSuccess, DeletePresetSuccess, GetAllPresetsSuccess, IAddNewPresetAction, IDeletePresetAction, IStateUpdateAction } from './Actions';
import { ActionType } from './Constans';

const apiUrl = 'http://localhost:8001'; 

export function* submitUpdate(action: IStateUpdateAction) {
    yield call(sendUpdate, action.payload);
}

async function sendUpdate(update: IProcessState) {
    const message = await parseToString(update) as string;
    MyWebSocket.websocket.send(message);
}

export function* getPresets() {
    try {        
        // tslint:disable-next-line:no-console
        console.log('Sagas :: Getting presets');
        const presetsRequest = yield call(getAllPresets);
        // tslint:disable-next-line:no-console
        console.log(presetsRequest.data);
        yield put(GetAllPresetsSuccess(presetsRequest.data))
    } catch (error) {
        handleError(error);
    }
}

async function getAllPresets() {
    return await axios.get(`${apiUrl}/presets`);
}

export function* addPreset(action: IAddNewPresetAction) {    
    try {
       const response = yield call(postNewPreset, action.payload);
       yield put(AddNewPresetSuccess(response.data));
    } catch(error) {
        handleError(error);
    }
}

async function postNewPreset(preset: IPreset) {
    const toSend =  {'preset' : preset};
    return axios.post(`${apiUrl}/presets`, toSend);
}

export function* deletePreset(action: IDeletePresetAction) {
    try {
        const deleteRequest = yield call(deletePresetById, action.payload)
        yield put(DeletePresetSuccess(deleteRequest.data));
     } catch(error) {
        handleError(error);
     }
}

async function deletePresetById(presetId: number) {
    return axios.delete(`${apiUrl}/presets/${presetId}`);
}

function handleError(error: any){
    // tslint:disable-next-line:no-console
    console.log(error);
}

export default function* updatesHandlerSaga() {
    yield takeEvery(ActionType.ACTION_SUBMIT, submitUpdate);
    yield takeLatest(ActionType.ACTION_GET_PRESETS, getPresets);
    yield takeLatest(ActionType.ACTION_DELETE_PRESET, deletePreset);
    yield takeLatest(ActionType.ACTION_ADD_PRESET, addPreset); 
}