
import * as React from 'react';
import { connect } from 'react-redux';
import { Brush, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Dispatch } from 'redux';
import { GetAllSessions, GetStatistics } from 'src/Common/Actions';
import { ISession, IState, IStatistics } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { EntriesPanel, IComlumnInfo } from 'src/Components/EntriesPanelComponent/EntriesPanelComponent';
import './ChartsContainer.css';
 
export interface IDetailedChartsContainerOwnProps {
    dd?: number;
}

export interface IDetailedChartsContainerStoreProps {
    sessions: ISession[];
    statistics: IStatistics[];
}

export interface IDetailedChartsContainerDispatchProps {
    getSessions: () => void;
    getStatistics: (payload: {start: any, end: any}) => void;
}

export interface IDetailedChartsContainerProps extends IDetailedChartsContainerOwnProps, IDetailedChartsContainerStoreProps, IDetailedChartsContainerDispatchProps {}

export interface IDetailedChartsContainerState {
    selectedEntry: number; 
    loadingData: boolean;
}

export class DetailedChartsContainer extends React.Component<IDetailedChartsContainerProps, IDetailedChartsContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {  
            loadingData: false,
            selectedEntry: -1,   
        }; 

        this.onSelected = this.onSelected.bind(this);
        this.exportData = this.exportData.bind(this);
    } 

    public async componentDidMount() {  
        this.props.getSessions(); 
    }

    public componentDidUpdate(prevProps: IDetailedChartsContainerProps) { 
        if (this.props.statistics !== prevProps.statistics) {
          this.setState({loadingData: false});
        }
      }
 
    public render() {
        
        const infoArray: IComlumnInfo[] = [
            {
                columnName: "Date",
                propertyName: "date",
            },
            {
                columnName: "Start",
                propertyName: "startFormatted",
            },
            {
                columnName: "End",
                propertyName: "endFormatted",
            } 
        ];

        const sessions = this.parseSessions(this.props.sessions);

        return (
        <div className='modal-container'>
            <div className={'sessions-panel'}>   
            {
                this.props.sessions ? 
                <EntriesPanel
                    columnInfo={infoArray}
                    editable={false}
                    entries={sessions}
                    selectedIndex={this.state.selectedEntry}
                    onSelectEntry={this.onSelected}
                />
                : 'Loading'
            }                
            </div>  
            <div className={'charts-panel'}>   
            {
                this.state.loadingData ? 
                'Loading data'
                : 
                <div>
                <LineChart width={900} height={400} data={this.props.statistics}>
                        <Legend verticalAlign="top" height={36}/>
                        <Line type="linear" dataKey="speed1" stroke="#00FF00" strokeWidth={2} isAnimationActive={true} dot={false} />
                        <Line type="linear" dataKey="speed2" stroke="#0000FF" strokeWidth={2} isAnimationActive={true} dot={false} />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" />
                        <Brush dataKey="time" height={30} stroke="#8884d8" />
                        <YAxis />
                </LineChart>
                <LineChart width={900} height={400} data={this.props.statistics}>
                        <Legend verticalAlign="top" height={36}/>
                        <Line type="linear" dataKey="temperature" stroke="#FF0000" strokeWidth={2} isAnimationActive={true} dot={false} />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" />
                        <Brush dataKey="time" height={30} stroke="#8884d8" />
                        <YAxis />
                </LineChart>
            </div>
            } 
           </div>
           <div className={'buttons-panel'}>   
            <CustomButtonComponent onClick={this.exportData} content='Export data' />        
            </div>  
        </div>
    )};

    private parseSessions = (sessions: any[]) => {
        const cultureCode = "pl-PL";

        return sessions.map((entry: any) => {
            entry.date =  new Date(entry.start).toLocaleDateString(cultureCode);
            entry.endFormatted = new Date(entry.end).toLocaleTimeString(cultureCode);
            entry.startFormatted = new Date(entry.start).toLocaleTimeString(cultureCode);
            return entry;
        }); 
    };

    private onSelected = (selected: any) => {
        this.setState({selectedEntry: selected}, async () => {
            this.setState({loadingData: true}); 

            this.props.getStatistics({
                end: this.props.sessions[this.state.selectedEntry].end,
                start: this.props.sessions[this.state.selectedEntry].start,
            }); 
        });
    };

    private exportData = () => { 
        const FileSaver = require('file-saver');
        const blob = new Blob(this.parseStatisticsToStringArray(this.props.statistics), {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, `WireDraw_${this.props.sessions[this.state.selectedEntry].date + '_' +
            this.props.sessions[this.state.selectedEntry].start}.txt`)
    }

    private parseStatisticsToStringArray = (data: any): string[] => {
        return this.props.statistics.map((entry: any) => {
            return entry.time + " " +
            entry.speed1 + " " +
            entry.speed2 + " " +
            entry.temperature + '\n';
        });
    }
}

const mapStateToProps = (state: IState) : IDetailedChartsContainerStoreProps => {
    return {
        sessions: state.sessions,
        statistics: state.statistics,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IDetailedChartsContainerDispatchProps => {
    return { 
        getSessions: () => dispatch(GetAllSessions()),
        getStatistics: (payload: {start: any, end: any}) => dispatch(GetStatistics(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedChartsContainer);