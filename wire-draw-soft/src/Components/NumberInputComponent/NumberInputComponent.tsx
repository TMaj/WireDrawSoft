import * as React from 'react';
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
        <input className="customInput" type="number" step={props.step} value={props.value} onChange={props.onChange} max={props.max} min={props.min}/>
    );
}