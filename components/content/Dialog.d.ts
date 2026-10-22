import * as React from 'react';
export interface DialogProps{ open?:boolean; onClose?:()=>void; /** render in-flow (for previews) instead of fixed */ inline?:boolean; width?:number; children?:React.ReactNode; style?:React.CSSProperties }
export declare function Dialog(props:DialogProps):JSX.Element|null;
