import React from 'react';

const FACETS = [
  { top: '18%', left: '30%', d: 0 }, { top: '24%', left: '58%', d: 0.6 },
  { top: '40%', left: '20%', d: 1.2 }, { top: '46%', left: '68%', d: 0.3 },
  { top: '60%', left: '42%', d: 1.6 }, { top: '68%', left: '22%', d: 0.9 },
  { top: '30%', left: '78%', d: 1.9 }, { top: '72%', left: '62%', d: 0.5 },
];

export function MatchBadge({ percent = 92, size = 220 }) {
  const facetSize = Math.max(8, Math.round(size / 11));
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(circle at 32% 26%, #ffffff 0%, var(--color-coral) 14%, var(--color-ink-soft) 48%, var(--color-ink) 100%)',
        boxShadow: 'var(--shadow-glow-coral)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.22) 0 1.5px, transparent 1.5px ${facetSize}px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.14) 0 1.5px, transparent 1.5px ${facetSize}px)`,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 75%, rgba(0,0,0,0.35), transparent 60%)' }} />
        {FACETS.map((f, i) => (
          <span key={i} style={{
            position: 'absolute', top: f.top, left: f.left, width: 5, height: 5, borderRadius: '50%',
            background: '#fff', boxShadow: '0 0 6px 2px rgba(255,255,255,0.8)',
            animation: `boujee-twinkle 2.6s ease-in-out ${f.d}s infinite`,
          }} />
        ))}
        <style>{'@keyframes boujee-twinkle{0%,100%{opacity:.2;transform:scale(0.8)}50%{opacity:1;transform:scale(1.3)}}'}</style>
      </div>
      <div style={{
        position: 'relative', textAlign: 'center', fontFamily: 'var(--font-script)', color: '#fff',
        fontSize: 'var(--fs-script-percent)', lineHeight: 1, textShadow: '0 2px 10px rgba(38,0,77,0.6), 0 0 2px rgba(38,0,77,0.4)',
      }}>
        {percent}%
      </div>
    </div>
  );
}
