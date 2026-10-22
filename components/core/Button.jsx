import React from 'react';
import { Icon } from './Icon.jsx';
const SIZES = { md: { h: 48, px: 24, fs: 12 }, sm: { h: 40, px: 18, fs: 11 } };
/** KIN button. One primary per view. On Lake Blue grounds pass inverse. */
export function Button({ variant = 'primary', size = 'md', inverse = false, disabled = false, icon, lang = 'en', full = false, children, onClick, type = 'button', style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const blue = 'var(--lake-600)', ow = 'var(--stone-50)';
  const base = inverse ? ow : blue, ink = inverse ? blue : ow;
  const act = inverse ? (press ? 'var(--stone-200)' : hover ? 'var(--stone-100)' : ow) : (press ? 'var(--lake-800)' : hover ? 'var(--lake-700)' : blue);
  let bg, fg, border;
  if (variant === 'primary') { bg = act; fg = ink; border = '1px solid ' + act; }
  else { const on = hover || press; bg = on ? (press ? (inverse ? 'var(--stone-200)' : 'var(--lake-700)') : base) : 'transparent'; fg = on ? ink : base; border = '1px solid ' + base; }
  const th = lang === 'th';
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ height: s.h, padding: '0 ' + s.px + 'px', border, borderRadius: 2, background: bg, color: fg,
        font: th ? '400 14px/1 var(--font-text-thai)' : '500 ' + s.fs + 'px/1 var(--font-text-latin)', letterSpacing: th ? 0 : '.2em',
        textTransform: th ? 'none' : 'uppercase', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        width: full ? '100%' : undefined, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.38 : 1,
        transition: 'background var(--motion-base) var(--motion-ease), color var(--motion-base) var(--motion-ease)', ...style }}>
      {icon ? <Icon name={icon} size={18} /> : null}{children}
    </button>
  );
}
