import React from 'react';
import { Icon } from '../core/Icon.jsx';
/** Square checkbox, 1px Lake Blue; filled with off-white check when on. */
export function Checkbox({ checked = false, onChange, disabled = false, children, style }) {
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'center', font: '300 14px/1.4 var(--font-body)', color: 'var(--lake-600)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 20, height: 20, border: '1px solid var(--lake-600)', background: checked ? 'var(--lake-600)' : 'transparent', display: 'grid', placeItems: 'center', flex: 'none', boxSizing: 'border-box' }}>
        {checked ? <Icon name="check" size={12} color="var(--stone-50)" /> : null}
      </span>{children}
    </label>
  );
}
