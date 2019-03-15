import { IProcessState } from 'src/Common/Interfaces';
import { ACTION_SUBMIT, ACTION_UPDATE } from "./UpdatesHandler.constans";

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