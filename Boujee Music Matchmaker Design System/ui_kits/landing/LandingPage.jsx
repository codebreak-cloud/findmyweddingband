const { Button } = window.BoujeeMusicMatchmakerDesignSystem_bdd5f9;

const Section = ({ children, bg, style }) => (
  <section style={{ background: bg || 'var(--color-paper)', padding: '88px 24px', ...style }}>
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>{children}</div>
  </section>
);

function DuotoneBand({ id, placeholder, height, tone = 'coral' }) {
  const grad = tone === 'coral' ? 'linear-gradient(155deg, var(--color-ink), var(--color-coral))' : 'linear-gradient(155deg, var(--color-ink), var(--color-ice))';
  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <image-slot id={id} placeholder={placeholder} style={{ width: '100%', height: '100%', filter: 'grayscale(1) contrast(1.15)' }}></image-slot>
      <div style={{ position: 'absolute', inset: 0, background: grad, mixBlendMode: 'color', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: grad, mixBlendMode: 'multiply', opacity: 0.4, pointerEvents: 'none' }} />
    </div>
  );
}

function Hero() {
  return (
    <div className="bq-hero">
      <style>{`
.bq-hero{display:flex;flex-direction:column;background:var(--color-ink)}
.bq-hero-text{display:flex;flex-direction:column;padding:56px 24px 40px}
.bq-hero-label{font-family:var(--font-sans);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:var(--fw-medium);color:var(--color-coral);margin:0 0 18px}
.bq-hero-headline{font-family:var(--font-sans);font-weight:var(--fw-black);font-size:clamp(2.5rem,2.3rem + 1vw,3rem);line-height:0.98;letter-spacing:-0.03em;color:var(--color-paper);margin:0 0 24px;text-wrap:balance}
.bq-hero-tagline{font-family:var(--font-sans);font-weight:var(--fw-regular);font-size:16px;line-height:1.6;color:var(--color-paper);max-width:520px;margin:0 0 32px}
.bq-hero-testi{font-family:var(--font-sans);font-weight:var(--fw-regular);font-size:14px;color:var(--color-paper);opacity:0.75;margin:40px 0 0}
@media(min-width:900px){
.bq-hero-text{align-items:center;text-align:center;padding:88px 40px}
.bq-hero-headline{font-size:clamp(3rem,2.4rem + 2vw,4rem)}
}
      `}</style>
      <div className="bq-hero-text">
        <div className="bq-hero-label">The Wedding Band Matchmaker</div>
        <h1 className="bq-hero-headline">The Wedding Band Matchmaker</h1>
        <p className="bq-hero-tagline">The quiz that helps you discover the perfect style of band to suit your wedding vibe, and make it an unforgettable night.</p>
        <Button variant="onInk" size="lg">Find My Match</Button>
        <p className="bq-hero-testi">"It felt like it was made for us." — Sam &amp; Priya, Elmore Court, June 2025</p>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <Section bg="var(--color-ice)">
      <div style={{ maxWidth: 'var(--container-narrow)' }}>
        <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 28 }}>Every wedding band says the same thing.</h2>
        <p style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)', color: 'var(--text-body)', marginBottom: 20 }}>
          Unforgettable, unique, showstopping. After the fifth Instagram reel, they all blur into one. You've probably already spent hours scrolling, trying to picture how each one would actually feel on the day — and because it's a day you don't get to run twice, every choice starts to carry weight.
        </p>
        <p style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-bold)', lineHeight: 'var(--lh-body)', color: 'var(--color-ink)' }}>
          The real question isn't which band looks good on paper. It's which one suits the day you're picturing, the songs you love, and the way you want your guests to feel on the dancefloor.
        </p>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    ['1', 'Tell us the vibe', 'A few quick questions about the atmosphere you want and the songs that get you excited. No music theory required.'],
    ['2', 'Get your match', 'We calculate a genuine match score and match you with the band whose style fits your day, ceremony through to the last dance.'],
    ['3', 'Book a quick call', 'See the band in action and book a call if you want to. No pressure — we\u2019ll check availability and take it from there.'],
  ];
  return (
    <Section bg="var(--color-paper)">
      <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 48, textAlign: 'center' }}>How it works</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40 }}>
        {steps.map(([n, t, d]) => (
          <div key={n}>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'var(--fs-script-band)', color: 'var(--color-coral-deep)', marginBottom: 8 }}>{n}</div>
            <h3 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-extrabold)', marginBottom: 10 }}>{t}</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)' }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhatsWaiting() {
  return (
    <div style={{ background: 'var(--color-ink)' }}>
      <Section bg="transparent">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'var(--color-paper)', fontSize: 'var(--fs-h1)', marginBottom: 24 }}>What's waiting for you</h2>
            <p style={{ color: 'var(--color-paper)', opacity: 0.9, fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)', marginBottom: 16 }}>
              Boujee's bands aren't available anywhere else. Every one has been built from scratch, from the setlists to the arrangements, and is exclusive to Boujee.
            </p>
            <p style={{ color: 'var(--color-coral)', fontWeight: 'var(--fw-semibold)', lineHeight: 'var(--lh-body)' }}>
              The roaming acoustic set for drinks. The swing and jazz that make dinner effortless. The show band that keeps the dancefloor full until the last song.
            </p>
          </div>
          <DuotoneBand id="waiting" placeholder="Band performing" height={340} tone="ice" />
        </div>
      </Section>
    </div>
  );
}

function Testimonials() {
  const quotes = [
    ['"We knew within a minute of the video which one was us."', 'Freya & Tom', 'Aynhoe Park, May 2025'],
    ['"It felt like it was made for our wedding specifically."', 'Sam & Priya', 'Elmore Court, June 2025'],
    ['"No pressure, no pitch — just a genuinely good match."', 'Louis & Ines', 'The Barn at Bury Court, Sept 2025'],
  ];
  return (
    <Section bg="var(--color-ice)">
      <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 48, textAlign: 'center' }}>Couples who found their match</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {quotes.map(([q, n, v], i) => (
          <div key={i} style={{ background: 'var(--color-paper)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <p style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-ink)', marginBottom: 16 }}>{q}</p>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>{n} — {v}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const items = [
    ['Will I get a sales pitch straight away?', "No. You'll get your match first, with an explanation of why it suits you. What happens after that is entirely up to you."],
    ['We\u2019re still deciding between a live band and a DJ. Is this for us?', "Yes, if live music is even a small part of what you're picturing. If you're set on a DJ with no live element, we'll tell you plainly rather than waste your time."],
    ['Do we need a venue booked already?', 'No. This works whether you\u2019ve booked everything or you\u2019re still figuring out the date.'],
    ['Is there a catch?', "No. You'll get a real result either way. If Boujee turns out to be the right fit too, that's a bonus, not the point of the quiz."],
  ];
  return (
    <Section bg="var(--color-paper)">
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        {items.map(([q, a], i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border-hairline)', padding: '26px 0' }}>
            <h3 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-extrabold)', marginBottom: 8 }}>{q}</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)' }}>{a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section bg="var(--color-ink)" style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'var(--color-paper)', fontSize: 'var(--fs-h1)', marginBottom: 12 }}>Ready to find your match?</h2>
      <p style={{ color: 'var(--color-coral)', fontWeight: 'var(--fw-semibold)', marginBottom: 32 }}>Two minutes. One genuinely calculated match.</p>
      <Button variant="onInk" size="lg">Find My Match</Button>
    </Section>
  );
}

function LandingPage() {
  return (<><Hero /><Problem /><HowItWorks /><WhatsWaiting /><Testimonials /><FAQ /><FinalCTA /></>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<LandingPage />);
