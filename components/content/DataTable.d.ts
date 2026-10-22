import * as React from 'react';
export interface DataColumn{ key:string; label:string; align?:'left'|'right' }
export interface DataTableProps{ columns:DataColumn[]; rows:Record<string,React.ReactNode>[]; style?:React.CSSProperties }
export declare function DataTable(props:DataTableProps):JSX.Element;
