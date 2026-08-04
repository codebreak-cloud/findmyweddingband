const { Button, OptionCard, SongRow, Input, MatchBadge, LoadingBeat, HeartToggle } = window.BoujeeMusicMatchmakerDesignSystem_bdd5f9;
const { BANDS, EVENING_SONGS, DAYTIME_SONGS, scorePath } = window.QuizData;
const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakColor } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "groundColor": "#1A0033",
  "sweepDuration": 22,
  "bokehIntensity": 1
}/*EDITMODE-END*/;

const BOKEH = [
  { top: '8%', left: '12%', size: 70, color: 'var(--color-coral)', op: 0.22, blur: 18, anim: 'drift1', dur: '22s' },
  { top: '18%', left: '78%', size: 40, color: '#E8A04E', op: 0.18, blur: 14, anim: 'drift2', dur: '28s' },
  { top: '62%', left: '85%', size: 90, color: 'var(--color-coral)', op: 0.16, blur: 24, anim: 'drift3', dur: '26s' },
  { top: '75%', left: '8%', size: 55, color: '#fff', op: 0.14, blur: 16, anim: 'drift1', dur: '19s' },
  { top: '40%', left: '45%', size: 30, color: '#E8A04E', op: 0.2, blur: 10, anim: 'drift4', dur: '24s' },
  { top: '5%', left: '48%', size: 22, color: '#fff', op: 0.16, blur: 8, anim: 'drift2', dur: '21s' },
  { top: '85%', left: '55%', size: 60, color: 'var(--color-coral)', op: 0.2, blur: 20, anim: 'drift3', dur: '30s' },
  { top: '30%', left: '5%', size: 26, color: '#E8A04E', op: 0.24, blur: 10, anim: 'drift4', dur: '17s' },
  { top: '52%', left: '25%', size: 44, color: '#fff', op: 0.15, blur: 14, anim: 'drift1', dur: '25s' },
  { top: '15%', left: '30%', size: 34, color: 'var(--color-coral)', op: 0.18, blur: 12, anim: 'drift2', dur: '20s' },
  { top: '68%', left: '65%', size: 24, color: '#E8A04E', op: 0.22, blur: 8, anim: 'drift4', dur: '23s' },
  { top: '92%', left: '30%', size: 50, color: 'var(--color-coral)', op: 0.16, blur: 16, anim: 'drift3', dur: '27s' },
];

function QuizBackdrop({ groundColor, sweepDuration, bokehIntensity }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: groundColor, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes drift1{from{transform:translate(0,0) scale(1)}to{transform:translate(24px,-18px) scale(1.08)}}
        @keyframes drift2{from{transform:translate(0,0) scale(1)}to{transform:translate(-30px,20px) scale(0.94)}}
        @keyframes drift3{from{transform:translate(0,0) scale(1)}to{transform:translate(18px,26px) scale(1.05)}}
        @keyframes drift4{from{transform:translate(0,0) scale(1)}to{transform:translate(-20px,-24px) scale(1.1)}}
        @keyframes sweep-slow{0%{transform:translateX(-60%) rotate(12deg)}100%{transform:translateX(160%) rotate(12deg)}}
      `}</style>
      {BOKEH.map((b, i) => (
        <div key={i} style={{
          position: 'absolute', top: b.top, left: b.left, width: b.size, height: b.size, borderRadius: '50%',
          background: b.color, opacity: Math.min(1, b.op * bokehIntensity), filter: `blur(${b.blur}px)`,
          animation: `${b.anim} ${b.dur} ease-in-out infinite alternate`,
        }} />
      ))}
      <div style={{
        position: 'absolute', top: '-20%', left: 0, width: '55%', height: '160%',
        background: 'linear-gradient(90deg, transparent, rgba(239,176,161,0.09), transparent)',
        animation: `sweep-slow ${sweepDuration}s linear infinite`,
      }} />
    </div>
  );
}

function FestoonLights({ lit, total = 11, blaze = false }) {
  const w = 640, h = 40;
  const pts = Array.from({ length: total }, (_, i) => {
    const t = i / (total - 1);
    return { x: t * w, y: 10 + Math.sin(t * Math.PI) * 20 };
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  return (
    <div style={{ position: 'relative', zIndex: 1, animation: 'festoon-sway 7s ease-in-out infinite alternate', transformOrigin: '50% 0%' }}>
      <style>{`@keyframes festoon-sway{from{transform:rotate(-0.6deg)}to{transform:rotate(0.6deg)}}`}</style>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={44} preserveAspectRatio="none">
        <path d={path} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        {pts.map((p, i) => {
          const on = blaze || i < lit;
          return (
            <g key={i}>
              {on && <circle cx={p.x} cy={p.y} r={9} fill="var(--bulb-lit)" opacity={0.35} />}
              <circle cx={p.x} cy={p.y} r={4.5} fill={on ? 'var(--bulb-lit)' : 'var(--bulb-unlit)'} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Shell({ children, onBack, litCount, blaze, backdrop, hideChrome }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--color-paper)', fontFamily: 'var(--font-sans)' }}>
      <QuizBackdrop {...backdrop} />
      {!hideChrome && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FestoonLights lit={litCount} blaze={blaze} />
          <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: 640, margin: '0 auto', padding: '4px 24px 0', width: '100%', boxSizing: 'border-box' }}>
            {onBack ? <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--color-coral)' }}>Back</Button> : <span />}
          </div>
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Question({ n, title, children }) {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 24px 64px', animation: 'boujee-slide-in var(--dur-deliberate) var(--ease-settle)' }}>
      <style>{'@keyframes boujee-slide-in{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}'}</style>
      <div style={{ fontSize: 'var(--fs-meta)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', fontWeight: 'var(--fw-medium)', color: 'var(--color-coral)', marginBottom: 16 }}>{n < 10 ? '0' + n : n} / 11</div>
      <h2 style={{ fontSize: 'var(--fs-question)', color: 'var(--color-paper)', lineHeight: 'var(--lh-hero)', letterSpacing: 'var(--ls-tight)', fontWeight: 'var(--fw-black)', marginBottom: 32 }}>{title}</h2>
      {children}
    </div>
  );
}

function Q1({ onAnswer }) {
  const opts = [
    ['party', 'Live music that gets everyone up and dancing'],
    ['relaxed', 'Live music that sets a relaxed, feel-good atmosphere'],
    ['mix', 'A mix of the two'],
    ['undecided', 'Not sure yet, but we love the idea of live music'],
    ['dj', 'A DJ, no live music'],
  ];
  const [sel, setSel] = React.useState(null);
  return (
    <Question n={1} title="What are you picturing for your wedding entertainment?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([v, l]) => <OptionCard key={v} label={l} selected={sel === v} onClick={() => setSel(v)} />)}
      </div>
      <div style={{ marginTop: 28 }}><Button variant="onInk" size="lg" disabled={!sel} onClick={() => onAnswer(sel)}>Continue</Button></div>
    </Question>
  );
}

function DjExit({ onBackIn }) {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'var(--fs-h1)', color: 'var(--color-paper)', fontWeight: 'var(--fw-black)', marginBottom: 24 }}>We'll be honest with you.</h2>
      <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-paper)', opacity: 0.9, lineHeight: 'var(--lh-body)', fontWeight: 'var(--fw-regular)', marginBottom: 36 }}>
        Boujee is a live band agency through and through. Every act we work with is exclusive to us, and we don't offer DJs.
        If a DJ is what you're picturing for the whole day, we're probably not the right fit, and we'd rather tell you that now than waste your time.
        <br /><br />But if live music is even a small part of the dream, that's exactly what this is for.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
        <Button variant="onInk" size="lg" onClick={onBackIn}>Actually, show me what live band could suit us</Button>
        <Button variant="ghost" size="sm" style={{ color: 'var(--color-coral)' }}>No thanks, that's not for us</Button>
      </div>
    </div>
  );
}

function Q2({ onAnswer }) {
  const opts = [['daytime', 'Daytime — ceremony, drinks, wedding breakfast'], ['evening', 'Evening party'], ['all-day', 'All day']];
  const [sel, setSel] = React.useState(null);
  return (
    <Question n={2} title="Which part of your day are you dreaming of filling with live music?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([v, l]) => <OptionCard key={v} label={l} selected={sel === v} onClick={() => setSel(v)} />)}
      </div>
      <div style={{ marginTop: 28 }}><Button variant="onInk" size="lg" disabled={!sel} onClick={() => onAnswer(sel)}>Continue</Button></div>
    </Question>
  );
}

function Atmosphere({ n, path, onAnswer }) {
  const opts = path === 'daytime'
    ? [['RS', 'Start relaxed and let the energy build through the day'], ['RS', 'Full, fun energy from the off'], ['MH', 'Relaxed and elegant, a beautiful backdrop while everyone eats'], ['MH', 'Sophisticated and classy, effortlessly chic']]
    : [['UTSD', 'A party that builds gradually until everyone\u2019s dancing by the end'], ['UTSD', 'Full-on party energy from the very first song'], ['VS', 'A dancefloor that feels more like a gig, everyone singing every word'], ['VS', 'High energy but edgier — indie anthems that move the room']];
  const [sel, setSel] = React.useState(null);
  return (
    <Question n={n} title="What atmosphere are you picturing?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([band, l], i) => <OptionCard key={i} label={l} selected={sel === i} onClick={() => setSel(i)} />)}
      </div>
      <div style={{ marginTop: 28 }}><Button variant="onInk" size="lg" disabled={sel === null} onClick={() => onAnswer(opts[sel][0])}>Continue</Button></div>
    </Question>
  );
}

function SongPick({ n, path, onAnswer }) {
  const songs = path === 'daytime' ? DAYTIME_SONGS : EVENING_SONGS;
  const [picked, setPicked] = React.useState(new Set());
  const toggle = (t) => setPicked(s => { const n2 = new Set(s); n2.has(t) ? n2.delete(t) : n2.add(t); return n2; });
  return (
    <Question n={n} title="Which of these songs would you love to hear?">
      <p style={{ color: 'rgba(255,253,251,0.7)', fontSize: 'var(--fs-small)', marginTop: -16, marginBottom: 24 }}>Select all that appeal — this is building your setlist.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {songs.map(s => <SongRow key={s.title} title={s.title} artist={s.artist} selected={picked.has(s.title)} onClick={() => toggle(s.title)} />)}
      </div>
      <div style={{ background: 'var(--color-coral)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 24, boxShadow: 'var(--shadow-glow-coral)' }}>
        <div style={{ fontSize: 'var(--fs-meta)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', fontWeight: 'var(--fw-medium)', color: 'var(--color-ink)', marginBottom: 8 }}>Your setlist &middot; {picked.size} track{picked.size === 1 ? '' : 's'}</div>
        <div style={{ color: 'var(--color-ink)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-small)' }}>
          {picked.size ? Array.from(picked).join(' \u2022 ') : 'Tap a row to start building it'}
        </div>
      </div>
      <Button variant="onInk" size="lg" disabled={!picked.size} onClick={() => onAnswer(picked)}>Continue</Button>
    </Question>
  );
}

function TasteQuestion({ onAnswer }) {
  const opts = ['Pretty much identical, we love all the same stuff', 'Pretty close, just a few different favourites', 'Total opposites, but somehow it works', 'Still figuring out where we overlap!'];
  const [sel, setSel] = React.useState(null);
  const [partner, setPartner] = React.useState('');
  return (
    <Question n={7} title="You and your partner's music taste is...">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {opts.map((l, i) => <OptionCard key={i} label={l} selected={sel === i} onClick={() => setSel(i)} />)}
      </div>
      <Input label="Partner's name" placeholder="e.g. Alex" value={partner} onChange={e => setPartner(e.target.value)} />
      <div style={{ marginTop: 28 }}><Button variant="onInk" size="lg" disabled={sel === null || !partner} onClick={() => onAnswer(partner)}>Continue</Button></div>
    </Question>
  );
}

function Q8({ onAnswer }) {
  const opts = [['none', 'Date not booked yet'], ['soon', 'Within the next year'], ['mid', '1 to 2 years away'], ['early', 'Still very early days']];
  const [sel, setSel] = React.useState(null);
  return (
    <Question n={8} title="How far off is the big day?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([v, l]) => <OptionCard key={v} label={l} selected={sel === v} onClick={() => setSel(v)} />)}
      </div>
      <div style={{ marginTop: 28 }}><Button variant="onInk" size="lg" disabled={!sel} onClick={() => onAnswer(sel)}>Continue</Button></div>
    </Question>
  );
}

function Q9Q10({ onAnswer }) {
  const [booked, setBooked] = React.useState(null);
  const [venue, setVenue] = React.useState('');
  const [date, setDate] = React.useState('');
  return (
    <Question n={9} title="Have you booked your venue?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <OptionCard label="Yes" selected={booked === true} onClick={() => setBooked(true)} />
        <OptionCard label="Still looking" selected={booked === false} onClick={() => setBooked(false)} />
      </div>
      {booked === true && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
          <Input label="Venue name" value={venue} onChange={e => setVenue(e.target.value)} />
          <Input label="Wedding date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      )}
      <Button variant="onInk" size="lg" disabled={booked === null} onClick={() => onAnswer({ booked, venue, date })}>Continue</Button>
    </Question>
  );
}

function LeadCapture({ onSubmit }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  return (
    <Question n={11} title="Where should we send your result?">
      <p style={{ color: 'rgba(255,253,251,0.7)', fontSize: 'var(--fs-small)', marginTop: -16, marginBottom: 24 }}>Your match is calculated and ready right behind this.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 12 }}>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <p style={{ fontSize: 'var(--fs-meta)', color: 'rgba(255,253,251,0.6)', marginBottom: 20 }}>By continuing you agree we can contact you about your enquiry. See our privacy policy.</p>
      <Button variant="onInk" size="lg" disabled={!name || !email} onClick={() => onSubmit({ name, email, phone })}>Reveal my match</Button>
    </Question>
  );
}

function Loading({ onDone }) {
  React.useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, []);
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}><LoadingBeat label="Calculating your match…" /></div>;
}

function ResultBlock({ result, path }) {
  const band = BANDS[result.winner];
  const named = result.namedPicks;
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ textAlign: 'center', marginBottom: 40, '--color-ink': 'var(--color-coral)', '--border-hairline': 'rgba(255,255,255,0.25)' }}>
        <div style={{ fontSize: 'var(--fs-meta)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', fontWeight: 'var(--fw-medium)', color: 'var(--color-coral)', marginBottom: 12 }}>{path === 'daytime' ? 'Your daytime match' : 'Your evening match'}</div>
        <MatchBadge percent={result.pct} size={220} />
      </div>
      <h3 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-paper)', fontWeight: 'var(--fw-bold)', textAlign: 'center', marginBottom: 20 }}>You're a {result.pct}% match with a {band.style.split(',')[0]}</h3>
      <p style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)', color: 'var(--color-paper)', opacity: 0.9, textAlign: 'center', maxWidth: 560, margin: '0 auto 32px' }}>
        {named.length ? `You picked ${named.join(' and ')} as must-plays, and that's exactly the vibe you're picturing.` : 'That energy is exactly the vibe you\u2019re picturing.'}
      </p>
      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-float)', animation: 'boujee-reveal 600ms var(--ease-settle) both' }}>
        <style>{'@keyframes boujee-reveal{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}'}</style>
        <image-slot id={`band-photo-${result.winner}`} shape="rect" style={{ width: '100%', height: 320, display: 'block' }} placeholder={`Photo of ${band.name}`}></image-slot>
        <div style={{ background: 'var(--surface-cream)', padding: '20px 28px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--fs-meta)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', fontWeight: 'var(--fw-medium)', color: 'var(--text-muted)', marginBottom: 4 }}>The band that delivers this for us</div>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'var(--fs-script-reveal)', color: 'var(--color-ink)', lineHeight: 0.9 }}>{band.name}</div>
          <p style={{ color: 'var(--text-body)', marginTop: 4 }}>{band.style}</p>
        </div>
      </div>
    </div>
  );
}

function Results({ results, backdrop }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--color-paper)' }}>
      <QuizBackdrop {...backdrop} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <FestoonLights lit={11} blaze />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 96px' }}>
          {results.map((r, i) => <ResultBlock key={i} result={r.result} path={r.path} />)}
          <div style={{ background: 'var(--color-coral)', borderRadius: 'var(--radius-lg)', padding: 32, marginBottom: 32 }}>
            <h3 style={{ color: 'var(--color-ink)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', marginBottom: 16 }}>These bands are exclusive to Boujee.</h3>
            <p style={{ color: 'var(--color-ink)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)' }}>No dead air between sets. A playlist built to keep the momentum of your day going. We liaise directly with your venue on logistics and timings — it's the whole day handled, not just a band that turns up.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--color-paper)', opacity: 0.9, marginBottom: 24, fontSize: 'var(--fs-body-lg)' }}>Based on your answers, the best next step is a quick 15-minute call — you talk me through your day, I'll walk you through the band and tailor everything to your venue and guests.</p>
            <div style={{ border: '2px dashed rgba(255,253,251,0.25)', borderRadius: 'var(--radius-md)', padding: 40, marginBottom: 20, color: 'rgba(255,253,251,0.6)', fontSize: 'var(--fs-small)' }}>Booking scheduler embed (Acuity)</div>
            <Button variant="onInk" size="lg">Book your call</Button>
            <p style={{ fontSize: 'var(--fs-meta)', color: 'rgba(255,253,251,0.6)', marginTop: 18 }}>The Boujee team will check availability for your date and be in touch very shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizApp({ backdrop }) {
  const [step, setStep] = React.useState('q1');
  const [path, setPath] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [litCount, setLitCount] = React.useState(0);
  const [atmoBand, setAtmoBand] = React.useState(null);

  function advance(nextStep, lit) {
    setStep(nextStep);
    setLitCount(lit);
  }

  function handleQ1(v) { if (v === 'dj') setStep('djExit'); else advance('q2', 1); }
  function handleQ2(v) { setPath(v); advance(v === 'evening' ? 'q5' : 'q3', 2); }
  function afterDaytime(result) {
    setResults(r => [...r, { path: 'daytime', result }]);
    if (path === 'all-day') advance('q5', 4); else advance('q7', 6);
  }
  function afterEvening(result) { setResults(r => [...r, { path: 'evening', result }]); advance('q7', 6); }

  return (
    <>
      {step === 'q1' && <Shell litCount={0} backdrop={backdrop}><Q1 onAnswer={handleQ1} /></Shell>}
      {step === 'djExit' && <Shell hideChrome backdrop={backdrop}><DjExit onBackIn={() => advance('q1', 0)} /></Shell>}
      {step === 'q2' && <Shell litCount={1} backdrop={backdrop} onBack={() => advance('q1', 0)}><Q2 onAnswer={handleQ2} /></Shell>}
      {step === 'q3' && <Shell litCount={2} backdrop={backdrop}><Atmosphere n={3} path="daytime" onAnswer={(b) => { setAtmoBand(b); advance('q4', 3); }} /></Shell>}
      {step === 'q4' && <Shell litCount={3} backdrop={backdrop}><SongPick n={4} path="daytime" onAnswer={(picks) => afterDaytime(scorePath(picks, DAYTIME_SONGS, atmoBand))} /></Shell>}
      {step === 'q5' && <Shell litCount={litCount} backdrop={backdrop}><Atmosphere n={5} path="evening" onAnswer={(b) => { setAtmoBand(b); advance('q6', litCount + 1); }} /></Shell>}
      {step === 'q6' && <Shell litCount={litCount} backdrop={backdrop}><SongPick n={6} path="evening" onAnswer={(picks) => afterEvening(scorePath(picks, EVENING_SONGS, atmoBand))} /></Shell>}
      {step === 'q7' && <Shell litCount={6} backdrop={backdrop}><TasteQuestion onAnswer={() => advance('q8', 7)} /></Shell>}
      {step === 'q8' && <Shell litCount={7} backdrop={backdrop}><Q8 onAnswer={(v) => advance(v === 'none' ? 'q11' : 'q9', 8)} /></Shell>}
      {step === 'q9' && <Shell litCount={8} backdrop={backdrop}><Q9Q10 onAnswer={() => advance('q11', 10)} /></Shell>}
      {step === 'q11' && <Shell litCount={10} backdrop={backdrop}><LeadCapture onSubmit={() => advance('loading', 11)} /></Shell>}
      {step === 'loading' && <Shell hideChrome backdrop={backdrop}><Loading onDone={() => setStep('results')} /></Shell>}
      {step === 'results' && <Results results={results} backdrop={backdrop} />}
    </>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const backdrop = { groundColor: t.groundColor, sweepDuration: t.sweepDuration, bokehIntensity: t.bokehIntensity };
  return (
    <>
      <QuizApp backdrop={backdrop} />
      <TweaksPanel>
        <TweakSection label="Backdrop" />
        <TweakColor label="Ground colour" value={t.groundColor} options={['#1A0033', '#26004D', '#150029', '#0D0018']} onChange={(v) => setTweak('groundColor', v)} />
        <TweakSlider label="Sweep duration" value={t.sweepDuration} min={12} max={40} step={1} unit="s" onChange={(v) => setTweak('sweepDuration', v)} />
        <TweakSlider label="Bokeh intensity" value={t.bokehIntensity} min={0.4} max={1.6} step={0.1} onChange={(v) => setTweak('bokehIntensity', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
