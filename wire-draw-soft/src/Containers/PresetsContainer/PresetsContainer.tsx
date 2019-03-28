import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitUpdate, UpdatePresetState } from 'src/Common/Actions';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { CustomInputComponent } from 'src/Components/CustomInputComponent/CustomInputComponent';
import './PresetsContainer.css';
import { PresetsPanel } from './PresetsPanel';

interface IPresetsContainerStoreProps {
    currentState: IProcessState;
    inputsState: IProcessState;
}

interface IPresetsContainerDispatchProps {
    updatePresets: (state: IProcessState) => void;
    submitUpdate: (state: IProcessState) => void;
}

interface IProcessContainerState {
    presets: IPreset[];
    selectedPresetIndex: number;
    addPresetButtonDisabled: boolean;
    addPresetFormVisible: boolean;
    presetNameInputValue: string;
}

export interface IPreset {
    name: string;
    speed1: number;
    speed2: number;
    temperature: number;
}

export type IPresetsContainerProps = IPresetsContainerStoreProps & IPresetsContainerDispatchProps;

class PresetsContainer extends React.Component<IPresetsContainerProps, IProcessContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {            
            addPresetButtonDisabled: false,
            addPresetFormVisible: false,
            presetNameInputValue: '',
            presets: [],
            selectedPresetIndex: -1,            
        }

        this.onAddPresetButtonClick = this.onAddPresetButtonClick.bind(this);
        this.onRemovePresetButtonClick = this.onRemovePresetButtonClick.bind(this);        
        this.onSubmitPresetButtonClick = this.onSubmitPresetButtonClick.bind(this);
        this.onEntrySelected = this.onEntrySelected.bind(this);
        this.onEntryRemoved = this.onEntryRemoved.bind(this);
    }  

    public render() {
        return (
            <div className='presets'>
                <div className='buttons-panel'>
                     <CustomButtonComponent disabled={this.state.addPresetButtonDisabled} content="Add preset" onClick ={this.onAddPresetButtonClick}/>
                     <CustomButtonComponent content="Submit preset" onClick ={this.onSubmitPresetButtonClick}/> 
                     <CustomButtonComponent />
                </div>
                {this.renderAddPresetForm()}
                <PresetsPanel presets={this.state.presets} onSelectEntry={this.onEntrySelected} onRemoveEntry={this.onEntryRemoved} selectedIndex={this.state.selectedPresetIndex}/> 
            </div>
        );
    }

    private renderAddPresetForm(): JSX.Element | null {
        if (!this.state.addPresetFormVisible) {
            return null;
        }         

        const onClick = () => {
            const newPreset = {            
                name: this.state.presetNameInputValue || 'Default preset name',
                speed1: this.props.inputsState.speed1,
                speed2: this.props.inputsState.speed2,
                temperature: this.props.inputsState.temperature,
            } as IPreset;
            this.setState({ presetNameInputValue: '', addPresetButtonDisabled: false, addPresetFormVisible: false, presets: [...this.state.presets, newPreset] });
        }

        const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({presetNameInputValue: event.currentTarget.value});
        };

        return <div className='add-new-panel'>
                    <CustomInputComponent id={'new-preset-input'} onChange={onValueChange}/> 
                    <CustomButtonComponent id={'new-preset-button'} content='Add' onClick={onClick}/>
               </div>
    }

    private onAddPresetButtonClick() {
        this.setState({addPresetFormVisible: true, addPresetButtonDisabled: true});
    }

    private onRemovePresetButtonClick() {
        const presetsCopy = [...this.state.presets];
        presetsCopy.splice(this.state.selectedPresetIndex,1);
        this.setState({presets: presetsCopy});
    }

    private onSubmitPresetButtonClick() {        
        this.props.submitUpdate(this.state.presets[this.state.selectedPresetIndex] as IProcessState)
    }

    private onEntrySelected(index: number) {
        this.setState({selectedPresetIndex: index});
    }

    private onEntryRemoved(index: number) {
        const newPresets = this.state.presets;
        newPresets.splice(index,1);
        this.setState({presets: newPresets});
    }
}

const mapStateToProps = (state: IState) : IPresetsContainerStoreProps => {
    return {
        currentState: state.currentState,
        inputsState: state.inputsState
    };
}

const mapDispatchToProps = (dispatch: Dispatch): IPresetsContainerDispatchProps => {
    return { 
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)),
        updatePresets: (update: IProcessState) => dispatch(UpdatePresetState(update)),        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresetsContainer);