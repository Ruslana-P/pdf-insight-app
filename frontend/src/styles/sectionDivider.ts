import { css } from 'styled-components';

/** Top rule + spacing before a major block (matches Historia analiz section). */
export const sectionDividerTop = css`
  margin-top: calc(${({ theme }) => theme.space.xl} + ${({ theme }) => theme.space.lg});
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
