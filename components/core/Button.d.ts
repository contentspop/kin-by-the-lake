import * as React from 'react';
/**
 * @startingPoint section="Core" subtitle="Primary / secondary KIN button" viewport="700x260"
 */
export interface ButtonProps{ variant?:'primary'|'secondary'; size?:'md'|'sm'; /** Off-white treatment for Lake Blue grounds */ inverse?:boolean; disabled?:boolean; icon?:import('./Icon').IconName; /** 'th' switches to Kanit 400 14px, no tracking */ lang?:'en'|'th'; full?:boolean; children?:React.ReactNode; onClick?:()=>void; type?:'button'|'submit'; style?:React.CSSProperties }
export declare function Button(props:ButtonProps):JSX.Element;
