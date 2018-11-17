
export const subscribeToServer = () => {

    const net = require('net');

    const client = net.createConnection({ port: 8080 }, () => {
        // tslint:disable-next-line:no-console
        console.log('connected to server!');
        client.write('"<message><subscription><port>8090</port> <clientId>\'web-client\'</clientId></subscription></message>');
      
        client.on('data', function (data) {
          // tslint:disable-next-line:no-console
          console.log('Response from server ' + data);
        });
    });

    return;
}