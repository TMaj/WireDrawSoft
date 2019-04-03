import * as React from 'react';
// import { CustomButtonComponent } from '../CustomButtonComponent/CustomButtonComponent';
import './NumberInputComponent.css'

export interface INumberInputComponentProps {    
    value: number,
    step: number,
    max?: number,
    min?: number,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

export const NumberInputComponent = (props: INumberInputComponentProps) => {
    return (
        // <div className={'custom-number-input-container'}>
            // <CustomButtonComponent content={'-'}/> 
            <input className="customNumberInput" type="number" step={props.step} value={props.value} onChange={props.onChange} max={props.max} min={props.min}/>
            // <CustomButtonComponent content={'+'}/> 
        // </div>
    );
}