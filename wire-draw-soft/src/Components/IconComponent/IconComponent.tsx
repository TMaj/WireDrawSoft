import * as React from 'react';
import SVG from 'react-inlinesvg';
import { IconType } from 'src/Resources/SVG';

export interface IIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    name: IconType;
}

export const Icon = (props: IIconProps) => {
    const {name, ...rest} = props;
    return <SVG src={name} {...rest}/>
}