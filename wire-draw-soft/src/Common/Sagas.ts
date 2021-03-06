import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { AddNewPresetSuccess, DeletePresetSuccess, GetAllPresetsSuccess,
     GetAllSessionsSuccess, GetSettingsSuccess, GetStatisticsSuccess, IAddNewPresetAction,
      IChangeConnectionToHardwareAction, IDeletePresetAction, IGetAllSessionsRequestAction, 
      IGetSettingsRequestAction, IGetStatisticsRequestAction, IReelDiameterUpdateAction,
       IStateUpdateAction, ISubmitAutoProgramAction, ISubmitSettingsAction,  
       IToggleAutoProgramAction} from './Actions';
import { ActionType } from './Constans';
import { deletePresetById, getAllPresets, getSessions, getSettings, 
    getStatisticsBetween, handleError, postNewPreset, postSettings, sendAutoProgram, sendCommand, sendReelUpdate, sendUpdate, switchAutoProgram } from './SagasHelpers';


export function* submitUpdate(action: IStateUpdateAction) {
    yield call(sendUpdate, action.payload);
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
export function* addPreset(action: IAddNewPresetAction) {    
    try {
       const response = yield call(postNewPreset, action.payload);
       yield put(AddNewPresetSuccess(response.data));
    } catch(error) {
        handleError(error);
    }
} 

export function* deletePreset(action: IDeletePresetAction) {
    try {
        const deleteRequest = yield call(deletePresetById, action.payload)
        yield put(DeletePresetSuccess(deleteRequest.data));
    } catch(error) {
    handleError(error);
    }
}  

export function* getAllSessions(action: IGetAllSessionsRequestAction) {

    // tslint:disable-next-line:no-console
    console.log('Sagas :: Getting all sessions');
    
    try {
        const getAllSessionsRequest = yield call(getSessions);
        // tslint:disable-next-line:no-console
        console.log(getAllSessionsRequest.data);
        yield put(GetAllSessionsSuccess(getAllSessionsRequest.data));
    } catch(error) {
        handleError(error);
    }
}

export function* getStatistics(action: IGetStatisticsRequestAction) {
    try {
        const getStatisticsRequest = yield call(getStatisticsBetween, action.payload);
        yield put(GetStatisticsSuccess(getStatisticsRequest.data));
    } catch(error) {
        handleError(error);
    }
} 

export function* fetchSettings(action: IGetSettingsRequestAction) {
    try {
        const getSettingsRequest = yield call(getSettings);
        yield put(GetSettingsSuccess(getSettingsRequest.data));
    } catch(error) {
        handleError(error);
    }
} 

export function* submitSettings(action: ISubmitSettingsAction) {
    // tslint:disable-next-line:no-console
    console.log(action.payload);
    try {
        const submitSettingsRequest = yield call(postSettings, action.payload);
        yield put(GetSettingsSuccess(submitSettingsRequest.data));
    } catch(error) {
        handleError(error);
    }
}  

export function* changeHardwareConnection(action: IChangeConnectionToHardwareAction) { 
    try {
        yield call(sendCommand, action.payload); 
    } catch(error) {
        handleError(error);
    }
} 

export function* submitReelDiameter(action: IReelDiameterUpdateAction) { 
    try {
        yield call(sendReelUpdate, action.payload);  
    } catch(error) {
        handleError(error);
    }
} 

export function* submitAutoProgram(action: ISubmitAutoProgramAction) { 
    try {
        yield call(sendAutoProgram, action.payload);  
    } catch(error) {
        handleError(error);
    }
} 

export function* toggleAutoProgram(action: IToggleAutoProgramAction) { 
    try {
        yield call(switchAutoProgram, action.payload);  
    } catch(error) {
        handleError(error);
    }
} 

export default function* updatesHandlerSaga() {
    yield takeEvery(ActionType.ACTION_SUBMIT, submitUpdate);
    yield takeLatest(ActionType.ACTION_GET_PRESETS, getPresets);
    yield takeLatest(ActionType.ACTION_DELETE_PRESET, deletePreset);
    yield takeLatest(ActionType.ACTION_ADD_PRESET, addPreset);
    yield takeLatest(ActionType.ACTION_GET_ALL_SESSIONS, getAllSessions); 
    yield takeLatest(ActionType.ACTION_GET_STATISTICS, getStatistics);
    yield takeLatest(ActionType.ACTION_GET_SETTINGS, getSettings);
    yield takeLatest(ActionType.ACTION_SUBMIT_SETTINGS, submitSettings);
    yield takeLatest(ActionType.ACTION_CHANGE_HARDWARE_CONNECTION, changeHardwareConnection);
    yield takeLatest(ActionType.ACTION_SUBMIT_REEL_DIAMETER, submitReelDiameter);
    yield takeLatest(ActionType.ACTION_SUBMIT_AUTO_PROGRAM, submitAutoProgram);
    yield takeLatest(ActionType.ACTION_TOGGLE_AUTO_PROGRAM_REQUEST, toggleAutoProgram);
}