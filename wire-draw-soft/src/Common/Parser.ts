import { IElongationStatus, IHardwareState, IProcessState } from 'src/Common/Interfaces';


export const parseFromString  = (update: string): { type: string, body: IProcessState | IHardwareState | IElongationStatus | number | any[] }  => { 
    const x = JSON.parse(update);  

    if (x.type === 'reel') { 
        return {
            body: x.diameter,
            type: x.type,
        } 
    }
    if (x.type === 'autoProgram') { 
        return {
            body: x.steps,
            type: x.type,
        } 
    }
    
    return {
        body: x,
        type: x.type,
    }
}

export const parseToString  = (update: IProcessState): string => { 
    const x = { ...update, engine1Speed: update.engine1Speed, engine2Speed: update.engine2Speed, type: 'update' }; 
    return JSON.stringify(x);
}