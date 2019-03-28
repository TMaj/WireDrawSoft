import * as React from 'react';
import './CustomInputComponent.css';

export interface ICustomInputProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
    content?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readonly?: boolean;
}

export const CustomInputComponent = (props: ICustomInputProps) => {
    return (
        <input type='text' className={"customInput "+ props.className} id={props.id} onChange ={props.onChange} value={props.content} readOnly={props.readonly}/>
    );
}