import { IPreset, IState } from 'src/Common/Interfaces';
import { IAction } from './Actions';
import { ActionType } from './Constans';

const initialState = {
    connectionsStatus: {
      connectedToServer: false,
    },
    currentState : {},
    inputsState: {},
    presets: [] as IPreset[],    
    presetsLoading: false,  
    presetsState: {},
} as IState;

export const reducer = (state = initialState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.ACTION_UPDATE: {
        return { 
          ...state,
          currentState: action.payload
        };
      }
      case ActionType.ACTION_SUBMIT: {
        return state;        
      }
      case ActionType.ACTION_UPDATE_INPUT_SPEED_1: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, speed1: action.payload }
        };
      }
      case ActionType.ACTION_UPDATE_INPUT_SPEED_2: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, speed2: action.payload }
        };
      }
      case ActionType.ACTION_UPDATE_INPUT_TEMP: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, temperature: action.payload }
        };
      }
      case ActionType.ACTION_UPDATE_PRESET_STATE: {
        return { 
          ...state,
          presetsState: action.payload
        };
      }
      case ActionType.ACTION_GET_PRESETS: {
        return {
          ...state,
          presetsLoading: true
        };
      }
      case ActionType.ACTION_GET_PRESETS_SUCCESS: {
        return {
          ...state,          
          presets: action.payload,
          presetsLoading: false,
        };
      }
      case ActionType.ACTION_ADD_PRESET: {
        return state;
      }
      case ActionType.ACTION_ADD_PRESET_SUCCESS: {
        return {
          ...state,
          presets: [...state.presets, action.payload]
        }
      }
      case ActionType.ACTION_ADD_PRESET_SUCCESS: {
        return { ...state,
          presets: [action.payload, ...state.presets]
        };
      }
      case ActionType.ACTION_DELETE_PRESET: {
        return { ...state   };
      }
      case ActionType.ACTION_DELETE_PRESET_SUCCESS: {
        return { ...state,
          presets: action.payload
        };
      }
      case ActionType.ACTION_UPDATE_CONNECTIONS_STATE: {
        return { ...state,
          connectionsStatus: action.payload
        };
      }
        
    default: {
      return state
    }
  }
}