import React from 'react';
const ALLERGENS = { G: 'Gluten', N: 'Nuts', D: 'Dairy', S: 'Shellfish', V: 'Vegetarian', VG: 'Vegan' };
/** Dish line. Original name (Cinzel) → Thai-script name (Taviraj, Thai/Peranakan only) → EN → TH → markers → whole-baht price. */
export function MenuItem({ name, nameTh, description, descriptionTh, price, spice = 0, allergens = [], share, style }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4px 24px', color: 'var(--lake-600)', padding: '18px 0', borderBottom: '1px solid var(--stone-300)', ...style }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span style={{ font: '400 20px/1.3 var(--font-display-latin)', letterSpacing: '.08em' }}>{name}</span>
        {nameTh ? <span style={{ font: '300 20px/1.3 var(--font-display-thai)' }}>{nameTh}</span> : null}
      </div>
      <span style={{ font: '300 18px/1.3 var(--font-text-latin)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{price}</span>
      {description ? <span style={{ font: '300 14px/1.6 var(--font-text-latin)', gridColumn: 1 }}>{description}</span> : null}
      {descriptionTh ? <span style={{ font: '300 14px/1.7 var(--font-read-thai)', gridColumn: 1 }}>{descriptionTh}</span> : null}
      {spice || allergens.length || share ? <div style={{ gridColumn: 1, display: 'flex', gap: 10, alignItems: 'center', paddingTop: 4, font: '500 10px/1 var(--font-text-latin)', letterSpacing: '.18em' }}>
        {spice ? <span aria-label={'Spice ' + spice + ' of 3'} style={{ display: 'flex', gap: 3 }}>{Array.from({ length: spice }).map((_, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--kin-lantern-red)' }} />)}</span> : null}
        {allergens.map((a) => <span key={a} title={ALLERGENS[a]} style={{ minWidth: 20, height: 20, padding: '0 4px', border: '1px solid var(--lake-600)', borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 9, letterSpacing: '.04em', boxSizing: 'border-box' }}>{a}</span>)}
        {share ? <span>SHARE · {share}</span> : null}
      </div> : null}
    </div>
  );
}
