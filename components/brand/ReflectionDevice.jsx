import React from 'react';
const FILES = { 'lake-blue': 'reflection-lake-blue.png', 'off-white': 'reflection-off-white.png', brass: 'reflection-brass.png' };
/** The five reflection strokes extracted from the logo — the only water in the system. One per layout, never with the full logo. */
export function ReflectionDevice({ color = 'lake-blue', width = 120, reveal = false, assetBase = 'assets/logo/', style }) {
  const [shown, setShown] = React.useState(!reveal);
  React.useEffect(() => { if (reveal) { const t = setTimeout(() => setShown(true), 60); return () => clearTimeout(t); } }, [reveal]);
  return <img src={assetBase + (FILES[color] || FILES['lake-blue'])} alt="" aria-hidden="true"
    style={{ width: Math.max(48, width), height: 'auto', display: 'block', clipPath: shown ? 'inset(0 0 0 0)' : 'inset(0 50% 0 50%)', transition: 'clip-path var(--motion-slow) var(--motion-ease)', ...style }} />;
}
