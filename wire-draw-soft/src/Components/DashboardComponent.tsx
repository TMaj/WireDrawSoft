import * as React from 'react';
import ChartsContainer from 'src/Containers/ChartsContainer/ChartsContainer';
import EngineContainer from 'src/Containers/EngineContainer/EngineContainer';
import { SettingsContainer } from 'src/Containers/SettingsContainer/SettingsContainer';
import TemperatureContainer from 'src/Containers/TemperatureContainer/TemperatureContainer';
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
                eee
            </div>
            <div className="ChartsPanel">
               <ChartsContainer/>
            </div>
            <div className="TemperaturePanel">
                <TemperatureContainer/>
            </div>
            <div className="VideoPanel">
                eee
            </div>
        </div>
    );
}