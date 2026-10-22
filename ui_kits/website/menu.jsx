const KIN_MENU = {
  phuket: { title: 'Phuket & Peranakan', th: 'ครัวภูเก็ต · เปอรานากัน', photos: ['ref-06-mezze-sharing.jpg', 'ref-10-passing-plate-lanterns.jpg', 'ref-09-passing-plate-golden.jpg'], items: [
    { name: 'Moo Hong', nameTh: 'หมูฮ้อง', price: 420, description: 'Braised pork belly, black pepper, garlic, star anise.', descriptionTh: 'หมูสามชั้นตุ๋นพริกไทยดำ กระเทียม โป๊ยกั๊ก สูตรภูเก็ต', allergens: ['G'], share: '2–4' },
    { name: 'Gaeng Poo', nameTh: 'แกงปูใบชะพลู', price: 690, description: 'Phuket crab curry, betel leaf, khanom jeen.', descriptionTh: 'แกงปูใบชะพลู เสิร์ฟกับขนมจีน', spice: 2, allergens: ['S'] },
    { name: 'Mee Hokkien', nameTh: 'หมี่ฮกเกี้ยน', price: 360, description: 'Wok-fried yellow noodles, prawn, squid, egg.', descriptionTh: 'หมี่เหลืองผัด กุ้ง ปลาหมึก ไข่', allergens: ['G', 'S'] },
  ] },
  italia: { title: 'Italia', th: 'ครัวอิตาเลียน', photos: ['ref-07-pizza-sharing.jpg', 'ref-04-table-sunset.jpg', 'ref-01-wine-pour.jpg'], items: [
    { name: 'Burrata e Pomodori', price: 520, description: 'Burrata, heirloom tomatoes, basil, olive oil.', descriptionTh: 'ชีสบูราต้า มะเขือเทศ โหระพาอิตาเลียน', allergens: ['D', 'V'] },
    { name: 'Tagliolini al Limone', price: 560, description: 'Fresh egg pasta, lemon, butter, parmigiano.', descriptionTh: 'เส้นพาสต้าสด เลมอน เนย พาร์มิจาโน', allergens: ['G', 'D'] },
    { name: 'Branzino al Sale', price: '1,450', description: 'Whole salt-baked sea bass, carved at the table.', descriptionTh: 'ปลากะพงอบเกลือทั้งตัว แล่ที่โต๊ะ', share: '3–5' },
  ] },
  drinks: { title: 'Drinks', th: 'เครื่องดื่ม', photos: ['ref-02-cocktail-mint.jpg', 'ref-08-bar-warm-light.jpg', 'ref-01-wine-pour.jpg'], items: [
    { name: 'Aperitivo', price: 320, description: 'House spritz, Thai-botanical bitter, soda.' },
    { name: 'Nebbiolo', price: '480 / 2,400', description: 'Langhe, Piedmont · glass / bottle.' },
    { name: 'Cha Yen Zero', price: 180, description: 'Smoked Thai tea, oat milk, palm sugar. Zero-proof.' },
  ] },
};
function MenuScreen({ go }) {
  const { SegmentedControl, MenuItem, ReflectionDevice, Button } = KS;
  const [tab, setTab] = React.useState('phuket');
  const k = KIN_MENU[tab];
  return (<>
    <Section>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <span style={kinEyebrow}>Menu · เมนู</span>
        <h1 style={{ ...kinH2, fontSize: 'clamp(36px,4.4vw,48px)' }}>A journey, never a mix</h1>
        <p style={{ ...kinBody, maxWidth: 520 }}>Start in Phuket, travel to Italy. Order a few, pass them round, then order a few more.</p>
        <SegmentedControl value={tab} onChange={setTab} options={[{ value: 'phuket', label: 'Phuket' }, { value: 'italia', label: 'Italia' }, { value: 'drinks', label: 'Drinks' }]} style={{ marginTop: 8 }} />
      </div>
      <div key={tab} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8, maxWidth: 960, margin: '48px auto 0' }}>
        {k.photos.map((f) => <RefPhoto key={f} file={f} ratio="3/4" />)}
      </div>
      <div style={{ maxWidth: 760, margin: '64px auto 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <h2 style={{ ...kinH2, fontSize: 28 }}>{k.title}</h2>
          <span style={{ font: '300 18px/1.4 var(--font-display-thai)' }}>{k.th}</span>
          <ReflectionDevice width={90} assetBase={A_LOGO} key={tab} reveal />
        </div>
        {k.items.map((it) => <MenuItem key={it.name} {...it} />)}
        <p style={{ margin: '28px 0 0', font: '400 12px/1.5 var(--font-text-latin)', letterSpacing: '.02em', textAlign: 'center', color: 'var(--lake-500)' }}>Prices in Thai baht, subject to 10% service charge and 7% VAT · Please tell us about allergies</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><Button onClick={() => go('reserve')}>Reserve</Button></div>
      </div>
    </Section>
    <RefPhoto file="ref-05-toast-long-table.jpg" ratio="21/9" />
  </>);
}
window.MenuScreen = MenuScreen;
