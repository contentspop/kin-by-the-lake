import * as React from 'react';
export interface TagProps{ /** editorial = Lake Blue fill · kitchen = outline · seasonal = Honey · status = Stone */ variant?:'editorial'|'kitchen'|'seasonal'|'status'; lang?:'en'|'th'; children?:React.ReactNode; style?:React.CSSProperties }
export declare function Tag(props:TagProps):JSX.Element;
