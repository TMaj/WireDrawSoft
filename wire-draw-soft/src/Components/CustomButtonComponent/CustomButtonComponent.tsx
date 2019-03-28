import * as React from 'react';
import { IconType } from 'src/Resources/SVG';
import { Icon } from '../IconComponent/IconComponent';
import './CustomButtonComponent.css';

export interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: IconType;
    content?: string;
    onClick?: () => void | ((event: React.FormEvent<HTMLButtonElement>) => void);
}

export const CustomButtonComponent = (props: ICustomButtonProps) => {
    return (
        <button className="customButton" type="submit" {...props}>
         {props.content} 
         {props.icon ? <Icon name={props.icon}/> : null}
         </button>
    );
}