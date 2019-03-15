import * as React from 'react';
import EngineContainer from 'src/Containers/EngineContainer/EngineContainer';
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
            LeftSettingsPanel
            </div>
            <div className="TemperaturePanel">
            TemperaturePanel
            </div>
            <div className="SideBar">
            SideBar
            </div>
        </div>
    );
}