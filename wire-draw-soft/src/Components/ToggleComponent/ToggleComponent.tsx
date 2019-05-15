import * as React from 'react'; 
import './ToggleComponent.css'

export interface IToggleComponentProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    state: boolean;
}

export const ToggleComponent = (props: IToggleComponentProps) => { 
    const className = 'toggle-component' + (props.state ? ' on' : ' off');
    return (
        <div className={'toggle-component-container'}> 
            <div className={className}/>
        </div>
    )
}