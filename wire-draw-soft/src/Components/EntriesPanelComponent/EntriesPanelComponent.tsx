import * as React from 'react'; 
import { Icon } from 'src/Components/IconComponent/IconComponent';
import { IconType } from '../../Resources/SVG';
import './EntriesContainer.css';

export interface IComlumnInfo {
    columnName: string,
    propertyName: string
}

export interface IEntriesPanelProps {
    columnInfo: IComlumnInfo[],
    entries: any[],
    onSelectEntry?:  (index: number) => void,
    onRemoveEntry?: (index: number) => void;
    selectedIndex: number,
    editable: boolean,
}

export interface IEntryProps {
    columnInfo: IComlumnInfo[],
    entry: any,
    onSelectEntry:  (index: number) => void,
    onRemoveEntry: (index: number) => void;
    index: number,
    isSelected: boolean,    
    editable: boolean,
}

export const EntriesPanel = (props: IEntriesPanelProps) => {

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

    const renderEntriesList = () : JSX.Element[] | null => {
        if (props.entries && props.entries.length === 0) {
            return null;
        }
        
        return (props.entries.map((entry: any, index: number) => {
            const selected = props.selectedIndex === index;
            return <Entry 
                    columnInfo={props.columnInfo}
                    entry={entry} 
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
         { <div className={'preset-header'}> 
                <div className={'preset-label'} > 
                    {props.columnInfo.map((info: IComlumnInfo, index) => <span className={'item'} key={index}> { info.columnName } </span>)} 
                </div> 
            </div>}
            {renderEntriesList()}
        </div>
    );
}

const Entry = (props: IEntryProps) : JSX.Element => {
    const onSelected = () => {
        props.onSelectEntry(props.index);
    };

    const onRemoved = () => {
        // tslint:disable-next-line:no-console
        console.log('Entry removed');
        props.onRemoveEntry(props.entry.id);
    };

    let cssClass = 'preset-entry ';
    cssClass = cssClass.concat(props.isSelected ? 'preset-entry--selected' : 'preset-entry--unselected'); 

    return ( <div className={cssClass} onClick={onSelected}> 
                <div className={'preset-label'} > 
                    {props.columnInfo.map((info: IComlumnInfo, index) => <span className={'item'} key={index}> {props.entry[info.propertyName]} </span>)} 
                </div>
                {props.editable ? <div onClick={onRemoved}> <Icon id='svg' name={IconType.Bin} />  </div> : null }
            </div> );    
}