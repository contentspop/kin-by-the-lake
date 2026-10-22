import * as React from 'react';
export interface RadioProps{ checked?:boolean; onChange?:(v:boolean)=>void; disabled?:boolean; name?:string; children?:React.ReactNode; style?:React.CSSProperties }
export declare function Radio(props:RadioProps):JSX.Element;
