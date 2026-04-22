import React, { useState } from 'react';

export const Button = ({ children, variant = 'primary', style, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  //update ui 
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
      color: '#fff',
      boxShadow: isHovered ? '0 4px 12px rgba(79, 70, 229, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)',
      transform: isHovered ? 'translateY(-1px)' : 'none'
    },
    secondary: {
      backgroundColor: isHovered ? 'var(--surface-border)' : 'var(--surface)',
      color: 'var(--text-main)',
      border: '1px solid var(--surface-border)',
      transform: isHovered ? 'translateY(-1px)' : 'none'
    }
  };

  const finalStyle = { ...baseStyle, ...variants[variant], ...style };

  return (
    <button
      style={finalStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, style, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
}

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        padding: '32px',
        borderRadius: '16px',
        minWidth: '400px',
        maxWidth: '90%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '20px', color: 'var(--text-main)' }}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export const Tabs = ({ tabs, activeTab, onChange }) => (
  <div style={{ display: 'flex', borderBottom: '1px solid var(--surface-border)', marginBottom: '24px', gap: '24px' }}>
    {tabs.map(tab => (
      <div
        key={tab.id}
        onClick={() => onChange(tab.id)}
        style={{
          padding: '12px 4px',
          cursor: 'pointer',
          borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
          fontWeight: activeTab === tab.id ? '600' : '500',
          color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
          transition: 'all 0.2s ease'
        }}
      >
        {tab.label}
      </div>
    ))}
  </div>
);

export const TextField = ({ label, value, onChange, error, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ marginBottom: '16px', textAlign: 'left', ...style }}>
      {label && <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>{label}</label>}
      <input
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          padding: '12px 16px',
          width: '100%',
          boxSizing: 'border-box',
          border: error ? '1px solid var(--danger)' : (isFocused ? '1px solid var(--primary)' : '1px solid var(--surface-border)'),
          borderRadius: '8px',
          backgroundColor: 'var(--background)',
          color: 'var(--text-main)',
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isFocused ? '0 0 0 3px rgba(79, 70, 229, 0.1)' : 'none',
          fontSize: '14px'
        }}
        {...props}
      />
      {error && <span style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{error}</span>}
    </div>
  );
};

export const Badge = ({ children, status }) => {
  let bgColor = 'rgba(148, 163, 184, 0.1)';
  let color = 'var(--text-muted)';

  if (status === 'todo') { bgColor = 'rgba(245, 158, 11, 0.1)'; color = 'var(--warning)'; }
  if (status === 'in-progress') { bgColor = 'rgba(79, 70, 229, 0.1)'; color = '#818CF8'; }
  if (status === 'done') { bgColor = 'rgba(16, 185, 129, 0.1)'; color = 'var(--secondary)'; }

  return (
    <span style={{
      padding: '4px 10px',
      backgroundColor: bgColor,
      color: color,
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block',
      border: `1px solid ${bgColor.replace('0.1', '0.2')}`
    }}>
      {children}
    </span>
  );
};

export const EmptyState = ({ message }) => (
  <div style={{
    padding: '48px 32px',
    textAlign: 'center',
    color: 'var(--text-muted)',
    border: '2px dashed var(--surface-border)',
    borderRadius: '16px',
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  }}>
    <div style={{ fontSize: '48px', opacity: 0.5 }}>✨</div>
    <div style={{ fontSize: '16px', fontWeight: '500' }}>{message}</div>
  </div>
);
