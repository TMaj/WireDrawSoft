import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitUpdate, UpdateSpeedInputValue } from 'src/Common/Actions';
import { IProcessState, IState } from 'src/Common/Interfaces';
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
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
        // tslint:disable-next-line:no-console
        console.log('Submit');
        const update = Object.assign({}, this.props.currentState );
        update['speed'+this.props.engineNumber] = this.state.speedInputValue; 
        
        this.props.submitUpdate(update);
        event.preventDefault();
    }   
    
    public render() {        
        const currentSpeed = this.props.currentState['speed'+this.props.engineNumber];
        return (         
            <div className='engine-container'>
                <img className="engine-wheel" src={'img/wheel.png'} style = {{animation: 'engine-wheel-spin infinite '+ currentSpeed +'s linear'}} />                
                <div className='engine-form-container'>
                    <div className='engine-speed-label'> Current speed: 
                        <span className='engine-speed-value'> {currentSpeed} </span>
                    </div>                
                    <form onSubmit={this.sendMessage}>
                        <label>
                            Desired speed of engine {this.props.engineNumber}:
                        </label>

                        <NumberInputComponent step={0.01} value={this.state.speedInputValue} onChange={this.handleStateInputChange} max={200} min={0}/>  
                        <CustomSubmitComponent value="Submit" />
                    </form>                  
                </div>
            </div>
        );
    }

    private getInputLocalStorageKey(): string {
        return 'speed'+this.props.engineNumber +'InputValue';
    }

    private handleStateInputChange(value: number) {
        this.setState({ speedInputValue: value});
        window.localStorage.setItem(this.getInputLocalStorageKey(), value.toString());
        this.props.updateSpeedInput(value, this.props.engineNumber);
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