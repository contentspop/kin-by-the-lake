import React from 'react';
/** Hairline table — events, wine lists, allergen matrices. No vertical rules, no zebra. First column Cinzel; numeric columns right-aligned tabular. */
export function DataTable({ columns = [], rows = [], style }) {
  const tmpl = columns.map((c, i) => (i === 0 ? 'minmax(160px,2fr)' : 'minmax(90px,1fr)')).join(' ');
  return (
    <div style={{ overflowX: 'auto', ...style }}>
      <div style={{ display: 'grid', gridTemplateColumns: tmpl, font: '300 14px/1.4 var(--font-body)', color: 'var(--lake-600)' }}>
        {columns.map((c, i) => <span key={'h' + i} style={{ padding: '12px 0', borderBottom: '1px solid var(--lake-600)', font: '500 10px/1.4 var(--font-text-latin)', letterSpacing: '.22em', textTransform: 'uppercase', textAlign: c.align || 'left' }}>{c.label}</span>)}
        {rows.map((r, ri) => columns.map((c, i) => <span key={ri + '-' + i} style={{ padding: '14px 0', borderBottom: '1px solid var(--stone-300)', textAlign: c.align || 'left',
          fontVariantNumeric: 'tabular-nums', ...(i === 0 ? { font: '400 16px/1.3 var(--font-display)', letterSpacing: '.06em' } : {}) }}>{r[c.key]}</span>))}
      </div>
    </div>
  );
}
