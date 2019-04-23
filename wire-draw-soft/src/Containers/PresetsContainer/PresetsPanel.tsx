import * as React from 'react';
import { IPreset } from 'src/Common/Interfaces';
import { Icon } from 'src/Components/IconComponent/IconComponent';
import { IconType } from '../../Resources/SVG';
import './PresetsContainer.css';

export interface IPresetsPanelProps {
    presets: IPreset[]
    onSelectEntry?:  (index: number) => void,
    onRemoveEntry?: (index: number) => void;
    selectedIndex: number,
    editable: boolean,
}

export interface IPresetEntryProps {
    preset: IPreset,
    onSelectEntry:  (index: number) => void,
    onRemoveEntry: (index: number) => void;
    index: number,
    isSelected: boolean,    
    editable: boolean,
}

export const PresetsPanel = (props: IPresetsPanelProps) => {

    const onSelectEntry = (index: number) => {
       if (props.onSelectEntry) {
        props.onSelectEntry(index);
       }
    };

    const onRemoveEntry = (id: number) => {
        if (props.onRemoveEntry) {
            props.onRemoveEntry(id);
        } 
    };

    const renderPresetsList = () : JSX.Element[] | null => {
        if (props.presets && props.presets.length === 0) {
            return null;
        }
        
        return (props.presets.map((preset: IPreset, index: number) => {
            const selected = props.selectedIndex === index;
            return <PresetEntry 
                    preset={preset} 
                    key={index} 
                    onSelectEntry={onSelectEntry} 
                    onRemoveEntry={onRemoveEntry}
                    index={index} 
                    isSelected={selected}
                    editable={props.editable}
                    />        
            })
        );
    };

    return (
        <div className="preset-entries">
        <table><tbody><tr><th>Name</th><th>Speed 1</th><th>Speed 2</th><th>Temperature</th></tr></tbody></table>
            {renderPresetsList()}
        </div>
    );
}

const PresetEntry = (props: IPresetEntryProps) : JSX.Element => {
    const onSelected = () => {
        props.onSelectEntry(props.index);
    };

    const onRemoved = () => {
        // tslint:disable-next-line:no-console
        console.log('Entry removed');
        props.onRemoveEntry(props.preset.id);
    };

    let cssClass = 'preset-entry ';
    cssClass = cssClass.concat(props.isSelected ? 'preset-entry--selected' : 'preset-entry--unselected'); 

    return ( <div className={cssClass} onClick={onSelected}> 
                <div className={'preset-label'} > 
                    <span className={'name-item'}> {props.preset.name} </span>                  
                    <span className={'item'}> {props.preset.speed1} </span>
                    <span className={'item'}> {props.preset.speed2} </span>
                    <span className={'item'}> {props.preset.temperature} </span>
                </div>
                {props.editable ? <div onClick={onRemoved}> <Icon id='svg' name={IconType.Bin} />  </div> : null }
            </div> );    
}