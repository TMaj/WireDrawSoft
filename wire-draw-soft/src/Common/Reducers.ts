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
      autoProgram: false,
      connectedToEngines: false,
      connectedToHardwareController: false,
      connectedToServer: false, 
    },
    currentState : {
      engine1Direction: 0,
      engine1Speed: 0,
      engine2Direction: 0,
      engine2Speed: 0
    },
    elongationStatus: {
      leftLength: 0,
      rightLength: 0,
    },
    inputsState: {},
    presets: [] as IPreset[],    
    presetsLoading: false,  
    presetsState: {},
    reelDiameter: 0.1,
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
      case ActionType.ACTION_UPDATE_DIRECTION_INPUT_1: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, engine1Direction: action.payload }
        };
      }
      case ActionType.ACTION_UPDATE_DIRECTION_INPUT_2: {
        return { 
          ...state,
          inputsState: { ...state.inputsState, engine2Direction: action.payload }
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
      case ActionType.ACTION_UPDATE_ELONGATION_STATUS: {
        return { ...state,
          elongationStatus: action.payload,          
        }
      }  
      case ActionType.ACTION_UPDATE_REEL_DIAMETER : {
        return { ...state,
          reelDiameter: action.payload,          
        }
      }  
      case ActionType.ACTION_UPDATE_AUTO_PROGRAM : {
        return { ...state,
          autoProgramSteps: action.payload,          
        }
      }  
      case ActionType.ACTION_TOGGLE_AUTO_PROGRAM : {
        return { ...state,
          connectionsStatus: {
            ...state.connectionsStatus,
            autoProgram: action.payload
          } 
        }
      } 
    default: {
      return state
    }
  }
}