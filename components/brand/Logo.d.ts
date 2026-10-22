import * as React from 'react';
export interface LogoProps{ variant?:'primary'|'reversed'|'brass'|'black'|'grey'|'icon'; /** px; min 120 digital (lockup floor 94 for nav) */ width?:number; /** path to assets/logo/ from the consuming page */ assetBase?:string; alt?:string; style?:React.CSSProperties }
export declare function Logo(props:LogoProps):JSX.Element;
