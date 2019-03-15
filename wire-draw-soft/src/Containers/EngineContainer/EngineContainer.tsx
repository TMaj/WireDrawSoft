import * as React from 'react';
import { connect } from 'react-redux';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { parseToString } from 'src/Common/Parser';
import socket from 'src/WebSocket/WebSocket';
import wheel from '../../wheel.png';
import './EngineContainer.css'

interface IEngineContainerOwnProps {
    engineNumber: number;
}

interface IEngineContainerStateProps {
    currentState: IProcessState;
}

type IEngineContainerProps = IEngineContainerOwnProps & IEngineContainerStateProps

interface IEngineContainerState {
    speed: number;
    websocket: any;
    speedInputValue: string
}

class EngineContainer extends React.Component<IEngineContainerProps, IEngineContainerState> {
    constructor(props: IEngineContainerProps) {
        super(props);

        this.state = {                      
            speed: 0,
            speedInputValue: '',  
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
                {currentSpeed}
                <form onSubmit={this.sendMessage}>
                    <label>
                    Speed {this.props.engineNumber}:
                    <input type="text" value={this.state.speedInputValue} onChange={this.handleStateInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>                        

            </div>);
    }

    private handleStateInputChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ speedInputValue: event.currentTarget.value});
    }
}

const mapStateToProps = (state: IState) : IEngineContainerStateProps => {
    return {
        currentState: state.currentState
    }
}

export default connect<IEngineContainerStateProps, {}, IEngineContainerOwnProps>(mapStateToProps)(EngineContainer)