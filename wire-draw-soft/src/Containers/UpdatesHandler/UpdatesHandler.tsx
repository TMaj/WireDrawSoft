import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MyWebSocket } from '../../WebSocket/WebSocket'

import { UpdateConnectionsState, UpdateStore } from 'src/Common/Actions';
import { IConnectionsStatus, IHardwareState, IProcessState } from 'src/Common/Interfaces';
import { parseFromString } from 'src/Common/Parser';

interface IUpdatesHandlerProps {
    updateStore: (newState: IProcessState) => void;
    updateConnectionsStatus: (status: IConnectionsStatus) => void;
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

        if (parsedMsg.type === 'update') {
            const update = parsedMsg.body as IProcessState; 
            this.props.updateStore(update);
           
            // tslint:disable-next-line:no-console
            console.log(`UpdatesHandler :: Update received, Values: ${update.engine1Speed} ${update.engine2Speed} ${update.currentTemperature} `);
        } 

        if (parsedMsg.type ==='status') {
            const state = parsedMsg.body as IHardwareState;
            // tslint:disable-next-line:no-console
            console.log(`UpdatesHandler :: Status received: connected to server true connectedToEngines ${state.connectedToEngines} `);
            this.props.updateConnectionsStatus({
                connectedToEngines: state.connectedToEngines, 
                connectedToHardwareController: state.connectedToHardwareController,
                connectedToServer: true, 
            });  
        }  
    }    

    public async handleError(error: any) {
        // tslint:disable-next-line:no-console
        console.log('UpdatesHandler :: Error occured during websocket connection'); 

        this.setState({connected: false});
        this.props.updateConnectionsStatus({
            connectedToEngines: false,
            connectedToHardwareController: false, 
            connectedToServer: false,
        }); 
    };

    public async handleConnection() {
        // tslint:disable-next-line:no-console
        console.log('UpdatesHandler :: Connected to websocket server'); 
        
        this.props.updateConnectionsStatus({
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
    updateConnectionsStatus: (status: IConnectionsStatus) => dispatch(UpdateConnectionsState(status)),
    updateStore: (update: IProcessState) => dispatch(UpdateStore(update)),
})

export default connect(
    null,
    mapDispatchToProps    
)(UpdatesHandler)