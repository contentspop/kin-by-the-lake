import * as React from 'react';
/**
 * @startingPoint section="Content" subtitle="Event and story (arch) cards" viewport="700x480"
 */
export interface CardProps{ variant?:'event'|'story'; image?:string; eyebrow?:string; title:string; body?:string; cta?:string; onCta?:()=>void; style?:React.CSSProperties }
export declare function Card(props:CardProps):JSX.Element;
