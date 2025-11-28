'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  created_at: string;
  updated_at?: string;
}

const API_URL = 'http://localhost:5000/api';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as Task['status']
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const url = editingId
        ? `${API_URL}/tasks/${editingId}`
        : `${API_URL}/tasks`;

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save task');

      // Reset form
      setFormData({ title: '', description: '', status: 'pending' });
      setEditingId(null);

      // Refresh tasks
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
      console.error('Error saving task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  // Handle edit
  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
    setEditingId(task.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ title: '', description: '', status: 'pending' });
    setEditingId(null);
    setError('');
  };

  // Get status styling
  const getStatusClass = (status: Task['status']) => {
    switch (status) {
      case 'completed': return styles.statusCompleted;
      case 'in-progress': return styles.statusInProgress;
      default: return styles.statusPending;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleGradient}>Task Manager</span>
            <span className={styles.titlePro}>Pro</span>
          </h1>
          <p className={styles.subtitle}>Organize your work with style and efficiency</p>
        </header>

        {/* Task Form */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>
            {editingId ? '✏️ Edit Task' : '➕ Add New Task'}
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Task Title *
              </label>
              <input
                id="title"
                type="text"
                className={styles.input}
                placeholder="Enter task title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="Add task description..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status" className={styles.label}>
                Status
              </label>
              <select
                id="status"
                className={styles.select}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                disabled={submitting}
              >
                <option value="pending">📋 Pending</option>
                <option value="in-progress">🚀 In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>

            {error && (
              <div className={styles.error}>
                ⚠️ {error}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={submitting}
              >
                {submitting ? 'Saving...' : (editingId ? 'Update Task' : 'Create Task')}
              </button>
              {editingId && (
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleCancel}
                  disabled={submitting}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tasks List */}
        <div className={styles.tasksSection}>
          <div className={styles.tasksSectionHeader}>
            <h2 className={styles.tasksTitle}>Your Tasks</h2>
            <span className={styles.taskCount}>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started!</p>
            </div>
          ) : (
            <div className={styles.taskGrid}>
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={styles.taskCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.taskHeader}>
                    <h3 className={styles.taskTitle}>{task.title}</h3>
                    <span className={`${styles.statusBadge} ${getStatusClass(task.status)}`}>
                      {task.status === 'completed' && '✅'}
                      {task.status === 'in-progress' && '🚀'}
                      {task.status === 'pending' && '📋'}
                      {' '}
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>

                  {task.description && (
                    <p className={styles.taskDescription}>{task.description}</p>
                  )}

                  <div className={styles.taskFooter}>
                    <span className={styles.taskDate}>
                      Created: {new Date(task.created_at).toLocaleDateString()}
                    </span>
                    <div className={styles.taskActions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => handleEdit(task)}
                        title="Edit task"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDelete(task.id)}
                        title="Delete task"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
