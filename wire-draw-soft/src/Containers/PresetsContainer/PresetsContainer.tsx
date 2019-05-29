import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AddNewPreset, DeletePreset, GetAllPresets, SubmitUpdate, UpdatePresetState } from 'src/Common/Actions';
import { IPreset, IProcessState, IState } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { CustomInputComponent } from 'src/Components/CustomInputComponent/CustomInputComponent';
import { IconType } from 'src/Resources/SVG';
import './PresetsContainer.css';
import { PresetsPanel } from './PresetsPanel';

interface IPresetsContainerStoreProps {
    currentState: IProcessState;
    inputsState: IProcessState;
    presets: IPreset[];
    presetsLoading: boolean;
}

interface IPresetsContainerDispatchProps {
    updatePresets: (state: IProcessState) => void;
    submitUpdate: (state: IProcessState) => void;
    getAllPresets: () => void;
    addNewPreset: (newPreset: IPreset) => void;
    deletePreset: (presetId: number) => void;
}

interface IProcessContainerState {
    presets: IPreset[];
    selectedPresetIndex: number;
    addPresetButtonDisabled: boolean;
    addPresetFormVisible: boolean;
    presetNameInputValue: string;    
    editable: boolean;
}

export type IPresetsContainerProps = IPresetsContainerStoreProps & IPresetsContainerDispatchProps;

class PresetsContainer extends React.Component<IPresetsContainerProps, IProcessContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {            
            addPresetButtonDisabled: false,
            addPresetFormVisible: false,
            editable: false,
            presetNameInputValue: '',
            presets: this.props.presets ? this.props.presets : [],
            selectedPresetIndex: -1,           
        }

        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onAddPresetButtonClick = this.onAddPresetButtonClick.bind(this);    
        this.onSubmitPresetButtonClick = this.onSubmitPresetButtonClick.bind(this);
        this.onEntrySelected = this.onEntrySelected.bind(this);
        this.onEntryRemoved = this.onEntryRemoved.bind(this);
        this.onEditButtonClicked = this.onEditButtonClicked.bind(this);
        this.handlePanelClick = this.handlePanelClick.bind(this);
    }  

    public componentDidMount(){
        window.addEventListener('click', this.handlePanelClick, true);
        this.props.getAllPresets();
    }
    
    public componentWillUnmount(){
        window.removeEventListener('click', this.handlePanelClick, true);
    }

    public render() {
        return (
            <div className='presets'>
                <div className='buttons-panel'>
                     <CustomButtonComponent disabled={this.state.addPresetButtonDisabled} content="Add preset" onClick ={this.onAddPresetButtonClick}/>
                     <CustomButtonComponent content="Submit preset" onClick ={this.onSubmitPresetButtonClick}/> 
                     <CustomButtonComponent id={'edit-button'} icon={IconType.Edit} onClick={this.onEditButtonClicked}/>
                </div>
                {this.renderAddPresetForm()}
                <PresetsPanel 
                    presets={this.props.presets.sort((a,b) => b.id - a.id) || []} 
                    onSelectEntry={this.onEntrySelected} 
                    onRemoveEntry={this.onEntryRemoved} 
                    selectedIndex={this.state.selectedPresetIndex}
                    editable={this.state.editable}
                /> 
            </div>
        );
    }

    private onKeyPressed(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            this.onAddClick();
        }
    }

    private onAddClick() {
        const newPreset = {                           
            name: this.state.presetNameInputValue || 'Default preset name',
            speed1: this.props.inputsState.engine1Speed,
            speed2: this.props.inputsState.engine2Speed,
            temperature: this.props.inputsState.currentTemperature
        } as IPreset;

        this.props.addNewPreset(newPreset);

        this.setState({ presetNameInputValue: '', addPresetButtonDisabled: false, addPresetFormVisible: false, presets: [...this.state.presets, newPreset] });
    }

    private renderAddPresetForm(): JSX.Element | null {
        if (!this.state.addPresetFormVisible) {
            window.removeEventListener('keypress', this.onKeyPressed, true);         
            return null;
        }
        
        window.addEventListener('keypress', this.onKeyPressed, true);

        const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({presetNameInputValue: event.currentTarget.value});
        };

        return <div id="add-new" className='add-new-panel'>
                    <CustomInputComponent id={'new-preset-input'} onChange={onValueChange}/> 
                    <CustomButtonComponent id={'new-preset-button'} content='Add' onClick={this.onAddClick}/>
               </div>
    }

    private onAddPresetButtonClick() {
        this.setState({addPresetFormVisible: true, addPresetButtonDisabled: true});
    }

    private onSubmitPresetButtonClick() {
        const preset = this.props.presets[this.state.selectedPresetIndex];
        const update = {
            desiredTemperature: preset.temperature,
            engine1Speed: preset.speed1,
            engine2Speed: preset.speed2,
        } as IProcessState;     
        this.props.submitUpdate(update)
    }

    private onEntrySelected(index: number) {
        this.setState({selectedPresetIndex: index});
    }

    private onEntryRemoved(id: number) {
        this.props.deletePreset(id); 
    }

    private onEditButtonClicked() {
        this.setState({editable: !this.state.editable})
    }

    private handlePanelClick(event: MouseEvent) {
        const element = document.getElementById("add-new");
        if ( element !== null && !element.contains(event.target as Node)){
          this.setState({addPresetFormVisible: false, addPresetButtonDisabled: false});
        }
    }
}

const mapStateToProps = (state: IState) : IPresetsContainerStoreProps => {
    return {
        currentState: state.currentState,
        inputsState: state.inputsState,
        presets: state.presets,
        presetsLoading: state.presetsLoading
    };
}

const mapDispatchToProps = (dispatch: Dispatch): IPresetsContainerDispatchProps => {
    return { 
        addNewPreset: (newPreset: IPreset) => dispatch(AddNewPreset(newPreset)),
        deletePreset: (presetId: number) => dispatch(DeletePreset(presetId)),
        getAllPresets: () => dispatch(GetAllPresets()),
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)),
        updatePresets: (update: IProcessState) => dispatch(UpdatePresetState(update)),  
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresetsContainer);