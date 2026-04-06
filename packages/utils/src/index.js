// Date formatting
export const formatDate = (date) => new Date(date).toLocaleDateString();

// Duration formatting
export const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// LocalStorage JSON helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ID generator
export const generateId = () => Math.random().toString(36).substring(2, 9);

// Simple validators
export const validators = {
  isRequired: (value) => (value != null && String(value).trim() !== '' ? null : 'Required field'),
  isPositiveNumber: (value) => (!isNaN(value) && Number(value) > 0 ? null : 'Must be a positive number')
};
