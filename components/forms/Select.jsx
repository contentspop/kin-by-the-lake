import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Native select styled as a KIN field. options: string[] | {value,label}[] */
export function Select({ label, value, defaultValue, options = [], onChange, disabled = false, style }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, font: '500 10px/1.4 var(--font-text-latin)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--lake-600)', opacity: disabled ? 0.45 : 1, ...style }}>
      {label}
      <span style={{ position: 'relative', display: 'block' }}>
        <select value={value} defaultValue={defaultValue} disabled={disabled} onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', height: 48, borderRadius: 2, border: focus ? '2px solid var(--kin-brass)' : '1px solid var(--lake-600)',
            padding: '0 40px 0 ' + (focus ? 13 : 14) + 'px', background: 'var(--stone-0)', color: 'var(--lake-600)', font: '300 15px var(--font-body)', outline: 'none', cursor: 'pointer' }}>
          {options.map((o) => { const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label; return <option key={v} value={v}>{l}</option>; })}
        </select>
        <span style={{ position: 'absolute', right: 14, top: 17, pointerEvents: 'none', color: 'var(--lake-600)' }}><Icon name="chevron-down" size={14} /></span>
      </span>
    </label>
  );
}
