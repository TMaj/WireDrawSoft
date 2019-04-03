import * as React from 'react';
import { Icon } from 'src/Components/IconComponent/IconComponent';
import { IconType } from '../../Resources/SVG';
import { IPreset } from './PresetsContainer';
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

    const onRemoveEntry = (index: number) => {
        if (props.onRemoveEntry) {
            props.onRemoveEntry(index);
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
        props.onRemoveEntry(props.index);
    };

    let cssClass = 'preset-entry ';
    cssClass = cssClass.concat(props.isSelected ? 'preset-entry--selected' : 'preset-entry--unselected'); 

    return ( <div className={cssClass} > 
                <div className={'preset-label'} onClick={onSelected}> {props.preset.name} {props.preset.speed1} {props.preset.speed2} {props.preset.temperature} </div>
                {props.editable ? <div onClick={onRemoved}> <Icon id='svg' name={IconType.Bin} />  </div> : null }
            </div> );    
}