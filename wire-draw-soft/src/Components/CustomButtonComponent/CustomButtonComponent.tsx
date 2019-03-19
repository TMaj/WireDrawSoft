import * as React from 'react';
import './CustomButtonComponent.css'

export interface ICustomButtonProps {
    content: string;
    onClick: () => void;
}

export const CustomButtonComponent = (props: ICustomButtonProps) => {
    return (
        <button className="customButton" type="submit" onClick ={props.onClick}> {props.content} </button>
    );
}