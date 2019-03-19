import * as React from 'react';
import './CustomSubmitComponent.css'

export interface ICustomSubmitProps {
    value: string
}

export const CustomSubmitComponent = (props: ICustomSubmitProps) => {
    return (
        <input className="customSubmit" type="submit" value={props.value}/>
    );
}