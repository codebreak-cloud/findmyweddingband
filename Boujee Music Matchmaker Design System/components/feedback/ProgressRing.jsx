import React from 'react';

export function ProgressRing({ progress = 0, size = 64, closed = false }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const pct = closed ? 1 : Math.max(0, Math.min(1, progress));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-hairline)" strokeWidth="3" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset var(--dur-deliberate) var(--ease-settle)' }}
      />
    </svg>
  );
}
