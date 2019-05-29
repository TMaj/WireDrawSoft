import { IHardwareState, IProcessState } from 'src/Common/Interfaces';


export const parseFromString  = (update: string): { type: string, body: IProcessState | IHardwareState }  => { 
    const x = JSON.parse(update);  
    return {
        body: x,
        type: x.type,
    }
}

export const parseToString  = (update: IProcessState): string => { 
    const x = { ...update, type: 'update' }; 
    return JSON.stringify(x);
}