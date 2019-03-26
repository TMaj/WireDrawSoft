import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitUpdate, UpdateSpeedInputValue } from 'src/Common/Actions';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import wheel from '../../wheel.png';
import './EngineContainer.css'

interface IEngineContainerOwnProps {
    engineNumber: number;
}

interface IEngineContainerStoreProps {
    currentState: IProcessState;
}

interface IEngineContainerDispatchProps {
    submitUpdate: (state: IProcessState) => void;
    updateSpeedInput: (speed: number, engineNumber: number) => void;
}

type IEngineContainerProps = IEngineContainerOwnProps & IEngineContainerStoreProps & IEngineContainerDispatchProps

interface IEngineContainerState {
    speed: number;
    speedInputValue: number
}

class EngineContainer extends React.Component<IEngineContainerProps, IEngineContainerState> {
    constructor(props: IEngineContainerProps) {
        super(props);

        this.state = {                      
            speed: 0,
            speedInputValue: 0
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleStateInputChange = this.handleStateInputChange.bind(this);
        this.getInputLocalStorageKey = this.getInputLocalStorageKey.bind(this);
    } 

    public componentDidMount() {
        const savedSpeedeInputValue = window.localStorage.getItem(this.getInputLocalStorageKey());
        if (savedSpeedeInputValue) {
            const floatValue = parseFloat(savedSpeedeInputValue);
            this.props.updateSpeedInput(floatValue, this.props.engineNumber);
            this.setState({speedInputValue: floatValue});
        }
    }

    public async sendMessage(event: React.FormEvent<HTMLFormElement>) {
        const update = Object.assign({}, this.props.currentState );
        update['speed'+this.props.engineNumber] = this.state.speedInputValue; 
        
        this.props.submitUpdate(update);
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
                        <NumberInputComponent step={0.01} value={this.state.speedInputValue} onChange={this.handleStateInputChange} />                     
                    </label>
                    <CustomSubmitComponent value="Submit" />
                </form>                  
            </div>);
    }

    private getInputLocalStorageKey(): string {
        return 'speed'+this.props.engineNumber +'InputValue';
    }

    private handleStateInputChange(event: React.FormEvent<HTMLInputElement>) {
        const newFoatValue = parseFloat(event.currentTarget.value);
        this.setState({ speedInputValue: newFoatValue});
        window.localStorage.setItem(this.getInputLocalStorageKey(), event.currentTarget.value);
        this.props.updateSpeedInput(newFoatValue, this.props.engineNumber);
    }
}

const mapStateToProps = (state: IState) : IEngineContainerStoreProps => {
    return {
        currentState: state.currentState
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IEngineContainerDispatchProps => {
    return { 
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)),
        updateSpeedInput: (update: number, engineNumber: number) => dispatch(UpdateSpeedInputValue(update, engineNumber))
    };
}

export default connect<IEngineContainerStoreProps, IEngineContainerDispatchProps, IEngineContainerOwnProps>(mapStateToProps, mapDispatchToProps)(EngineContainer)