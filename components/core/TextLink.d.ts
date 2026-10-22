import * as React from 'react';
export interface TextLinkProps{ href?:string; inverse?:boolean; children?:React.ReactNode; onClick?:(e:any)=>void; style?:React.CSSProperties }
export declare function TextLink(props:TextLinkProps):JSX.Element;
