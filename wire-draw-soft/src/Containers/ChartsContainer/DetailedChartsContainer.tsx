import axios from 'axios';
import * as React from 'react';
import { EntriesPanel, IComlumnInfo } from 'src/Components/EntriesPanelComponent/EntriesPanelComponent';
import './ChartsContainer.css';

export interface IDetailedChartsContainerProps{
    dd?: number;
}

export interface IDetailedChartsContainerState {
    selectedEntry: number;
    sessions: any;
}

export default class DetailedChartsContainer extends React.Component<IDetailedChartsContainerProps, IDetailedChartsContainerState> {
    constructor(props: any) {
        super(props);

        this.state = { 
            selectedEntry: 0,
            sessions: [],            
        }; 
    }

    public componentDidMount() {
        axios.get(`http://localhost:8001/session`)
        // tslint:disable-next-line:no-console
        .then((result) => { console.log(result); this.setState({sessions: result.data}) });
    }
 
    public render() {
        
        const infoArray: IComlumnInfo[] = [
            {
                columnName: "Start",
                propertyName: "start",
            },
            {
                columnName: "End",
                propertyName: "end",
            } 
        ] 

        const onSelected = (sel: any) => {
            this.setState({selectedEntry: sel});
        };

        return (
        <div className='modal-container'>
            <div className={'sessions-panel'}>   
                <EntriesPanel
                    columnInfo={infoArray}
                    editable={false}
                    entries={this.state.sessions}
                    selectedIndex={this.state.selectedEntry}
                    onSelectEntry={onSelected}
                />
            </div>  
            <div className={'charts-panel'}>   
               Example
            </div>
        </div>
    )}
}