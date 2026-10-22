function StoryScreen({ go }) {
  const { ReflectionDevice, TextLink } = KS;
  const arch = { aspectRatio: '3/4', overflow: 'hidden', borderRadius: '999px 999px 0 0' };
  return (<>
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,6vw,96px)', alignItems: 'center' }}>
        <div style={{ ...arch, maxWidth: 440, width: '100%', justifySelf: 'center' }}><img src={A_PH + 'toile-chair.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span style={kinEyebrow}>Our story</span>
          <h1 style={{ ...kinH2, fontSize: 'clamp(34px,4vw,48px)' }}>Porcelain links two shores</h1>
          <ReflectionDevice width={100} assetBase={A_LOGO} reveal />
          <p style={kinBody}>Peranakan porcelain and Italian maiolica speak the same blue. Both kitchens care about exceptional ingredients, expressive flavour and the pleasure of a long table.</p>
          <p style={kinBody}>So we keep them apart on the menu and together at the table. Moo Hong the way Phuket grandmothers make it. Tagliolini the way it is made in Amalfi. Both passed round.</p>
          <p style={{ ...kinBody, font: '300 16px/1.75 var(--font-read-thai)' }}>เครื่องลายครามเปอรานากันกับมายอลิกาอิตาเลียนพูดภาษาสีครามเดียวกัน</p>
        </div>
      </div>
    </Section>
    <Section bg="var(--stone-100)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,6vw,96px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span style={kinEyebrow}>The room</span>
          <h2 style={kinH2}>Slow down. Settle in.</h2>
          <p style={kinBody}>A dining space where timeless patterns meet the warmth of nature. Indigo botanical fabrics, rich wood grains, and softly glowing lanterns come together beneath a canopy of greenery. Gentle curves and tactile materials create a sense of understated elegance, inviting guests to slow down, settle in, and enjoy the moment.</p>
          <p style={{ ...kinBody, font: '300 16px/1.75 var(--font-read-thai)' }}>พื้นที่รับประทานอาหารที่ผสานเสน่ห์ของลวดลายเหนือกาลเวลาเข้ากับความอบอุ่นของธรรมชาติ ผ้าลายพฤกษาสีคราม ลายไม้ และแสงตะเกียงนุ่มนวลอยู่ร่วมกันภายใต้ร่มเงาของต้นไม้ เส้นสายโค้งมนและผิวสัมผัสของวัสดุสร้างความหรูหราอย่างเรียบง่าย เชื้อเชิญให้ผู้มาเยือนค่อย ๆ ผ่อนคลาย และดื่มด่ำกับช่วงเวลาตรงหน้า</p>
        </div>
        <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}><img src={A_PH + 'dining-hall.png'} alt="The dining hall: indigo toile chairs, rattan pendants, lantern light" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
    </Section>
    <Section bg="var(--lake-600)" color="var(--stone-50)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 40 }}>
        {[['The lake', 'Arrive by the stepping-stone path or by longtail from the pier.', 'garden-path'], ['The pavilion', 'A round bamboo room on the water, lit by red-tasselled lanterns.', 'pavilion-sunset'], ['The table', 'An oil lantern on every table, lazy Susans in the middle.', 'lantern']].map(([t, b, p]) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}><img src={A_PH + p + '.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <span style={{ font: '400 22px/1.25 var(--font-display)', letterSpacing: '.04em' }}>{t}</span>
            <p style={{ ...kinBody, fontSize: 14 }}>{b}</p>
          </div>))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 56 }}><TextLink inverse onClick={(e) => { e.preventDefault(); go('reserve'); }}>Come and stay a while</TextLink></div>
    </Section>
  </>);
}
window.StoryScreen = StoryScreen;
