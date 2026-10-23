import React from 'react';
const FILES = { primary: 'logo-primary.png', reversed: 'logo-reversed.png', brass: 'logo-brass.png', black: 'logo-black.png', grey: 'logo-grey.png' };
/** KIN lockup (master PNG artwork). variant 'icon' = reversed lockup in a Lake Blue circle. Never recolour or redraw. */
export function Logo({ variant = 'primary', width = 160, assetBase = 'assets/logo/', alt = 'KIN by the lake', style }) {
  if (variant === 'icon') {
    return <span role="img" aria-label={alt} style={{ width, height: width, borderRadius: '50%', background: 'var(--lake-600)', display: 'inline-grid', placeItems: 'center', flex: 'none', ...style }}>
      <img src={assetBase + FILES.reversed} alt="" style={{ width: '72%', display: 'block' }} /></span>;
  }
  return <img src={assetBase + (FILES[variant] || FILES.primary)} alt={alt} style={{ width, minWidth: 94, height: 'auto', display: 'block', ...style }} />;
}
