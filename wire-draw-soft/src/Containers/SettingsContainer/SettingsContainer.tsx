import * as React from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitUpdate } from 'src/Common/Actions';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { IconType } from 'src/Resources/SVG';
import './SettingsContainer.css';  
import SettingsPanel   from './SettingsPanel';

interface ISettingsContainerStoreProps {
    currentState: IProcessState,
    inputsState: IProcessState,
}

interface ISettingsContainerDispatchProps {
    submitUpdate: (state: IProcessState) => void;
}

interface ISettingsContainerState {
    modalVisible: boolean;
}

export type ISettingsContainerProps = ISettingsContainerStoreProps & ISettingsContainerDispatchProps;


class SettingsContainer extends React.Component<ISettingsContainerProps, ISettingsContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {
            modalVisible: false,
        }

        this.onSettingsButtonClick = this.onSettingsButtonClick.bind(this);
        this.onSubmitAllButtonClick = this.onSubmitAllButtonClick.bind(this);
        this.onResetAllButtonClick = this.onResetAllButtonClick.bind(this);
    }   

    public render() {
        return (
            <div className='settings-container'> 
                <div> <CustomButtonComponent content="Submit all" onClick ={this.onSubmitAllButtonClick}/> </div>
                <div> <CustomButtonComponent content="Reset all" onClick ={this.onResetAllButtonClick}/> </div>
                <div> <CustomButtonComponent content="Settings" icon={IconType.Settings} onClick ={this.onSettingsButtonClick}/> </div> 
                <Modal isOpen={this.state.modalVisible} onRequestClose={this.onSettingsButtonClick}>
                    <SettingsPanel/>
                </Modal>
            </div>
        );
    }

    private onSubmitAllButtonClick = () => {
        this.props.submitUpdate(this.props.inputsState);
    }

    private onResetAllButtonClick = () => {
        this.props.submitUpdate( {
            speed1: 0,
            speed2: 0,
            temperature: 0
        } as IProcessState );
    }

    private onSettingsButtonClick = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }
}

const mapStateToProps = (state: IState) : ISettingsContainerStoreProps => {
    return {
        currentState: state.currentState,
        inputsState: state.inputsState
    };
}

const mapDispatchToProps = (dispatch: Dispatch): ISettingsContainerDispatchProps => {
    return { 
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);