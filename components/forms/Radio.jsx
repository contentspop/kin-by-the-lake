import React from 'react';
/** Radio row — 20px circle, 1px Lake Blue line. */
export function Radio({ checked = false, onChange, disabled = false, name, children, style }) {
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'center', font: '300 14px/1.4 var(--font-body)', color: 'var(--lake-600)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <input type="radio" name={name} checked={checked} disabled={disabled} onChange={() => onChange && onChange(true)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--lake-600)', display: 'grid', placeItems: 'center', flex: 'none', boxSizing: 'border-box' }}>
        {checked ? <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--lake-600)' }} /> : null}
      </span>{children}
    </label>
  );
}
