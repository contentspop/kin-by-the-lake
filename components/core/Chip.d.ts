import * as React from 'react';
export interface ChipProps{ selected?:boolean; disabled?:boolean; onClick?:()=>void; children?:React.ReactNode; style?:React.CSSProperties }
export declare function Chip(props:ChipProps):JSX.Element;
