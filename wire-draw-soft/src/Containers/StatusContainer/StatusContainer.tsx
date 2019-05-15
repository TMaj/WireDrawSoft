import * as React from 'react' 
import { connect } from 'react-redux';
import { IConnectionsStatus, IState } from 'src/Common/Interfaces'; 
import { SpinnerComponent } from 'src/Components/SpinnerComponent/SpinnerComponent';
import { ToggleComponent } from 'src/Components/ToggleComponent/ToggleComponent';
import './StatusContainer.css'

interface IStatusContainerStoreProps {
    connectionsStatus: IConnectionsStatus, 
} 

class StatusContainer extends React.Component<IStatusContainerStoreProps> {
    constructor(props: IStatusContainerStoreProps) {
        super(props); 
    }   

    public render() {
        const { connectedToServer } = this.props.connectionsStatus;

        return (
            <div className='status-container '>
                
                {connectedToServer ? null : <div className='status-spinner'> <SpinnerComponent/> </div>}

                <div className='state-row'>
                    <div className='state-row-label'> CURRENT SERVER STATUS: {connectedToServer ? 'CONNECTED' : 'DISCONNECTED'} </div>
                    <div className='state-row-toggle'> <ToggleComponent state={connectedToServer}/> </div>
                </div>
            </div>
        );
    } 
}

const mapStateToProps = (state: IState) : IStatusContainerStoreProps => {
    return { 
        connectionsStatus: state.connectionsStatus
    };
} 

export default connect(mapStateToProps)(StatusContainer);