import * as React from 'react';
import { connect } from 'react-redux';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { IProcessState, IState } from "src/Common/Interfaces";

interface IStateStatistics {
    engineOneSpeed: number,
    engineTwoSpeed: number,
    temperature: number
    time: string
}

interface IChartsContainerStoreProps {
    currentState: IProcessState
}

interface IChartsContainerState {
    maximized: boolean
    stateStatistics: IStateStatistics[]
}

class ChartsContainer extends React.Component<IChartsContainerStoreProps, IChartsContainerState> {
    constructor(props: IChartsContainerStoreProps) {
        super(props);

        this.state = {
            maximized: false,
            stateStatistics: []
        };
    }

    public componentDidMount() {

        const appendStatistics = (stateStatistics: IStateStatistics[]): IStateStatistics[] => {

            if (stateStatistics.length > 20) {
                stateStatistics.shift();
            }
            
            const newRecord = {
                engineOneSpeed: this.props.currentState.speed1,
                engineTwoSpeed: this.props.currentState.speed2,
                temperature: this.props.currentState.temperature,
                time: new Date().toLocaleTimeString(),
            } as IStateStatistics;

            return [ ...stateStatistics, newRecord ];
        };

        setInterval(() => {
            this.setState({...this.state, stateStatistics: appendStatistics(this.state.stateStatistics)})
        }, 1000);
    }

    public render() {
        
        const data = this.state.stateStatistics;  
        return(            
           <div>
            <LineChart width={600} height={300} data={data}>
                    <Legend verticalAlign="top" height={36}/>
                    <Line type="linear" dataKey="engineOneSpeed" stroke="#00FF00" strokeWidth={2} isAnimationActive={false} dot={false} />
                    <Line type="linear" dataKey="engineTwoSpeed" stroke="#0000FF" strokeWidth={2} isAnimationActive={false} dot={false} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
            </LineChart>
            <LineChart width={600} height={300} data={data}>
                    <Legend verticalAlign="top" height={36}/>
                    <Line type="linear" dataKey="temperature" stroke="#FF0000" strokeWidth={2} isAnimationActive={false} dot={false} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
            </LineChart>
           </div>);
    }
}

const mapStateToProps = (state: IState) : IChartsContainerStoreProps => {
    return {
        currentState: state.currentState
    }
}

export default connect<IChartsContainerStoreProps>(mapStateToProps)(ChartsContainer)