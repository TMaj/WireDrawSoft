import { IState } from 'src/Common/Interfaces';
import { IAction } from './UpdatesHandler.actions';
import { ACTION_SUBMIT, ACTION_UPDATE } from './UpdatesHandler.constans';


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
      case ACTION_SUBMIT: {
        return { ...state,
          currentState: action.payload
        };
      }
        
    default: {
      return state
    }
  }
}