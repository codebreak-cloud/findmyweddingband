import React from 'react';
import { HeartToggle } from './HeartToggle.jsx';

export function SongRow({ title, artist, selected = false, onClick }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        textAlign: 'left', padding: '18px 20px', background: selected ? 'var(--color-coral)' : 'var(--surface-cream)',
        border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
        boxShadow: selected ? 'var(--shadow-glow-coral)' : 'var(--shadow-float)',
        fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden',
        transform: pressed ? 'translateY(1px) scale(0.995)' : selected ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform var(--dur-quick) var(--ease-press), background var(--dur-standard) var(--ease-standard), box-shadow var(--dur-standard) var(--ease-standard)',
      }}
    >
      <span style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'var(--color-ink)', transform: selected ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'center', transition: 'transform var(--dur-standard) var(--ease-settle)',
      }} />
      <span style={{ paddingLeft: 12 }}>
        <span style={{ display: 'block', fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>{title}</span>
        <span style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>{artist}</span>
      </span>
      <HeartToggle selected={selected} as="span" />
    </button>
  );
}
