import * as React from 'react';
export interface CheckboxProps{ checked?:boolean; onChange?:(v:boolean)=>void; disabled?:boolean; children?:React.ReactNode; style?:React.CSSProperties }
export declare function Checkbox(props:CheckboxProps):JSX.Element;
