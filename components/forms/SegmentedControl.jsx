import React from 'react';
/** Segmented control — language toggle, kitchen tabs. options: {value,label,lang?}[] */
export function SegmentedControl({ options = [], value, onChange, inverse = false, style }) {
  const ink = inverse ? 'var(--stone-50)' : 'var(--lake-600)', ground = inverse ? 'var(--lake-600)' : 'var(--stone-50)';
  return (
    <div role="tablist" style={{ display: 'inline-flex', border: '1px solid ' + ink, borderRadius: 2, width: 'fit-content', ...style }}>
      {options.map((o, i) => { const on = o.value === value; const th = o.lang === 'th';
        return <button key={o.value} role="tab" aria-selected={on} type="button" onClick={() => onChange && onChange(o.value)}
          style={{ height: 40, padding: '0 18px', border: 0, borderLeft: i ? '1px solid ' + ink : 0, background: on ? ink : 'transparent', color: on ? ground : ink, cursor: 'pointer',
            font: th ? '400 13px/1 var(--font-text-thai)' : '500 11px/1 var(--font-text-latin)', letterSpacing: th ? 0 : '.18em', textTransform: th ? 'none' : 'uppercase' }}>{o.label}</button>; })}
    </div>
  );
}
