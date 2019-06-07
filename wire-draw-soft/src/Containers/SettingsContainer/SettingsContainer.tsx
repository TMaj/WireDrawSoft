import * as React from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitReelDiameterUpdate, SubmitUpdate, ToggleAutoProgram } from 'src/Common/Actions';
import { IConnectionsStatus, IProcessState, IState } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import { IconType } from 'src/Resources/SVG';
import AutoProgramPanel from './AutoProgramPanel';
import './SettingsContainer.css';  
import SettingsPanel   from './SettingsPanel';

interface ISettingsContainerStoreProps {
    currentState: IProcessState,
    inputsState: IProcessState,
    connectionStatus: IConnectionsStatus,
    reelDiameter: number,
    autoProgramSteps: any[], 
}

interface ISettingsContainerDispatchProps {
    submitUpdate: (state: IProcessState) => void;
    submitReelDiameterUpdate: (diameter: number) => void;
    toggleAutoProgram: (payload: boolean) => void;
}

interface ISettingsContainerState {
    modalVisible: boolean;
    modalContent: string;
    reelDiameter: number;
}

export type ISettingsContainerProps = ISettingsContainerStoreProps & ISettingsContainerDispatchProps;

Modal.defaultStyles.overlay.backgroundColor = 'rgba(118, 183, 252, 0.5)';

class SettingsContainer extends React.Component<ISettingsContainerProps, ISettingsContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {
            modalContent: 'settings',
            modalVisible: false,
            reelDiameter: 0, 
        }

        this.onSettingsButtonClick = this.onSettingsButtonClick.bind(this);
        this.onSubmitAllButtonClick = this.onSubmitAllButtonClick.bind(this);
        this.onResetAllButtonClick = this.onResetAllButtonClick.bind(this);
        this.updateReelDiameter = this.updateReelDiameter.bind(this);
        this.onAutoProgramPanelClick = this.onAutoProgramPanelClick.bind(this);
        this.onAutoProgramToggleClick = this.onAutoProgramToggleClick.bind(this);
    }   

    public render() {

        const customStyles = {   
            backgroundColor: 'red',
            content : {
              left                  : '50%',
              top                   : '50%', 
              // tslint:disable-next-line:object-literal-sort-keys
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            },
         
          };

        const toggleAutoProgramContent = this.props.connectionStatus.autoProgram ? 'Stop Auto program' : 'Run Auto Program';
        const toggleAutoProgramDisabled = !(this.props.autoProgramSteps && this.props.autoProgramSteps.length > 0 && this.props.connectionStatus.connectedToEngines);

        return (
            <div className='settings-container'> 
                <div> <CustomButtonComponent disabled={!this.props.connectionStatus.connectedToEngines} content="Submit all" onClick ={this.onSubmitAllButtonClick}/> </div>
                <div> <CustomButtonComponent disabled={!this.props.connectionStatus.connectedToEngines} content="Reset all" onClick ={this.onResetAllButtonClick}/> </div>
                <div> <CustomButtonComponent content="Settings" icon={IconType.Settings} onClick ={this.onSettingsButtonClick}/> </div>   
                <div> <CustomButtonComponent content="Auto program" onClick ={this.onAutoProgramPanelClick}/> </div>   
                <div> <CustomButtonComponent content={toggleAutoProgramContent} disabled={toggleAutoProgramDisabled} onClick ={this.onAutoProgramToggleClick}/> </div>   
                <div className='elongation-settings'> 
                    <div className={'elongation'}> Elongation factor: x{this.calculateElongation().toPrecision(3)} </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}> <div>Reel diameter [m]:</div> <NumberInputComponent step={0.001} min={0} max={1} onBlur={this.updateReelDiameter} buttonsHidden={true} value={this.state.reelDiameter}/> <div>{this.props.reelDiameter}</div> </div>  
                </div> 

                <Modal isOpen={this.state.modalVisible} onRequestClose={this.onSettingsButtonClick} style= {customStyles}>
                    {this.renderModalContent()}
                </Modal>
            </div>
        );
    }

    private updateReelDiameter = (diameter: number) => { 
        this.setState({reelDiameter: diameter});
        this.props.submitReelDiameterUpdate(diameter);
    }

    private calculateElongation = () => {
        const speed1 = parseFloat(this.props.currentState.engine1Speed.toString());
        const speed2 = parseFloat(this.props.currentState.engine2Speed.toString());
        return speed1 > speed2 ? (speed1/speed2): (speed2/speed1);
    }

    private onSubmitAllButtonClick = () => {
        this.props.submitUpdate(this.props.inputsState);
    }

    private onResetAllButtonClick = () => {
        this.props.submitUpdate( { 
            desiredTemperature: 0,
            engine1Speed: 0,
            engine2Speed: 0,
        } as IProcessState );
    }

    private onSettingsButtonClick = () => {
        this.setState({modalContent: 'settings', modalVisible: !this.state.modalVisible});
    }

    private onAutoProgramPanelClick = () => {
        this.setState({modalContent: 'autoProgram', modalVisible: !this.state.modalVisible});
    }

    private onAutoProgramToggleClick = () => {
        this.props.toggleAutoProgram(!this.props.connectionStatus.autoProgram);
    }

    private renderModalContent = () => {
        if (this.state.modalContent === 'settings') {
            return <SettingsPanel/>
        }

        if (this.state.modalContent === 'autoProgram') {
            return <AutoProgramPanel/> 
        }

        return null;
    }
}

const mapStateToProps = (state: IState) : ISettingsContainerStoreProps => {
    return {   
        autoProgramSteps: state.autoProgramSteps,  
        connectionStatus: state.connectionsStatus,
        currentState: state.currentState,
        inputsState: state.inputsState,
        reelDiameter: state.reelDiameter,
    };
}

const mapDispatchToProps = (dispatch: Dispatch): ISettingsContainerDispatchProps => {
    return {  
        submitReelDiameterUpdate: (diameter: number) => dispatch(SubmitReelDiameterUpdate(diameter)),
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)), 
        toggleAutoProgram: (payload: boolean) => dispatch(ToggleAutoProgram(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);