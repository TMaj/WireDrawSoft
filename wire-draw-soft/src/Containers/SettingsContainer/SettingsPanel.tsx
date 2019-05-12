import * as React from 'react'; 
import './SettingsContainer.css';  

export interface ISettingsPanelProps {
    s? : any;
}

export interface ISettingsPanelState { 
    s? : any;
} 

export class SettingsPanel extends React.Component<ISettingsPanelProps, ISettingsPanelState> {
    constructor(props: ISettingsPanelProps) {
        super(props);

        this.state = { 
        }; 
    } 

    public render() {   
        return (       
        <div className='settings-panel'>    
            <div>Speed units</div>
            <div>Server-URL</div>
            <div>Video URL</div>
        </div> 
        );
    } 
}  