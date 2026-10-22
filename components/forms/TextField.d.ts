import * as React from 'react';
/**
 * @startingPoint section="Forms" subtitle="Reservation form fields" viewport="700x380"
 */
export interface TextFieldProps{ label:string; value?:string; defaultValue?:string; placeholder?:string; onChange?:(v:string)=>void; /** Lantern Red border + message */ error?:string; hint?:string; disabled?:boolean; multiline?:boolean; rows?:number; type?:string; style?:React.CSSProperties }
export declare function TextField(props:TextFieldProps):JSX.Element;
