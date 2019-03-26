import { IState } from 'src/Common/Interfaces';
import { IAction } from './Actions';
import { ACTION_SUBMIT, ACTION_UPDATE, ACTION_UPDATE_INPUT_SPEED_1, ACTION_UPDATE_INPUT_SPEED_2, ACTION_UPDATE_INPUT_TEMP, } from './Constans';

const initialState = {
    currentState : {},
    inputsState: {},
} as IState;

export const reducer = (state = initialState, action: IAction): IState => {
    switch (action.type) {
      case ACTION_UPDATE: {
        return { 
          ...state,
          currentState: action.payload
        };
      }
      case ACTION_SUBMIT: {
        return state;        
      }
      case ACTION_UPDATE_INPUT_SPEED_1: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, speed1: action.payload }
        };
      }
      case ACTION_UPDATE_INPUT_SPEED_2: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, speed2: action.payload }
        };
      }
      case ACTION_UPDATE_INPUT_TEMP: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, temperature: action.payload }
        };
      }
        
    default: {
      return state
    }
  }
}