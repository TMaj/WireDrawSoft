// const socket = new WebSocket('ws://localhost:8080');

// export default socket;

export class MyWebSocket {
    public static websocket: WebSocket;  

    public onmessage: (message: any) => void;
    public onerror: (error: any) => void;
    public onopen: () => void; 
    
    constructor() {
        this.tryconnect();
    }

    public send = (message: any) => {
        MyWebSocket.websocket.send(message);
    }

    private onOpen = () => {

        // tslint:disable-next-line:no-console
        console.log('MyWebSocket :: Successfully connected to websocket');

        if (this.onopen) { 
            this.onopen();
        } 
    }

    private onError = (error: any) => { 
        // tslint:disable-next-line:no-console
        console.log('MyWebSocket :: Attempt to connect to websocket failed.');

        if (this.onerror) { 
            this.onerror(error);
        }
 
        setTimeout(this.tryconnect, 3000);
    }

    private onMessage = (message: any) => {
        if (this.onmessage) { 
            this.onmessage(message);
        } 
    }

    private tryconnect = () => {

        // tslint:disable-next-line:no-console
        console.log('MyWebSocket :: Attempting to connect');
         
        if (MyWebSocket.websocket &&
        (MyWebSocket.websocket.readyState === WebSocket.OPEN
        || MyWebSocket.websocket.readyState === WebSocket.CONNECTING)) {
            return;
        } 
        
        MyWebSocket.websocket = new WebSocket('ws://127.0.0.1:8080');
        MyWebSocket.websocket.onmessage = this.onMessage;
        MyWebSocket.websocket.onerror = this.onError;
        MyWebSocket.websocket.onopen = this.onOpen; 
    } 
}