import React from 'react';
/** Pill choice chip — dayparts, areas, filters. */
export function Chip({ selected = false, disabled = false, onClick, children, style }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" disabled={disabled} onClick={onClick} aria-pressed={selected}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ height: 36, padding: '0 16px', borderRadius: 999, border: '1px solid var(--lake-600)', cursor: disabled ? 'default' : 'pointer',
        background: selected ? 'var(--lake-600)' : (h ? 'var(--lake-50)' : 'transparent'), color: selected ? 'var(--stone-50)' : 'var(--lake-600)',
        font: '400 12px/1 var(--font-ui)', opacity: disabled ? 0.45 : 1, transition: 'background var(--motion-base) var(--motion-ease)', ...style }}>{children}</button>
  );
}
