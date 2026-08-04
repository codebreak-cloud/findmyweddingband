import React from 'react';
import { HeartToggle } from './HeartToggle.jsx';

export function OptionCard({ label, sublabel, selected = false, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, padding: '20px 24px', borderRadius: 'var(--radius-md)', border: 'none',
        background: selected ? 'var(--color-coral)' : 'var(--surface-cream)',
        boxShadow: selected ? 'var(--shadow-glow-coral)' : 'var(--shadow-float)',
        cursor: 'pointer', fontFamily: 'var(--font-sans)',
        transform: selected ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'background var(--dur-standard) var(--ease-standard), box-shadow var(--dur-standard) var(--ease-standard), transform var(--dur-standard) var(--ease-settle)',
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = selected ? 'translateY(-3px) scale(0.99)' : 'scale(0.99)'}
      onMouseUp={(e) => e.currentTarget.style.transform = selected ? 'translateY(-3px)' : 'translateY(0)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = selected ? 'translateY(-3px)' : 'translateY(0)'}
    >
      <span>
        <span style={{ display: 'block', fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>{label}</span>
        {sublabel && <span style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--text-muted)', marginTop: 4 }}>{sublabel}</span>}
      </span>
      <HeartToggle selected={selected} as="span" />
    </button>
  );
}
