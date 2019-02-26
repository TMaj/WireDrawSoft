export interface IProcessState {
    speed1: number,
    speed2: number,
    temperature: number
}

export interface IState {
    currentState: IProcessState
}

export const ACTION_UPDATE = 'ACTION_UPDATE';

export const serverConfig = {
    'host': 'localhost',
    'port': '8080'
}

export const client = {
    'clientId' : 'web-client',
    'port' : '8090'
}