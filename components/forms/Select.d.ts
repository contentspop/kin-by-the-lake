import * as React from 'react';
export interface SelectProps{ label:string; value?:string; defaultValue?:string; options:(string|{value:string;label:string})[]; onChange?:(v:string)=>void; disabled?:boolean; style?:React.CSSProperties }
export declare function Select(props:SelectProps):JSX.Element;
