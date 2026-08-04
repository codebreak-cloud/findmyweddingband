const { Button } = window.BoujeeMusicMatchmakerDesignSystem_bdd5f9;

const useScrollReveal = () => {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const Section = ({ children, bg, style, withReveal = false }) => {
  const { ref, isVisible } = useScrollReveal();
  const baseStyle = { background: bg || 'var(--color-paper)', padding: 'var(--space-9) var(--space-5)', ...style };
  if (!withReveal) return (
    <section style={baseStyle}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>{children}</div>
    </section>
  );
  return (
    <section ref={ref} style={{
      ...baseStyle,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 600ms var(--ease-settle), transform 600ms var(--ease-settle)'
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>{children}</div>
    </section>
  );
};

function DuotoneBand({ src, placeholder, height, tone = 'coral' }) {
  const grad = tone === 'coral' ? 'linear-gradient(155deg, var(--color-ink), var(--color-coral))' : 'linear-gradient(155deg, var(--color-ink), var(--color-ice))';
  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1) contrast(1.15)' }} />
        : <div style={{ width: '100%', height: '100%', background: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,253,251,0.5)', fontSize: 'var(--fs-small)' }}>{placeholder}</div>}
      <div style={{ position: 'absolute', inset: 0, background: grad, mixBlendMode: 'color', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: grad, mixBlendMode: 'multiply', opacity: 0.4, pointerEvents: 'none' }} />
    </div>
  );
}

function Hero() {
  return (
    <div className="bq-hero">
      <style>{`
.bq-hero{position:relative;display:flex;flex-direction:column;background:var(--color-ink);overflow:hidden}
.bq-hero-bg{position:absolute;inset:0;z-index:0}
.bq-hero-bg img{width:100%;height:100%;object-fit:cover;object-position:50% 38%;filter:grayscale(0.5) saturate(0.9) contrast(1.12) brightness(0.8)}
.bq-hero-scrim{position:absolute;inset:0;background:
  radial-gradient(120% 85% at 18% 0%, rgba(239,176,161,0.24), transparent 55%),
  linear-gradient(115deg, rgba(38,0,77,0.94) 0%, rgba(38,0,77,0.86) 38%, rgba(20,0,41,0.72) 62%, rgba(20,0,41,0.9) 100%)}
.bq-hero-scrim-fade{position:absolute;left:0;right:0;bottom:0;height:120px;background:linear-gradient(180deg, transparent, var(--color-ink))}
.bq-hero-glow{position:absolute;top:-12%;left:8%;width:60vw;max-width:560px;height:60vw;max-height:560px;border-radius:50%;background:radial-gradient(circle, rgba(239,176,161,0.4), transparent 70%);filter:blur(64px);animation:bq-glow-pulse 8s ease-in-out infinite;pointer-events:none}
@keyframes bq-glow-pulse{0%,100%{opacity:0.55;transform:scale(1)}50%{opacity:0.9;transform:scale(1.1)}}
@keyframes bq-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.bq-hero-text{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;padding:64px 24px 48px}
.bq-hero-label{font-family:var(--font-sans);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:var(--fw-medium);color:var(--color-coral);margin:0 0 18px;animation:bq-rise 700ms var(--ease-settle) both;animation-delay:0ms}
.bq-hero-headline{font-family:var(--font-headline);font-weight:var(--fw-black);font-size:clamp(2.5rem,2.3rem + 1vw,3rem);line-height:0.98;letter-spacing:-0.03em;color:var(--color-paper);margin:0 0 24px;text-wrap:balance;text-shadow:0 2px 24px rgba(20,0,41,0.4);animation:bq-rise 750ms var(--ease-settle) both;animation-delay:90ms}
.bq-hero-tagline{font-family:var(--font-sans);font-weight:var(--fw-regular);font-size:16px;line-height:1.6;color:var(--color-paper);max-width:520px;margin:0 0 32px;animation:bq-rise 750ms var(--ease-settle) both;animation-delay:180ms}
.bq-hero-cta{animation:bq-rise 750ms var(--ease-settle) both;animation-delay:280ms}
.bq-hero-testi{position:relative;display:flex;gap:14px;align-items:flex-start;max-width:480px;margin:48px 0 0;padding-top:26px;border-top:1px solid rgba(255,253,251,0.2);animation:bq-rise 750ms var(--ease-settle) both;animation-delay:400ms}
.bq-hero-testi-mark{flex:none;font-family:var(--font-script);font-size:2.75rem;line-height:0.5;color:var(--color-coral);opacity:0.85;transform:translateY(6px)}
.bq-hero-testi-text{font-family:var(--font-sans);font-weight:var(--fw-regular);font-size:14px;line-height:1.5;color:rgba(255,253,251,0.88);margin:0}
@media(min-width:900px){
.bq-hero-text{padding:104px 40px 88px}
.bq-hero-headline{font-size:clamp(3rem,2.4rem + 2vw,4rem)}
.bq-hero-testi{align-items:center;flex-direction:column;gap:6px}
.bq-hero-testi-mark{transform:none}
}
      `}</style>
      <div className="bq-hero-bg">
        <img src="../../assets/images/landing-wedding-2.webp" alt="" />
        <div className="bq-hero-scrim" />
        <div className="bq-hero-glow" />
        <div className="bq-hero-scrim-fade" />
      </div>
      <div className="bq-hero-text">
        <h1 className="bq-hero-headline">The Wedding Band Matchmaker</h1>
        <p className="bq-hero-tagline">The quiz that helps you discover the perfect style of band to suit your wedding vibe, and make it an unforgettable night.</p>
        <div className="bq-hero-cta"><Button variant="onInk" size="lg" onClick={() => { window.location.href = '../quiz/index.html'; }}>Find My Match</Button></div>
        <p className="bq-hero-testi"><span className="bq-hero-testi-mark" aria-hidden="true">&ldquo;</span><span className="bq-hero-testi-text">"It felt like it was made for us." - Sam &amp; Priya, Elmore Court, June 2025</span></p>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <Section bg="var(--color-ice)" withReveal>
      <style>{`
        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
          }
          .problem-image {
            min-height: 300px !important;
          }
        }
      `}</style>
      <div className="problem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-6)' }}>Every wedding band says the same thing.</h2>
          <p style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)', color: 'var(--text-body)', marginBottom: 'var(--space-5)' }}>
            Unforgettable, unique, showstopping. After the fifth Instagram reel, they all blur into one. You've probably already spent hours scrolling through band after band, video after video, trying to picture how each one would actually feel on the day. It's meant to be exciting, but somewhere around the twentieth open tab it starts to feel like a task rather than a treat. And because it's your wedding, a day you don't get to run twice, every choice starts to carry weight.
          </p>
          <p style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-bold)', lineHeight: 'var(--lh-body)', color: 'var(--color-ink)' }}>
            The real question isn't which band looks good on paper. It's which one suits the day you're picturing, the songs you love, and the way you want your guests to feel on the dancefloor.
          </p>
        </div>
        <div className="problem-image" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%', minHeight: '400px' }}>
          <img src="../../assets/images/Jazz-Sax-on-Dancefloor.jpg.webp" alt="Jazz saxophonist on dancefloor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    ['1', 'Tell us the vibe', 'A few quick questions about the atmosphere you want on your wedding day and the songs that get you excited. No music theory required, just what you\'re picturing.'],
    ['2', 'Get your match', 'We calculate a genuine match score and match you with the band whose style fits what you told us, ceremony and drinks through to the last dance. You\'ll walk away knowing exactly what type of live band to look for instead, so this is worth your time either way.'],
    ['3', 'Book a quick call', 'If you want to see the band in action, you have the opportunity to book a call with us at the end. No pressure. We\'ll check availability and take it from there.'],
  ];
  const { ref, isVisible } = useScrollReveal();
  return (
    <Section>
      <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-7)', textAlign: 'center' }}>How it works</h2>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-7)' }}>
        {steps.map(([n, t, d], i) => (
          <div key={n} style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms var(--ease-settle), transform 600ms var(--ease-settle)',
            transitionDelay: isVisible ? `${i * 80}ms` : '0ms'
          }}>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'var(--fs-script-band)', color: 'var(--color-coral-deep)', marginBottom: 'var(--space-2)' }}>{n}</div>
            <h3 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-extrabold)', marginBottom: 'var(--space-3)' }}>{t}</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)' }}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhatsWaiting() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div style={{ background: 'var(--color-ink)' }}>
      <Section bg="transparent">
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-7)',
          alignItems: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 600ms var(--ease-settle), transform 600ms var(--ease-settle)'
        }}>
          <div>
            <h2 style={{ color: 'var(--color-paper)', fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-5)' }}>What's waiting for you</h2>
            <p style={{ color: 'var(--color-paper)', opacity: 0.9, fontWeight: 'var(--fw-regular)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--space-4)' }}>
              Boujee's bands aren't available anywhere else. Every one has been built from scratch, from the setlists to the arrangements, and is exclusive to Boujee.
            </p>
            <p style={{ color: 'var(--color-coral)', fontWeight: 'var(--fw-semibold)', lineHeight: 'var(--lh-body)' }}>
              Your match isn't just a band name. It's a proper look at the style that suits you: the acoustic roaming set that works table to table during drinks, the swing and jazz that make dinner feel effortless, the show band that keeps the dancefloor full until the last song. You'll see why it fits, hear it, and know exactly what your evening could feel like.
            </p>
          </div>
          <DuotoneBand src="../../assets/images/landing-wedding-1.webp" height={340} tone="ice" />
        </div>
      </Section>
    </div>
  );
}

function Testimonials() {
  const quotes = [
    ['"We knew within a minute of the video which one was us."', 'Freya & Tom', 'Aynhoe Park, May 2025'],
    ['"It felt like it was made for our wedding specifically."', 'Sam & Priya', 'Elmore Court, June 2025'],
    ['"No pressure, no pitch - just a genuinely good match."', 'Louis & Ines', 'The Barn at Bury Court, Sept 2025'],
  ];
  const { ref, isVisible } = useScrollReveal();
  return (
    <Section bg="var(--color-ice)">
      <h2 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-7)', textAlign: 'center' }}>Couples who found their match</h2>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
        {quotes.map(([q, n, v], i) => (
          <div key={i} style={{
            background: 'var(--color-paper)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms var(--ease-settle), transform 600ms var(--ease-settle), transform 200ms var(--ease-standard)',
            transitionDelay: isVisible ? `${i * 80}ms` : '0ms',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(38,0,77,0.15), 0 0 24px rgba(239,176,161,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <p style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-ink)', margin: 0, marginBottom: 'var(--space-4)' }}>{q}</p>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>{n} - {v}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const items = [
    ['Will I get a sales pitch straight away?', "No. You'll get your match first, with an explanation of why it suits you. What happens after that is entirely up to you."],
    ['We\'re still deciding between a live band and a DJ. Is this for us?', "Yes, if live music is even a small part of what you're picturing. If you're already set on a DJ with no live element, this quiz probably isn't for you, and we'll tell you that plainly rather than wasting your time."],
    ['Do we need to have a venue booked already?', 'No. This works whether you\'ve booked everything or you\'re still figuring out the date.'],
    ['Is there a catch?', "No. You'll get a real result either way. If Boujee turns out to be the right fit too, that's a bonus, not the point of the quiz."],
  ];
  const [openIndex, setOpenIndex] = React.useState(null);
  const { ref, isVisible } = useScrollReveal();
  return (
    <Section>
      <div ref={ref} style={{
        maxWidth: 'var(--container-narrow)',
        margin: '0 auto',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 600ms var(--ease-settle), transform 600ms var(--ease-settle)'
      }}>
        {items.map(([q, a], i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 'var(--space-6) 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <h3 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-extrabold)', margin: 0 }}>{q}</h3>
              <svg width="16" height="16" viewBox="0 0 16 16" style={{
                flexShrink: 0,
                marginLeft: 'var(--space-3)',
                transition: 'transform 250ms var(--ease-settle)',
                transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                <path d="M4 6L8 10L12 6" stroke="var(--text-muted)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div style={{
              maxHeight: openIndex === i ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 300ms var(--ease-settle)'
            }}>
              <p style={{
                color: 'var(--text-muted)',
                fontWeight: 'var(--fw-regular)',
                lineHeight: 'var(--lh-body)',
                marginBottom: 'var(--space-6)',
                marginTop: '0'
              }}>
                {a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div style={{ position: 'relative', background: 'var(--color-ink)', overflow: 'hidden' }}>
      <img
        src="../../assets/images/landing-wedding-2.webp"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(0.5) saturate(0.9) contrast(1.12) brightness(0.6)'
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(115deg, rgba(38,0,77,0.92) 0%, rgba(38,0,77,0.88) 38%, rgba(20,0,41,0.76) 62%, rgba(20,0,41,0.92) 100%)'
      }} />
      <Section bg="transparent" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div ref={ref} style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 600ms var(--ease-settle), transform 600ms var(--ease-settle)'
        }}>
          <h2 style={{ color: 'var(--color-paper)', fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-3)' }}>Ready to find your match?</h2>
          <p style={{ color: 'var(--color-coral)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--space-6)' }}>Two minutes. One genuinely calculated match.</p>
          <Button variant="onInk" size="lg" onClick={() => { window.location.href = '../quiz/index.html'; }}>Find My Match</Button>
        </div>
      </Section>
    </div>
  );
}

function LandingPage() {
  return (<><Hero /><Problem /><HowItWorks /><WhatsWaiting /><Testimonials /><FAQ /><FinalCTA /></>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<LandingPage />);
