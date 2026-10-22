import * as React from 'react';
export type IconName='good-food'|'good-people'|'good-moments'|'menu'|'reserve'|'lantern'|'pavilion'|'pier'|'wine'|'sunset'|'events'|'find-us'|'share'|'kids'|'chevron-down'|'check';
export interface IconProps{ /** Icon key from the brand line-icon set */ name:IconName; /** px, 16 inline · 24 UI · 32 feature · 56 highlight */ size?:number; color?:string; strokeWidth?:number; /** aria-label; required when the icon stands alone */ label?:string; style?:React.CSSProperties }
export declare const ICON_NAMES:IconName[];
export declare function Icon(props:IconProps):JSX.Element|null;
