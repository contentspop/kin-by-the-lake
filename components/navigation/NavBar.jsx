import React from 'react';
import { Logo } from '../brand/Logo.jsx';
import { Button } from '../core/Button.jsx';
/** Site nav. Five links max, Reserve always last and filled. inverse = over hero photography / night. */
export function NavBar({ links = ['Menu', 'Story', 'Pavilion', 'Events', 'Visit'], active, onNavigate, onReserve, inverse = false, lang, onLangChange, assetBase = 'assets/logo/', compact = false, style }) {
  const ink = inverse ? 'var(--stone-50)' : 'var(--lake-600)';
  return (
    <nav style={{ height: compact ? 56 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: compact ? '0 20px' : '0 clamp(20px,4vw,56px)',
      background: inverse ? 'transparent' : 'var(--stone-50)', borderBottom: inverse ? '1px solid rgba(243,239,230,.18)' : '1px solid var(--stone-300)', color: ink, boxSizing: 'border-box', ...style }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} style={{ display: 'block' }}>
        <Logo variant={inverse ? 'reversed' : 'primary'} width={compact ? 94 : 112} assetBase={assetBase} /></a>
      {compact ? null : <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        {links.slice(0, 5).map((l) => { const on = active === l.toLowerCase();
          return <a key={l} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(l.toLowerCase()); }}
            style={{ font: '500 10px/1 var(--font-text-latin)', letterSpacing: '.2em', textTransform: 'uppercase', color: ink, textDecoration: 'none', paddingBottom: 6, borderBottom: on ? '1px solid var(--kin-brass)' : '1px solid transparent' }}>{l}</a>; })}
      </div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {lang && !compact ? <button type="button" onClick={() => onLangChange && onLangChange(lang === 'en' ? 'th' : 'en')} style={{ background: 'none', border: 0, color: ink, cursor: 'pointer', font: '500 10px var(--font-text-latin)', letterSpacing: '.2em' }}>
          <span style={{ opacity: lang === 'en' ? 1 : 0.55 }}>EN</span> · <span style={{ font: '400 12px var(--font-text-thai)', letterSpacing: 0, opacity: lang === 'th' ? 1 : 0.55 }}>ไทย</span></button> : null}
        <Button size="sm" inverse={inverse} onClick={onReserve} style={{ height: 38, fontSize: 10 }}>Reserve</Button>
      </div>
    </nav>
  );
}
