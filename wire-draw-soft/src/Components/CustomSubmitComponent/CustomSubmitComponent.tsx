import * as React from 'react';
import './CustomSubmitComponent.css'

export interface ICustomSubmitProps {
    value: string,
    disabled?: boolean,
}

export const CustomSubmitComponent = (props: ICustomSubmitProps) => {
    return (
        <input disabled={props.disabled} className="customSubmit" type="submit" value={props.value}/>
    );
}