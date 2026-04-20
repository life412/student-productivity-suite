import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, TextField, EmptyState } from '@sps/ui-components';
import { storage, formatDuration, formatDate, generateId } from '@sps/utils';

export const Pomodoro = () => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  
  const [history, setHistory] = useState(() => storage.get('pomodoro_history', []));
  
  const timerRef = useRef(null);

  useEffect(() => {
    storage.set('pomodoro_history', history);
  }, [history]);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
    }
  }, [focusTime, breakTime, mode]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(timerRef.current);
      // Session finished
      if (mode === 'focus') {
        const newSession = { id: generateId(), date: Date.now(), duration: focusTime * 60, type: 'focus' };
        setHistory([newSession, ...history]);
        setMode('break');
      } else {
        setMode('focus');
      }
      setIsActive(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode, focusTime, history]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
  };

  const today = new Date().setHours(0,0,0,0);
  const todaysFocusTime = history
    .filter(s => s.type === 'focus' && new Date(s.date).setHours(0,0,0,0) === today)
    .reduce((acc, curr) => acc + curr.duration, 0);

  const progressPercent = mode === 'focus' 
    ? ((focusTime * 60 - timeLeft) / (focusTime * 60)) * 100 
    : ((breakTime * 60 - timeLeft) / (breakTime * 60)) * 100;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ margin: 0, fontSize: '28px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pomodoro Timer</h2>
        <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>Stay focused and boost your productivity.</p>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ textAlign: 'center', padding: '48px 32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', backgroundColor: mode === 'focus' ? 'var(--primary)' : 'var(--secondary)', width: `${progressPercent}%`, transition: 'width 1s linear' }}></div>
            <h2 style={{ margin: 0, fontSize: '24px', color: mode === 'focus' ? 'var(--primary)' : 'var(--secondary)' }}>
              {mode === 'focus' ? '🎯 Focus Session' : '☕ Break Time'}
            </h2>
            <div style={{ fontSize: '80px', fontWeight: 'bold', margin: '32px 0', fontFamily: 'monospace', color: 'var(--text-main)', letterSpacing: '4px' }}>
              {formatDuration(timeLeft)}
            </div>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Button onClick={toggleTimer} style={{ minWidth: '120px', fontSize: '16px', padding: '12px 24px' }}>
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button variant="secondary" onClick={resetTimer}>Reset</Button>
              <Button variant="secondary" onClick={() => { setMode(mode === 'focus' ? 'break' : 'focus'); setIsActive(false); }}>
                Skip
              </Button>
            </div>
          </Card>

          <Card>
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--text-main)' }}>Timer Settings</h3>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <TextField 
                  label="Focus Duration (min)" 
                  type="number" 
                  value={focusTime} 
                  onChange={e => setFocusTime(Number(e.target.value))} 
                  disabled={isActive}
                />
              </div>
              <div style={{ flex: 1 }}>
                <TextField 
                  label="Break Duration (min)" 
                  type="number" 
                  value={breakTime} 
                  onChange={e => setBreakTime(Number(e.target.value))} 
                  disabled={isActive}
                />
              </div>
            </div>
          </Card>
        </div>

        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(16, 185, 129, 0.1))', borderColor: 'transparent' }}>
            <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Daily Progress</h3>
            <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Total Focus Time Today</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)' }}>
              {formatDuration(todaysFocusTime)}
            </div>
          </Card>

          <Card style={{ flex: 1 }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--text-main)' }}>Recent Sessions</h3>
            {history.length === 0 ? (
              <EmptyState message="No sessions completed yet." />
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
                {history.map(session => (
                  <div key={session.id} style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--background)', border: '1px solid var(--surface-border)' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>Focus Session</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span>{formatDate(session.date)}</span>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>+{formatDuration(session.duration)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
