import * as React from 'react';
import EngineContainer from 'src/Containers/EngineContainer/EngineContainer';
import { SettingsContainer } from 'src/Containers/SettingsContainer/SettingsContainer';
import TemperatureContainer from 'src/Containers/TemperatureContainer/TemperatureContainer';
import './DashboardComponent.css';

export const DashboardComponent = () => {
    return (
        <div className="grid-container">
            <div className="LeftEnginePanel">
                <EngineContainer engineNumber={1}/>
            </div>
            <div className="RightEnginePanel">
                <EngineContainer engineNumber={2}/>
            </div>
            <div className="LeftSettingsPanel">
                <SettingsContainer />
            </div>
            <div className="TemperaturePanel">
            <TemperatureContainer/>
            </div>
            <div className="SideBar">
            SideBar
            </div>
        </div>
    );
}