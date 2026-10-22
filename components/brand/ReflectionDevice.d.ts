import * as React from 'react';
export interface ReflectionDeviceProps{ color?:'lake-blue'|'off-white'|'brass'; /** px, min 48 · divider 80–160 */ width?:number; /** 600ms horizontal reveal */ reveal?:boolean; assetBase?:string; style?:React.CSSProperties }
export declare function ReflectionDevice(props:ReflectionDeviceProps):JSX.Element;
