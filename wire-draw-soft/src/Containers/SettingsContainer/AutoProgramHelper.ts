/*tslint:disable:object-literal-sort-keys */

export function parseFromCSVString(csvString: string) {
    const Papa = require('papaparse');
    const result = Papa.parse(csvString); 
    return result.data;
}

export function validateParsedData(data: any[][]): boolean { 
 
    for (const row of data) { 
       if (row.length !== 6) {
            return false;
       }

       for (const cell of row) {
           // tslint:disable-next-line:use-isnan
           if (isNaN(cell)) {
                return false;
           }
       }
    } 
    
    return true;
}

export function parseDataToSteps(data: any[][]): any[] {
    const steps = [];

    for (const row of data) {
        steps.push({
            time: parseFloat(row[0]), 
            engine1Speed:  parseFloat(row[1]),
            engine1Direction: parseInt(row[2], 10),
            engine2Speed:  parseFloat(row[3]),
            engine2Direction: parseInt(row[4], 10),
            desiredTemperature: parseFloat(row[5])
        });
    }

    return steps;
}