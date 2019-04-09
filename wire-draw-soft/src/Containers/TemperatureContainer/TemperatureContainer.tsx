import * as React from 'react';
import { connect } from 'react-redux';
import Thermometer from 'react-thermometer-component'
import { Dispatch } from 'redux';
import { SubmitUpdate, UpdateTempInputValue } from 'src/Common/Actions';
import { IProcessState, IState } from "src/Common/Interfaces";
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import './TemperatureContainer.css'

interface ITemperatureContainerStoreProps {
    currentState: IProcessState
}

interface ITemperatureContainerDispatchProps {
    submitUpdate: (state: IProcessState) => void;
    updateTempInput: (temp: number) => void;
}

interface ITemperatureContainerState {
    temperatureInputValue: number,
    previousValue: number,
}

type ITemperatureContainerProps = ITemperatureContainerStoreProps & ITemperatureContainerDispatchProps;

class TemperatureContainer extends React.Component<ITemperatureContainerProps, ITemperatureContainerState> {
    constructor(props: ITemperatureContainerProps) {
        super(props);        

        this.state = {           
            previousValue: 0,            
            temperatureInputValue: 0,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleTemperatureInputChange = this.handleTemperatureInputChange.bind(this);
    }

    public componentDidMount() {
        const savedTemperatureInputValue = window.localStorage.getItem('temperatureInputValue');
        if (savedTemperatureInputValue) {
            const floatValue = parseFloat(savedTemperatureInputValue);
            this.setState({temperatureInputValue: floatValue});
            this.props.updateTempInput(floatValue);
        }
    }

    public async sendMessage(event: React.FormEvent<HTMLFormElement>) {
        const update = Object.assign({}, this.props.currentState );
        update.temperature =  this.state.temperatureInputValue; 

        this.props.submitUpdate(update);
        event.preventDefault();
    }

    public render() {
        return(
            <div className='temperature-container'>
                    <Thermometer
                    theme="light"
                    value={this.props.currentState.temperature}
                    max="200"
                    steps="1"
                    format="°C"
                    size="large"
                    height="300"
                    />
                <div className='temperature-form-container'>
                    <div className='temperature-label'> Current temperature:
                        <span className='temperature-value'> {this.props.currentState.temperature} </span> 
                    </div>
                    <form onSubmit={this.sendMessage}>
                        <label>
                            Desired temperature:
                        </label>
                        <NumberInputComponent step={0.1} value={this.state.temperatureInputValue} onChange={this.handleTemperatureInputChange} max={200} min ={0}/>                    
                        <CustomSubmitComponent value="Submit" />
                    </form>                        
                </div>
            </div>
        );
    }

    private handleTemperatureInputChange(value: number) {
        this.setState({ temperatureInputValue: value });
        window.localStorage.setItem('temperatureInputValue', value.toString())
        this.props.updateTempInput(value);
    }
}

const mapStateToProps = (state: IState) : ITemperatureContainerStoreProps => {
    return {
        currentState: state.currentState
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ITemperatureContainerDispatchProps => {
    return { 
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)),
        updateTempInput: (update: number) => dispatch(UpdateTempInputValue(update))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureContainer)