import * as React from 'react';
import ChartsContainer from 'src/Containers/ChartsContainer/ChartsContainer';
import EngineContainer from 'src/Containers/EngineContainer/EngineContainer';
import PresetsContainer from 'src/Containers/PresetsContainer/PresetsContainer';
import SettingsContainer from 'src/Containers/SettingsContainer/SettingsContainer';
import StatusContainer from 'src/Containers/StatusContainer/StatusContainer';
import TemperatureContainer from 'src/Containers/TemperatureContainer/TemperatureContainer';
import VideoContainer from 'src/Containers/VideoContainer/VideoContainer';
import './DashboardComponent.css';

export const DashboardComponent = () => {
    return (
        <div className="grid-container">
            <div className="MenuPanel">
                <SettingsContainer />
            </div>
            <div className="LeftEnginePanel">
                <EngineContainer engineNumber={1}/>
            </div>
            <div className="RightEnginePanel">
                <EngineContainer engineNumber={2}/>
            </div>          
             <div className="PresetsPanel">
                <PresetsContainer/>
            </div>
            <div className="ChartsPanel">
               <ChartsContainer/>
            </div>
            <div className="TemperaturePanel">
                <TemperatureContainer/>
            </div>
            <div className="StatusPanel">
                <StatusContainer/>
            </div>
            <div className="VideoPanel">
                <VideoContainer />
            </div>
        </div>
    );
}