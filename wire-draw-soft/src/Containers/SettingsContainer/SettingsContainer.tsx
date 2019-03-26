import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitUpdate } from 'src/Common/Actions';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';

interface ISettingsContainerStoreProps {
    currentState: IProcessState,
    inputsState: IProcessState,
}

interface ISettingsContainerDispatchProps {
    submitUpdate: (state: IProcessState) => void;
}

export type ISettingsContainerProps = ISettingsContainerStoreProps & ISettingsContainerDispatchProps;

class SettingsContainer extends React.Component<ISettingsContainerProps> {
    constructor(props: any) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onSubmitAllButtonClick = this.onSubmitAllButtonClick.bind(this);
        this.onResetAllButtonClick = this.onResetAllButtonClick.bind(this);
    }   

    public render() {
        return (
            <div> 
                <div> <CustomButtonComponent content="Submit all" onClick ={this.onSubmitAllButtonClick}/> </div>
                <div> <CustomButtonComponent content="Reset all" onClick ={this.onResetAllButtonClick}/> </div>
                <div> <CustomButtonComponent content="Other" onClick ={this.onButtonClick}/> </div>
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

    private onButtonClick = () => {
        // tslint:disable-next-line:no-console
        console.log("Button clicked");
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