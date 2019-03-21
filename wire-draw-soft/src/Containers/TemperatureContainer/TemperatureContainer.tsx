import * as React from 'react';
import { connect } from 'react-redux';
import Thermometer from 'react-thermometer-component'
import { IProcessState, IState } from "src/Common/Interfaces";
import { parseToString } from 'src/Common/Parser';
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import socket from 'src/WebSocket/WebSocket';

interface ITemperatureContainerStoreProps {
    currentState: IProcessState
}

interface ITemperatureContainerState {
    temperatureInputValue: number,
    websocket: any;
}

class TemperatureContainer extends React.Component<ITemperatureContainerStoreProps, ITemperatureContainerState> {
    constructor(props: ITemperatureContainerStoreProps) {
        super(props);        

        this.state = {                      
            temperatureInputValue: 0,  
            websocket: socket,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleTemperatureInputChange = this.handleTemperatureInputChange.bind(this);
    }

    public componentDidMount() {
        const savedTemperatureInputValue = window.localStorage.getItem('temperatureInputValue');
        if (savedTemperatureInputValue) {
            this.setState({temperatureInputValue: parseFloat(savedTemperatureInputValue)});
        }
    }

    public async sendMessage(event: React.FormEvent<HTMLFormElement>) {
        const update = Object.assign({}, this.props.currentState );
        update.temperature =  this.state.temperatureInputValue; 

        this.state.websocket.send(parseToString(update));
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
        this.setState({ temperatureInputValue: parseFloat(event.currentTarget.value)});
        window.localStorage.setItem('temperatureInputValue', event.currentTarget.value)
    }
}

const mapStateToProps = (state: IState) : ITemperatureContainerStoreProps => {
    return {
        currentState: state.currentState
    }
}

export default connect<ITemperatureContainerStoreProps>(mapStateToProps)(TemperatureContainer)