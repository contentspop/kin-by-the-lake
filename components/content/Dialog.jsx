import React from 'react';
/** Modal dialog. Lake Blue 55% backdrop, overlay shadow, Esc + backdrop close. */
export function Dialog({ open = true, onClose, children, inline = false, width = 380, style }) {
  React.useEffect(() => { if (!open || !onClose) return; const k = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: inline ? 'relative' : 'fixed', inset: inline ? undefined : 0, zIndex: 100, padding: inline ? '40px 24px' : 24, background: 'var(--color-scrim)', display: 'grid', placeItems: 'center' }}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: width, background: 'var(--stone-50)', boxShadow: 'var(--shadow-overlay)', padding: 28,
        display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center', color: 'var(--lake-600)', boxSizing: 'border-box', ...style }}>{children}</div>
    </div>
  );
}
