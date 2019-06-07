import * as React from 'react'; 
import { connect } from 'react-redux';
import { Dispatch } from 'redux'; 
import { SubmitAutoProgram, ToggleAutoProgram } from 'src/Common/Actions';
import { IState } from 'src/Common/Interfaces'; 
import { EntriesPanel, IComlumnInfo } from 'src/Components/EntriesPanelComponent/EntriesPanelComponent';
import { SpinnerComponent } from 'src/Components/SpinnerComponent/SpinnerComponent';
import { parseDataToSteps, parseFromCSVString, validateParsedData } from './AutoProgramHelper';
import './SettingsContainer.css';    

export interface IAutoProgramPanelStoreProps {
    autoProgramSteps: any[],  
}

export interface IAutoProgramPanelDispatchProps { 
    submitAutoProgram: (payload: any[]) => void;
    toggleAutoProgram: (payload: boolean) => void;
}

export interface IAutoProgramPanelState {
    loadingFile: boolean;
    steps: any;  
    validationError: boolean;
} 

export interface IAutoProgramPanelProps extends IAutoProgramPanelStoreProps, IAutoProgramPanelDispatchProps {};

export class AutoProgramPanel extends React.Component<IAutoProgramPanelProps, IAutoProgramPanelState> {
    constructor(props: IAutoProgramPanelProps) {
        super(props);

        this.state = { 
            loadingFile: false,
            steps: [],
            validationError: false,
        };  

        this.onChange = this.onChange.bind(this);

        this.parseTextToSteps = this.parseTextToSteps.bind(this);
    } 

    public onChange(e: any) {
        const files = e.target.files;
        const reader = new FileReader();

        reader.readAsText(files[0]);

        let file;
 
        reader.onload = (ev: any) => {
            // tslint:disable-next-line:no-console
            console.log(ev.target.result);

            file = ev.target.result; 
            this.parseTextToSteps(file);
        } 
    }
 
    public render() {   
        const infoArray: IComlumnInfo[] = [
            {
                columnName: "Time",
                propertyName: "time",
            },
            {
                columnName: "Engine 1 Speed",
                propertyName: "engine1Speed",
            },
            {
                columnName: "Engine 2 Speed",
                propertyName: "engine2Speed",
            } ,
            {
                columnName: "Engine 1 Direction",
                propertyName: "engine2Direction",
            } ,
            {
                columnName: "Engine 2 Direction",
                propertyName: "engine2Direction",
            } ,
            {
                columnName: "Temperature",
                propertyName: "desiredTemperature",
            } 
        ];

        return (       
            <div className='auto-program-container'>
                {this.props.autoProgramSteps ? <EntriesPanel editable={false} columnInfo={infoArray} selectedIndex={-1} entries={this.props.autoProgramSteps}/> : null}
                <div className={'file-error'}> {this.state.validationError ? "Error: file has wrong format" : null} </div>
                {this.state.loadingFile ? <SpinnerComponent/> : null}
                <input type='file' name='file' onChange={this.onChange} /> 
            </div> 
        ); 
    }

    private parseTextToSteps(text: string) {
        const data = parseFromCSVString(text);
        const isDataValid = validateParsedData(data);
        this.setState({validationError : !isDataValid});

        if (!isDataValid) {
            return;
        }

        const steps = parseDataToSteps(data);  
        this.props.submitAutoProgram(steps);
    }
     
}  

const mapStateToProps = (state: IState) : IAutoProgramPanelStoreProps => {
    return { 
        autoProgramSteps: state.autoProgramSteps,
    };
}

const mapDispatchToProps = (dispatch: Dispatch): IAutoProgramPanelDispatchProps => {
    return {  
        submitAutoProgram: (payload: any[]) => dispatch(SubmitAutoProgram(payload)),
        toggleAutoProgram: (payload: boolean) => dispatch(ToggleAutoProgram(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoProgramPanel);