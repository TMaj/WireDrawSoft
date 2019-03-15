import { IProcessState } from 'src/Common/Interfaces';


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

export const parseToString  = (update: IProcessState) => {
    const xml2js = require('xml2js');

    const message = {
        message: {
            update:{
                speed1: update.speed1,
                speed2: update.speed2 || 0,
                temperature: update.temperature || 0
            }
        }
    }
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(message);
    // tslint:disable-next-line:no-console
    console.log(xml);
    return xml;

    // // tslint:disable-next-line:no-shadowed-variable
    // return new Promise((resolve) => {
    //     parseXml(message, (error: any, result: string) => {
    //        resolve(result);
    //     });
    // });
}