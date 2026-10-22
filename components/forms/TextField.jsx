import React from 'react';
/** Labelled text input / textarea. Label always above; never placeholder-only. */
export function TextField({ label, value, defaultValue, placeholder, onChange, error, hint, disabled = false, multiline = false, rows = 3, type = 'text', style }) {
  const [focus, setFocus] = React.useState(false);
  const border = error ? '1px solid var(--color-border-error)' : focus ? '2px solid var(--kin-brass)' : '1px solid var(--lake-600)';
  const pad = focus && !error ? 13 : 14;
  const common = { value, defaultValue, placeholder, disabled, onChange: onChange ? (e) => onChange(e.target.value) : undefined,
    onFocus: () => setFocus(true), onBlur: () => setFocus(false),
    style: { width: '100%', boxSizing: 'border-box', border, borderRadius: 2, outline: 'none', background: disabled ? 'var(--stone-100)' : 'var(--stone-0)',
      color: 'var(--lake-600)', font: '300 15px/1.5 var(--font-body)', padding: multiline ? (pad - 2) + 'px ' + pad + 'px' : '0 ' + pad + 'px', height: multiline ? undefined : 48, resize: 'vertical' } };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, font: '500 10px/1.4 var(--font-text-latin)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--lake-600)', opacity: disabled ? 0.45 : 1, ...style }}>
      {label}
      {multiline ? <textarea rows={rows} {...common} /> : <input type={type} {...common} />}
      {error || hint ? <span style={{ font: '400 11px/1.4 var(--font-text-latin)', letterSpacing: 0, textTransform: 'none', color: error ? 'var(--color-text-error)' : 'var(--color-text-muted)' }}>{error || hint}</span> : null}
    </label>
  );
}
