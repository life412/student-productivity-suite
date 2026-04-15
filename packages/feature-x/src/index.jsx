import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, TextField, Badge, EmptyState } from '@sps/ui-components';
import { generateId, storage, formatDate } from '@sps/utils';

export const TaskPlanner = () => {
  const [tasks, setTasks] = useState(() => storage.get('tasks', []));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [form, setForm] = useState({ title: '', status: 'todo' });

  useEffect(() => {
    storage.set('tasks', tasks);
  }, [tasks]);

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...form } : t));
    } else {
      setTasks([...tasks, { id: generateId(), ...form, createdAt: Date.now() }]);
    }
    setIsModalOpen(false);
    setForm({ title: '', status: 'todo' });
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({ title: task.title, status: task.status });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter !== 'all' && t.status !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '28px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Task Planner</h2>
          <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>Manage your goals and stay organized.</p>
        </div>
        <Button onClick={() => { setForm({ title: '', status: 'todo' }); setEditingTask(null); setIsModalOpen(true); }}>
          + Add Task
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <TextField placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 0 }} />
        </div>
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)} 
          style={{ 
            padding: '0 16px', 
            borderRadius: '8px', 
            border: '1px solid var(--surface-border)', 
            backgroundColor: 'var(--surface)', 
            color: 'var(--text-main)', 
            outline: 'none',
            minWidth: '150px'
          }}
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState message="No tasks found. Time to add some!" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTasks.map(task => (
            <Card key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px', color: 'var(--text-main)' }}>{task.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Added {formatDate(task.createdAt)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Badge status={task.status}>{task.status.replace('-', ' ')}</Badge>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="secondary" onClick={() => handleEdit(task)} style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</Button>
                  <Button variant="secondary" style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }} onClick={() => handleDelete(task.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTask ? 'Edit Task' : 'New Task'}>
        <TextField label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>Status</label>
          <select 
            value={form.status} 
            onChange={e => setForm({ ...form, status: e.target.value })} 
            style={{ 
              padding: '12px 16px', 
              width: '100%', 
              borderRadius: '8px', 
              border: '1px solid var(--surface-border)', 
              backgroundColor: 'var(--background)', 
              color: 'var(--text-main)',
              outline: 'none'
            }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Task</Button>
        </div>
      </Modal>
    </div>
  );
};
