import { IProcessState } from 'src/Common/Interfaces';
import { ACTION_SUBMIT, ACTION_UPDATE, ACTION_UPDATE_INPUT_SPEED_1, ACTION_UPDATE_INPUT_SPEED_2, ACTION_UPDATE_INPUT_TEMP } from "./Constans";

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

export interface ISubmitUpdateAction {
    type: string;
    payload: IProcessState
}

export  const SubmitUpdate = (stateUpdate: IProcessState): ISubmitUpdateAction => {
    return { 
        payload: stateUpdate,
        type: ACTION_SUBMIT,
    } as ISubmitUpdateAction;
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