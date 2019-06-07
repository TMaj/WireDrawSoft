import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SubmitUpdate, UpdateDirectionInputValue, UpdateSpeedInputValue } from 'src/Common/Actions';
import { EngineDirection, IConnectionsStatus, IElongationStatus, IProcessState, IState } from 'src/Common/Interfaces';
import { CustomSubmitComponent } from 'src/Components/CustomSubmitComponent/CustomSubmitComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import './EngineContainer.css' 
interface IEngineContainerOwnProps {
    engineNumber: number;
}

interface IEngineContainerStoreProps {
    currentState: IProcessState;
    connectionsStatus: IConnectionsStatus,
    elongationStatus: IElongationStatus, 
}

interface IEngineContainerDispatchProps {
    submitUpdate: (state: IProcessState) => void;
    updateSpeedInput: (speed: number, engineNumber: number) => void;
    updateDirectionInput: (update: number, engineNumber: number) => void;
}

type IEngineContainerProps = IEngineContainerOwnProps & IEngineContainerStoreProps & IEngineContainerDispatchProps

interface IEngineContainerState {
    speed: number;
    speedInputValue: number;
    engineDirection: EngineDirection;
}

class EngineContainer extends React.Component<IEngineContainerProps, IEngineContainerState> {
    constructor(props: IEngineContainerProps) {
        super(props);

        this.state = {  
            engineDirection: EngineDirection.Right,
            speed: 0,
            speedInputValue: 0,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleStateInputChange = this.handleStateInputChange.bind(this);
        this.getInputLocalStorageKey = this.getInputLocalStorageKey.bind(this);
        this.getDirectionLocalStorageKey = this.getDirectionLocalStorageKey.bind(this);
        this.handleDirectionChange = this.handleDirectionChange.bind(this);
    } 

    public componentDidMount() {
        const savedSpeedeInputValue = window.localStorage.getItem(this.getInputLocalStorageKey());
        // tslint:disable-next-line:no-console
        console.log(savedSpeedeInputValue);
        if (savedSpeedeInputValue) {
            const floatValue = parseFloat(savedSpeedeInputValue);
            this.props.updateSpeedInput(floatValue, this.props.engineNumber);
                    // tslint:disable-next-line:no-console
        console.log('Updating state');
            this.setState({speedInputValue: floatValue});
        }
    } 

    public async sendMessage(event: React.FormEvent<HTMLFormElement>) { 
        const update = Object.assign({}, this.props.currentState );
        update['engine'+this.props.engineNumber+'Speed'] = this.state.speedInputValue; 
        update['engine'+this.props.engineNumber+'Direction'] = this.state.engineDirection;
        // tslint:disable-next-line:no-console
        console.log(update);
        this.props.submitUpdate(update);
        event.preventDefault();
    }   
    
    public render() {        
        const currentSpeed = this.props.currentState[`engine${this.props.engineNumber}Speed`] 
        const currentDirection = this.props.currentState[`engine${this.props.engineNumber}Direction`];
        const enabled = this.props.connectionsStatus.connectedToEngines && this.props.connectionsStatus.connectedToServer;
        const containerClass = enabled ? 'engine-container' : 'engine-container disabled';
        const wireWinded = (this.props.engineNumber === 1 && this.props.currentState.engine1Direction === 0) || (this.props.engineNumber === 2 && this.props.currentState.engine1Direction === 1);
        // tslint:disable-next-line:triple-equals
        const wheelAnimation = currentDirection == "1" ? 'engine-clockwise-wheel-spin' : 'engine-anticlockwise-wheel-spin'; 
        const wheelStyle = enabled && currentSpeed > 0 ? {animation: wheelAnimation + ' infinite '+ 60 / currentSpeed + 's linear'} : {animation: ''};
        
        return (         
            <div className={containerClass}>
                <img className="engine-wheel" src={'img/wheel.png'} style = {wheelStyle} />                
                <div className='engine-form-container'>
                    <div className='engine-speed-label'> Current speed: 
                        <span className='engine-speed-value'> {parseFloat(currentSpeed).toPrecision(3)} rpm </span>
                    </div> 
                    <div className='engine-direction-label'> Current direction: 
                    {/* tslint:disable-next-line:triple-equals */}
                        <span className='engine-direction-value'> {currentDirection == 0 ? "Left" : "Right"} </span>
                    </div>                
                    <form onSubmit={this.sendMessage} className='engine-form'> 
                        <div className='form-inputs'>
                            <div className='form-input'> 
                                <label>
                                    Desired speed of engine {this.props.engineNumber}:
                                </label>
                                <NumberInputComponent disabled={!enabled} step={0.01} value={this.state.speedInputValue} onChange={this.handleStateInputChange} max={1000} min={0}/> 
                            </div>
                            <div className='form-input'> 
                                <label>
                                    Direction of engine {this.props.engineNumber}: {this.state.engineDirection === 0 ? 'Left' : 'Right'}
                                </label>
                                <input disabled={!enabled} type="radio" name="direction" value={0} onChange={this.handleDirectionChange}/> Left 
                                <input disabled={!enabled} type="radio" name="direction" value={1} onChange={this.handleDirectionChange}/> Right 
                            </div>
                        </div>
                        <CustomSubmitComponent disabled={!enabled} value="Submit" />
                    </form>     
                    <div className='engine-wire-amount-label'> Amount of wire  {wireWinded ? 'wound' : 'unwound'}:
                        <span className='engine-wire-amount-label-value'> {(this.props.engineNumber === 1 ? this.props.elongationStatus.leftLength : this.props.elongationStatus.rightLength).toPrecision(4)} </span>  m 
                    </div>              
                </div>
            </div>
        );
    }

    private handleDirectionChange(event: any) {
        const value = parseInt(event.currentTarget.value, 10);
        this.setState({engineDirection: value});
        window.localStorage.setItem(this.getDirectionLocalStorageKey(), event.currentTarget.value.toString());
        this.props.updateDirectionInput(value, this.props.engineNumber);
    }

    private getInputLocalStorageKey(): string {
        return 'speed' + this.props.engineNumber + 'InputValue';
    }

    private getDirectionLocalStorageKey(): string {
        return `engine${this.props.engineNumber}Direction`;
    }

    private handleStateInputChange(value: number) {
        this.setState({ speedInputValue: value});
        window.localStorage.setItem(this.getInputLocalStorageKey(), value.toString());
        this.props.updateSpeedInput(value, this.props.engineNumber);
    }
}

const mapStateToProps = (state: IState) : IEngineContainerStoreProps => {
    return {
        connectionsStatus: state.connectionsStatus,
        currentState: state.currentState,
        elongationStatus: state.elongationStatus,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IEngineContainerDispatchProps => {
    return { 
        submitUpdate: (update: IProcessState) => dispatch(SubmitUpdate(update)),
        updateDirectionInput: (update: number, engineNumber: number) => dispatch(UpdateDirectionInputValue(update, engineNumber)),
        updateSpeedInput: (update: number, engineNumber: number) => dispatch(UpdateSpeedInputValue(update, engineNumber))
    };
}

export default connect<IEngineContainerStoreProps, IEngineContainerDispatchProps, IEngineContainerOwnProps>(mapStateToProps, mapDispatchToProps)(EngineContainer)