function ReserveScreen({ go }) {
  const { TextField, Select, Chip, Radio, Checkbox, Button, Dialog, ReflectionDevice, DataTable } = KS;
  const [daypart, setDaypart] = React.useState('Sunset 5:30');
  const [area, setArea] = React.useState('terrace');
  const [guests, setGuests] = React.useState('6 guests');
  const [phone, setPhone] = React.useState('');
  const [err, setErr] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [extras, setExtras] = React.useState({ chair: false, boat: false });
  const submit = () => { if (phone.replace(/\D/g, '').length < 9) { setErr('Please enter a full number.'); return; } setErr(''); setDone(true); };
  const areaName = { hall: 'Dining Hall', terrace: 'Lantern Terrace', pavilion: 'Pavilion' }[area];
  return (<>
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,6vw,96px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={kinEyebrow}>Reservations · จองโต๊ะ</span>
          <h1 style={{ ...kinH2, fontSize: 'clamp(34px,4vw,48px)' }}>Your table is waiting</h1>
          <p style={kinBody}>Long lunches, dinners that linger. Tell us when, and who is coming.</p>
          <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginTop: 8 }}><img src={A_PH + 'terrace-night.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <DataTable columns={[{ key: 's', label: 'Space' }, { key: 'a', label: 'Seated' }, { key: 'b', label: 'Standing' }]} rows={[{ s: 'Pavilion', a: 14, b: 20 }, { s: 'Lantern Terrace', a: 40, b: 70 }, { s: 'Dining Hall', a: 80, b: 120 }]} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
            <RefPhoto file="ref-04-table-sunset.jpg" ratio="1/1" />
            <RefPhoto file="ref-02-cocktail-mint.jpg" ratio="1/1" />
            <RefPhoto file="ref-11-service-silhouettes.jpg" ratio="1/1" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, background: 'var(--stone-0)', border: '1px solid var(--stone-300)', padding: 'clamp(20px,3vw,36px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <TextField label="Date" defaultValue="Saturday, 14 November" />
            <Select label="Guests" value={guests} onChange={setGuests} options={['2 guests', '4 guests', '6 guests', '8 guests', '10+ guests']} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['Lunch', 'Sunset 5:30', 'Dinner 7:30'].map((d) => <Chip key={d} selected={daypart === d} onClick={() => setDaypart(d)}>{d}</Chip>)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ font: '500 10px/1.4 var(--font-text-latin)', letterSpacing: '.22em' }}>SEATING</span>
            <Radio name="area" checked={area === 'hall'} onChange={() => setArea('hall')}>Dining hall</Radio>
            <Radio name="area" checked={area === 'terrace'} onChange={() => setArea('terrace')}>Lantern terrace</Radio>
            <Radio name="area" checked={area === 'pavilion'} onChange={() => setArea('pavilion')}>Pavilion (8–14 guests)</Radio>
            {area === 'pavilion' && parseInt(guests) < 8 ? <span style={{ font: '400 12px/1.5 var(--font-text-latin)', color: 'var(--color-text-error)' }}>The pavilion seats 8–14. Please choose another area.</span> : null}
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Checkbox checked={extras.chair} onChange={(v) => setExtras({ ...extras, chair: v })}>High chair</Checkbox>
            <Checkbox checked={extras.boat} onChange={(v) => setExtras({ ...extras, boat: v })}>Longtail boat arrival</Checkbox>
          </div>
          <TextField label="Name" placeholder="Your name" />
          <TextField label="Phone" placeholder="+66" value={phone} onChange={setPhone} error={err} />
          <TextField label="Occasion / notes" multiline placeholder="A birthday, a table near the water…" />
          <Button full icon="reserve" onClick={submit}>Reserve</Button>
        </div>
      </div>
    </Section>
    <Dialog open={done} onClose={() => setDone(false)}>
      <ReflectionDevice width={56} assetBase={A_LOGO} />
      <span style={{ font: '400 22px/1.25 var(--font-display)', letterSpacing: '.04em' }}>Your table is held</span>
      <span style={{ font: '300 14px/1.6 var(--font-body)' }}>Saturday 14 November · {daypart} · {guests}, {areaName}. We'll send a confirmation on LINE.</span>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 4 }}>
        <Button size="sm" variant="secondary">Add to calendar</Button><Button size="sm" onClick={() => { setDone(false); go('home'); }}>Done</Button>
      </div>
    </Dialog>
  </>);
}
window.ReserveScreen = ReserveScreen;
