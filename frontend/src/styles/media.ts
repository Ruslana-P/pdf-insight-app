import { theme } from './theme';

/** Mobile-first `min-width` queries for styled-components. */
export const media = {
  tablet: `@media (min-width: ${theme.breakpoints.tablet})`,
  web: `@media (min-width: ${theme.breakpoints.web})`,
} as const;
