import * as React from 'react';
import { connect } from 'react-redux';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { parseToString } from 'src/Common/Parser';
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import socket from 'src/WebSocket/WebSocket';
import wheel from '../../wheel.png';
import './EngineContainer.css'

interface IEngineContainerOwnProps {
    engineNumber: number;
}

interface IEngineContainerStoreProps {
    currentState: IProcessState;
}

type IEngineContainerProps = IEngineContainerOwnProps & IEngineContainerStoreProps

interface IEngineContainerState {
    speed: number;
    websocket: any;
    speedInputValue: number
}

class EngineContainer extends React.Component<IEngineContainerProps, IEngineContainerState> {
    constructor(props: IEngineContainerProps) {
        super(props);

        this.state = {                      
            speed: 0,
            speedInputValue: 0,  
            websocket: socket,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleStateInputChange = this.handleStateInputChange.bind(this);
    }    

    public async sendMessage(event: React.FormEvent<HTMLFormElement>) {
        const update = Object.assign({}, this.props.currentState );
        update['speed'+this.props.engineNumber] = this.state.speedInputValue; 

        this.state.websocket.send(parseToString(update));
        event.preventDefault();
    }   
    
    public render() {        
        const currentSpeed = this.props.currentState['speed'+this.props.engineNumber];
        return (         
            <div>
                <img className="Engine-wheel" src={wheel} style = {{animation: 'Engine-wheel-spin infinite '+ currentSpeed +'s linear'}} />
                <div> Current speed:{currentSpeed} </div>                
                <form onSubmit={this.sendMessage}>
                    <label>
                        Desired speed of engine {this.props.engineNumber}:
                        <NumberInputComponent step={0.1} value={this.state.speedInputValue} onChange={this.handleStateInputChange} />                     
                    </label>
                    <CustomSubmitComponent value="Submit" />
                </form>                  
            </div>);
    }

    private handleStateInputChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ speedInputValue: parseFloat(event.currentTarget.value)});
    }
}

const mapStateToProps = (state: IState) : IEngineContainerStoreProps => {
    return {
        currentState: state.currentState
    }
}

export default connect<IEngineContainerStoreProps, {}, IEngineContainerOwnProps>(mapStateToProps)(EngineContainer)