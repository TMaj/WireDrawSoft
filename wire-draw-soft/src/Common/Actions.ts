import { IConnectionsStatus, IPreset, IProcessState, ISession, ISettings } from '../Common/Interfaces'; 

import { ActionType } from "./Constans";

export interface IAction {
    type: ActionType,
    payload: any 
}

interface IUpdateStoreAction {
    type: string,
    payload: IProcessState 
}

export  const UpdateStore = (stateUpdate: IProcessState): IUpdateStoreAction => {
    return { 
        payload: stateUpdate,
        type: ActionType.ACTION_UPDATE,
    } as IUpdateStoreAction;
}

export interface IStateUpdateAction {
    type: string;
    payload: IProcessState
}

export  const SubmitUpdate = (stateUpdate: IProcessState): IStateUpdateAction => {
    return { 
        payload: stateUpdate,
        type: ActionType.ACTION_SUBMIT,
    } as IStateUpdateAction;
}

export  const UpdatePresetState = (stateUpdate: IProcessState): IStateUpdateAction => {
    return { 
        payload: stateUpdate,
        type: ActionType.ACTION_UPDATE_PRESET_STATE,
    } as IStateUpdateAction;
}

export interface IInputUpdateAction {
    type: string;
    payload: number,
}

export  const UpdateSpeedInputValue = (inputUpdate: number, engineNumber: number): IInputUpdateAction => {
    const actionType = engineNumber === 1 ? ActionType.ACTION_UPDATE_INPUT_SPEED_1 : ActionType.ACTION_UPDATE_INPUT_SPEED_2;

    return { 
        payload: inputUpdate,
        type: actionType,
    };
}

export interface IDirectionInputUpdateAction {
    type: string;
    payload: number,
}

export  const UpdateDirectionInputValue = (inputUpdate: number, engineNumber: number): IInputUpdateAction => {
    const actionType = engineNumber === 1 ? ActionType.ACTION_UPDATE_DIRECTION_INPUT_1 : ActionType.ACTION_UPDATE_DIRECTION_INPUT_2;

    return { 
        payload: inputUpdate,
        type: actionType,
    };
}

export  const UpdateTempInputValue = (inputUpdate: number): IInputUpdateAction => {
    return { 
        payload: inputUpdate,
        type: ActionType.ACTION_UPDATE_INPUT_TEMP,
    } as IInputUpdateAction;
}

export interface IGetAllPresetsAction {
    type: string;
}

export const GetAllPresets = (): IGetAllPresetsAction => {
    return {
        type: ActionType.ACTION_GET_PRESETS
    };
}

export interface IGetAllPresetsSuccessAction {
    type: string;
    payload: IPreset[];
}

export const GetAllPresetsSuccess = (presets: IPreset[]): IGetAllPresetsSuccessAction => {
    return {        
        payload: presets,
        type: ActionType.ACTION_GET_PRESETS_SUCCESS,
    };
}

export interface IAddNewPresetAction {
    type: string;
    payload: IPreset;
}

export const AddNewPreset = (newPreset: IPreset): IAddNewPresetAction => {
    return {   
        payload: newPreset,
        type: ActionType.ACTION_ADD_PRESET     
    };
}

export const AddNewPresetSuccess = (newPreset: IPreset): IAddNewPresetAction => {
    return {   
        payload: newPreset,
        type: ActionType.ACTION_ADD_PRESET_SUCCESS    
    };
}

export interface IDeletePresetAction {
    type: string;
    payload: number;
}

export const DeletePreset = (presetId: number): IDeletePresetAction => {
    return {   
        payload: presetId,
        type: ActionType.ACTION_DELETE_PRESET     
    };
}

export interface IDeletePresetSuccessAction {
    type: string;
    payload: IPreset[];
}

export const DeletePresetSuccess = (presets: IPreset[]): IDeletePresetSuccessAction => {
    return {   
        payload: presets,
        type: ActionType.ACTION_DELETE_PRESET_SUCCESS     
    };
}

export interface IConnectionsStateUpdateAction {
    type: string;
    payload: IConnectionsStatus;
}

export const UpdateConnectionsState = (update: IConnectionsStatus): IConnectionsStateUpdateAction => {
    return {   
        payload: update,
        type: ActionType.ACTION_UPDATE_CONNECTIONS_STATE     
    };
}

export interface IGetAllSessionsRequestAction {
    type: string;
}

export const GetAllSessions = (): IGetAllSessionsRequestAction => {
    return {
        type: ActionType.ACTION_GET_ALL_SESSIONS, 
    }; 
}

export interface IGetAllSessionsSuccessAction {
    type: string;
    payload: ISession[],
} 

export const GetAllSessionsSuccess = (payload: ISession[]): IGetAllSessionsSuccessAction => {
    return {
        payload,
        type: ActionType.ACTION_GET_ALL_SESSIONS_SUCCESS,
    }; 
}

export interface IGetStatisticsRequestAction {
    type: string;
    payload: {start: any, end: any}
}

export const GetStatistics = (payload: {start: any, end: any}): IGetStatisticsRequestAction => {
    return {  
        payload,
        type: ActionType.ACTION_GET_STATISTICS, 
    }; 
}

export interface IGetStatisticsSuccessAction {
    type: string;
    payload: ISession[],
} 

export const GetStatisticsSuccess = (payload: ISession[]): IGetStatisticsSuccessAction => {
    return {
        payload,
        type: ActionType.ACTION_GET_STATISTICS_SUCCESS,
    }; 
}


export interface IGetSettingsRequestAction {
    type: string;
}

export const GetSettings = (): IGetSettingsRequestAction => {
    return {
        type: ActionType.ACTION_GET_SETTINGS, 
    }; 
}

export interface IGetSettingsSuccessAction {
    type: string;
    payload: ISettings,
} 

export const GetSettingsSuccess = (payload: ISettings): IGetSettingsSuccessAction => {
    return {
        payload,
        type: ActionType.ACTION_GET_SETTINGS_SUCCESS
    }; 
} 

export interface ISubmitSettingsAction {
    type: string;
    payload: {settings: ISettings}
}

export const SubmitSettings = (payload: {settings: ISettings}): ISubmitSettingsAction => {
    return {
        payload,
        type: ActionType.ACTION_SUBMIT_SETTINGS, 
    }; 
}

export interface IChangeConnectionToHardwareAction {
    type: string;
    payload: boolean;
}

export const ChangeConnectionToHardware = (payload: boolean): IChangeConnectionToHardwareAction => {
    return {
        payload,
        type: ActionType.ACTION_CHANGE_HARDWARE_CONNECTION, 
    }; 
}