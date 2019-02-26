import { IAction } from './CommunicationProvider.actions';
import { ACTION_UPDATE, IState } from "./CommunicationProvider.constans";

const initialState = {
    currentState : {}
} as IState;

export const reducer = (state = initialState, action: IAction): IState => {
    switch (action.type) {
      case ACTION_UPDATE: {
        return { ...state,
          currentState: action.payload
        };
      }
        
    default: {
      return state
    }
  }
}