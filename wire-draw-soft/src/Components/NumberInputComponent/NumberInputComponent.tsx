import * as React from 'react';
import { CustomButtonComponent } from '../CustomButtonComponent/CustomButtonComponent';
import './NumberInputComponent.css'

export interface INumberInputComponentProps {    
    value: number,
    step?: number,
    max?: number,
    min?: number,
    onChange?: (value: number) => void,
    onBlur?:(value: number) => void,
    disabled?: boolean,
    buttonsHidden?: boolean
}

export interface INumberInputComponentState {
    step: number
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
            step: this.props.step ? this.props.step : 0.1,         
            value: this.props.value,  
        }
        this.onMinusClick = this.onMinusClick.bind(this);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this)
    } 

    public componentWillReceiveProps(nextProps: INumberInputComponentProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value});
        }   
    }

    public render() {
        return (
            <div className={'custom-number-input-container'}>
                {this.props.buttonsHidden ? null : <CustomButtonComponent disabled={this.state.disabledMinus || this.props.disabled} type="button" content={'-'} onClick={this.onMinusClick}/> }
                <input disabled={this.props.disabled} className="custom-number-input" type="number" step={this.props.step} value={this.state.value}
                       onChange={this.onChange} max={this.props.max} min={this.props.min} onBlur={this.onBlur}/>
                {this.props.buttonsHidden ? null :<CustomButtonComponent disabled={this.state.disabledPlus || this.props.disabled} type="button" content={'+'} onClick={this.onPlusClick}/> }
            </div>
        );
    }

    private onPlusClick() {        
        this.setState({ value: this.round(this.state.value + this.state.step) }, () => {
            this.validateInput();
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    private onMinusClick() {
        this.setState({ value: this.round(this.state.value - this.state.step)}, () => {             
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

    private onBlur(event: React.FormEvent<HTMLInputElement>) {
        if (this.props.onBlur) {
            this.props.onBlur(parseFloat(event.currentTarget.value));
        }
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