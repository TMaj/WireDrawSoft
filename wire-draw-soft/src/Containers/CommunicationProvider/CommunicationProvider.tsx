import * as React from 'react';
import { connect } from 'react-redux';
import Websocket from 'react-websocket'
import { Dispatch } from 'redux';
import { UpdateStore } from './CommunicationProvider.actions';
import { IProcessState, IState } from './CommunicationProvider.constans';
import { parseFromString } from './CommunicationProvider.helpers';
// import { serverConfig } from './CommunicationProvider.constans';
// import { subscribeToServer } from './CommunicationProvider.helpers'

interface ICommunicationProviderProps {
    updateStore: (newState: IProcessState) => void;    
}

class CommunicationProvider extends React.Component<ICommunicationProviderProps> {
    constructor(props: ICommunicationProviderProps) {
        super(props);

        this.handleData = this.handleData.bind(this);
      }
    
    public async handleData (data: any) {
        const update = await parseFromString(data) as IProcessState;
        this.props.updateStore(update);
    }
    
    public render() {
        return (         
            <div>
                 {this.props.children}   
                 <div> 
                    <Websocket url='ws://localhost:8080' onMessage={this.handleData}/>
                 </div>
            </div>);
    }
}

const mapStateToProps = (state: IState ) => {
    return;
}

// Mapping our action dispatcher to props is especially useful when creating container components.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateStore: (update: IProcessState) => dispatch(UpdateStore(update))
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps    
)(CommunicationProvider)