import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import socket from '../../WebSocket/WebSocket'

import { UpdateStore } from 'src/Common/Actions';
import { IProcessState } from 'src/Common/Interfaces';
import { parseFromString } from 'src/Common/Parser';

interface IUpdatesHandlerProps {
    updateStore: (newState: IProcessState) => void;
}

interface IUpdatesHandlerState {
    websocket: any;
}

class UpdatesHandler extends React.Component<IUpdatesHandlerProps, IUpdatesHandlerState> {
    constructor(props: IUpdatesHandlerProps) {
        super(props);

        this.state = { 
            websocket: socket
        };

        this.handleMessage = this.handleMessage.bind(this);        
    }
    
    public async handleMessage(message: any) {
        const update = await parseFromString(message.data) as IProcessState;
        // tslint:disable-next-line:no-console
        console.log(message);
        this.props.updateStore(update);
    }    

    public componentWillMount() {
        this.state.websocket.onmessage = this.handleMessage;
    }
    
    public render() {
        return (         
            <div>
                 {this.props.children}                  
            </div>);
    }   
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateStore: (update: IProcessState) => dispatch(UpdateStore(update))
})

export default connect(
    null,
    mapDispatchToProps    
)(UpdatesHandler)