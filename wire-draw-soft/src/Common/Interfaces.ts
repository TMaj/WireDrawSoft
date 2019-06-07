 export interface IProcessState { 
    engine1Speed: number;
    engine1Direction: EngineDirection;
    engine2Speed: number;
    engine2Direction: EngineDirection;
    currentTemperature?: number;
    desiredTemperature: number;
}

export enum EngineDirection {
    Left = 0,
    Right = 1,
}

export interface IElongationStatus {
    leftLength: number;
    rightLength: number;
} 

export interface IConnectionsStatus { 
    autoProgram: boolean,
    connectedToServer: boolean;
    connectedToEngines: boolean;
    connectedToHardwareController: boolean;
}

export interface IHardwareState { 
    autoProgram: boolean,
    connectedToEngines: boolean; 
    connectedToHardwareController: boolean;
}

export interface ISettings {
    serverUrl: string;
    apiUrl: string;
    videoUrl: string;
    reconnectionPeriod: string;
    units: string;
}

export interface IStatistics extends IProcessState {
    time: any;
}

export interface IState {
    currentState: IProcessState;
    inputsState: IProcessState; 
    presetsState: IProcessState;
    presets: IPreset[];
    presetsLoading: boolean;
    connectionsStatus: IConnectionsStatus;
    settings: ISettings;
    sessions: ISession[];
    statistics: IStatistics[],
    elongationStatus: IElongationStatus,
    reelDiameter: number;
    autoProgramSteps: any[]; 
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