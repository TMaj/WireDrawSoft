import { ACTION_UPDATE, IProcessState } from "./CommunicationProvider.constans";

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