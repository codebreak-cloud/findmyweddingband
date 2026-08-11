const { Button, OptionCard, SongRow, Input, ProgressRing, LoadingBeat, HeartToggle } = window.BoujeeMusicMatchmakerDesignSystem_bdd5f9;
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
          const delay = blaze ? 0 : Math.max(0, (i - lit + 0.5) * 80);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={9} style={{ fill: 'var(--bulb-lit)', opacity: on ? 0.4 : 0, transition: `opacity 1200ms ease-out ${delay}ms` }} />
              <circle cx={p.x} cy={p.y} r={4.5} style={{ fill: on ? 'var(--bulb-lit)' : 'var(--bulb-unlit)', transition: `fill 1200ms ease-out ${delay}ms` }} />
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
          <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
              {onBack ? <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--color-coral)' }}>Back</Button> : <span />}
              <Button variant="ghost" size="sm" onClick={() => { window.location.href = '/'; }} style={{ color: 'var(--color-coral)' }}>Exit</Button>
            </div>
          </div>
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function useAutoAdvance(onAnswer, delay = 380) {
  const [sel, setSel] = React.useState(null);
  React.useEffect(() => {
    if (sel === null) return;
    const t = setTimeout(() => onAnswer(sel), delay);
    return () => clearTimeout(t);
  }, [sel]);
  return [sel, (v) => { if (sel === null) setSel(v); }];
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
  const [sel, choose] = useAutoAdvance(onAnswer);
  return (
    <Question n={1} title="What are you picturing for your wedding entertainment?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([v, l]) => <OptionCard key={v} label={l} selected={sel === v} onClick={() => choose(v)} />)}
      </div>
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
        <Button variant="ghost" size="sm" style={{ color: 'var(--color-coral)' }} onClick={() => { window.location.href = '../landing/index.html'; }}>No thanks, that's not for us</Button>
      </div>
    </div>
  );
}

function Q2({ onAnswer }) {
  const opts = [['evening', 'Evening party'], ['daytime', 'Daytime - ceremony, drinks, wedding breakfast'], ['all-day', 'All day - from ceremony through to the late night']];
  const [sel, choose] = useAutoAdvance(onAnswer);
  return (
    <Question n={2} title="Which part of your day are you dreaming of filling with live music?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([v, l]) => <OptionCard key={v} label={l} selected={sel === v} onClick={() => choose(v)} />)}
      </div>
    </Question>
  );
}

function Atmosphere({ n, path, onAnswer, allDayRoute }) {
  const opts = path === 'daytime'
    ? [['RS', 'Start relaxed and let the energy build through the day'], ['RS', 'Fun and lively from the start'], ['MH', 'Relaxed and elegant'], ['MH', 'Sophisticated and classy']]
    : [['UTSD', 'A party that builds gradually until everyone\u2019s dancing by the end'], ['UTSD', 'Full-on party energy from the very first song'], ['VS', 'A dancefloor that feels more like a gig, everyone singing every word'], ['VS', 'High energy with a bit more edge and attitude']];
  const [sel, choose] = useAutoAdvance((i) => onAnswer(opts[i][0]));
  const title = allDayRoute
    ? (path === 'daytime' ? 'What atmosphere are you picturing for the daytime?' : 'What atmosphere are you picturing for your evening party?')
    : 'What atmosphere are you picturing?';
  return (
    <Question n={n} title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([band, l], i) => <OptionCard key={i} label={l} selected={sel === i} onClick={() => choose(i)} />)}
      </div>
    </Question>
  );
}

function SongPick({ n, path, onAnswer }) {
  const songs = path === 'daytime' ? DAYTIME_SONGS : EVENING_SONGS;
  const [picked, setPicked] = React.useState(new Set());
  const toggle = (t) => setPicked(s => { const n2 = new Set(s); n2.has(t) ? n2.delete(t) : n2.add(t); return n2; });
  const title = path === 'daytime' ? 'What songs set the mood for your daytime?' : 'Which of these songs would you love to hear at your evening party?';
  return (
    <Question n={n} title={title}>
      <p style={{ color: 'rgba(255,253,251,0.7)', fontSize: 'var(--fs-small)', marginTop: -16, marginBottom: 24 }}>Select your favorite songs to create your dream set list</p>
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
  const [partnerName, setPartnerName] = React.useState('');

  const handleContinue = () => {
    if (sel !== null && partnerName.trim()) {
      onAnswer({ tasteSelection: sel, partnerName: partnerName.trim() });
    }
  };

  const isComplete = sel !== null && partnerName.trim();

  return (
    <Question n={7} title="You and your partner's music taste is...">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {opts.map((l, i) => <OptionCard key={i} label={l} selected={sel === i} onClick={() => setSel(i)} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <Input label="Partner's name" placeholder="e.g. Alex" value={partnerName} onChange={e => setPartnerName(e.target.value)} />
      </div>
      <Button disabled={!isComplete} onClick={handleContinue}>Continue</Button>
    </Question>
  );
}

function Q8({ onAnswer }) {
  const opts = [['none', 'Date not booked yet'], ['soon', 'Within the next year'], ['mid', '1 to 2 years away'], ['early', 'Still very early days']];
  const [sel, choose] = useAutoAdvance(onAnswer);
  return (
    <Question n={8} title="How far off is the wedding?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map(([v, l]) => <OptionCard key={v} label={l} selected={sel === v} onClick={() => choose(v)} />)}
      </div>
    </Question>
  );
}

function Q9Q10({ onAnswer }) {
  const [booked, setBooked] = React.useState(null);
  const [venue, setVenue] = React.useState('');
  const [date, setDate] = React.useState('');
  return (
    <Question n={9} title="Have you booked your venue?">
      <style>{`
        [data-q9-section] label,
        [data-q9-section] .label,
        [data-q9-section] div,
        [data-q9-section] span {
          color: #FFFDFB !important;
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <OptionCard label="Yes" selected={booked === true} onClick={() => setBooked(true)} />
        <OptionCard label="Still looking" selected={booked === false} onClick={() => setBooked(false)} />
      </div>
      {booked === true && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }} data-q9-section>
          <Input label="Venue name" placeholder="e.g. The Grand Hotel" value={venue} onChange={e => setVenue(e.target.value)} />
          <Input label="Wedding date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      )}
      <Button variant="onInk" size="lg" disabled={booked === null} onClick={() => onAnswer({ booked, venue, date })}>Continue</Button>
    </Question>
  );
}

function LeadCapture({ onSubmit, results, path, venue, weddingDate, partnerName, partnerTaste }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const tags = ['Quiz Lead'];
      let notes = `Quiz Path: ${path === 'all-day' ? 'All Day' : 'Evening Only'}\n\n`;

      results.forEach(r => {
        const bandName = BANDS[r.result.winner].name;
        tags.push(`${bandName} Result`);
        notes += `${r.path.charAt(0).toUpperCase() + r.path.slice(1)} Match:\n`;
        notes += `- Band: ${bandName}\n`;
        notes += `- Match: ${r.result.pct}%\n`;
        notes += `- Songs: ${r.result.namedPicks.join(', ')}\n\n`;
      });

      const payload = {
        name,
        email,
        phone,
        partnerName,
        partnerTaste,
        venue,
        weddingDate,
        path,
        results,
        tags,
        notes,
        submittedAt: new Date().toISOString()
      };

      // Send to main webhook
      await fetch('https://ai.codebreak.co.uk/api/webhook/b17b4115-3ad7-45c4-be24-4efc8fc9df77/ed6e19b9-2fe3-4a8a-abcb-9f4fd0211eef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Build MailerLite payload with individual fields
      const dayResult = results.find(r => r.path === 'daytime');
      const evenResult = results.find(r => r.path === 'evening');

      const mailerlitePayload = {
        name,
        email,
        phone,
        partnerName,
        partnerTaste,
        venue,
        weddingDate,
        tags,
        'Part Of Day': path === 'all-day' ? 'All Day' : (path === 'daytime' ? 'Daytime' : 'Evening'),
        'Daytime Act': dayResult ? BANDS[dayResult.result.winner].name : '',
        'Daytime Match Percentage': dayResult ? dayResult.result.pct : '',
        'Evening Act': evenResult ? BANDS[evenResult.result.winner].name : '',
        'Evening Match Percentage': evenResult ? evenResult.result.pct : '',
        submittedAt: new Date().toISOString()
      };

      // Send to MailerLite Zapier webhook (no CORS issues with no-cors mode)
      fetch('https://hooks.zapier.com/hooks/catch/20476458/46innpm/', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(mailerlitePayload)
      }).catch(err => console.error('Zapier webhook error:', err));
    } catch (err) {
      console.error('Webhook error:', err);
    } finally {
      setIsSubmitting(false);
      onSubmit({ name, email, phone });
    }
  };

  return (
    <Question n={11} title="Where should we send your result?">
      <style>{`
        [data-q11-section] label,
        [data-q11-section] .label,
        [data-q11-section] div,
        [data-q11-section] span {
          color: #FFFDFB !important;
        }
      `}</style>
      <p style={{ color: 'rgba(255,253,251,0.7)', fontSize: 'var(--fs-small)', marginTop: -16, marginBottom: 24 }}>Your match is calculated and ready right behind this.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 12 }} data-q11-section>
        <Input label="Name" placeholder="e.g. Sarah" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Email" type="email" placeholder="e.g. sarah@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Phone" type="tel" placeholder="e.g. +44 20 7946 0958" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <p style={{ fontSize: 'var(--fs-meta)', color: 'rgba(255,253,251,0.6)', marginBottom: 20 }}>By submitting your details, you're giving us permission to contact you about your match. See our <a href="https://boujeemusic.com/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-coral)', textDecoration: 'none', borderBottom: '1px solid var(--color-coral)' }}>privacy policy</a> for more.</p>
      <Button variant="onInk" size="lg" disabled={!name || !isValidEmail(email) || isSubmitting} onClick={handleSubmit}>{isSubmitting ? 'Submitting...' : 'Reveal my match'}</Button>
    </Question>
  );
}

function Loading({ onDone }) {
  React.useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', '--color-ink': 'var(--color-paper)', '--text-muted': 'var(--color-paper)' }}>
      <LoadingBeat label="Calculating your match…" />
    </div>
  );
}

function MatchBadge({ percent, size = 220 }) {
  const [displayPercent, setDisplayPercent] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          if (prefersReducedMotion) {
            setDisplayPercent(percent);
          } else {
            const duration = 900;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = Math.round(easeOut * percent);
              setDisplayPercent(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [percent, hasAnimated]);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const strokeWidth = size / 46;
  const radius = size / 2 - strokeWidth * 1.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercent / 100) * circumference;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes match-halo-fade {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fleck-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Ambient halo — soft blurred radial glow, slightly larger than ring */}
      <div
        style={{
          position: 'absolute',
          width: size * 1.15,
          height: size * 1.15,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 176, 161, 0.2), transparent 70%)',
          filter: 'blur(16px)',
          animation: prefersReducedMotion ? 'none' : 'match-halo-fade 900ms ease-out forwards',
          pointerEvents: 'none',
        }}
      />

      {/* SVG Ring with gradient, track, and drop-shadow glow */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{
          position: 'absolute',
          transform: 'rotate(-90deg)',
          filter: 'drop-shadow(0 0 8px rgba(239, 176, 161, 0.3))',
        }}
      >
        <defs>
          {/* Gradient: coral to deep coral */}
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFB0A1" />
            <stop offset="100%" stopColor="#D97760" />
          </linearGradient>
        </defs>

        {/* Track underneath — faint white/hairline tone */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 253, 251, 0.12)"
          strokeWidth={strokeWidth * 0.6}
        />

        {/* Main ring with gradient, animated fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={prefersReducedMotion ? circumference - (percent / 100) * circumference : strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: prefersReducedMotion ? 'none' : `stroke-dashoffset 900ms ease-out`,
          }}
        />
      </svg>

      {/* Rotating bright fleck — travels along the ring, contained to its edge */}
      {!prefersReducedMotion && (
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            animation: 'fleck-rotate 4.5s linear infinite',
          }}
        >
          <defs>
            {/* Gradient that creates a bright fleck along the ring path */}
            <linearGradient id="fleck-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 253, 251, 0)" />
              <stop offset="40%" stopColor="rgba(255, 253, 251, 0.6)" />
              <stop offset="50%" stopColor="rgba(255, 253, 251, 0.8)" />
              <stop offset="60%" stopColor="rgba(255, 253, 251, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 253, 251, 0)" />
            </linearGradient>
          </defs>

          {/* Bright fleck as a small arc on the ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#fleck-gradient)"
            strokeWidth={strokeWidth * 1.3}
            strokeDasharray={circumference * 0.08}
            strokeDashoffset={0}
            opacity="0.9"
            style={{
              mixBlendMode: 'screen',
            }}
          />
        </svg>
      )}

      {/* Backing disc with violet-ink gradient for text legibility */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.52,
          height: size * 0.52,
          borderRadius: '50%',
          background: `radial-gradient(circle, var(--color-ink) 0%, rgba(38, 0, 77, 0.95) 100%)`,
          zIndex: 0,
        }}
      />

      {/* Percentage number — Montserrat Black, centered */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-headline)',
          fontWeight: 900,
          fontSize: `${size * 0.24}px`,
          color: '#FFFDFB',
          textAlign: 'center',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(239, 176, 161, 0.35)',
        }}
      >
        <span>{displayPercent}</span>
        <span style={{ fontSize: '0.65em', marginLeft: '0.08em' }}>%</span>
      </div>
    </div>
  );
}

function ResultBlock({ result, path, isFirst, hideExclusivity, atmosphere, songPicks, scrollToCalendar }) {
  const band = BANDS[result.winner];
  const article = /^[aeiou]/i.test(band.genre) ? 'an' : 'a';
  const isDaytime = path === 'daytime';

  // Filter songs to only those that route to the winning band
  const songList = isDaytime ? DAYTIME_SONGS : EVENING_SONGS;
  const filteredPicks = songPicks ? Array.from(songPicks).filter(songTitle => {
    const song = songList.find(s => s.title === songTitle);
    return song && song.tag === result.winner;
  }) : [];
  const named = filteredPicks.slice(0, 3);
  const accentColor = isDaytime ? '#D4A76A' : '#C75468';
  const accentBg = isDaytime ? 'rgba(212, 167, 106, 0.12)' : 'rgba(199, 84, 104, 0.12)';

  return (
    <div style={{ marginBottom: 'var(--space-7)', marginTop: isFirst ? 'var(--space-4)' : 'var(--space-5)' }}>
      {/* Section divider and header */}
      <div style={{ borderTop: hideExclusivity ? `2px solid ${accentColor}` : 'none', paddingTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <div style={{ fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.5rem)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', fontWeight: 'var(--fw-bold)', color: accentColor, textAlign: 'center' }}>
          {isDaytime ? 'YOUR DAYTIME' : 'YOUR EVENING PARTY'}
        </div>
      </div>

      {/* Match Badge - centered and large */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 'var(--space-4)', paddingTop: 'var(--space-3)', paddingBottom: 'var(--space-3)' }}>
        <MatchBadge percent={result.pct} size={isFirst ? 220 : 190} />
      </div>

      {/* Match headline - percentage and genre */}
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-bold)',
        fontSize: 'clamp(1.25rem, 1.1rem + 0.8vw, 1.85rem)',
        color: 'var(--color-paper)',
        textAlign: 'center',
        marginBottom: 'var(--space-5)',
        lineHeight: 'var(--lh-snug)',
      }}>
        You're a {result.pct}% match with {article} {band.genre}.
      </h3>

      {/* Bridge line: causal link + exclusivity framing */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(1rem, 0.9rem + 0.6vw, 1.25rem)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--color-paper)',
        marginBottom: 'var(--space-4)',
        textAlign: 'center',
        lineHeight: 'var(--lh-snug)',
        margin: '0 0 var(--space-4) 0',
      }}>
        Based on that, Boujee's exclusive band for your {isDaytime ? 'daytime' : 'evening party'} is...
      </p>

      {/* STAGE 3: Band reveal card - static display, not a button */}
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5) var(--space-5)',
        marginBottom: 'var(--space-5)',
        animation: 'reveal-scale-fade 600ms var(--ease-settle) both',
        animationDelay: isFirst ? '300ms' : '100ms',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <style>{`
          @keyframes reveal-scale-fade {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* Band name in Amsterdam Signature */}
        <div style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.2rem, 1rem + 1.5vw, 1.8rem)',
          fontWeight: 'var(--fw-black)',
          color: '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 'var(--space-6)',
          whiteSpace: 'nowrap',
          textShadow: '0 0 30px rgba(239,176,161,0.6), 0 0 60px rgba(239,176,161,0.3)',
        }}>
          {band.name}
        </div>

        {/* Band one-line description */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--fs-body)',
          color: accentColor,
          textAlign: 'center',
          lineHeight: 'var(--lh-body)',
          margin: '0 0 var(--space-4) 0',
        }}>
          {band.style}.
        </p>

        {/* CTA line below tagline */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--fw-regular)',
          fontSize: 'var(--fs-body)',
          color: 'rgba(255,253,251,0.88)',
          textAlign: 'center',
          lineHeight: 'var(--lh-body)',
          margin: 0,
        }}>
          Watch the video, see how they work, and book a quick call.
        </p>
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Button variant="primary" size="lg" onClick={scrollToCalendar}>Book my call</Button>
        </div>
      </div>

      {/* STAGE 4: Video and soft intro copy */}
      <div style={{
        backgroundColor: 'var(--color-paper)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(38,0,77,0.08)',
        animation: 'reveal-scale-fade 600ms var(--ease-settle) both',
        animationDelay: isFirst ? '400ms' : '200ms',
        marginBottom: 'var(--space-5)',
        transition: 'transform 200ms var(--ease-standard), box-shadow 200ms var(--ease-standard)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(38,0,77,0.15), 0 0 24px rgba(239,176,161,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(38,0,77,0.08)';
      }}>
        {/* YouTube video - 16:9 aspect ratio, full width, rounded top */}
        {band.video && (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: 'var(--color-ink)',
          }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${band.video.split('/').pop()}`}
              title={`${band.name} Performance`}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 'var(--radius-lg)',
                borderTopRightRadius: 'var(--radius-lg)',
              }}
            />
          </div>
        )}
      </div>

      {/* STAGE 5: Personalized explanation */}
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-bold)',
        fontSize: 'clamp(1.25rem, 1.1rem + 0.8vw, 1.85rem)',
        color: 'var(--color-paper)',
        marginBottom: 'var(--space-5)',
        lineHeight: 'var(--lh-snug)',
        textAlign: 'center',
      }}>
        Why {band.name} for your {isDaytime ? 'daytime' : 'evening'}?
      </h3>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-regular)',
        fontSize: 'var(--fs-body)',
        color: 'rgba(255,253,251,0.88)',
        lineHeight: 'var(--lh-body)',
        marginBottom: 'var(--space-7)',
        textAlign: 'center',
      }}>
        {(() => {
          const songPart = named.length ? `You picked ${named.join(', ').replace(/, ([^,]+)$/, ' and $1')} as must-plays` : 'That matches what you want';
          let atmospherePhrase = '';
          let vibeEnding = '';

          if (atmosphere) {
            if (atmosphere === 'RS') {
              atmospherePhrase = 'your love of roaming, relaxed vibes';
              vibeEnding = isDaytime ? 'the flowing ease you\'re going for.' : 'the laid-back celebration you\'re imagining.';
            } else if (atmosphere === 'MH') {
              atmospherePhrase = 'your love of sophisticated elegance';
              vibeEnding = isDaytime ? 'the refined atmosphere you\'re going for.' : 'the sophisticated celebration you\'re imagining.';
            } else if (atmosphere === 'UTSD') {
              atmospherePhrase = 'your love of high-energy celebration';
              vibeEnding = isDaytime ? 'the building excitement you\'re going for.' : 'the full-on party you\'re envisioning.';
            } else if (atmosphere === 'VS') {
              atmospherePhrase = 'your love of edgy, live-gig vibes';
              vibeEnding = isDaytime ? 'the bold excitement you\'re going for.' : 'the electric atmosphere you\'re envisioning.';
            }
            return `${songPart}, and combined with ${atmospherePhrase}, it creates ${vibeEnding}`;
          } else {
            vibeEnding = isDaytime ? 'the refined, flowing vibe you\'re going for.' : 'the celebration you\'re envisioning.';
            return `${songPart}, and that matches ${vibeEnding}`;
          }
        })()}
      </p>

      {/* STAGE 6: Boujee exclusive sell - only show for single-band routes (hideExclusivity = false) */}
      {!hideExclusivity && (
      <div style={{
        backgroundColor: accentBg,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-7)',
        border: `2px solid ${accentColor}`,
        transition: 'transform 200ms var(--ease-standard), box-shadow 200ms var(--ease-standard)',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(38,0,77,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(38,0,77,0.15), 0 0 24px rgba(239,176,161,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(38,0,77,0.08)';
      }}>
        <h4 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--fw-bold)',
          fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.5rem)',
          color: accentColor,
          marginBottom: 'var(--space-5)',
          marginTop: 0,
          lineHeight: 'var(--lh-snug)',
          textAlign: 'center',
        }}>
          These bands are exclusive to Boujee - you won't find them anywhere else.
        </h4>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--fw-regular)',
          fontSize: 'var(--fs-body)',
          color: 'rgba(255,253,251,0.88)',
          lineHeight: 'var(--lh-body)',
          margin: 0,
          textAlign: 'center',
        }}>
          Boujee was built by Tim and Lizzie, professional musicians who got tired of how the industry worked and created their own acts from scratch: the best of both worlds between booking a band direct and going through a faceless agency. We handle the whole day, not just the set - liaising with your venue on timings and logistics, backed by award-winning planning support.
        </p>
      </div>
      )}
    </div>
  );
}

function ctaCopy(results) {
  if (results.length === 2) {
    const day = results.find(r => r.path === 'daytime');
    const eve = results.find(r => r.path === 'evening');
    return `Based on your answers, ${BANDS[day.result.winner].name} is a great fit for your daytime and ${BANDS[eve.result.winner].name} for your evening party. The best next step is a quick call - you can talk me through your plans, then I'll walk you through how both bands work together across your day.`;
  }
  const band = BANDS[results[0].result.winner];
  const slot = results[0].path === 'daytime' ? 'daytime' : 'evening party';
  return `Based on your answers, ${band.name} is a great fit for your ${slot}. The best next step is a quick call - you can talk me through your day and plans, then I'll walk you through the band, and tailor everything around your venue, vibe and guests.`;
}

function Results({ results, backdrop }) {
  const calendarRef = React.useRef(null);
  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--color-paper)' }}>
      <QuizBackdrop {...backdrop} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Festoon lights - all 11 bulbs lit, blazing - full width */}
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', padding: 'var(--space-6) var(--space-5) 0' }}>
          <FestoonLights lit={11} total={11} blaze={true} />
        </div>

        {/* Result blocks */}
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', padding: '0 var(--space-5) var(--space-9)' }}>
          {[...results].sort((a, b) => a.path === 'daytime' ? -1 : 1).map((r, i) => <ResultBlock key={i} result={r.result} path={r.path} isFirst={i === 0} hideExclusivity={results.length > 1} atmosphere={r.atmosphere} songPicks={r.songPicks} scrollToCalendar={scrollToCalendar} />)}

          {/* Shared exclusivity box for all-day routes */}
          {results.length > 1 && (
          <div style={{
            backgroundColor: 'rgba(212, 167, 106, 0.12)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-7)',
            marginTop: 'var(--space-7)',
            border: '2px solid #D4A76A',
            transition: 'transform 200ms var(--ease-standard), box-shadow 200ms var(--ease-standard)',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(38,0,77,0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(38,0,77,0.15), 0 0 24px rgba(239,176,161,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(38,0,77,0.08)';
          }}>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--fw-bold)',
              fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.5rem)',
              color: '#D4A76A',
              marginBottom: 'var(--space-5)',
              marginTop: 0,
              lineHeight: 'var(--lh-snug)',
              textAlign: 'center',
            }}>
              These bands are exclusive to Boujee, you won't find them anywhere else.
            </h4>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--fw-regular)',
              fontSize: 'var(--fs-body)',
              color: 'rgba(255,253,251,0.88)',
              lineHeight: 'var(--lh-body)',
              margin: 0,
              textAlign: 'center',
            }}>
              Boujee was built by Tim and Lizzie, professional musicians who got tired of how the industry worked and created their own acts from scratch: the best of both worlds between booking a band direct and going through a faceless agency. We handle your whole day, not just the sets, coordinating both bands, liaising with your venue on timings and logistics, backed by award-winning planning support.
            </p>
          </div>
          )}

          {/* Tim & Lizzie photo - under exclusive box */}
          <div style={{
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto var(--space-7)',
            textAlign: 'center',
          }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: 'var(--space-3)',
            }}>
              <img src="../../assets/images/Tim-Lizzie-relaxed.jpg" alt="Tim and Lizzie" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--fw-semibold)',
              fontSize: 'var(--fs-body)',
              color: 'rgba(255,253,251,0.88)',
              margin: 0,
            }}>
              Tim & Lizzie
            </p>
          </div>

          {/* STAGE 7: CTA section - "What happens next?" */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--fw-bold)',
              fontSize: 'clamp(1.25rem, 1.1rem + 0.8vw, 1.85rem)',
              color: 'var(--color-paper)',
              textAlign: 'center',
              marginBottom: 'var(--space-6)',
              lineHeight: 'var(--lh-snug)',
            }}>
              What happens next?
            </h2>

            {/* CTA supporting copy */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--fw-regular)',
              fontSize: 'var(--fs-body)',
              color: 'rgba(255,253,251,0.88)',
              lineHeight: 'var(--lh-body)',
              textAlign: 'center',
              marginBottom: 'var(--space-7)',
              maxWidth: '560px',
              margin: '0 auto var(--space-7)',
            }}>
              {ctaCopy(results)}
            </p>

            {/* Acuity scheduler embed */}
            <div ref={calendarRef} style={{
              background: 'var(--color-paper)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(38,0,77,0.08)',
              marginBottom: 'var(--space-6)',
            }}>
              <iframe src="https://boujee-music.as.me/wedding-band-discovery-call-qz" width="100%" height="800" frameBorder="0" allow="payment" style={{ display: 'block' }}></iframe>
            </div>
            <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>

            {/* Availability note */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--fw-regular)',
              fontSize: 'var(--fs-meta)',
              color: 'rgba(255,253,251,0.65)',
              textAlign: 'center',
              marginBottom: 0,
            }}>
              The Boujee team will check availability for your date and be in touch very shortly.
            </p>
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
  const [venue, setVenue] = React.useState('');
  const [weddingDate, setWeddingDate] = React.useState('');
  const [partnerName, setPartnerName] = React.useState('');
  const [partnerTaste, setPartnerTaste] = React.useState('');

  function advance(nextStep, lit) {
    setStep(nextStep);
    setLitCount(lit);
  }

  function handleQ1(v) { if (v === 'dj') setStep('djExit'); else advance('q2', 1); }
  function handleQ2(v) { setPath(v); advance(v === 'evening' ? 'q5' : 'q3', 2); }
  function afterDaytime(result, picks) {
    setResults(r => [...r, { path: 'daytime', result, atmosphere: atmoBand, songPicks: picks }]);
    if (path === 'all-day') advance('q5', 4); else advance('q7', 6);
  }
  function afterEvening(result, picks) { setResults(r => [...r, { path: 'evening', result, atmosphere: atmoBand, songPicks: picks }]); advance('q7', 6); }

  return (
    <>
      {step === 'q1' && <Shell litCount={0} backdrop={backdrop}><Q1 onAnswer={handleQ1} /></Shell>}
      {step === 'djExit' && <Shell hideChrome backdrop={backdrop}><DjExit onBackIn={() => advance('q1', 0)} /></Shell>}
      {step === 'q2' && <Shell litCount={1} backdrop={backdrop} onBack={() => advance('q1', 0)}><Q2 onAnswer={handleQ2} /></Shell>}
      {step === 'q3' && <Shell litCount={2} backdrop={backdrop} onBack={() => advance('q2', 1)}><Atmosphere n={3} path="daytime" allDayRoute={path === 'all-day'} onAnswer={(b) => { setAtmoBand(b); advance('q4', 3); }} /></Shell>}
      {step === 'q4' && <Shell litCount={3} backdrop={backdrop} onBack={() => advance('q3', 2)}><SongPick n={4} path="daytime" onAnswer={(picks) => afterDaytime(scorePath(picks, DAYTIME_SONGS, atmoBand, path === 'all-day'), picks)} /></Shell>}
      {step === 'q5' && <Shell litCount={litCount} backdrop={backdrop} onBack={() => advance('q4', 3)}><Atmosphere n={5} path="evening" allDayRoute={path === 'all-day'} onAnswer={(b) => { setAtmoBand(b); advance('q6', litCount + 1); }} /></Shell>}
      {step === 'q6' && <Shell litCount={litCount} backdrop={backdrop} onBack={() => advance('q5', litCount - 1)}><SongPick n={6} path="evening" onAnswer={(picks) => afterEvening(scorePath(picks, EVENING_SONGS, atmoBand), picks)} /></Shell>}
      {step === 'q7' && <Shell litCount={6} backdrop={backdrop} onBack={() => advance('q6', litCount)}><TasteQuestion onAnswer={(data) => { setPartnerName(data.partnerName); setPartnerTaste(data.tasteSelection); advance('q8', 7); }} /></Shell>}
      {step === 'q8' && <Shell litCount={7} backdrop={backdrop} onBack={() => advance('q7', 6)}><Q8 onAnswer={(v) => advance(v === 'none' ? 'q11' : 'q9', 8)} /></Shell>}
      {step === 'q9' && <Shell litCount={8} backdrop={backdrop} onBack={() => advance('q8', 7)}><Q9Q10 onAnswer={(data) => { setVenue(data.venue); setWeddingDate(data.date); advance('q11', 10); }} /></Shell>}
      {step === 'q11' && <Shell litCount={10} backdrop={backdrop} onBack={() => advance('q9', 8)}><LeadCapture onSubmit={() => advance('loading', 11)} results={results} path={path} venue={venue} weddingDate={weddingDate} partnerName={partnerName} partnerTaste={partnerTaste} /></Shell>}
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
