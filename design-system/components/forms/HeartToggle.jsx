import React from 'react';

export function HeartToggle({ selected = false, size = 22, onClick, as = 'button' }) {
  const Tag = as === 'span' ? 'span' : 'button';
  const interactiveProps = as === 'span'
    ? { role: 'img', 'aria-label': selected ? 'Selected' : 'Not selected' }
    : { onClick, 'aria-pressed': selected, 'aria-label': selected ? 'Selected' : 'Select' };
  return (
    <Tag
      {...interactiveProps}
      style={{
        background: 'none', border: 'none', padding: 4, cursor: as === 'span' ? 'inherit' : 'pointer',
        display: 'inline-flex', lineHeight: 0,
        transition: 'transform var(--dur-quick) var(--ease-press)',
        transform: selected ? 'scale(1.08)' : 'scale(1)',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 20.2C9.8 18.4 4 13.7 4 9.3 4 6.4 6.2 4.5 8.7 4.5c1.5 0 3 .8 3.3 2 .3-1.2 1.8-2 3.3-2C17.8 4.5 20 6.4 20 9.3c0 4.4-5.8 9.1-8 10.9z"
          stroke="var(--color-ink)"
          strokeWidth={selected ? 0 : 1.4}
          fill={selected ? 'var(--color-ink)' : 'none'}
        />
      </svg>
    </Tag>
  );
}
