import { IPreset, IProcessState } from '../Common/Interfaces';

import { ACTION_ADD_PRESET, ACTION_ADD_PRESET_SUCCESS, ACTION_DELETE_PRESET, ACTION_DELETE_PRESET_SUCCESS, 
    ACTION_GET_PRESETS, ACTION_GET_PRESETS_SUCCESS, ACTION_SUBMIT, ACTION_UPDATE,
     ACTION_UPDATE_INPUT_SPEED_1, ACTION_UPDATE_INPUT_SPEED_2, ACTION_UPDATE_INPUT_TEMP, ACTION_UPDATE_PRESET_STATE } from "./Constans";

export interface IAction {
    type: string,
    payload: any 
}

interface IUpdateStoreAction {
    type: string,
    payload: IProcessState 
}

export  const UpdateStore = (stateUpdate: IProcessState): IUpdateStoreAction => {
    return { 
        payload: stateUpdate,
        type: ACTION_UPDATE,
    } as IUpdateStoreAction;
}

export interface IStateUpdateAction {
    type: string;
    payload: IProcessState
}

export  const SubmitUpdate = (stateUpdate: IProcessState): IStateUpdateAction => {
    return { 
        payload: stateUpdate,
        type: ACTION_SUBMIT,
    } as IStateUpdateAction;
}

export  const UpdatePresetState = (stateUpdate: IProcessState): IStateUpdateAction => {
    return { 
        payload: stateUpdate,
        type: ACTION_UPDATE_PRESET_STATE,
    } as IStateUpdateAction;
}

export interface IInputUpdateAction {
    type: string;
    payload: number,
}

export  const UpdateSpeedInputValue = (inputUpdate: number, engineNumber: number): IInputUpdateAction => {
    const actionType = engineNumber === 1 ? ACTION_UPDATE_INPUT_SPEED_1 : ACTION_UPDATE_INPUT_SPEED_2;

    return { 
        payload: inputUpdate,
        type: actionType,
    };
}

export  const UpdateTempInputValue = (inputUpdate: number): IInputUpdateAction => {
    return { 
        payload: inputUpdate,
        type: ACTION_UPDATE_INPUT_TEMP,
    } as IInputUpdateAction;
}

export interface IGetAllPresetsAction {
    type: string;
}

export const GetAllPresets = (): IGetAllPresetsAction => {
    return {
        type: ACTION_GET_PRESETS
    };
}

export interface IGetAllPresetsSuccessAction {
    type: string;
    payload: IPreset[];
}

export const GetAllPresetsSuccess = (presets: IPreset[]): IGetAllPresetsSuccessAction => {
    return {        
        payload: presets,
        type: ACTION_GET_PRESETS_SUCCESS,
    };
}

export interface IAddNewPresetAction {
    type: string;
    payload: IPreset;
}

export const AddNewPreset = (newPreset: IPreset): IAddNewPresetAction => {
    return {   
        payload: newPreset,
        type: ACTION_ADD_PRESET     
    };
}

export const AddNewPresetSuccess = (newPreset: IPreset): IAddNewPresetAction => {
    return {   
        payload: newPreset,
        type: ACTION_ADD_PRESET_SUCCESS    
    };
}

export interface IDeletePresetAction {
    type: string;
    payload: number;
}

export const DeletePreset = (presetId: number): IDeletePresetAction => {
    return {   
        payload: presetId,
        type: ACTION_DELETE_PRESET     
    };
}

export interface IDeletePresetSuccessAction {
    type: string;
    payload: IPreset[];
}

export const DeletePresetSuccess = (presets: IPreset[]): IDeletePresetSuccessAction => {
    return {   
        payload: presets,
        type: ACTION_DELETE_PRESET_SUCCESS     
    };
}