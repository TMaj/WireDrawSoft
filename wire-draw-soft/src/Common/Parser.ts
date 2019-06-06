import { IHardwareState, IProcessState } from 'src/Common/Interfaces';


export const parseFromString  = (update: string): { type: string, body: IProcessState | IHardwareState }  => { 
    const x = JSON.parse(update);  
    return {
        body: x,
        type: x.type,
    }
}

export const parseToString  = (update: IProcessState): string => { 
    const x = { ...update, engine1Speed: update.engine1Speed, engine2Speed: update.engine2Speed, type: 'update' }; 
    return JSON.stringify(x);
}