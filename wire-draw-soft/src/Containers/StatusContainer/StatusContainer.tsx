import * as React from 'react' 
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ChangeConnectionToHardware } from 'src/Common/Actions';
import { IConnectionsStatus, IState } from 'src/Common/Interfaces'; 
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { SpinnerComponent } from 'src/Components/SpinnerComponent/SpinnerComponent';
import { ToggleComponent } from 'src/Components/ToggleComponent/ToggleComponent';
import './StatusContainer.css'

interface IStatusContainerStoreProps {
    connectionsStatus: IConnectionsStatus, 
} 

interface IStatusContainerDispatchProps { 
    changeConnectionStatus: (connection: boolean) => void; 
} 

export type IStatusContainerProps = IStatusContainerStoreProps & IStatusContainerDispatchProps;

class StatusContainer extends React.Component<IStatusContainerProps> {
    constructor(props: IStatusContainerProps) {
        super(props); 
        this.handleConnectionButtonClick = this.handleConnectionButtonClick.bind(this);
    }   

    public render() {
        const { connectedToServer, connectedToEngines } = this.props.connectionsStatus;

        return (
            <div className='status-container '>
                
                {connectedToServer ? null : <div className='status-spinner'> <SpinnerComponent/> </div>}

                <div className='state-row'>
                    <div className='state-row-label'> CURRENT SERVER STATUS: {connectedToServer ? 'CONNECTED' : 'DISCONNECTED'} </div>
                    <div className='state-row-toggle'> <ToggleComponent state={connectedToServer}/> </div>
                </div>
                <div className='state-row'>
                    <div className='state-row-label'> CURRENT ENGINES STATUS: {connectedToEngines ? 'CONNECTED' : 'DISCONNECTED'} </div>
                    <div className='state-row-toggle'> <ToggleComponent state={connectedToEngines}/> </div>
                    <CustomButtonComponent onClick={this.handleConnectionButtonClick} content={connectedToEngines? 'Disconnect' : 'Connect'}/>
                </div>
            </div>
        );
    }
    
    private handleConnectionButtonClick = () => {
        this.props.changeConnectionStatus(!this.props.connectionsStatus.connectedToEngines);
    }
}

const mapStateToProps = (state: IState) : IStatusContainerStoreProps => {
    return { 
        connectionsStatus: state.connectionsStatus
    };
}  

const mapDispatchToProps = (dispatch: Dispatch): IStatusContainerDispatchProps => {
    return { 
        changeConnectionStatus: (connection: boolean) => dispatch(ChangeConnectionToHardware(connection))
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);