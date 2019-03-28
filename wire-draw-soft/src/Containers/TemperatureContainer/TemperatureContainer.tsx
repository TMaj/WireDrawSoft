import * as React from 'react';
import { connect } from 'react-redux';
import Thermometer from 'react-thermometer-component'
import { Dispatch } from 'redux';
import { SubmitUpdate, UpdateTempInputValue } from 'src/Common/Actions';
import { IProcessState, IState } from "src/Common/Interfaces";
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';

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
            <div>
                <div>
                    <Thermometer
                    theme="light"
                    value={this.props.currentState.temperature}
                    max="200"
                    steps="1"
                    format="°C"
                    size="large"
                    height="300"
                    />
                </div>
                <div>
                  Current temperature: {this.props.currentState.temperature}
                </div>
                <form onSubmit={this.sendMessage}>
                    <label>
                        Desired temperature:
                        <NumberInputComponent step={0.01} value={this.state.temperatureInputValue} onChange={this.handleTemperatureInputChange} max={200} min ={0}/>                    
                    </label>
                        <CustomSubmitComponent value="Submit" />
                </form>                        

            </div>
        );
    }

    private handleTemperatureInputChange(event: React.FormEvent<HTMLInputElement>) {
        const newFloatValue = parseFloat(event.currentTarget.value);
        this.setState({ temperatureInputValue: newFloatValue });
        window.localStorage.setItem('temperatureInputValue', event.currentTarget.value)
        this.props.updateTempInput(newFloatValue);
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