import { IPreset, ISession, ISettings, IState, IStatistics } from 'src/Common/Interfaces';
import { IAction } from './Actions';
import { ActionType } from './Constans'; 

const defaultSettings = (): ISettings => {
  return {  
      apiUrl: "http://localhost:8001",
      reconnectionPeriod: "3",
      serverUrl: "ws://192.168.0.101:8080",  
      units: "rpm",
      videoUrl: "http://live.uci.agh.edu.pl/video/stream1.cgi", 
  }
}

const initialState = {
    connectionsStatus: {
      connectedToEngines: false,
      connectedToServer: false,
    },
    currentState : {},
    inputsState: {},
    presets: [] as IPreset[],    
    presetsLoading: false,  
    presetsState: {},
    sessions: [] as ISession[],
    settings: defaultSettings(),
    statistics: [] as IStatistics[],
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
          inputsState: { ...state.inputsState, engine1Speed: action.payload }
        };
      }
      case ActionType.ACTION_UPDATE_INPUT_SPEED_2: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, engine2Speed: action.payload }
        };
      }
      case ActionType.ACTION_UPDATE_INPUT_TEMP: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, currentTemperature: action.payload }
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
      case ActionType.ACTION_GET_ALL_SESSIONS_SUCCESS: {
        return { ...state,
          sessions: action.payload,          
        }
      }
      case ActionType.ACTION_GET_STATISTICS_SUCCESS: {
        return { ...state,
          statistics: action.payload,          
        }
      }
      case ActionType.ACTION_GET_SETTINGS_SUCCESS: {
        return { ...state,
          settings: action.payload,          
        }
      } 
        
    default: {
      return state
    }
  }
}