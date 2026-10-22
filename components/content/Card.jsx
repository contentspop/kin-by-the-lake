import React from 'react';
import { TextLink } from '../core/TextLink.jsx';
/** Content card. variant 'event' = raised off-white, square image; 'story' = Lake Blue with arch-cropped image. Radius 0. */
export function Card({ variant = 'event', image, eyebrow, title, body, cta, onCta, style }) {
  if (variant === 'story') {
    return (
      <div style={{ background: 'var(--lake-600)', color: 'var(--stone-50)', padding: 28, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center', ...style }}>
        {image ? <div style={{ width: '70%', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '999px 999px 0 0' }}><img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div> : null}
        {eyebrow ? <span style={{ font: '500 10px/1.4 var(--font-text-latin)', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--brass-300)' }}>{eyebrow}</span> : null}
        <span style={{ font: '400 22px/1.25 var(--font-display)', letterSpacing: '.04em' }}>{title}</span>
        {body ? <span style={{ font: '300 14px/1.6 var(--font-body)' }}>{body}</span> : null}
        {cta ? <TextLink inverse onClick={(e) => { e.preventDefault(); onCta && onCta(); }}>{cta}</TextLink> : null}
      </div>
    );
  }
  return (
    <div style={{ background: 'var(--stone-0)', border: '1px solid var(--stone-300)', display: 'flex', flexDirection: 'column', color: 'var(--lake-600)', ...style }}>
      {image ? <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}><img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div> : null}
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {eyebrow ? <span style={{ font: '500 10px/1.4 var(--font-text-latin)', letterSpacing: '.24em', textTransform: 'uppercase' }}>{eyebrow}</span> : null}
        <span style={{ font: '400 22px/1.25 var(--font-display)', letterSpacing: '.04em' }}>{title}</span>
        {body ? <span style={{ font: '300 14px/1.6 var(--font-body)' }}>{body}</span> : null}
        {cta ? <div style={{ paddingTop: 6 }}><TextLink onClick={(e) => { e.preventDefault(); onCta && onCta(); }} style={{ fontSize: 11 }}>{cta}</TextLink></div> : null}
      </div>
    </div>
  );
}
