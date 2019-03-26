export interface IProcessState {
    speed1: number,
    speed2: number,
    temperature: number
}

export interface IState {
    currentState: IProcessState,
    inputsState: IProcessState,
}