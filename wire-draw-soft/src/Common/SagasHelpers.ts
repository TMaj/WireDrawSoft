import axios from 'axios';
import { MyWebSocket } from 'src/WebSocket/WebSocket';
import { IPreset, IProcessState, ISettings } from './Interfaces';
import { parseToString } from './Parser';

const apiUrl = 'http://localhost:8001'; 

export async function sendUpdate(update: IProcessState) {
    // tslint:disable-next-line:no-console
    console.log('Sending update');
   
    const message = await parseToString(update) as string;
     // tslint:disable-next-line:no-console
     console.log(message); 
    MyWebSocket.websocket.send(message);
}

export async function sendCommand(connectionStatus: boolean) {
    // tslint:disable-next-line:no-console
    console.log('Sending hardware connection request');
    
    const command = connectionStatus ? "connect" : "disconnect";

    const message = JSON.stringify({
        command,
        type: "command"        
    });
    MyWebSocket.websocket.send(message);
}

export async function sendReelUpdate(diameter: number) {
    const message = JSON.stringify({
        diameter,
        type: "reel"        
    });
    MyWebSocket.websocket.send(message);
}

export async function sendAutoProgram(steps: any[]) {
    const message = JSON.stringify({
        steps,
        type: "autoProgram"        
    });
    MyWebSocket.websocket.send(message);
}

export async function switchAutoProgram(autoProgram: boolean) {
    const message = JSON.stringify({
        autoProgram,
        type: "status"        
    });
    MyWebSocket.websocket.send(message);
}

 
export async function getAllPresets() {
    return await axios.get(`${apiUrl}/presets`);
}

export async function postNewPreset(preset: IPreset) {
    const toSend = {'preset' : preset};
    return axios.post(`${apiUrl}/presets`, toSend);
}

export async function deletePresetById(presetId: number) {
    return axios.delete(`${apiUrl}/presets/${presetId}`);
}

export async function getSessions() {
    return axios.get(`${apiUrl}/session`);
}

export async function getStatisticsBetween(payload: {start: any, end: any}) {
    return axios.get(`${apiUrl}/statistics/${payload.start}/${payload.end}`);
}

export async function getSettings() {
    return axios.get(`${apiUrl}/settings`);
}

export async function postSettings(payload: {settings: ISettings}) {  
    return axios.post(`${apiUrl}/settings`, payload);
}
 
export function handleError(error: any){
    // tslint:disable-next-line:no-console
    console.log(error);
}