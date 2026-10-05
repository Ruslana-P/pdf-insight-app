export const theme = {
  colors: {
    bg: '#0f1419',
    surface: '#1a2332',
    border: '#2d3a4f',
    text: '#e8eef4',
    textMuted: '#9aa8b8',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    error: '#f87171',
    success: '#4ade80',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
  },
  font: {
    sans: '"Segoe UI", system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, "Cascadia Code", monospace',
  },
  breakpoints: {
    minWidth: '360px',
  },
} as const;

export type AppTheme = typeof theme;
