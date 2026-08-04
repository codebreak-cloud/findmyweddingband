import React from 'react';

export function LoadingBeat({ label = 'Calculating your match…' }) {
  const keys = new Array(7).fill(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 40 }}>
        {keys.map((_, i) => (
          <span key={i} style={{
            width: 8, borderRadius: 2, background: 'var(--color-ink)',
            animation: `boujee-key 900ms var(--ease-settle) ${i * 110}ms infinite alternate`,
            height: 12,
          }} />
        ))}
      </div>
      <style>{`@keyframes boujee-key{from{height:12px;opacity:.45}to{height:38px;opacity:1}}`}</style>
      <span style={{ fontSize: 'var(--fs-small)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
