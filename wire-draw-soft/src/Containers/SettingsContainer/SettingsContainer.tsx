import * as React from 'react'
import { CustomButtonComponent } from 'src/Components/CustomButtonComponent/CustomButtonComponent';

export class SettingsContainer extends React.Component {
    constructor(props: any) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
    }   

    public render() {
        return (
            <div> 
                <div> <CustomButtonComponent content="Start drawing" onClick ={this.onButtonClick}/> </div>
                <div> <CustomButtonComponent content="Stop drawing" onClick ={this.onButtonClick}/> </div>
                <div> <CustomButtonComponent content="Other" onClick ={this.onButtonClick}/> </div>
            </div>
        );
    }

    private onButtonClick = () => {
        // tslint:disable-next-line:no-console
        console.log("Button clicked");
    }
}