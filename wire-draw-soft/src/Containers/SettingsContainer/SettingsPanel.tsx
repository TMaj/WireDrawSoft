import * as React from 'react'; 
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetSettings, SubmitSettings } from 'src/Common/Actions'; 
import { ISettings, IState } from 'src/Common/Interfaces';
import { CustomInputComponent } from 'src/Components/CustomInputComponent/CustomInputComponent';
import { NumberInputComponent } from 'src/Components/NumberInputComponent/NumberInputComponent';
import './SettingsContainer.css';   

export interface ISettingsPanelStoreProps {
    settings: ISettings;
}

export interface ISettingsPanelDispatchProps {
    getSettings: () => void;
    submitSettings: (payload: {settings: ISettings}) => void;
}

export interface ISettingsPanelState { 
    settingsChanged: boolean;
    settings: ISettings,
} 

export interface ISettingsPanelProps extends ISettingsPanelStoreProps, ISettingsPanelDispatchProps {};

export class SettingsPanel extends React.Component<ISettingsPanelProps, ISettingsPanelState> {
    constructor(props: ISettingsPanelProps) {
        super(props);

        this.state = { 
            settings: this.defaultSettings(),
            settingsChanged: false,
        }; 

        this.handleChange = this.handleChange.bind(this);
    } 

    // public async componentDidMount() {
    //    this.setState({settings: await getSettings()})
    // }

    public render() {   
        return (       
            <div className='settings-panel-container'>
                <div className='settings-panel'>                      
                    <div className='settings-row'>
                        <div className='label'>Server-URL </div>  
                        <CustomInputComponent content={this.state.settings.serverUrl} onChange={
                            // tslint:disable-next-line:jsx-no-lambda
                            (event: React.ChangeEvent<HTMLInputElement>) => {this.handleChange('serverUrl', event.currentTarget.value)}
                        }/>
                    </div>
                    <div className='settings-row'>
                        <div className='label'>Video URL </div> 
                        <CustomInputComponent content={this.state.settings.videoUrl} onChange={
                            // tslint:disable-next-line:jsx-no-lambda
                            (event: React.ChangeEvent<HTMLInputElement>) => {this.handleChange('videoUrl', event.currentTarget.value)}
                        }/>
                    </div>
                    <div className='settings-row'>
                        <div className='label'>API URL </div> 
                        <CustomInputComponent content={this.state.settings.apiUrl} onChange={
                            // tslint:disable-next-line:jsx-no-lambda
                            (event: React.ChangeEvent<HTMLInputElement>) => {this.handleChange('apiUrl', event.currentTarget.value)}
                        }/>
                    </div>
                    <div className='settings-row'>
                        <div className='label'>Units </div> 
                        <CustomInputComponent content={this.state.settings.units} onChange={
                            // tslint:disable-next-line:jsx-no-lambda
                            (event: React.ChangeEvent<HTMLInputElement>) => {this.handleChange('units', event.currentTarget.value)}
                        }/>
                    </div>
                    <div className='settings-row'> 
                        <div className='label'>Reconnection time [s]</div> 
                        <NumberInputComponent value={Number(this.state.settings.reconnectionPeriod)} step={0.1} onChange={
                            // tslint:disable-next-line:jsx-no-lambda
                            (value: number) => {this.handleChange('reconnectionPeriod', value)}
                        }/>
                    </div>
                </div>  
                <div className='settings-authors-info'>    
                    <img src={'img/agh.png'} width={'200px'} /> <br/>
                    ⓒAGH 2019<br/>
                    WIMiIP <br/>
                    Dr inz Piotr Kustra <br/>
                    Prof. Dr hab. inz. Andrij Milenin <br/>
                    inz. Tomasz Maj <br/><br/>

                    <img src={'img/wire-draw-soft.png'} width={'200px'} /> <br/>
                    ⓒWire Draw Soft 2019 <br/>
                </div>  
            </div> 
        ); 
    } 

    private handleChange = (propertyName: string, newValue: string | number) => {

        // tslint:disable-next-line:no-console
        console.log(propertyName);
        
        // tslint:disable-next-line:no-console
        console.log(this.state.settings);

        const settings = Object.assign({}, this.state.settings);
             // tslint:disable-next-line:no-console
             console.log(settings);
        settings[propertyName] = newValue;

         // tslint:disable-next-line:no-console
         console.log(settings);
        this.setState({settings}, () => { 
            this.props.submitSettings({settings: this.state.settings});
        });
    }

    private defaultSettings = () => {
        return {  
            apiUrl: "http://localhost:8001",
            reconnectionPeriod: "3",
            serverUrl: "ws://192.168.0.101:8080",  
            units: "rpm",
            videoUrl: "http://live.uci.agh.edu.pl/video/stream1.cgi", 
        }
    }
}  

const mapStateToProps = (state: IState) : ISettingsPanelStoreProps => {
    return {
        settings: state.settings,
    };
}

const mapDispatchToProps = (dispatch: Dispatch): ISettingsPanelDispatchProps => {
    return { 
        getSettings: () => dispatch(GetSettings()),
        submitSettings: (payload: {settings: ISettings}) => dispatch(SubmitSettings(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);