const KS = window.KINByTheLakeDesignSystem_006565;
const A_LOGO = '../../assets/logo/', A_PH = '../../assets/photos/';
const kinEyebrow = { font: '500 11px/1.4 var(--font-text-latin)', letterSpacing: '.28em', textTransform: 'uppercase' };
const kinH2 = { margin: 0, font: '400 clamp(28px,3.4vw,40px)/1.15 var(--font-display)', letterSpacing: '.05em' };
const kinBody = { margin: 0, font: '300 16px/1.7 var(--font-body)' };
function Section({ children, bg, color, style }) {
  return <section style={{ background: bg, color, padding: 'clamp(64px,8vw,112px) clamp(20px,5vw,56px)', ...style }}><div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div></section>;
}
function Footer({ onNavigate }) {
  const { Logo, Icon } = KS;
  const col = { display: 'flex', flexDirection: 'column', gap: 10, font: '300 14px/1.6 var(--font-body)' };
  return (
    <footer style={{ background: 'var(--lake-600)', color: 'var(--stone-50)', padding: '72px clamp(20px,5vw,56px) 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40 }}>
        <Logo variant="reversed" width={150} assetBase={A_LOGO} />
        <div style={col}><span style={{ ...kinEyebrow, fontSize: 10, color: 'var(--brass-300)' }}>Visit</span><span>[Lake address], Phuket</span><span>Open daily 11:30–23:00</span></div>
        <div style={col}><span style={{ ...kinEyebrow, fontSize: 10, color: 'var(--brass-300)' }}>Talk to us</span><span>Tel 076 523 126</span><span>WhatsApp 089 728 3336</span><span>LINE kinbythelake</span></div>
        <div style={{ ...col, flexDirection: 'row', gap: 18, alignItems: 'flex-start' }}>{['good-food', 'good-people', 'good-moments'].map((n) => <Icon key={n} name={n} size={32} color="var(--kin-brass)" />)}</div>
      </div>
      <div style={{ maxWidth: 1200, margin: '56px auto 0', paddingTop: 24, borderTop: '1px solid rgba(243,239,230,.18)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, ...kinEyebrow, fontSize: 10 }}>
        <span>Eat well. Laugh often. Stay close.</span><span>© KIN by the Lake</span>
      </div>
    </footer>
  );
}
Object.assign(window, { KS, A_LOGO, A_PH, kinEyebrow, kinH2, kinBody, Section, Footer });
