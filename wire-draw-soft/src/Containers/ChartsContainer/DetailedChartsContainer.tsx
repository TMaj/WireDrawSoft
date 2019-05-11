
import * as React from 'react';
import { Brush, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { getAllSessions, getStatistics } from 'src/Common/ApiHelper';
import { ISession } from 'src/Common/Interfaces';
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';
import { EntriesPanel, IComlumnInfo } from 'src/Components/EntriesPanelComponent/EntriesPanelComponent';
import './ChartsContainer.css';
 
export interface IDetailedChartsContainerProps{
    dd?: number;
}

export interface IDetailedChartsContainerState {
    selectedEntry: number;
    sessions: ISession[];
    chartData: any;
    loadingData: boolean;
}

export default class DetailedChartsContainer extends React.Component<IDetailedChartsContainerProps, IDetailedChartsContainerState> {
    constructor(props: any) {
        super(props);

        this.state = { 
            chartData: [],  
            loadingData: false,
            selectedEntry: -1,
            sessions: [],       
        }; 

        this.onSelected = this.onSelected.bind(this);
        this.exportData = this.exportData.bind(this);
    }

    public async componentDidMount() {
        const allSessions = await getAllSessions();
        const parsedSessions = this.parseSessions(allSessions);
        this.setState({sessions: parsedSessions});
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
        ]  

        return (
        <div className='modal-container'>
            <div className={'sessions-panel'}>   
            {
                this.state.sessions ? 
                <EntriesPanel
                    columnInfo={infoArray}
                    editable={false}
                    entries={this.state.sessions}
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
                <LineChart width={900} height={400} data={this.state.chartData}>
                        <Legend verticalAlign="top" height={36}/>
                        <Line type="linear" dataKey="speed1" stroke="#00FF00" strokeWidth={2} isAnimationActive={true} dot={false} />
                        <Line type="linear" dataKey="speed2" stroke="#0000FF" strokeWidth={2} isAnimationActive={true} dot={false} />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" />
                        <Brush dataKey="time" height={30} stroke="#8884d8" />
                        <YAxis />
                </LineChart>
                <LineChart width={900} height={400} data={this.state.chartData}>
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

            const statistics = await getStatistics(
                this.state.sessions[this.state.selectedEntry].start,
                this.state.sessions[this.state.selectedEntry].end
            );
            this.setState({loadingData: false}); 
            this.setState({chartData: statistics});
        });
    };

    private exportData = () => { 
        const FileSaver = require('file-saver');
        const blob = new Blob(this.parseStatisticsToStringArray(this.state.chartData), {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, `WireDraw_${this.state.sessions[this.state.selectedEntry].date + '_' +
            this.state.sessions[this.state.selectedEntry].start}.txt`)
    }

    private parseStatisticsToStringArray = (data: any): string[] => {
        return this.state.chartData.map((entry: any) => {
            return entry.time + " " +
            entry.speed1 + " " +
            entry.speed2 + " " +
            entry.temperature + '\n';
        });
    }
}