import React from 'react';
const V = {
  editorial: { background: 'var(--lake-600)', color: 'var(--stone-50)', border: '1px solid var(--lake-600)' },
  kitchen: { background: 'transparent', color: 'var(--lake-600)', border: '1px solid var(--lake-600)' },
  seasonal: { background: 'var(--kin-honey)', color: 'var(--lake-700)', border: '1px solid var(--kin-honey)' },
  status: { background: 'var(--stone-200)', color: 'var(--lake-600)', border: '1px solid var(--stone-200)' },
};
/** Square-cornered label. Max two per card. Never brass or red. */
export function Tag({ variant = 'kitchen', lang = 'en', children, style }) {
  const th = lang === 'th';
  return <span style={{ height: 26, padding: '0 12px', display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box', ...V[variant],
    font: th ? '400 12px/1 var(--font-text-thai)' : '500 10px/1 var(--font-text-latin)', letterSpacing: th ? 0 : '.18em', textTransform: th ? 'none' : 'uppercase', ...style }}>{children}</span>;
}
