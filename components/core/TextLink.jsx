import React from 'react';
/** Tracked caps text link with brass underline. */
export function TextLink({ href = '#', inverse = false, children, onClick, style }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ font: '500 12px/1 var(--font-text-latin)', letterSpacing: '.2em', textTransform: 'uppercase',
        color: inverse ? 'var(--stone-50)' : (h ? 'var(--lake-700)' : 'var(--lake-600)'), textDecoration: 'underline',
        textDecorationColor: h ? (inverse ? 'var(--stone-50)' : 'var(--lake-600)') : 'var(--kin-brass)',
        textDecorationThickness: h ? 2 : 1, textUnderlineOffset: 8, transition: 'all var(--motion-base) var(--motion-ease)', ...style }}>{children}</a>
  );
}
