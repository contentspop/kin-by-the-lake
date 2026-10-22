import * as React from 'react';
/**
 * @startingPoint section="Navigation" subtitle="Light and reversed site nav" viewport="1200x200"
 */
export interface NavBarProps{ links?:string[]; /** lowercased link key */ active?:string; onNavigate?:(key:string)=>void; onReserve?:()=>void; /** over hero photography / night */ inverse?:boolean; lang?:'en'|'th'; onLangChange?:(l:'en'|'th')=>void; assetBase?:string; /** 56px mobile bar */ compact?:boolean; style?:React.CSSProperties }
export declare function NavBar(props:NavBarProps):JSX.Element;
