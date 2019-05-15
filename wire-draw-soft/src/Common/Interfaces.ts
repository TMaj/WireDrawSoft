export interface IProcessState {
    speed1: number;
    speed2: number;
    temperature: number;
}

export interface IConnectionsStatus {
    connectedToServer: boolean;
}

export interface IState {
    currentState: IProcessState;
    inputsState: IProcessState; 
    presetsState: IProcessState;
    presets: IPreset[];
    presetsLoading: boolean;
    connectionsStatus: IConnectionsStatus;
}

export interface IPreset {
    id: number;
    name: string;
    speed1: number;
    speed2: number;
    temperature: number;
}

export interface ISession {
    date: string;
    start: string;
    end: string;
}