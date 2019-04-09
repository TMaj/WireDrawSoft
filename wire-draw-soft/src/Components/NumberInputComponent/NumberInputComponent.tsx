import * as React from 'react';
import { CustomButtonComponent } from '../CustomButtonComponent/CustomButtonComponent';
import './NumberInputComponent.css'

export interface INumberInputComponentProps {    
    value: number,
    step: number,
    max?: number,
    min?: number,
    onChange: (value: number) => void
}

export interface INumberInputComponentState {
    value: number;
    disabledPlus: boolean;
    disabledMinus: boolean;
}

export class NumberInputComponent extends React.Component<INumberInputComponentProps, INumberInputComponentState> {
    constructor(props: INumberInputComponentProps) {
        super(props);

        this.state = {
            disabledMinus: false,
            disabledPlus: false,
            value: this.props.value,            
        }
        this.onMinusClick = this.onMinusClick.bind(this);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onChange = this.onChange.bind(this);
    } 

    public render() {
        return (
            <div className={'custom-number-input-container'}>
                <CustomButtonComponent disabled={this.state.disabledMinus} type="button" content={'-'} onClick={this.onMinusClick}/> 
                <input className="custom-number-input" type="number" step={this.props.step} value={this.state.value}
                       onChange={this.onChange} max={this.props.max} min={this.props.min}/>
                <CustomButtonComponent disabled={this.state.disabledPlus} type="button" content={'+'} onClick={this.onPlusClick}/> 
            </div>
        );
    }

    private onPlusClick() {        
        this.setState({ value: this.round(this.state.value + this.props.step) }, () => {
            this.validateInput();
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    private onMinusClick() {
        this.setState({ value: this.round(this.state.value - this.props.step)}, () => {             
            this.validateInput();
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    private onChange(event: React.FormEvent<HTMLInputElement>) {       
        event.preventDefault(); 
        this.setState({value: parseFloat(event.currentTarget.value)}, () => {
            this.validateInput();
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    private validateInput() {
        if (this.props.min !== undefined && this.state.value <= this.props.min) {
            this.setState({ disabledMinus: true});
        }
        else {
            this.setState({ disabledMinus: false});
        }

        if (this.props.max !== undefined && this.state.value >= this.props.max) {
            this.setState({ disabledPlus: true});
        }
        else {
            this.setState({ disabledPlus: false});
        }
    }

    private round(value: number) {
        return parseFloat(value.toFixed(this.getPrecision(this.props.step)));
    }

    private  getPrecision(a: any) {
        if (!isFinite(a)) {
            return 0;
        }
        let e = 1;
        let p = 0;
        while (Math.round(a * e) / e !== a) { e *= 10; p++; }
        return p;
      }
}