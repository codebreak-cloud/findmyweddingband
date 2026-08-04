import React from 'react';

const base = {
  fontFamily: 'var(--font-sans)',
  fontWeight: 'var(--fw-semibold)',
  fontSize: 'var(--fs-body)',
  border: '1px solid transparent',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  transition: 'transform var(--dur-quick) var(--ease-press), background var(--dur-standard) var(--ease-standard), opacity var(--dur-standard) var(--ease-standard)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};

const sizes = {
  md: { padding: '14px 28px', fontSize: 'var(--fs-body)' },
  lg: { padding: '18px 36px', fontSize: 'var(--fs-body-lg)' },
  sm: { padding: '10px 18px', fontSize: 'var(--fs-small)' },
};

const variants = {
  primary: { background: 'var(--action-primary-bg)', color: 'var(--action-primary-text)' },
  secondary: { background: 'transparent', color: 'var(--color-ink)', borderColor: 'var(--color-ink)' },
  ghost: { background: 'transparent', color: 'var(--color-ink)', borderColor: 'transparent', textDecoration: 'underline', textDecorationColor: 'var(--border-hairline)' },
  onInk: { background: 'var(--action-on-ink-bg)', color: 'var(--action-on-ink-text)' },
};

export function Button({ variant = 'primary', size = 'md', disabled = false, children, onClick, style }) {
  const [pressed, setPressed] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        ...base,
        ...v,
        ...s,
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        ...style,
      }}
      onMouseOver={(e) => { if (!disabled && variant === 'primary') e.currentTarget.style.background = 'var(--action-primary-bg-hover)'; if (!disabled && variant === 'onInk') e.currentTarget.style.opacity = '0.88'; }}
      onMouseOut={(e) => { if (!disabled && variant === 'primary') e.currentTarget.style.background = 'var(--action-primary-bg)'; if (!disabled && variant === 'onInk') e.currentTarget.style.opacity = disabled ? '0.45' : '1'; }}
    >
      {children}
    </button>
  );
}
