import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TaskPlanner } from '@sps/feature-x';
import { Pomodoro } from '@sps/feature-y';
import { StudyNotes } from '@sps/feature-z';

const Layout = ({ children }) => {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { path: '/', label: 'Task Planner', icon: '📝' },
    { path: '/pomodoro', label: 'Pomodoro Timer', icon: '⏱️' },
    { path: '/notes', label: 'Study Notes', icon: '📚' }
  ];

  const navStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    textDecoration: 'none',
    color: location.pathname === path ? 'var(--primary)' : 'var(--text-muted)',
    backgroundColor: location.pathname === path ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
    fontWeight: location.pathname === path ? '600' : '500',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    border: location.pathname === path ? '1px solid rgba(79, 70, 229, 0.2)' : '1px solid transparent'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <aside className="glass" style={{ width: '280px', borderRight: '1px solid var(--surface-border)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🚀
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1.2' }}>
            Student<br/>Productivity
          </h1>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={navStyle(item.path)}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button 
            onClick={toggleTheme} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              backgroundColor: 'var(--surface)', color: 'var(--text-main)', 
              border: '1px solid var(--surface-border)', borderRadius: '8px', 
              cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s ease',
              width: '100%', textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '20px' }}>{theme === 'light' ? '🌙' : '☀️'}</span>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>Keep it up! 🌟</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>"Success is the sum of small efforts, repeated day in and day out."</div>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '48px', height: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskPlanner />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/notes" element={<StudyNotes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
