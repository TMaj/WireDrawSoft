import { IProcessState } from './CommunicationProvider.constans';

export const subscribeToServer = (host: string, port: string) => {

    const socket = new WebSocket('ws://localhost:8080');

    // Connection opened
    socket.addEventListener('open', (event) => {
        socket.send('<message><subscription><port>8090</port> <clientId>\'web-client\'</clientId></subscription></message>');
    });
    
    // Listen for messages
    socket.addEventListener('message', (event) => {
        // tslint:disable-next-line:no-console
        console.log('Subscription response ', event.data);
        socket.close();
    });
}

export const parseFromString  = (update: string) => {
    const parseString = require('xml2js').parseString;

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve) => {
        parseString(update, (error: any, result: any) => {
            const newProcessState = {
            speed1: parseFloat(result.message.update[0].speed1[0]),
            speed2: parseFloat(result.message.update[0].speed2[0]),
            temperature: parseFloat(result.message.update[0].temperature[0]),
         } as IProcessState;
         resolve(newProcessState);
        });
    });
}