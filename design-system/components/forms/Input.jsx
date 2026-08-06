import React from 'react';

export function Input({ label, type = 'text', placeholder, value, onChange, error }) {
  return (
    <label style={{ display: 'block', fontFamily: 'var(--font-sans)' }}>
      {label && <span style={{ display: 'block', fontSize: 'var(--fs-meta)', letterSpacing: 'var(--ls-meta)', textTransform: 'uppercase', color: 'white', marginBottom: 8 }}>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', padding: '14px 16px', fontSize: 'var(--fs-body)', fontFamily: 'var(--font-sans)',
          borderRadius: 'var(--radius-md)', border: error ? '1.5px solid var(--color-error)' : 'none',
          background: 'var(--surface-cream)', color: 'var(--text-body)', outline: 'none',
          boxShadow: 'var(--shadow-float)',
          transition: 'box-shadow var(--dur-standard) var(--ease-standard)',
        }}
        onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-coral), var(--shadow-float)'}
        onBlur={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-float)'}
      />
      {error && <span style={{ display: 'block', fontSize: 'var(--fs-small)', color: 'var(--color-error)', marginTop: 6 }}>{error}</span>}
    </label>
  );
}
