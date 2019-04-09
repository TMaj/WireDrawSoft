export interface IProcessState {
    speed1: number;
    speed2: number;
    temperature: number;
}

export interface IState {
    currentState: IProcessState;
    inputsState: IProcessState; 
    presetsState: IProcessState;
    presets: IPreset[];
    presetsLoading: boolean;
}

export interface IPreset {
    id: number;
    name: string;
    speed1: number;
    speed2: number;
    temperature: number;
}