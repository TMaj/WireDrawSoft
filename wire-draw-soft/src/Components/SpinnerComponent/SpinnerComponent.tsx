import * as React from 'react'; 
import './SpinnerComponent.css' 

export const SpinnerComponent = () => {  
    return (
        <div className={'spinner-component-container'}> 
            <div className={'spinner-component one'}/>
            <div className={'spinner-component two'}/>
            <div className={'spinner-component three'}/>
        </div>
    )
}