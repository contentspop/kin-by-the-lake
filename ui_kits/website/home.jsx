function HomeScreen({ go, lang }) {
  const { Button, TextLink, ReflectionDevice, Card, MenuItem, Tag } = KS;
  const th = lang === 'th';
  return (<>
    <div style={{ position: 'relative', minHeight: 640, height: '88vh', color: 'var(--stone-50)', marginTop: -72, overflow: 'hidden' }}>
      <img src={A_PH + 'pavilion-sunset.png'} alt="The bamboo pavilion on the lake at dusk" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(30,61,90,.55) 0%, rgba(30,61,90,0) 32%, rgba(30,61,90,0) 52%, rgba(30,61,90,.8) 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(48px,8vh,96px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center', padding: '0 20px' }}>
        <span style={kinEyebrow}>Lunch · Sunset · Dinner</span>
        <h1 style={{ margin: 0, font: th ? '300 clamp(40px,6vw,64px)/1.35 var(--font-display-thai)' : '400 clamp(40px,6vw,72px)/1.05 var(--font-display)', letterSpacing: th ? 0 : '.04em' }}>{th ? 'สองครัว หนึ่งโต๊ะ' : 'Two kitchens. One table.'}</h1>
        <span style={{ font: th ? '300 16px/1.4 var(--font-text-latin)' : '300 20px/1.4 var(--font-display-thai)', letterSpacing: th ? '.08em' : 0 }}>{th ? 'Two kitchens. One table.' : 'สองครัว หนึ่งโต๊ะ'}</span>
        <div style={{ display: 'flex', gap: 12, paddingTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}><Button inverse onClick={() => go('reserve')}>{th ? 'จองโต๊ะ' : 'Reserve'}</Button><Button inverse variant="secondary" onClick={() => go('menu')}>{th ? 'ดูเมนู' : 'View menu'}</Button></div>
      </div>
    </div>
    <Section>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
        <span style={kinEyebrow}>Kin · กิน</span>
        <h2 style={kinH2}>Eat as kin.</h2>
        <ReflectionDevice width={110} assetBase={A_LOGO} reveal />
        <p style={kinBody}>In Thai, kin means to eat. In English, it means family. We cook from two kitchens — Phuket-Peranakan and Italian — each with its own character, and bring them to the same round table.</p>
        <p style={{ ...kinBody, font: '300 16px/1.75 var(--font-read-thai)' }}>อาหารสองครัว ภูเก็ต-เปอรานากันและอิตาเลียน เสิร์ฟบนโต๊ะกลมเดียวกัน</p>
      </div>
    </Section>
    <Section bg="var(--stone-100)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><Tag variant="editorial">Signature</Tag></div>
          <MenuItem name="Mee Hokkien" nameTh="หมี่ฮกเกี้ยน" price={360} description="Wok-fried yellow noodles, prawn, squid, egg." allergens={['G', 'S']} />
          <MenuItem name="Gaeng Poo" nameTh="แกงปูใบชะพลู" price={690} description="Phuket crab curry, betel leaf, khanom jeen." spice={2} allergens={['S']} />
          <MenuItem name="Tagliolini al Limone" price={560} description="Fresh egg pasta, lemon, butter, parmigiano." allergens={['G', 'D']} style={{ borderBottom: 0 }} />
          <div style={{ paddingTop: 20 }}><TextLink onClick={(e) => { e.preventDefault(); go('menu'); }}>See the full menu</TextLink></div>
        </div>
        <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}><img src={A_PH + 'dining-hall.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      </div>
    </Section>
    <Section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><span style={kinEyebrow}>At the lake</span><h2 style={kinH2}>Time well spent</h2></div>
        <TextLink onClick={(e) => { e.preventDefault(); go('events'); }}>All events</TextLink>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 24, alignItems: 'start' }}>
        <Card eyebrow="Every Sunday · 12–4 pm" title="The Long Lunch" body="Four courses from both kitchens, passed round the table." cta="Reserve" onCta={() => go('reserve')} image={A_PH + 'terrace-dusk.png'} />
        <Card eyebrow="Daily · from 5:30 pm" title="Aperitivo by the lake" body="Spritz, small plates and the light going gold over the water." cta="Reserve" onCta={() => go('reserve')} image={A_PH + 'lantern.png'} />
        <Card variant="story" title="Porcelain Stories" body="The blue-and-white that links Phuket to the Italian coast." cta="Our story" onCta={() => go('story')} image={A_PH + 'toile-chair.png'} />
      </div>
    </Section>
    <Section bg="var(--lake-800)" color="var(--stone-50)" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <span style={{ ...kinEyebrow, color: 'var(--brass-300)' }}>Tonight</span>
        <h2 style={kinH2}>Lanterns lit at 6:15.</h2>
        <p style={{ ...kinBody, maxWidth: 460 }}>Pavilion tables from 8 guests. Longtail arrival from the pier on request.</p>
        <Button inverse onClick={() => go('reserve')}>Reserve a table</Button>
      </div>
    </Section>
  </>);
}
window.HomeScreen = HomeScreen;
