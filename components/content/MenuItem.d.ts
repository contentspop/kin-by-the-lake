import * as React from 'react';
/**
 * @startingPoint section="Content" subtitle="Menu dish line with Thai + markers" viewport="700x360"
 */
export interface MenuItemProps{ /** Original-language dish name */ name:string; /** Thai-script name (Thai / Peranakan dishes only) */ nameTh?:string; description?:string; descriptionTh?:string; /** Whole baht, no ฿, no decimals */ price:string|number; /** 0–3 Lantern Red dots */ spice?:0|1|2|3; allergens?:('G'|'N'|'D'|'S'|'V'|'VG')[]; /** e.g. "2–4" */ share?:string; style?:React.CSSProperties }
export declare function MenuItem(props:MenuItemProps):JSX.Element;
