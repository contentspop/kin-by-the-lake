import * as React from 'react';
export interface SegmentedOption{ value:string; label:string; lang?:'en'|'th' }
export interface SegmentedControlProps{ options:SegmentedOption[]; value?:string; onChange?:(v:string)=>void; inverse?:boolean; style?:React.CSSProperties }
export declare function SegmentedControl(props:SegmentedControlProps):JSX.Element;
