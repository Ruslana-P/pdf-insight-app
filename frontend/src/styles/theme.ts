export const theme = {
  colors: {
    bg: 'rgba(6, 6, 8, 0.92)',
    surface: '#121218',
    border: '#2d3a4f',
    text: '#e8eef4',
    textMuted: '#9aa8b8',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    buttonBorder: '#9eff00',
    buttonText: '#9eff00',
    dropzone: '#00e5ff',
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
    sans: '"DM Sans", sans-serif',
    display: '"Bebas Neue", sans-serif',
    mono: 'ui-monospace, "Cascadia Code", monospace',
  },
  breakpoints: {
    /** Minimum supported viewport (recruitment brief). */
    minWidth: '360px',
    /** Mobile-first: default styles target minWidth … tablet − 1. */
    tablet: '768px',
    /** Tablet … web − 1. */
    web: '1024px',
  },
} as const;

export type AppTheme = typeof theme;
