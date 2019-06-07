import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MyWebSocket } from '../../WebSocket/WebSocket'

import { UpdateAutoProgram, UpdateConnectionsState, UpdateElongationStatus, UpdateReelDiameter, UpdateStore } from 'src/Common/Actions';
import { IConnectionsStatus, IElongationStatus, IHardwareState, IProcessState } from 'src/Common/Interfaces';
import { parseFromString } from 'src/Common/Parser';

interface IUpdatesHandlerProps {
    updateStore: (newState: IProcessState) => void;
    updateConnectionsStatus: (status: IConnectionsStatus) => void;
    updateElongationStatus: (status: IElongationStatus) => void;
    updateReelDiameter: (diameter: number) => void;
    updateAutoProgram: (steps: any[]) => void;
} 

interface IUpdatesHandlerState {
    websocket: any;
    connected: boolean;
}

class UpdatesHandler extends React.Component<IUpdatesHandlerProps, IUpdatesHandlerState> {
    constructor(props: IUpdatesHandlerProps) {
        super(props);

        this.handleMessage = this.handleMessage.bind(this);
        this.handleConnection = this.handleConnection.bind(this);        
        this.handleError= this.handleError.bind(this);  

        const mysocket = new MyWebSocket();
        mysocket.onmessage = this.handleMessage;
        mysocket.onopen = this.handleConnection;
        mysocket.onerror = this.handleError;

        this.state = { 
            connected: false,
            websocket: mysocket
        };  
    }
    
    public async handleMessage(message: any) {
        const parsedMsg = await parseFromString(message.data); 

        // tslint:disable-next-line:no-console
        console.log(`UpdatesHandler :: Message received: ${message.data} `);

        switch (parsedMsg.type) {
            case 'update': 
                this.props.updateStore(parsedMsg.body as IProcessState); 
            break;
            case 'status':
                const state = parsedMsg.body as IHardwareState; 
                this.props.updateConnectionsStatus({
                    ...state,
                    connectedToServer: true, 
                });  
            break;
            case 'elongation':  
                this.props.updateElongationStatus(parsedMsg.body as IElongationStatus);  
            break; 
            case 'reel':  
                this.props.updateReelDiameter(parsedMsg.body as number);  
            break; 
            case 'autoProgram':  
                this.props.updateAutoProgram(parsedMsg.body as any[]);  
            break;  

        }
        // if (parsedMsg.type === 'update') {
        //     const update = parsedMsg.body as IProcessState; 
        //     this.props.updateStore(update); 
        // } 

        

        // if (parsedMsg.type ==='status') {
        //     const state = parsedMsg.body as IHardwareState; 
        //     this.props.updateConnectionsStatus({
        //         connectedToEngines: state.connectedToEngines, 
        //         connectedToHardwareController: state.connectedToHardwareController,
        //         connectedToServer: true, 
        //     });  
        // }  
    }    

    public async handleError(error: any) {
        // tslint:disable-next-line:no-console
        console.log('UpdatesHandler :: Error occured during websocket connection'); 

        this.setState({connected: false});
        this.props.updateConnectionsStatus({  
            autoProgram: false,
            connectedToEngines: false,
            connectedToHardwareController: false, 
            connectedToServer: false, 
        }); 
    };

    public async handleConnection() {
        // tslint:disable-next-line:no-console
        console.log('UpdatesHandler :: Connected to websocket server'); 
        
        this.props.updateConnectionsStatus({
            autoProgram: false,
            connectedToEngines: false,
            connectedToHardwareController: false, 
            connectedToServer: true, 
        });

        this.setState({connected: true})
    };  
    
    public render() {
        return (         
            <div>
                 {this.props.children}                  
            </div>);
    }  
}

const mapDispatchToProps = (dispatch: Dispatch) => ({     
    updateAutoProgram: (steps: any[]) => dispatch(UpdateAutoProgram(steps)),
    updateConnectionsStatus: (status: IConnectionsStatus) => dispatch(UpdateConnectionsState(status)),
    updateElongationStatus: (status: IElongationStatus) => dispatch(UpdateElongationStatus(status)),
    updateReelDiameter: (diameter: number) => dispatch(UpdateReelDiameter(diameter)), 
    updateStore: (update: IProcessState) => dispatch(UpdateStore(update)),  
  
})

export default connect(
    null,
    mapDispatchToProps    
)(UpdatesHandler)